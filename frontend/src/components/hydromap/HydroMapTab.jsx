import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

const { BaseLayer } = LayersControl;

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom || 6, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
}

export default function HydroMapTab() {
  const { tr, lang, location } = useApp();
  const [geojson, setGeojson] = useState(null);
  const [risk, setRisk] = useState(null);
  const [riskFilter, setRiskFilter] = useState('ALL'); // ALL | HIGH | MODERATE | LOW
  const [selectedFeature, setSelectedFeature] = useState(null);

  const center = [location.lat || 26.85, location.lon || 80.95];

  useEffect(() => {
    const loc = { lat: location.lat, lon: location.lon };
    api.getRiskGeoJSON(loc).then(r => setGeojson(r.data)).catch(() => {});
    api.getRiskSummary(loc).then(r => setRisk(r.data)).catch(() => {});
  }, [location.lat, location.lon]);

  // Filter features based on risk level
  const filteredGeoJSON = React.useMemo(() => {
    if (!geojson?.features) return null;
    if (riskFilter === 'ALL') return geojson;
    return {
      type: 'FeatureCollection',
      features: geojson.features.filter(f => f.properties?.risk_level === riskFilter)
    };
  }, [geojson, riskFilter]);

  return (
    <div className="main-content">
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ background: 'linear-gradient(135deg, #0284c7, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🗺️ {tr('tab_hydromap')}
        </h2>
        <p className="text-muted text-sm">
          {lang === 'hi'
            ? 'भारत-स्तरीय वास्तविक भू-स्थानिक जोखिम मानचित्र • उच्च, मध्यम और निम्न जोखिम क्षेत्र'
            : 'National & Regional Hydro-Hazard GIS Explorer • Live High, Moderate & Low Risk Zones'}
        </p>
      </div>

      {/* Map Control Bar: Filter by Risk Level */}
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
                color: riskFilter === lvl.id ? '#fff' : lvl.color
              }}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-muted">
          🗺️ {lang === 'hi' ? 'क्लीन व्हाइट मैप टाइल सक्रिय' : 'Standard Bright White Map Active'}
        </span>
      </div>

      {/* Leaflet White Map Container */}
      <div className="grid-2" style={{ gap: '1rem' }}>
        <div className="card" style={{ gridColumn: 'span 2', padding: '0.5rem', background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px', overflow: 'hidden' }}>
          <MapContainer
            center={center}
            zoom={6}
            style={{ height: '520px', width: '100%', borderRadius: '12px' }}
            zoomControl={true}
          >
            <LayersControl position="topright">
              <BaseLayer checked name="Light Street Map (Standard White)">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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

            <MapController center={center} zoom={7} />

            {filteredGeoJSON && (
              <GeoJSON
                key={riskFilter + JSON.stringify(center)}
                data={filteredGeoJSON}
                style={(feature) => {
                  const level = feature.properties?.risk_level;
                  const color = level === 'CRITICAL' ? '#dc2626' : level === 'HIGH' ? '#ef4444' : level === 'MODERATE' ? '#f59e0b' : '#10b981';
                  return {
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.35,
                    weight: 2.5,
                  };
                }}
                onEachFeature={(feature, layer) => {
                  if (feature.properties) {
                    const props = feature.properties;
                    layer.on({
                      click: () => setSelectedFeature(props)
                    });
                    layer.bindPopup(`
                      <div style="font-family:Inter,sans-serif;min-width:180px;color:#0f172a;line-height:1.4">
                        <div style="font-weight:700;font-size:13px;color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:4px;margin-bottom:4px">
                          📍 ${props.name || props.hazard}
                        </div>
                        <div style="font-size:11px;margin-bottom:2px"><b>Hazard:</b> ${props.hazard}</div>
                        <div style="font-size:11px;margin-bottom:2px"><b>Risk Score:</b> <span style="font-weight:700;color:${props.color}">${props.risk_score}/100</span></div>
                        <div style="font-size:11px"><b>Severity:</b> <span style="display:inline-block;padding:1px 6px;border-radius:4px;background:#f1f5f9;font-weight:700;font-size:10px">${props.risk_level}</span></div>
                      </div>
                    `);
                  }
                }}
              />
            )}
          </MapContainer>
        </div>
      </div>

      {/* Selected Feature Info or Region Analytics */}
      <div className="grid-2" style={{ gap: '1rem', marginTop: '1rem' }}>
        {/* Real Regions Table */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">📍 {lang === 'hi' ? 'सक्रिय राष्ट्रीय और क्षेत्रीय निगरानी क्षेत्र' : 'Monitored National & Regional Hazard Zones'}</span>
            <span className="badge badge-info">{filteredGeoJSON?.features?.length || 0} Zones Active</span>
          </div>
          <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Region / Corridor</th>
                  <th>Hazard</th>
                  <th>Level</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {filteredGeoJSON?.features?.map((f, i) => {
                  const p = f.properties;
                  return (
                    <tr key={i} style={{ cursor: 'pointer' }} onClick={() => setSelectedFeature(p)}>
                      <td><strong>{p.name}</strong></td>
                      <td className="text-xs text-muted">{p.hazard}</td>
                      <td>
                        <span className={`badge ${p.risk_level === 'HIGH' || p.risk_level === 'CRITICAL' ? 'badge-danger' : p.risk_level === 'MODERATE' ? 'badge-warning' : 'badge-success'}`}>
                          {p.risk_level}
                        </span>
                      </td>
                      <td><strong style={{ color: p.color }}>{p.risk_score}</strong></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Local Area Risk Breakdown */}
        {risk && (
          <div className="card">
            <div className="card-header">
              <span className="card-title">⚠️ {location.display_name} — {tr('risk_summary')}</span>
              <span className={`badge badge-${risk.composite_level === 'LOW' ? 'success' : risk.composite_level === 'CRITICAL' ? 'danger' : 'warning'}`}>
                {risk.composite_level} ({risk.composite_score}/100)
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {risk.zones?.map(z => (
                <div key={z.hazard} style={{ padding: '0.6rem 0.8rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="text-sm font-bold">{z.hazard}</span>
                    <span className={`risk-${z.level} font-bold text-sm`}>{z.score}/100 ({z.level})</span>
                  </div>
                  <div className="progress-bar" style={{ marginTop: '0.3rem' }}>
                    <div
                      className={`progress-fill ${z.level === 'LOW' ? 'green' : z.level === 'HIGH' || z.level === 'CRITICAL' ? 'red' : 'yellow'}`}
                      style={{ width: `${z.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted mt-1">{lang === 'hi' ? z.description_hi : z.description_en}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
