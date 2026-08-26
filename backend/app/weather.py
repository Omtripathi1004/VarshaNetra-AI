"""
Open-Meteo weather adapter.
Both GPS and manual location inputs resolve to lat/lon first,
then hit the same Open-Meteo endpoints.
"""
from __future__ import annotations
import asyncio
import re
import time
from typing import Any, Dict, List, Optional, Tuple
import httpx
from .core.config import settings

_cache: Dict[str, Tuple[float, Any]] = {}


def _cache_get(key: str) -> Optional[Any]:
    if key in _cache:
        ts, val = _cache[key]
        if time.time() - ts < settings.WEATHER_CACHE_TTL:
            return val
    return None


def _cache_set(key: str, val: Any):
    _cache[key] = (time.time(), val)


WEATHER_CODES = {
    0: ("Clear sky", "साफ आसमान"),
    1: ("Mainly clear", "मुख्यतः साफ"),
    2: ("Partly cloudy", "आंशिक बादल"),
    3: ("Overcast", "बादलों से ढका"),
    45: ("Foggy", "कोहरा"),
    48: ("Icy fog", "पाला कोहरा"),
    51: ("Light drizzle", "हल्की बूंदाबांदी"),
    53: ("Moderate drizzle", "मध्यम बूंदाबांदी"),
    55: ("Dense drizzle", "घनी बूंदाबांदी"),
    61: ("Slight rain", "हल्की बारिश"),
    63: ("Moderate rain", "मध्यम बारिश"),
    65: ("Heavy rain", "भारी बारिश"),
    71: ("Slight snow", "हल्की बर्फबारी"),
    73: ("Moderate snow", "मध्यम बर्फबारी"),
    75: ("Heavy snow", "भारी बर्फबारी"),
    80: ("Slight rain showers", "हल्की फुहार"),
    81: ("Moderate rain showers", "मध्यम फुहार"),
    82: ("Violent rain showers", "भारी फुहार"),
    95: ("Thunderstorm", "आंधी-तूफान"),
    96: ("Thunderstorm with hail", "ओलावृष्टि"),
    99: ("Thunderstorm + heavy hail", "भारी ओलावृष्टि"),
}

