"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, UserPlus, Edit, Trash2, Mail, Phone, Calendar, GraduationCap } from "lucide-react"

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    phone: "+90 532 123 4567",
    role: "student",
    status: "active",
    enrolledCourse: "Ticari Pilot Eğitimi",
    joinDate: "2024-01-15",
    progress: 65,
    avatar: "/student1.jpg",
  },
  {
    id: 2,
    name: "Fatma Demir",
    email: "fatma@example.com",
    phone: "+90 533 234 5678",
    role: "instructor",
    status: "active",
    department: "Teorik Eğitim",
    joinDate: "2023-08-20",
    experience: "5 yıl",
    avatar: "/instructor1.jpg",
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    email: "mehmet@example.com",
    phone: "+90 534 345 6789",
    role: "student",
    status: "inactive",
    enrolledCourse: "Simülatör Eğitimi",
    joinDate: "2023-12-10",
    progress: 30,
    avatar: "/student2.jpg",
  },
  {
    id: 4,
    name: "Ayşe Özkan",
    email: "ayse@example.com",
    phone: "+90 535 456 7890",
    role: "admin",
    status: "active",
    department: "Yönetim",
    joinDate: "2023-01-01",
    permissions: "Full Access",
    avatar: "/admin1.jpg",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "student":
        return "Eğitmen"
      case "instructor":
        return "Eğitmen"
      case "admin":
        return "Yönetici"
      default:
        return role
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "student":
        return "default"
      case "instructor":
        return "secondary"
      case "admin":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Eğitmen Yönetimi</h1>
          {/* <p className="text-gray-600">Öğrenci, eğitmen ve yöneticileri yönetin</p> */}
        </div>
        <Button className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Yeni Eğitmen Ekle
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Kullanıcı</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Öğrenciler</p>
                <p className="text-2xl font-bold text-green-600">{users.filter((u) => u.role === "student").length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card> */}

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eğitmenler</p>
                <p className="text-2xl font-bold text-purple-600">
                  {users.filter((u) => u.role === "instructor").length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aktif Kullanıcı</p>
                <p className="text-2xl font-bold text-orange-600">
                  {users.filter((u) => u.status === "active").length}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <GraduationCap className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Kullanıcı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Rol seç" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Roller</SelectItem>
                <SelectItem value="student">Öğrenci</SelectItem>
                <SelectItem value="instructor">Eğitmen</SelectItem>
                <SelectItem value="admin">Yönetici</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Durum seç" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Pasif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Kullanıcılar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <Badge variant={getRoleBadgeVariant(user.role)}>{getRoleLabel(user.role)}</Badge>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status === "active" ? "Aktif" : "Pasif"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {user.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {user.joinDate}
                      </span>
                    </div>
                    {user.role === "student" && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Kurs: {user.enrolledCourse}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${user.progress}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-500">{user.progress}%</span>
                        </div>
                      </div>
                    )}
                    {user.role === "instructor" && (
                      <p className="text-xs text-gray-500 mt-1">
                        Bölüm: {user.department} • Deneyim: {user.experience}
                      </p>
                    )}
                    {user.role === "admin" && (
                      <p className="text-xs text-gray-500 mt-1">
                        Bölüm: {user.department} • Yetki: {user.permissions}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Düzenle
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
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
    </div>
  )
}
