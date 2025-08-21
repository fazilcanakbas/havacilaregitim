"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function BlogCategories() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", label: "Tümü", count: 24 },
    { id: "pilot-training", label: "Pilot Eğitimi", count: 8 },
    { id: "aviation-tech", label: "Havacılık Teknolojisi", count: 6 },
    { id: "career", label: "Kariyer Rehberi", count: 5 },
    { id: "industry-news", label: "Sektör Haberleri", count: 3 },
    { id: "regulations", label: "Mevzuat", count: 2 },
  ]

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-foreground font-inter mb-6">Kategoriler</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => setActiveCategory(category.id)}
            className="group bg-transparent"
          >
            {category.label}
            <Badge variant="secondary" className="ml-2 text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  )
}
