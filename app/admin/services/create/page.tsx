'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '../../components/ui/toast';
import { adminCreateService } from '../../../../lib/api/serviceService';

export default function AdminCreateServicePage() {
  const router = useRouter();

  // TR fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); 
  const [details, setDetails] = useState('');
  const [features, setFeatures] = useState(['', '', '', '']);
  const [benefits, setBenefits] = useState<string[]>(['']);
  const [processSteps, setProcessSteps] = useState<string[]>(['']);
  const [format, setFormat] = useState(''); 


  const [titleEn, setTitleEn] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [detailsEn, setDetailsEn] = useState(''); 
  const [featuresEn, setFeaturesEn] = useState(['', '', '', '']);
  const [benefitsEn, setBenefitsEn] = useState<string[]>(['']);
  const [processStepsEn, setProcessStepsEn] = useState<string[]>(['']);
  const [formatEn, setFormatEn] = useState('');


  // durations per language
  const [duration, setDuration] = useState('');
  const [durationEn, setDurationEn] = useState('');

  const [status, setStatus] = useState<'active' | 'draft'>('draft');

  // images: up to 3
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const MAX_IMAGES = 3;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // UI tab: 'tr' or 'en'
  const [tab, setTab] = useState<'tr' | 'en'>('tr');

  // Use shared Toast component state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false,
  });
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  function showToast(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success', autoHideMs = 2000) {
    // clear previous timer
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToast({ message, type, isVisible: true });
    toastTimerRef.current = window.setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
      toastTimerRef.current = null;
    }, autoHideMs);
  }

  function closeToast() {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToast(prev => ({ ...prev, isVisible: false }));
  }

  function updateFeature(arrSetter: (v: any) => void, arr: string[], idx: number, value: string) {
    const copy = [...arr];
    copy[idx] = value;
    arrSetter(copy);
  }

  function setArrayItem(arrSetter: (v: any) => void, arr: string[], idx: number, value: string) {
    const copy = [...arr];
    copy[idx] = value;
    arrSetter(copy);
  }

  function addArrayItem(arrSetter: (v: any) => void, arr: string[]) {
    arrSetter([...arr, '']);
  }

  function removeArrayItem(arrSetter: (v: any) => void, arr: string[], idx: number) {
    if (arr.length === 1) {
      // keep at least one input
      arrSetter(['']);
      return;
    }
    const copy = [...arr];
    copy.splice(idx, 1);
    arrSetter(copy);
  }

  // Append selected images (allow selecting files one-by-one or multiple),
  // limit to MAX_IMAGES, and reset input value to allow re-selecting same file later.
  function onSelectImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) {
      e.currentTarget.value = '';
      return;
    }

    // avoid duplicates (by name+size) and limit to remaining slots
    const existingKeys = new Set(imageFiles.map(f => `${f.name}_${f.size}`));
    const filtered = files.filter(f => !existingKeys.has(`${f.name}_${f.size}`));
    const remaining = MAX_IMAGES - imageFiles.length;
    const toAdd = filtered.slice(0, remaining);

    if (toAdd.length === 0) {
      e.currentTarget.value = '';
      return;
    }

    const newFiles = [...imageFiles, ...toAdd];
    setImageFiles(newFiles);

    // read previews for added files
    toAdd.forEach((f) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviews(prev => [...prev, String(reader.result)]);
      };
      reader.readAsDataURL(f);
    });

    // reset input so same file can be chosen again later if needed
    e.currentTarget.value = '';
  }

  function removeImageAt(idx: number) {
    const copyFiles = [...imageFiles];
    const copyPreviews = [...previews];
    copyFiles.splice(idx, 1);
    copyPreviews.splice(idx, 1);
    setImageFiles(copyFiles);
    setPreviews(copyPreviews);
  }

  // Validate: only require TR title + short description. EN is optional now.
  function validate() {
    if (!title.trim() || !description.trim()) {
      setError('Türkçe başlık ve kısa açıklama zorunludur.');
      setTab('tr');
      return false;
    }
    return true;
  }

  // small helper to wait next paint + a tiny extra timeout
  function waitForPaint(ms = 40) {
    return new Promise<void>((resolve) => {
      if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(() => {
          setTimeout(() => resolve(), ms);
        });
      } else {
        setTimeout(() => resolve(), ms);
      }
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // prevent double submissions
    if (isSubmitting) return;

    setError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const fd = new FormData();

      // Turkish
      fd.append('title', title);
      fd.append('description', description); // short
      fd.append('details', details || '');
      fd.append('features', JSON.stringify(features.filter(Boolean)));
      fd.append('benefits', JSON.stringify(benefits.filter(Boolean)));
      fd.append('processSteps', JSON.stringify(processSteps.filter(Boolean)));
      fd.append('duration', duration || '');
        fd.append('format', format || '');

      // English (optional)
      fd.append('titleEn', titleEn || '');
      fd.append('descriptionEn', descriptionEn || '');
      fd.append('detailsEn', detailsEn || '');
      fd.append('featuresEn', JSON.stringify(featuresEn.filter(Boolean)));
      fd.append('benefitsEn', JSON.stringify(benefitsEn.filter(Boolean)));
      fd.append('processStepsEn', JSON.stringify(processStepsEn.filter(Boolean)));
      fd.append('durationEn', durationEn || '');
      fd.append('formatEn', formatEn || '');

      // status
      fd.append('status', status);

      const slug = title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/gi, '');
      fd.append('slug', slug);

      
      imageFiles.forEach((f) => {
        fd.append('images', f);
      });

      await adminCreateService(fd);

      // show success toast
      showToast('Hizmet başarıyla eklendi', 'success', 1500);

      // allow React to paint the toast before navigating
      await waitForPaint(50);

      
      setTimeout(() => {
        router.push('/admin/services');
      }, 600);
    } catch (err: any) {
      console.error('create failed', err);
      const message = err?.message || 'Hizmet oluşturulurken hata oluştu';
      setError(message);
      showToast(message, 'error', 2500);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-5">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />

      <div className="max-w-[980px] mx-auto mt-10 p-6 rounded-xl bg-white shadow-[0_8px_30px_rgba(12,18,40,0.06)] font-sans">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-[22px] font-extrabold text-slate-900">Yeni Hizmet Ekle</h1>
            <p className="mt-1 text-slate-600">Türkçe alanlar zorunludur. İngilizce alanlar isteğe bağlıdır.</p>

            <div className="flex gap-2 mt-3 mb-4">
              <button
                type="button"
                onClick={() => setTab('tr')}
                className={`px-3 py-2 rounded-lg border ${tab === 'tr' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-[#e6eef8]'}`}
                disabled={isSubmitting}
              >
                Türkçe
              </button>
              <button
                type="button"
                onClick={() => setTab('en')}
                className={`px-3 py-2 rounded-lg border ${tab === 'en' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-[#e6eef8]'}`}
                disabled={isSubmitting}
              >
                English
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <button
              type="button"
              className="px-3 py-2 rounded-xl border bg-transparent text-blue-600 border-[#e6eef8]"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Geri
            </button>

            <button
              type="button"
              className={`px-4 py-2 rounded-xl text-white font-bold ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600'}`}
              onClick={() => {
                if (isSubmitting) return;
                const form = document.getElementById('service-form') as HTMLFormElement;
                form?.requestSubmit();
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </div>

        <form id="service-form" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-[1fr_360px] gap-5 items-start">
            {/* Left - main */}
            <div>
              {tab === 'tr' ? (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-slate-900">Başlık (TR) <span style={{ color: '#ef4444' }}>*</span></label>
                    <input className="w-full px-3 py-2 rounded-lg border border-[#e6eef8] text-sm outline-none" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Hizmet başlığı (TR)" disabled={isSubmitting} />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-slate-900">Kısa Açıklama (TR) <span style={{ color: '#ef4444' }}>*</span></label>
                    <textarea className="w-full p-3 rounded-lg border border-[#e6eef8] min-h-[110px] resize-y text-sm" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Kısa ve öz açıklama (TR)" disabled={isSubmitting} />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-slate-900">Detaylar</label>
                    <textarea className="w-full p-3 rounded-lg border border-[#e6eef8] min-h-[160px] resize-y text-sm" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Hizmetin detaylı açıklaması (TR)" disabled={isSubmitting} />
                  </div>

                  <div className="mb-4"
                  style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '16px' }}
                  >
                    <label className="block text-sm font-semibold mb-2 text-slate-900">Süre:</label>
                    <input className=" px-3 py-2 rounded-lg border border-[#e6eef8] text-sm" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Örn: 6 ay" disabled={isSubmitting} />
                    <label className="block text-sm font-semibold mb-2 text-slate-900">Format:</label>
                    <input className=" px-3 py-2 rounded-lg border border-[#e6eef8] text-sm" value={format} onChange={(e) => setFormat(e.target.value)} placeholder="Örn: 4-6 Kişilik Grup" disabled={isSubmitting} />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-slate-900">Özellikler (4 madde) - TR</label>
                    <div className="grid grid-cols-2 gap-2">
                      {features.map((f, i) => (
                        <input key={i} className="px-2 py-2 rounded-md border border-[#e6eef8] text-sm" placeholder={`Özellik ${i + 1}`} value={f} onChange={(e) => updateFeature(setFeatures, features, i, e.target.value)} disabled={isSubmitting} />
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-slate-900">Faydalar (TR)</label>
                    <div className="flex flex-col gap-2">
                      {benefits.map((b, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <input className="flex-1 px-3 py-2 rounded-lg border border-[#e6eef8] text-sm" placeholder={`Fayda ${i + 1}`} value={b} onChange={(e) => setArrayItem(setBenefits, benefits, i, e.target.value)} disabled={isSubmitting} />
                          <button type="button" className="px-2 py-1 rounded-md border bg-white" onClick={() => removeArrayItem(setBenefits, benefits, i)} disabled={isSubmitting}>—</button>
                        </div>
                      ))}
                      <button type="button" className="w-24 px-2 py-1 rounded-md border bg-white" onClick={() => addArrayItem(setBenefits, benefits)} disabled={isSubmitting}>+ Ekle</button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-slate-900">Süreç (TR)</label>
                    <div className="flex flex-col gap-2">
                      {processSteps.map((p, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <input className="flex-1 px-3 py-2 rounded-lg border border-[#e6eef8] text-sm" placeholder={`Adım ${i + 1}`} value={p} onChange={(e) => setArrayItem(setProcessSteps, processSteps, i, e.target.value)} disabled={isSubmitting} />
                          <button type="button" className="px-2 py-1 rounded-md border bg-white" onClick={() => removeArrayItem(setProcessSteps, processSteps, i)} disabled={isSubmitting}>—</button>
                        </div>
                      ))}
                      <button type="button" className="w-24 px-2 py-1 rounded-md border bg-white" onClick={() => addArrayItem(setProcessSteps, processSteps)} disabled={isSubmitting}>+ Ekle</button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-slate-900">Title (EN)</label>
                    <input className="w-full px-3 py-2 rounded-lg border border-[#e6eef8] text-sm" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder="Service title (EN) — optional" disabled={isSubmitting} />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-slate-900">Short Description (EN)</label>
                    <textarea className="w-full p-3 rounded-lg border border-[#e6eef8] min-h-[110px] resize-y text-sm" value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} placeholder="Short description (EN) — optional" disabled={isSubmitting} />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-slate-900">Details (EN)</label>
                    <textarea className="w-full p-3 rounded-lg border border-[#e6eef8] min-h-[160px] resize-y text-sm" value={detailsEn} onChange={(e) => setDetailsEn(e.target.value)} placeholder="Detailed description (EN) — optional" disabled={isSubmitting} />
                  </div>

                  <div className="mb-4"
                  style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '16px' }}
                  >
                    <label className="block text-sm font-semibold mb-2 text-slate-900">Duration (EN)</label>
                    <input className=" px-3 py-2 rounded-lg border border-[#e6eef8] text-sm" value={durationEn} onChange={(e) => setDurationEn(e.target.value)} placeholder="E.g. 6 months" disabled={isSubmitting} />
                      <label className="block text-sm font-semibold mb-2 text-slate-900">Format (EN)</label>
                    <input className=" px-3 py-2 rounded-lg border border-[#e6eef8] text-sm" value={formatEn} onChange={(e) => setFormatEn(e.target.value)} placeholder="Group of 4-6 People" disabled={isSubmitting} />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-slate-900">Key Features (4 items) - EN</label>
                    <div className="grid grid-cols-2 gap-2">
                      {featuresEn.map((f, i) => (
                        <input key={i} className="px-2 py-2 rounded-md border border-[#e6eef8] text-sm" placeholder={`Feature ${i + 1}`} value={f} onChange={(e) => updateFeature(setFeaturesEn, featuresEn, i, e.target.value)} disabled={isSubmitting} />
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-slate-900">Benefits (EN)</label>
                    <div className="flex flex-col gap-2">
                      {benefitsEn.map((b, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <input className="flex-1 px-3 py-2 rounded-lg border border-[#e6eef8] text-sm" placeholder={`Benefit ${i + 1}`} value={b} onChange={(e) => setArrayItem(setBenefitsEn, benefitsEn, i, e.target.value)} disabled={isSubmitting} />
                          <button type="button" className="px-2 py-1 rounded-md border bg-white" onClick={() => removeArrayItem(setBenefitsEn, benefitsEn, i)} disabled={isSubmitting}>—</button>
                        </div>
                      ))}
                      <button type="button" className="w-24 px-2 py-1 rounded-md border bg-white" onClick={() => addArrayItem(setBenefitsEn, benefitsEn)} disabled={isSubmitting}>+ Add</button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-slate-900">Process (EN)</label>
                    <div className="flex flex-col gap-2">
                      {processStepsEn.map((p, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <input className="flex-1 px-3 py-2 rounded-lg border border-[#e6eef8] text-sm" placeholder={`Step ${i + 1}`} value={p} onChange={(e) => setArrayItem(setProcessStepsEn, processStepsEn, i, e.target.value)} disabled={isSubmitting} />
                          <button type="button" className="px-2 py-1 rounded-md border bg-white" onClick={() => removeArrayItem(setProcessStepsEn, processStepsEn, i)} disabled={isSubmitting}>—</button>
                        </div>
                      ))}
                      <button type="button" className="w-24 px-2 py-1 rounded-md border bg-white" onClick={() => addArrayItem(setProcessStepsEn, processStepsEn)} disabled={isSubmitting}>+ Add</button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Right - sidebar */}
            <div style={{ padding: 16, borderRadius: 10, border: '1px solid #eef2ff', background: '#fbfdff' }}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#0f172a' }}>Görseller (maks {MAX_IMAGES})</label>

                <input
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onSelectImages}
                  disabled={isSubmitting}
                />

                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid #e6eef8', background: '#fff', color: '#0b69ff' }}
                    disabled={imageFiles.length >= MAX_IMAGES || isSubmitting}
                    aria-disabled={imageFiles.length >= MAX_IMAGES || isSubmitting}
                  >
                    Görsel Ekle
                  </button>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>{imageFiles.length} / {MAX_IMAGES} seçildi</div>
                </div>

                <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {previews.length > 0 ? (
                    <>
                      {previews.map((p, i) => (
                        <div key={i} style={{ position: 'relative', width: '100%', height: 120, borderRadius: 8, overflow: 'hidden' }}>
                          <img src={p} alt={`preview-${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button type="button" onClick={() => removeImageAt(i)} style={{ position: 'absolute', top: 8, right: 8, padding: 6, borderRadius: 6, background: 'rgba(255,255,255,0.9)', border: '1px solid #e6eef8', cursor: 'pointer' }} disabled={isSubmitting}>Sil</button>
                        </div>
                      ))}
                      {Array.from({ length: MAX_IMAGES - previews.length }).map((_, idx) => (
                        <div key={`ph-${idx}`} style={{ width: '100%', height: 120, borderRadius: 8, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', border: '1px dashed #e6eef8' }}>
                          <div>Boş</div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <div style={{ width: '100%', height: 120, borderRadius: 8, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0b69ff' }}>
                        Görsel seçilmedi
                      </div>
                      <div style={{ width: '100%', height: 120, borderRadius: 8, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', border: '1px dashed #e6eef8' }}>
                        <div>Boş</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#0f172a' }}>Durum</label>
                <select style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #e6eef8' }} value={status} onChange={(e) => setStatus(e.target.value as 'active' | 'draft')} disabled={isSubmitting}>
                  <option value="draft">Taslak</option>
                  <option value="active">Aktif</option>
                </select>
              </div>

              <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <button type="button" style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e6eef8', background: '#fff' }} onClick={() => {
                  // reset all fields
                  setTitle(''); setTitleEn(''); setDescription(''); setDescriptionEn('');
                  setDetails(''); setDetailsEn('');
                  setFeatures(['', '', '', '']); setFeaturesEn(['', '', '', '']);
                  setBenefits(['']); setBenefitsEn(['']); setProcessSteps(['']); setProcessStepsEn(['']);
                  setDuration(''); setDurationEn('');
                  setStatus('draft'); setImageFiles([]); setPreviews([]); setError(null);
                }} disabled={isSubmitting}>Temizle</button>
                <button type="submit" style={{ flex: 1, padding: '10px 16px', borderRadius: 10, background: '#0b69ff', color: '#fff', fontWeight: 700 }} disabled={isSubmitting}>
                  {isSubmitting ? 'Kaydediliyor...' : 'Hizmeti Oluştur'}
                </button>
              </div>

              {error && <div style={{ marginTop: 12, color: '#ef4444', fontWeight: 600 }}>{error}</div>}
              <div style={{ marginTop: 12, color: '#6b7280' }} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}