import {
  Document, Packer, Paragraph, Table, TableRow, TableCell,
  TextRun, HeadingLevel, AlignmentType, WidthType, BorderStyle,
  ShadingType, Header, Footer, PageNumber, NumberFormat,
} from "docx"
import type { HACCPPlanJSON } from "@/types"

const COLORS = {
  primary: "0EA5E9",
  dark: "0F172A",
  surface: "1E293B",
  muted: "475569",
  success: "4ADE80",
  danger: "EF4444",
  warning: "F59E0B",
  white: "FFFFFF",
  light: "F8FAFC",
  border: "E2E8F0",
}

const heading = (text: string, level: HeadingLevel = HeadingLevel.HEADING_1) =>
  new Paragraph({
    text,
    heading: level,
    spacing: { before: 400, after: 200 },
    border: level === HeadingLevel.HEADING_1 ? {
      bottom: { style: BorderStyle.SINGLE, size: 4, color: COLORS.primary },
    } : undefined,
  })

const body = (text: string, bold = false, color = COLORS.dark) =>
  new Paragraph({
    children: [new TextRun({ text, bold, color, size: 22, font: "Calibri" })],
    spacing: { after: 120 },
  })

const labelValue = (label: string, value: string) =>
  new Paragraph({
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 22, font: "Calibri", color: COLORS.muted }),
      new TextRun({ text: value || "—", size: 22, font: "Calibri" }),
    ],
    spacing: { after: 100 },
  })

const sectionHeader = (text: string) =>
  new Paragraph({
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 20, color: COLORS.primary, font: "Calibri" })],
    spacing: { before: 300, after: 150 },
    shading: { type: ShadingType.SOLID, color: "EFF6FF", fill: "EFF6FF" },
  })

const tableCell = (text: string, header = false, width?: number) =>
  new TableCell({
    children: [new Paragraph({
      children: [new TextRun({ text: text || "—", bold: header, size: header ? 18 : 20, font: "Calibri", color: header ? COLORS.white : COLORS.dark })],
      alignment: AlignmentType.LEFT,
    })],
    shading: header ? { type: ShadingType.SOLID, color: COLORS.primary, fill: COLORS.primary } : undefined,
    width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
  })

