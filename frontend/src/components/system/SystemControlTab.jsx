import React, { useEffect, useState } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

export default function SystemControlTab() {
  const { tr } = useApp();
  const [status, setStatus] = useState(null);
  const [users, setUsers] = useState([]);
  const [predHistory, setPredHistory] = useState([]);
  const [notifyLog, setNotifyLog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getSystemStatus(),
      api.getUsers(),
      api.getPredictionHistory(10),
      api.getNotificationLog(10),
    ]).then(([s, u, p, n]) => {
      setStatus(s.data);
      setUsers(u.data);
      setPredHistory(p.data);
      setNotifyLog(n.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const ROLE_COLORS = { admin: 'var(--accent-red)', officer: 'var(--accent-blue)', farmer: 'var(--accent-green)', responder: 'var(--accent-violet)' };

  return (
    <div className="main-content">
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ background: 'linear-gradient(135deg, #94a3b8, #64748b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          ⚙️ {tr('system_title')}
        </h2>
      </div>

      {loading ? <div className="skeleton" style={{ height: 200 }} /> : (
        <>
          {/* System Status */}
          {status && (
            <div className="grid-4" style={{ marginBottom: '1rem' }}>
              {[
                { label: 'Database', val: status.database, ok: status.database === 'connected' },
                { label: 'ML Model', val: status.model_loaded ? 'Loaded' : 'Fallback', ok: status.model_loaded },
                { label: 'Model Version', val: status.model_version, ok: true },
                { label: 'Notification', val: status.notification_mode, ok: true },
                { label: 'Total Predictions', val: status.total_predictions, ok: true },
                { label: 'Total Alerts', val: status.total_alerts, ok: true },
                { label: 'Notifications Sent', val: status.total_notifications_sent, ok: true },
                { label: 'Open-Meteo API', val: status.open_meteo_api, ok: status.open_meteo_api === 'connected' },
              ].map(m => (
                <div key={m.label} style={{ padding: '0.75rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <p className="text-xs text-muted">{m.label}</p>
                  <p style={{ fontWeight: 600, color: m.ok ? 'var(--accent-green)' : 'var(--accent-red)' }}>{m.val}</p>
                </div>
              ))}
            </div>
          )}

          <div className="grid-2">
            {/* User Management */}
            <div className="card">
              <div className="card-header"><span className="card-title">👥 {tr('user_management')}</span></div>
              <table className="data-table">
                <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>{u.full_name}</td>
                      <td className="text-muted text-xs">{u.email}</td>
                      <td><span style={{ fontWeight: 600, color: ROLE_COLORS[u.role] || 'var(--text-secondary)', fontSize: '0.8rem' }}>{u.role.toUpperCase()}</span></td>
                      <td><span className={`badge badge-${u.is_active ? 'success' : 'danger'}`}>{u.is_active ? 'Active' : 'Disabled'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Prediction History */}
            <div className="card">
              <div className="card-header"><span className="card-title">🤖 {tr('prediction_history')}</span></div>
              <table className="data-table">
                <thead><tr><th>Location</th><th>Probability</th><th>Category</th><th>Confidence</th></tr></thead>
                <tbody>
                  {predHistory.map(p => (
                    <tr key={p.id}>
                      <td className="text-xs">{p.location}</td>
                      <td style={{ color: p.probability_pct > 60 ? 'var(--accent-red)' : 'var(--accent-green)' }}>{p.probability_pct}%</td>
                      <td><span className="badge badge-info" style={{ fontSize: '0.7rem' }}>{p.category}</span></td>
                      <td>{p.confidence_pct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notification Log */}
          <div className="card mt-2">
            <div className="card-header"><span className="card-title">📋 {tr('notification_log')}</span></div>
            <table className="data-table">
              <thead><tr><th>Channel</th><th>Recipient</th><th>Alert Type</th><th>Status</th><th>Sent At</th></tr></thead>
              <tbody>
                {notifyLog.length === 0 ? (
                  <tr><td colSpan={5} className="text-muted text-center" style={{ padding: '1rem' }}>No notifications sent yet</td></tr>
                ) : notifyLog.map(n => (
                  <tr key={n.id}>
                    <td><span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>{n.channel}</span></td>
                    <td className="text-xs text-muted">{n.recipient}</td>
                    <td className="text-xs">{n.alert_type}</td>
                    <td><span className={`badge ${n.status.includes('SENT') ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.7rem' }}>{n.status}</span></td>
                    <td className="text-xs text-muted">{n.sent_at ? new Date(n.sent_at).toLocaleString('en-IN') : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
