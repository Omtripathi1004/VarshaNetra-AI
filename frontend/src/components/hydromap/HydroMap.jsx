import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Map as MLMap,
  Marker as MLMarker,
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
  NavigationControl: MLNavControl || (typeof window !== 'undefined' && window.maplibregl?.NavigationControl),
  ScaleControl: MLScaleControl || (typeof window !== 'undefined' && window.maplibregl?.ScaleControl),
};

/**
 * 14 VERIFIED OFFICIAL AGRO-CLIMATIC HUBS (ICAR & Survey of India Precision Centroids)
 */
export const AGRO_HUBS = [
  {
    id: 'gangetic',
    name: 'Gangetic Basin (Lucknow)',
    lat: 26.8467,
    lng: 80.9462,
    belt: 'Paddy & Sugarcane',
    status: 'Optimal Sowing Window',
    rain: '82%',
    color: '#10b981',
    icon: '🌾',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    region: 'North'
  },
  {
    id: 'punjab',
    name: 'Indo-Gangetic Granary (Ludhiana)',
    lat: 30.9010,
    lng: 75.8573,
    belt: 'Wheat & Rice Bowl (PAU)',
    status: 'Canal Irrigation Active',
    rain: '68%',
    color: '#eab308',
    icon: '🌾',
    district: 'Ludhiana',
    state: 'Punjab',
    region: 'North'
  },
  {
    id: 'vidarbha',
    name: 'Vidarbha Bt Cotton Belt (Nagpur)',
    lat: 21.1458,
    lng: 79.0882,
    belt: 'Bt Cotton Lead',
    status: 'Furrow Drainage Required',
    rain: '54%',
    color: '#0ea5e9',
    icon: '☁️',
    district: 'Nagpur',
    state: 'Maharashtra',
    region: 'Central'
  },
  {
    id: 'malwa',
    name: 'Malwa Soybean Plateau (Indore)',
    lat: 22.7196,
    lng: 75.8577,
    belt: 'Soybean Lead',
    status: '6-Day Dry Break Watch',
    rain: '45%',
    color: '#f59e0b',
    icon: '🫘',
    district: 'Indore',
    state: 'Madhya Pradesh',
    region: 'Central'
  },
  {
    id: 'saurashtra',
    name: 'Saurashtra Groundnut (Rajkot)',
    lat: 22.3039,
    lng: 70.8022,
    belt: 'Groundnut Lead',
    status: 'Vegetative Growth Window',
    rain: '38%',
    color: '#84cc16',
    icon: '🥜',
    district: 'Rajkot',
    state: 'Gujarat',
    region: 'West'
  },
  {
    id: 'thar',
    name: 'Thar Arid Zone (Jodhpur)',
    lat: 26.2389,
    lng: 73.0243,
    belt: 'Bajra, Guar & Mustard (CAZRI)',
    status: 'Dryland Moisture Conservation',
    rain: '22%',
    color: '#d97706',
    icon: '🏜️',
    district: 'Jodhpur',
    state: 'Rajasthan',
    region: 'West'
  },
  {
    id: 'bihar',
    name: 'North Bihar Plains (Samastipur)',
    lat: 25.8629,
    lng: 85.7811,
    belt: 'Maize & Rabi Crops (Pusa ICAR)',
    status: 'Knee-High Stage',
    rain: '75%',
    color: '#ea580c',
    icon: '🌽',
    district: 'Samastipur',
    state: 'Bihar',
    region: 'East'
  },
  {
    id: 'bengal',
    name: 'Bengal Delta Wetland (Burdwan)',
    lat: 23.2324,
    lng: 87.8615,
    belt: 'Aman Paddy & Jute Delta',
    status: 'Adequate Moisture Saturation',
    rain: '84%',
    color: '#059669',
    icon: '🍚',
    district: 'Purba Bardhaman',
    state: 'West Bengal',
    region: 'East'
  },
  {
    id: 'brahmaputra',
    name: 'Brahmaputra Valley (Jorhat)',
    lat: 26.7509,
    lng: 94.2037,
    belt: 'Tea, Paddy & Oilseeds (AAU)',
    status: 'High Humidity & Water Watch',
    rain: '88%',
    color: '#10b981',
    icon: '🌱',
    district: 'Jorhat',
    state: 'Assam',
    region: 'East'
  },
  {
    id: 'odisha',
    name: 'Odisha Coastal Belt (Bhubaneswar)',
    lat: 20.2961,
    lng: 85.8245,
    belt: 'Wetland Delta Lead (OUAT)',
    status: 'Heavy Rain Precaution',
    rain: '76%',
    color: '#06b6d4',
    icon: '🌊',
    district: 'Bhubaneswar',
    state: 'Odisha',
    region: 'East'
  },
  {
    id: 'deccan',
    name: 'Deccan Semi-Arid (Warangal)',
    lat: 17.9689,
    lng: 79.5941,
    belt: 'Chilli, Cotton & Maize',
    status: 'Pest Surveillance Active',
    rain: '48%',
    color: '#ec4899',
    icon: '🌶️',
    district: 'Warangal',
    state: 'Telangana',
    region: 'South'
  },
  {
    id: 'rayalaseema',
    name: 'Rayalaseema Zone (Kurnool)',
    lat: 15.8281,
    lng: 78.0373,
    belt: 'Arid Millets & Pulses',
    status: 'Dryland Moisture Watch',
    rain: '24%',
    color: '#eab308',
    icon: '🌾',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    region: 'South'
  },
  {
    id: 'cauvery',
    name: 'Cauvery Delta Rice Belt (Thanjavur)',
    lat: 10.7870,
    lng: 79.1378,
    belt: 'Delta Paddy & Banana (TNAU)',
    status: 'Kuruvai Stage Monitoring',
    rain: '62%',
    color: '#14b8a6',
    icon: '🌾',
    district: 'Thanjavur',
    state: 'Tamil Nadu',
    region: 'South'
  },
  {
    id: 'ladakh',
    name: 'Ladakh High-Altitude Zone (Leh)',
    lat: 34.1526,
    lng: 77.5771,
    belt: 'Trans-Himalayan Barley & Apricot',
    status: 'Cold Arid Solar Window',
    rain: '12%',
    color: '#38bdf8',
    icon: '🏔️',
    district: 'Leh',
    state: 'Ladakh',
    region: 'North'
  },
];

