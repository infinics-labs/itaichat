export type Language = "en" | "tr"

export interface Translations {
  [key: string]: string | Translations
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    header: {
      nav: {
        whyDifferent: "WHY WE ARE DIFFERENT",
        about: "ABOUT US",
        pricing: "PRICING",
        useCases: "USE CASES",
        faq: "FAQ",
      },
      buttons: {
        signIn: "Sign In",
        getStarted: "Book a live demo",
      },
    },
    // Homepage
    home: {
      hero: {
        title: "Find verified international buyers",
        titleAccent: "in minutes",
        subtitle1: "Your team deserves a faster path from product to buyers.",
        subtitle2: "Our AI maps global markets, finds best‑fit companies, and delivers verified leads with decision‑maker data.",
        subtitle3: "Book a live demo to see how many genuine conversations you can create this month.",
        cta1: "Book a live demo",
        cta2: "Get export insights with the ITAI chatbot",
        videoTitle: "See ITAI in Action",
        videoDuration: "2:30 min demo",
        chatTitle: "Try ITAI Export Assistant",
      },
      whyDifferent: {
        title: "Why We're Different",
        subtitle: "B2B prospecting for manufacturers, simplified",
        description1: "B2B prospecting starts with a clear ideal buyer profile and ends with booked meetings.",
        description2: "We combine company fit scores, role‑based contact verification, and short talking points so your first email sounds like you already understand the buyer.",
        description3: "You get b2b business leads you can trust because every record carries reachability checks and purchase context.",
        features: {
          companyFit: "Company fit scores for precise targeting",
          contactVerification: "Role‑based contact verification",
          reachability: "Reachability checks and purchase context",
          talkingPoints: "Pre-written talking points for personalized outreach",
        },
        cta: "Book a live demo",
        highlightTitle: "Why quality beats volume",
        comparison: {
          platform: "Prospecting Platform",
          volume: "Volume Focus",
          generic: "Generic lists",
          vs: "VS",
          itai: "ITAI",
          quality: "Quality Focus",
          verified: "Verified buyers",
          quote: "If you compare a prospecting platform to a ITAI tool, the difference here is quality over volume.",
        },
      },
      value: {
        title: "Why Choose ITAI for Your",
        titleAccent: "Export Journey?",
        subtitle: "Transform your export business with AI-powered insights and connections that deliver real results",
      },
      whyChoose: {
        title: "Why Choose ITAI for Your Export Journey?",
        deliveryTitle: "What you get in every delivery",
        features: {
          targetCompanies: "A curated list of target companies that buy what you make",
          targetCompaniesDesc: "Hand-picked companies with verified buying signals that match your ideal customer profile.",
          decisionMaker: "Decision‑maker contacts with verified emails and role fit notes",
          decisionMakerDesc: "Direct access to key decision-makers with validated contact information and role relevance.",
          compliance: "Country and compliance context for regulated categories",
          complianceDesc: "Local market insights, regulatory requirements, and compliance information for each target market.",
          csvExport: "CSV files and segments you can load into your CRM today",
          csvExportDesc: "Export-ready data formats that integrate seamlessly with your existing CRM and sales workflows.",
        },
        outcomesTitle: "Outcomes you can measure",
        outcomes: {
          shorterCycles: "Shorter prospecting cycles",
          shorterCyclesDesc: "Focus on the best fit companies first with verified leads",
          higherRates: "Higher reply and meeting rates",
          higherRatesDesc: "Better engagement because the data is verified and relevant",
          predictablePipeline: "Predictable export pipeline",
          predictablePipelineDesc: "Compounds month over month with quality b2b business leads",
        },
        cta: "Book a live demo",
      },
      footer: {
        cta: {
          badge: "Ready to Transform Your Export Business?",
          title: "Start your export journey today with our",
          titleAccent: "AI assistant",
          description: "Join thousands of successful exporters who trust ITAI to discover global opportunities and connect with international buyers.",
          button: "Book a live demo",
          disclaimer: "No credit card required • Start chatting in seconds",
        },
        description: "Advanced AI assistant powered by cutting-edge technology to help you accomplish tasks more efficiently.",
        sections: {
          company: "Company",
          product: "Product",
          legal: "Legal",
        },
        links: {
          about: "About",
          blog: "Blog",
          contact: "Contact",
          howItWorks: "How It Works",
          useCases: "Use Cases",
          pricing: "Pricing",
          faq: "FAQ",
          terms: "Terms",
          privacy: "Privacy Policy",
        },
        copyright: "© 2024 International Trade AI. All rights reserved.",
      },
      chat: {
        title: "AI Export Consultation",
        subtitle: "Have a conversation with our AI to explore export opportunities",
      },
      howItWorks: {
        title: "How ITAI Works",
        steps: {
          step1: {
            title: "Define Your Search",
            description: "Tell us about products, target markets, buyer profile.",
          },
          step2: {
            title: "AI Generates Leads",
            description: "We scan markets to identify relevant buyers with signals.",
          },
          step3: {
            title: "Smart Classification",
            description: "Prioritized leads with company profiles, contact info, insights.",
          },
        },
        cta: "Book a live demo",
      },
      provenResults: {
        title: "Proven Results That Speak for Themselves",
        subtitle: "Join thousands of exporters who have transformed their business with ITAI's AI-powered solutions",
        stats: {
          countries: "Countries",
          countriesDesc: "Global market coverage",
          clients: "Clients",
          clientsDesc: "Successful exporters",
          growth: "Growth",
          growthDesc: "Average export increase",
          exportValue: "Export Value",
          exportValueDesc: "Generated for clients",
        },
        cta: "Book a live demo",
      },
      homeFaq: {
        title: "Frequently Asked",
        titleAccent: "Questions",
        subtitle: "Get answers to common questions about finding verified international buyers and accelerating your export growth.",
        questions: {
          q1: "What is b2b prospecting and why does it matter here?",
          a1: "B2B prospecting is the work of finding and qualifying companies and contacts that match your ICP so outreach becomes efficient—book a live demo to see it in action.",
          q2: "Where does your data come from and how do you verify contacts?",
          a2: "We enrich from trusted sources, validate email deliverability, check role relevance, and replace unreachable contacts quickly.",
          q3: "Do you support b2b company search by country or sector?",
          a3: "Yes, we filter by sector, size, location, and buying signals to deliver a shortlist that feels tailor‑made.",
          q4: "Can I see examples before I decide?",
          a4: "Yes-see sample buyers in a live demo; we walk through a curated preview.",
        },
        cta: "Book a live demo",
      },
      finalCta: {
        title: "Ready to transform your export pipeline?",
        subtitle: "Join exporters who use ITAI to find verified buyers and connect with decision‑makers.",
        cta: "Book a live demo",
      },
    },
    // Why Different Page
    whyDifferent: {
      hero: {
        title: "Why ITAI is More Than Just a",
        titleAccent: "Lead Generator",
        subtitle: "Our unique methodology blends human experience with AI precision to help companies expand globally with confidence.",
        quote1: "InternationalTradeAI is the result of our mission to enable companies to grow globally – a software solution that is the product of our 6 years of international business development experience.",
        quote2: "Since 2019, a dedicated team of 80 people has been helping companies achieve global success with a proven methodology.",
      },
      differentiators: {
        title: "Here's What Makes Our",
        titleAccent: "Approach Unique",
        items: {
          research: {
            title: "Strategic Market Research",
            description: "Conducting data-driven market analysis tailored to your export goals.",
          },
          identification: {
            title: "Targeted Lead Identification",
            description: "Pinpointing high-potential buyers using advanced filtering techniques.",
          },
          outreach: {
            title: "Systematic Outreach and Follow-Ups",
            description: "Supporting engagement with consistent and intelligent outreach workflows.",
          },
        },
      },
      impact: {
        title: "The Results Speak for Themselves",
        subtitle: "Through 300+ client partnerships, we've facilitated:",
        metrics: {
          directExport: {
            label: "USD direct export",
            description: "Generated for our clients",
          },
          indirectExport: {
            label: "USD in indirect export growth",
            description: "Facilitated through partnerships",
          },
          meetings: {
            label: "Successful buyer meetings",
            description: "Virtual & in-person connections",
          },
          quotations: {
            label: "Qualified quotation requests",
            description: "Worldwide opportunities created",
          },
        },
      },
      aiMessage: {
        title: "Now We're Sharing Our Expertise",
        titleAccent: "Through AI",
        subtitle: "This hard-won knowledge powers International Trade AI – your 24/7 global business development agent.",
        cardTitle: "Our AI solution helps manufacturers and industrial companies:",
        capabilities: {
          identify: "Systematically identify every viable B2B customer across 195 countries",
          prioritize: "Prioritize high-potential markets using real trade data",
          build: "Build qualified pipelines with decision-makers in your sector",
        },
        imageAlt: "AI assistant helping factory team",
      },
      gallery: {
        title: "Inside ITAI: Our People, Our Work,",
        titleAccent: "Our Impact",
        subtitle: "We're proud to work closely with manufacturers, visit factories, and represent our clients in global exhibitions.",
        images: {
          team: {
            title: "Our Team",
            description: "ITAI team collaboration",
          },
          factoryTeam: {
            title: "Factory Team",
            description: "Factory team collaboration",
          },
          fieldWork: {
            title: "Field Work",
            description: "Factory consultation",
          },
          exhibitions: {
            title: "Global Exhibitions",
            description: "Trade show representation",
          },
        },
      },
    },
    // About Page
    about: {
      title: "Our mission is simple:",
      titleAccent: "better matches, faster exports",
      subtitle1: "We exist to connect great products with buyers who value them.",
      subtitle2: "Our team blends market research, data engineering, and verification to deliver fewer, better leads.",
      subtitle3: "Industrial companies choose us when they want quality conversations instead of long lists.",
      features: {
        quality: "Focus on quality over quantity in B2B prospecting",
        verified: "Verified international buyers with decision-maker contacts",
        global: "Global market coverage for export-focused manufacturers",
      },
      cta: "Book a live demo",
      card: {
        title: "Built for Export‑Focused Manufacturers",
        description: "We help manufacturers grow exports by matching products with verified international buyers and reliable data.",
        stats: {
          experience: "Years Experience",
          countries: "Countries",
          buyers: "Verified Buyers",
        },
      },
      mission: {
        title: "Why We Exist",
        description: "Too many manufacturers waste time on unqualified leads and lengthy prospect lists. We believe in precision over volume—connecting the right products with the right buyers through verified data and market intelligence.",
        result: "Result:",
        resultText: "Industrial companies get quality conversations that convert to real business.",
      },
    },
    // Pricing Page
    pricing: {
      hero: {
        title: "Choose the perfect plan for your",
        titleAccent: "export journey",
        subtitle: "Simple, transparent pricing for verified international buyers and clean B2B data. Start small and scale as you grow.",
      },
      trustIndicators: {
        verified: {
          title: "Verified Contacts",
          description: "All contacts are verified and updated monthly",
        },
        growing: {
          title: "Growing Database",
          description: "Thousands of new contacts added daily",
        },
        global: {
          title: "Global Coverage",
          description: "Access to buyers in 180+ countries",
        },
      },
      comparison: {
        title: "Compare Features",
      },
      faq: {
        title: "Frequently Asked Questions",
        whatHappensNext: {
          question: "What happens next?",
          answer: "We'll review your information and send you a calendar link to schedule your personalized demo.",
        },
        howLongPreview: {
          question: "How long until I receive a preview?",
          answer: "During the live demo (usually within 24-48 hours), we'll show you a curated sample of verified b2b contact data from your target markets.",
        },
      },
      cards: {
        scopeTitle: "Choose your market scope",
        country: "Country",
        countries: "Countries",
        mostPopular: "Most Popular",
        getStarted: "Get Started",
        forCountries: "for",
        plans: {
          starting: {
            name: "Starting Package",
            description: "Perfect for small businesses testing international markets",
            features: {
              prospecting: "AI-Powered Prospecting",
              scoring: "Lead Scoring & Reasoning",
              enrichment: "Contact Data Enrichment",
              management: "Centralized Contact Management",
              support: "Email support during business hours",
            },
          },
          plus: {
            name: "Plus Package",
            description: "Ideal for growing companies expanding globally",
            features: {
              everything: "Everything in Starting Package",
              premium: "Premium Contact Data Enrichment",
              onboarding: "Basic CRM onboarding assistance",
              profiling: "Advanced lead profiling",
              priority: "Priority email support",
            },
          },
          proPlus: {
            name: "Pro Plus Package",
            description: "Enterprise solution for serious international expansion",
            features: {
              everything: "Everything in Plus Package",
              analytics: "Advanced Analytics & Reporting",
              security: "Enterprise-Grade Security",
              whatsapp: "WhatsApp support",
              sessions: "Advanced CRM strategy sessions",
              health: "Proactive system health checks",
            },
          },
        },
        featuresTable: {
          features: "Features",
          startingPackage: "Starting Package",
          plusPackage: "Plus Package",
          proPlusPackage: "Pro Plus Package",
          leadGeneration: {
            title: "Lead Generation",
            aiProspecting: "AI-Powered Prospecting",
            aiProspectingDesc: "Automatically find companies matching your ideal customer profile",
            leadScoring: "Lead Scoring",
            leadScoringDesc: "Automatically rank prospects based on engagement and fit to prioritize efforts",
            leadReasoning: "Lead Reasoning",
            leadReasoningDesc: "AI Reasoning leads with your requests",
          },
          dataEnrichment: {
            title: "Data Enrichment",
            contactDataEnrichment: "Contact Data Enrichment",
            contactDataEnrichmentDesc: "Lead profiling with company websites, contact e-mails, social media profiles",
            premiumContactDataEnrichment: "Premium Contact Data Enrichment",
            premiumContactDataEnrichmentDesc: "Augment lead profiles with verified contact details and company information",
          },
          basicCrm: {
            title: "Basic CRM",
            centralizedContactManagement: "Centralized Contact Management",
            odooCrm: "ODOO CRM",
          },
          advancedAnalytics: {
            title: "Advanced Analytics & Reporting",
            description: "Gain deep insights into sales performance, customer behavior, and team productivity with customizable dashboards",
          },
          enterpriseSecurity: {
            title: "Enterprise-Grade Security & Compliance",
            description: "Features robust security controls, role-based permissions, and compliance support for regulations like GDPR",
          },
          ecosystemIntegration: {
            title: "Seamless Ecosystem Integration",
            description: "Unifies CRM with sales, project management",
          },
          educationTraining: {
            title: "Education & Training",
            basicCrmOnboarding: "Basic CRM onboarding and setup assistance",
            emailSupport: "Email support during business hours",
            whatsappSupport: "WhatsApp support during business hours",
            advancedCrmSessions: "Advanced CRM strategy sessions and personalized configuration",
            proactiveHealthChecks: "Proactive system health checks and optimization reviews",
          },
        },
        additionalInfo: "All plans include our standard features with varying levels of support and customization.",
        customSolution: "Need a custom solution?",
        proPlusRestriction: "Only available above 10 countries",
      },
      finalCta: {
        title: "Ready to find your next international buyers?",
        description: "Join thousands of exporters who trust ITAI for verified B2B leads. Start your 14-day free trial today - no credit card required.",
        startTrial: "Start Free Trial",
        contactSales: "Contact Sales",
        disclaimer: "14-day free trial • No credit card required • Cancel anytime",
      },
      links: {
        learnMore: "Learn more about our solutions:",
        verifiedLeads: "Verified Leads",
        howItWorks: "How It Works",
        useCases: "Use Cases",
      },
    },
    // Use Cases Page
    useCases: {
      hero: {
        title: "Built for manufacturers",
        titleAccent: "who sell globally",
        subtitle: "See how different types of manufacturing companies use ITAI to find verified international buyers and book more qualified meetings.",
        bookDemo: "Book a live demo",
        requestPricing: "Request pricing in a live demo",
      },
      types: {
        manufacturing: {
          title: "Manufacturing companies",
          description: "Manufacturing companies grow exports faster when outreach starts with verified buyers. We shortlist companies that buy products like yours and include decision‑maker emails so your first message lands.",
          subtitle: "For manufacturing companies looking to expand globally",
        },
        manufacturingNearMe: {
          title: "Manufacturing companies near me",
          description: "If you need partnerships or pilots, we map manufacturing companies near me style local intent into a curated list for your state or city. You get nearby prospects, distributors, and suppliers with verified contacts.",
          subtitle: "For manufacturing companies near me looking to expand globally",
        },
        industrial: {
          title: "Industrial companies",
          description: "Industrial companies use us to reach OEMs and distributors that reorder reliably. We focus on fit, margin, and MOQ so your pipeline feels predictable.",
          subtitle: "For industrial companies looking to expand globally",
        },
        contractManufacturing: {
          title: "Contract manufacturing companies",
          description: "Contract manufacturing companies keep capacity full by targeting buyers who outsource consistently. We highlight part families, certifications, and lot sizes to match your shop's strengths.",
          subtitle: "For contract manufacturing companies looking to expand globally",
        },
        industrialSupply: {
          title: "Industrial supply companies",
          description: "Industrial supply companies win repeat business when catalogs meet buyers who reorder on schedule. We filter by footprint, SKU mix, and re‑order patterns to prioritize high‑value accounts.",
          subtitle: "For industrial supply companies looking to expand globally",
        },
        machining: {
          title: "Machining manufacturing companies",
          description: "Machining manufacturing companies selling CNC and precision parts reach better buyers with role‑verified contacts. We flag tolerances, materials, and volumes so your message speaks the buyer's language.",
          subtitle: "For machining manufacturing companies looking to expand globally",
        },
        medicalDevice: {
          title: "Medical device contract manufacturing companies",
          description: "Medical device contract manufacturing companies need buyers that match ISO 13485 and market rules. We add certification and regulatory notes so your outreach clears compliance fast.",
          subtitle: "For medical device contract manufacturing companies looking to expand globally",
        },
        manufacturer: {
          title: "Manufacturer companies",
          description: "Manufacturer companies that export consistently start with a clean, verified target list. Your team gets fewer, better leads and more booked meetings.",
          subtitle: "For manufacturer companies looking to expand globally",
        },
        electronics: {
          title: "Electronic & electronics manufacturing companies",
          description: "Electronic manufacturing companies and electronics manufacturing companies reach high‑fit OEMs and distributors through focused lists. We separate prototype, NPI, and mass‑production needs to increase close rates.",
          subtitle: "For electronic & electronics manufacturing companies looking to expand globally",
        },
        pharmaceutical: {
          title: "Pharmaceutical manufacturing companies",
          description: "Pharmaceutical manufacturing companies connect with vetted distributors and institutional buyers that pass quality checks. We include dossier availability and compliance notes to remove friction early.",
          subtitle: "For pharmaceutical manufacturing companies looking to expand globally",
        },
      },
      finalCta: {
        title: "Ready to see verified buyers for your industry?",
        description: "Get access to high-quality verified buyers and see how our platform can help manufacturing companies like yours book more qualified meetings.",
        bookDemo: "Book a live demo",
        requestPricing: "Request pricing in a live demo",
      },
      links: {
        learnMore: "Learn more about our solutions:",
        howItWorks: "How It Works",
        verifiedLeads: "Verified Leads",
        pricing: "Pricing",
        useCases: "Manufacturing Use Cases",
        b2bData: "B2B Data",
      },
    },
    // FAQ Page
    faq: {
      hero: {
        title: "Frequently Asked",
        titleAccent: "Questions",
        subtitle: "Find answers to common questions about ITAI's features, pricing, and how our AI-powered platform can transform your export business.",
      },
      questions: {
        whatIsB2bProspecting: {
          question: "What is b2b prospecting?",
          answer: "B2B prospecting is the work of finding and qualifying companies and contacts that match your ICP so outreach becomes efficient-book a live demo to see it in action.",
        },
        leadScraperDifference: {
          question: "How is a lead scraper different from your approach?",
          answer: "A lead scraper pulls unverified data at scale while we deliver verified leads with role fit and deliverability checks-book a live demo for a preview.",
        },
        b2bProspectingTool: {
          question: "Do you offer a b2b prospecting tool or software?",
          answer: "We deliver clean segments that plug into your workflow and integrate with popular tools-book a live demo to see sample segments.",
        },
        freeB2bLeadsDatabase: {
          question: "Can I get a b2b leads database free?",
          answer: "Free sources risk low accuracy and compliance issues; we show a small verified preview in the live demo.",
        },
        regulatedCategories: {
          question: "Do you support prospection b2b in regulated categories?",
          answer: "Yes, with compliance notes; see examples in a live demo.",
        },
      },
      cta: {
        title: "Still have questions?",
        description: "Can't find the answer you're looking for? Our expert team is here to help you understand how ITAI can transform your export business.",
        button: "Book a live demo",
      },
    },
    // Contact Page
    contact: {
      hero: {
        title: "Book a live demo",
        subtitle: "Tell us about your product, target countries, and buyer profile. We'll show a curated preview of verified contacts and b2b contact data during the demo.",
      },
      form: {
        title: "Get Your Personalized Demo",
        fields: {
          name: "Name *",
          namePlaceholder: "Your full name",
          email: "Work email *",
          emailPlaceholder: "you@company.com",
          company: "Company *",
          companyPlaceholder: "Your company name",
          productCategory: "Product category *",
          productCategoryPlaceholder: "e.g., Electronics, Medical Devices, Industrial Equipment",
          targetCountries: "Target countries *",
          targetCountriesPlaceholder: "e.g., USA, Germany, Japan, Brazil",
          notes: "Notes",
          notesPlaceholder: "Tell us more about your export goals, target buyer profile, or specific requirements...",
        },
        button: "Book a live demo",
        submitting: "Submitting...",
        success: {
          title: "Thank you for your interest!",
          message: "We've received your information and will be in touch within 24 hours to schedule your personalized demo.",
          backButton: "Back to form",
        },
      },
      faq: {
        title: "Frequently Asked Questions",
        whatHappensNext: {
          question: "What happens next?",
          answer: "We'll review your information and send you a calendar link to schedule your personalized demo.",
        },
        howLongPreview: {
          question: "How long until I receive a preview?",
          answer: "During the live demo (usually within 24-48 hours), we'll show you a curated sample of verified b2b contact data from your target markets.",
        },
      },
      demo: {
        title: "What You'll See in Your Demo",
        items: {
          preview: "Curated preview of verified b2b contact data for your target markets",
          contacts: "Sample decision-maker contacts with verified emails",
          profiles: "Company profiles and market intelligence for your industry",
          walkthrough: "Live walkthrough of how our data can accelerate your exports",
        },
      },
      cta: {
        title: "Ready to see verified buyers for your products?",
        description: "Join manufacturers worldwide who trust ITAI for verified international buyers. Book your personalized demo today.",
        button: "Schedule Demo",
      },
    },
    // How It Works Page
    howItWorks: {
      hero: {
        title: "From product brief to",
        titleAccent: "verified buyers",
        subtitle: "Our b2b prospecting process turns your product specifications into a pipeline of qualified international buyers with verified contact information.",
      },
      steps: {
        defineProfile: {
          title: "Define your ideal buyer profile",
          description: "You tell us what you make, where you ship, and who you want to reach. We translate that input into an ICP that your sales team can agree on in minutes.",
        },
        discoverCompanies: {
          title: "Discover companies that match",
          description: "Our system maps global markets and surfaces companies with real purchase intent signals. This is b2b prospecting agent thinking with a researcher discipline.",
        },
        verifyDecisionMakers: {
          title: "Verify decision‑makers and emails",
          description: "We confirm role fit, validate deliverability, and replace any unreachable contact quickly. The result is verified leads that your team can act on immediately.",
        },
        packageOutreach: {
          title: "Package for outreach",
          description: "You receive CSV files and clean segments that match your campaigns and CRM fields. If you already use a prospecting platform, we align the fields so your import takes seconds.",
        },
      },
      faq: {
        title: "Frequently Asked Questions",
        howProcess: {
          question: "How does the b2b prospecting process work?",
          answer: "Our b2b prospecting software starts with your ideal buyer profile and ends with verified leads you can contact immediately. We handle the entire research and verification process—book a live demo to see it in action.",
        },
        whatMakesDifferent: {
          question: "What makes this different from other prospecting platforms?",
          answer: "Unlike generic prospecting platforms, we focus specifically on B2B export markets with verified international buyers and decision-maker contacts—book a live demo for a preview.",
        },
        howQuickly: {
          question: "How quickly can I get verified leads?",
          answer: "Most clients receive their first batch of verified leads within 48-72 hours of defining their ideal buyer profile—book a live demo to see sample segments.",
        },
        leadScraperDifference: {
          question: "How is a lead scraper different from your approach?",
          answer: "A lead scraper pulls unverified data at scale while we deliver verified leads with role fit and deliverability checks—book a live demo for a preview.",
        },
        prospectingTool: {
          question: "Do you offer a b2b prospecting tool or software?",
          answer: "We deliver clean segments that plug into your workflow and integrate with popular tools—book a live demo to see sample segments.",
        },
        freeDatabase: {
          question: "Can I get a b2b leads database free?",
          answer: "Free sources risk low accuracy and compliance issues; we show a small verified preview in the live demo.",
        },
        regulatedCategories: {
          question: "Do you support prospection b2b in regulated categories?",
          answer: "Yes, with compliance notes; see examples in a live demo.",
        },
      },
      cta: {
        title: "Ready to transform your b2b prospecting?",
        subtitle: "See how our b2b prospecting software can help you find verified leads and book more qualified meetings.",
        button: "Book a live demo",
        secondaryButton: "Request pricing in a live demo",
      },
    },
    // Verified Leads Page
    verifiedLeads: {
      hero: {
        title: "Verified Leads",
        titleAccent: "That Convert",
        subtitle: "Get b2b business leads with verified emails, decision-maker contacts, and company intelligence that helps you win more export deals.",
      },
    },
    // Common
    common: {
      loading: "Loading...",
      error: "An error occurred",
      tryAgain: "Try again",
      close: "Close",
      next: "Next",
      previous: "Previous",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      select: "Select",
      all: "All",
      none: "None",
      yes: "Yes",
      no: "No",
      ok: "OK",
      back: "Back",
      continue: "Continue",
      finish: "Finish",
      start: "Start",
      stop: "Stop",
      pause: "Pause",
      resume: "Resume",
      refresh: "Refresh",
      reload: "Reload",
      reset: "Reset",
      clear: "Clear",
      apply: "Apply",
      confirm: "Confirm",
      language: "Language",
      english: "English",
      turkish: "Türkçe",
    },
  },
  tr: {
    // Header
    header: {
      nav: {
        whyDifferent: "NEDEN FARKLIYIZ",
        about: "HAKKIMIZDA",
        pricing: "FİYATLANDIRMA",
        useCases: "KULLANIM ALANLARI",
        faq: "SSS",
      },
      buttons: {
        signIn: "Giriş Yap",
        getStarted: "Demo Talep Edin",
      },
    },
    // Homepage
    home: {
      hero: {
        title: "Doğrulanmış uluslararası alıcıları",
        titleAccent: "dakikalar içinde bulun",
        subtitle1: "Ekibiniz üründen alıcıya daha hızlı bir yol hak ediyor.",
        subtitle2: "AI'mız küresel pazarları haritalar, en uygun şirketleri bulur ve karar verici verileriyle doğrulanmış müşteri adayları sunar.",
        subtitle3: "Bu ay kaç gerçek konuşma yaratabileceğinizi görmek için demo talep edin yapın.",
        cta1: "Demo Talep Edin",
        cta2: "ITAI chatbot ile ihracat içgörüleri alın",
        videoTitle: "ITAI'yi Aksiyonda Görün",
        videoDuration: "2:30 dk demo",
        chatTitle: "ITAI İhracat Asistanını Deneyin",
      },
      whyDifferent: {
        title: "Neden Farklıyız",
        subtitle: "Üreticiler için B2B müşteri adayı bulma, basitleştirildi",
        description1: "B2B müşteri adayı bulma net bir ideal alıcı profili ile başlar ve rezerve edilmiş toplantılarla biter.",
        description2: "Şirket uyum skorları, rol tabanlı iletişim doğrulaması ve kısa konuşma noktalarını birleştiriyoruz, böylece ilk e-postanız alıcıyı zaten anladığınız gibi görünür.",
        description3: "Her kayıt erişilebilirlik kontrolleri ve satın alma bağlamı taşıdığı için güvenebileceğiniz B2B iş müşteri adayları alırsınız.",
        features: {
          companyFit: "Hassas hedefleme için şirket uyum skorları",
          contactVerification: "Rol tabanlı iletişim doğrulaması",
          reachability: "Erişilebilirlik kontrolleri ve satın alma bağlamı",
          talkingPoints: "Kişiselleştirilmiş iletişim için önceden yazılmış konuşma noktaları",
        },
        cta: "Demo Talep Edin",
        highlightTitle: "Neden kalite miktardan üstün",
        comparison: {
          platform: "Müşteri Adayı Platformu",
          volume: "Miktar Odaklı",
          generic: "Genel listeler",
          vs: "KARŞI",
          itai: "ITAI",
          quality: "Kalite Odaklı",
          verified: "Doğrulanmış alıcılar",
          quote: "Bir müşteri adayı platformunu ITAI aracıyla karşılaştırırsanız, buradaki fark kalite üzerine miktardır.",
        },
      },
      value: {
        title: "İhracat Yolculuğunuz İçin Neden",
        titleAccent: "ITAI'yi Seçmelisiniz?",
        subtitle: "Gerçek sonuçlar sunan AI destekli içgörüler ve bağlantılarla ihracat işinizi dönüştürün",
      },
      whyChoose: {
        title: "İhracat Yolculuğunuz İçin Neden ITAI'yi Seçmelisiniz?",
        deliveryTitle: "Her teslimatta aldığınız",
        features: {
          targetCompanies: "Ürettiğinizi satın alan hedef şirketlerin küratörlü listesi",
          targetCompaniesDesc: "İdeal müşteri profilinizle eşleşen doğrulanmış satın alma sinyalleri olan özenle seçilmiş şirketler.",
          decisionMaker: "Doğrulanmış e-postalar ve rol uyum notları ile karar verici iletişim bilgileri",
          decisionMakerDesc: "Doğrulanmış iletişim bilgileri ve rol uygunluğu ile ana karar vericilere doğrudan erişim.",
          compliance: "Düzenlenmiş kategoriler için ülke ve uyumluluk bağlamı",
          complianceDesc: "Her hedef pazar için yerel pazar içgörüleri, düzenleyici gereksinimler ve uyumluluk bilgileri.",
          csvExport: "Bugün CRM'nize yükleyebileceğiniz CSV dosyaları ve segmentler",
          csvExportDesc: "Mevcut CRM ve satış iş akışlarınızla sorunsuz entegre olan dışa aktarma hazır veri formatları.",
        },
        outcomesTitle: "Ölçebileceğiniz sonuçlar",
        outcomes: {
          shorterCycles: "Daha kısa müşteri adayı bulma döngüleri",
          shorterCyclesDesc: "Doğrulanmış müşteri adayları ile önce en uygun şirketlere odaklanın",
          higherRates: "Daha yüksek yanıt ve toplantı oranları",
          higherRatesDesc: "Veri doğrulandığı ve ilgili olduğu için daha iyi etkileşim",
          predictablePipeline: "Öngörülebilir ihracat hattı",
          predictablePipelineDesc: "Kaliteli B2B iş müşteri adayları ile aydan aya birikir",
        },
        cta: "Demo Talep Edin",
      },
      footer: {
        cta: {
          badge: "İhracat İşinizi Dönüştürmeye Hazır mısınız?",
          title: "AI asistanımızla ihracat yolculuğunuza bugün başlayın",
          titleAccent: "AI asistanı",
          description: "Küresel fırsatları keşfetmek ve uluslararası alıcılarla bağlantı kurmak için ITAI'ye güvenen binlerce başarılı ihracatçıya katılın.",
          button: "Demo Talep Edin",
          disclaimer: "Kredi kartı gerekmez • Saniyeler içinde sohbet etmeye başlayın",
        },
        description: "Görevleri daha verimli bir şekilde gerçekleştirmenize yardımcı olmak için son teknoloji ile desteklenen gelişmiş AI asistanı.",
        sections: {
          company: "Şirket",
          product: "Ürün",
          legal: "Yasal",
        },
        links: {
          about: "Hakkımızda",
          blog: "Blog",
          contact: "İletişim",
          howItWorks: "Nasıl Çalışır",
          useCases: "Kullanım Alanları",
          pricing: "Fiyatlandırma",
          faq: "SSS",
          terms: "Şartlar",
          privacy: "Gizlilik Politikası",
        },
        copyright: "© 2024 International Trade AI. Tüm hakları saklıdır.",
      },
      chat: {
        title: "AI İhracat Danışmanlığı",
        subtitle: "İhracat fırsatlarını keşfetmek için AI'mızla sohbet edin",
      },
      howItWorks: {
        title: "ITAI Nasıl Çalışır",
        steps: {
          step1: {
            title: "Aramanızı Tanımlayın",
            description: "Ürünler, hedef pazarlar, alıcı profili hakkında bize bilgi verin.",
          },
          step2: {
            title: "AI Müşteri Adayları Üretir",
            description: "Sinyallerle ilgili alıcıları belirlemek için pazarları tarıyoruz.",
          },
          step3: {
            title: "Akıllı Sınıflandırma",
            description: "Şirket profilleri, iletişim bilgileri, içgörülerle önceliklendirilmiş müşteri adayları.",
          },
        },
        cta: "Demo Talep Edin",
      },
      provenResults: {
        title: "Kendini Kanıtlamış Sonuçlar",
        subtitle: "ITAI'nin AI destekli çözümleriyle işlerini dönüştüren binlerce ihracatçıya katılın",
        stats: {
          countries: "Ülke",
          countriesDesc: "Küresel pazar kapsamı",
          clients: "Müşteri",
          clientsDesc: "Başarılı ihracatçılar",
          growth: "Büyüme",
          growthDesc: "Ortalama ihracat artışı",
          exportValue: "İhracat Değeri",
          exportValueDesc: "Müşteriler için üretilen",
        },
        cta: "Demo Talep Edin",
      },
      homeFaq: {
        title: "Sıkça Sorulan",
        titleAccent: "Sorular",
        subtitle: "Doğrulanmış uluslararası alıcıları bulma ve ihracat büyümenizi hızlandırma hakkında yaygın soruların yanıtlarını alın.",
        questions: {
          q1: "B2B müşteri adayı bulma nedir ve burada neden önemlidir?",
          a1: "B2B müşteri adayı bulma, ICP'nize uyan şirketleri ve kişileri bulma ve nitelendirme işidir, böylece iletişim verimli hale gelir—aksiyonda görmek için demo talep edin yapın.",
          q2: "Verileriniz nereden geliyor ve kişileri nasıl doğruluyorsunuz?",
          a2: "Güvenilir kaynaklardan zenginleştiriyoruz, e-posta teslim edilebilirliğini doğruluyoruz, rol uygunluğunu kontrol ediyoruz ve erişilemeyen kişileri hızlıca değiştiriyoruz.",
          q3: "Ülke veya sektöre göre B2B şirket aramasını destekliyor musunuz?",
          a3: "Evet, özel yapılmış gibi hissettiren bir kısa liste sunmak için sektör, boyut, konum ve satın alma sinyallerine göre filtreliyoruz.",
          q4: "Karar vermeden önce örnekleri görebilir miyim?",
          a4: "Evet-canlı demoda örnek alıcıları görün; küratörlü bir önizlemeyi birlikte inceleriz.",
        },
        cta: "Demo Talep Edin",
      },
      finalCta: {
        title: "İhracat hattınızı dönüştürmeye hazır mısınız?",
        subtitle: "Doğrulanmış alıcıları bulmak ve karar vericilerle bağlantı kurmak için ITAI'yi kullanan ihracatçılara katılın.",
        cta: "Demo Talep Edin",
      },
    },
    // Why Different Page
    whyDifferent: {
      hero: {
        title: "ITAI Neden Sadece Bir",
        titleAccent: "Müşteri Adayı Üreticisinden Fazlası",
        subtitle: "Benzersiz metodolojimiz, şirketlerin güvenle küresel olarak genişlemelerine yardımcı olmak için insan deneyimini AI hassasiyetiyle harmanlıyor.",
        quote1: "InternationalTradeAI, şirketlerin küresel olarak büyümesini sağlama misyonumuzun sonucudur – 6 yıllık uluslararası iş geliştirme deneyimimizin ürünü olan bir yazılım çözümü.",
        quote2: "2019'dan beri, 80 kişilik özel bir ekip, kanıtlanmış bir metodoloji ile şirketlerin küresel başarı elde etmelerine yardımcı oluyor.",
      },
      differentiators: {
        title: "Yaklaşımımızı",
        titleAccent: "Benzersiz Kılan Şey",
        items: {
          research: {
            title: "Stratejik Pazar Araştırması",
            description: "İhracat hedeflerinize özel veri odaklı pazar analizi yürütme.",
          },
          identification: {
            title: "Hedefli Müşteri Adayı Belirleme",
            description: "Gelişmiş filtreleme teknikleri kullanarak yüksek potansiyelli alıcıları belirleme.",
          },
          outreach: {
            title: "Sistematik İletişim ve Takipler",
            description: "Tutarlı ve akıllı iletişim iş akışları ile etkileşimi destekleme.",
          },
        },
      },
      impact: {
        title: "Sonuçlar Kendilerini Anlatıyor",
        subtitle: "300+ müşteri ortaklığı ile şunları kolaylaştırdık:",
        metrics: {
          directExport: {
            label: "USD doğrudan ihracat",
            description: "Müşterilerimiz için üretilen",
          },
          indirectExport: {
            label: "USD dolaylı ihracat büyümesi",
            description: "Ortaklıklar yoluyla kolaylaştırılan",
          },
          meetings: {
            label: "Başarılı alıcı toplantıları",
            description: "Sanal ve yüz yüze bağlantılar",
          },
          quotations: {
            label: "Nitelikli teklif talepleri",
            description: "Dünya çapında yaratılan fırsatlar",
          },
        },
      },
      aiMessage: {
        title: "Şimdi Uzmanlığımızı",
        titleAccent: "AI Aracılığıyla Paylaşıyoruz",
        subtitle: "Bu zor kazanılmış bilgi, International Trade AI'yi güçlendiriyor – 7/24 küresel iş geliştirme acenteniz.",
        cardTitle: "AI çözümümüz üreticilere ve endüstriyel şirketlere yardımcı oluyor:",
        capabilities: {
          identify: "195 ülkede her uygun B2B müşteriyi sistematik olarak belirleme",
          prioritize: "Gerçek ticaret verilerini kullanarak yüksek potansiyelli pazarları önceliklendirme",
          build: "Sektörünüzdeki karar vericilerle nitelikli hatlar oluşturma",
        },
        imageAlt: "Fabrika ekibine yardım eden AI asistanı",
      },
      gallery: {
        title: "ITAI'nin İçinden: İnsanlarımız, İşimiz,",
        titleAccent: "Etkimiz",
        subtitle: "Üreticilerle yakın çalışmaktan, fabrikaları ziyaret etmekten ve müşterilerimizi küresel fuarlarda temsil etmekten gurur duyuyoruz.",
        images: {
          team: {
            title: "Ekibimiz",
            description: "ITAI ekip işbirliği",
          },
          factoryTeam: {
            title: "Fabrika Ekibi",
            description: "Fabrika ekip işbirliği",
          },
          fieldWork: {
            title: "Saha Çalışması",
            description: "Fabrika danışmanlığı",
          },
          exhibitions: {
            title: "Küresel Fuarlar",
            description: "Ticaret fuarı temsili",
          },
        },
      },
    },
    // About Page
    about: {
      title: "Misyonumuz basit:",
      titleAccent: "daha iyi eşleşmeler, daha hızlı ihracat",
      subtitle1: "Harika ürünleri onlara değer veren alıcılarla bağlamak için varız.",
      subtitle2: "Ekibimiz daha az, daha iyi müşteri adayları sunmak için pazar araştırması, veri mühendisliği ve doğrulamayı harmanlıyor.",
      subtitle3: "Endüstriyel şirketler uzun listeler yerine kaliteli konuşmalar istediklerinde bizi seçiyorlar.",
      features: {
        quality: "B2B müşteri adayı bulmada miktar yerine kaliteye odaklanma",
        verified: "Karar verici iletişim bilgileri olan doğrulanmış uluslararası alıcılar",
        global: "İhracata odaklı üreticiler için küresel pazar kapsamı",
      },
      cta: "Demo Talep Edin",
      card: {
        title: "İhracata Odaklı Üreticiler İçin Geliştirildi",
        description: "Ürünleri doğrulanmış uluslararası alıcılar ve güvenilir verilerle eşleştirerek üreticilerin ihracatlarını büyütmelerine yardımcı oluyoruz.",
        stats: {
          experience: "Yıl Deneyim",
          countries: "Ülke",
          buyers: "Doğrulanmış Alıcı",
        },
      },
      mission: {
        title: "Neden Varız",
        description: "Çok fazla üretici niteliksiz müşteri adayları ve uzun aday listeleri ile zaman kaybediyor. Hacim yerine hassasiyete inanıyoruz—doğru ürünleri doğru alıcılarla doğrulanmış veri ve pazar zekası aracılığıyla bağlama.",
        result: "Sonuç:",
        resultText: "Endüstriyel şirketler gerçek işe dönüşen kaliteli konuşmalar elde ediyor.",
      },
    },
    // Pricing Page
    pricing: {
      hero: {
        title: "İhracat yolculuğunuz için",
        titleAccent: "mükemmel planı seçin",
        subtitle: "Doğrulanmış uluslararası alıcılar ve temiz B2B verileri için basit, şeffaf fiyatlandırma. Küçük başlayın ve büyüdükçe ölçeklendirin.",
      },
      trustIndicators: {
        verified: {
          title: "Doğrulanmış İletişim Bilgileri",
          description: "Tüm iletişim bilgileri doğrulanmış ve aylık güncellenmektedir",
        },
        growing: {
          title: "Büyüyen Veritabanı",
          description: "Günlük binlerce yeni iletişim bilgisi eklenmektedir",
        },
        global: {
          title: "Küresel Kapsam",
          description: "180+ ülkede alıcılara erişim",
        },
      },
      comparison: {
        title: "Özellikleri Karşılaştır",
      },
      faq: {
        title: "Sıkça Sorulan Sorular",
        whatHappensNext: {
          question: "Sonra ne olacak?",
          answer: "Bilgilerinizi inceleyeceğiz ve kişiselleştirilmiş demonuzu planlamak için size takvim bağlantısı göndereceğiz.",
        },
        howLongPreview: {
          question: "Önizlemeyi ne kadar sürede alacağım?",
          answer: "Canlı demo sırasında (genellikle 24-48 saat içinde), hedef pazarlarınızdan doğrulanmış B2B iletişim verilerinin özenle seçilmiş örneğini göstereceğiz.",
        },
      },
      cards: {
        scopeTitle: "Pazar kapsamınızı seçin",
        country: "Ülke",
        countries: "Ülke",
        mostPopular: "En Popüler",
        getStarted: "Başlayın",
        forCountries: "için",
        plans: {
          starting: {
            name: "Başlangıç Paketi",
            description: "Uluslararası pazarları test eden küçük işletmeler için mükemmel",
            features: {
              prospecting: "AI Destekli Müşteri Adayı Bulma",
              scoring: "Müşteri Adayı Puanlama ve Gerekçelendirme",
              enrichment: "İletişim Verisi Zenginleştirme",
              management: "Merkezi İletişim Yönetimi",
              support: "Mesai saatleri içinde e-posta desteği",
            },
          },
          plus: {
            name: "Plus Paketi",
            description: "Küresel olarak genişleyen büyüyen şirketler için ideal",
            features: {
              everything: "Başlangıç Paketindeki her şey",
              premium: "Premium İletişim Verisi Zenginleştirme",
              onboarding: "Temel CRM başlangıç yardımı",
              profiling: "Gelişmiş müşteri adayı profilleme",
              priority: "Öncelikli e-posta desteği",
            },
          },
          proPlus: {
            name: "Pro Plus Paketi",
            description: "Ciddi uluslararası genişleme için kurumsal çözüm",
            features: {
              everything: "Plus Paketindeki her şey",
              analytics: "Gelişmiş Analitik ve Raporlama",
              security: "Kurumsal Düzeyde Güvenlik",
              whatsapp: "WhatsApp desteği",
              sessions: "Gelişmiş CRM strateji oturumları",
              health: "Proaktif sistem sağlık kontrolleri",
            },
          },
        },
        featuresTable: {
          features: "Özellikler",
          startingPackage: "Başlangıç Paketi",
          plusPackage: "Plus Paketi",
          proPlusPackage: "Pro Plus Paketi",
          leadGeneration: {
            title: "Müşteri Adayı Üretimi",
            aiProspecting: "AI Destekli Müşteri Adayı Bulma",
            aiProspectingDesc: "İdeal müşteri profilinize uygun şirketleri otomatik olarak bulun",
            leadScoring: "Müşteri Adayı Puanlama",
            leadScoringDesc: "Çabaları önceliklendirmek için katılım ve uyuma göre potansiyel müşterileri otomatik olarak sıralayın",
            leadReasoning: "Müşteri Adayı Akıl Yürütme",
            leadReasoningDesc: "AI taleplerinizle müşteri adaylarını akıl yürütür",
          },
          dataEnrichment: {
            title: "Veri Zenginleştirme",
            contactDataEnrichment: "İletişim Verisi Zenginleştirme",
            contactDataEnrichmentDesc: "Şirket web siteleri, iletişim e-postaları, sosyal medya profilleri ile müşteri adayı profilleme",
            premiumContactDataEnrichment: "Premium İletişim Verisi Zenginleştirme",
            premiumContactDataEnrichmentDesc: "Doğrulanmış iletişim detayları ve şirket bilgileri ile müşteri adayı profillerini geliştirin",
          },
          basicCrm: {
            title: "Temel CRM",
            centralizedContactManagement: "Merkezi İletişim Yönetimi",
            odooCrm: "ODOO CRM",
          },
          advancedAnalytics: {
            title: "Gelişmiş Analitik ve Raporlama",
            description: "Özelleştirilebilir panellerle satış performansı, müşteri davranışı ve ekip verimliliği hakkında derinlemesine içgörüler elde edin",
          },
          enterpriseSecurity: {
            title: "Kurumsal Düzeyde Güvenlik ve Uyumluluk",
            description: "GDPR gibi düzenlemeler için güçlü güvenlik kontrolleri, rol tabanlı izinler ve uyumluluk desteği özellikleri",
          },
          ecosystemIntegration: {
            title: "Kesintisiz Ekosistem Entegrasyonu",
            description: "CRM'i satış ve proje yönetimi ile birleştirir",
          },
          educationTraining: {
            title: "Eğitim ve Öğretim",
            basicCrmOnboarding: "Temel CRM kurulum ve kurulum yardımı",
            emailSupport: "İş saatleri içinde e-posta desteği",
            whatsappSupport: "İş saatleri içinde WhatsApp desteği",
            advancedCrmSessions: "Gelişmiş CRM strateji oturumları ve kişiselleştirilmiş yapılandırma",
            proactiveHealthChecks: "Proaktif sistem sağlık kontrolleri ve optimizasyon incelemeleri",
          },
        },
        additionalInfo: "Tüm planlar, değişen destek ve özelleştirme seviyeleri ile standart özelliklerimizi içerir.",
        customSolution: "Özel bir çözüme mi ihtiyacınız var?",
        proPlusRestriction: "Sadece 10 ülke üzerinde kullanılabilir",
      },
      finalCta: {
        title: "Bir sonraki uluslararası alıcılarınızı bulmaya hazır mısınız?",
        description: "Doğrulanmış B2B müşteri adayları için ITAI'ye güvenen binlerce ihracatçıya katılın. Bugün 14 günlük ücretsiz denemenizi başlatın - kredi kartı gerekmez.",
        startTrial: "Ücretsiz Deneme Başlat",
        contactSales: "Satış Ekibiyle İletişime Geç",
        disclaimer: "14 günlük ücretsiz deneme • Kredi kartı gerekmez • İstediğiniz zaman iptal edin",
      },
      links: {
        learnMore: "Çözümlerimiz hakkında daha fazla bilgi edinin:",
        verifiedLeads: "Doğrulanmış Müşteri Adayları",
        howItWorks: "Nasıl Çalışır",
        useCases: "Kullanım Durumları",
      },
    },
    // Use Cases Page
    useCases: {
      hero: {
        title: "Küresel satış yapan",
        titleAccent: "üreticiler için geliştirildi",
        subtitle: "Farklı türdeki üretim şirketlerinin doğrulanmış uluslararası alıcıları bulmak ve daha nitelikli toplantılar ayarlamak için ITAI'yi nasıl kullandığını görün.",
        bookDemo: "Demo Talep Edin",
        requestPricing: "Canlı demo ile fiyat talebi",
      },
      types: {
        manufacturing: {
          title: "Üretim şirketleri",
          description: "Üretim şirketleri, iletişim doğrulanmış alıcılarla başladığında ihracatlarını daha hızlı büyütür. Sizin ürünleriniz gibi ürünler satın alan şirketleri kısa listeye alıyor ve karar verici e-postalarını dahil ediyoruz böylece ilk mesajınız hedefe ulaşıyor.",
          subtitle: "Küresel olarak genişlemek isteyen üretim şirketleri için",
        },
        manufacturingNearMe: {
          title: "Yakınımdaki üretim şirketleri",
          description: "Ortaklık veya pilot projelere ihtiyacınız varsa, 'yakınımdaki üretim şirketleri' tarzı yerel niyeti eyaletiniz veya şehriniz için özenle seçilmiş bir listeye dönüştürüyoruz. Doğrulanmış iletişim bilgileri olan yakın potansiyel müşteriler, distribütörler ve tedarikçiler elde ediyorsunuz.",
          subtitle: "Küresel olarak genişlemek isteyen yakınımdaki üretim şirketleri için",
        },
        industrial: {
          title: "Endüstriyel şirketler",
          description: "Endüstriyel şirketler güvenilir bir şekilde yeniden sipariş veren OEM'lere ve distribütörlere ulaşmak için bizi kullanıyor. Uyum, marj ve MOQ'ya odaklanıyoruz böylece satış hattınız öngörülebilir hissettiriyor.",
          subtitle: "Küresel olarak genişlemek isteyen endüstriyel şirketler için",
        },
        contractManufacturing: {
          title: "Fason üretim şirketleri",
          description: "Fason üretim şirketleri sürekli dış kaynak kullanan alıcıları hedefleyerek kapasitelerini dolu tutuyor. Atölyenizin güçlü yanlarına uygun parça ailelerini, sertifikaları ve lot boyutlarını vurguluyoruz.",
          subtitle: "Küresel olarak genişlemek isteyen fason üretim şirketleri için",
        },
        industrialSupply: {
          title: "Endüstriyel tedarik şirketleri",
          description: "Endüstriyel tedarik şirketleri kataloglar programlı yeniden sipariş veren alıcılarla buluştuğunda tekrar eden işler kazanıyor. Yüksek değerli hesapları önceliklendirmek için ayak izi, SKU karışımı ve yeniden sipariş kalıplarına göre filtreliyoruz.",
          subtitle: "Küresel olarak genişlemek isteyen endüstriyel tedarik şirketleri için",
        },
        machining: {
          title: "Tezgahlama üretim şirketleri",
          description: "CNC ve hassas parça satan tezgahlama üretim şirketleri rol doğrulanmış iletişim bilgileri ile daha iyi alıcılara ulaşıyor. Toleransları, malzemeleri ve hacimleri işaretliyoruz böylece mesajınız alıcının dilini konuşuyor.",
          subtitle: "Küresel olarak genişlemek isteyen tezgahlama üretim şirketleri için",
        },
        medicalDevice: {
          title: "Tıbbi cihaz fason üretim şirketleri",
          description: "Tıbbi cihaz fason üretim şirketleri ISO 13485 ve pazar kurallarına uygun alıcılara ihtiyaç duyuyor. Sertifikasyon ve düzenleyici notlar ekliyoruz böylece iletişiminiz uyumluluğu hızla geçiyor.",
          subtitle: "Küresel olarak genişlemek isteyen tıbbi cihaz fason üretim şirketleri için",
        },
        manufacturer: {
          title: "Üretici şirketler",
          description: "Sürekli ihracat yapan üretici şirketler temiz, doğrulanmış hedef listesi ile başlıyor. Ekibiniz daha az, daha iyi müşteri adayları ve daha fazla rezerve edilmiş toplantı elde ediyor.",
          subtitle: "Küresel olarak genişlemek isteyen üretici şirketler için",
        },
        electronics: {
          title: "Elektronik ve elektronik üretim şirketleri",
          description: "Elektronik üretim şirketleri ve elektronik üretim şirketleri odaklanmış listeler aracılığıyla yüksek uyumlu OEM'lere ve distribütörlere ulaşıyor. Kapanış oranlarını artırmak için prototip, NPI ve seri üretim ihtiyaçlarını ayırıyoruz.",
          subtitle: "Küresel olarak genişlemek isteyen elektronik ve elektronik üretim şirketleri için",
        },
        pharmaceutical: {
          title: "İlaç üretim şirketleri",
          description: "İlaç üretim şirketleri kalite kontrollerini geçen incelenmiş distribütörler ve kurumsal alıcılarla bağlantı kuruyor. Sürtünmeyi erken kaldırmak için dosya mevcudiyeti ve uyumluluk notları dahil ediyoruz.",
          subtitle: "Küresel olarak genişlemek isteyen ilaç üretim şirketleri için",
        },
      },
      finalCta: {
        title: "Sektörünüz için doğrulanmış alıcıları görmeye hazır mısınız?",
        description: "Yüksek kaliteli doğrulanmış alıcılara erişim elde edin ve platformumuzun sizin gibi üretim şirketlerinin daha nitelikli toplantılar ayarlamasına nasıl yardımcı olabileceğini görün.",
        bookDemo: "Demo Talep Edin",
        requestPricing: "Canlı demo ile fiyat talebi",
      },
      links: {
        learnMore: "Çözümlerimiz hakkında daha fazla bilgi edinin:",
        howItWorks: "Nasıl Çalışır",
        verifiedLeads: "Doğrulanmış Müşteri Adayları",
        pricing: "Fiyatlandırma",
        useCases: "Üretim Kullanım Durumları",
        b2bData: "B2B Verisi",
      },
    },
    // FAQ Page
    faq: {
      hero: {
        title: "Sıkça Sorulan",
        titleAccent: "Sorular",
        subtitle: "ITAI'nin özellikleri, fiyatlandırması ve AI destekli platformumuzun ihracat işinizi nasıl dönüştürebileceği hakkında yaygın soruların yanıtlarını bulun.",
      },
      questions: {
        whatIsB2bProspecting: {
          question: "B2B müşteri adayı bulma nedir?",
          answer: "B2B müşteri adayı bulma, ICP'nize uyan şirketleri ve iletişim bilgilerini bulup nitelendirme işidir böylece iletişim verimli hale gelir - demo talep edin yaparak aksiyonda görün.",
        },
        leadScraperDifference: {
          question: "Müşteri adayı kazıyıcısı yaklaşımınızdan nasıl farklı?",
          answer: "Müşteri adayı kazıyıcısı büyük ölçekte doğrulanmamış veri çekerken biz rol uyumu ve teslim edilebilirlik kontrolleri olan doğrulanmış müşteri adayları sunuyoruz - önizleme için demo talep edin yapın.",
        },
        b2bProspectingTool: {
          question: "B2B müşteri adayı bulma aracı veya yazılımı sunuyor musunuz?",
          answer: "İş akışınıza entegre olan ve popüler araçlarla bütünleşen temiz segmentler sunuyoruz - örnek segmentleri görmek için demo talep edin yapın.",
        },
        freeB2bLeadsDatabase: {
          question: "Ücretsiz B2B müşteri adayları veritabanı alabilir miyim?",
          answer: "Ücretsiz kaynaklar düşük doğruluk ve uyumluluk sorunları riski taşır; canlı demoda küçük doğrulanmış önizleme gösteriyoruz.",
        },
        regulatedCategories: {
          question: "Düzenlenmiş kategorilerde B2B müşteri adayı bulmayı destekliyor musunuz?",
          answer: "Evet, uyumluluk notları ile; canlı demoda örnekleri görün.",
        },
      },
      cta: {
        title: "Hala sorularınız mı var?",
        description: "Aradığınız yanıtı bulamıyor musunuz? Uzman ekibimiz ITAI'nin ihracat işinizi nasıl dönüştürebileceğini anlamanızda size yardımcı olmak için burada.",
        button: "Demo Talep Edin",
      },
    },
    // Contact Page
    contact: {
      hero: {
        title: "Demo Talep Edin",
        subtitle: "Ürününüz, hedef ülkeleriniz ve alıcı profiliniz hakkında bize bilgi verin. Demo sırasında doğrulanmış iletişim bilgileri ve B2B iletişim verilerinin özenle seçilmiş önizlemesini göstereceğiz.",
      },
      form: {
        title: "Kişiselleştirilmiş Demonuzu Alın",
        fields: {
          name: "Ad *",
          namePlaceholder: "Tam adınız",
          email: "İş e-postası *",
          emailPlaceholder: "siz@sirket.com",
          company: "Şirket *",
          companyPlaceholder: "Şirket adınız",
          productCategory: "Ürün kategorisi *",
          productCategoryPlaceholder: "örn., Elektronik, Tıbbi Cihazlar, Endüstriyel Ekipman",
          targetCountries: "Hedef ülkeler *",
          targetCountriesPlaceholder: "örn., ABD, Almanya, Japonya, Brezilya",
          notes: "Notlar",
          notesPlaceholder: "İhracat hedefleriniz, hedef alıcı profiliniz veya özel gereksinimleriniz hakkında daha fazla bilgi verin...",
        },
        button: "Demo Talep Edin",
        submitting: "Gönderiliyor...",
        success: {
          title: "İlginiz için teşekkür ederiz!",
          message: "Bilgilerinizi aldık ve kişiselleştirilmiş demonuzu planlamak için 24 saat içinde sizinle iletişime geçeceğiz.",
          backButton: "Forma geri dön",
        },
      },
      faq: {
        title: "Sıkça Sorulan Sorular",
        whatHappensNext: {
          question: "Sonra ne olacak?",
          answer: "Bilgilerinizi inceleyeceğiz ve kişiselleştirilmiş demonuzu planlamak için size takvim bağlantısı göndereceğiz.",
        },
        howLongPreview: {
          question: "Önizlemeyi ne kadar sürede alacağım?",
          answer: "Canlı demo sırasında (genellikle 24-48 saat içinde), hedef pazarlarınızdan doğrulanmış B2B iletişim verilerinin özenle seçilmiş örneğini göstereceğiz.",
        },
      },
      demo: {
        title: "Demonuzda Ne Göreceksiniz",
        items: {
          preview: "Hedef pazarlarınız için doğrulanmış B2B iletişim verilerinin özenle seçilmiş önizlemesi",
          contacts: "Doğrulanmış e-postaları olan örnek karar verici iletişim bilgileri",
          profiles: "Sektörünüz için şirket profilleri ve pazar zekası",
          walkthrough: "Verilerimizin ihracatlarınızı nasıl hızlandırabileceğinin canlı gösterimi",
        },
      },
      cta: {
        title: "Ürünleriniz için doğrulanmış alıcıları görmeye hazır mısınız?",
        description: "Doğrulanmış uluslararası alıcılar için ITAI'ye güvenen dünya çapındaki üreticilere katılın. Bugün kişiselleştirilmiş demonuzu rezerve edin.",
        button: "Demo Planla",
      },
    },
    // How It Works Page
    howItWorks: {
      hero: {
        title: "Ürün özetinden",
        titleAccent: "doğrulanmış alıcılara",
        subtitle: "B2B müşteri adayı bulma sürecimiz ürün özelliklerinizi doğrulanmış iletişim bilgileri olan nitelikli uluslararası alıcıların satış hattına dönüştürür.",
      },
      steps: {
        defineProfile: {
          title: "İdeal alıcı profilinizi tanımlayın",
          description: "Ne ürettiğinizi, nereye sevkiyat yaptığınızı ve kime ulaşmak istediğinizi bize söylüyorsunuz. Bu girdiyi satış ekibinizin dakikalar içinde anlaşabileceği bir ICP'ye dönüştürüyoruz.",
        },
        discoverCompanies: {
          title: "Eşleşen şirketleri keşfedin",
          description: "Sistemimiz küresel pazarları haritalandırır ve gerçek satın alma niyeti sinyalleri olan şirketleri ortaya çıkarır. Bu, araştırmacı disiplini ile B2B müşteri adayı bulma acentesi düşüncesidir.",
        },
        verifyDecisionMakers: {
          title: "Karar vericileri ve e-postaları doğrulayın",
          description: "Rol uyumunu onaylıyor, teslim edilebilirliği doğruluyoruz ve ulaşılamayan herhangi bir iletişim bilgisini hızla değiştiriyoruz. Sonuç, ekibinizin hemen harekete geçebileceği doğrulanmış müşteri adaylarıdır.",
        },
        packageOutreach: {
          title: "İletişim için paketleyin",
          description: "Kampanyalarınız ve CRM alanlarınızla eşleşen CSV dosyaları ve temiz segmentler alıyorsunuz. Zaten bir müşteri adayı bulma platformu kullanıyorsanız, alanları hizalıyoruz böylece içe aktarmanız saniyeler sürer.",
        },
      },
      faq: {
        title: "Sıkça Sorulan Sorular",
        howProcess: {
          question: "B2B müşteri adayı bulma süreci nasıl çalışır?",
          answer: "B2B müşteri adayı bulma yazılımımız ideal alıcı profilinizle başlar ve hemen iletişime geçebileceğiniz doğrulanmış müşteri adaylarıyla biter. Tüm araştırma ve doğrulama sürecini biz yürütüyoruz—aksiyonda görmek için demo talep edin yapın.",
        },
        whatMakesDifferent: {
          question: "Bunu diğer müşteri adayı bulma platformlarından farklı kılan nedir?",
          answer: "Genel müşteri adayı bulma platformlarının aksine, doğrulanmış uluslararası alıcılar ve karar verici iletişim bilgileri ile özellikle B2B ihracat pazarlarına odaklanıyoruz—önizleme için demo talep edin yapın.",
        },
        howQuickly: {
          question: "Doğrulanmış müşteri adaylarını ne kadar hızlı alabilirim?",
          answer: "Çoğu müşteri, ideal alıcı profillerini tanımladıktan sonra 48-72 saat içinde ilk doğrulanmış müşteri adayı grubunu alır—örnek segmentleri görmek için demo talep edin yapın.",
        },
        leadScraperDifference: {
          question: "Müşteri adayı kazıyıcısı yaklaşımınızdan nasıl farklı?",
          answer: "Müşteri adayı kazıyıcısı büyük ölçekte doğrulanmamış veri çekerken biz rol uyumu ve teslim edilebilirlik kontrolleri olan doğrulanmış müşteri adayları sunuyoruz—önizleme için demo talep edin yapın.",
        },
        prospectingTool: {
          question: "B2B müşteri adayı bulma aracı veya yazılımı sunuyor musunuz?",
          answer: "İş akışınıza entegre olan ve popüler araçlarla bütünleşen temiz segmentler sunuyoruz—örnek segmentleri görmek için demo talep edin yapın.",
        },
        freeDatabase: {
          question: "Ücretsiz B2B müşteri adayları veritabanı alabilir miyim?",
          answer: "Ücretsiz kaynaklar düşük doğruluk ve uyumluluk sorunları riski taşır; canlı demoda küçük doğrulanmış önizleme gösteriyoruz.",
        },
        regulatedCategories: {
          question: "Düzenlenmiş kategorilerde B2B müşteri adayı bulmayı destekliyor musunuz?",
          answer: "Evet, uyumluluk notları ile; canlı demoda örnekleri görün.",
        },
      },
      cta: {
        title: "B2B müşteri adayı bulmanızı dönüştürmeye hazır mısınız?",
        subtitle: "B2B müşteri adayı bulma yazılımımızın doğrulanmış müşteri adayları bulmanıza ve daha nitelikli toplantılar ayarlamanıza nasıl yardımcı olabileceğini görün.",
        button: "Demo Talep Edin",
        secondaryButton: "Canlı demo ile fiyat talebi",
      },
    },
    // Verified Leads Page
    verifiedLeads: {
      hero: {
        title: "Doğrulanmış Müşteri Adayları",
        titleAccent: "Dönüştüren",
        subtitle: "Doğrulanmış e-postalar, karar verici iletişim bilgileri ve daha fazla ihracat anlaşması kazanmanıza yardımcı olan şirket zekası ile B2B iş müşteri adayları alın.",
      },
    },
    // Common
    common: {
      loading: "Yükleniyor...",
      error: "Bir hata oluştu",
      tryAgain: "Tekrar dene",
      close: "Kapat",
      next: "İleri",
      previous: "Geri",
      submit: "Gönder",
      cancel: "İptal",
      save: "Kaydet",
      delete: "Sil",
      edit: "Düzenle",
      view: "Görüntüle",
      search: "Ara",
      filter: "Filtrele",
      sort: "Sırala",
      select: "Seç",
      all: "Tümü",
      none: "Hiçbiri",
      yes: "Evet",
      no: "Hayır",
      ok: "Tamam",
      back: "Geri",
      continue: "Devam Et",
      finish: "Bitir",
      start: "Başlat",
      stop: "Durdur",
      pause: "Duraklat",
      resume: "Devam Et",
      refresh: "Yenile",
      reload: "Yeniden Yükle",
      reset: "Sıfırla",
      clear: "Temizle",
      apply: "Uygula",
      confirm: "Onayla",
      language: "Dil",
      english: "English",
      turkish: "Türkçe",
    },
  },
}

export function getNestedTranslation(translations: Translations, key: string): string {
  const keys = key.split(".")
  let current: string | Translations = translations

  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = current[k]
    } else {
      return key // Return the key if translation not found
    }
  }

  return typeof current === "string" ? current : key
}
