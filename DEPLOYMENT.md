# 🚀 GitHub Deployment Guide

## Step 1: Initialize Git Repository (If Not Already Done)

```bash
git init
git add .
git commit -m "Initial commit: Expense Tracker App"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `expense-tracker`
3. **Important**: Do NOT add README, .gitignore, or license (we already have them)
4. Click "Create repository"

## Step 3: Add Remote and Push Code

```bash
git remote add origin https://github.com/YOUR_USERNAME/expense-tracker.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - This will automatically use our `deploy.yml` workflow
4. Save changes

## Step 5: Deployment Workflow

Once you've pushed to GitHub:
1. Go to **Actions** tab in your repository
2. You'll see "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 1-2 minutes)
4. Once done, your app will be live at:

```
https://YOUR_USERNAME.github.io/expense-tracker
```

## 📋 What the Workflow Does

The `.github/workflows/deploy.yml` automatically:
- ✅ Installs dependencies (`npm install`)
- ✅ Builds the app (`npm run build`)
- ✅ Generates static files in `/out` folder
- ✅ Deploys to GitHub Pages
- ✅ Runs on every push to `main` branch

## 🔄 Updating Your App

After the first deployment, future updates are simple:

```bash
# Make changes to your code
git add .
git commit -m "Your message"
git push origin main
```

The workflow automatically re-runs and updates your live app!

## ✅ Verify Deployment

1. Go to **Settings** → **Pages**
2. You'll see: "Your site is live at: https://YOUR_USERNAME.github.io/expense-tracker"
3. Click the link to view your live app!

## 🎯 Is It Safe to Push While Dev Server Runs?

**YES, 100% safe!**

- Local dev server (localhost:3000) runs only on your machine
- Git operations are completely independent
- Pushing doesn't affect the running server
- Common developer practice worldwide

## 📝 Environment Variables for Production

Your app uses localStorage for demo mode, so no Supabase setup is needed yet.

When you add Supabase later:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add repository secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Update `.env.local` in your repo (it will use the secrets during build)

## 🐛 Troubleshooting

**Issue: Workflow fails with build error**
- Check the Actions tab for detailed error logs
- Run `npm run build` locally to test

**Issue: Site not loading at correct URL**
- Verify you're using the correct URL with `/expense-tracker` path
- Check Pages settings - ensure it shows "Your site is live at..."

**Issue: Old version still showing**
- GitHub Pages caching can take a few minutes
- Try hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

## 📚 Summary

| Step | Command |
|------|---------|
| Initialize Git | `git init && git add . && git commit -m "Initial commit"` |
| Add Remote | `git remote add origin https://github.com/USERNAME/expense-tracker.git` |
| Push Code | `git push -u origin main` |
| Enable Pages | Settings → Pages → GitHub Actions |
| Access App | `https://USERNAME.github.io/expense-tracker` |

Your app is ready for the world! 🌍
