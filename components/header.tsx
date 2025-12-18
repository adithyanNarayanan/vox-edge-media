"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, User as UserIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/context/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Studios", href: "/studios" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ]

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-4">
      <header className="w-full max-w-7xl rounded-full border border-white/10 bg-background/40 backdrop-blur-xl shadow-2xl transition-all duration-300">
        {/* Abstract Background within the Pill */}
        <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden pointer-events-none -z-10">
          <img
            src="/header-bg.png?v=2"
            alt="header background"
            className="w-full h-full object-cover opacity-30 dark:opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50" />
        </div>

        <nav className="relative px-6 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 font-display font-bold text-lg hover:opacity-80 transition-opacity">
              <img src="/logo5.png" alt="Vox Edge Media Logo" className="h-10 w-auto md:h-14" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-2">
            <div className="flex items-center gap-1 bg-black/20 rounded-full px-3 py-1.5 mr-6 border border-white/5 backdrop-blur-sm">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-5 py-2 text-sm font-medium text-white/90 hover:text-[hsl(24,100%,50%)] hover:bg-white/10 rounded-full transition-all duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 pl-2">
              <ThemeToggle />
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-11 w-11 rounded-full ring-2 ring-white/10 hover:ring-[hsl(24,100%,50%)]/50 transition-all p-0 overflow-hidden">
                      <Avatar className="h-full w-full">
                        <AvatarImage src={user.photoURL} alt={user.displayName} />
                        <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 mt-2 p-2 rounded-2xl border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal p-2">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold leading-none">{user.displayName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem asChild className="rounded-xl focus:bg-secondary">
                      <Link href="/booking" className="cursor-pointer">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>My Bookings</span>
                      </Link>
                    </DropdownMenuItem>
                    {user.role === 'admin' && (
                      <DropdownMenuItem asChild className="rounded-xl focus:bg-secondary">
                        <Link href="/admin" className="cursor-pointer">
                          <UserIcon className="mr-2 h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem onClick={handleLogout} className="rounded-xl text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild className="rounded-full px-8 py-6 h-auto text-base font-semibold shadow-lg bg-white text-black hover:bg-[hsl(24,100%,50%)] hover:text-white transition-all duration-300 border-none">
                  <Link href="/login">Sign In</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-white/10 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </Button>
          </div>
        </nav>
      </header>

      {/* Floating Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-24 left-4 right-4 md:hidden z-40">
          <div className="bg-background/90 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300">
            <div className="p-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-xl transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="p-4 bg-secondary/20 border-t border-white/5 space-y-3">
              {user ? (
                <>
                  <div className="flex items-center gap-4 px-2 py-2">
                    <Avatar className="h-10 w-10 ring-2 ring-white/10">
                      <AvatarImage src={user.photoURL} alt={user.displayName} />
                      <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{user.displayName}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button asChild variant="outline" className="w-full rounded-xl">
                      <Link href="/booking">Bookings</Link>
                    </Button>
                    {user.role === 'admin' && (
                      <Button asChild variant="outline" className="w-full rounded-xl">
                        <Link href="/admin">Admin</Link>
                      </Button>
                    )}
                  </div>
                  <Button onClick={handleLogout} variant="destructive" className="w-full rounded-xl mt-2">
                    Log out
                  </Button>
                </>
              ) : (
                <Button asChild className="w-full rounded-xl h-12 text-base font-semibold shadow-lg">
                  <Link href="/login">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
