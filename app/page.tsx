import { HeroSection } from "@/components/hero-section"
import { AtaturkQuote } from "@/components/ataturk-quote"
import { ServicesSection } from "@/components/services-section"
import { AnnouncementsSection } from "@/components/announcements-section"
import { SocialMediaSection } from "@/components/social-media-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AtaturkQuote />
      <ServicesSection />
      <AnnouncementsSection />
      <SocialMediaSection />
      <Footer />
    </div>
  )
}
