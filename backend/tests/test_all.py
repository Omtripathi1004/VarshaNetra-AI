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

@pytest.mark.asyncio
async def test_alerts_and_notify():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        r = await client.get("/api/v1/alerts")
        assert r.status_code == 200
        assert isinstance(r.json(), list)

        # Test notification sending
        r2 = await client.post(
            "/api/v1/notify/send",
            json={
                "channel": "SMS",
                "recipients": ["+919876543210"],
                "message": "Test Alert",
                "alert_type": "HEAVY_RAIN"
            }
        )
        assert r2.status_code == 200
        assert "status" in r2.json()

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