# Reliable fallback coordinates dictionary for Indian states and prominent districts
INDIAN_COORDINATES = {
    # North
    "delhi": (28.6139, 77.2090),
    "delhi (nct)": (28.6139, 77.2090),
    "new delhi": (28.6139, 77.2090),
    "chandigarh": (30.7333, 76.7794),
    "lucknow": (26.8467, 80.9462),
    "kanpur": (26.4499, 80.3319),
    "varanasi": (25.3176, 82.9739),
    "prayagraj": (25.4358, 81.8463),
    "agra": (27.1767, 78.0081),
    "gorakhpur": (26.7606, 83.3732),
    "meerut": (28.9845, 77.7064),
    "bareilly": (28.3670, 79.4304),
    "ayodhya": (26.7922, 82.1998),
    "jaipur": (26.9124, 75.7873),
    "jodhpur": (26.2389, 73.0243),
    "kota": (25.2138, 75.8648),
    "bikaner": (28.0229, 73.3119),
    "udaipur": (24.5854, 73.7125),
    "dehradun": (30.3165, 78.0322),
    "haridwar": (29.9457, 78.1642),
    "shimla": (31.1048, 77.1734),
    "dharamshala": (32.2190, 76.3234),
    "srinagar": (34.0837, 74.7973),
    "jammu": (32.7266, 74.8570),
    "anantnag": (33.7311, 75.1552),
    "baramulla": (34.1980, 74.3636),
    "udhampur": (32.9255, 75.1416),
    "leh": (34.1526, 77.5771),
    "kargil": (34.5539, 76.1349),

    # Central
    "bhopal": (23.2599, 77.4126),
    "indore": (22.7196, 75.8577),
    "jabalpur": (23.1815, 79.9864),
    "gwalior": (26.2183, 78.1828),
    "nagpur": (21.1458, 79.0882),
    "raipur": (21.2514, 81.6296),
    "bilaspur": (22.0797, 82.1409),
    "durg": (21.1904, 81.2849),

    # East
    "kolkata": (22.5726, 88.3639),
    "howrah": (22.5958, 88.2636),
    "siliguri": (26.7271, 88.3953),
    "patna": (25.5941, 85.1376),
    "gaya": (24.7914, 85.0002),
    "muzaffarpur": (26.1209, 85.3647),
    "bhagalpur": (25.2425, 86.9842),
    "bhubaneswar": (20.2961, 85.8245),
    "cuttack": (20.4625, 85.8828),
    "puri": (19.8135, 85.8312),
    "ranchi": (23.3441, 85.3096),
    "jamshedpur": (22.8046, 86.2029),
    "dhanbad": (23.7957, 86.4304),

    # West
    "mumbai": (19.0760, 72.8777),
    "pune": (18.5204, 73.8567),
    "nashik": (19.9975, 73.7898),
    "aurangabad": (19.8762, 75.3433),
    "kolhapur": (16.7050, 74.2433),
    "solapur": (17.6599, 75.9064),
    "ahmedabad": (23.0225, 72.5714),
    "surat": (21.1702, 72.8311),
    "vadodara": (22.3072, 73.1812),
    "rajkot": (22.3039, 70.8022),
    "bhuj": (23.2420, 69.6669),
    "panaji": (15.4909, 73.8278),
    "margao": (15.2832, 73.9862),

    # South
    "bengaluru": (12.9716, 77.5946),
    "mysuru": (12.2958, 76.6394),
    "belagavi": (15.8497, 74.4977),
    "mangaluru": (12.9141, 74.8560),
    "hyderabad": (17.3850, 78.4867),
    "warangal": (17.9689, 79.5941),
    "chennai": (13.0827, 80.2707),
    "coimbatore": (11.0168, 76.9558),
    "madurai": (9.9252, 78.1198),
    "salem": (11.6643, 78.1460),
    "tiruchirappalli": (10.7905, 78.7047),
    "vijayawada": (16.5062, 80.6480),
    "visakhapatnam": (17.6868, 83.2185),
    "guntur": (16.3067, 80.4365),
    "tirupati": (13.6288, 79.4192),
    "kochi": (9.9312, 76.2673),
    "thiruvananthapuram": (8.5241, 76.9366),
    "kozhikode": (11.2588, 75.7804),
    "wayanad": (11.6854, 76.1320),

    # Northeast
    "guwahati": (26.1445, 91.7362),
    "silchar": (24.8333, 92.7789),
    "dibrugarh": (27.4728, 94.9120),
    "jorhat": (26.7509, 94.2037),
    "shillong": (25.5788, 91.8933),
    "tura": (25.5141, 90.2033),
    "cherrapunji": (25.2677, 91.7323),
    "agartala": (23.8315, 91.2868),
    "imphal": (24.8170, 93.9368),
    "aizawl": (23.7271, 92.7176),
    "kohima": (25.6751, 94.1086),
    "dimapur": (25.9068, 93.7273),
    "itanagar": (27.0844, 93.6053),
    "pasighat": (28.0667, 95.3333),
    "tawang": (27.5861, 91.8594),
    "gangtok": (27.3389, 88.6065),

    # UTs & Islands
    "port blair": (11.6234, 92.7265),
    "diglipur": (13.2667, 92.9833),
    "kavaratti": (10.5667, 72.6417),
    "agatti": (10.8533, 72.1817),
    "puducherry": (11.9416, 79.8083),

    # State capitals & generic state centers
    "uttar pradesh": (26.8467, 80.9462),
    "maharashtra": (19.7515, 75.7139),
    "bihar": (25.0961, 85.3131),
    "punjab": (31.1471, 75.3412),
    "haryana": (29.0588, 76.0856),
    "gujarat": (22.2587, 71.1924),
    "rajasthan": (27.0238, 74.2179),
    "madhya pradesh": (22.9734, 78.6569),
    "west bengal": (22.9868, 87.8550),
    "tamil nadu": (11.1271, 78.6569),
    "karnataka": (15.3173, 75.7139),
    "kerala": (10.8505, 76.2711),
    "andhra pradesh": (15.9129, 79.7400),
    "telangana": (18.1124, 79.0193),
    "odisha": (20.9517, 85.0985),
    "assam": (26.2006, 92.9376),
    "chhattisgarh": (21.2787, 81.8661),
    "jharkhand": (23.6102, 85.2799),
    "uttarakhand": (30.0668, 79.0193),
    "himachal pradesh": (31.1048, 77.1734),
    "jammu and kashmir": (33.7782, 76.5762),
    "ladakh": (34.1526, 77.5771),
    "meghalaya": (25.4670, 91.3662),
    "tripura": (23.9408, 91.9882),
    "manipur": (24.6637, 93.9063),
    "mizoram": (23.1645, 92.9376),
    "nagaland": (26.1584, 94.5624),
    "arunachal pradesh": (28.2180, 94.7278),
    "sikkim": (27.5330, 88.5122),
    "goa": (15.2993, 74.1240),
    "andaman and nicobar": (11.7401, 92.6586),
    "lakshadweep": (10.5667, 72.6417),
}



