@echo off
REM This batch file will commit and push the Supabase fixes

cd "c:\Users\admin\Downloads\testing for saas product\expense-tracker"

REM Stage files
git add .github/workflows/deploy.yml src/app/debug/page.jsx

REM Commit
git commit -m "fix: Restore Supabase secrets to build step and add debug page"

REM Push
git push origin main

echo.
echo ==================================================
echo Commit and push completed!
echo ==================================================
echo.
echo Next steps:
echo 1. Go to GitHub Actions
echo 2. Run the workflow manually or wait for auto-trigger
echo 3. Check https://krishnan-govindan.github.io/expense-tracker/debug
echo 4. Verify environment variables are loaded
echo.
pause
