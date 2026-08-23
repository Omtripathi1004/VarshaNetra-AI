import React, { useEffect, useState } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

// Agri Command Center + Response Engine combined
export default function AgriCommandTab() {
  const { tr, lang, location } = useApp();
  const [events, setEvents] = useState([]);
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resolving, setResolving] = useState(null);

  const load = () => {
    setLoading(true);
    Promise.all([
      api.getActiveEmergencies(),
      api.getRiskSummary({ lat: location.lat, lon: location.lon }),
    ]).then(([e, r]) => {
      setEvents(e.data);
      setRisk(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  };
  useEffect(load, [location.lat, location.lon]);

  const handleResolve = async (id) => {
    await api.resolveEmergency(id, 'Duty Officer', 'Field assessment completed', 'RESOLVED');
    load();
  };

  const RISK_ZONES = [
    { label: 'HIGH Priority', count: risk?.zones?.filter(z => z.level === 'HIGH' || z.level === 'CRITICAL').length || 0, color: 'var(--accent-red)' },
    { label: 'MEDIUM Priority', count: risk?.zones?.filter(z => z.level === 'MODERATE').length || 0, color: 'var(--accent-yellow)' },
    { label: 'LOW Priority', count: risk?.zones?.filter(z => z.level === 'LOW').length || 0, color: 'var(--accent-green)' },
  ];

  const FARMER_ACTIONS = lang === 'hi' ? [
    '🌾 फसलों की सुरक्षा सुनिश्चित करें',
    '💧 जल निकासी नालियों को साफ रखें',
    '🌱 नई बुवाई न करें — मौसम की प्रतीक्षा करें',
    '📱 कृषि अधिकारी से संपर्क करें',
    '🏠 पशुओं को सुरक्षित स्थान पर रखें',
  ] : [
    '🌾 Secure and harvest ready crops',
    '💧 Clear field drainage channels',
    '🌱 Hold new sowing until alert clears',
    '📱 Contact local Agriculture Officer',
    '🏠 Move livestock to elevated ground',
  ];

  const OFFICER_CHECKLIST = [
    'Deploy field assessment team to affected blocks',
    'Coordinate with NDRF/SDRF for flood zones',
    'Activate government crop insurance helpline',
    'Distribute emergency seed kits for re-sowing',
    'Update village-level crop damage database',
  ];

  return (
    <div className="main-content">
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ background: 'linear-gradient(135deg, #f87171, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🏛️ {tr('tab_agri')} + 📡 {tr('tab_response')}
        </h2>
      </div>

      {/* Priority Zone Summary */}
      <div className="grid-3" style={{ marginBottom: '1rem' }}>
        {RISK_ZONES.map(z => (
          <div key={z.label} className="card" style={{ textAlign: 'center' }}>
            <p className="text-sm text-muted">{z.label}</p>
            <p style={{ fontFamily: 'Outfit', fontSize: '3rem', fontWeight: 800, color: z.color }}>{z.count}</p>
            <p className="text-xs text-muted">hazard zones</p>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* Emergency Events */}
        <div>
          <div className="section-title"><span className="icon">🚨</span>{tr('emergency_events')}
            <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }} onClick={load}>↺</button>
          </div>
          {loading ? <div className="skeleton" style={{ height: 200 }} /> :
            events.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <p style={{ fontSize: '2rem' }}>✅</p>
                <p className="text-muted">No active emergency events</p>
              </div>
            ) : events.map(ev => (
              <div key={ev.id} className={`card sev-CRITICAL mb-1`} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <span className="badge badge-danger">{ev.severity}</span>
                      <span className="badge badge-purple">{ev.hazard_type}</span>
                    </div>
                    <p className="font-bold">{ev.district}, {ev.state}</p>
                    <p className="text-xs text-muted">{ev.panchayat}</p>
                    <p className="text-xs" style={{ color: 'var(--accent-orange)', marginTop: '0.3rem' }}>
                      Trigger: {ev.trigger_value} mm · Crops: {ev.affected_crops?.join(', ')}
                    </p>
                    {ev.officer_assigned && (
                      <p className="text-xs text-muted">👤 {ev.officer_assigned}: {ev.action_taken}</p>
                    )}
                  </div>
                  {ev.status === 'ACTIVE' && (
                    <button className="btn btn-success btn-sm" onClick={() => handleResolve(ev.id)}>✓ Resolve</button>
                  )}
                </div>
              </div>
            ))
          }
        </div>

        {/* Response Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card">
            <div className="card-header"><span className="card-title">🧑‍🌾 {tr('farmer_actions')}</span></div>
            {FARMER_ACTIONS.map((a, i) => (
              <div key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>{a}</div>
            ))}
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">👨‍💼 {tr('officer_response')}</span></div>
            {OFFICER_CHECKLIST.map((a, i) => (
              <div key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <input type="checkbox" style={{ marginTop: 3, accentColor: 'var(--accent-blue)' }} />
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
