import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutSimpleSection } from "@/components/about-simple-section"

export default function TurkishAboutPage() {
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
