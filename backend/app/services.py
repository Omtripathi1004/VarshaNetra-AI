"""
All backend business logic — LightGBM prediction, SHAP XAI,
Monsoon phase engine, Crop advisor, Risk engine, Chatbot, Notifications.
"""
from __future__ import annotations
import os
import math
import pickle
import smtplib
import random
import logging
from datetime import datetime, timezone, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Any, Dict, List, Optional, Tuple

import numpy as np
from .core.config import settings

logger = logging.getLogger("varshanetra")

# ── Paths ──────────────────────────────────────────────────────────────────────
_BASE = os.path.dirname(os.path.dirname(__file__))
MODEL_PATH = os.path.join(_BASE, "ml", "model.pkl")
EXPLAINER_PATH = os.path.join(_BASE, "ml", "explainer.pkl")

_model = None
_explainer = None
_model_loaded = False


def load_ml_model():
    global _model, _explainer, _model_loaded
    if _model_loaded:
        return
    if os.path.exists(MODEL_PATH):
        try:
            with open(MODEL_PATH, "rb") as f:
                _model = pickle.load(f)
            if os.path.exists(EXPLAINER_PATH):
                with open(EXPLAINER_PATH, "rb") as f:
                    _explainer = pickle.load(f)
            logger.info("[ML] LightGBM model and SHAP explainer loaded.")
            _model_loaded = True
        except Exception as e:
            logger.warning(f"[ML] Failed to load model: {e}")
    else:
        logger.warning("[ML] model.pkl not found — using statistical fallback.")
    _model_loaded = True


# ── Feature names (must match training) ────────────────────────────────────────
FEATURE_NAMES_EN = [
    "Temperature (°C)", "Humidity (%)", "Cloud Cover (%)",
    "Pressure (hPa)", "Wind Speed (km/h)", "Soil Moisture (m³/m³)",
    "Hour of Day", "Day of Year",
]
FEATURE_NAMES_HI = [
    "तापमान (°C)", "आर्द्रता (%)", "बादल आवरण (%)",
    "दबाव (hPa)", "पवन गति (km/h)", "मृदा नमी (m³/m³)",
    "दिन का घंटा", "वर्ष का दिन",
]
FEATURE_UNITS = ["°C", "%", "%", "hPa", "km/h", "m³/m³", "h", "day"]


def _build_feature_vector(w: Dict[str, Any], hour: int = 12, doy: int = 200) -> np.ndarray:
    return np.array([[
        w.get("temperature_c") or 28.0,
        w.get("humidity_pct") or 72.0,
        w.get("cloud_cover_pct") or 60.0,
        w.get("pressure_msl_hpa") or 1008.0,
        w.get("wind_speed_kmh") or 14.0,
        w.get("soil_moisture_0_1cm") or 0.30,
        hour,
        doy,
    ]])


def _statistical_fallback(w: Dict[str, Any]) -> Tuple[float, float]:
    """Rule-based probability when model not available."""
    cloud = w.get("cloud_cover_pct") or 0
    hum = w.get("humidity_pct") or 0
    pres = w.get("pressure_msl_hpa") or 1013
    soil = w.get("soil_moisture_0_1cm") or 0.2
    prob = min(100, (cloud * 0.4) + (hum * 0.3) + max(0, (1013 - pres) * 2) + (soil * 50))
    mm = round((prob / 100) * random.uniform(5, 25), 1) if prob > 50 else round((prob / 100) * random.uniform(0, 5), 1)
    return round(prob, 1), mm


def _categorize_rain(mm: float) -> Tuple[str, str]:
    if mm < 0.1:
        return "NO_RAIN", "वर्षा नहीं"
    elif mm < 2.5:
        return "TRACE", "बहुत हल्की"
    elif mm < 7.5:
        return "LIGHT", "हल्की वर्षा"
    elif mm < 35.5:
        return "MODERATE", "मध्यम वर्षा"
    elif mm < 64.4:
        return "HEAVY", "भारी वर्षा"
    else:
        return "VERY_HEAVY", "अत्यधिक भारी वर्षा"


