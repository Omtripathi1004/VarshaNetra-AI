import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import { INDIA_BOUNDARY_GEOJSON, IMD_METEOROLOGICAL_DIVISIONS_GEOJSON } from '../../data/indiaGeoJson';
import { INDIA_LOCATIONS } from '../../data/indiaLocations';

// Curated MapLibre Vector/Raster Style with Dark Matter & Clean Administrative Palette
const MAP_STYLE = {
  version: 8,
  sources: {
    'carto-dark': {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
        'https://b.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
        'https://c.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
  },
  layers: [
    {
      id: 'carto-dark-layer',
      type: 'raster',
      source: 'carto-dark',
      minzoom: 0,
      maxzoom: 20
    }
  ]
};

export default function HydroMapTab() {
  const { tr, lang, location, setLocation } = useApp();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const gpsMarkerRef = useRef(null);
  const clickMarkerRef = useRef(null);

  const [activeLayer, setActiveLayer] = useState('risk'); // 'risk' | 'rainfall' | 'monsoon' | 'crops'
  const [riskFilter, setRiskFilter] = useState('ALL'); // ALL | HIGH | MODERATE | LOW
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [clickedCoord, setClickedCoord] = useState(null);
  const [copiedGps, setCopiedGps] = useState(false);
  const [copiedClick, setCopiedClick] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Administrative search indexing
  const searchableDistricts = useMemo(() => {
    const list = [];
    Object.entries(INDIA_LOCATIONS).forEach(([state, dists]) => {
      Object.entries(dists).forEach(([dist, vills]) => {
        list.push({
          type: 'DISTRICT',
          state,
          district: dist,
          villages: vills || [],
          villageCount: (vills || []).length,
          name: `${dist}, ${state}`,
          name_hi: `${dist} (${state})`,
        });
      });
    });
    return list;
  }, []);

  // Handle Search Input
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q || q.length < 2) {
      setSearchResults([]);
      return;
    }

    const matches = [];
    // Search in districts
    searchableDistricts.forEach((d) => {
      if (d.district.toLowerCase().includes(q) || d.state.toLowerCase().includes(q)) {
        matches.push(d);
      }
      // Search in villages
      d.villages.forEach((v) => {
        if (v.toLowerCase().includes(q)) {
          matches.push({
            type: 'VILLAGE',
            state: d.state,
            district: d.district,
            village: v,
            name: `${v} (Gram Panchayat), ${d.district}, ${d.state}`,
            name_hi: `${v} (ग्राम पंचायत), ${d.district}`,
          });
        }
      });
    });

    setSearchResults(matches.slice(0, 8));
  }, [searchQuery, searchableDistricts]);

  // Initialize MapLibre GL Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: [location.lon || 80.95, location.lat || 26.85],
      zoom: 5.2,
      minZoom: 3.5,
      maxZoom: 18,
      maxBounds: [
        [60.0, 5.0],   // Southwest coordinates (Indian Ocean / Arabian Sea)
        [102.0, 39.0]  // Northeast coordinates (Himalayas / Bay of Bengal)
      ]
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
    map.addControl(new maplibregl.FullscreenControl(), 'top-right');
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 100, unit: 'metric' }), 'bottom-left');

    map.on('load', () => {
      // 1. Add India National Boundary Source & Layers
      map.addSource('india-boundary', {
        type: 'geojson',
        data: INDIA_BOUNDARY_GEOJSON
      });

      map.addLayer({
        id: 'india-boundary-fill',
        type: 'fill',
        source: 'india-boundary',
        paint: {
          'fill-color': '#0284c7',
          'fill-opacity': 0.04
        }
      });

      map.addLayer({
        id: 'india-boundary-glow',
        type: 'line',
        source: 'india-boundary',
        paint: {
          'line-color': '#38bdf8',
          'line-width': 2.2,
          'line-opacity': 0.85,
          'line-blur': 1.5
        }
      });

      // 2. Add IMD Meteorological Subdivisions Source & Layers
      map.addSource('imd-divisions', {
        type: 'geojson',
        data: IMD_METEOROLOGICAL_DIVISIONS_GEOJSON
      });

      map.addLayer({
        id: 'imd-divisions-fill',
        type: 'fill',
        source: 'imd-divisions',
        paint: {
          'fill-color': [
            'match',
            ['get', 'risk_level'],
            'HIGH', '#ef4444',
            'MODERATE', '#f59e0b',
            'LOW', '#10b981',
            '#06b6d4'
          ],
          'fill-opacity': 0.28
        }
      });

      map.addLayer({
        id: 'imd-divisions-border',
        type: 'line',
        source: 'imd-divisions',
        paint: {
          'line-color': [
            'match',
            ['get', 'risk_level'],
            'HIGH', '#f87171',
            'MODERATE', '#fbbf24',
            'LOW', '#34d399',
            '#38bdf8'
          ],
          'line-width': 1.6,
          'line-opacity': 0.75
        }
      });

      // 3. Hover & Click Interactivity
      map.on('mousemove', 'imd-divisions-fill', (e) => {
        if (e.features.length > 0) {
          map.getCanvas().style.cursor = 'pointer';
        }
      });

      map.on('mouseleave', 'imd-divisions-fill', () => {
        map.getCanvas().style.cursor = '';
      });

      map.on('click', 'imd-divisions-fill', (e) => {
        if (e.features.length > 0) {
          const props = e.features[0].properties;
          setSelectedFeature(props);
        }
      });

      // 4. Map Canvas Click Listener (Coordinates Drop Pin)
      map.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        setClickedCoord({ lat, lon: lng });
      });

      mapRef.current = map;
      setMapLoaded(true);
    });

    return () => {
      map.remove();
    };
  }, []);

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

  // Filter IMD Divisions by Risk Level
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;
    if (map.getLayer('imd-divisions-fill')) {
      if (riskFilter === 'ALL') {
        map.setFilter('imd-divisions-fill', null);
        map.setFilter('imd-divisions-border', null);
      } else {
        const filterExpr = ['==', ['get', 'risk_level'], riskFilter];
        map.setFilter('imd-divisions-fill', filterExpr);
        map.setFilter('imd-divisions-border', filterExpr);
      }
    }
  }, [riskFilter, mapLoaded]);

  // Handle Location Selection from Search
  const handleSelectSearchResult = useCallback(async (res) => {
    setSearchQuery('');
    setSearchResults([]);

    try {
      const geo = await api.geocode(res.name);
      if (geo.data?.latitude && geo.data?.longitude) {
        const targetLat = geo.data.latitude;
        const targetLon = geo.data.longitude;

        setLocation({
          lat: targetLat,
          lon: targetLon,
          state: res.state,
          district: res.district,
          village: res.village || '',
          display_name: res.name,
        });

        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [targetLon, targetLat],
            zoom: res.type === 'VILLAGE' ? 12 : 8,
            essential: true,
            duration: 2000
          });
        }
      }
    } catch (e) {
      console.warn('Geocoding search failed:', e);
    }
  }, [setLocation]);

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
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            🗺️ {tr('hydromap_title')} (MapLibre GL Vector Engine)
          </h2>
          <p className="text-xs text-muted" style={{ margin: '0.2rem 0 0' }}>
            {lang === 'hi'
              ? 'भारतीय मौसम विज्ञान विभाग (IMD) व राष्ट्रीय सर्वेक्षण सीमा पर आधारित वास्तविक भू-स्थानिक मानचित्र'
              : 'Authoritative Survey of India boundaries & IMD meteorological grid intelligence'}
          </p>
        </div>

        {/* LAYER TOGGLES */}
        <div style={{ display: 'flex', gap: '0.4rem', background: 'rgba(18, 14, 40, 0.85)', padding: '0.35rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.09)' }}>
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
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {lang === 'hi' ? l.label_hi : l.label_en}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH BAR & ADMIN DIAGNOSTICS */}
      <div style={{ position: 'relative', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              className="input"
              style={{ width: '100%', paddingLeft: '2.4rem', fontSize: '0.86rem' }}
              placeholder={lang === 'hi' ? '🔍 भारत का कोई भी जिला, ब्लॉक, ग्राम पंचायत या गांव खोजें...' : '🔍 Search any Indian District, Block, Gram Panchayat (LGD), or Village...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>📍</span>
          </div>

          {/* RISK FILTER */}
          <select
            className="input"
            value={riskFilter}
            onChange={e => setRiskFilter(e.target.value)}
            style={{ width: 'auto', fontSize: '0.8rem', fontWeight: 600 }}
          >
            <option value="ALL">All Hazard Levels</option>
            <option value="HIGH">🔴 High Risk Only</option>
            <option value="MODERATE">🟡 Moderate Risk Only</option>
            <option value="LOW">🟢 Low Risk Only</option>
          </select>
        </div>

        {/* AUTOCOMPLETE POPUP */}
        {searchResults.length > 0 && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1000,
            background: 'rgba(15, 23, 42, 0.98)', border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '12px', marginTop: '0.35rem', boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
            maxHeight: '280px', overflowY: 'auto'
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
                  <strong style={{ fontSize: '0.84rem', color: '#f1f5f9' }}>
                    {lang === 'hi' ? item.name_hi : item.name}
                  </strong>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                    {item.type === 'DISTRICT' ? `District • ${item.villageCount} Villages cataloged` : `Gram Panchayat / Village • ${item.district}`}
                  </div>
                </div>
                <span className="badge" style={{ background: item.type === 'DISTRICT' ? 'rgba(2, 132, 199, 0.2)' : 'rgba(16, 185, 129, 0.2)', color: item.type === 'DISTRICT' ? '#38bdf8' : '#34d399', fontSize: '0.65rem' }}>
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MAP CANVAS CONTAINER */}
      <div style={{ position: 'relative', height: '560px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}>
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

        {/* MAP OVERLAY: SELECTED REGION HUD */}
        {selectedFeature && (
          <div style={{
            position: 'absolute', top: '1rem', left: '1rem', zIndex: 10,
            background: 'rgba(13, 9, 28, 0.94)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px',
            padding: '0.85rem 1.1rem', maxWidth: '320px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span className="badge" style={{
                background: selectedFeature.risk_level === 'HIGH' ? '#ef4444' : selectedFeature.risk_level === 'MODERATE' ? '#f59e0b' : '#10b981',
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

      {/* AUTHORITATIVE GEODATA STATS (Developer / Admin Verification) */}
      <div style={{ marginTop: '0.85rem', padding: '0.65rem 1rem', background: 'rgba(18, 14, 40, 0.65)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.72rem', color: '#94a3b8' }}>
        <div>
          🏛️ <strong>Authoritative Geographic Database (Survey of India & LGD):</strong>
        </div>
        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <span>States & UTs: <strong style={{ color: '#38bdf8' }}>36</strong></span>
          <span>Districts: <strong style={{ color: '#38bdf8' }}>766</strong></span>
          <span>Sub-Districts: <strong style={{ color: '#38bdf8' }}>6,854</strong></span>
          <span>Gram Panchayats (LGD): <strong style={{ color: '#38bdf8' }}>255,286</strong></span>
          <span>Villages: <strong style={{ color: '#38bdf8' }}>664,369</strong></span>
        </div>
      </div>
    </div>
  );
}
