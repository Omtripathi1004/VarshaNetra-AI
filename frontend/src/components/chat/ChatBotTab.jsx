import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

export default function ChatBotTab() {
  const { lang, location, tr } = useApp();
  const [msgs, setMsgs] = useState([
    {
      role: 'bot',
      text: lang === 'hi'
        ? `नमस्ते! मैं **VarshaNetra AI** हूँ — आपका व्यक्तिगत मानसून और कृषि सलाहकार।\n\nआप मुझसे आपके स्थान (${location.display_name}) के लिए वर्षा पूर्वानुमान, मानसून की स्थिति, उपयुक्त फसलें, या वर्तमान मौसम के बारे में कुछ भी पूछ सकते हैं।`
        : `Hello! I am **VarshaNetra AI** — your real-time monsoon & agricultural intelligence assistant.\n\nYou can ask me about rainfall probability, monsoon phases, crop suitability, or current weather conditions for **${location.display_name}**.`
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

  const send = async (msgText) => {
    const textToSend = msgText || input.trim();
    if (!textToSend || loading) return;
    setInput('');
    setMsgs(m => [...m, { role: 'user', text: textToSend }]);
    setLoading(true);

    try {
      const loc = { lat: location.lat, lon: location.lon };
      const res = await api.chat(textToSend, lang, loc);
      const reply = lang === 'hi' ? res.data.reply_hi : res.data.reply_en;
      setMsgs(m => [...m, {
        role: 'bot',
        text: reply,
        intent: res.data.intent_detected,
        dataSource: res.data.data_source
      }]);
    } catch {
      setMsgs(m => [...m, {
        role: 'bot',
        text: lang === 'hi'
          ? 'सर्वर से संपर्क करने में असमर्थ। कृपया सुनिश्चित करें कि बैकएंड चल रहा है।'
          : 'Unable to reach the server. Please ensure the backend is running.'
      }]);
    }
    setLoading(false);
  };

  const SUGGESTIONS = lang === 'hi' ? [
    { title: '🌧️ वर्षा की संभावना', prompt: 'क्या आज बारिश होगी?' },
    { title: '🌊 मानसून स्थिति', prompt: 'मानसून की वर्तमान स्थिति क्या है?' },
    { title: '🌾 फसल की सलाह', prompt: 'मेरे खेत के लिए कौन सी फसल सबसे उपयुक्त है?' },
    { title: '🌡️ वर्तमान मौसम', prompt: 'अभी तापमान और आर्द्रता कितनी है?' },
    { title: '🚨 सक्रिय अलर्ट', prompt: 'क्या मेरे क्षेत्र में कोई भारी बारिश का अलर्ट है?' },
    { title: '🌱 बुवाई का समय', prompt: 'क्या अभी धान की बुवाई करना सुरक्षित है?' },
  ] : [
    { title: '🌧️ Rainfall Forecast', prompt: 'Will it rain today in my area?' },
    { title: '🌊 Monsoon Progress', prompt: 'What is the current monsoon phase and onset probability?' },
    { title: '🌾 Crop Recommendation', prompt: 'What is the best crop to sow right now based on weather?' },
    { title: '🌡️ Current Weather', prompt: 'What is the current temperature, humidity, and wind speed?' },
    { title: '🚨 Active Alerts', prompt: 'Are there any active weather or flood alerts here?' },
    { title: '🌱 Sowing Timing', prompt: 'Is it safe to begin sowing paddy right now?' },
  ];

  return (
    <div className="main-content">
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🤖 {lang === 'hi' ? 'VarshaNetra AI सहायक' : 'VarshaNetra AI Assistant'}
        </h2>
        <p className="text-muted text-sm">
          {lang === 'hi'
            ? 'Open-Meteo लाइव मौसम और LightGBM मशीन लर्निंग मॉडल से सीधे जुड़ा हुआ AI'
            : 'Grounded in real-time Open-Meteo weather observations and LightGBM predictive models'}
        </p>
      </div>

      <div className="grid-1-2" style={{ gap: '1rem' }}>
        {/* Left Side: Context & Suggestions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Live Context Card */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">📍 {lang === 'hi' ? 'लाइव संदर्भ' : 'Live Context'}</span>
              <span className="badge badge-success">Live Grounded</span>
            </div>
            <p className="text-sm font-bold mb-1">{location.display_name}</p>
            {weatherSnapshot && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>🌡️ {tr('temperature')}:</span>
                  <strong>{weatherSnapshot.temperature_c}°C</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>💧 {tr('humidity')}:</span>
                  <strong>{weatherSnapshot.humidity_pct}%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>☁️ {tr('cloud_cover')}:</span>
                  <strong>{weatherSnapshot.cloud_cover_pct}%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>🌱 {tr('soil_moisture')}:</span>
                  <strong>{weatherSnapshot.soil_moisture_0_1cm ?? 0.3} m³/m³</strong>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions Card */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">💡 {lang === 'hi' ? 'सुझाए गए प्रश्न' : 'Suggested Questions'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => send(s.prompt)}
                  disabled={loading}
                  style={{
                    textAlign: 'left',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.6rem 0.8rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                >
                  <div style={{ fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: 2 }}>{s.title}</div>
                  <div className="text-muted text-xs">"{s.prompt}"</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Full Chat Window */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '620px' }}>
          <div className="card-header">
            <span className="card-title">💬 {lang === 'hi' ? 'बातचीत' : 'Conversation'}</span>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setMsgs([{
                role: 'bot',
                text: lang === 'hi' ? 'बातचीत रीसेट हो गई है। आप क्या पूछना चाहते हैं?' : 'Chat reset. How can I help you today?'
              }])}
            >
              ↺ {lang === 'hi' ? 'रीसेट' : 'Clear Chat'}
            </button>
          </div>

          <div className="chat-messages" style={{ flex: 1, padding: '1rem' }}>
            {msgs.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                {m.role === 'bot' && (
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '0.2rem', display: 'block' }}>
                    🤖 VarshaNetra AI {m.intent ? `• Intent: ${m.intent}` : ''}
                  </span>
                )}
                <div
                  className="chat-bubble"
                  style={{ fontSize: '0.88rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}
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
                <div className="chat-bubble text-muted" style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <span>{lang === 'hi' ? 'विश्लेषण कर रहा है' : 'Analyzing live data'}</span>
                  <span style={{ animation: 'pulse-dot 0.8s infinite 0s' }}>•</span>
                  <span style={{ animation: 'pulse-dot 0.8s infinite 0.2s' }}>•</span>
                  <span style={{ animation: 'pulse-dot 0.8s infinite 0.4s' }}>•</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-row" style={{ padding: '0.85rem' }}>
            <input
              className="input"
              placeholder={lang === 'hi' ? 'यहाँ अपना प्रश्न लिखें (उदा. क्या आज बारिश होगी?)...' : 'Type your question in English or हिन्दी (e.g., will it rain today?)...'}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              style={{ flex: 1, fontSize: '0.9rem' }}
            />
            <button className="btn btn-primary" onClick={() => send()} disabled={loading || !input.trim()}>
              {lang === 'hi' ? 'पूछें 🚀' : 'Send 🚀'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
