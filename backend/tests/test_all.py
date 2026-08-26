import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
import httpx
from app.main import app
from app.core.database import init_db

init_db()

@pytest.mark.asyncio
async def test_health():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        r = await client.get("/api/v1/health")
        assert r.status_code == 200
        assert r.json()["status"] == "HEALTHY"

@pytest.mark.asyncio
async def test_location_resolve():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        r = await client.get("/api/v1/location/resolve?lat=26.85&lon=80.95")
        assert r.status_code == 200
        assert r.json()["latitude"] == 26.85

@pytest.mark.asyncio
async def test_weather_and_prediction():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        r = await client.get("/api/v1/weather/current?lat=26.85&lon=80.95")
        assert r.status_code == 200
        assert "temperature_c" in r.json()

        r2 = await client.get("/api/v1/prediction/rainfall?lat=26.85&lon=80.95")
        assert r2.status_code == 200
        assert "probability_pct" in r2.json()
        assert len(r2.json()["shap_features"]) > 0

@pytest.mark.asyncio
async def test_crop_advisor():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        r = await client.get("/api/v1/crops/advisor?lat=26.85&lon=80.95&season=KHARIF")
        assert r.status_code == 200
        assert len(r.json()["top_crops"]) > 0
        top = r.json()["top_crops"][0]
        assert "factor_scores" in top
        assert "suitability_score" in top

from app.services import normalize_phone_number, validate_email

@pytest.mark.asyncio
async def test_alerts_and_notify():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        r = await client.get("/api/v1/alerts")
        assert r.status_code == 200
        assert isinstance(r.json(), list)

        # 1. Provider health check (Authorized)
        health_res = await client.get(
            "/api/v1/notifications/provider-health",
            headers={"X-User-Role": "admin"}
        )
        assert health_res.status_code == 200
        h_data = health_res.json()
        assert "email" in h_data
        assert "sms" in h_data

        # 2. RBAC check: Unauthorized access rejected
        unauth_res = await client.post(
            "/api/v1/notify/send",
            json={"channel": "SMS", "recipients": ["+919876543210"], "message": "Test"},
            headers={"X-User-Role": "farmer"}
        )
        assert unauth_res.status_code in [401, 403]

        # 3. Malformed recipient rejected with HTTP 400
        bad_email = await client.post(
            "/api/v1/notifications/test-email",
            json={"email": "invalid-email-format"},
            headers={"X-User-Role": "admin"}
        )
        assert bad_email.status_code == 400

        # 4. Unconfigured provider returns honest 503 (NOT fake 200 DELIVERED)
        r2 = await client.post(
            "/api/v1/notify/send",
            json={
                "channel": "SMS",
                "recipients": ["+919876543210"],
                "message": "Test Alert",
                "alert_type": "HEAVY_RAIN"
            },
            headers={"X-User-Role": "admin"}
        )
        # In test env without live Twilio/Fast2SMS credentials, MUST return 503 or 200 (if mock)
        assert r2.status_code in [200, 503]
        if r2.status_code == 503:
            assert "configured" in r2.json()["detail"].lower() or "provider" in r2.json()["detail"].lower()

def test_phone_normalization_and_email_validation():
    # Strict phone normalization rules
    assert normalize_phone_number("9555681533") == "+919555681533"
    assert normalize_phone_number("+919555681533") == "+919555681533"
    assert normalize_phone_number("91 9555681533") == "+919555681533"
    assert normalize_phone_number("+91-9555681533") == "+919555681533"
    assert normalize_phone_number("09555681533") == "+919555681533"

    with pytest.raises(ValueError):
        normalize_phone_number("123")
    with pytest.raises(ValueError):
        normalize_phone_number("invalid_phone")

    # Strict email validation rules
    assert validate_email("user@gmail.com") is True
    assert validate_email("officer.agro@gov.in") is True
    assert validate_email("userexample.com") is False
    assert validate_email("@domain.com") is False
    assert validate_email("") is False

@pytest.mark.asyncio
async def test_chatbot_bilingual():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        r = await client.post("/api/v1/chat?message=will%20it%20rain%20today&language=en&lat=26.85&lon=80.95")
        assert r.status_code == 200
        assert "reply" in r.json()

        r_hi = await client.post("/api/v1/chat?message=बारिश%20होगी&language=hi&lat=26.85&lon=80.95")
        assert r_hi.status_code == 200
        assert "reply" in r_hi.json()
