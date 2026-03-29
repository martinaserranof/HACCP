import ExcelJS from "exceljs"
import type { HACCPPlanJSON } from "@/types"

const COLORS = {
  primary: "FF0EA5E9",
  dark: "FF0F172A",
  success: "FF4ADE80",
  danger: "FFEF4444",
  warning: "FFFFF59E0B",
  muted: "FF94A3B8",
  light: "FFF8FAFC",
  white: "FFFFFFFF",
  headerBio: "FFFEE2E2",
  headerQui: "FFFEF3C7",
  headerFis: "FFF1F5F9",
  headerAle: "FFF5F3FF",
}

export async function generateXlsx(plan: HACCPPlanJSON): Promise<Buffer> {
  const wb = new ExcelJS.Workbook()
  wb.creator = "SafeTrace — safetrace.app"
  wb.created = new Date()

  // ── Sheet 1: Hazard Analysis ───────────────────────────────────
  const wsHazards = wb.addWorksheet("Análisis de Peligros", {
    pageSetup: { orientation: "landscape", fitToPage: true },
  })

  wsHazards.columns = [
    { header: "ID", key: "id", width: 8 },
    { header: "Etapa del Proceso", key: "etapa", width: 22 },
    { header: "Tipo de Peligro", key: "tipo", width: 14 },
    { header: "Peligro Identificado", key: "peligro", width: 32 },
    { header: "Agente Específico", key: "agente", width: 24 },
    { header: "Probabilidad", key: "prob", width: 13 },
    { header: "Severidad", key: "sev", width: 13 },
    { header: "Significativo", key: "sig", width: 13 },
    { header: "Medida de Control", key: "medida", width: 32 },
    { header: "Tipo Medida", key: "tipo_medida", width: 10 },
    { header: "CCP ID", key: "ccp_id", width: 10 },
    { header: "Ref. Bibliográfica", key: "ref", width: 28 },
    { header: "Legislación", key: "leg", width: 24 },
  ]

  // Style header row
  const headerRow = wsHazards.getRow(1)
  headerRow.font = { bold: true, color: { argb: COLORS.white }, size: 10 }
  headerRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0369A1" } }
  headerRow.height = 28
  headerRow.alignment = { vertical: "middle", wrapText: true }

  // Add data
  for (const h of plan.analisis_peligros || []) {
    const row = wsHazards.addRow({
      id: h.id,
      etapa: h.etapa,
      tipo: h.tipo,
      peligro: h.peligro,
      agente: h.agente_especifico,
      prob: h.probabilidad,
      sev: h.severidad,
      sig: h.significativo ? "SÍ" : "No",
      medida: h.medida_control,
      tipo_medida: h.tipo_medida,
      ccp_id: h.ccp_id || "—",
      ref: h.referencias_bibliograficas?.[0]
        ? `${h.referencias_bibliograficas[0].autor} (${h.referencias_bibliograficas[0].año})`
        : "—",
      leg: h.legislacion_aplicable?.join("; ") || "—",
    })

    row.alignment = { vertical: "top", wrapText: true }

    // Color by type
    const typeColors: Record<string, string> = {
      Biológico: COLORS.headerBio,
      Químico: COLORS.headerQui,
      Físico: COLORS.headerFis,
      Alérgeno: COLORS.headerAle,
    }
    const bg = typeColors[h.tipo] || COLORS.light
    row.fill = { type: "pattern", pattern: "solid", fgColor: { argb: bg } }

    // Color significance
    const sigCell = row.getCell("sig")
    sigCell.font = { bold: h.significativo, color: { argb: h.significativo ? COLORS.danger : COLORS.muted } }

    // Color probability/severity
    const colorLevel = (level: string) =>
      level === "Alta" ? COLORS.danger : level === "Media" ? COLORS.warning : COLORS.success

    row.getCell("prob").font = { color: { argb: colorLevel(h.probabilidad) }, bold: true }
    row.getCell("sev").font = { color: { argb: colorLevel(h.severidad) }, bold: true }
  }

  // Add borders to all cells
  wsHazards.eachRow((row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin", color: { argb: "FFCBD5E1" } },
        left: { style: "thin", color: { argb: "FFCBD5E1" } },
        bottom: { style: "thin", color: { argb: "FFCBD5E1" } },
        right: { style: "thin", color: { argb: "FFCBD5E1" } },
      }
    })
  })

  // ── Sheet 2: CCPs Summary ─────────────────────────────────────
  const wsCCPs = wb.addWorksheet("CCPs")
  wsCCPs.columns = [
    { header: "CCP ID", key: "id", width: 10 },
    { header: "Etapa", key: "etapa", width: 20 },
    { header: "Peligro Controlado", key: "peligro", width: 30 },
    { header: "Límite Crítico", key: "limite", width: 28 },
    { header: "Referencia Normativa", key: "norma", width: 28 },
    { header: "Frecuencia Monitoreo", key: "freq", width: 20 },
    { header: "Responsable Monitoreo", key: "resp", width: 20 },
    { header: "Acción Correctiva Inmediata", key: "ac", width: 32 },
    { header: "Registro Asociado", key: "reg", width: 20 },
  ]

  const ccpHeader = wsCCPs.getRow(1)
  ccpHeader.font = { bold: true, color: { argb: COLORS.white }, size: 10 }
  ccpHeader.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDC2626" } }
  ccpHeader.height = 28

  for (const ccp of plan.ccps || []) {
    const row = wsCCPs.addRow({
      id: ccp.id,
      etapa: ccp.etapa,
      peligro: ccp.peligro_controlado,
      limite: ccp.limite_critico,
      norma: ccp.referencia_normativa_exacta,
      freq: ccp.frecuencia,
      resp: ccp.responsable_monitoreo,
      ac: ccp.accion_correctiva_inmediata,
      reg: ccp.registro_asociado,
    })
    row.alignment = { vertical: "top", wrapText: true }
    row.getCell("id").font = { bold: true, color: { argb: "FFDC2626" } }
    row.getCell("limite").font = { bold: true }
  }

  wsCCPs.eachRow((row) => {
    row.eachCell((cell) => {
      cell.border = { top: { style: "thin", color: { argb: "FFCBD5E1" } }, left: { style: "thin", color: { argb: "FFCBD5E1" } }, bottom: { style: "thin", color: { argb: "FFCBD5E1" } }, right: { style: "thin", color: { argb: "FFCBD5E1" } } }
    })
  })

  // ── Sheet 3: Record Templates ─────────────────────────────────
  for (const record of (plan.registros || []).slice(0, 6)) {
    const ws = wb.addWorksheet(record.codigo)

    // Header
    const titleRow = ws.addRow([record.nombre])
    titleRow.getCell(1).font = { bold: true, size: 14, color: { argb: "FF0EA5E9" } }
    titleRow.getCell(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFEFF6FF" } }
    ws.mergeCells("A1:G1")

    ws.addRow([`Código: ${record.codigo}`, "", `CCP: ${record.ccp_vinculado || "N/A"}`, "", `Retención: ${record.retencion_minima}`, "", `Responsable: ${record.responsable_archivo}`])

    ws.addRow([]) // spacer

    // Column headers
    const colRow = ws.addRow(["Fecha", "Hora", "Lote / Turno", "Resultado / Medición", "Límite", "Conforme", "Acción Correctiva", "Firma Operador", "Firma Supervisor"])
    colRow.font = { bold: true, color: { argb: COLORS.white }, size: 10 }
    colRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0369A1" } }
    colRow.height = 24

    // 20 empty rows for manual entry
    for (let i = 0; i < 20; i++) {
      const row = ws.addRow(["", "", "", "", "", "", "", "", ""])
      row.height = 22
      row.eachCell((cell) => {
        cell.border = { top: { style: "thin", color: { argb: "FFCBD5E1" } }, left: { style: "thin", color: { argb: "FFCBD5E1" } }, bottom: { style: "thin", color: { argb: "FFCBD5E1" } }, right: { style: "thin", color: { argb: "FFCBD5E1" } } }
      })
    }

    ws.columns = [
      { width: 12 }, { width: 8 }, { width: 14 }, { width: 22 },
      { width: 14 }, { width: 10 }, { width: 24 }, { width: 14 }, { width: 14 },
    ]
  }

  const buffer = await wb.xlsx.writeBuffer()
  return Buffer.from(buffer)
}
