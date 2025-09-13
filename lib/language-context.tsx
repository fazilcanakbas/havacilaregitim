"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "tr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  tr: {
    // Navigation
    "nav.home": "Anasayfa",
    "nav.corporate": "Kurumsal",
    "nav.about": "Hakkımızda",
    "nav.services": "Hizmetlerimiz",
    "nav.blog": "Blog",
    "nav.announcements": "Duyurular",
    "nav.contact": "İletişim",

    // Hero Section
    "hero.badge": "Türkiye'nin Önde Gelen Havacılık Okulu",
    "hero.cta.start": "Hizmetlerimiz",
    "hero.cta.video": "Tanıtım Videosu",
    "hero.stats.graduates": "Kursiyer",
    "hero.stats.experience": "Yıl Deneyim",
    "hero.stats.aircraft": "Eğitmen Kadrosu",

    // Atatürk Quote
    "quote.text":
      "Türk milletinin yeni nesli, havacılıkta da kendini gösterecek ve göklerde de Türk'ün büyüklüğünü ispat edecektir.",
    "quote.author": "Mustafa Kemal ATATÜRK",

    // Services
    "services.badge": "Hizmetlerimiz",
    "services.title": "Mülakat Teknikleri Eğitimi ",
    "services.subtitle":
      "Uluslararası standartlarda, deneyimli eğitmenler eşliğinde sunduğumuz kapsamlı pilot eğitimi programları ile havacılık kariyerinizi başlatın.",
    "services.cta": "Detayları İncele",
    "services.viewAll": "Tüm Hizmetleri İncele",

    // Contact
    "contact.badge": "İletişim",
    "contact.title": "Bizimle İletişime Geçin",
    "contact.subtitle":
      "Havacılık eğitimi hakkında sorularınız mı var? Uzman ekibimiz size yardımcı olmak için burada. Hemen iletişime geçin!",
    "contact.phone": "Telefon",
    "contact.email": "E-posta",
    "contact.address": "Adres",

    // Footer
    "footer.company": "HAVACILAR EĞİTİM",
    "footer.tagline": "Aviation Education",
    "footer.description":
      "Kaptan pilotlar ve alanında uzman psikologlar tarafından verilen bireysel danışmanlık ve gerçekçi mülakat simülasyonlarıyla pilot adaylarının işe alım süreci hazırlıklarına katkıda bulunuyoruz.",
    "footer.quickLinks": "Hızlı Bağlantılar",
    "footer.programs": "Eğitim Programları",
    "footer.contact": "İletişim",
    "footer.newsletter": "Bülten Aboneliği",
    "footer.newsletterPlaceholder": "E-posta adresiniz",
    "footer.copyright": "© 2025 Bloomo Media Tarafından geliştirildi. Tüm hakları saklıdır.",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    // "nav.corporate": "Corporate",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.blog": "Blog",
    "nav.announcements": "Announcements",
    "nav.contact": "Contact",

    // Hero Section
    "hero.badge": "Turkey's Leading Aviation School",
    "hero.cta.start": "Services",
    "hero.cta.video": "Watch Video",
    "hero.stats.graduates": "Graduate Pilots",
    "hero.stats.experience": "Years Experience",
    "hero.stats.aircraft": "Training Aircraft",

    // Atatürk Quote
    "quote.text":
      "The new generation of the Turkish nation will show itself in aviation and prove the greatness of the Turk in the skies as well.",
    "quote.author": "Mustafa Kemal ATATÜRK",

    // Services
    "services.badge": "Services",
    "services.title": "Professional Aviation Training",
    "services.subtitle":
      "Start your aviation career with our comprehensive pilot training programs offered by experienced instructors at international standards.",
    "services.cta": "View Details",
    "services.viewAll": "View All Services",

    // Contact
    "contact.badge": "Contact",
    "contact.title": "Get In Touch With Us",
    "contact.subtitle":
      "Do you have questions about aviation training? Our expert team is here to help you. Contact us now!",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.address": "Address",

    // Footer
    "footer.company": "AVIATION EDUCATION",
    "footer.tagline": "Havacılık Eğitimi",
    "footer.description":
      "We contribute to the preparation of pilot candidates for the recruitment process with individual counseling and realistic interview simulations provided by captain pilots and expert psychologists in the field.",
    "footer.quickLinks": "Quick Links",
    "footer.programs": "Training Programs",
    "footer.contact": "Contact",
    "footer.newsletter": "Newsletter Subscription",
    "footer.newsletterPlaceholder": "Your email address",
    "footer.copyright": "© 2025 Developed by Bloomo Media. All rights reserved.",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "tr" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
