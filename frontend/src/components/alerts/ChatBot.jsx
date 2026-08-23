import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

export default function ChatBotPanel() {
  const { lang, location, tr } = useApp();
  const [msgs, setMsgs] = useState([
    { role: 'bot', text: lang === 'hi'
      ? 'नमस्ते! मैं VarshaNetra AI हूँ। मानसून, वर्षा, फसल या मौसम के बारे में पूछें।'
      : 'Hello! I am VarshaNetra AI. Ask me about monsoon, rainfall, crops, or weather conditions.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMsgs(m => [...m, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const loc = { lat: location.lat, lon: location.lon };
      const res = await api.chat(userMsg, lang, loc);
      const reply = lang === 'hi' ? res.data.reply_hi : res.data.reply_en;
      setMsgs(m => [...m, { role: 'bot', text: reply, intent: res.data.intent_detected }]);
    } catch {
      setMsgs(m => [...m, { role: 'bot', text: 'Connection error. Please ensure the backend is running.' }]);
    }
    setLoading(false);
  };

  const QUICK = lang === 'hi'
    ? ['आज वर्षा होगी?', 'मानसून कब आएगा?', 'कौन सी फसल बोएं?', 'मौसम कैसा है?']
    : ['Will it rain today?', 'When will monsoon arrive?', 'What crop should I sow?', 'Current weather?'];

  return (
    <div className="card" style={{ height: '100%' }}>
      <div className="card-header">
        <span className="card-title">🤖 VarshaNetra AI Chat</span>
        <span className="badge badge-success">Live Data Grounded</span>
      </div>

      {/* Quick prompts */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
        {QUICK.map(q => (
          <button key={q}
            onClick={() => { setInput(q); }}
            style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-pill)',
              padding: '0.25rem 0.7rem', fontSize: '0.72rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            {q}
          </button>
        ))}
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {msgs.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`}>
              {m.role === 'bot' && <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.2rem', display: 'block' }}>
                🤖 VarshaNetra AI {m.intent ? `· ${m.intent}` : ''}
              </span>}
              <div className="chat-bubble" dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          ))}
          {loading && (
            <div className="chat-msg bot">
              <div className="chat-bubble text-muted" style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                <span>Thinking</span>
                <span style={{ animation: 'pulse-dot 0.8s infinite 0s' }}>·</span>
                <span style={{ animation: 'pulse-dot 0.8s infinite 0.2s' }}>·</span>
                <span style={{ animation: 'pulse-dot 0.8s infinite 0.4s' }}>·</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="chat-input-row">
          <input
            className="input"
            placeholder={lang === 'hi' ? 'यहाँ टाइप करें...' : 'Type your question in English or हिन्दी...'}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary btn-sm" onClick={send} disabled={loading || !input.trim()}>
            {lang === 'hi' ? 'भेजें' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
