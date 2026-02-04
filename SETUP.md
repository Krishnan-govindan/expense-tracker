# 💰 Expense Tracker - Daily Expense Management App

A beautiful and intuitive web application to track your daily expenses with dates, categories, and visual statistics. Built with **Next.js**, **Tailwind CSS**, and **Supabase**.

## 🌟 Features

✅ **Add Daily Expenses** - Track expenses with description, amount, category, and date  
✅ **Category Support** - Organize expenses into Food, Transport, Entertainment, Utilities, Health, Shopping, and Other  
✅ **Visual Statistics** - Monthly summary with total spending, transaction count, and category breakdown  
✅ **Date Filtering** - View expenses for different months  
✅ **Delete Expenses** - Remove incorrect entries  
✅ **Modern UI** - Clean and responsive design with Tailwind CSS  
✅ **Real-time Updates** - Instant synchronization with Supabase backend  

## 🛠️ Tech Stack

- **Frontend**: Next.js 16+ with App Router
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Hosting**: GitHub Pages (static export)

## 📋 Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier available at https://supabase.com)
- Git and GitHub account for hosting

## 🚀 Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Go to the SQL Editor and run this query to create the expenses table:

```sql
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read and insert (for public use)
CREATE POLICY "Allow public read" ON expenses
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON expenses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public delete" ON expenses
  FOR DELETE USING (true);
```

4. Get your credentials:
   - Go to **Settings > API** in Supabase
   - Copy `Project URL` and `anon key`

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace with your actual Supabase credentials from step 1.

### 3. Install Dependencies

Dependencies are already installed. To reinstall:

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy to GitHub Pages

### 1. Create GitHub Repository

```bash
git remote add origin https://github.com/yourusername/expense-tracker.git
git branch -M main
git push -u origin main
```

### 2. Configure Next.js for Static Export

Edit `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/expense-tracker',
};

module.exports = nextConfig;
```

### 3. Deploy Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      
      - uses: actions/upload-artifact@v3
        with:
          name: out
          path: out
      
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### 4. Enable GitHub Pages

1. Go to your GitHub repository **Settings**
2. Select **Pages** from the left sidebar
3. Under "Source", select "Deploy from a branch"
4. Choose "gh-pages" branch and "root" folder
5. Save

Your app will be live at: `https://yourusername.github.io/expense-tracker`

## 📝 Project Structure

```
expense-tracker/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles
│   │   ├── layout.jsx        # Root layout
│   │   └── page.jsx          # Main page
│   ├── components/
│   │   ├── ExpenseForm.jsx   # Add expense form
│   │   ├── ExpenseList.jsx   # Display expenses
│   │   └── ExpenseStats.jsx  # Statistics dashboard
│   └── lib/
│       └── supabase.js       # Supabase client
├── .env.local                # Environment variables (ignored by git)
├── next.config.js            # Next.js configuration
└── package.json
```

## 🎨 Customization

### Change Colors

Edit the Tailwind color classes in components:
- `bg-blue-600` → `bg-green-600` (primary color)
- Category colors in `ExpenseList.jsx`

### Add More Categories

In `src/components/ExpenseForm.jsx`, update the categories array:

```javascript
const categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Health', 'Shopping', 'Other', 'Your New Category'];
```

## 🐛 Troubleshooting

**Issue**: "Failed to load expenses"
- Check if `.env.local` has correct Supabase credentials
- Verify Supabase project is active
- Check browser console for detailed errors

**Issue**: Can't add expenses
- Ensure the `expenses` table exists in Supabase
- Check RLS policies are enabled
- Verify table structure matches the SQL query above

**Issue**: Port 3000 already in use
- Kill the process: `lsof -ti:3000 | xargs kill -9` (Mac/Linux)
- Or use: `npm run dev -- -p 3001`

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 💡 Future Enhancements

- 📊 Advanced charts and graphs
- 💰 Budget limits and alerts
- 📱 Mobile app version
- 🔐 User authentication
- 💳 Recurring expenses
- 📤 Export to CSV/PDF
- 🌙 Dark mode

---

Happy expense tracking! 🎉
