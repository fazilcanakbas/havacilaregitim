"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight, Megaphone } from "lucide-react"
import Image from "next/image"

export function AnnouncementsSection() {
  const announcements = [
    {
      id: 1,
      title: "2024 Bahar Dönemi Kayıtları Başladı",
      titleEn: "2024 Spring Term Registration Started",
      excerpt:
        "Yeni dönem pilot eğitimi programlarına kayıt işlemleri başlamıştır. Erken kayıt avantajlarından yararlanın.",
      date: "15 Mart 2024",
      category: "Kayıt",
      categoryEn: "Registration",
      image: "/placeholder.svg?height=200&width=400&text=Kayıt+Duyurusu",
      featured: true,
    },
    {
      id: 2,
      title: "Yeni Simülatör Merkezi Açıldı",
      titleEn: "New Simulator Center Opened",
      excerpt:
        "Son teknoloji Boeing 737 ve Airbus A320 simülatörleri ile donatılmış yeni eğitim merkezimiz hizmete girdi.",
      date: "10 Mart 2024",
      category: "Haber",
      categoryEn: "News",
      image: "/placeholder.svg?height=200&width=400&text=Simülatör+Merkezi",
      featured: false,
    },
    {
      id: 3,
      title: "Mezuniyet Töreni 2024",
      titleEn: "Graduation Ceremony 2024",
      excerpt:
        "2024 yılı mezunlarımızın diploma töreni 25 Mart'ta gerçekleştirilecektir. Ailelerin katılımı beklenmektedir.",
      date: "8 Mart 2024",
      category: "Etkinlik",
      categoryEn: "Event",
      image: "/placeholder.svg?height=200&width=400&text=Mezuniyet+Töreni",
      featured: false,
    },
    {
      id: 4,
      title: "ICAO Denetimi Başarıyla Tamamlandı",
      titleEn: "ICAO Audit Successfully Completed",
      excerpt: "Uluslararası Sivil Havacılık Örgütü denetimi başarıyla tamamlanmış ve sertifikalarımız yenilenmiştir.",
      date: "5 Mart 2024",
      category: "Başarı",
      categoryEn: "Achievement",
      image: "/placeholder.svg?height=200&width=400&text=ICAO+Sertifika",
      featured: false,
    },
  ]

  const featuredAnnouncement = announcements.find((a) => a.featured)
  const regularAnnouncements = announcements.filter((a) => !a.featured)

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Megaphone className="w-4 h-4 text-accent mr-2" />
            <span className="text-sm font-medium text-accent">Duyurular & Haberler</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-inter mb-6">
            Güncel Gelişmeler
          </h2>

          <p className="text-lg text-muted-foreground font-dm-sans max-w-3xl mx-auto">
            Eğitim programları, etkinlikler ve havacılık sektöründeki gelişmeler hakkında en güncel bilgileri takip
            edin.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Announcement */}
          {featuredAnnouncement && (
            <div className="lg:col-span-2">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src={featuredAnnouncement.image || "/placeholder.svg"}
                    alt={featuredAnnouncement.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Öne Çıkan</Badge>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{featuredAnnouncement.date}</span>
                    <Badge variant="outline" className="ml-auto">
                      {featuredAnnouncement.category}
                    </Badge>
                  </div>

                  <CardTitle className="text-2xl font-bold font-inter group-hover:text-primary transition-colors">
                    {featuredAnnouncement.title}
                  </CardTitle>

                  <CardDescription className="text-muted-foreground font-dm-sans text-base">
                    {featuredAnnouncement.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button className="group/btn">
                    Devamını Oku
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Regular Announcements */}
          <div className="space-y-6">
            {regularAnnouncements.map((announcement) => (
              <Card
                key={announcement.id}
                className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{announcement.date}</span>
                    <Badge variant="outline" size="sm" className="ml-auto text-xs">
                      {announcement.category}
                    </Badge>
                  </div>

                  <CardTitle className="text-lg font-semibold font-inter group-hover:text-primary transition-colors line-clamp-2">
                    {announcement.title}
                  </CardTitle>

                  <CardDescription className="text-sm text-muted-foreground font-dm-sans line-clamp-2">
                    {announcement.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary hover:text-accent">
                    Detayları Gör
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" className="w-full bg-transparent">
              Tüm Duyuruları Görüntüle
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
