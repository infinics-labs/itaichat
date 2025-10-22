import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"

export default function TurkishContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
