"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Share2, BookOpen } from "lucide-react"
import Image from "next/image"

interface BlogPostProps {
  postId: string
}

export function BlogPost({ postId }: BlogPostProps) {
  // In a real app, this would fetch data based on postId
  const post = {
    id: 1,
    title: "Pilot Olmak İçin Gerekli Adımlar ve Süreç",
    content: `
      <p>Havacılık kariyerine başlamak isteyenler için kapsamlı bir rehber hazırladık. Bu yazıda, pilot olmak için gerekli tüm adımları, lisans türlerini ve süreçleri detaylı olarak inceleyeceğiz.</p>
      
      <h2>Pilot Lisans Türleri</h2>
      <p>Havacılıkta farklı amaçlar için çeşitli pilot lisansları bulunmaktadır:</p>
      
      <h3>1. Özel Pilot Lisansı (PPL - Private Pilot License)</h3>
      <p>PPL, havacılığa giriş yapan pilotların aldığı ilk lisanstır. Bu lisans ile:</p>
      <ul>
        <li>Özel amaçlı uçuşlar yapabilirsiniz</li>
        <li>Yolcu taşıyabilirsiniz (ücret karşılığı değil)</li>
        <li>Tek motorlu uçaklarda pilot olarak görev alabilirsiniz</li>
      </ul>
      
      <h3>2. Ticari Pilot Lisansı (CPL - Commercial Pilot License)</h3>
      <p>CPL, profesyonel havacılık kariyeri için gerekli olan lisanstır. Bu lisans ile:</p>
      <ul>
        <li>Ücret karşılığı pilot olarak çalışabilirsiniz</li>
        <li>Kargo taşımacılığı yapabilirsiniz</li>
        <li>Özel jet operasyonlarında görev alabilirsiniz</li>
      </ul>
      
      <h2>Eğitim Süreci</h2>
      <p>Pilot eğitimi teorik ve pratik olmak üzere iki ana bölümden oluşur. Teorik eğitimde havacılık mevzuatı, meteoroloji, navigasyon ve uçak sistemleri gibi konular işlenir.</p>
      
      <p>Pratik eğitim ise gerçek uçaklarla yapılan uçuş eğitimlerini kapsar. Bu süreçte öğrenciler deneyimli eğitmenler eşliğinde uçuş becerilerini geliştirir.</p>
    `,
    category: "Pilot Eğitimi",
    author: "Kaptan Ahmet Yılmaz",
    date: "15 Mart 2024",
    readTime: "8 dk",
    image: "/placeholder.svg?height=400&width=800&text=Pilot+Eğitimi+Detay",
  }

  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
            <Badge variant="outline">{post.category}</Badge>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-inter mb-6">{post.title}</h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground font-dm-sans">{post.author}</span>
            </div>

            <Button variant="outline" size="sm" className="bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Paylaş
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-12">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div
            className="text-foreground font-dm-sans leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Reading Progress & Actions */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground font-dm-sans">Bu yazıyı beğendiniz mi?</span>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="bg-transparent">
                Önceki Yazı
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                Sonraki Yazı
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
