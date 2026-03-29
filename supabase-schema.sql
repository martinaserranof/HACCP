-- ═══════════════════════════════════════════════════════════════════
-- SafeTrace — Database Schema
-- Run this in Supabase SQL Editor: https://app.supabase.com
-- ═══════════════════════════════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── USERS (extends Supabase auth.users) ─────────────────────────
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  company text,
  plan text not null default 'basic' check (plan in ('basic', 'pro', 'enterprise')),
  plans_used_this_month integer not null default 0,
  stripe_customer_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Reset monthly usage on 1st of each month (via cron in Supabase)
-- select cron.schedule('reset-monthly-usage', '0 0 1 * *', 'update public.profiles set plans_used_this_month = 0');

-- ─── HACCP PLANS ─────────────────────────────────────────────────
create table public.haccp_plans (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  product_name text not null,
  category text not null,
  standard text not null,
  status text not null default 'generating' check (status in ('generating', 'ready', 'error')),
  json_data jsonb,
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── PLAN VERSIONS (history) ─────────────────────────────────────
create table public.plan_versions (
  id uuid primary key default uuid_generate_v4(),
  plan_id uuid references public.haccp_plans(id) on delete cascade not null,
  version_number integer not null,
  change_summary text,
  json_snapshot jsonb not null,
  created_by text, -- 'user' | 'auto_update' | 'recall_alert'
  created_at timestamptz not null default now()
);

-- ─── RECALL ALERTS (global) ──────────────────────────────────────
create table public.recall_alerts (
  id uuid primary key default uuid_generate_v4(),
  source text not null,         -- 'FDA' | 'RASFF' | 'CFIA' | 'SENASA' | 'ANVISA'
  country text not null,
  product_category text not null,
  product_name text,
  cause text not null,
  risk_class text check (risk_class in ('I', 'II', 'III')),
  source_url text,
  raw_data jsonb,
  detected_at timestamptz not null default now()
);

-- ─── PLAN ALERTS (recall → plan mapping) ─────────────────────────
create table public.plan_alerts (
  id uuid primary key default uuid_generate_v4(),
  plan_id uuid references public.haccp_plans(id) on delete cascade not null,
  recall_id uuid references public.recall_alerts(id) on delete cascade not null,
  relevance_score integer check (relevance_score between 0 and 100),
  relevance_reason text,
  notified_at timestamptz,
  acknowledged_by uuid references public.profiles(id),
  acknowledged_at timestamptz,
  created_at timestamptz not null default now(),
  unique(plan_id, recall_id)
);

-- ─── SUBSCRIPTIONS ───────────────────────────────────────────────
create table public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  stripe_subscription_id text unique,
  stripe_customer_id text,
  plan text not null default 'basic',
  billing_interval text check (billing_interval in ('month', 'year')),
  status text not null default 'trialing',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.haccp_plans enable row level security;
alter table public.plan_versions enable row level security;
alter table public.plan_alerts enable row level security;
alter table public.subscriptions enable row level security;

-- Profiles: users can only read/update their own
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- HACCP Plans: users can only access their own
create policy "Users can view own plans" on public.haccp_plans for select using (auth.uid() = user_id);
create policy "Users can insert own plans" on public.haccp_plans for insert with check (auth.uid() = user_id);
create policy "Users can update own plans" on public.haccp_plans for update using (auth.uid() = user_id);
create policy "Users can delete own plans" on public.haccp_plans for delete using (auth.uid() = user_id);

-- Plan versions: follow parent plan
create policy "Users can view own plan versions" on public.plan_versions for select
  using (exists (select 1 from public.haccp_plans where id = plan_id and user_id = auth.uid()));

-- Plan alerts: follow parent plan
create policy "Users can view own alerts" on public.plan_alerts for select
  using (exists (select 1 from public.haccp_plans where id = plan_id and user_id = auth.uid()));
create policy "Users can acknowledge own alerts" on public.plan_alerts for update
  using (exists (select 1 from public.haccp_plans where id = plan_id and user_id = auth.uid()));

-- Recall alerts: public read (global data)
alter table public.recall_alerts enable row level security;
create policy "Anyone can read recalls" on public.recall_alerts for select using (true);

-- Subscriptions
create policy "Users can view own subscription" on public.subscriptions for select using (auth.uid() = user_id);

-- ─── INDEXES ─────────────────────────────────────────────────────
create index idx_haccp_plans_user_id on public.haccp_plans(user_id);
create index idx_haccp_plans_status on public.haccp_plans(status);
create index idx_plan_versions_plan_id on public.plan_versions(plan_id);
create index idx_plan_alerts_plan_id on public.plan_alerts(plan_id);
create index idx_recall_alerts_category on public.recall_alerts(product_category);
create index idx_recall_alerts_detected on public.recall_alerts(detected_at desc);
