import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Sans } from "next/font/google"
import "./globals.css"
import { ConditionalNavigation } from "@/components/conditional-navigation"
import { LanguageProvider } from "@/lib/language-context"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "HAVACILAR EĞİTİM A.Ş. - Havacılık Eğitimi",
  description: "Modern havacılık eğitimi ve profesyonel pilot yetiştirme programları",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${dmSans.variable} antialiased`}>
      <body className="font-sans">
        <LanguageProvider>
          <ConditionalNavigation />
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  )
}
