import React, { useState } from 'react';
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
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="logo">🌧️</span>
          <span>{tr('app_name')}</span>
        </div>
        <span className="navbar-tagline">{tr('app_tagline')}</span>
        <div className="navbar-spacer" />
        <div className="navbar-status">
          <span className="status-dot" />
          <span>{tr('connected')}</span>
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
            {tab.icon} {tr(tab.trKey)}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <ActiveComponent key={activeTab + lang} />

      {/* Global Floating AI Assistant Widget */}
      <FloatingChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
