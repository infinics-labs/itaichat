import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ManufacturingAdvantagesSection } from "@/components/manufacturing-advantages-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kullanım Alanları | Üretim, Elektronik, İlaç, Tıbbi Cihazlar",
  description: "Üreticilerin uluslararası alıcıları bulmak ve doğrulamak ve nitelikli toplantılar ayarlamak için ITAI'yi nasıl kullandığını görün.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/tr/kullanim-alanlari'
  },
}

export default function TurkishUseCasesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ManufacturingAdvantagesSection />
      </main>
      <Footer />
    </div>
  )
}
