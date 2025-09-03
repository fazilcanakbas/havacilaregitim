'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { ArrowLeft, Upload, Save, Plus, X, User, Calendar, Tag as TagIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Toast from '../../../components/ui/toast';
import Image from 'next/image';

import { getBlog, adminUpdateBlog } from '../../../../../lib/api/blogService';

// Blog post tipi
interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content?: string;
  // english fields (may be absent)
  titleEn?: string;
  excerptEn?: string;
  contentEn?: string;
  author: string;
  image: string;
  tags: string[];
  tagsEn?: string[];
  category: string;
  categoryEn?: string;
  isActive?: boolean;
  slug: string;
  date?: string;
}

interface BlogFormData {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  // english optional
  titleEn?: string;
  excerptEn?: string;
  contentEn?: string;
  author: string;
  category: string;
  categoryEn?: string;
  tags: string[];
  tagsEn?: string[];
  isActive: boolean;
  image: File | null;
  originalImage?: string;
  slug: string;
  date?: string; // (aşağıdaki hata için bunu da ekle)
}
const predefinedCategories = [
  'Tasarım İpuçları',
  'Emlak Rehberi',
  'Başlangıç Rehberi',
  'Piyasa Analizi',
  'Yasal Süreçler',
  'Trend Analizi',
  'Finansal Rehber',
  'Yaşam Tarzı',
  'Mimari',
  'Gayrimenkul Teknolojileri',
];

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeLangTab, setActiveLangTab] = useState<'tr' | 'en'>('tr');

  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    excerpt: '',
    content: '',
    titleEn: '',
    excerptEn: '',
    contentEn: '',
    author: '',
    category: '',
    categoryEn: '',
    tags: [],
    tagsEn: [],
    isActive: true,
    image: null,
    originalImage: '',
    slug: '',
  });
  const [initialTitle, setInitialTitle] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [tagInputEn, setTagInputEn] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [customCategoryEn, setCustomCategoryEn] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState({
    message: '',
    type: 'success' as 'success' | 'error' | 'warning' | 'info',
    isVisible: false,
  });

  // Blog verisini servis üzerinden yükle
  useEffect(() => {
    if (!id) {
      showToast('Geçersiz blog id', 'error');
      router.push('/admin/blog');
      return;
    }

    const loadBlogPost = async () => {
      setIsLoading(true);
      try {
        const post: BlogPost = await getBlog(id);
        if (!post) throw new Error('Blog yazısı bulunamadı');

        setFormData({
          title: post.title || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          titleEn: post.titleEn || '',
          excerptEn: post.excerptEn || '',
          contentEn: post.contentEn || '',
          author: post.author || '',
          category: post.category || '',
          categoryEn: post.categoryEn || '',
          tags: post.tags || [],
          tagsEn: post.tagsEn || [],
          isActive: post.isActive !== false,
          image: null,
          originalImage: post.image || '',
          slug: post.slug || '',
          date: post.date || undefined,
        });
        setInitialTitle(post.title || '');
        setImagePreview(getImageUrl(post.image));
      } catch (error) {
        showToast('Blog yazısı yüklenirken bir hata oluştu', 'error');
        setTimeout(() => router.push('/admin/blog'), 1500);
      } finally {
        setIsLoading(false);
      }
    };
    loadBlogPost();
    // eslint-disable-next-line
  }, [id]);

  // Görsel yolunu tam URL'ye çevir
  function getImageUrl(path?: string) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    // Ensure path begins with slash
    return `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
  }

  // Hata kontrolü
  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) errors.title = 'Başlık gereklidir';
    if (!formData.excerpt.trim()) errors.excerpt = 'Özet gereklidir';
    if (!formData.content.trim()) errors.content = 'İçerik gereklidir';
    if (!formData.category) errors.category = 'Kategori seçmelisiniz';
    if (!(imagePreview || formData.image || formData.originalImage)) errors.image = 'Blog görseli gereklidir';
    if (formData.tags.length === 0) errors.tags = 'En az bir etiket eklemelisiniz';
    // english alanlar opsiyonel -> doğrulama yok
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form input değişikliği
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleToggleChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Görsel yükleme
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      if (formErrors.image) setFormErrors(prev => ({ ...prev, image: '' }));
    }
  };

  // Tag (TR) ekleme
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
      if (formErrors.tags) setFormErrors(prev => ({ ...prev, tags: '' }));
    }
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  // Tag (EN) ekleme
  const handleAddTagEn = () => {
    if (tagInputEn.trim() && !(formData.tagsEn || []).includes(tagInputEn.trim())) {
      setFormData(prev => ({ ...prev, tagsEn: [...(prev.tagsEn || []), tagInputEn.trim()] }));
      setTagInputEn('');
    }
  };

  const handleTagInputEnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTagEn();
    }
  };

  const handleRemoveTagEn = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tagsEn: (prev.tagsEn || []).filter(tag => tag !== tagToRemove) }));
  };

  const handleAddCategory = () => {
    if (customCategory.trim() && !predefinedCategories.includes(customCategory.trim())) {
      setFormData(prev => ({ ...prev, category: customCategory.trim() }));
      setCustomCategory('');
      if (formErrors.category) setFormErrors(prev => ({ ...prev, category: '' }));
    }
  };

  const handleAddCategoryEn = () => {
    if (customCategoryEn.trim()) {
      setFormData(prev => ({ ...prev, categoryEn: customCategoryEn.trim() }));
      setCustomCategoryEn('');
    }
  };

  // Slug oluştur
  const createSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) {
      showToast('Lütfen gerekli alanları doldurun', 'error');
      return;
    }
    if (!id) {
      showToast('Geçersiz blog id', 'error');
      return;
    }
    setIsSubmitting(true);

    try {
      console.log('[EditBlogPage] Submitting update', { id, formData });

      if (formData.image) {
        const body = new FormData();
        body.append('title', formData.title);
        body.append('excerpt', formData.excerpt);
        body.append('content', formData.content);
        body.append('author', formData.author);
        body.append('category', formData.category);
        if (formData.categoryEn && formData.categoryEn.trim()) body.append('categoryEn', formData.categoryEn.trim());
        body.append('isActive', String(formData.isActive));
        body.append('slug', formData.slug || createSlug(formData.title));
        body.append('tags', JSON.stringify(formData.tags || []));
        if (formData.tagsEn && formData.tagsEn.length > 0) body.append('tagsEn', JSON.stringify(formData.tagsEn));
        body.append('date', formData.date || '');
        body.append('image', formData.image); // file
        // english content fields (optional)
        if (formData.titleEn && formData.titleEn.trim()) body.append('titleEn', formData.titleEn.trim());
        if (formData.excerptEn && formData.excerptEn.trim()) body.append('excerptEn', formData.excerptEn.trim());
        if (formData.contentEn && formData.contentEn.trim()) body.append('contentEn', formData.contentEn.trim());

        console.log('[EditBlogPage] Sending FormData with image', body);
        await adminUpdateBlog(id, body);
      } else {
        // JSON payload: include english fields only if present
        const payload: any = {
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          author: formData.author,
          category: formData.category,
          isActive: formData.isActive,
          slug: formData.slug || createSlug(formData.title),
          tags: formData.tags,
          image: formData.originalImage || '',
          date: formData.date || undefined,
        };
        if (formData.titleEn && formData.titleEn.trim()) payload.titleEn = formData.titleEn.trim();
        if (formData.excerptEn && formData.excerptEn.trim()) payload.excerptEn = formData.excerptEn.trim();
        if (formData.contentEn && formData.contentEn.trim()) payload.contentEn = formData.contentEn.trim();
        if (formData.categoryEn && formData.categoryEn.trim()) payload.categoryEn = formData.categoryEn.trim();
        if (formData.tagsEn && formData.tagsEn.length > 0) payload.tagsEn = formData.tagsEn;

        console.log('[EditBlogPage] Sending JSON payload', payload);
        await adminUpdateBlog(id, payload);
      }

      console.log('[EditBlogPage] adminUpdateBlog completed successfully');
      showToast('Blog yazısı başarıyla güncellendi!', 'success');
      setTimeout(() => router.push('/admin/blog'), 1000);
    } catch (error: any) {
      console.error('[EditBlogPage] update error', error);
      showToast(error?.message || 'Blog yazısı güncellenirken bir hata oluştu', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        <span className="ml-2 text-lg font-medium text-gray-700">Blog yazısı yükleniyor...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/blog"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Yazısı Düzenle</h1>
              <p className="text-gray-600 mt-1">#{formData.id} numaralı blog yazısını düzenleyin</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push('/admin/blog')}
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
                  Değişiklikleri Kaydet
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dil Sekmeleri */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setActiveLangTab('tr')}
            className={`px-3 py-1 rounded-md ${activeLangTab === 'tr' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Türkçe
          </button>
          <button
            type="button"
            onClick={() => setActiveLangTab('en')}
            className={`px-3 py-1 rounded-md ${activeLangTab === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            English (optional)
          </button>
        </div>

        <form className="grid grid-cols-1 lg:grid-cols-3 gap-8" onSubmit={handleSubmit}>
          {/* Ana İçerik - Sol Sütun */}
          <div className="lg:col-span-2 space-y-6">
            {activeLangTab === 'tr' ? (
              <>
                {/* Blog Başlığı (TR) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Başlığı <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Etkileyici bir başlık yazın"
                    className={`w-full px-4 py-3 border ${formErrors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
                  )}

                  <p className="mt-2 text-sm text-gray-500">
                    Mevcut Slug: <span className="font-mono">{formData.slug}</span>
                  </p>
                  {formData.title !== initialTitle && (
                    <p className="mt-1 text-sm text-blue-500">
                      Yeni Slug: <span className="font-mono">{createSlug(formData.title)}</span>
                    </p>
                  )}
                </div>

                {/* Blog Özeti (TR) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Özeti <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Blog yazısının kısa bir özetini yazın (150-200 karakter)"
                    rows={3}
                    className={`w-full px-4 py-3 border ${formErrors.excerpt ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {formErrors.excerpt && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.excerpt}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    {formData.excerpt.length} / 200 karakter
                  </p>
                </div>

                {/* Blog İçeriği (TR) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog İçeriği <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Blog yazısının içeriğini buraya yazın. Markdown formatı desteklenmektedir."
                    rows={15}
                    className={`w-full px-4 py-3 border ${formErrors.content ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono`}
                  />
                  {formErrors.content && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.content}</p>
                  )}
                  <div className="mt-2 text-sm text-gray-500 flex justify-between">
                    <span>{formData.content.length} karakter</span>
                    <span>Markdown desteklenmektedir</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* EN Sekmesi: TitleEn, ExcerptEn, ContentEn (opsiyonel) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title (English) <span className="text-gray-400 text-xs ml-1">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="titleEn"
                    value={formData.titleEn || ''}
                    onChange={handleInputChange}
                    placeholder="Enter english title (optional)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt (English) <span className="text-gray-400 text-xs ml-1">(optional)</span>
                  </label>
                  <textarea
                    name="excerptEn"
                    value={formData.excerptEn || ''}
                    onChange={handleInputChange}
                    placeholder="Short excerpt in english (optional)"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content (English) <span className="text-gray-400 text-xs ml-1">(optional)</span>
                  </label>
                  <textarea
                    name="contentEn"
                    value={formData.contentEn || ''}
                    onChange={handleInputChange}
                    placeholder="Write english content here. Markdown supported. (optional)"
                    rows={15}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                  />
                  <div className="mt-2 text-sm text-gray-500 flex justify-between">
                    <span>{(formData.contentEn || '').length} karakter</span>
                    <span>Markdown desteklenmektedir</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sağ Sütun - Yan Panel */}
          <div className="space-y-6">
            {/* Yayın Durumu */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Yayın Durumu</h2>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">Yayında mı?</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={formData.isActive}
                    onChange={(e) => handleToggleChange('isActive', e.target.checked)}
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${formData.isActive ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <div className={`h-5 w-5 rounded-full bg-white transform transition-transform ${formData.isActive ? 'translate-x-6' : 'translate-x-1'} mt-0.5`}></div>
                  </div>
                </label>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Yayınlanma tarihi: {formData.date}</span>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-500">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
              </div>
            </div>

            {/* Blog Görseli */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Blog Görseli</h2>

              {imagePreview ? (
                <div className="relative mb-4">
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Blog görseli önizleme"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, image: null, originalImage: '' }));
                    }}
                    className="absolute top-2 right-2 bg-gray-800/70 text-white p-1 rounded-full hover:bg-red-500/70 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-900 mb-1">Blog görseli yükle</span>
                    <span className="text-xs text-gray-500">PNG, JPG, WEBP (Önerilen: 1200x630px)</span>
                  </label>
                </div>
              )}

              {formErrors.image && (
                <p className="mt-1 text-sm text-red-500">{formErrors.image}</p>
              )}
            </div>

            {/* Yazar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Yazar</h2>

              <div className="flex items-center space-x-3 mb-4">
                <div className="relative w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Yazar adı"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Kategori (TR) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Kategori</h2>

              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${formErrors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4`}
              >
                <option value="">Kategori seçin</option>
                {predefinedCategories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
                {!predefinedCategories.includes(formData.category) && formData.category && (
                  <option value={formData.category}>{formData.category} (Özel)</option>
                )}
              </select>

              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Özel kategori ekle"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {formErrors.category && (
                <p className="mt-1 text-sm text-red-500">{formErrors.category}</p>
              )}
            </div>

            {/* Kategori (EN) - opsiyonel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Category (English) <span className="text-gray-400 text-xs">(optional)</span></h2>
              <input
                type="text"
                name="categoryEn"
                value={formData.categoryEn || ''}
                onChange={handleInputChange}
                placeholder="Enter english category (optional) or use the custom field below"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={customCategoryEn}
                  onChange={(e) => setCustomCategoryEn(e.target.value)}
                  placeholder="Özel English kategori ekle"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddCategoryEn}
                  className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Etiketler (TR) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Etiketler</h2>

              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="Etiket ekle ve Enter'a bas"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    <TagIcon className="h-3 w-3 mr-1" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-700 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>

              {formErrors.tags && (
                <p className="mt-2 text-sm text-red-500">{formErrors.tags}</p>
              )}
            </div>

            {/* Etiketler (EN) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags (English) <span className="text-gray-400 text-xs">(optional)</span></h2>

              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  value={tagInputEn}
                  onChange={(e) => setTagInputEn(e.target.value)}
                  onKeyDown={handleTagInputEnKeyDown}
                  placeholder="Add english tag and press Enter"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddTagEn}
                  className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {(formData.tagsEn || []).map((tag, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                  >
                    <TagIcon className="h-3 w-3 mr-1" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTagEn(tag)}
                      className="ml-2 text-green-700 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Toast bildirimleri */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}