# Supabase Setup Guide - Expense Tracker

This guide will help you set up Supabase for the Expense Tracker app **with minimal manual work**.

## Prerequisites

- A Supabase account (free tier available at https://supabase.com)
- GitHub account (for secrets)

## Quick Setup (3 Steps)

### Step 1: Create Supabase Project (2 minutes)

Go to **https://supabase.com** → **New Project**

Fill in:
- **Organization**: Create one or select existing
- **Project Name**: `expense-tracker`
- **Database Password**: Create a strong password (save it!)
- **Region**: Choose closest to you (e.g., us-east-1)

Click **Create new project** and wait for setup (2-3 minutes).

---

### Step 2: Run Database Setup SQL (1 minute)

Once your Supabase project is ready:

1. Go to **SQL Editor** in Supabase dashboard
2. Click **New Query**
3. **Copy entire contents** from this file in your repo:
   ```
   scripts/setup-supabase.sql
   ```
4. **Paste it** into the SQL Editor
5. Click **Run**

✅ You should see: "Query executed successfully"

This creates:
- `expenses` table with UUID primary key
- Row Level Security (RLS) policies for public access
- Indexes for performance

---

### Step 3: Add GitHub Secrets (2 minutes)

**Get your Supabase credentials:**

1. In Supabase, go to **Settings > API**
2. Copy these values:
   - `Project URL` (example: `https://abcdef123456.supabase.co`)
   - `anon key` (long string starting with `eyJ...`)

**Add to GitHub Secrets:**

1. Go to your GitHub repo → **Settings > Secrets and variables > Actions**
2. Click **New repository secret**
3. Add Secret #1:
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Your Project URL (paste from Supabase)
   - Click **Add secret**

4. Add Secret #2:
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: Your anon key (paste from Supabase)
   - Click **Add secret**

---

### Step 4: Set Up Local Development (2 minutes)

**Create `.env.local` file** in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual values from Step 3.

**Restart dev server:**
```bash
npm run dev
```

✅ Your app should now sync with Supabase!

---

## 🔐 Security Notes

- **`.env.local` is NEVER committed to GitHub** (it's in `.gitignore`)
- **GitHub Secrets are encrypted** and never logged
- **Supabase RLS policies** allow public read/insert/delete (suitable for demo/personal use)
- **In production**, add authentication if needed

---

## Testing Supabase Connection

1. Open the app: http://localhost:3000
2. Add an expense
3. Go to Supabase **Table Editor** → `expenses` table
4. You should see your expense in the table ✅

---

## Troubleshooting

### "Using demo mode..." message in app
- `.env.local` not found or missing credentials
- Verify file exists and contains correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart dev server after adding `.env.local`

### Supabase credentials not working
- Check they're not accidentally truncated
- Verify you copied from **Settings > API** (not Settings > Database)
- Ensure anon key starts with `eyJ...`

### Can't see expenses in Supabase table
- Check RLS policies are created (run setup-supabase.sql again)
- Verify app is using Supabase mode (check for "Demo Mode" message)
- Check browser console for errors (F12 > Console tab)

---

## Next Steps (Optional)

- **Add authentication**: Restrict access to specific users only
- **Add email verification**: Require email confirmation
- **Enable backups**: Set up automated database backups
- **Custom domains**: Set up Supabase custom domain

See Supabase docs: https://supabase.com/docs

---

**That's it!** 🎉 Your Expense Tracker is now connected to Supabase!
