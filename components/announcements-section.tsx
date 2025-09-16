"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight, Megaphone, User, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { adminListAnnouncements, Announcement } from "@/lib/api/announcementService"
import { useLanguage } from "@/lib/language-context" 

// Tarih formatlama helper
const formatDate = (dateString: string, lang: "tr" | "en") => {
  try {
    return new Date(dateString).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  } catch {
    return dateString
  }
}

export function AnnouncementsSection() {
  const { language } = useLanguage() 
  const [announcements, setAnnouncements] = useState<Announcement[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        const data = await adminListAnnouncements()
        if (!mounted) return
        const active = (data || []).filter((a) => a.isActive && a.featured) // sadece aktif & featured
        setAnnouncements(active)
      } catch (err: any) {
        if (mounted) setError(err?.message || "Bir hata oluştu")
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  const buildImageUrl = (img?: string) => {
    if (!img) return "/placeholder.svg"
    if (img.startsWith("http")) return img
    return `${process.env.NEXT_PUBLIC_API_URL ?? ""}${img}`
  }

  if (loading) return <div className="text-center py-20">Yükleniyor...</div>
  if (error) return <div className="text-center py-20 text-red-600">Hata: {error}</div>
  if (!announcements || announcements.length === 0) {
    return <div className="text-center py-20">Hiç duyuru bulunamadı.</div>
  }

  const leftAnnouncement = announcements[0]
  const rightColumnAnnouncements = announcements.slice(1, 3)

  // ✅ Dil seçimine göre metinler
  const getTitle = (a: Announcement) =>
    language === "tr" ? a.title : a.titleEn || a.title
  const getDescription = (a: Announcement) =>
    language === "tr" ? a.description : a.descriptionEn || a.description
  const getCategory = (a: Announcement) =>
    language === "tr" ? a.category : a.categoryEn || a.category

  return (
    <section className="py-20 bg-[#f5f5f5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          
           <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8 shadow-lg shadow-[#0b2a4a]/20"
            style={{
              background: 'linear-gradient(135deg, #07243e 0%, #0b2a4a 70%, #11406d 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            >
              <Megaphone className="w-4 h-4 text-white" />
            </div>
            <span className="text-base sm:text-lg font-semibold font-inter tracking-wide text-white">
             {language === "tr" ? "Duyurular & Haberler" : "Announcements & News"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-inter mb-6">
            {language === "tr" ? "Güncel Gelişmeler" : "Latest Updates"}
          </h2>
          <p className="text-lg text-muted-foreground font-dm-sans max-w-3xl mx-auto">
            {language === "tr"
              ? "Eğitim programları, etkinlikler ve havacılık sektöründeki gelişmeler hakkında en güncel bilgileri takip edin."
              : "Stay up to date with the latest news on training programs, events, and developments in the aviation industry."}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sol: büyük kart */}
          {leftAnnouncement && (
            <div className="lg:col-span-2">
              <Card className="group hover:shadow-xl transition-all duration-300 border shadow-lg overflow-hidden !p-0">
                <div className="relative h-64 lg:h-80 w-full">
                  <Image
                    src={buildImageUrl(leftAnnouncement.images?.[0])}
                    alt={getTitle(leftAnnouncement)}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center text-sm text-muted-foreground mb-2 gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(leftAnnouncement.date!, language)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{leftAnnouncement.author}</span>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {getCategory(leftAnnouncement)}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold font-inter text-[#001f4d]">
                    {getTitle(leftAnnouncement)}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground font-dm-sans text-base">
                    {getDescription(leftAnnouncement)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/duyurular/${leftAnnouncement.slug}`}>
                    <Button
                      style={{ marginBottom: 20 }}
                      className="bg-[#001f4d] text-white hover:bg-[#001f4d] hover:opacity-90"
                    >
                      {language === "tr" ? "Devamını Oku" : "Read More"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Sağ: küçük kartlar */}
          <div className="space-y-6">
            {rightColumnAnnouncements.map((announcement) => (
              <Card
                key={announcement._id ?? announcement.slug ?? announcement.title}
                className="group hover:shadow-lg transition-all duration-300 border shadow-md overflow-hidden !p-0"
              >
                <div className="relative h-36 w-full">
                  <Image
                    src={buildImageUrl(announcement.images?.[0])}
                    alt={getTitle(announcement)}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center text-xs text-muted-foreground mb-2 gap-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(announcement.date!, language)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{announcement.author}</span>
                    </div>
                    <Badge variant="outline" size="sm" className="ml-auto text-xs">
                      {getCategory(announcement)}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold font-inter text-[#001f4d] line-clamp-2">
                    {getTitle(announcement)}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground font-dm-sans line-clamp-2">
                    {getDescription(announcement)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link href={`/duyurular/${announcement.slug}`}>
                    <Button
                      style={{ marginBottom: 20 }}
                      size="sm"
                      className="p-2 h-auto font-medium bg-[#001f4d] text-white hover:bg-[#001f4d] hover:opacity-90"
                    >
                      {language === "tr" ? "Detayları Gör" : "View Details"}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}

            <Link href="/duyurular">
              <Button className="w-full bg-[#001f4d] text-white hover:bg-[#001f4d] hover:opacity-90">
                {language === "tr" ? "Tüm Duyuruları Görüntüle" : "View All Announcements"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
