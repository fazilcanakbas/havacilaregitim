"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Users, Eye, MessageSquare, TrendingUp, Calendar, Download, Globe, Smartphone, Monitor } from "lucide-react"

// Mock analytics data
const mockAnalytics = {
  overview: {
    totalVisitors: 12450,
    pageViews: 34200,
    contactForms: 156,
    conversionRate: 3.2,
  },
  traffic: {
    organic: 45,
    direct: 30,
    social: 15,
    referral: 10,
  },
  devices: {
    desktop: 60,
    mobile: 35,
    tablet: 5,
  },
  topPages: [
    { page: "Ana Sayfa", views: 8500, percentage: 25 },
    { page: "Hizmetlerimiz", views: 6200, percentage: 18 },
    { page: "Hakkımızda", views: 4800, percentage: 14 },
    { page: "Blog", views: 3900, percentage: 11 },
    { page: "İletişim", views: 3200, percentage: 9 },
  ],
  monthlyData: [
    { month: "Ocak", visitors: 2100, pageViews: 5800 },
    { month: "Şubat", visitors: 2300, pageViews: 6200 },
    { month: "Mart", visitors: 2800, pageViews: 7500 },
    { month: "Nisan", visitors: 3200, pageViews: 8900 },
    { month: "Mayıs", visitors: 2900, pageViews: 8100 },
  ],
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analitik</h1>
          <p className="text-gray-600">Website performansını ve ziyaretçi istatistiklerini görüntüleyin</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Zaman aralığı seç" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Son 7 gün</SelectItem>
              <SelectItem value="30days">Son 30 gün</SelectItem>
              <SelectItem value="90days">Son 90 gün</SelectItem>
              <SelectItem value="1year">Son 1 yıl</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Ziyaretçi</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockAnalytics.overview.totalVisitors.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 mt-1">+12% geçen aya göre</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sayfa Görüntüleme</p>
                <p className="text-2xl font-bold text-gray-900">{mockAnalytics.overview.pageViews.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+8% geçen aya göre</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">İletişim Formu</p>
                <p className="text-2xl font-bold text-gray-900">{mockAnalytics.overview.contactForms}</p>
                <p className="text-xs text-green-600 mt-1">+15% geçen aya göre</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dönüşüm Oranı</p>
                <p className="text-2xl font-bold text-gray-900">%{mockAnalytics.overview.conversionRate}</p>
                <p className="text-xs text-green-600 mt-1">+0.3% geçen aya göre</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Trafik Kaynakları</CardTitle>
            <CardDescription>Ziyaretçilerin nereden geldiğini görün</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Organik Arama</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${mockAnalytics.traffic.organic}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{mockAnalytics.traffic.organic}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Doğrudan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${mockAnalytics.traffic.direct}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{mockAnalytics.traffic.direct}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">Sosyal Medya</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${mockAnalytics.traffic.social}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{mockAnalytics.traffic.social}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium">Referans</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${mockAnalytics.traffic.referral}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{mockAnalytics.traffic.referral}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Device Types */}
        <Card>
          <CardHeader>
            <CardTitle>Cihaz Türleri</CardTitle>
            <CardDescription>Ziyaretçilerin kullandığı cihazlar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Masaüstü</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${mockAnalytics.devices.desktop}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{mockAnalytics.devices.desktop}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Mobil</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${mockAnalytics.devices.mobile}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{mockAnalytics.devices.mobile}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">Tablet</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${mockAnalytics.devices.tablet}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{mockAnalytics.devices.tablet}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <Card>
        <CardHeader>
          <CardTitle>En Çok Ziyaret Edilen Sayfalar</CardTitle>
          <CardDescription>Hangi sayfalar en popüler</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalytics.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 w-6">#{index + 1}</span>
                  <span className="font-medium">{page.page}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${page.percentage * 4}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{page.percentage}%</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-16 text-right">
                    {page.views.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Aylık Trend</CardTitle>
          <CardDescription>Son 5 ayın performansı</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalytics.monthlyData.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{month.month}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Ziyaretçi</p>
                    <p className="font-semibold">{month.visitors.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Sayfa Görüntüleme</p>
                    <p className="font-semibold">{month.pageViews.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
