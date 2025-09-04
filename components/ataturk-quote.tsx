"use client"

import { Quote } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function AtaturkQuote() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />

            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground font-inter leading-relaxed mb-8">
              "{t("quote.text")}"
            </blockquote>

            <div className="flex flex-col items-center space-y-4">
              {/* İmza iki çizginin arasında */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-0.5 bg-primary"></div>
                <Image
                  src="/ataturkimza.png"
                  alt="Mustafa Kemal Atatürk İmzası"
                  width={180}
                  height={60}
                  className="opacity-90"
                />
                <div className="w-16 h-0.5 bg-primary"></div>
              </div>

              {/* Author imzanın altında */}
              <cite className="text-lg font-semibold text-muted-foreground font-dm-sans not-italic mt-2">
                {t("quote.author")}
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
