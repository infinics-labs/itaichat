'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Circle, RotateCcw, Send, CheckCircle } from "lucide-react";
import { ChatMessage } from "./chat-message";
import { TypingIndicator } from "./typing-indicator";

// Import the existing chat logic
import useConversationStore from "@/stores/useConversationStore";
import { Item, processMessages } from "@/lib/assistant";
import { InformationCollectionBar } from "@/components/information-collection-bar";
import { analyzeConversationMessages } from "@/lib/conversation-analyzer";

// Helper function to detect language from messages
function detectLanguageFromMessages(messages: Item[]): string {
  let turkishCount = 0;
  let englishCount = 0;
  
  messages.forEach(message => {
    if (message.type === 'message') {
      let content = '';
      if (Array.isArray(message.content)) {
        content = message.content.map(c => c.text || '').join(' ').trim();
      } else if (typeof message.content === 'string') {
        content = message.content;
      }
      
      const contentLower = content.toLowerCase();
      
      // Turkish indicators
      const turkishWords = ['ürün', 'ülke', 'ben', 'merhaba', 'teşekkür', 'kumaş', 'satış', 'ihracat', 'toptancı', 'evet', 'hayır'];
      const turkishChars = ['ğ', 'ü', 'ş', 'ı', 'ö', 'ç'];
      
      // English indicators  
      const englishWords = ['product', 'country', 'hello', 'thank', 'export', 'sales', 'wholesale', 'yes', 'no'];
      
      turkishWords.forEach(word => {
        if (contentLower.includes(word)) turkishCount++;
      });
      
      turkishChars.forEach(char => {
        if (contentLower.includes(char)) turkishCount++;
      });
      
      englishWords.forEach(word => {
        if (contentLower.includes(word)) englishCount++;
      });
    }
  });
  
  return turkishCount > englishCount ? 'tr' : 'en';
}

export function ChatInterface() {
  const [input, setInput] = useState("");
  const [isConversationSaved, setIsConversationSaved] = useState(false);
  const [showCompletionCard, setShowCompletionCard] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { 
    chatMessages, 
    addConversationItem, 
    addChatMessage, 
    setAssistantLoading, 
    isAssistantLoading,
    resetConversation 
  } = useConversationStore();

  // Analyze conversation messages to get real-time progress (for progress bar display only)
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

  const saveConversationToDatabase = useCallback(async () => {
    try {
      setIsConversationSaved(true);
      
      const response = await fetch('/api/conversations/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatMessages,
          language: detectLanguageFromMessages(chatMessages)
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Conversation saved successfully:', result);
        setShowCompletionCard(true);
      } else {
        console.error('Failed to save conversation');
        setIsConversationSaved(false); // Reset to allow retry
      }
    } catch (error) {
      console.error('Error saving conversation:', error);
      setIsConversationSaved(false); // Reset to allow retry
    }
  }, [chatMessages]);

  // Save conversation when demo summary message is detected
  useEffect(() => {
    // Look for the comprehensive summary message from the assistant
    const hasSummaryMessage = chatMessages.some(message => {
      if (message.type === 'message' && message.role === 'assistant') {
        let content = '';
        if (Array.isArray(message.content)) {
          content = message.content.map(c => c.text || '').join(' ').trim();
        } else if (typeof message.content === 'string') {
          content = message.content;
        }
        
        const contentLower = content.toLowerCase();
        
        // Check if this message contains summary indicators
        const summaryIndicators = [
          'ürün:', 'product:',
          'hedef ülke:', 'target country:',
          'gtip kod', 'gtip code',
          'satış kanal', 'sales channel',
          'website:', 'web site:',
          'isim:', 'name:',
          'e-posta:', 'email:',
          'telefon:', 'phone:',
          'anahtar kelime', 'keyword',
          'rakip', 'competitor',
          'müşteri', 'customer'
        ];
        
        // Count how many summary indicators are present
        const indicatorCount = summaryIndicators.filter(indicator => 
          contentLower.includes(indicator)
        ).length;
        
        // If message has 6+ indicators, it's likely the summary message
        return indicatorCount >= 6;
      }
      return false;
    });

    if (hasSummaryMessage && !isConversationSaved && !isAssistantLoading) {
      console.log('Summary message detected, saving conversation...');
      saveConversationToDatabase();
    }
  }, [chatMessages, isConversationSaved, isAssistantLoading, saveConversationToDatabase]);

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

        {/* Completion Card */}
        {showCompletionCard && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md bg-white shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Conversation Complete!
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Your export analysis has been saved successfully. All collected information has been stored in our database.
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => {
                        setShowCompletionCard(false);
                        resetConversation();
                        setIsConversationSaved(false);
                      }}
                      className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
                    >
                      Start New Conversation
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowCompletionCard(false)}
                    >
                      Continue Viewing
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
}
