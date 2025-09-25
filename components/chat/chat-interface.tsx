'use client';

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Circle, RotateCcw, Send } from "lucide-react";
import { ChatMessage } from "./chat-message";
import { TypingIndicator } from "./typing-indicator";

// Import the existing chat logic
import useConversationStore from "@/stores/useConversationStore";
import useExportAssistantStore from "@/stores/useExportAssistantStore";
import { Item, processMessages } from "@/lib/assistant";
import { InformationCollectionBar } from "@/components/information-collection-bar";
import { analyzeConversationMessages } from "@/lib/conversation-analyzer";

export function ChatInterface() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { 
    chatMessages, 
    addConversationItem, 
    addChatMessage, 
    setAssistantLoading, 
    isAssistantLoading,
    resetConversation 
  } = useConversationStore();

  // Analyze conversation messages to get real-time progress
  const conversationData = analyzeConversationMessages(chatMessages);
  const progressData = {
    hasProduct: conversationData.hasProduct,
    hasTargetMarket: conversationData.hasTargetMarket,
    hasGtipCode: conversationData.hasGtipCode,
    hasSalesChannels: conversationData.hasSalesChannels,
    hasContactInfo: conversationData.hasContactInfo,
    hasKeywords: conversationData.hasKeywords,
    hasCompetitors: conversationData.hasCompetitors,
    hasCustomers: conversationData.hasCustomers,
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Check for pre-filled input from hero section
  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialProduct = sessionStorage.getItem('initialProduct');
      if (initialProduct) {
        setInput(initialProduct);
        sessionStorage.removeItem('initialProduct');
      }
    }
  }, []);

  // Convert chat messages to display format
  const formatMessages = () => {
    if (!chatMessages) return [];
    
    return chatMessages
      .map((item, index) => {
        if (item.type === "message") {
          let content = "";
          if (item.content && Array.isArray(item.content)) {
            // Extract text from content array
            content = item.content
              .map(c => c.text || "")
              .join(" ")
              .trim();
          } else if (typeof item.content === "string") {
            content = item.content;
          }
          
          return {
            id: index,
            role: item.role,
            content: content
          };
        }
        return null;
      })
      .filter((message): message is { id: number; role: "user" | "assistant"; content: string } => message !== null);
  };

  const handleSend = async () => {
    if (!input.trim() || isAssistantLoading) return;

    const userItem: Item = {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: input.trim() }],
    };
    const userMessage: any = {
      role: "user",
      content: input.trim(),
    };

    try {
      setAssistantLoading(true);
      addConversationItem(userMessage);
      addChatMessage(userItem);
      setInput("");
      await processMessages();
    } catch (error) {
      console.error("Error processing message:", error);
      setAssistantLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setInput("");
    resetConversation();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white p-6 relative">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">ITAI Export Assistant</h3>
                  <p className="text-white/90 text-sm">Your AI-powered export advisor</p>
                </div>
              </div>
              <Button
                onClick={handleReset}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Circle className="w-3 h-3 fill-green-400 text-green-400" />
                <span className="text-sm text-white/90 font-medium">Active</span>
              </div>
              <div className="text-sm text-white/80">
                Ready to help with exports
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {formatMessages().length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Start exploring export opportunities with ITAI</p>
              </div>
            )}
            
            {formatMessages().map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isAssistantLoading && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t bg-white">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isAssistantLoading}
                className="flex-1 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
              <Button
                onClick={handleSend}
                disabled={isAssistantLoading || !input.trim()}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 px-6 shadow-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>

        {/* Progress Bar at Bottom */}
        <InformationCollectionBar {...progressData} />
      </Card>
    </div>
  );
}
