import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "İletişim - ITAI | Canlı Demo Rezervasyonu",
  description: "İlk 50 doğrulanmış alıcınızı haritalamak için canlı demo rezervasyonu yapın; pazarlarınız için seçilmiş bir örnek göstereceğiz.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/tr/iletisim'
  },
}

export default function TurkishContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
