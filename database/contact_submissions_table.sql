-- Create contact_submissions table for ITAI Contact Form
-- This table stores all contact form submissions from the demo booking page

CREATE TABLE contact_submissions (
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
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'demo_scheduled', 'closed')),
    demo_scheduled_at TIMESTAMPTZ,
    follow_up_notes TEXT
);

-- Create indexes for better query performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_company ON contact_submissions(company);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_product_category ON contact_submissions(product_category);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now (you can restrict this later)
CREATE POLICY "Allow all operations on contact_submissions" ON contact_submissions
    FOR ALL USING (true);

-- Add comments for documentation
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the demo booking page';
COMMENT ON COLUMN contact_submissions.name IS 'Full name of the contact person';
COMMENT ON COLUMN contact_submissions.email IS 'Work email address';
COMMENT ON COLUMN contact_submissions.company IS 'Company name';
COMMENT ON COLUMN contact_submissions.product_category IS 'Product category they want to export';
COMMENT ON COLUMN contact_submissions.target_countries IS 'Target countries for export';
COMMENT ON COLUMN contact_submissions.notes IS 'Additional notes about export goals';
COMMENT ON COLUMN contact_submissions.status IS 'Current status of the lead';
