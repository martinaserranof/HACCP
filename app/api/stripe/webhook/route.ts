import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createServiceClient } from "@/lib/supabase/server"
import Stripe from "stripe"

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = createServiceClient()

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.CheckoutSession
      const userId = session.metadata?.userId
      const planId = session.metadata?.planId
      if (!userId || !planId) break

      await supabase.from("subscriptions").upsert({
        user_id: userId,
        stripe_subscription_id: session.subscription as string,
        stripe_customer_id: session.customer as string,
        plan: planId,
        status: "active",
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" })

      await supabase.from("profiles").update({
        plan: planId,
        stripe_customer_id: session.customer as string,
      }).eq("id", userId)
      break
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription
      const userId = sub.metadata?.userId
      if (!userId) break

      const plan = (sub.items.data[0]?.price?.metadata?.plan as string) || "basic"
      await supabase.from("subscriptions").upsert({
        user_id: userId,
        stripe_subscription_id: sub.id,
        plan,
        status: sub.status,
        current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
        current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        cancel_at_period_end: sub.cancel_at_period_end,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" })

      await supabase.from("profiles")
        .update({ plan })
        .eq("id", userId)
      break
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription
      const userId = sub.metadata?.userId
      if (!userId) break

      await supabase.from("profiles")
        .update({ plan: "basic" })
        .eq("id", userId)

      await supabase.from("subscriptions")
        .update({ status: "canceled" })
        .eq("user_id", userId)
      break
    }
  }

  return NextResponse.json({ received: true })
}
