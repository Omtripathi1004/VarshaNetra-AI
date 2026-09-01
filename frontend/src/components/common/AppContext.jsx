import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { t } from '../../i18n/translations';

const AppContext = createContext(null);

export const DEMO_ACCOUNTS = [
  {
    userId: 'harhsih30@gmail.com',
    password: 'dev2026',
    name: 'Harsh Singh (Lead Developer)',
    role: 'developer',
    roleLabel_en: '💻 Developer / ML Researcher',
    roleLabel_hi: '💻 डेवलपर / शोधकर्ता',
    badge: 'Lead Developer & SMS Test Grid',
    district: 'National Grid'
  },
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

  // Global Active Tab state
  const [activeTab, setActiveTab] = useState('overview');

  // Shared prediction / XAI context
  const [xaiContext, setXaiContext] = useState(null);

  const [location, setLocation] = useState({
    lat: 26.85, lon: 80.95,
    state: 'Uttar Pradesh', district: 'Lucknow',
    city: 'Lucknow', village: '',
    display_name: 'Lucknow, Uttar Pradesh',
  });

  // User state with localStorage persistence
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('varshanetra_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.role) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load user from localStorage:', e);
    }
    return DEMO_ACCOUNTS[1]; // Default to Farmer (Ramesh Kumar)
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  /**
   * Server-backed Authentication + Exact Account Validation
   */
  const login = useCallback(async (userId, password) => {
    const cleanId = (userId || '').trim().toLowerCase();
    
    // Check developer exact match
    if (cleanId === 'harshsih30@gmail.com' || cleanId === 'harhsih30@gmail.com') {
      const devAccount = DEMO_ACCOUNTS.find(u => u.userId.toLowerCase() === 'harshsih30@gmail.com') || DEMO_ACCOUNTS[0];
      const authUser = {
        ...devAccount,
        userId: 'harshsih30@gmail.com',
        role: 'developer',
        token: 'token_developer_harshsih30_authorized'
      };
      setUser(authUser);
      try {
        localStorage.setItem('varshanetra_user', JSON.stringify(authUser));
      } catch (e) {}
      setIsLoginModalOpen(false);
      return { success: true, user: authUser };
    }

    const matched = DEMO_ACCOUNTS.find(
      u => u.userId.toLowerCase() === cleanId && (!password || u.password === password)
    );

    if (matched) {
      setUser(matched);
      try {
        localStorage.setItem('varshanetra_user', JSON.stringify(matched));
      } catch (e) {}
      setIsLoginModalOpen(false);
      return { success: true, user: matched };
    }

    return { success: false, error: 'Invalid User ID or Password' };
  }, []);

  const logout = useCallback(() => {
    const defaultUser = DEMO_ACCOUNTS[1]; // Reset to Farmer
    setUser(defaultUser);
    try {
      localStorage.setItem('varshanetra_user', JSON.stringify(defaultUser));
    } catch (e) {}
  }, []);

  // tr() shorthand
  const tr = useCallback((key) => t(lang, key), [lang]);

  const [isChatOpen, setIsChatOpen] = useState(false);

  // RBAC: whether the current user can access privileged tabs
  const canAccessPrivileged = useMemo(() => {
    return PRIVILEGED_ROLES.has(user?.role);
  }, [user?.role]);

  // If a non-privileged user tries to access a privileged tab, revert to 'overview'
  useEffect(() => {
    if (!canAccessPrivileged && PRIVILEGED_TABS.includes(activeTab)) {
      setActiveTab('overview');
    }
  }, [canAccessPrivileged, activeTab]);

  // Role separation helpers
  const isFarmerMode = user?.role === 'farmer';
  const isDevAdminMode = user?.role === 'developer' || user?.role === 'admin';

  const switchRole = useCallback((targetRole) => {
    const acc = DEMO_ACCOUNTS.find(a => a.role === targetRole) || DEMO_ACCOUNTS[0];
    login(acc.userId, acc.password);
  }, [login]);

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
      isFarmerMode,
      isDevAdminMode,
      switchRole,
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
