"use client"

import { useLanguage } from "@/lib/language-context"
import { Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Footer } from "@/components/footer"

function AnnouncementsHero() {
  const { language } = useLanguage()

  return (
    <section className="relative bg-gradient-to-br from-accent/10 via-background to-primary/5 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 font-inter">
            {language === "tr" ? "Duyurular" : "Announcements"}
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground font-dm-sans">
            {language === "tr"
              ? "En güncel haberler, etkinlikler ve önemli duyurular için takipte kalın."
              : "Stay tuned for the latest news, events and important announcements."}
          </p>
        </div>
      </div>
    </section>
  )
}

function AnnouncementsFilter() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: language === "tr" ? "Tümü" : "All" },
    { id: "registration", label: language === "tr" ? "Kayıt" : "Registration" },
    { id: "technology", label: language === "tr" ? "Teknoloji" : "Technology" },
    { id: "event", label: language === "tr" ? "Etkinlik" : "Event" },
    { id: "career", label: language === "tr" ? "Kariyer" : "Career" },
    { id: "training", label: language === "tr" ? "Eğitim" : "Training" },
  ]

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 mb-12 border border-border/50">
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
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="text-xs"
            >
              <Tag className="w-3 h-3 mr-1" />
              {category.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

function AnnouncementsList() {
  const { language } = useLanguage()

  const announcements = [
    {
      id: 1,
      title: language === "tr" ? "2024 Bahar Dönemi Kayıtları Başladı" : "2024 Spring Term Registration Started",
      excerpt:
        language === "tr"
          ? "Yeni dönem için pilot eğitim programlarına kayıt işlemleri başlamıştır. Erken kayıt indirimi fırsatını kaçırmayın. İlk 50 kayıt için %20 indirim!"
          : "Registration for pilot training programs for the new term has started. Don't miss the early registration discount opportunity. 20% discount for the first 50 registrations!",
      content:
        language === "tr"
          ? "2024 Bahar dönemi için tüm pilot eğitim programlarımıza kayıtlar başlamıştır. Bu dönem PPL, CPL ve ATPL programlarımız için özel kampanyalar düzenliyoruz..."
          : "Registrations have started for all our pilot training programs for the 2024 Spring term. We are organizing special campaigns for our PPL, CPL and ATPL programs this term...",
      date: "2024-01-15",
      category: language === "tr" ? "Kayıt" : "Registration",
      urgent: true,
      image: "/pilot-training-registration.png",
    },
    {
      id: 2,
      title: language === "tr" ? "Yeni Simülatör Sistemi Devreye Alındı" : "New Simulator System Commissioned",
      excerpt:
        language === "tr"
          ? "Son teknoloji Boeing 737 MAX simülatörümüz ile daha gerçekçi ve etkili eğitim deneyimi sunuyoruz. Full Motion teknolojisi ile tam gerçeklik."
          : "We offer a more realistic and effective training experience with our state-of-the-art Boeing 737 MAX simulator. Full reality with Full Motion technology.",
      content:
        language === "tr"
          ? "Yeni nesil Boeing 737 MAX simülatörümüz tam operasyonel duruma geçmiştir. Bu simülatör ile öğrencilerimiz gerçek uçuş koşullarını deneyimleyebilecek..."
          : "Our new generation Boeing 737 MAX simulator has become fully operational. With this simulator, our students will be able to experience real flight conditions...",
      date: "2024-01-10",
      category: language === "tr" ? "Teknoloji" : "Technology",
      urgent: false,
      image: "/modern-aircraft-cockpit-training.png",
    },
    {
      id: 3,
      title: language === "tr" ? "Mezuniyet Töreni Duyurusu" : "Graduation Ceremony Announcement",
      excerpt:
        language === "tr"
          ? "2023 yılı mezunlarımızın diploma töreni 25 Ocak 2024 tarihinde İstanbul Kongre Merkezi'nde gerçekleştirilecektir. Aileler davetlidir."
          : "The diploma ceremony for our 2023 graduates will be held on January 25, 2024 at Istanbul Congress Center. Families are invited.",
      content:
        language === "tr"
          ? "Bu yıl 150 mezunumuz diploma almaya hak kazanmıştır. Tören saat 14:00'da başlayacak ve canlı yayınlanacaktır..."
          : "This year, 150 of our graduates have earned the right to receive diplomas. The ceremony will start at 14:00 and will be broadcast live...",
      date: "2024-01-08",
      category: language === "tr" ? "Etkinlik" : "Event",
      urgent: false,
      image: "/pilot-graduation.png",
    },
    {
      id: 4,
      title: language === "tr" ? "Havacılık Fuarı Katılımımız" : "Our Aviation Fair Participation",
      excerpt:
        language === "tr"
          ? "İstanbul Havacılık Fuarı'nda standımızı ziyaret edin. Eğitim programlarımız hakkında detaylı bilgi alın ve simülatör deneyimi yaşayın."
          : "Visit our booth at Istanbul Aviation Fair. Get detailed information about our training programs and experience the simulator.",
      content:
        language === "tr"
          ? "15-18 Şubat tarihleri arasında İstanbul Fuar Merkezi'nde düzenlenecek fuarda bizi ziyaret edebilirsiniz..."
          : "You can visit us at the fair to be held at Istanbul Fair Center between February 15-18...",
      date: "2024-01-05",
      category: language === "tr" ? "Etkinlik" : "Event",
      urgent: false,
      image: "/aviation-fair.png",
    },
    {
      id: 5,
      title: language === "tr" ? "Burs Programı Başvuruları" : "Scholarship Program Applications",
      excerpt:
        language === "tr"
          ? "Başarılı öğrenciler için %50'ye varan burs imkanları. Başvuru son tarihi 28 Şubat 2024. Detaylar için web sitemizi ziyaret edin."
          : "Scholarship opportunities up to 50% for successful students. Application deadline is February 28, 2024. Visit our website for details.",
      content:
        language === "tr"
          ? "2024 yılı için burs programımız başlamıştır. Akademik başarı ve finansal durum değerlendirmesi yapılacaktır..."
          : "Our scholarship program for 2024 has started. Academic achievement and financial situation will be evaluated...",
      date: "2024-01-03",
      category: language === "tr" ? "Eğitim" : "Training",
      urgent: false,
      image: "/scholarship-students.png",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnnouncementsFilter />

          <div className="space-y-8">
            {announcements.map((announcement) => (
              <article
                key={announcement.id}
                className={`bg-gradient-to-br from-background to-accent/5 rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300 group ${announcement.urgent ? "border-accent/50 bg-gradient-to-br from-accent/5 to-background" : "border-border/50"}`}
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="aspect-video md:aspect-square relative">
                      <Image
                        src={announcement.image || "/placeholder.svg"}
                        alt={announcement.title}
                        fill
                        className="object-cover"
                      />
                      {announcement.urgent && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-semibold animate-pulse">
                            {language === "tr" ? "ACİL" : "URGENT"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:w-2/3 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${announcement.urgent ? "bg-accent text-accent-foreground" : "bg-primary/10 text-primary"}`}
                      >
                        {announcement.category}
                      </span>
                      <div className="flex items-center text-sm text-muted-foreground font-dm-sans">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(announcement.date).toLocaleDateString(language === "tr" ? "tr-TR" : "en-US")}
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-foreground mb-4 font-inter group-hover:text-primary transition-colors duration-300">
                      {announcement.title}
                    </h2>

                    <p className="text-muted-foreground mb-6 font-dm-sans leading-relaxed">{announcement.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground font-dm-sans">
                        <Clock className="w-4 h-4 mr-2" />
                        {language === "tr" ? "3 dakika okuma" : "3 min read"}
                      </div>

                      <Link
                        href={`/duyurular/${announcement.id}`}
                        className="flex items-center text-primary hover:text-accent transition-colors duration-300 font-semibold font-dm-sans"
                      >
                        {language === "tr" ? "Devamını Oku" : "Read More"}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen pt-20 lg:pt-32">
      <AnnouncementsHero />
      <AnnouncementsList />
      <Footer />
    </div>
  )
}
