import { apiFetch } from './client';

export interface ApplicationPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message?: string;
  serviceSlug?: string;
}

export interface ApplicationResponse extends ApplicationPayload {
  _id?: string;
  createdAt?: string;
}

export async function createApplication(payload: ApplicationPayload): Promise<ApplicationResponse> {
  return apiFetch('/api/applications', { method: 'POST', body: payload as any }) as Promise<ApplicationResponse>;
}
