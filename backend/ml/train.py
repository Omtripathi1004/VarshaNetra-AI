"""
LightGBM Training Script
========================
Fetches 2 years of hourly weather data from Open-Meteo Archive API
for multiple Indian locations, trains LightGBM classifier + regressor,
and saves model.pkl + explainer.pkl.

Run: python ml/train.py  (called automatically from run.py if model.pkl missing)
"""
import os
import sys
import pickle
import asyncio
import random
from datetime import date, timedelta

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

import numpy as np
import pandas as pd
import httpx

# Try to import LightGBM
try:
    import lightgbm as lgb
    HAS_LGBM = True
except ImportError:
    HAS_LGBM = False
    print("[WARN] lightgbm not installed. Run: pip install lightgbm")

try:
    import shap
    HAS_SHAP = True
except ImportError:
    HAS_SHAP = False

# Try sklearn for preprocessing
try:
    from sklearn.pipeline import Pipeline
    from sklearn.preprocessing import StandardScaler
    HAS_SKLEARN = True
except ImportError:
    HAS_SKLEARN = False

OUT_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(OUT_DIR, "model.pkl")
EXPLAINER_PATH = os.path.join(OUT_DIR, "explainer.pkl")

# Indian training locations (diverse climate zones)
TRAIN_LOCATIONS = [
    (26.85, 80.95, "Lucknow"),
    (25.32, 83.01, "Varanasi"),
    (18.52, 73.86, "Pune"),
    (25.60, 85.12, "Patna"),
    (22.57, 88.36, "Kolkata"),
    (13.08, 80.27, "Chennai"),
    (23.22, 77.44, "Bhopal"),
    (17.38, 78.49, "Hyderabad"),
]

ARCHIVE_URL = "https://archive-api.open-meteo.com/v1/archive"
FEATURE_COLS = [
    "temperature_2m", "relative_humidity_2m", "cloud_cover",
    "pressure_msl", "wind_speed_10m", "soil_moisture_0_to_1cm",
    "hour", "doy",
]


async def fetch_location_data(lat: float, lon: float, label: str, client: httpx.AsyncClient) -> pd.DataFrame:
    today = date.today()
    end = (today - timedelta(days=1)).isoformat()
    start = (today - timedelta(days=730)).isoformat()   # 2 years back

    print(f"  Fetching {label} ({lat},{lon}) from {start} to {end}...")
    try:
        r = await client.get(ARCHIVE_URL, params={
            "latitude": lat, "longitude": lon,
            "start_date": start, "end_date": end,
            "hourly": [
                "temperature_2m", "relative_humidity_2m", "precipitation",
                "cloud_cover", "pressure_msl", "wind_speed_10m",
                "soil_moisture_0_to_1cm",
            ],
            "timezone": "Asia/Kolkata",
        }, timeout=60)
        raw = r.json()
    except Exception as e:
        print(f"  [WARN] Failed to fetch {label}: {e}")
        return pd.DataFrame()

    h = raw.get("hourly", {})
    times = h.get("time", [])
    if not times:
        return pd.DataFrame()

    df = pd.DataFrame({
        "time": pd.to_datetime(times),
        "temperature_2m": h.get("temperature_2m", [np.nan] * len(times)),
        "relative_humidity_2m": h.get("relative_humidity_2m", [np.nan] * len(times)),
        "precipitation": h.get("precipitation", [0.0] * len(times)),
        "cloud_cover": h.get("cloud_cover", [np.nan] * len(times)),
        "pressure_msl": h.get("pressure_msl", [np.nan] * len(times)),
        "wind_speed_10m": h.get("wind_speed_10m", [np.nan] * len(times)),
        "soil_moisture_0_to_1cm": h.get("soil_moisture_0_to_1cm", [np.nan] * len(times)),
    })

    df["hour"] = df["time"].dt.hour
    df["doy"] = df["time"].dt.day_of_year
    df["label"] = (df["precipitation"] >= 2.5).astype(int)
    df["rain_mm"] = df["precipitation"].clip(lower=0)
    df["location"] = label
    return df


async def collect_all_data() -> pd.DataFrame:
    print("[ML] Collecting training data from Open-Meteo Archive...")
    dfs = []
    async with httpx.AsyncClient() as client:
        tasks = [fetch_location_data(lat, lon, label, client) for lat, lon, label in TRAIN_LOCATIONS]
        results = await asyncio.gather(*tasks)
        dfs = [r for r in results if not r.empty]

    if not dfs:
        print("[ML] No data fetched — generating synthetic fallback dataset...")
        return _generate_synthetic()

    df = pd.concat(dfs, ignore_index=True)
    print(f"[ML] Total samples collected: {len(df):,}")
    return df


