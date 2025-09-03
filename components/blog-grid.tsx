"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { listBlogs } from "@/lib/api/blogService"
import { Calendar, User, ArrowRight } from "lucide-react"

type BlogPost = any

export function BlogGrid() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams?.get("category") || undefined
  const tag = searchParams?.get("tag") || undefined
  const q = searchParams?.get("search") || undefined

  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pageSize] = useState<number>(6)
  const [skip, setSkip] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)

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

  // fetch page (append)
  const fetchPage = async (currentSkip: number) => {
    setLoading(true)
    setError(null)
    try {
      const res: any = await listBlogs({
        search: q || undefined,
        category: category || undefined,
        tag: tag || undefined,
        limit: pageSize,
        skip: currentSkip,
        isActive: true,
      })
      const arr: BlogPost[] = Array.isArray(res) ? res : res?.data ?? []
      const active = (arr || []).filter((p: any) => (typeof p.isActive === "undefined" ? true : p.isActive === true))
      if (currentSkip === 0) {
        setPosts(active)
      } else {
        setPosts((prev) => [...prev, ...active])
      }
      setHasMore((arr?.length ?? 0) === pageSize)
    } catch (err) {
      console.error("Error fetching posts", err)
      setError("Yazılar yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  // reset when category/tag/search changes
  useEffect(() => {
    setSkip(0)
    setHasMore(true)
    setPosts([])
    fetchPage(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, tag, q])

  const loadMore = () => {
    const nextSkip = skip + pageSize
    setSkip(nextSkip)
    fetchPage(nextSkip)
  }

  // Sidebar derived data
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [sidebarCategories, setSidebarCategories] = useState<{ label: string; count: number }[]>([])

  useEffect(() => {
    // derive from currently loaded posts for sidebar counts/tags
    const cats = new Map<string, number>()
    const tagsSet = new Set<string>()
    for (const p of posts) {
      if (p?.isActive === false) continue
      const cat = p.category ?? "Diğer"
      cats.set(cat, (cats.get(cat) ?? 0) + 1)
      if (Array.isArray(p.tags)) {
        for (const t of p.tags) tagsSet.add(t)
      }
    }
    setSidebarCategories(Array.from(cats.entries()).map(([label, count]) => ({ label, count })))
    setAllTags(Array.from(tagsSet))
  }, [posts])

  useEffect(() => {
    let mounted = true
    const fetchRecent = async () => {
      try {
        const r: any = await listBlogs({ limit: 10, isActive: true })
        const arr: BlogPost[] = Array.isArray(r) ? r : r?.data ?? []
        if (!mounted) return
        const active = arr.filter((p: any) => p?.isActive !== false)
        active.sort((a, b) => (new Date(b.date || b.createdAt).getTime() - new Date(a.date || a.createdAt).getTime()))
        setRecentPosts(active.slice(0, 3))
      } catch (err) {
        console.error("recent fetch error", err)
      }
    }
    fetchRecent()
    return () => {
      mounted = false
    }
  }, [])

  const featuredPost = posts[0] ?? null
  const regularPosts = posts.slice(featuredPost ? 1 : 0)

  // helpers to update URL params (click handlers)
  const setCategoryInUrl = (categoryId: string | null) => {
    const params = new URLSearchParams(Array.from(searchParams?.entries() ?? []))
    if (!categoryId || categoryId === "all") params.delete("category")
    else params.set("category", categoryId)
    // when setting category, remove tag
    params.delete("tag")
    const qs = params.toString()
    router.push(`${qs ? `?${qs}` : ""}`)
  }

  const setTagInUrl = (tagId: string | null) => {
    const params = new URLSearchParams(Array.from(searchParams?.entries() ?? []))
    if (!tagId) params.delete("tag")
    else params.set("tag", tagId)
    // when setting tag, remove category
    params.delete("category")
    const qs = params.toString()
    router.push(`${qs ? `?${qs}` : ""}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-3 gap-8 md:gap-12 py-8 md:py-12">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <div className="text-gray-600 mb-2 text-sm">
            {loading && posts.length === 0 ? "Yükleniyor..." : `${(posts || []).length} yazı görüntüleniyor`}
            {category && <span> / Kategori: <span className="font-medium">{category}</span></span>}
            {tag && <span> / Etiket: <span className="font-medium">#{tag}</span></span>}
          </div>

          {/* Featured big post */}
          {featuredPost && (
            <article className="bg-white rounded-xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 mb-8">
              <div className="relative h-56 md:h-72 lg:h-80">
                <Image src={getImageUrl(featuredPost.image)} alt={featuredPost.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 p-6 md:p-8">
                  <div className="flex items-center gap-3 text-sm text-white mb-3">
                    <span className="bg-orange-500 px-3 py-1 rounded-full text-xs font-semibold">{featuredPost.category}</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatToDayMonthYear(featuredPost.date || featuredPost.createdAt)}</span>
                    </div>
                  </div>

                  <h2 className="text-xl md:text-3xl font-bold text-white mb-3">{featuredPost.title}</h2>
                  <p className="text-white/90 max-w-3xl mb-4 line-clamp-2">{featuredPost.excerpt}</p>

                  <Link href={`/blog/${featuredPost.slug ?? featuredPost._id ?? featuredPost.id}`}>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Devamını Oku
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Tags below featured post */}
              <div className="p-4 md:p-6">
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(featuredPost.tags) && featuredPost.tags.map((t: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setTagInUrl(t)}
                      className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs hover:bg-orange-100 hover:text-orange-600 transition-colors"
                    >
                      #{t}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          )}

          {/* Regular posts: 2-column grid like in the image */}
          {regularPosts.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {regularPosts.map((post: BlogPost) => (
                <article key={post._id ?? post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-40 md:h-48 overflow-hidden">
                    <Image src={getImageUrl(post.image)} alt={post.title} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    <div className="text-orange-500 text-xs font-semibold mb-2 tracking-wider uppercase">
                      {formatToDayMonthYear(post.date || post.createdAt)}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-orange-500 transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug ?? post._id ?? post.id}`}>{post.title}</Link>
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>

                      <Link href={`/blog/${post.slug ?? post._id ?? post.id}`}>
                        <Button variant="ghost" className="text-orange-500 hover:bg-orange-50 p-0 h-auto text-sm font-semibold">
                          Devamını Oku
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>

                    {/* Tags */}
                    {Array.isArray(post.tags) && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-3 border-t border-gray-100">
                        {post.tags.slice(0, 4).map((tagItem: string, tIdx: number) => (
                          <button
                            key={tIdx}
                            onClick={() => setTagInUrl(tagItem)}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs hover:bg-orange-100 hover:text-orange-600 transition-colors duration-300"
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

          {/* Load more */}
          <div className="text-center mt-8">
            {hasMore ? (
              <Button size="lg" variant="outline" className="bg-transparent border-gray-200 hover:bg-orange-50" onClick={loadMore} disabled={loading}>
                {loading ? "Yükleniyor..." : "Daha Fazla Yazı Yükle"}
              </Button>
            ) : (
              <div className="text-sm text-gray-500">Tüm yazılar yüklendi</div>
            )}
            {error && <div className="text-red-600 mt-2">{error}</div>}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 md:space-y-8">
          {/* Search box (UI only, BlogPage may control global search) */}
          <div className="bg-white rounded-xl md:rounded-3xl p-4 md:p-6 shadow-md md:shadow-lg">
            <div className="relative">
              <input
                placeholder="Anahtar Kelime Girin"
                className="w-full h-10 md:h-12 rounded-lg md:rounded-xl border border-gray-200 px-4 text-sm"
                readOnly
              />
              <button className="absolute right-2 top-2 h-8 w-8 md:h-10 md:w-10 bg-orange-500 rounded-md flex items-center justify-center text-white">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Categories (sidebar) */}
          <div className="bg-white rounded-xl md:rounded-3xl p-4 md:p-6 shadow-md md:shadow-lg">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Kategoriler</h3>
            <div className="space-y-2 md:space-y-3">
              {sidebarCategories.length === 0 ? (
                <div className="text-sm text-gray-500">Yükleniyor...</div>
              ) : (
                sidebarCategories.map((c, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCategoryInUrl(c.label)}
                    className="flex items-center justify-between p-2 md:p-3 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer group"
                  >
                    <span className="font-medium text-gray-700 text-sm md:text-base group-hover:text-orange-500">{c.label}</span>
                    <span className="bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-600 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs">
                      {c.count}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent posts */}
          <div className="bg-white rounded-xl md:rounded-3xl p-4 md:p-6 shadow-md md:shadow-lg">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Son Yazılar</h3>
            <div className="space-y-3 md:space-y-4">
              {recentPosts.map((p) => (
                <Link href={`/blog/${p.slug}`} key={p._id}>
                  <div className="flex items-center space-x-3 md:space-x-4 group cursor-pointer">
                    <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={getImageUrl(p.image)} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <div className="text-orange-500 text-xs font-semibold mb-1 tracking-wider uppercase">
                        {formatToDayMonthYear(p.date)}
                      </div>
                      <h4 className="text-xs md:text-sm font-semibold text-gray-900 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
                        {p.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl md:rounded-3xl p-4 md:p-6 shadow-md md:shadow-lg">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Etiketler</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.length === 0 ? (
                <div className="text-sm text-gray-500">Yükleniyor...</div>
              ) : (
                allTags.map((tagItem, index) => (
                  <button key={index} onClick={() => setTagInUrl(tagItem)} className="px-3 py-1.5 rounded-full text-xs cursor-pointer transition-colors duration-300 bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600">
                    #{tagItem}
                  </button>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}