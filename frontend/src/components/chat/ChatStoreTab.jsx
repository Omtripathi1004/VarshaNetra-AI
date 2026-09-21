import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import {
  getUserSessions,
  deleteUserSession,
  cleanUserKey,
  groupSessionsByDate,
  saveUserSession,
} from '../../utils/chatStorage';

const ACTION_LABELS = {
  PAGE_VIEW: { icon: '👁️', color: '#38bdf8', label_en: 'Page View', label_hi: 'पेज देखा' },
  CHAT_MESSAGE: { icon: '💬', color: '#10b981', label_en: 'Chat Message', label_hi: 'चैट संदेश' },
  CHAT_STARTED: { icon: '🚀', color: '#a855f7', label_en: 'Chat Started', label_hi: 'चैट शुरू हुई' },
  LOGIN: { icon: '🔐', color: '#f59e0b', label_en: 'Logged In', label_hi: 'लॉगिन किया' },
  LOGOUT: { icon: '🚪', color: '#64748b', label_en: 'Logged Out', label_hi: 'लॉगआउट किया' },
  PREDICTION_REQUEST: { icon: '🧠', color: '#8b5cf6', label_en: 'Prediction Run', label_hi: 'पूर्वानुमान चलाया' },
  WEATHER_LOOKUP: { icon: '🌧️', color: '#06b6d4', label_en: 'Weather Lookup', label_hi: 'मौसम देखा' },
  MAP_INTERACTION: { icon: '🗺️', color: '#f97316', label_en: 'Map Interaction', label_hi: 'मानचित्र इंटरेक्शन' },
  CROP_ANALYSIS: { icon: '🌾', color: '#34d399', label_en: 'Crop Analysis', label_hi: 'फसल विश्लेषण' },
};

