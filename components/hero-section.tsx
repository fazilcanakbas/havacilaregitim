"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, Award, Plane, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { useState, useEffect } from "react"

export function HeroSection() {
  const { language, t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/banner1.jpg",
      titleTr: "Pilot Eğitimi",
      titleEn: "Pilot Training",
      descTr: "Profesyonel pilot olmak için gereken tüm eğitimler",
      descEn: "All training required to become a professional pilot",
    },
    {
      image: "/banner2.jpg",
      titleTr: "Simülatör Eğitimi",
      titleEn: "Simulator Training",
      descTr: "En son teknoloji simülatörlerle güvenli eğitim",
      descEn: "Safe training with latest technology simulators",
    },
    {
      image: "/banner3.jpg",
      titleTr: "Teorik Eğitim",
      titleEn: "Theoretical Education",
      descTr: "Kapsamlı teorik bilgi ve sertifikasyon programları",
      descEn: "Comprehensive theoretical knowledge and certification programs",
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
    { icon: Plane, number: "50+", labelKey: "hero.stats.aircraft" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
  {slides.map((slide, index) => (
    <div
      key={index}
      className={`absolute inset-0 transition-opacity duration-1000 ${
        index === currentSlide ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={slide.image || "/placeholder.svg"}
        alt="Havacılık Eğitimi"
        fill
        className="object-cover"
        priority={index === 0}
      />
    </div>
  ))}
  <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-background/20 to-background/10" />
  
  <div className="absolute inset-0 bg-black/50 pointer-events-none" />
</div>

      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"    
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button> */}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Plane className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">{t("hero.badge")}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                {language === "tr" ? slides[currentSlide].titleTr : slides[currentSlide].titleEn}
              </h1>

              <p className="text-lg sm:text-xl text-white/90 max-w-2xl drop-shadow-md">
                {language === "tr" ? slides[currentSlide].descTr : slides[currentSlide].descEn}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                {t("hero.cta.start")}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Play className="w-4 h-4 mr-2" />
                {t("hero.cta.video")}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white mb-2">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-white drop-shadow-md">{stat.number}</div>
                  <div className="text-sm text-white/80 drop-shadow-sm">{t(stat.labelKey)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  )
}