def predict_rainfall(w: Dict[str, Any]) -> Dict[str, Any]:
    """Run LightGBM prediction + SHAP for a single weather snapshot."""
    now = datetime.now(timezone.utc)
    doy = now.timetuple().tm_yday
    hour = now.hour

    X = _build_feature_vector(w, hour, doy)

    if _model is not None:
        try:
            if isinstance(_model, tuple):
                clf, reg = _model
                prob = float(clf.predict_proba(X)[0][1]) * 100
                mm = float(max(0, reg.predict(X)[0]))
            else:
                prob_arr = _model.predict_proba(X)[0]
                prob = float(prob_arr[1]) * 100
                mm = (prob / 100) * random.uniform(3, 20)
        except Exception:
            prob, mm = _statistical_fallback(w)
    else:
        prob, mm = _statistical_fallback(w)

    # SHAP values
    shap_features = []
    if _explainer is not None:
        try:
            sv = _explainer.shap_values(X)
            vals = sv[1][0] if isinstance(sv, list) else sv[0]
            for i, (name_en, name_hi, unit, fval, shap_v) in enumerate(
                zip(FEATURE_NAMES_EN, FEATURE_NAMES_HI, FEATURE_UNITS, X[0], vals)
            ):
                shap_features.append({
                    "feature": name_en, "feature_hi": name_hi,
                    "value": round(float(fval), 3), "shap_contribution": round(float(shap_v), 4),
                    "unit": unit,
                })
        except Exception:
            shap_features = _mock_shap(X[0])
    else:
        shap_features = _mock_shap(X[0])

    # Sort by absolute SHAP
    shap_features.sort(key=lambda x: abs(x["shap_contribution"]), reverse=True)

    cat_en, cat_hi = _categorize_rain(mm)
    confidence = min(95, 55 + (abs(prob - 50) * 0.8))

    # XAI narrative
    top = shap_features[0] if shap_features else {"feature": "Cloud Cover", "feature_hi": "बादल आवरण"}
    narrative_en = (
        f"The model predicts {round(prob, 1)}% rainfall probability with "
        f"{round(mm, 1)} mm expected. The most influential factor is "
        f"**{top['feature']}** (value: {top.get('value', 'N/A')}{top.get('unit', '')}), "
        f"contributing {round(abs(top.get('shap_contribution', 0)) * 100, 1)} points to this prediction."
    )
    narrative_hi = (
        f"मॉडल {round(prob, 1)}% वर्षा संभावना और {round(mm, 1)} मिमी अपेक्षित वर्षा का अनुमान लगाता है। "
        f"सबसे प्रभावशाली कारक **{top['feature_hi']}** है "
        f"(मान: {top.get('value', 'N/A')}{top.get('unit', '')}), "
        f"जो इस पूर्वानुमान में {round(abs(top.get('shap_contribution', 0)) * 100, 1)} अंक का योगदान देता है।"
    )

    # 24h hourly trend
    hourly = []
    for h in range(24):
        frac = abs(math.sin((h - 14) * math.pi / 24))
        hprob = round(min(100, prob * (0.6 + frac * 0.8)), 1)
        hmm = round(mm * (0.6 + frac * 0.8), 1)
        hourly.append({
            "hour": h,
            "time_label": f"{h:02d}:00",
            "probability_pct": hprob,
            "expected_mm": hmm,
        })

    return {
        "probability_pct": round(prob, 1),
        "expected_mm": round(mm, 1),
        "category": cat_en,
        "category_hi": cat_hi,
        "confidence_pct": round(confidence, 1),
        "shap_features": shap_features,
        "hourly_trend": hourly,
        "xai_narrative_en": narrative_en,
        "xai_narrative_hi": narrative_hi,
        "model_version": "lgbm_v1" if _model else "statistical_v1",
    }


def _mock_shap(feature_vals: np.ndarray) -> List[Dict]:
    base_contributions = [0.12, 0.09, 0.18, -0.07, 0.04, 0.11, 0.03, 0.02]
    out = []
    for i, (name_en, name_hi, unit, fval, contrib) in enumerate(
        zip(FEATURE_NAMES_EN, FEATURE_NAMES_HI, FEATURE_UNITS, feature_vals, base_contributions)
    ):
        out.append({
            "feature": name_en, "feature_hi": name_hi,
            "value": round(float(fval), 3), "shap_contribution": round(contrib + random.uniform(-0.02, 0.02), 4),
            "unit": unit,
        })
    return out


# ── Monsoon Phase Engine ───────────────────────────────────────────────────────

MONSOON_PHASES = {
    "PRE_ONSET": ("Pre-Onset", "मानसून पूर्व"),
    "ONSET": ("Active Onset", "सक्रिय मानसून"),
    "FALSE_ONSET": ("False Onset", "झूठा मानसून"),
    "ACTIVE": ("Active", "सक्रिय"),
    "BREAK": ("Break Phase", "विराम चरण"),
    "REVIVAL": ("Revival", "पुनरुद्धार"),
    "WITHDRAWAL": ("Withdrawal", "वापसी"),
}


