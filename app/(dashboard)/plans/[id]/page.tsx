import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function PlanPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: plan } = await supabase
    .from("haccp_plans")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user!.id)
    .single()

  if (!plan) notFound()

  const data = plan.json_data as any
  const p = data?.producto || {}
  const hz = data?.analisis_peligros || []
  const ccps = data?.ccps || []

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard" className="text-muted hover:text-white font-mono text-xs">← Volver</Link>
        <span className="text-muted">/</span>
        <h1 className="text-white font-display text-2xl tracking-widest">{plan.product_name}</h1>
        <span className={`px-3 py-1 text-xs font-mono ${
          plan.status === "ready" ? "bg-success/10 text-success border border-success/20" : "bg-warning/10 text-warning"
        }`}>
          {plan.status === "ready" ? "✓ APTO AUDITORÍA" : "⟳ GENERANDO..."}
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { icon: "⚠️", val: hz.length, label: "Peligros" },
          { icon: "🎯", val: ccps.length, label: "CCPs" },
          { icon: "📚", val: data?.bibliografia_cientifica?.length || 0, label: "Referencias" },
          { icon: "📡", val: data?.alertas_recall_historicas?.length || 0, label: "Recalls" },
        ].map((k) => (
          <div key={k.label} className="border border-border p-4 bg-surface/30">
            <div className="text-2xl mb-2">{k.icon}</div>
            <div className="font-display text-3xl text-primary">{k.val}</div>
            <div className="text-muted text-xs font-mono mt-1 uppercase tracking-wider">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Summary */}
      {data?.resumen_ejecutivo && (
        <div className="border border-primary/20 bg-primary/5 p-5 mb-6">
          <div className="text-xs font-mono text-primary tracking-widest mb-3">RESUMEN EJECUTIVO</div>
          <p className="text-slate-300 text-sm leading-relaxed">{data.resumen_ejecutivo}</p>
        </div>
      )}

      {/* Export buttons */}
      <div className="flex gap-3 mb-8">
        {[
          { label: "↓ Exportar PDF", href: `/api/export/pdf?planId=${plan.id}` },
          { label: "↓ Exportar Word (.docx)", href: `/api/export/docx?planId=${plan.id}` },
          { label: "↓ Exportar Excel (.xlsx)", href: `/api/export/xlsx?planId=${plan.id}` },
        ].map((btn) => (
          <a key={btn.label} href={btn.href}
            className="border border-border text-muted hover:border-primary hover:text-primary px-4 py-2 font-mono text-xs tracking-wider transition-colors">
            {btn.label}
          </a>
        ))}
      </div>

      {/* Hazard table preview */}
      <div className="border border-border">
        <div className="bg-surface/80 px-5 py-3 border-b border-border">
          <span className="font-display text-base tracking-widest text-white">ANÁLISIS DE PELIGROS</span>
          <span className="text-muted text-xs font-mono ml-4">{hz.length} peligros identificados</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-border">
                {["ID","Etapa","Tipo","Peligro","Prob.","Sev.","Signif.","Control","CCP"].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-muted tracking-wider text-[9px] uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hz.slice(0, 10).map((h: any, i: number) => (
                <tr key={i} className="border-b border-border/50 hover:bg-white/2">
                  <td className="px-3 py-2 text-primary">{h.id}</td>
                  <td className="px-3 py-2 text-slate-400 max-w-[140px]">{h.etapa}</td>
                  <td className="px-3 py-2">
                    <span className={`px-1.5 py-0.5 text-[8px] ${
                      h.tipo==="Biológico" ? "bg-red-900/30 text-red-400" :
                      h.tipo==="Químico"   ? "bg-yellow-900/30 text-yellow-400" :
                      h.tipo==="Alérgeno"  ? "bg-purple-900/30 text-purple-400" :
                      "bg-blue-900/30 text-blue-400"
                    }`}>{h.tipo}</span>
                  </td>
                  <td className="px-3 py-2 text-slate-300 max-w-[180px]">{h.peligro}</td>
                  <td className="px-3 py-2 text-center text-slate-400">{h.probabilidad}</td>
                  <td className="px-3 py-2 text-center text-slate-400">{h.severidad}</td>
                  <td className="px-3 py-2 text-center">{h.significativo ? <span className="text-success">✓</span> : <span className="text-muted">—</span>}</td>
                  <td className="px-3 py-2 text-slate-400">{h.tipo_medida}</td>
                  <td className="px-3 py-2">
                    {h.es_ccp ? <span className="text-danger font-bold">{h.ccp_id}</span> : <span className="text-muted">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {hz.length > 10 && (
            <div className="px-4 py-3 text-muted text-xs font-mono border-t border-border">
              + {hz.length - 10} peligros más — exportá el Excel para ver el análisis completo
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
