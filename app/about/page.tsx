import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutSimpleSection } from "@/components/about-simple-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About ITAI | Built for Export‑Focused Manufacturers",
  description: "We help manufacturers grow exports by matching products with verified international buyers and reliable data.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/about'
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutSimpleSection />
      </main>
      <Footer />
    </div>
  )
}
