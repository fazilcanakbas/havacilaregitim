// lib/hooks/useAdminAuth.ts
"use client";
import { useEffect, useState } from "react";
import { getMe, AuthUser } from "../api/authService";
import { useRouter } from "next/navigation";

/**
 * Hook to check admin auth status on client pages.
 * usage:
 * const { user, loading } = useAdminAuth({ redirectTo: '/admin/login' })
 */
export function useAdminAuth(options?: { redirectTo?: string }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        const res: any = await getMe();
        // backend returns { user }
        const u = res?.user || res;
        if (mounted) setUser(u);
      } catch (err) {
        if (options?.redirectTo) {
          router.push(options.redirectTo);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    check();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, loading };
}