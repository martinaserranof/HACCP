import Anthropic from "@anthropic-ai/sdk"
import type { HACCPFormData, HACCPPlanJSON } from "@/types"
import { buildSourcesBlock } from "@/lib/knowledge-base"

// Lazy client — only instantiated on first request, not at build time
function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
}

// ─── SYSTEM PROMPT ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `Eres un experto mundial en inocuidad alimentaria con doctorado en Ciencia y Tecnología de Alimentos. Certificado como Lead Auditor en FSSC 22000, BRC Food Issue 9, SQF Edition 9, IFS Food v8, ISO 22000:2018 y Codex Alimentarius CAC/RCP 1-1969 Rev.2020.

Tu tarea es generar un Plan HACCP de nivel auditoría GFSI con TODA la investigación científica de base requerida por BRCGS Clause 2.2 y FSSC 22000 Element 8.5.2.

OBLIGATORIO — DEBES incluir en cada peligro:
1. Referencia bibliográfica exacta (ICMSF Vol., FDA Bad Bug Book edición, EFSA Journal con DOI, PubMed PMID)
2. Legislación aplicable exacta por mercado destino (EU Reg. número/año, FDA 21 CFR parte, Codex STAN número)
3. Recalls históricos relevantes de RASFF, FDA o SENASA que justifiquen la evaluación de riesgo
4. Árbol de decisión Codex (P1-P4) documentado para cada peligro significativo
5. Límites críticos con referencia normativa exacta (no rangos genéricos)

${buildSourcesBlock()}

FORMATO DE RESPUESTA: JSON puro sin markdown, sin explicaciones, sin \`\`\`json.
El JSON debe seguir EXACTAMENTE la estructura HACCPPlanJSON definida.`

// ─── GENERATE HACCP PLAN ───────────────────────────────────────────────────────
export async function generateHACCPPlan(formData: HACCPFormData): Promise<HACCPPlanJSON> {
  const client = getClient()

  const userPrompt = `Genera un Plan HACCP completo para:

PRODUCTO: ${formData.productName}
CATEGORÍA: ${formData.category}
PROCESO PRINCIPAL: ${formData.process}
NORMA DE CERTIFICACIÓN: ${formData.standard}
VIDA ÚTIL: ${formData.shelf || "No especificada"}
ENVASE: ${formData.packaging || "No especificado"}
CONSUMIDOR FINAL: ${formData.consumer || "No especificado"}
ALÉRGENOS DECLARADOS: ${formData.allergens?.join(", ") || "Ninguno"}

EQUIPO HACCP:
${formData.teamMembers?.map(m => `- ${m.nombre} ${m.apellido} | ${m.puesto}${m.es_lider ? " | LÍDER HACCP" : ""}`).join("\n") || "No especificado"}

ANTECEDENTES DE RECLAMOS / INCIDENTES HISTÓRICOS:
${formData.complaints || "Sin antecedentes reportados"}

NOTAS ADICIONALES: ${formData.additionalNotes || "Ninguna"}

Genera el JSON completo del plan HACCP. Mínimo 8 peligros identificados, todos los CCPs con límites críticos con referencia normativa exacta, mínimo 15 referencias bibliográficas reales.`

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  })

  const text = response.content
    .filter(b => b.type === "text")
    .map(b => (b as any).text)
    .join("")

  const clean = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()

  try {
    return JSON.parse(clean) as HACCPPlanJSON
  } catch {
    // If JSON is malformed, wrap in a basic structure
    throw new Error(`Invalid JSON from AI: ${clean.substring(0, 200)}`)
  }
}

// ─── PLAN LIMITS ──────────────────────────────────────────────────────────────
export const PLAN_LIMITS: Record<string, number> = {
  basic:      2,
  pro:        10,
  enterprise: 9999,
}
