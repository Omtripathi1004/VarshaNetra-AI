import os
import sys

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
backend_dir = os.path.join(root_dir, "backend")
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from backend.app.router import router

app = FastAPI(title="VarshaNetra Serverless API", docs_url="/docs", openapi_url="/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include router at all prefix variants
app.include_router(router, prefix="/api/v1")
app.include_router(router, prefix="/v1")
app.include_router(router, prefix="/api")
app.include_router(router, prefix="")

@app.middleware("http")
async def normalize_vercel_path(request: Request, call_next):
    path = request.scope.get("path", "")
    for pfx in ["/api/index.py", "/api/index"]:
        if path.startswith(pfx):
            request.scope["path"] = path[len(pfx):] or "/"
            break
    return await call_next(request)

@app.get("/health")
@app.get("/api/health")
@app.get("/api/v1/health")
async def health():
    return {
        "status": "HEALTHY",
        "service": "VarshaNetra-AI-API",
        "version": "2.0.0",
        "engines": ["open_meteo", "false_onset_hero", "noaa_teleconnections", "10yr_ml_validation", "crop_stage_matrix"]
    }

handler = app
