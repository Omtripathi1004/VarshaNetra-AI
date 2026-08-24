import React, { useEffect, useState } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import ChatBot from './ChatBot';

const SEV_COLOR = {
  INFO: 'info',
  WARNING: 'warning',
  CRITICAL: 'danger',
};

const TYPE_ICON = {
  ONSET: '🌱',
  FALSE_ONSET: '⚠️',
  DRY_SPELL: '🌵',
  HEAVY_RAIN: '🌊',
  REVIVAL: '🔄',
  SOWING: '🌾',
  GENERAL: '📢',
};

function AlertCard({ alert, onAck, lang }) {
  const [acking, setAcking] = useState(false);

  const handleAck = async () => {
    try {
      setAcking(true);
      await onAck(alert.id, 'Duty Officer', 'Reviewing situation');
    } finally {
      setAcking(false);
    }
  };

  return (
    <div
      className={`card sev-${alert.severity}`}
      style={{ marginBottom: '0.75rem' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
        }}
      >
        <span style={{ fontSize: '1.6rem' }}>
          {TYPE_ICON[alert.alert_type] || '📢'}
        </span>

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              className={`badge badge-${SEV_COLOR[alert.severity] || 'info'
                }`}
            >
              {alert.severity}
            </span>

            <span className="badge badge-purple">
              {alert.alert_type?.replace('_', ' ')}
            </span>

            <span className="text-xs text-muted">
              {alert.state}, {alert.district}
            </span>

            <span
              className="text-xs text-muted"
              style={{ marginLeft: 'auto' }}
            >
              {alert.created_at
                ? new Date(alert.created_at).toLocaleDateString('en-IN')
                : ''}
            </span>
          </div>

          <p
            style={{
              fontWeight: 600,
              margin: '0.4rem 0 0.2rem',
            }}
          >
            {lang === 'hi'
              ? alert.headline_hi || alert.headline_en
              : alert.headline_en}
          </p>

          <p className="text-sm text-muted">
            {lang === 'hi'
              ? alert.message_hi || alert.message_en
              : alert.message_en}
          </p>
        </div>
      </div>

      {alert.status === 'ACTIVE' && (
        <div style={{ marginTop: '0.75rem', textAlign: 'right' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleAck}
            disabled={acking}
          >
            {acking ? '...' : '✓ Acknowledge'}
          </button>
        </div>
      )}
    </div>
  );
}

function NotifyPanel({ lang }) {
  const { tr } = useApp();

  const [channel, setChannel] = useState('SMS');
  const [recipients, setRecipients] = useState('+91 95556 81533');
  const [subject, setSubject] = useState(
    '⚠️ VarshaNetra Emergency Alert'
  );
  const [message, setMessage] = useState(
    'Heavy rainfall (>64mm) expected in your district. Secure crops, avoid low-lying areas, activate drainage systems.'
  );
  const [alertType, setAlertType] = useState('HEAVY_RAIN');
  const [result, setResult] = useState(null);
  const [sending, setSending] = useState(false);

  const TEMPLATES = {
    HEAVY_RAIN:
      'Heavy rainfall (>64mm) expected in your district. Secure crops, avoid low-lying areas, activate drainage systems.',

    DRY_SPELL:
      'Dry spell forecast for 7+ days. Begin supplemental irrigation immediately to protect standing crops.',

    ONSET:
      'Monsoon onset expected in 3-5 days. Prepare fields for Kharif sowing. Ensure seeds and fertilizers are ready.',

    FALSE_ONSET:
      'Temporary rainfall detected. Monsoon onset NOT confirmed yet. Hold sowing operations for 3 more days.',

    REVIVAL:
      'Monsoon revival after break. Normal rainfall expected to resume. Resume farm operations.',

    SOWING:
      'Optimal sowing window opens now. Soil moisture and temperature are favorable. Begin Kharif sowing.',
  };

  const HI_TEMPLATES = {
    HEAVY_RAIN:
      'आपके जिले में भारी वर्षा (>64 मिमी) की संभावना है। फसलों को सुरक्षित करें, निचले इलाकों से बचें, जल निकासी सक्रिय करें।',

    DRY_SPELL:
      '7+ दिनों के शुष्क मौसम का पूर्वानुमान है। खड़ी फसलों की सुरक्षा के लिए तुरंत पूरक सिंचाई शुरू करें।',

    ONSET:
      '3-5 दिनों में मानसून आगमन की उम्मीद है। खरीफ बुवाई के लिए खेत तैयार करें। बीज और खाद सुनिश्चित करें।',

    FALSE_ONSET:
      'अस्थायी वर्षा हुई है। मानसून आगमन की पुष्टि अभी नहीं हुई है। बुवाई 3 दिन तक रोकें।',

    REVIVAL:
      'मानसून में सुधार हो रहा है। सामान्य वर्षा फिर शुरू होने की संभावना है। कृषि कार्य पुनः शुरू करें।',

    SOWING:
      'अभी बुवाई का इष्टतम समय है। मिट्टी की नमी और तापमान अनुकूल हैं। खरीफ बुवाई शुरू करें।',
  };

  const getEffectiveMessage = () => {
    if (message.trim()) {
      return message.trim();
    }

    if (lang === 'hi') {
      return HI_TEMPLATES[alertType] || TEMPLATES[alertType] || '';
    }

    return TEMPLATES[alertType] || '';
  };

  const handleChannelChange = (newChannel) => {
    setChannel(newChannel);

    if (newChannel === 'EMAIL') {
      setRecipients('harshsih30@gmail.com');
    } else {
      setRecipients('+91 95556 81533');
    }
  };

  const fillTemplate = (type) => {
    setAlertType(type);

    const template =
      lang === 'hi'
        ? HI_TEMPLATES[type] || TEMPLATES[type]
        : TEMPLATES[type];

    setMessage(template || '');
    setSubject(
      `⚠️ VarshaNetra — ${type.replace('_', ' ')} Alert`
    );
  };

  const handleSend = async () => {
    if (!recipients.trim()) return;

    const effectiveMsg = getEffectiveMessage();

    if (!effectiveMsg) {
      setResult({
        status: 'FAILED',
        message: 'Please enter or select an alert message.',
      });
      return;
    }

    setSending(true);
    setResult(null);

    try {
      const recipList = recipients
        .split(/[,\n]/)
        .map((r) => r.trim())
        .filter(Boolean);

      const res = await api.sendNotification(
        channel,
        recipList,
        effectiveMsg,
        subject,
        alertType
      );

      setResult(
        res.data || {
          status: 'SENT',
          message: 'Notification request sent successfully.',
        }
      );
    } catch (e) {
      const errDetail =
        e.response?.data?.detail ||
        e.message ||
        'Failed to dispatch notification';

      setResult({
        status: 'FAILED',
        message:
          typeof errDetail === 'string'
            ? errDetail
            : JSON.stringify(errDetail),
      });
    } finally {
      setSending(false);
    }
  };

  const forwardViaWhatsApp = () => {
    const cleanPhone =
      recipients.replace(/\D/g, '') || '919555681533';

    const effectiveMsg = getEffectiveMessage();

    const url =
      `https://api.whatsapp.com/send?phone=${cleanPhone}` +
      `&text=${encodeURIComponent(effectiveMsg)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const forwardViaDeviceSMS = () => {
    const cleanPhone =
      recipients.replace(/[^\d+]/g, '') || '+919555681533';

    const effectiveMsg = getEffectiveMessage();

    const url =
      `sms:${cleanPhone}?body=${encodeURIComponent(effectiveMsg)}`;

    window.location.href = url;
  };

  const forwardViaEmail = () => {
    const emailTarget = recipients.includes('@')
      ? recipients
      : 'harshsih30@gmail.com';

    const effectiveMsg = getEffectiveMessage();

    const url =
      `mailto:${emailTarget}` +
      `?subject=${encodeURIComponent(
        subject || 'VarshaNetra Emergency Alert'
      )}` +
      `&body=${encodeURIComponent(effectiveMsg)}`;

    window.location.href = url;
  };

  const isSuccess =
    result?.status?.includes('DELIVERED') ||
    result?.status?.includes('SENT') ||
    result?.status === 'SUCCESS';

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">
          📨 {tr('send_notification')}
        </span>
      </div>

      {/* Channel Selector */}
      <div className="channel-tabs mb-2">
        {['SMS', 'EMAIL', 'WHATSAPP'].map((ch) => (
          <button
            key={ch}
            className={`channel-tab ${channel === ch ? 'active' : ''
              }`}
            onClick={() => handleChannelChange(ch)}
            type="button"
          >
            {ch === 'EMAIL'
              ? '📧'
              : ch === 'SMS'
                ? '📱'
                : '💬'}{' '}
            {ch}
          </button>
        ))}
      </div>

      {/* Templates */}
      <div style={{ marginBottom: '0.75rem' }}>
        <label className="field-label">
          Quick Template
        </label>

        <div
          style={{
            display: 'flex',
            gap: '0.4rem',
            flexWrap: 'wrap',
          }}
        >
          {Object.keys(TEMPLATES).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => fillTemplate(type)}
              style={{
                background: 'var(--bg-glass)',
                border: `1px solid ${alertType === type
                    ? 'var(--accent-blue)'
                    : 'var(--border-subtle)'
                  }`,
                borderRadius: 'var(--radius-pill)',
                padding: '0.25rem 0.7rem',
                fontSize: '0.72rem',
                color:
                  alertType === type
                    ? 'var(--accent-blue)'
                    : 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="notify-panel">
        {/* Recipient */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.3rem',
              flexWrap: 'wrap',
              gap: '0.4rem',
            }}
          >
            <label
              className="field-label"
              style={{ margin: 0 }}
            >
              {tr('recipients')}{' '}
              ({channel === 'EMAIL'
                ? 'emails'
                : 'phone numbers'})
            </label>

            <div
              style={{
                display: 'flex',
                gap: '0.3rem',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setRecipients('+91 95556 81533');
                  setChannel('SMS');
                }}
                style={{
                  fontSize: '0.68rem',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '4px',
                  border: '1px solid #cbd5e1',
                  background: '#f1f5f9',
                  cursor: 'pointer',
                }}
              >
                📱 +91 95556 81533
              </button>

              <button
                type="button"
                onClick={() => {
                  setRecipients('harshsih30@gmail.com');
                  setChannel('EMAIL');
                }}
                style={{
                  fontSize: '0.68rem',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '4px',
                  border: '1px solid #cbd5e1',
                  background: '#f1f5f9',
                  cursor: 'pointer',
                }}
              >
                ✉️ Gmail
              </button>
            </div>
          </div>

          <input
            className="input"
            placeholder={
              channel === 'EMAIL'
                ? 'example@gmail.com'
                : '+91 95556 81533'
            }
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
          />
        </div>

        {/* Subject */}
        {channel === 'EMAIL' && (
          <div>
            <label className="field-label">
              {tr('subject')}
            </label>

            <input
              className="input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        )}

        {/* Message */}
        <div>
          <label className="field-label">
            {tr('message')}
          </label>

          <textarea
            className="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              lang === 'hi'
                ? 'संदेश यहाँ लिखें...'
                : 'Type your alert message here...'
            }
          />
        </div>

        {/* Direct Forward Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '0.4rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={forwardViaWhatsApp}
            className="btn btn-sm"
            style={{
              flex: 1,
              background: '#25D366',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
            }}
          >
            💬 WhatsApp
          </button>

          <button
            type="button"
            onClick={forwardViaDeviceSMS}
            className="btn btn-sm"
            style={{
              flex: 1,
              background: '#0284c7',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
            }}
          >
            📱 Device SMS
          </button>

          <button
            type="button"
            onClick={forwardViaEmail}
            className="btn btn-sm"
            style={{
              flex: 1,
              background: '#475569',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
            }}
          >
            ✉️ Email
          </button>
        </div>

        {/* Backend Gateway */}
        <button
          className="btn btn-primary"
          onClick={handleSend}
          disabled={sending || !recipients.trim()}
          style={{ marginTop: '0.5rem' }}
        >
          {sending
            ? '⏳ Sending...'
            : `📤 ${tr('send')} via ${channel} Gateway`}
        </button>

        {/* Result */}
        {result && (
          <div
            style={{
              padding: '0.75rem',
              marginTop: '0.6rem',
              background: isSuccess
                ? 'rgba(52,211,153,0.1)'
                : 'rgba(248,113,113,0.1)',
              border: `1px solid ${isSuccess
                  ? 'rgba(52,211,153,0.3)'
                  : 'rgba(248,113,113,0.3)'
                }`,
              borderRadius: 'var(--radius-md)',
            }}
          >
            <p className={isSuccess ? 'text-green' : 'text-red'}>
              {isSuccess ? '✅' : '❌'} {result.message}
            </p>

            {result.sent_at && (
              <p className="text-xs text-muted">
                {result.sent_at}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AlertsTab() {
  const { tr, lang } = useApp();

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);

      const response = await api.getAlerts();
      setAlerts(response.data || []);
    } catch (error) {
      console.error('Failed to load alerts:', error);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAck = async (id, by, action) => {
    try {
      await api.acknowledgeAlert(id, by, action);
      await load();
    } catch (error) {
      console.error('Failed to acknowledge alert:', error);
    }
  };

  return (
    <div className="main-content">
      <div style={{ marginBottom: '1.25rem' }}>
        <h2
          style={{
            background:
              'linear-gradient(135deg, #f87171, #fb923c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          🚨 {tr('alert_title')}
        </h2>
      </div>

      <div className="grid-2">
        {/* Alerts Feed */}
        <div>
          <div className="section-title">
            <span className="icon">🔔</span>

            {tr('active_alerts')}

            <button
              className="btn btn-secondary btn-sm"
              style={{ marginLeft: 'auto' }}
              onClick={load}
            >
              ↺ {tr('refresh')}
            </button>
          </div>

          {loading ? (
            <div
              className="skeleton"
              style={{ height: 200 }}
            />
          ) : alerts.length === 0 ? (
            <p className="text-muted text-sm">
              No active alerts.
            </p>
          ) : (
            alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onAck={handleAck}
                lang={lang}
              />
            ))
          )}
        </div>

        {/* Notification + Chat */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <NotifyPanel lang={lang} />
          <ChatBot />
        </div>
      </div>
    </div>
  );
}