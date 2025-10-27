"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIChatInterface } from "@/components/ai-chat-interface"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import useConversationStore from "@/stores/useConversationStore"
import { Item, processMessages } from "@/lib/assistant"
import { trackCTAClick } from "@/lib/analytics"
import { useEffect } from "react"

function TurkishDemoContent() {
  const router = useRouter()
  const { addConversationItem, addChatMessage, setAssistantLoading } = useConversationStore()

  // Set document title and meta tags for client component
  useEffect(() => {
    document.title = "Demo | ITAI'nin İhracat Asistanını Deneyimleyin"
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', "ITAI'nin yapay zeka destekli platformunu deneyin ve doğrulanmış uluslararası alıcıları nasıl bulacağınızı ve ihracat büyümenizi nasıl hızlandıracağınızı keşfedin.")
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = "ITAI'nin yapay zeka destekli platformunu deneyin ve doğrulanmış uluslararası alıcıları nasıl bulacağınızı ve ihracat büyümenizi nasıl hızlandıracağınızı keşfedin."
      document.head.appendChild(meta)
    }

    // Set canonical URL
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) {
      existingCanonical.setAttribute('href', 'https://www.internationaltradeai.com/tr/demo')
    } else {
      const canonical = document.createElement('link')
      canonical.rel = 'canonical'
      canonical.href = 'https://www.internationaltradeai.com/tr/demo'
      document.head.appendChild(canonical)
    }
  }, [])

  const handleMessageSent = async (message: string) => {
    if (!message.trim()) return

    // Create the message items
    const userItem: Item = {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: message.trim() }],
    }
    const userMessage: any = {
      role: "user",
      content: message.trim(),
    }

    try {
      // Add the message to the conversation
      setAssistantLoading(true)
      addConversationItem(userMessage)
      addChatMessage(userItem)
      
      // Start processing the message
      processMessages().catch((error) => {
        console.error("Error processing message:", error)
        setAssistantLoading(false)
      })

      // Redirect to Turkish chat page
      router.push('/tr/sohbet')
    } catch (error) {
      console.error("Error sending message:", error)
      setAssistantLoading(false)
    }
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              ITAI&apos;nin 
              <span className="bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent">
                {" "}İhracat Asistanını
              </span>
              {" "}Deneyimleyin
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8">
              AI destekli platformumuzu deneyin ve doğrulanmış uluslararası alıcıları nasıl bulacağınızı, 
              karar vericilerle nasıl bağlantı kuracağınızı ve ihracat büyümenizi nasıl hızlandıracağınızı keşfedin.
            </p>
          </div>

          {/* Interactive Demo */}
          <div className="flex justify-center items-center mb-16">
            <AIChatInterface onMessageSent={handleMessageSent} />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Neler Deneyimleyeceksiniz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ITAI&apos;nin ihracat iş geliştirme sürecinizi nasıl dönüştürdüğünün uygulamalı önizlemesini alın.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Doğrulanmış Alıcı Keşfi</h3>
                <p className="text-gray-600">
                  AI&apos;mizin 195+ ülkede özellikle ürünlerinizi arayan uluslararası alıcıları nasıl belirlediğini ve doğruladığını deneyimleyin.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ArrowRight className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Akıllı Müşteri Adayı Üretimi</h3>
                <p className="text-gray-600">
                  ITAI&apos;nin karar verici iletişim bilgileri ve detaylı şirket profilleriyle nitelikli müşteri adaylarını nasıl otomatik olarak ürettiğini görün.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Toplantı Hızlandırma</h3>
                <p className="text-gray-600">
                  Platformumuzun önceden niteliklendirilmiş uluslararası alıcılar ve distribütörlerle daha hızlı toplantı ayarlamanıza nasıl yardımcı olduğunu keşfedin.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-0 shadow-xl bg-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                İhracat İşinizi Dönüştürmeye Hazır mısınız?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Doğrulanmış uluslararası alıcıları bulmak ve küresel genişlemelerini hızlandırmak için 
                ITAI&apos;yi kullanan binlerce üreticiye katılın.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/tr/sohbet"
                  onClick={() => trackCTAClick({
                    page: 'demo',
                    placement: 'demo_page_cta',
                    button_text: 'Kişisel Demo Planla',
                    destination: '/tr/sohbet'
                  })}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-lg w-full sm:w-auto"
                  >
                    Kişisel Demo Planla
                    <Calendar className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
                  onClick={() => {
                    trackCTAClick({
                      page: 'demo',
                      placement: 'bottom_cta',
                      button_text: 'Fiyatlandırma Planlarını Görüntüle',
                      destination: '/tr/fiyatlandirma'
                    });
                    window.open('/tr/fiyatlandirma', '_blank');
                  }}
                >
                  Fiyatlandırma Planlarını Görüntüle
                </Button>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                Kredi kartı gerekmez • 30 dakikalık kişiselleştirilmiş danışmanlık • Kurulum yardımı dahil
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

export default function TurkishDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <TurkishDemoContent />
      <Footer />
    </div>
  )
}
