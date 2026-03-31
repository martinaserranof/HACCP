import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createCheckoutSession } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const { planId, interval } = await request.json()

  try {
    const session = await createCheckoutSession({
      userId: user.id,
      email: user.email!,
      planId,
      interval,
    })
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Error creando sesión de pago" }, { status: 500 })
  }
}
