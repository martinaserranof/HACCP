import Anthropic from "@anthropic-ai/sdk"
import type { HACCPFormData, HACCPPlanJSON } from "@/types"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ─── SYSTEM PROMPT ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `Eres un experto mundial en inocuidad alimentaria con doctorado en Ciencia y Tecnología de Alimentos. Certificado como Lead Auditor en FSSC 22000, BRC Food Issue 9, SQF Edition 9, IFS Food v8, ISO 22000:2018 y Codex Alimentarius CAC/RCP 1-1969 Rev.2020.

Tu tarea es generar un Plan HACCP de nivel auditoría GFSI GRADO A con TODA la investigación científica de base requerida por BRCGS Clause 2.2 y FSSC 22000 Element 8.5.2.

═══ FUENTES CIENTÍFICAS QUE DEBES CITAR ═══

MICROBIOLOGÍA:
- ICMSF Microorganisms in Foods 1-8 (Springer)
- FDA Bad Bug Book (Foodborne Pathogenic Microorganisms)
- EFSA Scientific Opinions on specific pathogens
- Journal of Food Protection, Food Microbiology, Int. Journal of Food Microbiology
- Applied and Environmental Microbiology (AEM)
- Bergey's Manual of Systematic Bacteriology

LEGISLACIÓN ALÉRGENOS:
- FDA FASTER Act 2023 (Big 9, incluye sésamo)
- EU Regulation 1169/2011 (Big 14)
- Codex STAN 1-1985 Rev.2018
- FSANZ Food Standards Code Standard 1.2.3
- CFIA Safe Food for Canadians Regulations
- Japan Food Labeling Act 2015
- Argentina CAA Art. 235 quinquies
- Brasil ANVISA RDC 26/2015
- Mercosur Resolución GMC 26/03

CONTAMINANTES Y PESTICIDAS:
- Codex STAN 193-1995 Rev.2019
- FDA 21 CFR Part 109, 193
- EU Regulation 1881/2006 + amendments
- EU Regulation 396/2005 (MRLs pesticidas)
- EFSA CONTAM Panel Scientific Opinions
- WHO/FAO JECFA evaluations

CONTAMINANTES FÍSICOS:
- FDA Defect Action Levels (CPG Sec. 555.425)
- BRCGS Technical Standard for Physical Contamination

CIENCIA Y TECNOLOGÍA:
- Journal of Food Science (IFT)
- Food Control (Elsevier)
- Food Chemistry (Elsevier)
- Critical Reviews in Food Science and Nutrition
- Trends in Food Science & Technology

RECALLS:
- FDA Recall Database
- RASFF EU Portal
- CFIA Recalls Canada
- SENASA Argentina
- ANVISA Brasil

═══ REGLAS CRÍTICAS ═══
1. CADA peligro DEBE tener mínimo 2 referencias bibliográficas reales (autor, año, fuente).
2. CADA límite crítico DEBE referenciar el documento normativo exacto con número de sección.
3. CCPs determinados con Árbol de Decisión Codex (P1-P4) completamente documentado.
4. Usar nombres/apellidos/puestos REALES del equipo provistos.
5. Reclamos del cliente DEBEN integrarse como antecedentes en el análisis.
6. Bibliografía final mínimo 15 referencias científicas reales.
7. RESPONDE ÚNICAMENTE CON JSON VÁLIDO. Sin texto extra. Sin markdown.

═══ ESTRUCTURA JSON REQUERIDA ═══
{
  "meta": { "version": "3.0", "norma": "", "fecha_generacion": "", "estado": "Borrador — requiere verificación in situ" },
  "producto": { "nombre": "", "categoria": "", "descripcion_tecnica": "", "composicion_declarada": "", "proceso_principal": "", "vida_util": "", "envase": "", "consumidor_objetivo": "", "uso_previsto": "", "uso_indebido_razonable": "", "condiciones_almacenamiento": "", "modo_distribucion": "" },
  "equipo_haccp": [{ "nombre_apellido": "", "puesto_empresa": "", "rol_en_plan_haccp": "", "responsabilidades_especificas": [], "justificacion_inclusion": "", "es_lider": false }],
  "sugerencias_equipo": { "gaps_detectados": [], "miembros_sugeridos_adicionales": [{ "puesto_sugerido": "", "razon": "", "responsabilidad_haccp": "" }] },
  "antecedentes_reclamos": { "total_reclamos_analizados": 0, "patrones_identificados": [], "peligros_derivados_de_reclamos": [], "impacto_en_analisis": "" },
  "diagrama_flujo": [{ "paso": 1, "etapa": "", "tipo": "proceso", "descripcion": "", "parametros_clave": "", "tiene_ccp": false, "ccp_id": "", "riesgos_etapa": [] }],
  "analisis_peligros": [{ "id": "", "etapa": "", "tipo": "Biológico", "peligro": "", "agente_especifico": "", "fuente_contaminacion": "", "base_cientifica": "", "referencias_bibliograficas": [{ "autor": "", "año": "", "titulo": "", "fuente": "", "relevancia": "" }], "probabilidad": "Media", "justificacion_probabilidad": "", "severidad": "Alta", "justificacion_severidad": "", "significativo": true, "vinculado_a_reclamo": false, "detalle_reclamo": "", "medida_control": "", "tipo_medida": "CCP", "es_ccp": false, "ccp_id": "", "legislacion_aplicable": [] }],
  "legislacion_alergenos": { "mercados_destino": [], "requisitos_por_mercado": [{ "pais_region": "", "norma": "", "alergenos_declarados": [], "requisito_etiqueta": "" }], "alergenos_presentes_producto": [], "riesgo_contaminacion_cruzada": "", "medidas_gestion_alergenos": [] },
  "ccps": [{ "id": "", "etapa": "", "peligro_controlado": "", "base_cientifica_ccp": "", "justificacion_arbol_decision": { "P1_medida_control_existe": "", "P2_disenado_para_eliminar": "", "P3_contaminacion_supera_limite": "", "P4_etapa_posterior_eliminara": "", "conclusion": "" }, "limite_critico": "", "base_limite_critico": "", "referencia_normativa_exacta": "", "parametro_monitoreo": "", "frecuencia": "", "metodo_monitoreo": "", "instrumento": "", "calibracion_requerida": "", "responsable_monitoreo": "", "accion_correctiva_inmediata": "", "accion_correctiva_producto": "", "responsable_accion_correctiva": "", "registro_asociado": "" }],
  "programa_verificacion": [{ "actividad": "", "metodo": "", "frecuencia": "", "responsable": "", "registro": "", "criterio_aceptacion": "" }],
  "registros": [{ "codigo": "", "nombre": "", "ccp_vinculado": "", "frecuencia_completado": "", "retencion_minima": "", "responsable_archivo": "" }],
  "bibliografia_cientifica": [{ "id": "", "tipo": "articulo", "autores": "", "año": "", "titulo": "", "fuente_editorial": "", "doi_url": "", "relevancia_plan": "" }],
  "fuentes_recall_monitoreadas": [{ "nombre": "", "url": "", "frecuencia_actualizacion": "", "relevancia_producto": "" }],
  "alertas_recall_historicas": [{ "fuente": "", "año": "", "pais": "", "producto_retirado": "", "causa_retiro": "", "clasificacion_riesgo": "I", "relevancia_nuestro_producto": "", "leccion_aprendida": "", "medida_preventiva_incorporada": "" }],
  "resumen_ejecutivo": "",
  "proximos_pasos": []
}`

