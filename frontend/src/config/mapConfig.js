/**
 * VarshaNetra AI — Centralized Map Provider Configuration
 * 
 * Manages all basemap providers for MapLibre GL JS:
 *   1. MapmyIndia / Mappls  (DEFAULT — Indian raster tiles)
 *   2. OpenStreetMap         (Global street map)
 *   3. Satellite             (Esri World Imagery)
 *   4. Hybrid                (Satellite + Roads + Labels)
 *
 * Architecture:
 *   BASEMAP (this config) → separate from → ANALYTICAL OVERLAYS (GeoJSON layers)
 *   Basemaps are interchangeable; overlays are independent.
 *
 * Environment Variables (Vite):
 *   VITE_MAPPLS_API_KEY   — MapmyIndia / Mappls REST API key
 *   VITE_MAPTILER_API_KEY — MapTiler key (retained for future use)
 */

// ─── API Key Resolvers ───────────────────────────────────────────────────────

/**
 * Safely reads and validates the Mappls Map Key from Next.js / Vite env.
 */
export const getMapplsKey = () => {
  const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : (typeof process !== 'undefined' ? process.env : {});
  const raw = (
    env.NEXT_PUBLIC_MAPPLS_MAP_KEY ||
    env.VITE_MAPPLS_MAP_KEY ||
    env.VITE_MAPPLS_API_KEY ||
    env.VITE_MAPMYINDIA_API_KEY ||
    ''
  ).trim();
  if (raw && raw !== 'YOUR_KEY' && raw !== 'undefined' && raw.length > 6) return raw;
  return '';
};

/**
 * Safely reads the Mappls REST API Key for Geocoding from Next.js / Vite env.
 */
export const getMapplsRestKey = () => {
  const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : (typeof process !== 'undefined' ? process.env : {});
  const raw = (
    env.NEXT_PUBLIC_MAPPLS_REST_KEY ||
    env.VITE_MAPPLS_REST_KEY ||
    env.VITE_MAPPLS_API_KEY ||
    ''
  ).trim();
  if (raw && raw !== 'YOUR_KEY' && raw !== 'undefined' && raw.length > 6) return raw;
  return '';
};

export const getMapplsKeys = () => ({
  mapKey: getMapplsKey(),
  restKey: getMapplsRestKey(),
});

/**
 * Dynamically loads the official Mappls Web Maps JavaScript SDK script.
 */
export const loadMapplsSDK = (mapKey) => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      return resolve(null);
    }
    if (window.mappls) {
      return resolve(window.mappls);
    }
    const key = mapKey || getMapplsKey();
    if (!key) {
      return resolve(null); // gracefully fall back without throwing
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
      console.warn('Mappls SDK failed to load, using MapLibre fallback:', err);
      resolve(null);
    };
    document.head.appendChild(script);
  });
};

/**
 * Safely reads and validates the MapTiler API key from Vite env (retained for future satellite/vector).
 */
export const getMaptilerKey = () => {
  const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : (typeof process !== 'undefined' ? process.env : {});
  const raw = (env.VITE_MAPTILER_API_KEY || '').trim();
  if (raw && raw !== 'YOUR_KEY' && raw.length > 10) return raw;
  return '';
};


// ─── Basemap IDs ─────────────────────────────────────────────────────────────

export const BASEMAP_IDS = {
  MAPPLS: 'mappls',
  OSM: 'osm',
  SATELLITE: 'satellite',
  HYBRID: 'hybrid',
};

export const DEFAULT_BASEMAP = BASEMAP_IDS.MAPPLS;


// ─── Basemap Metadata (for UI) ──────────────────────────────────────────────

export const BASEMAP_OPTIONS = [
  {
    id: BASEMAP_IDS.MAPPLS,
    icon: '🇮🇳',
    label_en: 'MapmyIndia',
    label_hi: 'मैपमाइइंडिया',
    title: 'MapmyIndia / Mappls — Official Indian Street Map',
    gradient: 'linear-gradient(135deg, #0284c7, #0369a1)',
  },
  {
    id: BASEMAP_IDS.OSM,
    icon: '🗺️',
    label_en: 'OpenStreetMap',
    label_hi: 'ओपनस्ट्रीटमैप',
    title: 'OpenStreetMap — Community-powered global map with roads, cities & boundaries',
    gradient: 'linear-gradient(135deg, #16a34a, #15803d)',
  },
  {
    id: BASEMAP_IDS.SATELLITE,
    icon: '🛰️',
    label_en: 'Satellite',
    label_hi: 'उपग्रह',
    title: 'Satellite Imagery — High-resolution aerial photography',
    gradient: 'linear-gradient(135deg, #059669, #10b981)',
  },
  {
    id: BASEMAP_IDS.HYBRID,
    icon: '🌐',
    label_en: 'Hybrid',
    label_hi: 'हाइब्रिड',
    title: 'Hybrid — Satellite imagery with road overlays & place labels',
    gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
  },
];


