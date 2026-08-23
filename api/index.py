import os
import sys

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
backend_dir = os.path.join(root_dir, "backend")
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi import FastAPI
from backend.app.router import router

# Create dedicated serverless FastAPI app that handles all root/sub-path combinations
app = FastAPI(title="VarshaNetra Serverless API")

# Mount at every possible sub-path variation Vercel might pass
app.include_router(router, prefix="/api/v1")
app.include_router(router, prefix="/v1")
app.include_router(router, prefix="/api")
app.include_router(router, prefix="")

@app.get("/health")
@app.get("/api/v1/health")
@app.get("/api/health")
async def serverless_health():
    return {"status": "HEALTHY", "service": "VarshaNetra-Serverless", "version": "2.0.0"}

handler = app