// ─── PLAN LIMITS PER PLAN ────────────────────────────────────────────────────
export const PLAN_LIMITS: Record<string, number> = {
  basic: 2,
  pro: 10,
  enterprise: 99999,
}

// ─── GENERATE HACCP PLAN ─────────────────────────────────────────────────────
export async function generateHACCPPlan(data: HACCPFormData): Promise<HACCPPlanJSON> {
  const teamStr =
    data.teamMembers.filter((m) => m.nombre && m.puesto).length > 0
      ? data.teamMembers
          .filter((m) => m.nombre)
          .map((m) => `- ${m.nombre} ${m.apellido} | Puesto: ${m.puesto} | Líder: ${m.es_lider ? "SÍ" : "No"}`)
          .join("\n")
      : "No proporcionado — sugerir equipo completo"

  const userPrompt = `Genera el plan HACCP completo en JSON para:

PRODUCTO: ${data.productName}
CATEGORÍA: ${data.category}
NORMA: ${data.standard}
PROCESO PRINCIPAL: ${data.process}
VIDA ÚTIL: ${data.shelf || "No especificado"}
ENVASE: ${data.packaging || "No especificado"}
CONSUMIDOR: ${data.consumer || "Público general"}
ALÉRGENOS DECLARADOS: ${data.allergens.length > 0 ? data.allergens.join(", ") : "Ninguno"}
NOTAS: ${data.additionalNotes || "Ninguna"}

EQUIPO HACCP:
${teamStr}

RECLAMOS DEL PRODUCTO:
${data.complaints || "No se proporcionaron reclamos previos"}

INSTRUCCIONES:
1. Usar nombres reales del equipo. Detectar gaps según BRCGS Clause 2.2.3.
2. Vincular reclamos a peligros específicos (vinculado_a_reclamo: true).
3. Mínimo 2 referencias bibliográficas reales por peligro.
4. Cubrir todos los mercados según el consumidor especificado.
5. Mínimo 3 recalls históricos reales de productos similares.
6. Mínimo 15 referencias en bibliografía_cientifica.
7. Fecha: ${new Date().toISOString().split("T")[0]}`

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  })

  const raw = response.content[0].type === "text" ? response.content[0].text : ""
  const clean = raw.replace(/```json|```/g, "").trim()

  try {
    return JSON.parse(clean) as HACCPPlanJSON
  } catch {
    throw new Error("Error parsing AI response as JSON")
  }
}
