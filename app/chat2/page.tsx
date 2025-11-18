import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chat2Interface } from "@/components/chat2/chat2-interface"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Export Chat v2 | ITAI Assistant - New System",
  description: "Chat with ITAI's AI assistant using our new simplified conversation system for export opportunities.",
  alternates: {
    canonical: 'https://www.internationaltradeai.com/chat2'
  },
}

export default function Chat2Page() {
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