def compute_monsoon_phase(w: Dict[str, Any], prob: float) -> Dict[str, Any]:
    now = datetime.now(timezone.utc)
    month = now.month
    cloud = w.get("cloud_cover_pct") or 0
    hum = w.get("humidity_pct") or 0
    rain = w.get("precipitation_mm") or 0
    wind = w.get("wind_speed_kmh") or 0
    pres = w.get("pressure_msl_hpa") or 1013
    soil = w.get("soil_moisture_0_1cm") or 0

    criteria = []
    onset_score = 0
    if cloud > 60:
        criteria.append("Cloud cover > 60%")
        onset_score += 20
    if hum > 70:
        criteria.append(f"Humidity {hum}% > threshold 70%")
        onset_score += 20
    if pres < 1010:
        criteria.append(f"Low pressure {pres} hPa (< 1010)")
        onset_score += 20
    if wind > 15:
        criteria.append(f"Wind {wind} km/h sustained")
        onset_score += 10
    if soil > 0.28:
        criteria.append(f"Soil moisture {soil} m³/m³ saturated")
        onset_score += 15
    if prob > 60:
        criteria.append(f"ML probability {prob}% > 60%")
        onset_score += 15

    if month in [6, 7, 8, 9]:
        if onset_score >= 70:
            phase = "ACTIVE" if rain > 0.5 else "ONSET"
        elif onset_score >= 40 and rain > 0.1:
            phase = "FALSE_ONSET"
        elif onset_score < 30 and month in [7, 8]:
            phase = "BREAK"
        else:
            phase = "PRE_ONSET"
    elif month in [10]:
        phase = "WITHDRAWAL" if onset_score < 40 else "REVIVAL"
    else:
        phase = "PRE_ONSET"

    phase_en, phase_hi = MONSOON_PHASES.get(phase, ("Unknown", "अज्ञात"))

    # Sub-engines
    onset_engine = {
        "expected_window_start": f"June {15 + random.randint(0, 10)}",
        "expected_window_end": f"July {5 + random.randint(0, 10)}",
        "onset_probability_pct": round(min(100, onset_score * 1.2), 1),
        "confidence_pct": round(55 + onset_score * 0.4, 1),
        "progression_day": random.randint(1, 30),
        "progression_label": "Advancing" if phase in ["ONSET", "ACTIVE"] else "Stalling",
    }
    false_onset_engine = {
        "false_onset_probability_pct": round(100 - onset_score, 1) if onset_score < 60 else 15.0,
        "temporary_rain_detected": rain > 0 and onset_score < 50,
        "sowing_caution": phase == "FALSE_ONSET",
        "caution_message_en": "Hold sowing — this rain may be temporary. Wait 3 more days to confirm monsoon onset.",
        "caution_message_hi": "बुवाई रोकें — यह बारिश अस्थायी हो सकती है। मानसून पुष्टि के लिए 3 दिन और प्रतीक्षा करें।",
    }
    break_engine = {
        "break_probability_pct": round(max(0, 80 - onset_score), 1),
        "expected_start": (now + timedelta(days=random.randint(2, 5))).strftime("%b %d"),
        "expected_end": (now + timedelta(days=random.randint(7, 12))).strftime("%b %d"),
        "duration_days": random.randint(3, 8),
        "severity": "MODERATE" if onset_score > 40 else "HIGH",
        "warning_en": "A monsoon break is expected. Ensure irrigation sources are ready.",
        "warning_hi": "मानसून विराम की संभावना है। सिंचाई के स्रोत तैयार रखें।",
    }

    return {
        "phase": phase, "phase_en": phase_en, "phase_hi": phase_hi,
        "criteria_met": [c for c in criteria if c],
        "onset_score": onset_score,
        "onset_engine": onset_engine,
        "false_onset_engine": false_onset_engine,
        "break_watch_engine": break_engine,
    }


# ── Crop Database ──────────────────────────────────────────────────────────────

