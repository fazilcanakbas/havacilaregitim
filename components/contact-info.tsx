"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import React, { useEffect, useState } from "react"
import { getContact, type ContactInfo } from "@/lib/api/contactService"

export function ContactInfo() {
  const { language } = useLanguage()
  const [contact, setContact] = useState<ContactInfo | null>(null)

  const NAVY = "#0b2a4a"
  const NAVY_BG = "rgba(11,42,74,0.06)"
  const NAVY_BORDER = "rgba(11,42,74,0.10)"

  useEffect(() => {
    getContact()
      .then(setContact)
      .catch((err) => console.error("Contact fetch error:", err))
  }, [])

  if (!contact) return null

  const contactMethods = [
    {
      icon: Phone,
      title: language === "tr" ? "Telefon" : "Phone",
      // description: contact.workingHours || (language === "tr" ? "Çalışma saatleri" : "Office hours"),
      value: contact.phone,
      action: language === "tr" ? "Ara" : "Call",
      href: `tel:${contact.phone}`,
    },
    {
      icon: Mail,
      title: language === "tr" ? "E-posta" : "Email",
      // description: language === "tr" ? "24 saat içinde yanıt veriyoruz" : "We reply within 24 hours",
      value: contact.email,
      action: language === "tr" ? "E-posta Gönder" : "Send Email",
      href: `mailto:${contact.email}`,
    },
    {
      icon: MapPin,
      title: language === "tr" ? "Adres" : "Address",
      description: language === "tr" ? "Eğitim merkezimizi ziyaret edin" : "Visit our training center",
      value: language === "tr" ? contact.address : contact.addressEn || contact.address,
      action: language === "tr" ? "Haritada Gör" : "View on Map",
      href: `https://www.google.com/maps?q=${contact.mapCoordinates.lat},${contact.mapCoordinates.lng}`,
    },
  ]

  return (
    <div className="space-y-8">
      <Card className="border-0 shadow-lg" style={{ backgroundColor: NAVY_BG, borderColor: NAVY_BORDER }}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground font-inter">
            {language === "tr" ? "İletişim Bilgileri" : "Contact Information"}
          </CardTitle>
          <CardDescription className="text-muted-foreground font-dm-sans">
            {language === "tr"
              ? "Size en uygun iletişim yöntemini seçin"
              : "Choose the contact method that suits you best"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 rounded-lg hover:shadow-sm transition-all"
              style={{ borderRadius: 12 }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: NAVY_BG }}
              >
                <method.icon className="w-6 h-6" style={{ color: NAVY }} />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground font-inter mb-1">{method.title}</h4>
                <p className="text-sm text-muted-foreground font-dm-sans mb-2">{method.description}</p>
                <p className="text-foreground font-dm-sans whitespace-pre-line">{method.value}</p>
              </div>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="bg-transparent border-[#0b2a4a] text-[#0b2a4a] hover:bg-[#0b2a4a] hover:text-white"
              >
                <a href={method.href} target="_blank" rel="noopener noreferrer">
                  {method.action}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
