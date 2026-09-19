import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

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
  return new Date(isoString).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
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

  const userId = user?.userId || user?.email || 'anonymous';

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [sessRes, actRes] = await Promise.allSettled([
        api.getChatSessions(100),
        api.getUserActivity(50),
      ]);
      if (sessRes.status === 'fulfilled') {
        setSessions(sessRes.value?.data?.sessions || []);
      }
      if (actRes.status === 'fulfilled') {
        setActivity(actRes.value?.data?.activity || []);
      }
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const openSession = async (session) => {
    setSelectedSession(session);
    setMsgLoading(true);
    try {
      const res = await api.getChatSessionMessages(session.id);
      setSessionMessages(res?.data?.messages || []);
    } catch {
      setSessionMessages([]);
    }
    setMsgLoading(false);
  };

  const deleteSession = async (sessionId) => {
    await api.deleteChatSession(sessionId);
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (selectedSession?.id === sessionId) {
      setSelectedSession(null);
      setSessionMessages([]);
    }
    setDeleteConfirm(null);
  };

  const filteredSessions = sessions.filter(s =>
    !searchQuery || s.session_title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-content" style={{ paddingBottom: '3rem' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(18,14,40,0.97), rgba(10,7,24,0.97))',
        border: '1px solid rgba(255,255,255,0.09)', borderRadius: '16px',
        padding: '1.4rem 1.6rem', marginBottom: '1.5rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '1.5rem' }}>💬</span>
            <h2 style={{
              margin: 0, fontSize: '1.35rem', fontWeight: 800,
              background: 'linear-gradient(135deg, #a855f7, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {lang === 'hi' ? 'चैट स्टोर' : 'Chat Store'}
            </h2>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.83rem' }}>
            {lang === 'hi'
              ? `${userId} की बातचीत का संग्रह — प्रत्येक उपयोगकर्ता का डेटा सुरक्षित रूप से अलग है`
              : `Conversation history for ${userId} — strictly user-isolated per authenticated identity`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{
            padding: '0.3rem 0.75rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700,
            background: 'rgba(168,85,247,0.15)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.35)',
          }}>
            💬 {sessions.length} {lang === 'hi' ? 'बातचीत' : 'Conversations'}
          </span>
          <span style={{
            padding: '0.3rem 0.75rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700,
            background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.35)',
          }}>
            ⚡ {activity.length} {lang === 'hi' ? 'गतिविधियां' : 'Activities'}
          </span>
        </div>
      </div>

      {/* View Toggle + Search */}
      <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {[
          { id: 'sessions', icon: '💬', en: 'Conversations', hi: 'बातचीत' },
          { id: 'activity', icon: '⚡', en: 'Activity Log', hi: 'गतिविधि लॉग' },
        ].map(v => (
          <button
            key={v.id}
            onClick={() => setActiveView(v.id)}
            style={{
              padding: '0.4rem 1rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.78rem',
              background: activeView === v.id ? 'linear-gradient(135deg, #a855f7, #06b6d4)' : 'rgba(255,255,255,0.05)',
              color: activeView === v.id ? '#fff' : '#94a3b8',
              border: '1px solid rgba(255,255,255,0.09)', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {v.icon} {lang === 'hi' ? v.hi : v.en}
          </button>
        ))}

        {activeView === 'sessions' && (
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={lang === 'hi' ? '🔍 बातचीत खोजें...' : '🔍 Search conversations...'}
            style={{
              marginLeft: 'auto', padding: '0.4rem 0.85rem', borderRadius: '8px', fontSize: '0.78rem',
              background: 'rgba(14,11,30,0.85)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#f1f5f9', outline: 'none', minWidth: 200,
            }}
          />
        )}

        <button
          onClick={loadData}
          style={{
            padding: '0.4rem 0.85rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700,
            background: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.3)',
            cursor: 'pointer',
          }}
        >
          🔄 {lang === 'hi' ? 'ताज़ा करें' : 'Refresh'}
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
          <div>{lang === 'hi' ? 'डेटा लोड हो रहा है...' : 'Loading your data...'}</div>
        </div>
      ) : activeView === 'sessions' ? (
        /* ── Sessions View ───────────────────────────────────────────────────── */
        <div style={{ display: 'grid', gridTemplateColumns: selectedSession ? '1fr 1.4fr' : '1fr', gap: '1rem' }}>
          {/* Session List */}
          <div>
            {filteredSessions.length === 0 ? (
              <div style={{
                background: 'rgba(18,14,40,0.72)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px', padding: '2.5rem', textAlign: 'center', color: '#64748b',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💬</div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.3rem', color: '#94a3b8' }}>
                  {lang === 'hi' ? 'कोई बातचीत नहीं मिली' : 'No conversations found'}
                </div>
                <div style={{ fontSize: '0.78rem' }}>
                  {lang === 'hi' ? 'AI निर्णय सलाहकार में जाकर एक नई बातचीत शुरू करें।' : 'Start a new conversation in the AI Decision Advisor.'}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {filteredSessions.map(s => {
                  const isActive = selectedSession?.id === s.id;
                  return (
                    <div
                      key={s.id}
                      style={{
                        background: isActive ? 'rgba(168,85,247,0.12)' : 'rgba(18,14,40,0.72)',
                        border: `1px solid ${isActive ? 'rgba(168,85,247,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: '12px', padding: '0.85rem 1rem', cursor: 'pointer',
                        transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '0.75rem',
                      }}
                      onClick={() => openSession(s)}
                    >
                      <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>💬</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontWeight: 700, fontSize: '0.83rem', color: '#f1f5f9',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {s.session_title || 'Chat'}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.15rem' }}>
                          {s.message_count || 0} {lang === 'hi' ? 'संदेश' : 'messages'} • {timeAgo(s.updated_at)}
                        </div>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); setDeleteConfirm(s.id); }}
                        style={{
                          background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer',
                          fontSize: '0.85rem', padding: '0.2rem 0.3rem', borderRadius: '4px',
                          flexShrink: 0, transition: 'color 0.15s',
                        }}
                        title="Delete session"
                      >🗑️</button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Session Messages Panel */}
          {selectedSession && (
            <div style={{
              background: 'rgba(13,9,28,0.94)', border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '14px', display: 'flex', flexDirection: 'column', maxHeight: '70vh', overflow: 'hidden',
            }}>
              {/* Panel header */}
              <div style={{
                padding: '0.85rem 1.1rem', borderBottom: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#f1f5f9' }}>{selectedSession.session_title}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{formatDate(selectedSession.created_at)}</div>
                </div>
                <button
                  onClick={() => { setSelectedSession(null); setSessionMessages([]); }}
                  style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.1rem', padding: '0.2rem' }}
                >✕</button>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {msgLoading ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>⏳ Loading messages...</div>
                ) : sessionMessages.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No messages found.</div>
                ) : (
                  sessionMessages.map(msg => (
                    <div key={msg.id}>
                      {/* User question */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.4rem' }}>
                        <div style={{
                          background: 'linear-gradient(135deg, #059669, #0284c7)',
                          color: '#fff', padding: '0.55rem 0.85rem', borderRadius: '12px 12px 2px 12px',
                          fontSize: '0.8rem', maxWidth: '80%', wordBreak: 'break-word',
                        }}>
                          {msg.message}
                        </div>
                      </div>
                      {/* Bot response */}
                      {msg.response && (
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '1rem', flexShrink: 0 }}>🤖</span>
                          <div style={{
                            background: 'rgba(18,14,40,0.9)', border: '1px solid rgba(255,255,255,0.07)',
                            color: '#cbd5e1', padding: '0.55rem 0.85rem', borderRadius: '12px 12px 12px 2px',
                            fontSize: '0.78rem', maxWidth: '88%', wordBreak: 'break-word', lineHeight: 1.55,
                          }}>
                            {msg.response.length > 300 ? msg.response.substring(0, 300) + '...' : msg.response}
                          </div>
                        </div>
                      )}
                      {/* Intent + crop tags */}
                      {(msg.intent || msg.crop) && (
                        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem', paddingLeft: '1.5rem', flexWrap: 'wrap' }}>
                          {msg.intent && <span style={{ padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.62rem', background: 'rgba(168,85,247,0.15)', color: '#c084fc' }}>{msg.intent}</span>}
                          {msg.crop && <span style={{ padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.62rem', background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>{msg.crop}</span>}
                        </div>
                      )}
                      <div style={{ fontSize: '0.62rem', color: '#475569', textAlign: 'right', marginTop: '0.1rem' }}>{timeAgo(msg.timestamp)}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ── Activity View ───────────────────────────────────────────────────── */
        <div>
          {activity.length === 0 ? (
            <div style={{
              background: 'rgba(18,14,40,0.72)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px', padding: '2.5rem', textAlign: 'center', color: '#64748b',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⚡</div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#94a3b8' }}>
                {lang === 'hi' ? 'कोई गतिविधि नहीं मिली' : 'No activity recorded yet'}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {activity.map(ev => {
                const info = ACTION_LABELS[ev.action] || { icon: '⚡', color: '#94a3b8', label_en: ev.action };
                return (
                  <div key={ev.id} style={{
                    background: 'rgba(18,14,40,0.72)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px', padding: '0.7rem 1rem',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                  }}>
                    <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{info.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.8rem', color: info.color }}>
                        {lang === 'hi' ? (info.label_hi || info.label_en) : info.label_en}
                      </span>
                      {ev.page && <span style={{ color: '#64748b', fontSize: '0.75rem' }}> — {ev.page}</span>}
                    </div>
                    <span style={{ color: '#475569', fontSize: '0.7rem', flexShrink: 0 }}>{timeAgo(ev.timestamp)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(5,3,12,0.8)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }}>
          <div style={{
            background: 'rgba(18,14,40,0.98)', border: '1px solid rgba(239,68,68,0.4)',
            borderRadius: '16px', padding: '1.75rem', maxWidth: 360, width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
          }}>
            <div style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '0.75rem' }}>🗑️</div>
            <h3 style={{ margin: '0 0 0.5rem', textAlign: 'center', fontSize: '1rem', fontWeight: 800, color: '#f1f5f9' }}>
              {lang === 'hi' ? 'बातचीत हटाएं?' : 'Delete this conversation?'}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', textAlign: 'center', marginBottom: '1.25rem' }}>
              {lang === 'hi' ? 'यह क्रिया पूर्ववत नहीं की जा सकती।' : 'This action cannot be undone.'}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{
                flex: 1, padding: '0.6rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.83rem',
                background: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
              }}>
                {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button onClick={() => deleteSession(deleteConfirm)} style={{
                flex: 1, padding: '0.6rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.83rem',
                background: 'linear-gradient(135deg, #dc2626, #ef4444)', color: '#fff', border: 'none', cursor: 'pointer',
              }}>
                {lang === 'hi' ? 'हटाएं' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
