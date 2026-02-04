# Quick Start Guide - Expense Tracker

## 🎯 5-Minute Setup

### Step 1: Get Supabase Credentials (2 min)

1. Visit [supabase.com](https://supabase.com) → Sign up for free
2. Create a new project (name it "expense-tracker")
3. Wait for the project to initialize (~1 min)
4. Go to **Settings > API** (left sidebar)
5. Copy these two values:
   - `Project URL` 
   - `anon public` key

### Step 2: Setup Environment Variables (1 min)

Edit `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=paste_your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

### Step 3: Create Database Table (1 min)

In Supabase dashboard:
1. Go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy & paste this SQL:

```sql
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON expenses
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON expenses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public delete" ON expenses
  FOR DELETE USING (true);
```

4. Click **RUN**

### Step 4: Start the App (1 min)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📱 Features You Get

| Feature | Details |
|---------|---------|
| **Add Expenses** | Description, amount, category, date |
| **View All** | See all your expenses sorted by date |
| **Delete** | Remove expenses with one click |
| **Stats** | Monthly totals & category breakdown |
| **Filter by Month** | Switch between months easily |

---

## 🚀 Deploy to GitHub Pages (Optional)

When ready to share online:

1. **Create GitHub repo** and push code
2. **Update next.config.js**:
   ```javascript
   const nextConfig = {
     output: 'export',
     basePath: '/expense-tracker',
   };
   module.exports = nextConfig;
   ```
3. **Enable GitHub Pages** in repo settings
4. Push to main branch - auto-deployed! ✨

---

## ❓ Common Issues

| Problem | Solution |
|---------|----------|
| "Failed to load expenses" | Check `.env.local` has correct values |
| Can't add expense | Ensure database table exists in Supabase |
| Port 3000 in use | Run `npm run dev -- -p 3001` |

---

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

Enjoy! 💰
