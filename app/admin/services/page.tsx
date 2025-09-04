"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Plus, Trash2, Eye, Edit, Clock, FileText, GripVertical } from "lucide-react"

import { adminListServices, adminUpdateService, adminDeleteService, type ServiceItem } from "@/lib/api/serviceService"
import DeleteConfirmationModal from "../components/admin/DeleteConfirmationModal"
import Toast from "../components/ui/toast"

// dnd-kit
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

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
    setToast({ message, type, isVisible: true })
  }

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

  // dnd-kit setup
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))

const handleDragEnd = async (event: any) => {
  const { active, over } = event
  if (active.id !== over?.id) {
    setServices((prev) => {
      const oldIndex = prev.findIndex((s) => s._id === active.id)
      const newIndex = prev.findIndex((s) => s._id === over.id)
      const newServices = arrayMove(prev, oldIndex, newIndex)

      // sıralama numaralarını güncelle
      newServices.forEach((s, i) => {
        s.number = i + 1
      })

      // backend’e güncelleme isteği gönder
      newServices.forEach(async (s) => {
        if (s._id) {
          try {
            await adminUpdateService(s._id, { number: s.number })
          } catch (err) {
            console.error("update order failed", err)
          }
        }
      })

      return newServices
    })
  }
}


  const totalServices = services.length
  const activeServices = services.filter((s) => s.status === "active").length
  const draftServices = services.filter((s) => s.status === "draft").length

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

      {/* Özet kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600">Toplam Hizmet</p>
            <p className="text-2xl font-bold text-gray-900">{totalServices}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600">Aktif Hizmetler</p>
            <p className="text-2xl font-bold text-green-600">{activeServices}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600">Taslak Hizmetler</p>
            <p className="text-2xl font-bold text-orange-600">{draftServices}</p>
          </CardContent>
        </Card>
      </div>

      {/* Drag & Drop list */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={services.map((s) => String(s._id))} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <SortableCard
                key={service._id}
                id={String(service._id)}
                service={service}
                index={index}
                openDetailModal={openDetailModal}
                toggleStatus={toggleStatus}
                handleDeleteService={handleDeleteService}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Detay Modalı */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedServiceForDetail?.title}</DialogTitle>
            <DialogDescription>{selectedServiceForDetail?.titleEn}</DialogDescription>
          </DialogHeader>
          {selectedServiceForDetail && (
            <div className="space-y-4">
              <p className="text-gray-700">{selectedServiceForDetail.description}</p>
              <p><strong>Süre:</strong> {selectedServiceForDetail.duration}</p>
              <p><strong>Format:</strong> {selectedServiceForDetail.format}</p>
              {selectedServiceForDetail.features && (
                <ul className="list-disc pl-6">
                  {selectedServiceForDetail.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              )}
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

// SortableCard component
function SortableCard({
  id,
  service,
  index,
  openDetailModal,
  toggleStatus,
  handleDeleteService,
}: {
  id: string
  service: ServiceItem
  index: number
  openDetailModal: (s: ServiceItem) => void
  toggleStatus: (s: ServiceItem) => void
  handleDeleteService: (s: ServiceItem) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Card ref={setNodeRef} style={style} className="hover:shadow-lg transition border-0 shadow-sm">
      <CardHeader className="flex items-start justify-between gap-3">
        <div
          className="flex items-center gap-2 text-gray-400 cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4" />
          <span className="text-sm text-gray-500">#{index + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          <CardTitle className="text-lg font-semibold">{service.title}</CardTitle>
          <CardDescription>{service.titleEn}</CardDescription>
        </div>
        <Badge className={service.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-200"}>
          {service.status === "active" ? "Aktif" : "Taslak"}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{service.description}</p>
        <Button size="sm" className="w-full mb-2" onClick={() => openDetailModal(service)}>
          <Eye className="w-4 h-4 mr-2" /> Detayları Gör
        </Button>
        <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
          <span>{service.status === "active" ? "Aktif" : "Taslak"}</span>
          <Switch
            checked={service.status === "active"}
            onCheckedChange={() => toggleStatus(service)}
            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-orange-400"
          />
        </div>
        <div className="flex gap-2 mt-2">
          <Link href={`/admin/services/edit/${service._id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Edit className="w-3 h-3 mr-1" /> Düzenle
            </Button>
          </Link>
          <Button variant="destructive" size="sm" onClick={() => handleDeleteService(service)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
