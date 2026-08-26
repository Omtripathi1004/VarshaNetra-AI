import React, { useEffect, useState, useRef, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import {
  INDIA_BOUNDARY_GEOJSON,
  INDIA_STATES_GEOJSON,
  INDIA_DISTRICTS_GEOJSON,
  INDIA_BLOCKS_GEOJSON,
  INDIA_PANCHAYATS_GEOJSON,
  INDIA_VILLAGES_GEOJSON,
  VARSHANETRA_RISK_ZONES_GEOJSON,
  HISTORICAL_WEATHER_EVENTS_GEOJSON,
  WEATHER_OVERLAYS_GEOJSON,
} from '../../data/indiaGeoJson';

// Default India Geographic Center & Zoom
const INDIA_DEFAULT_CENTER = [78.9629, 22.5937]; // Longitude, Latitude
const INDIA_DEFAULT_ZOOM = 4.6;

// Function to resolve MapLibre style for Vector/Normal, Satellite, and Hybrid basemaps
const getMapStyle = (apiKey, basemapMode = 'normal') => {
  const cleanKey = (apiKey || '').trim();
  const hasKey = cleanKey && cleanKey !== 'YOUR_KEY' && cleanKey.length > 5;

  if (basemapMode === 'satellite') {
    if (hasKey) {
      return `https://api.maptiler.com/maps/satellite/style.json?key=${cleanKey}`;
    }
    return {
      version: 8,
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
  }

  if (basemapMode === 'hybrid') {
    if (hasKey) {
      return `https://api.maptiler.com/maps/hybrid/style.json?key=${cleanKey}`;
    }
    return {
      version: 8,
      sources: {
        'satellite-tiles': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          ],
          tileSize: 256,
          attribution: '&copy; Esri, Maxar, Earthstar Geographics'
        },
        'hybrid-labels': {
          type: 'raster',
          tiles: [
            'https://a.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}@2x.png',
            'https://b.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}@2x.png',
            'https://c.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}@2x.png'
          ],
          tileSize: 256,
          attribution: '&copy; OpenStreetMap contributors, CARTO'
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
          id: 'hybrid-labels-layer',
          type: 'raster',
          source: 'hybrid-labels',
          minzoom: 0,
          maxzoom: 20
        }
      ]
    };
  }

  // DEFAULT: NORMAL / VECTOR MAP (Crisp, light Leaflet/OpenStreetMap-style geographic appearance)
  if (hasKey) {
    return `https://api.maptiler.com/maps/streets-v2/style.json?key=${cleanKey}`;
  }

  return {
    version: 8,
    sources: {
      'osm-voyager-tiles': {
        type: 'raster',
        tiles: [
          'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
          'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
          'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
          'https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png'
        ],
        tileSize: 256,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }
    },
    layers: [
      {
        id: 'osm-light-bg',
        type: 'background',
        paint: { 'background-color': '#e8ecef' }
      },
      {
        id: 'osm-voyager-base',
        type: 'raster',
        source: 'osm-voyager-tiles',
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

  // Basemap Mode: 'normal' (default) | 'satellite' | 'hybrid'
  const [basemapMode, setBasemapMode] = useState('normal');

  // Layer control panel state
  const [layersState, setLayersState] = useState({
    // Administrative boundaries
    states: true,
    districts: true,
    blocks: false,
    panchayats: false,
    villages: false,
    // Risk layers
    riskZones: true,
    historicalEvents: false,
    // Weather layers
    weatherRain: false,
    weatherTemp: false,
    weatherHumidity: false,
  });

  // Layer Panel Open / Closed
  const [showLayerPanel, setShowLayerPanel] = useState(true);

  // Risk sub-filter: ALL | RED | ORANGE | YELLOW | GREEN | GREY
  const [riskFilter, setRiskFilter] = useState('ALL');

  // Search & Navigation
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchEntityType, setSearchEntityType] = useState('ALL');
  const [isSearching, setIsSearching] = useState(false);

  // Interactive HUD / Selection State
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedAdminEntity, setSelectedAdminEntity] = useState(null);
  const [clickedCoord, setClickedCoord] = useState(null);
  const [copiedGps, setCopiedGps] = useState(false);
  const [copiedClick, setCopiedClick] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Current Map Zoom Level
  const [currentZoom, setCurrentZoom] = useState(INDIA_DEFAULT_ZOOM);

  const [mapStats, setMapStats] = useState({
    states_and_uts: 36,
    districts: 786,
    sub_districts_blocks: 5502,
    gram_panchayats_lgd: 1711,
    villages: 4716,
  });

  // Fetch admin catalog stats
  useEffect(() => {
    api.getMapStats().then(res => {
      if (res.data?.states_and_uts) setMapStats(res.data);
    }).catch(() => {});
  }, []);

  // Debounced search for all administrative levels
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

  // Decoupled Geospatial Layer Builder: Registers all sources & layers on the MapLibre instance
  const setupMapOverlays = useCallback((map) => {
    if (!map) return;

    try {
      // 1. NATIONAL BOUNDARY
      if (!map.getSource('vn-national-boundary')) {
        map.addSource('vn-national-boundary', {
          type: 'geojson',
          data: INDIA_BOUNDARY_GEOJSON
        });
      }
      if (!map.getLayer('vn-national-line')) {
        map.addLayer({
          id: 'vn-national-line',
          type: 'line',
          source: 'vn-national-boundary',
          paint: {
            'line-color': '#0284c7',
            'line-width': 2.5,
            'line-opacity': 0.85
          }
        });
      }

      // 2. STATE BOUNDARIES (Zoom 0 to 7.5)
      if (!map.getSource('vn-states')) {
        map.addSource('vn-states', {
          type: 'geojson',
          data: INDIA_STATES_GEOJSON
        });
      }
      if (!map.getLayer('vn-states-fill')) {
        map.addLayer({
          id: 'vn-states-fill',
          type: 'fill',
          source: 'vn-states',
          maxzoom: 7.5,
          paint: {
            'fill-color': '#0284c7',
            'fill-opacity': 0.05
          }
        });
      }
      if (!map.getLayer('vn-states-border')) {
        map.addLayer({
          id: 'vn-states-border',
          type: 'line',
          source: 'vn-states',
          maxzoom: 7.5,
          paint: {
            'line-color': '#0369a1',
            'line-width': 1.8,
            'line-dasharray': [3, 2]
          }
        });
      }

      // 3. DISTRICT BOUNDARIES (Zoom 5.5 to 11.5)
      if (!map.getSource('vn-districts')) {
        map.addSource('vn-districts', {
          type: 'geojson',
          data: INDIA_DISTRICTS_GEOJSON
        });
      }
      if (!map.getLayer('vn-districts-fill')) {
        map.addLayer({
          id: 'vn-districts-fill',
          type: 'fill',
          source: 'vn-districts',
          minzoom: 5.5,
          maxzoom: 11.5,
          paint: {
            'fill-color': [
              'match',
              ['coalesce', ['get', 'risk_level'], 'NO_DATA'],
              'CRITICAL', '#dc2626',
              'HIGH', '#ea580c',
              'MODERATE', '#eab308',
              'LOW', '#16a34a',
              '#64748b'
            ],
            'fill-opacity': 0.12
          }
        });
      }
      if (!map.getLayer('vn-districts-border')) {
        map.addLayer({
          id: 'vn-districts-border',
          type: 'line',
          source: 'vn-districts',
          minzoom: 5.5,
          maxzoom: 11.5,
          paint: {
            'line-color': '#0284c7',
            'line-width': 1.4,
            'line-opacity': 0.85
          }
        });
      }

      // 4. BLOCK / SUB-DISTRICT LEVEL (Zoom 8.5 to 13.5)
      if (!map.getSource('vn-blocks')) {
        map.addSource('vn-blocks', {
          type: 'geojson',
          data: INDIA_BLOCKS_GEOJSON
        });
      }
      if (!map.getLayer('vn-blocks-fill')) {
        map.addLayer({
          id: 'vn-blocks-fill',
          type: 'fill',
          source: 'vn-blocks',
          minzoom: 8.5,
          maxzoom: 13.5,
          paint: {
            'fill-color': '#8b5cf6',
            'fill-opacity': 0.14
          }
        });
      }
      if (!map.getLayer('vn-blocks-border')) {
        map.addLayer({
          id: 'vn-blocks-border',
          type: 'line',
          source: 'vn-blocks',
          minzoom: 8.5,
          maxzoom: 13.5,
          paint: {
            'line-color': '#a78bfa',
            'line-width': 1.2,
            'line-dasharray': [2, 2]
          }
        });
      }

      // 5. GRAM PANCHAYAT LEVEL (Zoom 11.5 to 15.5)
      if (!map.getSource('vn-panchayats')) {
        map.addSource('vn-panchayats', {
          type: 'geojson',
          data: INDIA_PANCHAYATS_GEOJSON
        });
      }
      if (!map.getLayer('vn-panchayats-fill')) {
        map.addLayer({
          id: 'vn-panchayats-fill',
          type: 'fill',
          source: 'vn-panchayats',
          minzoom: 11.5,
          maxzoom: 15.5,
          paint: {
            'fill-color': '#eab308',
            'fill-opacity': 0.18
          }
        });
      }
      if (!map.getLayer('vn-panchayats-border')) {
        map.addLayer({
          id: 'vn-panchayats-border',
          type: 'line',
          source: 'vn-panchayats',
          minzoom: 11.5,
          maxzoom: 15.5,
          paint: {
            'line-color': '#fde047',
            'line-width': 1.5
          }
        });
      }

      // 6. REVENUE VILLAGES (Zoom 13.0 to 20)
      if (!map.getSource('vn-villages')) {
        map.addSource('vn-villages', {
          type: 'geojson',
          data: INDIA_VILLAGES_GEOJSON
        });
      }
      if (!map.getLayer('vn-villages-circle')) {
        map.addLayer({
          id: 'vn-villages-circle',
          type: 'circle',
          source: 'vn-villages',
          minzoom: 13.0,
          paint: {
            'circle-radius': 7,
            'circle-color': '#10b981',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
        });
      }

      // 7. MULTI-TIER RISK ZONES (Independent GeoJSON Polygons across ALL basemaps)
      // 🔴 RED | 🟠 ORANGE | 🟡 YELLOW | 🟢 GREEN | ⚪ GREY
      if (!map.getSource('vn-risk-zones')) {
        map.addSource('vn-risk-zones', {
          type: 'geojson',
          data: VARSHANETRA_RISK_ZONES_GEOJSON
        });
      }
      if (!map.getLayer('vn-risk-zones-fill')) {
        map.addLayer({
          id: 'vn-risk-zones-fill',
          type: 'fill',
          source: 'vn-risk-zones',
          paint: {
            'fill-color': [
              'match',
              ['coalesce', ['get', 'risk_level'], 'GREY'],
              'RED', '#dc2626',
              'ORANGE', '#ea580c',
              'YELLOW', '#eab308',
              'GREEN', '#16a34a',
              'GREY', '#64748b',
              '#0284c7'
            ],
            'fill-opacity': 0.38
          }
        });
      }
      if (!map.getLayer('vn-risk-zones-border')) {
        map.addLayer({
          id: 'vn-risk-zones-border',
          type: 'line',
          source: 'vn-risk-zones',
          paint: {
            'line-color': [
              'match',
              ['coalesce', ['get', 'risk_level'], 'GREY'],
              'RED', '#ef4444',
              'ORANGE', '#f97316',
              'YELLOW', '#fde047',
              'GREEN', '#22c55e',
              'GREY', '#94a3b8',
              '#38bdf8'
            ],
            'line-width': 2.2,
            'line-opacity': 0.95
          }
        });
      }

      // 8. HISTORICAL EXTREME EVENTS
      if (!map.getSource('vn-hist-events')) {
        map.addSource('vn-hist-events', {
          type: 'geojson',
          data: HISTORICAL_WEATHER_EVENTS_GEOJSON
        });
      }
      if (!map.getLayer('vn-hist-events-circle')) {
        map.addLayer({
          id: 'vn-hist-events-circle',
          type: 'circle',
          source: 'vn-hist-events',
          paint: {
            'circle-radius': 9,
            'circle-color': '#f43f5e',
            'circle-stroke-width': 2.5,
            'circle-stroke-color': '#ffffff'
          }
        });
      }

      // 9. SYNOPTIC WEATHER OVERLAYS
      if (!map.getSource('vn-weather-rain')) {
        map.addSource('vn-weather-rain', {
          type: 'geojson',
          data: WEATHER_OVERLAYS_GEOJSON.rainfall
        });
      }
      if (!map.getLayer('vn-weather-rain-fill')) {
        map.addLayer({
          id: 'vn-weather-rain-fill',
          type: 'fill',
          source: 'vn-weather-rain',
          paint: {
            'fill-color': ['get', 'color'],
            'fill-opacity': 0.35
          }
        });
      }

      if (!map.getSource('vn-weather-temp')) {
        map.addSource('vn-weather-temp', {
          type: 'geojson',
          data: WEATHER_OVERLAYS_GEOJSON.temperature
        });
      }
      if (!map.getLayer('vn-weather-temp-fill')) {
        map.addLayer({
          id: 'vn-weather-temp-fill',
          type: 'fill',
          source: 'vn-weather-temp',
          paint: {
            'fill-color': ['get', 'color'],
            'fill-opacity': 0.30
          }
        });
      }

      if (!map.getSource('vn-weather-humidity')) {
        map.addSource('vn-weather-humidity', {
          type: 'geojson',
          data: WEATHER_OVERLAYS_GEOJSON.humidity
        });
      }
      if (!map.getLayer('vn-weather-humidity-fill')) {
        map.addLayer({
          id: 'vn-weather-humidity-fill',
          type: 'fill',
          source: 'vn-weather-humidity',
          paint: {
            'fill-color': ['get', 'color'],
            'fill-opacity': 0.30
          }
        });
      }
    } catch (e) {
      console.warn('Overlay setup error:', e);
    }
  }, []);

  // Synchronize Layer Visibilities with User Control Panel Checkboxes
  const syncLayerVisibility = useCallback((map, currentLayers, currentRiskFilter) => {
    if (!map) return;

    const setVisibility = (layerId, isVisible) => {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'visibility', isVisible ? 'visible' : 'none');
      }
    };

    // States
    setVisibility('vn-states-fill', currentLayers.states);
    setVisibility('vn-states-border', currentLayers.states);

    // Districts
    setVisibility('vn-districts-fill', currentLayers.districts);
    setVisibility('vn-districts-border', currentLayers.districts);

    // Blocks
    setVisibility('vn-blocks-fill', currentLayers.blocks);
    setVisibility('vn-blocks-border', currentLayers.blocks);

    // Panchayats
    setVisibility('vn-panchayats-fill', currentLayers.panchayats);
    setVisibility('vn-panchayats-border', currentLayers.panchayats);

    // Villages
    setVisibility('vn-villages-circle', currentLayers.villages);

    // Risk Zones
    setVisibility('vn-risk-zones-fill', currentLayers.riskZones);
    setVisibility('vn-risk-zones-border', currentLayers.riskZones);

    // Risk Filter (ALL / RED / ORANGE / YELLOW / GREEN / GREY)
    if (map.getLayer('vn-risk-zones-fill')) {
      if (currentRiskFilter === 'ALL') {
        map.setFilter('vn-risk-zones-fill', null);
        map.setFilter('vn-risk-zones-border', null);
      } else {
        const filterExpr = ['==', ['get', 'risk_level'], currentRiskFilter];
        map.setFilter('vn-risk-zones-fill', filterExpr);
        map.setFilter('vn-risk-zones-border', filterExpr);
      }
    }

    // Historical Events
    setVisibility('vn-hist-events-circle', currentLayers.historicalEvents);

    // Weather Layers
    setVisibility('vn-weather-rain-fill', currentLayers.weatherRain);
    setVisibility('vn-weather-temp-fill', currentLayers.weatherTemp);
    setVisibility('vn-weather-humidity-fill', currentLayers.weatherHumidity);
  }, []);

  // Initialize MapLibre GL Map Engine
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const maptilerApiKey = import.meta.env.VITE_MAPTILER_API_KEY;
    const initialStyle = getMapStyle(maptilerApiKey, 'normal');

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: initialStyle,
      center: [INDIA_DEFAULT_CENTER[0], INDIA_DEFAULT_CENTER[1]],
      zoom: INDIA_DEFAULT_ZOOM,
      minZoom: 3.0,
      maxZoom: 18,
    });

    // Navigation and Scale Controls
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-left');
    map.addControl(new maplibregl.FullscreenControl(), 'top-left');
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 120, unit: 'metric' }), 'bottom-left');

    // On style load / basemap switch
    map.on('style.load', () => {
      setupMapOverlays(map);
      syncLayerVisibility(map, layersState, riskFilter);
      setMapLoaded(true);
      setTimeout(() => map.resize(), 100);
    });

    map.on('load', () => {
      setupMapOverlays(map);
      syncLayerVisibility(map, layersState, riskFilter);

      // Track zoom level changes
      map.on('zoom', () => {
        setCurrentZoom(Number(map.getZoom().toFixed(1)));
      });

      // Hover cursors
      const interactiveLayers = ['vn-risk-zones-fill', 'vn-districts-fill', 'vn-blocks-fill', 'vn-panchayats-fill', 'vn-villages-circle', 'vn-hist-events-circle'];
      interactiveLayers.forEach(lyr => {
        map.on('mousemove', lyr, () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', lyr, () => {
          map.getCanvas().style.cursor = '';
        });
      });

      // Click on Risk Zones
      map.on('click', 'vn-risk-zones-fill', (e) => {
        if (e.features && e.features.length > 0) {
          const props = e.features[0].properties;
          setSelectedFeature({ ...props, type: 'RISK_ZONE' });
          setSelectedAdminEntity(null);
        }
      });

      // Click on Districts
      map.on('click', 'vn-districts-fill', (e) => {
        if (e.features && e.features.length > 0) {
          const props = e.features[0].properties;
          setSelectedAdminEntity({
            ...props,
            entity_type: 'DISTRICT',
            display_name: `${props.name}, ${props.state}`
          });
          setSelectedFeature(null);
        }
      });

      // Click on Blocks
      map.on('click', 'vn-blocks-fill', (e) => {
        if (e.features && e.features.length > 0) {
          const props = e.features[0].properties;
          setSelectedAdminEntity({
            ...props,
            entity_type: 'BLOCK',
            display_name: `${props.name} (${props.tehsils}), ${props.district}`
          });
          setSelectedFeature(null);
        }
      });

      // Click on Panchayats
      map.on('click', 'vn-panchayats-fill', (e) => {
        if (e.features && e.features.length > 0) {
          const props = e.features[0].properties;
          setSelectedAdminEntity({
            ...props,
            entity_type: 'GRAM_PANCHAYAT',
            display_name: `${props.name}, ${props.block}`
          });
          setSelectedFeature(null);
        }
      });

      // Click on Villages
      map.on('click', 'vn-villages-circle', (e) => {
        if (e.features && e.features.length > 0) {
          const props = e.features[0].properties;
          setSelectedAdminEntity({
            ...props,
            entity_type: 'VILLAGE',
            display_name: `${props.name}, ${props.district}`
          });
          setSelectedFeature(null);
        }
      });

      // Click on Historical Events
      map.on('click', 'vn-hist-events-circle', (e) => {
        if (e.features && e.features.length > 0) {
          const props = e.features[0].properties;
          setSelectedFeature({
            ...props,
            type: 'HISTORICAL_EVENT',
            risk_level: props.severity || 'HIGH',
            weather_summary: props.impact,
            rainfall_24h_mm: props.recorded_rain
          });
          setSelectedAdminEntity(null);
        }
      });

      // Generic Canvas Click Handler (Coordinates HUD)
      map.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        setClickedCoord({ lat, lon: lng });
      });

      mapRef.current = map;
      setMapLoaded(true);
      setTimeout(() => map.resize(), 150);
    });

    // Resize on window changes
    const handleResize = () => {
      if (map) map.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      map.remove();
      mapRef.current = null;
    };
  }, [setupMapOverlays, syncLayerVisibility]);

  // Seamless Basemap Switcher (Normal Vector ↔ Satellite ↔ Hybrid)
  const handleSwitchBasemap = useCallback((mode) => {
    if (mode === basemapMode || !mapRef.current) return;
    setBasemapMode(mode);
    const maptilerApiKey = import.meta.env.VITE_MAPTILER_API_KEY;
    const nextStyle = getMapStyle(maptilerApiKey, mode);
    mapRef.current.setStyle(nextStyle);
  }, [basemapMode]);

  // Synchronize layer visibility whenever layersState or riskFilter changes
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    syncLayerVisibility(mapRef.current, layersState, riskFilter);
  }, [layersState, riskFilter, mapLoaded, syncLayerVisibility]);

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

  // Handle Location Selection with Hierarchy Zoom
  const handleSelectSearchResult = useCallback(async (res) => {
    setSearchQuery('');
    setSearchResults([]);

    const targetLat = res.latitude || (location.lat ?? 26.85);
    const targetLon = res.longitude || (location.lon ?? 80.95);

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
        zoom: 9.5,
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

  const toggleLayer = (layerKey) => {
    setLayersState(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  return (
    <div className="main-content">
      {/* HEADER BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.65rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🗺️</span>
            <span>{tr('hydromap_title')}</span>
            <span style={{ fontSize: '0.68rem', padding: '0.2rem 0.55rem', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', fontWeight: 700 }}>
              MapLibre GL Vector Engine
            </span>
          </h2>
          <p className="text-xs text-muted" style={{ margin: '0.2rem 0 0' }}>
            {lang === 'hi'
              ? 'वेक्टर एवं उपग्रह मानचित्र — स्वतंत्र बहु-स्तरीय जोखिम क्षेत्र व संपूर्ण प्रशासनिक पदानुक्रम'
              : 'Decoupled Vector & Satellite Basemaps with Polygon-Based Multi-Tier Risk Zones & Administrative Hierarchy'}
          </p>
        </div>

        {/* TOP BAR QUICK CONTROLS */}
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* BASEMAP MODE SELECTOR BUTTONS */}
          <div style={{
            display: 'flex',
            gap: '0.25rem',
            background: 'rgba(18, 14, 40, 0.9)',
            padding: '0.25rem',
            borderRadius: '12px',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
          }}>
            <button
              onClick={() => handleSwitchBasemap('normal')}
              title="Vector / Normal Map (OSM-style Light Geographic Appearance with Roads, Rivers & Towns)"
              style={{
                background: basemapMode === 'normal' ? 'linear-gradient(135deg, #0284c7, #0369a1)' : 'transparent',
                color: basemapMode === 'normal' ? '#ffffff' : '#94a3b8',
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
              <span>{lang === 'hi' ? 'सामान्य मानचित्र' : 'Normal Map'}</span>
            </button>
            <button
              onClick={() => handleSwitchBasemap('satellite')}
              title="High-Resolution Satellite Imagery"
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
              title="Hybrid View (Satellite Imagery with Vector Roads & Administrative Labels)"
              style={{
                background: basemapMode === 'hybrid' ? 'linear-gradient(135deg, #7c3aed, #a855f7)' : 'transparent',
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
              <span>🌐</span>
              <span>{lang === 'hi' ? 'हाइब्रिड' : 'Hybrid'}</span>
            </button>
          </div>

          {/* LAYER PANEL TOGGLE BUTTON */}
          <button
            onClick={() => setShowLayerPanel(!showLayerPanel)}
            title="Toggle GIS Layer Control Panel"
            style={{
              background: showLayerPanel ? 'rgba(56, 189, 248, 0.2)' : 'rgba(13, 9, 28, 0.85)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
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
            🥞 {lang === 'hi' ? 'परतें' : 'Layers'}
          </button>

          {/* Quick Action Navigation Buttons */}
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

      {/* SEARCH BAR & ENTITY LEVEL SELECTOR */}
      <div style={{ position: 'relative', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Entity Type Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(15, 23, 42, 0.75)', padding: '0.2rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { id: 'ALL', label_en: 'All Levels', label_hi: 'सभी स्तर' },
              { id: 'DISTRICT', label_en: 'Districts', label_hi: 'ज़िले' },
              { id: 'BLOCK', label_en: 'Blocks', label_hi: 'ब्लॉक' },
              { id: 'GRAM_PANCHAYAT', label_en: 'Panchayats', label_hi: 'पंचायतें' },
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

          <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
            <input
              className="input"
              style={{ width: '100%', paddingLeft: '2.4rem', fontSize: '0.86rem' }}
              placeholder={lang === 'hi' ? '🔍 भारत का कोई भी राज्य, जिला, ब्लॉक, ग्राम पंचायत या गांव खोजें...' : '🔍 Search Indian States, Districts, Blocks, Gram Panchayats (LGD), or Villages...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}>
              {isSearching ? '⏳' : '📍'}
            </span>
          </div>

          {/* RISK TIER FILTER SELECTOR */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(15, 23, 42, 0.75)', padding: '0.2rem 0.6rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>Risk Tier:</span>
            <select
              value={riskFilter}
              onChange={e => setRiskFilter(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: riskFilter === 'RED' ? '#f87171' :
                       riskFilter === 'ORANGE' ? '#fb923c' :
                       riskFilter === 'YELLOW' ? '#fde047' :
                       riskFilter === 'GREEN' ? '#4ade80' : '#e2e8f0',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="ALL" style={{ background: '#0f172a', color: '#e2e8f0' }}>All Zones (🔴 🟠 🟡 🟢 ⚪)</option>
              <option value="RED" style={{ background: '#0f172a', color: '#ef4444' }}>🔴 Very High Risk</option>
              <option value="ORANGE" style={{ background: '#0f172a', color: '#f97316' }}>🟠 High Risk</option>
              <option value="YELLOW" style={{ background: '#0f172a', color: '#eab308' }}>🟡 Moderate Risk</option>
              <option value="GREEN" style={{ background: '#0f172a', color: '#22c55e' }}>🟢 Low Risk</option>
              <option value="GREY" style={{ background: '#0f172a', color: '#94a3b8' }}>⚪ No / Insufficient Data</option>
            </select>
          </div>
        </div>

        {/* SEARCH RESULTS DROPDOWN */}
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
      <div style={{ position: 'relative', height: '600px', minHeight: '480px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}>
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

        {/* FLOATING GIS LAYER CONTROL PANEL */}
        {showLayerPanel && (
          <div className="map-layer-control-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <strong style={{ fontSize: '0.78rem', color: '#f1f5f9' }}>🥞 {lang === 'hi' ? 'परत नियंत्रण' : 'Layer Control'}</strong>
              <button
                onClick={() => setShowLayerPanel(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem' }}
              >✕</button>
            </div>

            {/* BASEMAP SECTION */}
            <div className="map-layer-section-title">
              <span>🗺️</span>
              <span>BASEMAP</span>
            </div>
            <div className="map-layer-item" onClick={() => handleSwitchBasemap('normal')}>
              <label>
                <input type="radio" name="basemap" checked={basemapMode === 'normal'} onChange={() => handleSwitchBasemap('normal')} />
                <span>Normal Map (OSM Light)</span>
              </label>
            </div>
            <div className="map-layer-item" onClick={() => handleSwitchBasemap('satellite')}>
              <label>
                <input type="radio" name="basemap" checked={basemapMode === 'satellite'} onChange={() => handleSwitchBasemap('satellite')} />
                <span>Satellite</span>
              </label>
            </div>
            <div className="map-layer-item" onClick={() => handleSwitchBasemap('hybrid')}>
              <label>
                <input type="radio" name="basemap" checked={basemapMode === 'hybrid'} onChange={() => handleSwitchBasemap('hybrid')} />
                <span>Hybrid</span>
              </label>
            </div>

            {/* ADMINISTRATIVE BOUNDARIES SECTION */}
            <div className="map-layer-section-title">
              <span>🏛️</span>
              <span>ADMINISTRATIVE BOUNDARIES</span>
            </div>
            <div className="map-layer-item" onClick={() => toggleLayer('states')}>
              <label>
                <input type="checkbox" checked={layersState.states} onChange={() => toggleLayer('states')} />
                <span>States & UTs</span>
              </label>
              <span style={{ fontSize: '0.62rem', color: '#38bdf8' }}>z0–z7.5</span>
            </div>
            <div className="map-layer-item" onClick={() => toggleLayer('districts')}>
              <label>
                <input type="checkbox" checked={layersState.districts} onChange={() => toggleLayer('districts')} />
                <span>Districts</span>
              </label>
              <span style={{ fontSize: '0.62rem', color: '#38bdf8' }}>z5.5–z11.5</span>
            </div>
            <div className="map-layer-item" onClick={() => toggleLayer('blocks')}>
              <label>
                <input type="checkbox" checked={layersState.blocks} onChange={() => toggleLayer('blocks')} />
                <span>Blocks / Tehsils</span>
              </label>
              <span style={{ fontSize: '0.62rem', color: '#38bdf8' }}>z8.5–z13.5</span>
            </div>
            <div className="map-layer-item" onClick={() => toggleLayer('panchayats')}>
              <label>
                <input type="checkbox" checked={layersState.panchayats} onChange={() => toggleLayer('panchayats')} />
                <span>Gram Panchayats</span>
              </label>
              <span style={{ fontSize: '0.62rem', color: '#38bdf8' }}>z11.5–z15.5</span>
            </div>
            <div className="map-layer-item" onClick={() => toggleLayer('villages')}>
              <label>
                <input type="checkbox" checked={layersState.villages} onChange={() => toggleLayer('villages')} />
                <span>Villages</span>
              </label>
              <span style={{ fontSize: '0.62rem', color: '#38bdf8' }}>z13+</span>
            </div>

            {/* RISK LAYER SECTION */}
            <div className="map-layer-section-title">
              <span>⚠️</span>
              <span>RISK ANALYSIS</span>
            </div>
            <div className="map-layer-item" onClick={() => toggleLayer('riskZones')}>
              <label>
                <input type="checkbox" checked={layersState.riskZones} onChange={() => toggleLayer('riskZones')} />
                <span>Risk Polygons</span>
              </label>
            </div>
            <div className="map-layer-item" onClick={() => toggleLayer('historicalEvents')}>
              <label>
                <input type="checkbox" checked={layersState.historicalEvents} onChange={() => toggleLayer('historicalEvents')} />
                <span>Historical Events</span>
              </label>
            </div>

            {/* WEATHER OVERLAYS SECTION */}
            <div className="map-layer-section-title">
              <span>🌧️</span>
              <span>WEATHER OVERLAYS</span>
            </div>
            <div className="map-layer-item" onClick={() => toggleLayer('weatherRain')}>
              <label>
                <input type="checkbox" checked={layersState.weatherRain} onChange={() => toggleLayer('weatherRain')} />
                <span>Rainfall Isohyets</span>
              </label>
            </div>
            <div className="map-layer-item" onClick={() => toggleLayer('weatherTemp')}>
              <label>
                <input type="checkbox" checked={layersState.weatherTemp} onChange={() => toggleLayer('weatherTemp')} />
                <span>Temperature Bands</span>
              </label>
            </div>
            <div className="map-layer-item" onClick={() => toggleLayer('weatherHumidity')}>
              <label>
                <input type="checkbox" checked={layersState.weatherHumidity} onChange={() => toggleLayer('weatherHumidity')} />
                <span>Humidity Isolines</span>
              </label>
            </div>
          </div>
        )}

        {/* MAP LEGEND PANEL */}
        <div className="map-legend-panel">
          <div style={{ fontWeight: 800, color: '#38bdf8', marginBottom: '0.35rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>GIS Hazard Legend</span>
            <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Zoom: {currentZoom}x</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.22rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span className="legend-color-dot" style={{ background: '#dc2626' }}></span>
              <span>🔴 Very High / Critical Risk</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span className="legend-color-dot" style={{ background: '#ea580c' }}></span>
              <span>🟠 High Risk</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span className="legend-color-dot" style={{ background: '#eab308' }}></span>
              <span>🟡 Moderate Risk</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span className="legend-color-dot" style={{ background: '#16a34a' }}></span>
              <span>🟢 Low Risk</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span className="legend-color-dot" style={{ background: '#64748b' }}></span>
              <span>⚪ No / Insufficient Data</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE HUD: RISK ZONE SELECTION MODAL */}
        {selectedFeature && selectedFeature.type === 'RISK_ZONE' && (
          <div style={{
            position: 'absolute', top: '1rem', left: '1rem', zIndex: 30,
            background: 'rgba(13, 9, 28, 0.96)', backdropFilter: 'blur(18px)',
            border: `1px solid ${selectedFeature.stroke_color || 'rgba(56, 189, 248, 0.4)'}`,
            borderRadius: '14px', padding: '0.95rem 1.2rem', maxWidth: '360px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.65)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span className="badge" style={{
                background: selectedFeature.risk_level === 'RED' ? 'rgba(220, 38, 38, 0.25)' :
                           selectedFeature.risk_level === 'ORANGE' ? 'rgba(234, 88, 12, 0.25)' :
                           selectedFeature.risk_level === 'YELLOW' ? 'rgba(234, 179, 8, 0.25)' :
                           selectedFeature.risk_level === 'GREEN' ? 'rgba(22, 163, 74, 0.25)' : 'rgba(100, 116, 139, 0.25)',
                color: selectedFeature.risk_level === 'RED' ? '#f87171' :
                       selectedFeature.risk_level === 'ORANGE' ? '#fb923c' :
                       selectedFeature.risk_level === 'YELLOW' ? '#fde047' :
                       selectedFeature.risk_level === 'GREEN' ? '#4ade80' : '#cbd5e1',
                fontSize: '0.68rem', fontWeight: 800
              }}>
                {selectedFeature.risk_label || `${selectedFeature.risk_level} RISK`}
              </span>
              <button
                onClick={() => setSelectedFeature(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.95rem' }}
              >✕</button>
            </div>

            <h4 style={{ margin: '0.15rem 0 0.25rem', fontSize: '1.05rem', color: '#f1f5f9', fontWeight: 800 }}>
              {lang === 'hi' ? (selectedFeature.name_hi || selectedFeature.name) : selectedFeature.name}
            </h4>
            <div style={{ fontSize: '0.72rem', color: '#38bdf8', marginBottom: '0.5rem' }}>
              🏛️ {selectedFeature.admin_level || 'Agro-Climatic Division'}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.45rem', fontSize: '0.74rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <div>📊 <strong>Risk Index:</strong> <span style={{ color: selectedFeature.stroke_color, fontWeight: 700 }}>{selectedFeature.risk_score} / 100</span></div>
              <div>🌧️ <strong>24h Precipitation:</strong> <span style={{ color: '#38bdf8' }}>{selectedFeature.rainfall_24h_mm}</span></div>
              <div>📅 <strong>7-Day Projected:</strong> {selectedFeature.rainfall_7d_forecast}</div>
              <div>🧠 <strong>AI Confidence:</strong> <span style={{ color: '#34d399' }}>{selectedFeature.prediction_confidence}</span></div>
              <div>🌊 <strong>Monsoon Phase:</strong> <span style={{ color: '#a78bfa' }}>{selectedFeature.monsoon_phase}</span></div>
              <div>💧 <strong>Soil Saturation:</strong> {selectedFeature.soil_moisture_saturation}</div>

              {/* Weather Summary & AI Advisory */}
              <div style={{ marginTop: '0.3rem', padding: '0.45rem 0.6rem', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', fontSize: '0.7rem' }}>
                <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '0.2rem' }}>🌾 Agricultural Advisory:</div>
                <div style={{ color: '#e2e8f0', lineHeight: 1.4 }}>
                  {lang === 'hi' ? (selectedFeature.ai_advisory_hi || selectedFeature.ai_advisory_en) : selectedFeature.ai_advisory_en}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INTERACTIVE HUD: ADMINISTRATIVE ENTITY SELECTION */}
        {selectedAdminEntity && (
          <div style={{
            position: 'absolute', top: '1rem', left: '1rem', zIndex: 30,
            background: 'rgba(13, 9, 28, 0.96)', backdropFilter: 'blur(18px)',
            border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '14px',
            padding: '0.95rem 1.2rem', maxWidth: '360px', boxShadow: '0 12px 32px rgba(0,0,0,0.65)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span className="badge" style={{
                background: selectedAdminEntity.entity_type === 'VILLAGE' ? 'rgba(16, 185, 129, 0.25)' :
                           selectedAdminEntity.entity_type === 'GRAM_PANCHAYAT' ? 'rgba(234, 179, 8, 0.25)' :
                           selectedAdminEntity.entity_type === 'BLOCK' ? 'rgba(168, 85, 247, 0.25)' : 'rgba(2, 132, 199, 0.25)',
                color: selectedAdminEntity.entity_type === 'VILLAGE' ? '#34d399' :
                       selectedAdminEntity.entity_type === 'GRAM_PANCHAYAT' ? '#fde047' :
                       selectedAdminEntity.entity_type === 'BLOCK' ? '#c084fc' : '#38bdf8',
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
              {selectedAdminEntity.panchayat ? ` ➔ ${selectedAdminEntity.panchayat}` : ''}
            </div>

            {/* Granular details */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.45rem', fontSize: '0.74rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {selectedAdminEntity.risk_score != null && (
                <div>⚠️ <strong>Risk Score:</strong> <span style={{ color: '#f59e0b', fontWeight: 700 }}>{selectedAdminEntity.risk_score} / 100</span></div>
              )}
              {selectedAdminEntity.rain_24h && (
                <div>🌧️ <strong>24h Rainfall:</strong> <span style={{ color: '#38bdf8' }}>{selectedAdminEntity.rain_24h}</span></div>
              )}
              {selectedAdminEntity.soil && (
                <div>🌾 <strong>Soil Profile:</strong> {selectedAdminEntity.soil}</div>
              )}
              {selectedAdminEntity.primary_crop && (
                <div>🌱 <strong>Dominant Crops:</strong> {selectedAdminEntity.primary_crop}</div>
              )}
              {selectedAdminEntity.population && (
                <div>👥 <strong>Population / Wards:</strong> {selectedAdminEntity.population} {selectedAdminEntity.wards ? `(${selectedAdminEntity.wards} Wards)` : ''}</div>
              )}
              {selectedAdminEntity.advisory && (
                <div style={{ marginTop: '0.3rem', padding: '0.35rem 0.5rem', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', fontSize: '0.68rem', color: '#7dd3fc' }}>
                  ℹ️ {selectedAdminEntity.advisory}
                </div>
              )}
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
              <span>📍 Live GPS Hub:</span>
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

      {/* AUTHORITATIVE GEODATA STATS FOOTER */}
      <div style={{ marginTop: '0.85rem', padding: '0.65rem 1rem', background: 'rgba(18, 14, 40, 0.65)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.72rem', color: '#94a3b8' }}>
        <div>
          🏛️ <strong>Survey of India & Ministry of Panchayati Raj (LGD) Hierarchy:</strong>
        </div>
        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <span>States & UTs: <strong style={{ color: '#38bdf8' }}>{mapStats.states_and_uts}</strong></span>
          <span>Districts: <strong style={{ color: '#38bdf8' }}>{mapStats.districts}</strong></span>
          <span>Sub-Districts & Blocks: <strong style={{ color: '#38bdf8' }}>{Number(mapStats.sub_districts_blocks).toLocaleString()}</strong></span>
          <span>Gram Panchayats: <strong style={{ color: '#38bdf8' }}>{Number(mapStats.gram_panchayats_lgd).toLocaleString()}</strong></span>
          <span>Villages: <strong style={{ color: '#38bdf8' }}>{Number(mapStats.villages).toLocaleString()}</strong></span>
        </div>
      </div>
    </div>
  );
}
