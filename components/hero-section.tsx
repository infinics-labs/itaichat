"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, MessageCircle, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { trackCTAClick, trackButtonClick, trackVideoPlay } from "@/lib/analytics"
import { AIChatInterface } from "@/components/ai-chat-interface"
import { TrustStrip } from "@/components/trust-strip"
import { useRouter } from "next/navigation"
import useConversationStore from "@/stores/useConversationStore"
import { Item, processMessages } from "@/lib/assistant"
import { useLanguage } from "@/contexts/language-context"

export function HeroSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const router = useRouter()
  const { addConversationItem, addChatMessage, setAssistantLoading } = useConversationStore()
  const { t } = useLanguage()

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

      // Redirect to chat page
      router.push('/chat')
    } catch (error) {
      console.error("Error sending message:", error)
      setAssistantLoading(false)
    }
  }

  const handleVideoPlay = () => {
    trackVideoPlay({
      page: 'home',
      placement: 'hero',
      video_title: 'ITAI Demo Video',
      video_duration: '2:30'
    })
    setIsVideoModalOpen(true)
  }

  const handleChatToggle = () => {
    trackButtonClick({
      action: 'chat_toggle',
      category: 'engagement',
      label: 'chat_widget',
      page: 'home',
      placement: 'hero'
    })
    setIsChatOpen(!isChatOpen)
  }

  return (
    <>
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Left - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
                {t("home.hero.title")}
                <span className="bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent">
                  {" "}{t("home.hero.titleAccent")}
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-4">
                {t("home.hero.subtitle1")}
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {t("home.hero.subtitle2")}
              </p>
              
              <p className="text-base text-gray-600 mb-12">
                {t("home.hero.subtitle3")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="/chat"
                  onClick={() => trackCTAClick({
                    page: 'home',
                    placement: 'hero_primary',
                    button_text: 'Book a live demo',
                    destination: '/chat'
                  })}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
                  >
                    {t("home.hero.cta1")}
                  </Button>
                </a>
                
                <Link 
                  href="/chat"
                  onClick={() => trackCTAClick({
                    page: 'home',
                    placement: 'hero_secondary',
                    button_text: 'Get export insights with the ITAI chatbot',
                    destination: '/chat'
                  })}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
                  >
                    {t("home.hero.cta2")}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Right - Video Poster */}
            <div className="relative">
              <div 
                className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                onClick={handleVideoPlay}
              >
                <div className="aspect-video relative">
                  <Image 
                    src="/thumbnail.png" 
                    alt="ITAI Demo Video Thumbnail"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-300 group-hover:scale-110">
                      <Play className="w-8 h-8 text-orange-500 ml-1" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">{t("home.hero.videoTitle")}</p>
                  <p className="text-xs opacity-90">{t("home.hero.videoDuration")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Strip */}
        <TrustStrip />

        {/* Chat Widget Button */}
        <button
          onClick={handleChatToggle}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/g6MUnSki9I0?autoplay=1"
                  title="ITAI Export Assistant Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-2xl">
            <button
              onClick={() => setIsChatOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {t("home.hero.chatTitle")}
                  </h3>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <AIChatInterface onMessageSent={handleMessageSent} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}
