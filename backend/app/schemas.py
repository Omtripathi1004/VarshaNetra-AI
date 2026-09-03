from __future__ import annotations
from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, EmailStr, field_validator


# ── Location ──────────────────────────────────────────────────────────────────

class LocationResolveRequest(BaseModel):
    lat: Optional[float] = None
    lon: Optional[float] = None
    # Manual cascade inputs
    state: Optional[str] = None
    district: Optional[str] = None
    city: Optional[str] = None
    village: Optional[str] = None


class LocationResponse(BaseModel):
    latitude: float
    longitude: float
    state: str
    district: str
    city: str
    block: str
    panchayat: str
    village: str
    elevation_m: float
    soil_type: str
    display_name: str


class GeoSearchResult(BaseModel):
    name: str
    state: str
    district: str
    latitude: float
    longitude: float


# ── Weather ───────────────────────────────────────────────────────────────────

class WeatherData(BaseModel):
    latitude: float
    longitude: float
    location_label: str
    temperature_c: Optional[float]
    humidity_pct: Optional[float]
    precipitation_mm: Optional[float]
    rain_mm: Optional[float]
    cloud_cover_pct: Optional[float]
    pressure_msl_hpa: Optional[float]
    wind_speed_kmh: Optional[float]
    wind_direction_deg: Optional[float]
    soil_moisture_0_1cm: Optional[float]
    weather_code: Optional[int]
    weather_description: str
    fetched_at: str


class ForecastDay(BaseModel):
    date: str
    temp_max_c: float
    temp_min_c: float
    rainfall_mm: float
    rain_probability_pct: float
    wind_max_kmh: float
    weather_code: int
    description: str


class WeatherForecastResponse(BaseModel):
    latitude: float
    longitude: float
    location_label: str
    days: List[ForecastDay]


# ── ML Prediction ─────────────────────────────────────────────────────────────

class HourlyTrendPoint(BaseModel):
    hour: int
    time_label: str
    probability_pct: float
    expected_mm: float


class SHAPFeature(BaseModel):
    feature: str
    feature_hi: str
    value: float
    shap_contribution: float
    unit: str


class PredictionResponse(BaseModel):
    latitude: float
    longitude: float
    location_label: str
    model_version: str
    probability_pct: float
    expected_mm: float
    category: str         # NO_RAIN / LIGHT / MODERATE / HEAVY / VERY_HEAVY
    category_hi: str
    confidence_pct: float
    monsoon_phase: str
    monsoon_phase_hi: str
    hourly_trend: List[HourlyTrendPoint]
    shap_features: List[SHAPFeature]
    xai_narrative_en: str
    xai_narrative_hi: str
    created_at: str


# ── Monsoon Phase ─────────────────────────────────────────────────────────────

class MonsoonOnsetEngine(BaseModel):
    expected_window_start: str
    expected_window_end: str
    onset_probability_pct: float
    confidence_pct: float
    progression_day: int
    progression_label: str


class FalseOnsetEngine(BaseModel):
    false_onset_probability_pct: float
    temporary_rain_detected: bool
    sowing_caution: bool
    caution_message_en: str
    caution_message_hi: str


class BreakWatchEngine(BaseModel):
    break_probability_pct: float
    expected_start: str
    expected_end: str
    duration_days: int
    severity: str
    warning_en: str
    warning_hi: str


class MonsoonPhaseResponse(BaseModel):
    phase: str
    phase_hi: str
    current_phase_description_en: str
    current_phase_description_hi: str
    criteria_met: List[str]
    onset_engine: MonsoonOnsetEngine
    false_onset_engine: FalseOnsetEngine
    break_watch_engine: BreakWatchEngine


# ── Crop Advisor ──────────────────────────────────────────────────────────────

class CropFactorScores(BaseModel):
    temperature: float
    rainfall: float
    humidity: float
    soil_moisture: float
    monsoon_alignment: float


class CropAdvisoryItem(BaseModel):
    rank: int
    name_en: str
    name_hi: str
    season: str
    icon: str
    suitability_score: float
    sowing_window: str
    duration_days: int
    market_price_inr_qtl: float
    factor_scores: CropFactorScores
    requirements: Dict[str, Any]
    advice_en: str
    advice_hi: str
    warnings: List[str]


class CropAdvisorResponse(BaseModel):
    latitude: float
    longitude: float
    location_label: str
    monsoon_phase: str
    current_conditions: Dict[str, Any]
    season_filter: str
    top_crops: List[CropAdvisoryItem]
    smart_recommendations: Optional[Dict[str, Any]] = None


# ── Smart Crop & Variety Recommendation (Final Specification) ─────────────────

