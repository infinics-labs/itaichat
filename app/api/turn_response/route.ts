import { getDeveloperPrompt, MODEL } from "@/config/constants";
import { getTools } from "@/lib/tools/tools";
import OpenAI from "openai";

// AI-powered message analysis function
async function analyzeUserMessage(text: string): Promise<{
  isProduct: boolean;
  productName?: string;
  language: 'turkish' | 'english';
  isGreeting: boolean;
}> {
  const openai = new OpenAI();
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a message analyzer for an export assistant. Analyze the user's message and respond with ONLY a JSON object.

Rules:
1. Determine if the message contains a product name (any exportable item: food, agricultural products, manufactured goods, etc.)
2. Detect the language (Turkish or English)
3. Check if it's a greeting message

Respond with this exact JSON format:
{
  "isProduct": boolean,
  "productName": "extracted product name or null",
  "language": "turkish" or "english",
  "isGreeting": boolean
}

Examples:
- "carrot" → {"isProduct": true, "productName": "carrot", "language": "english", "isGreeting": false}
- "havuç" → {"isProduct": true, "productName": "havuç", "language": "turkish", "isGreeting": false}
- "hello" → {"isProduct": false, "productName": null, "language": "english", "isGreeting": true}
- "merhaba" → {"isProduct": false, "productName": null, "language": "turkish", "isGreeting": true}
- "textile fabric" → {"isProduct": true, "productName": "textile fabric", "language": "english", "isGreeting": false}`
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0,
      max_tokens: 100
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    console.log("🤖 AI Message Analysis:", { input: text, result });
    
    return {
      isProduct: result.isProduct || false,
      productName: result.productName || undefined,
      language: result.language === 'english' ? 'english' : 'turkish',
      isGreeting: result.isGreeting || false
    };
  } catch (error) {
    console.error("❌ AI Analysis failed, using fallback:", error);
    
    // Fallback to simple detection if AI fails
    return {
      isProduct: false,
      productName: undefined,
      language: /[çğıöşüÇĞIİÖŞÜ]/.test(text) ? 'turkish' : 'english',
      isGreeting: /^(hello|hi|hey|merhaba|selam|iyi)/i.test(text.trim())
    };
  }
}

// Smart conversation analyzer based on user message patterns
function detectCountryFromConversation(messages: any[]): string | null {
  const userMessages = messages.filter(msg => msg.role === "user" && msg.content);
  
  console.log('🔍 ANALYZING USER MESSAGES FOR COUNTRY...');
  console.log(`👤 User messages: ${userMessages.map(msg => `"${msg.content}"`).join(', ')}`);
  
  // If we have 2+ user messages, the second one is likely the country response
  // Pattern: User says product → Assistant asks country → User says country
  if (userMessages.length >= 2) {
    const secondMessage = userMessages[1].content.trim();
    console.log(`🔍 ANALYZING SECOND USER MESSAGE AS POTENTIAL COUNTRY: "${secondMessage}"`);
    
    // Check if it's a reasonable country response (not too long, not a common rejection)
    if (secondMessage.length > 1 && secondMessage.length < 50 && 
        !secondMessage.toLowerCase().includes("don't know") &&
        !secondMessage.toLowerCase().includes("not sure") &&
        !secondMessage.toLowerCase().includes("no") &&
        !secondMessage.toLowerCase().includes("yes")) {
      console.log(`✅ DETECTED COUNTRY FROM USER MESSAGE PATTERN: "${secondMessage}"`);
      return secondMessage.toLowerCase();
    }
  }
  
  console.log(`❌ NO COUNTRY DETECTED FROM USER MESSAGE PATTERN`);
  return null;
}

function detectGtipFromConversation(messages: any[]): string | null {
  const userMessages = messages.filter(msg => msg.role === "user" && msg.content);
  
  console.log('🔍 ANALYZING USER MESSAGES FOR GTIP RESPONSE...');
  console.log(`👤 User messages: ${userMessages.map(msg => `"${msg.content}"`).join(', ')}`);
  
  // Look for GTIP-related responses in user messages
  // Pattern: User says product → country → GTIP response (no/yes)
  if (userMessages.length >= 3) {
    const thirdMessage = userMessages[2].content.toLowerCase().trim();
    console.log(`🔍 ANALYZING THIRD USER MESSAGE AS POTENTIAL GTIP RESPONSE: "${thirdMessage}"`);
    
    // Check for GTIP knowledge response
    if (thirdMessage.includes("no") || thirdMessage.includes("don't know") || thirdMessage.includes("hayır")) {
      console.log(`✅ DETECTED GTIP UNKNOWN FROM USER MESSAGE PATTERN`);
      return "unknown";
    } else if (thirdMessage.includes("yes") || thirdMessage.includes("know") || thirdMessage.includes("evet")) {
      console.log(`✅ DETECTED GTIP KNOWN FROM USER MESSAGE PATTERN`);
      return "known";
    }
  }
  
  // Look for GTIP acceptance in later messages
  if (userMessages.length >= 4) {
    const fourthMessage = userMessages[3].content.toLowerCase().trim();
    console.log(`🔍 ANALYZING FOURTH USER MESSAGE AS POTENTIAL GTIP ACCEPTANCE: "${fourthMessage}"`);
    
    if (fourthMessage.includes("yes") || fourthMessage.includes("use") || fourthMessage.includes("ok") || fourthMessage.includes("evet")) {
      console.log(`✅ DETECTED GTIP ACCEPTED FROM USER MESSAGE PATTERN`);
      return "accepted";
    } else if (fourthMessage.includes("no") || fourthMessage.includes("hayır")) {
      console.log(`❌ DETECTED GTIP REJECTED FROM USER MESSAGE PATTERN`);
      return "rejected";
    }
  }
  
  console.log(`❌ NO GTIP RESPONSE DETECTED FROM USER MESSAGE PATTERN`);
  return null;
}

function detectInfoFromConversation(messages: any[], questionType: string, patterns: any[] | null): string | null {
  const userMessages = messages.filter(msg => msg.role === "user" && msg.content);
  const allUserText = userMessages.map(msg => msg.content).join(" ").toLowerCase();
  
  console.log(`🔍 ANALYZING USER MESSAGES FOR ${questionType.toUpperCase()}...`);
  console.log(`👤 All user text: "${allUserText}"`);
  
  // If no patterns specified, look for any reasonable response after the expected position
  if (!patterns) {
    // For different info types, check different message positions
    const expectedPosition = getExpectedMessagePosition(questionType);
    if (userMessages.length > expectedPosition) {
      const responseMsg = userMessages[expectedPosition].content.trim();
      if (responseMsg.length > 0) {
        console.log(`✅ ${questionType.toUpperCase()} PROVIDED FROM USER MESSAGE PATTERN: "${responseMsg}"`);
        return "provided";
      }
    }
  } else {
    // Check if any user message matches the patterns
    for (const pattern of patterns) {
      if (typeof pattern === 'string') {
        if (allUserText.includes(pattern)) {
          console.log(`✅ ${questionType.toUpperCase()} PROVIDED FROM USER MESSAGE PATTERN (matched: ${pattern})`);
          return "provided";
        }
      } else if (pattern instanceof RegExp) {
        if (pattern.test(allUserText)) {
          console.log(`✅ ${questionType.toUpperCase()} PROVIDED FROM USER MESSAGE PATTERN (matched regex)`);
          return "provided";
        }
      }
    }
  }
  
  console.log(`❌ NO ${questionType.toUpperCase()} DETECTED FROM USER MESSAGE PATTERN`);
  return null;
}

function getExpectedMessagePosition(questionType: string): number {
  // Expected user message positions based on conversation flow
  const positions: { [key: string]: number } = {
    "sales channel": 4, // After product, country, gtip knowledge, gtip acceptance
    "website": 5,
    "name": 6,
    "email": 7,
    "phone": 8
  };
  return positions[questionType] || 5; // Default position
}

function detectKeywordsFromConversation(messages: any[]): string | null {
  const userMessages = messages.filter(msg => msg.role === "user" && msg.content);
  
  console.log('🔍 ANALYZING USER MESSAGES FOR KEYWORDS RESPONSE...');
  console.log(`👤 User messages: ${userMessages.map(msg => `"${msg.content}"`).join(', ')}`);
  
  // Look for keywords acceptance patterns in user messages
  // Keywords typically come after: product, country, gtip, sales channels, website, name, email, phone
  // So keywords response should be around message 9+
  
  for (let i = 8; i < userMessages.length; i++) { // Start from message 9 (index 8)
    const userMessage = userMessages[i].content.toLowerCase().trim();
    console.log(`🔍 ANALYZING USER MESSAGE ${i + 1} FOR KEYWORDS RESPONSE: "${userMessage}"`);
    
    // Check for positive keywords acceptance
    const positiveResponses = [
      "yes", "evet", "ok", "okay", "good", "iyi", "great", "perfect", 
      "describes", "tanımlar", "correct", "doğru", "right", "suitable", 
      "uygun", "fine", "tamam", "its describes", "they describe", 
      "yes its describes", "these are good", "bunlar iyi"
    ];
    
    const negativeResponses = [
      "no", "hayır", "not good", "iyi değil", "wrong", "yanlış", 
      "doesn't describe", "tanımlamıyor", "not suitable", "uygun değil",
      "change", "değiştir", "different", "farklı"
    ];
    
    // Check for positive acceptance
    for (const positive of positiveResponses) {
      if (userMessage.includes(positive)) {
        console.log(`✅ DETECTED KEYWORDS ACCEPTED FROM USER MESSAGE PATTERN (matched: "${positive}")`);
        return "accepted";
      }
    }
    
    // Check for negative rejection (which should still lead to new keywords and eventual acceptance)
    for (const negative of negativeResponses) {
      if (userMessage.includes(negative)) {
        console.log(`❌ DETECTED KEYWORDS REJECTED FROM USER MESSAGE PATTERN (matched: "${negative}")`);
        // Continue looking for acceptance in later messages after new keywords are suggested
        continue;
      }
    }
  }
  
  console.log(`❌ NO KEYWORDS RESPONSE DETECTED FROM USER MESSAGE PATTERN`);
  return null;
}

function detectCompetitorsFromConversation(messages: any[]): string | null {
  const userMessages = messages.filter(msg => msg.role === "user" && msg.content);
  
  console.log('🔍 ANALYZING USER MESSAGES FOR COMPETITORS RESPONSE...');
  console.log(`👤 User messages: ${userMessages.map(msg => `"${msg.content}"`).join(', ')}`);
  
  // Look for competitors response patterns in user messages
  // Competitors come after keywords, so should be around message 10+
  
  for (let i = 9; i < userMessages.length; i++) { // Start from message 10 (index 9)
    const userMessage = userMessages[i].content.toLowerCase().trim();
    console.log(`🔍 ANALYZING USER MESSAGE ${i + 1} FOR COMPETITORS RESPONSE: "${userMessage}"`);
    
    // Check for competitors response (yes/no to "keep a note")
    const acceptResponses = ["yes", "evet", "ok", "okay", "keep", "note", "save", "kaydet", "use", "can", "good", "sure"];
    const rejectResponses = ["no", "hayır", "don't", "not", "skip", "don't want"];
    
    // Check for acceptance
    for (const accept of acceptResponses) {
      if (userMessage.includes(accept)) {
        console.log(`✅ DETECTED COMPETITORS ACCEPTED FROM USER MESSAGE PATTERN (matched: "${accept}")`);
        return "accepted";
      }
    }
    
    // Check for rejection
    for (const reject of rejectResponses) {
      if (userMessage.includes(reject)) {
        console.log(`❌ DETECTED COMPETITORS REJECTED FROM USER MESSAGE PATTERN (matched: "${reject}")`);
        return "rejected";
      }
    }
  }
  
  console.log(`❌ NO COMPETITORS RESPONSE DETECTED FROM USER MESSAGE PATTERN`);
  return null;
}

function detectCustomersFromConversation(messages: any[]): string | null {
  const userMessages = messages.filter(msg => msg.role === "user" && msg.content);
  
  console.log('🔍 ANALYZING USER MESSAGES FOR CUSTOMERS RESPONSE...');
  console.log(`👤 User messages: ${userMessages.map(msg => `"${msg.content}"`).join(', ')}`);
  
  // Look for customers response patterns in user messages
  // Customers come after competitors, so should be around message 11+
  
  for (let i = 10; i < userMessages.length; i++) { // Start from message 11 (index 10)
    const userMessage = userMessages[i].content.toLowerCase().trim();
    console.log(`🔍 ANALYZING USER MESSAGE ${i + 1} FOR CUSTOMERS RESPONSE: "${userMessage}"`);
    
    // Check for customers response (yes/no to "keep a note")
    const acceptResponses = ["yes", "evet", "ok", "okay", "keep", "note", "save", "kaydet", "use", "can", "good", "sure"];
    const rejectResponses = ["no", "hayır", "don't", "not", "skip", "don't want"];
    
    // Check for acceptance
    for (const accept of acceptResponses) {
      if (userMessage.includes(accept)) {
        console.log(`✅ DETECTED CUSTOMERS ACCEPTED FROM USER MESSAGE PATTERN (matched: "${accept}")`);
        return "accepted";
      }
    }
    
    // Check for rejection
    for (const reject of rejectResponses) {
      if (userMessage.includes(reject)) {
        console.log(`❌ DETECTED CUSTOMERS REJECTED FROM USER MESSAGE PATTERN (matched: "${reject}")`);
        return "rejected";
      }
    }
  }
  
  console.log(`❌ NO CUSTOMERS RESPONSE DETECTED FROM USER MESSAGE PATTERN`);
  return null;
}

// Advanced conversation context analyzer - analyzes full conversation including bot messages
function analyzeFullConversation(messages: any[]): any {
  console.log('🔍 ADVANCED CONVERSATION ANALYSIS - Analyzing full conversation context...');
  console.log(`📊 Total messages: ${messages.length}`);
  
  // Debug: Show all messages and their roles
  console.log('📋 ALL MESSAGES RECEIVED:');
  messages.forEach((msg, index) => {
    console.log(`  [${index}] Role: ${msg?.role || 'undefined'}, Type: ${msg?.type || 'undefined'}`);
    if (msg?.content) {
      const content = typeof msg.content === 'string' ? msg.content : 
                     Array.isArray(msg.content) ? msg.content.map((c: any) => c.text || c).join(' ') : 'complex';
      console.log(`       Content: "${content.substring(0, 80)}..."`);
    }
  });
  
  const analysis: any = {
    gtip: null,
    salesChannels: null,
    website: null,
    name: null,
    email: null,
    phone: null,
    keywords: null
  };
  
  // Helper function to extract text content from message
  function extractMessageContent(msg: any): string {
    if (!msg) return '';
    
    // Handle different message formats
    if (typeof msg.content === 'string') {
      return msg.content;
    }
    
    if (Array.isArray(msg.content)) {
      return msg.content.map((c: any) => {
        if (typeof c === 'string') return c;
        if (c.text) return c.text;
        if (c.type === 'output_text' && c.text) return c.text;
        return '';
      }).join(' ').trim();
    }
    
    return '';
  }
  
  // Create conversation pairs: [assistant question] → [user response]
  const conversationPairs = [];
  
  for (let i = 0; i < messages.length - 1; i++) {
    const currentMsg = messages[i];
    const nextMsg = messages[i + 1];
    
    // More flexible message filtering - check for role instead of type
    if (!currentMsg || !currentMsg.role || !nextMsg || !nextMsg.role) {
      continue;
    }
    
    // Look for assistant → user pairs
    if (currentMsg.role === "assistant" && nextMsg.role === "user") {
      const question = extractMessageContent(currentMsg);
      const response = extractMessageContent(nextMsg);
      
      console.log(`🔍 POTENTIAL PAIR FOUND: Assistant[${i}] → User[${i+1}]`);
      console.log(`   Question: "${question.substring(0, 100)}..."`);
      console.log(`   Response: "${response.substring(0, 50)}..."`);
      
      if (question && response) {
        conversationPairs.push({
          question: question,
          response: response,
          questionIndex: i,
          responseIndex: i + 1
        });
        console.log(`✅ PAIR ADDED: Total pairs now: ${conversationPairs.length}`);
      } else {
        console.log(`❌ PAIR SKIPPED: Empty question or response`);
      }
    }
  }
  
  console.log(`🔗 Found ${conversationPairs.length} conversation pairs`);
  
  // Analyze each conversation pair
  for (const pair of conversationPairs) {
    const question = pair.question.toLowerCase();
    const response = pair.response.toLowerCase();
    
    console.log(`🔍 ANALYZING PAIR: Q: "${question.substring(0, 50)}..." → R: "${response}"`);
    
    // GTIP Analysis - Extract actual GTIP codes and handle different scenarios
    if (!analysis.gtip && (question.includes("gtip") || question.includes("hs code"))) {
      
      // Scenario 1: Bot asks "Do you know your GTIP code?" 
      if (question.includes("do you know") || question.includes("biliyor musunuz")) {
        // Check if user provided a GTIP code in their response
        const gtipMatch = response.match(/\b\d{4,8}\b/); // Match 4-8 digit codes
        
        if (gtipMatch) {
          // User provided their own GTIP code
          analysis.gtip = {
            code: gtipMatch[0],
            source: "user_provided",
            status: "provided"
          };
          console.log(`✅ GTIP PROVIDED BY USER: User gave GTIP code "${gtipMatch[0]}"`);
        } else if (response.includes("yes") || response.includes("evet") || response.includes("know")) {
          // User says they know but didn't provide code in this message
          analysis.gtip = {
            code: null,
            source: "user_knows",
            status: "knows_but_not_provided"
          };
          console.log(`✅ GTIP KNOWLEDGE: User knows GTIP but didn't provide it yet: "${response}"`);
        } else {
          // User doesn't know GTIP code
          analysis.gtip = {
            code: null,
            source: "user_unknown",
            status: "unknown"
          };
          console.log(`❌ GTIP UNKNOWN: User doesn't know GTIP code: "${response}"`);
        }
      } 
      
      // Scenario 2: Bot suggests GTIP code "Shall we use GTIP code 123456?"
      else if (question.includes("shall we use") || question.includes("kullanalım mı") || 
               question.includes("use this gtip") || question.includes("use gtip")) {
        
        // Extract the suggested GTIP code from the bot's question
        const suggestedGtipMatch = question.match(/\b\d{4,8}\b/);
        const positiveWords = ["yes", "evet", "ok", "okay", "use", "can", "sure", "yep", "yeah", "good"];
        const negativeWords = ["no", "hayır", "don't", "not"];
        
        const hasPositive = positiveWords.some(word => response.includes(word));
        const hasNegative = negativeWords.some(word => response.includes(word));
        
        if (hasPositive && suggestedGtipMatch) {
          // User accepted the suggested GTIP code
          analysis.gtip = {
            code: suggestedGtipMatch[0],
            source: "bot_suggested_accepted",
            status: "accepted"
          };
          console.log(`✅ GTIP ACCEPTED: User accepted bot's suggested GTIP code "${suggestedGtipMatch[0]}": "${response}"`);
        } else if (hasNegative) {
          // User rejected the suggested GTIP code
          analysis.gtip = {
            code: null,
            source: "bot_suggested_rejected", 
            status: "rejected"
          };
          console.log(`❌ GTIP REJECTED: User rejected bot's suggested GTIP code: "${response}"`);
        } else {
          // Any other response - still complete the phase but unclear status
          analysis.gtip = {
            code: suggestedGtipMatch ? suggestedGtipMatch[0] : null,
            source: "bot_suggested_unclear",
            status: "unclear_response"
          };
          console.log(`❓ GTIP UNCLEAR: User gave unclear response to GTIP suggestion: "${response}"`);
        }
      }
    }
    
    // Sales Channels Analysis - ANY response completes the phase
    if (!analysis.salesChannels && (question.includes("sales channel") || question.includes("satış kanal"))) {
      // ANY response to sales channels question completes the phase
      if (response.trim().length > 0) {
        analysis.salesChannels = "provided";
        console.log(`✅ SALES CHANNELS COMPLETED: User responded: "${response}"`);
      }
    }
    
    // Website Analysis - ANY response completes the phase
    if (!analysis.website && (question.includes("website") || question.includes("websiten"))) {
      // ANY response to website question completes the phase
      if (response.trim().length > 0) {
        analysis.website = "provided";
        console.log(`✅ WEBSITE COMPLETED: User responded: "${response}"`);
      }
    }
    
    // Name Analysis - ANY response completes the phase
    if (!analysis.name && (question.includes("name") || question.includes("isim"))) {
      // ANY response to name question completes the phase
      if (response.trim().length > 0) {
        analysis.name = "provided";
        console.log(`✅ NAME COMPLETED: User responded: "${response}"`);
      }
    }
    
    // Email Analysis - ANY response completes the phase
    if (!analysis.email && (question.includes("email") || question.includes("e-posta"))) {
      // ANY response to email question completes the phase
      if (response.trim().length > 0) {
        analysis.email = "provided";
        console.log(`✅ EMAIL COMPLETED: User responded: "${response}"`);
      }
    }
    
    // Phone Analysis - ANY response completes the phase
    if (!analysis.phone && (question.includes("phone") || question.includes("telefon"))) {
      // ANY response to phone question completes the phase
      if (response.trim().length > 0) {
        analysis.phone = "provided";
        console.log(`✅ PHONE COMPLETED: User responded: "${response}"`);
      }
    }
    
    // Keywords Analysis - ANY response completes the phase
    if (!analysis.keywords && (question.includes("keywords") || question.includes("anahtar"))) {
      // ANY response to keywords question completes the phase
      if (response.trim().length > 0) {
        const positiveWords = ["yes", "evet", "good", "iyi", "ok", "describes", "tanımlar", "perfect", "suitable", "right", "correct", "yep", "yeah"];
        const negativeWords = ["no", "hayır", "not good", "wrong", "change", "different"];
        
        const hasPositive = positiveWords.some(word => response.includes(word));
        const hasNegative = negativeWords.some(word => response.includes(word));
        
        if (hasPositive) {
          analysis.keywords = "accepted";
          console.log(`✅ KEYWORDS ACCEPTED: User accepted keywords: "${response}"`);
        } else if (hasNegative) {
          analysis.keywords = "rejected";
          console.log(`❌ KEYWORDS REJECTED: User rejected keywords: "${response}"`);
        } else {
          // Any other response still completes the phase
          analysis.keywords = "responded";
          console.log(`✅ KEYWORDS COMPLETED: User responded: "${response}"`);
        }
      }
    }
  }
  
  console.log('🎯 ADVANCED ANALYSIS RESULTS:', analysis);
  return analysis;
}

