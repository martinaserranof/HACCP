import { NextRequest, NextResponse } from "next/server"

// Payment processor pending configuration (Stripe not available in Argentina)
// Will be replaced with MercadoPago or Lemon Squeezy
export async function POST(_request: NextRequest) {
  return NextResponse.json({
    message: "Procesador de pagos en configuración. Contactanos a hola@safetrace.app para acceso anticipado.",
    coming_soon: true,
  }, { status: 503 })
}
