"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Linkedin, Mail, Phone, MapPin, Youtube } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"
import { getContact, type ContactInfo } from "@/lib/api/contactService"
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
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)

  useEffect(() => {
    let mounted = true

    async function fetchServices() {
      try {
        const res = (await apiFetch(`/api/services?limit=8&isActive=true`, { method: "GET" })) as ServiceItem[] | null
        if (mounted && Array.isArray(res)) {
          setServices(res.slice(0, 8))
        }
      } catch (err) {
        console.error("Failed to fetch services for footer:", err)
      }
    }

    async function fetchContact() {
      try {
        const data = await getContact()
        if (mounted) setContactInfo(data)
      } catch (err) {
        console.error("Failed to fetch contact info:", err)
      }
    }

    fetchServices()
    fetchContact()

    return () => {
      mounted = false
    }
  }, [])

  const fallbackPrograms = [
    { href: "/hizmetlerimiz/mulakat-teknikleri-danismanligi", label: language === "tr" ? "Mülakat Teknikleri Danışmanlığı" : "Interview Techniques Consultancy" },
    { href: "/hizmetlerimiz/bireysel-danismanlik", label: language === "tr" ? "Bireysel Danışmanlık" : "Individual Counseling" },
    { href: "/hizmetlerimiz/crm-bireysel", label: language === "tr" ? "CRM Bireysel Mülakat Simülasyonu" : "Individual CRM Interview Simulation" },
    { href: "/hizmetlerimiz/crm-grup-mulakati", label: language === "tr" ? "CRM Grup Mülakat Simülasyonu" : "Group CRM Interview Simulation" },
    { href: "/hizmetlerimiz/kurul-mulakat", label: language === "tr" ? "Kurul Mülakat Simülasyonu" : "Board Interview Simulation" },
    { href: "/hizmetlerimiz/ucus-simulasyonu", label: language === "tr" ? "Uçuş Simülasyonu" : "Flight Simulation" },
  ]

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "#06142bff",
        borderTopColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-4 gap-4">
          {/* Logo & Sosyal */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center">
              <div className="relative w-70 h-20">
                <Image
                  src="/havacilaregitimtextwhite.png"
                  alt="HAVACILAR EĞİTİM A.Ş."
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <p className="text-white/70 font-dm-sans">{t("footer.description")}</p>

            <div className="flex space-x-4">
              {contactInfo?.socialMedia?.instagram && (
                <Link href={`https://instagram.com/${contactInfo.socialMedia.instagram}`} target="_blank">
                  <Button size="sm" variant="outline" className="p-2 bg-transparent border-white/20 text-white">
                    <Instagram className="w-4 h-4" />
                  </Button>
                </Link>
              )}
              {contactInfo?.socialMedia?.linkedin && (
                <Link href={`https://linkedin.com/company/${contactInfo.socialMedia.linkedin}`} target="_blank">
                  <Button size="sm" variant="outline" className="p-2 bg-transparent border-white/20 text-white">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </Link>
              )}
              {contactInfo?.socialMedia?.youtube && (
                <Link href={`https://youtube.com/${contactInfo.socialMedia.youtube}`} target="_blank">
                  <Button size="sm" variant="outline" className="p-2 bg-transparent border-white/20 text-white">
                    <Youtube className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 lg:ml-28">
            <h4 className="font-semibold text-white font-inter">{t("footer.quickLinks")}</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-white/75 hover:text-primary transition-colors font-dm-sans"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
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
                        href={`/hizmetlerimiz${href}`}
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
              {contactInfo?.phone && (
                <div className="flex items-center space-x-3 text-white/75">
                  <Phone className="w-4 h-4" />
                  <span className="font-dm-sans">{contactInfo.phone}</span>
                </div>
              )}
              {contactInfo?.email && (
                <div className="flex items-center space-x-3 text-white/75">
                  <Mail className="w-4 h-4" />
                  <span className="font-dm-sans">{contactInfo.email}</span>
                </div>
              )}
              {contactInfo?.address && (
  <div className="flex items-start space-x-3 text-white/75">
    <MapPin className="w-12 h-12 mt-0" />
    <span className="font-dm-sans">
      {language === "tr"
        ? contactInfo.address
        : contactInfo.addressEn || contactInfo.address}
    </span>
  </div>
)}

            </div>

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

        <div className="border-t" style={{ borderTopColor: "rgba(255,255,255,0.06)" }}>
          <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <Link href="https://www.bloomomedya.com" target="_blank" className="mb-4 md:mb-0">
              <p className="text-white/70 font-dm-sans text-sm">{t("footer.copyright")}</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
