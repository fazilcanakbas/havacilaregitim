"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Plus, Trash2, Eye, Edit, Clock, FileText } from "lucide-react"

import { adminListServices, adminUpdateService, adminDeleteService, type ServiceItem } from "@/lib/api/serviceService"
import Link from "next/link"
import DeleteConfirmationModal from "../components/admin/DeleteConfirmationModal"
import Toast from "../components/ui/toast"

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const [selectedServices, setSelectedServices] = useState<ServiceItem | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedServiceForDetail, setSelectedServiceForDetail] = useState<ServiceItem | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    setIsLoading(true)
    try {
      const data = await adminListServices()
      setServices(data || [])
    } catch (err) {
      console.error("adminListServices failed", err)
      alert("Hizmetler yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const [toast, setToast] = useState({
    message: "",
    type: "success" as "success" | "error" | "warning" | "info",
    isVisible: false,
  })

  const showToast = (message: string, type: "success" | "error" | "warning" | "info") => {
    setToast({
      message,
      type,
      isVisible: true,
    })
  }

  const filteredServices = services.filter((s) => (s.title || "").toLowerCase().includes(searchTerm.toLowerCase()))

  const handleDeleteService = (service: ServiceItem) => {
    setSelectedServices(service)
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteService = async () => {
    if (selectedServices && selectedServices._id) {
      try {
        await adminDeleteService(selectedServices._id)
        setServices((prev) => prev.filter((s) => s._id !== selectedServices._id))

        showToast("Hizmet başarıyla silindi.", "success")
      } catch (err) {
        showToast("Hizmet silinirken hata oluştu", "error")
      } finally {
        setIsDeleteModalOpen(false)
      }
    }
  }

  const toggleStatus = async (service: ServiceItem) => {
    if (!service._id) return
    const newStatus = service.status === "active" ? "draft" : "active"
    try {
      await adminUpdateService(service._id, { status: newStatus })
      setServices((prev) => prev.map((s) => (s._id === service._id ? { ...s, status: newStatus } : s)))
      showToast(`Hizmet ${newStatus === "active" ? "aktifleştirildi" : "taslağa alındı"}.`, "success")
    } catch (err) {
      console.error("status toggle failed", err)
      showToast("Durum güncellenirken hata oluştu", "error")
    }
  }

  const openDetailModal = (service: ServiceItem) => {
    setSelectedServiceForDetail(service)
    setIsDetailModalOpen(true)
  }

  const formatDuration = (duration: string) => {
    if (!duration) return "Belirtilmemiş"
    if (duration.includes("saat") || duration.includes("gün") || duration.includes("hafta")) {
      return duration
    }
    return `${duration} saat`
  }

  // const getServiceFormat = (service: ServiceItem) => {
  //   // Extract format from features or description if available
  //   if (service.features && service.features.length > 0) {
  //     const formatFeature = service.features.find(
  //       (f) => f.includes("kişi") || f.includes("grup") || f.includes("bireysel") || f.includes("toplu"),
  //     )
  //     if (formatFeature) return formatFeature
  //   }
  //   return "Standart format"
  // }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hizmet Yönetimi</h1>
          <p className="text-gray-600">Eğitim hizmetlerini yönetin ve düzenleyin</p>
        </div>
        <Link href="/admin/services/create">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Yeni Hizmet Ekle
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Hizmet</p>
                <p className="text-2xl font-bold text-gray-900">{services.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Plus className="w-6 h-6 text-blue-600" />
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
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input placeholder="Hizmet ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service._id} className="hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">{service.title}</CardTitle>
                  <CardDescription className="mt-1 text-sm text-gray-500">{service.titleEn}</CardDescription>
                </div>
                <Badge
                  variant={service.status === "active" ? "default" : "secondary"}
                  className={service.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                >
                  {service.status === "active" ? "Aktif" : "Taslak"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">{service.description}</p>

              <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500 font-medium">
                    <Clock className="w-4 h-4" />
                    <span>Süre:</span>
                  </div>
                  <span className="font-semibold text-gray-900">{(service.duration)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500 font-medium">
                    <FileText className="w-4 h-4" />
                    <span>Format:</span>
                  </div>
                  <span className="font-semibold text-gray-900 text-xs">{(service.format)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => openDetailModal(service)}
                >
                  <Eye className="w-4 h-4" />
                  Detayları Gör
                </Button>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      {service.status === "active" ? "Aktif" : "Taslak"}
                    </span>
                  </div>
                  <Switch
                    checked={service.status === "active"}
                    onCheckedChange={() => toggleStatus(service)}
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-orange-400"
                  />
                </div>

                <div className="flex gap-2">
                  <Link href={`/admin/services/edit/${service._id}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center gap-1 text-xs bg-transparent"
                    >
                      <Edit className="w-3 h-3" />
                      Düzenle
                    </Button>
                  </Link>

                  <Button variant="destructive" size="sm" onClick={() => handleDeleteService(service)} className="px-3">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">{selectedServiceForDetail?.title}</DialogTitle>
            <DialogDescription className="text-lg text-gray-600">{selectedServiceForDetail?.titleEn}</DialogDescription>
          </DialogHeader>

          {selectedServiceForDetail && (
            <div className="space-y-6 mt-6">
              <div className="flex items-center gap-2">
                <Badge
                  variant={selectedServiceForDetail.status === "active" ? "default" : "secondary"}
                  className={selectedServiceForDetail.status === "active" ? "bg-green-100 text-green-800" : ""}
                >
                  {selectedServiceForDetail.status === "active" ? "Aktif" : "Taslak"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Süre Bilgisi</h3>
                  </div>
                  <p className="text-gray-700 font-medium">{(selectedServiceForDetail.duration)}</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Format</h3>
                  </div>
                  <p className="text-gray-700 font-medium">{(selectedServiceForDetail.format)}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Detaylı Açıklama</h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedServiceForDetail.details || selectedServiceForDetail.description}
                </p>
              </div>

              {selectedServiceForDetail.features && selectedServiceForDetail.features.length > 0 && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Özellikler</h3>
                  <ul className="space-y-2">
                    {selectedServiceForDetail.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedServiceForDetail.benefits && selectedServiceForDetail.benefits.length > 0 && (
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Faydalar</h3>
                  <ul className="space-y-2">
                    {selectedServiceForDetail.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedServiceForDetail.processSteps && selectedServiceForDetail.processSteps.length > 0 && (
                <div className="bg-indigo-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Süreç Adımları</h3>
                  <ol className="space-y-2">
                    {selectedServiceForDetail.processSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
               {selectedServiceForDetail.images && selectedServiceForDetail.images.length > 0 && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Hizmet Görselleri</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedServiceForDetail.images.map((image, index) => (
                      <div key={index} className="relative group">
                       <img
  src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
  alt={`${selectedServiceForDetail.title} - Görsel ${index + 1}`}
  className="w-full h-32 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
  onError={(e) => {
    const target = e.target as HTMLImageElement
    target.src = `/placeholder.svg?height=128&width=200&query=hizmet+görseli`
  }}
/>
                    
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-100 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {/* <div>
                    <span className="text-gray-500">Kategori:</span>
                    <p className="font-medium text-gray-900">{selectedServiceForDetail.category}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Kayıtlı Öğrenci:</span>
                    <p className="font-medium text-gray-900">{selectedServiceForDetail.enrolledStudents || 0}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Değerlendirme:</span>
                    <p className="font-medium text-gray-900">{selectedServiceForDetail.rating || 0}/5</p>
                  </div> */}
                  <div>
                    <span className="text-gray-500">Oluşturulma:</span>
                    <p className="font-medium text-gray-900">
                      {selectedServiceForDetail.createdAt
                        ? new Date(selectedServiceForDetail.createdAt).toLocaleDateString("tr-TR")
                        : "Belirtilmemiş"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Link href={`/admin/services/edit/${selectedServiceForDetail._id}`} className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Edit className="w-4 h-4 mr-2" />
                    Düzenle
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setIsDetailModalOpen(false)
                    handleDeleteService(selectedServiceForDetail)
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Sil
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteService}
        title="Hizmeti Sil"
        message={`"${selectedServices?.title}" başlıklı hizmeti silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
      />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  )
}
