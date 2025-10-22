import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PricingPageSection } from "@/components/pricing/pricing-page-section"

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
