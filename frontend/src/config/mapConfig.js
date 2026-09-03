/**
 * VarshaNetra AI — Centralized Map Provider Configuration
 * 
 * Provider Architecture:
 *   1. MapmyIndia / Mappls  (Primary Indian Basemap via Mappls SDK / Tile Server)
 *   2. OpenStreetMap         (Global OSM Street Map)
 *   3. Satellite             (Esri World Imagery / MapLibre)
 *   4. Hybrid                (Satellite Imagery + Roads + Reference Labels / MapLibre)
 *
 * Architecture:
 *   BASEMAP (this config) → decoupled from → ANALYTICAL OVERLAYS (GeoJSON Risk & Admin Layers)
 */

// ─── API Key Resolvers ───────────────────────────────────────────────────────

export const getMapplsKey = () => {
  const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : (typeof process !== 'undefined' ? process.env : {});
  const raw = (
    env.NEXT_PUBLIC_MAPPLS_MAP_KEY ||
    env.VITE_MAPPLS_MAP_KEY ||
    env.VITE_MAPPLS_API_KEY ||
    env.VITE_MAPMYINDIA_API_KEY ||
    'rtaifoqegttbkllwgnjslfovrmkwrizhqvwu'
  ).trim();
  if (raw && raw !== 'YOUR_KEY' && raw !== 'undefined' && raw.length > 6) return raw;
  return 'rtaifoqegttbkllwgnjslfovrmkwrizhqvwu';
};

export const getMapplsRestKey = () => {
  const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : (typeof process !== 'undefined' ? process.env : {});
  const raw = (
    env.NEXT_PUBLIC_MAPPLS_REST_KEY ||
    env.VITE_MAPPLS_REST_KEY ||
    env.VITE_MAPPLS_API_KEY ||
    'rtaifoqegttbkllwgnjslfovrmkwrizhqvwu'
  ).trim();
  if (raw && raw !== 'YOUR_KEY' && raw !== 'undefined' && raw.length > 6) return raw;
  return 'rtaifoqegttbkllwgnjslfovrmkwrizhqvwu';
};

export const getMapplsKeys = () => ({
  mapKey: getMapplsKey(),
  restKey: getMapplsRestKey(),
});

/**
 * Dynamically loads the official Mappls Web Maps JavaScript SDK script.
 */
export const loadMapplsSDK = (mapKey) => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      return resolve(null);
    }
    if (window.mappls && window.mappls.Map) {
      return resolve(window.mappls);
    }
    const key = mapKey || getMapplsKey();
    if (!key) {
      return resolve(null);
    }

    const scriptId = 'mappls-web-map-sdk';
    if (document.getElementById(scriptId)) {
      const existing = document.getElementById(scriptId);
      existing.addEventListener('load', () => resolve(window.mappls));
      existing.addEventListener('error', () => resolve(null));
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://apis.mappls.com/advancedmaps/api/${key}/map-sdk.js`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('Mappls Web Map SDK loaded successfully.');
      resolve(window.mappls);
    };
    script.onerror = (err) => {
      console.warn('Mappls SDK failed to load, falling back gracefully:', err);
      resolve(null);
    };
    document.head.appendChild(script);
  });
};

export const getMaptilerKey = () => {
  const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : (typeof process !== 'undefined' ? process.env : {});
  const raw = (env.VITE_MAPTILER_API_KEY || 'hWJ8zOnbq0hlVvQIyvRG').trim();
  if (raw && raw !== 'YOUR_KEY' && raw.length > 6) return raw;
  return 'hWJ8zOnbq0hlVvQIyvRG';
};

// ─── Basemap IDs ─────────────────────────────────────────────────────────────

export const BASEMAP_IDS = {
  MAPPLS_STREET: 'mappls_street',
  MAPPLS_HYDRO: 'mappls_hydro',
  MAPPLS_TERRAIN: 'mappls_terrain',
  MAPPLS_LIVE: 'mappls_live',
  SATELLITE: 'satellite',
  HYBRID: 'hybrid',
};

export const DEFAULT_BASEMAP = BASEMAP_IDS.MAPPLS_STREET;

// ─── Basemap Metadata (for UI) ──────────────────────────────────────────────

