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

// Safe MapLibre module wrapper
const maplibregl = {
  Map: MLMap || (typeof window !== 'undefined' && window.maplibregl?.Map),
  Marker: MLMarker || (typeof window !== 'undefined' && window.maplibregl?.Marker),
  Popup: MLPopup || (typeof window !== 'undefined' && window.maplibregl?.Popup),
  NavigationControl: MLNavControl || (typeof window !== 'undefined' && window.maplibregl?.NavigationControl),
  ScaleControl: MLScaleControl || (typeof window !== 'undefined' && window.maplibregl?.ScaleControl),
};

/**
 * 1. IMMUTABLE, VERIFIED AGRO-CLIMATIC HUB DATASET
 * Strict (lat, lng) coordinates for official Indian agro-zones.
 */
export const AGRO_HUBS = [
  { id: 'ladakh', name: 'Ladakh High-Altitude Zone', lat: 34.1526, lng: 77.5771, belt: 'Trans-Himalayan', status: 'Cold Arid Window', rain: '12%', color: '#38bdf8', icon: '🏔️', district: 'Leh', state: 'Ladakh' },
  { id: 'gangetic', name: 'Gangetic Basin (Lucknow/Kanpur)', lat: 26.8500, lng: 80.9500, belt: 'Paddy Lead', status: 'Optimal Sowing Window', rain: '82%', color: '#10b981', icon: '🌾', district: 'Lucknow', state: 'Uttar Pradesh' },
  { id: 'vidarbha', name: 'Vidarbha Bt Cotton Belt (Nagpur)', lat: 21.1458, lng: 79.0882, belt: 'Cotton Lead', status: 'Furrow Drainage Required', rain: '54%', color: '#0ea5e9', icon: '☁️', district: 'Nagpur', state: 'Maharashtra' },
  { id: 'malwa', name: 'Malwa Soybean Plateau (Indore)', lat: 22.7196, lng: 75.8577, belt: 'Soybean Lead', status: '6-Day Dry Break Watch', rain: '45%', color: '#f59e0b', icon: '🫘', district: 'Indore', state: 'Madhya Pradesh' },
  { id: 'saurashtra', name: 'Saurashtra Groundnut (Rajkot)', lat: 22.3039, lng: 70.8022, belt: 'Groundnut Lead', status: 'Vegetative Growth', rain: '38%', color: '#84cc16', icon: '🥜', district: 'Rajkot', state: 'Gujarat' },
  { id: 'odisha', name: 'Odisha Coastal Belt (Bhubaneswar)', lat: 20.2961, lng: 85.8245, belt: 'Wetland Lead', status: 'Heavy Rain Precaution', rain: '76%', color: '#06b6d4', icon: '🌊', district: 'Bhubaneswar', state: 'Odisha' },
  { id: 'rayalaseema', name: 'Rayalaseema Zone (Kurnool)', lat: 15.8281, lng: 78.0373, belt: 'Arid Millets', status: 'Dryland Moisture Watch', rain: '24%', color: '#eab308', icon: '🌾', district: 'Kurnool', state: 'Andhra Pradesh' },
  { id: 'thar', name: 'Thar Arid Zone (Jodhpur/Bikaner)', lat: 26.2389, lng: 73.0243, belt: 'Bajra/Millet', status: 'Conserve Soil Moisture', rain: '18%', color: '#f97316', icon: '🏜️', district: 'Jodhpur', state: 'Rajasthan' }
];

