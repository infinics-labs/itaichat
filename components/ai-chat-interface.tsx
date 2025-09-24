"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, Circle } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

interface AIChatInterfaceProps {
  onMessageSent?: (message: string) => void
}

export function AIChatInterface({ onMessageSent }: AIChatInterfaceProps) {
  const [input, setInput] = useState("")
  const router = useRouter()
  const { language } = useLanguage()

  const handleStartChat = () => {
    if (!input.trim()) return
    
    // Call the onMessageSent callback if provided
    if (onMessageSent) {
      onMessageSent(input.trim())
    } else {
      // Fallback: Store the input and navigate to chat
      sessionStorage.setItem('initialProduct', input.trim())
      router.push('/chat')
    }
    
    // Clear the input
    setInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      handleStartChat()
    }
  }

  // Language-specific content
  const content = {
    tr: {
      title: "ITAI İhracat Asistanı",
      subtitle: "AI destekli ticaret danışmanınız",
      status: "Sohbete hazır",
      welcomeMessage: "👋 Merhaba! Ben sizin AI ihracat asistanınızım. Hangi ürününüzün ihracatını artırmak istiyorsunuz?",
      userPreview: "Tekstil ürünleri üretiyoruz...",
      botResponse: "🌍 Harika! Size Avrupa, Asya ve Amerika'da alıcılar bulmaya yardımcı olabilirim. Hangi spesifik tekstil kategorisi?",
      placeholder: "Mesajınızı yazın..."
    },
    en: {
      title: "ITAI Export Assistant",
      subtitle: "Your AI-powered trade advisor",
      status: "Ready to chat",
      welcomeMessage: "👋 Hello! I'm your AI export assistant. What products are you looking to export globally?",
      userPreview: "We manufacture textile products...",
      botResponse: "🌍 Great! I can help you find buyers in Europe, Asia, and Americas. Which specific textile category?",
      placeholder: "Type your message..."
    }
  }

  const texts = content[language] || content.en

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden transform hover:scale-105 transition-transform duration-300">
        {/* Header with gradient */}
        <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white p-6 relative">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{texts.title}</h3>
                  <p className="text-white/90 text-sm">{texts.subtitle}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="w-3 h-3 fill-green-400 text-green-400" />
              <span className="text-sm text-white/90 font-medium">{texts.status}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white">
          {/* Chat messages */}
          <div className="space-y-4 min-h-[300px]">
            {/* Bot welcome message */}
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600">
                <AvatarFallback className="text-white text-xs font-bold">AI</AvatarFallback>
              </Avatar>
              <div className="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm border max-w-xs">
                <p className="text-sm text-gray-800">
                  {texts.welcomeMessage}
                </p>
              </div>
            </div>
          </div>

          {/* Message input */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Input
              placeholder={texts.placeholder}
              className="flex-1 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 px-6 shadow-lg"
              onClick={handleStartChat}
              disabled={!input.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
