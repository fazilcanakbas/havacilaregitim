"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useState, useEffect } from "react"
import Link from "next/link"

export function HeroSection() {
  const { language, t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  const BRAND_ACCENT = "rgba(11,42,87,0.85)"
  const OVERLAY_LEFT = "rgba(11,42,87,0.85)"
  const OVERLAY_MID = "rgba(11,42,87,0.25)"
  const OVERLAY_RIGHT = "rgba(23,143,131,0.06)"

    const slides = [
      {
        image: "/banner1.jpg",
        titleTr: "Bireyselleştirilmiş Pilot Adayı Eğitimi",
        titleEn: "Personalized Pilot Training",
        descTr: "Kaptan pilotlar ve alanında uzman psikologlar eşliğinde pilot adaylarına özel danışmanlık programları.",
        descEn: "Special counseling programs for pilot candidates, accompanied by captain pilots and expert psychologists in their fields.",
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
    titleTr: "Profesyonel Danışmanlık",
    titleEn: "Professional Consultancy",
    descTr: "Pilot adaylarının seçim süreçlerinde doğru adımlar atabilmeleri için uzman kadromuzla stratejik danışmanlık sağlıyoruz.",
    descEn: "We provide strategic consultancy to help pilot candidates take the right steps during recruitment processes.",
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          preload="metadata"
          src={"/bluebackgraoundvideo.mp4"}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, ${OVERLAY_LEFT} 0%, ${OVERLAY_MID} 45%, ${OVERLAY_RIGHT} 100%)`,
            mixBlendMode: "overlay",
          }}
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
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
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 w-full flex justify-center items-center gap-3 z-20">
        <button onClick={prevSlide} className="text-white hover:scale-110 transition">
          <ChevronLeft className="w-6 h-6" />
        </button>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
        <button onClick={nextSlide} className="text-white hover:scale-110 transition">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  )
}
