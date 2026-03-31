"use client"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

const NORMAS = ["FSSC 22000 v6","BRC Food Safety Issue 9","SQF Edition 9","IFS Food Version 8","ISO 22000:2018"]
const CATEGORIAS = ["Carne y aves procesadas","Lácteos y derivados","Bebidas","Panadería y pastelería","Salsas y condimentos","Frutas y verduras frescas / IV gama","Pescado y mariscos","Snacks y aperitivos","Confitería y chocolates","Conservas y enlatados","Congelados RTE","Suplementos / Nutracéuticos"]
const PROCESOS = ["Tratamiento térmico (cocción/pasteurización/esterilización)","Proceso en frío / refrigeración","Congelado IQF","Secado / deshidratado / liofilizado","Fermentación / acidificación","Envasado atmósfera modificada (MAP)","Proceso aséptico","Alta presión hidrostática (HPP)"]
const ALERGENOS = ["Gluten/Trigo","Lácteos","Huevo","Maní","Árbol de nueces","Soja","Pescado","Mariscos","Sésamo"]
const PUESTOS = ["Director/a de Calidad","Jefe/a de Producción","Responsable de Mantenimiento","Jefe/a de Logística","Responsable de Compras","Microbiólogo/a Lab","Responsable de Higiene","Gerente General"]

interface TeamMember { id: number; nombre: string; apellido: string; puesto: string; es_lider: boolean }

