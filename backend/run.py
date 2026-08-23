"""
run.py — VarshaNetra Backend Launcher
Trains ML model if needed, then starts the FastAPI server.
"""
import sys
import os
import subprocess

# Fix Windows console encoding
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Change to backend/ directory so relative paths work
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Auto-train ML model if model.pkl is missing
MODEL_PATH = os.path.join("ml", "model.pkl")
if not os.path.exists(MODEL_PATH):
    print("=" * 60)
    print("[*] First run — training LightGBM on Open-Meteo archive data...")
    print("[*] This takes 1-2 minutes. It will only run once.")
    print("=" * 60)
    try:
        subprocess.run([sys.executable, "ml/train.py"], check=True)
    except Exception as e:
        print(f"[WARN] ML training failed: {e}. Will use statistical fallback.")

print("=" * 60)
print("[*] Starting VarshaNetra Backend on http://127.0.0.1:8000")
print("[*] Swagger Docs: http://127.0.0.1:8000/docs")
print("[*] ReDoc:        http://127.0.0.1:8000/redoc")
print("[*] Frontend App: http://localhost:5173")
print("=" * 60)

import uvicorn
uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=False, log_level="info")
