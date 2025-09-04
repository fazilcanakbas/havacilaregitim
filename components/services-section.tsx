"use client"

import { useState, useEffect } from "react"
import {
  BookOpen,
  User,
  Target,
  Users,
  Award,
  MessageSquare,
  Briefcase,
  ClipboardCheck,
  Star,
  Globe,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import type { ServiceItem } from "@/lib/api/serviceService"
import { listServices } from "@/lib/api/serviceService"

export function ServicesSection() {
  const { language, t } = useLanguage()

  const [services, setServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [hover, setHover] = useState(false)

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)

    listServices({ limit: 6, status: "active" })
      .then((data) => {
        if (!mounted) return
        const arr = Array.isArray(data) ? data : []
        const activeOnly = arr.filter(
          (s) => (s as any)?.status === "active" || (s as any)?.isActive === true
        )
        setServices(activeOnly)
      })
      .catch((err) => {
        console.error("Failed to load services", err)
        if (!mounted) return
        setError("Hizmetler yüklenirken hata oluştu.")
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  // language pickers
  const pickFeatures = (item: ServiceItem) => {
    if (language === "tr") {
      return item.features && item.features.length ? item.features : item.featuresEn || []
    }
    return item.featuresEn && item.featuresEn.length ? item.featuresEn : item.features || []
  }

  // Icons list (lucide-react components)
  const ICON_LIST = [
    BookOpen,
    User,
    Target,
    Users,
    Award,
    MessageSquare,
    Briefcase,
    ClipboardCheck,
    Star,
    Globe,
    CheckCircle,
  ]

  // deterministic icon picker (stable per service._id if available)
  const pickIcon = (service: ServiceItem, index: number) => {
    const list = ICON_LIST
    if (service._id) {
      let sum = 0
      for (let i = 0; i < service._id.length; i++) {
        sum = (sum + service._id.charCodeAt(i)) | 0
      }
      return list[Math.abs(sum) % list.length]
    }
    return list[index % list.length]
  }

  /*
    Inline color palette chosen to match the header:
    - headerBg: same dark/navy used in header background (#12213a...)
    - brand: a complementary blue used for primary accents/buttons
    - brandLight / brandBorder: translucent variants for icon backgrounds / borders
    These are applied inline (no Tailwind / globals dependency).
  */
  const headerBg = "#12213a" // header background used earlier
  const brand = "#1b1b56ff" // primary accent (blue-teal) chosen to sit well with header
  const brandForeground = "#ffffff"
  const brandLight = "rgba(15,120,165,0.08)" // subtle icon bg
  const brandBorder = "rgba(15,120,165,0.16)"
  const bulletColor = brand
  const ctaBg = brand
  const ctaText = brandForeground
  const titleDefaultColor = "#0f1720" // dark title color
  const titleHoverColor = brand

  return (
    <section
      className="py-20"
      style={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <BookOpen className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">{t("services.badge")}</span>
          </div>

          <h2
            style={{
              fontSize: "2rem",
              lineHeight: 1.1,
              fontWeight: 800,
              color: titleDefaultColor,
              marginBottom: 16,
            }}
            className="font-inter"
          >
            {t("services.title")}
          </h2>

          <p
            style={{ fontSize: 18, color: "#6b7280", maxWidth: 768, marginLeft: "auto", marginRight: "auto" }}
            className="font-dm-sans"
          >
            {t("services.subtitle")}
          </p>
        </div>

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-56 rounded-lg bg-white shadow-md animate-pulse" />
            ))}
          </div>
        )}

        {!loading && error && <div className="text-center text-red-600 mb-8">{error}</div>}

        {!loading && !error && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const title =
                  language === "tr"
                    ? service.title || service.titleEn || "—"
                    : service.titleEn || service.title || "—"

                const description =
                  language === "tr"
                    ? service.description || service.descriptionEn || ""
                    : service.descriptionEn || service.description || ""

                const features = pickFeatures(service)

                const slug = service.slug || service._id || `service-${index}`

                const Icon = pickIcon(service, index)

                const isHovered = hoveredIndex === index

                // Inline styles for the icon container and CTA; change subtly on hover
                const iconContainerStyle: React.CSSProperties = {
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  backgroundColor: isHovered ? brand : brandLight,
                  color: isHovered ? brandForeground : brand,
                  transition: "background-color 160ms ease, color 160ms ease",
                }

                const ctaStyle: React.CSSProperties = isHovered
                  ? {
                      width: "100%",
                      backgroundColor: ctaBg,
                      color: ctaText,
                      borderRadius: 8,
                      padding: "0.75rem 1rem",
                      border: `1px solid ${ctaBg}`,
                      transition: "background-color 160ms ease, color 160ms ease",
                      fontWeight: 600,
                    }
                  : {
                      width: "100%",
                      backgroundColor: "transparent",
                      color: ctaBg,
                      borderRadius: 8,
                      padding: "0.75rem 1rem",
                      border: `1px solid ${ctaBg}`,
                      transition: "background-color 160ms ease, color 160ms ease",
                      fontWeight: 600,
                    }

                const cardTitleStyle: React.CSSProperties = {
                  color: isHovered ? titleHoverColor : titleDefaultColor,
                }

                return (
                  <Card
                    key={service._id || slug}
                    className="group transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ overflow: "visible" }}
                  >
                    <CardHeader className="pb-4">
                      <div style={iconContainerStyle}>
                        <Icon style={{ width: 24, height: 24 }} />
                      </div>

                      <CardTitle style={cardTitleStyle} className="text-xl font-bold font-inter">
                        {title}
                      </CardTitle>
                      <CardDescription style={{ color: "#6b7280" }} className="font-dm-sans">
                        {description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {features && features.length ? (
                          features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-sm">
                              <div style={{ width: 6, height: 6, borderRadius: 9999, backgroundColor: bulletColor, marginRight: 12 }} />
                              <span style={{ color: "#4b5563" }}>{feature}</span>
                            </div>
                          ))
                        ) : (
                          <div style={{ color: "#6b7280" }}>—</div>
                        )}
                      </div>

                      <div style={{ marginTop: 16 }}>
                        <Button asChild style={ctaStyle}>
                          <Link href={`/hizmetlerimiz/${slug}`}>{t("services.cta")}</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="text-center mt-12">
              <Link href={"/hizmetlerimiz"}>
                <Button
      size="lg"
      variant="outline"
      className="font-dm-sans"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        color: hover ? "#fff" : brand,
        borderColor: brand,
        backgroundColor: hover ? brand : "transparent",
        padding: "0.75rem 1.25rem",
        borderRadius: 8,
        fontWeight: 600,
      }}
    >
                  {t("services.viewAll")}
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}