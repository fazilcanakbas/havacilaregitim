"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Eye, Calendar, MessageSquare, ThumbsUp } from "lucide-react"

// Mock data for blog posts
const mockPosts = [
  {
    id: 1,
    title: "Havacılık Sektöründe Yeni Teknolojiler",
    titleEn: "New Technologies in Aviation Industry",
    excerpt: "Modern havacılık teknolojilerinin gelişimi ve geleceği",
    excerptEn: "Development and future of modern aviation technologies",
    content: "Blog içeriği burada...",
    contentEn: "Blog content here...",
    category: "Teknoloji",
    status: "published",
    author: "Ahmet Yılmaz",
    publishDate: "2024-01-15",
    views: 1250,
    likes: 45,
    comments: 12,
    image: "/blog-tech.jpg",
  },
  {
    id: 2,
    title: "Pilot Olmak İçin Gerekli Adımlar",
    titleEn: "Steps Required to Become a Pilot",
    excerpt: "Pilot kariyerine başlamak isteyenler için rehber",
    excerptEn: "Guide for those who want to start a pilot career",
    content: "Blog içeriği burada...",
    contentEn: "Blog content here...",
    category: "Eğitim",
    status: "published",
    author: "Fatma Demir",
    publishDate: "2024-01-10",
    views: 2100,
    likes: 78,
    comments: 23,
    image: "/blog-pilot.jpg",
  },
  {
    id: 3,
    title: "Simülatör Eğitiminin Önemi",
    titleEn: "Importance of Simulator Training",
    excerpt: "Neden simülatör eğitimi bu kadar önemli?",
    excerptEn: "Why is simulator training so important?",
    content: "Blog içeriği burada...",
    contentEn: "Blog content here...",
    category: "Eğitim",
    status: "draft",
    author: "Mehmet Kaya",
    publishDate: "2024-01-20",
    views: 0,
    likes: 0,
    comments: 0,
    image: "/blog-simulator.jpg",
  },
]

export default function BlogPage() {
  const [posts, setPosts] = useState(mockPosts)
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddPost = () => {
    setSelectedPost(null)
    setIsDialogOpen(true)
  }

  const handleEditPost = (post: any) => {
    setSelectedPost(post)
    setIsDialogOpen(true)
  }

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Yönetimi</h1>
          <p className="text-gray-600">Blog yazılarını yönetin ve düzenleyin</p>
        </div>
        <Button onClick={handleAddPost} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Yeni Yazı Ekle
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Yazı</p>
                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Edit className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Yayınlanan</p>
                <p className="text-2xl font-bold text-green-600">
                  {posts.filter((p) => p.status === "published").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Görüntüleme</p>
                <p className="text-2xl font-bold text-purple-600">
                  {posts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Beğeni</p>
                <p className="text-2xl font-bold text-red-600">{posts.reduce((sum, p) => sum + p.likes, 0)}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <ThumbsUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Blog yazısı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Kategori seç" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="teknoloji">Teknoloji</SelectItem>
                <SelectItem value="egitim">Eğitim</SelectItem>
                <SelectItem value="haberler">Haberler</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Durum seç" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="published">Yayınlanan</SelectItem>
                <SelectItem value="draft">Taslak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Yazıları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{post.title}</h3>
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>
                        {post.status === "published" ? "Yayınlandı" : "Taslak"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.publishDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {post.comments}
                      </span>
                      <span>Yazar: {post.author}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Düzenle
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Post Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedPost ? "Blog Yazısını Düzenle" : "Yeni Blog Yazısı Ekle"}</DialogTitle>
            <DialogDescription>Blog yazısı bilgilerini girin ve kaydedin.</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="turkish" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="turkish">Türkçe</TabsTrigger>
              <TabsTrigger value="english">English</TabsTrigger>
            </TabsList>

            <TabsContent value="turkish" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Başlık</Label>
                  <Input id="title" defaultValue={selectedPost?.title} placeholder="Blog yazısı başlığı" />
                </div>
                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <Select defaultValue={selectedPost?.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seç" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Teknoloji">Teknoloji</SelectItem>
                      <SelectItem value="Eğitim">Eğitim</SelectItem>
                      <SelectItem value="Haberler">Haberler</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt">Özet</Label>
                <Textarea id="excerpt" defaultValue={selectedPost?.excerpt} placeholder="Blog yazısı özeti" rows={2} />
              </div>

              <div>
                <Label htmlFor="content">İçerik</Label>
                <Textarea
                  id="content"
                  defaultValue={selectedPost?.content}
                  placeholder="Blog yazısı içeriği"
                  rows={8}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author">Yazar</Label>
                  <Input id="author" defaultValue={selectedPost?.author} placeholder="Yazar adı" />
                </div>
                <div>
                  <Label htmlFor="publishDate">Yayın Tarihi</Label>
                  <Input id="publishDate" type="date" defaultValue={selectedPost?.publishDate} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="english" className="space-y-4">
              <div>
                <Label htmlFor="titleEn">Title (English)</Label>
                <Input id="titleEn" defaultValue={selectedPost?.titleEn} placeholder="Blog post title in English" />
              </div>

              <div>
                <Label htmlFor="excerptEn">Excerpt (English)</Label>
                <Textarea
                  id="excerptEn"
                  defaultValue={selectedPost?.excerptEn}
                  placeholder="Blog post excerpt in English"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="contentEn">Content (English)</Label>
                <Textarea
                  id="contentEn"
                  defaultValue={selectedPost?.contentEn}
                  placeholder="Blog post content in English"
                  rows={8}
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>{selectedPost ? "Güncelle" : "Ekle"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
