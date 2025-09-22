import { create } from "zustand";

// Types for collected information
export interface GTIPCode {
  code: string;
  confirmed: boolean;
}

export interface Website {
  url: string;
  exists: boolean;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Competitor {
  name: string;
  website: string;
  country: string;
}

export interface Customer {
  name: string;
  website: string;
  country: string;
}

export interface ExportInfo {
  product?: string;
  targetCountry?: string;
  gtipCode?: GTIPCode;
  salesChannels?: string[];
  website?: Website;
  contactInfo?: ContactInfo;
  keywords?: string[];
  competitors?: Competitor[];
  customers?: Customer[];
}

export type ConversationPhase = 
  | "greeting"
  | "product"
  | "country" 
  | "gtip"
  | "channels"
  | "website"
  | "name"
  | "email"
  | "phone"
  | "keywords"
  | "competitors"
  | "customers"
  | "demo"
  | "completed";

interface ExportAssistantState {
  // Current conversation phase
  conversationPhase: ConversationPhase;
  
  // Collected information
  collectedInfo: ExportInfo;
  
  // Language preference
  language: "tr" | "en";
  
  // Actions
  setConversationPhase: (phase: ConversationPhase) => void;
  updateCollectedInfo: (updates: Partial<ExportInfo>) => void;
  setLanguage: (language: "tr" | "en") => void;
  resetConversation: () => void;
  
  // Helper methods
  getNextPhase: () => ConversationPhase;
  isPhaseComplete: (phase: ConversationPhase) => boolean;
  getMissingInfo: () => string[];
}

const useExportAssistantStore = create<ExportAssistantState>((set, get) => ({
  conversationPhase: "greeting",
  collectedInfo: {},
  language: "tr",
  
  setConversationPhase: (phase) => set({ conversationPhase: phase }),
  
  updateCollectedInfo: (updates) => 
    set((state) => ({
      collectedInfo: { ...state.collectedInfo, ...updates }
    })),
  
  setLanguage: (language) => set({ language }),
  
  resetConversation: () => 
    set({
      conversationPhase: "greeting",
      collectedInfo: {},
    }),
  
  getNextPhase: () => {
    const { collectedInfo } = get();
    
    // Check in order of priority
    if (!collectedInfo.product) return "product";
    if (!collectedInfo.targetCountry) return "country";
    if (!collectedInfo.gtipCode) return "gtip";
    if (!collectedInfo.salesChannels) return "channels";
    if (!collectedInfo.website) return "website";
    if (!collectedInfo.contactInfo?.name) return "name";
    if (!collectedInfo.contactInfo?.email) return "email";
    if (!collectedInfo.contactInfo?.phone) return "phone";
    if (!collectedInfo.keywords) return "keywords";
    if (!collectedInfo.competitors) return "competitors";
    if (!collectedInfo.customers) return "customers";
    
    return "demo";
  },
  
  isPhaseComplete: (phase) => {
    const { collectedInfo } = get();
    
    switch (phase) {
      case "product": return !!collectedInfo.product;
      case "country": return !!collectedInfo.targetCountry;
      case "gtip": return !!collectedInfo.gtipCode;
      case "channels": return !!collectedInfo.salesChannels;
      case "website": return !!collectedInfo.website;
      case "name": return !!collectedInfo.contactInfo?.name;
      case "email": return !!collectedInfo.contactInfo?.email;
      case "phone": return !!collectedInfo.contactInfo?.phone;
      case "keywords": return !!collectedInfo.keywords;
      case "competitors": return !!collectedInfo.competitors && collectedInfo.competitors.length > 0;
      case "customers": return !!collectedInfo.customers && collectedInfo.customers.length > 0;
      default: return false;
    }
  },
  
  getMissingInfo: () => {
    const { collectedInfo } = get();
    const missing: string[] = [];
    
    if (!collectedInfo.product) missing.push("Product");
    if (!collectedInfo.targetCountry) missing.push("Target Country");
    if (!collectedInfo.gtipCode) missing.push("GTIP Code");
    if (!collectedInfo.salesChannels) missing.push("Sales Channels");
    if (!collectedInfo.website) missing.push("Website");
    if (!collectedInfo.contactInfo?.name) missing.push("Name");
    if (!collectedInfo.contactInfo?.email) missing.push("Email");
    if (!collectedInfo.contactInfo?.phone) missing.push("Phone");
    if (!collectedInfo.keywords) missing.push("Keywords");
    if (!collectedInfo.competitors) missing.push("Competitors");
    if (!collectedInfo.customers) missing.push("Customers");
    
    return missing;
  },
}));

export default useExportAssistantStore;
