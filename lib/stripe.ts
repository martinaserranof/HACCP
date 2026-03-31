import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
})

// ─── PRICE IDs (set in .env.local) ───────────────────────────────────────────
export const PRICES = {
  basic: {
    monthly: process.env.STRIPE_PRICE_BASIC_MONTHLY!,
    annual: process.env.STRIPE_PRICE_BASIC_ANNUAL!,
  },
  pro: {
    monthly: process.env.STRIPE_PRICE_PRO_MONTHLY!,
    annual: process.env.STRIPE_PRICE_PRO_ANNUAL!,
  },
  enterprise: {
    monthly: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY!,
    annual: process.env.STRIPE_PRICE_ENTERPRISE_ANNUAL!,
  },
}

export type BillingInterval = "monthly" | "annual"
export type PlanId = keyof typeof PRICES

// ─── CREATE CHECKOUT SESSION ─────────────────────────────────────────────────
export async function createCheckoutSession({
  userId,
  email,
  planId,
  interval,
  trialDays = 7,
}: {
  userId: string
  email: string
  planId: PlanId
  interval: BillingInterval
  trialDays?: number
}) {
  const priceId = PRICES[planId][interval]

  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: {
      trial_period_days: trialDays,
      metadata: { userId, planId },
    },
    metadata: { userId, planId },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/precios?checkout=cancelled`,
    allow_promotion_codes: true,
  })

  return session
}

// ─── CREATE CUSTOMER PORTAL ──────────────────────────────────────────────────
export async function createPortalSession(customerId: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  })
}
