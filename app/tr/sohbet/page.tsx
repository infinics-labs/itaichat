import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChatInterface } from "@/components/chat/chat-interface"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Yapay Zeka İhracat Sohbeti | ITAI Asistanıyla Konuşun",
  description: "İhracat fırsatlarını keşfetmek ve uluslararası alıcılar için kişiselleştirilmiş öneriler almak için ITAI'nin yapay zeka asistanıyla sohbet edin.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/tr/sohbet'
  },
}

export default function TurkishChatPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ChatInterface />
      </main>
      <Footer />
    </div>
  )
}
