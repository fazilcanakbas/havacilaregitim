import { apiFetch } from "./client"

export type MessageItem = {
  _id?: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject?: string
  program?: string
  message: string
  newsletter?: boolean
  isRead?: boolean
  createdAt?: string
  updatedAt?: string
}

// Public: mesaj gönder
export async function sendMessage(payload: Record<string, any>): Promise<MessageItem> {
  return apiFetch("/api/messages", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  }) as Promise<MessageItem>
}

// Admin: tüm mesajları listele
export async function adminListMessages(isRead?: boolean): Promise<MessageItem[]> {
  const qs = isRead !== undefined ? `?isRead=${isRead}` : ""
  return apiFetch(`/api/messages${qs}`, { method: "GET" }) as Promise<MessageItem[]>
}

// Admin: mesaj detayı
export async function adminGetMessage(id: string): Promise<MessageItem> {
  return apiFetch(`/api/messages/${id}`, { method: "GET" }) as Promise<MessageItem>
}

// Admin: mesajı okundu işaretle
export async function adminMarkAsRead(id: string): Promise<MessageItem> {
  return apiFetch(`/api/messages/${id}/read`, { method: "PUT" }) as Promise<MessageItem>
}

// Admin: mesaj sil
export async function adminDeleteMessage(id: string) {
  return apiFetch(`/api/messages/${id}`, { method: "DELETE" })
}
