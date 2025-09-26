-- Create conversations table for ITAI Chat application
-- This table stores all completed chat conversations with export analysis data

CREATE TABLE conversations (
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
    conversation_data JSONB -- Full conversation data and metadata
);

-- Create indexes for better query performance
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX idx_conversations_target_country ON conversations(target_country);
CREATE INDEX idx_conversations_language ON conversations(language);
CREATE INDEX idx_conversations_contact_name ON conversations(contact_name);
CREATE INDEX idx_conversations_email ON conversations(email);
CREATE INDEX idx_conversations_product ON conversations(product);

-- Enable Row Level Security (optional, for future use)
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now (you can restrict this later)
CREATE POLICY "Allow all operations on conversations" ON conversations
    FOR ALL USING (true);

-- Example data structure for competitors JSONB field:
-- [
--   {
--     "name": "Company Name",
--     "type": "foreign" | "domestic",
--     "source": "ai-suggestion" | "user-input",
--     "website": "https://example.com"
--   }
-- ]

-- Example data structure for customers JSONB field:
-- [
--   {
--     "name": "Customer Name",
--     "source": "ai-suggestion" | "user-input",
--     "website": "https://example.com",
--     "description": "Description of the potential customer"
--   }
-- ]

-- Example data structure for conversation_data JSONB field:
-- {
--   "messages": [...], // Full chat messages array
--   "timestamp": "2025-09-26T10:00:00.000Z",
--   "completionData": {
--     "hasProduct": true,
--     "hasTargetMarket": true,
--     // ... other completion flags
--   }
-- }
