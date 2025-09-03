"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, X, Plus, Save, Eye } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function EditAnnouncementPage() {
  const params = useParams()
  const announcementId = params.id

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    priority: "medium",
    publishDate: "",
    expirationDate: "",
    featured: false,
    emailNotification: true,
    targetAudience: "all",
    status: "draft",
  })

  const [images, setImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading announcement data
    const loadAnnouncement = async () => {
      // In real app, fetch from API
      const mockData = {
        title: "2024 Pilot Eğitimi Başvuruları Başladı",
        description: "2024 yılı pilot eğitimi programı için başvurular başlamıştır.",
        content:
          "2024 yılı pilot eğitimi programı için başvurular 15 Ocak tarihinde başlamıştır. Detaylı bilgi için iletişime geçiniz. Program kapsamında teorik ve pratik eğitimler verilecektir.",
        category: "egitim",
        priority: "high",
        publishDate: "2024-01-15",
        expirationDate: "2024-03-15",
        featured: true,
        emailNotification: true,
        targetAudience: "all",
        status: "active",
      }

      setFormData(mockData)
      setImages(["/pilot-training.png", "/aviation-school.png"])
      setTags(["pilot", "eğitim", "başvuru"])
      setLoading(false)
    }

    loadAnnouncement()
  }, [announcementId])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && images.length < 3) {
      const newImages = Array.from(files)
        .slice(0, 3 - images.length)
        .map((file, index) => `/placeholder.svg?height=200&width=300&query=${file.name}`)
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags((prev) => [...prev, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (status: "draft" | "active") => {
    console.log({ ...formData, images, tags, status })
    // Handle form submission and redirect
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/announcements">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri Dön
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Duyuru Düzenle</h1>
            <p className="text-gray-600 mt-1">Duyuru bilgilerini güncelleyin</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge className={formData.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
            {formData.status === "active" ? "Aktif" : "Taslak"}
          </Badge>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Önizle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form - Same as create page but with pre-filled data */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Temel Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Duyuru Başlığı *</Label>
                <Input
                  id="title"
                  placeholder="Duyuru başlığını girin"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Kısa Açıklama *</Label>
                <Textarea
                  id="description"
                  placeholder="Duyuru için kısa bir açıklama yazın"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Detaylı İçerik *</Label>
                <Textarea
                  id="content"
                  placeholder="Duyurunun detaylı içeriğini yazın"
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Images Section - Same as create page */}
          <Card>
            <CardHeader>
              <CardTitle>Duyuru Görselleri (Maksimum 3)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Görsel ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}

                {images.length < 3 && (
                  <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Görsel Ekle</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tags Section - Same as create page */}
          <Card>
            <CardHeader>
              <CardTitle>Etiketler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Etiket ekle"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button onClick={addTag} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    #{tag}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Same as create page but with update buttons */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Duyuru Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Same form fields as create page */}
              <div className="space-y-2">
                <Label htmlFor="category">Kategori *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="egitim">Eğitim</SelectItem>
                    <SelectItem value="bakim">Bakım</SelectItem>
                    <SelectItem value="personel">Personel</SelectItem>
                    <SelectItem value="genel">Genel</SelectItem>
                    <SelectItem value="etkinlik">Etkinlik</SelectItem>
                    <SelectItem value="duyuru">Duyuru</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ... rest of the form fields same as create page ... */}

              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Öne Çıkan Duyuru</Label>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotification">E-posta Bildirimi</Label>
                <Switch
                  id="emailNotification"
                  checked={formData.emailNotification}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, emailNotification: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleSubmit("active")}>
                  <Save className="w-4 h-4 mr-2" />
                  Değişiklikleri Kaydet
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => handleSubmit("draft")}>
                  Taslak Olarak Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