export default function HydroMap() {
  const { location, setLocation, tr, lang } = useApp();

  // 2-BUTTON DUAL ENGINE TOGGLE: 'mappls' (Street View) | 'satellite' (Satellite View)
  const [activeEngine, setActiveEngine] = useState('mappls');
  const [selectedHub, setSelectedHub] = useState(AGRO_HUBS[1]); // Default Gangetic
  const [statusToast, setStatusToast] = useState(null);
  const [mapplsCenter, setMapplsCenter] = useState({ lat: 22.5937, lng: 78.9629, zoom: 5 });

  const mapContainerRef = useRef(null);
  const activeMapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Generate popup HTML for a hub
  const createPopupHTML = useCallback((hub, isActive) => {
    return `
      <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 240px; padding: 4px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <span style="font-size: 1.25rem;">${hub.icon}</span>
          <span style="font-size: 0.68rem; font-weight: 800; background: ${hub.color}22; color: ${hub.color}; border: 1px solid ${hub.color}55; padding: 2px 8px; border-radius: 9999px;">
            ${hub.belt}
          </span>
        </div>
        <div style="font-weight: 800; color: #f8fafc; font-size: 0.92rem; margin-bottom: 2px;">
          ${hub.name}
        </div>
        <div style="font-size: 0.72rem; color: #94a3b8; margin-bottom: 6px;">
          <span>📍 Lat: ${hub.lat.toFixed(4)}° N, Lng: ${hub.lng.toFixed(4)}° E</span>
        </div>
        <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 8px; margin-bottom: 8px;">
          <div style="font-size: 0.74rem; color: #cbd5e1; margin-bottom: 4px;">
            <strong style="color: #38bdf8;">Agronomic Status:</strong> ${hub.status}
          </div>
          <div style="font-size: 0.74rem; color: #cbd5e1;">
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
            padding: 7px 12px;
            border-radius: 6px;
            font-size: 0.78rem;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          "
        >
          <span>${isActive ? '✓ Current Telemetry Hub' : '🎯 Set as Active Hub'}</span>
        </button>
      </div>
    `;
  }, []);

  // Set as Active Hub & Telemetry Dashboard Sync
  const handleSetActiveHub = useCallback((hub) => {
    setSelectedHub(hub);
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

    // Pan Mappls or MapLibre instance
    if (activeEngine === 'mappls') {
      setMapplsCenter({ lat: hub.lat, lng: hub.lng, zoom: 7 });
    } else if (activeMapInstanceRef.current && activeMapInstanceRef.current.flyTo) {
      activeMapInstanceRef.current.flyTo({
        center: [hub.lng, hub.lat], // Strictly [lng, lat] Longitude first for MapLibre
        zoom: 7.5,
        duration: 1400,
        essential: true
      });
    }
  }, [activeEngine, setLocation]);

  // Global window listener for popup buttons
  useEffect(() => {
    window.__varshanetra_set_active_hub = (hubId) => {
      const hub = AGRO_HUBS.find(h => h.id === hubId);
      if (hub) handleSetActiveHub(hub);
    };
    return () => {
      delete window.__varshanetra_set_active_hub;
    };
  }, [handleSetActiveHub]);

  // Container clean-up on toggle to prevent DOM/Canvas stacking bugs
  const cleanActiveMap = useCallback(() => {
    if (markersRef.current && markersRef.current.length > 0) {
      markersRef.current.forEach((m) => {
        try {
          if (m && typeof m.remove === 'function') m.remove();
        } catch {}
      });
      markersRef.current = [];
    }

    if (activeMapInstanceRef.current) {
      try {
        if (typeof activeMapInstanceRef.current.remove === 'function') {
          activeMapInstanceRef.current.remove();
        }
      } catch (err) {
        console.warn('Map cleanup error:', err);
      }
      activeMapInstanceRef.current = null;
    }

    if (mapContainerRef.current) {
      mapContainerRef.current.innerHTML = '';
    }
  }, []);

  // Initialize Satellite View (MapLibre GL with Esri World Imagery raster)
  const initMapLibreSatellite = useCallback(() => {
    cleanActiveMap();
    if (!mapContainerRef.current) return;

    const mapInstance = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
        sources: {
          'esri-satellite': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            ],
            tileSize: 256,
            attribution: '&copy; Esri, Maxar, Earthstar Geographics &bull; MapLibre GL'
          }
        },
        layers: [
          {
            id: 'satellite-bg',
            type: 'background',
            paint: { 'background-color': '#070b19' }
          },
          {
            id: 'satellite-tiles-layer',
            type: 'raster',
            source: 'esri-satellite',
            minzoom: 0,
            maxzoom: 20
          }
        ]
      },
      center: [78.9629, 22.5937], // Strictly [lng, lat] Longitude-first
      zoom: 4.6,
      minZoom: 3,
      maxZoom: 18
    });

    mapInstance.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-left');
    mapInstance.addControl(new maplibregl.ScaleControl({ maxWidth: 120, unit: 'metric' }), 'bottom-left');

    mapInstance.on('load', () => {
      // STRICT COORDINATE PROJECTION ADAPTER: MapLibre .setLngLat([hub.lng, hub.lat])
      markersRef.current = AGRO_HUBS.map((hub) => {
        const markerEl = document.createElement('div');
        markerEl.className = 'varshanetra-agro-marker';
        markerEl.style.cursor = 'pointer';
        markerEl.style.display = 'flex';
        markerEl.style.flexDirection = 'column';
        markerEl.style.alignItems = 'center';
        markerEl.style.transform = 'translate(-50%, -50%)';

        markerEl.innerHTML = `
          <div style="
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(13, 9, 28, 0.94);
            border: 2px solid ${hub.color};
            box-shadow: 0 0 16px ${hub.color}99, 0 4px 12px rgba(0,0,0,0.6);
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
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          ">
            ${hub.name.split(' ')[0]}
          </div>
        `;

        const popupNode = document.createElement('div');
        popupNode.innerHTML = createPopupHTML(hub, selectedHub?.id === hub.id);

        const popup = new maplibregl.Popup({
          offset: 24,
          closeButton: true,
          closeOnClick: false,
          className: 'varshanetra-maplibre-popup'
        }).setDOMContent(popupNode);

        // Longitude First: [hub.lng, hub.lat]
        const marker = new maplibregl.Marker({ element: markerEl })
          .setLngLat([hub.lng, hub.lat])
          .setPopup(popup)
          .addTo(mapInstance);

        markerEl.addEventListener('click', () => {
          popupNode.innerHTML = createPopupHTML(hub, selectedHub?.id === hub.id);
        });

        return marker;
      });
    });

    activeMapInstanceRef.current = mapInstance;
  }, [cleanActiveMap, createPopupHTML, selectedHub?.id]);

  // Handle switching between Mappls and MapLibre Satellite
  useEffect(() => {
    if (activeEngine === 'satellite') {
      initMapLibreSatellite();
    } else {
      cleanActiveMap();
    }
    return () => {
      cleanActiveMap();
    };
  }, [activeEngine, initMapLibreSatellite, cleanActiveMap]);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '620px', height: '620px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', background: '#070512' }}>
      {/* 2-BUTTON DUAL ENGINE TOGGLE (TOP-RIGHT) */}
      <div style={{
        position: 'absolute',
        top: '14px',
        right: '14px',
        zIndex: 35,
        display: 'flex',
        gap: '6px',
        background: 'rgba(13, 9, 28, 0.94)',
        padding: '5px',
        borderRadius: '12px',
        border: '1px solid rgba(56, 189, 248, 0.35)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)'
      }}>
        <button
          id="btn-engine-mappls"
          onClick={() => setActiveEngine('mappls')}
          title="Survey of India Boundary Map (Official Mappls)"
          style={{
            background: activeEngine === 'mappls' ? 'linear-gradient(135deg, #0284c7, #0369a1)' : 'transparent',
            color: activeEngine === 'mappls' ? '#ffffff' : '#94a3b8',
            border: activeEngine === 'mappls' ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid transparent',
            padding: '7px 13px',
            borderRadius: '8px',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.18s ease'
          }}
        >
          <span>🇮🇳</span>
          <span>Street View (Mappls)</span>
        </button>

        <button
          id="btn-engine-satellite"
          onClick={() => setActiveEngine('satellite')}
          title="Satellite View (MapLibre GL)"
          style={{
            background: activeEngine === 'satellite' ? 'linear-gradient(135deg, #059669, #10b981)' : 'transparent',
            color: activeEngine === 'satellite' ? '#ffffff' : '#94a3b8',
            border: activeEngine === 'satellite' ? '1px solid rgba(52, 211, 153, 0.5)' : '1px solid transparent',
            padding: '7px 13px',
            borderRadius: '8px',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.18s ease'
          }}
        >
          <span>🛰️</span>
          <span>Satellite View (MapLibre GL)</span>
        </button>
      </div>

      {/* TOP-LEFT STATUS BADGE */}
      <div style={{
        position: 'absolute',
        top: '14px',
        left: '14px',
        zIndex: 30,
        background: 'rgba(13, 9, 28, 0.92)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        padding: '7px 14px',
        borderRadius: '10px',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.5)'
      }}>
        <span style={{ fontSize: '1.15rem' }}>{activeEngine === 'mappls' ? '🇮🇳' : '🛰️'}</span>
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f8fafc' }}>
            {activeEngine === 'mappls' ? 'Official Mappls (MapmyIndia) Survey of India Base' : 'MapLibre GL Satellite Engine'}
          </div>
          <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
            {activeEngine === 'mappls'
              ? 'Survey of India Compliant Cartography • Zero Leaflet/Carto Watermarks'
              : 'ArcGIS Satellite Imagery • Strictly [Longitude, Latitude] WGS-84 Projected'}
          </div>
        </div>
      </div>

      {/* MAP ENGINE RENDER AREA */}
      {activeEngine === 'mappls' ? (
        /* OFFICIAL MAPPLS MAP (MAPMYINDIA) — NO LEAFLET / NO CARTO TILES */
        <div style={{ position: 'relative', width: '100%', height: '100%', background: '#070512' }}>
          <iframe
            key={`mappls-${mapplsCenter.lat}-${mapplsCenter.lng}`}
            src={`https://embed.mappls.com/?center=${mapplsCenter.lat},${mapplsCenter.lng}&zoom=${mapplsCenter.zoom}`}
            title="Official Survey of India Compliant Mappls Map (MapmyIndia)"
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="geolocation; camera"
          />

          {/* ACTIVE HUB FLOATING POPUP OVERLAY */}
          {selectedHub && (
            <div style={{
              position: 'absolute',
              top: '74px',
              left: '14px',
              zIndex: 32,
              background: 'rgba(13, 9, 28, 0.96)',
              border: `1.5px solid ${selectedHub.color}`,
              padding: '12px 16px',
              borderRadius: '12px',
              maxWidth: '320px',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.7)',
              color: '#f8fafc'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>{selectedHub.icon}</span>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: selectedHub.color,
                  background: `${selectedHub.color}22`,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  border: `1px solid ${selectedHub.color}55`
                }}>
                  {selectedHub.belt}
                </span>
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.94rem', marginBottom: '3px' }}>
                {selectedHub.name}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '8px' }}>
                📍 {selectedHub.lat.toFixed(4)}° N, {selectedHub.lng.toFixed(4)}° E ({selectedHub.state})
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', padding: '6px 10px', borderRadius: '8px', marginBottom: '8px', fontSize: '0.74rem' }}>
                <div><strong style={{ color: '#38bdf8' }}>Status:</strong> {selectedHub.status}</div>
                <div><strong style={{ color: '#34d399' }}>Rain Probability:</strong> {selectedHub.rain}</div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => handleSetActiveHub(selectedHub)}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '7px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  🎯 Set as Active Hub
                </button>
                <button
                  onClick={() => setMapplsCenter({ lat: selectedHub.lat, lng: selectedHub.lng, zoom: 8 })}
                  style={{
                    background: 'rgba(56, 189, 248, 0.2)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    padding: '7px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  🔍 Zoom
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* MAPLIBRE GL SATELLITE CANVAS */
        <div
          ref={mapContainerRef}
          id="varshanetra-satellite-canvas"
          style={{ width: '100%', height: '100%' }}
        />
      )}

      {/* TOAST NOTIFICATION ON TELEMETRY SYNC */}
      {statusToast && (
        <div style={{
          position: 'absolute',
          bottom: '72px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
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
        zIndex: 35,
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
          const isSelected = selectedHub?.id === hub.id;
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
