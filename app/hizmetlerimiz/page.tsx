  "use client"
  import { useRef } from "react"
  import { useLanguage } from "@/lib/language-context"
  import { Users, User, MessageSquare, Award, Target, BookOpen } from "lucide-react"
  import { Footer } from "@/components/footer"

  function ServicesHero() {
    const { language } = useLanguage()

    return (
       <section 
      className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px] overflow-hidden"
      style={{
        backgroundImage: "url('/egitimbanner.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom", 
        backgroundAttachment: "fixed",
       top:-40
      }}
    >
      {/* Lacivert-mavi overlay, gri değil! */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(23,37,84,0.36) 0%, rgba(23,37,84,0.08) 100%)"
        }}
      ></div>
      {/* Content above image */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 
              className="text-4xl lg:text-6xl font-bold mb-6 font-inter drop-shadow-lg"
              style={{
                color:'#f5f5f5'
              }}
            >
              {language === "tr" ? "Hizmetlerimiz" : "Our Services"}
            </h1>
            <p 
              className="text-xl lg:text-2xl font-dm-sans drop-shadow-md"
              style={{
                color:'#f5f5f5'
              }}
            >
              {language === "tr"
                ? "Havacılığın disiplinini ve profesyonelliğini esas alarak, gökyüzüne sağlam adımlarla ilerlemek isteyen her adayın yanında yer alıyoruz."
                : "Based on aviation discipline and professionalism, we stand by every candidate who wants to progress steadily to the skies."
              }
            </p>
          </div>
        </div>
      </div>
    </section>
    )
  }

  function ServicesList() {
    const { language } = useLanguage()
    
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