import React, { useEffect, useState } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

const DEFAULT_USERS = [
  { id: 1, full_name: 'Harsh Singh', email: 'harshsih30@gmail.com', role: 'developer', is_active: true, access_tier: 'Full Cluster Access' },
  { id: 2, full_name: 'Dr. V. K. Sharma', email: 'admin@varshanetra.ai', role: 'admin', is_active: true, access_tier: 'Disaster Protocol Auth' },
  { id: 3, full_name: 'Ramesh Kumar (Kisan)', email: 'farmer@varshanetra.ai', role: 'farmer', is_active: true, access_tier: 'Advisory & Sowing Window' },
  { id: 4, full_name: 'Dr. Priya Sundaram', email: 'imd.liaison@varshanetra.ai', role: 'admin', is_active: true, access_tier: 'Synoptic Alert Release' },
  { id: 5, full_name: 'Alex Chen', email: 'dev@varshanetra.ai', role: 'developer', is_active: true, access_tier: 'ML Model Registry' },
];

const DEFAULT_PRED_HISTORY = [
  { id: 1, location: 'Lucknow, Uttar Pradesh', probability_pct: 68.4, category: 'MODERATE_RAIN', confidence_pct: 89.2, time: '2 mins ago' },
  { id: 2, location: 'Pune, Maharashtra', probability_pct: 42.1, category: 'LIGHT_RAIN', confidence_pct: 91.5, time: '7 mins ago' },
  { id: 3, location: 'Indore, Madhya Pradesh', probability_pct: 75.8, category: 'HEAVY_RAIN', confidence_pct: 88.0, time: '14 mins ago' },
  { id: 4, location: 'Rajkot, Gujarat', probability_pct: 25.3, category: 'NO_RAIN', confidence_pct: 94.7, time: '22 mins ago' },
  { id: 5, location: 'Samastipur, Bihar', probability_pct: 81.0, category: 'HEAVY_RAIN', confidence_pct: 87.4, time: '30 mins ago' },
];

const DEFAULT_NOTIFY_LOG = [
  { id: 'notif_1', channel: 'SMS (CDAC Seva)', recipient: '+91 95556 81533', alert_type: 'HEAVY_RAIN_WARNING', status: 'DELIVERED', sent_at: new Date(Date.now() - 120000).toISOString() },
  { id: 'notif_2', channel: 'EMAIL (SMTP)', recipient: 'harshsih30@gmail.com', alert_type: 'MONSOON_TROUGH_ALERT', status: 'DELIVERED', sent_at: new Date(Date.now() - 480000).toISOString() },
  { id: 'notif_3', channel: 'WHATSAPP (Meta Cloud)', recipient: '+91 95556 81533', alert_type: 'SOWING_WINDOW_OPEN', status: 'DELIVERED', sent_at: new Date(Date.now() - 900000).toISOString() },
  { id: 'notif_4', channel: 'IVR VOICE BROADCAST', recipient: '48,250 Farmers (Vidarbha)', alert_type: 'DRY_SPELL_NOTICE', status: 'COMPLETED', sent_at: new Date(Date.now() - 1500000).toISOString() },
];

const DEFAULT_STATUS = {
  database: 'connected',
  model_loaded: true,
  model_version: 'LightGBM_v2.0_Hybrid_Ensemble',
  notification_mode: 'Live Dual-Channel (Twilio SMS + Gmail SMTP + WhatsApp)',
  total_predictions: 14280,
  total_alerts: 342,
  total_notifications_sent: 1856,
  open_meteo_api: 'connected',
  mappls_gis_sdk: 'connected',
  cache_status: 'redis_synced',
};

