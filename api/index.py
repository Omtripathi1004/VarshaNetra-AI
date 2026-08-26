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
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from backend.app.core.database import init_db
from backend.app.router import router

try:
    init_db()
except Exception as e:
    print("API DB init warning:", e)

app = FastAPI(title="VarshaNetra Serverless API", docs_url="/docs", openapi_url="/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include backend router with all standard prefixes
app.include_router(router, prefix="/api/v1")
app.include_router(router, prefix="/v1")
app.include_router(router, prefix="/api")

@app.get("/health")
@app.get("/api/health")
@app.get("/api/v1/health")
async def health(request: Request):
    return {
        "status": "HEALTHY",
        "service": "VarshaNetra-AI-API",
        "version": "2.0.0",
        "path": request.scope.get("path"),
        "engines": ["open_meteo", "false_onset_hero", "noaa_teleconnections", "10yr_ml_validation", "crop_stage_matrix"]
    }

# Locate static build output (frontend/dist, dist, or public)
possible_dirs = [
    os.path.join(root_dir, "frontend", "dist"),
    os.path.join(root_dir, "dist"),
    os.path.join(root_dir, "public"),
    os.path.join(backend_dir, "dist")
]
static_dir = None
for d in possible_dirs:
    if os.path.isdir(d) and os.path.isfile(os.path.join(d, "index.html")):
        static_dir = d
        break

if static_dir:
    assets_path = os.path.join(static_dir, "assets")
    if os.path.isdir(assets_path):
        app.mount("/assets", StaticFiles(directory=assets_path), name="assets")

@app.get("/")
async def serve_root():
    if static_dir:
        index_file = os.path.join(static_dir, "index.html")
        if os.path.isfile(index_file):
            return FileResponse(index_file, media_type="text/html")
    return {
        "status": "HEALTHY",
        "service": "VarshaNetra-AI-API",
        "version": "2.0.0"
    }

@app.get("/{full_path:path}")
async def serve_spa_or_file(full_path: str):
    # Don't hijack API or documentation routes
    if full_path.startswith("api/") or full_path.startswith("docs") or full_path.startswith("openapi.json"):
        return JSONResponse(status_code=404, content={"detail": "Not Found"})

    if static_dir:
        file_path = os.path.join(static_dir, full_path)
        if full_path and os.path.isfile(file_path):
            return FileResponse(file_path)
        index_file = os.path.join(static_dir, "index.html")
        if os.path.isfile(index_file):
            return FileResponse(index_file, media_type="text/html")

    return JSONResponse(status_code=404, content={"detail": "Not Found"})

handler = app
