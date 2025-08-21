"use client"

import { useLanguage } from "@/lib/language-context"
import { Award, Globe, Shield, Target } from "lucide-react"
import Image from "next/image"
import { Footer } from "@/components/footer"

function CorporateHero() {
  const { language, t } = useLanguage()

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 font-inter">
            {language === "tr" ? "Kurumsal" : "Corporate"}
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground font-dm-sans">
            {language === "tr"
              ? "Türkiye'nin önde gelen havacılık eğitim kurumu olarak, sektörde 15 yıllık deneyimimizle hizmet veriyoruz."
              : "As Turkey's leading aviation education institution, we serve with 15 years of experience in the industry."}
          </p>
        </div>
      </div>
    </section>
  )
}

function CompanyInfo() {
  const { language } = useLanguage()

  const stats = [
    { number: "15+", label: language === "tr" ? "Yıl Deneyim" : "Years Experience" },
    { number: "2500+", label: language === "tr" ? "Mezun Pilot" : "Graduate Pilots" },
    { number: "50+", label: language === "tr" ? "Eğitmen" : "Instructors" },
    { number: "98%", label: language === "tr" ? "Başarı Oranı" : "Success Rate" },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 font-inter">
              {language === "tr" ? "Şirket Bilgileri" : "Company Information"}
            </h2>
            <div className="space-y-6 text-muted-foreground font-dm-sans">
              <p className="text-lg leading-relaxed">
                {language === "tr"
                  ? "HAVACILAR EĞİTİM A.Ş., 2009 yılında kurulan ve havacılık sektöründe eğitim hizmetleri sunan öncü bir kuruluştur. Şirketimiz, modern eğitim metodları ve deneyimli eğitmen kadrosu ile sektörün ihtiyaç duyduğu nitelikli personeli yetiştirmektedir."
                  : "AVIATION EDUCATION Inc., established in 2009, is a pioneering organization providing training services in the aviation sector. Our company trains qualified personnel needed by the sector with modern training methods and experienced instructor staff."}
              </p>
              <p className="text-lg leading-relaxed">
                {language === "tr"
                  ? "Misyonumuz, havacılık sektörünün gelişimine katkıda bulunmak ve dünya standartlarında eğitim hizmeti sunarak, sektörün ihtiyaç duyduğu nitelikli insan kaynağını yetiştirmektir."
                  : "Our mission is to contribute to the development of the aviation sector and to train qualified human resources needed by the sector by providing world-class training services."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border/50"
              >
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2 font-inter">{stat.number}</div>
                <div className="text-sm lg:text-base text-muted-foreground font-dm-sans font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CompanyHistory() {
  const { language } = useLanguage()

  const milestones = [
    {
      year: "2009",
      title: language === "tr" ? "Kuruluş" : "Foundation",
      description:
        language === "tr"
          ? "HAVACILAR EĞİTİM A.Ş. İstanbul'da kuruldu"
          : "AVIATION EDUCATION Inc. was founded in Istanbul",
    },
    {
      year: "2012",
      title: language === "tr" ? "İlk Mezunlar" : "First Graduates",
      description:
        language === "tr"
          ? "İlk pilot mezunlarımızı sektöre kazandırdık"
          : "We graduated our first pilots to the industry",
    },
    {
      year: "2015",
      title: language === "tr" ? "Uluslararası Akreditasyon" : "International Accreditation",
      description:
        language === "tr"
          ? "EASA ve ICAO standartlarında akreditasyon aldık"
          : "We received EASA and ICAO standards accreditation",
    },
    {
      year: "2018",
      title: language === "tr" ? "Yeni Kampüs" : "New Campus",
      description:
        language === "tr" ? "Modern eğitim tesislerimizi hizmete açtık" : "We opened our modern training facilities",
    },
    {
      year: "2021",
      title: language === "tr" ? "Dijital Dönüşüm" : "Digital Transformation",
      description:
        language === "tr"
          ? "Son teknoloji simülatörler ve VR eğitim sistemleri"
          : "State-of-the-art simulators and VR training systems",
    },
    {
      year: "2024",
      title: language === "tr" ? "2500+ Mezun" : "2500+ Graduates",
      description:
        language === "tr"
          ? "Sektöre 2500'den fazla nitelikli pilot kazandırdık"
          : "We have graduated over 2500 qualified pilots to the industry",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-inter">
            {language === "tr" ? "Tarihçemiz" : "Our History"}
          </h2>
          <p className="text-lg text-muted-foreground font-dm-sans max-w-2xl mx-auto">
            {language === "tr"
              ? "15 yıllık yolculuğumuzda attığımız önemli adımlar"
              : "Important steps we have taken in our 15-year journey"}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6 group">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  {milestone.year}
                </div>
                <div className="flex-1 bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 group-hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-bold text-foreground mb-2 font-inter">{milestone.title}</h3>
                  <p className="text-muted-foreground font-dm-sans">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function LeadershipTeam() {
  const { language } = useLanguage()

  const leaders = [
    {
      name: "Ahmet Kaya",
      position: language === "tr" ? "Genel Müdür" : "General Manager",
      experience: language === "tr" ? "25 yıl havacılık deneyimi" : "25 years aviation experience",
      image: "/aviation-engineer-instructor.png",
    },
    {
      name: "Elif Demir",
      position: language === "tr" ? "Eğitim Direktörü" : "Training Director",
      experience: language === "tr" ? "20 yıl eğitim deneyimi" : "20 years training experience",
      image: "/female-pilot-instructor.png",
    },
  ]

  const certifications = [
    {
      icon: Shield,
      name: "EASA Part-147",
      description: language === "tr" ? "Avrupa Havacılık Güvenliği Ajansı" : "European Aviation Safety Agency",
    },
    {
      icon: Globe,
      name: "ICAO Standards",
      description:
        language === "tr" ? "Uluslararası Sivil Havacılık Örgütü" : "International Civil Aviation Organization",
    },
    {
      icon: Award,
      name: "ISO 9001:2015",
      description: language === "tr" ? "Kalite Yönetim Sistemi" : "Quality Management System",
    },
    {
      icon: Target,
      name: "IATA Training",
      description:
        language === "tr" ? "Uluslararası Hava Taşımacılığı Birliği" : "International Air Transport Association",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Leadership Team */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 font-inter">
              {language === "tr" ? "Yönetim Ekibi" : "Leadership Team"}
            </h2>
            <div className="space-y-6">
              {leaders.map((leader, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-6 bg-gradient-to-br from-background to-primary/5 rounded-xl border border-border/50"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground font-inter">{leader.name}</h3>
                    <p className="text-primary font-medium font-dm-sans">{leader.position}</p>
                    <p className="text-sm text-muted-foreground font-dm-sans">{leader.experience}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 font-inter">
              {language === "tr" ? "Sertifikalarımız" : "Our Certifications"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-br from-background to-accent/5 rounded-xl border border-border/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <cert.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground font-inter">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground font-dm-sans">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function CorporatePage() {
  return (
    <div className="min-h-screen pt-20 lg:pt-32">
      <CorporateHero />
      <CompanyInfo />
      <CompanyHistory />
      <LeadershipTeam />
      <Footer />
    </div>
  )
}
