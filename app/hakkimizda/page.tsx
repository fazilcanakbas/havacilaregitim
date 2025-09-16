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
              ? "Havacılık tutkusu ile başlayan yolculuğumuz, yarının pilotlarına yol gösteriyor."
              : "Our journey that started with aviation passion is guiding the pilots of tomorrow."}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

function AboutCompany() {
  const { language } = useLanguage()

  return (
  <section className="relative pt-18 pb-24 mt-20 overflow-hidden" style={{ background: 'linear-gradient(135deg,#061a2c 0%,#0b2a4a 55%,#123d6b 100%)' }}>
      {/* Pilot wings watermark image */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          src="/bröve.png"
          alt="Pilot wings watermark"
          className="select-none object-contain w-full md:w-[900px] max-w-none opacity-[0.15] md:opacity-[0.18] mix-blend-screen saturate-125 contrast-110"
          loading="lazy"
          draggable={false}
          style={{ filter: 'brightness(1.18)' }}
        />
      </div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-5xl font-bold font-inter tracking-tight mb-6 bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg,#f0f4f8 0%,#ffffff 40%,#dbe5ef 100%)' }}>
              {language === 'tr' ? 'Biz Kimiz?' : 'Aviation Education Inc.'}
            </h2>
            <div className="mx-auto h-1 w-24 rounded-full" style={{ background: 'linear-gradient(90deg,#ffffff 0%,#6fa6d6 100%)', opacity:0.5 }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            viewport={{ once: true, amount: 0.4 }}
            className="relative prose prose-lg max-w-none font-dm-sans leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.78)' }}
          >
            {language === 'tr' ? (
              <div className="space-y-6">
                <p className="text-white/80 text-xl">Havacılar Eğitim A.Ş., havacılık sektöründe kariyer hedefleyen pilot adaylarına profesyonel danışmanlık ve uçuş simülasyonu deneyimi sunan bir kuruluştur. Kadet pilot alımları ve havayolu işe alım süreçlerine hazırlanan adaylara, kaptan pilotlar ve alanında uzman psikologlar eşliğinde bireyselleştirilmiş danışmanlık hizmeti sağlıyoruz.</p>
                <p className="text-white/70 text-xl">Danışmanlık süreci sonunda her adayın güçlü ve gelişime açık yönlerini belirleyerek, havayolu şirketlerinin işe alım süreçlerindeki beklentilere uygun donanımları kazandırıyoruz.</p>
                <p className="text-white/70 text-xl">Disiplin ve profesyonelliği temel ilke edinen Havacılar Eğitim A.Ş., gökyüzüne sağlam adımlarla ilerlemek isteyen her adayın yanında yer almaktadır.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-white/80">Aviation Education Inc. is an organization that provides professional consultancy and training services for pilot candidates aiming for a career in the aviation sector. We offer a comprehensive and personalized training process to candidates preparing for cadet pilot recruitment processes, accompanied by expert captain pilots, psychologists and interview technique trainers.</p>
                <p className="text-white/70">Through our programs that simulate real interview environments one-to-one, candidates develop both their technical and behavioral competencies. Our training process focuses on highlighting each candidate's strengths and shaping professionals aligned with airline expectations.</p>
                <p className="text-white/70">As Aviation Education Inc., we base ourselves on the discipline and professionalism of aviation; we stand by every candidate who wants to progress to the skies with solid steps.</p>
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
          ? "Havacılık sektöründe kariyer hedefleyen pilot adaylarına danışmanlık desteği sunarak, onları yalnızca güçlü bireyler olarak değil, sektörün geleceğine yön verecek profesyoneller olma yolculuklarında rehberlik etmektir. Kaptan pilotlar, alanında uzman psikologlar ve mülakat teknikleri danışmanları ile geliştirdiğimiz bireyselleştirilmiş programlarımız sayesinde adaylarımızı, havayolu şirketlerinin beklentilerine uyum sağlamanın ötesinde, o beklentileri şekillendirebilecek bir noktaya taşıyoruz."
          : "We offer consulting support to aspiring pilots pursuing careers in the aviation industry, guiding them on their journey to develop not only into strong individuals but also into professionals who will shape the future of the industry. Through our personalized programs, developed with captain pilots, expert psychologists, and interview technique consultants, we move our candidates beyond simply conforming to airline expectations to a point where they can shape those expectations.",
    },
    {
      icon: Heart,
      title: language === "tr" ? "Vizyonumuz" : "Our Vision",
      description:
        language === "tr"
          ? "Havacılık kariyerine adım atmak isteyen pilot adaylarına danışmanlık hizmetinde kalite, güven ve profesyonelliğin öncüsü olarak; yalnızca adayların potansiyelini en üst seviyeye çıkarmalarına destek olmakla kalmıyor, aynı zamanda sektöre yön veren, gökyüzünde fark yaratan profesyoneller olarak konumlanmalarına rehberlik ediyoruz. Vizyonumuz, uluslararası alanda pilot adaylarına yönelik danışmanlıkta standart belirleyen, çizgisi takip edilen öncü bir kurum olmaktır."
          : "As a pioneer of quality, trust, and professionalism in service to aspiring pilots seeking to embark on their aviation careers, we not only support candidates in maximizing their potential but also guide them toward becoming professionals who shape the industry and make a difference in the skies. Our vision is not to be chosen; rather, to be a training institution that guides, setting the standard for international pilot candidate mentoring, and to be a leading institution.",
    },
    {
      icon: Award,
      title: language === "tr" ? "Değerlerimiz" : "Our Values",
      description:
        language === "tr"
          ? "Havacılık disiplini, kalite, sürekli gelişim ve kişi odaklı yaklaşım temel değerlerimizdir. Havacılığın disiplinini ve profesyonelliğini esas alarak, her adayın bireysel ihtiyaçlarına odaklanıyoruz."
          : "Aviation discipline, quality, continuous improvement, and a person-centered approach are our core values. Building on aviation discipline and professionalism, we focus on each candidate's individual needs.",
    },
    {
      icon: Users,
      title: language === "tr" ? "Uzman Kadromuz" : "Our Expert Team",
      description:
        language === "tr"
          ? "Kaptan pilotlar ve uzman havacılık psikologları ile rehberlik ediyoruz."
          : "We provide guidance with captain pilots and expert aviation psychologists.",
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
          {/* <p className="text-lg text-muted-foreground font-dm-sans max-w-2xl mx-auto">
            {language === "tr"
              ? "Başarımızın temelinde yatan değerler ve ilkelerimiz"
              : "The values and principles that form the foundation of our success"}
          </p> */}
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