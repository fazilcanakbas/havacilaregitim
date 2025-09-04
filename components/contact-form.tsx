"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { listServices, type ServiceItem } from "@/lib/api/serviceService"

export function ContactForm() {
  const { language, t } = useLanguage()

  const NAVY = "#0b2a4a"
  const NAVY_BG = "rgba(11,42,74,0.04)" // biraz daha hafif for form visuals

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [services, setServices] = useState<ServiceItem[]>([])

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    program: "",
    message: "",
    newsletter: false,
  })

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await listServices({ status: "active" })
        setServices(data)
      } catch (err) {
        console.error("Servisler alınamadı:", err)
      }
    }
    fetchServices()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        program: "",
        message: "",
        newsletter: false,
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Card className="border-0 shadow-lg" style={{ backgroundColor: NAVY_BG }}>
        <CardContent className="p-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-foreground font-inter mb-4">
            {language === "tr" ? "Mesajınız Gönderildi!" : "Your message has been sent!"}
          </h3>
          <p className="text-muted-foreground font-dm-sans">
            {language === "tr"
              ? "Mesajınız için teşekkür ederiz. En kısa sürede size geri dönüş yapacağız."
              : "Thank you for your message. We will get back to you as soon as possible."}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg" style={{ backgroundColor: NAVY_BG }}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground font-inter">
          {language === "tr" ? "İletişim Formu" : "Contact Form"}
        </CardTitle>
        <CardDescription className="text-muted-foreground font-dm-sans">
          {language === "tr"
            ? "Aşağıdaki formu doldurarak bizimle iletişime geçebilirsiniz."
            : "Fill out the form below to get in touch with us."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{language === "tr" ? "Ad *" : "First Name *"}</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder={language === "tr" ? "Adınız" : "Your first name"}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{language === "tr" ? "Soyad *" : "Last Name *"}</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder={language === "tr" ? "Soyadınız" : "Your last name"}
                required
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">{language === "tr" ? "E-posta *" : "Email *"}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder={language === "tr" ? "ornek@email.com" : "example@email.com"}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{language === "tr" ? "Telefon" : "Phone"}</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder={language === "tr" ? "+90 5XX XXX XX XX" : "+1 555 000 0000"}
              />
            </div>
          </div>

          {/* Subject and Program */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{language === "tr" ? "Konu *" : "Subject *"}</Label>
              <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                <SelectTrigger>
                  <SelectValue placeholder={language === "tr" ? "Konu seçiniz" : "Select subject"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">{language === "tr" ? "Genel Bilgi" : "General Info"}</SelectItem>
                  <SelectItem value="enrollment">{language === "tr" ? "Kayıt İşlemleri" : "Enrollment"}</SelectItem>
                  <SelectItem value="programs">{language === "tr" ? "Eğitim Programları" : "Programs"}</SelectItem>
                  <SelectItem value="career">{language === "tr" ? "Kariyer Danışmanlığı" : "Career Consulting"}</SelectItem>
                  <SelectItem value="other">{language === "tr" ? "Diğer" : "Other"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{language === "tr" ? "İlgilendiğiniz Program" : "Interested Program"}</Label>
              <Select value={formData.program} onValueChange={(value) => handleInputChange("program", value)}>
                <SelectTrigger>
                  <SelectValue placeholder={language === "tr" ? "Program seçiniz" : "Select program"} />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service._id} value={service._id ?? ""}>
                      {language === "tr" ? service.title : service.titleEn || service.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label>{language === "tr" ? "Mesajınız *" : "Message *"}</Label>
            <Textarea
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder={language === "tr" ? "Mesajınızı buraya yazınız..." : "Write your message here..."}
              rows={5}
              required
            />
          </div>

          {/* Newsletter Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              style={{
                borderColor: "var(--muted-foreground)",
              }}
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
            />
            <Label htmlFor="newsletter" className="text-sm cursor-pointer">
              {language === "tr"
                ? "Havacılık eğitimi ve etkinlikler hakkında e-posta bülteni almak istiyorum"
                : "I want to receive newsletter about aviation training and events"}
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full group"
            style={{ backgroundColor: NAVY, color: "#fff" }}
          >
            <Send className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
            {language === "tr" ? "Mesajı Gönder" : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}