export const BASEMAP_OPTIONS = [
  {
    id: BASEMAP_IDS.MAPPLS_STREET,
    icon: '🇮🇳',
    label_en: 'Mappls Street',
    label_hi: 'मैपल्स स्ट्रीट',
    title: 'Mappls / MapmyIndia — Survey of India Authorized Sovereign Street Map',
    gradient: 'linear-gradient(135deg, #0284c7, #0369a1)',
    engine: 'mappls',
  },
  {
    id: BASEMAP_IDS.MAPPLS_HYDRO,
    icon: '🏛️',
    label_en: 'Mappls Hydro-GIS',
    label_hi: 'मैपल्स हाइड्रो-जीआईएस',
    title: 'Mappls Hydro-GIS & Indian River Basin Cartography',
    gradient: 'linear-gradient(135deg, #059669, #0284c7)',
    engine: 'mappls',
  },
  {
    id: BASEMAP_IDS.MAPPLS_TERRAIN,
    icon: '⛰️',
    label_en: 'Mappls Terrain',
    label_hi: 'मैपल्स भू-भाग',
    title: 'Mappls Topographic Elevation & Relief Cartography',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    engine: 'mappls',
  },
  {
    id: BASEMAP_IDS.MAPPLS_LIVE,
    icon: '🗺️',
    label_en: 'Mappls Live Portal',
    label_hi: 'मैपल्स लाइव पोर्टल',
    title: 'Official Mappls Web Portal (https://www.mappls.com/)',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    engine: 'mappls',
  },
  {
    id: BASEMAP_IDS.SATELLITE,
    icon: '🛰️',
    label_en: 'Satellite',
    label_hi: 'उपग्रह',
    title: 'Satellite Imagery — High-resolution aerial photography (MapLibre GL)',
    gradient: 'linear-gradient(135deg, #059669, #10b981)',
    engine: 'maplibre',
  },
  {
    id: BASEMAP_IDS.HYBRID,
    icon: '🌐',
    label_en: 'Hybrid',
    label_hi: 'हाइब्रिड',
    title: 'Hybrid — Satellite imagery with road overlays & place labels (MapLibre GL)',
    gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    engine: 'maplibre',
  },
];

// ─── Style Builders for MapLibre / Mappls ────────────────────────────────────

/**
 * MapmyIndia / Mappls basemap.
 */
const buildMapplsStyle = () => {
  return {
    version: 8,
    glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
    sources: {
      'mappls-raster': {
        type: 'raster',
        tiles: [
          'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        ],
        tileSize: 256,
        attribution: '&copy; Mappls &bull; Survey of India Compliant Cartography'
      }
    },
    layers: [
      {
        id: 'mappls-bg',
        type: 'background',
        paint: { 'background-color': '#070512' }
      },
      {
        id: 'mappls-raster-layer',
        type: 'raster',
        source: 'mappls-raster',
        minzoom: 0,
        maxzoom: 19
      }
    ]
  };
};

/**
 * OpenStreetMap raster tile basemap.
 */
const buildOSMStyle = () => {
  return {
    version: 8,
    glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
    sources: {
      'osm-raster': {
        type: 'raster',
        tiles: [
          'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        ],
        tileSize: 256,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
      }
    },
    layers: [
      {
        id: 'osm-bg',
        type: 'background',
        paint: { 'background-color': '#f2efe9' }
      },
      {
        id: 'osm-raster-layer',
        type: 'raster',
        source: 'osm-raster',
        minzoom: 0,
        maxzoom: 19
      }
    ]
  };
};

/**
 * Satellite basemap (MapLibre Engine).
 * Uses Esri World Imagery.
 */
const buildSatelliteStyle = () => {
  return {
    version: 8,
    glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
    sources: {
      'satellite-tiles': {
        type: 'raster',
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        ],
        tileSize: 256,
        attribution: '&copy; Esri, Maxar, Earthstar Geographics (MapLibre GL)'
      }
    },
    layers: [
      {
        id: 'satellite-bg',
        type: 'background',
        paint: { 'background-color': '#070b19' }
      },
      {
        id: 'satellite-layer',
        type: 'raster',
        source: 'satellite-tiles',
        minzoom: 0,
        maxzoom: 20
      }
    ]
  };
};

/**
 * Hybrid basemap (MapLibre Engine).
 * Satellite + Roads + Places.
 */
const buildHybridStyle = () => {
  return {
    version: 8,
    glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
    sources: {
      'satellite-tiles': {
        type: 'raster',
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        ],
        tileSize: 256,
        attribution: '&copy; Esri, Maxar, Earthstar Geographics (MapLibre GL)'
      },
      'hybrid-roads': {
        type: 'raster',
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}'
        ],
        tileSize: 256,
        attribution: '&copy; Esri'
      },
      'hybrid-places': {
        type: 'raster',
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'
        ],
        tileSize: 256,
        attribution: '&copy; Esri'
      }
    },
    layers: [
      {
        id: 'satellite-bg',
        type: 'background',
        paint: { 'background-color': '#070b19' }
      },
      {
        id: 'satellite-layer',
        type: 'raster',
        source: 'satellite-tiles',
        minzoom: 0,
        maxzoom: 20
      },
      {
        id: 'hybrid-roads-layer',
        type: 'raster',
        source: 'hybrid-roads',
        minzoom: 0,
        maxzoom: 20
      },
      {
        id: 'hybrid-places-layer',
        type: 'raster',
        source: 'hybrid-places',
        minzoom: 0,
        maxzoom: 20
      }
    ]
  };
};

// ─── Public API ──────────────────────────────────────────────────────────────

export const getMapStyle = (basemapId = DEFAULT_BASEMAP) => {
  switch (basemapId) {
    case BASEMAP_IDS.MAPPLS_STREET:
    case BASEMAP_IDS.MAPPLS_HYDRO:
    case BASEMAP_IDS.MAPPLS_TERRAIN:
    case BASEMAP_IDS.MAPPLS_LIVE:
      return buildMapplsStyle();
    case BASEMAP_IDS.SATELLITE:
      return buildSatelliteStyle();
    case BASEMAP_IDS.HYBRID:
      return buildHybridStyle();
    default:
      return buildSatelliteStyle();
  }
};

export const isMapplsConfigured = () => !!getMapplsKey();