def _clean_token(t: str) -> str:
    """Clean parentheses and noise words from location queries."""
    if not t:
        return ""
    # Remove text in parentheses: e.g. "Krishna (Vijayawada)" -> "Vijayawada" or "Krishna"
    m = re.search(r"\((.*?)\)", t)
    alt = m.group(1) if m else ""
    cleaned = re.sub(r"\(.*?\)", "", t).strip()
    cleaned = re.sub(r"\b(Gram|Village|Panchayat|Block|Town|City|HQ|Gramin|Baswant)\b", "", cleaned, flags=re.IGNORECASE).strip()
    return cleaned or alt or t


async def geocode_place(name: str, state: str = "", district: str = "") -> Optional[Dict[str, Any]]:
    """Resolve a city/village/district name to lat/lon via smart fallback + Open-Meteo geocoding."""
    # 1. Clean place names
    c_name = _clean_token(name)
    c_dist = _clean_token(district)
    c_state = _clean_token(state)

    # 2. Check local fast coordinates dictionary first
    for candidate in [c_name, c_dist, c_state]:
        cand_lower = candidate.lower()
        if cand_lower in INDIAN_COORDINATES:
            lat, lon = INDIAN_COORDINATES[cand_lower]
            return {
                "latitude": lat,
                "longitude": lon,
                "name": candidate,
                "state": state or candidate,
                "district": district or candidate,
                "country": "India",
            }

    # 3. Hit Open-Meteo Geocoding API with clean single terms
    search_queries = [
        c_name,
        c_dist,
        c_state,
        f"{c_name} {c_state}".strip(),
    ]
    
    async with httpx.AsyncClient(timeout=8) as client:
        for q in filter(None, search_queries):
            key = f"geo:{q.lower()}"
            cached = _cache_get(key)
            if cached:
                return cached

            try:
                r = await client.get(
                    settings.OPEN_METEO_GEO_URL,
                    params={"name": q, "count": 3, "language": "en", "format": "json"}
                )
                data = r.json()
                results = data.get("results", [])
                if results:
                    # Prefer Indian results
                    in_result = next((x for x in results if x.get("country") == "India"), results[0])
                    out = {
                        "latitude": in_result["latitude"],
                        "longitude": in_result["longitude"],
                        "name": in_result.get("name", name),
                        "state": in_result.get("admin1", state),
                        "district": in_result.get("admin2", district),
                        "country": in_result.get("country", "India"),
                    }
                    _cache_set(key, out)
                    return out
            except Exception:
                continue

    # 4. Ultimate fallback to central India / state capital if not found
    return {
        "latitude": 26.8467,
        "longitude": 80.9462,
        "name": name or "Lucknow",
        "state": state or "Uttar Pradesh",
        "district": district or "Lucknow",
        "country": "India",
    }


from datetime import datetime, timezone, timedelta

# Explicit Indian Standard Time (Asia/Kolkata UTC+05:30)
IST_TZ = timezone(timedelta(hours=5, minutes=30))


def get_current_ist_datetime() -> datetime:
    """Returns current datetime strictly in Asia/Kolkata (IST, UTC+05:30)."""
    return datetime.now(IST_TZ)


def parse_to_ist_datetime(ts_str: Optional[str]) -> Optional[datetime]:
    """Parses ISO timestamp string and converts/normalizes strictly to Asia/Kolkata IST."""
    if not ts_str:
        return None
    try:
        cleaned = ts_str.replace("Z", "+00:00")
        dt = datetime.fromisoformat(cleaned)
        if dt.tzinfo is None:
            # When Open-Meteo is called with timezone=Asia/Kolkata, naive times are local IST
            return dt.replace(tzinfo=IST_TZ)
        return dt.astimezone(IST_TZ)
    except Exception:
        return None


