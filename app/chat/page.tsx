import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chat2Interface } from "@/components/chat2/chat2-interface"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Export Chat | Talk to ITAI Assistant",
  description: "Chat with ITAI's AI assistant to explore export opportunities and get personalized recommendations for international buyers.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/chat'
  },
}

export default function ChatPage() {
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
