"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AdminNav } from "@/components/admin-nav"
import { useAppSelector } from "@/lib/redux/hooks"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth)
  const [isAuthorized, setIsAuthorized] = useState(false)

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
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
