"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
// Kendi tasarım input & textarea (turuncu / açık mavi YOK)
import { useLanguage } from '@/lib/language-context';
// API bağlantısı kaldırıldı – local type
interface ApplicationPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message?: string;
  serviceSlug?: string;
}
import { Loader2, Send, X, CheckCircle2 } from 'lucide-react';

interface ApplicationModalProps {
  triggerClassName?: string;
  serviceSlug?: string;
  label?: string; // opsiyonel farklı tetikleyici metni
}

export function ApplicationModal({ triggerClassName, serviceSlug, label }: ApplicationModalProps) {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState<ApplicationPayload>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    serviceSlug,
  });

  const t = (tr: string, en: string) => (language === 'tr' ? tr : en);

  function handleChange<K extends keyof ApplicationPayload>(key: K, value: ApplicationPayload[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
      // API kaldırıldı: başarı simülasyonu
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
        setTimeout(() => {
          setSuccess(false);
          closeModal();
        }, 1800);
      }, 1000);
  }

  const closeModal = useCallback(() => setOpen(false), []);

  // ESC ile kapatma & body scroll kilidi
  useEffect(() => {
  setMounted(true);
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal();
    }
    if (open) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, closeModal]);

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) closeModal();
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={triggerClassName || 'w-full h-[52px] rounded-xl px-4 font-medium flex items-center justify-center transition-transform duration-150'}
        style={{ backgroundColor: '#0b2a4a', color: '#fff' }}
      >
        {label || t('Başvuru Yap', 'Apply Now')}
      </Button>
      {mounted && open && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-8 sm:py-12"
          onMouseDown={handleOverlayClick}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
          {/* Modal Card */}
          <div
            className="relative w-full max-w-xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-white/10 dark:border-neutral-700 p-6 sm:p-8 animate-scale-in"
            role="dialog"
            aria-modal="true"
            aria-label={t('Hizmet Başvurusu', 'Service Application')}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/70 dark:bg-neutral-800/70 hover:bg-white dark:hover:bg-neutral-700 border border-black/5 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 transition"
              aria-label={t('Kapat', 'Close')}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mb-6 space-y-2">
              <h3 className="text-2xl font-inter font-semibold text-neutral-900 dark:text-neutral-50">
                {t('Hizmet Başvurusu', 'Service Application')}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-dm-sans">
                {t('Formu doldurarak bu hizmete başvuru oluşturabilirsiniz.', 'Fill out the form to apply for this service.')}
              </p>
            </div>
            {success ? (
              <div className="py-10 text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle2 className="w-14 h-14 text-[#0b2a4a] drop-shadow-sm" />
                </div>
                <p className="font-inter font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                  {t('Başvurunuz alındı!', 'Your application has been received!')}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm font-dm-sans max-w-sm mx-auto">
                  {t('En kısa sürede sizinle iletişime geçeceğiz.', "We'll contact you shortly.")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">{t('Ad', 'First Name')} *</label>
                    <input
                      required
                      value={form.firstName}
                      onChange={e => handleChange('firstName', e.target.value)}
                      placeholder={t('Adınız', 'Your first name')}
                      className="w-full h-12 rounded-xl px-4 text-sm bg-white/80 dark:bg-neutral-900/60 border border-[#0b2a4a] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0b2a4a]/50 focus:border-[#0b2a4a] transition placeholder:text-neutral-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">{t('Soyad', 'Last Name')} *</label>
                    <input
                      required
                      value={form.lastName}
                      onChange={e => handleChange('lastName', e.target.value)}
                      placeholder={t('Soyadınız', 'Your last name')}
                      className="w-full h-12 rounded-xl px-4 text-sm bg-white/80 dark:bg-neutral-900/60 border border-[#0b2a4a] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0b2a4a]/50 focus:border-[#0b2a4a] transition placeholder:text-neutral-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => handleChange('email', e.target.value)}
                      placeholder="you@example.com"
                      className="w-full h-12 rounded-xl px-4 text-sm bg-white/80 dark:bg-neutral-900/60 border border-[#0b2a4a] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0b2a4a]/50 focus:border-[#0b2a4a] transition placeholder:text-neutral-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">{t('Telefon', 'Phone')}</label>
                    <input
                      value={form.phone}
                      onChange={e => handleChange('phone', e.target.value)}
                      placeholder={t('+90 5XX XXX XX XX', '+1 555 000 0000')}
                      className="w-full h-12 rounded-xl px-4 text-sm bg-white/80 dark:bg-neutral-900/60 border border-[#0b2a4a] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0b2a4a]/50 focus:border-[#0b2a4a] transition placeholder:text-neutral-500"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">{t('Mesaj', 'Message')}</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={e => handleChange('message', e.target.value)}
                    placeholder={t('Eklemek istediğiniz notlar...', 'Additional notes...')}
                    className="w-full rounded-xl bg-white/80 dark:bg-neutral-900/60 border border-[#0b2a4a] focus:outline-none focus:ring-1 focus:ring-[#0b2a4a]/60 focus:border-[#0b2a4a] resize-none text-sm px-4 py-3 transition placeholder:text-neutral-500"
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-2">
                  <Button
                    type="button"
                    onClick={closeModal}
                    disabled={loading}
                    className="rounded-xl px-6 h-12 font-medium bg-white/80 dark:bg-neutral-900/60 border border-[#0b2a4a] text-[#0b2a4a] hover:bg-[#0b2a4a] hover:text-white transition"
                  >
                    {t('İptal', 'Cancel')}
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl px-6 h-12 font-medium group"
                    style={{ backgroundColor: '#0b2a4a', color: '#fff' }}
                  >
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    <Send className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-[2px]" /> {t('Gönder', 'Submit')}
                  </Button>
                </div>
              </form>
            )}
          </div>
          {/* Animations */}
          <style jsx>{`
            .animate-fade-in { animation: fade-in 180ms ease-out; }
            .animate-scale-in { animation: scale-in 220ms cubic-bezier(.16,.84,.44,1); }
            @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
            @keyframes scale-in { from { opacity:0; transform: scale(.92) translateY(4px); } to { opacity:1; transform: scale(1) translateY(0); } }
          `}</style>
        </div>, document.body)
      }
    </>
  );
}
