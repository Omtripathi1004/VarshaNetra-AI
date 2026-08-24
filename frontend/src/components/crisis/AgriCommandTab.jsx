import React, { useEffect, useState } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

export default function AgriCommandTab() {
  const { tr, lang, location } = useApp();
  const [risk, setRisk] = useState(null);
  const [teleconnections, setTeleconnections] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifChannel, setNotifChannel] = useState('SMS');
  const [notifRecipient, setNotifRecipient] = useState('+91 98765 43210');
  const [notifSent, setNotifSent] = useState(false);
  const [dispatchLogs, setDispatchLogs] = useState([
    { id: 1, action: 'Dewatering Pumps Dispatched', target: 'Panchayat Sarojini Nagar', status: 'ACTIVE', time: '10 mins ago' },
    { id: 2, action: 'SMS Warning Broadcast (1,240 Farmers)', target: 'Varanasi Central Belt', status: 'COMPLETED', time: '35 mins ago' },
  ]);

  const [incidents, setIncidents] = useState([
    {
      id: 'INC-101',
      panchayat: 'Sarojini Nagar / Mohanlalganj',
      district: 'Lucknow',
      state: 'Uttar Pradesh',
      crop: 'Paddy Nursery',
      severity: 'CRITICAL',
      hazard: 'Waterlogging & 68mm Flash Flood Watch',
      river_level: '1.4m above danger mark',
      assigned_officer: 'Er. R. K. Verma (Agrimet)',
      status: 'REQUIRES_DISPATCH',
      action_taken: 'None yet',
    },
    {
      id: 'INC-102',
      panchayat: 'Haveli / Baramati',
      district: 'Pune',
      state: 'Maharashtra',
      crop: 'Sugarcane & Bt Cotton',
      severity: 'HIGH',
      hazard: 'Intense Active Surge (>75mm/day)',
      river_level: 'Surging fast',
      assigned_officer: 'Dr. Sneha Patil (KVK)',
      status: 'DISPATCHED',
      action_taken: 'Trench drainage advisory broadcasted',
    },
    {
      id: 'INC-103',
      panchayat: 'Chandauli / Sakaldiha',
      district: 'Varanasi',
      state: 'Uttar Pradesh',
      crop: 'Paddy & Pulses',
      severity: 'WARNING',
      hazard: 'False-Onset Spell (6-Day Dry Break Ahead)',
      river_level: 'Normal',
      assigned_officer: 'Duty Officer (Agrimet)',
      status: 'REQUIRES_DISPATCH',
      action_taken: 'None yet',
    },
    {
      id: 'INC-104',
      panchayat: 'Gondal / Kotda Sangani',
      district: 'Rajkot',
      state: 'Gujarat',
      crop: 'Groundnut & Cotton',
      severity: 'MODERATE',
      hazard: 'Thermal Shock & Heat Stress Alert',
      river_level: 'Sub-normal',
      assigned_officer: 'Kisan Call Center Lead',
      status: 'RESOLVED',
      action_taken: 'Gypsum & sprinkler advisory completed',
    },
  ]);

  useEffect(() => {
    setLoading(true);
    const loc = { lat: location.lat, lon: location.lon, state: location.state, district: location.district };
    Promise.all([
      api.getRiskSummary(loc),
      api.getClimateTeleconnections().catch(() => ({ data: null })),
    ]).then(([rRes, tRes]) => {
      setRisk(rRes.data);
      if (tRes?.data) setTeleconnections(tRes.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [location.lat, location.lon]);

  const handleDispatchAction = (incidentId, actionName) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return { ...inc, status: 'DISPATCHED', action_taken: actionName };
      }
      return inc;
    }));
    setDispatchLogs(prev => [
      { id: Date.now(), action: actionName, target: incidentId, status: 'DISPATCHED', time: 'Just now' },
      ...prev
    ]);
  };

  const handleResolveIncident = (incidentId) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return { ...inc, status: 'RESOLVED', action_taken: 'Incident Resolved & Closed' };
      }
      return inc;
    }));
  };

  const demoMessageEn = `[VarshaNetra Emergency Disaster Alert]
Location: ${location.display_name}
⚠️ Urgent Hazard: False-Onset Risk (68%) / Heavy Rainfall (>50mm).
Action: Clear farm drainage ditches immediately & delay transplanting. Backup irrigation alerted.`;

  const demoMessageHi = `[वरदानेत्र आपातकालीन आपदा अलर्ट]
स्थान: ${location.display_name}
⚠️ तात्कालिक जोखिम: झूठी शुरुआत (68%) / भारी वर्षा (>50 मिमी)।
कार्रवाई: खेतों की जल निकासी नालियां खोलें व रोपाई टालें। वैकल्पिक सिंचाई तैयार रखें।`;

  const handleSendNotification = () => {
    api.sendNotification(notifChannel, [notifRecipient], lang === 'hi' ? demoMessageHi : demoMessageEn, 'Emergency Agro-Alert', 'EMERGENCY_DISPATCH');
    setNotifSent(true);
    setDispatchLogs(prev => [
      { id: Date.now(), action: `${notifChannel} Broadcast Sent to ${notifRecipient}`, target: location.display_name, status: 'DELIVERED', time: 'Just now' },
      ...prev
    ]);
    setTimeout(() => setNotifSent(false), 4000);
  };

  return (
    <div className="main-content">
      {/* Top Header & Officer Status Badge */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
        <div>
          <h2 style={{ color: '#991b1b', margin: 0, fontWeight: 800, fontSize: '1.4rem' }}>
            🏛️ {lang === 'hi' ? 'जिला आपदा एवं आपातकालीन कृषि कमांड सेंटर' : 'District Disaster & Emergency Agricultural Command'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.2rem' }}>
            📍 {location.display_name} • Real-Time Panchayat Distress Ticker • Multi-Channel Farmer Broadcast & Rapid Resource Dispatch
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span className="badge badge-danger" style={{ animation: 'pulse 2s infinite' }}>
            🔴 LIVE CRISIS DESK
          </span>
          <span className="badge badge-success">Duty Officer Active</span>
        </div>
      </div>

      {/* EMERGENCY PRIORITY METRICS ROW */}
      <div className="grid-4" style={{ gap: '0.85rem', marginBottom: '1.4rem' }}>
        <div className="card" style={{ padding: '0.9rem', background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: '14px' }}>
          <span className="text-xs font-bold" style={{ color: '#991b1b' }}>🚨 ACTIVE CRISIS INCIDENTS</span>
          <p style={{ fontSize: '1.8rem', fontWeight: 900, color: '#dc2626', margin: '0.2rem 0 0' }}>
            {incidents.filter(i => i.status !== 'RESOLVED').length}
          </p>
          <span style={{ fontSize: '0.72rem', color: '#b91c1c' }}>2 Critical • 1 High Priority</span>
        </div>

        <div className="card" style={{ padding: '0.9rem', background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '14px' }}>
          <span className="text-xs font-bold" style={{ color: '#047857' }}>👥 CONNECTED FARMERS</span>
          <p style={{ fontSize: '1.8rem', fontWeight: 900, color: '#059669', margin: '0.2rem 0 0' }}>
            1,248
          </p>
          <span style={{ fontSize: '0.72rem', color: '#047857' }}>SMS & WhatsApp Linked</span>
        </div>

        <div className="card" style={{ padding: '0.9rem', background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: '14px' }}>
          <span className="text-xs font-bold" style={{ color: '#0369a1' }}>⚡ RAPID DISPATCH TEAMS</span>
          <p style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0284c7', margin: '0.2rem 0 0' }}>
            6 Units
          </p>
          <span style={{ fontSize: '0.72rem', color: '#0284c7' }}>Pumps & Agronomists Ready</span>
        </div>

        <div className="card" style={{ padding: '0.9rem', background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '14px' }}>
          <span className="text-xs font-bold" style={{ color: '#b45309' }}>🌐 CLIMATE TELECONNECTIONS</span>
          <p style={{ fontSize: '1.2rem', fontWeight: 900, color: '#d97706', margin: '0.4rem 0 0' }}>
            {teleconnections?.overall_state_en || 'Active Coupled'}
          </p>
          <span style={{ fontSize: '0.72rem', color: '#b45309' }}>NOAA ONI/DMI Synced</span>
        </div>
      </div>

      {/* MAIN TWO-COLUMN COMMAND CONSOLE */}
      <div className="grid-2" style={{ gap: '1.2rem', marginBottom: '1.4rem' }}>
        {/* LEFT COLUMN: LIVE PANCHAYAT EMERGENCY INCIDENTS & DISPATCH */}
        <div className="card" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', padding: '1.2rem' }}>
          <div className="card-header" style={{ marginBottom: '1rem' }}>
            <span className="card-title" style={{ color: '#0f172a' }}>
              🚨 {lang === 'hi' ? 'सक्रिय पंचायत आपातकालीन घटनाएं एवं त्वरित कार्रवाई' : 'Live Panchayat Incidents & Rapid Response'}
            </span>
            <span className="badge badge-warning">Priority Queue</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {incidents.map((inc) => (
              <div
                key={inc.id}
                style={{
                  background: inc.status === 'RESOLVED' ? '#f8fafc' : inc.severity === 'CRITICAL' ? '#fef2f2' : '#fffbeb',
                  border: `1.5px solid ${inc.status === 'RESOLVED' ? '#e2e8f0' : inc.severity === 'CRITICAL' ? '#fca5a5' : '#fde68a'}`,
                  borderRadius: '12px',
                  padding: '0.9rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <div>
                    <span
                      style={{
                        background: inc.severity === 'CRITICAL' ? '#dc2626' : inc.severity === 'HIGH' ? '#ea580c' : '#059669',
                        color: '#ffffff',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                        marginRight: '0.5rem',
                      }}
                    >
                      {inc.severity}
                    </span>
                    <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>{inc.panchayat}</strong>
                    <span className="text-xs text-muted"> ({inc.district}, {inc.state})</span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: inc.status === 'RESOLVED' ? '#059669' : inc.status === 'DISPATCHED' ? '#0284c7' : '#dc2626',
                    }}
                  >
                    ● {inc.status}
                  </span>
                </div>

                <p style={{ margin: '0.3rem 0', fontSize: '0.82rem', color: '#334155' }}>
                  <strong>Hazard:</strong> {inc.hazard} • <strong>Crop:</strong> {inc.crop}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: '#64748b', margin: '0.4rem 0' }}>
                  <span>🌊 River Level: {inc.river_level}</span>
                  <span>👮 Assigned: {inc.assigned_officer}</span>
                </div>

                {/* Quick Action Dispatch Buttons */}
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.6rem', flexWrap: 'wrap' }}>
                  {inc.status !== 'RESOLVED' && (
                    <>
                      <button
                        onClick={() => handleDispatchAction(inc.id, 'Dewatering Pumps Dispatched')}
                        className="btn btn-sm"
                        style={{ background: '#0284c7', color: '#ffffff', fontSize: '0.74rem', padding: '0.3rem 0.65rem' }}
                      >
                        🚜 Deploy Pumps
                      </button>
                      <button
                        onClick={() => handleDispatchAction(inc.id, 'SMS Advisory Broadcasted')}
                        className="btn btn-sm"
                        style={{ background: '#059669', color: '#ffffff', fontSize: '0.74rem', padding: '0.3rem 0.65rem' }}
                      >
                        📢 Send SMS Blast
                      </button>
                      <button
                        onClick={() => handleResolveIncident(inc.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.74rem', padding: '0.3rem 0.65rem' }}
                      >
                        ✓ Mark Resolved
                      </button>
                    </>
                  )}
                  {inc.status === 'RESOLVED' && (
                    <span style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 600 }}>
                      ✓ Case closed & relief verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: MULTI-CHANNEL EMERGENCY BROADCASTER & RECENT LOGS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {/* BROADCAST CONSOLE */}
          <div className="card" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', padding: '1.2rem' }}>
            <div className="card-header">
              <span className="card-title">📡 {lang === 'hi' ? 'आपातकालीन किसान ब्रॉडकास्टर' : 'Emergency Farmer Broadcaster'}</span>
              <span className="badge badge-info">Simulated Gateway</span>
            </div>

            <div style={{ marginBottom: '0.8rem' }}>
              <label className="field-label">{lang === 'hi' ? 'प्रसारण माध्यम:' : 'Broadcast Channel:'}</label>
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.3rem' }}>
                {['SMS', 'WHATSAPP', 'VOICE_CALL', 'EMAIL'].map(ch => (
                  <button
                    key={ch}
                    className={`channel-tab ${notifChannel === ch ? 'active' : ''}`}
                    onClick={() => setNotifChannel(ch)}
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                  >
                    {ch === 'SMS' ? '📱 SMS' : ch === 'WHATSAPP' ? '💬 WhatsApp' : ch === 'VOICE_CALL' ? '📞 Voice Call' : '✉️ Email'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '0.8rem' }}>
              <label className="field-label">{lang === 'hi' ? 'लक्षित फोन नंबर / पंचायत समूह:' : 'Target Recipient / Group:'}</label>
              <input
                className="input"
                style={{ width: '100%', fontSize: '0.82rem', marginTop: '0.2rem' }}
                value={notifRecipient}
                onChange={e => setNotifRecipient(e.target.value)}
                placeholder="+91 98765 43210 or ALL_SAROJINI_NAGAR"
              />
            </div>

            <div style={{ marginBottom: '0.9rem' }}>
              <label className="field-label">{lang === 'hi' ? 'आपातकालीन संदेश पूर्वावलोकन:' : 'Emergency Alert Preview:'}</label>
              <textarea
                className="input"
                rows={4}
                readOnly
                style={{ width: '100%', fontSize: '0.78rem', marginTop: '0.2rem', background: '#f8fafc', color: '#1e293b', resize: 'none' }}
                value={lang === 'hi' ? demoMessageHi : demoMessageEn}
              />
            </div>

            <button
              onClick={handleSendNotification}
              className="btn btn-primary"
              style={{ width: '100%', background: '#dc2626', borderColor: '#b91c1c', fontWeight: 800 }}
            >
              {notifSent ? '✓ Alert Dispatched Successfully!' : `🚨 Broadcast Urgent ${notifChannel} to Area Farmers`}
            </button>

            {notifSent && (
              <div style={{ marginTop: '0.7rem', padding: '0.5rem 0.8rem', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', fontSize: '0.78rem', color: '#047857', fontWeight: 600 }}>
                ✓ {notifChannel} dispatched to {notifRecipient}. Delivery report: 100% simulated reach.
              </div>
            )}
          </div>

          {/* DISPATCH ACTION LOGS */}
          <div className="card" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', padding: '1.2rem' }}>
            <div className="card-header">
              <span className="card-title">📜 {lang === 'hi' ? 'हाल की फील्ड कार्रवाई एवं रिपोर्ट' : 'Live Field Dispatch Logs'}</span>
              <span className="badge badge-success">Real-Time Audit</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {dispatchLogs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    padding: '0.55rem 0.75rem',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.78rem',
                  }}
                >
                  <div>
                    <strong style={{ color: '#0f172a' }}>{log.action}</strong>
                    <div style={{ color: '#64748b', fontSize: '0.72rem' }}>Target: {log.target}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>{log.status}</span>
                    <div style={{ color: '#94a3b8', fontSize: '0.68rem', marginTop: '0.1rem' }}>{log.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
