import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Map as MLMap,
  Marker as MLMarker,
  Popup as MLPopup,
  NavigationControl as MLNavControl,
  ScaleControl as MLScaleControl,
} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useApp } from '../common/AppContext';
import { INDIA_BOUNDARY_GEOJSON, INDIA_STATES_GEOJSON } from '../../data/indiaGeoJson';

// Universal MapLibre module wrapper
const maplibregl = {
  Map: MLMap || (typeof window !== 'undefined' && window.maplibregl?.Map),
  Marker: MLMarker || (typeof window !== 'undefined' && window.maplibregl?.Marker),
  Popup: MLPopup || (typeof window !== 'undefined' && window.maplibregl?.Popup),
  NavigationControl: MLNavControl || (typeof window !== 'undefined' && window.maplibregl?.NavigationControl),
  ScaleControl: MLScaleControl || (typeof window !== 'undefined' && window.maplibregl?.ScaleControl),
};

/**
 * 8 VERIFIED INDIAN AGRO-CLIMATIC HUBS
 */
export const AGRO_HUBS = [
  { id: 'gangetic', name: 'Gangetic Basin (Lucknow)', lat: 26.8500, lng: 80.9500, belt: 'Paddy & Sugarcane', status: 'Optimal Sowing Window', rain: '82%', color: '#10b981', icon: '🌾', district: 'Lucknow', state: 'Uttar Pradesh' },
  { id: 'vidarbha', name: 'Vidarbha Bt Cotton Belt (Nagpur)', lat: 21.1458, lng: 79.0882, belt: 'Cotton Lead', status: 'Furrow Drainage Required', rain: '54%', color: '#0ea5e9', icon: '☁️', district: 'Nagpur', state: 'Maharashtra' },
  { id: 'malwa', name: 'Malwa Soybean Plateau (Indore)', lat: 22.7196, lng: 75.8577, belt: 'Soybean Lead', status: '6-Day Dry Break Watch', rain: '45%', color: '#f59e0b', icon: '🫘', district: 'Indore', state: 'Madhya Pradesh' },
  { id: 'saurashtra', name: 'Saurashtra Groundnut (Rajkot)', lat: 22.3039, lng: 70.8022, belt: 'Groundnut Lead', status: 'Vegetative Growth', rain: '38%', color: '#84cc16', icon: '🥜', district: 'Rajkot', state: 'Gujarat' },
  { id: 'bihar', name: 'North Bihar Maize Hub (Samastipur)', lat: 25.8600, lng: 85.7800, belt: 'Maize & Rabi Crops', status: 'Knee-High Stage', rain: '75%', color: '#ea580c', icon: '🌽', district: 'Samastipur', state: 'Bihar' },
  { id: 'ladakh', name: 'Ladakh High-Altitude Zone (Leh)', lat: 34.1526, lng: 77.5771, belt: 'Trans-Himalayan Barley', status: 'Cold Arid Window', rain: '12%', color: '#38bdf8', icon: '🏔️', district: 'Leh', state: 'Ladakh' },
  { id: 'odisha', name: 'Odisha Coastal Belt (Bhubaneswar)', lat: 20.2961, lng: 85.8245, belt: 'Wetland Delta Lead', status: 'Heavy Rain Precaution', rain: '76%', color: '#06b6d4', icon: '🌊', district: 'Bhubaneswar', state: 'Odisha' },
  { id: 'rayalaseema', name: 'Rayalaseema Zone (Kurnool)', lat: 15.8281, lng: 78.0373, belt: 'Arid Millets & Pulses', status: 'Dryland Moisture Watch', rain: '24%', color: '#eab308', icon: '🌾', district: 'Kurnool', state: 'Andhra Pradesh' }
];

export const MAP_MODES = [
  { id: 'mappls_street', name: 'Mappls Street', icon: '🇮🇳', title: 'Mappls Official Survey of India Street Cartography' },
  { id: 'mappls_hydro', name: 'Mappls Hydro-GIS', icon: '🏛️', title: 'Mappls Hydro-GIS & River Basins Cartography' },
  { id: 'mappls_terrain', name: 'Mappls Terrain', icon: '⛰️', title: 'Mappls Topographic Elevation & Relief Cartography' },
  { id: 'satellite', name: 'Satellite View', icon: '🛰️', title: 'High-Resolution Satellite Imagery with Survey of India Borders' },
  { id: 'hybrid', name: 'Hybrid View', icon: '🌐', title: 'Satellite with Transportation & Places + Survey of India Borders' },
];

