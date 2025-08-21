"use client"

import { useLanguage } from "@/lib/language-context"
import { Plane, GraduationCap, Shield, Clock, Users, Award } from "lucide-react"
import { Footer } from "@/components/footer"

function ServicesHero() {
  const { language } = useLanguage()

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 font-inter">
            {language === "tr" ? "Hizmetlerimiz" : "Our Services"}
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground font-dm-sans">
            {language === "tr"
              ? "Kapsamlı havacılık eğitim programları ile pilotluk kariyerinizi şekillendirin."
              : "Shape your pilot career with comprehensive aviation training programs."}
          </p>
        </div>
      </div>
    </section>
  )
}

function ServicesList() {
  const { language } = useLanguage()

  const services = [
    {
      icon: Plane,
      title: language === "tr" ? "Özel Pilot Lisansı (PPL)" : "Private Pilot License (PPL)",
      description:
        language === "tr"
          ? "Kişisel uçuş için gerekli temel pilot eğitimi ve lisans programı."
          : "Basic pilot training and license program required for personal flight.",
      features: [
        language === "tr" ? "40 saat uçuş eğitimi" : "40 hours flight training",
        language === "tr" ? "Teorik dersler" : "Theoretical lessons",
        language === "tr" ? "Sınav hazırlığı" : "Exam preparation",
      ],
    },
    {
      icon: GraduationCap,
      title: language === "tr" ? "Ticari Pilot Lisansı (CPL)" : "Commercial Pilot License (CPL)",
      description:
        language === "tr"
          ? "Profesyonel pilotluk için gerekli ileri seviye eğitim programı."
          : "Advanced training program required for professional piloting.",
      features: [
        language === "tr" ? "250 saat uçuş eğitimi" : "250 hours flight training",
        language === "tr" ? "İleri navigasyon" : "Advanced navigation",
        language === "tr" ? "Ticari operasyonlar" : "Commercial operations",
      ],
    },
    {
      icon: Shield,
      title: language === "tr" ? "Enstrüman Uçuş (IFR)" : "Instrument Flight Rules (IFR)",
      description:
        language === "tr"
          ? "Kötü hava koşullarında güvenli uçuş için enstrüman eğitimi."
          : "Instrument training for safe flight in adverse weather conditions.",
      features: [
        language === "tr" ? "Simülatör eğitimi" : "Simulator training",
        language === "tr" ? "Enstrüman prosedürleri" : "Instrument procedures",
        language === "tr" ? "ILS yaklaşımları" : "ILS approaches",
      ],
    },
    {
      icon: Users,
      title: language === "tr" ? "Çok Motorlu Uçak (MEP)" : "Multi-Engine Piston (MEP)",
      description:
        language === "tr"
          ? "Çok motorlu uçaklarda uçuş için özel eğitim programı."
          : "Special training program for flying multi-engine aircraft.",
      features: [
        language === "tr" ? "Çok motorlu prosedürler" : "Multi-engine procedures",
        language === "tr" ? "Acil durum eğitimi" : "Emergency training",
        language === "tr" ? "Performans hesaplamaları" : "Performance calculations",
      ],
    },
    {
      icon: Clock,
      title: language === "tr" ? "Gece Uçuş Eğitimi" : "Night Flight Training",
      description:
        language === "tr"
          ? "Gece koşullarında güvenli uçuş için özel eğitim."
          : "Special training for safe flight in night conditions.",
      features: [
        language === "tr" ? "Gece navigasyonu" : "Night navigation",
        language === "tr" ? "Görsel referanslar" : "Visual references",
        language === "tr" ? "Acil prosedürler" : "Emergency procedures",
      ],
    },
    {
      icon: Award,
      title: language === "tr" ? "Eğitmen Pilotu (FI)" : "Flight Instructor (FI)",
      description:
        language === "tr"
          ? "Pilot eğitmeni olmak için gerekli öğretmenlik becerileri."
          : "Teaching skills required to become a flight instructor.",
      features: [
        language === "tr" ? "Öğretim teknikleri" : "Teaching techniques",
        language === "tr" ? "Eğitim planlaması" : "Training planning",
        language === "tr" ? "Değerlendirme yöntemleri" : "Assessment methods",
      ],
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-background to-accent/5 rounded-2xl border border-border/50 p-8 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-primary-foreground" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-4 font-inter">{service.title}</h3>
              <p className="text-muted-foreground mb-6 font-dm-sans leading-relaxed">{service.description}</p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-muted-foreground font-dm-sans">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20 lg:pt-32">
      <ServicesHero />
      <ServicesList />
      <Footer />
    </div>
  )
}
