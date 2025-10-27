import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/why-different/hero-section"
import { DifferentiatorsSection } from "@/components/why-different/differentiators-section"
import { ImpactSection } from "@/components/why-different/impact-section"
import { AIMessageSection } from "@/components/why-different/ai-message-section"
import { GallerySection } from "@/components/why-different/gallery-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Why ITAI is Different | AI-Powered Export Intelligence",
  description: "Discover how ITAI's AI technology transforms international trade by finding verified buyers and providing real-time market intelligence.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/why-different'
  },
}

export default function WhyDifferentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <DifferentiatorsSection />
        <ImpactSection />
        <AIMessageSection />
        <GallerySection />
      </main>
      <Footer />
    </div>
  )
}