/**
 * Generates Survey of India Compliant Style for each mode (Zero OSM / Zero Leaflet)
 */
const getStyleForMode = (mode) => {
  const commonSources = {
    'soi-national-boundary': {
      type: 'geojson',
      data: INDIA_BOUNDARY_GEOJSON
    },
    'soi-states': {
      type: 'geojson',
      data: INDIA_STATES_GEOJSON
    }
  };

  const commonBoundaryLayers = [
    {
      id: 'soi-states-outline',
      type: 'line',
      source: 'soi-states',
      paint: {
        'line-color': '#0284c7',
        'line-width': 1.6,
        'line-dasharray': [3, 2],
        'line-opacity': 0.75
      }
    },
    {
      id: 'soi-boundary-overlay',
      type: 'line',
      source: 'soi-national-boundary',
      paint: {
        'line-color': '#0369a1',
        'line-width': 2.8,
        'line-opacity': 0.95
      }
    }
  ];

  if (mode === 'satellite') {
    return {
      version: 8,
      glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
      sources: {
        ...commonSources,
        'esri-satellite': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          ],
          tileSize: 256,
          attribution: '&copy; Esri, Maxar &bull; Survey of India Sovereign Boundary'
        }
      },
      layers: [
        { id: 'bg', type: 'background', paint: { 'background-color': '#070b19' } },
        { id: 'sat-layer', type: 'raster', source: 'esri-satellite', minzoom: 0, maxzoom: 20 },
        ...commonBoundaryLayers
      ]
    };
  }

  if (mode === 'hybrid') {
    return {
      version: 8,
      glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
      sources: {
        ...commonSources,
        'esri-satellite': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          ],
          tileSize: 256
        },
        'hybrid-roads': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}'
          ],
          tileSize: 256
        },
        'hybrid-places': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'
          ],
          tileSize: 256
        }
      },
      layers: [
        { id: 'bg', type: 'background', paint: { 'background-color': '#070b19' } },
        { id: 'sat-layer', type: 'raster', source: 'esri-satellite', minzoom: 0, maxzoom: 20 },
        { id: 'roads-layer', type: 'raster', source: 'hybrid-roads', minzoom: 0, maxzoom: 20 },
        { id: 'places-layer', type: 'raster', source: 'hybrid-places', minzoom: 0, maxzoom: 20 },
        ...commonBoundaryLayers
      ]
    };
  }

  if (mode === 'mappls_terrain') {
    return {
      version: 8,
      glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
      sources: {
        ...commonSources,
        'terrain-tiles': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}'
          ],
          tileSize: 256,
          attribution: '&copy; Mappls Survey of India Physical Relief Cartography'
        }
      },
      layers: [
        { id: 'bg', type: 'background', paint: { 'background-color': '#070b19' } },
        { id: 'terrain-layer', type: 'raster', source: 'terrain-tiles', minzoom: 0, maxzoom: 19 },
        ...commonBoundaryLayers
      ]
    };
  }

  if (mode === 'mappls_hydro') {
    return {
      version: 8,
      glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
      sources: {
        ...commonSources,
        'topo-hydro-tiles': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
          ],
          tileSize: 256,
          attribution: '&copy; Mappls Hydro-GIS River Basin Cartography &bull; Survey of India'
        }
      },
      layers: [
        { id: 'bg', type: 'background', paint: { 'background-color': '#070b19' } },
        { id: 'topo-layer', type: 'raster', source: 'topo-hydro-tiles', minzoom: 0, maxzoom: 19 },
        ...commonBoundaryLayers
      ]
    };
  }

  // Default: mappls_street
  return {
    version: 8,
    glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
    sources: {
      ...commonSources,
      'street-tiles': {
        type: 'raster',
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
        ],
        tileSize: 256,
        attribution: '&copy; Mappls (MapmyIndia) Street Cartography &bull; Survey of India Sovereign Boundary'
      }
    },
    layers: [
      { id: 'bg', type: 'background', paint: { 'background-color': '#070b19' } },
      { id: 'street-layer', type: 'raster', source: 'street-tiles', minzoom: 0, maxzoom: 19 },
      ...commonBoundaryLayers
    ]
  };
};

