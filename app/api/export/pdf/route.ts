import { NextRequest, NextResponse } from "next/server"

// PDF export — coming soon (requires Puppeteer microservice)
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Exportación PDF disponible en plan Pro y Enterprise. Próximamente.",
    upgrade_url: "/billing"
  }, { status: 501 })
}
