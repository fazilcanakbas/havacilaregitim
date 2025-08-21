"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, Plus, Search, Eye } from "lucide-react"

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "2024 Pilot Eğitimi Başvuruları Başladı",
      content:
        "2024 yılı pilot eğitimi programı için başvurular 15 Ocak tarihinde başlamıştır. Detaylı bilgi için iletişime geçiniz.",
      category: "Eğitim",
      status: "active",
      priority: "high",
      date: "2024-01-15",
      author: "Admin",
      views: 245,
    },
    {
      id: 2,
      title: "Simülatör Bakım Duyurusu",
      content: "Flight simülatörümüz 20-25 Ocak tarihleri arasında bakım nedeniyle hizmet dışı kalacaktır.",
      category: "Bakım",
      status: "active",
      priority: "medium",
      date: "2024-01-10",
      author: "Admin",
      views: 156,
    },
    {
      id: 3,
      title: "Yeni Eğitmen Kadrosu",
      content: "Deneyimli pilot eğitmenlerimiz kadromuza katıldı. Eğitim kalitemizi artırmaya devam ediyoruz.",
      category: "Personel",
      status: "draft",
      priority: "low",
      date: "2024-01-08",
      author: "Admin",
      views: 89,
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Duyuru Yönetimi</h1>
          <p className="text-gray-600 mt-2">Duyuruları oluşturun, düzenleyin ve yönetin</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Yeni Duyuru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yeni Duyuru Oluştur</DialogTitle>
              <DialogDescription>Yeni bir duyuru oluşturmak için aşağıdaki formu doldurun.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Başlık</Label>
                <Input id="title" placeholder="Duyuru başlığını girin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">İçerik</Label>
                <Textarea id="content" placeholder="Duyuru içeriğini girin" rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="egitim">Eğitim</SelectItem>
                      <SelectItem value="bakim">Bakım</SelectItem>
                      <SelectItem value="personel">Personel</SelectItem>
                      <SelectItem value="genel">Genel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Öncelik</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Öncelik seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Yüksek</SelectItem>
                      <SelectItem value="medium">Orta</SelectItem>
                      <SelectItem value="low">Düşük</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Taslak Kaydet</Button>
              <Button>Yayınla</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

      {/* Announcements List */}
      <div className="grid gap-4">
        {filteredAnnouncements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <Badge className={getPriorityColor(announcement.priority)}>
                      {announcement.priority === "high"
                        ? "Yüksek"
                        : announcement.priority === "medium"
                          ? "Orta"
                          : "Düşük"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Kategori: {announcement.category}</span>
                    <span>Yazar: {announcement.author}</span>
                    <span>Tarih: {announcement.date}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {announcement.views}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(announcement.status)}>
                    {announcement.status === "active" ? "Aktif" : announcement.status === "draft" ? "Taslak" : "Arşiv"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

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
