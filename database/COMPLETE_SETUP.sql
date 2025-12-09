-- ============================================
-- COMPLETE DATABASE SETUP FOR ITAI CHAT v2
-- ============================================
-- This script creates all necessary tables for the ITAI Chat application
-- Run this script in your new Supabase SQL Editor
-- Tables: conversation_summaries, contact_submissions
-- ============================================

-- ============================================
-- 1. CONVERSATION_SUMMARIES TABLE
-- ============================================
-- Stores all completed chat conversations with export analysis data

CREATE TABLE IF NOT EXISTS conversation_summaries (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Timestamp (automatically set)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Session identifier
    session_id TEXT,
    
    -- Business information
    product TEXT,
    target_country TEXT,
    gtip_code TEXT,
    sales_channels TEXT[], -- Array of sales channels
    website TEXT,
    
    -- Contact information
    contact_name TEXT,
    email TEXT,
    phone TEXT,
    
    -- Market analysis
    keywords TEXT[], -- Array of keywords
    competitors JSONB, -- JSON array of competitor objects
    customers JSONB, -- JSON array of customer objects
    
    -- System information
    language TEXT DEFAULT 'en',
    chat_history JSONB, -- Complete chat message history
    conversation_data JSONB -- Full conversation data and metadata including chat messages
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_conversation_summaries_created_at ON conversation_summaries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversation_summaries_target_country ON conversation_summaries(target_country);
CREATE INDEX IF NOT EXISTS idx_conversation_summaries_language ON conversation_summaries(language);
CREATE INDEX IF NOT EXISTS idx_conversation_summaries_contact_name ON conversation_summaries(contact_name);
CREATE INDEX IF NOT EXISTS idx_conversation_summaries_email ON conversation_summaries(email);
CREATE INDEX IF NOT EXISTS idx_conversation_summaries_product ON conversation_summaries(product);
CREATE INDEX IF NOT EXISTS idx_conversation_summaries_session_id ON conversation_summaries(session_id);

-- Add indexes for chat history queries (GIN indexes for JSONB)
CREATE INDEX IF NOT EXISTS idx_conversation_summaries_chat_history ON conversation_summaries USING GIN (chat_history);
CREATE INDEX IF NOT EXISTS idx_conversation_summaries_has_chat ON conversation_summaries USING GIN ((conversation_data->'hasChatHistory'));
CREATE INDEX IF NOT EXISTS idx_conversation_summaries_message_count ON conversation_summaries USING GIN ((conversation_data->'messageCount'));
CREATE INDEX IF NOT EXISTS idx_conversation_summaries_data ON conversation_summaries USING GIN (conversation_data);

-- Enable Row Level Security
ALTER TABLE conversation_summaries ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (you can restrict this later based on user roles)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'conversation_summaries' 
        AND policyname = 'Allow all operations on conversation_summaries'
    ) THEN
        CREATE POLICY "Allow all operations on conversation_summaries" ON conversation_summaries
            FOR ALL USING (true);
    END IF;
END $$;

-- Add comments for documentation
COMMENT ON TABLE conversation_summaries IS 'Stores all chat conversations with complete message history and extracted business data';
COMMENT ON COLUMN conversation_summaries.id IS 'Unique identifier for each conversation';
COMMENT ON COLUMN conversation_summaries.created_at IS 'Timestamp when conversation was created';
COMMENT ON COLUMN conversation_summaries.session_id IS 'Session identifier to track user sessions';
COMMENT ON COLUMN conversation_summaries.product IS 'Product or category user wants to export';
COMMENT ON COLUMN conversation_summaries.target_country IS 'Target country for export';
COMMENT ON COLUMN conversation_summaries.gtip_code IS 'GTIP/HS code for the product';
COMMENT ON COLUMN conversation_summaries.sales_channels IS 'Array of sales channels (wholesalers, retailers, etc.)';
COMMENT ON COLUMN conversation_summaries.website IS 'User company website';
COMMENT ON COLUMN conversation_summaries.contact_name IS 'Name of the contact person';
COMMENT ON COLUMN conversation_summaries.email IS 'Email address of contact';
COMMENT ON COLUMN conversation_summaries.phone IS 'Phone number of contact';
COMMENT ON COLUMN conversation_summaries.keywords IS 'Array of market keywords for SEO/research';
COMMENT ON COLUMN conversation_summaries.competitors IS 'JSON array of competitor companies';
COMMENT ON COLUMN conversation_summaries.customers IS 'JSON array of potential customers';
COMMENT ON COLUMN conversation_summaries.language IS 'Language of the conversation (en/tr)';
COMMENT ON COLUMN conversation_summaries.chat_history IS 'JSONB field containing complete chat message history with timestamps';
COMMENT ON COLUMN conversation_summaries.conversation_data IS 'JSONB field containing: messages array, timestamps, completion flags, and metadata';

