import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

export default function FloatingChatWidget() {
  const { lang, location, tr, isChatOpen: isOpen, setIsChatOpen: setIsOpen } = useApp();
  const [activeCategory, setActiveCategory] = useState('crops');
  const [msgs, setMsgs] = useState([
    {
      role: 'bot',
      text: lang === 'hi'
        ? `नमस्ते! मैं **VarshaNetra AI** कृषि सलाहकार हूँ।\n\nआप मुझसे **${location?.display_name || 'आपके क्षेत्र'}** के लिए कपास, सोयाबीन, धान, मक्का या गेहूं की फसल प्रबंधन, झूठी शुरुआत (False-Onset), सूखा विराम या वर्षा पूर्वानुमान के बारे में कुछ भी पूछ सकते हैं।`
        : `Hello! I am **VarshaNetra AI** Agricultural Decision Advisor.\n\nAsk me anything about Cotton, Soybean, Paddy, Maize, or Wheat management, False-Onset risks, dry breaks, or rainfall forecasts for **${location?.display_name || 'your area'}**.`
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

  const send = async (msgText, isRegenerate = false, prevQuestion = null) => {
    const textToSend = (msgText || input || prevQuestion || '').trim();
    if (!textToSend || loading) return;

    if (!isRegenerate) {
      setInput('');
      setMsgs(m => [...m, { id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`, role: 'user', text: textToSend }]);
    }
    setLoading(true);

    try {
      const loc = { lat: location?.lat, lon: location?.lon, state: location?.state, district: location?.district };
      const reqId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Build clean conversation history (last 6 turns, omitting errors)
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


  const QUESTION_CATEGORIES = {
    crops: {
      label_en: '🌾 Crops',
      label_hi: '🌾 फसलें',
      questions_en: [
        'How to protect Cotton from heavy rain?',
        'What to do for Soybean during dry break?',
        'Is it the right time for Paddy transplanting?',
        'How to prevent pests in Maize?',
        'Wheat heat stress mitigation tips',
        'Mustard sowing date and seed rate?',
        'Pulses drainage and pod borer control?',
      ],
      questions_hi: [
        'कपास को भारी बारिश में जलभराव से कैसे बचाएं?',
        'सोयाबीन में सूखे/विराम के समय क्या करें?',
        'क्या धान की रोपाई का यह सही समय है?',
        'मक्का में फॉल आर्मीवर्म कीट कैसे रोकें?',
        'गेहूं में तापमान बढ़ने पर क्या उपाय करें?',
        'सरसों की बुवाई का समय और बीज दर?',
        'दालों में जल निकासी और फली छेदक नियंत्रण?',
      ]
    },
    monsoon: {
      label_en: '🌊 Monsoon & Risks',
      label_hi: '🌊 मानसून व जोखिम',
      questions_en: [
        'What should I do during high False-Onset risk?',
        'How long will the break-monsoon last?',
        'Heavy rainfall precautions for fields?',
        'When is sustained monsoon expected?',
      ],
      questions_hi: [
        'झूठी शुरुआत (False-Onset) होने पर क्या करें?',
        'मानसून विराम (Dry Spell) कितने दिन चलेगा?',
        'भारी वर्षा में खेत की सुरक्षा के उपाय?',
        'स्थिर मानसूनी वर्षा कब शुरू होगी?',
      ]
    },
    weather: {
      label_en: '🌦️ Weather & Climate',
      label_hi: '🌦️ मौसम व जलवायु',
      questions_en: [
        'Will it rain today at my location?',
        'Explain ENSO and IOD effect on monsoon',
        'Current soil moisture and temperature?',
      ],
      questions_hi: [
        'क्या आज मेरे क्षेत्र में बारिश होगी?',
        'अल नीनो (ENSO) और IOD का मानसून पर असर?',
        'वर्तमान मिट्टी की नमी और तापमान कैसा है?',
      ]
    }
  };

  const currentCategoryObj = QUESTION_CATEGORIES[activeCategory] || QUESTION_CATEGORIES.crops;
  const quickList = lang === 'hi' ? currentCategoryObj.questions_hi : currentCategoryObj.questions_en;

  return (
    <>
      {/* Floating Chat Modal Panel at TOP RIGHT, positioning relative to the header */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: '76px',
            right: '20px',
            width: 'min(440px, calc(100vw - 40px))',
            height: 'min(620px, calc(100vh - 100px))',
            zIndex: 9998,
            background: 'rgba(18, 14, 40, 0.72)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: '16px',
            boxShadow: '0 16px 40px rgba(15, 23, 42, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '0.9rem 1.1rem',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.09)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.4rem' }}>🌱</span>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#f1f5f9', fontWeight: 700 }}>
                  VarshaNetra AI Crop Advisor
                </h4>
                <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>
                  📍 {location?.display_name || 'Local Agro-Climatic Zone'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ✕
            </button>
          </div>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.09)',
            padding: '0.35rem 0.6rem',
            gap: '0.4rem',
          }}>
            {Object.keys(QUESTION_CATEGORIES).map(catKey => {
              const cat = QUESTION_CATEGORIES[catKey];
              const isAct = activeCategory === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setActiveCategory(catKey)}
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '999px',
                    border: '1px solid',
                    borderColor: isAct ? '#059669' : '#cbd5e1',
                    background: isAct ? '#059669' : '#ffffff',
                    color: isAct ? '#ffffff' : '#475569',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {lang === 'hi' ? cat.label_hi : cat.label_en}
                </button>
              );
            })}
          </div>

          {/* Quick Prompts Chips for Active Category */}
          <div style={{
            padding: '0.45rem 0.75rem',
            background: 'rgba(18, 14, 40, 0.72)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            gap: '0.35rem',
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }}>
            {quickList.map((q, i) => (
              <button
                key={i}
                onClick={() => send(q)}
                style={{
                  flexShrink: 0,
                  background: 'rgba(5, 150, 105, 0.08)',
                  border: '1px solid #bbf7d0',
                  borderRadius: '999px',
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.71rem',
                  color: '#047857',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontWeight: 500,
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="chat-messages" style={{ flex: 1, padding: '0.85rem', background: 'rgba(255,255,255,0.03)' }}>
            {msgs.map((m, idx) => (
              <div key={idx} className={`chat-msg ${m.role}`}>
                {m.role === 'bot' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600 }}>
                      🤖 VarshaNetra AI {m.intent ? `• ${m.intent.toUpperCase()}` : ''}
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
                  style={{
                    fontSize: '0.84rem',
                    lineHeight: 1.55,
                    whiteSpace: 'pre-line',
                    background: m.role === 'user' ? '#0284c7' : '#ffffff',
                    color: m.role === 'user' ? '#ffffff' : '#0f172a',
                    border: m.role === 'user' ? 'none' : '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
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
                <div className="chat-bubble" style={{ background: 'rgba(18, 14, 40, 0.72)', border: '1px solid rgba(255,255,255,0.09)', color: '#94a3b8', fontSize: '0.8rem' }}>
                  <span>{lang === 'hi' ? 'कृषि डेटा विश्लेषण हो रहा है...' : 'Analyzing crop & weather data...'}</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input Bar */}
          <div className="chat-input-row" style={{ padding: '0.65rem', background: 'rgba(18, 14, 40, 0.72)', borderTop: '1px solid rgba(255,255,255,0.09)' }}>
            <input
              className="input"
              placeholder={lang === 'hi' ? 'फसल, कीट या मौसम संबंधी प्रश्न पूछें...' : 'Ask about cotton, soybean, false-onset, irrigation...'}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              style={{ flex: 1, fontSize: '0.84rem', padding: '0.45rem 0.75rem' }}
            />
            <button className="btn btn-primary btn-sm" onClick={() => send()} disabled={loading || !input.trim()}>
              {lang === 'hi' ? 'पूछें' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
