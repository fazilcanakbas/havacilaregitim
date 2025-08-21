"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { language, t } = useLanguage()

  const quickLinks = [
    { href: "/hakkimizda", label: language === "tr" ? "Hakkımızda" : "About Us" },
    { href: "/hizmetlerimiz", label: language === "tr" ? "Hizmetlerimiz" : "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/duyurular", label: language === "tr" ? "Duyurular" : "Announcements" },
    { href: "/iletisim", label: language === "tr" ? "İletişim" : "Contact" },
  ]

  const programs = [
    { href: "/ppl", label: language === "tr" ? "Özel Pilot Lisansı (PPL)" : "Private Pilot License (PPL)" },
    { href: "/cpl", label: language === "tr" ? "Ticari Pilot Lisansı (CPL)" : "Commercial Pilot License (CPL)" },
    {
      href: "/atpl",
      label: language === "tr" ? "Havayolu Pilot Eğitimi (ATPL)" : "Airline Transport Pilot License (ATPL)",
    },
    { href: "/ifr", label: language === "tr" ? "Enstrüman Uçuş Eğitimi" : "Instrument Flight Rules (IFR)" },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src="https://havacilaregitim.com/wp-content/uploads/2025/08/logoo.jpeg"
                  alt="HAVACILAR EĞİTİM A.Ş."
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground font-inter">{t("footer.company")}</h3>
                <p className="text-sm text-muted-foreground font-dm-sans">{t("footer.tagline")}</p>
              </div>
            </Link>

            <p className="text-muted-foreground font-dm-sans">{t("footer.description")}</p>

            <div className="flex space-x-4">
              <Button size="sm" variant="outline" className="p-2 bg-transparent">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2 bg-transparent">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground font-inter">{t("footer.quickLinks")}</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors font-dm-sans"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Programs */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground font-inter">{t("footer.programs")}</h4>
            <nav className="space-y-3">
              {programs.map((program) => (
                <Link
                  key={program.href}
                  href={program.href}
                  className="block text-muted-foreground hover:text-primary transition-colors font-dm-sans"
                >
                  {program.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground font-inter">{t("footer.contact")}</h4>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span className="font-dm-sans">+90 212 XXX XX XX</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="font-dm-sans">info@havacilaregitim.com</span>
              </div>
              <div className="flex items-start space-x-3 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-1" />
                <span className="font-dm-sans">İstanbul, Türkiye</span>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-medium text-foreground font-inter">{t("footer.newsletter")}</h5>
              <div className="flex space-x-2">
                <Input placeholder={t("footer.newsletterPlaceholder")} className="flex-1" />
                <Button size="sm">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground font-dm-sans text-sm">{t("footer.copyright")}</p>

          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="/gizlilik" className="text-muted-foreground hover:text-primary text-sm font-dm-sans">
              {language === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
            </Link>
            <Link href="/kullanim" className="text-muted-foreground hover:text-primary text-sm font-dm-sans">
              {language === "tr" ? "Kullanım Şartları" : "Terms of Use"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
