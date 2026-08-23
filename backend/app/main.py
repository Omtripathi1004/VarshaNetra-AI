from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import settings
from .core.database import init_db
from .router import router
from .services import load_ml_model


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    init_db()
    load_ml_model()

    # Seed demo data
    from .core.database import SessionLocal
    from . import models
    from datetime import datetime, timezone

    db = SessionLocal()
    try:
        if db.query(models.User).count() == 0:
            from passlib.context import CryptContext
            pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")
            for role, email, name, phone in [
                ("farmer", "farmer@varshanetra.gov.in", "Ramesh Kumar", "+919876543210"),
                ("officer", "officer@varshanetra.gov.in", "Priya Singh", "+919876543211"),
                ("admin", "admin@varshanetra.gov.in", "Admin User", "+919876543212"),
                ("responder", "responder@varshanetra.gov.in", "NDRF Officer", "+919876543213"),
            ]:
                db.add(models.User(
                    email=email, full_name=name, role=role, phone=phone,
                    hashed_password=pwd.hash(role.capitalize() + "@123"),
                ))
            db.commit()

        if db.query(models.Alert).count() == 0:
            demo_alerts = [
                ("HEAVY_RAIN", "CRITICAL",
                 "Heavy Rain Alert — Lucknow District",
                 "भारी वर्षा चेतावनी — लखनऊ जिला",
                 "Rainfall exceeding 75mm/day expected. Avoid low-lying areas and secure crops.",
                 "75 मिमी/दिन से अधिक वर्षा की उम्मीद है। निचले इलाकों से बचें और फसलों को सुरक्षित करें।",
                 "Uttar Pradesh", "Lucknow"),
                ("ONSET", "WARNING",
                 "Monsoon Onset Alert — Varanasi",
                 "मानसून आगमन चेतावनी — वाराणसी",
                 "Monsoon onset expected in 3-5 days. Prepare fields for Kharif sowing.",
                 "3-5 दिनों में मानसून आगमन की उम्मीद है। खरीफ बुवाई के लिए खेत तैयार करें।",
                 "Uttar Pradesh", "Varanasi"),
                ("DRY_SPELL", "WARNING",
                 "Dry Spell Alert — Pune Region",
                 "शुष्क मौसम चेतावनी — पुणे क्षेत्र",
                 "7+ day dry spell forecast. Activate supplemental irrigation immediately.",
                 "7+ दिनों के शुष्क मौसम का पूर्वानुमान। तुरंत पूरक सिंचाई शुरू करें।",
                 "Maharashtra", "Pune"),
            ]
            for at, sev, he, hh, me, mh, st, dist in demo_alerts:
                db.add(models.Alert(
                    alert_type=at, severity=sev,
                    headline_en=he, headline_hi=hh,
                    message_en=me, message_hi=mh,
                    state=st, district=dist,
                    latitude=26.85, longitude=80.95,
                ))
            db.commit()

        if db.query(models.EmergencyEvent).count() == 0:
            db.add(models.EmergencyEvent(
                hazard_type="FLOOD",
                severity="HIGH",
                latitude=26.85, longitude=80.95,
                state="Uttar Pradesh", district="Lucknow",
                panchayat="Sarojini Nagar",
                affected_crops=["Paddy (Rice)", "Sugarcane"],
                trigger_value=82.5,
                status="ACTIVE",
            ))
            db.commit()
    except Exception as e:
        db.rollback()
    finally:
        db.close()

    yield
    # Shutdown
    pass


app = FastAPI(
    title=settings.PROJECT_NAME,
    description=(
        "VarshaNetra AI — Hyperlocal Monsoon & Agricultural Early Warning System. "
        "All endpoints accept both GPS coordinates (lat/lon) AND manual location inputs (state/district/city/village). "
        "Both resolve to the same Open-Meteo weather data pipeline."
    ),
    version=settings.VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS — allow frontend (any origin in dev, restrict in prod)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api/v1")


@app.get("/")
async def root():
    return {
        "name": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs": "/docs",
        "status": "HEALTHY",
        "location_modes": ["GPS (lat/lon)", "Manual (state/district/city/village)"],
    }
