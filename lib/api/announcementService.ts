  import { apiFetch } from "./client";

  export interface Announcement {
    slug: any;
    _id?: string;
    title: string;
    description: string;
    content: string;
    titleEn?: string;
    descriptionEn?: string;
    contentEn?: string;
    category: string;
    categoryEn?: string;
    author: string;
    images?: string[];
    isActive: boolean;
    featured: boolean;
    date?: string;
  }

  /**
   * Duyuru listesi
   */
  export async function adminListAnnouncements(): Promise<Announcement[]> {
    return apiFetch(`/api/announcements`, { method: "GET" });
  }

  /**
   * Tek duyuru getir
   */
  export async function getAnnouncement(param: string): Promise<Announcement> {
    return apiFetch(`/api/announcements/${encodeURIComponent(param)}`, { method: "GET" });
  }

  /**
   * Yeni duyuru oluştur
   * payload FormData veya JSON olabilir
   */
  export async function adminCreateAnnouncement(payload: FormData | Record<string, any>) {
    const token = typeof window !== "undefined" ? (localStorage.getItem("token") || "") : "";

    if (payload instanceof FormData) {
      return apiFetch(`/api/announcements`, {
        method: "POST",
        body: payload,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    } else {
      return apiFetch(`/api/announcements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
    }
  }

  /**
   * Duyuru güncelle
   */
  export async function adminUpdateAnnouncement(id: string, payload: FormData | Record<string, any>) {
    const token = typeof window !== "undefined" ? (localStorage.getItem("token") || "") : "";

    let options: RequestInit;

    if (payload instanceof FormData) {
      options = {
        method: "PUT",
        body: payload,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      };
    } else {
      options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      };
    }

    return apiFetch(`/api/announcements/${encodeURIComponent(id)}`, options);
  }

  /**
   * Duyuru sil
   */
  export async function adminDeleteAnnouncement(id: string): Promise<void> {
    const token = typeof window !== "undefined" ? (localStorage.getItem("token") || "") : "";
    return apiFetch(`/api/announcements/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  }
