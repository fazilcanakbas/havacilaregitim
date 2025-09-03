"use client"

import { useLanguage } from "@/lib/language-context"
import { Users, Award, Target, Heart, Plane, BookOpen, Users2, MessageSquare, Star, Quote } from "lucide-react"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

// Fade-in animasyonu için temel varyantlar
const fadeInVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

// Kartlar için kayarak belirme animasyonu varyantları
const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

function AboutHero() {
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
        top: -40
      }}
    >
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(23,37,84,0.36) 0%, rgba(23,37,84,0.08) 100%)"
        }}
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-bold mb-6 font-inter drop-shadow-lg"
            style={{ color:'#f5f5f5' }}
          >
            {language === "tr" ? "Hakkımızda" : "About Us"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl lg:text-2xl font-dm-sans drop-shadow-md"
            style={{ color:'#f5f5f5', marginTop:40 }}
          >
            {language === "tr"
              ? "Havacılık tutkusu ile başlayan yolculuğumuz, bugün binlerce pilotun hayallerini gerçekleştirmesine vesile oldu."
              : "Our journey that started with aviation passion has helped thousands of pilots realize their dreams today."}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

function AboutCompany() {
  const { language } = useLanguage()

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 font-inter">
              {language === "tr" ? "Havacılar Eğitim A.Ş." : "Aviation Education Inc."}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, amount: 0.5 }}
            className="prose prose-lg max-w-none text-muted-foreground font-dm-sans leading-relaxed"
          >
            {language === "tr" ? (
              <div className="space-y-6">
                <p>
                  Havacılar Eğitim A.Ş, havacılık sektöründe kariyer hedefleyen pilot adaylarına yönelik profesyonel
                  danışmanlık ve eğitim hizmetleri sunan bir kuruluştur. Kadet pilot alım süreçlerine hazırlanan
                  adaylara, alanında uzman kaptan pilotlar, psikologlar ve mülakat teknikleri eğitmenleri eşliğinde
                  kapsamlı ve bireyselleştirilmiş bir eğitim süreci sunuyoruz.
                </p>
                <p>
                  Gerçek mülakat ortamlarını birebir simüle eden programlarımız sayesinde adayların hem teknik hem de
                  davranışsal yeterliliklerini geliştirmeleri sağlanır. Eğitim sürecimiz, her adayın güçlü yönlerini öne
                  çıkararak, havayolu şirketlerinin beklentilerine uygun donanımlı bireyler yetiştirmeye odaklanır.
                </p>
                <p>
                  Havacılar Eğitim A.Ş. olarak, havacılığın disiplinini ve profesyonelliğini esas alıyor; gökyüzüne
                  sağlam adımlarla ilerlemek isteyen her adayın yanında yer alıyoruz.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <p>
                  Aviation Education Inc. is an organization that provides professional consultancy and training
                  services for pilot candidates aiming for a career in the aviation sector. We offer a comprehensive and
                  personalized training process to candidates preparing for cadet pilot recruitment processes,
                  accompanied by expert captain pilots, psychologists and interview technique trainers.
                </p>
                <p>
                  Through our programs that simulate real interview environments one-to-one, candidates are enabled to
                  develop both their technical and behavioral competencies. Our training process focuses on highlighting
                  each candidate's strengths and training equipped individuals suitable for airline companies'
                  expectations.
                </p>
                <p>
                  As Aviation Education Inc., we base ourselves on the discipline and professionalism of aviation; we
                  stand by every candidate who wants to progress to the skies with solid steps.
                </p>
              </div>
            )}
          </motion.div>
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
          ? "Havacılık sektöründe kariyer hedefleyen pilot adaylarını, uluslararası standartlarda bilgi, beceri ve profesyonellikle donatıyor; onları yalnızca güçlü bireyler olarak değil, sektörün geleceğine yön verecek profesyoneller olarak yetiştiriyoruz. Alanında uzman kaptan pilotlar, psikologlar ve mülakat teknikleri eğitmenleri eşliğinde sunduğumuz bireyselleştirilmiş eğitim programlarımızla adaylarımızı, havayolu şirketlerinin beklentilerine uyum sağlamaktan öte, o beklentileri şekillendirecek seviyeye taşıyoruz."
          : "We equip pilot candidates aiming for a career in the aviation sector with international standard knowledge, skills and professionalism; we train them not only as strong individuals, but as professionals who will shape the future of the sector.",
    },
    {
      icon: Heart,
      title: language === "tr" ? "Vizyonumuz" : "Our Vision",
      description:
        language === "tr"
          ? "Havacılık eğitiminde kalite, güven ve profesyonelliğin öncüsü olarak; yalnızca adayların potansiyelini en üst seviyeye çıkarmakla kalmıyor, aynı zamanda sektöre yön veren, gökyüzünde fark yaratan pilotlar yetiştiriyoruz. Bizim vizyonumuz, tercih edilen değil; tercih eden kurum olmaktır. Türkiye'de ve uluslararası alanda havacılık eğitimine standart belirleyen, çizgisi takip edilen öncü kurum olmak."
          : "As a pioneer of quality, trust and professionalism in aviation education; we not only maximize candidates' potential, but also train pilots who lead the sector and make a difference in the sky.",
    },
    {
      icon: Award,
      title: language === "tr" ? "Değerlerimiz" : "Our Values",
      description:
        language === "tr"
          ? "Güvenlik, kalite, sürekli gelişim ve öğrenci odaklı yaklaşım temel değerlerimizdir. Havacılığın disiplinini ve profesyonelliğini esas alarak, her adayın bireysel ihtiyaçlarına odaklanıyoruz."
          : "Safety, quality, continuous improvement and student-focused approach are our core values. Based on the discipline and professionalism of aviation, we focus on the individual needs of each candidate.",
    },
    {
      icon: Users,
      title: language === "tr" ? "Uzman Kadromuz" : "Our Expert Team",
      description:
        language === "tr"
          ? "Alanında uzman kaptan pilotlar, psikologlar ve mülakat teknikleri eğitmenleri ile her öğrenciye özel ilgi gösteriyoruz. Deneyimli kadromuz ile gerçek dünya perspektifi sunuyoruz."
          : "We provide special attention to each student with expert captain pilots, psychologists and interview technique trainers. We offer real-world perspective with our experienced staff.",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-accent/5 to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-inter">
            {language === "tr" ? "Misyon, Vizyon ve Değerlerimiz" : "Our Mission, Vision and Values"}
          </h2>
          <p className="text-lg text-muted-foreground font-dm-sans max-w-2xl mx-auto">
            {language === "tr"
              ? "Başarımızın temelinde yatan değerler ve ilkelerimiz"
              : "The values and principles that form the foundation of our success"}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="p-8 bg-gradient-to-br from-background to-accent/5 rounded-2xl border border-border/50 hover:shadow-lg transition-all duration-300 group"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-16 h-16 mb-6 rounded-2xl flex items-center justify-center"
                style={{
                  // Lacivert-mavi tonlarında degrade arka plan (ikonların çevresini vurgular)
                  background: "linear-gradient(135deg, #042A53 0%, #0A4C7F 50%, #2B7BBF 100%)"
                }}
              >
                {/* İkon rengini beyaz yaptım; degrade arka plan lacivert-mavi tonlarında */}
                <value.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground mb-4 font-inter">{value.title}</h3>
              <p className="text-muted-foreground font-dm-sans leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OurServices() {
  const { language } = useLanguage()

  const services = [
    {
      icon: MessageSquare,
      title: language === "tr" ? "Bireysel Danışmanlık" : "Individual Consultancy",
      description:
        language === "tr"
          ? "Danışmanlık süresinde adayın ihtiyaç ve beklentileri doğrultusunda bireysel bir değerlendirme gerçekleştirilir. Adayın gelişime açık alanları belirlenerek, bu alanlara yönelik hedef odaklı bir çalışma planı oluşturulur."
          : "During the consultancy period, an individual evaluation is carried out in line with the candidate's needs and expectations. A goal-oriented work plan is created for these areas by identifying the candidate's areas open to development.",
    },
    {
      icon: Users2,
      title: language === "tr" ? "CRM Bireysel ve Grup Mülakatı" : "CRM Individual and Group Interview",
      description:
        language === "tr"
          ? "Gerçek mülakat ortamı deneyimi sunan simülasyonlar. Alanında uzman kaptan pilotlar ve profesyonel psikologlar eşliğinde kapsamlı değerlendirme süreci."
          : "Simulations that provide real interview environment experience. Comprehensive evaluation process accompanied by expert captain pilots and professional psychologists.",
    },
    {
      icon: BookOpen,
      title: language === "tr" ? "Mülakat Teknikleri Eğitimi" : "Interview Techniques Training",
      description:
        language === "tr"
          ? "Mülakat süreçlerine yönelik özel hazırlık çalışmaları ve teknik eğitimler. Adayların hem teknik hem de davranışsal yeterliliklerini geliştirmeye odaklanır."
          : "Special preparation studies and technical training for interview processes. Focuses on developing both technical and behavioral competencies of candidates.",
    },
    {
      icon: Plane,
      title: language === "tr" ? "Kurul Mülakatlarına Hazırlık" : "Board Interview Preparation",
      description:
        language === "tr"
          ? "Kurul mülakat süreçlerine yönelik özel hazırlık çalışmaları. Hem Türkçe hem İngilizce dillerinde mülakat simülasyonları ve detaylı geri bildirimler."
          : "Special preparation studies for board interview processes. Interview simulations and detailed feedback in both Turkish and English languages.",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-inter">
            {language === "tr" ? "Hizmetlerimiz" : "Our Services"}
          </h2>
          <p className="text-lg text-muted-foreground font-dm-sans max-w-2xl mx-auto">
            {language === "tr"
              ? "Pilot adaylarına yönelik kapsamlı eğitim ve danışmanlık hizmetlerimiz"
              : "Our comprehensive training and consultancy services for pilot candidates"}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="p-8 bg-gradient-to-br from-background to-primary/5 rounded-2xl border border-border/50 hover:shadow-lg transition-all duration-300 group"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-16 h-16 mb-6 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center"
              >
                <service.icon className="w-8 h-8 text-primary-foreground" />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground mb-4 font-inter">{service.title}</h3>
              <p className="text-muted-foreground font-dm-sans leading-relaxed">{service.description}</p>
            </motion.div>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-inter">
            {language === "tr" ? "Mezun Yorumları" : "Graduate Testimonials"}
          </h2>
          <p className="text-lg text-muted-foreground font-dm-sans max-w-2xl mx-auto">
            {language === "tr"
              ? "Mezunlarımızın başarı hikayeleri ve deneyimleri"
              : "Success stories and experiences of our graduates"}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
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
            </motion.div>
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
      <AboutCompany />
      <OurValues />
      {/* <OurServices />
      <StudentTestimonials /> */}
      <Footer />
    </div>
  )
}