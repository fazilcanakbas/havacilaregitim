"use client"

import { useLanguage } from "@/lib/language-context"
import { Users, Award, Target, Heart, Star, Quote } from "lucide-react"
import Image from "next/image"
import { Footer } from "@/components/footer"

function AboutHero() {
  const { language } = useLanguage()

  return (
    <section className="relative bg-gradient-to-br from-accent/10 via-background to-primary/5 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 font-inter">
            {language === "tr" ? "Hakkımızda" : "About Us"}
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground font-dm-sans">
            {language === "tr"
              ? "Havacılık tutkusu ile başlayan yolculuğumuz, bugün binlerce pilotun hayallerini gerçekleştirmesine vesile oldu."
              : "Our journey that started with aviation passion has helped thousands of pilots realize their dreams today."}
          </p>
        </div>
      </div>
    </section>
  )
}

function OurValues() {
  const { language } = useLanguage()

  const values = [
    {
      icon: Target,
      title: language === "tr" ? "Misyonumuz" : "Our Mission",
      description:
        language === "tr"
          ? "Dünya standartlarında havacılık eğitimi sunarak, sektörün ihtiyaç duyduğu nitelikli pilotları yetiştirmek."
          : "To train qualified pilots needed by the sector by providing world-class aviation education.",
    },
    {
      icon: Heart,
      title: language === "tr" ? "Vizyonumuz" : "Our Vision",
      description:
        language === "tr"
          ? "Türkiye'nin en güvenilir ve tercih edilen havacılık eğitim kurumu olmak."
          : "To be Turkey's most trusted and preferred aviation education institution.",
    },
    {
      icon: Award,
      title: language === "tr" ? "Değerlerimiz" : "Our Values",
      description:
        language === "tr"
          ? "Güvenlik, kalite, sürekli gelişim ve öğrenci odaklı yaklaşım temel değerlerimizdir."
          : "Safety, quality, continuous improvement and student-focused approach are our core values.",
    },
    {
      icon: Users,
      title: language === "tr" ? "Ekibimiz" : "Our Team",
      description:
        language === "tr"
          ? "Deneyimli eğitmenler ve uzman kadromuz ile her öğrenciye özel ilgi gösteriyoruz."
          : "We provide special attention to each student with our experienced instructors and expert staff.",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-inter">
            {language === "tr" ? "Değerlerimiz" : "Our Values"}
          </h2>
          <p className="text-lg text-muted-foreground font-dm-sans max-w-2xl mx-auto">
            {language === "tr"
              ? "Başarımızın temelinde yatan değerler ve ilkelerimiz"
              : "The values and principles that form the foundation of our success"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center p-8 bg-gradient-to-br from-background to-accent/5 rounded-2xl border border-border/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4 font-inter">{value.title}</h3>
              <p className="text-muted-foreground font-dm-sans leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function InstructorProfiles() {
  const { language } = useLanguage()

  const instructors = [
    {
      name: "Kaptan Mehmet Özkan",
      title: language === "tr" ? "Baş Eğitmen Pilot" : "Chief Flight Instructor",
      experience: language === "tr" ? "15,000+ uçuş saati" : "15,000+ flight hours",
      specialization: language === "tr" ? "Ticari Pilot Eğitimi" : "Commercial Pilot Training",
      image: "/aviation-engineer-instructor.png",
      bio:
        language === "tr"
          ? "20 yıllık havayolu deneyimi ile öğrencilerimize gerçek dünya perspektifi sunuyor."
          : "Brings real-world perspective to our students with 20 years of airline experience.",
    },
    {
      name: "Kaptan Ayşe Yılmaz",
      title: language === "tr" ? "Simülatör Eğitmeni" : "Simulator Instructor",
      experience: language === "tr" ? "12,000+ uçuş saati" : "12,000+ flight hours",
      specialization: language === "tr" ? "Instrument Rating" : "Instrument Rating",
      image: "/female-pilot-instructor.png",
      bio:
        language === "tr"
          ? "Modern simülatör teknolojileri konusunda uzman, güvenli uçuş tekniklerini öğretiyor."
          : "Expert in modern simulator technologies, teaching safe flight techniques.",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-accent/5 to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-inter">
            {language === "tr" ? "Eğitmen Kadromuz" : "Our Instructor Team"}
          </h2>
          <p className="text-lg text-muted-foreground font-dm-sans max-w-2xl mx-auto">
            {language === "tr"
              ? "Deneyimli ve sertifikalı eğitmenlerimiz ile kaliteli eğitim"
              : "Quality education with our experienced and certified instructors"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={instructor.image || "/placeholder.svg"}
                    alt={instructor.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground font-inter">{instructor.name}</h3>
                <p className="text-primary font-medium font-dm-sans">{instructor.title}</p>
              </div>

              <div className="space-y-3 text-center">
                <div className="flex justify-center items-center space-x-4 text-sm">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                    {instructor.experience}
                  </span>
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded-full font-medium">
                    {instructor.specialization}
                  </span>
                </div>
                <p className="text-muted-foreground font-dm-sans leading-relaxed">{instructor.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StudentTestimonials() {
  const { language } = useLanguage()

  const testimonials = [
    {
      name: "Ali Kaya",
      position: language === "tr" ? "Turkish Airlines Pilotu" : "Turkish Airlines Pilot",
      year: "2022 Mezunu",
      content:
        language === "tr"
          ? "HAVACILAR EĞİTİM'de aldığım eğitim sayesinde hayalim olan havayolu pilotu oldum. Eğitmenlerimizin deneyimi ve modern tesisler gerçekten fark yaratıyor."
          : "Thanks to the training I received at AVIATION EDUCATION, I became an airline pilot, which was my dream. The experience of our instructors and modern facilities really make a difference.",
      rating: 5,
    },
    {
      name: "Zeynep Demir",
      position: language === "tr" ? "Kargo Pilotu" : "Cargo Pilot",
      year: "2021 Mezunu",
      content:
        language === "tr"
          ? "Teorik bilgilerimin yanında pratik deneyim kazanmam için her türlü imkanı sağladılar. Şimdi uluslararası kargo uçuşlarında görev yapıyorum."
          : "They provided every opportunity for me to gain practical experience alongside my theoretical knowledge. Now I work on international cargo flights.",
      rating: 5,
    },
    {
      name: "Murat Özkan",
      position: language === "tr" ? "Özel Jet Pilotu" : "Private Jet Pilot",
      year: "2023 Mezunu",
      content:
        language === "tr"
          ? "Eğitim sürecinde aldığım bireysel ilgi ve kaliteli eğitim sayesinde kendimi sektörde güvenli hissediyorum."
          : "Thanks to the individual attention and quality education I received during the training process, I feel confident in the industry.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-inter">
            {language === "tr" ? "Mezun Yorumları" : "Graduate Testimonials"}
          </h2>
          <p className="text-lg text-muted-foreground font-dm-sans max-w-2xl mx-auto">
            {language === "tr"
              ? "Mezunlarımızın başarı hikayeleri ve deneyimleri"
              : "Success stories and experiences of our graduates"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-background to-primary/5 rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>

              <Quote className="w-8 h-8 text-primary/30 mb-4" />

              <p className="text-muted-foreground font-dm-sans leading-relaxed mb-6 italic">"{testimonial.content}"</p>

              <div className="border-t border-border/50 pt-4">
                <h4 className="font-bold text-foreground font-inter">{testimonial.name}</h4>
                <p className="text-primary font-medium font-dm-sans text-sm">{testimonial.position}</p>
                <p className="text-muted-foreground font-dm-sans text-xs">{testimonial.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 lg:pt-32">
      <AboutHero />
      <OurValues />
      <InstructorProfiles />
      <StudentTestimonials />
      <Footer />
    </div>
  )
}
