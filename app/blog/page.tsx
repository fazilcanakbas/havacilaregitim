"use client"
import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, BookOpen, Calendar, User, ArrowRight } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { listBlogs } from "@/lib/api/blogService"
import { useLanguage } from "@/lib/language-context"



type CategoryCount = { id: string; label: string; count: number }
type BlogPost = any

export default function BlogPage() {
  // language from header (shared context)
  const { language } = useLanguage()

  // fetched data
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // UI state (client-side only, no URL changes)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [heroSearch, setHeroSearch] = useState<string>("")

  // pagination (client-side)
  const [pageSize] = useState<number>(6)
  const [visibleCount, setVisibleCount] = useState<number>(6)

  // helpers
  const API_HOST = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:5000"
  const getImageUrl = (path?: string) => {
    if (!path) return "/placeholder.svg"
    if (path.startsWith("http://") || path.startsWith("https://")) return path
    return `${API_HOST}${path}`
  }
  const formatToDayMonthYear = (isoString?: string) => {
    if (!isoString) return ""
    const date = new Date(isoString)
    if (Number.isNaN(date.getTime())) return isoString
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  // helpers to get localized fields (use EN if selected and available, otherwise fallback TR)
  const getTitle = (p: any) => (language === "en" && p?.titleEn ? p.titleEn : p?.title ?? "")
  const getExcerpt = (p: any) => (language === "en" && p?.excerptEn ? p.excerptEn : p?.excerpt ?? "")
  const getContent = (p: any) => (language === "en" && p?.contentEn ? p.contentEn : p?.content ?? "")
  const getCategory = (p: any) => (language === "en" && p?.categoryEn ? p.categoryEn : p?.category ?? "Diğer")
  const getTags = (p: any) => (language === "en" && Array.isArray(p?.tagsEn) && p.tagsEn.length > 0 ? p.tagsEn : (Array.isArray(p?.tags) ? p.tags : []))

  // Fetch all posts once (client-side). We fetch a large limit so filtering is done locally.
  useEffect(() => {
    let mounted = true
    const fetchAll = async () => {
      setLoading(true)
      setError(null)
      try {
        const res: any = await listBlogs({ limit: 1000, isActive: true })
        const arr: BlogPost[] = Array.isArray(res) ? res : res?.data ?? []
        if (!mounted) return
        // ensure consistent ordering (newest first)
        arr.sort((a: any, b: any) => (new Date(b.date || b.createdAt).getTime() - new Date(a.date || a.createdAt).getTime()))
        setAllPosts(arr)
      } catch (err) {
        console.error("Error fetching all posts", err)
        setError("Yazılar yüklenirken hata oluştu")
        setAllPosts([])
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchAll()
    return () => {
      mounted = false
    }
  }, [])

  // Derived lists for UI (now depend on language)
  const categories = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of allPosts) {
      if (p?.isActive === false) continue
      const cat = getCategory(p)
      map.set(cat, (map.get(cat) ?? 0) + 1)
    }
    const result: CategoryCount[] = [{ id: "all", label: language === "en" ? "All" : "Tümü", count: allPosts.filter((p: any) => p?.isActive !== false).length }]
    for (const [label, count] of map.entries()) {
      result.push({ id: label, label, count })
    }
    return result
  }, [allPosts, language])

  const allTags = useMemo(() => {
    const t = new Set<string>()
    for (const p of allPosts) {
      const tags = getTags(p)
      if (Array.isArray(tags)) {
        for (const tag of tags) if (tag) t.add(tag)
      }
    }
    return Array.from(t)
  }, [allPosts, language])

  const recentPosts = useMemo(() => {
    return allPosts.filter((p: any) => p?.isActive !== false).slice(0, 3)
  }, [allPosts])

  // Filtering performed entirely client-side (no URL changes). Now respects language via getters.
  const filteredPosts = useMemo(() => {
    const s = searchTerm.trim().toLowerCase()
    return allPosts.filter((post: any) => {
      if (post?.isActive === false) return false
      if (selectedCategory && getCategory(post) !== selectedCategory) return false
      if (selectedTag && (!Array.isArray(getTags(post)) || !getTags(post).includes(selectedTag))) return false
      if (!s) return true
      const matchTitle = String(getTitle(post) ?? "").toLowerCase().includes(s)
      const matchExcerpt = String(getExcerpt(post) ?? "").toLowerCase().includes(s)
      const matchAuthor = String(post.author ?? "").toLowerCase().includes(s)
      const matchTags = Array.isArray(getTags(post)) && getTags(post).some((t: string) => t.toLowerCase().includes(s))
      return matchTitle || matchExcerpt || matchAuthor || matchTags
    })
  }, [allPosts, selectedCategory, selectedTag, searchTerm, language])

  // Reset visible count when filters/search change
  useEffect(() => {
    setVisibleCount(pageSize)
  }, [selectedCategory, selectedTag, searchTerm, pageSize, language])

  const visiblePosts = filteredPosts.slice(0, visibleCount)
  const hasMore = filteredPosts.length > visibleCount

  const loadMore = () => setVisibleCount((prev) => prev + pageSize)

  // Featured + regular split
  const featuredPost = visiblePosts[0] ?? null
  const regularPosts = visiblePosts.slice(featuredPost ? 1 : 0)

  // UI handlers (client-side only)
  const handleCategoryClick = (catId: string | null) => {
    if (!catId || catId === "all") setSelectedCategory(null)
    else setSelectedCategory(catId)
    setSelectedTag(null)
  }

  const handleTagClick = (tagId: string | null) => {
    if (!tagId) setSelectedTag(null)
    else setSelectedTag(tagId)
    setSelectedCategory(null)
  }

  const handleHeroSearch = () => {
    setSearchTerm(heroSearch)
    
  }

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedTag(null)
    setSearchTerm("")
    setHeroSearch("")
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-32 bg-[color:var(--page-bg,#fafafa)]">
      <section       className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px] overflow-hidden"
       style={{
        backgroundImage: "url('/egitimbanner.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        backgroundAttachment: "fixed",
        top: -40,
      }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* <div className="inline-flex items-center px-4 py-2 rounded-full  border border-primary/20 mb-6"
            style={{
              backgroundColor: "rgba(24, 29, 43, 1)"
            }}
            >
              <BookOpen className="w-4 h-4  mr-2"
              style={{
                color: "rgba(255, 255, 255, 1)"
              }}
              />
              <span  style={{
                color: "rgba(255, 255, 255, 1)"
              }} className="text-sm font-medium text-primary">Havacılık Eğitim Blog</span>
            </div> */}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-inter mb-6"
            style={{
                color: "rgba(255, 255, 255, 1)"
              }}
            >
              {language === "tr" ? "Havacılık Dünyasından" : "From the Aviation World"}
              <span style={{
                color: "rgba(255, 255, 255, 1)"
              }} className="text-primary block">
                {language === "tr" ? "Güncel İçerikler" : "Latest Content"}
              </span>
            </h1>

            <p style={{
                color: "rgba(255, 255, 255, 1)",
                marginTop:40
              }} className="text-lg text-muted-foreground font-dm-sans mb-8 max-w-2xl mx-auto" 
              
              >
              {language === "tr" 
                ? "Pilot eğitimi, havacılık teknolojileri, sektör haberleri ve kariyer rehberleri ile havacılık dünyasını keşfedin."
                : "Explore the aviation world with pilot training, aviation technologies, industry news and career guides."
              }
            </p>
          </div>
        </div>
      </section>

      {/* Scope for mixing primary (OKLCH) and accent (orange) */}
      <div className="primary-scope">
        <style jsx global>{`
          .primary-scope {
            /* Primary (user-provided OKLCH) + fallback hex */
            --primary-oklch: oklch(58.36% 0.08424 202.468);
            --primary-hex: #181d3aff;
            --primary: var(--primary-oklch);

            /* Accent (turuncu) */
            --accent-hex: #f97316;
            --accent: var(--accent-hex);

            /* Soft backgrounds */
            --primary-50: rgba(8,145,178,0.06);
            --primary-100: rgba(8,145,178,0.12);
            --accent-50: rgba(249,115,22,0.06);
            --accent-100: rgba(249,115,22,0.12);
          }

          /* Primary utilities (teal-ish / OKLCH) */
          .primary-scope .bg-primary { background-color: var(--primary-hex) !important; }
          .primary-scope .hover\\:bg-primary:hover { background-color: var(--primary-hex) !important; }
          .primary-scope .text-primary { color: var(--primary-hex) !important; }
          .primary-scope .bg-primary-50 { background-color: var(--primary-50) !important; }
          .primary-scope .hover\\:bg-primary-50:hover { background-color: var(--primary-50) !important; }
          .primary-scope .hover\\:text-primary:hover { color: var(--primary-hex) !important; }
          .primary-scope .border-primary-20 { border-color: rgba(8,145,178,0.2) !important; }

          /* Accent utilities (orange) */
          .primary-scope .bg-accent { background-color: var(--accent-hex) !important; }
          .primary-scope .text-accent { color: var(--accent-hex) !important; }
          .primary-scope .bg-accent-50 { background-color: var(--accent-50) !important; }
          .primary-scope .bg-accent-100 { background-color: var(--accent-100) !important; }
          .primary-scope .hover\\:bg-accent:hover { background-color: var(--accent-hex) !important; }
          .primary-scope .hover\\:text-accent:hover { color: var(--accent-hex) !important; }

          /* small helpers for buttons/badges */
          .primary-scope .btn-primary { background-color: var(--primary-hex); color: white; }
          .primary-scope .btn-accent { background-color: var(--accent-hex); color: white; }
        `}</style>

        {/* Blog Content */}
        <section className="py-8 md:py-16 px-4 bg-gray-50"
        
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Kategori Filtreleri */}
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  <Button
                    onClick={() => setSelectedCategory(null)}
                    variant={selectedCategory === null ? "default" : "outline"}
                    className={`text-xs md:text-sm ${selectedCategory === null ? "btn-primary" : ""}`}
                    size="sm"
                  >
                    {language === "en" ? "All" : "Tümü"}
                  </Button>
                  {categories.map((category, idx) => (
                    category.id !== "all" && (
                      <Button
                        key={idx}
                        onClick={() => setSelectedCategory(category.id)}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        className={`text-xs md:text-sm ${selectedCategory === category.id ? "btn-accent" : ""}`}
                        size="sm"
                      >
                        {category.label}
                      </Button>
                    )
                  ))}
                </div>

                {/* Sonuç Sayısı */}
                <div className="text-gray-600 mb-6 md:mb-8 text-sm">
                  {loading ? (language === "en" ? "Loading..." : "Yükleniyor...") :
                    <>
                      {filteredPosts.length} {language === "en" ? "posts found" : "yazı bulundu"}
                      {selectedCategory && <span> / {language === "en" ? "Category" : "Kategori"}: <span className="font-medium">{selectedCategory}</span></span>}
                      {selectedTag && <span> / {language === "en" ? "Tag" : "Etiket"}: <span className="font-medium">#{selectedTag}</span></span>}
                      {searchTerm && <span> / {language === "en" ? "Search" : "Arama"}: <span className="font-medium">"{searchTerm}"</span></span>}
                      {(selectedCategory || selectedTag || searchTerm) && (
                        <button
                          onClick={clearFilters}
                          className="ml-2 text-primary hover:underline"
                        >
                          {language === "en" ? "Clear filters" : "Filtreleri Temizle"}
                        </button>
                      )}
                    </>
                  }
                </div>

                {/* Featured post (top left) */}
                {featuredPost && (
                  <article className="bg-white rounded-xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 mb-8">
                    <div className="relative h-56 md:h-72 lg:h-80">
                      <Image src={getImageUrl(featuredPost.image)} alt={getTitle(featuredPost)} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute left-0 right-0 bottom-0 p-6 md:p-8">
                        <div className="flex items-center gap-3 text-sm text-white mb-3">
                          <span className="bg-accent px-3 py-1 rounded-full text-xs font-semibold">{getCategory(featuredPost)}</span>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-white/90">{formatToDayMonthYear(featuredPost.date || featuredPost.createdAt)}</span>
                          </div>
                        </div>

                        <h2 className="text-xl md:text-3xl font-bold text-white mb-3">{getTitle(featuredPost)}</h2>
                        <p className="text-white/90 max-w-3xl mb-4 line-clamp-2">{getExcerpt(featuredPost)}</p>

                        <Link href={`/blog/${featuredPost.slug ?? featuredPost._id ?? featuredPost.id}`}>
                          <Button className="btn-primary">
                            {language === "en" ? "Read more" : "Devamını Oku"}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="p-4 md:p-6">
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(getTags(featuredPost)) && getTags(featuredPost).map((t: string, i: number) => (
                          <button
                            key={i}
                            onClick={() => handleTagClick(t)}
                            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs hover:bg-accent-100 hover:text-accent transition-colors"
                          >
                            #{t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </article>
                )}

                {/* Regular posts (right grid) */}
                {regularPosts.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {regularPosts.map((post: BlogPost) => (
                      <article key={post._id ?? post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="relative h-40 md:h-48 overflow-hidden">
                          <Image src={getImageUrl(post.image)} alt={getTitle(post)} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                          <div className="absolute top-3 left-3">
                            <span className="bg-accent text-white px-2 py-1 rounded-full text-xs font-semibold">
                              {getCategory(post)}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 md:p-6">
                          <div className="text-primary text-xs font-semibold mb-2 tracking-wider uppercase">
                            {formatToDayMonthYear(post.date || post.createdAt)}
                          </div>

                          <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-primary transition-colors line-clamp-2">
                            <Link href={`/blog/${post.slug ?? post._id ?? post.id}`}>{getTitle(post)}</Link>
                          </h3>

                          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{getExcerpt(post)}</p>

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <User className="w-3 h-3" />
                              <span>{post.author}</span>
                            </div>

                            <Link href={`/blog/${post.slug ?? post._id ?? post.id}`}>
                              <Button variant="ghost" className="text-primary hover:bg-primary-50 h-auto text-sm font-semibold">
                                {language === "en" ? "Read more" : "Devamını Oku"}
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            </Link>
                          </div>

                          {Array.isArray(getTags(post)) && getTags(post).length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-3 border-t border-gray-100">
                              {getTags(post).slice(0, 4).map((tagItem: string, tIdx: number) => (
                                <button
                                  key={tIdx}
                                  onClick={() => handleTagClick(tagItem)}
                                  className={`px-2 py-1 rounded-full text-xs cursor-pointer transition-colors duration-300 ${selectedTag === tagItem ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-accent-100 hover:text-accent"}`}
                                >
                                  #{tagItem}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {/* no results */}
                {!loading && filteredPosts.length === 0 && (
                  <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-3xl text-center">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">{language === "en" ? "No posts found" : "Aradığınız kriterlere uygun yazı bulunamadı"}</h3>
                    <p className="text-gray-600 mb-4">{language === "en" ? "Try different keywords or clear filters" : "Farklı anahtar kelimeler deneyebilir veya filtreleri kaldırabilirsiniz"}</p>
                    <Button onClick={clearFilters} className="btn-primary">{language === "en" ? "Show all posts" : "Tüm Yazıları Göster"}</Button>
                  </div>
                )}

                {/* Load more */}
                {filteredPosts.length > 0 && (
                  <div className="text-center mt-8">
                    {hasMore ? (
                      <Button size="lg" variant="outline" className="bg-transparent border-gray-200 hover:bg-accent-50" onClick={loadMore} disabled={loading}>
                        {loading ? (language === "en" ? "Loading..." : "Yükleniyor...") : (language === "en" ? "Load more posts" : "Daha Fazla Yazı Yükle")}
                      </Button>
                    ) : (
                      <div className="text-sm text-gray-500">{language === "en" ? "All posts loaded" : "Tüm yazılar yüklendi"}</div>
                    )}
                    {error && <div className="text-red-600 mt-2">{error}</div>}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-6 md:space-y-8">
                {/* Search */}
                <div className="bg-white rounded-xl md:rounded-3xl p-4 md:p-6 shadow-md md:shadow-lg">
                  <div className="relative">
                    <Input
                      placeholder={language === "en" ? "Enter keywords" : "Anahtar Kelime Girin"}
                      value={heroSearch}
                      onChange={(e: any) => setHeroSearch(e.target.value)}
                      className="w-full h-10 md:h-12 rounded-lg md:rounded-xl border-gray-200 text-gray-600 placeholder:text-gray-400 pr-10 md:pr-12 text-sm"
                    />
                    <Button
                      size="sm"
                      className="absolute right-2 top-2 h-6 w-6 md:h-8 md:w-8 p-0 btn-primary rounded-md md:rounded-lg"
                      onClick={handleHeroSearch}
                    >
                      <Search className="w-3 h-3 md:w-4 md:h-4" />
                    </Button>
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-xl md:rounded-3xl p-4 md:p-6 shadow-md md:shadow-lg">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">{language === "en" ? "Categories" : "Kategoriler"}</h3>
                  <div className="space-y-2 md:space-y-3">
                    {categories.length === 0 ? (
                      <div className="text-sm text-gray-500">Yükleniyor...</div>
                    ) : (
                      categories.map((category, idx) => {
                        const count = category.count
                        return (
                          <div
                            key={idx}
                            onClick={() => handleCategoryClick(category.id === "all" ? null : category.id)}
                            className="flex items-center justify-between p-2 md:p-3 rounded-lg hover:bg-accent-50 transition-colors cursor-pointer group"
                          >
                            <span className="font-medium text-gray-700 text-sm md:text-base group-hover:text-accent">{category.label}</span>
                            <span className="bg-gray-100 text-gray-600 group-hover:bg-accent-100 group-hover:text-accent px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs">
                              {count}
                            </span>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>

                {/* Recent posts */}
                <div className="bg-white rounded-xl md:rounded-3xl p-4 md:p-6 shadow-md md:shadow-lg">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">{language === "en" ? "Recent posts" : "Son Yazılar"}</h3>
                  <div className="space-y-3 md:space-y-4">
                    {recentPosts.map((p) => (
                      <Link href={`/blog/${p.slug}`} key={p._id}>
                        <div 
                         style={{
                   marginBottom: '0.5rem',
                  }}
                        className="flex items-center space-x-3 md:space-x-4 group cursor-pointer">
                          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                           
                            src={getImageUrl(p.image)} alt={getTitle(p)} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="flex-1">
                            <div className="text-primary text-xs font-semibold mb-1 tracking-wider uppercase">
                              {formatToDayMonthYear(p.date)}
                            </div>
                            <h4 className="text-xs md:text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                              {getTitle(p)}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-xl md:rounded-3xl p-4 md:p-6 shadow-md md:shadow-lg">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">{language === "en" ? "Tags" : "Etiketler"}</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.length === 0 ? (
                      <div className="text-sm text-gray-500">Yükleniyor...</div>
                    ) : (
                      allTags.map((tagItem, index) => (
                        <button
                          key={index}
                          onClick={() => handleTagClick(tagItem)}
                          className={`px-3 py-1.5 rounded-full text-xs cursor-pointer transition-colors duration-300 ${selectedTag === tagItem ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-accent-100 hover:text-accent"}`}
                        >
                          #{tagItem}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}