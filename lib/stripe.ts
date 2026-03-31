// ─── STRIPE PLACEHOLDER ───────────────────────────────────────────────────────
// Stripe no está disponible para cuentas de Argentina.
// Procesador de pagos pendiente de configuración: MercadoPago o Lemon Squeezy.
// Estas funciones son stubs que no ejecutan nada en build time.

export type BillingInterval = "monthly" | "annual"
export type PlanId = "basic" | "pro" | "enterprise"

export async function createCheckoutSession(_opts: {
  userId: string; email: string; planId: PlanId
  interval: BillingInterval; trialDays?: number
}) {
  throw new Error("Payment processor not configured yet. Coming soon.")
}

export async function createPortalSession(_customerId: string) {
  throw new Error("Payment processor not configured yet. Coming soon.")
}
