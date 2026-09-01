import React, { useEffect, useState } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import ChatBot from './ChatBot';
import LastMileAlertSimulator from './LastMileAlertSimulator';

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
  const { tr, user, location } = useApp();

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [auditLog, setAuditLog] = useState([]);

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

  const initiateSend = () => {
    if (!recipients.trim()) return;
    const effectiveMsg = getEffectiveMessage();
    if (!effectiveMsg) {
      setResult({
        status: 'FAILED',
        message: 'Please enter or select an alert message.',
      });
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmAndDispatch = async () => {
    setShowConfirmModal(false);
    setSending(true);
    setResult(null);

    const effectiveMsg = getEffectiveMessage();

    try {
      const recipList = recipients
        .split(/[,\n]/)
        .map((r) => r.trim())
        .filter(Boolean);

      let dispatchRes = null;
      if (channel === 'SMS') {
        const firstPhone = recipList[0] || recipients;
        const res = await api.sendSMS({
          phoneNumber: firstPhone,
          location: location.display_name || 'Your District Agrozone',
          alertType,
          message: effectiveMsg,
        });
        dispatchRes = res;
        const isOk = res.data?.success === true;
        const s = res.data?.status || (isOk ? 'ACCEPTED' : 'FAILED');
        setResult({
          status: s,
          success: isOk,
          provider: res.data?.provider || 'TWILIO',
          provider_message_id: res.data?.provider_message_id || res.data?.data?.provider_message_id,
          message: res.data?.message || (isOk ? `SMS accepted by ${res.data?.provider || 'Gateway'}` : 'SMS dispatch failed.'),
          sent_at: new Date().toLocaleTimeString(),
        });
      } else if (channel === 'EMAIL') {
        const firstEmail = recipList[0] || recipients;
        const res = await api.sendEmail({
          email: firstEmail,
          recipient: firstEmail,
          subject: subject || 'VarshaNetra Agro-Alert',
          message: effectiveMsg,
          alertType,
        });
        dispatchRes = res;
        const isOk = res.data?.success === true;
        const s = res.data?.status || (isOk ? 'ACCEPTED' : 'FAILED');
        setResult({
          status: s,
          success: isOk,
          provider: res.data?.provider || 'GMAIL_SMTP',
          provider_message_id: res.data?.provider_message_id,
          smtp_host: res.data?.smtp_host || 'smtp.gmail.com',
          smtp_port: res.data?.smtp_port || 587,
          message: res.data?.message || (isOk ? `Email accepted by ${res.data?.provider || 'Gmail SMTP'}` : 'Email dispatch failed.'),
          sent_at: new Date().toLocaleTimeString(),
        });
      } else {
        const res = await api.sendNotification(
          channel,
          recipList,
          effectiveMsg,
          subject,
          alertType
        );
        dispatchRes = res;
        const isOk = res.data?.success === true;
        const s = res.data?.status || (isOk ? 'ACCEPTED' : 'FAILED');
        setResult({
          status: s,
          success: isOk,
          provider: res.data?.provider || 'GATEWAY',
          provider_message_id: res.data?.provider_message_id,
          message: res.data?.message || (isOk ? `Notification accepted via ${channel}` : 'Notification dispatch failed.'),
          sent_at: new Date().toLocaleTimeString(),
        });
      }


      // Record Audit Log Entry
      const logEntry = {
        id: `audit_${Date.now()}`,
        userId: user?.userId || 'admin@varshanetra.ai',
        role: user?.role || 'admin',
        timestamp: new Date().toISOString(),
        warningType: alertType,
        targetRegion: location.display_name,
        channel,
        recipients,
        status: dispatchRes?.data?.success ? 'DISPATCHED_ACCEPTED' : 'DISPATCH_FAILED',
      };
      setAuditLog(prev => [logEntry, ...prev]);

    } catch (e) {
      const errDetail =
        e.response?.data?.detail ||
        e.response?.data?.message ||
        e.message ||
        'Failed to dispatch notification';

      setResult({
        status: e.response?.status === 503 ? 'CONFIGURATION_ERROR' : 'FAILED',
        success: false,
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
    result?.status === 'ACCEPTED' ||
    result?.status === 'DELIVERED' ||
    result?.status === 'QUEUED' ||
    (result?.success === true && result?.status !== 'PARTIAL_SUCCESS');
  const isPartial = result?.status === 'PARTIAL_SUCCESS';
  const isConfigError = result?.status === 'CONFIGURATION_ERROR';

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">
          📨 {tr('send_notification')}
        </span>
      </div>

      {/* Channel Selector — Modern Pill Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
        {[
          { key: 'SMS', icon: '📱', label: 'SMS', color: '#0284c7', gradient: 'linear-gradient(135deg, #0284c7, #0ea5e9)' },
          { key: 'EMAIL', icon: '✉️', label: 'Email', color: '#7c3aed', gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)' },
          { key: 'WHATSAPP', icon: '💬', label: 'WhatsApp', color: '#16a34a', gradient: 'linear-gradient(135deg, #16a34a, #22c55e)' },
        ].map((ch) => {
          const isActive = channel === ch.key;
          return (
            <button
              key={ch.key}
              onClick={() => handleChannelChange(ch.key)}
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.55rem 0.5rem',
                borderRadius: '12px',
                border: isActive ? 'none' : '1.5px solid #e2e8f0',
                background: isActive ? ch.gradient : '#ffffff',
                color: isActive ? '#ffffff' : '#475569',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                boxShadow: isActive ? `0 3px 12px ${ch.color}40` : '0 1px 3px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease',
                minWidth: 0,
              }}
            >
              <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{ch.icon}</span>
              <span>{ch.label}</span>
            </button>
          );
        })}
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

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => { setRecipients('+91 95556 81533'); setChannel('SMS'); }}
                style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: '8px', border: '1px solid #bae6fd', background: '#e0f2fe', color: '#0369a1', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}
              >
                📱 +91 95556 81533
              </button>
              <button
                type="button"
                onClick={() => { setRecipients('harshsih30@gmail.com'); setChannel('EMAIL'); }}
                style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: '8px', border: '1px solid #ddd6fe', background: '#ede9fe', color: '#6d28d9', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}
              >
                ✉️ harshsih30@gmail.com
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

        {/* Direct Forward Buttons — Grid Layout (No Overlap) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={forwardViaWhatsApp}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', padding: '0.55rem 0.4rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #16a34a, #22c55e)', color: '#fff', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(22,163,74,0.25)', minWidth: 0 }}
          >
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>💬</span> WhatsApp
          </button>
          <button
            type="button"
            onClick={forwardViaDeviceSMS}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', padding: '0.55rem 0.4rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #0284c7, #38bdf8)', color: '#fff', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(2,132,199,0.25)', minWidth: 0 }}
          >
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>📱</span> SMS
          </button>
          <button
            type="button"
            onClick={forwardViaEmail}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', padding: '0.55rem 0.4rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', color: '#fff', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(124,58,237,0.25)', minWidth: 0 }}
          >
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>✉️</span> Email
          </button>
        </div>

        {/* Backend Gateway Trigger */}
        <button
          className="btn btn-primary"
          onClick={initiateSend}
          disabled={sending || !recipients.trim()}
          style={{ marginTop: '0.5rem', fontWeight: 700 }}
        >
          {sending
            ? '⏳ Sending...'
            : `📤 ${tr('send')} via ${channel} Gateway`}
        </button>

        {/* Confirmation Modal (SIH Requirement) */}
        {showConfirmModal && (
          <div
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(3px)',
              zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
            }}
          >
            <div style={{
              background: 'rgba(18, 14, 40, 0.72)', borderRadius: '18px', padding: '1.6rem',
              maxWidth: '520px', width: '100%', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)', border: '2px solid #ef4444',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.6rem' }}>🚨</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#991b1b', fontWeight: 800 }}>
                    {lang === 'hi' ? 'आपातकालीन चेतावनी प्रेषण पुष्टिकरण' : 'Emergency Warning Dispatch Confirmation'}
                  </h3>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                    Authorized Action: Disaster Administrator / Lead Operator
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', background: 'rgba(255,255,255,0.03)', padding: '0.9rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.09)', marginBottom: '1rem' }}>
                <div><strong style={{ color: '#94a3b8' }}>WARNING TYPE:</strong> <span className="badge badge-danger">{alertType}</span></div>
                <div><strong style={{ color: '#94a3b8' }}>TARGET REGION:</strong> <strong style={{ color: '#f1f5f9' }}>{location.display_name}</strong></div>
                <div><strong style={{ color: '#94a3b8' }}>SEVERITY:</strong> <span style={{ color: '#dc2626', fontWeight: 800 }}>CRITICAL / ACTIVE</span></div>
                <div><strong style={{ color: '#94a3b8' }}>CHANNEL:</strong> <strong style={{ color: '#0284c7' }}>{channel}</strong></div>
                <div><strong style={{ color: '#94a3b8' }}>RECIPIENTS:</strong> <code>{recipients}</code></div>
                <div><strong style={{ color: '#94a3b8' }}>DISPATCHER:</strong> {user?.name || 'Dr. V. K. Sharma'} ({user?.role || 'admin'})</div>
                <div style={{ marginTop: '0.3rem', borderTop: '1px solid rgba(255,255,255,0.09)', paddingTop: '0.4rem' }}>
                  <strong style={{ color: '#94a3b8' }}>MESSAGE:</strong>
                  <div style={{ fontSize: '0.78rem', color: '#e2e8f0', marginTop: '2px', fontStyle: 'italic' }}>
                    "{getEffectiveMessage()}"
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmModal(false)}
                >
                  {lang === 'hi' ? 'रद्द करें (Cancel)' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAndDispatch}
                  style={{
                    background: 'linear-gradient(135deg, #dc2626, #991b1b)',
                    color: '#ffffff', border: 'none', borderRadius: '10px',
                    padding: '0.6rem 1.2rem', fontWeight: 800, fontSize: '0.86rem', cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(220, 38, 38, 0.4)'
                  }}
                >
                  {lang === 'hi' ? '🚨 पुष्टि करें व भेजें (Confirm & Dispatch)' : '🚨 CONFIRM & DISPATCH'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div
            style={{
              padding: '0.75rem 0.9rem',
              marginTop: '0.6rem',
              background: isSuccess
                ? 'rgba(52,211,153,0.1)'
                : (isPartial ? 'rgba(234,179,8,0.12)' : (isConfigError ? 'rgba(249,115,22,0.12)' : 'rgba(248,113,113,0.1)')),
              border: `1px solid ${
                isSuccess
                  ? 'rgba(52,211,153,0.35)'
                  : (isPartial ? 'rgba(234,179,8,0.4)' : (isConfigError ? 'rgba(249,115,22,0.4)' : 'rgba(248,113,113,0.35)'))
              }`,
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.1rem', lineHeight: 1.2 }}>
                {isSuccess ? '✅' : (isPartial ? '⚠️' : (isConfigError ? '⚙️' : '❌'))}
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '0.84rem', color: isSuccess ? '#10b981' : (isPartial ? '#f59e0b' : (isConfigError ? '#f97316' : '#ef4444')) }}>
                  {result.message}
                </p>
                {result.provider && (
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.72rem', color: '#94a3b8' }}>
                    Provider: <strong>{result.provider}</strong> | Status: <strong>{result.status}</strong>
                    {result.smtp_host && <span> | Gateway: <code>{result.smtp_host}:{result.smtp_port || 587}</code></span>}
                    {result.provider_message_id && <span> | Ref: <code>{result.provider_message_id}</code></span>}
                  </p>
                )}
                {result.sent_at && (
                  <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.7rem', color: '#64748b' }}>
                    Timestamp: {result.sent_at}
                  </p>
                )}

              </div>
            </div>
          </div>
        )}

        {/* Session Audit Log */}
        {auditLog.length > 0 && (
          <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.8rem' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              📋 Session Dispatch Audit Log ({auditLog.length})
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.4rem' }}>
              {auditLog.map((log) => (
                <div key={log.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.45rem 0.65rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.09)', fontSize: '0.72rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#f1f5f9' }}>{log.warningType}</strong> via <span style={{ color: '#0284c7', fontWeight: 600 }}>{log.channel}</span> → <code>{log.recipients}</code>
                  </div>
                  <span style={{ color: '#059669', fontWeight: 700 }}>✓ Logged</span>
                </div>
              ))}
            </div>
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

      {/* LAST-MILE ACCESSIBILITY ALERT SIMULATOR */}
      <LastMileAlertSimulator />

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