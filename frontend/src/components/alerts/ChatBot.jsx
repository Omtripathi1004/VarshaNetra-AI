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

  const send = async (msgText, isRegenerate = false, prevQuestion = null) => {
    const textToSend = typeof msgText === 'string' ? msgText.trim() : (prevQuestion || input.trim());
    if (!textToSend || loading) return;
    
    if (!isRegenerate) {
      setInput('');
      setMsgs(m => [...m, { id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`, role: 'user', text: textToSend }]);
    }
    setLoading(true);

    try {
      const loc = { lat: location?.lat, lon: location?.lon, state: location?.state, district: location?.district };
      const reqId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const historyTurns = msgs
        .filter(m => m.text && !m.isError && m.text !== msgs[0]?.text)
        .slice(-6)
        .map(m => ({ role: m.role, text: m.text }));

      const res = await api.chat(textToSend, lang, loc, {
        request_id: reqId,
        is_regenerate: isRegenerate,
        history: historyTurns,
      });

      const reply = lang === 'hi' ? (res.data?.reply_hi || res.data?.reply) : (res.data?.reply_en || res.data?.reply);
      setMsgs(m => {
        const base = isRegenerate ? m.filter(msg => msg.id !== m[m.length - 1]?.id) : m;
        return [...base, {
          id: reqId,
          role: 'bot',
          question: textToSend,
          text: reply || (lang === 'hi' ? 'सलाहकार से उत्तर प्राप्त हुआ।' : 'Decision advisory response generated.'),
          intent: res.data?.intent_detected || 'WHAT',
        }];
      });
    } catch {
      setMsgs(m => [...m, {
        id: `err_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        role: 'bot',
        isError: true,
        question: textToSend,
        text: lang === 'hi'
          ? 'वर्तमान में उत्तर उत्पन्न करने में असमर्थ। कृपया पुनः प्रयास करें। (Unable to generate a response right now. Please try again.)'
          : 'Unable to generate a response right now. Please try again.'
      }]);
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600 }}>
                    🤖 VarshaNetra AI {m.intent ? `· ${m.intent.toUpperCase()}` : ''}
                  </span>
                  {m.question && (
                    <button
                      onClick={() => send(null, true, m.question)}
                      disabled={loading}
                      style={{
                        background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '4px',
                        padding: '0.1rem 0.35rem', fontSize: '0.62rem', fontWeight: 700,
                        color: '#0284c7', cursor: 'pointer',
                      }}
                      title="Regenerate answer"
                    >
                      🔄 {lang === 'hi' ? 'पुनः' : 'Retry'}
                    </button>
                  )}
                </div>
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
