"use client"
import { useLanguage } from "@/lib/language-context"
import { Users, User, MessageSquare, Award, Target, BookOpen, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useEffect, useState } from "react"
import { listServices, type ServiceItem } from "@/lib/api/serviceService"

function ServicesHero() {
  const { language } = useLanguage()

  return (
    <section
      className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px] overflow-hidden"
      style={{
        backgroundImage: "url('/bannerv2.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        backgroundAttachment: "fixed",
        top: -40,
      }}
    >
      {/* Lacivert-mavi overlay, gri değil! */}
      <div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(23,37,84,0.36) 0%, rgba(23,37,84,0.08) 100%)",
        }}
      ></div>
      {/* Content above image */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="text-4xl lg:text-6xl font-bold mb-6 font-inter drop-shadow-lg"
              style={{
                color: "#f5f5f5",
              }}
            >
              {language === "tr" ? "Hizmetlerimiz" : "Our Services"}
            </h1>
            <p
              className="text-xl lg:text-2xl font-dm-sans drop-shadow-md"
              style={{
                color: "#f5f5f5",
              }}
            >
              {language === "tr"
                ? "Havacılığın disiplinini ve profesyonelliğini esas alarak, gökyüzüne sağlam adımlarla ilerlemek isteyen her adayın yanında yer alıyoruz."
                : "Based on aviation discipline and professionalism, we stand by every candidate who wants to progress steadily to the skies."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesList() {
  const { language } = useLanguage()
  const [services, setServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const data = await listServices({ status: "active" })
        setServices(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch services")
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <section
        className="py-20"
        style={{
          backgroundColor: "#f5f5f5",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-background to-accent/5 rounded-2xl border border-border/50 p-8 animate-pulse"
              >
                <div className="w-16 h-16 mb-6 bg-muted rounded-2xl"></div>
                <div className="h-6 bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded mb-6"></div>
                <div className="space-y-2 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-3 bg-muted rounded"></div>
                  ))}
                </div>
                <div className="h-12 bg-muted rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-destructive mb-4">
              {language === "tr" ? "Hizmetler yüklenirken hata oluştu" : "Error loading services"}
            </p>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  const getServiceIcon = (service: ServiceItem) => {
    const title = service.title.toLowerCase()
    if (title.includes("mülakat") || title.includes("interview")) return MessageSquare
    if (title.includes("bireysel") || title.includes("individual")) return User
    if (title.includes("grup") || title.includes("group")) return Users
    if (title.includes("kurul") || title.includes("board")) return Award
    if (title.includes("crm")) return Target
    return BookOpen
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = getServiceIcon(service)
            const title = language === "tr" ? service.title : service.titleEn || service.title
            const description = language === "tr" ? service.description : service.descriptionEn || service.description
            const features = language === "tr" ? service.features : service.featuresEn || service.features

            return (
              <div
                key={service._id}
                className="bg-gradient-to-br from-background to-accent/5 rounded-2xl border border-border/50 p-8 hover:shadow-xl transition-all duration-300 group"
              >
                {/* icon wrapper: navy gradient (lacivert) */}
                <div
                  className="w-16 h-16 mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: "linear-gradient(135deg, #07243e 0%, #0b2a4a 100%)",
                  }}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4 font-inter">{title}</h3>
                <p className="text-muted-foreground mb-6 font-dm-sans leading-relaxed">{description}</p>
                {features && features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {features.slice(0, 4).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground font-dm-sans">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Button: lacivert background, white text; hover shows subtle white overlay (no color swap) */}
                <Link
                  href={`/hizmetlerimiz/${service.slug || service._id}`}
                  className="inline-flex items-center justify-center w-full px-4 py-3 rounded-xl font-medium transition duration-200"
                  style={{
                    backgroundColor: "#0b2a4a",
                    color: "#ffffff",
                  }}
                  // keep hover effect as subtle white overlay using Tailwind utilities where possible
                >
                  <span className="flex items-center gap-2">
                    {language === "tr" ? "Detayları Görüntüle" : "View Details"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const { language } = useLanguage()
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqData = [
    {
      category: language === "tr" ? "Genel Bilgilendirme" : "General Information",
      items: [
        {
          question:
            language === "tr"
              ? "Değerlendirme süreçleri nerede gerçekleştirilmektedir?"
              : "Where are the evaluation processes conducted?",
          answer:
            language === "tr"
              ? "Tüm değerlendirme aşamaları, THY A.O. Uçuş Eğitim Başkanlığı bünyesinde yer alan İnsan Kaynakları Değerlendirme (Test) Merkezi'nde yürütülmektedir. Adres: Beşyol Birlik Caddesi, Şükrü Balcı Polis Eğitim Merkezi arkası, Florya – Şenlikköy / İstanbul."
              : "All evaluation stages are conducted at the Human Resources Evaluation (Test) Center within THY A.O. Flight Training Department. Address: Beşyol Birlik Caddesi, behind Şükrü Balcı Police Training Center, Florya – Şenlikköy / Istanbul.",
        },
        {
          question:
            language === "tr"
              ? "Sınavlara katılım için ulaşım giderleri THY tarafından karşılanıyor mu?"
              : "Are transportation costs covered by THY for exam participation?",
          answer:
            language === "tr"
              ? "Hayır, adayların sınavlara katılım sürecindeki tüm ulaşım masrafları kendilerine aittir."
              : "No, all transportation costs for candidates' exam participation are their own responsibility.",
        },
        {
          question:
            language === "tr"
              ? "İlana kaç kez başvuru hakkım bulunmaktadır?"
              : "How many times can I apply to an announcement?",
          answer:
            language === "tr"
              ? "Adaylar, İngilizce sınavı, PACE testi, CRM (Yetkinlik) mülakatı ve Kurul mülakatı olmak üzere her aşamaya en fazla iki kez katılım sağlayabilir."
              : "Candidates can participate in each stage (English exam, PACE test, CRM interview, and Board interview) a maximum of two times.",
        },
      ],
    },
    {
      category: language === "tr" ? "İngilizce Sınavı" : "English Exam",
      items: [
        {
          question:
            language === "tr"
              ? "Sınav günü takım elbise giyilmesi zorunlu mu?"
              : "Is wearing a suit mandatory on exam day?",
          answer:
            language === "tr"
              ? "Hayır, resmi bir görünüm sağlamak koşuluyla, kurumsal ortama uygun rahat kıyafetler tercih edilebilir."
              : "No, comfortable clothes suitable for a corporate environment can be preferred, provided they maintain a formal appearance.",
        },
        {
          question:
            language === "tr"
              ? "Sınavım üçüncü bölümde sona erdi. Bu başarısız olduğum anlamına mı gelir?"
              : "My exam ended in the third section. Does this mean I failed?",
          answer:
            language === "tr"
              ? "Genel gözlemlere göre, en az dördüncü bölümün sonuna ulaşan adaylar sınavı başarıyla tamamlayabilmektedir."
              : "According to general observations, candidates who reach at least the end of the fourth section can successfully complete the exam.",
        },
      ],
    },
    {
      category:
        language === "tr" ? "Yetkinlik Değerlendirmesi (CRM Mülakatı)" : "Competency Assessment (CRM Interview)",
      items: [
        {
          question:
            language === "tr"
              ? "CRM mülakatında kıyafet seçimi nasıl olmalı?"
              : "How should I dress for the CRM interview?",
          answer:
            language === "tr"
              ? "Pilotluk, üniforma ile icra edilen bir meslek olduğundan, koyu renk takım elbise tercih edilmesi tavsiye edilir."
              : "Since piloting is a profession performed in uniform, wearing a dark-colored suit is recommended.",
        },
        {
          question:
            language === "tr"
              ? "CRM re-test sürecine katılacağım. Şansım azaldı mı?"
              : "I will participate in the CRM re-test process. Are my chances reduced?",
          answer:
            language === "tr"
              ? "İlk deneyiminizden elde ettiğiniz geri bildirimleri analiz ederek eksik yönlerinizi geliştirmiş olmanız, sonraki aşamada size avantaj sağlayabilir."
              : "Analyzing the feedback from your first experience and improving your weak points can give you an advantage in the next stage.",
        },
      ],
    },
    {
      category: language === "tr" ? "Kurul Mülakatı" : "Board Interview",
      items: [
        {
          question:
            language === "tr"
              ? "Kurul mülakatına katılırken kıyafet zorunluluğu var mı?"
              : "Is there a dress code for the board interview?",
          answer:
            language === "tr"
              ? "Profesyonel bir görünüm açısından, koyu renk takım elbise giyilmesi önerilmektedir."
              : "For a professional appearance, wearing a dark-colored suit is recommended.",
        },
        {
          question:
            language === "tr" ? "Boy ölçümünde esneklik sağlanıyor mu?" : "Is there flexibility in height measurement?",
          answer:
            language === "tr"
              ? "Hayır, boy ölçüm kriterlerinde esneklik uygulanmamaktadır. 2023 yılı itibarıyla boy-kilo ölçümleri dijital cihazlar aracılığıyla gerçekleştirilmektedir."
              : "No, there is no flexibility in height measurement criteria. As of 2023, height-weight measurements are performed using digital devices.",
        },
      ],
    },
    {
      category: language === "tr" ? "Sağlık Kontrolü" : "Health Control",
      items: [
        {
          question:
            language === "tr"
              ? "SHGM yetkili hastanelerde yapılan muayene ve tetkik ücretleri kim tarafından karşılanıyor?"
              : "Who covers the examination and test fees at SHGM authorized hospitals?",
          answer:
            language === "tr"
              ? "Tüm sağlık giderleri adaylar tarafından karşılanmaktadır."
              : "All health expenses are covered by the candidates.",
        },
        {
          question:
            language === "tr"
              ? "Lazer göz ameliyatı geçirdim. Bu durum pilot olmama engel midir?"
              : "I had laser eye surgery. Does this prevent me from becoming a pilot?",
          answer:
            language === "tr"
              ? "Hayır, lazer göz ameliyatı olmak pilot adaylığına engel teşkil etmez."
              : "No, having laser eye surgery does not prevent pilot candidacy.",
        },
        {
          question:
            language === "tr"
              ? "Renk körlüğü pilot olmaya engel midir?"
              : "Does color blindness prevent becoming a pilot?",
          answer:
            language === "tr"
              ? "Evet, renk körlüğü tespiti durumunda aday sağlık kontrolü aşamasını geçemez."
              : "Yes, if color blindness is detected, the candidate cannot pass the health control stage.",
        },
      ],
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-inter">
              {language === "tr" ? "Sıkça Sorulan Sorular" : "Frequently Asked Questions"}
            </h2>
            <p className="text-lg text-gray-600 font-dm-sans">
              {language === "tr"
                ? "Pilot adaylığı süreciyle ilgili merak ettiğiniz soruların yanıtları"
                : "Answers to your questions about the pilot candidacy process"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-blue-900 font-inter">{category.category}</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => {
                      const globalIndex = categoryIndex * 100 + itemIndex
                      const isOpen = openItems.includes(globalIndex)

                      return (
                        <div
                          key={itemIndex}
                          className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-200"
                        >
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-5 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                          >
                            <span className="font-medium text-gray-900 font-dm-sans pr-4">{item.question}</span>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-5 py-4 bg-white border-t border-gray-200">
                              <p className="text-gray-700 font-dm-sans leading-relaxed">{item.answer}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen pt-20 lg:pt-32">
      <ServicesHero />

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-inter">
              {language === "tr" ? "Mülakat Teknikleri Eğitimi" : "Interview Techniques Training"}
            </h2>
            <p className="text-lg text-muted-foreground font-dm-sans max-w-3xl mx-auto">
              {language === "tr"
                ? "Havacılık sektöründe başarılı olmak için gerekli mülakat tekniklerini öğrenin ve kendinizi en iyi şekilde ifade etmeyi keşfedin."
                : "Learn the interview techniques necessary to succeed in the aviation industry and discover how to express yourself in the best way."}
            </p>
          </div>
        </div>
      </section>

      <ServicesList />

      <FAQSection />

      <Footer />
    </div>
  )
}