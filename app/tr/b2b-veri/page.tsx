import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Shield, RefreshCw, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function TurkishB2BDataPage() {
  const features = [
    {
      icon: Database,
      title: "Kapsamlı B2B Veritabanı",
      description: "Detaylı şirket profilleri ve karar verici bilgileriyle 195+ ülkede milyonlarca doğrulanmış B2B iletişim bilgisine erişim."
    },
    {
      icon: Shield,
      title: "Doğrulanmış İletişim Kalitesi",
      description: "B2B pazarlama veritabanımızdaki her iletişim bilgisi e-posta doğrulama ve rol onayı dahil çok katmanlı doğrulamadan geçer."
    },
    {
      icon: RefreshCw,
      title: "Gerçek Zamanlı Güncellemeler",
      description: "Müşteri adayları veritabanımız yüksek teslim edilebilirlik sağlamak için sürekli olarak yeni iletişim bilgileri ve şirket bilgileriyle güncellenir."
    },
    {
      icon: CheckCircle,
      title: "İhracata Hazır Formatlar",
      description: "Mevcut satış ve pazarlama araçlarınızla çalışan CSV, Excel veya doğrudan CRM entegrasyon formatlarında B2B verilerinizi alın."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
                Premium
                <span className="bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent">
                  {" "}B2B Verisi
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Doğrulanmış uluslararası alıcılar, karar vericiler ve ihracata hazır iletişim bilgilerinin 
                en kapsamlı B2B veritabanına erişim sağlayın.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-900 rounded-2xl flex items-center justify-center mb-6">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mb-16">
              <Card className="border-0 shadow-xl bg-white max-w-4xl mx-auto">
                <CardContent className="p-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Neden B2B Pazarlama Veritabanımızı Seçmelisiniz?
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">195+</div>
                      <div className="text-gray-600">Kapsanan Ülke</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">%95+</div>
                      <div className="text-gray-600">E-posta Teslim Edilebilirliği</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">24sa</div>
                      <div className="text-gray-600">Veri Yenileme Döngüsü</div>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 mb-8">
                    Müşteri adayları veritabanımız B2B müşteri adayı bulma kampanyalarınız için 
                    mümkün olan en iyi sonuçları vermek üzere kalite, kapsam ve tazeliği birleştirir.
                  </p>
                  <Link href="/tr/demo">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-xl"
                    >
                      Örnek B2B Verilerini Görün
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