function timeAgo(isoString) {
  if (!isoString) return '';
  const diffMs = Date.now() - new Date(isoString).getTime();
  const m = Math.floor(diffMs / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}

function formatDate(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function ChatStoreTab() {
  const { lang, user } = useApp();
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionMessages, setSessionMessages] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msgLoading, setMsgLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('sessions'); // 'sessions' | 'activity'
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const userId = user?.userId || user?.email || 'farmer@varshanetra.ai';

  const loadData = useCallback(async () => {
    setLoading(true);
    // 1. Load sandboxed local storage sessions for this authenticated user immediately
    const localSess = getUserSessions(userId);
    setSessions(localSess);

    // 2. Fetch server-persisted sessions and user activity for this specific user
    try {
      const [sessRes, actRes] = await Promise.allSettled([
        api.getChatSessions(100, userId),
        api.getUserActivity(50, userId),
      ]);

      if (sessRes.status === 'fulfilled' && Array.isArray(sessRes.value?.data?.sessions)) {
        const remoteSessions = sessRes.value.data.sessions;
        // Merge without duplicating IDs, prioritizing local detailed messages
        const mergedMap = new Map();
        localSess.forEach((s) => mergedMap.set(s.id, s));

        remoteSessions.forEach((rs) => {
          if (!mergedMap.has(rs.id)) {
            mergedMap.set(rs.id, rs);
            // Permanently save to localStorage so it never disappears on subsequent reloads
            saveUserSession(userId, rs);
          }
        });

        const combined = Array.from(mergedMap.values()).sort(
          (a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at)
        );
        setSessions(combined);
      }

      if (actRes.status === 'fulfilled') {
        setActivity(actRes.value?.data?.activity || []);
      }
    } catch (err) {
      console.warn('Remote chat sync fallback:', err);
    }
    setLoading(false);
  }, [userId]);

  // When user switches or logs in, immediately reset selected session and reload user data
  useEffect(() => {
    setSelectedSession(null);
    setSessionMessages([]);
    loadData();
  }, [userId, loadData]);

  // Listen for real-time chat storage changes from FloatingChatWidget or ChatBotTab
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.detail?.userId && e.detail.userId.includes(cleanUserKey(userId))) {
        loadData();
      }
    };
    window.addEventListener('varshanetra_chat_storage_change', handleStorageChange);
    return () => window.removeEventListener('varshanetra_chat_storage_change', handleStorageChange);
  }, [userId, loadData]);

  const openSession = async (session) => {
    setSelectedSession(session);
    setMsgLoading(true);

    // If session has cached messages locally, render them immediately
    if (Array.isArray(session.messages) && session.messages.length > 0) {
      setSessionMessages(session.messages);
      setMsgLoading(false);
      return;
    }

    // Otherwise fetch from backend API
    try {
      const res = await api.getChatSessionMessages(session.id);
      setSessionMessages(res?.data?.messages || []);
    } catch {
      setSessionMessages([]);
    }
    setMsgLoading(false);
  };

  const deleteSession = async (sessionId) => {
    // Delete from local persistent storage
    deleteUserSession(userId, sessionId);

    // Delete from backend database
    try {
      await api.deleteChatSession(sessionId);
    } catch {}

    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (selectedSession?.id === sessionId) {
      setSelectedSession(null);
      setSessionMessages([]);
    }
    setDeleteConfirm(null);
  };

  const filteredSessions = sessions.filter(
    (s) => !searchQuery || s.session_title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedSessions = groupSessionsByDate(filteredSessions, lang);

  return (
    <div className="main-content">
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(18,14,40,0.97), rgba(10,7,24,0.97))',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '16px',
          padding: '1.4rem 1.6rem',
          marginBottom: '1.5rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '1.5rem' }}>💬</span>
            <h2
              style={{
                margin: 0,
                fontSize: '1.35rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #a855f7, #38bdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {lang === 'hi' ? 'चैट स्टोर एवं स्थायी वार्तालाप इतिहास' : 'Chat Store & Permanent History'}
            </h2>
            <span style={{
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '999px',
              padding: '0.15rem 0.6rem',
              fontSize: '0.68rem',
              fontWeight: 800,
            }}>
              ChatGPT Timeline
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.83rem' }}>
            🔒 {lang === 'hi'
              ? `उपयोगकर्ता खाता: ${user?.name || userId} (${userId}) — सभी पिछले दिन व आज के वार्तालाप हमेशा सुरक्षित`
              : `Authenticated Account: ${user?.name || userId} (${userId}) — all past days and current conversations permanently preserved`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              background: 'rgba(168,85,247,0.15)',
              color: '#c084fc',
              border: '1px solid rgba(168,85,247,0.35)',
            }}
          >
            💬 {sessions.length} {lang === 'hi' ? 'वार्तालाप' : 'Conversations'}
          </span>
          <span
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              background: 'rgba(16,185,129,0.15)',
              color: '#34d399',
              border: '1px solid rgba(16,185,129,0.35)',
            }}
          >
            ⚡ {activity.length} {lang === 'hi' ? 'गतिविधियां' : 'Activities'}
          </span>
        </div>
      </div>

      {/* View Toggle + Search */}
      <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {[
          { id: 'sessions', icon: '💬', en: 'Conversations History', hi: 'वार्तालाप इतिहास' },
          { id: 'activity', icon: '⚡', en: 'Activity Log', hi: 'गतिविधि लॉग' },
        ].map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveView(v.id)}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '0.78rem',
              background: activeView === v.id ? 'linear-gradient(135deg, #a855f7, #06b6d4)' : 'rgba(255,255,255,0.05)',
              color: activeView === v.id ? '#fff' : '#94a3b8',
              border: '1px solid rgba(255,255,255,0.09)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {v.icon} {lang === 'hi' ? v.hi : v.en}
          </button>
        ))}

        {activeView === 'sessions' && (
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'hi' ? '🔍 वार्तालाप खोजें...' : '🔍 Search conversation history...'}
            style={{
              marginLeft: 'auto',
              padding: '0.4rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.78rem',
              background: 'rgba(14,11,30,0.85)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#f1f5f9',
              outline: 'none',
              minWidth: 220,
            }}
          />
        )}

        <button
          onClick={loadData}
          style={{
            padding: '0.4rem 0.85rem',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 700,
            background: 'rgba(56,189,248,0.1)',
            color: '#38bdf8',
            border: '1px solid rgba(56,189,248,0.3)',
            cursor: 'pointer',
          }}
        >
          🔄 {lang === 'hi' ? 'ताज़ा करें' : 'Refresh'}
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
          <div>{lang === 'hi' ? 'डेटा लोड हो रहा है...' : 'Loading your history...'}</div>
        </div>
      ) : activeView === 'sessions' ? (
        /* ── Sessions View (ChatGPT Timeline Style) ──────────────────────────── */
        <div style={{ display: 'grid', gridTemplateColumns: selectedSession ? '1fr 1.4fr' : '1fr', gap: '1.25rem' }}>
          {/* Session List with Timeline Grouping */}
          <div>
            {filteredSessions.length === 0 ? (
              <div
                style={{
                  background: 'rgba(18,14,40,0.72)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '14px',
                  padding: '2.5rem',
                  textAlign: 'center',
                  color: '#64748b',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💬</div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.3rem', color: '#94a3b8' }}>
                  {lang === 'hi' ? `कोई बातचीत नहीं मिली (${user?.name || userId})` : `No conversations found for ${user?.name || userId}`}
                </div>
                <div style={{ fontSize: '0.78rem' }}>
                  {lang === 'hi'
                    ? 'नीचे दाएँ कोने में AI सहायक से प्रश्न पूछें, यह यहाँ हमेशा सुरक्षित रहेगा।'
                    : 'Ask questions using the floating assistant widget at the bottom right. Your chats are permanently preserved here.'}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {Object.entries(groupedSessions).map(([bucketTitle, bucketList]) => (
                  <div key={bucketTitle}>
                    {/* ChatGPT Section Header */}
                    <div
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: '#38bdf8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        paddingBottom: '0.4rem',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        marginBottom: '0.65rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>📅 {bucketTitle}</span>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          background: 'rgba(56, 189, 248, 0.15)',
                          color: '#7dd3fc',
                          padding: '1px 7px',
                          borderRadius: '999px',
                        }}
                      >
                        {bucketList.length}
                      </span>
                    </div>

                    {/* Bucket Sessions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                      {bucketList.map((sess) => {
                        const isSelected = selectedSession?.id === sess.id;
                        return (
                          <div
                            key={sess.id}
                            onClick={() => openSession(sess)}
                            style={{
                              background: isSelected ? 'rgba(168,85,247,0.2)' : 'rgba(18,14,40,0.68)',
                              border: isSelected ? '1.5px solid #a855f7' : '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '12px',
                              padding: '0.85rem 1rem',
                              cursor: 'pointer',
                              transition: 'all 0.18s ease',
                              position: 'relative',
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: isSelected ? '#c084fc' : '#f1f5f9', lineHeight: 1.3 }}>
                                💬 {sess.session_title || (lang === 'hi' ? 'वार्तालाप' : 'Conversation')}
                              </div>
                              <span style={{ fontSize: '0.65rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                                {timeAgo(sess.updated_at || sess.created_at)}
                              </span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.45rem' }}>
                              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                                {sess.message_count || sess.messages?.length || 0} {lang === 'hi' ? 'संदेश' : 'messages'} • {formatDate(sess.created_at)}
                              </span>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteSession(sess.id);
                                }}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: '#ef4444',
                                  fontSize: '0.75rem',
                                  cursor: 'pointer',
                                  padding: '0.1rem 0.3rem',
                                  opacity: 0.7,
                                }}
                                title={lang === 'hi' ? 'सत्र हटाएं' : 'Delete session'}
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Session Message Detail */}
          {selectedSession && (
            <div
              style={{
                background: 'rgba(18,14,40,0.88)',
                border: '1px solid rgba(168,85,247,0.3)',
                borderRadius: '14px',
                padding: '1.2rem',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '640px',
                boxShadow: '0 12px 36px rgba(0,0,0,0.5)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  paddingBottom: '0.75rem',
                  marginBottom: '1rem',
                }}
              >
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.98rem', color: '#c084fc', fontWeight: 800 }}>
                    {selectedSession.session_title}
                  </h4>
                  <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                    {formatDate(selectedSession.created_at)} • {selectedSession.id}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedSession(null)}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.1rem' }}
                >
                  ✕
                </button>
              </div>

              {/* Messages Body */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  paddingRight: '0.3rem',
                }}
              >
                {msgLoading ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>⏳ Loading messages...</div>
                ) : sessionMessages.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No messages in this conversation.</div>
                ) : (
                  sessionMessages.map((m, idx) => (
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
                          maxWidth: '88%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: m.role === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                          background: m.role === 'user'
                            ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
                            : 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          color: '#f8fafc',
                          fontSize: '0.8rem',
                          lineHeight: 1.45,
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                        }}
                      >
                        {m.text || m.message || m.response}
                      </div>
                      {m.timestamp && (
                        <span style={{ fontSize: '0.62rem', color: '#64748b', marginTop: '0.2rem', padding: '0 0.3rem' }}>
                          {formatDate(m.timestamp)}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ── Activity View ───────────────────────────────────────────────────── */
        <div
          style={{
            background: 'rgba(18,14,40,0.72)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px',
            padding: '1.2rem',
          }}
        >
          {activity.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
              <div>No recent activity recorded for this user.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {activity.map((act, i) => {
                const meta = ACTION_LABELS[act.action] || {
                  icon: '📌',
                  color: '#94a3b8',
                  label_en: act.action,
                  label_hi: act.action,
                };
                return (
                  <div
                    key={act.id || i}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '10px',
                      padding: '0.65rem 0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{meta.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: meta.color }}>
                        {lang === 'hi' ? meta.label_hi : meta.label_en}
                      </div>
                      {act.page && (
                        <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                          Page: {act.page}
                        </div>
                      )}
                    </div>
                    {act.timestamp && (
                      <span style={{ fontSize: '0.65rem', color: '#64748b' }}>
                        {formatDate(act.timestamp)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