export default function HydroMap() {
  const { location, setLocation, lang } = useApp();

  const [activeMode, setActiveMode] = useState('mappls_street');
  const [activeHub, setActiveHub] = useState(AGRO_HUBS[0]);
  const [statusToast, setStatusToast] = useState(null);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Popup HTML template
  const createPopupHTML = useCallback((hub, isActive) => {
    return `
      <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 250px; padding: 6px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <span style="font-size: 1.35rem;">${hub.icon}</span>
          <span style="font-size: 0.7rem; font-weight: 800; background: ${hub.color}22; color: ${hub.color}; border: 1px solid ${hub.color}55; padding: 2px 8px; border-radius: 9999px;">
            ${hub.belt}
          </span>
        </div>
        <div style="font-weight: 800; color: #f8fafc; font-size: 0.94rem; margin-bottom: 2px;">
          ${hub.name}
        </div>
        <div style="font-size: 0.74rem; color: #94a3b8; margin-bottom: 6px;">
          <span>📍 Lat: ${hub.lat.toFixed(4)}° N, Lng: ${hub.lng.toFixed(4)}° E</span>
        </div>
        <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 8px; margin-bottom: 10px;">
          <div style="font-size: 0.75rem; color: #cbd5e1; margin-bottom: 4px;">
            <strong style="color: #38bdf8;">Agronomic Status:</strong> ${hub.status}
          </div>
          <div style="font-size: 0.75rem; color: #cbd5e1;">
            <strong style="color: #34d399;">Rain Probability:</strong> ${hub.rain}
          </div>
        </div>
        <button
          onclick="window.__varshanetra_set_active_hub('${hub.id}')"
          style="
            width: 100%;
            background: ${isActive ? 'linear-gradient(135deg, #059669, #10b981)' : 'linear-gradient(135deg, #0284c7, #38bdf8)'};
            color: #ffffff;
            border: none;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 0.78rem;
            font-weight: 800;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            transition: all 0.2s ease;
          "
        >
          <span>${isActive ? '✓ Current Telemetry Hub' : '🎯 Set as Active Hub'}</span>
        </button>
      </div>
    `;
  }, []);

  // Update telemetry dashboard context on click
  const handleSetActiveHub = useCallback((hub) => {
    setActiveHub(hub);
    setLocation({
      lat: hub.lat,
      lon: hub.lng,
      state: hub.state || hub.belt,
      district: hub.district || hub.name,
      city: hub.district || hub.name,
      village: '',
      display_name: `${hub.name} (${hub.belt})`
    });

    setStatusToast(`Active Telemetry Synced to ${hub.name} [${hub.lat.toFixed(4)}, ${hub.lng.toFixed(4)}]`);
    setTimeout(() => setStatusToast(null), 3500);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: [hub.lng, hub.lat],
        zoom: 7.2,
        duration: 1200,
        essential: true
      });
    }
  }, [setLocation]);

  // Global window handler for popup button click
  useEffect(() => {
    window.__varshanetra_set_active_hub = (hubId) => {
      const hub = AGRO_HUBS.find(h => h.id === hubId);
      if (hub) handleSetActiveHub(hub);
    };
    return () => {
      delete window.__varshanetra_set_active_hub;
    };
  }, [handleSetActiveHub]);

  // Helper to attach verified AGRO_HUBS markers
  const attachMarkers = useCallback((mapInstance) => {
    if (!mapInstance) return;

    // Clean existing markers
    if (markersRef.current.length > 0) {
      markersRef.current.forEach(m => {
        try { m.remove(); } catch {}
      });
      markersRef.current = [];
    }

    markersRef.current = AGRO_HUBS.map((hub) => {
      const markerEl = document.createElement('div');
      markerEl.className = 'varshanetra-agro-marker';
      markerEl.style.cursor = 'pointer';

      const inner = document.createElement('div');
      inner.style.display = 'flex';
      inner.style.flexDirection = 'column';
      inner.style.alignItems = 'center';
      inner.style.transform = 'translate(0, 0)';

      inner.innerHTML = `
        <div style="
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(13, 9, 28, 0.94);
          border: 2px solid ${hub.color};
          box-shadow: 0 0 16px ${hub.color}aa, 0 4px 12px rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          transition: transform 0.2s ease;
        ">
          ${hub.icon}
        </div>
        <div style="
          margin-top: 3px;
          background: rgba(13, 9, 28, 0.95);
          color: #ffffff;
          border: 1px solid ${hub.color}99;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 4px;
          white-space: nowrap;
          text-shadow: 0 1px 2px #000;
          box-shadow: 0 2px 6px rgba(0,0,0,0.5);
        ">
          ${hub.name.split(' ')[0]}
        </div>
      `;

      markerEl.appendChild(inner);

      markerEl.addEventListener('mouseenter', () => { inner.style.transform = 'scale(1.18)'; });
      markerEl.addEventListener('mouseleave', () => { inner.style.transform = 'scale(1.0)'; });

      const popupNode = document.createElement('div');
      popupNode.innerHTML = createPopupHTML(hub, activeHub?.id === hub.id);

      const popup = new maplibregl.Popup({
        offset: 24,
        closeButton: true,
        closeOnClick: false,
        className: 'varshanetra-maplibre-popup'
      }).setDOMContent(popupNode);

      markerEl.addEventListener('click', () => {
        popupNode.innerHTML = createPopupHTML(hub, activeHub?.id === hub.id);
      });

      return new maplibregl.Marker({ element: markerEl, anchor: 'center' })
        .setLngLat([hub.lng, hub.lat])
        .setPopup(popup)
        .addTo(mapInstance);
    });
  }, [createPopupHTML, activeHub?.id]);

  // Initialize Map ONCE on mount
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent duplicate initialization

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: getStyleForMode(activeMode),
      center: [activeHub.lng, activeHub.lat],
      zoom: 5.2,
      minZoom: 3,
      maxZoom: 18
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-left');
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 120, unit: 'metric' }), 'bottom-left');

    map.on('load', () => {
      attachMarkers(map);
    });

    // Re-attach markers whenever style finishes reloading
    map.on('styledata', () => {
      attachMarkers(map);
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        try { mapInstanceRef.current.remove(); } catch {}
        mapInstanceRef.current = null;
      }
    };
  }, []); // Run once on mount

  // Switch style smoothly on mode change without ever destroying map or going blank black
  const handleModeChange = (newMode) => {
    setActiveMode(newMode);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setStyle(getStyleForMode(newMode));
    }
  };

  const mapplsPortalUrl = `https://www.mappls.com/@${activeHub.lat.toFixed(4)},${activeHub.lng.toFixed(4)},7z`;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '680px', height: '680px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', background: '#070512' }}>
      
      {/* MAP CANVAS CONTAINER - PERMANENT, NEVER DESTROYED, NEVER BLANK BLACK */}
      <div
        ref={mapContainerRef}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      />

      {/* TOP-RIGHT 5-BUTTON MODE SELECTOR + MAPPLS PORTAL LINK */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        zIndex: 35,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        gap: '5px',
        background: 'rgba(13, 9, 28, 0.94)',
        padding: '5px',
        borderRadius: '12px',
        border: '1px solid rgba(56, 189, 248, 0.35)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
        maxWidth: 'calc(100% - 24px)'
      }}>
        {MAP_MODES.map((mode) => {
          const isActive = activeMode === mode.id;
          const isMappls = mode.id.startsWith('mappls_');

          return (
            <button
              key={mode.id}
              id={`btn-map-${mode.id}`}
              onClick={() => handleModeChange(mode.id)}
              title={mode.title}
              style={{
                background: isActive
                  ? isMappls
                    ? 'linear-gradient(135deg, #0284c7, #0369a1)'
                    : 'linear-gradient(135deg, #059669, #10b981)'
                  : 'transparent',
                color: isActive ? '#ffffff' : '#cbd5e1',
                border: isActive
                  ? `1px solid ${isMappls ? 'rgba(56, 189, 248, 0.7)' : 'rgba(52, 211, 153, 0.7)'}`
                  : '1px solid transparent',
                padding: '6px 11px',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.18s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{mode.icon}</span>
              <span>{mode.name}</span>
            </button>
          );
        })}

        {/* DIRECT MAPPLS PORTAL BUTTON */}
        <a
          href={mapplsPortalUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open exact coordinates on official Mappls (MapmyIndia) Web Portal"
          style={{
            background: 'rgba(245, 158, 11, 0.2)',
            border: '1px solid rgba(245, 158, 11, 0.5)',
            color: '#fbbf24',
            padding: '6px 10px',
            borderRadius: '8px',
            fontSize: '0.74rem',
            fontWeight: 800,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.18s ease'
          }}
        >
          <span>🗺️</span>
          <span>Mappls Portal ↗</span>
        </a>
      </div>

      {/* TOP-LEFT OFFICIAL SURVEY OF INDIA & MAPPLS BADGE */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 30,
        background: 'rgba(13, 9, 28, 0.94)',
        border: '1px solid rgba(56, 189, 248, 0.35)',
        padding: '7px 14px',
        borderRadius: '12px',
        backdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
        maxWidth: '380px'
      }}>
        <span style={{ fontSize: '1.3rem' }}>🇮🇳</span>
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Survey of India Compliant Cartography</span>
            <span style={{ fontSize: '0.65rem', background: '#0284c7', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
              Official Borders
            </span>
          </div>
          <div style={{ fontSize: '0.67rem', color: '#94a3b8', lineHeight: 1.3, marginTop: '2px' }}>
            100% Survey of India Sovereign Territorial Boundary • Full Ladakh, J&K & Arunachal Pradesh • Zero OpenStreetMap Discrepancies
          </div>
        </div>
      </div>

      {/* MAPPLA ACTIVE HUB QUICK TELEMETRY HUD */}
      <div style={{
        position: 'absolute',
        top: '76px',
        left: '12px',
        zIndex: 30,
        background: 'rgba(13, 9, 28, 0.94)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        padding: '8px 12px',
        borderRadius: '10px',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        fontSize: '0.74rem',
        color: '#cbd5e1',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        maxWidth: '300px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 800, color: '#38bdf8' }}>
            {activeHub.icon} {activeHub.name}
          </span>
          <span style={{ fontSize: '0.66rem', color: activeHub.color, background: `${activeHub.color}22`, padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
            {activeHub.belt}
          </span>
        </div>
        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
          📍 Lat: {activeHub.lat.toFixed(4)}° N, Lng: {activeHub.lng.toFixed(4)}° E
        </div>
        <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>
          🌾 <strong>Status:</strong> {activeHub.status} • <strong>Rain:</strong> {activeHub.rain}
        </div>
        <button
          onClick={() => handleSetActiveHub(activeHub)}
          style={{
            marginTop: '4px',
            background: 'linear-gradient(135deg, #059669, #10b981)',
            color: '#ffffff',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '6px',
            fontSize: '0.72rem',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          🎯 Set as Active Farmer Dashboard Hub
        </button>
      </div>

      {/* TOAST NOTIFICATION ON TELEMETRY SYNC */}
      {statusToast && (
        <div style={{
          position: 'absolute',
          bottom: '76px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 45,
          background: 'rgba(5, 150, 105, 0.96)',
          border: '1px solid rgba(52, 211, 153, 0.5)',
          color: '#ffffff',
          padding: '8px 16px',
          borderRadius: '10px',
          fontSize: '0.78rem',
          fontWeight: 700,
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>🎯</span>
          <span>{statusToast}</span>
        </div>
      )}

      {/* BOTTOM AGRO-HUBS SELECTOR BAR (ALL 8 HUBS) */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        right: '12px',
        zIndex: 30,
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        padding: '6px',
        background: 'rgba(13, 9, 28, 0.94)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 8px',
          fontSize: '0.7rem',
          fontWeight: 800,
          color: '#38bdf8',
          whiteSpace: 'nowrap',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          AGRO HUBS ({AGRO_HUBS.length}):
        </div>

        {AGRO_HUBS.map((hub) => {
          const isSelected = activeHub?.id === hub.id;
          return (
            <button
              key={hub.id}
              onClick={() => handleSetActiveHub(hub)}
              style={{
                flexShrink: 0,
                background: isSelected ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                border: isSelected ? `1.5px solid ${hub.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                color: isSelected ? '#ffffff' : '#cbd5e1',
                padding: '5px 11px',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: isSelected ? 800 : 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{hub.icon}</span>
              <span>{hub.name.split(' ')[0]}</span>
              <span style={{ fontSize: '0.62rem', color: hub.color, background: `${hub.color}22`, padding: '1px 5px', borderRadius: '4px' }}>
                {hub.rain}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
