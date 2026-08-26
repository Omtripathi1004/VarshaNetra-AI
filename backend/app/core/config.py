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
    # Email Provider Configuration
    # ─────────────────────────────────────────────
    PRIMARY_EMAIL_PROVIDER: str = "SMTP"  # 'SMTP' | 'RESEND' | 'BREVO'
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASS: str = ""

    # ─────────────────────────────────────────────
    # SMS Provider Configuration
    # ─────────────────────────────────────────────
    PRIMARY_SMS_PROVIDER: str = "TWILIO"  # 'TWILIO' | 'FAST2SMS'
    SECONDARY_SMS_PROVIDER: str = "FAST2SMS"

    # Twilio SMS (supports TWILIO_SID/TWILIO_ACCOUNT_SID, TWILIO_TOKEN/TWILIO_AUTH_TOKEN, TWILIO_FROM/TWILIO_PHONE_NUMBER)
    TWILIO_SID: str = ""
    TWILIO_ACCOUNT_SID: str = ""
    TWILIO_TOKEN: str = ""
    TWILIO_AUTH_TOKEN: str = ""
    TWILIO_FROM: str = ""
    TWILIO_PHONE_NUMBER: str = ""

    # Fast2SMS
    FAST2SMS_API_KEY: str = ""

    # Other Notification Gateways
    BREVO_API_KEY: str = ""
    RESEND_API_KEY: str = ""

    # ─────────────────────────────────────────────
    # Gemini AI (Chatbot LLM)
    # ─────────────────────────────────────────────
    GEMINI_API_KEY: str = ""

    # ─────────────────────────────────────────────
    # Notification Mode
    # ─────────────────────────────────────────────
    # False = real provider delivery
    # True = mock/simulation only
    NOTIFICATION_MOCK: bool = False

    @property
    def effective_twilio_sid(self) -> str:
        return (self.TWILIO_SID or self.TWILIO_ACCOUNT_SID or os.getenv("TWILIO_SID") or os.getenv("TWILIO_ACCOUNT_SID") or "").strip()

    @property
    def effective_twilio_token(self) -> str:
        return (self.TWILIO_TOKEN or self.TWILIO_AUTH_TOKEN or os.getenv("TWILIO_TOKEN") or os.getenv("TWILIO_AUTH_TOKEN") or "").strip()

    @property
    def effective_twilio_from(self) -> str:
        return (self.TWILIO_FROM or self.TWILIO_PHONE_NUMBER or os.getenv("TWILIO_FROM") or os.getenv("TWILIO_PHONE_NUMBER") or "").strip()

    @property
    def effective_fast2sms_key(self) -> str:
        return (self.FAST2SMS_API_KEY or os.getenv("FAST2SMS_API_KEY") or os.getenv("SMS_API_KEY") or "").strip()

    @property
    def effective_smtp_host(self) -> str:
        return (self.SMTP_HOST or os.getenv("SMTP_HOST") or "smtp.gmail.com").strip()

    @property
    def effective_smtp_port(self) -> int:
        try:
            return int(self.SMTP_PORT or os.getenv("SMTP_PORT") or 587)
        except Exception:
            return 587

    @property
    def effective_smtp_user(self) -> str:
        return (
            self.SMTP_USER or 
            os.getenv("SMTP_USER") or 
            os.getenv("GMAIL_USER") or 
            os.getenv("SMTP_EMAIL") or 
            os.getenv("GMAIL_ADDRESS") or 
            ""
        ).strip()

    @property
    def effective_smtp_pass(self) -> str:
        return (
            self.SMTP_PASS or 
            os.getenv("SMTP_PASS") or 
            os.getenv("GMAIL_APP_PASSWORD") or 
            os.getenv("SMTP_PASSWORD") or 
            os.getenv("GMAIL_PASS") or 
            ""
        ).strip()

    @property
    def effective_smtp_from(self) -> str:
        return (
            os.getenv("SMTP_FROM") or 
            os.getenv("EMAIL_FROM") or 
            self.effective_smtp_user or 
            "noreply@varshanetra.gov.in"
        ).strip()

    @property
    def effective_resend_key(self) -> str:
        return (self.RESEND_API_KEY or os.getenv("RESEND_API_KEY") or "").strip()

    @property
    def effective_brevo_key(self) -> str:
        return (self.BREVO_API_KEY or os.getenv("BREVO_API_KEY") or "").strip()

    @property
    def is_twilio_configured(self) -> bool:
        return bool(self.effective_twilio_sid and self.effective_twilio_token and self.effective_twilio_from)

    @property
    def is_fast2sms_configured(self) -> bool:
        return bool(self.effective_fast2sms_key)

    @property
    def is_smtp_configured(self) -> bool:
        return bool(self.effective_smtp_user and self.effective_smtp_pass)

    @property
    def is_resend_configured(self) -> bool:
        return bool(self.effective_resend_key)

    @property
    def is_brevo_configured(self) -> bool:
        return bool(self.effective_brevo_key)

    @property
    def is_email_configured(self) -> bool:
        return self.is_smtp_configured or self.is_resend_configured or self.is_brevo_configured

        return self.is_smtp_configured or self.is_resend_configured or self.is_brevo_configured

    @property
    def is_sms_configured(self) -> bool:
        return self.is_twilio_configured or self.is_fast2sms_configured

    @property
    def effective_gemini_key(self) -> str:
        return (self.GEMINI_API_KEY or os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY") or "").strip()

    @property
    def is_gemini_configured(self) -> bool:
        return bool(self.effective_gemini_key)

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