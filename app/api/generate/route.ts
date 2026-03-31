import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateHACCPPlan, PLAN_LIMITS } from "@/lib/anthropic"
import type { HACCPFormData } from "@/types"

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Get user profile + plan limits
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan, plans_used_this_month")
      .eq("id", user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 })
    }

    const limit = PLAN_LIMITS[profile.plan] ?? 2
    if (profile.plans_used_this_month >= limit) {
      return NextResponse.json({
        error: `Límite del plan alcanzado (${limit} planes/mes). Actualizá tu plan para continuar.`,
        code: "PLAN_LIMIT_REACHED",
      }, { status: 403 })
    }

    const body: HACCPFormData = await request.json()

    // Validate required fields
    if (!body.productName || !body.category || !body.process) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    // Create plan record with generating status
    const { data: planRow, error: insertError } = await supabase
      .from("haccp_plans")
      .insert({
        user_id: user.id,
        product_name: body.productName,
        category: body.category,
        standard: body.standard,
        status: "generating",
      })
      .select()
      .single()

    if (insertError || !planRow) {
      return NextResponse.json({ error: "Error creando el plan" }, { status: 500 })
    }

    // Generate with AI
    const haccpData = await generateHACCPPlan(body)

    // Save result + increment usage
    await supabase
      .from("haccp_plans")
      .update({ json_data: haccpData, status: "ready", updated_at: new Date().toISOString() })
      .eq("id", planRow.id)

    await supabase
      .from("profiles")
      .update({ plans_used_this_month: profile.plans_used_this_month + 1 })
      .eq("id", user.id)

    // Save initial version
    await supabase.from("plan_versions").insert({
      plan_id: planRow.id,
      version_number: 1,
      change_summary: "Plan generado inicialmente",
      json_snapshot: haccpData,
      created_by: "user",
    })

    return NextResponse.json({ planId: planRow.id, data: haccpData })

  } catch (error) {
    console.error("Generate error:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
