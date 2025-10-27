import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/why-different/hero-section"
import { DifferentiatorsSection } from "@/components/why-different/differentiators-section"
import { ImpactSection } from "@/components/why-different/impact-section"
import { AIMessageSection } from "@/components/why-different/ai-message-section"
import { GallerySection } from "@/components/why-different/gallery-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ITAI Neden Farklı | Yapay Zeka Destekli İhracat İstihbaratı",
  description: "ITAI'nin yapay zeka teknolojisinin doğrulanmış alıcılar bularak ve gerçek zamanlı pazar istihbaratı sağlayarak uluslararası ticareti nasıl dönüştürdüğünü keşfedin.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/tr/neden-farkli'
  },
}

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
