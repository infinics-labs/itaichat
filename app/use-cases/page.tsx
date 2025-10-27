import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ManufacturingAdvantagesSection } from "@/components/manufacturing-advantages-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Use Cases | Manufacturing, Electronics, Pharma, Medical Devices",
  description: "See how manufacturers use ITAI to find and verify international buyers and book qualified meetings.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/use-cases'
  },
}

export default function UseCasesPage() {
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
