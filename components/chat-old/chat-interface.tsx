'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
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

// Helper function to extract conversation data from messages
function extractConversationData(messages: Item[]): { country: string; phone: string } {
  const userMessages = messages
    .filter((msg): msg is typeof msg & { type: 'message'; role: 'user' } => 
      msg.type === 'message' && msg.role === 'user'
    )
    .map(msg => {
      if (Array.isArray(msg.content)) {
        return msg.content.map((c: any) => c.text || '').join(' ').trim();
      }
      return typeof msg.content === 'string' ? msg.content : '';
    });

  console.log('📊 User messages for extraction:', userMessages);

  // Extract country from conversation (typically 2nd user message)
  const country = userMessages[1]?.trim() || 'your target country';
  
  // Extract phone from conversation (typically 9th user message)
  // Phone pattern: look for digits
  let phone = 'your phone number';
  for (let i = 7; i < userMessages.length; i++) {
    const msg = userMessages[i];
    if (msg && /\d{3,}/.test(msg)) {
      phone = msg.trim();
      break;
    }
  }

  console.log('🌍 Extracted country:', country);
  console.log('📱 Extracted phone:', phone);

  return { country, phone };
}

export function ChatInterface() {
  const [input, setInput] = useState("");
  const [isConversationSaved, setIsConversationSaved] = useState(false);
  const [showCompletionCard, setShowCompletionCard] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { 
    chatMessages, 
    addConversationItem, 
    addChatMessage, 
    setAssistantLoading, 
    isAssistantLoading,
    resetConversation,
    currentPercentage
  } = useConversationStore();
  
  // Detect language from URL: /tr/sohbet = Turkish, /chat = English
  const isTurkish = pathname.startsWith('/tr');

  // Calculate progress data based on current phase and percentage from backend
  // New milestone percentages: Country=20%, Sales Channels=40%, Phone=60%, Competitors=80%, Demo=100%
  const progressData = {
    hasProduct: false, // Not used for milestones
    hasTargetMarket: currentPercentage >= 20,  // 20% milestone (target country)
    hasGtipCode: false, // Not used for milestones
    hasSalesChannels: currentPercentage >= 40,  // 40% milestone (sales channels)
    hasContactInfo: currentPercentage >= 60,  // 60% milestone (phone number)
    hasKeywords: false, // Not used for milestones
    hasCompetitors: currentPercentage >= 80,  // 80% milestone (competitors)
    hasCustomers: currentPercentage >= 100,  // 100% milestone (demo - both competitors and customers)
  };

  // Add initial greeting message when component loads
  const greetingAddedRef = useRef(false);
  
  useEffect(() => {
    // Only add greeting if no messages exist and we haven't added it yet
    if (chatMessages.length === 0 && !greetingAddedRef.current) {
      const greeting = isTurkish
        ? "Merhaba, hangi ürününüzün ihracatını arttırmak istersiniz?"
        : "Hello, which product would you like to increase exports for?";
      
      const initialMessage: Item = {
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: greeting }],
      };
      
      addChatMessage(initialMessage);
      greetingAddedRef.current = true;
    }
  // Only run once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Scroll only the messages container, not the entire page
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
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
          language: detectLanguageFromMessages(chatMessages),
          timestamp: new Date().toISOString()
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
    greetingAddedRef.current = false;
    
    // Add greeting message after reset
    setTimeout(() => {
      if (!greetingAddedRef.current) {
        const greeting = isTurkish
          ? "Merhaba, hangi ürününüzün ihracatını arttırmak istersiniz?"
          : "Hello, which product would you like to increase exports for?";
        
        const initialMessage: Item = {
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text: greeting }],
        };
        
        addChatMessage(initialMessage);
        greetingAddedRef.current = true;
      }
    }, 100);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-900 to-orange-500 text-white p-6 relative">
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
          <div 
            ref={messagesContainerRef}
            className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white scroll-smooth"
          >
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
                className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 px-6 shadow-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>

        {/* Progress Bar at Bottom */}
        <InformationCollectionBar 
          {...progressData} 
          language={isTurkish ? 'turkish' : 'english'} 
        />

        {/* Completion Card */}
        {showCompletionCard && (() => {
          const { country, phone } = extractConversationData(chatMessages);
          const language = detectLanguageFromMessages(chatMessages);
          const isEnglish = language === 'en';
          
          const calendlyLink = 'https://calendly.com/mehmet-odsdanismanlik/30min';
          
          return (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-lg bg-white shadow-2xl rounded-xl">
                <CardContent className="p-8">
                  <div className="flex flex-col space-y-6">
                    {/* Success Icon */}
                    <div className="flex justify-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="space-y-4">
                      {/* First Block - Request Received */}
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <p className="text-gray-800 text-sm leading-relaxed">
                          {isEnglish 
                            ? `We have received your request to find customers in ${country} to increase your exports.`
                            : `İhracatınızı artırmak için ${country} ülkesindeki müşteri bulma talebinizi aldık.`
                          }
                        </p>
                      </div>

                      {/* Second Block - Contact Options */}
                      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg space-y-3">
                        <p className="text-gray-800 text-sm font-medium">
                          {isEnglish 
                            ? 'How would you like us to contact you?'
                            : 'Sizinle nasıl iletişime geçelim?'
                          }
                        </p>
                        
                        {/* Option 1 - Phone Call */}
                        <div className="flex items-start space-x-2">
                          <span className="text-orange-600 font-bold">1.</span>
                          <p className="text-gray-700 text-sm">
                            {isEnglish 
                              ? `Call you at ${phone} to present these customers`
                              : `${phone} numaradan sizi arayıp müşterileri sunalım`
                            }
                          </p>
                        </div>

                        {/* Option 2 - Calendly */}
                        <div className="flex items-start space-x-2">
                          <span className="text-orange-600 font-bold">2.</span>
                          <div className="flex-1">
                            <p className="text-gray-700 text-sm mb-1">
                              {isEnglish 
                                ? 'Schedule a meeting yourself:'
                                : 'Kendiniz toplantı belirleyin:'
                              }
                            </p>
                            <a
                              href={calendlyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm underline break-all"
                            >
                              {calendlyLink}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        onClick={() => {
                          setShowCompletionCard(false);
                          resetConversation();
                          setIsConversationSaved(false);
                        }}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 text-white py-3"
                      >
                        {isEnglish ? 'Start New Conversation' : 'Yeni Görüşme Başlat'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowCompletionCard(false)}
                        className="flex-1 border-gray-300 hover:bg-gray-50 py-3"
                      >
                        {isEnglish ? 'Continue Viewing' : 'Görüntülemeye Devam Et'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })()}
      </Card>
    </div>
  );
}
