"""
VarshaNetra AI Endpoint & Connection Verification
"""
import sys
import os

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)
backend_dir = os.path.join(root_dir, "backend")
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi.testclient import TestClient
from backend.app.main import app

def run_tests():
    print("Testing VarshaNetra AI Backend & APIs...")
    client = TestClient(app)

    # 1. Health
    r = client.get("/")
    assert r.status_code == 200, f"Root failed: {r.status_code}"
    print("  [OK] Root & Health Check:", r.json()["name"])

    # 2. Weather Current
    r = client.get("/api/v1/weather/current?lat=26.85&lon=80.95")
    assert r.status_code == 200, f"Weather failed: {r.status_code}"
    print("  [OK] Live Weather:", r.json().get("temperature_c"), "°C")

    # 3. Forecast
    r = client.get("/api/v1/weather/forecast?lat=26.85&lon=80.95&days=7")
    assert r.status_code == 200
    print("  [OK] 7-Day Forecast Days:", len(r.json().get("daily", [])))

    # 4. Chat endpoint
    r = client.post("/api/v1/chat/message", json={"message": "What is the rainfall forecast for today?", "language": "en", "lat": 26.85, "lon": 80.95})
    assert r.status_code == 200
    print("  [OK] Chatbot Prompt #1:", r.json().get("intent_detected"))

    r = client.post("/api/v1/chat/message", json={"message": "How do I subscribe to emergency SMS alerts?", "language": "en", "lat": 26.85, "lon": 80.95})
    assert r.status_code == 200
    print("  [OK] Chatbot Prompt #5 (SMS):", r.json().get("intent_detected"))

    # 5. Dedicated SMS Dispatch
    r = client.post("/api/v1/send-sms", json={
        "phoneNumber": "9555681533",
        "location": "Lucknow, Uttar Pradesh",
        "alertType": "HEAVY_RAIN",
        "message": "Heavy rainfall expected in district. Open drainage channels."
    })
    assert r.status_code == 200
    sms_res = r.json()
    assert sms_res["success"] is True
    print("  [OK] Serverless SMS Endpoint:", sms_res["sanitizedPhone"], "| Result:", sms_res["message"])

    # 6. False-Onset Engine
    r = client.get("/api/v1/monsoon/false-onset?lat=26.85&lon=80.95")
    assert r.status_code == 200
    print("  [OK] False-Onset Engine:", r.json().get("false_onset", {}).get("risk_level"))

    # 7. Crop Advisor
    r = client.get("/api/v1/crops/advisor?lat=26.85&lon=80.95&season=ALL")
    assert r.status_code == 200
    print("  [OK] Crop Recommendations:", len(r.json().get("top_crops", [])))

    print("\n>>> ALL BACKEND FUNCTIONS & CONNECTIONS VERIFIED SUCCESSFULLY! <<<")

if __name__ == "__main__":
    run_tests()
