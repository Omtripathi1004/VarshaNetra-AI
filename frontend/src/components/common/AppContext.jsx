import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { t } from '../../i18n/translations';

const AppContext = createContext(null);

export const DEMO_ACCOUNTS = [
  {
    userId: 'farmer@varshanetra.ai',
    password: 'kisan123',
    name: 'Ramesh Kumar (किसान)',
    role: 'farmer',
    roleLabel_en: '🌾 Farmer / Krishi User',
    roleLabel_hi: '🌾 किसान / कृषि उपयोगकर्ता',
    badge: 'Kharif Farmer',
    district: 'Lucknow'
  },
  {
    userId: 'dev@varshanetra.ai',
    password: 'ai2026',
    name: 'Alex Chen (AI Engineer)',
    role: 'developer',
    roleLabel_en: '💻 Developer / ML Researcher',
    roleLabel_hi: '💻 डेवलपर / शोधकर्ता',
    badge: 'Core ML & APIs',
    district: 'National Grid'
  },
  {
    userId: 'admin@varshanetra.ai',
    password: 'sih2026',
    name: 'Dr. V. K. Sharma (District Lead)',
    role: 'admin',
    roleLabel_en: '🏛️ Disaster Administrator / Officer',
    roleLabel_hi: '🏛️ जिला कृषि अधिकारी / प्रशासक',
    badge: 'Disaster Dispatch Lead',
    district: 'State Command'
  },
];

// RBAC Constants
const USER_TABS = ['overview', 'hydromap', 'monsoon', 'agriculture', 'xai', 'analytics'];
const PRIVILEGED_TABS = ['alerts', 'command', 'system'];
const PRIVILEGED_ROLES = new Set(['developer', 'admin']);

export function AppProvider({ children }) {
  // Language with localStorage persistence
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem('varshanetra_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const setLang = useCallback((newLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem('varshanetra_lang', newLang);
    } catch (e) {
      console.warn('Failed to save language to localStorage:', e);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState(prev => {
      const next = prev === 'en' ? 'hi' : 'en';
      try {
        localStorage.setItem('varshanetra_lang', next);
      } catch (e) {
        console.warn('Failed to save language to localStorage:', e);
      }
      return next;
    });
  }, []);

  // Global Active Tab state to allow switching from any component (e.g. XAI button in Overview)
  const [activeTab, setActiveTab] = useState('overview');

  // Shared prediction / XAI context passed when navigating from Overview to XAI
  const [xaiContext, setXaiContext] = useState(null);

  const [location, setLocation] = useState({
    lat: 26.85, lon: 80.95,
    state: 'Uttar Pradesh', district: 'Lucknow',
    city: 'Lucknow', village: '',
    display_name: 'Lucknow, Uttar Pradesh',
  });

  // Default logged in user is Farmer
  const [user, setUser] = useState(DEMO_ACCOUNTS[0]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  /**
   * SECURITY: Exact-match login only.
   * In production, this authenticates against backend JWT/session endpoint.
   */
  const login = useCallback((userId, password) => {
    const matched = DEMO_ACCOUNTS.find(
      u => u.userId.toLowerCase() === (userId || '').trim().toLowerCase() && u.password === password
    );
    if (matched) {
      setUser(matched);
      setIsLoginModalOpen(false);
      return { success: true, user: matched };
    }
    return { success: false, error: 'Invalid User ID or Password' };
  }, []);

  const logout = useCallback(() => {
    setUser(DEMO_ACCOUNTS[0]);
  }, []);

  // tr() shorthand
  const tr = useCallback((key) => t(lang, key), [lang]);

  const [isChatOpen, setIsChatOpen] = useState(false);

  // RBAC: whether the current user can access privileged tabs
  const canAccessPrivileged = useMemo(() => {
    return PRIVILEGED_ROLES.has(user?.role);
  }, [user?.role]);

  return (
    <AppContext.Provider value={{
      lang,
      setLang,
      toggleLang,
      activeTab,
      setActiveTab,
      xaiContext,
      setXaiContext,
      location,
      setLocation,
      tr,
      user,
      setUser,
      login,
      logout,
      isLoginModalOpen,
      setIsLoginModalOpen,
      isChatOpen,
      setIsChatOpen,
      DEMO_ACCOUNTS,
      canAccessPrivileged,
      USER_TABS,
      PRIVILEGED_TABS,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

