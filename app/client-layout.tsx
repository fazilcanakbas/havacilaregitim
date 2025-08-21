"use client"

import type React from "react"
import { Navigation } from "@/components/navigation"
import { LanguageProvider } from "@/lib/language-context"

function ConditionalNavigation() {
  const { usePathname } = require("next/navigation")
  const pathname = usePathname()

  // Don't show navigation on admin routes
  if (pathname?.startsWith("/admin")) {
    return null
  }

  return <Navigation />
}

export function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={`antialiased`}>
      <body className="font-sans">
        <LanguageProvider>
          <ConditionalNavigation />
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  )
}
