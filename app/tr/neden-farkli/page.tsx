import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/why-different/hero-section"
import { DifferentiatorsSection } from "@/components/why-different/differentiators-section"
import { ImpactSection } from "@/components/why-different/impact-section"
import { AIMessageSection } from "@/components/why-different/ai-message-section"
import { GallerySection } from "@/components/why-different/gallery-section"

export default function TurkishWhyDifferentPage() {
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
