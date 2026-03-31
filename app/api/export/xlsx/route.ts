import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateXlsx } from "@/lib/export/xlsx"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const planId = searchParams.get("planId")
  if (!planId) return NextResponse.json({ error: "planId requerido" }, { status: 400 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const { data: plan } = await supabase
    .from("haccp_plans")
    .select("json_data, product_name, user_id")
    .eq("id", planId)
    .eq("user_id", user.id)
    .single()

  if (!plan?.json_data) return NextResponse.json({ error: "Plan no encontrado" }, { status: 404 })

  const buffer = await generateXlsx(plan.json_data as any)
  const filename = `HACCP_${plan.product_name.replace(/[^a-z0-9]/gi, "_")}_SafeTrace.xlsx`

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  })
}
