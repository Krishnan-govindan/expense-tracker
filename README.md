# 💰 Expense Tracker

A beautiful and intuitive web application to track your daily expenses with dates, categories, and visual statistics. Built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, and **Supabase**.

## 🌟 Features

- ✅ **Add Daily Expenses** - Track expenses with description, amount, category, and date  
- ✅ **Category Support** - Organize expenses into Food, Transport, Entertainment, Utilities, Health, Shopping, and Other  
- ✅ **Visual Statistics** - Monthly summary with total spending, transaction count, and category breakdown  
- ✅ **Date Filtering** - View expenses for different months  
- ✅ **Delete Expenses** - Remove incorrect entries with confirmation  
- ✅ **Modern UI** - Clean and responsive design with Tailwind CSS  
- ✅ **Dual-Mode Operation** - Demo mode (localStorage) by default, or cloud sync with Supabase  
- ✅ **GitHub Pages Ready** - Static export for easy deployment  

## 🛠️ Tech Stack

- **Frontend**: Next.js 16+ with App Router
- **UI Framework**: React 19 with client components
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Backend**: Supabase (PostgreSQL) - optional
- **Hosting**: GitHub Pages (static export)
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js 18+ and npm
- (Optional) A Supabase account for cloud sync

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd expense-tracker
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Demo Mode (Default)

The app works immediately without any setup in **demo mode**, storing expenses in your browser's localStorage.

### 4. Cloud Sync with Supabase (Optional)

To enable cloud sync:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run this SQL in the Supabase SQL Editor:

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

3. Create `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

4. Restart the dev server. The app will now sync with Supabase.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy to GitHub Pages

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically:
1. Installs dependencies
2. Builds the Next.js app
3. Deploys to GitHub Pages

**To deploy:**

1. Push your code to the `main` branch
2. GitHub Actions automatically builds and deploys
3. Your site will be available at: `https://your-username.github.io/expense-tracker/`

Check the **Actions** tab in your GitHub repo to see deployment progress.

## 📁 Project Structure

```
expense-tracker/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── app/
│   │   ├── page.jsx            # Main page component
│   │   ├── layout.jsx          # Root layout
│   │   ├── globals.css         # Global styles
│   │   └── calendar.css        # Calendar styling
│   ├── components/
│   │   ├── ExpenseForm.jsx     # Add expense form
│   │   ├── ExpenseList.jsx     # Expense list display
│   │   └── ExpenseStats.jsx    # Monthly statistics
│   └── lib/
│       └── supabase.js         # Supabase setup & localStorage fallback
├── package.json
├── next.config.mjs
└── postcss.config.mjs
```

## 🔄 How It Works

### Demo Mode (Default)
- Expenses stored in browser localStorage
- No backend needed
- Works offline
- Data persists in the same browser

### Cloud Mode (With Supabase)
- Expenses synced to PostgreSQL database
- Access from multiple devices
- Real-time synchronization
- Automatic fallback to localStorage if Supabase unavailable

## 📝 Available Scripts

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Build for production (static export)
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🎨 Customization

### Add a New Category

1. Edit `categories` array in [src/components/ExpenseForm.jsx](src/components/ExpenseForm.jsx)
2. Add color mapping in `categoryColors` object in [src/components/ExpenseList.jsx](src/components/ExpenseList.jsx)

Example:
```javascript
// ExpenseForm.jsx
const categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Health', 'Shopping', 'Other', 'YourNewCategory'];

// ExpenseList.jsx
const categoryColors = {
  // ... existing colors
  'YourNewCategory': 'bg-cyan-100 text-cyan-800',
};
```

### Modify Styling

Edit Tailwind CSS classes in component files or add custom CSS in:
- `src/app/globals.css` - Global theme
- `src/app/calendar.css` - Calendar widget styling

## 🚨 Troubleshooting

### "Using demo mode..." message in UI
- Supabase credentials not configured or unreachable
- Check `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Verify Supabase project is active

### Build fails locally
```bash
# Clear build cache and retry
rm -rf .next out node_modules package-lock.json
npm install
npm run build
```

### GitHub Actions workflow failing
1. Check the **Actions** tab in your GitHub repo
2. Click the failed workflow for detailed logs
3. Common issues:
   - Credentials exposed in code (should be in Actions secrets, not .env.local)
   - Node version mismatch (uses Node 20)
   - Missing `out/` directory in build output

## 📄 License

This project is open source.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Happy expense tracking!** 🎉
