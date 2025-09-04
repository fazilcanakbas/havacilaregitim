"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  FileText,
  Megaphone,
  MessageSquare,
  Eye,
  Calendar,
  Activity,
} from "lucide-react"
import Link from "next/link"

import { adminListAnnouncements } from "@/lib/api/announcementService"
import { adminListServices } from "@/lib/api/serviceService"
import { adminListBlogs } from "@/lib/api/blogService"

export default function AdminDashboard() {
  const [blogCount, setBlogCount] = useState(0)
  const [announcementCount, setAnnouncementCount] = useState(0)
  const [serviceCount, setServiceCount] = useState(0)
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Son mesajlar şimdilik mock
  const recentMessages = [
    { id: 1, name: "Mehmet Özkan", email: "mehmet@example.com", subject: "Pilot Eğitimi Hakkında", time: "1 saat önce", status: "unread" },
    { id: 2, name: "Fatma Kaya", email: "fatma@example.com", subject: "Kurs Fiyatları", time: "3 saat önce", status: "read" },
    { id: 3, name: "Ali Veli", email: "ali@example.com", subject: "Başvuru Süreci", time: "5 saat önce", status: "unread" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogs, announcements, services] = await Promise.all([
          adminListBlogs(),
          adminListAnnouncements(),
          adminListServices(),
        ])

        // Sadece aktif olanları say
        setBlogCount((blogs || []).filter((b: any) => b.isActive).length)
        setAnnouncementCount((announcements || []).filter((a: any) => a.isActive).length)
        setServiceCount((services || []).filter((s: any) => s.status === "active").length)

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

        {/* Recent Messages (mock) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Son Mesajlar
            </CardTitle>
            <CardDescription>İletişim formundan gelen son mesajlar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{message.name}</p>
                      {message.status === "unread" && (
                        <Badge variant="destructive" className="text-xs">
                          Yeni
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{message.email}</p>
                    <p className="text-sm text-gray-700">{message.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{message.time}</p>
                    <Button variant="outline" size="sm" className="mt-1 bg-transparent">
                      <Eye className="h-3 w-3 mr-1" />
                      Görüntüle
                    </Button>
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
