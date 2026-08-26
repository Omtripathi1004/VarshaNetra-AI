import React, { useEffect, useState } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

export default function AgriCommandTab() {
  const { tr, lang, location } = useApp();

  const [risk, setRisk] = useState(null);
  const [teleconnections, setTeleconnections] = useState(null);
  const [loading, setLoading] = useState(true);

  const [notifChannel, setNotifChannel] = useState('SMS');
  const [notifRecipient, setNotifRecipient] = useState('+919555681533');
  const [notifSent, setNotifSent] = useState(false);
  const [notifResult, setNotifResult] = useState(null);
  const [isRelaying, setIsRelaying] = useState(false);
  const [notifError, setNotifError] = useState('');

  const [dispatchLogs, setDispatchLogs] = useState([
    {
      id: 1,
      action: 'SMS Urgent Flood Alert',
      target: '+919555681533',
      carrier: 'SMS Gateway',
      status: 'SENT',
      latency: '28ms',
      time: 'Just now',
    },
    {
      id: 2,
      action: 'Email Advisory Report',
      target: 'harshsih30@gmail.com',
      carrier: 'SMTP Email Gateway',
      status: 'SENT',
      latency: '42ms',
      time: '2 mins ago',
    },
    {
      id: 3,
      action: 'Dewatering Pumps Dispatched',
      target: 'Panchayat Sarojini Nagar',
      carrier: 'Field NDRF Unit #4',
      status: 'ACTIVE',
      latency: '—',
      time: '10 mins ago',
    },
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
    let mounted = true;

    const loadData = async () => {
      setLoading(true);

      try {
        const loc = {
          lat: location.lat,
          lon: location.lon,
          state: location.state,
          district: location.district,
        };

        const [riskResponse, teleconnectionResponse] = await Promise.all([
          api.getRiskSummary(loc),
          api.getClimateTeleconnections().catch(() => ({ data: null })),
        ]);

        if (!mounted) return;

        setRisk(riskResponse.data);

        if (teleconnectionResponse?.data) {
          setTeleconnections(teleconnectionResponse.data);
        }
      } catch (error) {
        console.error('Failed to load command center data:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [
    location.lat,
    location.lon,
    location.state,
    location.district,
  ]);

  const handleDispatchAction = async (incidentId, actionName) => {
    const targetInc = incidents.find(i => i.id === incidentId);
    const panchayat = targetInc?.panchayat || 'District Zone';
    const hazard = targetInc?.hazard || 'Heavy Rainfall / Flood';
    const crop = targetInc?.crop || 'Paddy / Kharif Crops';

    const alertText = lang === 'hi'
      ? `🚨 [वरदानेत्र आपातकालीन आपदा अलर्ट]\nपंचायत: ${panchayat} (${targetInc?.district || location.district || 'उत्तर प्रदेश'})\nकार्रवाई: ${actionName}\nजोखिम: ${hazard} - फसल: ${crop}\nतुरंत सुरक्षात्मक उपाय और जल निकासी नालियां सक्रिय करें।`
      : `🚨 [VarshaNetra Emergency Alert]\nPanchayat: ${panchayat} (${targetInc?.district || location.district || 'State Command'})\nAction: ${actionName}\nHazard: ${hazard} - Crop: ${crop}\nExecute emergency protective drainage and contingency measures immediately.`;

    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId
          ? {
            ...inc,
            status: 'DISPATCHED',
            action_taken: actionName,
          }
          : inc
      )
    );

    try {
      const res = await api.sendNotification(
        'ALL',
        ['harshsih30@gmail.com', '+91 95556 81533'],
        alertText,
        `🚨 VarshaNetra Emergency Dispatch: ${panchayat}`,
        'EMERGENCY_DISPATCH'
      );
      const resData = res?.data || {};
      const statusVal = resData.status || (resData.success ? 'ACCEPTED' : 'FAILED');
      setDispatchLogs((prev) => [
        {
          id: Date.now(),
          action: `${actionName} Broadcast Triggered`,
          target: panchayat,
          carrier: 'VarshaNetra Multi-Gateway',
          status: statusVal,
          latency: '34ms',
          time: 'Just now',
        },
        ...prev,
      ]);
    } catch (e) {
      console.warn('Emergency dispatch notice:', e);
      setDispatchLogs((prev) => [
        {
          id: Date.now(),
          action: `${actionName} Broadcast Failed`,
          target: panchayat,
          carrier: 'VarshaNetra Multi-Gateway',
          status: 'FAILED',
          latency: '—',
          time: 'Just now',
        },
        ...prev,
      ]);
    }

    if (actionName.includes('SMS') || actionName.includes('Blast')) {
      const cleanPhone = notifRecipient.replace(/\D/g, '') || '919555681533';
      const smsUrl = `sms:+${cleanPhone}?body=${encodeURIComponent(alertText)}`;
      window.location.href = smsUrl;
    }
  };

  const handleResolveIncident = (incidentId) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId
          ? {
            ...inc,
            status: 'RESOLVED',
            action_taken: 'Incident Resolved & Closed',
          }
          : inc
      )
    );

    setDispatchLogs((prev) => [
      {
        id: Date.now(),
        action: 'Incident Resolved',
        target: incidentId,
        carrier: 'District Emergency Command',
        status: 'RESOLVED',
        latency: '—',
        time: 'Just now',
      },
      ...prev,
    ]);
  };

  const demoMessageEn = `[VarshaNetra Emergency Alert]

Location: ${location.display_name}

⚠️ Urgent Risk:
False-Onset Risk (68%) / Heavy Rainfall (>50mm).

Action:
Clear farm drainage ditches immediately and delay transplanting.
Backup irrigation alerted.`;

  const demoMessageHi = `[वरदानेत्र आपातकालीन आपदा अलर्ट]

स्थान: ${location.display_name}

⚠️ तात्कालिक जोखिम:
झूठी शुरुआत (68%) / भारी वर्षा (>50 मिमी)।

कार्रवाई:
खेतों की जल निकासी नालियां खोलें और रोपाई टालें।
वैकल्पिक सिंचाई तैयार रखें।`;

  const activeMsg =
    lang === 'hi' ? demoMessageHi : demoMessageEn;

  const handleSendNotification = async () => {
    if (!notifRecipient.trim()) {
      setNotifError('Please enter a valid recipient.');
      return;
    }

    if (notifChannel === 'WHATSAPP') {
      forwardViaWhatsApp();
      return;
    }

    if (notifChannel === 'VOICE_CALL') {
      setNotifError(
        'Voice call requires a backend voice provider integration.'
      );
      return;
    }

    setIsRelaying(true);
    setNotifSent(false);
    setNotifError('');

    try {
      const recipients = notifRecipient
        .split(/[,\n]/)
        .map((recipient) => recipient.trim())
        .filter(Boolean);

      const response = await api.sendNotification(
        notifChannel,
        recipients,
        activeMsg,
        'Emergency Agro-Alert',
        'EMERGENCY_DISPATCH'
      );

      const result = response?.data;

      if (
        !result ||
        result.status === 'FAILED' ||
        result.success === false
      ) {
        throw new Error(
          result?.message || 'Notification delivery failed.'
        );
      }

      setNotifSent(true);
      setNotifResult(result);

      const statusVal = result?.status || 'ACCEPTED';
      const carrierName =
        notifChannel === 'EMAIL'
          ? (result?.provider === 'GMAIL_SMTP' ? 'Gmail SMTP' : result?.provider || 'SMTP Gateway')
          : (result?.provider === 'TWILIO' ? 'Twilio SMS' : result?.provider || 'SMS Gateway');

      setDispatchLogs((prev) => [
        {
          id: Date.now(),
          action: `${notifChannel} Broadcast Dispatched`,
          target: notifRecipient,
          carrier: carrierName,
          status: statusVal,
          latency: result?.latency || '—',
          time: 'Just now',
        },
        ...prev,
      ]);

      setTimeout(() => {
        setNotifSent(false);
      }, 7000);
    } catch (error) {
      console.error('Notification failed:', error);
      setNotifSent(false);
      setNotifResult(null);

      const errorMessage =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to send notification.';

      setNotifError(
        typeof errorMessage === 'string'
          ? errorMessage
          : JSON.stringify(errorMessage)
      );
    } finally {
      setIsRelaying(false);
    }
  };

  const forwardViaWhatsApp = () => {
    const cleanPhone =
      notifRecipient.replace(/\D/g, '') || '919555681533';

    const url =
      `https://api.whatsapp.com/send?phone=${cleanPhone}` +
      `&text=${encodeURIComponent(activeMsg)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const forwardViaDeviceSMS = () => {
    const cleanPhone =
      notifRecipient.replace(/\D/g, '') || '919555681533';

    const url =
      `sms:+${cleanPhone}?body=${encodeURIComponent(activeMsg)}`;

    window.location.href = url;
  };

  const forwardViaEmail = () => {
    const emailTarget = notifRecipient.includes('@')
      ? notifRecipient
      : 'harshsih30@gmail.com';

    const url =
      `mailto:${emailTarget}` +
      `?subject=${encodeURIComponent(
        '⚠️ VarshaNetra Emergency Agro-Alert'
      )}` +
      `&body=${encodeURIComponent(activeMsg)}`;

    window.location.href = url;
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return '#dc2626';
      case 'HIGH':
        return '#ea580c';
      case 'WARNING':
        return '#d97706';
      case 'MODERATE':
        return '#059669';
      default:
        return '#64748b';
    }
  };

  if (loading && !risk && !teleconnections) {
    return (
      <div className="main-content">
        <div className="skeleton" style={{ height: 400 }} />
      </div>
    );
  }

  return (
    <div className="main-content">
      {/* Top Header */}
      <div
        style={{
          marginBottom: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.6rem',
        }}
      >
        <div>
          <h2
            style={{
              color: '#991b1b',
              margin: 0,
              fontWeight: 800,
              fontSize: '1.45rem',
            }}
          >
            🏛️{' '}
            {lang === 'hi'
              ? 'जिला आपदा एवं आपातकालीन एसएमएस/टेलीकॉम कमांड सेंटर'
              : 'District Disaster & Active SMS Telecom Command'}
          </h2>

          <p
            style={{
              color: '#94a3b8',
              fontSize: '0.8rem',
              marginTop: '0.2rem',
            }}
          >
            📍 {location.display_name} • Emergency Notification Gateway •
            Direct WhatsApp Forwarding • Panchayat Dispatch
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
          }}
        >
          <span
            className="badge badge-danger"
            style={{ animation: 'pulse 2s infinite' }}
          >
            🔴 LIVE CRISIS DESK
          </span>

          <span className="badge badge-success">
            Notification System Ready
          </span>
        </div>
      </div>

      {/* Priority Metrics */}
      <div
        className="grid-4"
        style={{
          gap: '0.85rem',
          marginBottom: '1.4rem',
        }}
      >
        <div
          className="card"
          style={{
            padding: '0.9rem',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1.5px solid #fecaca',
            borderRadius: '14px',
          }}
        >
          <span
            className="text-xs font-bold"
            style={{ color: '#991b1b' }}
          >
            🚨 ACTIVE CRISIS INCIDENTS
          </span>

          <p
            style={{
              fontSize: '1.8rem',
              fontWeight: 900,
              color: '#dc2626',
              margin: '0.2rem 0 0',
            }}
          >
            {incidents.filter((i) => i.status !== 'RESOLVED').length}
          </p>

          <span
            style={{
              fontSize: '0.72rem',
              color: '#b91c1c',
            }}
          >
            Emergency response queue
          </span>
        </div>

        <div
          className="card"
          style={{
            padding: '0.9rem',
            background: 'rgba(5, 150, 105, 0.08)',
            border: '1.5px solid #bbf7d0',
            borderRadius: '14px',
          }}
        >
          <span
            className="text-xs font-bold"
            style={{ color: '#047857' }}
          >
            👥 CONNECTED NUMBERS
          </span>

          <p
            style={{
              fontSize: '1.2rem',
              fontWeight: 900,
              color: '#059669',
              margin: '0.4rem 0 0',
            }}
          >
            {notifRecipient}
          </p>

          <span
            style={{
              fontSize: '0.72rem',
              color: '#047857',
            }}
          >
            Current active recipient
          </span>
        </div>

        <div
          className="card"
          style={{
            padding: '0.9rem',
            background: 'rgba(6, 182, 212, 0.12)',
            border: '1.5px solid rgba(6, 182, 212, 0.35)',
            borderRadius: '14px',
          }}
        >
          <span
            className="text-xs font-bold"
            style={{ color: '#38bdf8' }}
          >
            ⚡ NOTIFICATION CHANNEL
          </span>

          <p
            style={{
              fontSize: '1.4rem',
              fontWeight: 900,
              color: '#38bdf8',
              margin: '0.4rem 0 0',
            }}
          >
            {notifChannel}
          </p>

          <span
            style={{
              fontSize: '0.72rem',
              color: '#38bdf8',
            }}
          >
            API Gateway Connected
          </span>
        </div>

        <div
          className="card"
          style={{
            padding: '0.9rem',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1.5px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '14px',
          }}
        >
          <span
            className="text-xs font-bold"
            style={{ color: '#fbbf24' }}
          >
            🌐 CLIMATE TELECONNECTIONS
          </span>

          <p
            style={{
              fontSize: '1.1rem',
              fontWeight: 900,
              color: '#fbbf24',
              margin: '0.4rem 0 0',
            }}
          >
            {teleconnections?.overall_state_en || 'Active Coupled'}
          </p>

          <span
            style={{
              fontSize: '0.72rem',
              color: '#b45309',
            }}
          >
            Climate monitoring active
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div
        className="grid-2"
        style={{
          gap: '1.2rem',
          marginBottom: '1.4rem',
        }}
      >
        {/* Incidents */}
        <div
          className="card"
          style={{
            background: 'rgba(18, 14, 40, 0.72)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.09)',
            padding: '1.2rem',
          }}
        >
          <div
            className="card-header"
            style={{ marginBottom: '1rem' }}
          >
            <span
              className="card-title"
              style={{ color: '#f1f5f9' }}
            >
              🚨{' '}
              {lang === 'hi'
                ? 'सक्रिय पंचायत आपातकालीन घटनाएं एवं त्वरित कार्रवाई'
                : 'Live Panchayat Incidents & Rapid Response'}
            </span>

            <span className="badge badge-warning">
              Priority Queue
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
            }}
          >
            {incidents.map((inc) => (
              <div
                key={inc.id}
                style={{
                  background:
                    inc.status === 'RESOLVED'
                      ? 'rgba(255,255,255,0.03)'
                      : inc.severity === 'CRITICAL'
                        ? 'rgba(239, 68, 68, 0.12)'
                        : 'rgba(245, 158, 11, 0.12)',
                  border: `1.5px solid ${inc.status === 'RESOLVED'
                      ? 'rgba(255,255,255,0.09)'
                      : inc.severity === 'CRITICAL'
                        ? 'rgba(239, 68, 68, 0.35)'
                        : 'rgba(245, 158, 11, 0.35)'
                    }`,
                  borderRadius: '12px',
                  padding: '0.9rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.4rem',
                  }}
                >
                  <div>
                    <span
                      style={{
                        background: getSeverityColor(inc.severity),
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

                    <strong
                      style={{
                        fontSize: '0.92rem',
                        color: '#f1f5f9',
                      }}
                    >
                      {inc.panchayat}
                    </strong>

                    <span className="text-xs text-muted">
                      {' '}
                      ({inc.district}, {inc.state})
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color:
                        inc.status === 'RESOLVED'
                          ? '#059669'
                          : inc.status === 'DISPATCHED'
                            ? '#0284c7'
                            : '#dc2626',
                    }}
                  >
                    ● {inc.status}
                  </span>
                </div>

                <p
                  style={{
                    margin: '0.3rem 0',
                    fontSize: '0.82rem',
                    color: '#cbd5e1',
                  }}
                >
                  <strong>Hazard:</strong> {inc.hazard}
                  {' • '}
                  <strong>Crop:</strong> {inc.crop}
                </p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    fontSize: '0.74rem',
                    color: '#94a3b8',
                    margin: '0.4rem 0',
                  }}
                >
                  <span>
                    🌊 River Level: {inc.river_level}
                  </span>

                  <span>
                    👮 Assigned: {inc.assigned_officer}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '0.4rem',
                    marginTop: '0.6rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {inc.status !== 'RESOLVED' && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleDispatchAction(
                            inc.id,
                            'Dewatering Pumps Dispatched'
                          )
                        }
                        className="btn btn-sm"
                        style={{
                          background: '#0284c7',
                          color: '#ffffff',
                          fontSize: '0.74rem',
                          padding: '0.3rem 0.65rem',
                        }}
                      >
                        🚜 Deploy Pumps
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDispatchAction(
                            inc.id,
                            'SMS Advisory Broadcasted'
                          )
                        }
                        className="btn btn-sm"
                        style={{
                          background: '#059669',
                          color: '#ffffff',
                          fontSize: '0.74rem',
                          padding: '0.3rem 0.65rem',
                        }}
                      >
                        📢 Send SMS Blast
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleResolveIncident(inc.id)
                        }
                        className="btn btn-secondary btn-sm"
                        style={{
                          fontSize: '0.74rem',
                          padding: '0.3rem 0.65rem',
                        }}
                      >
                        ✓ Mark Resolved
                      </button>
                    </>
                  )}

                  {inc.status === 'RESOLVED' && (
                    <span
                      style={{
                        fontSize: '0.74rem',
                        color: '#059669',
                        fontWeight: 600,
                      }}
                    >
                      ✓ Case closed & relief verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Gateway */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
          }}
        >
          <div
            className="card"
            style={{
              background: 'rgba(18, 14, 40, 0.72)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.09)',
              padding: '1.2rem',
            }}
          >
            <div className="card-header">
              <span className="card-title">
                📡{' '}
                {lang === 'hi'
                  ? 'सक्रिय एसएमएस एवं टेलीकॉम फॉरवर्डिंग गेटवे'
                  : 'Emergency Notification Gateway'}
              </span>

              <span className="badge badge-success">
                Gateway Ready
              </span>
            </div>

            <div style={{ marginBottom: '0.8rem' }}>
              <label className="field-label">
                {lang === 'hi'
                  ? 'प्रसारण माध्यम:'
                  : 'Broadcast Channel:'}
              </label>

              <div
                style={{
                  display: 'flex',
                  gap: '0.4rem',
                  marginTop: '0.3rem',
                  flexWrap: 'wrap',
                }}
              >
                {['SMS', 'EMAIL', 'WHATSAPP'].map((channel) => (
                  <button
                    key={channel}
                    type="button"
                    className={`channel-tab ${notifChannel === channel ? 'active' : ''
                      }`}
                    onClick={() => {
                      setNotifChannel(channel);
                      setNotifSent(false);
                      setNotifError('');

                      if (channel === 'EMAIL') {
                        setNotifRecipient(
                          'harshsih30@gmail.com'
                        );
                      } else {
                        setNotifRecipient(
                          '+919555681533'
                        );
                      }
                    }}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.35rem 0.75rem',
                    }}
                  >
                    {channel === 'SMS'
                      ? '📱 SMS'
                      : channel === 'WHATSAPP'
                        ? '💬 WhatsApp'
                        : '✉️ Email'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '0.8rem' }}>
              <label className="field-label">
                {lang === 'hi'
                  ? 'लक्षित फोन / ईमेल:'
                  : 'Target Recipient / Email:'}
              </label>

              <input
                className="input"
                style={{
                  width: '100%',
                  fontSize: '0.82rem',
                  marginTop: '0.2rem',
                }}
                value={notifRecipient}
                onChange={(e) =>
                  setNotifRecipient(e.target.value)
                }
                placeholder="+919555681533 or example@gmail.com"
              />
            </div>

            {/* Message Preview */}
            <div
              style={{
                marginBottom: '1rem',
                background: '#0f172a',
                borderRadius: '14px',
                padding: '0.9rem',
                color: '#f8fafc',
                border: '1px solid #334155',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.7rem',
                  color: '#94a3b8',
                  borderBottom: '1px solid #1e293b',
                  paddingBottom: '0.4rem',
                  marginBottom: '0.6rem',
                }}
              >
                <span>📱 {notifRecipient}</span>
                <span>Emergency Alert Preview</span>
              </div>

              <div
                style={{
                  background: '#1e293b',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  borderLeft: '4px solid #059669',
                  fontSize: '0.78rem',
                  lineHeight: 1.45,
                  color: '#e2e8f0',
                }}
              >
                <strong style={{ color: '#4ade80' }}>
                  [VARSHANETRA-AGRI]
                </strong>

                <p
                  style={{
                    margin: '0.25rem 0 0',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {activeMsg}
                </p>
              </div>
            </div>

            {/* Direct Forwarding */}
            <div
              style={{
                display: 'flex',
                gap: '0.4rem',
                marginBottom: '0.8rem',
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
                  fontSize: '0.74rem',
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
                  fontSize: '0.74rem',
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
                  fontSize: '0.74rem',
                  border: 'none',
                  fontWeight: 700,
                }}
              >
                ✉️ Email
              </button>
            </div>

            <button
              type="button"
              onClick={handleSendNotification}
              disabled={isRelaying}
              className="btn btn-primary"
              style={{
                width: '100%',
                background: '#dc2626',
                borderColor: '#b91c1c',
                fontWeight: 800,
              }}
            >
              {isRelaying
                ? '⏳ Sending Emergency Notification...'
                : notifSent
                  ? '✓ Notification Sent!'
                  : `🚨 Send Urgent ${notifChannel}`}
            </button>

            {notifSent && notifResult && (
              <div
                style={{
                  marginTop: '0.7rem',
                  padding: '0.6rem 0.85rem',
                  background:
                    notifResult.status === 'PARTIAL_SUCCESS'
                      ? 'rgba(245, 158, 11, 0.08)'
                      : 'rgba(5, 150, 105, 0.08)',
                  border: `1px solid ${
                    notifResult.status === 'PARTIAL_SUCCESS'
                      ? '#fde68a'
                      : '#86efac'
                  }`,
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  color:
                    notifResult.status === 'PARTIAL_SUCCESS'
                      ? '#b45309'
                      : '#047857',
                  fontWeight: 600,
                }}
              >
                {notifResult.status === 'PARTIAL_SUCCESS' ? '⚠️ ' : '✓ '}
                {notifResult.message || (
                  notifResult.status === 'PARTIAL_SUCCESS'
                    ? 'Partial success: Email accepted, SMS failed.'
                    : `Notification accepted by ${notifResult.provider || 'configured gateway'} for ${notifRecipient}.`
                )}
              </div>
            )}

            {notifError && (
              <div
                style={{
                  marginTop: '0.7rem',
                  padding: '0.6rem 0.85rem',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  color: '#b91c1c',
                  fontWeight: 600,
                }}
              >
                ❌ {notifError}
              </div>
            )}
          </div>

          {/* Dispatch Logs */}
          <div
            className="card"
            style={{
              background: 'rgba(18, 14, 40, 0.72)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.09)',
              padding: '1.2rem',
            }}
          >
            <div className="card-header">
              <span className="card-title">
                📜{' '}
                {lang === 'hi'
                  ? 'हाल की फील्ड कार्रवाई एवं रिपोर्ट'
                  : 'Live Field Dispatch Logs'}
              </span>

              <span className="badge badge-success">
                Real-Time Audit
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {dispatchLogs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    padding: '0.55rem 0.75rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.09)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.78rem',
                  }}
                >
                  <div>
                    <strong style={{ color: '#f1f5f9' }}>
                      {log.action}
                    </strong>

                    <div
                      style={{
                        color: '#94a3b8',
                        fontSize: '0.72rem',
                      }}
                    >
                      To: {log.target} • {log.carrier}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span
                      className={`badge ${
                        log.status === 'ACCEPTED' ||
                        log.status === 'DELIVERED' ||
                        log.status === 'RESOLVED'
                          ? 'badge-success'
                          : log.status === 'PARTIAL_SUCCESS' ||
                            log.status === 'QUEUED'
                            ? 'badge-warning'
                            : log.status === 'FAILED' ||
                              log.status === 'CONFIGURATION_ERROR' ||
                              log.status === 'REJECTED'
                              ? 'badge-danger'
                              : 'badge-info'
                      }`}
                    >
                      {log.status}
                    </span>

                    <div
                      style={{
                        color: '#94a3b8',
                        fontSize: '0.68rem',
                        marginTop: '0.1rem',
                      }}
                    >
                      {log.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Optional Risk Data */}
      {risk && (
        <div
          className="card"
          style={{
            marginTop: '1rem',
            fontSize: '0.8rem',
          }}
        >
          <strong>📊 Live Risk Summary</strong>

          <pre
            style={{
              whiteSpace: 'pre-wrap',
              fontSize: '0.72rem',
              color: '#94a3b8',
            }}
          >
            {JSON.stringify(risk, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}