def find_closest_observation_index(timestamps: List[str], target_ist: datetime) -> int:
    """
    Finds the index of the hourly forecast interval closest to current IST time.
    DO NOT blindly use forecast[0] or midnight index.
    """
    if not timestamps:
        return 0
    best_idx = 0
    min_delta = float("inf")
    for idx, ts in enumerate(timestamps):
        dt = parse_to_ist_datetime(ts)
        if dt:
            delta = abs((dt - target_ist).total_seconds())
            if delta < min_delta:
                min_delta = delta
                best_idx = idx
    return best_idx


async def fetch_current_weather(lat: float, lon: float, location_label: str = "") -> Dict[str, Any]:
    """
    Fetch live current weather from Open-Meteo with Asia/Kolkata timezone normalization.
    Flow:
    1. Weather API request with timezone=Asia/Kolkata
    2. Normalize timestamps
    3. Convert timestamps to Asia/Kolkata (UTC+05:30)
    4. Compare with current IST
    5. Select current observation (or closest valid forecast interval)
    """
    key = f"current:{round(lat,3)}:{round(lon,3)}"
    cached = _cache_get(key)
    if cached:
        return cached

    current_ist = get_current_ist_datetime()

    params = {
        "latitude": lat,
        "longitude": lon,
        "current": [
            "temperature_2m", "relative_humidity_2m", "precipitation",
            "rain", "weather_code", "cloud_cover", "pressure_msl",
            "surface_pressure", "wind_speed_10m", "wind_direction_10m",
            "wind_gusts_10m",
        ],
        "hourly": [
            "temperature_2m", "relative_humidity_2m", "precipitation",
            "rain", "weather_code", "cloud_cover", "pressure_msl",
            "wind_speed_10m", "wind_direction_10m", "soil_moisture_0_to_1cm"
        ],
        "timezone": "Asia/Kolkata",
        "forecast_days": 2,
    }

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.get(settings.OPEN_METEO_BASE_URL, params=params)
            raw = r.json()
    except Exception:
        return _mock_current(lat, lon, location_label, current_ist)

    cur = raw.get("current", {})
    hourly = raw.get("hourly", {})
    hourly_times = hourly.get("time", [])

    # Find the hourly index closest to the current IST time (NEVER blindly use index 0 / midnight!)
    closest_idx = find_closest_observation_index(hourly_times, current_ist)

    # 1. Determine Current Temperature
    temp_val = cur.get("temperature_2m")
    if temp_val is None:
        hourly_temps = hourly.get("temperature_2m", [])
        temp_val = hourly_temps[closest_idx] if closest_idx < len(hourly_temps) else 26.5

    # 2. Determine Humidity
    humidity_val = cur.get("relative_humidity_2m")
    if humidity_val is None:
        hourly_hum = hourly.get("relative_humidity_2m", [])
        humidity_val = hourly_hum[closest_idx] if closest_idx < len(hourly_hum) else 75

    # 3. Determine Precipitation & Rain
    precip_val = cur.get("precipitation")
    if precip_val is None:
        hourly_precip = hourly.get("precipitation", [])
        precip_val = hourly_precip[closest_idx] if closest_idx < len(hourly_precip) else 0.0

    rain_val = cur.get("rain", precip_val)

    # 4. Determine Cloud Cover & Pressure
    cloud_val = cur.get("cloud_cover")
    if cloud_val is None:
        hourly_clouds = hourly.get("cloud_cover", [])
        cloud_val = hourly_clouds[closest_idx] if closest_idx < len(hourly_clouds) else 45

    pressure_val = cur.get("pressure_msl") or cur.get("surface_pressure", 1008.0)

    # 5. Determine Wind Speed & Direction
    wind_speed = cur.get("wind_speed_10m")
    if wind_speed is None:
        hourly_wind = hourly.get("wind_speed_10m", [])
        wind_speed = hourly_wind[closest_idx] if closest_idx < len(hourly_wind) else 12.0

    wind_dir = cur.get("wind_direction_10m", 210)

    # 6. Determine Soil Moisture at Current IST time (matching current index, not midnight)
    soil_list = hourly.get("soil_moisture_0_to_1cm", [])
    soil_val = soil_list[closest_idx] if closest_idx < len(soil_list) else 0.32

    # 7. Weather Code & Localized Descriptions
    wcode = cur.get("weather_code")
    if wcode is None:
        hourly_wc = hourly.get("weather_code", [])
        wcode = hourly_wc[closest_idx] if closest_idx < len(hourly_wc) else 2

    desc_en, desc_hi = WEATHER_CODES.get(wcode, ("Partly cloudy", "आंशिक बादल"))

    # Timestamp normalization
    obs_time_raw = cur.get("time") or (hourly_times[closest_idx] if closest_idx < len(hourly_times) else current_ist.isoformat())
    obs_dt = parse_to_ist_datetime(obs_time_raw) or current_ist

    result = {
        "latitude": lat,
        "longitude": lon,
        "location_label": location_label or f"{lat:.2f}°N, {lon:.2f}°E",
        "temperature_c": round(float(temp_val), 1) if temp_val is not None else 26.5,
        "humidity_pct": int(humidity_val) if humidity_val is not None else 75,
        "precipitation_mm": round(float(precip_val), 1) if precip_val is not None else 0.0,
        "rain_mm": round(float(rain_val), 1) if rain_val is not None else 0.0,
        "cloud_cover_pct": int(cloud_val) if cloud_val is not None else 45,
        "pressure_msl_hpa": round(float(pressure_val), 1) if pressure_val is not None else 1008.0,
        "wind_speed_kmh": round(float(wind_speed), 1) if wind_speed is not None else 12.0,
        "wind_direction_deg": int(wind_dir) if wind_dir is not None else 210,
        "soil_moisture_0_1cm": round(float(soil_val), 3) if soil_val is not None else 0.32,
        "weather_code": int(wcode) if wcode is not None else 2,
        "weather_description_en": desc_en,
        "weather_description_hi": desc_hi,
        "timezone": "Asia/Kolkata",
        "timezone_offset": "+05:30",
        "fetched_at": obs_dt.isoformat(),
        "is_current_observation": True,
        "status": "LIVE"
    }
    _cache_set(key, result)
    return result


