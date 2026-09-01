import React, { useState, useEffect, useCallback, useRef, Component } from 'react';
import { AppProvider, useApp, DEMO_ACCOUNTS } from './components/common/AppContext';
import LocationBar from './components/common/LocationBar';
import OverviewTab from './components/overview/OverviewTab';
import HydroMapTab from './components/hydromap/HydroMapTab';
import MonsoonPhaseTab from './components/monsoon/MonsoonPhaseTab';
import AgricultureTab from './components/agriculture/AgricultureTab';
import XAITab from './components/xai/XAITab';
import AnalyticsTab from './components/analytics/AnalyticsTab';
import AlertsTab from './components/alerts/AlertsTab';
import AgriCommandTab from './components/crisis/AgriCommandTab';
import SystemControlTab from './components/system/SystemControlTab';
import FloatingChatWidget from './components/chat/FloatingChatWidget';
import './index.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('VarshaNetra UI Error:', error, info);
    this.setState({ errorInfo: info });
  }
  render() {
    if (this.state.hasError) {
      const errMessage = this.state.error?.message || this.state.error?.toString() || 'Render Error';
      return (
        <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', color: '#f1f5f9', background: '#070512', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#38bdf8', marginBottom: '0.4rem' }}>🌧️ VarshaNetra UI Auto-Recovery</h2>
          <p style={{ color: '#94a3b8', margin: '0.5rem 0 1rem', maxWidth: '500px', fontSize: '0.88rem' }}>
            A temporary rendering glitch was intercepted. Click below to re-render the view with safe baseline telemetry.
          </p>
          <div style={{ margin: '0.5rem 0 1.2rem', padding: '0.6rem 1rem', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '10px', maxWidth: '650px', fontSize: '0.78rem', color: '#fca5a5', fontFamily: 'monospace', wordBreak: 'break-word', textAlign: 'left' }}>
            {errMessage}
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              this.setState({ hasError: false, error: null });
            }}
            style={{ padding: '0.6rem 1.4rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', background: 'linear-gradient(135deg, #059669, #0284c7)', color: '#fff', border: 'none' }}
          >
            🔄 Re-render Dashboard
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const TABS = [
  { id: 'overview', icon: '🌧️', trKey: 'tab_home', Component: OverviewTab },
  { id: 'hydromap', icon: '🗺️', trKey: 'tab_hydromap', Component: HydroMapTab },
  { id: 'monsoon', icon: '🌊', trKey: 'tab_monsoon', Component: MonsoonPhaseTab },
  { id: 'agriculture', icon: '🌾', trKey: 'tab_season', Component: AgricultureTab },
  { id: 'xai', icon: '🧠', trKey: 'tab_xai', Component: XAITab },
  { id: 'analytics', icon: '🔬', trKey: 'tab_analytics', Component: AnalyticsTab },
  { id: 'alerts', icon: '🚨', trKey: 'tab_alerts', Component: AlertsTab },
  { id: 'command', icon: '🏛️', trKey: 'tab_agri', Component: AgriCommandTab },
  { id: 'system', icon: '⚙️', trKey: 'tab_system', Component: SystemControlTab },
];

function LoginModal() {
  const { lang, user, login, isLoginModalOpen, setIsLoginModalOpen } = useApp();
  const [userIdInput, setUserIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  if (!isLoginModalOpen) return null;

  const handleCustomLogin = (e) => {
    e.preventDefault();
    const res = login(userIdInput, passwordInput);
    if (!res.success) {
      setLoginError(lang === 'hi' ? 'अमान्य यूजर आईडी या पासवर्ड' : 'Invalid User ID or Password');
    } else {
      setLoginError('');
    }
  };

  const handleQuickLogin = (acc) => {
    login(acc.userId, acc.password);
    setLoginError('');
  };

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(5, 3, 12, 0.75)', backdropFilter: 'blur(8px)',
        zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
      }}
    >
      <div style={{
        background: 'rgba(18, 14, 40, 0.95)', borderRadius: '20px', padding: '1.8rem',
        maxWidth: '480px', width: '100%', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55)', border: '1px solid rgba(255,255,255,0.09)',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#f1f5f9', fontWeight: 800 }}>
              🔐 {lang === 'hi' ? 'भूमिका अनुसार लॉगिन (Demo Auth)' : 'Role-Based Login (Demo Auth)'}
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: '#94a3b8' }}>
              {lang === 'hi' ? 'किसान, डेवलपर या आपदा प्रशासक के रूप में प्रवेश करें' : 'Login as Farmer, Developer, or Disaster Administrator'}
            </p>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            style={{ background: 'transparent', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#94a3b8' }}
          >✕</button>
        </div>

        {/* 1-CLICK QUICK ROLE LOGIN BUTTONS */}
        <div style={{ marginBottom: '1.2rem' }}>
          <label className="field-label" style={{ marginBottom: '0.4rem' }}>
            {lang === 'hi' ? '⚡ 1-क्लिक त्वरित भूमिका चयन:' : '⚡ 1-Click Quick Role Switch:'}
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {DEMO_ACCOUNTS.map(acc => {
              const isCurrent = user.userId === acc.userId;
              return (
                <button
                  key={acc.userId}
                  type="button"
                  onClick={() => handleQuickLogin(acc)}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.6rem 0.85rem', borderRadius: '10px',
                    border: isCurrent ? '2px solid #059669' : '1px solid rgba(255,255,255,0.09)',
                    background: isCurrent ? 'rgba(5, 150, 105, 0.12)' : 'rgba(255,255,255,0.03)',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.86rem', color: '#f1f5f9' }}>
                      {lang === 'hi' ? acc.roleLabel_hi : acc.roleLabel_en}
                    </strong>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      ID: <code>{acc.userId}</code> • Pass: <code>{acc.password}</code>
                    </div>
                  </div>
                  <span className="badge" style={{ background: isCurrent ? '#059669' : 'rgba(255,255,255,0.08)', color: isCurrent ? '#fff' : '#cbd5e1', fontSize: '0.68rem' }}>
                    {isCurrent ? (lang === 'hi' ? 'सक्रिय' : 'Active') : 'Login'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: '1rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.09)' }} />
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>OR ENTER MANUALLY</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.09)' }} />
        </div>

        {/* CUSTOM ID & PASSWORD FORM */}
        <form onSubmit={handleCustomLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div>
            <label className="field-label">{lang === 'hi' ? 'यूजर आईडी (User ID):' : 'User ID / Email:'}</label>
            <input
              className="input"
              style={{ width: '100%', marginTop: '0.2rem', fontSize: '0.84rem' }}
              placeholder="e.g. farmer@varshanetra.ai"
              value={userIdInput}
              onChange={e => setUserIdInput(e.target.value)}
            />
          </div>
          <div>
            <label className="field-label">{lang === 'hi' ? 'पासवर्ड (Password):' : 'Password:'}</label>
            <input
              type="password"
              className="input"
              style={{ width: '100%', marginTop: '0.2rem', fontSize: '0.84rem' }}
              placeholder="••••••••"
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
            />
          </div>
          {loginError && (
            <div style={{ color: '#dc2626', fontSize: '0.76rem', fontWeight: 600 }}>⚠️ {loginError}</div>
          )}
          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.4rem', width: '100%', fontWeight: 700 }}>
            {lang === 'hi' ? 'लॉगिन करें' : 'Login to System'}
          </button>
        </form>
      </div>
    </div>
  );
}

function AppInner() {
  const { tr, lang, toggleLang, user, activeTab, setActiveTab, setIsLoginModalOpen, isChatOpen, setIsChatOpen, canAccessPrivileged, USER_TABS, PRIVILEGED_TABS } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const triggerRef = useRef(null);

  // RBAC: compute visible tabs based on user role
  const visibleTabs = TABS.filter(tab =>
    USER_TABS.includes(tab.id) || (canAccessPrivileged && PRIVILEGED_TABS.includes(tab.id))
  );

  // RBAC: if current activeTab is not allowed, redirect to overview
  useEffect(() => {
    const allowed = visibleTabs.some(t => t.id === activeTab);
    if (!allowed && setActiveTab) setActiveTab('overview');
  }, [user?.role, canAccessPrivileged, activeTab]);

  // Drawer close handlers
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!drawerOpen) return;
    const handler = (e) => { if (e.key === 'Escape') closeDrawer(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [drawerOpen, closeDrawer]);

  // Prevent background scroll when drawer open on mobile
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.Component || OverviewTab;

  const roleIcon = user?.role === 'admin' ? '🏛️' : user?.role === 'developer' ? '💻' : '🌾';
  const roleBadge = user?.role === 'admin' ? (lang === 'hi' ? 'आपदा प्रशासक' : 'Disaster Admin')
    : user?.role === 'developer' ? (lang === 'hi' ? 'डेवलपर' : 'Developer')
    : (lang === 'hi' ? 'किसान' : 'Farmer');

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', color: '#f1f5f9' }}>
      {/* Navbar with independent responsive layout containers */}
      <nav className="navbar" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        {/* Left: Brand Logo & Title */}
        <div className="navbar-brand" style={{ cursor: 'pointer', flexShrink: 0 }} onClick={() => setActiveTab && setActiveTab('overview')}>
          <span className="logo" style={{ fontSize: '1.4rem' }}>🌾</span>
          <span style={{ fontSize: '1.15rem', fontWeight: 800 }}>{lang === 'hi' ? 'वर्षानेत्र AI' : 'VarshaNetra AI'}</span>
        </div>

        {/* Center: OBSERVE→PREDICT→EXPLAIN→DECIDE→ACT Pipeline Indicator (Desktop Only) */}
        <div className="workflow-pipeline desktop-only" style={{
          display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.62rem',
          fontWeight: 700, color: '#64748b', letterSpacing: '0.3px',
        }}>
          {['OBSERVE', 'PREDICT', 'EXPLAIN', 'DECIDE', 'ACT'].map((step, i) => {
            const stepMap = { OBSERVE: ['overview', 'hydromap'], PREDICT: ['monsoon', 'agriculture'], EXPLAIN: ['xai', 'analytics'], DECIDE: ['agriculture', 'xai'], ACT: ['alerts', 'command', 'system'] };
            const isActive = stepMap[step]?.includes(activeTab);
            return (
              <span key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                <span style={{
                  padding: '0.15rem 0.35rem', borderRadius: '4px', fontSize: '0.58rem',
                  background: isActive ? 'linear-gradient(135deg, #059669, #0284c7)' : 'transparent',
                  color: isActive ? '#fff' : '#94a3b8', transition: 'all 0.2s',
                }}>{step}</span>
                {i < 4 && <span style={{ color: '#cbd5e1' }}>→</span>}
              </span>
            );
          })}
        </div>

        {/* Right Action Container: Independent non-overlapping items */}
        <div className="navbar-right-container" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
          {/* User Role Pill */}
          <div
            onClick={() => setIsLoginModalOpen(true)}
            className="user-role-pill"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '999px',
              padding: '0.3rem 0.65rem', cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'all 0.2s',
            }}
            title="Click to Switch Role / Login"
          >
            <span style={{ fontSize: '0.95rem' }}>{roleIcon}</span>
            <div className="user-role-details" style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#f1f5f9', lineHeight: 1.1 }}>
                {user?.name?.split(' ')[0] || 'User'}
              </span>
              <span style={{ fontSize: '0.62rem', color: user?.role === 'admin' ? '#dc2626' : user?.role === 'developer' ? '#0284c7' : '#059669', fontWeight: 700 }}>
                {roleBadge}
              </span>
            </div>
            <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>▼</span>
          </div>

          {/* Desktop AI Chat Button */}
          <button
            className={`btn-chat-toggle desktop-only ${isChatOpen ? 'active' : ''}`}
            onClick={() => setIsChatOpen(!isChatOpen)}
            title={lang === 'hi' ? 'वर्षानेत्र AI सलाहकार' : 'AI Decision Advisor'}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.35rem 0.75rem',
              background: isChatOpen ? 'linear-gradient(135deg, #059669 0%, #0284c7 100%)' : 'rgba(255,255,255,0.05)',
              color: isChatOpen ? '#ffffff' : '#cbd5e1',
              border: '1px solid rgba(255,255,255,0.09)', borderRadius: '999px',
              fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: '0.95rem' }}>🤖</span>
            <span>{lang === 'hi' ? 'AI चैट' : 'AI Chat'}</span>
          </button>

          {/* Language Switcher Button (Independent Container) */}
          <button
            id="lang-switcher-btn"
            className={`btn-lang ${lang === 'hi' ? 'active' : ''}`}
            onClick={toggleLang}
            title={lang === 'en' ? 'Switch to Hindi (हिन्दी)' : 'अंग्रेजी (English) में बदलें'}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 800,
              minWidth: '46px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.12)',
              background: lang === 'hi' ? 'linear-gradient(135deg, #a855f7, #6366f1)' : 'rgba(255,255,255,0.06)',
              color: '#ffffff',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {lang === 'en' ? 'हिन्दी' : 'EN'}
          </button>

          {/* THREE-DOT VERTICAL NAVIGATION BUTTON (Independent Container) */}
          <button
            id="three-dot-menu-btn"
            ref={triggerRef}
            onClick={() => setDrawerOpen(prev => !prev)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px', borderRadius: '10px',
              background: drawerOpen ? 'linear-gradient(135deg, #a855f7, #06b6d4)' : 'rgba(255,255,255,0.06)',
              color: drawerOpen ? '#fff' : '#cbd5e1',
              border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer', fontSize: '1.2rem',
              fontWeight: 900, transition: 'all 0.2s', flexShrink: 0,
              boxShadow: drawerOpen ? '0 2px 8px rgba(168,85,247,0.3)' : '0 1px 3px rgba(0,0,0,0.2)',
            }}
          >
            ⋮
          </button>
        </div>
      </nav>

      {/* Location Bar */}
      <LocationBar />

      {/* DRAWER OVERLAY */}
      {drawerOpen && (

        <div
          className="drawer-overlay"
          onClick={closeDrawer}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(5, 3, 12, 0.65)', backdropFilter: 'blur(4px)',
            zIndex: 9998, transition: 'opacity 0.2s',
          }}
        />
      )}

      {/* RIGHT-SIDE NAVIGATION DRAWER */}
      <div
        ref={drawerRef}
        role="navigation"
        aria-label="Main navigation"
        className={`nav-drawer ${drawerOpen ? 'open' : ''}`}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: '310px', maxWidth: '86vw',
          background: 'rgba(13, 9, 28, 0.95)', borderLeft: '1px solid rgba(255,255,255,0.09)',
          boxShadow: drawerOpen ? '-10px 0 40px rgba(0,0,0,0.65)' : 'none',
          backdropFilter: 'blur(24px)',
          zIndex: 9999, transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex', flexDirection: 'column', overflowY: 'auto',
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '1.2rem 1.2rem 0.8rem', borderBottom: '1px solid rgba(255,255,255,0.09)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f1f5f9', background: 'linear-gradient(135deg, #c084fc, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VarshaNetra AI</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem' }}>
              <span style={{ fontSize: '0.9rem' }}>{roleIcon}</span>
              <span style={{
                fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '999px',
                background: user?.role === 'admin' ? 'rgba(239,68,68,0.12)' : user?.role === 'developer' ? 'rgba(6,182,212,0.12)' : 'rgba(16,185,129,0.12)',
                color: user?.role === 'admin' ? '#f87171' : user?.role === 'developer' ? '#38bdf8' : '#34d399',
              }}>
                {roleBadge}
              </span>
            </div>
          </div>
          <button
            onClick={closeDrawer}
            style={{ background: 'transparent', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: '#64748b', padding: '0.25rem' }}
            aria-label="Close navigation"
          >✕</button>
        </div>

        {/* Navigation Items */}
        <div style={{ padding: '0.6rem', flex: 1 }}>
          {/* Section: User Pages */}
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', padding: '0.4rem 0.8rem 0.25rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            {lang === 'hi' ? 'निगरानी व विश्लेषण' : 'Observe · Predict · Explain'}
          </div>
          {visibleTabs.filter(t => USER_TABS.includes(t.id)).map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); closeDrawer(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.65rem',
                width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px',
                border: 'none', textAlign: 'left', cursor: 'pointer',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #a855f7, #06b6d4)' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : '#cbd5e1',
                fontWeight: activeTab === tab.id ? 700 : 500, fontSize: '0.86rem',
                transition: 'all 0.15s', marginBottom: '0.15rem',
              }}
            >
              <span style={{ fontSize: '1.1rem', width: '24px', textAlign: 'center' }}>{tab.icon}</span>
              <span>{tr ? tr(tab.trKey) : tab.id}</span>
            </button>
          ))}

          {/* Section: Privileged Pages (only for admin/dev) */}
          {canAccessPrivileged && (
            <>
              <div style={{
                fontSize: '0.65rem', fontWeight: 700, color: '#f87171', padding: '0.6rem 0.8rem 0.25rem',
                letterSpacing: '0.5px', textTransform: 'uppercase', marginTop: '0.4rem',
                borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.6rem',
              }}>
                {lang === 'hi' ? '🔒 अधिकार-संरक्षित (Decide · Act)' : '🔒 Authority Protected (Decide · Act)'}
              </div>
              {visibleTabs.filter(t => PRIVILEGED_TABS.includes(t.id)).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); closeDrawer(); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.65rem',
                    width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px',
                    border: 'none', textAlign: 'left', cursor: 'pointer',
                    background: activeTab === tab.id ? 'linear-gradient(135deg, #dc2626, #ea580c)' : 'transparent',
                    color: activeTab === tab.id ? '#ffffff' : '#cbd5e1',
                    fontWeight: activeTab === tab.id ? 700 : 500, fontSize: '0.86rem',
                    transition: 'all 0.15s', marginBottom: '0.15rem',
                  }}
                >
                  <span style={{ fontSize: '1.1rem', width: '24px', textAlign: 'center' }}>{tab.icon}</span>
                  <span>{tr ? tr(tab.trKey) : tab.id}</span>
                </button>
              ))}
            </>
          )}
        </div>

        {/* Drawer Footer */}
        <div style={{ padding: '0.8rem 1rem', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.68rem', color: '#64748b', textAlign: 'center' }}>
          VarshaNetra AI v2.0 • SIH 2026
        </div>
      </div>

      {/* Active Tab Content */}
      <ErrorBoundary key={activeTab + (lang || 'en')}>
        <ActiveComponent />
      </ErrorBoundary>

      {/* Global Floating AI Assistant Widget */}
      <FloatingChatWidget />

      {/* Mobile-Only Bottom App Navigation Bar */}
      <nav className="mobile-bottom-nav">
        <button
          className={`mobile-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <span className="nav-icon">🌧️</span>
          <span>{lang === 'hi' ? 'पूर्वानुमान' : 'Forecast'}</span>
        </button>

        <button
          className={`mobile-nav-item ${activeTab === 'alerts' && canAccessPrivileged ? 'active' : ''}`}
          onClick={() => canAccessPrivileged ? setActiveTab('alerts') : setIsLoginModalOpen(true)}
        >
          <span className="nav-icon">🚨</span>
          <span>{lang === 'hi' ? 'अलर्ट' : 'Alerts'}</span>
        </button>

        <button
          className={`mobile-nav-item ${isChatOpen ? 'active' : ''}`}
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          <span className="nav-icon">🤖</span>
          <span>{lang === 'hi' ? 'AI चैट' : 'AI Chat'}</span>
        </button>

        <button
          className={`mobile-nav-item ${activeTab === 'hydromap' ? 'active' : ''}`}
          onClick={() => setActiveTab('hydromap')}
        >
          <span className="nav-icon">🗺️</span>
          <span>{lang === 'hi' ? 'मानचित्र' : 'HydroMap'}</span>
        </button>

        <button
          className="mobile-nav-item"
          onClick={() => setDrawerOpen(true)}
        >
          <span className="nav-icon">⋮</span>
          <span>{lang === 'hi' ? 'मेन्यू' : 'Menu'}</span>
        </button>
      </nav>

      {/* User Login & Occupation Modal */}
      <LoginModal />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppInner />
      </AppProvider>
    </ErrorBoundary>
  );
}
