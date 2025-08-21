"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Users, Award, ExternalLink } from "lucide-react"

export function ContactInfo() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Telefon",
      description: "Pazartesi - Cuma: 09:00 - 18:00",
      value: "+90 212 XXX XX XX",
      action: "Ara",
    },
    {
      icon: Mail,
      title: "E-posta",
      description: "24 saat içinde yanıt veriyoruz",
      value: "info@havacilaregitim.com",
      action: "E-posta Gönder",
    },
    {
      icon: MapPin,
      title: "Adres",
      description: "Eğitim merkezimizi ziyaret edin",
      value: "Atatürk Havalimanı Yakını\nİstanbul, Türkiye",
      action: "Haritada Gör",
    },
  ]

  const officeHours = [
    { day: "Pazartesi - Cuma", hours: "09:00 - 18:00" },
    { day: "Cumartesi", hours: "09:00 - 15:00" },
    { day: "Pazar", hours: "Kapalı" },
  ]

  const quickStats = [
    { icon: Users, label: "Aktif Öğrenci", value: "150+" },
    { icon: Award, label: "Mezun Pilot", value: "500+" },
    { icon: Clock, label: "Deneyim", value: "15+ Yıl" },
  ]

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground font-inter">İletişim Bilgileri</CardTitle>
          <CardDescription className="text-muted-foreground font-dm-sans">
            Size en uygun iletişim yöntemini seçin
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <method.icon className="w-6 h-6 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground font-inter mb-1">{method.title}</h4>
                <p className="text-sm text-muted-foreground font-dm-sans mb-2">{method.description}</p>
                <p className="text-foreground font-dm-sans whitespace-pre-line">{method.value}</p>
              </div>

              <Button variant="outline" size="sm" className="bg-transparent">
                {method.action}
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Office Hours */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground font-inter">Çalışma Saatleri</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {officeHours.map((schedule, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <span className="text-foreground font-dm-sans">{schedule.day}</span>
                <span className="text-muted-foreground font-dm-sans">{schedule.hours}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground font-inter">Hızlı Bilgiler</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-lg font-bold text-foreground font-inter">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-dm-sans">{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="border-0 shadow-lg bg-accent/5">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Phone className="w-5 h-5 text-accent" />
            <h4 className="font-semibold text-foreground font-inter">Acil Durum İletişim</h4>
          </div>
          <p className="text-sm text-muted-foreground font-dm-sans mb-3">
            Eğitim sırasında acil durumlar için 7/24 ulaşabileceğiniz hat
          </p>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            +90 5XX XXX XX XX
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
