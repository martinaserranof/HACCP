# 🛡 SafeTrace — Food Safety Intelligence

**El primer generador de planes HACCP con IA que cita bibliografía científica real.**

Genera planes HACCP completos (12 pasos Codex) listos para auditoría GFSI en 60 segundos.  
Conectado a FDA · RASFF · EFSA · ICMSF · Codex Alimentarius.

---

## Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Auth + DB**: Supabase (PostgreSQL + Row Level Security)
- **Motor IA**: Claude claude-sonnet (Anthropic API)
- **Pagos**: Stripe Subscriptions (trial 7 días)
- **Email**: Resend
- **Export**: ExcelJS (xlsx) + docx
- **Recalls**: Vercel Cron → FDA RSS feed
- **Deploy**: Vercel

---

## Setup local (10 minutos)

### 1. Clonar el repo

```bash
git clone https://github.com/TU_USUARIO/safetrace.git
cd safetrace
npm install
```

### 2. Variables de entorno

```bash
cp .env.local.example .env.local
# Completar con tus keys reales (ver sección de servicios abajo)
```

### 3. Base de datos Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ir a **SQL Editor** y ejecutar `supabase-schema.sql`
3. Copiar URL y keys al `.env.local`

### 4. Correr en desarrollo

```bash
npm run dev
# → http://localhost:3000
```

---

## Variables de entorno requeridas

| Variable | Dónde obtenerla |
|----------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | supabase.com → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | supabase.com → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | supabase.com → Settings → API |
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | dashboard.stripe.com → Developers |
| `STRIPE_SECRET_KEY` | dashboard.stripe.com → Developers |
| `STRIPE_WEBHOOK_SECRET` | `stripe listen --forward-to localhost:3000/api/stripe/webhook` |
| `STRIPE_PRICE_BASIC_MONTHLY` | Crear producto en Stripe dashboard |
| `STRIPE_PRICE_PRO_MONTHLY` | Crear producto en Stripe dashboard |
| `STRIPE_PRICE_ENTERPRISE_MONTHLY` | Crear producto en Stripe dashboard |
| `RESEND_API_KEY` | resend.com → API Keys |
| `CRON_SECRET` | Generar string aleatorio largo |

---

## Deploy en Vercel

### Opción A — 1 click desde GitHub

1. Subir este repo a GitHub
2. Ir a [vercel.com/new](https://vercel.com/new)
3. Importar el repo
4. Agregar todas las variables de entorno en Vercel dashboard
5. Deploy 🚀

### Opción B — CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Configurar Stripe Webhook en producción

```bash
# En Stripe dashboard → Webhooks → Add endpoint
# URL: https://safetrace.app/api/stripe/webhook
# Eventos: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
```

---

## Crear productos en Stripe

```
# En Stripe Dashboard → Products → Add product

Producto: SafeTrace Básico
  Precio mensual: $9 USD/mes → copiar price_id → STRIPE_PRICE_BASIC_MONTHLY
  Precio anual:   $84 USD/año → STRIPE_PRICE_BASIC_ANNUAL

Producto: SafeTrace Pro
  Precio mensual: $29 USD/mes → STRIPE_PRICE_PRO_MONTHLY
  Precio anual:   $276 USD/año → STRIPE_PRICE_PRO_ANNUAL

Producto: SafeTrace Enterprise
  Precio mensual: $59 USD/mes → STRIPE_PRICE_ENTERPRISE_MONTHLY
  Precio anual:   $564 USD/año → STRIPE_PRICE_ENTERPRISE_ANNUAL
```

---

## Arquitectura de archivos

```
safetrace/
├── app/
│   ├── page.tsx                    ← Redirect a dashboard o landing
│   ├── landing/page.tsx            ← Landing pública
│   ├── (dashboard)/
│   │   ├── layout.tsx              ← Auth check + nav
│   │   ├── page.tsx                ← Lista de planes
│   │   └── plans/
│   │       ├── new/page.tsx        ← Formulario 3 pasos
│   │       └── [id]/page.tsx       ← Vista del plan generado
│   └── api/
│       ├── generate/route.ts       ← Motor IA (POST)
│       ├── export/docx/route.ts    ← Word editable
│       ├── export/xlsx/route.ts    ← Excel GFSI-ready
│       ├── recalls/scan/route.ts   ← Cron FDA/RASFF
│       ├── checkout/route.ts       ← Stripe checkout
│       └── stripe/webhook/route.ts ← Stripe webhooks
├── lib/
│   ├── anthropic.ts                ← System prompt + API call
│   ├── knowledge-base.ts           ← 1626 fuentes regulatorias curadas
│   ├── stripe.ts                   ← Helpers Stripe
│   ├── supabase/client.ts          ← Supabase browser client
│   ├── supabase/server.ts          ← Supabase server + service client
│   ├── export/
│   │   ├── docx.ts                 ← Exportador Word profesional
│   │   └── xlsx.ts                 ← Exportador Excel GFSI-ready (7 hojas)
│   └── recalls/scanner.ts          ← FDA RSS + RASFF scraper
├── types/index.ts                  ← TypeScript types completos
├── supabase-schema.sql             ← Schema PostgreSQL + RLS policies
├── vercel.json                     ← Cron jobs config
└── .env.local.example              ← Template de variables
```

---

## Disclaimer legal

SafeTrace genera planes HACCP como herramienta de asistencia técnica con IA.  
Los planes generados **requieren verificación por un profesional habilitado** en inocuidad alimentaria antes de su implementación y presentación en auditoría.  
SafeTrace no reemplaza la consultoría profesional ni garantiza la aprobación en auditorías GFSI.

---

## Licencia

Propietario — safetrace.app © 2025
