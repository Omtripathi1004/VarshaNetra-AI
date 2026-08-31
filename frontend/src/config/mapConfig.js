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
 * Safely reads and validates the Mappls API key from Vite env.
 * Never returns the raw key in error messages.
 */
const getMapplsKey = () => {
  const raw = (
    import.meta.env.VITE_MAPPLS_API_KEY ||
    import.meta.env.VITE_MAPMYINDIA_API_KEY ||
    ''
  ).trim();
  if (raw && raw !== 'YOUR_KEY' && raw !== 'undefined' && raw.length > 6) return raw;
  return '';
};

/**
 * Safely reads and validates the MapTiler API key from Vite env (retained for future satellite/vector).
 */
const getMaptilerKey = () => {
  const raw = (import.meta.env.VITE_MAPTILER_API_KEY || '').trim();
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
 * Uses official Mappls raster tile endpoint with fallback to standard OSM/Esri raster tiles.
 */
const buildMapplsStyle = () => {
  const key = getMapplsKey();

  if (key) {
    return {
      version: 8,
      glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
      sources: {
        'osm-underlay': {
          type: 'raster',
          tiles: [
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          ],
          tileSize: 256,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
        },
        'mappls-raster': {
          type: 'raster',
          tiles: [
            `https://apis.mappls.com/advancedmaps/v1/${key}/still_map/{z}/{x}/{y}.png`
          ],
          tileSize: 256,
          attribution: '&copy; <a href="https://about.mappls.com/" target="_blank">Mappls</a>, &copy; <a href="https://www.mapmyindia.com/" target="_blank">MapmyIndia</a>'
        }
      },
      layers: [
        {
          id: 'mappls-bg',
          type: 'background',
          paint: { 'background-color': '#e8ecef' }
        },
        {
          id: 'osm-underlay-layer',
          type: 'raster',
          source: 'osm-underlay',
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

  // Fallback: OpenStreetMap & CartoDB / Esri Street Map (100% reliable without key)
  return {
    version: 8,
    glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
    sources: {
      'osm-street-tiles': {
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
        id: 'mappls-fallback-bg',
        type: 'background',
        paint: { 'background-color': '#e8ecef' }
      },
      {
        id: 'osm-street-layer',
        type: 'raster',
        source: 'osm-street-tiles',
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
