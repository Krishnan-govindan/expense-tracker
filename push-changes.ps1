#!/usr/bin/env pwsh

# Git commit and push script
Set-Location "c:\Users\admin\Downloads\testing for saas product\expense-tracker"

Write-Host "Step 1: Checking git status..." -ForegroundColor Green
git status

Write-Host "`nStep 2: Adding files..." -ForegroundColor Green
git add .github/workflows/deploy.yml
git add src/app/debug/page.jsx
git add -u

Write-Host "`nStep 3: Committing changes..." -ForegroundColor Green
git commit -m "fix: Restore Supabase secrets to build step and add debug page

- Re-add env variables to build step that pass Supabase credentials
- GitHub Actions now passes NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to build
- Add debug page at /debug to verify environment variables are loaded
- This fixes the Demo Mode issue on GitHub Pages deployment"

Write-Host "`nStep 4: Pulling latest from remote..." -ForegroundColor Green
git pull origin main --rebase

Write-Host "`nStep 5: Pushing to GitHub..." -ForegroundColor Green
git push origin main

Write-Host "`n✅ Done! Changes pushed to GitHub" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Go to GitHub Actions tab"
Write-Host "2. Wait for workflow to complete (2-3 minutes)"
Write-Host "3. Visit: https://krishnan-govindan.github.io/expense-tracker/debug"
Write-Host "4. Verify Supabase variables are loaded"