async def fetch_forecast(lat: float, lon: float, days: int = 7, location_label: str = "") -> Dict[str, Any]:
    """
    Fetch multi-day daily forecast & chronological hourly weather series in Asia/Kolkata timezone.
    """
    key = f"forecast:{round(lat,3)}:{round(lon,3)}:{days}"
    cached = _cache_get(key)
    if cached:
        return cached

    current_ist = get_current_ist_datetime()
    fetch_days = min(days, 16)

    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": [
            "temperature_2m_max", "temperature_2m_min", "precipitation_sum",
            "rain_sum", "precipitation_probability_max", "wind_speed_10m_max",
            "wind_gusts_10m_max", "weather_code",
        ],
        "hourly": [
            "temperature_2m", "relative_humidity_2m", "precipitation_probability",
            "precipitation", "rain", "weather_code", "cloud_cover",
            "wind_speed_10m", "soil_moisture_0_to_1cm",
        ],
        "timezone": "Asia/Kolkata",
        "forecast_days": fetch_days,
    }

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.get(settings.OPEN_METEO_BASE_URL, params=params)
            raw = r.json()
    except Exception:
        raw = {}

    daily = raw.get("daily", {})
    dates = daily.get("time", [])
    t_max = daily.get("temperature_2m_max", [])
    t_min = daily.get("temperature_2m_min", [])
    rain = daily.get("precipitation_sum", [])
    wcodes = daily.get("weather_code", [])
    prob = daily.get("precipitation_probability_max", [])

    daily_list = []
    for i, d in enumerate(dates):
        wc = wcodes[i] if (i < len(wcodes) and wcodes[i] is not None) else 0
        desc_en, desc_hi = WEATHER_CODES.get(wc, ("Partly cloudy", "आंशिक बादल"))
        r_val = float(rain[i]) if (i < len(rain) and rain[i] is not None) else 0.0
        mx_val = float(t_max[i]) if (i < len(t_max) and t_max[i] is not None) else 32.0
        mn_val = float(t_min[i]) if (i < len(t_min) and t_min[i] is not None) else 24.0
        pr_val = int(prob[i]) if (i < len(prob) and prob[i] is not None) else 30
        
        daily_list.append({
            "date": d,
            "temp_max_c": round(mx_val, 1),
            "temp_min_c": round(mn_val, 1),
            "rainfall_mm": round(r_val, 1),
            "rain_probability_pct": pr_val,
            "weather_code": wc,
            "description_en": desc_en,
            "description_hi": desc_hi,
            "sowing_suitability_score": round(max(40.0, min(95.0, 85.0 - r_val * 1.5)), 0),
        })

    # Chronologically parse and sort hourly forecasts
    hourly = raw.get("hourly", {})
    h_times = hourly.get("time", [])
    h_temps = hourly.get("temperature_2m", [])
    h_hum = hourly.get("relative_humidity_2m", [])
    h_prob = hourly.get("precipitation_probability", [])
    h_rain = hourly.get("precipitation", [])
    h_wc = hourly.get("weather_code", [])
    h_soil = hourly.get("soil_moisture_0_to_1cm", [])

    hourly_list = []
    for h_i, h_t in enumerate(h_times):
        dt = parse_to_ist_datetime(h_t)
        if not dt:
            continue
        h_code = h_wc[h_i] if (h_i < len(h_wc) and h_wc[h_i] is not None) else 2
        h_desc_en, h_desc_hi = WEATHER_CODES.get(h_code, ("Partly cloudy", "आंशिक बादल"))
        
        hourly_list.append({
            "iso_time": dt.isoformat(),
            "epoch_ms": int(dt.timestamp() * 1000),
            "hour": dt.hour,
            "display_time_ist": dt.strftime("%I:%M %p").lstrip("0"),
            "temperature_c": round(float(h_temps[h_i]), 1) if (h_i < len(h_temps) and h_temps[h_i] is not None) else 26.0,
            "humidity_pct": int(h_hum[h_i]) if (h_i < len(h_hum) and h_hum[h_i] is not None) else 75,
            "rain_probability_pct": int(h_prob[h_i]) if (h_i < len(h_prob) and h_prob[h_i] is not None) else 20,
            "rainfall_mm": round(float(h_rain[h_i]), 1) if (h_i < len(h_rain) and h_rain[h_i] is not None) else 0.0,
            "soil_moisture": round(float(h_soil[h_i]), 3) if (h_i < len(h_soil) and h_soil[h_i] is not None) else 0.32,
            "weather_code": h_code,
            "description_en": h_desc_en,
            "description_hi": h_desc_hi,
        })

    # Sort strictly by timestamp (epoch milliseconds)
    hourly_list.sort(key=lambda x: x["epoch_ms"])

    result = {
        "latitude": lat,
        "longitude": lon,
        "location_label": location_label,
        "timezone": "Asia/Kolkata",
        "timezone_offset": "+05:30",
        "forecast_days": len(daily_list),
        "daily": daily_list,
        "hourly": hourly_list[:48],
    }
    _cache_set(key, result)
    return result


