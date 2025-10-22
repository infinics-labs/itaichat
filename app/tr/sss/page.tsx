import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQHero } from "@/components/faq/faq-hero"
import { FAQSection } from "@/components/faq/faq-section"

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
