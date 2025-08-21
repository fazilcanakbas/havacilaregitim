"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Save, User, Shield, Bell, Palette, Globe, Eye, EyeOff } from "lucide-react"

// Mock settings data
const mockSettings = {
  general: {
    siteName: "HAVACILAR EĞİTİM A.Ş.",
    siteNameEn: "Aviation Education Inc.",
    tagline: "Profesyonel Havacılık Eğitimi",
    taglineEn: "Professional Aviation Training",
    language: "tr",
    timezone: "Europe/Istanbul",
  },
  admin: {
    name: "Admin User",
    email: "admin@havacilaregitim.com",
    phone: "+90 212 123 4567",
    avatar: "/admin-avatar.png",
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    newMessages: true,
    newRegistrations: true,
    systemUpdates: false,
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
  },
  appearance: {
    theme: "light",
    primaryColor: "#0891b2",
    accentColor: "#f97316",
  },
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockSettings)
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
    console.log("Settings saved:", settings)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original values if needed
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
          <p className="text-gray-600">Sistem ayarlarını ve tercihlerinizi yönetin</p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                İptal
              </Button>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Kaydet
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Düzenle</Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Genel
          </TabsTrigger>
          {/* <TabsTrigger value="admin" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Bildirimler
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Güvenlik
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Görünüm
          </TabsTrigger> */}
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Genel Ayarlar</CardTitle>
              <CardDescription>Site geneli ayarları ve dil tercihlerini yönetin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="siteName">Site Adı (Türkçe)</Label>
                    <Input
                      id="siteName"
                      value={settings.general.siteName}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, siteName: e.target.value },
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="tagline">Slogan (Türkçe)</Label>
                    <Input
                      id="tagline"
                      value={settings.general.tagline}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, tagline: e.target.value },
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="siteNameEn">Site Name (English)</Label>
                    <Input
                      id="siteNameEn"
                      value={settings.general.siteNameEn}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, siteNameEn: e.target.value },
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="taglineEn">Tagline (English)</Label>
                    <Input
                      id="taglineEn"
                      value={settings.general.taglineEn}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, taglineEn: e.target.value },
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="language">Varsayılan Dil</Label>
                  <Select
                    value={settings.general.language}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, language: value },
                      })
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tr">Türkçe</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timezone">Saat Dilimi</Label>
                  <Select
                    value={settings.general.timezone}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, timezone: value },
                      })
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Istanbul">İstanbul (UTC+3)</SelectItem>
                      <SelectItem value="Europe/London">Londra (UTC+0)</SelectItem>
                      <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Profile */}
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle>Admin Profili</CardTitle>
              <CardDescription>Kişisel bilgilerinizi ve hesap ayarlarınızı güncelleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={settings.admin.avatar || "/placeholder.svg"} alt={settings.admin.name} />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                {isEditing && <Button variant="outline">Fotoğraf Değiştir</Button>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="adminName">Ad Soyad</Label>
                  <Input
                    id="adminName"
                    value={settings.admin.name}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        admin: { ...settings.admin, name: e.target.value },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="adminEmail">E-posta</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.admin.email}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        admin: { ...settings.admin, email: e.target.value },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="adminPhone">Telefon</Label>
                <Input
                  id="adminPhone"
                  value={settings.admin.phone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      admin: { ...settings.admin, phone: e.target.value },
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mevcut şifrenizi girin"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newPassword">Yeni Şifre</Label>
                    <Input id="newPassword" type="password" placeholder="Yeni şifrenizi girin" />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                    <Input id="confirmPassword" type="password" placeholder="Yeni şifrenizi tekrar girin" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Ayarları</CardTitle>
              <CardDescription>Hangi bildirimleri almak istediğinizi seçin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>E-posta Bildirimleri</Label>
                    <p className="text-sm text-gray-600">Önemli güncellemeler için e-posta alın</p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, emailNotifications: checked },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Bildirimleri</Label>
                    <p className="text-sm text-gray-600">Acil durumlar için SMS alın</p>
                  </div>
                  <Switch
                    checked={settings.notifications.smsNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, smsNotifications: checked },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Yeni Mesajlar</Label>
                    <p className="text-sm text-gray-600">İletişim formundan gelen yeni mesajlar</p>
                  </div>
                  <Switch
                    checked={settings.notifications.newMessages}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, newMessages: checked },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Yeni Kayıtlar</Label>
                    <p className="text-sm text-gray-600">Yeni öğrenci kayıtları</p>
                  </div>
                  <Switch
                    checked={settings.notifications.newRegistrations}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, newRegistrations: checked },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sistem Güncellemeleri</Label>
                    <p className="text-sm text-gray-600">Sistem bakım ve güncelleme bildirimleri</p>
                  </div>
                  <Switch
                    checked={settings.notifications.systemUpdates}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, systemUpdates: checked },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Güvenlik Ayarları</CardTitle>
              <CardDescription>Hesap güvenliğinizi artırmak için ayarları yapılandırın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>İki Faktörlü Kimlik Doğrulama</Label>
                  <p className="text-sm text-gray-600">Hesabınızı ekstra güvenlik katmanı ile koruyun</p>
                </div>
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      security: { ...settings.security, twoFactorAuth: checked },
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="sessionTimeout">Oturum Zaman Aşımı (dakika)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: { ...settings.security, sessionTimeout: Number.parseInt(e.target.value) },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="passwordExpiry">Şifre Geçerlilik Süresi (gün)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={settings.security.passwordExpiry}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: { ...settings.security, passwordExpiry: Number.parseInt(e.target.value) },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Görünüm Ayarları</CardTitle>
              <CardDescription>Admin panelinin görünümünü özelleştirin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="theme">Tema</Label>
                <Select
                  value={settings.appearance.theme}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, theme: value },
                    })
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Açık Tema</SelectItem>
                    <SelectItem value="dark">Koyu Tema</SelectItem>
                    <SelectItem value="auto">Sistem Ayarı</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="primaryColor">Ana Renk</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, primaryColor: e.target.value },
                        })
                      }
                      disabled={!isEditing}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.appearance.primaryColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, primaryColor: e.target.value },
                        })
                      }
                      disabled={!isEditing}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="accentColor">Vurgu Rengi</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="accentColor"
                      type="color"
                      value={settings.appearance.accentColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, accentColor: e.target.value },
                        })
                      }
                      disabled={!isEditing}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.appearance.accentColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, accentColor: e.target.value },
                        })
                      }
                      disabled={!isEditing}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Renk Önizlemesi</h4>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg"
                    style={{ backgroundColor: settings.appearance.primaryColor }}
                  ></div>
                  <div
                    className="w-12 h-12 rounded-lg"
                    style={{ backgroundColor: settings.appearance.accentColor }}
                  ></div>
                  <div className="text-sm text-gray-600">Ana renk ve vurgu rengi kombinasyonu</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
