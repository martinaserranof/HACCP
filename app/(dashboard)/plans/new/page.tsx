"use client"
import dynamic from "next/dynamic"
const HACCPEngine = dynamic(() => import("@/components/haccp/HACCPEngine"), { ssr: false })

export default function NewPlanPage() {
  return <HACCPEngine />
}
