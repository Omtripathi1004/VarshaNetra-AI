import React, { useEffect, useState } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import ChatBot from './ChatBot';

const SEV_COLOR = { INFO: 'info', WARNING: 'warning', CRITICAL: 'danger' };
const TYPE_ICON = {
  ONSET: '🌱', FALSE_ONSET: '⚠️', DRY_SPELL: '🌵',
  HEAVY_RAIN: '🌊', REVIVAL: '🔄', SOWING: '🌾', GENERAL: '📢',
};

function AlertCard({ alert, onAck, lang }) {
  const [acking, setAcking] = useState(false);
  const handleAck = async () => {
    setAcking(true);
    await onAck(alert.id, 'Duty Officer', 'Reviewing situation');
    setAcking(false);
  };

  return (
    <div className={`card sev-${alert.severity}`} style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.6rem' }}>{TYPE_ICON[alert.alert_type] || '📢'}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className={`badge badge-${SEV_COLOR[alert.severity] || 'info'}`}>{alert.severity}</span>
            <span className="badge badge-purple">{alert.alert_type?.replace('_', ' ')}</span>
            <span className="text-xs text-muted">{alert.state}, {alert.district}</span>
            <span className="text-xs text-muted" style={{ marginLeft: 'auto' }}>
              {alert.created_at ? new Date(alert.created_at).toLocaleDateString('en-IN') : ''}
            </span>
          </div>
          <p style={{ fontWeight: 600, margin: '0.4rem 0 0.2rem' }}>
            {lang === 'hi' ? alert.headline_hi : alert.headline_en}
          </p>
          <p className="text-sm text-muted">{lang === 'hi' ? alert.message_hi : alert.message_en}</p>
        </div>
      </div>
      {alert.status === 'ACTIVE' && (
        <div style={{ marginTop: '0.75rem', textAlign: 'right' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleAck} disabled={acking}>
            {acking ? '...' : '✓ Acknowledge'}
          </button>
        </div>
      )}
    </div>
  );
}

function NotifyPanel({ lang }) {
  const { tr } = useApp();
  const [channel, setChannel] = useState('EMAIL');
  const [recipients, setRecipients] = useState('harshsih30@gmail.com');
  const [subject, setSubject] = useState('⚠️ VarshaNetra Emergency Alert');
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('HEAVY_RAIN');
  const [result, setResult] = useState(null);
  const [sending, setSending] = useState(false);

  const TEMPLATES = {
    HEAVY_RAIN: `Heavy rainfall (>64mm) expected in your district. Secure crops, avoid low-lying areas, activate drainage systems.`,
    DRY_SPELL: `Dry spell forecast for 7+ days. Begin supplemental irrigation immediately to protect standing crops.`,
    ONSET: `Monsoon onset expected in 3-5 days. Prepare fields for Kharif sowing. Ensure seeds and fertilizers are ready.`,
    FALSE_ONSET: `Temporary rainfall detected. Monsoon onset NOT confirmed yet. Hold sowing operations for 3 more days.`,
    REVIVAL: `Monsoon revival after break. Normal rainfall expected to resume. Resume farm operations.`,
    SOWING: `Optimal sowing window opens now. Soil moisture and temperature are favorable. Begin Kharif sowing.`,
  };
  const HI_TEMPLATES = {
    HEAVY_RAIN: `आपके जिले में भारी वर्षा (>64 मिमी) की संभावना है। फसलों को सुरक्षित करें, निचले इलाकों से बचें, जल निकासी सक्रिय करें।`,
    DRY_SPELL: `7+ दिनों के शुष्क मौसम का पूर्वानुमान है। खड़ी फसलों की सुरक्षा के लिए तुरंत पूरक सिंचाई शुरू करें।`,
    ONSET: `3-5 दिनों में मानसून आगमन की उम्मीद है। खरीफ बुवाई के लिए खेत तैयार करें। बीज और खाद सुनिश्चित करें।`,
    SOWING: `अभी बुवाई का इष्टतम समय है। मिट्टी की नमी और तापमान अनुकूल हैं। खरीफ बुवाई शुरू करें।`,
  };

  const fillTemplate = (type) => {
    setAlertType(type);
    const tmpl = lang === 'hi' ? (HI_TEMPLATES[type] || TEMPLATES[type]) : TEMPLATES[type];
    setMessage(tmpl || '');
    setSubject(`⚠️ VarshaNetra — ${type.replace('_', ' ')} Alert`);
  };

  const handleSend = async () => {
    if (!recipients.trim()) return;
    const effectiveMsg = message.trim() || (lang === 'hi' ? HI_TEMPLATES[alertType] || TEMPLATES[alertType] : TEMPLATES[alertType]);
    setSending(true);
    setResult(null);
    try {
      const recipList = recipients.split(/[,\n]/).map(r => r.trim()).filter(Boolean);
      const res = await api.sendNotification(channel, recipList, effectiveMsg, subject, alertType);
      setResult(res.data);
    } catch (e) {
      const errDetail = e.response?.data?.detail || e.message || 'Failed to dispatch notification';
      setResult({ status: 'FAILED', message: typeof errDetail === 'string' ? errDetail : JSON.stringify(errDetail) });
    }
    setSending(false);
  };

  return (
    <div className="card">
      <div className="card-header"><span className="card-title">📨 {tr('send_notification')}</span></div>

      {/* Channel Selector */}
      <div className="channel-tabs mb-2">
        {['EMAIL', 'SMS', 'WHATSAPP'].map(ch => (
          <button key={ch} className={`channel-tab ${channel === ch ? 'active' : ''}`} onClick={() => setChannel(ch)}>
            {ch === 'EMAIL' ? '📧' : ch === 'SMS' ? '📱' : '💬'} {ch}
          </button>
        ))}
      </div>

      {/* Template Quick-select */}
      <div style={{ marginBottom: '0.75rem' }}>
        <label className="field-label">Quick Template</label>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {Object.keys(TEMPLATES).map(type => (
            <button key={type}
              onClick={() => fillTemplate(type)}
              style={{ background: 'var(--bg-glass)', border: `1px solid ${alertType === type ? 'var(--accent-blue)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-pill)', padding: '0.25rem 0.7rem',
                fontSize: '0.72rem', color: alertType === type ? 'var(--accent-blue)' : 'var(--text-muted)', cursor: 'pointer' }}>
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="notify-panel">
        <div>
          <label className="field-label">{tr('recipients')} ({channel === 'EMAIL' ? 'emails' : 'phone numbers'}, comma-separated)</label>
          <input className="input" placeholder={channel === 'EMAIL' ? 'officer@district.gov.in, farmer@agri.gov.in' : '+91-9876543210, +91-9000000001'}
            value={recipients} onChange={e => setRecipients(e.target.value)} />
        </div>
        {channel === 'EMAIL' && (
          <div>
            <label className="field-label">{tr('subject')}</label>
            <input className="input" value={subject} onChange={e => setSubject(e.target.value)} />
          </div>
        )}
        <div>
          <label className="field-label">{tr('message')}</label>
          <textarea className="textarea" value={message} onChange={e => setMessage(e.target.value)}
            placeholder={lang === 'hi' ? 'संदेश यहाँ लिखें...' : 'Type your alert message here...'} />
        </div>
        <button className="btn btn-primary" onClick={handleSend} disabled={sending || !recipients.trim()}>
          {sending ? '⏳ Sending...' : `📤 ${tr('send')} via ${channel}`}
        </button>
        {result && (
          <div style={{ padding: '0.75rem', background: result.status.includes('SENT') ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)',
            border: `1px solid ${result.status.includes('SENT') ? 'rgba(52,211,153,0.3)' : 'rgba(248,113,113,0.3)'}`,
            borderRadius: 'var(--radius-md)' }}>
            <p className={result.status.includes('SENT') ? 'text-green' : 'text-red'}>
              {result.status.includes('SENT') ? '✅' : '❌'} {result.message}
            </p>
            <p className="text-xs text-muted">{result.sent_at}</p>
          </div>
        )}

        {/* Live Gateway / Dev Mode Explanation Box */}
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem 0.9rem',
          background: 'rgba(56,189,248,0.06)',
          border: '1px solid rgba(56,189,248,0.2)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.78rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <strong style={{ color: 'var(--accent-blue)' }}>
              ℹ️ {lang === 'hi' ? 'वास्तविक ईमेल और एसएमएस कैसे प्राप्त करें?' : 'How to receive Real Gmail & SMS?'}
            </strong>
            <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>SMTP / Gateway</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.4rem' }}>
            {lang === 'hi'
              ? 'वर्तमान में सिस्टम सुरक्षित "डेवलपर मोड (Dev Mode)" में है — यह अलर्ट को डेटाबेस में लॉग करता है। वास्तविक जीमेल पर मेल भेजने के लिए बैकएंड में आपका 16-अंकीय Google App Password जोड़ना होता है।'
              : 'Currently running in safe Dev Simulation Mode (logs alert to database). To dispatch real emails directly to your Gmail inbox, configure your Gmail SMTP App Password in the backend.'}
          </p>
          <details style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
            <summary style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
              {lang === 'hi' ? '👉 वास्तविक Gmail सेटअप के 2 सरल चरण देखें' : '👉 View 2-step setup for Real Gmail delivery'}
            </summary>
            <div style={{ marginTop: '0.5rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--accent-blue)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <div><strong>1. Generate Google App Password:</strong> Go to your Google Account → Security → 2-Step Verification → App Passwords (create an app named "VarshaNetra").</div>
              <div><strong>2. Add to backend configuration:</strong> In <code>backend/.env</code> set:
                <pre style={{ margin: '0.3rem 0', padding: '0.4rem', background: '#0a0e1a', borderRadius: '4px', color: '#38bdf8', fontSize: '0.74rem' }}>
{`NOTIFICATION_MOCK=False
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_digit_app_password`}
                </pre>
              </div>
              <div className="text-xs text-muted">For SMS delivery, configure Twilio SID & Token in the same configuration.</div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

export default function AlertsTab() {
  const { tr, lang } = useApp();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.getAlerts().then(r => { setAlerts(r.data); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(load, []);

  const handleAck = async (id, by, action) => {
    await api.acknowledgeAlert(id, by, action);
    load();
  };

  return (
    <div className="main-content">
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ background: 'linear-gradient(135deg, #f87171, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🚨 {tr('alert_title')}
        </h2>
      </div>

      <div className="grid-2">
        {/* Alerts Feed */}
        <div>
          <div className="section-title">
            <span className="icon">🔔</span>{tr('active_alerts')}
            <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }} onClick={load}>↺ {tr('refresh')}</button>
          </div>
          {loading ? <div className="skeleton" style={{ height: 200 }} /> :
            alerts.length === 0 ? <p className="text-muted text-sm">No active alerts.</p> :
            alerts.map(a => <AlertCard key={a.id} alert={a} onAck={handleAck} lang={lang} />)
          }
        </div>

        {/* Notification + Chat */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <NotifyPanel lang={lang} />
          <ChatBot />
        </div>
      </div>
    </div>
  );
}
