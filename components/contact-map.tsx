"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ContactMap() {
  const { language } = useLanguage()

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
              ? "Atatürk Havalimanı yakınında bulunan modern eğitim merkezimizi ziyaret edin"
              : "Visit our modern training center near Atatürk Airport"}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="relative h-96 bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground font-inter mb-2">
                    {language === "tr" ? "Harita Entegrasyonu" : "Map Integration"}
                  </h3>
                  <p className="text-muted-foreground font-dm-sans mb-4">
                    {language === "tr"
                      ? "Gerçek uygulamada Google Maps veya benzeri bir harita servisi entegre edilecektir"
                      : "In the real app, Google Maps or a similar service will be integrated"}
                  </p>
                  <Button>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {language === "tr" ? "Google Maps'te Aç" : "Open in Google Maps"}
                  </Button>
                </div>
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
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground font-inter mb-1">
                      {language === "tr" ? "HAVACILAR EĞİTİM A.Ş." : "AVIATION EDUCATION INC."}
                    </h4>
                    <p className="text-muted-foreground font-dm-sans">
                      {language === "tr" ? (
                        <>
                          Atatürk Havalimanı Yakını
                          <br />
                          Bakırköy/İstanbul
                          <br />
                          Türkiye 34149
                        </>
                      ) : (
                        <>
                          Near Atatürk Airport
                          <br />
                          Bakırköy/Istanbul
                          <br />
                          Türkiye 34149
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Transport */}
                <div className="flex items-start space-x-3">
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
                </div>
              </CardContent>
            </Card>

            {/* Visit Notice */}
            <Card className="border-0 shadow-lg bg-primary/5">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground font-inter mb-3">
                  {language === "tr" ? "Ziyaret Öncesi" : "Before Visiting"}
                </h4>
                <p className="text-sm text-muted-foreground font-dm-sans mb-4">
                  {language === "tr"
                    ? "Eğitim merkezimizi ziyaret etmeden önce randevu almanızı öneririz. Böylece size daha iyi hizmet verebiliriz."
                    : "We recommend booking an appointment before visiting our training center so we can serve you better."}
                </p>
                <Button size="sm" className="w-full">
                  {language === "tr" ? "Randevu Al" : "Book Appointment"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
