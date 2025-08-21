"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function BlogGrid() {
  const blogPosts = [
    {
      id: 1,
      title: "Pilot Olmak İçin Gerekli Adımlar ve Süreç",
      excerpt:
        "Havacılık kariyerine başlamak isteyenler için kapsamlı rehber. PPL'den ATPL'ye kadar tüm lisans türleri ve gereksinimler.",
      category: "Pilot Eğitimi",
      author: "Kaptan Ahmet Yılmaz",
      date: "15 Mart 2024",
      readTime: "8 dk",
      image: "/placeholder.svg?height=300&width=500&text=Pilot+Eğitimi",
      featured: true,
    },
    {
      id: 2,
      title: "Modern Uçak Simülatörlerinin Eğitimdeki Rolü",
      excerpt:
        "Son teknoloji simülatörlerin pilot eğitimindeki önemi ve gerçek uçuş deneyimine katkıları hakkında detaylı analiz.",
      category: "Havacılık Teknolojisi",
      author: "Müh. Elif Kaya",
      date: "12 Mart 2024",
      readTime: "6 dk",
      image: "/placeholder.svg?height=300&width=500&text=Simülatör+Teknolojisi",
      featured: false,
    },
    {
      id: 3,
      title: "Havayolu Şirketlerinde Kariyer Fırsatları",
      excerpt:
        "Türkiye ve dünya havayolu şirketlerindeki pilot pozisyonları, başvuru süreçleri ve kariyer gelişim yolları.",
      category: "Kariyer Rehberi",
      author: "Kaptan Mehmet Özkan",
      date: "10 Mart 2024",
      readTime: "10 dk",
      image: "/placeholder.svg?height=300&width=500&text=Havayolu+Kariyer",
      featured: false,
    },
    {
      id: 4,
      title: "ICAO Standartları ve Türkiye'deki Uygulamalar",
      excerpt: "Uluslararası Sivil Havacılık Örgütü standartlarının Türk havacılık eğitimindeki yansımaları ve önemi.",
      category: "Mevzuat",
      author: "Dr. Ayşe Demir",
      date: "8 Mart 2024",
      readTime: "12 dk",
      image: "/placeholder.svg?height=300&width=500&text=ICAO+Standartları",
      featured: false,
    },
    {
      id: 5,
      title: "Enstrüman Uçuş Kuralları (IFR) Eğitimi",
      excerpt: "Kötü hava koşullarında güvenli uçuş için gerekli IFR eğitimi ve pratik uygulamalar hakkında rehber.",
      category: "Pilot Eğitimi",
      author: "Kaptan Fatma Arslan",
      date: "5 Mart 2024",
      readTime: "7 dk",
      image: "/placeholder.svg?height=300&width=500&text=IFR+Eğitimi",
      featured: false,
    },
    {
      id: 6,
      title: "Havacılık Sektöründe Dijital Dönüşüm",
      excerpt: "Yapay zeka, IoT ve büyük veri analitiğinin havacılık eğitimi ve operasyonlarındaki devrimsel etkileri.",
      category: "Havacılık Teknolojisi",
      author: "Müh. Can Yıldız",
      date: "3 Mart 2024",
      readTime: "9 dk",
      image: "/placeholder.svg?height=300&width=500&text=Dijital+Dönüşüm",
      featured: false,
    },
  ]

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="space-y-12">
      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground font-inter mb-8">Öne Çıkan Yazı</h2>
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-full">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Öne Çıkan</Badge>
              </div>

              <div className="p-8 flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <Badge variant="outline">{featuredPost.category}</Badge>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground font-inter group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>

                  <p className="text-muted-foreground font-dm-sans text-lg">{featuredPost.excerpt}</p>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-dm-sans">{featuredPost.author}</span>
                    </div>

                    <Link href={`/blog/${featuredPost.id}`}>
                      <Button className="group/btn">
                        Devamını Oku
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Regular Posts Grid */}
      <div>
        <h2 className="text-2xl font-bold text-foreground font-inter mb-8">Son Yazılar</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Card
              key={post.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-background/90 text-foreground">{post.category}</Badge>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <CardTitle className="text-lg font-bold font-inter group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>

                <CardDescription className="text-muted-foreground font-dm-sans line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-dm-sans">{post.author}</span>
                  </div>

                  <Link href={`/blog/${post.id}`}>
                    <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary hover:text-accent">
                      Oku
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="bg-transparent">
            Daha Fazla Yazı Yükle
          </Button>
        </div>
      </div>
    </div>
  )
}
