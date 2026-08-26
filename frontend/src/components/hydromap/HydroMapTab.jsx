import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, Tooltip, useMap, useMapEvents, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

const { BaseLayer } = LayersControl;

// Custom GPS pulsing icon
const createGpsIcon = () => {
  return L.divIcon({
    className: 'custom-gps-leaflet-icon',
    html: `
      <div class="current-gps-marker">
        <div class="gps-pulse-ring"></div>
        <div class="gps-center-dot"></div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -16],
  });
};

// Custom clicked map pin icon
const createClickPinIcon = () => {
  return L.divIcon({
    className: 'custom-click-pin-leaflet-icon',
    html: `
      <div class="map-clicked-pin" style="font-size: 26px; line-height: 1; text-align: center;">
        📍
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
    popupAnchor: [0, -26],
  });
};

// Map click listener and controller
function MapClickHandler({ onClickCoord }) {
  useMapEvents({
    click(e) {
      if (onClickCoord) {
        onClickCoord({ lat: e.latlng.lat, lon: e.latlng.lng });
      }
    },
  });
  return null;
}

// Map Bounds & View Controller
function MapViewController({ center, zoom, fitIndia }) {
  const map = useMap();

  useEffect(() => {
    if (fitIndia) {
      // Fit full India administrative geography including J&K, Ladakh, Northeast, and Islands
      const indiaBounds = [
        [6.5, 68.0],   // Southwest (Kanyakumari / Lakshadweep longitude)
        [37.2, 97.4]   // Northeast (Ladakh / Arunachal Pradesh)
      ];
      map.fitBounds(indiaBounds, { padding: [20, 20] });
    } else if (center) {
      map.flyTo(center, zoom || 6, { duration: 1.2 });
    }
  }, [center, zoom, fitIndia, map]);

  return null;
}

