# Copilot Instructions - Expense Tracker

## Project Overview

**Expense Tracker** is a Next.js SaaS application for tracking daily expenses with category filtering and monthly statistics. The app supports dual-mode operation: demo mode using localStorage (default) or cloud sync with Supabase when configured.

**Key Tech Stack:**
- Next.js 16+ (App Router, static export to GitHub Pages)
- React 19 with client components
- Tailwind CSS 4 for styling
- Supabase (PostgreSQL) for optional cloud storage
- Lucide React for icons

## Architecture & Data Flow

### Component Structure

**Main Components** (`src/components/`):
1. **ExpenseForm** - Controlled form component with date picker (react-calendar)
   - Categories: Food, Transport, Entertainment, Utilities, Health, Shopping, Other
   - Handles localStorage & Supabase inserts
   - Date defaults to today; calendar UI uses dedicated CSS file

2. **ExpenseList** - Renders expenses with category-based color coding
   - Uses `categoryColors` object mapping categories to Tailwind CSS classes
   - Delete action with confirmation dialog
   - Dates formatted as "MMM DD, YYYY"

3. **ExpenseStats** - Monthly aggregation dashboard
   - Month selector with 6-month rolling window
   - Displays: Total, Transaction Count, Average by category
   - Uses `useMemo` for performance (expensive recalculations on month/data change)

**Root Component** (`src/app/page.jsx`):
- Client component managing central expenses state
- Orchestrates fetch/add/delete lifecycle
- Conditional rendering: displays demo mode indicator when localStorage is active

### Data Storage Layer

**Dual-Mode Design** (`src/lib/supabase.js`):
- Export `useLocalStorage` boolean: true when env vars missing, false otherwise
- If Supabase configured: creates client via `createClient(url, key)`
- All CRUD operations check `useLocalStorage` to route to localStorage or Supabase

**Data Shape** (both localStorage and Supabase):
```javascript
{
  id: string,               // UUID in Supabase, timestamp string in localStorage
  description: string,
  amount: number,
  category: string,
  date: YYYY-MM-DD format,
  created_at: timestamp (Supabase only)
}
```

**Supabase Setup** (documented in SETUP.md):
- Table: `expenses` with UUID primary key
- RLS enabled with public read/insert/delete policies
- Credentials in `.env.local` as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Development Workflows

### Local Development
```bash
npm run dev          # Start Next.js dev server on http://localhost:3000
npm run lint         # Run ESLint
npm run build        # Build for static export (GitHub Pages)
npm start            # Start production server
```

### Styling
- **CSS Files**: `globals.css` (app theme) + `calendar.css` (react-calendar overrides)
- **Tailwind**: Imported in layout.jsx; use utility classes throughout
- **Color Scheme**: Blue/indigo gradient background, category-specific badge colors
- **Responsive**: Mobile-first; grid layouts use `md:` breakpoints

### Environment Setup
- **Demo Mode** (default): Works instantly with localStorage; no env vars needed
- **Cloud Mode**: Requires `.env.local` with Supabase credentials
- App auto-detects mode at runtime (checks env vars in supabase.js)

## Critical Patterns & Conventions

### Client-Only Components
- All interactive components use `'use client'` directive (page.jsx, ExpenseForm, ExpenseList, ExpenseStats)
- Server-side rendering not used; static export targets GitHub Pages

### Form Handling
- Controlled inputs via state (ExpenseForm uses `formData` object)
- Single `handleChange` handler spreads previous state
- Form reset after successful submit

### Performance
- `ExpenseStats` uses `useMemo` with dependencies `[expenses, selectedMonth]`—critical for avoiding re-renders during filtering
- Consider memoizing ExpenseList items if expense count exceeds 100

### Error Handling
- Try/catch blocks wrap all async operations (fetch, insert, delete)
- Fallback messages: "Using demo mode..." when Supabase fails
- User-facing alerts via `alert()` (consider upgrading to toast notifications)

### Date Handling
- Input format: YYYY-MM-DD (HTML5 date input)
- Display format: "MMM DD, YYYY" via `toLocaleDateString()` with options
- Month selector uses ISO slice: `date.toISOString().slice(0, 7)`
- Sorting: `new Date(b.date) - new Date(a.date)` (descending)

## Common Development Tasks

### Adding a New Category
1. Update `categories` array in [ExpenseForm.jsx](src/components/ExpenseForm.jsx#L17)
2. Add Tailwind color classes to `categoryColors` object in [ExpenseList.jsx](src/components/ExpenseList.jsx#L4)
3. No database migration needed (category stored as string)

### Modifying Stats Calculations
- Edit `useMemo` hook in [ExpenseStats.jsx](src/components/ExpenseStats.jsx#L7)
- Remember to include new dependencies in dependency array
- Regenerate filtered expenses via `expenses.filter()`

### Switching Storage Backend
- Toggle `useLocalStorage` check in [supabase.js](src/lib/supabase.js)
- All CRUD operations in ExpenseForm/ExpenseList already handle both paths
- Test both modes before deploying

## Deployment Notes

- **Output**: Static export (`next.config.mjs` sets `output: 'export'`)
- **Base Path**: `/expense-tracker` for GitHub Pages subpath
- **Unoptimized Images**: Disabled for static export compatibility
- **Build**: `npm run build` generates `out/` directory ready for deployment

## Known Limitations & Future Improvements

- No authentication (RLS policies rely on trust; suitable for demo/personal use)
- Alert() UX could improve with toast/modal notifications
- Date picker calendar could use better styling integration
- No export/import features or expense filtering by category in UI