-- ============================================
-- 2. CONTACT_SUBMISSIONS TABLE
-- ============================================
-- Stores all contact form submissions from the demo booking page

CREATE TABLE IF NOT EXISTS contact_submissions (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Timestamp (automatically set)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Contact information
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    
    -- Business information
    product_category TEXT NOT NULL,
    target_countries TEXT NOT NULL,
    notes TEXT,
    
    -- System information
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    
    -- Status tracking
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'waiting', 'contacted', 'demo_scheduled', 'declined', 'ignored', 'closed')),
    demo_scheduled_at TIMESTAMPTZ,
    follow_up_notes TEXT,
    admin_notes TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_company ON contact_submissions(company);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_product_category ON contact_submissions(product_category);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (you can restrict this later based on user roles)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'contact_submissions' 
        AND policyname = 'Allow all operations on contact_submissions'
    ) THEN
        CREATE POLICY "Allow all operations on contact_submissions" ON contact_submissions
            FOR ALL USING (true);
    END IF;
END $$;

-- Add comments for documentation
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the demo booking page';
COMMENT ON COLUMN contact_submissions.id IS 'Unique identifier for each submission';
COMMENT ON COLUMN contact_submissions.created_at IS 'Timestamp when submission was created';
COMMENT ON COLUMN contact_submissions.name IS 'Full name of the contact person';
COMMENT ON COLUMN contact_submissions.email IS 'Work email address';
COMMENT ON COLUMN contact_submissions.company IS 'Company name';
COMMENT ON COLUMN contact_submissions.product_category IS 'Product category they want to export';
COMMENT ON COLUMN contact_submissions.target_countries IS 'Target countries for export';
COMMENT ON COLUMN contact_submissions.notes IS 'Additional notes about export goals';
COMMENT ON COLUMN contact_submissions.status IS 'Current status of the lead (new, waiting, contacted, demo_scheduled, declined, ignored, closed)';
COMMENT ON COLUMN contact_submissions.admin_notes IS 'Internal notes for admin use';

-- ============================================
-- EXAMPLE DATA STRUCTURES (For Reference)
-- ============================================

/*
==============================================
CONVERSATION_SUMMARIES TABLE - conversation_data JSONB structure:
==============================================
{
  "timestamp": "2025-10-07T10:00:00.000Z",
  "chatStarted": "2025-10-07T09:45:00.000Z",
  "chatCompleted": "2025-10-07T10:00:00.000Z",
  "messageCount": 15,
  "hasChatHistory": true,
  "messages": [
    {
      "type": "message",
      "role": "user",
      "content": [{"type": "input_text", "text": "Hello, I want to export textiles to Italy"}]
    },
    {
      "type": "message", 
      "role": "assistant",
      "content": [{"type": "output_text", "text": "Great! I can help you with textile exports..."}]
    }
  ],
  "structuredData": {
    "product": "Textiles",
    "country": "Italy",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "website": "www.example.com",
    "gtipCode": "5208.11",
    "salesChannels": ["Wholesalers", "Distributors"],
    "keywords": ["cotton fabric", "textile export", "italian market"]
  },
  "completionData": {
    "hasProduct": true,
    "hasTargetMarket": true,
    "hasGtipCode": true,
    "hasSalesChannels": true,
    "hasContactInfo": true
  }
}

==============================================
CONVERSATION_SUMMARIES TABLE - competitors JSONB structure:
==============================================
[
  {
    "name": "Company Name",
    "type": "foreign" | "domestic",
    "source": "ai-suggestion" | "user-input",
    "website": "https://example.com"
  }
]

==============================================
CONVERSATION_SUMMARIES TABLE - customers JSONB structure:
==============================================
[
  {
    "name": "Customer Name",
    "source": "ai-suggestion" | "user-input",
    "website": "https://example.com",
    "description": "Description of the potential customer"
  }
]
*/

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Next steps:
-- 1. Update your .env file with your Supabase credentials:
--    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
--    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
--    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
-- 
-- 2. Verify the tables were created:
--    SELECT * FROM conversation_summaries LIMIT 1;
--    SELECT * FROM contact_submissions LIMIT 1;
--
-- 3. Optional: Update RLS policies for production security
-- ============================================

