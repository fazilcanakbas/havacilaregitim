'use client'

import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import {
  Users,
  User,
  Award,
  Target,
  BookOpen,
  ArrowLeft,
  Check,
  Clock,
  Phone,
  Mail,
} from 'lucide-react'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { getService, ServiceItem } from '@/lib/api/serviceService'

export default function ServiceDetailPage() {
  const { language } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const slugParam = params?.slug
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam

  const [svc, setSvc] = useState<ServiceItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const ICON_MAP: Record<string, any> = {
    'mulakat-teknikleri-egitimi': BookOpen,
    'bireysel-danismanlik': User,
    'crm-bireysel-mulakat': Target,
    'crm-grup-mulakati': Users,
    'kurul-mulakat': Award,
  }

  useEffect(() => {
    let mounted = true

    if (!slug) {
      setIsLoading(false)
      setError('Geçersiz servis slug')
      return () => {
        mounted = false
      }
    }

    ;(async () => {
      setIsLoading(true)
      setError(null)
      setDebugInfo(null)
      try {
        // DEBUG: log the slug
        console.debug('[ServiceDetail] fetching slug=', slug)
        const data = await getService(slug)
        if (!mounted) return
        if (!data) {
          // route to 404 page (client-side)
          router.replace('/404')
          return
        }
        setSvc(data)
      } catch (err: any) {
        console.error('Failed to load service', err)
        // store debug info (status/body/url) to show in UI / console
        setDebugInfo({
          message: err?.message,
          status: err?.status,
          body: err?.body,
          url: err?.url,
        })
        if (err?.status === 404 || err?.statusCode === 404) {
          router.replace('/404')
          return
        }
        setError('Hizmet yüklenirken hata oluştu. Konsolu kontrol edin veya destek ekibine başvurun.')
      } finally {
        if (mounted) setIsLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [slug, router])

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 lg:pt-32 flex items-center justify-center">
        <div className="text-center text-muted-foreground">Yükleniyor...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 lg:pt-32 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Hata</h2>
          <p className="mb-6 text-muted-foreground">{error}</p>
          {debugInfo && (
            <pre className="text-xs text-left bg-black/5 p-3 rounded-md overflow-auto mb-4">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          )}
          <Link href="/hizmetlerimiz" className="text-primary">
            {language === 'tr' ? 'Hizmetlere dön' : 'Back to services'}
          </Link>
        </div>
      </div>
    )
  }

  if (!svc) {
    // mostly unreachable (we redirect on 404) - safeguard
    return null
  }

  const title =
    language === 'tr' ? svc.title ?? svc.titleEn ?? '' : svc.titleEn ?? svc.title ?? ''
  const shortDescription =
    language === 'tr'
      ? svc.description ?? svc.descriptionEn ?? ''
      : svc.descriptionEn ?? svc.description ?? ''
  const fullDescription =
    language === 'tr' ? svc.details ?? svc.detailsEn ?? '' : svc.detailsEn ?? svc.details ?? ''
  const benefits = (language === 'tr' ? svc.benefits : svc.benefitsEn) ?? svc.benefits ?? []
  const process = (language === 'tr' ? svc.processSteps : svc.processStepsEn) ?? svc.processSteps ?? []
  const duration = language === 'tr' ? svc.duration ?? svc.durationEn ?? '' : svc.durationEn ?? svc.duration ?? ''
  const format = language === 'tr' ? svc.format ?? svc.formatEn ?? '' : svc.formatEn ?? svc.format ?? ''

  const Icon = ICON_MAP[svc.slug ?? slug] || BookOpen

  return (
    <div className="min-h-screen pt-20 lg:pt-32">
      <section className="relative py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/hizmetlerimiz"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'tr' ? 'Hizmetlere Dön' : 'Back to Services'}
            </Link>

            <div className="flex items-center mb-6">
              {/* Icon wrapper: lacivert degrade */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mr-6"
                style={{
                  background: 'linear-gradient(135deg, #07243e 0%, #0b2a4a 100%)',
                }}
              >
                <Icon className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2 font-inter">{title}</h1>
                <p className="text-xl text-muted-foreground font-dm-sans">{shortDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-foreground mb-6 font-inter">
                    {language === 'tr' ? 'Hizmet Detayları' : 'Service Details'}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed font-dm-sans mb-8">{fullDescription}</p>

                  <h3 className="text-xl font-bold text-foreground mb-4 font-inter">
                    {language === 'tr' ? 'Faydalar' : 'Benefits'}
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground font-dm-sans">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-bold text-foreground mb-4 font-inter">
                    {language === 'tr' ? 'Süreç' : 'Process'}
                  </h3>
                  <div className="space-y-4">
                    {process.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0"
                          style={{ backgroundColor: '#0b2a4a', color: '#ffffff' }}
                        >
                          {index + 1}
                        </div>
                        <span className="text-muted-foreground font-dm-sans pt-1">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-background to-accent/5 rounded-2xl border border-border/50 p-8 sticky top-8">
                  <h3 className="text-xl font-bold text-foreground mb-6 font-inter">
                    {language === 'tr' ? 'Hizmet Bilgileri' : 'Service Information'}
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-[#0b2a4a] mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">{language === 'tr' ? 'Süre' : 'Duration'}</p>
                        <p className="font-medium text-foreground">{duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-[#0b2a4a] mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">{language === 'tr' ? 'Format' : 'Format'}</p>
                        <p className="font-medium text-foreground">{format}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-foreground">{language === 'tr' ? 'İletişim' : 'Contact'}</h4>

                    <div className="flex items-center text-muted-foreground">
                      <Phone className="w-4 h-4 text-[#0b2a4a] mr-3" />
                      <span className="text-sm">+90 XXX XXX XX XX</span>
                    </div>

                    <div className="flex items-center text-muted-foreground">
                      <Mail className="w-4 h-4 text-[#0b2a4a] mr-3" />
                      <span className="text-sm">info@havacilaregitim.com</span>
                    </div>

                    <button
                      className="w-full rounded-xl py-3 px-4 font-medium transition-transform duration-150"
                      style={{ backgroundColor: '#0b2a4a', color: '#ffffff' }}
                    >
                      {language === 'tr' ? 'Randevu Al' : 'Book Appointment'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}