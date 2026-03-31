import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/landing")

  return (
    <div className="min-h-screen bg-bg">
      {/* Sidebar + Nav — to be expanded */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg border-b border-border h-14 flex items-center px-6 gap-4">
        <span className="font-display text-xl tracking-widest text-primary">SAFETRACE</span>
        <span className="text-xs text-muted font-mono tracking-wider">DASHBOARD</span>
      </nav>
      <main className="pt-14">{children}</main>
    </div>
  )
}
