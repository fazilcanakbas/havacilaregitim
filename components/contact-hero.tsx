"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import React, { useEffect, useState } from "react"
import { getContact, type ContactInfo } from "@/lib/api/contactService"

export function ContactHero() {
  const { language, t } = useLanguage()
  const [contact, setContact] = useState<ContactInfo | null>(null)

  const NAVY = "#0b2a4a"
  const NAVY_BG = "rgba(11,42,74,0.08)"
  const NAVY_BORDER = "rgba(11,42,74,0.12)"

  useEffect(() => {
    getContact()
      .then(setContact)
      .catch((err) => console.error("Contact fetch error:", err))
  }, [])

  return (
    <section
      className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px] mt-0 lg:mt-18 pt-8 lg:pt-12 pb-12 overflow-hidden"
      style={{
        backgroundImage: "url('/egitimbanner.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center bottom',
        backgroundAttachment: 'fixed'
      }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(12,25,45,0.65) 0%, rgba(12,25,45,0.35) 40%, rgba(12,25,45,0.15) 100%)'
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className="inline-flex items-center px-5 py-2.5 rounded-full mb-8 backdrop-blur-sm transition-colors border border-white/25 bg-white/10"
          >
            <Mail className="w-4 h-4 mr-2 text-white" />
            <span className="text-sm font-medium text-white tracking-wide">
              {t("contact.badge")}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-inter mb-6 drop-shadow-md text-white">
            {t("contact.title")}
          </h1>

          <p className="text-lg lg:text-xl font-dm-sans mb-14 max-w-2xl mx-auto text-white/90 leading-relaxed">
            {t("contact.subtitle")}
          </p>

          {contact && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 group-hover:shadow-lg">
                  <Phone className="w-8 h-8 text-white group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="font-semibold font-inter mb-2 text-white/90 group-hover:text-white transition-colors">{t("contact.phone")}</h3>
                <p className="font-dm-sans text-white/70 group-hover:text-white/85 transition-colors">{contact.phone}</p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 group-hover:shadow-lg">
                  <Mail className="w-8 h-8 text-white group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="font-semibold font-inter mb-2 text-white/90 group-hover:text-white transition-colors">{t("contact.email")}</h3>
                <p className="font-dm-sans text-white/70 group-hover:text-white/85 transition-colors">{contact.email}</p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 group-hover:shadow-lg">
                  <MapPin className="w-8 h-8 text-white group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="font-semibold font-inter mb-2 text-white/90 group-hover:text-white transition-colors">{t("contact.address")}</h3>
                <p className="font-dm-sans text-white/70 group-hover:text-white/85 transition-colors">{contact.address}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
