"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

const PLANS = [
  {
    name: "Básico", price: 9, annual: 7, color: "#4ade80", icon: "⚡",
    desc: "Para empezar. Todo lo esencial.",
    features: [
      "2 planes HACCP/mes",
      "12 pasos Codex completos",
      "Análisis de peligros + bibliografía científica",
      "CCPs con árbol de decisión Codex",
      "PDF editable + Word .docx + Excel",
      "Normas: FSSC / BRC / SQF / IFS",
    ],
    cta: "Empezar gratis 7 días",
    popular: false,
  },
  {
    name: "Pro", price: 29, annual: 23, color: "#38bdf8", icon: "🚀",
    desc: "Para empresas en certificación activa.",
    popular: true,
    features: [
      "10 planes HACCP/mes",
      "Todo lo del Básico",
      "Portal web del plan — 12 meses",
      "Alertas recall por email (FDA/RASFF)",
      "Legislación alérgenos multi-mercado",
      "Carga de reclamos del cliente",
    ],
    cta: "Empezar gratis 7 días",
  },
  {
    name: "Enterprise", price: 59, annual: 47, color: "#f59e0b", icon: "🏭",
    desc: "Para consultoras y plantas multi-línea.",
    popular: false,
    features: [
      "Planes ilimitados",
      "Portal web VIVO y permanente",
      "Auto-actualización FDA/RASFF/EFSA/Codex",
      "Multi-planta / multi-producto",
      "API + Webhooks ERP/QMS",
      "Soporte con consultor dedicado",
    ],
    cta: "Hablar con ventas",
  },
]