// Smart phase system based on collected vs suggested information
// Smart phase detection based on what the bot is currently asking
function detectCurrentPhaseFromBotQuestion(messages: any[]): { step: number; phase: string; progress: number } {
  console.log('🔍 BOT-QUESTION-BASED PHASE DETECTION - Analyzing what bot is asking...');
  console.log(`📊 Total messages received: ${messages.length}`);
  
  // Helper function to extract text content from message
  function extractMessageContent(msg: any): string {
    if (!msg) return '';
    
    if (typeof msg.content === 'string') {
      return msg.content;
    }
    
    if (Array.isArray(msg.content)) {
      return msg.content.map((c: any) => {
        if (typeof c === 'string') return c;
        if (c.text) return c.text;
        if (c.type === 'output_text' && c.text) return c.text;
        return '';
      }).join(' ').trim();
    }
    
    return '';
  }
  
  // Find the last assistant message to understand current phase
  let lastAssistantMessage = '';
  let assistantMessageCount = 0;
  
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    // More flexible filtering - check for role instead of type
    if (msg && msg.role === 'assistant') {
      assistantMessageCount++;
      if (!lastAssistantMessage) {
        lastAssistantMessage = extractMessageContent(msg).toLowerCase();
        console.log(`🤖 Found assistant message at index ${i}: "${lastAssistantMessage.substring(0, 100)}..."`);
        break;
      }
    }
  }
  
  console.log(`📊 Total assistant messages found: ${assistantMessageCount}`);
  
  console.log(`🤖 Last bot question: "${lastAssistantMessage.substring(0, 100)}..."`);
  
  // Phase detection based on bot's current question
  if (!lastAssistantMessage) {
    console.log('🎯 NO BOT MESSAGE YET - Analyzing user context to predict next bot question...');
    
    // If no bot messages yet, predict what the bot SHOULD ask next based on user messages
    const userMessages = messages.filter(msg => msg && msg.role === 'user');
    console.log(`👤 Found ${userMessages.length} user messages for context analysis`);
    
    if (userMessages.length >= 4) {
      // User has provided: product, country, GTIP response, and more
      console.log('🎯 USER PROVIDED 4+ MESSAGES - Bot should ask about SALES_CHANNELS next');
      return { step: 3, phase: 'SALES_CHANNELS', progress: 25 };
    } else if (userMessages.length >= 3) {
      // User has provided: product, country, and GTIP response
      console.log('🎯 USER PROVIDED 3 MESSAGES - Bot should ask about SALES_CHANNELS next');
      return { step: 3, phase: 'SALES_CHANNELS', progress: 25 };
    } else if (userMessages.length >= 2) {
      // User has provided: product and country
      console.log('🎯 USER PROVIDED 2 MESSAGES - Bot should ask about GTIP next');
      return { step: 2, phase: 'GTIP', progress: 20 };
    } else if (userMessages.length >= 1) {
      // User has provided: product only
      console.log('🎯 USER PROVIDED 1 MESSAGE - Bot should ask about COUNTRY next');
      return { step: 1, phase: 'COUNTRY', progress: 10 };
        } else {
      // No user messages yet
      console.log('🎯 NO USER MESSAGES YET - Phase: INITIAL');
      return { step: 0, phase: 'INITIAL', progress: 0 };
    }
  }
  
  // GTIP Phase Detection (20% progress)
  if (lastAssistantMessage.includes('gtip') || lastAssistantMessage.includes('hs code') || 
      lastAssistantMessage.includes('shall we use') || lastAssistantMessage.includes('kullanalım mı')) {
    console.log('🎯 BOT IS ASKING ABOUT GTIP - Phase: GTIP (20%)');
    return { step: 2, phase: 'GTIP', progress: 20 };
  }
  
  // Sales Channels Phase Detection (25% progress)
  const salesChannelsKeywords = [
    'sales channel', 'satış kanal', 'wholesaler', 'importer', 'distributor', 
    'toptan', 'perakende', 'retail', 'what sales', 'hangi satış',
    'channels do you use', 'kanal kullan', 'selling method', 'satış yöntemi',
    'how do you sell', 'nasıl satıyorsunuz', 'distribution channel', 'dağıtım kanalı'
  ];
  
  const hasSalesChannelsKeyword = salesChannelsKeywords.some(keyword => lastAssistantMessage.includes(keyword));
  const hasExampleWithChannels = lastAssistantMessage.includes('for example') && 
    (lastAssistantMessage.includes('wholesaler') || lastAssistantMessage.includes('importer') || lastAssistantMessage.includes('distributor'));
  
  if (hasSalesChannelsKeyword || hasExampleWithChannels) {
    console.log('🎯 BOT IS ASKING ABOUT SALES CHANNELS - Phase: SALES_CHANNELS (25%)');
    console.log('🛒 SALES CHANNELS DETECTED - Bot is suggesting sales channel options to user');
    console.log(`🔍 Matched keywords: ${salesChannelsKeywords.filter(k => lastAssistantMessage.includes(k)).join(', ')}`);
    return { step: 3, phase: 'SALES_CHANNELS', progress: 25 };
  }
  
  // Website Phase Detection (40% progress)
  if (lastAssistantMessage.includes('website') || lastAssistantMessage.includes('websiten') ||
      lastAssistantMessage.includes('web site') || lastAssistantMessage.includes('domain')) {
    console.log('🎯 BOT IS ASKING ABOUT WEBSITE - Phase: WEBSITE (40%)');
    return { step: 4, phase: 'WEBSITE', progress: 40 };
  }
  
  // Name Phase Detection
  if (lastAssistantMessage.includes('name') || lastAssistantMessage.includes('isim') ||
      lastAssistantMessage.includes('your name') || lastAssistantMessage.includes('adınız')) {
    console.log('🎯 BOT IS ASKING ABOUT NAME - Phase: NAME');
    return { step: 5, phase: 'NAME', progress: 45 };
  }
  
  // Email Phase Detection
  if (lastAssistantMessage.includes('email') || lastAssistantMessage.includes('e-posta') ||
      lastAssistantMessage.includes('mail') || lastAssistantMessage.includes('corporate email')) {
    console.log('🎯 BOT IS ASKING ABOUT EMAIL - Phase: EMAIL');
    return { step: 6, phase: 'EMAIL', progress: 50 };
  }
  
  // Phone Phase Detection
  if (lastAssistantMessage.includes('phone') || lastAssistantMessage.includes('telefon') ||
      lastAssistantMessage.includes('number') || lastAssistantMessage.includes('numara')) {
    console.log('🎯 BOT IS ASKING ABOUT PHONE - Phase: PHONE');
    return { step: 7, phase: 'PHONE', progress: 55 };
  }
  
  // Keywords Phase Detection (60% progress)
  if (lastAssistantMessage.includes('keyword') || lastAssistantMessage.includes('anahtar') ||
      lastAssistantMessage.includes('describe') || lastAssistantMessage.includes('tanımlar')) {
    console.log('🎯 BOT IS ASKING ABOUT KEYWORDS - Phase: KEYWORDS (60%)');
    return { step: 8, phase: 'KEYWORDS', progress: 60 };
  }
  
  // Competitors Phase Detection (80% progress)
  if (lastAssistantMessage.includes('competitor') || lastAssistantMessage.includes('rakip') ||
      lastAssistantMessage.includes('competition') || lastAssistantMessage.includes('keep a note')) {
    console.log('🎯 BOT IS ASKING ABOUT COMPETITORS - Phase: COMPETITORS (80%)');
    return { step: 9, phase: 'COMPETITORS', progress: 80 };
  }
  
  // Customers Phase Detection
  if (lastAssistantMessage.includes('customer') || lastAssistantMessage.includes('müşteri') ||
      lastAssistantMessage.includes('potential customer') || lastAssistantMessage.includes('potansiyel müşteri')) {
    console.log('🎯 BOT IS ASKING ABOUT CUSTOMERS - Phase: CUSTOMERS');
    return { step: 10, phase: 'CUSTOMERS', progress: 90 };
  }
  
  // Demo Phase Detection (100% progress)
  if (lastAssistantMessage.includes('demo') || lastAssistantMessage.includes('meeting') ||
      lastAssistantMessage.includes('call') || lastAssistantMessage.includes('schedule') ||
      lastAssistantMessage.includes('calendly') || lastAssistantMessage.includes('summary')) {
    console.log('🎯 BOT IS ASKING ABOUT DEMO/MEETING - Phase: DEMO (100%)');
    return { step: 11, phase: 'DEMO', progress: 100 };
  }
  
  // Country Phase Detection (if asking about country)
  if (lastAssistantMessage.includes('country') || lastAssistantMessage.includes('ülke') ||
      lastAssistantMessage.includes('which country') || lastAssistantMessage.includes('hangi ülke')) {
    console.log('🎯 BOT IS ASKING ABOUT COUNTRY - Phase: COUNTRY');
    return { step: 1, phase: 'COUNTRY', progress: 10 };
  }
  
  // Default: Try to detect from conversation flow
  console.log('🎯 COULD NOT DETECT FROM BOT QUESTION - Using fallback detection');
  return { step: 0, phase: 'INITIAL', progress: 0 };
}

