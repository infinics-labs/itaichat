import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQHero } from "@/components/faq/faq-hero"
import { FAQSection } from "@/components/faq/faq-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ | Frequently Asked Questions about ITAI",
  description: "Get answers to common questions about finding verified international buyers and accelerating your export growth with ITAI.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/faq'
  },
}

export default function FAQPage() {
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