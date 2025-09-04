'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Instagram, Linkedin, ExternalLink } from "lucide-react"
import Link from "next/link"

export function SocialMediaSection() {
  const socialPosts = [
    {
      platform: "instagram",
      content: "Yeni mezunlarımızla gurur duyuyoruz! ✈️ #HavacılıkEğitimi #PilotMezuniyet",
      image: "/placeholder.svg?height=300&width=300&text=Instagram+Post+1",
      likes: 245,
      date: "2 gün önce",
    },
    {
      platform: "instagram",
      content: "Boeing 737 simülatöründe eğitim anları 🎯 #Simülatör #PilotEğitimi",
      image: "/placeholder.svg?height=300&width=300&text=Instagram+Post+2",
      likes: 189,
      date: "4 gün önce",
    },
    {
      platform: "instagram",
      content: "Havacılık sektöründe kariyer fırsatları ve eğitim programlarımız hakkında detaylı bilgi...",
      image: "/placeholder.svg?height=300&width=300&text=LinkedIn+Post+1",
      likes: 67,
      date: "1 hafta önce",
    },
  ]

  return (
    <section
      className="py-20"
      style={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-inter mb-4">
            Sosyal Medyada Biz
          </h2>

          <p className="text-lg text-muted-foreground font-dm-sans max-w-3xl mx-auto mb-6">
            Günlük eğitim aktivitelerimizi, mezun başarı hikayelerini ve havacılık dünyasından gelişmeleri sosyal medya
            hesaplarımızdan takip edebilirsiniz.
          </p>

          {/* Responsive buttons: stack on small screens, inline on sm+ */}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <Link href="https://www.instagram.com/havacilikegitim/" target="_blank">
              <Button
                size="lg"
                className="group w-full sm:w-auto flex items-center justify-center"
                aria-label="Instagram'da Takip Et"
                style={{
                  backgroundColor: "#1b1b56ff",
                }}
              >
              <Instagram className="w-5 h-5 mr-2" />
              <span>Instagram'da Takip Et</span>
              <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            </Link>
             <Link href="https://www.linkedin.com/company/havacilikegitim/" target="_blank" rel="noopener noreferrer">
      <Button
        size="lg"
        variant="outline"
        aria-label="LinkedIn'de Bağlan"
        className={
          // Başlangıçta lacivert metin + border; hover/focus'ta arka plan lacivert ve yazı beyaz olur
          "group w-full sm:w-auto flex items-center justify-center bg-transparent " +
          "text-[#0b2a4a] border-[#0b2a4a] " +
          "hover:bg-[#0b2a4a] hover:text-white focus:bg-[#0b2a4a] focus:text-white " +
          "transition-colors"
        }
        // Eğer Tailwind arbitrary renkler devre dışıysa veya Button variant stilleri override ediyorsa
        // style ile NAVY'yi doğrudan verebilirsin:
        // style={{ color: NAVY, borderColor: NAVY }}
      >
        <Linkedin className="w-5 h-5 mr-2" />
        <span>LinkedIn'de Bağlan</span>
        <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      </Button>
    </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {socialPosts.map((post, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt="Social media post"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  {post.platform === "instagram" ? (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Instagram className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                      <Linkedin className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold font-dm-sans line-clamp-3">{post.content}</CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{post.likes} beğeni</span>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}