"use client"

import { AIChatInterface } from "@/components/ai-chat-interface"
import { useRouter } from "next/navigation"
import useConversationStore from "@/stores/useConversationStore"
import { Item, processMessages } from "@/lib/assistant"

export function HeroSection() {
  const router = useRouter()
  const { addConversationItem, addChatMessage, setAssistantLoading } = useConversationStore()

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

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered AI Chat Interface */}
        <div className="flex justify-center items-center">
          <AIChatInterface onMessageSent={handleMessageSent} />
        </div>
      </div>
    </section>
  )
}
