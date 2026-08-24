import React, { createContext, useContext, useState } from 'react';
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

export function AppProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [location, setLocation] = useState({
    lat: 26.85, lon: 80.95,
    state: 'Uttar Pradesh', district: 'Lucknow',
    city: 'Lucknow', village: '',
    display_name: 'Lucknow, Uttar Pradesh',
  });

  // Default logged in user is Farmer
  const [user, setUser] = useState(DEMO_ACCOUNTS[0]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const login = (userId, password) => {
    const matched = DEMO_ACCOUNTS.find(
      u => u.userId.toLowerCase() === (userId || '').trim().toLowerCase() && u.password === password
    );
    if (matched) {
      setUser(matched);
      setIsLoginModalOpen(false);
      return { success: true, user: matched };
    }
    // Fallback: match by role/ID prefix
    const byRole = DEMO_ACCOUNTS.find(u => (userId || '').toLowerCase().includes(u.role));
    if (byRole) {
      setUser(byRole);
      setIsLoginModalOpen(false);
      return { success: true, user: byRole };
    }
    return { success: false, error: 'Invalid User ID or Password' };
  };

  const logout = () => {
    setUser(DEMO_ACCOUNTS[0]);
  };

  const toggleLang = () => setLang(l => l === 'en' ? 'hi' : 'en');

  // tr() shorthand
  const tr = (key) => t(lang, key);

  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <AppContext.Provider value={{
      lang,
      toggleLang,
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
      DEMO_ACCOUNTS
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