export default function SafeTraceLanding() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly")
  const [count, setCount] = useState({ plans: 0, companies: 0 })

  useEffect(() => {
    const targets = { plans: 1840, companies: 312 }
    const dur = 1800
    const start = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setCount({ plans: Math.floor(targets.plans * e), companies: Math.floor(targets.companies * e) })
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [])

  const price = (plan: typeof PLANS[0]) => billing === "annual" ? plan.annual : plan.price

  return (
    <div className="min-h-screen bg-bg text-slate-300 overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        @keyframes livepulse { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes glowtitle { 0%,100%{text-shadow:0 0 30px rgba(56,189,248,.3)} 50%{text-shadow:0 0 60px rgba(56,189,248,.6)} }
        .live-dot { animation: livepulse 2s infinite; }
        .glow-title { animation: glowtitle 4s ease infinite; }
        .btn-primary { background: linear-gradient(135deg,#0ea5e9,#0369a1); color:#fff; border:none; padding:13px 28px; font-family:'DM Mono',monospace; font-size:12px; letter-spacing:2px; cursor:pointer; text-transform:uppercase; transition:opacity .2s; }
        .btn-primary:hover { opacity:.85; }
        .btn-ghost { background:transparent; border:1px solid #182436; color:#4a6a8a; padding:10px 20px; font-family:'DM Mono',monospace; font-size:11px; letter-spacing:1.5px; cursor:pointer; text-transform:uppercase; transition:all .2s; }
        .btn-ghost:hover { border-color:#38bdf8; color:#38bdf8; }
        .plan-card { border:1px solid #182436; background:rgba(8,12,22,.6); padding:24px; position:relative; display:flex; flex-direction:column; transition:border-color .2s; }
        .plan-card:hover { border-color: #38bdf8; }
      `}</style>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background:"rgba(5,8,16,.94)", borderBottom:"1px solid #182436", backdropFilter:"blur(12px)", padding:"0 5vw" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", height:58, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:28, height:28, background:"linear-gradient(135deg,#0ea5e9,#0369a1)", clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12 }}>🛡</div>
            <span style={{ fontFamily:"'Bebas Neue'", fontSize:20, letterSpacing:5, color:"#38bdf8" }}>SAFETRACE</span>
            <span style={{ fontSize:8, padding:"1px 7px", border:"1px solid #182436", color:"#1e3a52", letterSpacing:2, fontFamily:"'DM Mono',monospace" }}>BETA</span>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/dashboard">
              <button className="btn-ghost" style={{ padding:"8px 18px", fontSize:10 }}>Iniciar sesión</button>
            </Link>
            <Link href="/dashboard">
              <button className="btn-primary" style={{ padding:"8px 18px", fontSize:10 }}>Probar gratis →</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"100px 5vw 60px", textAlign:"center" }}>
        <div style={{ maxWidth:860 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 14px", border:"1px solid rgba(56,189,248,.2)", background:"rgba(14,165,233,.05)", marginBottom:28, fontSize:10, color:"#38bdf8", letterSpacing:2, fontFamily:"'DM Mono',monospace" }}>
            <span className="live-dot" style={{ width:5, height:5, background:"#4ade80", borderRadius:"50%", display:"inline-block" }} />
            LIVE · FDA · RASFF · EFSA · ICMSF · Codex Alimentarius
          </div>

          <h1 className="glow-title" style={{ fontFamily:"'Bebas Neue'", fontSize:"clamp(52px,9vw,96px)", lineHeight:.92, letterSpacing:3, color:"#f0f6fc", marginBottom:24 }}>
            TU PLAN HACCP<br />
            <span style={{ color:"#38bdf8" }}>LISTO EN</span> 60<br />
            SEGUNDOS
          </h1>

          <p style={{ fontSize:"clamp(14px,2vw,17px)", color:"#4a6a8a", maxWidth:580, margin:"0 auto 36px", lineHeight:1.75, fontWeight:300 }}>
            El primer generador de planes HACCP con IA que cita bibliografía científica real.
            Apto para auditoría GFSI — FSSC 22000, BRC Issue 9, SQF Ed.9, IFS Food v8.
          </p>

          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:52 }}>
            <Link href="/dashboard">
              <button className="btn-primary" style={{ fontSize:13, padding:"15px 36px" }}>⚡ Generar mi primer plan gratis</button>
            </Link>
          </div>

          {/* Counters */}
          <div style={{ display:"flex", borderTop:"1px solid #0d1520", borderBottom:"1px solid #0d1520" }}>
            {[
              { n: count.plans.toLocaleString() + "+", label: "Planes generados" },
              { n: count.companies, label: "Empresas activas" },
              { n: 5, label: "Normas GFSI" },
            ].map((c, i) => (
              <div key={i} style={{ flex:1, padding:"24px 20px", textAlign:"center", borderRight: i < 2 ? "1px solid #0d1520" : "none" }}>
                <div style={{ fontFamily:"'Bebas Neue'", fontSize:42, color:"#38bdf8", lineHeight:1 }}>{c.n}</div>
                <div style={{ fontSize:10, color:"#1e3a52", letterSpacing:2, marginTop:5, textTransform:"uppercase", fontFamily:"'DM Mono',monospace" }}>{c.label}</div>
              </div>
            ))}
          </div>

          {/* Normas */}
          <div style={{ display:"flex", gap:12, justifyContent:"center", marginTop:28, flexWrap:"wrap" }}>
            {["FSSC 22000 v6","BRC Issue 9","SQF Ed.9","IFS Food v8","ISO 22000"].map(n => (
              <span key={n} style={{ fontSize:9, color:"#1e3a52", letterSpacing:2, fontFamily:"'DM Mono',monospace", padding:"4px 12px", border:"1px solid #0d1520" }}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:"80px 5vw", background:"rgba(7,10,18,.8)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:"clamp(28px,4vw,46px)", letterSpacing:3, color:"#f0f6fc" }}>
              EL MOTOR MÁS COMPLETO<br />DEL MERCADO HISPANOHABLANTE
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
            {[
              { icon:"📚", title:"Bibliografía científica real", desc:"Cada peligro cita su fuente: ICMSF, FDA Bad Bug Book, EFSA Scientific Opinions, PubMed. No es texto genérico.", color:"#a78bfa" },
              { icon:"⚖️", title:"Legislación por mercado", desc:"Alérgenos: FDA FASTER Act 2023, EU 1169/2011, FSANZ, ANVISA, CAA Argentina. Contaminantes: Codex STAN 193, EU 1881/2006.", color:"#38bdf8" },
              { icon:"📡", title:"Recalls en tiempo real", desc:"Conectado a FDA Recall DB, RASFF EU, CFIA Canadá, SENASA, ANVISA. Detecta retiros de tu misma categoría.", color:"#ef4444" },
              { icon:"👥", title:"Equipo HACCP real", desc:"Ingresás nombres y puestos reales. La IA asigna roles HACCP y detecta gaps según BRCGS Clause 2.2.3.", color:"#4ade80" },
              { icon:"📋", title:"Exportable desde el día 1", desc:"Todos los planes incluyen PDF + Word editable + Excel GFSI-ready (7 hojas). Sin restricciones.", color:"#f59e0b" },
              { icon:"🔄", title:"Plan que se actualiza solo", desc:"Enterprise: cuando detectamos un cambio normativo o recall relevante, re-analizamos y notificamos al líder HACCP.", color:"#0ea5e9" },
            ].map((f) => (
              <div key={f.title} style={{ border:`1px solid ${f.color}18`, padding:20, background:"rgba(8,12,22,.5)" }}>
                <div style={{ fontSize:28, marginBottom:12 }}>{f.icon}</div>
                <div style={{ fontSize:13, color:"#f0f6fc", marginBottom:8, fontWeight:500 }}>{f.title}</div>
                <div style={{ fontSize:12, color:"#3a5a72", lineHeight:1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding:"80px 5vw" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:"clamp(28px,4vw,46px)", letterSpacing:3, color:"#f0f6fc", marginBottom:16 }}>
              SIMPLE. JUSTO. SIN SORPRESAS.
            </h2>
            <div style={{ display:"inline-flex", border:"1px solid #182436", overflow:"hidden" }}>
              {(["monthly","annual"] as const).map(b => (
                <button key={b} onClick={() => setBilling(b)}
                  style={{ padding:"8px 20px", background: billing===b ? "#0ea5e9" : "transparent", color: billing===b ? "#fff" : "#2d4a62", border:"none", cursor:"pointer", fontSize:11, fontFamily:"'DM Mono',monospace", letterSpacing:1.5, transition:"all .2s" }}>
                  {b === "monthly" ? "Mensual" : "Anual −20%"}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {PLANS.map((plan) => (
              <div key={plan.name} className="plan-card" style={{ borderColor: plan.popular ? plan.color+"40" : "#182436" }}>
                {plan.popular && (
                  <div style={{ position:"absolute", top:-1, right:20, background:plan.color, color:"#06080f", fontSize:8, padding:"3px 10px", letterSpacing:2, fontWeight:700, fontFamily:"'DM Mono',monospace" }}>MÁS POPULAR</div>
                )}
                <div style={{ fontSize:20, marginBottom:6 }}>{plan.icon}</div>
                <div style={{ fontSize:10, color:plan.color, letterSpacing:2, fontFamily:"'DM Mono',monospace", marginBottom:4 }}>{plan.name.toUpperCase()}</div>
                <div style={{ fontFamily:"'Bebas Neue'", fontSize:52, color:"#f0f6fc", lineHeight:1, marginBottom:6 }}>
                  ${price(plan)}<span style={{ fontSize:14, color:"#2d4a62", fontFamily:"'DM Mono',monospace" }}>/mes</span>
                </div>
                {billing === "annual" && (
                  <div style={{ fontSize:10, color:"#4ade80", fontFamily:"'DM Mono',monospace", marginBottom:6 }}>
                    Ahorrás ${(plan.price - plan.annual) * 12}/año
                  </div>
                )}
                <div style={{ fontSize:12, color:"#2d4a62", marginBottom:20, lineHeight:1.5 }}>{plan.desc}</div>
                <div style={{ flex:1 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ fontSize:11, color:"#7a9aac", padding:"5px 0", borderBottom:"1px solid #08101a", display:"flex", gap:8 }}>
                      <span style={{ color:plan.color, flexShrink:0 }}>›</span>{f}
                    </div>
                  ))}
                </div>
                <Link href="/dashboard">
                  <button className="btn-primary" style={{ marginTop:20, width:"100%", background:`linear-gradient(135deg,${plan.color},${plan.color}cc)` }}>
                    {plan.cta}
                  </button>
                </Link>
                <div style={{ fontSize:9, color:"#1e3a52", textAlign:"center", marginTop:8, fontFamily:"'DM Mono',monospace" }}>
                  {plan.name !== "Enterprise" ? "7 días gratis · Sin tarjeta · Cancelá cuando quieras" : "Demo personalizada · Sin compromiso"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid #0d1520", padding:"28px 5vw" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontFamily:"'Bebas Neue'", fontSize:18, letterSpacing:5, color:"#38bdf8" }}>SAFETRACE</span>
            <span style={{ fontSize:9, color:"#1e3a52", fontFamily:"'DM Mono',monospace" }}>safetrace.app</span>
          </div>
          <div style={{ fontSize:10, color:"#1e3a52", fontFamily:"'DM Mono',monospace", textAlign:"right" }}>
            <div>SafeTrace genera planes HACCP como herramienta de asistencia técnica con IA.</div>
            <div style={{ marginTop:3 }}>Requiere validación por profesional habilitado antes de implementación en auditoría.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
