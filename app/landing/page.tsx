"use client"
// Landing page — full version in safetrace-landing.jsx artifact
// This is the Next.js App Router page wrapper
import dynamic from "next/dynamic"

// Lazy-load the full landing component to keep bundle small
const Landing = dynamic(() => import("@/components/landing/SafeTraceLanding"), { ssr: false })

export default function LandingPage() {
  return <Landing />
}
