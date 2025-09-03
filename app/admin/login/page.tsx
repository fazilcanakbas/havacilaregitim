"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { login as loginApi, getMe } from "@/lib/api/authService"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Eğer hali hazırda geçerli bir token varsa direkt admin anasayfaya yönlendir
  useEffect(() => {
    const checkLogged = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      if (token) {
        try {
          await getMe()
          router.replace("/admin/blog")
        } catch {
          // token geçersiz ise temizle
          localStorage.removeItem("token")
          localStorage.removeItem("user")
        }
      }
    }
    checkLogged()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        // Başarılı -> admin anasayfaya yönlendir
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
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-2">Admin Girişi</h2>
        <p className="text-sm text-muted-foreground mb-6">Admin paneline erişmek için giriş yapın</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Kullanıcı Adı</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
              placeholder="Kullanıcı adınızı girin"
              autoComplete="username"
            />
          </div>

          <div>
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
              placeholder="Şifrenizi girin"
              autoComplete="current-password"
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-between">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}