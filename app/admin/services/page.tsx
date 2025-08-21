"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Plus, Edit, Trash2, Eye, Users, Star } from "lucide-react"

// Mock data for services
const mockServices = [
  {
    id: 1,
    title: "Ticari Pilot Eğitimi",
    titleEn: "Commercial Pilot Training",
    description: "Kapsamlı ticari pilot eğitimi programı",
    descriptionEn: "Comprehensive commercial pilot training program",
    duration: "18 ay",
    price: "₺450,000",
    category: "Pilot Eğitimi",
    status: "active",
    enrolledStudents: 24,
    rating: 4.8,
    image: "/pilot-training.jpg",
  },
  {
    id: 2,
    title: "Simülatör Eğitimi",
    titleEn: "Simulator Training",
    description: "Modern simülatörlerle gerçekçi uçuş deneyimi",
    descriptionEn: "Realistic flight experience with modern simulators",
    duration: "6 ay",
    price: "₺180,000",
    category: "Simülatör",
    status: "active",
    enrolledStudents: 18,
    rating: 4.9,
    image: "/simulator-training.jpg",
  },
  {
    id: 3,
    title: "Teorik Eğitim",
    titleEn: "Theoretical Training",
    description: "Havacılık teorisi ve mevzuat eğitimi",
    descriptionEn: "Aviation theory and regulation training",
    duration: "3 ay",
    price: "₺75,000",
    category: "Teorik",
    status: "draft",
    enrolledStudents: 32,
    rating: 4.7,
    image: "/theory-training.jpg",
  },
]

export default function ServicesPage() {
  const [services, setServices] = useState(mockServices)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddService = () => {
    setSelectedService(null)
    setIsDialogOpen(true)
  }

  const handleEditService = (service: any) => {
    setSelectedService(service)
    setIsDialogOpen(true)
  }

  const handleDeleteService = (id: number) => {
    setServices(services.filter((service) => service.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hizmet Yönetimi</h1>
          <p className="text-gray-600">Eğitim hizmetlerini yönetin ve düzenleyin</p>
        </div>
        <Button onClick={handleAddService} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Yeni Hizmet Ekle
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Hizmet</p>
                <p className="text-2xl font-bold text-gray-900">{services.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aktif Hizmetler</p>
                <p className="text-2xl font-bold text-green-600">
                  {services.filter((s) => s.status === "active").length}
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
                <p className="text-sm font-medium text-gray-600">Toplam Öğrenci</p>
                <p className="text-2xl font-bold text-purple-600">
                  {services.reduce((sum, s) => sum + s.enrolledStudents, 0)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ortalama Puan</p>
                <p className="text-2xl font-bold text-orange-600">
                  {(services.reduce((sum, s) => sum + s.rating, 0) / services.length).toFixed(1)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Star className="w-6 h-6 text-orange-600" />
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
              <Input placeholder="Hizmet ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Kategori seç" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="pilot">Pilot Eğitimi</SelectItem>
                <SelectItem value="simulator">Simülatör</SelectItem>
                <SelectItem value="theory">Teorik</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="mt-1">{service.titleEn}</CardDescription>
                </div>
                <Badge variant={service.status === "active" ? "default" : "secondary"}>
                  {service.status === "active" ? "Aktif" : "Taslak"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Süre:</span>
                  <span className="font-medium">{service.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Fiyat:</span>
                  <span className="font-medium text-green-600">{service.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Öğrenci:</span>
                  <span className="font-medium">{service.enrolledStudents}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Puan:</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{service.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEditService(service)} className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Düzenle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteService(service.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Service Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedService ? "Hizmeti Düzenle" : "Yeni Hizmet Ekle"}</DialogTitle>
            <DialogDescription>Hizmet bilgilerini girin ve kaydedin.</DialogDescription>
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
                  <Input id="title" defaultValue={selectedService?.title} placeholder="Hizmet başlığı" />
                </div>
                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <Select defaultValue={selectedService?.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seç" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pilot Eğitimi">Pilot Eğitimi</SelectItem>
                      <SelectItem value="Simülatör">Simülatör</SelectItem>
                      <SelectItem value="Teorik">Teorik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  defaultValue={selectedService?.description}
                  placeholder="Hizmet açıklaması"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Süre</Label>
                  <Input id="duration" defaultValue={selectedService?.duration} placeholder="Örn: 6 ay" />
                </div>
                <div>
                  <Label htmlFor="price">Fiyat</Label>
                  <Input id="price" defaultValue={selectedService?.price} placeholder="Örn: ₺100,000" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="english" className="space-y-4">
              <div>
                <Label htmlFor="titleEn">Title (English)</Label>
                <Input id="titleEn" defaultValue={selectedService?.titleEn} placeholder="Service title in English" />
              </div>

              <div>
                <Label htmlFor="descriptionEn">Description (English)</Label>
                <Textarea
                  id="descriptionEn"
                  defaultValue={selectedService?.descriptionEn}
                  placeholder="Service description in English"
                  rows={3}
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>{selectedService ? "Güncelle" : "Ekle"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
