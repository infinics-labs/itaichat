import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQHero } from "@/components/faq/faq-hero"
import { FAQSection } from "@/components/faq/faq-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SSS | ITAI Hakkında Sık Sorulan Sorular",
  description: "ITAI ile doğrulanmış uluslararası alıcılar bulma ve ihracat büyümenizi hızlandırma konularındaki yaygın sorulara yanıt alın.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/tr/sss'
  },
}

export default function TurkishFAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <FAQHero />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
