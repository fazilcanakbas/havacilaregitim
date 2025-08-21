"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, Users, Award, BookOpen, Clock, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ServicesSection() {
  const { language, t } = useLanguage()

  const services = [
    {
      icon: Plane,
      title: language === "tr" ? "Özel Pilot Lisansı (PPL)" : "Private Pilot License (PPL)",
      description:
        language === "tr"
          ? "Özel uçak kullanma yetkisi veren temel pilot eğitimi programı"
          : "Basic pilot training program that grants private aircraft operation authority",
      duration: language === "tr" ? "6-12 Ay" : "6-12 Months",
      features:
        language === "tr"
          ? ["Teorik Eğitim", "Uçuş Eğitimi", "Sınav Hazırlığı"]
          : ["Theoretical Training", "Flight Training", "Exam Preparation"],
    },
    {
      icon: Award,
      title: language === "tr" ? "Ticari Pilot Lisansı (CPL)" : "Commercial Pilot License (CPL)",
      description:
        language === "tr"
          ? "Profesyonel havacılık kariyeri için gerekli ticari pilot eğitimi"
          : "Commercial pilot training required for professional aviation career",
      duration: language === "tr" ? "12-18 Ay" : "12-18 Months",
      features:
        language === "tr"
          ? ["İleri Teorik Eğitim", "Kompleks Uçuş Eğitimi", "Sertifikasyon"]
          : ["Advanced Theoretical Training", "Complex Flight Training", "Certification"],
    },
    {
      icon: Users,
      title: language === "tr" ? "Havayolu Pilot Eğitimi (ATPL)" : "Airline Transport Pilot License (ATPL)",
      description:
        language === "tr"
          ? "Havayolu şirketlerinde kaptan pilot olmak için gerekli eğitim"
          : "Training required to become a captain pilot in airline companies",
      duration: language === "tr" ? "18-24 Ay" : "18-24 Months",
      features:
        language === "tr"
          ? ["Havayolu Standartları", "Jet Eğitimi", "Liderlik Becerileri"]
          : ["Airline Standards", "Jet Training", "Leadership Skills"],
    },
    {
      icon: BookOpen,
      title: language === "tr" ? "Enstrüman Uçuş Eğitimi (IFR)" : "Instrument Flight Rules (IFR)",
      description:
        language === "tr"
          ? "Kötü hava koşullarında güvenli uçuş için enstrüman eğitimi"
          : "Instrument training for safe flight in adverse weather conditions",
      duration: language === "tr" ? "3-6 Ay" : "3-6 Months",
      features:
        language === "tr"
          ? ["Enstrüman Okuma", "Radyo Navigasyon", "Yaklaşma Prosedürleri"]
          : ["Instrument Reading", "Radio Navigation", "Approach Procedures"],
    },
    {
      icon: Clock,
      title: language === "tr" ? "Tip Rating Eğitimi" : "Type Rating Training",
      description:
        language === "tr"
          ? "Belirli uçak tiplerinde uçuş yetkisi için özel eğitim programı"
          : "Special training program for flight authorization on specific aircraft types",
      duration: language === "tr" ? "2-4 Ay" : "2-4 Months",
      features:
        language === "tr"
          ? ["Uçak Sistemleri", "Simülatör Eğitimi", "Check Ride"]
          : ["Aircraft Systems", "Simulator Training", "Check Ride"],
    },
    {
      icon: MapPin,
      title: language === "tr" ? "Eğitmen Pilot Eğitimi (CFI)" : "Certified Flight Instructor (CFI)",
      description:
        language === "tr"
          ? "Pilot eğitmeni olmak için gerekli pedagojik ve teknik eğitim"
          : "Pedagogical and technical training required to become a flight instructor",
      duration: language === "tr" ? "4-8 Ay" : "4-8 Months",
      features:
        language === "tr"
          ? ["Öğretim Teknikleri", "Eğitim Planlaması", "Değerlendirme Yöntemleri"]
          : ["Teaching Techniques", "Training Planning", "Assessment Methods"],
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <BookOpen className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">{t("services.badge")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-inter mb-6">
            {t("services.title")}
          </h2>

          <p className="text-lg text-muted-foreground font-dm-sans max-w-3xl mx-auto">{t("services.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-bold font-inter group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground font-dm-sans">{service.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-medium">
                    {language === "tr" ? "Süre: " : "Duration: "}
                    {service.duration}
                  </span>
                </div>

                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  {t("services.cta")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="font-dm-sans bg-transparent">
            {t("services.viewAll")}
          </Button>
        </div>
      </div>
    </section>
  )
}