function getConversationPhase(messages: any[], collectedInfo: any): { phase: string; step: number; progress: number } {
  console.log('🔍 SMART PHASE ANALYSIS - Using bot-question-based detection...');
  
  // Use bot-question-based detection first (PRIMARY METHOD - ALWAYS TAKES PRIORITY)
  const botPhaseDetection = detectCurrentPhaseFromBotQuestion(messages);
  
  // If bot is asking ANY question, use that phase detection (this is the most reliable)
  if (botPhaseDetection.phase && botPhaseDetection.phase !== 'INITIAL') {
    console.log(`🎯 BOT-BASED DETECTION SUCCESS: Step ${botPhaseDetection.step}/12 - ${botPhaseDetection.phase} (${botPhaseDetection.progress}%)`);
    console.log(`🚀 USING BOT DETECTION - Bot is asking about ${botPhaseDetection.phase}, so we are in ${botPhaseDetection.phase} phase!`);
    return { 
      phase: botPhaseDetection.phase, 
      step: botPhaseDetection.step, 
      progress: botPhaseDetection.progress 
    };
  }
  
  // Fallback to information-based detection (SECONDARY METHOD)
  console.log('🔄 FALLBACK: Using information-based detection...');
  const userMessages = messages.filter(msg => msg.role === "user" && msg.content);
  const assistantMessages = messages.filter(msg => msg.role === "assistant" && msg.content);
  
  console.log(`👤 User messages: ${userMessages.length}, 🤖 Assistant messages: ${assistantMessages.length}`);
  
  // Define information collection phases
  const infoPhases = [
    { name: "PRODUCT", type: "collect", has: !!collectedInfo.product, step: 0, progress: 5 },
    { name: "COUNTRY", type: "collect", has: !!collectedInfo.country, step: 1, progress: 10 },
    { name: "GTIP", type: "suggest", has: !!collectedInfo.gtip, step: 2, progress: 20 },
    { name: "SALES_CHANNELS", type: "suggest", has: !!collectedInfo.salesChannels, step: 3, progress: 25 },
    { name: "WEBSITE", type: "collect", has: !!collectedInfo.website, step: 4, progress: 40 },
    { name: "NAME", type: "collect", has: !!collectedInfo.name, step: 5, progress: 45 },
    { name: "EMAIL", type: "collect", has: !!collectedInfo.email, step: 6, progress: 50 },
    { name: "PHONE", type: "collect", has: !!collectedInfo.phone, step: 7, progress: 55 },
    { name: "KEYWORDS", type: "suggest", has: !!collectedInfo.keywords, step: 8, progress: 60 },
    { name: "COMPETITORS", type: "suggest", has: !!collectedInfo.competitors, step: 9, progress: 80 },
    { name: "CUSTOMERS", type: "suggest", has: !!collectedInfo.customers, step: 10, progress: 90 },
    { name: "DEMO", type: "final", has: false, step: 11, progress: 100 }
  ];
  
  // Find the first missing information
  let currentStep = 0;
  let currentPhase = "INITIAL";
  let currentProgress = 0;
  
  for (let i = 0; i < infoPhases.length; i++) {
    const phase = infoPhases[i];
    
    if (phase.has) {
      console.log(`✅ ${phase.name} (${phase.type}): COLLECTED`);
      currentStep = phase.step + 1;
      currentPhase = i < infoPhases.length - 1 ? infoPhases[i + 1].name : "DEMO";
      currentProgress = i < infoPhases.length - 1 ? infoPhases[i + 1].progress : 100;
    } else {
      console.log(`❌ ${phase.name} (${phase.type}): MISSING - This is our current phase`);
      currentStep = phase.step;
      currentPhase = phase.name;
      currentProgress = phase.progress;
      break;
    }
  }
  
  console.log(`🎯 FALLBACK PHASE RESULT: Step ${currentStep}/12 - ${currentPhase} (${currentProgress}%)`);
  return { phase: currentPhase, step: currentStep, progress: currentProgress };
}

