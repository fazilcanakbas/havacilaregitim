"use client"
import React, { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Share2, BookOpen, ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { BlogPost as BlogPostType } from "@/lib/api/blogService"
import { getBlog, listBlogs } from "@/lib/api/blogService"
import { useLanguage } from "@/lib/language-context"

interface BlogPostProps {
  postId: string
  apiBaseUrl?: string
}

export function BlogPost({ postId, apiBaseUrl }: BlogPostProps) {
  const { language } = useLanguage()

  const [post, setPost] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [prevPost, setPrevPost] = useState<BlogPostType | null>(null)
  const [nextPost, setNextPost] = useState<BlogPostType | null>(null)
  const [navLoading, setNavLoading] = useState<boolean>(false)
  const [shareCopied, setShareCopied] = useState<boolean>(false)

  const baseUrl =
    apiBaseUrl ||
    (typeof window !== "undefined" && process.env.NEXT_PUBLIC_API_URL) ||
    "http://localhost:5000"

  const isSameId = (a: any, b: any) => {
    if (a == null || b == null) return false
    const sa = String(a).trim()
    const sb = String(b).trim()
    if (sa === sb) return true
    if (!Number.isNaN(Number(sa)) && !Number.isNaN(Number(sb))) {
      return Number(sa) === Number(sb)
    }
    return false
  }

  // localized getters: use English fields if language === "en" and English value exists, otherwise fallback to Turkish
  const getTitle = (p: any) => (language === "en" && p?.titleEn ? p.titleEn : p?.title ?? "")
  const getExcerpt = (p: any) =>
    (language === "en" && p?.excerptEn ? p.excerptEn : p?.excerpt ?? "") ||
    (p.content ? String(p.content).replace(/<[^>]+>/g, "").slice(0, 140) + "..." : "")
  const getContent = (p: any) => (language === "en" && p?.contentEn ? p.contentEn : p?.content ?? "")
  const getCategory = (p: any) => (language === "en" && p?.categoryEn ? p.categoryEn : p?.category ?? "")
  const getDateLocale = () => (language === "en" ? "en-US" : "tr-TR")

  useEffect(() => {
    if (!postId) return
    let mounted = true
    setLoading(true)
    setError(null)
    setPost(null)
    getBlog(postId)
      .then((res: any) => {
        const normalized: BlogPostType | null = Array.isArray(res) ? res[0] : res?.data ?? res
        if (!mounted) return
        if (!normalized) {
          setError(language === "en" ? "Post not found" : "Yazı bulunamadı")
          setPost(null)
          return
        }
        if (typeof normalized.isActive !== "undefined" && normalized.isActive !== true) {
          setError(language === "en" ? "This post is not active." : "Bu yazı aktif değil.")
          setPost(null)
          return
        }
        setPost(normalized)
      })
      .catch((err) => {
        if (!mounted) return
        console.error("getBlog error", err)
        setError(language === "en" ? "Failed to load post" : "Yazı yüklenirken hata oluştu")
        setPost(null)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [postId, baseUrl, language])

  useEffect(() => {
    if (!post) {
      setPrevPost(null)
      setNextPost(null)
      return
    }

    let mounted = true
    setNavLoading(true)
    setPrevPost(null)
    setNextPost(null)

    const fetchNav = async () => {
      try {
        const res: any = await listBlogs({ limit: 200, isActive: true })
        const list: BlogPostType[] = Array.isArray(res) ? res : res?.data ?? res?.posts ?? []
        const activeList = (list || []).filter((p) => typeof p.isActive === "undefined" || p.isActive === true)

        const getTime = (p: BlogPostType) => {
          const d = p.date ?? (p as any).createdAt ?? null
          const t = d ? Date.parse(String(d)) : NaN
          return Number.isNaN(t) ? 0 : t
        }
        activeList.sort((a, b) => getTime(b) - getTime(a))

        const idx = activeList.findIndex((p) => {
          return isSameId(p._id ?? p.id ?? p.slug, post._id ?? post.id ?? post.slug)
        })

        const safeIdx = idx >= 0 ? idx : activeList.findIndex((p) => p.title === post.title)

        if (!mounted) return

        if (safeIdx >= 0) {
          const nextCandidate = activeList[safeIdx - 1] ?? null
          const prevCandidate = activeList[safeIdx + 1] ?? null
          setNextPost(nextCandidate ?? null)
          setPrevPost(prevCandidate ?? null)
        } else {
          setNextPost(null)
          setPrevPost(null)
        }
      } catch (err) {
        console.error("Failed to fetch nav posts", err)
      } finally {
        if (mounted) setNavLoading(false)
      }
    }

    fetchNav()
    return () => {
      mounted = false
    }
  }, [post])

  const renderImageSrc = (img?: string) => {
    if (!img) return "/placeholder.svg"
    if (img.startsWith("http://") || img.startsWith("https://")) return img
    return `${baseUrl}${img}`
  }

  // Paylaş fonksiyonu (localized)
  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    const title = post ? getTitle(post) || (language === "en" ? "Blog post" : "Blog Yazısı") : (language === "en" ? "Blog post" : "Blog Yazısı")
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
      } else {
        await navigator.clipboard.writeText(url)
        setShareCopied(true)
        setTimeout(() => setShareCopied(false), 1500)
      }
    } catch (error) {
      setShareCopied(false)
    }
  }

  // Önceki/Sonraki yazı için özel kart tasarımı
  function BlogNavCard({
    post,
    direction,
  }: {
    post: BlogPostType
    direction: "prev" | "next"
  }) {
    // excerpt veya content'ten kısa özet (localized)
    const excerpt = getExcerpt(post)

    return (
      <Link href={`/blog/${post.slug ?? post._id ?? post.id}`}>
        <div
          className={`group relative bg-white rounded-xl shadow flex items-center gap-4 p-3 border border-gray-100 hover:shadow-lg transition-all
            ${direction === "prev" ? "flex-row" : "flex-row-reverse"}`}
        >
          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
            <Image
              src={renderImageSrc(post.image)}
              alt={getTitle(post)}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div
            className={`flex flex-col min-w-0 ${direction === "next" ? "text-right items-end" : "text-left items-start"}`}
          >
            <span className="text-[11px] text-orange-500 font-bold uppercase mb-1">
              {direction === "prev"
                ? (language === "en" ? "Previous post" : "Önceki Yazı")
                : (language === "en" ? "Next post" : "Sonraki Yazı")}
            </span>
            <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors text-sm line-clamp-2">
              {getTitle(post)}
            </h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{excerpt}</p>
            <div className="flex items-center gap-2 mt-2">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">
                {new Date(post.date || Date.now()).toLocaleDateString(getDateLocale())}
              </span>
              {getCategory(post) && (
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs ml-2">
                  {getCategory(post)}
                </span>
              )}
            </div>
          </div>
          <span
            className={`absolute top-1/2 -translate-y-1/2 ${direction === "prev" ? "left-2" : "right-2"}`}
          />
        </div>
      </Link>
    )
  }

  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        {loading && <div className="text-center py-12">{language === "en" ? "Loading..." : "Yükleniyor..."}</div>}

        {error && (
          <div className="text-center text-red-600 py-6">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && !post && <div className="text-center py-12">{language === "en" ? "Post not found." : "Yazı bulunamadı."}</div>}

        {!loading && post && (
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                {getCategory(post) && <Badge variant="outline">{getCategory(post)}</Badge>}
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(post.date  || Date.now()).toLocaleDateString(getDateLocale())}</span>
                </div>
                <div className="flex items-center">
                  {/* <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readTime || ""}</span> */}
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-inter mb-6">
                {getTitle(post)}
              </h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground font-dm-sans">{post.author}</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent relative"
                  onClick={handleShare}
                  aria-label={language === "en" ? "Share" : "Paylaş"}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {language === "en" ? "Share" : "Paylaş"}
                  <span
                    className={`absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-primary text-white rounded py-1 px-2 transition ${
                      shareCopied ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {language === "en" ? "Link copied!" : "Link kopyalandı!"}
                  </span>
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-12">
              <Image src={renderImageSrc(post.image)} alt={getTitle(post)} fill className="object-cover" />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div
                className="text-foreground font-dm-sans leading-relaxed"
                dangerouslySetInnerHTML={{ __html: getContent(post) || (language === "en" ? "<p>No content</p>" : "<p>İçerik yok</p>") }}
              />
            </div>

            {/* Reading Progress & Actions */}
            <div className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full sm:w-auto">
                  {navLoading ? (
                    <>
                      <Button variant="outline" size="sm" className="bg-transparent" disabled>
                        {language === "en" ? "Previous post" : "Önceki Yazı"}
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent" disabled>
                        {language === "en" ? "Next post" : "Sonraki Yazı"}
                      </Button>
                    </>
                  ) : (
                    <>
                      {prevPost ? (
                        <BlogNavCard post={prevPost} direction="prev" />
                      ) : (
                        <Button variant="outline" size="sm" className="bg-transparent" disabled>
                          {language === "en" ? "Previous post" : "Önceki Yazı"}
                        </Button>
                      )}
                      {nextPost ? (
                        <BlogNavCard post={nextPost} direction="next" />
                      ) : (
                        <Button variant="outline" size="sm" className="bg-transparent" disabled>
                          {language === "en" ? "Next post" : "Sonraki Yazı"}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  )
}