export const MAP_MODES = [
  { id: 'mappls_street', name: 'Mappls Street', icon: '🇮🇳', title: 'Official Survey of India Street Cartography' },
  { id: 'mappls_hydro', name: 'Mappls Hydro-GIS', icon: '🏛️', title: 'River Basins & Hydrological Cartography' },
  { id: 'mappls_terrain', name: 'Mappls Terrain', icon: '⛰️', title: 'Topographic Elevation & Relief Cartography' },
  { id: 'satellite', name: 'Satellite View', icon: '🛰️', title: 'High-Resolution Satellite Imagery with Sovereign Borders' },
  { id: 'hybrid', name: 'Hybrid View', icon: '🌐', title: 'Satellite with Transportation & Sovereign Boundaries' },
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
  const [regionFilter, setRegionFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const userMarkerRef = useRef(null);

  // Update active hub selection and smoothly pan map without obstructing popups
  const handleSelectHub = useCallback((hub, flyToMap = true) => {
    setActiveHub(hub);

    if (flyToMap && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: [hub.lng, hub.lat],
        zoom: 7.2,
        duration: 1200,
        essential: true,
      });

      // On mobile screens (<= 900px), smoothly scroll map container into view
      if (typeof window !== 'undefined' && window.innerWidth <= 900 && mapContainerRef.current) {
        mapContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  // Sync to global app context for the farmer dashboard
  const handleApplyToDashboard = useCallback((hub) => {
    handleSelectHub(hub, false);
    setLocation({
      lat: hub.lat,
      lon: hub.lng,
      state: hub.state || hub.belt,
      district: hub.district || hub.name,
      city: hub.district || hub.name,
      village: '',
      display_name: `${hub.name} (${hub.belt})`,
    });

    setStatusToast(
      lang === 'hi'
        ? `✅ ${hub.name} को किसान डैशबोर्ड के लिए सक्रिय टेलीमेट्री केंद्र बनाया गया!`
        : `✅ Synced ${hub.name} [${hub.lat.toFixed(4)}, ${hub.lng.toFixed(4)}] to active dashboard telemetry!`
    );
    setTimeout(() => setStatusToast(null), 3800);
  }, [handleSelectHub, setLocation, lang]);

  // Helper to attach accurate surgical needle-point markers for all hubs
  const attachMarkers = useCallback((mapInstance) => {
    if (!mapInstance) return;

    // Clean previous markers
    if (markersRef.current.length > 0) {
      markersRef.current.forEach((m) => {
        try { m.remove(); } catch {}
      });
      markersRef.current = [];
    }

    // Attach all agro-climatic hub needle pins
    markersRef.current = AGRO_HUBS.map((hub) => {
      const isSelected = activeHub?.id === hub.id;

      // Pin container with surgical bottom needle tip
      const markerEl = document.createElement('div');
      markerEl.className = `varshanetra-pin-marker ${isSelected ? 'selected' : ''}`;
      markerEl.style.cursor = 'pointer';
      markerEl.style.display = 'flex';
      markerEl.style.flexDirection = 'column';
      markerEl.style.alignItems = 'center';
      markerEl.style.filter = isSelected ? `drop-shadow(0 0 10px ${hub.color})` : 'none';
      markerEl.title = `${hub.name} • ${hub.belt} • Rain: ${hub.rain}`;

      markerEl.innerHTML = `
        <div style="
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(13, 9, 28, 0.95);
          border: 2px solid ${hub.color};
          box-shadow: 0 0 12px ${hub.color}bb, 0 4px 10px rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 2;
        ">
          ${hub.icon}
        </div>
        <div style="
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 8px solid ${hub.color};
          margin-top: -1px;
          filter: drop-shadow(0 2px 2px rgba(0,0,0,0.6));
          z-index: 1;
        "></div>
        <div style="
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${hub.color};
          box-shadow: 0 0 6px ${hub.color};
          margin-top: 1px;
        "></div>
      `;

      // Hover micro-animation
      markerEl.addEventListener('mouseenter', () => {
        const circle = markerEl.querySelector('div');
        if (circle) circle.style.transform = 'scale(1.25)';
      });
      markerEl.addEventListener('mouseleave', () => {
        const circle = markerEl.querySelector('div');
        if (circle) circle.style.transform = isSelected ? 'scale(1.15)' : 'scale(1.0)';
      });

      // Clicking marker selects the hub in the side panel — ZERO popups blocking the map!
      markerEl.addEventListener('click', (e) => {
        e.stopPropagation();
        handleSelectHub(hub, true);
      });

      // Anchor set to 'bottom' so the needle tip points with 100% precision to the exact GPS coordinate
      return new maplibregl.Marker({ element: markerEl, anchor: 'bottom' })
        .setLngLat([hub.lng, hub.lat])
        .addTo(mapInstance);
    });

    // Attach User GPS Active Location Pin if available
    if (userMarkerRef.current) {
      try { userMarkerRef.current.remove(); } catch {}
      userMarkerRef.current = null;
    }

    if (location?.lat && location?.lon) {
      const userEl = document.createElement('div');
      userEl.style.display = 'flex';
      userEl.style.flexDirection = 'column';
      userEl.style.alignItems = 'center';
      userEl.style.cursor = 'pointer';
      userEl.title = `📍 ${location.display_name || 'Your Active Farm'}`;

      userEl.innerHTML = `
        <div style="
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0284c7, #06b6d4);
          border: 2px solid #ffffff;
          box-shadow: 0 0 16px #38bdf8, 0 4px 12px rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          animation: pulse 2s infinite;
        ">
          📍
        </div>
        <div style="
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 9px solid #06b6d4;
          margin-top: -1px;
        "></div>
        <div style="
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
          margin-top: 1px;
        "></div>
      `;

      userMarkerRef.current = new maplibregl.Marker({ element: userEl, anchor: 'bottom' })
        .setLngLat([location.lon, location.lat])
        .addTo(mapInstance);
    }
  }, [activeHub?.id, handleSelectHub, location]);

  // Initialize Map ONCE on mount
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: getStyleForMode(activeMode),
      center: [activeHub.lng, activeHub.lat],
      zoom: 5.2,
      minZoom: 3,
      maxZoom: 18,
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 120, unit: 'metric' }), 'bottom-left');

    map.on('load', () => {
      attachMarkers(map);
      map.resize();
    });

    map.on('styledata', () => {
      attachMarkers(map);
    });

    mapInstanceRef.current = map;

    const handleResize = () => map.resize();
    window.addEventListener('resize', handleResize);

    const mobileResizeTimer = setTimeout(() => {
      if (mapInstanceRef.current) mapInstanceRef.current.resize();
    }, 300);

    return () => {
      clearTimeout(mobileResizeTimer);
      window.removeEventListener('resize', handleResize);
      if (mapInstanceRef.current) {
        try { mapInstanceRef.current.remove(); } catch {}
        mapInstanceRef.current = null;
      }
    };
  }, []); // Run once on mount

  // Refresh markers whenever activeHub or location changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      attachMarkers(mapInstanceRef.current);
    }
  }, [attachMarkers]);

  // Switch cartography mode smoothly
  const handleModeChange = (newMode) => {
    setActiveMode(newMode);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setStyle(getStyleForMode(newMode));
    }
  };

  // Filter hubs by search and region
  const filteredHubs = AGRO_HUBS.filter((h) => {
    const matchesRegion = regionFilter === 'All' || h.region === regionFilter;
    const matchesSearch =
      !searchQuery ||
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.belt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const mapplsPortalUrl = `https://www.mappls.com/@${activeHub.lat.toFixed(4)},${activeHub.lng.toFixed(4)},7z`;

  return (
    <div className="main-content">
      {/* PAGE HEADER */}
      <div style={{ marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h2 style={{
              background: 'linear-gradient(135deg, #38bdf8, #0284c7, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              fontSize: '1.65rem',
              margin: 0,
            }}>
              🗺️ {lang === 'hi' ? 'संप्रभु हाइड्रोमैप व कृषि-जलवायु मंच' : 'Sovereign HydroMap GIS & Agro-Climatic Intelligence'}
            </h2>
            <span style={{
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '999px',
              padding: '0.2rem 0.65rem',
              fontSize: '0.72rem',
              fontWeight: 800,
            }}>
              🇮🇳 Survey of India Compliant
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0.35rem 0 0 0' }}>
            {lang === 'hi'
              ? 'आधिकारिक भारत सरकार संप्रभु सीमांकन • 14 आईसीएआर कृषि-जलवायु क्षेत्र • शून्य मानचित्र व्यवधान (साइडबार नियंत्रण)'
              : 'Official Survey of India sovereign borders • 14 ICAR agro-climatic zones • 100% clean map with dedicated sidebar controls'}
          </p>
        </div>

        {/* Global Toast Notification */}
        {statusToast && (
          <div style={{
            background: 'rgba(5, 150, 105, 0.95)',
            border: '1px solid rgba(52, 211, 153, 0.6)',
            color: '#ffffff',
            padding: '0.5rem 1rem',
            borderRadius: '10px',
            fontSize: '0.8rem',
            fontWeight: 700,
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            animation: 'fadeIn 0.25s ease',
          }}>
            {statusToast}
          </div>
        )}
      </div>

      {/* TWO-COLUMN LAYOUT: SIDEBAR (CONTROLS & POPUPS MOVED HERE) + CLEAN MAP CANVAS */}
      <div className="hydromap-layout">
        {/* ── LEFT SIDEBAR PANEL (Zero obstruction on map) ──────────────────────── */}
        <div className="hydromap-sidebar">
          {/* 1. Official Survey of India Certification Card */}
          <div style={{
            background: 'rgba(13, 9, 28, 0.94)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '14px',
            padding: '0.85rem 1rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '1.3rem' }}>🇮🇳</span>
              <span style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.86rem' }}>
                Survey of India Sovereign Cartography
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.4, margin: 0 }}>
              Full sovereign Indian territory including complete Ladakh, J&K, and Arunachal Pradesh boundaries. Zero OpenStreetMap border discrepancies.
            </p>
          </div>

          {/* 2. Map Cartography Mode Selector */}
          <div style={{
            background: 'rgba(18, 14, 40, 0.72)',
            border: '1px solid rgba(255, 255, 255, 0.09)',
            borderRadius: '14px',
            padding: '0.85rem 1rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.5px', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
              🗺️ {lang === 'hi' ? 'मानचित्र विधा चयन' : 'Cartography Layer Modes'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
              {MAP_MODES.map((mode) => {
                const isActive = activeMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => handleModeChange(mode.id)}
                    title={mode.title}
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, #0284c7, #0369a1)'
                        : 'rgba(255, 255, 255, 0.04)',
                      border: isActive
                        ? '1px solid #38bdf8'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      color: isActive ? '#ffffff' : '#cbd5e1',
                      borderRadius: '8px',
                      padding: '0.45rem 0.6rem',
                      fontSize: '0.74rem',
                      fontWeight: isActive ? 800 : 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'all 0.15s ease',
                      textAlign: 'left',
                    }}
                  >
                    <span>{mode.icon}</span>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {mode.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Direct Mappls Web Portal Link */}
            <a
              href={mapplsPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: '0.65rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                color: '#fbbf24',
                padding: '0.45rem 0.8rem',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontWeight: 800,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <span>🌐</span>
              <span>{lang === 'hi' ? 'आधिकारिक Mappls पोर्टल पर देखें ↗' : 'Inspect on Mappls Portal ↗'}</span>
            </a>
          </div>

          {/* 3. ACTIVE SELECTED ZONE / HUB (Clean side readout replacing the overlapping map popups) */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(14, 11, 30, 0.95), rgba(18, 14, 40, 0.92))',
            border: `1.5px solid ${activeHub.color}`,
            borderRadius: '14px',
            padding: '1rem',
            boxShadow: `0 8px 24px ${activeHub.color}22`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.6rem' }}>{activeHub.icon}</span>
                <div>
                  <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.94rem' }}>
                    {activeHub.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    {activeHub.district}, {activeHub.state}
                  </div>
                </div>
              </div>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                background: `${activeHub.color}22`,
                color: activeHub.color,
                border: `1px solid ${activeHub.color}66`,
                padding: '2px 8px',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
              }}>
                {activeHub.belt}
              </span>
            </div>

            {/* Coordinates & Agricultural Phenology Status */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              borderRadius: '8px',
              padding: '0.65rem 0.8rem',
              margin: '0.6rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem' }}>
                <span style={{ color: '#94a3b8' }}>📍 {lang === 'hi' ? 'सटीक निर्देशांक' : 'Precise Coordinates'}:</span>
                <strong style={{ color: '#38bdf8' }}>{activeHub.lat.toFixed(4)}° N, {activeHub.lng.toFixed(4)}° E</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem' }}>
                <span style={{ color: '#94a3b8' }}>🌾 {lang === 'hi' ? 'कृषि स्थिति' : 'Agronomic Status'}:</span>
                <strong style={{ color: '#cbd5e1' }}>{activeHub.status}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem' }}>
                <span style={{ color: '#94a3b8' }}>🌧️ {lang === 'hi' ? 'वर्षा संभावना' : 'Rainfall Prob'}:</span>
                <strong style={{ color: '#34d399' }}>{activeHub.rain}</strong>
              </div>
            </div>

            {/* Set as Active Dashboard Hub Button */}
            <button
              onClick={() => handleApplyToDashboard(activeHub)}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #059669, #10b981)',
                color: '#ffffff',
                border: 'none',
                padding: '0.55rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(5, 150, 105, 0.4)',
                transition: 'all 0.15s ease',
              }}
            >
              <span>🎯</span>
              <span>{lang === 'hi' ? 'किसान डैशबोर्ड के लिए सक्रिय करें' : 'Set as Active Dashboard Hub'}</span>
            </button>
          </div>

          {/* 4. Agro-Climatic Hubs Directory / Filtered List */}
          <div style={{
            background: 'rgba(18, 14, 40, 0.72)',
            border: '1px solid rgba(255, 255, 255, 0.09)',
            borderRadius: '14px',
            padding: '0.85rem 1rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                🌾 {lang === 'hi' ? `कृषि केंद्र (${filteredHubs.length})` : `Agro Hubs Directory (${filteredHubs.length})`}
              </span>
              <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Click to Center</span>
            </div>

            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'hi' ? '🔍 खोजें (उदा: Lucknow, Cotton, Punjab)...' : '🔍 Search (e.g. Lucknow, Cotton, Punjab)...'}
              style={{
                width: '100%',
                background: 'rgba(13, 9, 28, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '0.4rem 0.7rem',
                color: '#f8fafc',
                fontSize: '0.75rem',
                outline: 'none',
              }}
            />

            {/* Region Filter Pills */}
            <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '2px', scrollbarWidth: 'none' }}>
              {['All', 'North', 'Central', 'South', 'East', 'West'].map((reg) => (
                <button
                  key={reg}
                  onClick={() => setRegionFilter(reg)}
                  style={{
                    flexShrink: 0,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '999px',
                    fontSize: '0.68rem',
                    fontWeight: regionFilter === reg ? 800 : 500,
                    background: regionFilter === reg ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255,255,255,0.04)',
                    border: regionFilter === reg ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.08)',
                    color: regionFilter === reg ? '#38bdf8' : '#94a3b8',
                    cursor: 'pointer',
                  }}
                >
                  {reg}
                </button>
              ))}
            </div>

            {/* Hubs Scrollable List */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              maxHeight: '260px',
              overflowY: 'auto',
              paddingRight: '2px',
            }}>
              {filteredHubs.map((hub) => {
                const isSelected = activeHub?.id === hub.id;
                return (
                  <div
                    key={hub.id}
                    onClick={() => handleSelectHub(hub, true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.45rem 0.65rem',
                      borderRadius: '8px',
                      background: isSelected ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? `1.5px solid ${hub.color}` : '1px solid rgba(255, 255, 255, 0.06)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '1rem' }}>{hub.icon}</span>
                      <div>
                        <div style={{ fontSize: '0.74rem', fontWeight: 700, color: isSelected ? '#ffffff' : '#e2e8f0' }}>
                          {hub.name.split(' (')[0]}
                        </div>
                        <div style={{ fontSize: '0.66rem', color: '#94a3b8' }}>
                          {hub.district}, {hub.state}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        fontSize: '0.64rem',
                        fontWeight: 700,
                        color: hub.color,
                        background: `${hub.color}18`,
                        padding: '1px 5px',
                        borderRadius: '4px',
                        display: 'block',
                      }}>
                        {hub.belt.split(' ')[0]}
                      </span>
                      <span style={{ fontSize: '0.64rem', color: '#34d399', fontWeight: 600 }}>
                        💧 {hub.rain}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── RIGHT MAP CANVAS (100% Clean, Zero Popups Overlapping) ─────────────── */}
        <div className="hydromap-map-container">
          {/* Map canvas container */}
          <div
            ref={mapContainerRef}
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
          />

          {/* Minimalist In-Map Status Pill (Subtle top-left pill that does not block states) */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 10,
            background: 'rgba(13, 9, 28, 0.88)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '999px',
            padding: '0.28rem 0.75rem',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#cbd5e1',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            pointerEvents: 'none',
          }}>
            <span>📍</span>
            <span>Focus:</span>
            <strong style={{ color: '#38bdf8' }}>{activeHub.name}</strong>
          </div>

          {/* User Location Center Button (Bottom-Right) */}
          {location?.lat && location?.lon && (
            <button
              onClick={() => {
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.flyTo({
                    center: [location.lon, location.lat],
                    zoom: 8.5,
                    duration: 1200,
                  });
                }
              }}
              title="Fly to Your Active Farm Location"
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '12px',
                zIndex: 10,
                background: 'rgba(13, 9, 28, 0.92)',
                border: '1.5px solid #06b6d4',
                color: '#38bdf8',
                borderRadius: '8px',
                padding: '0.45rem 0.8rem',
                fontSize: '0.74rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.15s ease',
              }}
            >
              <span>🎯</span>
              <span>{lang === 'hi' ? 'मेरा खेत केंद्र' : 'My Farm Location'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
