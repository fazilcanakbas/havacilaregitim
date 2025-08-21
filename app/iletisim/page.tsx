import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { ContactMap } from "@/components/contact-map"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      <ContactHero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
      <ContactMap />
      <Footer />
    </div>
  )
}
