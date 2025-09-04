"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, Award, Plane, ChevronLeft, ChevronRight, BookOpenCheck } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { useState, useEffect } from "react"
import Link from "next/link"

export function HeroSection() {
  const { language, t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  // Harmonized palette (derived from logo + top gradient in the screenshot)
  const BRAND_NAVY = "#ffffffff"   // logo / deep navy
  const BRAND_ACCENT = "rgba(11,42,87,0.85)" // CTA / teal that works with the sky background
  const OVERLAY_LEFT = "rgba(11,42,87,0.85)"
  const OVERLAY_MID = "rgba(11,42,87,0.25)"
  const OVERLAY_RIGHT = "rgba(23,143,131,0.06)"

  const slides = [
    {
      image: "/banner1.jpg",
      titleTr: "Bireyselleştirilmiş Pilot Adayı Eğitimi",
      titleEn: "Personalized Pilot Training",
      descTr: "Uzman kaptan pilotlar ve psikologlar eşliğinde adaylara özel eğitim programları",
      descEn: "Tailored training programs for candidates guided by expert captains and psychologists",
    },
    {
      image: "/banner2.jpg",
      titleTr: "Mülakat ve CRM Simülasyonları",
      titleEn: "Interview & CRM Simulations",
      descTr: "Gerçek mülakat ortamlarını simüle eden programlarla teknik ve davranışsal yetkinlik geliştirme",
      descEn: "Enhancing technical and behavioral competencies through real interview simulations",
    },
    {
      image: "/banner3.jpg",
      titleTr: "Profesyonellik ve Sektöre Yön Verme",
      titleEn: "Professionalism & Industry Leadership",
      descTr: "Havacılık standartlarını belirleyen eğitimlerle sektörde fark yaratan pilotlar yetiştiriyoruz",
      descEn: "Training pilots who make a difference in the industry through aviation-standard programs",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const stats = [
    { icon: Users, number: "500+", labelKey: "hero.stats.graduates" },
    { icon: Award, number: "15+", labelKey: "hero.stats.experience" },
    { icon: BookOpenCheck, number: "20+", labelKey: "hero.stats.aircraft" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* background video / image */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          src={'/egitimsitevideo.mp4'}
        />

        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, ${OVERLAY_LEFT} 0%, ${OVERLAY_MID} 45%, ${OVERLAY_RIGHT} 100%)`,
            mixBlendMode: "overlay",
          }}
        />

        {/* subtle dark veil for contrast on text */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              {/* <div
                className="inline-flex items-center px-4 py-2 rounded-full"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)", 
                  border: `1px solid rgba(255, 255, 255, 0.16)`,
                }}
              >
                <Plane className="w-4 h-4 mr-2" style={{ color: BRAND_NAVY }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: BRAND_NAVY }}
                >
                  {t("hero.badge")}
                </span>
              </div> */}

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg"
                style={{ color: "#ffffff" }}
              >
                {language === "tr" ? slides[currentSlide].titleTr : slides[currentSlide].titleEn}
              </h1>

              <p
                className="text-lg sm:text-xl max-w-2xl drop-shadow-md"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {language === "tr" ? slides[currentSlide].descTr : slides[currentSlide].descEn}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/hizmetlerimiz">
                <Button

                size="lg"
                className="group"
                style={{
                  backgroundColor: BRAND_ACCENT,
                  color: "#fff",
                  border: "none",
                  boxShadow: "0 6px 18px rgba(23,143,131,0.18)",
                }}
              >
                {t("hero.cta.start")}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
             </Link>
              {/* secondary action (example) */}
              {/* <Button
                size="lg"
                className="group"
                style={{
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: `1px solid rgba(255,255,255,0.12)`,
                  backdropFilter: "blur(6px)",
                }}
             
              >
                <Play className="w-4 h-4 mr-2" />
                {t("hero.cta.video")}
              </Button> */}
            </div>

            {/* Optional Stats - harmonized visuals */}
            {/* <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-2"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      color: BRAND_NAVY,
                    }}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold drop-shadow-md" style={{ color: "#fff" }}>
                    {stat.number}
                  </div>
                  <div className="text-sm drop-shadow-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {t(stat.labelKey)}
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Right Column could show big logo or illustration if needed */}
          {/* <div className="hidden lg:flex items-center justify-center">
            
            <div style={{ maxWidth: 520, width: "100%", opacity: 0.95 }}>
              <Image src="/logo-large.png" alt="Logo" width={520} height={520} className="object-contain" priority />
            </div>
          </div> */}
        </div>
      </div>

      {/* pagination / nav dots (kept commented for simplicity) */}
    </section>
  )
}