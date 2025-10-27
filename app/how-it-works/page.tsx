import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HowItWorksDetailedSection } from "@/components/how-it-works-detailed-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How ITAI Works | From ICP to Verified Leads",
  description: "Define your ideal buyer, get verified leads with decision‑maker emails, and start booking qualified meetings in new markets.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/how-it-works'
  },
}

export default function HowItWorksPage() {
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
