'use client';

import { ChatInterface } from "@/components/chat/chat-interface"
import { useLanguage } from "@/contexts/language-context"
import { useEffect } from "react"

export default function ChatPage() {
  const { t } = useLanguage()

  // Set document title and meta tags for client component
  useEffect(() => {
    document.title = "AI Export Chat | Talk to ITAI Assistant"
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', "Chat with ITAI's AI assistant to explore export opportunities and get personalized recommendations for international buyers.")
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = "Chat with ITAI's AI assistant to explore export opportunities and get personalized recommendations for international buyers."
      document.head.appendChild(meta)
    }

    // Set canonical URL
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) {
      existingCanonical.setAttribute('href', 'https://www.internationaltradeai.com/chat')
    } else {
      const canonical = document.createElement('link')
      canonical.rel = 'canonical'
      canonical.href = 'https://www.internationaltradeai.com/chat'
      document.head.appendChild(canonical)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("home.chat.title")}
          </h1>
          <p className="text-xl text-gray-600">
            {t("home.chat.subtitle")}
          </p>
        </div>
        
        <ChatInterface />
      </div>
    </div>
  )
}
