"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import React, { useEffect, useState } from "react"
import { getContact, type ContactInfo } from "@/lib/api/contactService"

export function ContactMap() {
  const { language } = useLanguage()
  const [contact, setContact] = useState<ContactInfo | null>(null)

  const NAVY = "#0b2a4a"
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  useEffect(() => {
    getContact()
      .then(setContact)
      .catch((err) => console.error("Contact fetch error:", err))
  }, [])

  if (!contact) return null

  const { lat, lng } = contact.mapCoordinates
  const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=${language}`
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}&zoom=15`

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-inter mb-4">
            {language === "tr" ? "Konumumuz" : "Our Location"}
          </h2>
          <p className="text-lg text-muted-foreground font-dm-sans max-w-2xl mx-auto">
            {language === "tr"
              ? ""
              : ""}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map with Embed */}
          <div className="lg:col-span-2">
     <Card className="border-0 shadow-lg overflow-hidden rounded-lg !p-0">
  <div className="relative h-104 w-full">
    <iframe
      src={embedUrl}
      className="block w-full h-full"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>

  {/* Alt buton alanı */}
  <div className="p-4 flex justify-center bg-white">
    <Button
      asChild
      className="bg-[#0b2a4a] hover:bg-[#133b66] text-white rounded-md"
    >
      <a href={mapUrl} target="_blank" rel="noopener noreferrer">
        <ExternalLink className="w-4 h-4 mr-2" />
        {language === "tr" ? "Google Maps'te Aç" : "Open in Google Maps"}
      </a>
    </Button>
  </div>
</Card>



          </div>

          {/* Location Details */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground font-inter">
                  {language === "tr" ? "Adres Detayları" : "Address Details"}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Address */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-10 h-10 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground font-inter mb-1">
                      HAVACILAR EĞİTİM A.Ş.
                    </h4>
                    <p className="text-muted-foreground font-dm-sans whitespace-pre-line">
                      {language === "tr" ? contact.address : contact.addressEn || contact.address}
                    </p>
                  </div>
                </div>

                {/* Transport */}
                {/* <div className="flex items-start space-x-3">
                  <Navigation className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground font-inter mb-1">
                      {language === "tr" ? "Ulaşım" : "Transportation"}
                    </h4>
                    <p className="text-muted-foreground font-dm-sans text-sm">
                      {language === "tr" ? (
                        <>
                          • Atatürk Havalimanı: 5 km
                          <br />• Metro: Bakırköy İstasyonu
                          <br />• Otobüs: 76, 76A, 76C hatları
                        </>
                      ) : (
                        <>
                          • Atatürk Airport: 5 km
                          <br />• Metro: Bakırköy Station
                          <br />• Bus: Lines 76, 76A, 76C
                        </>
                      )}
                    </p>
                  </div>
                </div> */}
              </CardContent>
            </Card>

            {/* Visit Notice */}
            {/* <Card className="border-0 shadow-lg bg-primary/5">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground font-inter mb-3">
                  {language === "tr" ? "Ziyaret Öncesi" : "Before Visiting"}
                </h4>
                <p className="text-sm text-muted-foreground font-dm-sans mb-4">
                  {language === "tr"
                    ? "Eğitim merkezimizi ziyaret etmeden önce randevu almanızı öneririz. Böylece size daha iyi hizmet verebiliriz."
                    : "We recommend booking an appointment before visiting our training center so we can serve you better."}
                </p>
                <Button
                  size="sm"
                  className="w-full bg-[#0b2a4a] hover:bg-[#133b66] text-white"
                >
                  {language === "tr" ? "Randevu Al" : "Book Appointment"}
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </section>
  )
}
