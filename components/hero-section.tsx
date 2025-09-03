"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, Award, Plane, BookOpenCheck } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { useState, useEffect } from "react"
import Link from "next/link"

export function HeroSection() {
  const { language, t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [videoEnded, setVideoEnded] = useState(false) // ikinci seçenek için

  // Renkler (örnek)
  const BRAND_NAVY = "#0b2a57"
  const BRAND_ACCENT = "rgba(11,42,87,0.85)"
  const OVERLAY_LEFT = "rgba(11,42,87,0.85)"
  const OVERLAY_MID = "rgba(11,42,87,0.25)"
  const OVERLAY_RIGHT = "rgba(23,143,131,0.06)"

  const stats = [
    { icon: Users, number: "500+", labelKey: "hero.stats.graduates" },
    { icon: Award, number: "15+", labelKey: "hero.stats.experience" },
    { icon: BookOpenCheck, number: "20+", labelKey: "hero.stats.aircraft" },
  ]

  return (
    <section className="relative w-full">
      <div className="relative w-full">
        <video
          className="w-full h-[115vh] object-cover"
          autoPlay
          loop={true}
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
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      <div className="w-full relative">
        <img
          src="https://bracketweb.com/jetlywp/wp-content/uploads/2023/01/feature-1-bg-1.png"
          alt="Feature background"
          className="w-full block relative z-10"
          style={{
            padding: "0px 0 0px",
            backgroundColor: "rgba(11, 28, 61, 1)",
          }}
        />

        {/* Plane wrapper: yatayda her ekranda ortalanmış, bottom değeri korundu */}
        <div className="plane-wrapper" aria-hidden>
          <img
            src="https://bracketweb.com/jetlywp/wp-content/uploads/2023/01/feature-one-shape-1.png"
            alt=""
            className="floating-plane"
          />
        </div>

        {/* Shadow wrapper: yine yatayda ortalanmış, bottom değeri korundu */}
        <div className="shadow-wrapper" aria-hidden>
          <img
            src="https://bracketweb.com/jetlywp/wp-content/uploads/2023/01/feature-one-shadow.png"
            alt=""
            className="floating-shadow"
          />
        </div>
      </div>

      {/* component scope içinde küçük keyframes tanımı (Next.js styled-jsx kullanımı) */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0);
          }
        }

        /* Wrapper'lar ekran genişliğine bakmadan yatayda ortalar */
        .plane-wrapper,
        .shadow-wrapper {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 20;
          display: block;
        }

        /* Orijinal bottom değerleri korunuyor (px cinsinden sabit) */
        .plane-wrapper {
          bottom: 280px;
        }
        .shadow-wrapper {
          bottom: 200px;
          mix-blend-mode: multiply;
        }

        /* Önemli: global img { max-width: 100% } gibi kuralların
           bu uçak/gölge resimlerini küçültmesini engellemek için
           natural boyutlarını zorla kullanıyoruz (öncelik için !important kullandık).
           Böylece resim dosyalarının kendi doğal boyutları korunur. */
        .floating-plane,
        .floating-shadow {
          display: block;
          width: auto !important;
          height: auto !important;
          max-width: none !important;
          max-height: none !important;
          line-height: 0;
        }

        .floating-plane {
          animation: float 2s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  )
}