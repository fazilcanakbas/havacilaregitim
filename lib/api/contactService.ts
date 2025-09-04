import { apiFetch } from "./client"

export type ContactInfo = {
  phone: string
  email: string
  address: string
  addressEn?: string
  workingHours: string
  workingHoursEn?: string
  website: string
  socialMedia: {
    instagram?: string
    linkedin?: string
    youtube?: string
  }
  mapCoordinates: {
    lat: number
    lng: number
  }
  createdAt?: string
  updatedAt?: string
}

// Get contact info
export async function getContact(): Promise<ContactInfo> {
  return apiFetch("/api/contact", { method: "GET" }) as Promise<ContactInfo>
}

// Update contact info
export async function updateContact(data: Partial<ContactInfo>): Promise<ContactInfo> {
  return apiFetch("/api/contact", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }) as Promise<ContactInfo>
}
