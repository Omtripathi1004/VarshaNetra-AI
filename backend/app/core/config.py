import os
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


# Project root .env path
BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)

ENV_PATH = os.path.join(BASE_DIR, ".env")


class Settings(BaseSettings):
    # ─────────────────────────────────────────────
    # Application
    # ─────────────────────────────────────────────
    PROJECT_NAME: str = "VarshaNetra"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"

    # ─────────────────────────────────────────────
    # Security
    # ─────────────────────────────────────────────
    SECRET_KEY: str = "change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7

    # ─────────────────────────────────────────────
    # Database
    # ─────────────────────────────────────────────
    DATABASE_URL: str = (
        "sqlite:////tmp/varshanetra.db"
        if os.getenv("VERCEL")
        else "sqlite:///./varshanetra.db"
    )

    # ─────────────────────────────────────────────
    # Open-Meteo APIs
    # ─────────────────────────────────────────────
    OPEN_METEO_BASE_URL: str = (
        "https://api.open-meteo.com/v1/forecast"
    )

    OPEN_METEO_ARCHIVE_URL: str = (
        "https://archive-api.open-meteo.com/v1/archive"
    )

    OPEN_METEO_GEO_URL: str = (
        "https://geocoding-api.open-meteo.com/v1/search"
    )

    WEATHER_CACHE_TTL: int = 900

    # ─────────────────────────────────────────────
    # CORS
    # ─────────────────────────────────────────────
    ALLOWED_ORIGINS: List[str] = ["*"]

    # ─────────────────────────────────────────────
    # Gmail SMTP
    # ─────────────────────────────────────────────
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587

    SMTP_USER: str = "harshsih30@gmail.com"
    SMTP_PASS: str = "fuchonimycyjtled"

    # ─────────────────────────────────────────────
    # Twilio SMS
    # ─────────────────────────────────────────────
    TWILIO_SID: str = ""
    TWILIO_TOKEN: str = ""
    TWILIO_FROM: str = ""

    # ─────────────────────────────────────────────
    # Other Notification Providers
    # ─────────────────────────────────────────────
    FAST2SMS_API_KEY: str = ""
    BREVO_API_KEY: str = ""
    RESEND_API_KEY: str = ""

    # ─────────────────────────────────────────────
    # Notification Mode
    # ─────────────────────────────────────────────
    # False = attempt real delivery
    # True = mock/simulation only
    NOTIFICATION_MOCK: bool = False

    # ─────────────────────────────────────────────
    # Pydantic Settings Configuration
    # ─────────────────────────────────────────────
    model_config = SettingsConfigDict(
        env_file=[".env", ENV_PATH, os.path.join(os.path.dirname(BASE_DIR), ".env")],
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()