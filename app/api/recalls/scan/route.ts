import { NextRequest, NextResponse } from "next/server"
import { scanFDARecalls, matchRecallsToPlans } from "@/lib/recalls/scanner"

// Called daily by Vercel Cron (vercel.json)
export async function GET(request: NextRequest) {
  // Verify cron secret to prevent unauthorized calls
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const inserted = await scanFDARecalls()
    await matchRecallsToPlans()
    return NextResponse.json({
      ok: true,
      recalls_inserted: inserted,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Recall scan error:", error)
    return NextResponse.json({ error: "Scan failed" }, { status: 500 })
  }
}
