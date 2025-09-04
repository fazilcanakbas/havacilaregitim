"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Mail, MapPin, Clock, Globe, Save } from "lucide-react"
import { getContact, updateContact, type ContactInfo } from "@/lib/api/contactService"

// Varsayılan boş state (backend’den ilk fetch’te overwrite olacak)
const defaultContact: ContactInfo = {
  phone: "",
  email: "",
  address: "",
  addressEn: "",
  workingHours: "",
  workingHoursEn: "",
  website: "",
  socialMedia: {
    instagram: "",
    linkedin: "",
    youtube: "",
  },
  mapCoordinates: {
    lat: 0,
    lng: 0,
  },
}

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContact)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    getContact()
      .then((data) => {
        if (data) {
          setContactInfo(data)
        }
      })
      .catch((err) => console.error("Contact fetch error:", err))
  }, [])

  const handleSave = async () => {
    try {
      const updated = await updateContact(contactInfo)
      setContactInfo(updated)
      setIsEditing(false)
    } catch (err) {
      console.error("Contact save error:", err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">İletişim Bilgileri</h1>
          <p className="text-gray-600">Şirket iletişim bilgilerini yönetin</p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
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

      {/* Form Alanı */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Türkçe / İngilizce Alanlar */}
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

              {/* Türkçe */}
              <TabsContent value="turkish" className="space-y-4">
                <div>
                  <Label>Telefon</Label>
                  <Input
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label>E-posta</Label>
                  <Input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label>Adres</Label>
                  <Textarea
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label>Çalışma Saatleri</Label>
                  <Input
                    value={contactInfo.workingHours}
                    onChange={(e) => setContactInfo({ ...contactInfo, workingHours: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </TabsContent>

              {/* İngilizce */}
              <TabsContent value="english" className="space-y-4">
                <div>
                  <Label>Address (EN)</Label>
                  <Textarea
                    value={contactInfo.addressEn}
                    onChange={(e) => setContactInfo({ ...contactInfo, addressEn: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label>Working Hours (EN)</Label>
                  <Input
                    value={contactInfo.workingHoursEn}
                    onChange={(e) => setContactInfo({ ...contactInfo, workingHoursEn: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Website & Sosyal Medya */}
        <Card>
          <CardHeader>
            <CardTitle>Web ve Sosyal Medya</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Website</Label>
              <Input
                value={contactInfo.website}
                onChange={(e) => setContactInfo({ ...contactInfo, website: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Instagram</Label>
              <Input
                value={contactInfo.socialMedia?.instagram || ""}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    socialMedia: { ...contactInfo.socialMedia, instagram: e.target.value },
                  })
                }
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>LinkedIn</Label>
              <Input
                value={contactInfo.socialMedia?.linkedin || ""}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    socialMedia: { ...contactInfo.socialMedia, linkedin: e.target.value },
                  })
                }
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>YouTube</Label>
              <Input
                value={contactInfo.socialMedia?.youtube || ""}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    socialMedia: { ...contactInfo.socialMedia, youtube: e.target.value },
                  })
                }
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Harita */}
        <Card>
          <CardHeader>
            <CardTitle>Harita Koordinatları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Latitude</Label>
              <Input
                type="number"
                value={contactInfo.mapCoordinates?.lat || 0}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    mapCoordinates: {
                      ...contactInfo.mapCoordinates,
                      lat: parseFloat(e.target.value),
                    },
                  })
                }
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Longitude</Label>
              <Input
                type="number"
                value={contactInfo.mapCoordinates?.lng || 0}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    mapCoordinates: {
                      ...contactInfo.mapCoordinates,
                      lng: parseFloat(e.target.value),
                    },
                  })
                }
                disabled={!isEditing}
              />
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
