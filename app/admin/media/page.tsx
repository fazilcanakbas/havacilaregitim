"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Video, ImageIcon, Edit, Trash2, Play, Download, FileText } from "lucide-react"

// Mock data for media
const mockMedia = [
  {
    id: 1,
    title: "Havacılık Eğitimi Tanıtım Videosu",
    titleEn: "Aviation Training Promotional Video",
    type: "video",
    url: "https://example.com/promo-video.mp4",
    thumbnail: "/video-thumb1.jpg",
    duration: "3:45",
    size: "125 MB",
    uploadDate: "2024-01-15",
    category: "promotional",
    status: "active",
  },
  {
    id: 2,
    title: "Pilot Eğitimi Süreci",
    titleEn: "Pilot Training Process",
    type: "video",
    url: "https://example.com/pilot-training.mp4",
    thumbnail: "/video-thumb2.jpg",
    duration: "8:20",
    size: "340 MB",
    uploadDate: "2024-01-10",
    category: "educational",
    status: "active",
  },
  {
    id: 3,
    title: "Simülatör Eğitimi Görselleri",
    titleEn: "Simulator Training Images",
    type: "image",
    url: "/simulator-gallery.jpg",
    thumbnail: "/simulator-gallery.jpg",
    dimensions: "1920x1080",
    size: "2.5 MB",
    uploadDate: "2024-01-08",
    category: "gallery",
    status: "active",
  },
  {
    id: 4,
    title: "Eğitim Broşürü",
    titleEn: "Training Brochure",
    type: "document",
    url: "/training-brochure.pdf",
    thumbnail: "/pdf-icon.png",
    pages: 12,
    size: "8.7 MB",
    uploadDate: "2024-01-05",
    category: "document",
    status: "active",
  },
]

export default function MediaPage() {
  const [media, setMedia] = useState(mockMedia)
  const [selectedMedia, setSelectedMedia] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredMedia = media.filter((item) => {
    if (activeTab === "all") return true
    return item.type === activeTab
  })

  const handleAddMedia = () => {
    setSelectedMedia(null)
    setIsDialogOpen(true)
  }

  const handleEditMedia = (item: any) => {
    setSelectedMedia(item)
    setIsDialogOpen(true)
  }

  const handleDeleteMedia = (id: number) => {
    setMedia(media.filter((item) => item.id !== id))
  }

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "image":
        return ImageIcon
      case "document":
        return FileText
      default:
        return FileText
    }
  }

  const getMediaTypeLabel = (type: string) => {
    switch (type) {
      case "video":
        return "Video"
      case "image":
        return "Görsel"
      case "document":
        return "Belge"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medya Yönetimi</h1>
          <p className="text-gray-600">Video, görsel ve belgeleri yönetin</p>
        </div>
        <Button onClick={handleAddMedia} className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Medya Yükle
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Medya</p>
                <p className="text-2xl font-bold text-gray-900">{media.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Videolar</p>
                <p className="text-2xl font-bold text-red-600">{media.filter((m) => m.type === "video").length}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Video className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Görseller</p>
                <p className="text-2xl font-bold text-green-600">{media.filter((m) => m.type === "image").length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <ImageIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Belgeler</p>
                <p className="text-2xl font-bold text-purple-600">
                  {media.filter((m) => m.type === "document").length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Media Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Medya Dosyaları</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Tümü</TabsTrigger>
              <TabsTrigger value="video">Videolar</TabsTrigger>
              <TabsTrigger value="image">Görseller</TabsTrigger>
              <TabsTrigger value="document">Belgeler</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedia.map((item) => {
                  const MediaIcon = getMediaIcon(item.type)
                  return (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="relative mb-4">
                          {item.type === "video" ? (
                            <div className="relative">
                              <img
                                src={item.thumbnail || "/placeholder.svg"}
                                alt={item.title}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black bg-opacity-50 rounded-full p-3">
                                  <Play className="w-6 h-6 text-white" />
                                </div>
                              </div>
                              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                {item.duration}
                              </div>
                            </div>
                          ) : item.type === "image" ? (
                            <img
                              src={item.thumbnail || "/placeholder.svg"}
                              alt={item.title}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                              <MediaIcon className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {getMediaTypeLabel(item.type)}
                            </span>
                          </div>

                          <p className="text-xs text-gray-600 line-clamp-1">{item.titleEn}</p>

                          <div className="text-xs text-gray-500 space-y-1">
                            <div className="flex justify-between">
                              <span>Boyut:</span>
                              <span>{item.size}</span>
                            </div>
                            {item.duration && (
                              <div className="flex justify-between">
                                <span>Süre:</span>
                                <span>{item.duration}</span>
                              </div>
                            )}
                            {item.dimensions && (
                              <div className="flex justify-between">
                                <span>Boyut:</span>
                                <span>{item.dimensions}</span>
                              </div>
                            )}
                            {item.pages && (
                              <div className="flex justify-between">
                                <span>Sayfa:</span>
                                <span>{item.pages}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span>Tarih:</span>
                              <span>{item.uploadDate}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                          <Button variant="outline" size="sm" onClick={() => handleEditMedia(item)} className="flex-1">
                            <Edit className="w-3 h-3 mr-1" />
                            Düzenle
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 bg-transparent"
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteMedia(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add/Edit Media Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedMedia ? "Medya Düzenle" : "Yeni Medya Yükle"}</DialogTitle>
            <DialogDescription>Medya dosyası bilgilerini girin ve yükleyin.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="file">Dosya Seç</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">Dosyayı buraya sürükleyin veya seçmek için tıklayın</p>
                <Button variant="outline" size="sm">
                  Dosya Seç
                </Button>
              </div>
            </div>

            <Tabs defaultValue="turkish" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="turkish">Türkçe</TabsTrigger>
                <TabsTrigger value="english">English</TabsTrigger>
              </TabsList>

              <TabsContent value="turkish" className="space-y-4">
                <div>
                  <Label htmlFor="title">Başlık</Label>
                  <Input id="title" defaultValue={selectedMedia?.title} placeholder="Medya başlığı" />
                </div>

                <div>
                  <Label htmlFor="description">Açıklama</Label>
                  <Textarea id="description" placeholder="Medya açıklaması" rows={3} />
                </div>
              </TabsContent>

              <TabsContent value="english" className="space-y-4">
                <div>
                  <Label htmlFor="titleEn">Title (English)</Label>
                  <Input id="titleEn" defaultValue={selectedMedia?.titleEn} placeholder="Media title in English" />
                </div>

                <div>
                  <Label htmlFor="descriptionEn">Description (English)</Label>
                  <Textarea id="descriptionEn" placeholder="Media description in English" rows={3} />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>{selectedMedia ? "Güncelle" : "Yükle"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
