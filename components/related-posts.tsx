"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface RelatedPostsProps {
  currentPostId: string
}

export function RelatedPosts({ currentPostId }: RelatedPostsProps) {
  const relatedPosts = [
    {
      id: 2,
      title: "Modern Uçak Simülatörlerinin Eğitimdeki Rolü",
      excerpt: "Son teknoloji simülatörlerin pilot eğitimindeki önemi ve gerçek uçuş deneyimine katkıları.",
      category: "Havacılık Teknolojisi",
      date: "12 Mart 2024",
      readTime: "6 dk",
      image: "/placeholder.svg?height=200&width=300&text=Simülatör",
    },
    {
      id: 5,
      title: "Enstrüman Uçuş Kuralları (IFR) Eğitimi",
      excerpt: "Kötü hava koşullarında güvenli uçuş için gerekli IFR eğitimi ve pratik uygulamalar.",
      category: "Pilot Eğitimi",
      date: "5 Mart 2024",
      readTime: "7 dk",
      image: "/placeholder.svg?height=200&width=300&text=IFR",
    },
    {
      id: 3,
      title: "Havayolu Şirketlerinde Kariyer Fırsatları",
      excerpt: "Türkiye ve dünya havayolu şirketlerindeki pilot pozisyonları ve kariyer gelişim yolları.",
      category: "Kariyer Rehberi",
      date: "10 Mart 2024",
      readTime: "10 dk",
      image: "/placeholder.svg?height=200&width=300&text=Kariyer",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-inter mb-8 text-center">İlgili Yazılar</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
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

                  <CardDescription className="text-muted-foreground font-dm-sans line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <Link href={`/blog/${post.id}`}>
                    <div className="flex items-center text-primary hover:text-accent transition-colors font-medium text-sm">
                      Devamını Oku
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
