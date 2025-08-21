"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ContactHero() {
  const { language, t } = useLanguage()

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Mail className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">{t("contact.badge")}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-inter mb-6">
            {t("contact.title")}
          </h1>

          <p className="text-lg text-muted-foreground font-dm-sans mb-12 max-w-2xl mx-auto">{t("contact.subtitle")}</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-foreground font-inter mb-2">{t("contact.phone")}</h3>
              <p className="text-muted-foreground font-dm-sans">+90 212 XXX XX XX</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-foreground font-inter mb-2">{t("contact.email")}</h3>
              <p className="text-muted-foreground font-dm-sans">info@havacilaregitim.com</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <MapPin className="w-8 h-8" />
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
