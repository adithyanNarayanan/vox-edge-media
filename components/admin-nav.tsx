"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Calendar, MessageSquare, LogOut, Mic, CreditCard, Settings, Users } from "lucide-react"
import { useAppDispatch } from "@/lib/redux/hooks"
import { logoutUser } from "@/lib/redux/slices/authSlice"

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Services", href: "/admin/services", icon: Mic },
    { name: "Plans", href: "/admin/plans", icon: CreditCard },
    { name: "Studio", href: "/admin/studio", icon: Settings },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  ]

  const handleLogout = async () => {
    await dispatch(logoutUser())
    router.push("/")
    router.refresh()
  }

  return (
    <nav className="w-64 border-r border-border bg-secondary/50 min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <Link href="/" className="text-2xl font-display font-bold">
          Studio Admin
        </Link>
      </div>

      <div className="flex-1 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>

      <Button onClick={handleLogout} variant="outline" className="w-full bg-transparent">
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </nav>
  )
}
