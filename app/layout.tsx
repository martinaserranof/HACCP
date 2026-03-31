import type { Metadata } from "next"
import { DM_Mono, DM_Sans } from "next/font/google"
import "./globals.css"

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "SafeTrace — Food Safety Intelligence",
  description: "El primer generador de planes HACCP con IA que cita bibliografía científica real. Listo para auditoría GFSI en 60 segundos.",
  keywords: ["HACCP", "plan HACCP", "inocuidad alimentaria", "FSSC 22000", "BRC", "SQF", "food safety", "GFSI"],
  openGraph: {
    title: "SafeTrace — Planes HACCP con IA",
    description: "Genera tu plan HACCP completo en 60 segundos. FSSC 22000, BRC, SQF, IFS.",
    url: "https://safetrace.app",
    siteName: "SafeTrace",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeTrace — Food Safety Intelligence",
    description: "Genera tu plan HACCP completo en 60 segundos.",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${dmMono.variable} ${dmSans.variable}`}>
      <body className="bg-bg text-slate-300 font-sans antialiased">{children}</body>
    </html>
  )
}
