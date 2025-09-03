"use client"

import { ArrowLeft, Clock, DollarSign, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

interface ServiceDetailPageProps {
  service: {
    slug: string
    icon: any
    title: { tr: string; en: string }
    description: { tr: string; en: string }
    features: { tr: string[]; en: string[] }
    detailedContent: {
      tr: {
        overview: string
        benefits: string[]
        duration: string
        price: string
      }
      en: {
        overview: string
        benefits: string[]
        duration: string
        price: string
      }
    }
  }
}

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const { language } = useLanguage()
  const IconComponent = service.icon

  const content = service.detailedContent[language]
  const title = service.title[language]
  const description = service.description[language]
  const features = service.features[language]

  return (
    <div className="min-h-screen bg-background">
      <section
        className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px] overflow-hidden"
        style={{
          backgroundImage: "url('/egitimbanner.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(23,37,84,0.36) 0%, rgba(23,37,84,0.08) 100%)",
          }}
        ></div>

        {/* Content above image */}
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/hizmetlerimiz">
              <Button variant="ghost" className="mb-6 text-white hover:bg-white/20 border-white/30">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "tr" ? "Hizmetlere Dön" : "Back to Services"}
              </Button>
            </Link>

            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-inter drop-shadow-lg text-white">{title}</h1>
              <p className="text-xl lg:text-2xl font-dm-sans drop-shadow-md text-white/90 max-w-3xl mx-auto">
                {description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="border-border/50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-inter text-foreground">
                  {language === "tr" ? "Genel Bakış" : "Overview"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg font-dm-sans">{content.overview}</p>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="border-border/50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-inter text-foreground">
                  {language === "tr" ? "Faydalar" : "Benefits"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-lg bg-primary/5 border border-primary/10"
                    >
                      <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground font-dm-sans">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="border-border/50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-inter text-foreground">
                  {language === "tr" ? "Özellikler" : "Features"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm py-2 px-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Service Info */}
            <Card className="border-border/50 shadow-lg bg-gradient-to-br from-background to-accent/5">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-inter">
                  {language === "tr" ? "Hizmet Bilgileri" : "Service Information"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold font-inter">{language === "tr" ? "Süre" : "Duration"}</p>
                    <p className="text-muted-foreground font-dm-sans">{content.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold font-inter">{language === "tr" ? "Fiyat" : "Price"}</p>
                    <p className="text-muted-foreground font-dm-sans">{content.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="border-border/50 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="pt-6">
                <Button className="w-full mb-4 h-12 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                  {language === "tr" ? "Hemen Başvur" : "Apply Now"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 text-lg font-semibold bg-transparent border-2 hover:bg-primary/5"
                >
                  {language === "tr" ? "Bilgi Al" : "Get Information"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
