import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import { getUserActiveSession, appendMessageToSession } from '../../utils/chatStorage';

export default function FloatingChatWidget() {
  const { lang, location, user, isChatOpen: isOpen, setIsChatOpen: setIsOpen } = useApp();
  const sessionIdRef = React.useRef(null);
  const [activeCategory, setActiveCategory] = useState('crops');
  
  const userId = user?.userId || user?.email || 'farmer@varshanetra.ai';

  const getWelcomeMessage = (l, loc) => ({
    id: 'welcome',
    role: 'bot',
    text: l === 'hi'
      ? `नमस्ते! मैं **VarshaNetra AI** कृषि सलाहकार हूँ।\n\nआप मुझसे **${loc?.display_name || 'आपके क्षेत्र'}** के लिए कपास, सोयाबीन, धान, मक्का या गेहूं की फसल प्रबंधन, झूठी शुरुआत (False-Onset), सूखा विराम या वर्षा पूर्वानुमान के बारे में कुछ भी पूछ सकते हैं।`
      : `Hello! I am **VarshaNetra AI** Agricultural Decision Advisor.\n\nAsk me anything about Cotton, Soybean, Paddy, Maize, or Wheat management, False-Onset risks, dry breaks, or rainfall forecasts for **${loc?.display_name || 'your area'}**.`
  });

  const [msgs, setMsgs] = useState(() => {
    const activeSess = getUserActiveSession(userId);
    if (activeSess && Array.isArray(activeSess.messages) && activeSess.messages.length > 0) {
      return activeSess.messages;
    }
    return [getWelcomeMessage(lang, location)];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Synchronize active session strictly per authenticated user account
  useEffect(() => {
    const activeSess = getUserActiveSession(userId);
    if (activeSess && Array.isArray(activeSess.messages) && activeSess.messages.length > 0) {
      sessionIdRef.current = activeSess.id;
      setMsgs(activeSess.messages);
    } else {
      sessionIdRef.current = null;
      setMsgs([getWelcomeMessage(lang, location)]);
    }
  }, [userId]);

  // Scroll to bottom when new message arrives or widget opens
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [msgs, isOpen]);

  // Listen to cross-component chat storage updates for this specific user
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.detail?.userId && e.detail.userId.includes(userId.toLowerCase().replace(/[^a-z0-9_@.-]/g, '_'))) {
        const activeSess = getUserActiveSession(userId);
        if (activeSess && Array.isArray(activeSess.messages)) {
          sessionIdRef.current = activeSess.id;
          setMsgs(activeSess.messages);
        }
      }
    };
    window.addEventListener('varshanetra_chat_storage_change', handleStorageChange);
    return () => window.removeEventListener('varshanetra_chat_storage_change', handleStorageChange);
  }, [userId]);

  // Start a fresh conversation
  const handleNewChat = () => {
    sessionIdRef.current = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    setMsgs([getWelcomeMessage(lang, location)]);
  };

  const send = async (msgText, isRegenerate = false, prevQuestion = null) => {
    const textToSend = (msgText || input || prevQuestion || '').trim();
    if (!textToSend || loading) return;

    const userMsg = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toISOString(),
    };

    if (!isRegenerate) {
      setInput('');
      setMsgs(m => [...m, userMsg]);
      // Permanently persist user message to localStorage
      const updatedSess = appendMessageToSession(userId, userMsg, sessionIdRef.current);
      if (updatedSess) sessionIdRef.current = updatedSess.id;
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
        session_id: sessionIdRef.current,
        is_regenerate: isRegenerate,
        history: historyTurns,
      });

      const reply = lang === 'hi' ? (res.data?.reply_hi || res.data?.reply) : (res.data?.reply_en || res.data?.reply);
      const intent = res.data?.intent_detected || 'WHAT';
      const crop = res.data?.crop_detected || '';
      
      const botMsg = {
        id: reqId,
        role: 'bot',
        question: textToSend,
        text: reply || (lang === 'hi' ? 'सलाहकार से उत्तर प्राप्त हुआ।' : 'Decision advisory response generated.'),
        intent,
        crop,
        timestamp: new Date().toISOString(),
      };

      setMsgs(m => {
        const base = isRegenerate ? m.filter(msg => msg.id !== m[m.length - 1]?.id) : m;
        return [...base, botMsg];
      });

      // Permanently persist bot response to localStorage
      appendMessageToSession(userId, botMsg, sessionIdRef.current);

      // Auto-persist to Backend Database (fire-and-forget)
      try {
        const saveRes = await api.saveChatMessage(
          textToSend, reply || '', lang,
          sessionIdRef.current, intent, crop, ''
        );
        if (saveRes?.data?.session_id) {
          sessionIdRef.current = saveRes.data.session_id;
        }
      } catch {}
    } catch {
      const errMsg = {
        id: `err_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        role: 'bot',
        isError: true,
        question: textToSend,
        text: lang === 'hi'
          ? 'वर्तमान में उत्तर उत्पन्न करने में असमर्थ। कृपया पुनः प्रयास करें। (Unable to generate a response right now. Please try again.)'
          : 'Unable to generate a response right now. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMsgs(m => [...m, errMsg]);
      appendMessageToSession(userId, errMsg, sessionIdRef.current);
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
        'गेहूं में गर्मी के तनाव से कैसे बचें?',
        'सरसों की बुवाई का सही समय क्या है?',
        'दालों में जलभराव और फली छेदक कीट का नियंत्रण बताएं।',
      ],
    },
    monsoon: {
      label_en: '🌧️ Monsoon',
      label_hi: '🌧️ मानसून',
      questions_en: [
        'What is False-Onset risk?',
        'How to prepare for a dry break?',
        'Will rainfall exceed 25mm this week?',
        'What is the current monsoon phase?',
      ],
      questions_hi: [
        'झूठी शुरुआत (False-Onset) जोखिम क्या है?',
        'शुष्क विराम (ड्राई स्पेल) के लिए क्या तैयारी करें?',
        'क्या इस सप्ताह 25 मिमी से अधिक वर्षा होगी?',
        'वर्तमान मानसून चरण क्या है?',
      ],
    },
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '400px',
        maxWidth: 'calc(100vw - 32px)',
        height: '560px',
        maxHeight: 'calc(100vh - 100px)',
        background: '#0d131f',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '20px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 20px rgba(56, 189, 248, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9999,
        overflow: 'hidden',
        animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Top Header */}
      <div
        style={{
          padding: '0.85rem 1.1rem',
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0284c7 0%, #10b981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
            }}
          >
            🤖
          </div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>VarshaNetra AI</span>
              <span style={{ fontSize: '0.62rem', background: 'rgba(16, 185, 129, 0.25)', color: '#34d399', padding: '0.1rem 0.4rem', borderRadius: '999px', border: '1px solid #059669' }}>
                LIVE
              </span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
              🔒 {user?.name || userId} • {lang === 'hi' ? 'सुरक्षित व स्थायी चैट' : 'Encrypted & Permanent'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {/* New Chat Button */}
          <button
            type="button"
            onClick={handleNewChat}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              color: '#38bdf8',
              padding: '0.25rem 0.55rem',
              fontSize: '0.7rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
            title={lang === 'hi' ? 'नया वार्तालाप शुरू करें' : 'Start New Conversation'}
          >
            ➕ {lang === 'hi' ? 'नया चैट' : 'New'}
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '0.2rem',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Suggested Quick Question Tabs */}
      <div
        style={{
          padding: '0.5rem 0.8rem',
          background: 'rgba(0,0,0,0.2)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          gap: '0.4rem',
          overflowX: 'auto',
          flexWrap: 'nowrap',
          scrollbarWidth: 'none',
        }}
      >
        {Object.entries(QUESTION_CATEGORIES).map(([catKey, cat]) => (
          <button
            key={catKey}
            type="button"
            onClick={() => setActiveCategory(catKey)}
            style={{
              flexShrink: 0,
              whiteSpace: 'nowrap',
              background: activeCategory === catKey ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              border: activeCategory === catKey ? '1px solid #38bdf8' : '1px solid transparent',
              borderRadius: '999px',
              padding: '0.2rem 0.6rem',
              fontSize: '0.7rem',
              fontWeight: 700,
              color: activeCategory === catKey ? '#38bdf8' : '#94a3b8',
              cursor: 'pointer',
            }}
          >
            {lang === 'hi' ? cat.label_hi : cat.label_en}
          </button>
        ))}
      </div>

      {/* Suggested Questions Horizontal Carousel */}
      <div
        style={{
          padding: '0.45rem 0.8rem',
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          flexWrap: 'nowrap',
          alignItems: 'center',
          background: 'rgba(0,0,0,0.25)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {(lang === 'hi' ? QUESTION_CATEGORIES[activeCategory].questions_hi : QUESTION_CATEGORIES[activeCategory].questions_en).map((q, i) => (
          <button
            key={i}
            type="button"
            onClick={() => send(q)}
            disabled={loading}
            style={{
              flexShrink: 0,
              whiteSpace: 'nowrap',
              fontSize: '0.7rem',
              lineHeight: 1.2,
              padding: '0.28rem 0.72rem',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#e2e8f0',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(56, 189, 248, 0.18)';
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)';
              e.currentTarget.style.color = '#38bdf8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.color = '#e2e8f0';
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll Body */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem',
        }}
      >
        {msgs.map((m, idx) => (
          <div
            key={m.id || idx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: m.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '85%',
                padding: '0.65rem 0.9rem',
                borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: m.role === 'user'
                  ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
                  : m.isError
                  ? 'rgba(239, 68, 68, 0.2)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: m.isError ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.08)',
                color: '#f8fafc',
                fontSize: '0.8rem',
                lineHeight: 1.45,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {m.text}
            </div>

            {m.timestamp && (
              <span style={{ fontSize: '0.62rem', color: '#64748b', marginTop: '0.2rem', padding: '0 0.3rem' }}>
                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '0.78rem' }}>
            <span style={{ animation: 'spin 1s linear infinite' }}>🔄</span>
            <span>{lang === 'hi' ? 'VarshaNetra AI उत्तर तैयार कर रहा है...' : 'Generating agricultural response...'}</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        style={{
          padding: '0.75rem 0.9rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(10, 15, 26, 0.95)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={lang === 'hi' ? 'मौसम, फसल या वर्षा जोखिम पूछें...' : 'Ask about rainfall, crops, or dry break...'}
          disabled={loading}
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '999px',
            padding: '0.5rem 0.9rem',
            color: '#f8fafc',
            fontSize: '0.8rem',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            background: loading || !input.trim() ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #0284c7 0%, #10b981 100%)',
            border: 'none',
            borderRadius: '999px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
          }}
        >
          ➤
        </button>
      </form>
    </div>
  );
}
