import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import { INDIA_LOCATIONS, ALL_SEARCHABLE_LOCATIONS, DEFAULT_DISTRICT_VILLAGES } from '../../data/indiaLocations';

export default function LocationBar() {
  const { tr, lang, location, setLocation } = useApp();
  const [mode, setMode] = useState('gps'); // 'gps' | 'search' | 'cascade'
  const [gpsLoading, setGpsLoading] = useState(false);
  
  // Instant search / Explore input
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchWrapperRef = useRef(null);

  // Cascading dropdown state (Strictly State-Scoped)
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState('Lucknow');
  const [selectedCity, setSelectedCity] = useState('Lucknow');
  const [villageInput, setVillageInput] = useState('');

  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [backendResults, setBackendResults] = useState([]);

  // Query backend authoritative administrative database
  useEffect(() => {
    const q = query.trim();
    if (!q || q.length < 2) {
      setBackendResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await api.searchAdminGeo(q, 'ALL', '', '', 8, 0);
        if (res.data?.results) {
          setBackendResults(res.data.results);
        }
      } catch {
        setBackendResults([]);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  // Combined suggestions: client index + backend LGD database
  const filteredSuggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 1) return [];
    
    const clientMatches = ALL_SEARCHABLE_LOCATIONS.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.state.toLowerCase().includes(q) ||
      (item.district && item.district.toLowerCase().includes(q))
    ).slice(0, 8);

    if (backendResults.length > 0) {
      const backendMapped = backendResults.map(b => ({
        name: b.name,
        state: b.state,
        district: b.district,
        city: b.district,
        type: b.entity_type === 'GRAM_PANCHAYAT' ? 'Gram Panchayat' : b.entity_type === 'VILLAGE' ? 'Village' : b.entity_type === 'DISTRICT' ? 'District' : 'State',
        display: b.display_name,
        lgd_code: b.lgd_code,
        latitude: b.latitude,
        longitude: b.longitude
      }));
      // Merge unique by name + state
      const seen = new Set();
      const combined = [];
      [...backendMapped, ...clientMatches].forEach(item => {
        const key = `${item.name}-${item.state}-${item.type}`;
        if (!seen.has(key)) {
          seen.add(key);
          combined.push(item);
        }
      });
      return combined.slice(0, 12);
    }

    return clientMatches;
  }, [query, backendResults]);

  // Available districts strictly for chosen state
  const availableDistricts = useMemo(() => {
    return INDIA_LOCATIONS[selectedState]?.districts || [];
  }, [selectedState]);

  // Available cities strictly for chosen state
  const availableCities = useMemo(() => {
    return INDIA_LOCATIONS[selectedState]?.cities || [];
  }, [selectedState]);

  // Available villages strictly for chosen state & district (4-5 villages)
  const availableVillages = useMemo(() => {
    const stateData = INDIA_LOCATIONS[selectedState];
    if (!stateData) return DEFAULT_DISTRICT_VILLAGES;
    const vilList = stateData.villages?.[selectedDistrict];
    return vilList && vilList.length > 0 ? vilList : DEFAULT_DISTRICT_VILLAGES;
  }, [selectedState, selectedDistrict]);

  // State change handler — resets district, city & village strictly to the new state
  const handleStateChange = (stateName) => {
    setSelectedState(stateName);
    const dists = INDIA_LOCATIONS[stateName]?.districts || [];
    const cities = INDIA_LOCATIONS[stateName]?.cities || [];
    const newDist = dists[0] || '';
    const newCity = cities[0] || '';
    setSelectedDistrict(newDist);
    setSelectedCity(newCity);
    setVillageInput('');
  };

  // District change handler — resets village to empty or first option for this specific district
  const handleDistrictChange = (distName) => {
    setSelectedDistrict(distName);
    setVillageInput('');
  };

  const handleGPS = useCallback(() => {
    if (!navigator.geolocation) { setError('Geolocation not supported.'); return; }
    setGpsLoading(true); setError('');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        try {
          const res = await api.resolveLocation({ lat, lon });
          setLocation({
            lat, lon,
            state: res.data.state || '',
            district: res.data.district || '',
            city: res.data.city || '',
            village: res.data.village || '',
            display_name: res.data.display_name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`,
          });
        } catch {
          setLocation({ lat, lon, display_name: `${lat.toFixed(4)}, ${lon.toFixed(4)}`, state:'', district:'', city:'', village:'' });
        }
        setGpsLoading(false);
      },
      (err) => { setError('GPS permission denied. Please select from the dropdown or search.'); setGpsLoading(false); },
      { timeout: 8000 }
    );
  }, [setLocation]);

  // Select from autocomplete suggestion list
  const handleSelectSuggestion = async (item) => {
    setQuery(item.name);
    setShowSuggestions(false);
    setSearching(true);
    setError('');
    
    if (item.latitude && item.longitude) {
      setLocation({
        lat: item.latitude,
        lon: item.longitude,
        state: item.state,
        district: item.district || '',
        city: item.city || item.district || '',
        village: item.type === 'Village' ? item.name : '',
        display_name: item.display || `${item.name}, ${item.district ? item.district + ', ' : ''}${item.state}`,
      });
      setSearching(false);
      return;
    }

    try {
      const res = await api.resolveLocation({
        state: item.state,
        district: item.district || '',
        city: item.city || '',
        village: item.type === 'Village' ? item.name : '',
      });
      setLocation({
        lat: res.data.latitude,
        lon: res.data.longitude,
        state: item.state,
        district: item.district || res.data.district || '',
        city: item.city || res.data.city || '',
        village: item.type === 'Village' ? item.name : '',
        display_name: item.display || res.data.display_name,
      });
    } catch {
      setError('Could not locate exact coordinates. Trying fallback.');
    }
    setSearching(false);
  };

  // Apply cascading dropdown selection
  const handleApplyCascade = async () => {
    setSearching(true);
    setError('');
    const loc = {
      state: selectedState,
      district: selectedDistrict,
      city: selectedCity,
      village: villageInput.trim(),
    };
    try {
      const res = await api.resolveLocation(loc);
      const parts = [villageInput.trim(), selectedCity, selectedDistrict, selectedState].filter(Boolean);
      setLocation({
        lat: res.data.latitude,
        lon: res.data.longitude,
        state: selectedState,
        district: selectedDistrict,
        city: selectedCity,
        village: villageInput.trim(),
        display_name: parts.join(', '),
      });
    } catch {
      setError('Could not resolve location. Please verify the selections.');
    }
    setSearching(false);
  };

  return (
    <div className="location-bar">
      <div className="location-bar-inner">
        {/* Toggle Modes */}
        <div className="location-toggle" style={{ flexWrap: 'wrap', gap: '0.4rem' }}>
          <button
            className={`location-mode-btn ${mode === 'gps' ? 'active' : ''}`}
            onClick={() => setMode('gps')}
          >
            📍 {lang === 'hi' ? 'लाइव GPS' : 'Live GPS'}
          </button>
          <button
            className={`location-mode-btn ${mode === 'search' ? 'active' : ''}`}
            onClick={() => setMode('search')}
          >
            🔍 {lang === 'hi' ? 'खोजें (ऑटो-सुझाव)' : 'Quick Search (Autocomplete)'}
          </button>
          <button
            className={`location-mode-btn ${mode === 'cascade' ? 'active' : ''}`}
            onClick={() => setMode('cascade')}
          >
            📂 {lang === 'hi' ? 'राज्य → जिला → ग्राम चयन' : 'State → District → Village (Isolated)'}
          </button>
        </div>

        {/* 1. Live GPS Mode */}
        {mode === 'gps' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
            <button className="location-gps-btn" onClick={handleGPS} disabled={gpsLoading}>
              {gpsLoading ? tr('gps_detecting') : tr('use_gps')}
            </button>
            <span className="text-xs text-muted">
              {lang === 'hi'
                ? '→ ब्राउज़र GPS से आपके सटीक निर्देशांक पर लाइव मौसम डेटा लोड होगा'
                : '→ Auto-fetches live Open-Meteo weather and ML predictions for your exact device GPS coordinates'}
            </span>
          </div>
        )}

        {/* 2. Quick Search Autocomplete Mode (Cleanly labeled with State) */}
        {mode === 'search' && (
          <div style={{ position: 'relative', marginTop: '0.3rem' }} ref={searchWrapperRef}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
                <input
                  className="input"
                  placeholder={lang === 'hi' ? 'स्थान खोजें (उदा. Pune, Ludhiana, Bihta, Sanand)...' : 'Type state, district, or village (e.g. Pune, Ludhiana, Bihta, Sanand)...'}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  style={{ fontSize: '0.88rem', paddingLeft: '2.2rem' }}
                />
                <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}>
                  🔍
                </span>
                {query && (
                  <button
                    onClick={() => { setQuery(''); setShowSuggestions(false); }}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem' }}
                  >
                    ✕
                  </button>
                )}
              </div>
              <span className="text-xs text-muted">
                {lang === 'hi' ? 'स्पष्ट राज्य टैग के साथ परिणाम' : 'Results clearly separated by state'}
              </span>
            </div>

            {/* Dropdown Suggestions List */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 200,
                background: 'rgba(13, 18, 37, 0.98)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-glow)',
                borderRadius: 'var(--radius-md)',
                marginTop: '0.4rem',
                boxShadow: '0 12px 36px rgba(0,0,0,0.7), 0 0 20px rgba(56,189,248,0.2)',
                maxHeight: '280px',
                overflowY: 'auto'
              }}>
                <div style={{ padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  MATCHING LOCATIONS ({filteredSuggestions.length})
                </div>
                {filteredSuggestions.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectSuggestion(item)}
                    style={{
                      padding: '0.65rem 0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(255,255,255,0.03)',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      transition: 'background var(--transition)'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(56,189,248,0.12)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>{item.name}</strong>
                      <span className="text-xs" style={{ marginLeft: '0.5rem', color: 'var(--accent-blue)' }}>
                        • {item.state} {item.district && item.type === 'Village' ? `(${item.district})` : ''}
                      </span>
                    </div>
                    <span className={`badge ${item.type === 'State' ? 'badge-purple' : item.type === 'District' ? 'badge-info' : item.type === 'Village' ? 'badge-warning' : 'badge-success'}`} style={{ fontSize: '0.68rem' }}>
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Cascading Mode (Strictly isolated by chosen State -> District -> 4-5 Villages) */}
        {mode === 'cascade' && (
          <div className="location-manual" style={{ marginTop: '0.3rem' }}>
            {/* State Select */}
            <div className="location-input-group">
              <span className="location-label">1. {tr('state')}</span>
              <select
                className="select"
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
              >
                {Object.keys(INDIA_LOCATIONS).map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* District Select (Filtered strictly to this State) */}
            <div className="location-input-group">
              <span className="location-label">2. {tr('district')} ({availableDistricts.length})</span>
              <select
                className="select"
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
              >
                {availableDistricts.map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>

            {/* City / Block Select (Filtered strictly to this State) */}
            <div className="location-input-group">
              <span className="location-label">3. {tr('city')}</span>
              <select
                className="select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
              >
                {availableCities.map(ct => (
                  <option key={ct} value={ct}>{ct}</option>
                ))}
                {!availableCities.includes(selectedDistrict) && (
                  <option value={selectedDistrict}>{selectedDistrict} (HQ)</option>
                )}
              </select>
            </div>

            {/* Village / Panchayat Select (Strictly 4-5 villages for this specific District) */}
            <div className="location-input-group">
              <span className="location-label">4. {tr('village')} / Gram ({availableVillages.length})</span>
              <select
                className="select"
                value={villageInput}
                onChange={(e) => setVillageInput(e.target.value)}
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem', minWidth: '160px' }}
              >
                <option value="">-- {lang === 'hi' ? 'सभी ग्राम / ब्लॉक मुख्यालय' : 'All Villages / Block HQ'} --</option>
                {availableVillages.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button
                className="location-search-btn"
                onClick={handleApplyCascade}
                disabled={searching}
                style={{ background: 'var(--grad-monsoon)', color: '#fff', border: 'none', boxShadow: '0 4px 12px rgba(56,189,248,0.3)' }}
              >
                {searching ? '⏳ Updating...' : `✓ ${lang === 'hi' ? 'लागू करें' : 'Apply'}`}
              </button>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <p style={{ color: 'var(--accent-red)', fontSize: '0.78rem', marginTop: '0.4rem' }}>
            ⚠️ {error}
          </p>
        )}

        {/* Active Location Display */}
        <div className="location-display" style={{ marginTop: '0.6rem' }}>
          <span className="pin">📍</span>
          <span>{lang === 'hi' ? 'सक्रिय स्थान' : 'Active Location'}:</span>
          <strong style={{ color: 'var(--accent-cyan)' }}>{location.display_name}</strong>
          {location.lat != null && (
            <span className="text-muted text-xs">
              ({location.lat?.toFixed(4)}°N, {location.lon?.toFixed(4)}°E)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
