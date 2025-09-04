"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Calendar, Clock, ArrowRight, Search, Tag, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { adminListAnnouncements } from "@/lib/api/announcementService"

export default function AnnouncementsPage() {
  const { language } = useLanguage()

  const [announcements, setAnnouncements] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Filter / search state
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    let mounted = true
    const fetch = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await adminListAnnouncements()
        if (!mounted) return
        const list = Array.isArray(data) ? data : data?.data ?? []
        // only include active announcements as requested
        const activeOnly = (list || []).filter((a: any) => typeof a.isActive === "undefined" ? true : !!a.isActive)
        setAnnouncements(activeOnly)
      } catch (err) {
        console.error("Announcements fetch error", err)
        if (!mounted) return
        setError(language === "en" ? "Failed to load announcements" : "Duyurular yüklenemedi")
        setAnnouncements([])
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetch()
    return () => {
      mounted = false
    }
  }, [language])

  // Helpers to show localized fields
  const getTitle = (a: any) => (language === "en" && a?.titleEn ? a.titleEn : a?.title ?? "")
  const getExcerpt = (a: any) =>
    (language === "en" && a?.descriptionEn ? a.descriptionEn : a?.description ?? "") ||
    (a?.content ? String(a.content).replace(/<[^>]+>/g, "").slice(0, 140) + "..." : "")
  const getCategory = (a: any) => (language === "en" && a?.categoryEn ? a.categoryEn : a?.category ?? "")
  const getImageUrl = (img?: string) => {
    if (!img) return "/placeholder.svg"
    if (img.startsWith("http://") || img.startsWith("https://")) return img
    return `${(process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "")}${img.startsWith("/") ? img : `/${img}`}`
  }

  // Build categories from fetched data (localized)
  const categories = useMemo(() => {
    const set = new Set<string>()
    for (const a of announcements) {
      const cat = getCategory(a) || (language === "en" ? "Other" : "Diğer")
      set.add(cat)
    }
    const arr = Array.from(set).filter(Boolean)
    return [{ id: "all", label: language === "en" ? "All" : "Tümü" }, ...arr.map((c) => ({ id: c, label: c }))]
  }, [announcements, language])

  // Filtered list
  const filtered = useMemo(() => {
    const s = (searchTerm || "").trim().toLowerCase()
    return announcements.filter((a) => {
      if (!a) return false
      if (selectedCategory && selectedCategory !== "all" && getCategory(a) !== selectedCategory) return false
      if (s) {
        const title = (getTitle(a) || "").toLowerCase()
        const excerpt = (getExcerpt(a) || "").toLowerCase()
        const author = (a.author || "").toLowerCase()
        return title.includes(s) || excerpt.includes(s) || author.includes(s)
      }
      return true
    })
  }, [announcements, selectedCategory, searchTerm, language])

  return (
    <div className="min-h-screen pt-20 lg:pt-32 bg-[color:var(--page-bg,#fafafa)]">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-accent/10 via-background to-primary/5 py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-inter">
              {language === "tr" ? "Duyurular" : "Announcements"}
            </h1>
            <p className="text-md md:text-lg text-muted-foreground font-dm-sans">
              {language === "tr"
                ? "En güncel haberler, etkinlikler ve önemli duyurular için takipte kalın."
                : "Stay tuned for the latest news, events and important announcements."}
            </p>
          </div>
        </div>
      </section>

      {/* Filter area */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-8 border border-border/50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder={language === "tr" ? "Duyuru ara..." : "Search announcements..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Button
                    key={c.id}
                    variant={selectedCategory === c.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(c.id)}
                    // ensure navy hover and selected styles
                    className={`text-xs inline-flex items-center hover:bg-[#0b2a4a] hover:text-white focus:bg-[#0b2a4a] focus:text-white transition-colors ${selectedCategory === c.id ? "bg-[#0b2a4a] text-white" : ""}`}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {c.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Medium cards grid: image on top, compact modern style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12">
                {language === "en" ? "Loading..." : "Yükleniyor..."}
              </div>
            )}

            {error && (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-red-600 py-6">
                {error}
              </div>
            )}

            {!loading && !error && filtered.length === 0 && (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12 text-muted-foreground">
                {language === "en" ? "No announcements found." : "Duyuru bulunamadı."}
              </div>
            )}

            {!loading &&
              filtered.map((announcement: any) => {
                const title = getTitle(announcement)
                const excerpt = getExcerpt(announcement)
                const category = getCategory(announcement)
                const image = getImageUrl(announcement?.images?.[0] ?? announcement?.image)
                // prefer slug for user-friendly URL, fallback to _id
                const slugTarget = announcement?.slug || announcement?._id || String(announcement?.id)

                return (
                  <article
                    key={announcement._id ?? announcement.id ?? slugTarget}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 overflow-hidden border border-border/50"
                  >
                    {/* Image on top */}
                    <div className="relative h-40 md:h-44 lg:h-48 w-full">
                      <Image src={image} alt={title} fill className="object-cover" />
                      {announcement?.urgent && (
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-0.5 bg-accent text-accent-foreground rounded-full text-xs font-semibold">
                            {language === "tr" ? "ACİL" : "URGENT"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {category}
                        </span>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>{announcement?.date ? new Date(announcement.date).toLocaleDateString(language === "tr" ? "tr-TR" : "en-US") : "-"}</span>
                        </div>
                      </div>

                      <h3 className="text-lg md:text-lg font-semibold text-foreground mb-2 line-clamp-2">{title}</h3>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <User className="w-3 h-3" />
                          <span>{announcement?.author}</span>
                        </div>

                        {/* Read more: navy text, on hover navy background + white text */}
                        <Link
                          href={`/duyurular/${encodeURIComponent(String(slugTarget))}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-150 px-2 py-1 rounded text-[#0b2a4a] hover:bg-[#0b2a4a] hover:text-white focus:bg-[#0b2a4a] focus:text-white"
                        >
                          <span>{language === "tr" ? "Devamını Oku" : "Read More"}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}