"use client"

import { BookOpen, User, Target, Users, Award, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

export function ServicesSection() {
  const { language, t } = useLanguage()

  const services = [
    {
      icon: BookOpen,
      title: language === "tr" ? "Mülakat Teknikleri Eğitimi" : "Interview Techniques Training",
      description: language === "tr" 
        ? "Havacılık mülakatlarında başarılı olmak için gerekli teknikleri öğrenin ve kendinizi en iyi şekilde ifade etmeyi keşfedin."
        : "Learn the necessary techniques to succeed in aviation interviews and discover how to express yourself in the best way.",
      features: [
        language === "tr" ? "Profesyonel mülakat teknikleri" : "Professional interview techniques",
        language === "tr" ? "İletişim becerileri geliştirme" : "Communication skills development", 
        language === "tr" ? "Özgüven artırma" : "Confidence building",
        language === "tr" ? "Stres yönetimi" : "Stress management",
      ],
    },
    {
      icon: User,
      title: language === "tr" ? "Bireysel Danışmanlık" : "Individual Consulting",
      description: language === "tr" 
        ? "Adayın ihtiyaç ve beklentileri doğrultusunda bireysel değerlendirme ve hedef odaklı çalışma planı oluşturma."
        : "Individual assessment and goal-oriented work plan creation in line with the candidate's needs and expectations.",
      features: [
        language === "tr" ? "Kişiye özel değerlendirme" : "Personalized assessment",
        language === "tr" ? "Gelişim alanları belirleme" : "Development areas identification",
        language === "tr" ? "Hedef odaklı plan" : "Goal-oriented plan",
        language === "tr" ? "Retest stratejileri" : "Retest strategies",
      ],
    },
    {
      icon: Target,
      title: language === "tr" ? "CRM Bireysel Mülakat" : "Individual CRM Interview",
      description: language === "tr" 
        ? "Uzman kaptan pilotlar ve profesyonel psikologlar eşliğinde gerçek mülakat ortamı deneyimi."
        : "Real interview environment experience with expert captain pilots and professional psychologists.",
      features: [
        language === "tr" ? "25-40 kapsamlı soru" : "25-40 comprehensive questions",
        language === "tr" ? "Uzman kaptan pilotlar" : "Expert captain pilots",
        language === "tr" ? "Profesyonel psikologlar" : "Professional psychologists",
        language === "tr" ? "Çok boyutlu değerlendirme" : "Multi-dimensional assessment",
      ],
    },
    {
      icon: Users,
      title: language === "tr" ? "CRM Grup Mülakatı" : "CRM Group Interview",
      description: language === "tr" 
        ? "4-6 kişilik gruplar halinde gerçek grup mülakat atmosferinde ekip becerilerinizi geliştirin."
        : "Develop your teamwork skills in real group interview atmosphere with groups of 4-6 people.",
      features: [
        language === "tr" ? "4-6 kişilik gruplar" : "Groups of 4-6 people",
        language === "tr" ? "Ekip içi iletişim" : "Team communication",
        language === "tr" ? "Liderlik becerileri" : "Leadership skills",
        language === "tr" ? "Problem çözme" : "Problem solving",
      ],
    },
    {
      icon: Award,
      title: language === "tr" ? "Kurul Mülakat" : "Board Interview",
      description: language === "tr" 
        ? "Türkçe ve İngilizce dillerinde gerçek kurul mülakat ortamı simülasyonu ve detaylı performans analizi."
        : "Real board interview environment simulation in Turkish and English languages with detailed performance analysis.",
      features: [
        language === "tr" ? "Türkçe ve İngilizce sorular" : "Turkish and English questions",
        language === "tr" ? "Gerçek kurul ortamı" : "Real board environment",
        language === "tr" ? "Detaylı performans analizi" : "Detailed performance analysis",
        language === "tr" ? "Uzman geri bildirimi" : "Expert feedback",
      ],
    },
    {
      icon: MessageSquare,
      title: language === "tr" ? "Geri Bildirim ve Analiz" : "Feedback and Analysis",
      description: language === "tr" 
        ? "Tüm simülasyon süreçleri sonrasında kapsamlı geri bildirim ve gelişim odaklı öneriler."
        : "Comprehensive feedback and development-focused recommendations after all simulation processes.",
      features: [
        language === "tr" ? "Detaylı performans raporu" : "Detailed performance report",
        language === "tr" ? "Gelişim önerileri" : "Development suggestions",
        language === "tr" ? "Bireysel ve grup analizi" : "Individual and group analysis",
        language === "tr" ? "Uzman değerlendirmesi" : "Expert evaluation",
      ],
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
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* <Button className="w-full mt-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  {t("services.cta")}
                </Button> */}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={"/hizmetlerimiz"}>
          <Button 
          
          size="lg" variant="outline" className="font-dm-sans bg-transparent">
            {t("services.viewAll")}
          </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}