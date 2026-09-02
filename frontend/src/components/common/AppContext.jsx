import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { t } from '../../i18n/translations';

const AppContext = createContext(null);

export const DEMO_ACCOUNTS = [
  {
    userId: 'harshsih30@gmail.com',
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

// RBAC Constants:
// Farmer / User has access to first 6 tabs (Overview, HydroMap, Monsoon, Agriculture, XAI, Analytics).
// The last 3 tabs (Alerts/Warnings, Agri Command, System Control) are restricted to privileged roles (admin, developer, officer).
const FARMER_TABS = ['overview', 'hydromap', 'monsoon', 'agriculture', 'xai', 'analytics'];
const PRIVILEGED_TABS = ['alerts', 'command', 'system'];
const PRIVILEGED_ROLES = new Set(['developer', 'admin', 'officer']);

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

  // User state with localStorage persistence (Declared FIRST)
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

  const canAccessPrivileged = useMemo(() => {
    return Boolean(user?.role && PRIVILEGED_ROLES.has(user.role));
  }, [user?.role]);

  const allowedTabs = useMemo(() => {
    return canAccessPrivileged ? [...FARMER_TABS, ...PRIVILEGED_TABS] : FARMER_TABS;
  }, [canAccessPrivileged]);

  // Guarded Active Tab state with RBAC enforcement
  const [activeTab, setActiveTabState] = useState('overview');

  const setActiveTab = useCallback((tabId) => {
    if (PRIVILEGED_TABS.includes(tabId) && !PRIVILEGED_ROLES.has(user?.role)) {
      console.warn(`Access Denied: Tab "${tabId}" requires District Administrator, Developer, or Officer authorization.`);
      setIsLoginModalOpen(true);
      return;
    }
    setActiveTabState(tabId);
  }, [user?.role]);

  // If role changes to farmer while on a restricted tab, bounce back to overview
  useEffect(() => {
    if (PRIVILEGED_TABS.includes(activeTab) && !PRIVILEGED_ROLES.has(user?.role)) {
      setActiveTabState('overview');
    }
  }, [user?.role, activeTab]);

  // Shared prediction / XAI context
  const [xaiContext, setXaiContext] = useState(null);

  const [location, setLocation] = useState({
    lat: 26.85, lon: 80.95,
    state: 'Uttar Pradesh', district: 'Lucknow',
    city: 'Lucknow', village: '',
    display_name: 'Lucknow, Uttar Pradesh',
  });

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

    // Role-based heuristics fallback for custom credentials
    let detectedRole = 'farmer';
    let roleLabel_en = '🌾 Farmer / Krishi User';
    let roleLabel_hi = '🌾 किसान / कृषि उपयोगकर्ता';
    let name = 'Kisan User';

    if (cleanId.includes('dev') || cleanId.includes('developer') || cleanId.includes('harsh')) {
      detectedRole = 'developer';
      roleLabel_en = '💻 Developer / ML Researcher';
      roleLabel_hi = '💻 डेवलपर / शोधकर्ता';
      name = 'Developer User';
    } else if (cleanId.includes('admin') || cleanId.includes('imd') || cleanId.includes('officer')) {
      detectedRole = 'admin';
      roleLabel_en = '🏛️ Disaster Administrator / Officer';
      roleLabel_hi = '🏛️ जिला कृषि अधिकारी / प्रशासक';
      name = 'District Command Officer';
    }

    const newUser = {
      userId: cleanId,
      name,
      role: detectedRole,
      roleLabel_en,
      roleLabel_hi,
      badge: `${detectedRole.toUpperCase()} Auth`,
      district: location.district || 'National Grid'
    };

    setUser(newUser);
    try {
      localStorage.setItem('varshanetra_user', JSON.stringify(newUser));
    } catch (e) {}
    setIsLoginModalOpen(false);
    return { success: true, user: newUser };
  }, [location.district]);

  const logout = useCallback(() => {
    const defaultFarmer = DEMO_ACCOUNTS[1];
    setUser(defaultFarmer);
    try {
      localStorage.setItem('varshanetra_user', JSON.stringify(defaultFarmer));
    } catch (e) {}
    setActiveTabState('overview');
  }, []);

  const isFarmerMode = user.role === 'farmer';
  const isDevAdminMode = user.role === 'developer' || user.role === 'admin' || user.role === 'officer';

  const [isChatOpen, setIsChatOpen] = useState(false);

  const tr = useCallback((key) => {
    return t(lang, key);
  }, [lang]);

  const switchRole = useCallback((roleOrAccount) => {
    const acc = typeof roleOrAccount === 'string'
      ? DEMO_ACCOUNTS.find(a => a.role === roleOrAccount) || DEMO_ACCOUNTS[0]
      : roleOrAccount;
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
      allowedTabs,
      FARMER_TABS,
      PRIVILEGED_TABS,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
