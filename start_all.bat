@echo off
chcp 65001 > nul
title VarshaNetra - Full Stack Launcher
echo ============================================================
echo  Starting VarshaNetra (Backend :8000 + Frontend :5173)...
echo ============================================================

start "VarshaNetra Backend" cmd /k "%~dp0start_backend.bat"
timeout /t 3 > nul
start "VarshaNetra Frontend" cmd /k "%~dp0start_frontend.bat"

echo ============================================================
echo  VarshaNetra is launching!
echo  Backend:  http://127.0.0.1:8000
echo  Frontend: http://localhost:5173
echo ============================================================
pause