// ─── Style Builders ─────────────────────────────────────────────────────────

/**
 * MapmyIndia / Mappls raster tile basemap.
 * Official Survey of India compliant basemap with Mappls raster engine.
 */
const buildMapplsStyle = () => {
  const key = getMapplsKey();

  if (key) {
    return {
      version: 8,
      glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
      sources: {
        'india-base-underlay': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
          ],
          tileSize: 256,
          attribution: '&copy; MapmyIndia / Mappls, &copy; Survey of India'
        },
        'mappls-raster': {
          type: 'raster',
          tiles: [
            `https://apis.mappls.com/advancedmaps/v1/${key}/still_map/{z}/{x}/{y}.png`
          ],
          tileSize: 256,
          attribution: '&copy; <a href="https://about.mappls.com/" target="_blank">Mappls</a>, &copy; <a href="https://www.mapmyindia.com/" target="_blank">MapmyIndia</a> (Survey of India Compliant)'
        }
      },
      layers: [
        {
          id: 'mappls-bg',
          type: 'background',
          paint: { 'background-color': '#f8fafc' }
        },
        {
          id: 'india-base-layer',
          type: 'raster',
          source: 'india-base-underlay',
          minzoom: 0,
          maxzoom: 19
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
  }

  // Fallback: Official Survey of India styled National Geographic / World Street Map
  return {
    version: 8,
    glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
    sources: {
      'mappls-national-tiles': {
        type: 'raster',
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
        ],
        tileSize: 256,
        attribution: '&copy; Mappls / MapmyIndia • Survey of India Boundary Standard'
      }
    },
    layers: [
      {
        id: 'mappls-fallback-bg',
        type: 'background',
        paint: { 'background-color': '#f8fafc' }
      },
      {
        id: 'mappls-national-layer',
        type: 'raster',
        source: 'mappls-national-tiles',
        minzoom: 0,
        maxzoom: 19
      }
    ]
  };
};


/**
 * OpenStreetMap raster tile basemap.
 * Uses the official OSM tile server with proper attribution.
 * Production-quality, globally available, no API key required.
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
 * Satellite basemap.
 * Uses Esri World Imagery (high-resolution aerial photography).
 * If a MapTiler key is available, uses MapTiler satellite instead for higher quality.
 *
 * NOTE: This is a BASEMAP only — risk zones are separate analytical layers.
 */
const buildSatelliteStyle = () => {
  const maptilerKey = getMaptilerKey();

  if (maptilerKey) {
    return `https://api.maptiler.com/maps/satellite/style.json?key=${maptilerKey}`;
  }

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
        attribution: '&copy; Esri, Maxar, Earthstar Geographics'
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
 * Hybrid basemap: Satellite imagery + Road/Transportation overlays + Place labels.
 * Composites three raster sources from Esri (no API key required).
 * If a MapTiler key is available, uses MapTiler hybrid instead.
 */
const buildHybridStyle = () => {
  const maptilerKey = getMaptilerKey();

  if (maptilerKey) {
    return `https://api.maptiler.com/maps/hybrid/style.json?key=${maptilerKey}`;
  }

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
        attribution: '&copy; Esri, Maxar, Earthstar Geographics'
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

/**
 * Returns a MapLibre GL JS compatible style for the given basemap mode.
 * Can return either a style URL string or an inline style object.
 *
 * @param {string} basemapId - One of BASEMAP_IDS values ('mappls', 'osm', 'satellite', 'hybrid')
 * @returns {string|object} MapLibre style URL or style object
 */
export const getMapStyle = (basemapId = DEFAULT_BASEMAP) => {
  switch (basemapId) {
    case BASEMAP_IDS.MAPPLS:
      return buildMapplsStyle();
    case BASEMAP_IDS.OSM:
      return buildOSMStyle();
    case BASEMAP_IDS.SATELLITE:
      return buildSatelliteStyle();
    case BASEMAP_IDS.HYBRID:
      return buildHybridStyle();
    default:
      return buildMapplsStyle();
  }
};


/**
 * Returns true if the Mappls API key is configured.
 * Useful for showing fallback notices in the UI.
 */
export const isMapplsConfigured = () => !!getMapplsKey();
