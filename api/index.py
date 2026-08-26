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

# Include router at all prefix variants
app.include_router(router, prefix="/api/v1")
app.include_router(router, prefix="/v1")
app.include_router(router, prefix="/api")
app.include_router(router, prefix="")

@app.middleware("http")
async def normalize_vercel_path(request: Request, call_next):
    _path = request.query_params.get("_path")
    if _path:
        if not _path.startswith("/"):
            _path = "/" + _path
        request.scope["path"] = _path
    else:
        matched = request.headers.get("x-matched-path") or request.headers.get("x-vercel-matched-path") or request.headers.get("x-forwarded-path")
        if matched and not matched.startswith("/api/index"):
            request.scope["path"] = matched
        else:
            path = request.scope.get("path", "")
            for pfx in ["/api/index.py", "/api/index"]:
                if path.startswith(pfx):
                    rem = path[len(pfx):]
                    request.scope["path"] = rem if rem else "/"
                    break
    return await call_next(request)

@app.get("/")
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

handler = app