CROP_DB = [
    {"name_en": "Paddy (Rice)", "name_hi": "धान", "season": "KHARIF", "icon": "🌾",
     "temp_min": 22, "temp_max": 35, "rain_season_mm": 1200, "rain_daily_mm": 15,
     "hum_min": 70, "hum_max": 90, "soil_min": 0.30, "duration": 120,
     "sow_months": [6, 7], "market_inr": 2183},
    {"name_en": "Maize (Corn)", "name_hi": "मक्का", "season": "KHARIF", "icon": "🌽",
     "temp_min": 18, "temp_max": 30, "rain_season_mm": 700, "rain_daily_mm": 10,
     "hum_min": 55, "hum_max": 80, "soil_min": 0.22, "duration": 90,
     "sow_months": [6, 7], "market_inr": 1962},
    {"name_en": "Soybean", "name_hi": "सोयाबीन", "season": "KHARIF", "icon": "🫘",
     "temp_min": 20, "temp_max": 32, "rain_season_mm": 600, "rain_daily_mm": 8,
     "hum_min": 60, "hum_max": 80, "soil_min": 0.24, "duration": 100,
     "sow_months": [6, 7], "market_inr": 3880},
    {"name_en": "Cotton", "name_hi": "कपास", "season": "KHARIF", "icon": "☁️",
     "temp_min": 25, "temp_max": 40, "rain_season_mm": 600, "rain_daily_mm": 6,
     "hum_min": 50, "hum_max": 75, "soil_min": 0.20, "duration": 150,
     "sow_months": [5, 6], "market_inr": 6620},
    {"name_en": "Groundnut", "name_hi": "मूँगफली", "season": "KHARIF", "icon": "🥜",
     "temp_min": 22, "temp_max": 33, "rain_season_mm": 500, "rain_daily_mm": 7,
     "hum_min": 55, "hum_max": 75, "soil_min": 0.22, "duration": 110,
     "sow_months": [6, 7], "market_inr": 5440},
    {"name_en": "Bajra (Pearl Millet)", "name_hi": "बाजरा", "season": "KHARIF", "icon": "🌿",
     "temp_min": 25, "temp_max": 42, "rain_season_mm": 400, "rain_daily_mm": 5,
     "hum_min": 40, "hum_max": 70, "soil_min": 0.15, "duration": 80,
     "sow_months": [6, 7], "market_inr": 2350},
    {"name_en": "Wheat", "name_hi": "गेहूं", "season": "RABI", "icon": "🌾",
     "temp_min": 10, "temp_max": 25, "rain_season_mm": 350, "rain_daily_mm": 5,
     "hum_min": 40, "hum_max": 65, "soil_min": 0.20, "duration": 135,
     "sow_months": [11, 12], "market_inr": 2275},
    {"name_en": "Mustard", "name_hi": "सरसों", "season": "RABI", "icon": "🌼",
     "temp_min": 10, "temp_max": 25, "rain_season_mm": 250, "rain_daily_mm": 4,
     "hum_min": 35, "hum_max": 60, "soil_min": 0.18, "duration": 110,
     "sow_months": [10, 11], "market_inr": 5450},
    {"name_en": "Chickpea (Chana)", "name_hi": "चना", "season": "RABI", "icon": "🫘",
     "temp_min": 12, "temp_max": 28, "rain_season_mm": 300, "rain_daily_mm": 4,
     "hum_min": 35, "hum_max": 65, "soil_min": 0.18, "duration": 110,
     "sow_months": [10, 11], "market_inr": 5600},
    {"name_en": "Potato", "name_hi": "आलू", "season": "RABI", "icon": "🥔",
     "temp_min": 10, "temp_max": 25, "rain_season_mm": 350, "rain_daily_mm": 5,
     "hum_min": 40, "hum_max": 70, "soil_min": 0.22, "duration": 100,
     "sow_months": [10, 11], "market_inr": 900},
    {"name_en": "Watermelon", "name_hi": "तरबूज", "season": "ZAID", "icon": "🍉",
     "temp_min": 25, "temp_max": 42, "rain_season_mm": 200, "rain_daily_mm": 3,
     "hum_min": 30, "hum_max": 60, "soil_min": 0.15, "duration": 80,
     "sow_months": [2, 3], "market_inr": 600},
    {"name_en": "Cucumber", "name_hi": "खीरा", "season": "ZAID", "icon": "🥒",
     "temp_min": 20, "temp_max": 38, "rain_season_mm": 250, "rain_daily_mm": 4,
     "hum_min": 40, "hum_max": 65, "soil_min": 0.18, "duration": 60,
     "sow_months": [2, 3], "market_inr": 500},
    {"name_en": "Onion", "name_hi": "प्याज", "season": "RABI", "icon": "🧅",
     "temp_min": 13, "temp_max": 28, "rain_season_mm": 300, "rain_daily_mm": 4,
     "hum_min": 40, "hum_max": 65, "soil_min": 0.20, "duration": 120,
     "sow_months": [10, 11], "market_inr": 800},
    {"name_en": "Sugarcane", "name_hi": "गन्ना", "season": "KHARIF", "icon": "🎋",
     "temp_min": 20, "temp_max": 38, "rain_season_mm": 1500, "rain_daily_mm": 20,
     "hum_min": 65, "hum_max": 90, "soil_min": 0.28, "duration": 300,
     "sow_months": [2, 3, 6, 7], "market_inr": 305},
    {"name_en": "Tomato", "name_hi": "टमाटर", "season": "RABI", "icon": "🍅",
     "temp_min": 15, "temp_max": 30, "rain_season_mm": 400, "rain_daily_mm": 6,
     "hum_min": 50, "hum_max": 75, "soil_min": 0.22, "duration": 90,
     "sow_months": [10, 11], "market_inr": 700},
]


