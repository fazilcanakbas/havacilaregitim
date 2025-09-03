"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { listBlogs } from "@/lib/api/blogService"

type CategoryCount = { id: string; label: string; count: number }

export function BlogCategories() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [categories, setCategories] = useState<CategoryCount[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // read current category from URL
  useEffect(() => {
    const cat = searchParams?.get("category") ?? "all"
    setActiveCategory(cat)
  }, [searchParams])

  // derive categories & counts from backend (only active posts)
  useEffect(() => {
    let mounted = true
    setLoading(true)
    const fetch = async () => {
      try {
        // get many posts so we can compute counts; adjust limit if backend supports counts endpoint
        const res: any = await listBlogs({ limit: 500, isActive: true })
        const arr = Array.isArray(res) ? res : res?.data ?? []
        if (!mounted) return

        const map = new Map<string, number>()
        for (const p of arr) {
          const cat = p?.category ?? "Diğer"
          map.set(cat, (map.get(cat) ?? 0) + 1)
        }

        const result: CategoryCount[] = [
          { id: "all", label: "Tümü", count: arr.filter((p: any) => p?.isActive !== false).length },
          ...Array.from(map.entries()).map(([label, count]) => ({
            id: label,
            label,
            count,
          })),
        ]
        setCategories(result)
      } catch (err) {
        console.error("Failed to fetch categories", err)
        setCategories([{ id: "all", label: "Tümü", count: 0 }])
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetch()
    return () => {
      mounted = false
    }
  }, [])

  const setCategoryInUrl = (categoryId: string | null) => {
    const params = new URLSearchParams(Array.from(searchParams?.entries() ?? []))
    if (!categoryId || categoryId === "all") {
      params.delete("category")
    } else {
      params.set("category", categoryId)
    }
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ""}`)
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 flex-wrap">
        {loading ? (
          <div className="text-sm text-gray-500">Yükleniyor...</div>
        ) : (
          categories.map((category) => {
            const isActive = activeCategory === category.id || (activeCategory === "all" && category.id === "all")
            return (
              <Button
                key={category.id}
                size="sm"
                variant={isActive ? "default" : "outline"}
                onClick={() => {
                  setActiveCategory(category.id)
                  setCategoryInUrl(category.id === "all" ? null : category.id)
                }}
                className={`rounded-full px-3 py-1.5 ${isActive ? "bg-orange-500 text-white" : "bg-white"}`}
              >
                <span className="text-sm font-medium">{category.label}</span>
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </Button>
            )
          })
        )}
      </div>
    </div>
  )
}