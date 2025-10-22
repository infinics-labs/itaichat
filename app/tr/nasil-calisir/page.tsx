import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HowItWorksDetailedSection } from "@/components/how-it-works-detailed-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ITAI Nasıl Çalışır | ICP'den Doğrulanmış Müşteri Adaylarına",
  description: "İdeal alıcınızı tanımlayın, karar verici e-postalarıyla doğrulanmış müşteri adayları alın ve yeni pazarlarda nitelikli toplantılar ayarlamaya başlayın.",
}

export default function TurkishHowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HowItWorksDetailedSection />
      </main>
      <Footer />
    </div>
  )
}
