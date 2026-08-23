import React, { createContext, useContext, useState } from 'react';
import { t } from '../../i18n/translations';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [location, setLocation] = useState({
    lat: 26.85, lon: 80.95,
    state: 'Uttar Pradesh', district: 'Lucknow',
    city: 'Lucknow', village: '',
    display_name: 'Lucknow, Uttar Pradesh',
  });

  const toggleLang = () => setLang(l => l === 'en' ? 'hi' : 'en');

  // tr() shorthand
  const tr = (key) => t(lang, key);

  return (
    <AppContext.Provider value={{ lang, toggleLang, location, setLocation, tr }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
