# 🚀 Quick Start - Database Migration Checklist

## ✅ Complete Setup in 5 Steps

### Step 1: Open Supabase SQL Editor
1. Go to https://app.supabase.com
2. Open your project
3. Click **SQL Editor** in sidebar
4. Click **New Query**

### Step 2: Run the Setup Script
1. Open file: `database/COMPLETE_SETUP.sql`
2. Copy ALL the content
3. Paste into Supabase SQL Editor
4. Click **RUN** ▶️
5. ✅ Success! (You should see "Success. No rows returned")

### Step 3: Get Your Supabase Keys
1. In Supabase, go to: **Settings** → **API**
2. Copy these 3 values:
   - **URL** (Project URL)
   - **anon/public** key
   - **service_role** key (secret!)

### Step 4: Update .env File
1. Open your `.env` file (in project root)
2. Add/Update these lines:

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL_HERE
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
```

3. Replace the placeholder values with your actual keys from Step 3
4. Save the file

### Step 5: Restart & Test
```bash
# Stop your dev server (Ctrl+C)
# Clear cache
rm -rf .next

# Start again
npm run dev
```

Test it:
1. Open http://localhost:3000/chat
2. Complete a conversation
3. Go to Supabase → Table Editor → `conversation_summaries`
4. You should see your test data! 🎉

---

## 📋 What Tables Were Created?

### 1️⃣ `conversation_summaries` Table
Stores chat conversations with:
- Product, country, GTIP code
- Contact info (name, email, phone)
- Keywords, competitors, customers
- Chat history (separate column)
- Conversation data (metadata)

### 2️⃣ `contact_submissions` Table
Stores contact form submissions with:
- Name, email, company
- Product category, target countries
- Status tracking (new, contacted, demo_scheduled, etc.)

---

## 🔍 Verify Everything Works

Run this query in Supabase SQL Editor:

```sql
-- Check if tables exist
SELECT 
  table_name, 
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_name IN ('conversation_summaries', 'contact_submissions');
```

**Expected result:** 
- `conversation_summaries` → 17 columns
- `contact_submissions` → 14 columns

---

## ⚠️ Troubleshooting

### "Can't connect to database"
- Check .env file has correct values
- Restart dev server (`npm run dev`)
- Clear browser cache

### "Table already exists"
- That's OK! Script uses `IF NOT EXISTS`
- Your tables are already created

### "Permission denied"
- Check you're logged into correct Supabase project
- Verify your account has admin access

### Data not saving
1. Check browser console (F12) for errors
2. Verify environment variables:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
   ```
3. Check Supabase Dashboard → Logs

---

## 📚 Additional Resources

- **Detailed Instructions:** See `SETUP_INSTRUCTIONS.md`
- **SQL Script:** `COMPLETE_SETUP.sql`
- **.env Template:** `ENV_TEMPLATE.txt`

---

## 🎯 That's It!

Your database is now set up with the exact same table structure. The table names are consistent (`conversation_summaries` and `contact_submissions`), so your application will work seamlessly with the new database.

**Need help?** Check `SETUP_INSTRUCTIONS.md` for detailed troubleshooting.

