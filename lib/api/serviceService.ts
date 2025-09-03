import { apiFetch } from './client';

export type ServiceItem = {
  _id?: string;
  title: string;
  titleEn?: string;
  details: string;
  detailsEn?: string;
  description: string;
  descriptionEn?: string;
  features?: string[];
  featuresEn?: string[];
  benefits?: string[];
  benefitsEn?: string[];
  processSteps?: string[];
  processStepsEn?: string[];
  duration?: string;
  durationEn?: string;
    format?: string;
    formatEn?: string;
  price?: string;
  category?: string;
  status?: 'active' | 'draft';
  enrolledStudents?: number;
  rating?: number;
  images?: string[];
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
};

export async function listServices(params?: { search?: string; category?: string; status?: string; limit?: number; skip?: number }) {
  const qs = new URLSearchParams();
  if (params) {
    if (params.search) qs.set('search', params.search);
    if (params.category) qs.set('category', params.category);
    if (params.status) qs.set('status', params.status);
    if (typeof params.limit !== 'undefined') qs.set('limit', String(params.limit));
    if (typeof params.skip !== 'undefined') qs.set('skip', String(params.skip));
  }
  const path = `/api/services${qs.toString() ? `?${qs.toString()}` : ''}`;
  return apiFetch(path, { method: 'GET' }) as Promise<ServiceItem[]>;
}

export async function getService(param: string) {
  return apiFetch(`/api/services/${encodeURIComponent(param)}`, { method: 'GET' }) as Promise<ServiceItem>;
}

// Admin endpoints
export async function adminListServices() {
  return apiFetch('/api/services', { method: 'GET' }) as Promise<ServiceItem[]>;
}

export async function adminCreateService(payload: Record<string, any> | FormData): Promise<ServiceItem> {
  // payload may be a plain object or FormData.
  // Cast to any to satisfy RequestInit.body typing while leaving runtime behavior intact.
  return apiFetch('/api/services', { method: 'POST', body: payload as any }) as Promise<ServiceItem>;
}

export async function adminUpdateService(id: string, payload: Record<string, any> | FormData): Promise<ServiceItem> {
  return apiFetch(`/api/services/${encodeURIComponent(id)}`, { method: 'PUT', body: payload as any }) as Promise<ServiceItem>;
}

export async function adminDeleteService(id: string) {
  return apiFetch(`/api/services/${encodeURIComponent(id)}`, { method: 'DELETE' });
}