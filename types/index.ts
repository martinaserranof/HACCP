// ─── App Types ────────────────────────────────────────────────────────────────

export type Plan = "basic" | "pro" | "enterprise"

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  company: string | null
  plan: Plan
  plans_used_this_month: number
  stripe_customer_id: string | null
  created_at: string
}

export interface TeamMember {
  id?: string
  nombre: string
  apellido: string
  puesto: string
  es_lider: boolean
}

export interface HACCPFormData {
  productName: string
  category: string
  standard: string
  process: string
  allergens: string[]
  shelf: string
  packaging: string
  consumer: string
  additionalNotes: string
  teamMembers: TeamMember[]
  complaints: string
  complaintFileName?: string
}

// ─── HACCP Plan JSON output ───────────────────────────────────────────────────

export interface HACCPPlanJSON {
  meta: {
    version: string
    norma: string
    fecha_generacion: string
    estado: string
  }
  producto: {
    nombre: string
    categoria: string
    descripcion_tecnica: string
    composicion_declarada: string
    proceso_principal: string
    vida_util: string
    envase: string
    consumidor_objetivo: string
    uso_previsto: string
    uso_indebido_razonable: string
    condiciones_almacenamiento: string
    modo_distribucion: string
  }
  equipo_haccp: EquipoMember[]
  sugerencias_equipo: {
    gaps_detectados: string[]
    miembros_sugeridos_adicionales: SugerenciaMiembro[]
  }
  antecedentes_reclamos: {
    total_reclamos_analizados: number
    patrones_identificados: string[]
    peligros_derivados_de_reclamos: string[]
    impacto_en_analisis: string
  }
  diagrama_flujo: FlowStep[]
  analisis_peligros: Hazard[]
  legislacion_alergenos: AllergenLegislation
  ccps: CCP[]
  programa_verificacion: VerificationItem[]
  registros: Record[]
  bibliografia_cientifica: Reference[]
  fuentes_recall_monitoreadas: RecallSource[]
  alertas_recall_historicas: RecallAlert[]
  resumen_ejecutivo: string
  proximos_pasos: string[]
}

export interface EquipoMember {
  nombre_apellido: string
  puesto_empresa: string
  rol_en_plan_haccp: string
  responsabilidades_especificas: string[]
  justificacion_inclusion: string
  es_lider: boolean
}

export interface SugerenciaMiembro {
  puesto_sugerido: string
  razon: string
  responsabilidad_haccp: string
}

export interface FlowStep {
  paso: number
  etapa: string
  tipo: "proceso" | "control" | "decision" | "almacenamiento"
  descripcion: string
  parametros_clave: string
  tiene_ccp: boolean
  ccp_id: string
  riesgos_etapa: string[]
}

export interface Hazard {
  id: string
  etapa: string
  tipo: "Biológico" | "Químico" | "Físico" | "Alérgeno"
  peligro: string
  agente_especifico: string
  fuente_contaminacion: string
  base_cientifica: string
  referencias_bibliograficas: BibReference[]
  probabilidad: "Alta" | "Media" | "Baja"
  justificacion_probabilidad: string
  severidad: "Alta" | "Media" | "Baja"
  justificacion_severidad: string
  significativo: boolean
  vinculado_a_reclamo: boolean
  detalle_reclamo: string
  medida_control: string
  tipo_medida: "CCP" | "OPRP" | "PPR"
  es_ccp: boolean
  ccp_id: string
  legislacion_aplicable: string[]
}

export interface BibReference {
  autor: string
  año: string
  titulo: string
  fuente: string
  relevancia: string
}

export interface AllergenLegislation {
  mercados_destino: string[]
  requisitos_por_mercado: AllergenMarket[]
  alergenos_presentes_producto: string[]
  riesgo_contaminacion_cruzada: string
  medidas_gestion_alergenos: string[]
}

export interface AllergenMarket {
  pais_region: string
  norma: string
  alergenos_declarados: string[]
  requisito_etiqueta: string
}

export interface CCP {
  id: string
  etapa: string
  peligro_controlado: string
  base_cientifica_ccp: string
  justificacion_arbol_decision: {
    P1_medida_control_existe: string
    P2_disenado_para_eliminar: string
    P3_contaminacion_supera_limite: string
    P4_etapa_posterior_eliminara: string
    conclusion: string
  }
  limite_critico: string
  base_limite_critico: string
  referencia_normativa_exacta: string
  parametro_monitoreo: string
  frecuencia: string
  metodo_monitoreo: string
  instrumento: string
  calibracion_requerida: string
  responsable_monitoreo: string
  accion_correctiva_inmediata: string
  accion_correctiva_producto: string
  responsable_accion_correctiva: string
  registro_asociado: string
}

export interface VerificationItem {
  actividad: string
  metodo: string
  frecuencia: string
  responsable: string
  registro: string
  criterio_aceptacion: string
}

export interface Record {
  codigo: string
  nombre: string
  ccp_vinculado: string
  frecuencia_completado: string
  retencion_minima: string
  responsable_archivo: string
}

export interface Reference {
  id: string
  tipo: "libro" | "articulo" | "norma" | "guideline" | "base_datos"
  autores: string
  año: string
  titulo: string
  fuente_editorial: string
  doi_url: string
  relevancia_plan: string
}

export interface RecallSource {
  nombre: string
  url: string
  frecuencia_actualizacion: string
  relevancia_producto: string
}

export interface RecallAlert {
  fuente: string
  año: string
  pais: string
  producto_retirado: string
  causa_retiro: string
  clasificacion_riesgo: "I" | "II" | "III"
  relevancia_nuestro_producto: string
  leccion_aprendida: string
  medida_preventiva_incorporada: string
}

// ─── DB row types ─────────────────────────────────────────────────────────────

export interface HACCPPlanRow {
  id: string
  user_id: string
  product_name: string
  category: string
  standard: string
  status: "generating" | "ready" | "error"
  json_data: HACCPPlanJSON | null
  version: number
  created_at: string
  updated_at: string
}

export interface RecallAlertRow {
  id: string
  source: string
  country: string
  product_category: string
  cause: string
  risk_class: "I" | "II" | "III"
  raw_data: object
  detected_at: string
}