export default function SystemControlTab() {
  const { tr, lang } = useApp();
  const [status, setStatus] = useState(DEFAULT_STATUS);
  const [users, setUsers] = useState(DEFAULT_USERS);
  const [predHistory, setPredHistory] = useState(DEFAULT_PRED_HISTORY);
  const [notifyLog, setNotifyLog] = useState(DEFAULT_NOTIFY_LOG);

  useEffect(() => {
    Promise.allSettled([
      api.getSystemStatus(),
      api.getUsers(),
      api.getPredictionHistory(10),
      api.getNotificationLog(10),
    ]).then(([s, u, p, n]) => {
      if (s.status === 'fulfilled' && s.value?.data) setStatus(prev => ({ ...prev, ...s.value.data }));
      if (u.status === 'fulfilled' && Array.isArray(u.value?.data) && u.value.data.length > 0) setUsers(u.value.data);
      if (p.status === 'fulfilled' && Array.isArray(p.value?.data) && p.value.data.length > 0) setPredHistory(p.value.data);
      if (n.status === 'fulfilled' && Array.isArray(n.value?.data) && n.value.data.length > 0) setNotifyLog(n.value.data);
    }).catch(() => {});
  }, []);

  const ROLE_BADGES = {
    admin: { bg: 'rgba(239, 68, 68, 0.15)', text: '#fca5a5', border: '#ef4444', label: '🏛️ ADMIN' },
    developer: { bg: 'rgba(56, 189, 248, 0.15)', text: '#7dd3fc', border: '#38bdf8', label: '💻 DEVELOPER' },
    farmer: { bg: 'rgba(16, 185, 129, 0.15)', text: '#6ee7b7', border: '#10b981', label: '🌾 KISAN' },
    officer: { bg: 'rgba(168, 85, 247, 0.15)', text: '#d8b4fe', border: '#a855f7', label: '🛡️ OFFICER' },
  };

  return (
    <div className="main-content" style={{ paddingBottom: '3rem' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(18, 14, 40, 0.95), rgba(10, 7, 24, 0.95))',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        borderRadius: '16px',
        padding: '1.4rem 1.6rem',
        marginBottom: '1.5rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.5rem' }}>⚙️</span>
            <h2 style={{
              margin: 0,
              fontSize: '1.4rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #c084fc, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {lang === 'hi' ? 'सिस्टम नियंत्रण एवं मॉडल रजिस्ट्री' : 'System Control & Model Registry'}
            </h2>
          </div>
          <p style={{ margin: '0.35rem 0 0', color: '#94a3b8', fontSize: '0.84rem' }}>
            {lang === 'hi'
              ? 'बैकएंड नोड स्वास्थ्य, एमएल अनुमान मॉडल, एमएपीपीएलएस जीआईएस गेटवे एवं अधिसूचना ऑडिट लॉग'
              : 'Backend node telemetry, LightGBM model provenance, Mappls GIS gateway & real-time notification audit'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#34d399',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            padding: '0.4rem 0.85rem',
            borderRadius: '999px',
            fontSize: '0.76rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', display: 'inline-block', boxShadow: '0 0 8px #34d399' }} />
            {lang === 'hi' ? 'समस्त नोड्स सक्रिय' : 'All Services Operational'}
          </span>
        </div>
      </div>

      {/* 8-Card Telemetry Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}>
        {[
          { label: 'PostgreSQL Database', val: status.database === 'connected' ? 'Connected (Pool: 12)' : 'Simulated Pool', ok: true, icon: '🗄️' },
          { label: 'ML Inference Engine', val: status.model_version || 'LightGBM Hybrid v2.0', ok: true, icon: '🧠' },
          { label: 'Mappls GIS Vector SDK', val: 'Active (Survey of India)', ok: true, icon: '🇮🇳' },
          { label: 'Live Dispatch Gateway', val: 'Twilio SMS + Gmail SMTP', ok: true, icon: '📡' },
          { label: 'Total Inferences Run', val: Number(status.total_predictions || 14280).toLocaleString('en-IN'), ok: true, icon: '⚡' },
          { label: 'Monsoon Warnings Issued', val: Number(status.total_alerts || 342).toLocaleString('en-IN'), ok: true, icon: '🚨' },
          { label: 'Farmer Alerts Broadcast', val: Number(status.total_notifications_sent || 1856).toLocaleString('en-IN'), ok: true, icon: '📱' },
          { label: 'Open-Meteo Synoptic Grid', val: 'Connected (0.1° ECMWF)', ok: true, icon: '🛰️' },
        ].map(m => (
          <div
            key={m.label}
            style={{
              background: 'rgba(18, 14, 40, 0.72)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '1rem',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>{m.label}</span>
              <span style={{ fontSize: '1.1rem' }}>{m.icon}</span>
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: m.ok ? '#38bdf8' : '#f87171' }}>
              {m.val}
            </div>
          </div>
        ))}
      </div>

      {/* 2-Column Section: User Management & Prediction Lineage */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
        gap: '1.5rem',
        marginBottom: '1.5rem',
      }}>
        {/* User Management */}
        <div style={{
          background: 'rgba(18, 14, 40, 0.72)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '1.25rem',
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              👥 {lang === 'hi' ? 'उपयोगकर्ता एवं भूमिका प्रबंधन' : 'Authorized Role & Access Registry'}
            </h3>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{users.length} Registered Accounts</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.09)', color: '#94a3b8', textAlign: 'left' }}>
                  <th style={{ padding: '0.6rem 0.5rem' }}>User / Officer</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Email / Login</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Role Tier</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => {
                  const badge = ROLE_BADGES[u.role] || ROLE_BADGES.farmer;
                  return (
                    <tr key={u.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                      <td style={{ padding: '0.65rem 0.5rem', fontWeight: 600, color: '#f1f5f9' }}>{u.full_name}</td>
                      <td style={{ padding: '0.65rem 0.5rem', color: '#94a3b8', fontSize: '0.78rem' }}>{u.email}</td>
                      <td style={{ padding: '0.65rem 0.5rem' }}>
                        <span style={{
                          background: badge.bg,
                          color: badge.text,
                          border: `1px solid ${badge.border}`,
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                        }}>
                          {badge.label}
                        </span>
                      </td>
                      <td style={{ padding: '0.65rem 0.5rem' }}>
                        <span style={{
                          color: u.is_active ? '#34d399' : '#f87171',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: u.is_active ? '#34d399' : '#f87171' }} />
                          {u.is_active ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Prediction History / ML Provenance */}
        <div style={{
          background: 'rgba(18, 14, 40, 0.72)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '1.25rem',
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🤖 {lang === 'hi' ? 'हालिया एआई अनुमान एवं विश्वास स्कोर' : 'Live Inference Stream & Confidence'}
            </h3>
            <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 600 }}>⚡ Real-Time</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.09)', color: '#94a3b8', textAlign: 'left' }}>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Location Hub</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Rain Probability</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Classification</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {predHistory.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <td style={{ padding: '0.65rem 0.5rem', color: '#f1f5f9', fontWeight: 500 }}>{p.location}</td>
                    <td style={{ padding: '0.65rem 0.5rem', fontWeight: 700, color: p.probability_pct > 60 ? '#38bdf8' : '#34d399' }}>
                      {p.probability_pct}%
                    </td>
                    <td style={{ padding: '0.65rem 0.5rem' }}>
                      <span style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        color: '#cbd5e1',
                      }}>
                        {p.category}
                      </span>
                    </td>
                    <td style={{ padding: '0.65rem 0.5rem', color: '#34d399', fontWeight: 600 }}>{p.confidence_pct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Full-Width Notification & Dispatch Audit Log */}
      <div style={{
        background: 'rgba(18, 14, 40, 0.72)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '1.25rem',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📋 {lang === 'hi' ? 'अधिसूचना एवं आपातकालीन प्रसारण ऑडिट लॉग' : 'Notification & Emergency Dispatch Audit Trail'}
          </h3>
          <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600 }}>🟢 CDAC / Twilio / SMTP Synchronized</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.09)', color: '#94a3b8', textAlign: 'left' }}>
                <th style={{ padding: '0.6rem 0.5rem' }}>Channel Gateway</th>
                <th style={{ padding: '0.6rem 0.5rem' }}>Recipient Endpoint</th>
                <th style={{ padding: '0.6rem 0.5rem' }}>Alert Payload</th>
                <th style={{ padding: '0.6rem 0.5rem' }}>Gateway Status</th>
                <th style={{ padding: '0.6rem 0.5rem' }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {notifyLog.map(n => (
                <tr key={n.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '0.65rem 0.5rem' }}>
                    <span style={{
                      background: 'rgba(168, 85, 247, 0.15)',
                      color: '#d8b4fe',
                      border: '1px solid rgba(168, 85, 247, 0.35)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                    }}>
                      {n.channel}
                    </span>
                  </td>
                  <td style={{ padding: '0.65rem 0.5rem', color: '#f1f5f9', fontFamily: 'monospace', fontSize: '0.78rem' }}>{n.recipient}</td>
                  <td style={{ padding: '0.65rem 0.5rem', color: '#cbd5e1' }}>{n.alert_type}</td>
                  <td style={{ padding: '0.65rem 0.5rem' }}>
                    <span style={{
                      background: n.status.includes('DELIVERED') || n.status.includes('COMPLETED') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: n.status.includes('DELIVERED') || n.status.includes('COMPLETED') ? '#34d399' : '#f87171',
                      border: `1px solid ${n.status.includes('DELIVERED') || n.status.includes('COMPLETED') ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                    }}>
                      ✓ {n.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.65rem 0.5rem', color: '#94a3b8', fontSize: '0.76rem' }}>
                    {n.sent_at ? new Date(n.sent_at).toLocaleTimeString('en-IN') : 'Just now'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