// Simplified conversation state using efficient phase system
async function getConversationState(messages: any[]) {
  console.log('🚀 CONVERSATION STATE ANALYSIS STARTING...');
  console.log(`📊 Total messages: ${messages.length}`);
  
  // Extract ALL information from conversation (both collected and suggested)
  const userMessages = messages.filter(msg => msg.role === "user" && msg.content);
  const assistantMessages = messages.filter(msg => msg.role === "assistant" && msg.content);
  const allUserText = userMessages.map(msg => msg.content).join(" ").toLowerCase();
  const allAssistantText = assistantMessages.map(msg => 
    typeof msg.content === 'string' ? msg.content : ''
  ).join(" ").toLowerCase();
  
  const collectedInfo: any = {
    // COLLECTED from user
    product: null,
    country: null, 
    website: null,
    name: null,
    email: null,
    phone: null,
    
    // SUGGESTED by assistant and accepted/rejected by user
    gtip: null,
    salesChannels: null, 
    keywords: null,
    competitors: null,
    customers: null
  };
  
  console.log('📊 EXTRACTING INFORMATION FROM CONVERSATION...');
  
  // 1. PRODUCT (collect from user)
  for (const userMsg of userMessages) {
    if (!collectedInfo.product) {
      try {
        const analysis = await analyzeUserMessage(userMsg.content);
        if (analysis.isProduct && analysis.productName) {
          collectedInfo.product = analysis.productName;
          console.log(`📦 PRODUCT COLLECTED: "${analysis.productName}"`);
          break;
        }
      } catch (error) {
        // Ignore errors
      }
    }
  }
  
  // 2. COUNTRY (collect from user) - Smart detection from conversation flow
  collectedInfo.country = detectCountryFromConversation(messages);
  if (collectedInfo.country) {
    console.log(`🌍 COUNTRY COLLECTED: "${collectedInfo.country}"`);
  }
  
  // 3-9. ADVANCED CONVERSATION CONTEXT ANALYSIS
  // Analyze the full conversation to detect completed phases
  const conversationAnalysis = analyzeFullConversation(messages);
  
  collectedInfo.gtip = conversationAnalysis.gtip;
  collectedInfo.salesChannels = conversationAnalysis.salesChannels;
  collectedInfo.website = conversationAnalysis.website;
  collectedInfo.name = conversationAnalysis.name;
  collectedInfo.email = conversationAnalysis.email;
  collectedInfo.phone = conversationAnalysis.phone;
  collectedInfo.keywords = conversationAnalysis.keywords;
  
  // Log what was detected
  if (collectedInfo.gtip) {
    if (typeof collectedInfo.gtip === 'object') {
      console.log(`🔢 GTIP ${collectedInfo.gtip.status.toUpperCase()}: Code="${collectedInfo.gtip.code || 'none'}", Source="${collectedInfo.gtip.source}"`);
    } else {
      console.log(`🔢 GTIP ${collectedInfo.gtip.toUpperCase()}`);
    }
  }
  if (collectedInfo.salesChannels) console.log(`🛒 SALES CHANNELS ${collectedInfo.salesChannels.toUpperCase()}`);
  if (collectedInfo.website) console.log(`🌐 WEBSITE ${collectedInfo.website.toUpperCase()}`);
  if (collectedInfo.name) console.log(`👤 NAME ${collectedInfo.name.toUpperCase()}`);
  if (collectedInfo.email) console.log(`📧 EMAIL ${collectedInfo.email.toUpperCase()}`);
  if (collectedInfo.phone) console.log(`📱 PHONE ${collectedInfo.phone.toUpperCase()}`);
  if (collectedInfo.keywords) console.log(`🔑 KEYWORDS ${collectedInfo.keywords.toUpperCase()}`);
  
  // 10. COMPETITORS (suggested by assistant, check if user responded) - Smart detection from user messages
  collectedInfo.competitors = detectCompetitorsFromConversation(messages);
  if (collectedInfo.competitors) {
    console.log(`🏢 COMPETITORS ${collectedInfo.competitors.toUpperCase()} by user`);
  }
  
  // 11. CUSTOMERS (suggested by assistant, check if user responded) - Smart detection from user messages  
  collectedInfo.customers = detectCustomersFromConversation(messages);
  if (collectedInfo.customers) {
    console.log(`👥 CUSTOMERS ${collectedInfo.customers.toUpperCase()} by user`);
  }
  
  // Now get phase info with collected information
  const phaseInfo = getConversationPhase(messages, collectedInfo);
  
  const state: any = {
    detectedLanguage: 'turkish', // Default to Turkish
    userStartedWithProduct: !!collectedInfo.product,
    currentPhase: phaseInfo.phase,
    currentStep: phaseInfo.step,
    progress: phaseInfo.progress || 0,
    product: collectedInfo.product,
    country: collectedInfo.country,
    // Add all collected information
    collectedInfo: collectedInfo
  };
  
  console.log(`📍 PHASE INFO: Step ${phaseInfo.step}/12 - ${phaseInfo.phase} (${phaseInfo.progress || 0}%)`);

  // Detect language from first message
  if (userMessages.length > 0) {
    const firstMessage = userMessages[0].content;
    console.log(`🔤 ANALYZING FIRST MESSAGE FOR LANGUAGE: "${firstMessage}"`);
    
    try {
      const analysis = await analyzeUserMessage(firstMessage);
      state.detectedLanguage = analysis.language;
      console.log(`🌐 LANGUAGE DETECTED: ${analysis.language}`);
    } catch (error) {
      console.log(`⚠️  AI ANALYSIS FAILED, USING FALLBACK`);
      state.detectedLanguage = /[çğıöşüÇĞIİÖŞÜ]/.test(allUserText) ? 'turkish' : 'english';
      console.log(`🌐 FALLBACK LANGUAGE DETECTED: ${state.detectedLanguage}`);
    }
  }

  console.log('🎯 FINAL CONVERSATION STATE:', {
    step: state.currentStep,
    phase: state.currentPhase,
    language: state.detectedLanguage,
    product: state.product || 'None',
    country: state.country || 'None',
    userStartedWithProduct: state.userStartedWithProduct
  });

  return state;
}


