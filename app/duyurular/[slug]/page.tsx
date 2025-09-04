'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Calendar, User } from 'lucide-react';
import { getAnnouncement, type Announcement } from '@/lib/api/announcementService';
import { Footer } from '@/components/footer';
import { useLanguage } from '@/lib/language-context'; 

export default function AnnouncementDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { language } = useLanguage(); 
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnnouncement(slug);
        setAnnouncement(data);
      } catch (err) {
        console.error('Duyuru alınamadı:', err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
  }, [slug]);

  if (loading) return <div className="p-6 text-center">Yükleniyor...</div>;
  if (!announcement) return <div className="p-6 text-center">Duyuru bulunamadı.</div>;

  const images = announcement.images || [];

  // ✅ Dil seçimine göre gösterilecek alanlar
  const title = language === 'tr' ? announcement.title : announcement.titleEn || announcement.title;
  const description =
    language === 'tr'
      ? announcement.description
      : announcement.descriptionEn || announcement.description;
  const content =
    language === 'tr' ? announcement.content : announcement.contentEn || announcement.content;
  const category =
    language === 'tr' ? announcement.category : announcement.categoryEn || announcement.category;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header boşluğu */}
      <div className="pt-20">
        {/* Hero / Slider */}
        <div className="relative w-full h-[80vh] bg-gray-200 overflow-hidden">
          {images.map((img, idx) => (
            <Image
              key={idx}
              src={`${process.env.NEXT_PUBLIC_API_URL}${img}`}
              alt={`${title} - Görsel ${idx + 1}`}
              fill
              priority={idx === 0}
              className={`object-cover object-center transition-opacity duration-500 absolute inset-0 ${
                idx === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          {/* Slider Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-10"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-10"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Overlay metin */}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-6">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="max-w-2xl text-lg">{description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 space-y-8">
        <div className="flex items-center gap-6 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{announcement.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {announcement.date
                ? new Date(announcement.date).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')
                : '—'}
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-500">{category}</div>

        <article className="prose max-w-none prose-lg">
          <p className="leading-relaxed text-gray-700 whitespace-pre-line">{content}</p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
