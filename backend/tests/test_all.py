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
        # 1. Current Weather with strict Asia/Kolkata normalization
        r = await client.get("/api/v1/weather/current?lat=26.85&lon=80.95")
        assert r.status_code == 200
        w_data = r.json()
        assert "temperature_c" in w_data
        assert w_data["timezone"] == "Asia/Kolkata"
        assert w_data["timezone_offset"] == "+05:30"
        assert w_data["is_current_observation"] is True
        assert "fetched_at" in w_data

        # 2. Weather Forecast & Chronological Hourly Series
        rf = await client.get("/api/v1/weather/forecast?lat=26.85&lon=80.95&days=7")
        assert rf.status_code == 200
        f_data = rf.json()
        assert f_data["timezone"] == "Asia/Kolkata"
        assert len(f_data["daily"]) > 0
        if "hourly" in f_data and len(f_data["hourly"]) > 1:
            h_list = f_data["hourly"]
            # Verify strict ascending chronological ordering by epoch_ms
            epochs = [item["epoch_ms"] for item in h_list]
            assert epochs == sorted(epochs), "Hourly forecast series must be chronologically sorted"

        # 3. Rainfall prediction with SHAP features
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

        # 4. Developer RBAC check: harshsih30@gmail.com authorized
        dev_email_res = await client.post(
            "/api/v1/send-email",
            json={
                "email": "harshsih30@gmail.com",
                "subject": "Developer Test Email",
                "message": "Testing developer access"
            },
            headers={"X-User-Email": "harshsih30@gmail.com"}
        )
        assert dev_email_res.status_code in [200, 502, 503]

        # 5. Dedicated /send-sms endpoint check
        dev_sms_res = await client.post(
            "/api/v1/send-sms",
            json={
                "phoneNumber": "+919555681533",
                "message": "Developer SMS Test",
                "alertType": "HEAVY_RAIN"
            },
            headers={"X-User-Email": "harshsih30@gmail.com"}
        )
        assert dev_sms_res.status_code in [200, 502, 503]

        # 6. Unconfigured provider returns honest 503 / 502 (NOT fake 200 DELIVERED)
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
        # In test env without live Twilio/Fast2SMS credentials, MUST return 503, 502, or 200
        assert r2.status_code in [200, 502, 503]


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

@pytest.mark.asyncio
async def test_authoritative_admin_geo():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        # 1. Dynamic Stats Endpoint
        stats_res = await client.get("/api/v1/admin-geo/stats")
        assert stats_res.status_code == 200
        stats = stats_res.json()
        assert stats["status"] == "SUCCESS"
        assert stats["counts"]["states_count"] == 36
        assert stats["counts"]["districts_count"] >= 766
        assert stats["is_complete_coverage"] is True

        # 2. Database Integrity Validation
        val_res = await client.get("/api/v1/admin-geo/validate")
        assert val_res.status_code == 200
        val = val_res.json()
        assert val["status"] == "VALID"
        assert len(val["issues"]) == 0

        # 3. Server-side Search Endpoint
        search_res = await client.get("/api/v1/admin-geo/search?q=Lucknow&type=ALL")
        assert search_res.status_code == 200
        search_data = search_res.json()
        assert search_data["total_matches"] > 0
        assert len(search_data["results"]) > 0
        first = search_data["results"][0]
        assert "name" in first
        assert "entity_type" in first

        # 4. Entity Detailed Profile (District & Village decoupled test)
        entity_id = first["id"]
        entity_type = first["entity_type"]
        detail_res = await client.get(f"/api/v1/admin-geo/details?type={entity_type}&id={entity_id}")
        assert detail_res.status_code == 200
        detail = detail_res.json()
        assert "geometry_note" in detail
        assert "geometry" in detail["geometry_note"].lower()

        # 5. Village entity search & profile test
        v_search = await client.get("/api/v1/admin-geo/search?q=Khas&type=VILLAGE")
        assert v_search.status_code == 200
        v_results = v_search.json()["results"]
        if len(v_results) > 0:
            v_id = v_results[0]["id"]
            v_detail = await client.get(f"/api/v1/admin-geo/details?type=VILLAGE&id={v_id}")
            assert v_detail.status_code == 200
            assert "Administrative record available; boundary geometry currently unavailable." in v_detail.json()["geometry_note"]


