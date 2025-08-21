"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Mail, MapPin, Clock, Globe, Save } from "lucide-react"

// Mock data for contact information
const mockContactInfo = {
  phone: "+90 212 123 4567",
  email: "info@havacilaregitim.com",
  address: "Atatürk Havalimanı, Terminal 1, Kat 3, İstanbul",
  addressEn: "Atatürk Airport, Terminal 1, Floor 3, Istanbul",
  workingHours: "Pazartesi - Cuma: 09:00 - 18:00",
  workingHoursEn: "Monday - Friday: 09:00 - 18:00",
  website: "www.havacilaregitim.com",
  socialMedia: {
    instagram: "@havacilaregitim",
    linkedin: "havacilar-egitim-as",
    youtube: "HavacilarEgitim",
  },
  mapCoordinates: {
    lat: 40.9769,
    lng: 28.8146,
  },
}

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState(mockContactInfo)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
    console.log("Contact info saved:", contactInfo)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original values if needed
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">İletişim Bilgileri</h1>
          <p className="text-gray-600">Şirket iletişim bilgilerini yönetin</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information Form */}
        <Card>
          <CardHeader>
            <CardTitle>İletişim Bilgileri</CardTitle>
            <CardDescription>Temel iletişim bilgilerini güncelleyin</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="turkish" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="turkish">Türkçe</TabsTrigger>
                <TabsTrigger value="english">English</TabsTrigger>
              </TabsList>

              <TabsContent value="turkish" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phone"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">E-posta</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Adres</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <Textarea
                        id="address"
                        value={contactInfo.address}
                        onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="workingHours">Çalışma Saatleri</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="workingHours"
                        value={contactInfo.workingHours}
                        onChange={(e) => setContactInfo({ ...contactInfo, workingHours: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="english" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="addressEn">Address (English)</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <Textarea
                        id="addressEn"
                        value={contactInfo.addressEn}
                        onChange={(e) => setContactInfo({ ...contactInfo, addressEn: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="workingHoursEn">Working Hours (English)</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="workingHoursEn"
                        value={contactInfo.workingHoursEn}
                        onChange={(e) => setContactInfo({ ...contactInfo, workingHoursEn: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Website and Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Web ve Sosyal Medya</CardTitle>
            <CardDescription>Website ve sosyal medya hesaplarını yönetin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="website"
                  value={contactInfo.website}
                  onChange={(e) => setContactInfo({ ...contactInfo, website: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={contactInfo.socialMedia.instagram}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    socialMedia: { ...contactInfo.socialMedia, instagram: e.target.value },
                  })
                }
                disabled={!isEditing}
                placeholder="@kullaniciadi"
              />
            </div>

            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={contactInfo.socialMedia.linkedin}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    socialMedia: { ...contactInfo.socialMedia, linkedin: e.target.value },
                  })
                }
                disabled={!isEditing}
                placeholder="sirket-adi"
              />
            </div>

            <div>
              <Label htmlFor="youtube">YouTube</Label>
              <Input
                id="youtube"
                value={contactInfo.socialMedia.youtube}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    socialMedia: { ...contactInfo.socialMedia, youtube: e.target.value },
                  })
                }
                disabled={!isEditing}
                placeholder="KanalAdi"
              />
            </div>
          </CardContent>
        </Card>

        {/* Map Coordinates */}
        <Card>
          <CardHeader>
            <CardTitle>Harita Koordinatları</CardTitle>
            <CardDescription>Harita üzerindeki konum bilgilerini güncelleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="latitude">Enlem (Latitude)</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={contactInfo.mapCoordinates.lat}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    mapCoordinates: { ...contactInfo.mapCoordinates, lat: Number.parseFloat(e.target.value) },
                  })
                }
                disabled={!isEditing}
              />
            </div>

            <div>
              <Label htmlFor="longitude">Boylam (Longitude)</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={contactInfo.mapCoordinates.lng}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    mapCoordinates: { ...contactInfo.mapCoordinates, lng: Number.parseFloat(e.target.value) },
                  })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Mevcut Konum:</p>
              <p className="text-sm font-mono">
                {contactInfo.mapCoordinates.lat}, {contactInfo.mapCoordinates.lng}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Önizleme</CardTitle>
            <CardDescription>İletişim bilgilerinin nasıl görüneceğini inceleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Telefon</p>
                <p className="text-sm text-gray-600">{contactInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Mail className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">E-posta</p>
                <p className="text-sm text-gray-600">{contactInfo.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <MapPin className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="font-medium">Adres</p>
                <p className="text-sm text-gray-600">{contactInfo.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="font-medium">Çalışma Saatleri</p>
                <p className="text-sm text-gray-600">{contactInfo.workingHours}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <Globe className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Website</p>
                <p className="text-sm text-gray-600">{contactInfo.website}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
