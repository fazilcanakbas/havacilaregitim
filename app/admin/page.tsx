"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, FileText, Megaphone, MessageSquare, TrendingUp, Eye, Calendar, Activity } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    // {
    //   title: "Toplam Kullanıcı",
    //   value: "1,234",
    //   change: "+12%",
    //   icon: Users,
    //   color: "text-blue-600",
    // },
    {
      title: "Blog Yazıları",
      value: "45",
      change: "+3",
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "Aktif Duyurular",
      value: "8",
      change: "+2",
      icon: Megaphone,
      color: "text-orange-600",
    },
    {
      title: "Yeni Mesajlar",
      value: "23",
      change: "+5",
      icon: MessageSquare,
      color: "text-red-600",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "Yeni blog yazısı eklendi",
      user: "Admin",
      time: "2 saat önce",
      type: "blog",
    },
    {
      id: 2,
      action: "Duyuru güncellendi",
      user: "Admin",
      time: "4 saat önce",
      type: "announcement",
    },
    {
      id: 3,
      action: "Yeni kullanıcı kaydı",
      user: "Ahmet Yılmaz",
      time: "6 saat önce",
      type: "user",
    },
    {
      id: 4,
      action: "İletişim mesajı alındı",
      user: "Ayşe Demir",
      time: "8 saat önce",
      type: "message",
    },
  ]

  const recentMessages = [
    {
      id: 1,
      name: "Mehmet Özkan",
      email: "mehmet@example.com",
      subject: "Pilot Eğitimi Hakkında",
      time: "1 saat önce",
      status: "unread",
    },
    {
      id: 2,
      name: "Fatma Kaya",
      email: "fatma@example.com",
      subject: "Kurs Fiyatları",
      time: "3 saat önce",
      status: "read",
    },
    {
      id: 3,
      name: "Ali Veli",
      email: "ali@example.com",
      subject: "Başvuru Süreci",
      time: "5 saat önce",
      status: "unread",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">HAVACILAR EĞİTİM A.Ş. yönetim paneline hoş geldiniz</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} son aydan
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Son Aktiviteler
            </CardTitle>
            <CardDescription>Sistemdeki son değişiklikler ve aktiviteler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{activity.time}</p>
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
            <Button className="h-20 flex flex-col gap-2">
              <Megaphone className="h-6 w-6" />
              Yeni Duyuru
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
              <FileText className="h-6 w-6" />
              Blog Yazısı
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
              <Users className="h-6 w-6" />
              Eğitmen Ekle
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
              <Calendar className="h-6 w-6" />
              Etkinlik Planla
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
