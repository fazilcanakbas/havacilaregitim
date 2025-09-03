'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Upload,
  Save,
  Plus,
  X,
  User,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import Toast from '../../../components/ui/toast';
import Image from 'next/image';
import {
  getAnnouncement,
  adminUpdateAnnouncement,
  type Announcement,
} from '@/lib/api/announcementService';

// TR -> EN mapping
const categoryMap: Record<string, string> = {
  Eğitim: 'Education',
  Bakım: 'Maintenance',
  Personel: 'Staff',
  Genel: 'General',
};

interface AnnouncementFormData {
  date: any;
  title: string;
  description: string;
  content: string;
  category: string;
  isActive: boolean;
  featured: boolean;
  images: (File | string)[];
  author: string;

  titleEn?: string;
  descriptionEn?: string;
  contentEn?: string;
  categoryEn?: string;
}

export default function EditAnnouncementPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeLangTab, setActiveLangTab] = useState<'tr' | 'en'>('tr');
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<AnnouncementFormData>({
    title: '',
    description: '',
    content: '',
    category: '',
    isActive: true,
    featured: false,
    images: [],
    author: 'Havacılar Eğitim',
    titleEn: '',
    descriptionEn: '',
    contentEn: '',
    categoryEn: '',
    date: null,
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [customCategory, setCustomCategory] = useState('');
  const [customCategoryEn, setCustomCategoryEn] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState({
    message: '',
    type: 'success' as 'success' | 'error' | 'warning' | 'info',
    isVisible: false,
  });

  // ✅ Veri çek
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        setLoading(true);
        const data: Announcement = await getAnnouncement(id);
        setFormData({
          title: data.title,
          description: data.description,
          content: data.content,
          category: data.category,
          isActive: data.isActive,
          featured: data.featured,
          images: data.images || [],
          author: data.author,
          titleEn: data.titleEn || '',
          descriptionEn: data.descriptionEn || '',
          contentEn: data.contentEn || '',
          categoryEn: data.categoryEn || '',
          date: data.date || null,
        });
        setImagePreviews(
          (data.images || []).map(
            (img) => `${process.env.NEXT_PUBLIC_API_URL}${img}`
          )
        );
      } catch (err) {
        console.error('[EditAnnouncement] fetch error', err);
        showToast('Duyuru yüklenemedi', 'error');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchAnnouncement();
  }, [id]);

  // Validation
  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) errors.title = 'Başlık gereklidir';
    if (!formData.description.trim()) errors.description = 'Açıklama gereklidir';
    if (!formData.content.trim()) errors.content = 'Detay gereklidir';
    if (!formData.category) errors.category = 'Kategori seçmelisiniz';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Input change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Toggle change
  const handleToggleChange = (name: 'isActive' | 'featured', checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Görsel yükleme
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(
        0,
        3 - formData.images.length
      );
      const updatedFiles = [...formData.images, ...newFiles].slice(0, 3);
      setFormData((prev) => ({ ...prev, images: updatedFiles }));

      const previews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews].slice(0, 3));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Özel kategori ekleme
  const handleAddCategory = () => {
    if (customCategory.trim()) {
      setFormData((prev) => ({ ...prev, category: customCategory.trim() }));
      setCustomCategory('');
    }
  };

  const handleAddCategoryEn = () => {
    if (customCategoryEn.trim()) {
      setFormData((prev) => ({ ...prev, categoryEn: customCategoryEn.trim() }));
      setCustomCategoryEn('');
    }
  };

  // Submit
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) {
      showToast('Lütfen gerekli alanları doldurun', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('content', formData.content);
      data.append('author', formData.author);
      data.append('category', formData.category);
      data.append('isActive', String(formData.isActive));
      data.append('featured', String(formData.featured));
const existing = formData.images.filter((img) => typeof img === "string");
data.append("existingImages", JSON.stringify(existing));
      if (formData.titleEn) data.append('titleEn', formData.titleEn);
      if (formData.descriptionEn) data.append('descriptionEn', formData.descriptionEn);
      if (formData.contentEn) data.append('contentEn', formData.contentEn);
      if (formData.categoryEn) data.append('categoryEn', formData.categoryEn);

      // Görseller (sadece yeni yüklenen File olanları gönder)
      formData.images.forEach((file) => {
        if (file instanceof File) data.append('images', file);
      });

      await adminUpdateAnnouncement(id, data);

      showToast('Duyuru başarıyla güncellendi!', 'success');
      setTimeout(() => router.push('/admin/announcements'), 1000);
    } catch (error: any) {
      console.error('[EditAnnouncement] error', error);
      showToast(
        error?.message || 'Duyuru güncellenirken hata oluştu',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info'
  ) => {
    setToast({ message, type, isVisible: true });
  };

  if (loading) {
    return <div className="p-6 text-center">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/announcements"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Duyuruyu Düzenle</h1>
              <p className="text-gray-600 mt-1">Seçili duyuruyu güncelleyin</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push('/admin/announcements')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              İptal
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Kaydet
                </>
              )}
            </button>
          </div>
        </div>

        {/* TR / EN Tabs */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setActiveLangTab('tr')}
            className={`px-3 py-1 rounded-md ${
              activeLangTab === 'tr'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Türkçe
          </button>
          <button
            type="button"
            onClick={() => setActiveLangTab('en')}
            className={`px-3 py-1 rounded-md ${
              activeLangTab === 'en'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            English
          </button>
        </div>

        {/* Form */}
        <form
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          onSubmit={handleSubmit}
        >
          {/* Left side */}
          <div className="lg:col-span-2 space-y-6">
            {activeLangTab === 'tr' ? (
              <>
                {/* Başlık */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <label className="block text-sm font-medium mb-2">
                    Duyuru Başlığı <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>

                {/* Açıklama */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <label className="block text-sm font-medium mb-2">
                    Duyuru Açıklaması <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>

                {/* Detay */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <label className="block text-sm font-medium mb-2">
                    Duyuru Detayı <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={10}
                    className="w-full px-4 py-3 border rounded-lg font-mono"
                  />
                </div>

                {/* Kategori */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <label className="block text-sm font-medium mb-2">
                    Kategori
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg mb-3"
                  >
                    <option value="">Kategori seçin</option>
                    {Object.keys(categoryMap).map((cat, i) => (
                      <option key={i} value={cat}>
                        {cat}
                      </option>
                    ))}
                    {!Object.keys(categoryMap).includes(formData.category) &&
                      formData.category && (
                        <option value={formData.category}>
                          {formData.category} (Özel)
                        </option>
                      )}
                  </select>

                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Özel kategori ekle"
                      className="flex-1 px-3 py-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* EN fields */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <label className="block text-sm font-medium mb-2">
                    Title (English)
                  </label>
                  <input
                    type="text"
                    name="titleEn"
                    value={formData.titleEn}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <label className="block text-sm font-medium mb-2">
                    Description (English)
                  </label>
                  <textarea
                    name="descriptionEn"
                    value={formData.descriptionEn}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <label className="block text-sm font-medium mb-2">
                    Content (English)
                  </label>
                  <textarea
                    name="contentEn"
                    value={formData.contentEn}
                    onChange={handleInputChange}
                    rows={10}
                    className="w-full px-4 py-3 border rounded-lg font-mono"
                  />
                </div>
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <label className="block text-sm font-medium mb-2">
                    Category (English)
                  </label>
                  <select
                    name="categoryEn"
                    value={formData.categoryEn}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg mb-3"
                  >
                    <option value="">Select category</option>
                    {Object.values(categoryMap).map((catEn, i) => (
                      <option key={i} value={catEn}>
                        {catEn}
                      </option>
                    ))}
                    {!Object.values(categoryMap).includes(formData.categoryEn || '') &&
                      formData.categoryEn && (
                        <option value={formData.categoryEn}>
                          {formData.categoryEn} (Custom)
                        </option>
                      )}
                  </select>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={customCategoryEn}
                      onChange={(e) => setCustomCategoryEn(e.target.value)}
                      placeholder="Add custom category"
                      className="flex-1 px-3 py-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleAddCategoryEn}
                      className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right side */}
          <div className="space-y-6">
            {/* Durum */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Yayın Durumu</h2>
              <div className="flex items-center justify-between mb-4">
                <span>Yayında mı?</span>
                <label className="relative inline-flex cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={formData.isActive}
                    onChange={(e) =>
                      handleToggleChange('isActive', e.target.checked)
                    }
                  />
                  <div
                    className={`w-11 h-6 rounded-full ${
                      formData.isActive ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`h-5 w-5 bg-white rounded-full transform transition-transform ${
                        formData.isActive ? 'translate-x-6' : 'translate-x-1'
                      } mt-0.5`}
                    />
                  </div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>Öne Çıkar</span>
                <label className="relative inline-flex cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={formData.featured}
                    onChange={(e) =>
                      handleToggleChange('featured', e.target.checked)
                    }
                  />
                  <div
                    className={`w-11 h-6 rounded-full ${
                      formData.featured ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`h-5 w-5 bg-white rounded-full transform transition-transform ${
                        formData.featured ? 'translate-x-6' : 'translate-x-1'
                      } mt-0.5`}
                    />
                  </div>
                </label>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mt-4">
                <Calendar className="h-4 w-4" />
                <span>
                  Yayınlanma tarihi:{' '}
                  {formData.date
                    ? new Date(formData.date).toLocaleDateString('tr-TR')
                    : '—'}
                </span>
              </div>
            </div>

            {/* Görseller */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Görseller (max 3)</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  id="image-upload"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={formData.images.length >= 3}
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-900">
                    Görsel yüklemek için tıklayın
                  </span>
                  <span className="text-xs text-gray-500">
                    PNG, JPG, WEBP (max 3)
                  </span>
                </label>
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                {imagePreviews.map((src, i) => (
                  <div key={i} className="relative w-24 h-24">
                    <Image
                      src={src}
                      alt="preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Yazar */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Yazar</h2>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}
