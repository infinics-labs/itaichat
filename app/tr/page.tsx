"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhyDifferentSection } from "@/components/why-different-section"
import { WhyChooseITAISection } from "@/components/why-choose-itai-section"
import { HowITAIWorksSection } from "@/components/how-itai-works-section"
import { ProvenResultsSection } from "@/components/proven-results-section"
import { HomeFAQSection } from "@/components/home-faq-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { X, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TurkishHomePage() {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Show the welcome modal after 3 seconds
    const timer = setTimeout(() => {
      setIsWelcomeModalOpen(true)
    }, 3000)

    // Auto-close the modal after 5 seconds
    const autoCloseTimer = setTimeout(() => {
      setIsWelcomeModalOpen(false)
    }, 8000)

    return () => {
      clearTimeout(timer)
      clearTimeout(autoCloseTimer)
    }
  }, [])


  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <div id="hero">
          <HeroSection />
        </div>
        <WhyDifferentSection />
        <div id="features">
          <WhyChooseITAISection />
        </div>
        <HowITAIWorksSection />
        <ProvenResultsSection />
        <FinalCTASection />
        <HomeFAQSection />
      </main>
      <Footer />

      {/* Welcome Chatbot Popup */}
      {isWelcomeModalOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 animate-in slide-in-from-bottom-5 fade-in-0 duration-500">
          <Card className="bg-white shadow-2xl border-2 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-900 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      ITAI&apos;ye Hoş Geldiniz! 👋
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setIsWelcomeModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-700 mb-2">
                  AI İhracat Asistanınız pazar içgörüleri ve alıcı bağlantıları konusunda yardımcı olmak için burada.
                </p>
                <p className="text-xs text-gray-600">
                  Deneyin: &quot;Almanya&apos;da alıcı bul&quot; veya &quot;Türkiye ihracat gereksinimleri&quot;
                </p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsWelcomeModalOpen(false)
                    router.push('/tr/sohbet')
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  Sohbete Başla
                </button>
                <button
                  onClick={() => setIsWelcomeModalOpen(false)}
                  className="w-full text-gray-500 hover:text-gray-700 text-xs py-1 transition-colors"
                >
                  Belki sonra
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
