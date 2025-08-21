"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, CheckCircle } from "lucide-react"

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    setIsSubmitted(true)

    // Reset form after 3 seconds
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
      <Card className="border-0 shadow-lg">
        <CardContent className="p-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-foreground font-inter mb-4">Mesajınız Gönderildi!</h3>
          <p className="text-muted-foreground font-dm-sans">
            Mesajınız için teşekkür ederiz. En kısa sürede size geri dönüş yapacağız.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground font-inter">İletişim Formu</CardTitle>
        <CardDescription className="text-muted-foreground font-dm-sans">
          Aşağıdaki formu doldurarak bizimle iletişime geçebilirsiniz. Tüm alanları eksiksiz doldurunuz.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="font-dm-sans">
                Ad *
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Adınız"
                required
                className="font-dm-sans"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="font-dm-sans">
                Soyad *
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Soyadınız"
                required
                className="font-dm-sans"
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-dm-sans">
                E-posta *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="ornek@email.com"
                required
                className="font-dm-sans"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-dm-sans">
                Telefon
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+90 5XX XXX XX XX"
                className="font-dm-sans"
              />
            </div>
          </div>

          {/* Subject and Program */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject" className="font-dm-sans">
                Konu *
              </Label>
              <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Konu seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Genel Bilgi</SelectItem>
                  <SelectItem value="enrollment">Kayıt İşlemleri</SelectItem>
                  <SelectItem value="programs">Eğitim Programları</SelectItem>
                  <SelectItem value="career">Kariyer Danışmanlığı</SelectItem>
                  <SelectItem value="other">Diğer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="program" className="font-dm-sans">
                İlgilendiğiniz Program
              </Label>
              <Select value={formData.program} onValueChange={(value) => handleInputChange("program", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Program seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ppl">Özel Pilot Lisansı (PPL)</SelectItem>
                  <SelectItem value="cpl">Ticari Pilot Lisansı (CPL)</SelectItem>
                  <SelectItem value="atpl">Havayolu Pilot Eğitimi (ATPL)</SelectItem>
                  <SelectItem value="ifr">Enstrüman Uçuş Eğitimi (IFR)</SelectItem>
                  <SelectItem value="type-rating">Tip Rating Eğitimi</SelectItem>
                  <SelectItem value="cfi">Eğitmen Pilot Eğitimi (CFI)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="font-dm-sans">
              Mesajınız *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Mesajınızı buraya yazınız..."
              rows={5}
              required
              className="font-dm-sans resize-none"
            />
          </div>

          {/* Newsletter Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
            />
            <Label htmlFor="newsletter" className="text-sm font-dm-sans cursor-pointer">
              Havacılık eğitimi ve etkinlikler hakkında e-posta bülteni almak istiyorum
            </Label>
          </div>

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full group font-dm-sans">
            <Send className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
            Mesajı Gönder
          </Button>

          <p className="text-xs text-muted-foreground font-dm-sans text-center">
            * işaretli alanlar zorunludur. Kişisel verileriniz{" "}
            <a href="/gizlilik" className="text-primary hover:underline">
              Gizlilik Politikamız
            </a>{" "}
            kapsamında korunmaktadır.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