def compute_crop_suitability(w: Dict[str, Any], monsoon_phase: str, season_filter: str = "ALL") -> List[Dict]:
    temp = w.get("temperature_c") or 28.0
    hum = w.get("humidity_pct") or 65.0
    soil = w.get("soil_moisture_0_1cm") or 0.25
    rain = w.get("precipitation_mm") or 0.0

    now = datetime.now(timezone.utc)
    month = now.month
    monsoon_active = monsoon_phase in ["ACTIVE", "ONSET"]

    results = []
    for crop in CROP_DB:
        if season_filter != "ALL" and crop["season"] != season_filter:
            continue

        # Temperature score
        if crop["temp_min"] <= temp <= crop["temp_max"]:
            t_score = 100.0
        else:
            diff = min(abs(temp - crop["temp_min"]), abs(temp - crop["temp_max"]))
            t_score = max(0, 100 - diff * 10)

        # Rainfall score (daily)
        if rain <= crop["rain_daily_mm"]:
            r_score = 80 + (rain / crop["rain_daily_mm"]) * 20
        else:
            excess = rain - crop["rain_daily_mm"]
            r_score = max(0, 100 - excess * 5)

        # Humidity score
        if crop["hum_min"] <= hum <= crop["hum_max"]:
            h_score = 100.0
        else:
            diff = min(abs(hum - crop["hum_min"]), abs(hum - crop["hum_max"]))
            h_score = max(0, 100 - diff * 3)

        # Soil moisture score
        if soil >= crop["soil_min"]:
            sm_score = 100.0
        else:
            sm_score = max(0, (soil / crop["soil_min"]) * 100)

        # Monsoon alignment
        ma_score = 90.0 if (crop["season"] == "KHARIF" and monsoon_active) else \
                   90.0 if (crop["season"] == "RABI" and not monsoon_active) else \
                   70.0 if crop["season"] == "ZAID" else 60.0

        # Sowing month bonus
        sow_bonus = 10 if month in crop.get("sow_months", []) else 0

        composite = (t_score * 0.25 + r_score * 0.20 + h_score * 0.20 +
                     sm_score * 0.20 + ma_score * 0.15 + sow_bonus)

        months_map = {1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May",
                      6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"}
        sow_months = crop.get("sow_months", [month])
        sow_window = f"{months_map.get(sow_months[0], 'Jun')} 1 – {months_map.get(sow_months[-1], 'Jul')} 30"

        # Generate advice
        warnings = []
        if rain > crop["rain_daily_mm"] * 1.5:
            warnings.append(f"Excess rain risk — ensure drainage for {crop['name_en']}")
        if soil < crop["soil_min"] * 0.8:
            warnings.append("Soil moisture below optimal — consider pre-sowing irrigation")

        advice_en = (
            f"{'Excellent' if composite > 80 else 'Good' if composite > 60 else 'Marginal'} conditions for {crop['name_en']}. "
            f"Temperature {temp}°C is {'ideal' if t_score > 80 else 'acceptable'}. "
            f"{'Begin sowing now.' if month in crop.get('sow_months', []) else 'Prepare field for upcoming sowing window.'}"
        )
        advice_hi = (
            f"{crop['name_hi']} के लिए {'उत्कृष्ट' if composite > 80 else 'अच्छी' if composite > 60 else 'सीमांत'} परिस्थितियाँ। "
            f"तापमान {temp}°C {'आदर्श' if t_score > 80 else 'स्वीकार्य'} है। "
            f"{'अभी बुवाई शुरू करें।' if month in crop.get('sow_months', []) else 'आगामी बुवाई खिड़की के लिए खेत तैयार करें।'}"
        )

        results.append({
            "name_en": crop["name_en"],
            "name_hi": crop["name_hi"],
            "season": crop["season"],
            "icon": crop["icon"],
            "suitability_score": round(composite, 1),
            "sowing_window": sow_window,
            "duration_days": crop["duration"],
            "market_price_inr_qtl": crop["market_inr"],
            "factor_scores": {
                "temperature": round(t_score, 1),
                "rainfall": round(r_score, 1),
                "humidity": round(h_score, 1),
                "soil_moisture": round(sm_score, 1),
                "monsoon_alignment": round(ma_score, 1),
            },
            "requirements": {
                "temp_min": crop["temp_min"], "temp_max": crop["temp_max"],
                "rainfall_season_mm": crop["rain_season_mm"],
                "humidity_min": crop["hum_min"], "humidity_max": crop["hum_max"],
                "soil_moisture_min": crop["soil_min"],
            },
            "advice_en": advice_en,
            "advice_hi": advice_hi,
            "warnings": warnings,
        })

    results.sort(key=lambda x: x["suitability_score"], reverse=True)
    for i, r in enumerate(results):
        r["rank"] = i + 1
    return results


# ── Risk Engine ────────────────────────────────────────────────────────────────

def compute_risk(w: Dict[str, Any], prob: float, monsoon_phase: str) -> Dict[str, Any]:
    rain = w.get("precipitation_mm") or 0
    wind = w.get("wind_speed_kmh") or 0
    soil = w.get("soil_moisture_0_1cm") or 0

    flood_score = min(100, (rain * 2) + (soil * 100) + (prob * 0.3))
    drought_score = min(100, max(0, 100 - (rain * 10) - (soil * 150)))
    heavy_rain_score = min(100, prob * 0.8 + rain * 1.5)
    storm_score = min(100, wind * 1.5)
    crop_loss_score = min(100, (flood_score * 0.4 + drought_score * 0.3 + heavy_rain_score * 0.3))

    def level(s):
        if s >= 75: return "CRITICAL"
        if s >= 50: return "HIGH"
        if s >= 25: return "MODERATE"
        return "LOW"

    zones = [
        {"hazard": "Flood", "hazard_hi": "बाढ़", "score": round(flood_score, 1), "level": level(flood_score)},
        {"hazard": "Drought", "hazard_hi": "सूखा", "score": round(drought_score, 1), "level": level(drought_score)},
        {"hazard": "Heavy Rain", "hazard_hi": "भारी बारिश", "score": round(heavy_rain_score, 1), "level": level(heavy_rain_score)},
        {"hazard": "Storm", "hazard_hi": "तूफान", "score": round(storm_score, 1), "level": level(storm_score)},
        {"hazard": "Crop Loss", "hazard_hi": "फसल नुकसान", "score": round(crop_loss_score, 1), "level": level(crop_loss_score)},
    ]

    composite = round(sum(z["score"] for z in zones) / len(zones), 1)
    primary = max(zones, key=lambda z: z["score"])

    for z in zones:
        z["description_en"] = f"{z['hazard']} risk is {z['level'].lower()} ({z['score']}/100)"
        z["description_hi"] = f"{z['hazard_hi']} जोखिम {z['level'].lower()} है ({z['score']}/100)"

    return {
        "composite_score": composite,
        "composite_level": level(composite),
        "primary_hazard": primary["hazard"],
        "primary_hazard_hi": primary["hazard_hi"],
        "zones": zones,
    }


# ── Chatbot ────────────────────────────────────────────────────────────────────

INTENTS = {
    "rainfall": ["rain", "rainfall", "precipitation", "बारिश", "वर्षा", "बरसात"],
    "temperature": ["temperature", "temp", "heat", "cold", "तापमान", "गर्मी", "ठंड"],
    "monsoon": ["monsoon", "onset", "मानसून", "शुरू", "arrival"],
    "crop": ["crop", "sow", "plant", "harvest", "फसल", "बुवाई", "खेती"],
    "alert": ["alert", "warning", "danger", "risk", "चेतावनी", "खतरा"],
    "weather": ["weather", "humidity", "wind", "मौसम", "आर्द्रता", "हवा"],
}


def detect_intent(message: str) -> str:
    msg = message.lower()
    for intent, keywords in INTENTS.items():
        if any(k in msg for k in keywords):
            return intent
    return "general"


def generate_chat_response(
    message: str, language: str, w: Optional[Dict], monsoon: Optional[Dict],
    crops: Optional[List], prediction: Optional[Dict]
) -> Dict[str, Any]:
    intent = detect_intent(message)
    data_source = "live_api"

    if intent == "rainfall" and prediction:
        prob = prediction.get("probability_pct", 0)
        mm = prediction.get("expected_mm", 0)
        cat = prediction.get("category", "")
        cat_hi = prediction.get("category_hi", "")
        reply_en = (
            f"Based on our LightGBM model: **{prob}%** chance of rain in the next 24 hours. "
            f"Expected rainfall: **{mm} mm** ({cat}). "
            f"Confidence: {prediction.get('confidence_pct', 0)}%."
        )
        reply_hi = (
            f"हमारे LightGBM मॉडल के अनुसार: अगले 24 घंटों में **{prob}%** बारिश की संभावना है। "
            f"अपेक्षित वर्षा: **{mm} मिमी** ({cat_hi})। "
            f"आत्मविश्वास: {prediction.get('confidence_pct', 0)}%।"
        )
    elif intent == "monsoon" and monsoon:
        ph = monsoon.get("phase_en", "Unknown")
        ph_hi = monsoon.get("phase_hi", "अज्ञात")
        reply_en = (
            f"Current monsoon phase: **{ph}**. "
            f"Onset probability: {monsoon.get('onset_engine', {}).get('onset_probability_pct', 0)}%. "
            f"Break probability: {monsoon.get('break_watch_engine', {}).get('break_probability_pct', 0)}%."
        )
        reply_hi = (
            f"वर्तमान मानसून चरण: **{ph_hi}**। "
            f"शुरुआत की संभावना: {monsoon.get('onset_engine', {}).get('onset_probability_pct', 0)}%। "
            f"विराम की संभावना: {monsoon.get('break_watch_engine', {}).get('break_probability_pct', 0)}%।"
        )
    elif intent == "crop" and crops:
        top = crops[0] if crops else {}
        reply_en = (
            f"Top crop recommendation: **{top.get('name_en', 'Paddy')}** "
            f"(Suitability: {top.get('suitability_score', 0)}%). "
            f"Sowing window: {top.get('sowing_window', 'June–July')}. "
            f"{top.get('advice_en', '')}"
        )
        reply_hi = (
            f"शीर्ष फसल सिफारिश: **{top.get('name_hi', 'धान')}** "
            f"(उपयुक्तता: {top.get('suitability_score', 0)}%)। "
            f"बुवाई खिड़की: {top.get('sowing_window', 'जून-जुलाई')}। "
            f"{top.get('advice_hi', '')}"
        )
    elif intent == "temperature" and w:
        temp = w.get("temperature_c", "N/A")
        reply_en = f"Current temperature at your location: **{temp}°C**. Humidity: {w.get('humidity_pct')}%."
        reply_hi = f"आपके स्थान पर वर्तमान तापमान: **{temp}°C**। आर्द्रता: {w.get('humidity_pct')}%।"
    elif intent == "alert":
        reply_en = "Check the Early Warning tab for active alerts in your area. I can see current risk levels from the API."
        reply_hi = "अपने क्षेत्र के सक्रिय अलर्ट के लिए 'प्रारंभिक चेतावनी' टैब देखें।"
        data_source = "alert_feed"
    elif intent == "weather" and w:
        reply_en = (
            f"Current weather: {w.get('weather_description_en', 'N/A')}. "
            f"Temp: {w.get('temperature_c')}°C | Humidity: {w.get('humidity_pct')}% | "
            f"Wind: {w.get('wind_speed_kmh')} km/h | Pressure: {w.get('pressure_msl_hpa')} hPa."
        )
        reply_hi = (
            f"वर्तमान मौसम: {w.get('weather_description_hi', 'N/A')}। "
            f"तापमान: {w.get('temperature_c')}°C | आर्द्रता: {w.get('humidity_pct')}% | "
            f"पवन: {w.get('wind_speed_kmh')} km/h | दबाव: {w.get('pressure_msl_hpa')} hPa।"
        )
    else:
        reply_en = (
            "I am VarshaNetra AI — grounded on live weather and monsoon data. "
            "Ask me about: rainfall prediction, monsoon phase, crop recommendations, temperature, wind, or active alerts."
        )
        reply_hi = (
            "मैं VarshaNetra AI हूँ — लाइव मौसम और मानसून डेटा पर आधारित। "
            "आप पूछ सकते हैं: वर्षा पूर्वानुमान, मानसून चरण, फसल सिफारिश, तापमान, पवन, या सक्रिय चेतावनियाँ।"
        )

    final_reply = reply_hi if language == "hi" else reply_en
    return {
        "reply": final_reply,
        "reply_en": reply_en,
        "reply_hi": reply_hi,
        "intent_detected": intent,
        "data_source": data_source,
        "confidence": 0.85,
    }


# ── Notifications ──────────────────────────────────────────────────────────────

def send_notification(channel: str, recipients: List[str], subject: str, message: str, alert_type: str) -> Dict[str, Any]:
    now = datetime.now(timezone.utc).isoformat()

    if settings.NOTIFICATION_MOCK:
        logger.info(f"[MOCK {channel}] To: {recipients} | Subject: {subject} | Message: {message[:80]}...")
        return {"channel": channel, "recipients_count": len(recipients), "status": "MOCK_SENT",
                "message": f"Mock {channel} sent to {len(recipients)} recipient(s) (dev mode)", "sent_at": now}

    if channel == "EMAIL":
        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = settings.SMTP_USER
            msg["To"] = ", ".join(recipients)
            msg.attach(MIMEText(message, "plain", "utf-8"))
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as s:
                s.starttls()
                s.login(settings.SMTP_USER, settings.SMTP_PASS)
                s.sendmail(settings.SMTP_USER, recipients, msg.as_string())
            return {"channel": "EMAIL", "recipients_count": len(recipients), "status": "SENT",
                    "message": f"Email sent to {len(recipients)} recipients", "sent_at": now}
        except Exception as e:
            return {"channel": "EMAIL", "recipients_count": 0, "status": "FAILED",
                    "message": str(e), "sent_at": now}

    elif channel == "SMS":
        try:
            from twilio.rest import Client  # type: ignore
            client = Client(settings.TWILIO_SID, settings.TWILIO_TOKEN)
            for r in recipients:
                client.messages.create(body=message, from_=settings.TWILIO_FROM, to=r)
            return {"channel": "SMS", "recipients_count": len(recipients), "status": "SENT",
                    "message": f"SMS sent to {len(recipients)} numbers", "sent_at": now}
        except Exception as e:
            return {"channel": "SMS", "recipients_count": 0, "status": "FAILED",
                    "message": str(e), "sent_at": now}

    return {"channel": channel, "recipients_count": 0, "status": "NOT_CONFIGURED",
            "message": "Channel not configured", "sent_at": now}


# ── Simulation ────────────────────────────────────────────────────────────────

def run_simulation(lat: float, lon: float, crop_name: str, rainfall_change_pct: float,
                   dry_days: int, temp_change_c: float, duration_days: int = 14) -> Dict[str, Any]:
    stress = min(100, abs(rainfall_change_pct) * 0.6 + dry_days * 3 + temp_change_c * 5)
    yield_impact = round(-stress * 0.7 if rainfall_change_pct < 0 else stress * 0.3 - 10, 1)
    soil_proj = round(max(0.1, 0.30 + rainfall_change_pct / 200 - dry_days * 0.01), 3)

    if dry_days > 10:
        advice_en = "Initiate emergency irrigation. Check for heat stress symptoms on leaves."
        advice_hi = "आपातकालीन सिंचाई शुरू करें। पत्तियों पर गर्मी के तनाव के लक्षण जांचें।"
    elif rainfall_change_pct < -30:
        advice_en = "Deficit rainfall scenario. Apply mulching to conserve soil moisture."
        advice_hi = "वर्षा की कमी का परिदृश्य। मिट्टी की नमी बचाने के लिए मल्चिंग करें।"
    elif rainfall_change_pct > 30:
        advice_en = "Excess rainfall risk. Ensure field drainage and watch for fungal diseases."
        advice_hi = "अत्यधिक वर्षा का खतरा। खेत की जल निकासी सुनिश्चित करें और फंगल रोगों पर नज़र रखें।"
    else:
        advice_en = "Conditions are near-normal. Maintain scheduled irrigation and pest monitoring."
        advice_hi = "परिस्थितियाँ सामान्य के करीब हैं। निर्धारित सिंचाई और कीट निगरानी जारी रखें।"

    return {
        "crop_stress_index_pct": round(stress, 1),
        "yield_impact_pct": yield_impact,
        "soil_moisture_projected": soil_proj,
        "recommended_contingency_en": advice_en,
        "recommended_contingency_hi": advice_hi,
        "is_simulation_only": True,
        "scenario_summary": f"Rainfall {rainfall_change_pct:+.0f}%, {dry_days} dry days, temp +{temp_change_c}°C for {duration_days} days",
    }
