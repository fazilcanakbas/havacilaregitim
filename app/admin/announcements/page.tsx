"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Edit, Trash2, Plus, Search, Eye, Calendar, User, Tag } from "lucide-react"
import Link from "next/link"

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "2024 Pilot Eğitimi Başvuruları Başladı",
      description: "2024 yılı pilot eğitimi programı için başvurular başlamıştır.",
      content:
        "2024 yılı pilot eğitimi programı için başvurular 15 Ocak tarihinde başlamıştır. Detaylı bilgi için iletişime geçiniz. Program kapsamında teorik ve pratik eğitimler verilecektir.",
      category: "Eğitim",
      status: "active",
      priority: "high",
      publishDate: "2024-01-15",
      expirationDate: "2024-03-15",
      author: "Admin",
      views: 245,
      featured: true,
      tags: ["pilot", "eğitim", "başvuru"],
      images: ["/pilot-training.png", "/aviation-school.png", "/flight-simulator.png"],
      targetAudience: "all",
      emailNotification: true,
    },
    {
      id: 2,
      title: "Simülatör Bakım Duyurusu",
      description: "Flight simülatörümüz 20-25 Ocak tarihleri arasında bakım nedeniyle hizmet dışı kalacaktır.",
      content: "Flight simülatörümüz 20-25 Ocak tarihleri arasında bakım nedeniyle hizmet dışı kalacaktır.",
      category: "Bakım",
      status: "active",
      priority: "medium",
      publishDate: "2024-01-10",
      expirationDate: "2024-01-25",
      author: "Admin",
      views: 156,
      featured: false,
      tags: ["simülatör", "bakım"],
      images: [],
      targetAudience: "all",
      emailNotification: false,
    },
    {
      id: 3,
      title: "Yeni Eğitmen Kadrosu",
      description: "Deneyimli pilot eğitmenlerimiz kadromuza katıldı. Eğitim kalitemizi artırmaya devam ediyoruz.",
      content: "Deneyimli pilot eğitmenlerimiz kadromuza katıldı. Eğitim kalitemizi artırmaya devam ediyoruz.",
      category: "Personel",
      status: "draft",
      priority: "low",
      publishDate: "2024-01-08",
      expirationDate: "2024-01-31",
      author: "Admin",
      views: 89,
      featured: false,
      tags: ["eğitmen", "kadro"],
      images: [],
      targetAudience: "all",
      emailNotification: false,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || announcement.status === filterStatus
    const matchesCategory = filterCategory === "all" || announcement.category === filterCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "archived":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const toggleAnnouncementStatus = (id: number) => {
    setAnnouncements((prev) =>
      prev.map((announcement) =>
        announcement.id === id
          ? { ...announcement, status: announcement.status === "active" ? "draft" : "active" }
          : announcement,
      ),
    )
  }

  const deleteAnnouncement = (id: number) => {
    setAnnouncements((prev) => prev.filter((announcement) => announcement.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Duyuru Yönetimi</h1>
          <p className="text-gray-600 mt-2">Duyuruları oluşturun, düzenleyin ve yönetin</p>
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              Toplam: {announcements.length}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Aktif: {announcements.filter((a) => a.status === "active").length}
            </span>
          </div>
        </div>
        <Link href="/announcements/create">
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Yeni Duyuru
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtreler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Duyuru ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="draft">Taslak</SelectItem>
                <SelectItem value="archived">Arşiv</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="Eğitim">Eğitim</SelectItem>
                <SelectItem value="Bakım">Bakım</SelectItem>
                <SelectItem value="Personel">Personel</SelectItem>
                <SelectItem value="Genel">Genel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredAnnouncements.map((announcement) => (
          <Card
            key={announcement.id}
            className={`transition-all duration-200 hover:shadow-lg ${announcement.featured ? "ring-2 ring-blue-200 bg-blue-50/30" : ""}`}
          >
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <CardTitle className="text-xl font-semibold text-gray-900">{announcement.title}</CardTitle>
                    {announcement.featured && (
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Öne Çıkan</Badge>
                    )}
                    <Badge className={getPriorityColor(announcement.priority)}>
                      {announcement.priority === "high"
                        ? "Yüksek"
                        : announcement.priority === "medium"
                          ? "Orta"
                          : "Düşük"}
                    </Badge>
                  </div>

                  <p className="text-gray-600 mb-3 line-clamp-2">{announcement.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {announcement.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {announcement.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {announcement.publishDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {announcement.views} görüntüleme
                    </span>
                  </div>

                  {announcement.tags && announcement.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {announcement.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(announcement.status)}>
                      {announcement.status === "active"
                        ? "Aktif"
                        : announcement.status === "draft"
                          ? "Taslak"
                          : "Arşiv"}
                    </Badge>
                    <Switch
                      checked={announcement.status === "active"}
                      onCheckedChange={() => toggleAnnouncementStatus(announcement.id)}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/announcements/edit/${announcement.id}`}>
                      <Button variant="outline" size="sm" className="hover:bg-blue-50 bg-transparent">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-red-50 text-red-600 bg-transparent"
                      onClick={() => deleteAnnouncement(announcement.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>

            {announcement.images && announcement.images.length > 0 && (
              <CardContent className="pt-0">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {announcement.images.slice(0, 3).map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${announcement.title} - Görsel ${index + 1}`}
                      className="w-24 h-16 object-cover rounded-md border flex-shrink-0"
                    />
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredAnnouncements.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">Arama kriterlerinize uygun duyuru bulunamadı.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