class SmartCropRecommendationItem(BaseModel):
    rank: int
    crop_id: str
    crop_name_en: str
    crop_name_hi: str
    icon: str
    category: str
    season: str
    suitability_score: float
    recommended_variety: str
    recommended_variety_hi: str
    variety_score: float
    why_suitable_en: str
    why_suitable_hi: str
    key_risks_en: str
    key_risks_hi: str
    expected_water_need: str
    sowing_window: str
    sowing_window_hi: str
    duration_days: int
    confidence: str
    source: str
    source_url: str
    intercrop_options: str
    market_price_inr_qtl: float
    factor_scores: Dict[str, float]
    all_evaluated_varieties: List[Dict[str, Any]]


class WhyNotExcludedCrop(BaseModel):
    crop_id: str
    crop_name_en: str
    crop_name_hi: str
    icon: str
    season: str
    score: float
    reason_en: str
    reason_hi: str


class SmartCropResponse(BaseModel):
    engine_version: str
    timestamp_updated: str
    location: Dict[str, Any]
    condition_summary: Dict[str, Any]
    recommendations: List[SmartCropRecommendationItem]
    alternative_options: List[Dict[str, Any]]
    why_not_excluded: List[WhyNotExcludedCrop]
    multi_factor_weights: Dict[str, str]


# ── Risk ──────────────────────────────────────────────────────────────────────

class RiskZone(BaseModel):
    hazard: str
    score: float
    level: str       # LOW / MODERATE / HIGH / CRITICAL
    description_en: str
    description_hi: str


class RiskSummaryResponse(BaseModel):
    latitude: float
    longitude: float
    location_label: str
    composite_score: float
    composite_level: str
    primary_hazard: str
    zones: List[RiskZone]
    geojson: Optional[Dict[str, Any]] = None


# ── Alerts ────────────────────────────────────────────────────────────────────

class AlertResponse(BaseModel):
    id: int
    alert_type: str
    severity: str
    headline_en: str
    headline_hi: str
    message_en: str
    message_hi: str
    state: str
    district: str
    status: str
    created_at: str


class AlertAcknowledgeRequest(BaseModel):
    acknowledged_by: str
    action_taken: str


# ── Emergency & Notifications ─────────────────────────────────────────────────

class SMSRequest(BaseModel):
    phoneNumber: str
    location: Optional[str] = None
    alertType: Optional[str] = "HEAVY_RAIN"
    message: Optional[str] = None


class TestSMSRequest(BaseModel):
    phone: str
    message: Optional[str] = "VarshaNetra AI SMS test successful."


class TestEmailRequest(BaseModel):
    email: str
    subject: Optional[str] = "VarshaNetra AI Email Test"
    message: Optional[str] = "VarshaNetra AI email test successful."


class EmailRequest(BaseModel):
    email: Optional[str] = None
    recipient: Optional[str] = None
    to: Optional[str] = None
    subject: Optional[str] = "VarshaNetra AI Alert"
    message: Optional[str] = ""
    alertType: Optional[str] = "GENERAL"
    alert_type: Optional[str] = "GENERAL"


class NotifyRequest(BaseModel):

    channel: str                    # SMS / EMAIL / WHATSAPP
    recipients: List[str]
    subject: Optional[str] = ""
    message: str
    alert_type: Optional[str] = "GENERAL"


class NotifyResponse(BaseModel):
    channel: str
    recipients_count: int
    status: str
    message: str
    sent_at: str


class EmergencyEventResponse(BaseModel):
    id: int
    hazard_type: str
    severity: str
    state: str
    district: str
    panchayat: str
    affected_crops: List[str]
    trigger_value: float
    status: str
    officer_assigned: str
    action_taken: str
    created_at: str


class EmergencyResolveRequest(BaseModel):
    officer_name: str
    action_taken: str
    status_update: str


# ── Chatbot ───────────────────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str
    language: str = "en"
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    location_label: Optional[str] = None


class ChatResponse(BaseModel):
    reply: str
    reply_hi: str
    intent_detected: str
    data_source: str
    confidence: float


# ── Simulation ────────────────────────────────────────────────────────────────

class SimulationRequest(BaseModel):
    latitude: float
    longitude: float
    crop_name: str = "Paddy (Rice)"
    crop_stage: str = "Tillering"
    rainfall_change_pct: float = 0.0
    dry_days: int = 0
    temperature_change_c: float = 0.0
    duration_days: int = 14


class SimulationResponse(BaseModel):
    crop_stress_index_pct: float
    yield_impact_pct: float
    soil_moisture_projected: float
    recommended_contingency_en: str
    recommended_contingency_hi: str
    is_simulation_only: bool = True
    scenario_summary: str


# ── Auth ──────────────────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    full_name: str


class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    phone: str
    language: str
    is_active: bool
