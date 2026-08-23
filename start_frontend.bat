@echo off
chcp 65001 > nul
title VarshaNetra - Frontend (Port 5173)
echo ============================================================
echo  VarshaNetra Frontend Starting...
echo  App: http://localhost:5173
echo ============================================================
cd /d "%~dp0frontend"
call npm run dev
pause
