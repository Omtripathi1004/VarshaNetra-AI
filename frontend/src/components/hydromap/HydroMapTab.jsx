import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import { IMD_METEOROLOGICAL_DIVISIONS_GEOJSON } from '../../data/indiaGeoJson';
import { INDIA_LOCATIONS } from '../../data/indiaLocations';

// Default India National Geographic Center & Zoom
const INDIA_DEFAULT_CENTER = [78.9629, 22.5937]; // Longitude, Latitude
const INDIA_DEFAULT_ZOOM = 4.8;

// Function to resolve MapTiler MapLibre style with reliable fallback
const getMapStyle = (apiKey, basemapMode = 'hybrid') => {
  const cleanKey = (apiKey || '').trim();
  const isSatellite = basemapMode === 'satellite';
  const styleId = isSatellite ? 'satellite' : 'hybrid';

  if (cleanKey && cleanKey !== 'YOUR_KEY') {
    // Official MapTiler MapLibre-compatible style endpoint for Satellite or Hybrid
    return `https://api.maptiler.com/maps/${styleId}/style.json?key=${cleanKey}`;
  }

  // Reliable high-resolution raster tile fallback when API key is pending
  const fallbackTiles = isSatellite || basemapMode === 'hybrid'
    ? ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}']
    : ['https://a.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'];

  return {
    version: 8,
    sources: {
      'basemap-fallback': {
        type: 'raster',
        tiles: fallbackTiles,
        tileSize: 256,
        attribution: '&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    },
    layers: [
      {
        id: 'basemap-fallback-layer',
        type: 'raster',
        source: 'basemap-fallback',
        minzoom: 0,
        maxzoom: 20
      }
    ]
  };
};

export default function HydroMapTab() {
  const { tr, lang, location, setLocation } = useApp();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const gpsMarkerRef = useRef(null);
  const clickMarkerRef = useRef(null);

  const [basemapMode, setBasemapMode] = useState('hybrid'); // 'satellite' | 'hybrid'
  const [activeLayer, setActiveLayer] = useState('risk'); // 'risk' | 'rainfall' | 'monsoon' | 'crops'
  const [riskFilter, setRiskFilter] = useState('ALL'); // ALL | HIGH | MODERATE | LOW
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [clickedCoord, setClickedCoord] = useState(null);
  const [copiedGps, setCopiedGps] = useState(false);
  const [copiedClick, setCopiedClick] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [maptilerKeyAvailable, setMaptilerKeyAvailable] = useState(false);

  // Administrative entity filtering & selection state
  const [searchEntityType, setSearchEntityType] = useState('ALL');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedAdminEntity, setSelectedAdminEntity] = useState(null);

  const [mapStats, setMapStats] = useState({
    states_and_uts: 36,
    districts: 786,
    sub_districts_blocks: 5502,
    gram_panchayats_lgd: 1711,
    villages: 4716,
  });

  // Check if MapTiler Key is provided in environment
  useEffect(() => {
    const rawKey = import.meta.env.VITE_MAPTILER_API_KEY;
    if (rawKey && rawKey.trim() && rawKey.trim() !== 'YOUR_KEY') {
      setMaptilerKeyAvailable(true);
    }
  }, []);

  useEffect(() => {
    api.getMapStats().then(res => {
      if (res.data?.states_and_uts) setMapStats(res.data);
    }).catch(() => {});
  }, []);

  // Server-side administrative search with debouncing
  useEffect(() => {
    const q = searchQuery.trim();
    if (!q || q.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await api.searchAdminGeo(q, searchEntityType, '', '', 12, 0);
        if (res.data?.results) {
          setSearchResults(res.data.results);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        console.warn('Admin geo search fallback:', err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, searchEntityType]);

  // Helper to attach/restore all VarshaNetra GIS layers & GeoJSON sources
  const setupMapOverlays = useCallback((map) => {
    if (!map) return;
    try {
      if (!map.getSource('imd-divisions')) {
        map.addSource('imd-divisions', {
          type: 'geojson',
          data: IMD_METEOROLOGICAL_DIVISIONS_GEOJSON
        });
      }

      if (!map.getLayer('imd-divisions-fill')) {
        map.addLayer({
          id: 'imd-divisions-fill',
          type: 'fill',
          source: 'imd-divisions',
          paint: {
            'fill-color': [
              'match',
              ['get', 'risk_level'],
              'CRITICAL', '#dc2626',
              'HIGH', '#ef4444',
              'MODERATE', '#f59e0b',
              'LOW', '#10b981',
              '#06b6d4'
            ],
            'fill-opacity': 0.32
          }
        });
      }

      if (!map.getLayer('imd-divisions-border')) {
        map.addLayer({
          id: 'imd-divisions-border',
          type: 'line',
          source: 'imd-divisions',
          paint: {
            'line-color': [
              'match',
              ['get', 'risk_level'],
              'CRITICAL', '#f87171',
              'HIGH', '#f87171',
              'MODERATE', '#fbbf24',
              'LOW', '#34d399',
              '#38bdf8'
            ],
            'line-width': 1.8,
            'line-opacity': 0.85
          }
        });
      }
    } catch (e) {
      console.warn('Overlay setup error:', e);
    }
  }, []);

  // Initialize MapLibre GL Map Engine
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const maptilerApiKey = import.meta.env.VITE_MAPTILER_API_KEY;
    const initialStyle = getMapStyle(maptilerApiKey, 'hybrid');

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: initialStyle,
      center: [INDIA_DEFAULT_CENTER[0], INDIA_DEFAULT_CENTER[1]],
      zoom: INDIA_DEFAULT_ZOOM,
      minZoom: 3.5,
      maxZoom: 18,
      maxBounds: [
        [60.0, 5.0],   // Southwest boundary (Indian Ocean / Arabian Sea)
        [102.0, 39.0]  // Northeast boundary (Himalayas / Bay of Bengal)
      ]
    });

    // Map Controls
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
    map.addControl(new maplibregl.FullscreenControl(), 'top-right');
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 100, unit: 'metric' }), 'bottom-left');

    // On style load / basemap switch: restore all custom layers and sources
    map.on('style.load', () => {
      setupMapOverlays(map);
      setMapLoaded(true);
    });

    map.on('load', () => {
      setupMapOverlays(map);

      // Hover & Click Interactivity on Division Polygons
      map.on('mousemove', 'imd-divisions-fill', (e) => {
        if (e.features && e.features.length > 0) {
          map.getCanvas().style.cursor = 'pointer';
        }
      });

      map.on('mouseleave', 'imd-divisions-fill', () => {
        map.getCanvas().style.cursor = '';
      });

      map.on('click', 'imd-divisions-fill', (e) => {
        if (e.features && e.features.length > 0) {
          const props = e.features[0].properties;
          setSelectedFeature(props);
        }
      });

      // Canvas Click Handler (Drop Pin & Coordinate HUD)
      map.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        setClickedCoord({ lat, lon: lng });
      });

      mapRef.current = map;
      setMapLoaded(true);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [setupMapOverlays]);

  // Seamless Basemap Switcher (Satellite ↔ Hybrid) on existing MapLibre instance
  const handleSwitchBasemap = useCallback((mode) => {
    if (mode === basemapMode || !mapRef.current) return;
    setBasemapMode(mode);
    const maptilerApiKey = import.meta.env.VITE_MAPTILER_API_KEY;
    const nextStyle = getMapStyle(maptilerApiKey, mode);
    mapRef.current.setStyle(nextStyle);
  }, [basemapMode]);


  // Update GPS Pulsing Marker when location updates
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;
    const lng = location.lon || 80.95;
    const lat = location.lat || 26.85;

    if (!gpsMarkerRef.current) {
      const el = document.createElement('div');
      el.className = 'current-gps-marker';
      el.innerHTML = `
        <div class="gps-pulse-ring"></div>
        <div class="gps-center-dot"></div>
      `;
      el.style.width = '32px';
      el.style.height = '32px';

      gpsMarkerRef.current = new maplibregl.Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(map);
    } else {
      gpsMarkerRef.current.setLngLat([lng, lat]);
    }
  }, [location.lat, location.lon, mapLoaded]);

  // Update Click Marker when clickedCoord updates
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !clickedCoord) return;
    const map = mapRef.current;

    if (!clickMarkerRef.current) {
      const el = document.createElement('div');
      el.className = 'map-clicked-pin';
      el.style.fontSize = '26px';
      el.style.cursor = 'pointer';
      el.innerHTML = '📍';

      clickMarkerRef.current = new maplibregl.Marker({ element: el })
        .setLngLat([clickedCoord.lon, clickedCoord.lat])
        .addTo(map);
    } else {
      clickMarkerRef.current.setLngLat([clickedCoord.lon, clickedCoord.lat]);
    }
  }, [clickedCoord, mapLoaded]);

  // Filter IMD Divisions by Risk Level or Active Layer
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;
    if (!map.getLayer('imd-divisions-fill')) return;

    if (activeLayer === 'risk') {
      if (riskFilter === 'ALL') {
        map.setFilter('imd-divisions-fill', null);
        map.setFilter('imd-divisions-border', null);
      } else {
        const filterExpr = ['==', ['get', 'risk_level'], riskFilter];
        map.setFilter('imd-divisions-fill', filterExpr);
        map.setFilter('imd-divisions-border', filterExpr);
      }
      map.setPaintProperty('imd-divisions-fill', 'fill-color', [
        'match',
        ['get', 'risk_level'],
        'CRITICAL', '#dc2626',
        'HIGH', '#ef4444',
        'MODERATE', '#f59e0b',
        'LOW', '#10b981',
        '#06b6d4'
      ]);
      map.setPaintProperty('imd-divisions-fill', 'fill-opacity', 0.32);
    } else if (activeLayer === 'rainfall') {
      map.setFilter('imd-divisions-fill', null);
      map.setFilter('imd-divisions-border', null);
      map.setPaintProperty('imd-divisions-fill', 'fill-color', [
        'match',
        ['get', 'risk_level'],
        'CRITICAL', '#7c3aed',
        'HIGH', '#2563eb',
        'MODERATE', '#0284c7',
        'LOW', '#06b6d4',
        '#0284c7'
      ]);
      map.setPaintProperty('imd-divisions-fill', 'fill-opacity', 0.42);
    } else if (activeLayer === 'monsoon') {
      map.setFilter('imd-divisions-fill', null);
      map.setFilter('imd-divisions-border', null);
      map.setPaintProperty('imd-divisions-fill', 'fill-color', [
        'match',
        ['get', 'risk_level'],
        'CRITICAL', '#0ea5e9',
        'HIGH', '#38bdf8',
        'MODERATE', '#818cf8',
        'LOW', '#34d399',
        '#38bdf8'
      ]);
      map.setPaintProperty('imd-divisions-fill', 'fill-opacity', 0.35);
    } else if (activeLayer === 'crops') {
      map.setFilter('imd-divisions-fill', null);
      map.setFilter('imd-divisions-border', null);
      map.setPaintProperty('imd-divisions-fill', 'fill-color', [
        'match',
        ['get', 'risk_level'],
        'LOW', '#10b981',
        'MODERATE', '#84cc16',
        'HIGH', '#eab308',
        'CRITICAL', '#f97316',
        '#10b981'
      ]);
      map.setPaintProperty('imd-divisions-fill', 'fill-opacity', 0.38);
    }
  }, [activeLayer, riskFilter, mapLoaded, basemapMode]);

  // Handle Location Selection with Official Hierarchy Zoom
  const handleSelectSearchResult = useCallback(async (res) => {
    setSearchQuery('');
    setSearchResults([]);

    const targetLat = res.latitude || (location.lat ?? 26.85);
    const targetLon = res.longitude || (location.lon ?? 80.95);

    // Zoom hierarchy: India -> State (6.5) -> District (9.0) -> Sub-district/Block (11.5) -> Village/Panchayat (14.5)
    let targetZoom = 9.0;
    if (res.entity_type === 'STATE') targetZoom = 6.5;
    else if (res.entity_type === 'DISTRICT') targetZoom = 9.0;
    else if (res.entity_type === 'SUB_DISTRICT' || res.entity_type === 'BLOCK') targetZoom = 11.5;
    else if (res.entity_type === 'GRAM_PANCHAYAT' || res.entity_type === 'VILLAGE') targetZoom = 14.5;

    setLocation({
      lat: targetLat,
      lon: targetLon,
      state: res.state,
      district: res.district,
      sub_district: res.sub_district || '',
      block: res.block || '',
      village: res.village || '',
      panchayat: res.panchayat || '',
      display_name: res.display_name || res.name,
    });

    setClickedCoord({ lat: targetLat, lon: targetLon });

    // Fetch detailed profile for rich HUD
    try {
      const details = await api.getAdminGeoDetails(res.entity_type, res.id);
      if (details.data) {
        setSelectedAdminEntity(details.data);
      } else {
        setSelectedAdminEntity(res);
      }
    } catch {
      setSelectedAdminEntity(res);
    }

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [targetLon, targetLat],
        zoom: targetZoom,
        essential: true,
        duration: 2000
      });
    }
  }, [setLocation, location.lat, location.lon]);

  // Re-center on GPS Location
  const handleFlyToGps = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [location.lon || 80.95, location.lat || 26.85],
        zoom: 9,
        essential: true,
        duration: 1800
      });
    }
  };

  // Reset to National India View
  const handleResetIndiaView = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [INDIA_DEFAULT_CENTER[0], INDIA_DEFAULT_CENTER[1]],
        zoom: INDIA_DEFAULT_ZOOM,
        essential: true,
        duration: 1800
      });
    }
  };

  const copyCoord = (text, type) => {
    navigator.clipboard?.writeText(text);
    if (type === 'gps') {
      setCopiedGps(true);
      setTimeout(() => setCopiedGps(false), 2000);
    } else {
      setCopiedClick(true);
      setTimeout(() => setCopiedClick(false), 2000);
    }
  };

  return (
    <div className="main-content">
      {/* HEADER CONTROLS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.65rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🗺️</span>
            <span>{tr('hydromap_title')}</span>
            <span style={{ fontSize: '0.68rem', padding: '0.2rem 0.55rem', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', fontWeight: 700 }}>
              MapLibre GL • MapTiler Engine
            </span>
          </h2>
          <p className="text-xs text-muted" style={{ margin: '0.2rem 0 0' }}>
            {lang === 'hi'
              ? 'सर्वे ऑफ इंडिया व पंचायती राज मंत्रालय (LGD) के संपूर्ण प्रशासनिक आंकड़ों पर आधारित उपग्रह व हाइब्रिड मानचित्र'
              : 'Survey of India official boundaries & Local Government Directory (LGD) national database with Satellite & Hybrid GIS'}
          </p>
        </div>

        {/* LAYER TOGGLES & BASEMAP SWITCHER & VIEW BUTTONS */}
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* SATELLITE ↔ HYBRID BASEMAP SELECTOR */}
          <div style={{
            display: 'flex',
            gap: '0.25rem',
            background: 'rgba(18, 14, 40, 0.9)',
            padding: '0.28rem',
            borderRadius: '12px',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
          }}>
            <button
              onClick={() => handleSwitchBasemap('satellite')}
              title="MapTiler High-Resolution Satellite View"
              style={{
                background: basemapMode === 'satellite' ? 'linear-gradient(135deg, #059669, #10b981)' : 'transparent',
                color: basemapMode === 'satellite' ? '#ffffff' : '#94a3b8',
                border: 'none',
                padding: '0.35rem 0.65rem',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <span>🛰️</span>
              <span>{lang === 'hi' ? 'उपग्रह' : 'Satellite'}</span>
            </button>
            <button
              onClick={() => handleSwitchBasemap('hybrid')}
              title="MapTiler Hybrid View (Satellite Imagery with Vector Borders & Roads)"
              style={{
                background: basemapMode === 'hybrid' ? 'linear-gradient(135deg, #0284c7, #38bdf8)' : 'transparent',
                color: basemapMode === 'hybrid' ? '#ffffff' : '#94a3b8',
                border: 'none',
                padding: '0.35rem 0.65rem',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <span>🗺️</span>
              <span>{lang === 'hi' ? 'हाइब्रिड' : 'Hybrid'}</span>
            </button>
          </div>

          {/* APPLICATION THEMATIC GIS LAYERS */}
          <div style={{ display: 'flex', gap: '0.3rem', background: 'rgba(18, 14, 40, 0.85)', padding: '0.3rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.09)' }}>
            {[
              { id: 'risk', label_en: '⚠️ Risk Zones', label_hi: '⚠️ जोखिम क्षेत्र' },
              { id: 'rainfall', label_en: '🌧️ Rainfall', label_hi: '🌧️ वर्षा स्तर' },
              { id: 'monsoon', label_en: '🌊 Monsoon Phase', label_hi: '🌊 मानसून चरण' },
              { id: 'crops', label_en: '🌾 Crop Belts', label_hi: '🌾 फसल क्षेत्र' },
            ].map(l => (
              <button
                key={l.id}
                onClick={() => setActiveLayer(l.id)}
                style={{
                  background: activeLayer === l.id ? 'linear-gradient(135deg, #0284c7, #0369a1)' : 'transparent',
                  color: activeLayer === l.id ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  padding: '0.35rem 0.7rem',
                  borderRadius: '8px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {lang === 'hi' ? l.label_hi : l.label_en}
              </button>
            ))}
          </div>

          {/* Quick Action Buttons */}
          <button
            onClick={handleFlyToGps}
            title="Recenter on current GPS telemetry"
            style={{
              background: 'rgba(13, 9, 28, 0.85)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              padding: '0.38rem 0.65rem',
              borderRadius: '10px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            🎯 {lang === 'hi' ? 'मेरा स्थान' : 'My GPS'}
          </button>
          <button
            onClick={handleResetIndiaView}
            title="Reset to National India View"
            style={{
              background: 'rgba(13, 9, 28, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#cbd5e1',
              padding: '0.38rem 0.65rem',
              borderRadius: '10px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            🇮🇳 {lang === 'hi' ? 'भारत दृश्य' : 'India View'}
          </button>
        </div>
      </div>

      {/* SEARCH BAR & ENTITY TYPE FILTER CONTROLS */}
      <div style={{ position: 'relative', marginBottom: '0.85rem' }}>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Entity Type Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(15, 23, 42, 0.75)', padding: '0.2rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { id: 'ALL', label_en: 'All Entities', label_hi: 'सभी स्तर' },
              { id: 'DISTRICT', label_en: 'Districts', label_hi: 'ज़िले' },
              { id: 'BLOCK', label_en: 'Blocks / Tehsils', label_hi: 'ब्लॉक/तहसील' },
              { id: 'GRAM_PANCHAYAT', label_en: 'Gram Panchayats', label_hi: 'ग्राम पंचायत' },
              { id: 'VILLAGE', label_en: 'Villages', label_hi: 'गाँव' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSearchEntityType(tab.id)}
                style={{
                  background: searchEntityType === tab.id ? 'rgba(56, 189, 248, 0.22)' : 'transparent',
                  color: searchEntityType === tab.id ? '#38bdf8' : '#94a3b8',
                  border: searchEntityType === tab.id ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                  padding: '0.25rem 0.55rem',
                  borderRadius: '6px',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {lang === 'hi' ? tab.label_hi : tab.label_en}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
            <input
              className="input"
              style={{ width: '100%', paddingLeft: '2.4rem', fontSize: '0.86rem' }}
              placeholder={lang === 'hi' ? '🔍 भारत का कोई भी राज्य, जिला, ब्लॉक, ग्राम पंचायत या गांव खोजें...' : '🔍 Search any Indian State, District, Block, Gram Panchayat (LGD), or Village...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}>
              {isSearching ? '⏳' : '📍'}
            </span>
          </div>

          {/* RISK FILTER */}
          {activeLayer === 'risk' && (
            <select
              className="input"
              value={riskFilter}
              onChange={e => setRiskFilter(e.target.value)}
              style={{ width: 'auto', fontSize: '0.8rem', fontWeight: 600 }}
            >
              <option value="ALL">All Hazard Levels</option>
              <option value="HIGH">🔴 High / Critical Risk</option>
              <option value="MODERATE">🟡 Moderate Risk</option>
              <option value="LOW">🟢 Low Risk Only</option>
            </select>
          )}
        </div>

        {/* AUTOCOMPLETE POPUP */}
        {searchResults.length > 0 && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1000,
            background: 'rgba(15, 23, 42, 0.98)', border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '12px', marginTop: '0.35rem', boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
            maxHeight: '320px', overflowY: 'auto'
          }}>
            {searchResults.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectSearchResult(item)}
                style={{
                  padding: '0.65rem 0.95rem', borderBottom: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(56, 189, 248, 0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <strong style={{ fontSize: '0.86rem', color: '#f1f5f9' }}>
                      {lang === 'hi' ? (item.name_hi || item.name) : item.name}
                    </strong>
                    {item.lgd_code && (
                      <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                        LGD: {item.lgd_code}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                    {item.hierarchy || `${item.district || ''}, ${item.state || ''}`}
                  </div>
                </div>
                <span className="badge" style={{
                  background: item.entity_type === 'STATE' ? 'rgba(168, 85, 247, 0.2)' :
                             item.entity_type === 'DISTRICT' ? 'rgba(2, 132, 199, 0.2)' :
                             item.entity_type === 'GRAM_PANCHAYAT' ? 'rgba(234, 179, 8, 0.2)' :
                             item.entity_type === 'VILLAGE' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(56, 189, 248, 0.15)',
                  color: item.entity_type === 'STATE' ? '#c084fc' :
                         item.entity_type === 'DISTRICT' ? '#38bdf8' :
                         item.entity_type === 'GRAM_PANCHAYAT' ? '#fde047' :
                         item.entity_type === 'VILLAGE' ? '#34d399' : '#38bdf8',
                  fontSize: '0.65rem',
                  fontWeight: 700
                }}>
                  {item.entity_type || 'LOCATION'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MAP CANVAS CONTAINER */}
      <div style={{ position: 'relative', height: '560px', minHeight: '440px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}>
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

        {/* MAP OVERLAY: AUTHORITATIVE ADMINISTRATIVE ENTITY HUD */}
        {selectedAdminEntity && (
          <div style={{
            position: 'absolute', top: '1rem', left: '1rem', zIndex: 10,
            background: 'rgba(13, 9, 28, 0.95)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '14px',
            padding: '0.9rem 1.15rem', maxWidth: '360px', boxShadow: '0 8px 28px rgba(0,0,0,0.6)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span className="badge" style={{
                background: selectedAdminEntity.entity_type === 'VILLAGE' ? 'rgba(16, 185, 129, 0.25)' :
                           selectedAdminEntity.entity_type === 'GRAM_PANCHAYAT' ? 'rgba(234, 179, 8, 0.25)' : 'rgba(2, 132, 199, 0.25)',
                color: selectedAdminEntity.entity_type === 'VILLAGE' ? '#34d399' :
                       selectedAdminEntity.entity_type === 'GRAM_PANCHAYAT' ? '#fde047' : '#38bdf8',
                fontSize: '0.68rem', fontWeight: 800
              }}>
                🏛️ {selectedAdminEntity.entity_type} {selectedAdminEntity.lgd_code ? `• LGD: ${selectedAdminEntity.lgd_code}` : ''}
              </span>
              <button
                onClick={() => setSelectedAdminEntity(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.95rem' }}
              >✕</button>
            </div>

            <h4 style={{ margin: '0.15rem 0 0.3rem', fontSize: '1.05rem', color: '#f1f5f9', fontWeight: 800 }}>
              {lang === 'hi' ? (selectedAdminEntity.name_hi || selectedAdminEntity.name) : selectedAdminEntity.name}
            </h4>

            {/* Hierarchy Path */}
            <div style={{ fontSize: '0.73rem', color: '#38bdf8', fontWeight: 600, marginBottom: '0.45rem' }}>
              {selectedAdminEntity.state}
              {selectedAdminEntity.district ? ` ➔ ${selectedAdminEntity.district}` : ''}
              {selectedAdminEntity.sub_district ? ` ➔ ${selectedAdminEntity.sub_district}` : ''}
              {selectedAdminEntity.block ? ` ➔ ${selectedAdminEntity.block}` : ''}
            </div>

            {/* Entity Decoupled Details */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.45rem', fontSize: '0.74rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {selectedAdminEntity.entity_type === 'VILLAGE' && (
                <>
                  <div>🏛️ <strong>Associated Panchayat:</strong> <span style={{ color: '#fde047' }}>{selectedAdminEntity.panchayat_name || 'Direct Revenue Administration'}</span></div>
                  <div>🌾 <strong>Soil Type:</strong> {selectedAdminEntity.soil_type || 'Alluvial Loam'}</div>
                </>
              )}
              {selectedAdminEntity.entity_type === 'GRAM_PANCHAYAT' && (
                <>
                  <div>📜 <strong>Panchayat Level:</strong> Gram Panchayat (LGD MoPR)</div>
                  <div>🏡 <strong>Governed Villages:</strong> <span style={{ color: '#34d399' }}>{selectedAdminEntity.villages_count || (selectedAdminEntity.villages_list?.length ?? 'Multiple Revenue Wards')}</span></div>
                  {selectedAdminEntity.villages_list && (
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8', background: 'rgba(255,255,255,0.04)', padding: '0.3rem 0.5rem', borderRadius: '6px' }}>
                      {selectedAdminEntity.villages_list.join(', ')}
                    </div>
                  )}
                </>
              )}
              {selectedAdminEntity.entity_type === 'DISTRICT' && (
                <>
                  <div>🏢 <strong>Headquarters:</strong> {selectedAdminEntity.headquarters || selectedAdminEntity.name}</div>
                  <div>📊 <strong>Sub-districts:</strong> {selectedAdminEntity.sub_districts_count || 4} Tehsils • {selectedAdminEntity.blocks_count || 3} Blocks</div>
                </>
              )}

              {/* Geometry notice requirement */}
              <div style={{ marginTop: '0.3rem', padding: '0.35rem 0.5rem', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', fontSize: '0.68rem', color: '#7dd3fc' }}>
                ℹ️ {selectedAdminEntity.geometry_note || 'Administrative record available; boundary geometry currently unavailable.'}
              </div>
            </div>
          </div>
        )}

        {/* MAP OVERLAY: SELECTED REGION HUD */}
        {selectedFeature && !selectedAdminEntity && (
          <div style={{
            position: 'absolute', top: '1rem', left: '1rem', zIndex: 10,
            background: 'rgba(13, 9, 28, 0.94)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px',
            padding: '0.85rem 1.1rem', maxWidth: '320px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span className="badge" style={{
                background: selectedFeature.risk_level === 'CRITICAL' ? '#dc2626' : selectedFeature.risk_level === 'HIGH' ? '#ef4444' : selectedFeature.risk_level === 'MODERATE' ? '#f59e0b' : '#10b981',
                color: '#fff', fontSize: '0.68rem', fontWeight: 800
              }}>
                {selectedFeature.risk_level} RISK
              </span>
              <button
                onClick={() => setSelectedFeature(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.9rem' }}
              >✕</button>
            </div>

            <h4 style={{ margin: '0.2rem 0', fontSize: '1.05rem', color: '#f1f5f9', fontWeight: 800 }}>
              {lang === 'hi' ? selectedFeature.name_hi : selectedFeature.name}
            </h4>
            <p style={{ margin: '0.2rem 0 0.5rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
              {lang === 'hi' ? selectedFeature.hazard_hi : selectedFeature.hazard}
            </p>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.4rem', fontSize: '0.74rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div>🌧️ 24h Rain: <strong style={{ color: '#38bdf8' }}>{selectedFeature.rainfall_24h_mm}</strong></div>
              <div>🌊 Monsoon Status: <strong style={{ color: '#a78bfa' }}>{selectedFeature.monsoon_phase}</strong></div>
              <div>🌾 Agro Zone: <strong style={{ color: '#34d399' }}>{selectedFeature.zone || 'Agro-climatic Basin'}</strong></div>
            </div>
          </div>
        )}

        {/* MAP OVERLAY: GPS & CLICK HUD */}
        <div style={{
          position: 'absolute', bottom: '1rem', right: '1rem', zIndex: 10,
          background: 'rgba(13, 9, 28, 0.94)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px',
          padding: '0.65rem 0.9rem', fontSize: '0.74rem', color: '#cbd5e1',
          display: 'flex', flexDirection: 'column', gap: '0.4rem', maxWidth: '280px'
        }}>
          <div>
            <div style={{ fontWeight: 700, color: '#38bdf8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>📍 Live Telemetry Hub:</span>
              <button
                onClick={() => copyCoord(`${location.lat.toFixed(4)}, ${location.lon.toFixed(4)}`, 'gps')}
                style={{ background: 'transparent', border: 'none', color: copiedGps ? '#34d399' : '#94a3b8', fontSize: '0.68rem', cursor: 'pointer', fontWeight: 600 }}
              >
                {copiedGps ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div>{location.lat.toFixed(4)}° N, {location.lon.toFixed(4)}° E (GPS ±12m)</div>
          </div>

          {clickedCoord && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.35rem' }}>
              <div style={{ fontWeight: 700, color: '#f59e0b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🎯 Clicked Coordinate:</span>
                <button
                  onClick={() => copyCoord(`${clickedCoord.lat.toFixed(4)}, ${clickedCoord.lon.toFixed(4)}`, 'click')}
                  style={{ background: 'transparent', border: 'none', color: copiedClick ? '#34d399' : '#94a3b8', fontSize: '0.68rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  {copiedClick ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <div>{clickedCoord.lat.toFixed(4)}° N, {clickedCoord.lon.toFixed(4)}° E</div>
            </div>
          )}
        </div>
      </div>

      {/* AUTHORITATIVE GEODATA STATS */}
      <div style={{ marginTop: '0.85rem', padding: '0.65rem 1rem', background: 'rgba(18, 14, 40, 0.65)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.72rem', color: '#94a3b8' }}>
        <div>
          🏛️ <strong>Authoritative Geographic Database (Survey of India & LGD):</strong>
        </div>
        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <span>States & UTs: <strong style={{ color: '#38bdf8' }}>{mapStats.states_and_uts}</strong></span>
          <span>Districts: <strong style={{ color: '#38bdf8' }}>{mapStats.districts}</strong></span>
          <span>Sub-Districts & Blocks: <strong style={{ color: '#38bdf8' }}>{Number(mapStats.sub_districts_blocks).toLocaleString()}</strong></span>
          <span>Gram Panchayats (LGD): <strong style={{ color: '#38bdf8' }}>{Number(mapStats.gram_panchayats_lgd).toLocaleString()}</strong></span>
          <span>Villages: <strong style={{ color: '#38bdf8' }}>{Number(mapStats.villages).toLocaleString()}</strong></span>
        </div>
      </div>
    </div>
  );
}

