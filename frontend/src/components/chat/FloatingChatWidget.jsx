import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

export default function FloatingChatWidget() {
  const { lang, location, tr } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      role: 'bot',
      text: lang === 'hi'
        ? `नमस्ते! मैं **VarshaNetra AI** हूँ।\n\nआप मुझसे ${location.display_name} के लिए वर्षा पूर्वानुमान, फसल सलाह या मौसम के बारे में कुछ भी पूछ सकते हैं।`
        : `Hello! I am **VarshaNetra AI**.\n\nAsk me anything about rainfall forecasts, crop advice, or weather conditions for **${location.display_name}**.`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [msgs, isOpen]);

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
        intent: res.data.intent_detected
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

  const QUICK_PROMPTS = lang === 'hi' ? [
    'क्या आज बारिश होगी?',
    'मानसून कब तक आएगा?',
    'कौन सी फसल उपयुक्त है?',
    'तापमान और आर्द्रता क्या है?'
  ] : [
    'Will it rain today?',
    'Monsoon progress update?',
    'Best crop to sow now?',
    'Current weather summary'
  ];

  return (
    <>
      {/* Floating Button / Toggle Trigger in Bottom-Right */}
      <button
        onClick={() => setIsOpen(o => !o)}
        aria-label="Toggle AI Chatbot"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: isOpen ? '12px 18px' : '14px 22px',
          background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '999px',
          boxShadow: '0 8px 30px rgba(99, 102, 241, 0.45), 0 0 20px rgba(56, 189, 248, 0.35)',
          cursor: 'pointer',
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 700,
          fontSize: '0.92rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateY(0)',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
      >
        <span style={{ fontSize: '1.4rem', filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.6))' }}>
          {isOpen ? '✕' : '🤖'}
        </span>
        <span>{isOpen ? (lang === 'hi' ? 'चैट बंद करें' : 'Close AI') : (lang === 'hi' ? 'VarshaNetra AI' : 'Ask AI Assistant')}</span>
        {!isOpen && (
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#34d399',
            boxShadow: '0 0 8px #34d399',
            animation: 'pulse-dot 2s infinite'
          }} />
        )}
      </button>

      {/* Floating Chat Modal Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '88px',
            right: '24px',
            width: 'min(420px, calc(100vw - 32px))',
            height: 'min(580px, calc(100vh - 120px))',
            zIndex: 9998,
            background: 'rgba(10, 15, 33, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(129, 140, 248, 0.35)',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 35px rgba(56,189,248,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'msg-in 0.25s ease'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '1rem 1.2rem',
            background: 'linear-gradient(135deg, rgba(30, 58, 95, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.4rem' }}>🤖</span>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#f0f4ff' }}>VarshaNetra AI</h4>
                <span className="text-xs text-muted">📍 {location.display_name}</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          {/* Quick Prompts */}
          <div style={{
            padding: '0.5rem 0.8rem',
            background: 'rgba(255,255,255,0.02)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            gap: '0.35rem',
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }}>
            {QUICK_PROMPTS.map((q, i) => (
              <button
                key={i}
                onClick={() => send(q)}
                style={{
                  flexShrink: 0,
                  background: 'rgba(56,189,248,0.08)',
                  border: '1px solid rgba(56,189,248,0.2)',
                  borderRadius: '999px',
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.7rem',
                  color: 'var(--accent-blue)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="chat-messages" style={{ flex: 1, padding: '0.85rem' }}>
            {msgs.map((m, idx) => (
              <div key={idx} className={`chat-msg ${m.role}`}>
                {m.role === 'bot' && (
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginBottom: '0.15rem', display: 'block' }}>
                    🤖 VarshaNetra AI {m.intent ? `• ${m.intent}` : ''}
                  </span>
                )}
                <div
                  className="chat-bubble"
                  style={{ fontSize: '0.82rem', lineHeight: 1.5, whiteSpace: 'pre-line' }}
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
                <div className="chat-bubble text-muted" style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', fontSize: '0.78rem' }}>
                  <span>{lang === 'hi' ? 'सोच रहा है' : 'Thinking'}</span>
                  <span style={{ animation: 'pulse-dot 0.8s infinite 0s' }}>•</span>
                  <span style={{ animation: 'pulse-dot 0.8s infinite 0.2s' }}>•</span>
                  <span style={{ animation: 'pulse-dot 0.8s infinite 0.4s' }}>•</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input Bar */}
          <div className="chat-input-row" style={{ padding: '0.65rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <input
              className="input"
              placeholder={lang === 'hi' ? 'पूछें...' : 'Ask AI anything...'}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              style={{ flex: 1, fontSize: '0.84rem', padding: '0.45rem 0.75rem' }}
            />
            <button className="btn btn-primary btn-sm" onClick={() => send()} disabled={loading || !input.trim()}>
              {lang === 'hi' ? 'भेजें' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
