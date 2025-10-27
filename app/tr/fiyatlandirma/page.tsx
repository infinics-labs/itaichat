import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PricingPageSection } from "@/components/pricing/pricing-page-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fiyatlandırma | Mükemmel İhracat Planınızı Seçin",
  description: "Doğrulanmış uluslararası alıcılar ve temiz B2B verileri için basit, şeffaf fiyatlandırma. Başlangıç, Plus ve Pro Plus paket seçenekleri mevcut.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/tr/fiyatlandirma'
  },
}

export default function TurkishPricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <PricingPageSection />
      </main>
      <Footer />
    </div>
  )
}
