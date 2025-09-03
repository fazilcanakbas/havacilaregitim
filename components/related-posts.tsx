"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { BlogPost as BlogPostType } from "@/lib/api/blogService"
import { listBlogs } from "@/lib/api/blogService"
import { useLanguage } from "@/lib/language-context"

interface RelatedPostsProps {
  currentPostId: string
  apiBaseUrl?: string
  limit?: number
}

export function RelatedPosts({ currentPostId, apiBaseUrl, limit = 3 }: RelatedPostsProps) {
  const { language } = useLanguage()

  const [posts, setPosts] = useState<BlogPostType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const baseUrl =
    apiBaseUrl ||
    (typeof window !== "undefined" && process.env.NEXT_PUBLIC_API_URL) ||
    "http://localhost:5000"

  // Helper to compare possible id shapes (string, number, slug)
  const isSameId = (a: any, b: any) => {
    if (a == null || b == null) return false
    const sa = String(a).trim()
    const sb = String(b).trim()
    // direct equality (covers slug, id, _id)
    if (sa === sb) return true
    // numeric compare if both look like numbers
    if (!Number.isNaN(Number(sa)) && !Number.isNaN(Number(sb))) {
      return Number(sa) === Number(sb)
    }
    return false
  }

  // localized getters (use English fields when language === "en", fallback to Turkish)
  const getTitle = (p: any) => (language === "en" && p?.titleEn ? p.titleEn : p?.title ?? "")
  const getExcerpt = (p: any) =>
    (language === "en" && p?.excerptEn ? p.excerptEn : p?.excerpt ?? "") ||
    (p.content ? String(p.content).replace(/<[^>]+>/g, "").slice(0, 140) + "..." : "")
  const getCategory = (p: any) => (language === "en" && p?.categoryEn ? p.categoryEn : p?.category ?? "")
  const getDateLocale = () => (language === "en" ? "en-US" : "tr-TR")

  useEffect(() => {
    if (!currentPostId) {
      setPosts([])
      return
    }

    let mounted = true
    setLoading(true)
    setError(null)

    const fetchRelated = async () => {
      try {
        // Fetch active posts only, no category/tag filtering
        const result = await listBlogs({ limit: limit + 8, isActive: true })
        const normalized: BlogPostType[] = Array.isArray(result)
          ? result
          : result?.data ?? result?.posts ?? []

        // Remove duplicates, exclude the current post robustly and keep only active ones
        const seen = new Set<string>()
        const filtered = (normalized as BlogPostType[])
          .filter((p) => {
            // exclude if isActive exists and is false
            if (typeof p.isActive !== "undefined" && p.isActive !== true) return false

            // determine identifiers to compare
            const identifiers = [p._id, p.id, p.slug].map((x) => (x == null ? "" : String(x)))
            // if any identifier matches currentPostId, exclude this post
            for (const id of identifiers) {
              if (id && isSameId(id, currentPostId)) return false
            }

            // dedupe by primary identifier (prefer _id, then slug, then id)
            const key = identifiers.find(Boolean) ?? JSON.stringify(p)
            if (seen.has(key)) return false
            seen.add(key)
            return true
          })
          .slice(0, limit)

        if (!mounted) return
        setPosts(filtered)
      } catch (err) {
        console.error("Related posts fetch error", err)
        if (!mounted) return
        setError(language === "en" ? "Failed to load related posts" : "İlgili yazılar yüklenirken hata oluştu")
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchRelated()

    return () => {
      mounted = false
    }
  }, [currentPostId, limit, baseUrl, language])

  const renderImageSrc = (img?: string) => {
    if (!img) return "/placeholder.svg"
    if (img.startsWith("http://") || img.startsWith("https://")) return img
    return `${baseUrl}${img}`
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-inter mb-8 text-center">
            {language === "en" ? "Related posts" : "İlgili Yazılar"}
          </h2>

          {loading && <div className="text-center py-8">{language === "en" ? "Loading..." : "Yükleniyor..."}</div>}
          {error && <div className="text-center text-red-600 py-4">{error}</div>}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center text-muted-foreground py-6">
              {language === "en" ? "No related posts found." : "İlgili yazı bulunamadı."}
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card
                  key={post._id ?? post.id ?? post.slug}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={renderImageSrc(post.image)}
                      alt={getTitle(post)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {getCategory(post) && (
                      <Badge className="absolute top-4 left-4 bg-background/90 text-foreground">{getCategory(post)}</Badge>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{new Date(post.date ?? Date.now()).toLocaleDateString(getDateLocale())}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        <span>{post.author ?? ""}</span>
                      </div>
                    </div>

                    <CardTitle className="text-lg font-bold font-inter group-hover:text-primary transition-colors line-clamp-2">
                      {getTitle(post)}
                    </CardTitle>

                    <CardDescription className="text-muted-foreground font-dm-sans line-clamp-2">
                      {getExcerpt(post)}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <Link href={`/blog/${post.slug ?? post._id ?? post.id}`}>
                      <div className="flex items-center text-primary hover:text-accent transition-colors font-medium text-sm">
                        {language === "en" ? "Read more" : "Devamını Oku"}
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}