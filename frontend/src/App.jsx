import React, { useState, Component } from 'react';
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
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('VarshaNetra UI Error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#0f172a', background: '#f8fafc', minHeight: '100vh' }}>
          <h2>🌧️ VarshaNetra UI Recovered</h2>
          <p style={{ color: '#64748b', margin: '1rem 0' }}>An interface component encountered an issue, but the platform is active.</p>
          <button
            className="btn btn-primary"
            onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
          >
            🔄 Reload Dashboard
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
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '1.8rem',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
          border: '1px solid #cbd5e1',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a', fontWeight: 800 }}>
              🔐 {lang === 'hi' ? 'व्यवसाय अनुसार लॉगिन (User Login)' : 'Occupation & Role-Based Login'}
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: '#64748b' }}>
              {lang === 'hi' ? 'किसान, डेवलपर या प्रशासक क्रेडेंशियल्स दर्ज करें' : 'Select or enter credentials for Farmer, Developer, or Administrator'}
            </p>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            style={{ background: 'transparent', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}
          >
            ✕
          </button>
        </div>

        {/* 1-CLICK QUICK ROLE LOGIN BUTTONS */}
        <div style={{ marginBottom: '1.2rem' }}>
          <label className="field-label" style={{ marginBottom: '0.4rem' }}>
            {lang === 'hi' ? '⚡ 1-क्लिक त्वरित खाता चयन:' : '⚡ 1-Click Quick Occupation Switch:'}
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
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '10px',
                    border: isCurrent ? '2px solid #059669' : '1px solid #e2e8f0',
                    background: isCurrent ? '#f0fdf4' : '#f8fafc',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.86rem', color: '#0f172a' }}>
                      {lang === 'hi' ? acc.roleLabel_hi : acc.roleLabel_en}
                    </strong>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      ID: <code>{acc.userId}</code> • Pass: <code>{acc.password}</code>
                    </div>
                  </div>
                  <span className="badge" style={{ background: isCurrent ? '#059669' : '#e2e8f0', color: isCurrent ? '#fff' : '#334155', fontSize: '0.68rem' }}>
                    {isCurrent ? (lang === 'hi' ? 'सक्रिय' : 'Active') : 'Login'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: '1rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>OR ENTER MANUALLY</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
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
            <div style={{ color: '#dc2626', fontSize: '0.76rem', fontWeight: 600 }}>
              ⚠️ {loginError}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: '0.4rem', width: '100%', fontWeight: 700 }}
          >
            {lang === 'hi' ? 'लॉगिन करें' : 'Login to System'}
          </button>
        </form>
      </div>
    </div>
  );
}

function AppInner() {
  const { tr, lang, toggleLang, user, setIsLoginModalOpen, isChatOpen, setIsChatOpen } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.Component || OverviewTab;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      {/* Navbar */}
      <nav className="navbar" style={{ padding: '0.6rem 1.4rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
        <div className="navbar-brand">
          <span className="logo">🌾</span>
          <span>{tr ? tr('app_name') : 'VarshaNetra AI'}</span>
        </div>
        <span className="navbar-tagline" style={{ display: 'none', md: 'inline' }}>
          {lang === 'hi' ? 'अति-स्थानीय मानसूनी निर्णय समर्थन प्रणाली' : 'Hyperlocal Monsoon Decision-Support System'}
        </span>

        <div className="navbar-spacer" />

        {/* OCCUPATION / USER PROFILE PILL IN NAVBAR */}
        <div
          onClick={() => setIsLoginModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '999px',
            padding: '0.3rem 0.8rem',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            transition: 'all 0.2s',
          }}
          title="Click to Switch Occupation / Login"
        >
          <span style={{ fontSize: '1rem' }}>
            {user?.role === 'admin' ? '🏛️' : user?.role === 'developer' ? '💻' : '🌾'}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
              {user?.name || 'Ramesh Kumar'}
            </span>
            <span style={{ fontSize: '0.66rem', color: user?.role === 'admin' ? '#dc2626' : user?.role === 'developer' ? '#0284c7' : '#059669', fontWeight: 700 }}>
              {lang === 'hi' ? user?.roleLabel_hi : user?.roleLabel_en}
            </span>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>▼</span>
        </div>

        {/* Chatbot Header Button */}
        <button
          className={`btn-chat-toggle ${isChatOpen ? 'active' : ''}`}
          onClick={() => setIsChatOpen(!isChatOpen)}
          title={lang === 'hi' ? 'VarshaNetra AI सलाहकार' : 'AI Crop Advisor'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.85rem',
            background: isChatOpen ? 'linear-gradient(135deg, #059669 0%, #0284c7 100%)' : '#f1f5f9',
            color: isChatOpen ? '#ffffff' : '#334155',
            border: '1px solid #cbd5e1',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            transition: 'all 0.2s',
          }}
        >
          <span style={{ fontSize: '1rem' }}>🤖</span>
          <span>{lang === 'hi' ? 'AI चैट' : 'AI Chat'}</span>
          {!isChatOpen && (
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#10b981', boxShadow: '0 0 4px #10b981'
            }} />
          )}
        </button>

        <button
          className={`btn-lang ${lang === 'hi' ? 'active' : ''}`}
          onClick={toggleLang}
          title="Toggle Language"
          style={{ padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.76rem' }}
        >
          {lang === 'en' ? 'हिन्दी' : 'EN'}
        </button>
      </nav>

      {/* Location Bar */}
      <LocationBar />

      {/* Tab Bar */}
      <div className="tab-bar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tr ? tr(tab.trKey) : tab.id}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <ErrorBoundary key={activeTab + (lang || 'en')}>
        <ActiveComponent />
      </ErrorBoundary>

      {/* Global Floating AI Assistant Widget */}
      <FloatingChatWidget />

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
