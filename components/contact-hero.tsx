"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import React from "react"

export function ContactHero() {
  const { language, t } = useLanguage()

  const NAVY = "#0b2a4a"
  const NAVY_BG = "rgba(11,42,74,0.08)"
  const NAVY_BORDER = "rgba(11,42,74,0.12)"

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full mb-6 transition-colors"
            style={{ backgroundColor: NAVY_BG, border: `1px solid ${NAVY_BORDER}` }}
          >
            <Mail className="w-4 h-4 mr-2" style={{ color: NAVY }} />
            <span className="text-sm font-medium" style={{ color: NAVY }}>
              {t("contact.badge")}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-inter mb-6">
            {t("contact.title")}
          </h1>

          <p className="text-lg text-muted-foreground font-dm-sans mb-12 max-w-2xl mx-auto">{t("contact.subtitle")}</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors bg-[rgba(11,42,74,0.08)] group-hover:bg-[#0b2a4a]"
                aria-hidden
              >
                <Phone className="w-8 h-8 text-[#0b2a4a] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground font-inter mb-2">{t("contact.phone")}</h3>
              <p className="text-muted-foreground font-dm-sans">+90 212 XXX XX XX</p>
            </div>

            <div className="text-center group">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors bg-[rgba(11,42,74,0.08)] group-hover:bg-[#0b2a4a]"
                aria-hidden
              >
                <Mail className="w-8 h-8 text-[#0b2a4a] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground font-inter mb-2">{t("contact.email")}</h3>
              <p className="text-muted-foreground font-dm-sans">info@havacilaregitim.com</p>
            </div>

            <div className="text-center group">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors bg-[rgba(11,42,74,0.08)] group-hover:bg-[#0b2a4a]"
                aria-hidden
              >
                <MapPin className="w-8 h-8 text-[#0b2a4a] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground font-inter mb-2">{t("contact.address")}</h3>
              <p className="text-muted-foreground font-dm-sans">İstanbul, Türkiye</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}