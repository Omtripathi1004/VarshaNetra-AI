import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

export default function FloatingChatWidget() {
  const { lang, location, tr } = useApp();
  const [isOpen, setIsOpen] = useState(false);
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

  const send = async (msgText) => {
    const textToSend = msgText || input.trim();
    if (!textToSend || loading) return;
    setInput('');
    setMsgs(m => [...m, { role: 'user', text: textToSend }]);
    setLoading(true);

    try {
      const loc = { lat: location?.lat, lon: location?.lon, state: location?.state, district: location?.district };
      const res = await api.chat(textToSend, lang, loc);
      const reply = lang === 'hi' ? (res.data.reply_hi || res.data.reply) : (res.data.reply_en || res.data.reply);
      setMsgs(m => [...m, {
        role: 'bot',
        text: reply,
        intent: res.data.intent_detected
      }]);
    } catch {
      setMsgs(m => [...m, {
        role: 'bot',
        text: lang === 'hi'
          ? 'सर्वर से संपर्क करने में असमर्थ। कृपया पुनः प्रयास करें।'
          : 'Unable to reach the server. Please try again.'
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
          background: 'linear-gradient(135deg, #059669 0%, #0284c7 100%)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: '999px',
          boxShadow: '0 8px 24px rgba(5, 150, 105, 0.35)',
          cursor: 'pointer',
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 700,
          fontSize: '0.92rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
      >
        <span style={{ fontSize: '1.3rem' }}>{isOpen ? '✕' : '🤖'}</span>
        <span>{isOpen ? (lang === 'hi' ? 'सलाहकार बंद करें' : 'Close AI') : (lang === 'hi' ? 'VarshaNetra AI सलाह' : 'Ask Crop Advisor')}</span>
        {!isOpen && (
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#34d399', boxShadow: '0 0 6px #34d399'
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
            width: 'min(440px, calc(100vw - 32px))',
            height: 'min(600px, calc(100vh - 120px))',
            zIndex: 9998,
            background: '#ffffff',
            border: '1px solid #cbd5e1',
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
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.4rem' }}>🌱</span>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0f172a', fontWeight: 700 }}>
                  VarshaNetra AI Crop Advisor
                </h4>
                <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>
                  📍 {location?.display_name || 'Local Agro-Climatic Zone'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ✕
            </button>
          </div>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
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
            background: '#ffffff',
            borderBottom: '1px solid #f1f5f9',
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
                  background: '#f0fdf4',
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
          <div className="chat-messages" style={{ flex: 1, padding: '0.85rem', background: '#f8fafc' }}>
            {msgs.map((m, idx) => (
              <div key={idx} className={`chat-msg ${m.role}`}>
                {m.role === 'bot' && (
                  <span style={{ fontSize: '0.65rem', color: '#64748b', marginBottom: '0.2rem', display: 'block', fontWeight: 600 }}>
                    🤖 VarshaNetra AI {m.intent ? `• ${m.intent.toUpperCase()}` : ''}
                  </span>
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
                <div className="chat-bubble" style={{ background: '#ffffff', border: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.8rem' }}>
                  <span>{lang === 'hi' ? 'कृषि डेटा विश्लेषण हो रहा है...' : 'Analyzing crop & weather data...'}</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input Bar */}
          <div className="chat-input-row" style={{ padding: '0.65rem', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
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
