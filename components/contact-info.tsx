"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Users, Award, ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ContactInfo() {
  const { language } = useLanguage()

  const contactMethods = [
    {
      icon: Phone,
      title: language === "tr" ? "Telefon" : "Phone",
      description: language === "tr" ? "Pazartesi - Cuma: 09:00 - 18:00" : "Monday - Friday: 09:00 - 18:00",
      value: "+90 212 XXX XX XX",
      action: language === "tr" ? "Ara" : "Call",
    },
    {
      icon: Mail,
      title: language === "tr" ? "E-posta" : "Email",
      description: language === "tr" ? "24 saat içinde yanıt veriyoruz" : "We reply within 24 hours",
      value: "info@havacilaregitim.com",
      action: language === "tr" ? "E-posta Gönder" : "Send Email",
    },
    {
      icon: MapPin,
      title: language === "tr" ? "Adres" : "Address",
      description: language === "tr" ? "Eğitim merkezimizi ziyaret edin" : "Visit our training center",
      value:
        language === "tr"
          ? "Atatürk Havalimanı Yakını\nİstanbul, Türkiye"
          : "Near Atatürk Airport\nIstanbul, Türkiye",
      action: language === "tr" ? "Haritada Gör" : "View on Map",
    },
  ]

  const officeHours = [
    {
      day: language === "tr" ? "Pazartesi - Cuma" : "Monday - Friday",
      hours: "09:00 - 18:00",
    },
    {
      day: language === "tr" ? "Cumartesi" : "Saturday",
      hours: "09:00 - 15:00",
    },
    {
      day: language === "tr" ? "Pazar" : "Sunday",
      hours: language === "tr" ? "Kapalı" : "Closed",
    },
  ]

  const quickStats = [
    {
      icon: Users,
      label: language === "tr" ? "Aktif Öğrenci" : "Active Students",
      value: "150+",
    },
    {
      icon: Award,
      label: language === "tr" ? "Mezun Pilot" : "Graduate Pilots",
      value: "500+",
    },
    {
      icon: Clock,
      label: language === "tr" ? "Deneyim" : "Experience",
      value: language === "tr" ? "15+ Yıl" : "15+ Years",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <Card className="border-0 shadow-lg">
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
              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
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
          <CardTitle className="text-xl font-bold text-foreground font-inter">
            {language === "tr" ? "Çalışma Saatleri" : "Office Hours"}
          </CardTitle>
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

      {/* Quick Stats (opsiyonel açılabilir) */}
      {/* 
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground font-inter">
            {language === "tr" ? "Hızlı Bilgiler" : "Quick Stats"}
          </CardTitle>
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
      */}
    </div>
  )
}