// ─── MAIN EXPORT FUNCTION ────────────────────────────────────────────────────
export async function generateDocx(plan: HACCPPlanJSON): Promise<Buffer> {
  const p = plan.producto
  const today = new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" })

  const doc = new Document({
    creator: "SafeTrace — safetrace.app",
    description: `Plan HACCP — ${p.nombre}`,
    title: `Plan HACCP — ${p.nombre}`,
    styles: {
      paragraphStyles: [
        {
          id: "Heading1", name: "Heading 1",
          basedOn: "Normal", next: "Normal",
          run: { size: 32, bold: true, color: COLORS.primary, font: "Calibri" },
          paragraph: { spacing: { before: 400, after: 200 } },
        },
        {
          id: "Heading2", name: "Heading 2",
          basedOn: "Normal", next: "Normal",
          run: { size: 26, bold: true, color: COLORS.dark, font: "Calibri" },
          paragraph: { spacing: { before: 300, after: 150 } },
        },
      ],
    },
    sections: [{
      properties: {
        page: {
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
          pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            children: [
              new TextRun({ text: "PLAN HACCP — ", bold: true, size: 18, color: COLORS.primary, font: "Calibri" }),
              new TextRun({ text: p.nombre.toUpperCase(), bold: true, size: 18, color: COLORS.dark, font: "Calibri" }),
              new TextRun({ text: `    |    ${plan.meta.norma}    |    safetrace.app`, size: 16, color: COLORS.muted, font: "Calibri" }),
            ],
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: COLORS.border } },
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            children: [
              new TextRun({ text: "Generado con SafeTrace • safetrace.app    |    Requiere verificación por profesional habilitado antes de implementación    |    Pág. ", size: 16, color: COLORS.muted, font: "Calibri" }),
              new PageNumber(),
            ],
            alignment: AlignmentType.CENTER,
          })],
        }),
      },
      children: [

        // ── PORTADA ──────────────────────────────────────────────
        new Paragraph({
          children: [new TextRun({ text: "PLAN HACCP", bold: true, size: 64, color: COLORS.primary, font: "Calibri" })],
          alignment: AlignmentType.CENTER,
          spacing: { before: 2000, after: 400 },
        }),
        new Paragraph({
          children: [new TextRun({ text: p.nombre, bold: true, size: 40, color: COLORS.dark, font: "Calibri" })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
        }),
        new Paragraph({
          children: [new TextRun({ text: p.categoria, size: 28, color: COLORS.muted, font: "Calibri" })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [new TextRun({ text: `Norma: ${plan.meta.norma}`, size: 24, color: COLORS.muted, font: "Calibri" })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [new TextRun({ text: `Fecha de generación: ${today}`, size: 24, color: COLORS.muted, font: "Calibri" })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [new TextRun({ text: `Estado: ${plan.meta.estado}`, size: 24, color: COLORS.warning, font: "Calibri", bold: true })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 3000 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Generado con SafeTrace • safetrace.app", size: 20, color: COLORS.muted, font: "Calibri", italics: true })],
          alignment: AlignmentType.CENTER,
          pageBreakBefore: false,
        }),
        new Paragraph({ children: [], pageBreakBefore: true }),

        // ── RESUMEN EJECUTIVO ─────────────────────────────────────
        heading("RESUMEN EJECUTIVO"),
        body(plan.resumen_ejecutivo || "—"),
        new Paragraph({ children: [], pageBreakBefore: true }),

        // ── PASO 1: DESCRIPCIÓN DEL PRODUCTO ─────────────────────
        heading("PASO 1 — DESCRIPCIÓN DEL PRODUCTO"),
        labelValue("Nombre", p.nombre),
        labelValue("Categoría", p.categoria),
        labelValue("Descripción técnica", p.descripcion_tecnica),
        labelValue("Composición / Ingredientes", p.composicion_declarada),
        labelValue("Proceso principal", p.proceso_principal),
        labelValue("Vida útil", p.vida_util),
        labelValue("Envase", p.envase),
        labelValue("Consumidor objetivo", p.consumidor_objetivo),
        labelValue("Uso previsto", p.uso_previsto),
        labelValue("Uso indebido razonable", p.uso_indebido_razonable),
        labelValue("Condiciones de almacenamiento", p.condiciones_almacenamiento),
        labelValue("Modo de distribución", p.modo_distribucion),
        new Paragraph({ children: [], pageBreakBefore: true }),

        // ── PASO 2: EQUIPO HACCP ──────────────────────────────────
        heading("PASO 2 — EQUIPO HACCP"),
        body("Equipo designado según BRCGS Clause 2.2.3 y Codex CAC/RCP 1-1969.", false, COLORS.muted),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                tableCell("Nombre y Apellido", true, 22),
                tableCell("Puesto en la Empresa", true, 22),
                tableCell("Rol en el Plan HACCP", true, 25),
                tableCell("Responsabilidades Específicas", true, 31),
              ],
            }),
            ...(plan.equipo_haccp || []).map((m) =>
              new TableRow({
                children: [
                  tableCell(`${m.nombre_apellido}${m.es_lider ? " ★" : ""}`),
                  tableCell(m.puesto_empresa),
                  tableCell(m.rol_en_plan_haccp),
                  tableCell(m.responsabilidades_especificas?.join("; ") || "—"),
                ],
              })
            ),
          ],
        }),
        new Paragraph({ children: [], pageBreakBefore: true }),

        // ── PASO 6: ANÁLISIS DE PELIGROS ─────────────────────────
        heading("PASO 6 — ANÁLISIS DE PELIGROS"),
        body("Metodología: Evaluación probabilidad × severidad — Codex CAC/RCP 1-1969 Rev.2020.", false, COLORS.muted),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                tableCell("ID", true, 5),
                tableCell("Etapa", true, 14),
                tableCell("Tipo", true, 9),
                tableCell("Peligro", true, 20),
                tableCell("Prob.", true, 7),
                tableCell("Sev.", true, 7),
                tableCell("Signif.", true, 7),
                tableCell("Medida de Control", true, 18),
                tableCell("CCP", true, 7),
                tableCell("Referencia", true, 6),
              ],
            }),
            ...(plan.analisis_peligros || []).map((h) =>
              new TableRow({
                children: [
                  tableCell(h.id),
                  tableCell(h.etapa),
                  tableCell(h.tipo),
                  tableCell(h.peligro),
                  tableCell(h.probabilidad),
                  tableCell(h.severidad),
                  tableCell(h.significativo ? "Sí" : "No"),
                  tableCell(h.medida_control),
                  tableCell(h.es_ccp ? h.ccp_id : "OPRP"),
                  tableCell(h.referencias_bibliograficas?.[0]
                    ? `${h.referencias_bibliograficas[0].autor} (${h.referencias_bibliograficas[0].año})`
                    : "—"),
                ],
              })
            ),
          ],
        }),
        new Paragraph({ children: [], pageBreakBefore: true }),

        // ── PASOS 7–10: CCPs ──────────────────────────────────────
        heading("PASOS 7–10 — PUNTOS CRÍTICOS DE CONTROL (CCPs)"),
        ...(plan.ccps || []).flatMap((ccp) => [
          sectionHeader(`${ccp.id} — ${ccp.etapa}`),
          labelValue("Peligro controlado", ccp.peligro_controlado),
          labelValue("Base científica", ccp.base_cientifica_ccp),
          body("ÁRBOL DE DECISIÓN CODEX:", true, COLORS.primary),
          labelValue("P1 — ¿Existe medida de control?", ccp.justificacion_arbol_decision?.P1_medida_control_existe),
          labelValue("P2 — ¿Diseñada para eliminar/reducir?", ccp.justificacion_arbol_decision?.P2_disenado_para_eliminar),
          labelValue("P3 — ¿Contaminación supera límite aceptable?", ccp.justificacion_arbol_decision?.P3_contaminacion_supera_limite),
          labelValue("P4 — ¿Etapa posterior eliminará el peligro?", ccp.justificacion_arbol_decision?.P4_etapa_posterior_eliminara),
          labelValue("Conclusión", ccp.justificacion_arbol_decision?.conclusion),
          body("LÍMITE CRÍTICO:", true, COLORS.primary),
          labelValue("Límite crítico", ccp.limite_critico),
          labelValue("Referencia normativa exacta", ccp.referencia_normativa_exacta),
          labelValue("Base del límite", ccp.base_limite_critico),
          body("MONITOREO:", true, COLORS.primary),
          labelValue("Parámetro", ccp.parametro_monitoreo),
          labelValue("Frecuencia", ccp.frecuencia),
          labelValue("Método / Instrumento", `${ccp.metodo_monitoreo || ""}${ccp.instrumento ? ` / ${ccp.instrumento}` : ""}`),
          labelValue("Calibración requerida", ccp.calibracion_requerida),
          labelValue("Responsable", ccp.responsable_monitoreo),
          body("ACCIONES CORRECTIVAS (Paso 10):", true, COLORS.danger),
          labelValue("Acción inmediata", ccp.accion_correctiva_inmediata),
          labelValue("Producto afectado", ccp.accion_correctiva_producto),
          labelValue("Responsable", ccp.responsable_accion_correctiva),
          labelValue("Registro asociado", ccp.registro_asociado),
          new Paragraph({ children: [] }),
        ]),
        new Paragraph({ children: [], pageBreakBefore: true }),

        // ── ALÉRGENOS ─────────────────────────────────────────────
        heading("GESTIÓN DE ALÉRGENOS — LEGISLACIÓN MULTI-MERCADO"),
        ...(plan.legislacion_alergenos?.requisitos_por_mercado || []).flatMap((m) => [
          body(`${m.pais_region} — ${m.norma}`, true, COLORS.primary),
          labelValue("Alérgenos declarados", m.alergenos_declarados?.join(", ") || "—"),
          labelValue("Requisito de etiqueta", m.requisito_etiqueta),
        ]),
        new Paragraph({ children: [], pageBreakBefore: true }),

        // ── BIBLIOGRAFÍA ──────────────────────────────────────────
        heading("BIBLIOGRAFÍA CIENTÍFICA"),
        body("Base de investigación del plan HACCP — Requerido por BRCGS Clause 2.2.", false, COLORS.muted),
        ...(plan.bibliografia_cientifica || []).map((ref, i) =>
          new Paragraph({
            children: [
              new TextRun({ text: `[${i + 1}] `, bold: true, size: 20, color: COLORS.primary, font: "Calibri" }),
              new TextRun({ text: `${ref.autores} (${ref.año}). `, bold: true, size: 20, font: "Calibri" }),
              new TextRun({ text: `${ref.titulo}. `, italics: true, size: 20, font: "Calibri" }),
              new TextRun({ text: `${ref.fuente_editorial}.`, size: 20, font: "Calibri" }),
              ...(ref.doi_url ? [new TextRun({ text: ` ${ref.doi_url}`, size: 18, color: COLORS.primary, font: "Calibri" })] : []),
            ],
            spacing: { after: 150 },
          })
        ),
        new Paragraph({ children: [], pageBreakBefore: true }),

        // ── REGISTROS ─────────────────────────────────────────────
        heading("PASO 12 — SISTEMA DE DOCUMENTACIÓN Y REGISTROS"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                tableCell("Código", true, 12),
                tableCell("Nombre del Registro", true, 28),
                tableCell("CCP Vinculado", true, 12),
                tableCell("Frecuencia", true, 18),
                tableCell("Retención mínima", true, 15),
                tableCell("Responsable", true, 15),
              ],
            }),
            ...(plan.registros || []).map((r) =>
              new TableRow({
                children: [
                  tableCell(r.codigo),
                  tableCell(r.nombre),
                  tableCell(r.ccp_vinculado || "—"),
                  tableCell(r.frecuencia_completado),
                  tableCell(r.retencion_minima),
                  tableCell(r.responsable_archivo),
                ],
              })
            ),
          ],
        }),
        new Paragraph({ children: [], spacing: { after: 800 } }),
        new Paragraph({
          children: [new TextRun({ text: "DISCLAIMER: Este plan fue generado con SafeTrace (safetrace.app) como herramienta de asistencia técnica con IA. Requiere verificación y validación por un profesional habilitado en inocuidad alimentaria antes de su implementación y presentación en auditoría. SafeTrace no reemplaza la consultoría profesional.", size: 18, italics: true, color: COLORS.muted, font: "Calibri" })],
          alignment: AlignmentType.CENTER,
        }),
      ],
    }],
  })

  return await Packer.toBuffer(doc)
}
