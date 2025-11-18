'use client';

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Circle, RotateCcw, Send } from "lucide-react";
import { Chat2Message } from "./chat2-message";
import { TypingIndicator } from "../chat/typing-indicator";
import { Chat2ConversationState, createInitialChat2State } from "@/config/chat2-constants";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export function Chat2Interface() {
  const pathname = usePathname();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationState, setConversationState] = useState<Chat2ConversationState>(createInitialChat2State());
  const [isDemoMessageShown, setIsDemoMessageShown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Detect language from URL: /tr/sohbet2 = Turkish, /chat2 = English
  const isTurkishFromUrl = pathname.startsWith('/tr');

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Detect demo message and save conversation (independent of phase!)
  useEffect(() => {
    // Check if demo message with Calendly link is shown
    const hasDemoMessage = messages.some(message => {
      if (message.role === 'assistant') {
        const contentLower = message.content.toLowerCase();
        return contentLower.includes('calendly.com');
      }
      return false;
    });

    // If demo message is shown and not yet saved
    if (hasDemoMessage && !isDemoMessageShown) {
      console.log('🎯 Demo message with Calendly link detected!');
      console.log('💾 Triggering database save...');
      setIsDemoMessageShown(true); // Set to 100% progress and mark as saved
      
      // Save to database
      (async () => {
        try {
          console.log('💾 Saving conversation to database...');
          console.log('📊 Conversation data:', conversationState.data);
          
          const response = await fetch('/api/conversations/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chatMessages: messages.map(m => ({
                type: 'message',
                role: m.role,
                content: [{ type: 'output_text', text: m.content }]
              })),
              language: conversationState.language === 'turkish' ? 'tr' : 'en',
              timestamp: new Date().toISOString(),
              structuredData: {
                product: conversationState.data.product,
                country: conversationState.data.country,
                gtipCode: conversationState.data.gtipCode,
                salesChannels: conversationState.data.salesChannels,
                website: conversationState.data.website,
                name: conversationState.data.name,
                email: conversationState.data.email,
                phone: conversationState.data.phone,
                keywords: conversationState.data.keywords,
                competitors: conversationState.data.competitors,
                customers: conversationState.data.customers
              }
            }),
          });

          if (response.ok) {
            const result = await response.json();
            console.log('✅ Conversation saved successfully:', result);
          } else {
            console.error('❌ Failed to save conversation');
          }
        } catch (error) {
          console.error('❌ Error saving conversation:', error);
        }
      })();
    }
  }, [messages, isDemoMessageShown, conversationState]);

  // Send initial message on mount - detect language from URL or browser
  useEffect(() => {
    // Prioritize URL language over browser language
    let isTurkish = isTurkishFromUrl;
    
    // If not Turkish URL, check browser language
    if (!isTurkishFromUrl) {
      const browserLang = navigator.language.toLowerCase();
      isTurkish = browserLang.startsWith('tr');
    }
    
    const initialMessage: Message = {
      id: 'initial',
      content: isTurkish 
        ? "Merhaba! Ben ITAI Export Assistant'ım. Türk şirketlerinin ihracatında uzman bir danışmanım.\n\nHangi ürünün ihracatını artırmak istiyorsunuz?"
        : "Hello! I'm ITAI Export Assistant. I'm an expert consultant for Turkish companies' exports.\n\nWhich product do you want to increase exports for?",
      role: 'assistant',
      timestamp: new Date()
    };
    
    // Set initial language
    setConversationState(prev => ({
      ...prev,
      language: isTurkish ? 'turkish' : 'english'
    }));
    
    setMessages([initialMessage]);
  }, [isTurkishFromUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('🚀 Sending request to API...');
      const response = await fetch('/api/chat2/turn_response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          conversationState
        }),
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ API Error:', errorData);
        throw new Error(errorData.message || `API returned ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Response data:', data);

      // Update conversation state
      if (data.conversationState) {
        setConversationState(data.conversationState);
        console.log('🔄 State updated:', data.conversationState);
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || 'Üzgünüm, yanıt alınamadı.',
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('❌ Error:', error);
      // Add error message with details
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Üzgünüm, bir hata oluştu: ${error.message || 'Bilinmeyen hata'}. Lütfen tekrar deneyin.`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    // Prioritize URL language over browser language
    let isTurkish = isTurkishFromUrl;
    
    // If not Turkish URL, check browser language
    if (!isTurkishFromUrl) {
      const browserLang = navigator.language.toLowerCase();
      isTurkish = browserLang.startsWith('tr');
    }
    
    setMessages([{
      id: 'initial',
      content: isTurkish 
        ? "Merhaba! Ben ITAI Export Assistant'ım. Türk şirketlerinin ihracatında uzman bir danışmanım.\n\nHangi ürünün ihracatını artırmak istiyorsunuz?"
        : "Hello! I'm ITAI Export Assistant. I'm an expert consultant for Turkish companies' exports.\n\nWhich product do you want to increase exports for?",
      role: 'assistant',
      timestamp: new Date()
    }]);
    
    const initialState = createInitialChat2State();
    initialState.language = isTurkish ? 'turkish' : 'english';
    setConversationState(initialState);
    setIsDemoMessageShown(false); // Reset demo detection
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
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Start exploring export opportunities with ITAI</p>
              </div>
            )}
            
            {messages.map((message) => (
              <Chat2Message
                key={message.id}
                content={message.content}
                role={message.role}
                timestamp={message.timestamp}
              />
            ))}
            
            {isLoading && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t bg-white">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as any);
                  }
                }}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !input.trim()}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-orange-600 hover:to-blue-800 px-6 shadow-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>

        {/* Progress Bar at Bottom */}
        <div className="px-6 py-3 bg-gray-50 border-t">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 font-medium">Progress</span>
            <span className="text-xs text-gray-600">
              {isDemoMessageShown ? 100 : Math.round(((conversationState.currentPhase - 1) / 11) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-blue-900 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${isDemoMessageShown ? 100 : ((conversationState.currentPhase - 1) / 11) * 100}%` 
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
