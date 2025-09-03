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
          className="w-full h-[90vh] object-cover"
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

        {/* Yüzen (hafif aşağı-yukarı animasyonlu) resim */}
        <img
          src="https://bracketweb.com/jetlywp/wp-content/uploads/2023/01/feature-one-shape-1.png"
          alt=""
          className="absolute z-20 left-8"
          style={{
            pointerEvents: "none",
            bottom: 280,
            animation: "float 2s ease-in-out infinite",
            willChange: "transform",
          }}
        />

        <img
          src="https://bracketweb.com/jetlywp/wp-content/uploads/2023/01/feature-one-shadow.png"
          alt=""
          className="absolute z-20 right-8 bottom-0"
          style={{ pointerEvents: "none", mixBlendMode: "multiply",bottom: 200, }}
        />
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

        /* isterseniz ekran küçüldükçe hareketi daha da küçültmek için media query ekleyebilirsiniz */
        @media (max-width: 768px) {
          img[alt=""] {
            max-width: 200px;
          }
        }
      `}</style>
    </section>
  )
}