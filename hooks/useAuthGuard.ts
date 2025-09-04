"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getMe } from "@/lib/api/authService"

export function useAuthGuard() {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

      // login sayfasında koruma çalışmasın
      if (pathname.startsWith("/admin/login")) {
        setLoading(false)
        return
      }

      if (!token) {
        router.replace("/admin/login")
        return
      }

      try {
        const me = await getMe()
        setUser(me)
      } catch (err) {
        // token geçersizse temizle
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        router.replace("/admin/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  return { loading, user }
}
