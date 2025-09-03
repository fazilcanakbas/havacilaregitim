'use client';

import { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  ToggleRight,
  BookOpen,
  Star
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import DeleteConfirmationModal from '../components/admin/DeleteConfirmationModal';
import StatusChangeModal from '../components/admin/StatusChangeModal';
import Toast from '../components/ui/toast';

import {
  adminListAnnouncements,
  adminDeleteAnnouncement,
  adminUpdateAnnouncement,
  type Announcement
} from '@/lib/api/announcementService';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Modal states
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(false);

  // Toast state
  const [toast, setToast] = useState({
    message: '',
    type: 'success' as 'success' | 'error' | 'warning' | 'info',
    isVisible: false
  });

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  // 🔹 API’den listeyi çek
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const data = await adminListAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        console.error(err);
        showToast('Duyurular yüklenemedi', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  // Filtreleme
  const filteredAnnouncements = announcements.filter((a) => {
    const matchesSearch =
      a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || a.category === filterCategory;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && a.isActive) ||
      (filterStatus === 'draft' && !a.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Silme
  const handleDelete = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedAnnouncement?._id) return;
    try {
      await adminDeleteAnnouncement(selectedAnnouncement._id);
      setAnnouncements((prev) => prev.filter((a) => a._id !== selectedAnnouncement._id));
      showToast('Duyuru başarıyla silindi.', 'success');
    } catch (err) {
      console.error(err);
      showToast('Duyuru silinirken hata oluştu.', 'error');
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  // Aktif / Pasif
  const handleToggleStatus = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setNewStatus(!announcement.isActive);
    setIsStatusModalOpen(true);
  };

  const confirmStatusChange = async () => {
    if (!selectedAnnouncement?._id) return;
    try {
      const updatePayload: Partial<Announcement> = { isActive: newStatus };

      // ❌ Eğer pasif yapılırsa → featured da false olmalı
      if (!newStatus) updatePayload.featured = false;

      await adminUpdateAnnouncement(selectedAnnouncement._id, updatePayload);

      setAnnouncements((prev) =>
        prev.map((a) =>
          a._id === selectedAnnouncement._id
            ? { ...a, isActive: newStatus, featured: newStatus ? a.featured : false }
            : a
        )
      );

      showToast(
        `Duyuru başarıyla ${newStatus ? 'aktif' : 'pasif'} duruma getirildi.`,
        'success'
      );
    } catch (err) {
      console.error(err);
      showToast('Durum değiştirilemedi.', 'error');
    } finally {
      setIsStatusModalOpen(false);
    }
  };

  // Öne çıkarma
  const handleToggleFeatured = async (announcement: Announcement) => {
    if (!announcement._id) return;

    // ❌ pasif bir duyuru öne çıkarılamaz
    if (!announcement.isActive) {
      showToast('Pasif bir duyuru öne çıkarılamaz.', 'warning');
      return;
    }

    try {
      await adminUpdateAnnouncement(announcement._id, {
        featured: !announcement.featured
      });
      setAnnouncements((prev) =>
        prev.map((a) =>
          a._id === announcement._id ? { ...a, featured: !a.featured } : a
        )
      );
      showToast(
        `Duyuru ${!announcement.featured ? 'öne çıkarıldı' : 'öne çıkarılmadan kaldırıldı'}.`,
        'success'
      );
    } catch (err) {
      console.error(err);
      showToast('Öne çıkarma güncellenemedi.', 'error');
    }
  };

  // Loading state
  if (loading) {
    return <div className="p-6 text-center">Duyurular yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Duyuru Yönetimi</h1>
          <p className="text-gray-600 mt-1">Duyurularınızı yönetin</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/admin/announcements/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Yeni Duyuru
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Duyuru ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">Tüm Kategoriler</option>
                <option value="Eğitim">Eğitim</option>
                <option value="Bakım">Bakım</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <ToggleRight className="h-4 w-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="active">Aktif</option>
                <option value="draft">Taslak</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3">Duyuru</th>
              <th className="px-6 py-3">Kategori</th>
              <th className="px-6 py-3">Yazar</th>
              <th className="px-6 py-3">Tarih</th>
              <th className="px-6 py-3">Durum</th>
              <th className="px-6 py-3">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((a) => (
                <tr key={a._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    {a.images && a.images.length > 0 ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${a.images[0]}`}
                        alt={a.title}
                        width={64}
                        height={48}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-16 h-12 rounded-md bg-gray-100 flex items-center justify-center text-gray-400">
                        <BookOpen className="h-5 w-5" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">{a.title}</p>
                      <p className="text-xs text-gray-500">{a.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{a.category}</td>
                  <td className="px-6 py-4 text-sm">{a.author}</td>
                  <td className="px-6 py-4 text-sm">
                    {a.date ? new Date(a.date).toLocaleDateString('tr-TR') : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        a.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {a.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedAnnouncement(a);
                          setIsDetailModalOpen(true);
                        }}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <Link href={`/admin/announcements/edit/${a._id}`}>
                        <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg">
                          <Edit className="h-4 w-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleToggleStatus(a)}
                        className={`p-2 ${
                          a.isActive
                            ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100'
                            : 'text-green-600 hover:text-green-800 hover:bg-green-100'
                        } rounded-lg`}
                      >
                        <ToggleRight className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(a)}
                        className={`p-2 ${
                          a.featured
                            ? 'text-yellow-500 hover:text-yellow-600'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <Star className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(a)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium">Duyuru bulunamadı</p>
                  <p className="text-sm">Filtreleri değiştirin veya yeni duyuru ekleyin.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Duyuruyu Sil"
        message={`"${selectedAnnouncement?.title}" başlıklı duyuruyu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
      />

      {/* Status Modal */}
      <StatusChangeModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onConfirm={confirmStatusChange}
        title={`Duyuruyu ${newStatus ? 'Aktif' : 'Pasif'} Yap`}
        message={`"${selectedAnnouncement?.title}" başlıklı duyuruyu ${newStatus ? 'aktif' : 'pasif'} duruma getirmek istediğinize emin misiniz?`}
        status={newStatus}
      />

      {/* Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {selectedAnnouncement?.title}
            </DialogTitle>
            <DialogDescription className="text-lg text-gray-600">
              {selectedAnnouncement?.titleEn}
            </DialogDescription>
          </DialogHeader>

          {selectedAnnouncement && (
            <div className="space-y-6 mt-6">
              <Badge
                variant={selectedAnnouncement.isActive ? 'default' : 'secondary'}
                className={selectedAnnouncement.isActive ? 'bg-green-100 text-green-800' : ''}
              >
                {selectedAnnouncement.isActive ? 'Aktif' : 'Pasif'}
              </Badge>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Açıklama</h3>
                <p className="text-gray-700">{selectedAnnouncement.description}</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Detay</h3>
                <p className="text-gray-700">{selectedAnnouncement.content}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Kategori</h3>
                  <p className="text-gray-700">{selectedAnnouncement.category}</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Yazar</h3>
                  <p className="text-gray-700">{selectedAnnouncement.author}</p>
                </div>
              </div>

              {selectedAnnouncement.images && selectedAnnouncement.images.length > 0 && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Duyuru Görselleri</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedAnnouncement.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={`${process.env.NEXT_PUBLIC_API_URL}${img}`}
                        alt={`${selectedAnnouncement.title} - Görsel ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg shadow-sm hover:shadow-md transition"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-100 rounded-lg p-4">
                <span className="text-gray-500">Tarih:</span>
                <p className="font-medium text-gray-900">
                  {selectedAnnouncement.date
                    ? new Date(selectedAnnouncement.date).toLocaleDateString('tr-TR')
                    : 'Belirtilmemiş'}
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Link
                  href={`/duyurular/${selectedAnnouncement.slug}`}
                  className="flex-1"
                >
                  <Button variant="default" className="w-full">
                    Gör
                  </Button>
                </Link>
                <Link
                  href={`/admin/announcements/edit/${selectedAnnouncement._id}`}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full bg-transparent">
                    <Edit className="w-4 h-4 mr-2" />
                    Düzenle
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    handleDelete(selectedAnnouncement);
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Sil
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
