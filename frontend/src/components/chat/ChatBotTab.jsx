import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

export default function ChatBotTab() {
  const { lang, location, tr } = useApp();
  const [msgs, setMsgs] = useState([
    {
      id: 'welcome',
      role: 'bot',
      text: lang === 'hi'
        ? `**नमस्ते! मैं VarshaNetra AI हूँ — आपका वास्तविक कृषि व मानसूनी निर्णय सलाहकार।**\n\nआप मुझसे आपके स्थान (**${location.display_name}**) के लिए 5 प्रमुख प्रकार के प्रश्न पूछ सकते हैं:\n• **WHAT?** — वर्तमान वर्षा व मौसम स्थिति क्या है?\n• **WHY?** — मॉडल ने यह जोखिम क्यों आकलित किया?\n• **WHEN?** — भारी वर्षा या शुष्क विराम कब अपेक्षित है?\n• **HOW?** — फसल में जलभराव या कीट नुकसान कैसे रोकें?\n• **WHAT SHOULD I DO?** — कपास/सोयाबीन/धान में मुझे क्या कदम उठाने चाहिए?`
        : `**Hello! I am VarshaNetra AI — your real-time agronomic decision-support system.**\n\nYou can ask me 5 core operational question types for **${location.display_name}**:\n• **WHAT?** — What is the current rainfall risk and monsoon phase?\n• **WHY?** — Why did the ML model produce this prediction?\n• **WHEN?** — When is heavy rainfall or a dry break expected?\n• **HOW?** — How to mitigate waterlogging or pest stress in crops?\n• **WHAT SHOULD I DO?** — What specific action should I take for Cotton, Soybean, or Paddy?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherSnapshot, setWeatherSnapshot] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, loading]);

  useEffect(() => {
    api.getCurrentWeather({ lat: location.lat, lon: location.lon })
      .then(r => setWeatherSnapshot(r.data))
      .catch(() => {});
  }, [location.lat, location.lon]);

  const send = async (msgText, isRegenerate = false, prevQuestion = null) => {
    const textToSend = (msgText || input || prevQuestion || '').trim();
    if (!textToSend || loading) return;

    if (!isRegenerate) {
      setInput('');
      setMsgs(m => [...m, { id: `user_${Date.now()}`, role: 'user', text: textToSend }]);
    }
    setLoading(true);

    try {
      const loc = { lat: location.lat, lon: location.lon, state: location.state, district: location.district };
      const reqId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const res = await api.chat(textToSend, lang, loc, { request_id: reqId, is_regenerate: isRegenerate });
      
      const reply = lang === 'hi' ? (res.data?.reply_hi || res.data?.reply) : (res.data?.reply_en || res.data?.reply);
      
      setMsgs(m => {
        const base = isRegenerate ? m.slice(0, -1) : m;
        return [...base, {
          id: reqId,
          role: 'bot',
          question: textToSend,
          text: reply || (lang === 'hi' ? 'सलाहकार से उत्तर प्राप्त हुआ।' : 'Decision advisory response generated.'),
          intent: res.data?.intent_detected || 'WHAT',
          crop: res.data?.crop_detected,
          dataSource: res.data?.data_source
        }];
      });
    } catch {
      setMsgs(m => [...m, {
        id: `err_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        role: 'bot',
        isError: true,
        text: lang === 'hi'
          ? 'वर्तमान में उत्तर उत्पन्न करने में असमर्थ। कृपया पुनः प्रयास करें। (Unable to generate a response right now. Please try again.)'
          : 'Unable to generate a response right now. Please try again.'
      }]);
    }
    setLoading(false);
  };

  // 15 Standard Quick Questions for rigorous regression verification
  const SUGGESTIONS = lang === 'hi' ? [
    { title: '🔍 78% पूर्वानुमान कारण', prompt: 'Why is the prediction 78%?' },
    { title: '🌏 ENSO व IOD प्रभाव', prompt: 'What is ENSO and IOD?' },
    { title: '🌧️ आज की बारिश', prompt: 'आज मेरे क्षेत्र में बारिश का क्या अनुमान है?' },
    { title: '☁️ कपास + भारी बारिश', prompt: 'भारी बारिश आने वाली है और मेरे पास कपास है, मुझे क्या करना चाहिए?' },
    { title: '🫘 सोयाबीन + शुष्क विराम', prompt: 'सोयाबीन में सूखा विराम (Dry Spell) से बचाव कैसे करें?' },
    { title: '🌾 धान रोपाई', prompt: 'क्या अभी धान की रोपाई करना सही समय है?' },
    { title: '🌽 मक्का कीट नियंत्रण', prompt: 'मक्का में फॉल आर्मीवर्म कीट से कैसे बचाव करें?' },
    { title: '🌾 गेहूं गर्मी तनाव', prompt: 'गेहूं में तापमान बढ़ने पर गर्मी के तनाव से कैसे बचें?' },
    { title: '🌼 सरसों बुवाई', prompt: 'सरसों की बुवाई के लिए क्या सलाह है?' },
    { title: '🥣 दालें जल निकासी', prompt: 'अरहर और उड़द की दाल में जलभराव रोकने के उपाय बताएं।' },
    { title: '⚠️ झूठी शुरुआत (False-Onset)', prompt: 'मानसून की झूठी शुरुआत (False-Onset) का क्या जोखिम है?' },
    { title: '☀️ सूखा विराम अवधि', prompt: 'मानसून ब्रेक कितने दिनों तक चलेगा?' },
    { title: '🚨 भारी वर्षा सावधानी', prompt: 'अतिवृष्टि और बाढ़ से फसल बचाने के लिए क्या करें?' },
    { title: '🌊 मानसून स्थिति', prompt: 'मानसून का वर्तमान प्रवाह और चरण क्या है?' },
    { title: '🌱 मिट्टी की नमी', prompt: 'वर्तमान में खेत में मिट्टी की नमी कितनी है?' },
    { title: '🌡️ वर्तमान मौसम', prompt: 'अभी का तापमान, आर्द्रता और हवा की गति क्या है?' },
  ] : [
    { title: '🔍 78% Prediction Reason', prompt: 'Why is the prediction 78%?' },
    { title: '🌏 What is ENSO & IOD', prompt: 'What is ENSO and what is IOD?' },
    { title: '🌧️ Today\'s Rain Risk', prompt: 'What is today\'s rainfall risk in my area?' },
    { title: '☁️ Cotton + Heavy Rain', prompt: 'Heavy rain is expected tomorrow and I have cotton. What should I do?' },
    { title: '🫘 Soybean + Dry Spell', prompt: 'How to manage dry spell break in soybean fields?' },
    { title: '🌾 Paddy Transplanting', prompt: 'Is it the optimal window to transplant paddy seedlings now?' },
    { title: '🌽 Maize Pest Control', prompt: 'How can I prevent Fall Armyworm infestation in maize?' },
    { title: '🌾 Wheat Heat Stress', prompt: 'How to protect wheat from terminal heat stress?' },
    { title: '🌼 Mustard Sowing', prompt: 'What is the optimal sowing and fertilizer advice for mustard?' },
    { title: '🥣 Pulses Drainage', prompt: 'How to ensure proper drainage in Arhar and Urad pulses?' },
    { title: '⚠️ False-Onset Risk', prompt: 'Why is there a false-onset risk and should I delay sowing?' },
    { title: '☀️ Break-Monsoon Duration', prompt: 'When is the monsoon break expected and how long will it last?' },
    { title: '🚨 Heavy Rain Precautions', prompt: 'What precautions should be taken for excessive rainfall?' },
    { title: '🌊 Monsoon Phase', prompt: 'What is the current southwest monsoon stage?' },
    { title: '🌱 Soil Moisture', prompt: 'What is the surface soil moisture saturation level?' },
    { title: '🌡️ Live Weather Parameters', prompt: 'What are the current temperature, humidity, and wind speed?' },
  ];

  return (

    <div className="main-content">
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ background: 'linear-gradient(135deg, #059669, #0284c7, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800, margin: 0 }}>
          🤖 {lang === 'hi' ? 'VarshaNetra AI निर्णय-सहायता सलाहकार' : 'VarshaNetra AI Decision-Support System'}
        </h2>
        <p className="text-muted text-sm" style={{ marginTop: '0.2rem' }}>
          📍 {location.display_name} • {lang === 'hi' ? 'लाइव वेदर स्टेशन, 10-वर्षीय LightGBM मॉडल व फसल भौतिकी पर आधारित' : 'Grounded on live Open-Meteo telemetry, 10-Yr ML models, and crop phenology'}
        </p>
      </div>

      <div className="grid-1-2" style={{ gap: '1rem' }}>
        {/* Left Column: Live Context & 15 Hero Quick Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Live Context Telemetry Card */}
          <div className="card" style={{ background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)', padding: '1rem' }}>
            <div className="card-header" style={{ marginBottom: '0.6rem' }}>
              <span className="card-title" style={{ fontSize: '0.9rem', fontWeight: 800 }}>📍 {lang === 'hi' ? 'लाइव टेलीमेट्री संदर्भ' : 'Live Telemetry Context'}</span>
              <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Grounded</span>
            </div>
            <p className="text-sm font-bold mb-1" style={{ color: '#f1f5f9' }}>{location.display_name}</p>
            {weatherSnapshot && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: '#94a3b8' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>🌡️ {tr('temperature')}:</span>
                  <strong>{weatherSnapshot.temperature_c}°C</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>💧 {tr('humidity')}:</span>
                  <strong>{weatherSnapshot.humidity_pct}%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>💨 Wind Speed:</span>
                  <strong>{weatherSnapshot.wind_speed_kmh ?? 14} km/h</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>🌱 {tr('soil_moisture')}:</span>
                  <strong>{weatherSnapshot.soil_moisture_0_1cm ?? 0.28} m³/m³</strong>
                </div>
              </div>
            )}
          </div>

          {/* Quick Decision Questions Card */}
          <div className="card" style={{ background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)', padding: '1rem', maxHeight: '440px', overflowY: 'auto' }}>
            <div className="card-header" style={{ marginBottom: '0.6rem' }}>
              <span className="card-title" style={{ fontSize: '0.9rem', fontWeight: 800 }}>💡 {lang === 'hi' ? 'त्वरित निर्णय प्रश्न (15+ विषय)' : 'Decision-Support Quick Prompts'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => send(s.prompt)}
                  disabled={loading}
                  style={{
                    textAlign: 'left',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: '10px',
                    padding: '0.5rem 0.7rem',
                    color: '#f1f5f9',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0284c7'; e.currentTarget.style.background = '#f0f9ff'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}
                >
                  <div style={{ fontWeight: 700, color: '#0369a1', marginBottom: 2 }}>{s.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>"{s.prompt}"</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Full Conversation Window */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '620px', background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)', padding: '1rem' }}>
          <div className="card-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="card-title" style={{ fontSize: '1rem', fontWeight: 800 }}>💬 {lang === 'hi' ? 'वार्तालाप कक्ष' : 'Decision Intelligence Dialogue'}</span>
              <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>6-Stage Grounding</span>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
              onClick={() => setMsgs([{
                id: 'reset',
                role: 'bot',
                text: lang === 'hi' ? 'बातचीत रीसेट हो गई है। आप अपनी फसल या मौसम के बारे में पूछ सकते हैं।' : 'Chat reset. Ask any question regarding your crops, monsoon status, or weather operations.'
              }])}
            >
              ↺ {lang === 'hi' ? 'रीसेट' : 'Clear Chat'}
            </button>
          </div>

          <div className="chat-messages" style={{ flex: 1, padding: '0.8rem', overflowY: 'auto' }}>
            {msgs.map((m, i) => (
              <div key={m.id || i} className={`chat-msg ${m.role}`} style={{ marginBottom: '1rem' }}>
                {m.role === 'bot' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>
                      🤖 VarshaNetra AI {m.intent ? `• Intent: ${m.intent}` : ''} {m.crop ? `• Crop: ${m.crop}` : ''}
                    </span>
                    {m.question && (
                      <button
                        onClick={() => send(null, true, m.question)}
                        disabled={loading}
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.09)',
                          borderRadius: '6px',
                          padding: '0.15rem 0.5rem',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          color: '#0284c7',
                          cursor: 'pointer',
                        }}
                        title="Regenerate alternative structured explanation"
                      >
                        🔄 {lang === 'hi' ? 'उत्तर पुनः उत्पन्न करें' : 'Regenerate Answer'}
                      </button>
                    )}
                  </div>
                )}
                <div
                  className="chat-bubble"
                  style={{
                    fontSize: '0.86rem',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-line',
                    background: m.role === 'user' ? 'linear-gradient(135deg, #0284c7, #0369a1)' : '#f8fafc',
                    color: m.role === 'user' ? '#ffffff' : '#0f172a',
                    border: m.role === 'user' ? 'none' : '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: m.text
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br/>')
                  }}
                />
              </div>
            ))}
            {loading && (
              <div className="chat-msg bot">
                <div className="chat-bubble" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', color: '#94a3b8', fontSize: '0.82rem', padding: '0.6rem 0.9rem', borderRadius: '10px' }}>
                  ⏳ {lang === 'hi' ? 'लाइव मौसम व 10-वर्षीय मॉडल से डेटा विश्लेषित हो रहा है...' : 'Evaluating live weather telemetry and 10-year ML models...'}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-row" style={{ padding: '0.6rem 0 0', display: 'flex', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <input
              className="input"
              placeholder={lang === 'hi' ? 'यहाँ अपना प्रश्न पूछें (English, हिन्दी या Hinglish)...' : 'Ask in English, Hindi, or Hinglish (e.g., Heavy rain tomorrow cotton action?)...'}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              style={{ flex: 1, fontSize: '0.88rem', padding: '0.55rem 0.85rem', borderRadius: '10px' }}
            />
            <button className="btn btn-primary" onClick={() => send()} disabled={loading || !input.trim()} style={{ padding: '0.55rem 1.2rem', fontWeight: 700, borderRadius: '10px' }}>
              {lang === 'hi' ? 'पूछें 🚀' : 'Send 🚀'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
