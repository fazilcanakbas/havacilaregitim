"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api/client"

export function Footer() {
  const { language, t } = useLanguage()

  const quickLinks = [
    { href: "/hakkimizda", label: language === "tr" ? "Hakkımızda" : "About Us" },
    { href: "/hizmetlerimiz", label: language === "tr" ? "Hizmetlerimiz" : "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/duyurular", label: language === "tr" ? "Duyurular" : "Announcements" },
    { href: "/iletisim", label: language === "tr" ? "İletişim" : "Contact" },
  ]

  type ServiceItem = {
    _id?: string
    slug?: string
    title?: string
    titleEn?: string
  }

  const [services, setServices] = useState<ServiceItem[]>([])

  useEffect(() => {
    let mounted = true
    async function fetchServices() {
      try {
        const res = (await apiFetch(`/api/services?limit=4&isActive=true`, { method: "GET" })) as ServiceItem[] | null
        if (mounted && Array.isArray(res)) {
          setServices(res.slice(0, 4))
        }
      } catch (err) {
        console.error("Failed to fetch services for footer:", err)
      }
    }

    fetchServices()

    return () => {
      mounted = false
    }
  }, [])

  const fallbackPrograms = [
    { href: "/ppl", label: language === "tr" ? "Özel Pilot Lisansı (PPL)" : "Private Pilot License (PPL)" },
    { href: "/cpl", label: language === "tr" ? "Ticari Pilot Lisansı (CPL)" : "Commercial Pilot License (CPL)" },
    { href: "/atpl", label: language === "tr" ? "Havayolu Pilot Eğitimi (ATPL)" : "Airline Transport Pilot License (ATPL)" },
    { href: "/ifr", label: language === "tr" ? "Enstrüman Uçuş Eğitimi" : "Instrument Flight Rules (IFR)" },
  ]

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "#06142bff",
        borderTopColor: "rgba(255,255,255,0.06)",
      }}
    >
      {/* arttırılmış dikey padding -> bülten alanı ile alt çizgi arasına daha fazla boşluk koyar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info - sadece logo gösterilecek (metin kaldırıldı) */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center">
              <div className="relative w-70 h-20"> {/* logo için uygun boyut */}
                <Image
                  src="/havacilaregitimtextwhite.png"
                  alt="HAVACILAR EĞİTİM A.Ş."
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Açıklamayı korumak isterseniz burayı bırakabilirsiniz; isterseniz kaldırırım */}
            <p className="text-white/70 font-dm-sans">
              {t("footer.description")}
            </p>

            <div className="flex space-x-4">
              <Button size="sm" variant="outline" className="p-2 bg-transparent border-white/20 text-white">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2 bg-transparent border-white/20 text-white">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-white font-inter">{t("footer.quickLinks")}</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/hizmetler${link.href}`}
                  className="block text-white/75 hover:text-primary transition-colors font-dm-sans"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services (daha önce Programs idi) */}
          <div className="space-y-6">
            {/* Burayı sabit metin yaptım; çeviri anahtarınız yoksa bu en güvenilir yol */}
            <h4 className="font-semibold text-white font-inter">
              {language === "tr" ? "Hizmetlerimiz" : "Services"}
            </h4>
            <nav className="space-y-3">
              {services.length > 0
                ? services.map((srv) => {
                    const slug = srv.slug || ""
                    const label = language === "tr" ? (srv.title || slug) : (srv.titleEn || srv.title || slug)
                    const href = slug ? (slug.startsWith("/") ? slug : `/${slug}`) : "#"
                    return (
                      <Link
                        key={srv._id || slug || Math.random().toString(36).slice(2)}
                        href={href}
                        className="block text-white/75 hover:text-primary transition-colors font-dm-sans"
                      >
                        {label}
                      </Link>
                    )
                  })
                : fallbackPrograms.map((program) => (
                    <Link
                      key={program.href}
                      href={program.href}
                      className="block text-white/75 hover:text-primary transition-colors font-dm-sans"
                    >
                      {program.label}
                    </Link>
                  ))}
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h4 className="font-semibold text-white font-inter">{t("footer.contact")}</h4>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/75">
                <Phone className="w-4 h-4" />
                <span className="font-dm-sans">+90 212 XXX XX XX</span>
              </div>
              <div className="flex items-center space-x-3 text-white/75">
                <Mail className="w-4 h-4" />
                <span className="font-dm-sans">info@havacilaregitim.com</span>
              </div>
              <div className="flex items-start space-x-3 text-white/75">
                <MapPin className="w-4 h-4 mt-1" />
                <span className="font-dm-sans">İstanbul, Türkiye</span>
              </div>
            </div>

            {/* Bülten alanı: placeholder rengi beyaz olacak şekilde güncellendi */}
            <div className="space-y-3 mb-8">
              <h5 className="font-medium text-white font-inter">{t("footer.newsletter")}</h5>
              <div className="flex items-center space-x-2">
                <Input
                     style={{ color: "white" }}
                  placeholder={t("footer.newsletterPlaceholder")}
                  className="flex-1 bg-white/5 placeholder-white border border-white/10 h-12"
                  aria-label={t("footer.newsletterPlaceholder")}
             
                />
                <Button
                  size="sm"
                  className="bg-white/10 hover:bg-white/20 text-white rounded-md p-3 flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* alt bölüm: alt çizgi rengi hafif beyaz bırakıldı, logo yazısı kaldırıldığı için boşluk dengesi sağlandı */}
        <div className="border-t" style={{ borderTopColor: "rgba(255,255,255,0.06)" }}>
          <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 font-dm-sans text-sm">{t("footer.copyright")}</p>

            {/* <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link href="/gizlilik" className="text-white/75 hover:text-primary text-sm font-dm-sans">
                {language === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
              </Link>
              <Link href="/kullanim" className="text-white/75 hover:text-primary text-sm font-dm-sans">
                {language === "tr" ? "Kullanım Şartları" : "Terms of Use"}
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}