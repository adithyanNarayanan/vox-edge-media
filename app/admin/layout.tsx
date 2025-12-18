"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AdminNav } from "@/components/admin-nav"
import { useAppSelector } from "@/lib/redux/hooks"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Skip protection for login page
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthorized(true)
      return
    }

    if (!loading) {
      if (!isAuthenticated || user?.role !== 'admin') {
        router.push("/admin/login")
      } else {
        setIsAuthorized(true)
      }
    }
  }, [isAuthenticated, user, loading, router, isLoginPage])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  // If on login page, render without standard admin layout structure
  if (isLoginPage) {
    return <main className="flex-1">{children}</main>
  }

  // If not authorized yet (and not login page), don't render anything (or spinner)
  if (!isAuthorized) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background">
        <span className="text-xl font-display font-bold">Studio Admin</span>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <AdminNav
              className="h-full p-6 border-none"
              onLinkClick={() => setIsMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <AdminNav />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
    </div>
  )
}
