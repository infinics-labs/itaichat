import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PricingPageSection } from "@/components/pricing/pricing-page-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing | Choose Your Perfect Export Plan",
  description: "Simple, transparent pricing for verified international buyers and clean B2B data. Starting Package, Plus Package, and Pro Plus Package options available.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/pricing'
  },
}

export default function PricingPage() {
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
