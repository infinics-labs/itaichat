import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chat2Interface } from "@/components/chat2/chat2-interface"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI İhracat Sohbet v2 | ITAI Asistan",
  description: "İhracat fırsatlarını keşfetmek ve uluslararası alıcılar için kişiselleştirilmiş öneriler almak için ITAI'nin AI asistanıyla sohbet edin.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/tr/sohbet2'
  },
}

export default function TrChat2Page() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Chat2Interface />
      </main>
      <Footer />
    </div>
  )
}
