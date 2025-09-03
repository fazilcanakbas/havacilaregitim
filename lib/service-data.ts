import { BookOpen, User, Target, Users, Award, MessageSquare } from "lucide-react"

export const servicesData = [
  {
    slug: "mulakat-teknikleri-egitimi",
    icon: BookOpen,
    title: {
      tr: "Mülakat Teknikleri Eğitimi",
      en: "Interview Techniques Training",
    },
    description: {
      tr: "Havacılık mülakatlarında başarılı olmak için gerekli teknikleri öğrenin ve kendinizi en iyi şekilde ifade etmeyi keşfedin.",
      en: "Learn the necessary techniques to succeed in aviation interviews and discover how to express yourself in the best way.",
    },
    features: {
      tr: ["Profesyonel mülakat teknikleri", "İletişim becerileri geliştirme", "Özgüven artırma", "Stres yönetimi"],
      en: [
        "Professional interview techniques",
        "Communication skills development",
        "Confidence building",
        "Stress management",
      ],
    },
    detailedContent: {
      tr: {
        overview:
          "Havacılık sektöründe mülakat süreci, adayların teknik bilgilerinin yanı sıra kişilik özelliklerini, iletişim becerilerini ve stres altında performanslarını değerlendiren kapsamlı bir süreçtir.",
        benefits: [
          "Mülakat öncesi hazırlık stratejileri",
          "Etkili sunum teknikleri",
          "Beden dili ve ses tonu optimizasyonu",
          "Zor sorularla başa çıkma yöntemleri",
          "Özgüven geliştirme egzersizleri",
        ],
        duration: "2 gün yoğun eğitim",
        price: "Fiyat bilgisi için iletişime geçin",
      },
      en: {
        overview:
          "The interview process in the aviation industry is a comprehensive process that evaluates candidates' personality traits, communication skills, and performance under stress, in addition to their technical knowledge.",
        benefits: [
          "Pre-interview preparation strategies",
          "Effective presentation techniques",
          "Body language and voice tone optimization",
          "Methods for dealing with difficult questions",
          "Confidence building exercises",
        ],
        duration: "2 days intensive training",
        price: "Contact for pricing information",
      },
    },
  },
  {
    slug: "bireysel-danismanlik",
    icon: User,
    title: {
      tr: "Bireysel Danışmanlık",
      en: "Individual Consulting",
    },
    description: {
      tr: "Adayın ihtiyaç ve beklentileri doğrultusunda bireysel değerlendirme ve hedef odaklı çalışma planı oluşturma.",
      en: "Individual assessment and goal-oriented work plan creation in line with the candidate's needs and expectations.",
    },
    features: {
      tr: ["Kişiye özel değerlendirme", "Gelişim alanları belirleme", "Hedef odaklı plan", "Retest stratejileri"],
      en: ["Personalized assessment", "Development areas identification", "Goal-oriented plan", "Retest strategies"],
    },
    detailedContent: {
      tr: {
        overview:
          "Her adayın kendine özgü güçlü ve gelişim alanları vardır. Bireysel danışmanlık hizmetimizle, kişisel ihtiyaçlarınıza uygun özelleştirilmiş bir gelişim planı oluşturuyoruz.",
        benefits: [
          "Detaylı kişilik analizi",
          "Güçlü yönlerin belirlenmesi",
          "Gelişim alanlarının tespiti",
          "Kişiye özel çalışma programı",
          "Sürekli takip ve geri bildirim",
        ],
        duration: "4-6 hafta sürekli takip",
        price: "Fiyat bilgisi için iletişime geçin",
      },
      en: {
        overview:
          "Each candidate has their own unique strengths and development areas. With our individual consulting service, we create a customized development plan tailored to your personal needs.",
        benefits: [
          "Detailed personality analysis",
          "Identification of strengths",
          "Detection of development areas",
          "Personalized study program",
          "Continuous monitoring and feedback",
        ],
        duration: "4-6 weeks continuous follow-up",
        price: "Contact for pricing information",
      },
    },
  },
  {
    slug: "crm-bireysel-mulakat",
    icon: Target,
    title: {
      tr: "CRM Bireysel Mülakat",
      en: "Individual CRM Interview",
    },
    description: {
      tr: "Uzman kaptan pilotlar ve profesyonel psikologlar eşliğinde gerçek mülakat ortamı deneyimi.",
      en: "Real interview environment experience with expert captain pilots and professional psychologists.",
    },
    features: {
      tr: ["25-40 kapsamlı soru", "Uzman kaptan pilotlar", "Profesyonel psikologlar", "Çok boyutlu değerlendirme"],
      en: [
        "25-40 comprehensive questions",
        "Expert captain pilots",
        "Professional psychologists",
        "Multi-dimensional assessment",
      ],
    },
    detailedContent: {
      tr: {
        overview:
          "CRM (Crew Resource Management) mülakatı, havacılık sektöründe ekip çalışması, karar verme ve iletişim becerilerinizi değerlendiren kritik bir süreçtir.",
        benefits: [
          "Gerçek mülakat ortamı simülasyonu",
          "Uzman kaptan pilotlardan geri bildirim",
          "Profesyonel psikolog değerlendirmesi",
          "Detaylı performans analizi",
          "Gelişim önerileri",
        ],
        duration: "2-3 saat yoğun mülakat",
        price: "Fiyat bilgisi için iletişime geçin",
      },
      en: {
        overview:
          "CRM (Crew Resource Management) interview is a critical process that evaluates your teamwork, decision-making, and communication skills in the aviation industry.",
        benefits: [
          "Real interview environment simulation",
          "Feedback from expert captain pilots",
          "Professional psychologist evaluation",
          "Detailed performance analysis",
          "Development recommendations",
        ],
        duration: "2-3 hours intensive interview",
        price: "Contact for pricing information",
      },
    },
  },
  {
    slug: "crm-grup-mulakati",
    icon: Users,
    title: {
      tr: "CRM Grup Mülakatı",
      en: "CRM Group Interview",
    },
    description: {
      tr: "4-6 kişilik gruplar halinde gerçek grup mülakat atmosferinde ekip becerilerinizi geliştirin.",
      en: "Develop your teamwork skills in real group interview atmosphere with groups of 4-6 people.",
    },
    features: {
      tr: ["4-6 kişilik gruplar", "Ekip içi iletişim", "Liderlik becerileri", "Problem çözme"],
      en: ["Groups of 4-6 people", "Team communication", "Leadership skills", "Problem solving"],
    },
    detailedContent: {
      tr: {
        overview:
          "Grup mülakatları, havacılık sektöründe ekip halinde çalışma becerinizi, liderlik potansiyelinizi ve grup dinamiklerindeki rolünüzü değerlendiren önemli bir süreçtir.",
        benefits: [
          "Gerçek grup dinamikleri deneyimi",
          "Ekip çalışması becerilerinin gelişimi",
          "Liderlik potansiyelinin keşfi",
          "İletişim becilerinin güçlendirilmesi",
          "Grup içi rol belirleme",
        ],
        duration: "Yarım gün grup aktivitesi",
        price: "Fiyat bilgisi için iletişime geçin",
      },
      en: {
        overview:
          "Group interviews are an important process that evaluates your teamwork skills, leadership potential, and role in group dynamics in the aviation industry.",
        benefits: [
          "Real group dynamics experience",
          "Development of teamwork skills",
          "Discovery of leadership potential",
          "Strengthening communication skills",
          "Role determination within the group",
        ],
        duration: "Half-day group activity",
        price: "Contact for pricing information",
      },
    },
  },
  {
    slug: "kurul-mulakat",
    icon: Award,
    title: {
      tr: "Kurul Mülakat",
      en: "Board Interview",
    },
    description: {
      tr: "Türkçe ve İngilizce dillerinde gerçek kurul mülakat ortamı simülasyonu ve detaylı performans analizi.",
      en: "Real board interview environment simulation in Turkish and English languages with detailed performance analysis.",
    },
    features: {
      tr: ["Türkçe ve İngilizce sorular", "Gerçek kurul ortamı", "Detaylı performans analizi", "Uzman geri bildirimi"],
      en: [
        "Turkish and English questions",
        "Real board environment",
        "Detailed performance analysis",
        "Expert feedback",
      ],
    },
    detailedContent: {
      tr: {
        overview:
          "Kurul mülakatı, havayolu şirketlerinin son aşama değerlendirme sürecidir. Bu mülakatta teknik bilgi, kişilik özellikleri ve dil becerileri bir arada değerlendirilir.",
        benefits: [
          "Çok dilli mülakat deneyimi",
          "Kurul üyeleriyle etkileşim",
          "Teknik ve davranışsal soru deneyimi",
          "Stres altında performans değerlendirmesi",
          "Profesyonel geri bildirim",
        ],
        duration: "3-4 saat kapsamlı değerlendirme",
        price: "Fiyat bilgisi için iletişime geçin",
      },
      en: {
        overview:
          "Board interview is the final stage evaluation process of airline companies. In this interview, technical knowledge, personality traits, and language skills are evaluated together.",
        benefits: [
          "Multilingual interview experience",
          "Interaction with board members",
          "Technical and behavioral question experience",
          "Performance evaluation under stress",
          "Professional feedback",
        ],
        duration: "3-4 hours comprehensive evaluation",
        price: "Contact for pricing information",
      },
    },
  },
  {
    slug: "geri-bildirim-analiz",
    icon: MessageSquare,
    title: {
      tr: "Geri Bildirim ve Analiz",
      en: "Feedback and Analysis",
    },
    description: {
      tr: "Tüm simülasyon süreçleri sonrasında kapsamlı geri bildirim ve gelişim odaklı öneriler.",
      en: "Comprehensive feedback and development-focused recommendations after all simulation processes.",
    },
    features: {
      tr: ["Detaylı performans raporu", "Gelişim önerileri", "Bireysel ve grup analizi", "Uzman değerlendirmesi"],
      en: [
        "Detailed performance report",
        "Development suggestions",
        "Individual and group analysis",
        "Expert evaluation",
      ],
    },
    detailedContent: {
      tr: {
        overview:
          "Eğitim ve simülasyon süreçlerinin ardından, performansınızı detaylı olarak analiz ediyor ve gelişim alanlarınız için özel öneriler sunuyoruz.",
        benefits: [
          "Kapsamlı performans değerlendirmesi",
          "Güçlü ve zayıf yönlerin analizi",
          "Kişiselleştirilmiş gelişim planı",
          "Takip toplantıları",
          "Sürekli destek",
        ],
        duration: "Sürekli takip ve destek",
        price: "Diğer hizmetlere dahil",
      },
      en: {
        overview:
          "After training and simulation processes, we analyze your performance in detail and offer special recommendations for your development areas.",
        benefits: [
          "Comprehensive performance evaluation",
          "Analysis of strengths and weaknesses",
          "Personalized development plan",
          "Follow-up meetings",
          "Continuous support",
        ],
        duration: "Continuous follow-up and support",
        price: "Included in other services",
      },
    },
  },
]

export function getServiceBySlug(slug: string) {
  return servicesData.find((service) => service.slug === slug)
}
