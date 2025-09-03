import { apiFetch } from "./client";

export type BlogPost = {
  _id?: string;
  id?: string | number;
  slug?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  isActive?: boolean;
  tags?: string[];
  image?: string;
  views?: number;
  date?: string;
  featured?: boolean;
  // english fields if any
  titleEn?: string;
  excerptEn?: string;
  contentEn?: string;
  // english category & tags
  categoryEn?: string;
  tagsEn?: string[];
};

export async function listBlogs(params?: {
  search?: string;
  category?: string;
  tag?: string;
  isActive?: boolean;
  limit?: number;
  skip?: number;
}) {
  const qs = new URLSearchParams();
  if (params) {
    if (params.search) qs.set("search", params.search);
    if (params.category) qs.set("category", params.category);
    if (params.tag) qs.set("tag", params.tag);
    if (typeof params.isActive !== "undefined") qs.set("isActive", String(params.isActive));
    if (typeof params.limit !== "undefined") qs.set("limit", String(params.limit));
    if (typeof params.skip !== "undefined") qs.set("skip", String(params.skip));
  }
  const path = `/api/blogs${qs.toString() ? `?${qs.toString()}` : ""}`;
  return apiFetch(path, { method: "GET" });
}

export async function getBlog(param: string) {
  return apiFetch(`/api/blogs/${encodeURIComponent(param)}`, { method: "GET" });
}

// Admin
export async function adminListBlogs() {
  return apiFetch(`/api/blogs`, { method: "GET" }); // verifyToken middleware gerektiriyorsa token header eklenir
}

/**
 * payload can be FormData or plain object. If FormData provided, it will be sent as multipart.
 * This helper will attach Authorization header if token is present in localStorage (client-side).
 */
export async function adminCreateBlog(payload: FormData | Record<string, any>) {
  try {
    const token = typeof window !== "undefined" ? (localStorage.getItem("token") || "") : "";

    if (payload instanceof FormData) {
      const options: RequestInit = {
        method: "POST",
        body: payload,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      };
      return apiFetch(`/api/blogs`, options);
    } else {
      const options: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      };
      return apiFetch(`/api/blogs`, options);
    }
  } catch (err) {
    console.error('[blogService] adminCreateBlog error', err);
    throw err;
  }
}

export async function adminUpdateBlog(param: string, payload: FormData | Record<string, any>) {
  console.log('[blogService] adminUpdateBlog called', { param, payload });

  try {
    const token = typeof window !== "undefined" ? (localStorage.getItem("token") || "") : "";

    // Hazırlanan fetch/RequestInit objesini burada oluştur
    let options: RequestInit;

    if (payload instanceof FormData) {
      // FormData ile gönderim: Content-Type header'ını kesinlikle elle ayarlamayın
      options = {
        method: "PUT",
        body: payload,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      };
      console.log('[blogService] Sending FormData (multipart/form-data)');
    } else {
      // Plain object -> JSON string
      options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload),
      };
      console.log('[blogService] Sending JSON payload', payload);
    }

    const result = await apiFetch(`/api/blogs/${encodeURIComponent(param)}`, options);
    console.log('[blogService] adminUpdateBlog result', result);

    // Eğer apiFetch wrapper'ınız 2xx olmayan durumları throw etmiyorsa
    // burada result.error / result.status kontrolü yapabilirsiniz.
    if (result && (result.error || (result.status && result.status >= 400))) {
      const msg = result.error || 'Unknown error from adminUpdateBlog';
      console.error('[blogService] adminUpdateBlog detected error in result', result);
      throw new Error(msg);
    }

    return result;
  } catch (err) {
    console.error('[blogService] adminUpdateBlog caught error', err);
    throw err;
  }
}

export async function adminDeleteBlog(param: string) {
  const token = typeof window !== "undefined" ? (localStorage.getItem("token") || "") : "";
  return apiFetch(`/api/blogs/${encodeURIComponent(param)}`, { method: "DELETE", headers: token ? { Authorization: `Bearer ${token}` } : undefined });
}

/**
 * If you have a separate uploads endpoint, you can implement it here.
 * Otherwise createBlog supports multipart/form-data with 'image' field.
 */
export async function uploadImage(form: FormData) {
  const token = typeof window !== "undefined" ? (localStorage.getItem("token") || "") : "";
  return apiFetch(`/api/uploads`, { method: "POST", body: form, headers: token ? { Authorization: `Bearer ${token}` } : undefined });
}