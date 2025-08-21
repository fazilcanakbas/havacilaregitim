"use client"

import { Search, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function BlogHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <BookOpen className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Havacılık Blog</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-inter mb-6">
            Havacılık Dünyasından
            <span className="text-primary block">Güncel İçerikler</span>
          </h1>

          <p className="text-lg text-muted-foreground font-dm-sans mb-8 max-w-2xl mx-auto">
            Pilot eğitimi, havacılık teknolojileri, sektör haberleri ve kariyer rehberleri ile havacılık dünyasını
            keşfedin.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Blog yazılarında ara..." className="pl-10" />
            </div>
            <Button>Ara</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