export async function POST(request: Request) {
  try {
    const { messages, toolsState } = await request.json();

    const tools = await getTools(toolsState);

    console.log("🚀 ITAI EXPORT ASSISTANT - API REQUEST RECEIVED");
    console.log("Tools:", tools);
    console.log("Received messages count:", messages?.length || 0);

    // Debug: Log message structure to understand the format
    if (messages && messages.length > 0) {
      console.log("🔍 MESSAGE STRUCTURE DEBUG:");
      messages.forEach((msg: any, index: number) => {
        console.log(`  [${index}] Type: ${msg.type}, Role: ${msg.role}`);
        if (msg.content) {
      if (typeof msg.content === 'string') {
            console.log(`       Content: "${msg.content.substring(0, 50)}..."`);
      } else if (Array.isArray(msg.content)) {
            console.log(`       Content Array: ${msg.content.length} items`);
            msg.content.forEach((c: any, i: number) => {
              if (c.text) {
                console.log(`         [${i}] Text: "${c.text.substring(0, 50)}..."`);
              }
    });
      }
    }
      });
    }

    // Get conversation state for flow guidance
    const conversationState = await getConversationState(messages);
    
    // Efficient phase debugging
    const phaseEmojis = ["🏁", "📦", "🌍", "🔢", "🛒", "🌐", "👤", "📧", "📱", "🔑", "🏢", "👥", "📅"];
    const phaseNames = ["INITIAL", "PRODUCT", "COUNTRY", "GTIP", "SALES_CHANNELS", "WEBSITE", "NAME", "EMAIL", "PHONE", "KEYWORDS", "COMPETITORS", "CUSTOMERS", "DEMO"];
    
    const currentStep = conversationState.currentStep || 0;
    const currentPhase = conversationState.currentPhase || "INITIAL";
    const progress = conversationState.progress || 0;
    const emoji = phaseEmojis[currentStep] || "💬";
    const phaseName = currentPhase; // Use actual phase name, not array lookup
    
    console.log(`📍 CURRENT PHASE: ${emoji} Step ${currentStep}/12 - ${phaseName} (${progress}%)`);
    console.log(`🌐 Language: ${conversationState.detectedLanguage}`);
    console.log(`📦 Product: ${conversationState.product || 'None'}`);
    console.log(`🌍 Country: ${conversationState.country || 'None'}`);
    console.log(`🚀 User Started with Product: ${conversationState.userStartedWithProduct ? 'Yes' : 'No'}`);
    console.log(`📊 Information Collection Progress: ${progress}%`);
    
    // Show what should happen next based on current step
    const nextSteps = [
      "🏁 Ready to start - Ask for product name",
      "📦 Ask for target country", 
      "🌍 Ask for GTIP code",
      "🔢 Ask for sales channels",
      "🛒 Ask for website",
      "🌐 Ask for name",
      "👤 Ask for email",
      "📧 Ask for phone",
      "📱 Show keywords and ask for confirmation",
      "🔑 Show 2 competitors and ask to keep note",
      "🏢 Show 2 customers and ask to keep note",
      "👥 Offer demo and provide summary",
      "📅 Conversation complete!"
    ];
    
    const nextStep = Math.min(currentStep, nextSteps.length - 1);
    console.log(`⏭️  NEXT ACTION: ${nextSteps[nextStep]}`);

    const openai = new OpenAI();

    // Add system message to the beginning of messages array
    const systemMessage = {
      role: "system" as const,
      content: getDeveloperPrompt(conversationState)
    };
    const allMessages = [systemMessage, ...messages];

    const events = await openai.chat.completions.create({
      model: MODEL,
      messages: allMessages,
      tools: tools.filter(tool => tool.type === 'function').map(tool => ({
        type: 'function' as const,
        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.parameters,
          strict: tool.strict
        }
      })),
      stream: true,
      parallel_tool_calls: false,
    });

    // Create a ReadableStream that emits SSE data
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of events) {
            // Convert OpenAI chat completion chunks to the format frontend expects
            if (chunk.choices && chunk.choices[0]) {
              const delta = chunk.choices[0].delta;
              
              // Handle content delta
              if (delta.content) {
                // Send original content without any filtering
                const originalText = delta.content;
                
                // Only send if there's actual content
                if (originalText.length > 0) {
                // Convert to the format frontend expects
                const data = JSON.stringify({
                    event: 'response.output_text.delta',
                    data: {
                      delta: originalText,
                      item_id: 'assistant_message_1'
                    }
                  });
                  
                controller.enqueue(`data: ${data}\n\n`);
              }
            }
          }
          }
          
          // Send completion event
          const completionData = JSON.stringify({
            event: 'response.completed',
            data: {
              response: {
                output: []
              }
            }
          });
          controller.enqueue(`data: ${completionData}\n\n`);
          
          // End of stream
          controller.close();
        } catch (error) {
          console.error("Error in streaming loop:", error);
          controller.error(error);
        }
      },
    });

    // Return the ReadableStream as SSE
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
}
