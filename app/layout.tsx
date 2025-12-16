import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { AuthProvider } from "@/context/AuthContext"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Vox Edge Media - Creators Are Made Here",
  description:
    "Vox Edge Media: Premium podcast and video production studio in Bangalore. Professional equipment, expert team, and seamless workflow for creators, founders, and brands.",
  generator: "v0.app",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="studio-theme">
          <ReduxProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
            <Analytics />
            <Toaster />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
