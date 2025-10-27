import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutSimpleSection } from "@/components/about-simple-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hakkımızda - ITAI | İhracat Odaklı Üreticiler İçin Yapıldı",
  description: "Doğrulanmış uluslararası alıcılar ve güvenilir verilerle ürünleri eşleştirerek üreticilerin ihracatını büyütmelerine yardımcı oluyoruz.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/tr/hakkimizda'
  },
}

export default function TurkishAboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutSimpleSection />
      </main>
      <Footer />
    </div>
  )
}
