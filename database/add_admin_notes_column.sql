-- Add admin_notes column to contact_submissions table
ALTER TABLE contact_submissions 
ADD COLUMN admin_notes TEXT;

-- Add comment to describe the column
COMMENT ON COLUMN contact_submissions.admin_notes IS 'Internal admin notes, not visible to customers';