export default function HACCPEngineClient() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [genStep, setGenStep] = useState(0)
  const [error, setError] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    productName: "", category: "", standard: "FSSC 22000 v6",
    process: "", allergens: [] as string[], shelf: "", packaging: "",
    consumer: "", additionalNotes: ""
  })
  const [team, setTeam] = useState<TeamMember[]>([{ id: 1, nombre:"", apellido:"", puesto:"", es_lider:false }])
  const [complaints, setComplaints] = useState("")
  const [complaintFile, setComplaintFile] = useState<File|null>(null)
  const [complaintText, setComplaintText] = useState("")

  const toggleAllergen = (a: string) =>
    setForm(f => ({ ...f, allergens: f.allergens.includes(a) ? f.allergens.filter(x=>x!==a) : [...f.allergens,a] }))

  const addMember = () => setTeam(t => [...t, { id: Date.now(), nombre:"", apellido:"", puesto:"", es_lider:false }])
  const removeMember = (id: number) => setTeam(t => t.filter(m => m.id !== id))
  const updateMember = (id: number, field: string, val: string|boolean) =>
    setTeam(t => t.map(m => m.id===id ? {...m,[field]:val} : m))
  const setLider = (id: number) => setTeam(t => t.map(m => ({...m,es_lider:m.id===id})))

  const handleFile = (f: File) => {
    setComplaintFile(f)
    const r = new FileReader()
    r.onload = (e) => setComplaintText(e.target?.result as string)
    r.readAsText(f)
  }

  const STEPS_META = ["Paso 1 — Producto","Paso 2 — Equipo HACCP","Paso 3 — Reclamos"]
  const GEN_LOGS = [
    "Inicializando motor HACCP v3...","Consultando ICMSF Microorganisms in Foods (8 vols.)...",
    "Cargando FDA Bad Bug Book + EFSA Scientific Opinions...","Procesando equipo HACCP y roles Codex...",
    "Integrando antecedentes de reclamos del cliente...","Analizando peligros biológicos con bibliografía PubMed...",
    "Evaluando contaminantes químicos (Codex STAN 193, EU 1881/2006)...","Verificando legislación de alérgenos por mercado...",
    "Aplicando Árbol de Decisión Codex para CCPs...","Consultando RASFF, FDA Recall DB, CFIA, SENASA...",
    "Generando bibliografía científica (≥15 referencias)...","Compilando plan completo apto auditoría GFSI...",
  ]

  const generate = async () => {
    setLoading(true); setGenStep(0); setError("")
    const interval = setInterval(() => setGenStep(s => Math.min(s+1, 11)), 750)

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          teamMembers: team.filter(m => m.nombre),
          complaints: [complaints, complaintText].filter(Boolean).join("\n"),
        })
      })
      clearInterval(interval)
      setGenStep(12)
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Error generando el plan")
      }
      const { planId } = await res.json()
      setTimeout(() => router.push(`/dashboard/plans/${planId}`), 500)
    } catch (e: any) {
      clearInterval(interval)
      setError(e.message)
      setLoading(false)
      setGenStep(0)
    }
  }

  const css = `
    .inp { width:100%; background:#0a0f18; border:1px solid #182436; color:#c9d1d9; padding:11px 14px; font-family:'DM Mono',monospace; font-size:12px; outline:none; transition:border-color .2s; resize:vertical; }
    .inp:focus { border-color:#0ea5e9; }
    .inp::placeholder { color:#243448; }
    select.inp option { background:#0a0f18; }
    .lbl { display:block; font-size:9px; letter-spacing:2.5px; color:#2d4a62; margin-bottom:7px; text-transform:uppercase; font-family:'DM Mono',monospace; }
    .chip { padding:5px 12px; border:1px solid #182436; font-size:10px; cursor:pointer; transition:all .2s; color:#2d4a62; background:transparent; font-family:'DM Mono',monospace; }
    .chip.on { border-color:#f59e0b; color:#f59e0b; background:rgba(245,158,11,.07); }
    .btn { background:linear-gradient(135deg,#0ea5e9,#0369a1); color:#fff; border:none; padding:13px 28px; font-family:'DM Mono',monospace; font-size:12px; letter-spacing:2px; cursor:pointer; text-transform:uppercase; transition:opacity .2s; }
    .btn:hover { opacity:.85; }
    .btn:disabled { opacity:.28; cursor:not-allowed; }
    .btn-g { background:transparent; border:1px solid #182436; color:#3a5a72; padding:8px 16px; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:1.5px; cursor:pointer; text-transform:uppercase; transition:all .2s; }
    .btn-g:hover { border-color:#38bdf8; color:#38bdf8; }
    @keyframes fadein { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    .fadein { animation:fadein .4s ease forwards; }
  `

  if (loading) return (
    <div style={{ minHeight:"100vh", background:"#07090f", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"'DM Mono',monospace", color:"#c9d1d9" }}>
      <style>{css}</style>
      <div style={{ width:"100%", maxWidth:580 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:12, letterSpacing:6, color:"#0ea5e9", marginBottom:8 }}>MOTOR HACCP IA v3</div>
          <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:28, letterSpacing:3, color:"#f0f6fc" }}>{form.productName}</div>
        </div>
        <div style={{ height:1, background:"#0d1520", marginBottom:32, position:"relative" }}>
          <div style={{ position:"absolute", top:0, left:0, height:"100%", width:`${(genStep/12)*100}%`, background:"linear-gradient(90deg,#0369a1,#38bdf8)", transition:"width .7s ease", boxShadow:"0 0 16px #38bdf8" }} />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20 }}>
          {GEN_LOGS.map((log, i) => (
            <div key={i} style={{ padding:"8px 12px", border:`1px solid ${i<genStep?"rgba(14,165,233,.2)":"#0d1520"}`, background:i<genStep?"rgba(14,165,233,.03)":"transparent", opacity:i<=genStep?1:0.18, transition:"all .4s", display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:10, color:i<genStep?"#38bdf8":"#1a2e40" }}>{i<genStep?"✓":i===genStep?"●":"○"}</span>
              <span style={{ fontSize:9, color:i<genStep?"#38bdf8":"#1a2e40" }}>{log}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize:10, color:"#1e3a52", textAlign:"center" }}>
          Motor Claude · ICMSF · FDA · Codex · EFSA · RASFF
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:"100vh", background:"#07090f", fontFamily:"'DM Mono',monospace", color:"#c9d1d9", padding:"80px 24px 32px" }}>
      <style>{css}</style>
      <div style={{ maxWidth:680, margin:"0 auto" }}>

        {/* Step tabs */}
        <div style={{ display:"flex", gap:0, marginBottom:28, borderBottom:"1px solid #0d1520" }}>
          {STEPS_META.map((s, i) => (
            <button key={i} onClick={() => setStep(i)}
              style={{ padding:"10px 20px", background:"none", border:"none", borderBottom:`2px solid ${step===i?"#38bdf8":"transparent"}`, fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:2, color:step===i?"#38bdf8":"#2d4a62", cursor:"pointer" }}>
              {String(i+1).padStart(2,"0")} · {s.split("—")[1].trim()}
            </button>
          ))}
        </div>

        {error && (
          <div style={{ padding:"12px 16px", border:"1px solid rgba(239,68,68,.3)", background:"rgba(239,68,68,.05)", color:"#ef4444", fontSize:11, marginBottom:20 }}>⚠ {error}</div>
        )}

        {/* STEP 0 — Producto */}
        {step === 0 && (
          <div className="fadein" style={{ display:"grid", gap:16 }}>
            <div>
              <label className="lbl">Nombre completo del producto *</label>
              <input className="inp" placeholder="Ej: Pollo cocido IQF con hierbas provenzales, bolsa 500g"
                value={form.productName} onChange={e => setForm(f => ({...f,productName:e.target.value}))} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              <div>
                <label className="lbl">Categoría *</label>
                <select className="inp" value={form.category} onChange={e => setForm(f => ({...f,category:e.target.value}))}>
                  <option value="">Seleccionar...</option>
                  {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="lbl">Norma</label>
                <select className="inp" value={form.standard} onChange={e => setForm(f => ({...f,standard:e.target.value}))}>
                  {NORMAS.map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="lbl">Proceso principal *</label>
              <select className="inp" value={form.process} onChange={e => setForm(f => ({...f,process:e.target.value}))}>
                <option value="">Seleccionar...</option>
                {PROCESOS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              <div>
                <label className="lbl">Vida útil</label>
                <input className="inp" placeholder="Ej: 18 meses a -18°C" value={form.shelf} onChange={e => setForm(f => ({...f,shelf:e.target.value}))} />
              </div>
              <div>
                <label className="lbl">Envase</label>
                <input className="inp" placeholder="Ej: Bolsa PEAD sellada" value={form.packaging} onChange={e => setForm(f => ({...f,packaging:e.target.value}))} />
              </div>
            </div>
            <div>
              <label className="lbl">Alérgenos Big 9 (FDA) / Big 14 (UE)</label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                {ALERGENOS.map(a => (
                  <button key={a} className={`chip ${form.allergens.includes(a)?"on":""}`} onClick={() => toggleAllergen(a)}>{a}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="lbl">Notas adicionales</label>
              <textarea className="inp" rows={3} placeholder="Mercado destino, líneas compartidas, uso RTE..."
                value={form.additionalNotes} onChange={e => setForm(f => ({...f,additionalNotes:e.target.value}))} />
            </div>
            <button className="btn" onClick={() => setStep(1)} disabled={!form.productName||!form.category||!form.process}>
              Siguiente → Equipo HACCP
            </button>
          </div>
        )}

        {/* STEP 1 — Equipo */}
        {step === 1 && (
          <div className="fadein">
            <p style={{ fontSize:11, color:"#2d4a62", marginBottom:16 }}>
              Ingresá los miembros reales. El motor asigna roles HACCP y detecta gaps según BRCGS Clause 2.2.3.
            </p>
            <div style={{ padding:"12px 16px", border:"1px solid #182436", marginBottom:16 }}>
              <div style={{ fontSize:9, letterSpacing:2, color:"#0ea5e9", marginBottom:8 }}>PUESTOS TÍPICOS — CLICK PARA AGREGAR</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                {PUESTOS.map(p => (
                  <button key={p} className="chip" onClick={() => setTeam(t => [...t, { id:Date.now(), nombre:"", apellido:"", puesto:p, es_lider:false }])}>{p}</button>
                ))}
              </div>
            </div>
            <div style={{ display:"grid", gap:12, marginBottom:14 }}>
              {team.map((m, i) => (
                <div key={m.id} style={{ border:`1px solid ${m.es_lider?"rgba(56,189,248,.3)":"#182436"}`, padding:"14px 16px" }}>
                  <div style={{ display:"flex", gap:8, marginBottom:10, alignItems:"center" }}>
                    <span style={{ fontSize:9, color:"#2d4a62" }}>MIEMBRO {i+1}</span>
                    {m.es_lider && <span style={{ fontSize:8, padding:"2px 8px", background:"rgba(56,189,248,.1)", color:"#38bdf8", fontFamily:"'DM Mono',monospace" }}>LÍDER HACCP</span>}
                    <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
                      {!m.es_lider && <button className="btn-g" style={{ fontSize:8, padding:"3px 8px" }} onClick={() => setLider(m.id)}>★ Líder</button>}
                      {team.length > 1 && <button className="btn-g" style={{ fontSize:8, padding:"3px 8px", borderColor:"rgba(239,68,68,.3)", color:"#ef4444" }} onClick={() => removeMember(m.id)}>✕</button>}
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 2fr", gap:10 }}>
                    <div>
                      <label className="lbl">Nombre</label>
                      <input className="inp" placeholder="María" value={m.nombre} onChange={e => updateMember(m.id,"nombre",e.target.value)} />
                    </div>
                    <div>
                      <label className="lbl">Apellido</label>
                      <input className="inp" placeholder="García" value={m.apellido} onChange={e => updateMember(m.id,"apellido",e.target.value)} />
                    </div>
                    <div>
                      <label className="lbl">Puesto</label>
                      <input className="inp" placeholder="Responsable de Calidad" value={m.puesto} onChange={e => updateMember(m.id,"puesto",e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-g" style={{ width:"100%", marginBottom:20 }} onClick={addMember}>+ Agregar miembro</button>
            <div style={{ display:"flex", gap:12 }}>
              <button className="btn-g" onClick={() => setStep(0)}>← Volver</button>
              <button className="btn" style={{ flex:1 }} onClick={() => setStep(2)}>Siguiente → Reclamos</button>
            </div>
          </div>
        )}

        {/* STEP 2 — Reclamos */}
        {step === 2 && (
          <div className="fadein" style={{ display:"grid", gap:16 }}>
            <p style={{ fontSize:11, color:"#2d4a62" }}>
              Los reclamos históricos son antecedentes obligatorios — BRCGS Clause 2.5 / FSSC 22000 Element 8.5.2.
            </p>
            <div>
              <label className="lbl">Descripción de reclamos (texto libre)</label>
              <textarea className="inp" rows={7}
                placeholder={`Ej:\n- 2024-03 · Lote 240301 · Reclamo: olor anormal · Causa: ruptura cadena frío\n- 2024-07 · Reclamo: cuerpo extraño (fragmento plástico ~3mm)\n- 2023-11 · Reacción alérgica no declarada · En investigación`}
                value={complaints} onChange={e => setComplaints(e.target.value)} />
            </div>
            <div>
              <label className="lbl">O subir archivo de reclamos (.txt, .csv)</label>
              <div
                style={{ border:"1px dashed #182436", padding:"20px 16px", textAlign:"center", cursor:"pointer" }}
                onClick={() => fileRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if(f) handleFile(f) }}>
                {complaintFile
                  ? <div style={{ fontSize:12, color:"#4ade80" }}>✓ {complaintFile.name}</div>
                  : <div style={{ fontSize:11, color:"#2d4a62" }}>📂 Arrastrar archivo o click para seleccionar (.txt / .csv)</div>}
                <input ref={fileRef} type="file" accept=".txt,.csv" style={{ display:"none" }} onChange={e => { const f=e.target.files?.[0]; if(f) handleFile(f) }} />
              </div>
            </div>
            <div style={{ display:"flex", gap:12 }}>
              <button className="btn-g" onClick={() => setStep(1)}>← Volver</button>
              <button className="btn" style={{ flex:1, fontSize:13 }}
                onClick={generate}
                disabled={!form.productName||!form.category||!form.process}>
                ⚡ GENERAR PLAN HACCP COMPLETO
              </button>
            </div>
            <div style={{ fontSize:10, color:"#1e3a52", textAlign:"center" }}>
              Motor Claude · ICMSF · FDA · Codex · EFSA · RASFF — Est. 45–90 seg
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
