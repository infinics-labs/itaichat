import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact ITAI | Book a Live Demo",
  description: "Book a live demo to map your first 50 verified buyers; we'll show a curated sample for your markets.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/contact'
  },
}

export default function ContactPage() {
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
