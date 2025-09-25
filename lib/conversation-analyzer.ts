import { Item } from "@/lib/assistant";

export interface ConversationData {
  hasProduct: boolean;
  hasTargetMarket: boolean;
  hasGtipCode: boolean;
  hasSalesChannels: boolean;
  hasContactInfo: boolean;
  hasKeywords: boolean;
  hasCompetitors: boolean;
  hasCustomers: boolean;
  extractedData: {
    product?: string;
    country?: string;
    gtipCode?: string;
    salesChannels?: string[];
    website?: string;
    name?: string;
    email?: string;
    phone?: string;
    keywords?: string[];
    competitors?: Array<{name: string; website?: string}>;
    customers?: Array<{name: string; website?: string}>;
  };
}

export function analyzeConversationMessages(messages: Item[]): ConversationData {
  const data: ConversationData = {
    hasProduct: false,
    hasTargetMarket: false,
    hasGtipCode: false,
    hasSalesChannels: false,
    hasContactInfo: false,
    hasKeywords: false,
    hasCompetitors: false,
    hasCustomers: false,
    extractedData: {}
  };

  // Get conversation messages in order
  const conversationFlow: Array<{role: "user" | "assistant", content: string}> = [];

  messages.forEach(msg => {
    if (msg.type === "message") {
      let content = "";
      if (Array.isArray(msg.content)) {
        content = msg.content.map(c => c.text || "").join(" ").trim();
      } else if (typeof msg.content === "string") {
        content = msg.content;
      }

      if (msg.role === "user" || msg.role === "assistant") {
        conversationFlow.push({
          role: msg.role,
          content: content
        });
      }
    }
  });

  // Analyze conversation step by step following the actual conversation flow
  for (let i = 0; i < conversationFlow.length; i++) {
    const msg = conversationFlow[i];
    const content = msg.content.toLowerCase();

    // 1. PRODUCT - Look for user mentioning a product or assistant asking about product
    if (!data.hasProduct) {
      if (msg.role === "user") {
        const productKeywords = ["mobile phone", "phone", "motorbike", "motorcycle", "textile", "watermelon", "karpuz", "telefon", "motosiklet", "tv", "television"];
        if (productKeywords.some(keyword => content.includes(keyword))) {
          data.hasProduct = true;
        }
      } else if (msg.role === "assistant") {
        if (content.includes("which product") || content.includes("hangi ürün") || 
            (content.includes("want to export") && i > 0)) {
          // If assistant is asking about product and user already responded, mark as having product
          if (i < conversationFlow.length - 1) {
            data.hasProduct = true;
          }
        }
      }
    }

    // 2. TARGET MARKET - Look for country mentions
    if (!data.hasTargetMarket && data.hasProduct) {
      const countries = ["germany", "italy", "france", "usa", "america", "almanya", "italya", "fransa", "amerika"];
      if (msg.role === "user" && countries.some(country => content.includes(country))) {
        data.hasTargetMarket = true;
      } else if (msg.role === "assistant" && (content.includes("which country") || content.includes("hangi ülke"))) {
        // If assistant asked about country and there's a next user message
        if (i < conversationFlow.length - 1) {
          data.hasTargetMarket = true;
        }
      }
    }

    // 3. GTIP CODE - Look for GTIP code mentions
    if (!data.hasGtipCode && data.hasTargetMarket) {
      if (content.includes("gtip") || /\b\d{6}\b/.test(content)) {
        data.hasGtipCode = true;
      } else if (msg.role === "assistant" && content.includes("gtip code")) {
        // If assistant asked about GTIP and user responded
        if (i < conversationFlow.length - 1) {
          data.hasGtipCode = true;
        }
      }
    }

    // 4. SALES CHANNELS - Look for sales channel mentions
    if (!data.hasSalesChannels && data.hasGtipCode) {
      const salesKeywords = ["wholesaler", "distributor", "importer", "all of them", "sales channel", "toptancı"];
      if (msg.role === "user" && salesKeywords.some(keyword => content.includes(keyword))) {
        data.hasSalesChannels = true;
      } else if (msg.role === "assistant" && content.includes("sales channel")) {
        if (i < conversationFlow.length - 1) {
          data.hasSalesChannels = true;
        }
      }
    }

    // 5. CONTACT INFO - Look for email, phone, name
    if (!data.hasContactInfo && data.hasSalesChannels) {
      const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
      const phonePattern = /[\+]?[1-9][\d\s-]{7,14}/;
      
      if (msg.role === "user") {
        const hasEmail = emailPattern.test(content);
        const hasPhone = phonePattern.test(content);
        if (hasEmail || hasPhone) {
          data.hasContactInfo = true;
        }
      } else if (msg.role === "assistant" && (content.includes("phone number") || content.includes("telefon"))) {
        if (i < conversationFlow.length - 1) {
          data.hasContactInfo = true;
        }
      }
    }

    // 6. KEYWORDS - Look for keywords confirmation
    if (!data.hasKeywords && data.hasContactInfo) {
      if (content.includes("keywords") || content.includes("kelime") || content.includes("describe your product")) {
        data.hasKeywords = true;
      }
    }

    // 7. COMPETITORS - Look for competitor mentions
    if (!data.hasCompetitors && data.hasKeywords) {
      const competitorNames = ["bmw", "honda", "samsung", "unieuro", "mediaworld", "lg", "sony"];
      if (competitorNames.some(name => content.includes(name)) || 
          (content.includes("competitor") || content.includes("rakip")) ||
          content.includes("https://")) {
        data.hasCompetitors = true;
      }
    }

    // 8. CUSTOMERS - Look for customer mentions
    if (!data.hasCustomers && data.hasCompetitors) {
      const customerKeywords = ["customer", "müşteri", "interested", "cellularline", "might be interested"];
      if (customerKeywords.some(keyword => content.includes(keyword)) ||
          (content.includes("https://") && (content.includes("interested") || content.includes("customer")))) {
        data.hasCustomers = true;
      }
    }
  }

  return data;
}
