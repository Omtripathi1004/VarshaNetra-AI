import React, { useState, Component } from 'react';
import { AppProvider, useApp } from './components/common/AppContext';
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
        <div style={{ padding: '2rem', textAlign: 'center', color: '#f0f4ff', background: '#080c1a', minHeight: '100vh' }}>
          <h2>🌧️ VarshaNetra UI Recovered</h2>
          <p style={{ color: '#94a3b8', margin: '1rem 0' }}>An interface component encountered an error, but the platform is active.</p>
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

function AppInner() {
  const { tr, lang, toggleLang } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.Component || OverviewTab;

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at top, #0d1225 0%, #04060e 100%)', color: '#f0f4ff' }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="logo">🌧️</span>
          <span>{tr ? tr('app_name') : 'VarshaNetra'}</span>
        </div>
        <span className="navbar-tagline">{tr ? tr('app_tagline') : 'AI Hydro-Meteorological Platform'}</span>
        <div className="navbar-spacer" />
        <div className="navbar-status">
          <span className="status-dot" />
          <span>{tr ? tr('connected') : 'Live Connected'}</span>
        </div>
        <button
          className={`btn-lang ${lang === 'hi' ? 'active' : ''}`}
          onClick={toggleLang}
          title="Toggle Language"
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
