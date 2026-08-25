import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

export default function ChatBotPanel() {
  const { lang, location, tr } = useApp();
  const [msgs, setMsgs] = useState([
    {
      role: 'bot',
      text: lang === 'hi'
        ? 'नमस्ते! मैं VarshaNetra AI हूँ। कपास, सोयाबीन, धान, मक्का या गेहूं की बुवाई, सिंचाई, झूठी शुरुआत (False-Onset) या मौसम के बारे में पूछें।'
        : 'Hello! I am VarshaNetra AI. Ask me about Cotton, Soybean, Paddy, Maize, Wheat advisory, False-Onset risk, dry break, or weather.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  const send = async (msgText) => {
    const textToSend = typeof msgText === 'string' ? msgText : input.trim();
    if (!textToSend || loading) return;
    setInput('');
    setMsgs(m => [...m, { role: 'user', text: textToSend }]);
    setLoading(true);

    try {
      const loc = { lat: location?.lat, lon: location?.lon, state: location?.state, district: location?.district };
      const res = await api.chat(textToSend, lang, loc);
      const reply = lang === 'hi' ? (res.data.reply_hi || res.data.reply) : (res.data.reply_en || res.data.reply);
      setMsgs(m => [...m, { role: 'bot', text: reply, intent: res.data.intent_detected }]);
    } catch {
      setMsgs(m => [...m, { role: 'bot', text: 'Connection error. Please ensure the backend is running.' }]);
    }
    setLoading(false);
  };

  const QUICK_CROPS = lang === 'hi'
    ? [
        'कपास को जलभराव से कैसे बचाएं?',
        'सोयाबीन में सूखा विराम प्रबंधन?',
        'धान रोपाई का सही समय?',
        'झूठी शुरुआत (False Onset) जोखिम?',
        'मक्का में कीट नियंत्रण?',
        'आज वर्षा का पूर्वानुमान?',
      ]
    : [
        'How to protect Cotton from heavy rain?',
        'Soybean dry spell management?',
        'Paddy transplanting timing?',
        'False-Onset risk guidance?',
        'Maize pest prevention?',
        'Rainfall forecast today?',
      ];

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <span className="card-title">🤖 VarshaNetra AI Agricultural Chat</span>
        <span className="badge badge-success">Live Climate Aligned</span>
      </div>

      {/* Quick crop prompts */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
        {QUICK_CROPS.map(q => (
          <button
            key={q}
            onClick={() => send(q)}
            style={{
              background: 'rgba(5, 150, 105, 0.08)',
              border: '1px solid #bbf7d0',
              borderRadius: '999px',
              padding: '0.28rem 0.75rem',
              fontSize: '0.74rem',
              color: '#059669',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {q}
          </button>
        ))}
      </div>

      <div className="chat-container" style={{ flex: 1, minHeight: '380px', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '10px' }}>
        <div className="chat-messages" style={{ background: 'rgba(255,255,255,0.03)' }}>
          {msgs.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`}>
              {m.role === 'bot' && (
                <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginBottom: '0.2rem', display: 'block', fontWeight: 600 }}>
                  🤖 VarshaNetra AI {m.intent ? `· ${m.intent.toUpperCase()}` : ''}
                </span>
              )}
              <div
                className="chat-bubble"
                dangerouslySetInnerHTML={{
                  __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
                }}
              />
            </div>
          ))}
          {loading && (
            <div className="chat-msg bot">
              <div className="chat-bubble" style={{ background: 'rgba(18, 14, 40, 0.72)', color: '#94a3b8', fontSize: '0.8rem' }}>
                <span>Analyzing data...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="chat-input-row" style={{ padding: '0.65rem', background: 'rgba(18, 14, 40, 0.72)' }}>
          <input
            className="input"
            placeholder={lang === 'hi' ? 'फसल, कीट या मौसम संबंधी प्रश्न पूछें...' : 'Ask about cotton, soybean, false-onset, irrigation...'}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send(input)}
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary btn-sm" onClick={() => send(input)} disabled={loading || !input.trim()}>
            {lang === 'hi' ? 'भेजें' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
