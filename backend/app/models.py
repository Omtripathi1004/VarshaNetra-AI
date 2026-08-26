from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, JSON
from .core.database import Base


def _now():
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, default="")
    role = Column(String, default="farmer")  # farmer / officer / admin
    phone = Column(String, default="")
    language = Column(String, default="en")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=_now)


class Location(Base):
    __tablename__ = "locations"
    id = Column(Integer, primary_key=True)
    state = Column(String, nullable=False)
    district = Column(String, nullable=False)
    city = Column(String, default="")
    block = Column(String, default="")
    panchayat = Column(String, default="")
    village = Column(String, default="")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    elevation_m = Column(Float, default=0.0)
    soil_type = Column(String, default="Alluvial")


class WeatherObservation(Base):
    __tablename__ = "weather_observations"
    id = Column(Integer, primary_key=True)
    latitude = Column(Float)
    longitude = Column(Float)
    location_label = Column(String, default="")
    temperature_c = Column(Float)
    humidity_pct = Column(Float)
    precipitation_mm = Column(Float)
    rain_mm = Column(Float)
    cloud_cover_pct = Column(Float)
    pressure_msl_hpa = Column(Float)
    wind_speed_kmh = Column(Float)
    wind_direction_deg = Column(Float)
    soil_moisture_0_1cm = Column(Float)
    weather_code = Column(Integer)
    fetched_at = Column(DateTime(timezone=True), default=_now)


class Prediction(Base):
    __tablename__ = "predictions"
    id = Column(Integer, primary_key=True)
    latitude = Column(Float)
    longitude = Column(Float)
    location_label = Column(String, default="")
    model_version = Column(String, default="lgbm_v1")
    probability_pct = Column(Float)
    expected_mm = Column(Float)
    category = Column(String)
    confidence_pct = Column(Float)
    shap_values = Column(JSON)
    feature_values = Column(JSON)
    hourly_trend = Column(JSON)
    monsoon_phase = Column(String, default="UNKNOWN")
    created_at = Column(DateTime(timezone=True), default=_now)


class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True)
    alert_type = Column(String)  # ONSET / FALSE_ONSET / DRY_SPELL / HEAVY_RAIN / REVIVAL / SOWING
    severity = Column(String, default="WARNING")  # INFO / WARNING / CRITICAL
    headline_en = Column(String)
    headline_hi = Column(String)
    message_en = Column(Text)
    message_hi = Column(Text)
    latitude = Column(Float)
    longitude = Column(Float)
    state = Column(String, default="")
    district = Column(String, default="")
    status = Column(String, default="ACTIVE")
    created_at = Column(DateTime(timezone=True), default=_now)
    acknowledged_at = Column(DateTime(timezone=True), nullable=True)
    acknowledged_by = Column(String, default="")


class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True)
    channel = Column(String)  # SMS / EMAIL / WHATSAPP
    provider = Column(String, default="")  # TWILIO / FAST2SMS / SMTP / RESEND / MOCK
    provider_message_id = Column(String, default="", nullable=True)
    recipient = Column(String)
    subject = Column(String, default="")
    message = Column(Text)
    alert_type = Column(String, default="")
    status = Column(String, default="QUEUED")  # ACCEPTED / QUEUED / SENT / DELIVERED / FAILED / CONFIGURATION_ERROR
    error_code = Column(String, default="", nullable=True)
    error_message = Column(Text, default="", nullable=True)
    sent_at = Column(DateTime(timezone=True), default=_now)
    updated_at = Column(DateTime(timezone=True), default=_now, onupdate=_now)


class CropProfile(Base):
    __tablename__ = "crop_profiles"
    id = Column(Integer, primary_key=True)
    name_en = Column(String, nullable=False)
    name_hi = Column(String, nullable=False)
    season = Column(String)  # KHARIF / RABI / ZAID
    temp_min_c = Column(Float)
    temp_max_c = Column(Float)
    rainfall_season_mm = Column(Float)
    rainfall_daily_critical_mm = Column(Float)
    humidity_min_pct = Column(Float)
    humidity_max_pct = Column(Float)
    soil_moisture_min = Column(Float)
    duration_days = Column(Integer)
    sowing_months = Column(String)  # e.g. "6,7" for June-July
    harvest_months = Column(String)
    irrigation_requirement = Column(String, default="MODERATE")
    market_price_inr_qtl = Column(Float, default=0.0)
    icon = Column(String, default="🌾")


class EmergencyEvent(Base):
    __tablename__ = "emergency_events"
    id = Column(Integer, primary_key=True)
    hazard_type = Column(String)
    severity = Column(String, default="HIGH")
    latitude = Column(Float)
    longitude = Column(Float)
    state = Column(String, default="")
    district = Column(String, default="")
    panchayat = Column(String, default="")
    affected_crops = Column(JSON, default=list)
    trigger_value = Column(Float)
    status = Column(String, default="ACTIVE")
    officer_assigned = Column(String, default="")
    action_taken = Column(Text, default="")
    created_at = Column(DateTime(timezone=True), default=_now)
    resolved_at = Column(DateTime(timezone=True), nullable=True)


