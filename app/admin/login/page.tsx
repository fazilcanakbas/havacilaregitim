"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { login as loginApi, getMe } from "@/lib/api/authService"
import Image from "next/image"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkLogged = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      if (token) {
        try {
          await getMe()
          router.replace("/admin/blog")
        } catch {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
        }
      }
    }
    checkLogged()
  }, [router])

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setError(null)
    if (!username || !password) {
      setError("Lütfen kullanıcı adı ve şifre girin.")
      return
    }
    try {
      setLoading(true)
      const res: any = await loginApi(username, password)
      if (res && res.token) {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", res.token)
          try {
            localStorage.setItem("user", JSON.stringify(res.user || {}))
          } catch (err) {
            console.warn("Could not save user in localStorage", err)
          }
        }
        router.replace("/admin")
      } else {
        setError("Beklenmeyen cevap. Tekrar deneyin.")
      }
    } catch (err: any) {
      console.error("Login error", err)
      const msg = err?.message || err?.body?.message || "Giriş başarısız"
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Logo */}
        <div className="flex justify-center py-8 border-b bg-gray-50">
          <Image src="/havacilaregitimtextlaci.png" alt="Logo" width={250} height={50} />
        </div>

        {/* Form */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Admin Girişi</h2>
          <p className="text-center text-sm text-gray-500 mb-8">
            Yönetim paneline erişmek için giriş yapın
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Kullanıcı Adı
              </label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3 text-center">
                {error}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all 
              disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          {/* Alt Linkler */}
          {/* <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Şifremi Unuttum?
            </a>
          </div> */}
        </div>
      </div>
    </div>
  )
}3
