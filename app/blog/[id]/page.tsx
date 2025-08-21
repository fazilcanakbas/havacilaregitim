import { BlogPost } from "@/components/blog-post"
import { RelatedPosts } from "@/components/related-posts"
import { Footer } from "@/components/footer"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="min-h-screen pt-20">
      <BlogPost postId={params.id} />
      <RelatedPosts currentPostId={params.id} />
      <Footer />
    </div>
  )
}
