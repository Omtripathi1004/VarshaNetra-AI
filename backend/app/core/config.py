import os
from typing import List
from pydantic_settings import BaseSettings

_ENV_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env")

class Settings(BaseSettings):
    PROJECT_NAME: str = "VarshaNetra"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"

    SECRET_KEY: str = "varshanetra-sih2026-secret-key-xyz"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7

    # Use writable /tmp in Vercel/serverless environments, local relative in dev
    DATABASE_URL: str = "sqlite:////tmp/varshanetra.db" if os.getenv("VERCEL") else "sqlite:///./varshanetra.db"

    OPEN_METEO_BASE_URL: str = "https://api.open-meteo.com/v1/forecast"
    OPEN_METEO_ARCHIVE_URL: str = "https://archive-api.open-meteo.com/v1/archive"
    OPEN_METEO_GEO_URL: str = "https://geocoding-api.open-meteo.com/v1/search"
    WEATHER_CACHE_TTL: int = 900  # seconds

    ALLOWED_ORIGINS: List[str] = ["*"]

    # Notification Settings
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = "harshsih30@gmail.com"
    SMTP_PASS: str = "cspwrbdxmwabyrfc"
    TWILIO_SID: str = ""
    TWILIO_TOKEN: str = ""
    TWILIO_FROM: str = ""
    NOTIFICATION_MOCK: bool = False  # False = Live real dispatch

    model_config = {
        "case_sensitive": True,
        "env_file": _ENV_PATH if os.path.exists(_ENV_PATH) else ".env",
        "extra": "allow"
    }


settings = Settings()