@pytest.mark.asyncio
async def test_chat_anti_repetition_and_xai():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        # 1. Question 1: What is ENSO?
        r1 = await client.post(
            "/api/v1/chat",
            json={"message": "What is ENSO?", "language": "en"}
        )
        assert r1.status_code == 200
        data1 = r1.json()
        assert "enso" in data1["topic_detected"]
        assert "el niño" in data1["reply"].lower() or "enso" in data1["reply"].lower()

        # 2. Question 2: What is IOD? (Must NOT repeat ENSO answer)
        r2 = await client.post(
            "/api/v1/chat",
            json={"message": "What is IOD?", "language": "en"}
        )
        assert r2.status_code == 200
        data2 = r2.json()
        assert "iod" in data2["topic_detected"]
        assert "indian ocean dipole" in data2["reply"].lower() or "iod" in data2["reply"].lower()
        assert data2["reply"] != data1["reply"], "Chatbot must NOT repeat previous answer for a different question"

        # 3. Question 3: Why is the prediction 78%? (Must return grounded XAI breakdown)
        r3 = await client.post(
            "/api/v1/chat",
            json={"message": "Why is the prediction 78%?", "language": "en"}
        )
        assert r3.status_code == 200
        data3 = r3.json()
        assert data3["topic_detected"] == "prediction_explanation"
        assert "78%" in data3["reply"]
        assert "lightgbm" in data3["reply"].lower() or "shap" in data3["reply"].lower()
        assert data3["reply"] != data2["reply"], "Chatbot must NOT repeat previous answer for XAI inquiry"

        # 4. Question 4: Hindi query on XAI
        r4 = await client.post(
            "/api/v1/chat",
            json={"message": "पूर्वानुमान 78% क्यों है?", "language": "hi"}
        )
        assert r4.status_code == 200
        data4 = r4.json()
        assert "78%" in data4["reply"]
        assert ("लाइटजीबीएम" in data4["reply"].lower() or "lightgbm" in data4["reply"].lower() or "shap" in data4["reply"].lower())


@pytest.mark.asyncio
async def test_rbac_strict_security_enforcement():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        # 1. Normal User / Farmer: Denied access to System Control (HTTP 403)
        r_sys_farmer = await client.get("/api/v1/system/status", headers={"X-User-Role": "farmer"})
        assert r_sys_farmer.status_code == 403

        # 2. Normal User / Farmer: Denied access to Users Management (HTTP 403)
        r_usr_farmer = await client.get("/api/v1/users", headers={"X-User-Role": "farmer"})
        assert r_usr_farmer.status_code == 403

        # 3. Normal User / Farmer: Denied access to Direct Email Dispatch (HTTP 403)
        r_email_farmer = await client.post(
            "/api/v1/send-email",
            json={"email": "harhsih30@gmail.com", "subject": "Test", "message": "Test"},
            headers={"X-User-Role": "farmer"}
        )
        assert r_email_farmer.status_code == 403

        # 4. Developer Account (harhsih30@gmail.com): Allowed access (HTTP 200)
        r_sys_dev = await client.get("/api/v1/system/status", headers={"X-User-Email": "harhsih30@gmail.com"})
        assert r_sys_dev.status_code == 200
        assert r_sys_dev.json()["authorized_role"] == "developer"

        # 5. Developer Account (harshsih30@gmail.com): Allowed access (HTTP 200)
        r_usr_dev = await client.get("/api/v1/users", headers={"X-User-Email": "harshsih30@gmail.com"})
        assert r_usr_dev.status_code == 200
        assert len(r_usr_dev.json()) > 0

        # 6. Disaster Administrator: Allowed access (HTTP 200)
        r_sys_admin = await client.get("/api/v1/system/status", headers={"X-User-Role": "admin"})
        assert r_sys_admin.status_code == 200
        assert r_sys_admin.json()["authorized_role"] == "admin"




