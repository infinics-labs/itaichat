import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChatInterface } from "@/components/chat/chat-interface"

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