export default function HydroMapTab() {
  const { tr, lang, location } = useApp();
  const [geojson, setGeojson] = useState(null);
  const [risk, setRisk] = useState(null);
  const [riskFilter, setRiskFilter] = useState('ALL'); // ALL | HIGH | MODERATE | LOW
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [clickedCoord, setClickedCoord] = useState(null);
  const [copiedGps, setCopiedGps] = useState(false);
  const [copiedClick, setCopiedClick] = useState(false);
  const [accuracy] = useState(12); // Estimated browser GPS accuracy in meters

  const gpsCenter = useMemo(() => [location.lat || 26.85, location.lon || 80.95], [location.lat, location.lon]);

  useEffect(() => {
    const loc = { lat: location.lat, lon: location.lon };
    api.getRiskGeoJSON(loc).then(r => setGeojson(r.data)).catch(() => {});
    api.getRiskSummary(loc).then(r => setRisk(r.data)).catch(() => {});
  }, [location.lat, location.lon]);

  // Filter features based on risk level
  const filteredGeoJSON = useMemo(() => {
    if (!geojson?.features) return null;
    if (riskFilter === 'ALL') return geojson;
    return {
      type: 'FeatureCollection',
      features: geojson.features.filter(f => f.properties?.risk_level === riskFilter)
    };
  }, [geojson, riskFilter]);

  const copyToClipboard = useCallback((text, type) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        if (type === 'gps') {
          setCopiedGps(true);
          setTimeout(() => setCopiedGps(false), 2500);
        } else {
          setCopiedClick(true);
          setTimeout(() => setCopiedClick(false), 2500);
        }
      }).catch(() => {});
    }
  }, []);

  const gpsIcon = useMemo(() => createGpsIcon(), []);
  const clickPinIcon = useMemo(() => createClickPinIcon(), []);

  return (
    <div className="main-content">
      {/* Header */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.6rem' }}>
        <div>
          <h2 style={{ background: 'linear-gradient(135deg, #0284c7, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800, margin: 0 }}>
            🗺️ {tr('tab_hydromap')}
          </h2>
          <p className="text-muted text-sm" style={{ marginTop: '0.2rem' }}>
            {lang === 'hi'
              ? 'प्रामाणिक भारतीय भू-स्थानिक जोखिम मानचित्र • उच्च, मध्यम व निम्न जोखिम क्षेत्र तथा वास्तविक GPS ट्रैकिंग'
              : 'National & Regional Hydro-Hazard GIS Explorer • Live High, Moderate & Low Risk Zones & GPS Geolocation'}
          </p>
        </div>
      </div>

      {/* Control Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {[
            { id: 'ALL', label: lang === 'hi' ? 'सभी क्षेत्र (All Zones)' : 'All Risk Zones', color: 'var(--text-secondary)' },
            { id: 'HIGH', label: lang === 'hi' ? '🔴 उच्च जोखिम (High Risk)' : '🔴 High Risk Zones', color: '#ef4444' },
            { id: 'MODERATE', label: lang === 'hi' ? '🟡 मध्यम जोखिम (Moderate)' : '🟡 Moderate Risk', color: '#fbbf24' },
            { id: 'LOW', label: lang === 'hi' ? '🟢 निम्न जोखिम (Low Risk)' : '🟢 Low Risk', color: '#34d399' },
          ].map(lvl => (
            <button
              key={lvl.id}
              className={`channel-tab ${riskFilter === lvl.id ? 'active' : ''}`}
              onClick={() => setRiskFilter(lvl.id)}
              style={{
                borderColor: riskFilter === lvl.id ? lvl.color : 'var(--border-subtle)',
                color: riskFilter === lvl.id ? '#fff' : lvl.color,
                padding: '0.35rem 0.75rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        {/* Map Telemetry Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.74rem' }}>
          <span className="badge badge-info" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4', display: 'inline-block' }} />
            {lang === 'hi' ? 'GPS स्थिति सक्रिय' : 'GPS Marker Active'}
          </span>
          <span className="text-xs text-muted">
            {lang === 'hi' ? 'मानचित्र पर कहीं भी क्लिक कर निर्देशांक देखें' : 'Click anywhere on map to inspect coordinates'}
          </span>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="grid-2" style={{ gap: '1rem' }}>
        <div className="card" style={{ gridColumn: 'span 2', padding: '0.5rem', background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
          
          {/* Clicked Coordinates Floating HUD */}
          {clickedCoord && (
            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '3.5rem',
              zIndex: 1000,
              background: 'rgba(13, 9, 28, 0.92)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '12px',
              padding: '0.65rem 0.9rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              fontSize: '0.78rem',
            }}>
              <div>
                <strong style={{ color: '#38bdf8', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                  📍 {lang === 'hi' ? 'क्लिक किया गया निर्देशांक' : 'Clicked Map Coordinates'}
                </strong>
                <div style={{ color: '#f1f5f9', fontWeight: 700, marginTop: '2px', fontFamily: 'monospace' }}>
                  Lat: {clickedCoord.lat.toFixed(6)}, Lon: {clickedCoord.lon.toFixed(6)}
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(`${clickedCoord.lat.toFixed(6)}, ${clickedCoord.lon.toFixed(6)}`, 'click')}
                style={{
                  background: copiedClick ? 'rgba(5, 150, 105, 0.25)' : 'rgba(255,255,255,0.08)',
                  border: copiedClick ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.15)',
                  color: copiedClick ? '#34d399' : '#cbd5e1',
                  padding: '0.25rem 0.55rem',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {copiedClick ? (lang === 'hi' ? 'कॉपी हो गया ✓' : 'Copied ✓') : (lang === 'hi' ? 'कॉपी' : 'Copy')}
              </button>
              <button
                type="button"
                onClick={() => setClickedCoord(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1rem', cursor: 'pointer', padding: '0 0.2rem' }}
                title="Dismiss"
              >✕</button>
            </div>
          )}

          <MapContainer
            center={gpsCenter}
            zoom={6}
            style={{ height: '540px', width: '100%', borderRadius: '12px' }}
            zoomControl={true}
          >
            <LayersControl position="topright">
              <BaseLayer checked name="Light Street Map (Standard OpenStreetMap)">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </BaseLayer>
              <BaseLayer name="CartoDB Voyager (Crisp Light)">
                <TileLayer
                  attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
              </BaseLayer>
              <BaseLayer name="Topographic Relief">
                <TileLayer
                  attribution='&copy; OpenTopoMap'
                  url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                />
              </BaseLayer>
            </LayersControl>

            <MapViewController center={gpsCenter} zoom={6} />
            <MapClickHandler onClickCoord={(c) => setClickedCoord(c)} />

            {/* PART 13 & 14: CURRENT LOCATION GPS MARKER WITH PULSING RING */}
            <Marker position={gpsCenter} icon={gpsIcon}>
              <Tooltip direction="top" offset={[0, -14]} opacity={0.95}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', lineHeight: 1.3 }}>
                  <strong>📍 {lang === 'hi' ? 'आपकी वर्तमान स्थिति' : 'Current GPS Location'}</strong>
                  <div>Lat: {location.lat.toFixed(6)}</div>
                  <div>Lon: {location.lon.toFixed(6)}</div>
                </div>
              </Tooltip>
              <Popup>
                <div style={{ fontFamily: 'Inter, sans-serif', minWidth: '190px', color: '#0f172a', lineHeight: 1.4 }}>
                  <div style={{ fontWeight: 800, fontSize: '13px', color: '#0369a1', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '6px' }}>
                    📍 {lang === 'hi' ? 'वर्तमान स्थान (GPS)' : 'CURRENT LOCATION'}
                  </div>
                  <div style={{ fontSize: '11px', marginBottom: '2px' }}>
                    <b>{location.display_name}</b>
                  </div>
                  <div style={{ fontSize: '11px', fontFamily: 'monospace', margin: '4px 0' }}>
                    <div>Lat: <b>{location.lat.toFixed(6)}</b></div>
                    <div>Lon: <b>{location.lon.toFixed(6)}</b></div>
                    <div>Accuracy: <b>±{accuracy} meters</b></div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(`${location.lat.toFixed(6)}, ${location.lon.toFixed(6)}`, 'gps')}
                    style={{
                      marginTop: '6px',
                      width: '100%',
                      background: copiedGps ? '#059669' : '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.3rem 0.5rem',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {copiedGps ? (lang === 'hi' ? 'निर्देशांक कॉपी हो गए ✓' : 'Coordinates Copied ✓') : (lang === 'hi' ? 'निर्देशांक कॉपी करें' : '📋 Copy Coordinates')}
                  </button>
                </div>
              </Popup>
            </Marker>

            {/* PART 15: CLICKED LOCATION TEMPORARY PIN */}
            {clickedCoord && (
              <Marker position={[clickedCoord.lat, clickedCoord.lon]} icon={clickPinIcon}>
                <Popup>
                  <div style={{ fontFamily: 'Inter, sans-serif', minWidth: '170px', color: '#0f172a', lineHeight: 1.4 }}>
                    <div style={{ fontWeight: 800, fontSize: '12px', color: '#ea580c', borderBottom: '1px solid #fed7aa', paddingBottom: '4px', marginBottom: '4px' }}>
                      📍 {lang === 'hi' ? 'क्लिक किया गया बिंदु' : 'CLICKED MAP LOCATION'}
                    </div>
                    <div style={{ fontSize: '11px', fontFamily: 'monospace', margin: '3px 0' }}>
                      <div>Lat: <b>{clickedCoord.lat.toFixed(6)}</b></div>
                      <div>Lon: <b>{clickedCoord.lon.toFixed(6)}</b></div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(`${clickedCoord.lat.toFixed(6)}, ${clickedCoord.lon.toFixed(6)}`, 'click')}
                      style={{
                        marginTop: '4px',
                        width: '100%',
                        background: copiedClick ? '#059669' : '#ea580c',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.25rem 0.45rem',
                        borderRadius: '5px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {copiedClick ? 'Copied ✓' : '📋 Copy Coordinates'}
                    </button>
                  </div>
                </Popup>
              </Marker>
            )}

            {/* PART 10 & 12: DISTINCT NON-OVERLAPPING GEOJSON REGIONAL HAZARD ZONES */}
            {filteredGeoJSON && (
              <GeoJSON
                key={riskFilter + JSON.stringify(gpsCenter)}
                data={filteredGeoJSON}
                style={(feature) => {
                  const level = feature.properties?.risk_level;
                  const color = level === 'CRITICAL' ? '#dc2626' : level === 'HIGH' ? '#ef4444' : level === 'MODERATE' ? '#f59e0b' : '#10b981';
                  return {
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.28,
                    weight: 2,
                    dashArray: level === 'CRITICAL' ? '4, 4' : 'none',
                  };
                }}
                onEachFeature={(feature, layer) => {
                  if (feature.properties) {
                    const props = feature.properties;
                    layer.on({
                      click: () => setSelectedFeature(props),
                      mouseover: (e) => {
                        e.target.setStyle({ fillOpacity: 0.5, weight: 3 });
                      },
                      mouseout: (e) => {
                        e.target.setStyle({ fillOpacity: 0.28, weight: 2 });
                      },
                    });
                    layer.bindPopup(`
                      <div style="font-family:Inter,sans-serif;min-width:190px;color:#0f172a;line-height:1.4">
                        <div style="font-weight:800;font-size:13px;color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:4px;margin-bottom:4px">
                          📍 ${props.name || props.hazard}
                        </div>
                        <div style="font-size:11px;margin-bottom:2px"><b>Hazard:</b> ${props.hazard}</div>
                        <div style="font-size:11px;margin-bottom:2px"><b>Risk Score:</b> <span style="font-weight:800;color:${props.color}">${props.risk_score}/100</span></div>
                        <div style="font-size:11px"><b>Severity:</b> <span style="display:inline-block;padding:2px 7px;border-radius:4px;background:#f1f5f9;font-weight:700;font-size:10px">${props.risk_level}</span></div>
                      </div>
                    `);
                  }
                }}
              />
            )}
          </MapContainer>
        </div>
      </div>

      {/* Selected Feature Info & Monitored Regional Grid */}
      <div className="grid-2" style={{ gap: '1rem', marginTop: '1rem' }}>
        {/* Monitored Zones Table */}
        <div className="card" style={{ background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)', padding: '1.2rem' }}>
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <span className="card-title" style={{ fontSize: '0.95rem', fontWeight: 800 }}>
              📍 {lang === 'hi' ? 'सक्रिय राष्ट्रीय व क्षेत्रीय निगरानी क्षेत्र' : 'Monitored National & Regional Hazard Zones'}
            </span>
            <span className="badge badge-info">{filteredGeoJSON?.features?.length || 0} Zones Active</span>
          </div>
          <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
            <table className="data-table" style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '2px solid rgba(255,255,255,0.12)' }}>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Region / Corridor</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Hazard</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center' }}>Level</th>
                  <th style={{ padding: '0.5rem', textAlign: 'right' }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {filteredGeoJSON?.features?.map((f, i) => {
                  const p = f.properties;
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer' }} onClick={() => setSelectedFeature(p)}>
                      <td style={{ padding: '0.55rem' }}><strong>{p.name}</strong></td>
                      <td style={{ padding: '0.55rem', color: '#94a3b8' }}>{p.hazard}</td>
                      <td style={{ padding: '0.55rem', textAlign: 'center' }}>
                        <span className={`badge ${p.risk_level === 'HIGH' || p.risk_level === 'CRITICAL' ? 'badge-danger' : p.risk_level === 'MODERATE' ? 'badge-warning' : 'badge-success'}`} style={{ fontSize: '0.7rem' }}>
                          {p.risk_level}
                        </span>
                      </td>
                      <td style={{ padding: '0.55rem', textAlign: 'right' }}><strong style={{ color: p.color }}>{p.risk_score}</strong></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Local Area Risk Breakdown */}
        {risk && (
          <div className="card" style={{ background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)', padding: '1.2rem' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span className="card-title" style={{ fontSize: '0.95rem', fontWeight: 800 }}>
                ⚠️ {location.display_name} — {tr('risk_summary')}
              </span>
              <span className={`badge badge-${risk.composite_level === 'LOW' ? 'success' : risk.composite_level === 'CRITICAL' ? 'danger' : 'warning'}`} style={{ fontSize: '0.7rem' }}>
                {risk.composite_level} ({risk.composite_score}/100)
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {risk.zones?.map(z => (
                <div key={z.hazard} style={{ padding: '0.6rem 0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="text-sm font-bold" style={{ fontSize: '0.82rem' }}>{z.hazard}</span>
                    <span className={`risk-${z.level} font-bold text-sm`} style={{ fontSize: '0.8rem', color: z.level === 'LOW' ? '#10b981' : z.level === 'HIGH' || z.level === 'CRITICAL' ? '#ef4444' : '#f59e0b' }}>
                      {z.score}/100 ({z.level})
                    </span>
                  </div>
                  <div className="progress-bar" style={{ marginTop: '0.3rem', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      className={`progress-fill ${z.level === 'LOW' ? 'green' : z.level === 'HIGH' || z.level === 'CRITICAL' ? 'red' : 'yellow'}`}
                      style={{
                        width: `${z.score}%`,
                        height: '100%',
                        background: z.level === 'LOW' ? '#10b981' : z.level === 'HIGH' || z.level === 'CRITICAL' ? '#ef4444' : '#f59e0b',
                        borderRadius: '3px'
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted mt-1" style={{ margin: '0.3rem 0 0', fontSize: '0.74rem' }}>
                    {lang === 'hi' ? z.description_hi : z.description_en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