# =============================================================================
# AUTHORITATIVE ADMINISTRATIVE DATA MODELS (Survey of India & LGD MoPR)
# =============================================================================

class AdminState(Base):
    """
    Survey of India & LGD State / Union Territory entity
    """
    __tablename__ = "admin_states"
    id = Column(Integer, primary_key=True)
    lgd_code = Column(Integer, unique=True, index=True, nullable=False)
    name = Column(String, unique=True, index=True, nullable=False)
    name_hi = Column(String, default="")
    census_code = Column(String, default="")
    category = Column(String, default="STATE")  # STATE / UT
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), default=_now)


class AdminDistrict(Base):
    """
    Authoritative District entity with LGD Code and State relationship
    """
    __tablename__ = "admin_districts"
    id = Column(Integer, primary_key=True)
    lgd_code = Column(Integer, unique=True, index=True, nullable=False)
    state_id = Column(Integer, ForeignKey("admin_states.id"), index=True, nullable=True)
    state_name = Column(String, index=True, nullable=False)
    name = Column(String, index=True, nullable=False)
    name_hi = Column(String, default="")
    census_code = Column(String, default="")
    headquarters = Column(String, default="")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    has_boundary_geom = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=_now)


class AdminSubDistrict(Base):
    """
    Sub-district / Tehsil / Taluk administrative division
    """
    __tablename__ = "admin_sub_districts"
    id = Column(Integer, primary_key=True)
    lgd_code = Column(Integer, unique=True, index=True, nullable=False)
    district_id = Column(Integer, ForeignKey("admin_districts.id"), index=True, nullable=True)
    district_name = Column(String, index=True, nullable=False)
    state_name = Column(String, index=True, nullable=False)
    name = Column(String, index=True, nullable=False)
    name_hi = Column(String, default="")
    census_code = Column(String, default="")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), default=_now)


class AdminBlock(Base):
    """
    Development Block administrative division
    """
    __tablename__ = "admin_blocks"
    id = Column(Integer, primary_key=True)
    lgd_code = Column(Integer, unique=True, index=True, nullable=False)
    district_id = Column(Integer, ForeignKey("admin_districts.id"), index=True, nullable=True)
    district_name = Column(String, index=True, nullable=False)
    state_name = Column(String, index=True, nullable=False)
    name = Column(String, index=True, nullable=False)
    name_hi = Column(String, default="")
    headquarters = Column(String, default="")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), default=_now)


class AdminPanchayat(Base):
    """
    Local Government Directory (LGD) Panchayat Entity (Gram / Block / District Panchayat / ULB)
    Explicitly decoupled from Revenue Villages.
    """
    __tablename__ = "admin_panchayats"
    id = Column(Integer, primary_key=True)
    lgd_code = Column(Integer, unique=True, index=True, nullable=False)
    panchayat_type = Column(String, default="GRAM_PANCHAYAT", index=True)  # GRAM_PANCHAYAT, INTERMEDIATE_PANCHAYAT, DISTRICT_PANCHAYAT, URBAN_LOCAL_BODY
    name = Column(String, index=True, nullable=False)
    name_hi = Column(String, default="")
    state_name = Column(String, index=True, nullable=False)
    district_name = Column(String, index=True, nullable=False)
    block_name = Column(String, index=True, default="")
    district_lgd_code = Column(Integer, nullable=True)
    block_lgd_code = Column(Integer, nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), default=_now)


class AdminVillage(Base):
    """
    Revenue Village entity with official Village LGD Code, Sub-District and Panchayat mapping.
    """
    __tablename__ = "admin_villages"
    id = Column(Integer, primary_key=True)
    lgd_code = Column(Integer, unique=True, index=True, nullable=False)
    name = Column(String, index=True, nullable=False)
    name_hi = Column(String, default="")
    state_name = Column(String, index=True, nullable=False)
    district_name = Column(String, index=True, nullable=False)
    sub_district_name = Column(String, index=True, default="")
    block_name = Column(String, index=True, default="")
    panchayat_id = Column(Integer, ForeignKey("admin_panchayats.id"), nullable=True, index=True)
    panchayat_name = Column(String, index=True, default="")
    panchayat_lgd_code = Column(Integer, nullable=True, index=True)
    census_code = Column(String, default="")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    soil_type = Column(String, default="Alluvial")
    irrigation_status = Column(String, default="Rainfed / Tube-well")
    created_at = Column(DateTime(timezone=True), default=_now)

