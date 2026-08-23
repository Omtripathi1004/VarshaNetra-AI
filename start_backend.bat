@echo off
chcp 65001 > nul
title VarshaNetra - Backend (Port 8000)
echo ============================================================
echo  VarshaNetra Backend Starting...
echo  API:  http://127.0.0.1:8000
echo  Docs: http://127.0.0.1:8000/docs
echo ============================================================
cd /d "%~dp0backend"
python run.py
pause
