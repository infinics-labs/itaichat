-- Update contact_submissions table to include new status options
-- Run this in Supabase SQL Editor to add the new status values

-- Drop the existing check constraint
ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_status_check;

-- Add the new check constraint with all status options
ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_status_check 
CHECK (status IN ('new', 'waiting', 'pending', 'arranged', 'declined', 'demo', 'contacted', 'demo_scheduled', 'closed'));

-- Update the default status comment
COMMENT ON COLUMN contact_submissions.status IS 'Current status of the lead: new, waiting, pending, arranged, declined, demo, contacted, demo_scheduled, closed';
