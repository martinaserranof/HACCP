import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: plans } = await supabase
    .from("haccp_plans")
    .select("id, product_name, category, standard, status, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(20)

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, plans_used_this_month")
    .eq("id", user!.id)
    .single()

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-widest text-white">MIS PLANES HACCP</h1>
          <p className="text-muted text-sm font-mono mt-1">
            Plan: <span className="text-primary uppercase">{profile?.plan || "basic"}</span>
            {" · "}
            Usados este mes: <span className="text-accent">{profile?.plans_used_this_month || 0}</span>
          </p>
        </div>
        <Link href="/plans/new"
          className="bg-primary text-white px-6 py-3 font-mono text-xs tracking-widest uppercase hover:opacity-90 transition-opacity">
          ⚡ Nuevo Plan HACCP
        </Link>
      </div>

      {/* Plans grid */}
      {plans && plans.length > 0 ? (
        <div className="grid gap-4">
          {plans.map((plan) => (
            <Link key={plan.id} href={`/plans/${plan.id}`}
              className="border border-border bg-surface/50 p-5 hover:border-primary/50 transition-colors flex items-center justify-between group">
              <div>
                <div className="text-white font-medium text-sm">{plan.product_name}</div>
                <div className="text-muted text-xs font-mono mt-1">
                  {plan.category} · {plan.standard}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs font-mono px-2 py-1 ${
                  plan.status === "ready" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                }`}>
                  {plan.status === "ready" ? "✓ LISTO" : "⟳ GENERANDO"}
                </span>
                <span className="text-muted text-xs">
                  {new Date(plan.created_at).toLocaleDateString("es-AR")}
                </span>
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-border p-16 text-center">
          <div className="text-4xl mb-4">🛡</div>
          <div className="text-white font-display text-2xl tracking-widest mb-3">TU PRIMER PLAN HACCP</div>
          <p className="text-muted text-sm mb-6">Ingresá el nombre de tu producto y el motor lo genera en 60 segundos.</p>
          <Link href="/plans/new"
            className="bg-primary text-white px-8 py-3 font-mono text-xs tracking-widest uppercase hover:opacity-90 transition-opacity inline-block">
            ⚡ Generar mi primer plan
          </Link>
        </div>
      )}
    </div>
  )
}
