# Database Setup Instructions

## Step 1: Run SQL Script in Supabase

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project (or create a new one)
3. Click on "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy the contents of `COMPLETE_SETUP.sql`
6. Paste into the SQL Editor
7. Click "Run" or press `Ctrl/Cmd + Enter`

**Expected Result:** You should see "Success. No rows returned" - this means all tables were created successfully.

## Step 2: Verify Tables Were Created

Run this query to verify:

```sql
-- Check conversation_summaries table
SELECT COUNT(*) FROM conversation_summaries;

-- Check contact_submissions table
SELECT COUNT(*) FROM contact_submissions;

-- View table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name IN ('conversation_summaries', 'contact_submissions')
ORDER BY table_name, ordinal_position;
```

## Step 3: Get Your Supabase Credentials

1. In Supabase Dashboard, go to **Settings** → **API**
2. You'll find:
   - **Project URL** (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - **Project API keys:**
     - `anon` `public` key (safe to use in browser)
     - `service_role` key (keep secret, server-side only)

## Step 4: Update Your .env File

Update your `.env` file with the following structure:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# OpenAI Configuration (keep your existing key)
OPENAI_API_KEY=your_openai_api_key

# Other environment variables...
```

### Important Notes:
- Replace `your-project-id.supabase.co` with your actual Supabase URL
- Replace `your_anon_public_key_here` with your anon/public key
- Replace `your_service_role_key_here` with your service role key
- **NEVER commit the service role key to Git** - it has admin access!

## Step 5: Test the Connection

Run your application:

```bash
npm run dev
```

Then test:
1. Complete a chat conversation at `/chat` or `/tr/sohbet`
2. Submit a contact form at `/demo` or `/tr/demo`
3. Check your Supabase Dashboard → Table Editor → `conversations` table
4. You should see your test data there

## Database Tables Overview

### 1. `conversation_summaries` Table
Stores all chat conversations with:
- Basic info: product, country, GTIP code
- Contact: name, email, phone
- Arrays: sales_channels, keywords
- JSONB: competitors, customers, conversation_data (full chat history)

### 2. `contact_submissions` Table
Stores contact form submissions with:
- Contact info: name, email, company
- Business: product_category, target_countries
- Tracking: status, demo_scheduled_at, admin_notes

## Troubleshooting

### Error: "relation already exists"
- This is fine! It means tables already exist
- The script uses `CREATE TABLE IF NOT EXISTS`

### Error: "permission denied"
- Make sure you're using the correct project
- Check that your account has admin access

### No data showing up after testing
1. Check browser console for errors
2. Verify .env file has correct credentials
3. Check Supabase logs: Dashboard → Logs
4. Ensure RLS policies are set correctly

### Can't connect from application
1. Restart your development server after updating .env
2. Clear `.next` cache: `rm -rf .next`
3. Verify environment variables are loaded:
   ```javascript
   console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
   ```

## Security Recommendations (Production)

Before going to production, consider:

1. **Restrict RLS Policies:**
   ```sql
   -- Remove the "allow all" policies and create specific ones
   DROP POLICY "Allow all operations on conversation_summaries" ON conversation_summaries;
   DROP POLICY "Allow all operations on contact_submissions" ON contact_submissions;
   
   -- Create more restrictive policies based on your needs
   ```

2. **Enable Email Confirmations** in Supabase Auth settings

3. **Set up Database Backups** in Supabase Dashboard

4. **Monitor API Usage** to prevent abuse

5. **Use environment-specific .env files:**
   - `.env.local` (development, not committed)
   - `.env.production` (production secrets)

## Need Help?

- Supabase Documentation: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Next.js Environment Variables: https://nextjs.org/docs/basic-features/environment-variables

