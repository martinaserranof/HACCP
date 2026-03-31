import Parser from "rss-parser"
import { createServiceClient } from "@/lib/supabase/server"

const parser = new Parser()

// ─── FDA RSS FEED ─────────────────────────────────────────────────────────────
const FDA_RECALL_RSS = "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/rss.xml"

// ─── FOOD CATEGORIES MAP ─────────────────────────────────────────────────────
// Maps free-text to normalized category for matching against haccp_plans
const FOOD_KEYWORDS: Record<string, string[]> = {
  "Carne y aves procesadas": ["poultry", "chicken", "beef", "meat", "turkey", "pork", "aves", "pollo", "carne"],
  "Lácteos y derivados": ["dairy", "milk", "cheese", "yogurt", "butter", "cream", "queso", "leche"],
  "Bebidas": ["beverage", "juice", "drink", "water", "soda", "bebida", "jugo"],
  "Panadería y pastelería": ["bread", "bakery", "pastry", "cake", "cookie", "biscuit", "pan", "galleta"],
  "Salsas y condimentos": ["sauce", "dressing", "condiment", "salsa", "aderezo"],
  "Frutas y verduras frescas / IV gama": ["produce", "vegetable", "fruit", "salad", "leafy", "verdura", "fruta"],
  "Pescado y mariscos": ["fish", "seafood", "shrimp", "salmon", "tuna", "shellfish", "pescado", "marisco"],
  "Snacks y aperitivos": ["snack", "chip", "cracker", "nut", "snacks"],
  "Confitería y chocolates": ["candy", "chocolate", "confection", "sweet", "caramel"],
  "Conservas y enlatados": ["canned", "preserved", "conserva", "enlatado"],
}

function detectCategory(text: string): string {
  const lower = text.toLowerCase()
  for (const [category, keywords] of Object.entries(FOOD_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) return category
  }
  return "General"
}

function detectRiskClass(text: string): "I" | "II" | "III" {
  const lower = text.toLowerCase()
  if (lower.includes("class i") || lower.includes("clase i")) return "I"
  if (lower.includes("class ii") || lower.includes("clase ii")) return "II"
  return "III"
}

// ─── SCAN FDA ────────────────────────────────────────────────────────────────
export async function scanFDARecalls(): Promise<number> {
  const supabase = createServiceClient()
  let inserted = 0

  try {
    const feed = await parser.parseURL(FDA_RECALL_RSS)

    for (const item of feed.items.slice(0, 50)) {
      const title = item.title || ""
      const content = item.contentSnippet || item.content || ""
      const combined = `${title} ${content}`

      // Skip non-food items
      if (!combined.toLowerCase().match(/food|drink|beverage|aliment/)) continue

      const category = detectCategory(combined)
      const riskClass = detectRiskClass(combined)

      const { error } = await supabase.from("recall_alerts").upsert(
        {
          source: "FDA",
          country: "USA",
          product_category: category,
          product_name: title.slice(0, 500),
          cause: content.slice(0, 1000),
          risk_class: riskClass,
          source_url: item.link,
          raw_data: { title, content: item.contentSnippet, pubDate: item.pubDate },
          detected_at: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
        },
        { onConflict: "source_url" }
      )

      if (!error) inserted++
    }
  } catch (err) {
    console.error("FDA scan error:", err)
  }

  return inserted
}

// ─── MATCH RECALLS TO PLANS ──────────────────────────────────────────────────
export async function matchRecallsToPlans(): Promise<void> {
  const supabase = createServiceClient()

  // Get recent recalls (last 30 days)
  const { data: recalls } = await supabase
    .from("recall_alerts")
    .select("*")
    .gte("detected_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

  if (!recalls?.length) return

  // Get all active plans (Pro + Enterprise only get alerts)
  const { data: plans } = await supabase
    .from("haccp_plans")
    .select("id, category, user_id")
    .eq("status", "ready")

  if (!plans?.length) return

  for (const recall of recalls) {
    for (const plan of plans) {
      // Simple category match
      const isRelevant =
        recall.product_category === plan.category ||
        recall.product_category === "General"

      if (!isRelevant) continue

      const relevanceScore = recall.product_category === plan.category ? 85 : 40

      await supabase.from("plan_alerts").upsert(
        {
          plan_id: plan.id,
          recall_id: recall.id,
          relevance_score: relevanceScore,
          relevance_reason: `Recall de categoría "${recall.product_category}" detectado en ${recall.source}`,
        },
        { onConflict: "plan_id,recall_id" }
      )
    }
  }
}
