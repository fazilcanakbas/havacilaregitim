"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Search, Mail, Reply, Trash2, Star, Clock, CheckCircle } from "lucide-react"

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    phone: "+90 532 123 4567",
    subject: "Pilot Eğitimi Hakkında Bilgi",
    message: "Merhaba, ticari pilot eğitimi hakkında detaylı bilgi almak istiyorum. Eğitim süresi ve maliyeti nedir?",
    date: "2024-01-20",
    time: "14:30",
    status: "unread",
    priority: "normal",
    category: "info",
  },
  {
    id: 2,
    name: "Fatma Demir",
    email: "fatma@example.com",
    phone: "+90 533 234 5678",
    subject: "Simülatör Eğitimi Randevusu",
    message: "Simülatör eğitimi için randevu almak istiyorum. Müsait zamanlarınızı öğrenebilir miyim?",
    date: "2024-01-19",
    time: "10:15",
    status: "replied",
    priority: "high",
    category: "appointment",
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    email: "mehmet@example.com",
    phone: "+90 534 345 6789",
    subject: "Eğitim Materyalleri",
    message: "Teorik eğitim materyallerine nasıl ulaşabilirim? Online erişim mümkün mü?",
    date: "2024-01-18",
    time: "16:45",
    status: "read",
    priority: "low",
    category: "support",
  },
  {
    id: 4,
    name: "Ayşe Özkan",
    email: "ayse@example.com",
    phone: "+90 535 456 7890",
    subject: "Sertifika Sorgusu",
    message: "Aldığım pilot sertifikasının geçerlilik durumunu kontrol etmek istiyorum.",
    date: "2024-01-17",
    time: "09:20",
    status: "unread",
    priority: "high",
    category: "certificate",
  },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState(mockMessages)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || message.status === statusFilter
    const matchesPriority = priorityFilter === "all" || message.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message)
    setIsDialogOpen(true)
    // Mark as read
    if (message.status === "unread") {
      setMessages(messages.map((m) => (m.id === message.id ? { ...m, status: "read" } : m)))
    }
  }

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter((message) => message.id !== id))
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "unread":
        return "Okunmadı"
      case "read":
        return "Okundu"
      case "replied":
        return "Yanıtlandı"
      default:
        return status
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "unread":
        return "destructive"
      case "read":
        return "secondary"
      case "replied":
        return "default"
      default:
        return "outline"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Yüksek"
      case "normal":
        return "Normal"
      case "low":
        return "Düşük"
      default:
        return priority
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "normal":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mesaj Yönetimi</h1>
          <p className="text-gray-600">Gelen mesajları görüntüleyin ve yanıtlayın</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Mesaj</p>
                <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Okunmamış</p>
                <p className="text-2xl font-bold text-red-600">
                  {messages.filter((m) => m.status === "unread").length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Yanıtlanan</p>
                <p className="text-2xl font-bold text-green-600">
                  {messages.filter((m) => m.status === "replied").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Yüksek Öncelik</p>
                <p className="text-2xl font-bold text-orange-600">
                  {messages.filter((m) => m.priority === "high").length}
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
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Mesaj ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Durum seç" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="unread">Okunmamış</SelectItem>
                <SelectItem value="read">Okundu</SelectItem>
                <SelectItem value="replied">Yanıtlandı</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Öncelik seç" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Öncelikler</SelectItem>
                <SelectItem value="high">Yüksek</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Düşük</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle>Mesajlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                  message.status === "unread" ? "bg-blue-50 border-blue-200" : ""
                }`}
                onClick={() => handleViewMessage(message)}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>
                      {message.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`font-semibold ${message.status === "unread" ? "text-gray-900" : "text-gray-700"}`}
                      >
                        {message.name}
                      </h3>
                      <Badge variant={getStatusBadgeVariant(message.status)}>{getStatusLabel(message.status)}</Badge>
                      <span className={`text-xs font-medium ${getPriorityColor(message.priority)}`}>
                        {getPriorityLabel(message.priority)}
                      </span>
                    </div>
                    <p
                      className={`text-sm mb-1 ${message.status === "unread" ? "font-medium text-gray-900" : "text-gray-600"}`}
                    >
                      {message.subject}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-1">{message.message}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {message.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {message.date} {message.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                    {/* <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewMessage(message)
                      }}
                    >
                      <Reply className="w-4 h-4 mr-1" />
                      Yanıtla
                    </Button> */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteMessage(message.id)
                    }}
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

      {/* Message Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Mesaj Detayı</DialogTitle>
            <DialogDescription>Mesajı görüntüleyin ve yanıtlayın</DialogDescription>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{selectedMessage.subject}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusBadgeVariant(selectedMessage.status)}>
                      {getStatusLabel(selectedMessage.status)}
                    </Badge>
                    <span className={`text-sm font-medium ${getPriorityColor(selectedMessage.priority)}`}>
                      {getPriorityLabel(selectedMessage.priority)}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Gönderen:</strong> {selectedMessage.name}
                  </p>
                  <p>
                    <strong>E-posta:</strong> {selectedMessage.email}
                  </p>
                  <p>
                    <strong>Telefon:</strong> {selectedMessage.phone}
                  </p>
                  <p>
                    <strong>Tarih:</strong> {selectedMessage.date} {selectedMessage.time}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Mesaj İçeriği:</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedMessage.message}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Yanıt Gönder:</h4>
                <Textarea placeholder="Yanıtınızı buraya yazın..." rows={4} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Kapat
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>Yanıt Gönder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