def _generate_synthetic(n: int = 20000) -> pd.DataFrame:
    """Fallback synthetic dataset if API fetch fails."""
    np.random.seed(42)
    temp = np.random.normal(28, 5, n)
    hum = np.random.uniform(30, 95, n)
    cloud = np.random.uniform(0, 100, n)
    pres = np.random.normal(1010, 5, n)
    wind = np.random.uniform(0, 40, n)
    soil = np.random.uniform(0.1, 0.45, n)
    hour = np.random.randint(0, 24, n)
    doy = np.random.randint(1, 366, n)

    label = ((hum > 70) & (cloud > 60) & (pres < 1012)).astype(int)
    rain = np.where(label == 1, np.random.exponential(10, n), 0)

    return pd.DataFrame({
        "temperature_2m": temp, "relative_humidity_2m": hum,
        "precipitation": rain, "cloud_cover": cloud,
        "pressure_msl": pres, "wind_speed_10m": wind,
        "soil_moisture_0_to_1cm": soil,
        "hour": hour, "doy": doy,
        "label": label, "rain_mm": rain,
    })


def train_model(df: pd.DataFrame):
    print("[ML] Training LightGBM model...")
    # Fill missing values with reasonable defaults if Open-Meteo archive has NaNs for soil_moisture etc.
    df["temperature_2m"] = df["temperature_2m"].fillna(28.0)
    df["relative_humidity_2m"] = df["relative_humidity_2m"].fillna(70.0)
    df["cloud_cover"] = df["cloud_cover"].fillna(50.0)
    df["pressure_msl"] = df["pressure_msl"].fillna(1008.0)
    df["wind_speed_10m"] = df["wind_speed_10m"].fillna(12.0)
    df["soil_moisture_0_to_1cm"] = df["soil_moisture_0_to_1cm"].fillna(0.28)
    df["precipitation"] = df["precipitation"].fillna(0.0)
    df["label"] = (df["precipitation"] >= 2.5).astype(int)
    df["rain_mm"] = df["precipitation"].clip(lower=0)

    X = df[FEATURE_COLS].values
    y_clf = df["label"].values
    y_reg = df["rain_mm"].clip(0).values

    if not HAS_LGBM:
        print("[ML] LightGBM not available — using sklearn RandomForest fallback")
        from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
        clf = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
        reg = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
    else:
        clf = lgb.LGBMClassifier(
            n_estimators=300, learning_rate=0.05, max_depth=6,
            num_leaves=31, random_state=42, n_jobs=-1, verbose=-1,
        )
        reg = lgb.LGBMRegressor(
            n_estimators=300, learning_rate=0.05, max_depth=6,
            num_leaves=31, random_state=42, n_jobs=-1, verbose=-1,
        )

    clf.fit(X, y_clf)
    reg.fit(X, y_reg)

    # Quick accuracy check
    y_pred = clf.predict(X[:1000])
    acc = (y_pred == y_clf[:1000]).mean()
    print(f"[ML] Training accuracy (sample): {acc:.3f}")
    print(f"[ML] Class distribution — Rain: {y_clf.mean():.2%}, No-Rain: {1 - y_clf.mean():.2%}")

    model = (clf, reg)

    # Save model
    os.makedirs(OUT_DIR, exist_ok=True)
    with open(MODEL_PATH, "wb") as f:
        pickle.dump(model, f)
    print(f"[ML] Model saved -> {MODEL_PATH}")

    # SHAP explainer
    if HAS_SHAP and HAS_LGBM:
        try:
            explainer = shap.TreeExplainer(clf)
            with open(EXPLAINER_PATH, "wb") as f:
                pickle.dump(explainer, f)
            print(f"[ML] SHAP explainer saved -> {EXPLAINER_PATH}")
        except Exception as e:
            print(f"[ML] SHAP save failed: {e}")
    else:
        print("[ML] SHAP skipped (lightgbm or shap not installed)")


def main():
    if os.path.exists(MODEL_PATH):
        print(f"[ML] Model already exists at {MODEL_PATH}. Skipping training.")
        print("[ML] Delete model.pkl to retrain.")
        return

    df = asyncio.run(collect_all_data())
    train_model(df)
    print("[ML] Training complete.")


if __name__ == "__main__":
    main()
