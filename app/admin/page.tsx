"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Megaphone,
  MessageSquare,
  Eye,
  Calendar,
  Activity,
  FileText,
} from "lucide-react"
import Link from "next/link"

import { adminListAnnouncements } from "@/lib/api/announcementService"
import { adminListServices, type ServiceItem } from "@/lib/api/serviceService"
import { adminListBlogs } from "@/lib/api/blogService"
import { adminListMessages, type MessageItem } from "@/lib/api/messageService"

export default function AdminDashboard() {
  const [blogCount, setBlogCount] = useState(0)
  const [announcementCount, setAnnouncementCount] = useState(0)
  const [serviceCount, setServiceCount] = useState(0)
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<ServiceItem[]>([])

  const [recentMessages, setRecentMessages] = useState<MessageItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogs, announcements, services, messages] = await Promise.all([
          adminListBlogs(),
          adminListAnnouncements(),
          adminListServices(),
          adminListMessages(),
        ])

        // Aktif olanların sayısı
        setBlogCount((blogs || []).filter((b: any) => b.isActive).length)
        setAnnouncementCount((announcements || []).filter((a: any) => a.isActive).length)
        setServiceCount((services || []).filter((s: any) => s.status === "active").length)

        // Son mesajlar (ilk 5 tane, tarihe göre sıralı)
        const sortedMessages = (messages || [])
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)
        setRecentMessages(sortedMessages)

        // Aktiviteler
        const activityData: any[] = []

        blogs.forEach((b: any) =>
          activityData.push({
            id: b._id,
            action: `Blog yazısı: ${b.title}`,
            user: b.author || "Bilinmiyor",
            time: b.createdAt,
            type: "Blog",
          })
        )

        announcements.forEach((a: any) =>
          activityData.push({
            id: a._id,
            action: `Duyuru: ${a.title}`,
            user: a.author || "Bilinmiyor",
            time: a.createdAt,
            type: "Duyuru",
          })
        )

        services.forEach((s: any) =>
          activityData.push({
            id: s._id,
            action: `Hizmet: ${s.title}`,
            user: "Admin",
            time: s.createdAt,
            type: "Hizmet",
          })
        )

        activityData.sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        )

        setActivities(activityData.slice(0, 6))
      } catch (err) {
        console.error("Dashboard fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="p-6 text-center">Yükleniyor...</div>
  }
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
const getProgramTitle = (
  program?: string | { _id: string; title: string; titleEn?: string }
) => {
  if (!program) return ""

  // populate edilmiş object gelirse
  if (typeof program === "object" && "title" in program) {
    return program.title
  }

  // sadece id gelirse services listesinden bul
  const found = services.find((s) => s._id === program)
  return found ? found.title : ""
}


  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">HAVACILAR EĞİTİM A.Ş. yönetim paneline hoş geldiniz</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Aktif Bloglar</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Aktif Duyurular</CardTitle>
            <Megaphone className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcementCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Aktif Hizmetler</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Son Mesajlar</CardTitle>
            <MessageSquare className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentMessages.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Son Aktiviteler
            </CardTitle>
            <CardDescription>Sistemdeki son değişiklikler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(activity.time).toLocaleDateString("tr-TR")}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
      {/* Recent Messages */}
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <MessageSquare className="h-5 w-5 text-red-600" />
      Son Mesajlar
    </CardTitle>
    <CardDescription>İletişim formundan gelen son mesajlar</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      {recentMessages.length === 0 && (
        <p className="text-sm text-gray-500">Henüz mesaj yok</p>
      )}

      {recentMessages.map((message) => (
        <div
          key={message._id}
          className="flex items-start justify-between p-4 border rounded-lg hover:shadow-md hover:bg-gray-50 transition cursor-pointer"
        >
          {/* Sol kısım */}
          <div className="flex items-start gap-3 flex-1">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
              {message.firstName[0]}
              {message.lastName ? message.lastName[0] : ""}
            </div>

            <div className="flex-1">
              {/* İsim + Durum */}
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900 text-sm">
                  {message.firstName} {message.lastName}
                </p>
                {!message.isRead && (
                  <Badge variant="destructive" className="text-xs">
                    Yeni
                  </Badge>
                )}
              </div>

              {/* Konu */}
             {/* Konu + Program */}
<p className="text-xs text-gray-500 mb-1">
  <strong>Konu:</strong> {getSubjectLabel(message.subject)}
  {getProgramTitle(message.program) && (
    <span className="ml-2 text-gray-700">
        <strong>Program:</strong>
      ({getProgramTitle(message.program)})
    </span>
  )}
</p>


              {/* Mesaj önizleme */}
              <p className="text-sm text-gray-700 bg-gray-100 p-2 rounded-md line-clamp-2">
                {message.message}
              </p>
            </div>
          </div>

          {/* Sağ kısım */}
          <div className="flex flex-col items-end justify-between ml-3">
            <span className="text-xs text-gray-400">
              {new Date(message.createdAt).toLocaleDateString("tr-TR")}
            </span>
            <Link href="/admin/messages">
              <Button
                variant="outline"
                size="sm"
                className="mt-2 bg-transparent hover:bg-blue-50"
              >
                <Eye className="h-4 w-4 mr-1" />
                Görüntüle
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>

      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
          <CardDescription>Sık kullanılan işlemlere hızlı erişim</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/admin/announcements">
              <Button className="h-20 flex flex-col gap-2 w-full">
                <Megaphone className="h-6 w-6" />
                Yeni Duyuru
              </Button>
            </Link>
            <Link href="/admin/blog">
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent w-full">
                <FileText className="h-6 w-6" />
                Blog Yazısı
              </Button>
            </Link>
            <Link href="/admin/services">
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent w-full">
                <Users className="h-6 w-6" />
                Hizmet Ekle
              </Button>
            </Link>
            <Link href="/admin/contact">
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent w-full">
                <Calendar className="h-6 w-6" />
                İletişim Bilgileri Düzenle
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
