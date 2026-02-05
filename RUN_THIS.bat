@echo off
REM Simple batch file - just double click this to push changes
REM Closes all stuck windows and opens fresh PowerShell to complete the task

setlocal enabledelayedexpansion

echo Closing stuck windows...
taskkill /F /IM powershell.exe 2>nul
taskkill /F /IM cmd.exe 2>nul
timeout /t 2 /nobreak

echo.
echo Opening PowerShell to complete the push...
powershell -NoExit -Command "cd 'c:\Users\admin\Downloads\testing for saas product\expense-tracker'; Write-Host '==== GIT COMMIT AND PUSH COMMANDS ====' -ForegroundColor Cyan; Write-Host 'Run these commands one by one:' -ForegroundColor Yellow; Write-Host ''; Write-Host '1. git add .' -ForegroundColor White; Write-Host '2. git commit -m \"fix: Restore Supabase secrets to build step\"' -ForegroundColor White; Write-Host '3. git pull origin main --rebase' -ForegroundColor White; Write-Host '4. git push origin main' -ForegroundColor White; Write-Host ''; Write-Host 'Paste them below and press Enter:' -ForegroundColor Green; Write-Host ''"
