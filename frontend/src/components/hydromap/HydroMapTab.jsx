import React, { useEffect, useState, useRef, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import { getMapStyle, BASEMAP_IDS, BASEMAP_OPTIONS, DEFAULT_BASEMAP, isMapplsConfigured } from '../../config/mapConfig';
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

// Safe MapLibre module resolvers
const MapEngine = maplibregl.Map;
const MarkerEngine = maplibregl.Marker;
const NavControl = maplibregl.NavigationControl;
const FullscreenCtrl = maplibregl.FullscreenControl;
const ScaleCtrl = maplibregl.ScaleControl;

// Default India Geographic Center & Zoom
const INDIA_DEFAULT_CENTER = [78.9629, 22.5937]; // Longitude, Latitude
const INDIA_DEFAULT_ZOOM = 4.6;

// Basemap styles are defined in config/mapConfig.js
// getMapStyle, BASEMAP_IDS, BASEMAP_OPTIONS, DEFAULT_BASEMAP, isMapplsConfigured are imported above

export default function HydroMapTab() {
  const { tr, lang, location, setLocation } = useApp();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const gpsMarkerRef = useRef(null);
  const clickMarkerRef = useRef(null);
  const beaconMarkersRef = useRef([]);

  // Basemap Mode: 'mappls' (default) | 'osm' | 'satellite' | 'hybrid'
  const [basemapMode, setBasemapMode] = useState(DEFAULT_BASEMAP);

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
    weatherSoil: false,
  });

  // Layer Panel Open / Closed
  const [showLayerPanel, setShowLayerPanel] = useState(true);

  // Risk sub-filter: ALL | RED | BLUE | YELLOW | GREEN | GREY
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
    districts: 766,
    sub_districts_blocks: 6854,
    gram_panchayats_lgd: 255286,
    villages: 664369,
  });

  // Fetch admin catalog stats from live backend API
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

      if (!map.getLayer('vn-states-label')) {
        map.addLayer({
          id: 'vn-states-label',
          type: 'symbol',
          source: 'vn-states',
          maxzoom: 7.5,
          layout: {
            'text-field': ['get', 'name'],
            'text-size': 11,
            'text-transform': 'uppercase',
            'text-letter-spacing': 0.08,
            'text-optional': true,
          },
          paint: {
            'text-color': '#0369a1',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1.5,
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
              'HIGH', '#2563eb',
              'MODERATE', '#eab308',
              'LOW', '#4ade80',
              '#64748b'
            ],
            'fill-opacity': 0.15
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
      if (!map.getLayer('vn-districts-label')) {
        map.addLayer({
          id: 'vn-districts-label',
          type: 'symbol',
          source: 'vn-districts',
          minzoom: 5.5,
          maxzoom: 11.5,
          layout: {
            'text-field': ['get', 'name'],
            'text-size': 10,
            'text-optional': true,
          },
          paint: {
            'text-color': '#1e293b',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1.5,
          }
        });
      }

      // 4. SUB-DISTRICTS / BLOCKS (Zoom 8.5 to 13.5)
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
            'fill-opacity': 0.12
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
            'line-color': '#a855f7',
            'line-width': 1.2,
            'line-opacity': 0.75
          }
        });
      }

      // 5. GRAM PANCHAYATS (Zoom 11.5 to 15.5)
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
      if (!map.getLayer('vn-villages-label')) {
        map.addLayer({
          id: 'vn-villages-label',
          type: 'symbol',
          source: 'vn-villages',
          minzoom: 13.0,
          layout: {
            'text-field': ['get', 'name'],
            'text-size': 11,
            'text-offset': [0, 1.2],
            'text-anchor': 'top',
            'text-optional': true,
          },
          paint: {
            'text-color': '#065f46',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1.8,
          }
        });
      }

      // 7. MULTI-TIER RISK ZONES (Independent GeoJSON Polygons across ALL basemaps)
      // 🔴 RED | 🔵 BLUE | 🟡 YELLOW | 🟢 GREEN | ⚪ GREY
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
              'BLUE', '#2563eb',
              'YELLOW', '#eab308',
              'GREEN', '#4ade80',
              'GREY', '#64748b',
              '#0284c7'
            ],
            'fill-opacity': 0.40
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
              'BLUE', '#3b82f6',
              'YELLOW', '#fde047',
              'GREEN', '#86efac',
              'GREY', '#94a3b8',
              '#38bdf8'
            ],
            'line-width': 3.0,
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

      if (!map.getSource('vn-weather-soil')) {
        map.addSource('vn-weather-soil', {
          type: 'geojson',
          data: WEATHER_OVERLAYS_GEOJSON.soil_moisture
        });
      }
      if (!map.getLayer('vn-weather-soil-fill')) {
        map.addLayer({
          id: 'vn-weather-soil-fill',
          type: 'fill',
          source: 'vn-weather-soil',
          paint: {
            'fill-color': ['get', 'color'],
            'fill-opacity': 0.35
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
    setVisibility('vn-states-label', currentLayers.states);

    // Districts
    setVisibility('vn-districts-fill', currentLayers.districts);
    setVisibility('vn-districts-border', currentLayers.districts);
    setVisibility('vn-districts-label', currentLayers.districts);

    // Blocks
    setVisibility('vn-blocks-fill', currentLayers.blocks);
    setVisibility('vn-blocks-border', currentLayers.blocks);

    // Panchayats
    setVisibility('vn-panchayats-fill', currentLayers.panchayats);
    setVisibility('vn-panchayats-border', currentLayers.panchayats);

    // Villages
    setVisibility('vn-villages-circle', currentLayers.villages);
    setVisibility('vn-villages-label', currentLayers.villages);

    // Risk Zones
    setVisibility('vn-risk-zones-fill', currentLayers.riskZones);
    setVisibility('vn-risk-zones-border', currentLayers.riskZones);

    // Risk Filter (ALL / RED / BLUE / YELLOW / GREEN / GREY)
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
    setVisibility('vn-weather-soil-fill', currentLayers.weatherSoil);
  }, []);

  // Initialize MapLibre GL Map Engine
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialStyle = getMapStyle(DEFAULT_BASEMAP);

    if (!MapEngine) {
      console.error('MapEngine is not available');
      return;
    }

    const map = new MapEngine({
      container: mapContainerRef.current,
      style: initialStyle,
      center: [INDIA_DEFAULT_CENTER[0], INDIA_DEFAULT_CENTER[1]],
      zoom: INDIA_DEFAULT_ZOOM,
      minZoom: 3.0,
      maxZoom: 18,
    });

    // Navigation and Scale Controls
    if (NavControl) map.addControl(new NavControl({ visualizePitch: true }), 'top-left');
    if (FullscreenCtrl) map.addControl(new FullscreenCtrl(), 'top-left');
    if (ScaleCtrl) map.addControl(new ScaleCtrl({ maxWidth: 120, unit: 'metric' }), 'bottom-left');

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

      // Click on Risk Zones (🔴 🔵 🟡 🟢 ⚪)
      map.on('click', 'vn-risk-zones-fill', (e) => {
        if (e.features && e.features.length > 0) {
          const props = e.features[0].properties;
          setSelectedFeature({
            ...props,
            type: 'RISK_ZONE'
          });
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
            display_name: `${props.name}, ${props.district}`
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

  // Seamless Basemap Switcher (Mappls ↔ OSM ↔ Satellite ↔ Hybrid)
  const handleSwitchBasemap = useCallback((mode) => {
    if (mode === basemapMode || !mapRef.current) return;
    setBasemapMode(mode);
    const nextStyle = getMapStyle(mode);
    mapRef.current.setStyle(nextStyle);
  }, [basemapMode]);

  // Synchronize layer visibility whenever layersState or riskFilter changes
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    syncLayerVisibility(mapRef.current, layersState, riskFilter);
  }, [layersState, riskFilter, mapLoaded, syncLayerVisibility]);

  // Update GPS Pulsing Marker when location updates
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !MarkerEngine) return;
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

      gpsMarkerRef.current = new MarkerEngine({ element: el })
        .setLngLat([lng, lat])
        .addTo(map);
    } else {
      gpsMarkerRef.current.setLngLat([lng, lat]);
    }
  }, [location.lat, location.lon, mapLoaded]);

  // Update Click Marker when clickedCoord updates
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !clickedCoord || !MarkerEngine) return;
    const map = mapRef.current;

    if (!clickMarkerRef.current) {
      const el = document.createElement('div');
      el.className = 'map-clicked-pin';
      el.style.fontSize = '26px';
      el.style.cursor = 'pointer';
      el.innerHTML = '📍';

      clickMarkerRef.current = new MarkerEngine({ element: el })
        .setLngLat([clickedCoord.lon, clickedCoord.lat])
        .addTo(map);
    } else {
      clickMarkerRef.current.setLngLat([clickedCoord.lon, clickedCoord.lat]);
    }
  }, [clickedCoord, mapLoaded]);

  // Animated Hazard Beacon Blinkers for all Multi-Tier Risk Zones (🔴 🔵 🟡 🟢 ⚪)
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !MarkerEngine) return;
    const map = mapRef.current;

    // Clear old beacon markers
    if (beaconMarkersRef.current) {
      beaconMarkersRef.current.forEach(m => m.remove());
      beaconMarkersRef.current = [];
    }

    if (!layersState.riskZones) return;

    // Calculate Polygon Centroid
    const getCentroid = (coords) => {
      let ring = coords;
      if (Array.isArray(coords[0]) && Array.isArray(coords[0][0])) {
        ring = coords[0];
      }
      let sumLon = 0, sumLat = 0, count = 0;
      for (let pt of ring) {
        if (Array.isArray(pt) && typeof pt[0] === 'number') {
          sumLon += pt[0];
          sumLat += pt[1];
          count++;
        }
      }
      return count > 0 ? [sumLon / count, sumLat / count] : [78.96, 22.59];
    };

    VARSHANETRA_RISK_ZONES_GEOJSON.features.forEach(feat => {
      const props = feat.properties;
      if (riskFilter !== 'ALL' && props.risk_level !== riskFilter) return;

      const centroid = getCentroid(feat.geometry.coordinates);
      const color = props.risk_level === 'RED' ? '#dc2626' :
                    props.risk_level === 'BLUE' ? '#2563eb' :
                    props.risk_level === 'YELLOW' ? '#eab308' :
                    props.risk_level === 'GREEN' ? '#4ade80' : '#64748b';
      const dotEmoji = props.risk_level === 'RED' ? '🔴' :
                       props.risk_level === 'BLUE' ? '🔵' :
                       props.risk_level === 'YELLOW' ? '🟡' :
                       props.risk_level === 'GREEN' ? '🟢' : '⚪';

      const el = document.createElement('div');
      el.className = 'risk-beacon-marker';
      el.title = `${props.name} (${props.risk_label || props.risk_level})`;
      el.innerHTML = `
        <div class="risk-beacon-pulse" style="background: ${color}33; border: 1.5px solid ${color}99;"></div>
        <div class="risk-beacon-dot" style="background: ${color}; color: ${color};"></div>
        <div class="risk-beacon-badge" style="border-color: ${color}; color: #ffffff;">${dotEmoji} ${props.name.split(' ')[0]}</div>
      `;

      el.onclick = (e) => {
        e.stopPropagation();
        setSelectedFeature({
          ...props,
          type: 'RISK_ZONE'
        });
        setSelectedAdminEntity(null);
        setClickedCoord({ lat: centroid[1], lon: centroid[0] });
      };

      const marker = new MarkerEngine({ element: el })
        .setLngLat(centroid)
        .addTo(map);

      beaconMarkersRef.current.push(marker);
    });
  }, [mapLoaded, layersState.riskZones, riskFilter]);

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
            {BASEMAP_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSwitchBasemap(opt.id)}
                title={opt.title}
                style={{
                  background: basemapMode === opt.id ? opt.gradient : 'transparent',
                  color: basemapMode === opt.id ? '#ffffff' : '#94a3b8',
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
                <span>{opt.icon}</span>
                <span>{lang === 'hi' ? opt.label_hi : opt.label_en}</span>
              </button>
            ))}
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
                       riskFilter === 'BLUE' ? '#60a5fa' :
                       riskFilter === 'YELLOW' ? '#fde047' :
                       riskFilter === 'GREEN' ? '#4ade80' : '#e2e8f0',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="ALL" style={{ background: '#0f172a', color: '#e2e8f0' }}>All Zones (🔴 🔵 🟡 🟢 ⚪)</option>
              <option value="RED" style={{ background: '#0f172a', color: '#ef4444' }}>🔴 Very High Risk</option>
              <option value="BLUE" style={{ background: '#0f172a', color: '#3b82f6' }}>🔵 High Risk / Alert</option>
              <option value="YELLOW" style={{ background: '#0f172a', color: '#eab308' }}>🟡 Moderate Risk</option>
              <option value="GREEN" style={{ background: '#0f172a', color: '#22c55e' }}>🟢 Low Risk</option>
              <option value="GREY" style={{ background: '#0f172a', color: '#94a3b8' }}>⚪ No / Insufficient Data</option>
            </select>
          </div>
        </div>

        {/* SEARCH DROPDOWN RESULTS */}
        {searchResults.length > 0 && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 40,
            marginTop: '0.35rem', background: '#0d0a1e', border: '1px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '12px', maxHeight: '280px', overflowY: 'auto', boxShadow: '0 12px 36px rgba(0,0,0,0.7)'
          }}>
            {searchResults.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => handleSelectSearchResult(item)}
                style={{
                  padding: '0.65rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(56, 189, 248, 0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div>
                  <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.85rem' }}>
                    {item.name} {item.name_hi ? `(${item.name_hi})` : ''}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    {item.entity_type === 'VILLAGE' && item.panchayat ? `${item.panchayat} (GP) • ` : ''}
                    {item.block ? `${item.block} (Block) • ` : ''}
                    {item.district ? `${item.district} • ` : ''}
                    {item.state}
                  </div>
                </div>
                <span className="badge" style={{
                  background: item.entity_type === 'VILLAGE' ? 'rgba(16, 185, 129, 0.2)' :
                             item.entity_type === 'GRAM_PANCHAYAT' ? 'rgba(234, 179, 8, 0.2)' :
                             item.entity_type === 'BLOCK' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(2, 132, 199, 0.2)',
                  color: item.entity_type === 'VILLAGE' ? '#34d399' :
                         item.entity_type === 'GRAM_PANCHAYAT' ? '#fde047' :
                         item.entity_type === 'BLOCK' ? '#c084fc' : '#38bdf8',
                  fontSize: '0.65rem'
                }}>
                  {item.entity_type} {item.lgd_code ? `(#${item.lgd_code})` : ''}
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
            {BASEMAP_OPTIONS.map(opt => (
              <div key={opt.id} className="map-layer-item" onClick={() => handleSwitchBasemap(opt.id)}>
                <label>
                  <input type="radio" name="basemap" checked={basemapMode === opt.id} onChange={() => handleSwitchBasemap(opt.id)} />
                  <span>{opt.icon} {lang === 'hi' ? opt.label_hi : opt.label_en}</span>
                </label>
              </div>
            ))}

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
                <span>Risk Polygons & Beacons</span>
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
            <div className="map-layer-item" onClick={() => toggleLayer('weatherSoil')}>
              <label>
                <input type="checkbox" checked={layersState.weatherSoil} onChange={() => toggleLayer('weatherSoil')} />
                <span>Soil Moisture</span>
              </label>
            </div>
          </div>
        )}

        {/* PROFESSIONAL RISK LEGEND PANEL */}
        <div className="map-legend-panel">
          <div style={{ fontWeight: 800, color: '#38bdf8', marginBottom: '0.45rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>⚠️ {lang === 'hi' ? 'जोखिम संकेतक' : 'Risk Legend'}</span>
            <span style={{ fontSize: '0.62rem', color: '#94a3b8', fontWeight: 500 }}>z{currentZoom}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {[
              { color: '#dc2626', border: '#ef4444', emoji: '🔴', label: lang === 'hi' ? 'अति-उच्च जोखिम' : 'Very High Risk', level: 'RED' },
              { color: '#2563eb', border: '#3b82f6', emoji: '🔵', label: lang === 'hi' ? 'उच्च जोखिम / अलर्ट' : 'High Risk / Alert', level: 'BLUE' },
              { color: '#eab308', border: '#fde047', emoji: '🟡', label: lang === 'hi' ? 'मध्यम जोखिम' : 'Moderate Risk', level: 'YELLOW' },
              { color: '#4ade80', border: '#86efac', emoji: '🟢', label: lang === 'hi' ? 'कम जोखिम' : 'Low Risk', level: 'GREEN' },
              { color: '#64748b', border: '#94a3b8', emoji: '⚪', label: lang === 'hi' ? 'डेटा अनुपलब्ध' : 'No Data', level: 'GREY' },
            ].map(item => (
              <div
                key={item.level}
                onClick={() => setRiskFilter(riskFilter === item.level ? 'ALL' : item.level)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.45rem',
                  padding: '0.2rem 0.35rem', borderRadius: '6px', cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: riskFilter === item.level ? `${item.color}22` : 'transparent',
                  border: riskFilter === item.level ? `1px solid ${item.border}55` : '1px solid transparent',
                }}
              >
                <span className="legend-color-dot" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}66` }}></span>
                <span style={{ fontSize: '0.72rem', fontWeight: riskFilter === item.level ? 700 : 500, color: riskFilter === item.level ? item.border : '#cbd5e1' }}>
                  {item.emoji} {item.label}
                </span>
              </div>
            ))}
            {riskFilter !== 'ALL' && (
              <button
                onClick={() => setRiskFilter('ALL')}
                style={{
                  marginTop: '0.15rem', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)',
                  color: '#38bdf8', borderRadius: '6px', padding: '0.2rem 0.4rem', fontSize: '0.65rem',
                  fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {lang === 'hi' ? '✕ सभी दिखाएं' : '✕ Show All'}
              </button>
            )}
          </div>
        </div>

        {/* INTERACTIVE HUD: HISTORICAL EXTREME EVENT SELECTION MODAL */}
        {selectedFeature && selectedFeature.type === 'HISTORICAL_EVENT' && (
          <div style={{
            position: 'absolute', top: '1rem', left: '1rem', zIndex: 30,
            background: 'rgba(13, 9, 28, 0.96)', backdropFilter: 'blur(18px)',
            border: '1px solid rgba(244, 63, 94, 0.5)',
            borderRadius: '14px', padding: '0.95rem 1.2rem', maxWidth: '360px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.65)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span className="badge" style={{
                background: 'rgba(244, 63, 94, 0.25)', color: '#fb7185',
                fontSize: '0.68rem', fontWeight: 800
              }}>
                ⚡ HISTORICAL EVENT • {selectedFeature.year || 'PAST DISASTER'}
              </span>
              <button
                onClick={() => setSelectedFeature(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.95rem' }}
              >✕</button>
            </div>

            <h4 style={{ margin: '0.15rem 0 0.25rem', fontSize: '1.05rem', color: '#f1f5f9', fontWeight: 800 }}>
              {lang === 'hi' ? (selectedFeature.name_hi || selectedFeature.name) : selectedFeature.name}
            </h4>
            <div style={{ fontSize: '0.72rem', color: '#fb7185', marginBottom: '0.5rem' }}>
              🌊 Extreme Meteorological Phenomenon
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.45rem', fontSize: '0.74rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {selectedFeature.recorded_rain && (
                <div>🌧️ <strong>Peak Recorded Rain:</strong> <span style={{ color: '#38bdf8', fontWeight: 700 }}>{selectedFeature.recorded_rain}</span></div>
              )}
              {selectedFeature.impact && (
                <div>💥 <strong>Physical Impact:</strong> <span style={{ color: '#e2e8f0' }}>{selectedFeature.impact}</span></div>
              )}
              {selectedFeature.severity && (
                <div>⚠️ <strong>Severity Level:</strong> <span style={{ color: '#f43f5e', fontWeight: 700 }}>{selectedFeature.severity}</span></div>
              )}
            </div>
          </div>
        )}

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
                           selectedFeature.risk_level === 'BLUE' ? 'rgba(37, 99, 235, 0.25)' :
                           selectedFeature.risk_level === 'YELLOW' ? 'rgba(234, 179, 8, 0.25)' :
                           selectedFeature.risk_level === 'GREEN' ? 'rgba(74, 222, 128, 0.25)' : 'rgba(100, 116, 139, 0.25)',
                color: selectedFeature.risk_level === 'RED' ? '#f87171' :
                       selectedFeature.risk_level === 'BLUE' ? '#60a5fa' :
                       selectedFeature.risk_level === 'YELLOW' ? '#fde047' :
                       selectedFeature.risk_level === 'GREEN' ? '#86efac' : '#cbd5e1',
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

        {/* INTERACTIVE HUD: AUTHORITATIVE ADMINISTRATIVE ENTITY SELECTION */}
        {selectedAdminEntity && (
          <div style={{
            position: 'absolute', top: '1rem', left: '1rem', zIndex: 30,
            background: 'rgba(13, 9, 28, 0.96)', backdropFilter: 'blur(18px)',
            border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '14px',
            padding: '0.95rem 1.2rem', maxWidth: '380px', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 12px 32px rgba(0,0,0,0.65)'
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
                🏛️ {selectedAdminEntity.entity_type} {selectedAdminEntity.village_code || selectedAdminEntity.gram_panchayat_code || selectedAdminEntity.district_code || selectedAdminEntity.lgd_code ? `• LGD #${selectedAdminEntity.village_code || selectedAdminEntity.gram_panchayat_code || selectedAdminEntity.district_code || selectedAdminEntity.lgd_code}` : ''}
              </span>
              <button
                onClick={() => setSelectedAdminEntity(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.95rem' }}
              >✕</button>
            </div>

            <h4 style={{ margin: '0.15rem 0 0.25rem', fontSize: '1.05rem', color: '#f1f5f9', fontWeight: 800 }}>
              {lang === 'hi' ? (selectedAdminEntity.name_hi || selectedAdminEntity.name) : selectedAdminEntity.name}
            </h4>

            {/* Official Hierarchy Table / Paths */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '0.45rem 0.6rem', marginBottom: '0.45rem', fontSize: '0.71rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              {selectedAdminEntity.entity_type === 'VILLAGE' && (
                <>
                  <div>🏡 <strong>Village:</strong> {selectedAdminEntity.village || selectedAdminEntity.name} {selectedAdminEntity.village_code ? `(LGD: ${selectedAdminEntity.village_code})` : ''}</div>
                  <div>📜 <strong>Gram Panchayat:</strong> {selectedAdminEntity.gram_panchayat || selectedAdminEntity.panchayat || selectedAdminEntity.associated_panchayat || 'N/A'} {selectedAdminEntity.gram_panchayat_code || selectedAdminEntity.panchayat_lgd_code || selectedAdminEntity.associated_panchayat_lgd_code ? `(LGD: ${selectedAdminEntity.gram_panchayat_code || selectedAdminEntity.panchayat_lgd_code || selectedAdminEntity.associated_panchayat_lgd_code})` : ''}</div>
                  <div>🏢 <strong>Block / Tehsil:</strong> {selectedAdminEntity.block || selectedAdminEntity.sub_district || 'N/A'} {selectedAdminEntity.block_code && selectedAdminEntity.block_code !== 'N/A' ? `(LGD: ${selectedAdminEntity.block_code})` : ''}</div>
                  <div>📍 <strong>District:</strong> {selectedAdminEntity.district || 'N/A'} {selectedAdminEntity.district_code && selectedAdminEntity.district_code !== 'N/A' ? `(LGD: ${selectedAdminEntity.district_code})` : ''}</div>
                  <div>🏛️ <strong>State / UT:</strong> {selectedAdminEntity.state || 'N/A'} {selectedAdminEntity.state_code && selectedAdminEntity.state_code !== 'N/A' ? `(LGD: ${selectedAdminEntity.state_code})` : ''}</div>
                </>
              )}

              {selectedAdminEntity.entity_type === 'GRAM_PANCHAYAT' && (
                <>
                  <div>📜 <strong>Gram Panchayat:</strong> {selectedAdminEntity.gram_panchayat || selectedAdminEntity.name} {selectedAdminEntity.gram_panchayat_code || selectedAdminEntity.lgd_code ? `(LGD: ${selectedAdminEntity.gram_panchayat_code || selectedAdminEntity.lgd_code})` : ''}</div>
                  <div>🏢 <strong>Block:</strong> {selectedAdminEntity.block || 'N/A'} {selectedAdminEntity.block_code && selectedAdminEntity.block_code !== 'N/A' ? `(LGD: ${selectedAdminEntity.block_code})` : ''}</div>
                  <div>📍 <strong>District:</strong> {selectedAdminEntity.district || 'N/A'} {selectedAdminEntity.district_code && selectedAdminEntity.district_code !== 'N/A' ? `(LGD: ${selectedAdminEntity.district_code})` : ''}</div>
                  <div>🏛️ <strong>State:</strong> {selectedAdminEntity.state || 'N/A'} {selectedAdminEntity.state_code && selectedAdminEntity.state_code !== 'N/A' ? `(LGD: ${selectedAdminEntity.state_code})` : ''}</div>
                  {selectedAdminEntity.associated_villages && selectedAdminEntity.associated_villages.length > 0 && (
                    <div style={{ marginTop: '0.2rem', paddingTop: '0.2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <strong>Associated Villages ({selectedAdminEntity.associated_villages.length}):</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem', marginTop: '0.2rem' }}>
                        {selectedAdminEntity.associated_villages.slice(0, 6).map((v, i) => (
                          <span key={i} style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '0.1rem 0.35rem', borderRadius: '4px', fontSize: '0.66rem', color: '#7dd3fc' }}>
                            {v.name || v.village} {v.lgd_code || v.village_code ? `(#${v.lgd_code || v.village_code})` : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {selectedAdminEntity.entity_type === 'DISTRICT' && (
                <>
                  <div>📍 <strong>District:</strong> {selectedAdminEntity.district || selectedAdminEntity.name} {selectedAdminEntity.district_code || selectedAdminEntity.lgd_code ? `(LGD: ${selectedAdminEntity.district_code || selectedAdminEntity.lgd_code})` : ''}</div>
                  <div>🏛️ <strong>State:</strong> {selectedAdminEntity.state || 'N/A'} {selectedAdminEntity.state_code && selectedAdminEntity.state_code !== 'N/A' ? `(LGD: ${selectedAdminEntity.state_code})` : ''}</div>
                  {selectedAdminEntity.headquarters && <div>🏢 <strong>Headquarters:</strong> {selectedAdminEntity.headquarters}</div>}
                  <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.2rem' }}>
                    <span>Panchayats: <strong style={{ color: '#38bdf8' }}>{selectedAdminEntity.gram_panchayats_count ?? 300}</strong></span>
                    <span>Villages: <strong style={{ color: '#34d399' }}>{selectedAdminEntity.villages_count ?? 850}</strong></span>
                  </div>
                </>
              )}

              {selectedAdminEntity.entity_type === 'BLOCK' && (
                <>
                  <div>🏢 <strong>Block:</strong> {selectedAdminEntity.block || selectedAdminEntity.name} {selectedAdminEntity.block_code || selectedAdminEntity.lgd_code ? `(LGD: ${selectedAdminEntity.block_code || selectedAdminEntity.lgd_code})` : ''}</div>
                  <div>📍 <strong>District:</strong> {selectedAdminEntity.district || 'N/A'} {selectedAdminEntity.district_code && selectedAdminEntity.district_code !== 'N/A' ? `(LGD: ${selectedAdminEntity.district_code})` : ''}</div>
                  <div>🏛️ <strong>State:</strong> {selectedAdminEntity.state || 'N/A'} {selectedAdminEntity.state_code && selectedAdminEntity.state_code !== 'N/A' ? `(LGD: ${selectedAdminEntity.state_code})` : ''}</div>
                </>
              )}

              {selectedAdminEntity.entity_type === 'STATE' && (
                <>
                  <div>🏛️ <strong>State / UT:</strong> {selectedAdminEntity.state || selectedAdminEntity.name} (LGD: {selectedAdminEntity.state_code || selectedAdminEntity.lgd_code})</div>
                  <div>Category: {selectedAdminEntity.category || 'STATE'} • Census Code: {selectedAdminEntity.census_code || 'N/A'}</div>
                </>
              )}
            </div>

            {/* Granular VarshaNetra Weather & Risk Intelligence */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.45rem', fontSize: '0.74rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {selectedAdminEntity.risk_score != null && (
                <div>⚠️ <strong>Risk Score:</strong> <span style={{ color: '#f59e0b', fontWeight: 700 }}>{selectedAdminEntity.risk_score} / 100</span></div>
              )}
              {selectedAdminEntity.rain_24h && (
                <div>🌧️ <strong>24h Rainfall:</strong> <span style={{ color: '#38bdf8' }}>{selectedAdminEntity.rain_24h}</span></div>
              )}
              {selectedAdminEntity.soil_type || selectedAdminEntity.soil && (
                <div>🌾 <strong>Soil Profile:</strong> {selectedAdminEntity.soil_type || selectedAdminEntity.soil}</div>
              )}
              {selectedAdminEntity.irrigation_status && (
                <div>💧 <strong>Irrigation:</strong> {selectedAdminEntity.irrigation_status}</div>
              )}
              {selectedAdminEntity.primary_crop && (
                <div>🌱 <strong>Dominant Crops:</strong> {selectedAdminEntity.primary_crop}</div>
              )}
              {selectedAdminEntity.advisory && (
                <div style={{ marginTop: '0.2rem', padding: '0.35rem 0.5rem', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', fontSize: '0.68rem', color: '#7dd3fc' }}>
                  ℹ️ {selectedAdminEntity.advisory}
                </div>
              )}
              {selectedAdminEntity.geometry_status && (
                <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontStyle: 'italic', marginTop: '0.2rem' }}>
                  ℹ️ {selectedAdminEntity.geometry_status}
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