def _mock_current(lat: float, lon: float, label: str, ist_dt: Optional[datetime] = None) -> Dict[str, Any]:
    """Generates realistic diurnal IST-aligned current weather when network is offline."""
    now_ist = ist_dt or get_current_ist_datetime()
    hr = now_ist.hour

    # Realistic diurnal temperature pattern in India (min around 5 AM, max around 2 PM)
    import math
    temp_base = 25.5 + math.sin((hr - 8) * math.pi / 12) * 5.0
    humidity_base = 82 - math.sin((hr - 8) * math.pi / 12) * 20.0

    return {
        "latitude": lat,
        "longitude": lon,
        "location_label": label or f"{lat:.2f}°N, {lon:.2f}°E",
        "temperature_c": round(temp_base, 1),
        "humidity_pct": int(humidity_base),
        "precipitation_mm": 1.2 if 14 <= hr <= 20 else 0.0,
        "rain_mm": 1.2 if 14 <= hr <= 20 else 0.0,
        "cloud_cover_pct": 60,
        "pressure_msl_hpa": 1006.5,
        "wind_speed_kmh": 12.0,
        "wind_direction_deg": 210,
        "soil_moisture_0_1cm": 0.34,
        "weather_code": 61 if 14 <= hr <= 20 else 2,
        "weather_description_en": "Slight rain" if 14 <= hr <= 20 else "Partly cloudy",
        "weather_description_hi": "हल्की बारिश" if 14 <= hr <= 20 else "आंशिक बादल",
        "timezone": "Asia/Kolkata",
        "timezone_offset": "+05:30",
        "fetched_at": now_ist.isoformat(),
        "is_current_observation": True,
        "status": "FALLBACK"
    }

