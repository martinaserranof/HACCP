import { NextRequest, NextResponse } from "next/server"

// Webhook placeholder — payment processor pending
export async function POST(_request: NextRequest) {
  return NextResponse.json({ received: true })
}
