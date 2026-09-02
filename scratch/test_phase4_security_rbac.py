"""
VarshaNetra AI — Security & RBAC Regression Test
=================================================
Tests role-based authorization for Farmer, Developer, and Disaster Admin.
Ensures R-A-T-A-C-U security enforcement on privileged endpoints.
"""
import sys
import os

sys.path.insert(0, os.path.abspath('.'))
sys.path.insert(0, os.path.abspath('backend'))

from fastapi.testclient import TestClient
from backend.app.main import app

def test_security_and_rbac():
    print("=" * 70)
    print("VARSHANETRA AI — SECURITY & RBAC REGRESSION TEST")
    print("=" * 70)

    client = TestClient(app)

    # 1. Unprivileged Public Routes (Should succeed for ALL roles including Farmer)
    public_routes = [
        "/health",
        "/api/v1/weather/current?lat=26.85&lon=80.95",
        "/api/v1/prediction/rainfall?lat=26.85&lon=80.95",
        "/api/v1/monsoon/phase?lat=26.85&lon=80.95",
        "/api/v1/monsoon/false-onset?lat=26.85&lon=80.95",
        "/api/v1/forecast/monsoon-outlook?lat=26.85&lon=80.95",
        "/api/v1/crops/advisor?lat=26.85&lon=80.95&season=ALL",
        "/api/v1/prediction/explain?lat=26.85&lon=80.95",
        "/api/v1/analytics/historical?lat=26.85&lon=80.95",
    ]

    print("\n[1/3] Testing Public Routes for Normal User (Farmer role)...")
    for route in public_routes:
        res = client.get(route, headers={"X-User-Role": "farmer"})
        assert res.status_code == 200, f"Public route {route} failed for farmer: {res.status_code}"
        print(f"  -> GET {route} [farmer]: 200 OK")

    # 2. Privileged Endpoints Protection for Farmer Role (MUST RETURN HTTP 403 FORBIDDEN)
    privileged_calls = [
        ("POST", "/api/v1/notify/send", {"channel": "SMS", "recipients": ["+919876543210"], "message": "Emergency alert"}),
        ("POST", "/api/v1/send-sms", {"phoneNumber": "+919876543210", "message": "Heavy Rain Alert"}),
        ("POST", "/api/v1/emergency/1/resolve", None, {"officer_name": "Test", "action_taken": "Resolved"}),
    ]

    print("\n[2/3] Testing Server-Side Security Enforcement (Farmer attempts privileged operations)...")
    for item in privileged_calls:
        method = item[0]
        url = item[1]
        json_body = item[2] if len(item) > 2 else None
        params = item[3] if len(item) > 3 else None

        if method == "POST":
            res = client.post(url, json=json_body, params=params, headers={"X-User-Role": "farmer"})
        else:
            res = client.get(url, params=params, headers={"X-User-Role": "farmer"})

        assert res.status_code == 403, f"SECURITY VIOLATION! Endpoint {url} allowed farmer access with status {res.status_code}"
        detail = res.json().get('detail', '')
        print(f"  -> {method} {url} [farmer]: 403 FORBIDDEN [OK] (Detail: '{detail}')")

    # 3. Privileged Endpoints Authorization for Developer and Admin Roles (MUST SUCCEED)
    print("\n[3/3] Testing Server-Side Authorization for Developer & Disaster Administrator...")
    for role in ["developer", "admin"]:
        print(f"  --- Role: {role.upper()} ---")
        
        # Send SMS test
        res_sms = client.post("/api/v1/send-sms", json={
            "phoneNumber": "9876543210",
            "message": f"Test notification authorized by {role}",
            "alertType": "HEAVY_RAIN"
        }, headers={"X-User-Role": role})
        assert res_sms.status_code in [200, 502, 503], f"Privileged SMS failed for {role}: {res_sms.status_code}"
        print(f"  -> POST /api/v1/send-sms [{role}]: {res_sms.status_code} OK [Authorized]")

        # Notify Send test
        res_notify = client.post("/api/v1/notify/send", json={
            "channel": "SMS",
            "recipients": ["+919876543210"],
            "message": f"Emergency warning from {role}",
            "alert_type": "FLOOD"
        }, headers={"X-User-Role": role})
        assert res_notify.status_code in [200, 502, 503], f"Privileged Notify failed for {role}: {res_notify.status_code}"
        print(f"  -> POST /api/v1/notify/send [{role}]: {res_notify.status_code} OK [Authorized]")

    print("\n" + "=" * 70)
    print("ALL SECURITY & RBAC TESTS PASSED! R-A-T-A-C-U ENFORCEMENT VERIFIED 100%!")
    print("=" * 70)

if __name__ == "__main__":
    test_security_and_rbac()
