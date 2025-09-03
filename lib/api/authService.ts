import { apiFetch } from "./client";

export type AuthUser = {
  id: string;
  username: string;
  name?: string;
  email?: string;
  isAdmin?: boolean;
  image?: string;
};

export async function login(username: string, password: string) {
  // Beklenen backend response: { message, token, user }
  return apiFetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // <- ekledim
    body: JSON.stringify({ username, password }),
  });
}

export async function register(payload: Record<string, any>) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function getMe() {
  // apiFetch otomatik Authorization header ekliyorsa çalışır
  return apiFetch("/api/auth/me", {
    method: "GET",
  });
}