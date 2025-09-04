"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Mail,
  Trash2,
  Clock,
  CheckCircle,
  Phone as PhoneIcon,
  Tag as TagIcon,
} from "lucide-react"
import {
  adminListMessages,
  adminDeleteMessage,
  adminMarkAsRead,
  type MessageItem,
} from "@/lib/api/messageService"
import { adminListServices, type ServiceItem } from "@/lib/api/serviceService"

export default function MessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([])
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [services, setServices] = useState<ServiceItem[]>([])

  useEffect(() => {
    loadMessages()
    adminListServices().then(setServices)
  }, [])

  const getProgramTitle = (id?: string) => {
    if (!id) return ""
    const service = services.find((s) => s._id === id)
    return service ? service.title : ""
  }

  const loadMessages = async () => {
    try {
      const data = await adminListMessages()
      setMessages(data)
    } catch (err) {
      console.error("Mesajlar alınamadı:", err)
    }
  }

  useEffect(() => {
    loadMessages()
  }, [])

  const getSubjectLabel = (subject?: string) => {
    switch (subject) {
      case "info":
        return "Genel Bilgi"
      case "enrollment":
        return "Kayıt İşlemleri"
      case "programs":
        return "Eğitim Programları"
      case "career":
        return "Kariyer Danışmanlığı"
      case "other":
        return "Diğer"
      default:
        return subject || ""
    }
  }

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "unread" && !message.isRead) ||
      (statusFilter === "read" && message.isRead)

    return matchesSearch && matchesStatus
  })

  const handleViewMessage = async (message: MessageItem) => {
    setSelectedMessage(message)
    setIsDialogOpen(true)

    if (!message.isRead && message._id) {
      try {
        await adminMarkAsRead(message._id)
        setMessages((prev) =>
          prev.map((m) => (m._id === message._id ? { ...m, isRead: true } : m))
        )
      } catch (err) {
        console.error("Mesaj okundu işaretlenemedi:", err)
      }
    }
  }

  const handleDeleteMessage = async (id?: string) => {
    if (!id) return
    try {
      await adminDeleteMessage(id)
      setMessages((prev) => prev.filter((m) => m._id !== id))
    } catch (err) {
      console.error("Mesaj silinemedi:", err)
    }
  }

  const getStatusLabel = (isRead?: boolean) => (!isRead ? "Okunmadı" : "Okundu")
  const getStatusBadgeVariant = (isRead?: boolean) => (!isRead ? "destructive" : "secondary")

  const newsletterUsers = messages.filter((m) => m.newsletter)

  return (
    <Tabs defaultValue="messages" className="space-y-6">
      <TabsList>
        <TabsTrigger value="messages">Mesaj Yönetimi</TabsTrigger>
        <TabsTrigger value="newsletter">E-posta Haber Bülteni</TabsTrigger>
      </TabsList>

      {/* --- 1. TAB: Mesaj Yönetimi --- */}
      <TabsContent value="messages">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mesaj Yönetimi</h1>
              <p className="text-gray-600">Gelen mesajları görüntüleyin</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      {messages.filter((m) => !m.isRead).length}
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
                    <p className="text-sm font-medium text-gray-600">Okunan</p>
                    <p className="text-2xl font-bold text-green-600">
                      {messages.filter((m) => m.isRead).length}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
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
                    key={message._id}
                    className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                      !message.isRead ? "bg-blue-50 border-blue-200" : ""
                    }`}
                    onClick={() => handleViewMessage(message)}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {message.firstName[0]}
                          {message.lastName ? message.lastName[0] : ""}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className={`font-semibold ${
                              !message.isRead ? "text-gray-900" : "text-gray-700"
                            }`}
                          >
                            {message.firstName} {message.lastName}
                          </h3>
                          <Badge variant={getStatusBadgeVariant(message.isRead)}>
                            {getStatusLabel(message.isRead)}
                          </Badge>
                        </div>
                        <p
                          className={`text-sm mb-1 ${
                            !message.isRead ? "font-medium text-gray-900" : "text-gray-600"
                          }`}
                        >
                          {getSubjectLabel(message.subject)}
                          {message.program && typeof message.program === "object" && (
                            <span className="ml-2 text-xs text-gray-500">
                              ({(message.program as any).title})
                            </span>
                          )}
                        </p>

                        <p className="text-sm text-gray-500 line-clamp-1">{message.message}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {message.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(message.createdAt || "").toLocaleString("tr-TR")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteMessage(message._id)
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
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  {selectedMessage?.firstName} {selectedMessage?.lastName}
                  {selectedMessage && (
                    <Badge variant={getStatusBadgeVariant(selectedMessage.isRead)}>
                      {getStatusLabel(selectedMessage.isRead)}
                    </Badge>
                  )}
                </DialogTitle>
                <DialogDescription>
                  Mesaj detaylarını aşağıda bulabilirsiniz
                </DialogDescription>
              </DialogHeader>

              {selectedMessage && (
                <div className="space-y-6">
                  {/* Bilgi Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span>{selectedMessage.email}</span>
                    </div>
                    {selectedMessage.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <PhoneIcon className="w-4 h-4 text-green-600" />
                        <span>{selectedMessage.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>
                        {new Date(selectedMessage.createdAt || "").toLocaleString("tr-TR")}
                      </span>
                    </div>
                    {selectedMessage.program && typeof selectedMessage.program === "object" && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-indigo-600" />
                        <span>{(selectedMessage.program as any).title}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <TagIcon className="w-4 h-4 text-orange-600" />
                      <span>{getSubjectLabel(selectedMessage.subject)}</span>
                    </div>
                  </div>

                  {/* Mesaj İçeriği */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Mesaj İçeriği</h4>
                    <div className="bg-white border rounded-lg p-4 shadow-sm">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Kapat
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </TabsContent>

      {/* --- 2. TAB: E-posta Haber Bülteni --- */}
      <TabsContent value="newsletter">
        <Card>
          <CardHeader>
            <CardTitle>E-posta Bülteni Kayıtları</CardTitle>
          </CardHeader>
          <CardContent>
            {newsletterUsers.length === 0 && (
              <p className="text-sm text-gray-500">Henüz bülten kaydı yok.</p>
            )}
            <div className="space-y-3">
              {newsletterUsers.map((user) => (
                <div
                  key={user._id}
                  className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Mail className="w-4 h-4" /> {user.email}
                    </p>
                    {user.phone && (
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <PhoneIcon className="w-4 h-4" /> {user.phone}
                      </p>
                    )}
                  </div>
                  <Badge variant="secondary">Bülten Abonesi</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
