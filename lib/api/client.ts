const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function getAuthToken(): string | null {
  // Öncelik: localStorage token (ör. JWT), değilse cookie 'token'
  try {
    if (typeof window === "undefined") return null;
    const ls = window.localStorage?.getItem("token");
    if (ls) return ls;
    const ck = readCookie("token");
    if (ck) return ck;
    return null;
  } catch (e) {
    return null;
  }
}

async function parseResponse(res: Response) {
  // Try to parse JSON safely; if not JSON, return plain text.
  const text = await res.text();
  let data: any = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = text;
    }
  }

  if (!res.ok) {
    // Prefer structured error fields if present, otherwise fallback to text/status
    const message =
      (data && (data.error || data.message || (typeof data === 'string' ? data : undefined))) ||
      res.statusText ||
      "API error";
    const error: any = new Error(message);
    error.status = res.status;
    error.body = data;
    throw error;
  }

  return data;
}

/**
 * apiFetch
 * @param path - path starting with / (will be appended to API_BASE) OR a full absolute URL
 * @param opts - fetch options (method, body, headers, ...)
 */
export async function apiFetch(path: string, opts: RequestInit = {}) {
  // allow passing absolute URLs directly
  const url = path.startsWith('http://') || path.startsWith('https://') ? path : API_BASE + path;

  // Clone headers to modify (normalize keys to handle different casings)
  const incoming = opts.headers ? { ...(opts.headers as Record<string, string>) } : {};
  const headers: Record<string, string> = {};
  // copy while normalizing header names to standard casing used later
  Object.keys(incoming).forEach((k) => {
    headers[k] = incoming[k];
  });

  // Authorization: if not provided in opts.headers, set from token
  if (!Object.keys(headers).some(h => h.toLowerCase() === 'authorization')) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const body = (opts as any).body;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  // If body is FormData, ensure we DON'T set Content-Type (fetch will set multipart boundary)
  if (isFormData) {
    // remove any Content-Type header if set by caller (case-insensitive)
    Object.keys(headers).forEach((hk) => {
      if (hk.toLowerCase() === 'content-type') {
        delete headers[hk];
      }
    });
  } else if (body && typeof body === 'object' && !(body instanceof ArrayBuffer) && !(body instanceof Blob)) {
    // If body is a plain object (and not FormData/Blob/ArrayBuffer), stringify as JSON
    (opts as any).body = JSON.stringify(body);
    // set Content-Type if not already set
    if (!Object.keys(headers).some(h => h.toLowerCase() === 'content-type')) {
      headers['Content-Type'] = 'application/json';
    }
  } else if (body && typeof body === 'string') {
    // if caller passed a string body, set default content-type only if not provided
    if (!Object.keys(headers).some(h => h.toLowerCase() === 'content-type')) {
      headers['Content-Type'] = 'text/plain';
    }
  }

  const res = await fetch(url, {
    ...opts,
    headers,
    credentials: (opts as any).credentials ?? "include", // default include for cookie-based auth
    // Note: do not set body here since we may have already modified opts.body above
    body: (opts as any).body,
  });

  return parseResponse(res);
}

export { API_BASE, getAuthToken };