import { BlogHero } from "@/components/blog-hero"
import { BlogGrid } from "@/components/blog-grid"
import { BlogCategories } from "@/components/blog-categories"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20">
      <BlogHero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <BlogCategories />
        <BlogGrid />
      </div>
      <Footer />
    </div>
  )
}
