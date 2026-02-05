# URGENT: Complete These Steps to Fix Supabase Sync on GitHub Pages

## ⚠️ IMPORTANT: Your Terminals Are Stuck
VS Code terminals appear frozen. Follow these steps in a NEW command prompt/PowerShell window.

---

## Step-by-Step Instructions

### 1. Open New PowerShell Window
- Press `Win + X` 
- Select "Windows PowerShell"
- OR Search for "PowerShell" in Windows

### 2. Navigate to Project
```powershell
cd "c:\Users\admin\Downloads\testing for saas product\expense-tracker"
```

### 3. Check Current Changes
```powershell
git status
```
You should see:
- `.github/workflows/deploy.yml` (modified)
- `src/app/debug/page.jsx` (new file)

### 4. Stage All Changes
```powershell
git add .
```

### 5. Commit Changes
```powershell
git commit -m "fix: Restore Supabase secrets to build step and add debug page

- Re-add env variables to Build step in GitHub Actions workflow
- Secrets now passed to npm run build process
- Add debug page at /debug to verify environment variables loaded"
```

### 6. Pull Latest
```powershell
git pull origin main --rebase
```

### 7. Push to GitHub
```powershell
git push origin main
```

You should see output like:
```
To https://github.com/Krishnan-govindan/expense-tracker.git
   abc123...def456  main -> main
```

---

## ✅ Verify in GitHub

After pushing:

1. Go to: https://github.com/Krishnan-govindan/expense-tracker
2. Check **Actions** tab
3. Wait for workflow to complete (2-3 min)
4. Once green checkmark appears, visit:
   ```
   https://krishnan-govindan.github.io/expense-tracker/debug
   ```

### Expected Output at Debug Page
- ✅ `NEXT_PUBLIC_SUPABASE_URL: https://vviaiphpgqpxhvhjmmft.supabase.co`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY: ✅ PRESENT`
- ✅ Status: "Supabase should be connected"

### Then Check Main App
Visit: https://krishnan-govindan.github.io/expense-tracker/

Should see:
- ❌ NO "Demo Mode" message
- ✅ Can add expenses
- ✅ Data syncs to Supabase

---

## 🆘 If You Get Errors

### Error: "Failed to pull"
```powershell
git reset --hard HEAD
git pull origin main
```

### Error: "Failed to push"
```powershell
git pull origin main --rebase
git push origin main
```

### Error: "Permission denied"
Make sure you're in the right directory:
```powershell
pwd  # shows current location
```

---

## Files That Should Have Changed

✅ `.github/workflows/deploy.yml` - Added env section with secrets
✅ `src/app/debug/page.jsx` - New debug page
✅ No `.env.local` should be committed (stays secure!)

---

## Questions?

Once the workflow completes, let me know:
1. ✅ Did push succeed?
2. ✅ What does debug page show?
3. ✅ Does main app work without Demo Mode?
