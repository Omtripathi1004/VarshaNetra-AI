import React, { useEffect, useState } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

function ShapBar({ feature, featureHi, value, shapContribution, unit, lang }) {
  const isPositive = shapContribution >= 0;
  const maxWidth = 100;
  const width = Math.min(maxWidth, Math.abs(shapContribution) * 600);
  return (
    <div className="shap-bar-row" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.4rem 0' }}>
      <span className="shap-feature-name" style={{ width: '160px', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1' }}>
        {lang === 'hi' ? featureHi : feature}
      </span>
      <div className="shap-bar-bg" style={{ flex: 1, height: '14px', background: 'rgba(255,255,255,0.06)', borderRadius: '7px', overflow: 'hidden' }}>
        <div
          className={`shap-fill ${isPositive ? 'positive' : 'negative'}`}
          style={{
            width: `${width}%`,
            height: '100%',
            background: isPositive ? 'linear-gradient(90deg, #059669, #10b981)' : 'linear-gradient(90deg, #dc2626, #f87171)',
            borderRadius: '7px',
            transition: 'width 0.4s ease'
          }}
        />
      </div>
      <span className="shap-value" style={{ width: '65px', textAlign: 'right', fontWeight: 700, fontSize: '0.82rem', color: isPositive ? '#059669' : '#dc2626' }}>
        {isPositive ? '+' : ''}{shapContribution.toFixed(3)}
      </span>
      <span className="text-xs text-muted" style={{ width: '80px', color: '#94a3b8', fontSize: '0.75rem' }}>
        {value}{unit}
      </span>
    </div>
  );
}

export default function XAITab() {
  const { tr, lang, location } = useApp();
  const [xai, setXai] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLineage, setShowLineage] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getExplainPrediction({ lat: location.lat, lon: location.lon })
      .then(r => { setXai(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [location.lat, location.lon]);

  return (
    <div className="main-content">
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ background: 'linear-gradient(135deg, #059669, #0284c7, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800, margin: 0 }}>
          🧠 {tr('xai_title')} (Explainable AI & Model Lineage)
        </h2>
        <p className="text-muted text-sm" style={{ marginTop: '0.2rem' }}>
          {lang === 'hi'
            ? `स्थान (${location.display_name}) के लिए वास्तविक SHAP (SHapley Additive exPlanations) विशेषता भार व मॉडल वंशक्रम`
            : `Exact SHAP (SHapley Additive exPlanations) feature contribution & model data provenance for ${location.display_name}`}
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {Array(6).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: 36, borderRadius: '8px' }} />)}
        </div>
      ) : xai ? (
        <>
          {/* Top Row: Probability + Model Narrative */}
          <div className="grid-3" style={{ marginBottom: '1rem', gap: '1rem' }}>
            <div className="card" style={{ textAlign: 'center', background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)', padding: '1.2rem' }}>
              <p className="text-muted text-sm mb-1" style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{tr('rain_probability')}</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Outfit', color: '#0284c7', margin: '0.3rem 0' }}>
                {xai.probability_pct}%
              </p>
              <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>{xai.model_version || 'LightGBM_v2.0_Hybrid'}</span>
            </div>
            <div className="card" style={{ gridColumn: 'span 2', background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)', padding: '1.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '1.1rem' }}>🔍</span>
                <strong style={{ fontSize: '0.92rem', color: '#f1f5f9' }}>
                  {lang === 'hi' ? 'मॉडल ने यह भविष्यवाणी क्यों की? (Model Reasoning)' : 'Why did the model produce this prediction?'}
                </strong>
              </div>
              <p style={{ fontSize: '0.86rem', lineHeight: 1.65, color: '#cbd5e1', margin: 0 }}>
                {lang === 'hi' ? xai.xai_narrative_hi : xai.xai_narrative_en}
              </p>
            </div>
          </div>

          {/* SHAP Feature Importance Bars */}
          <div className="card" style={{ marginBottom: '1rem', background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)', padding: '1.2rem' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span className="card-title" style={{ fontSize: '0.95rem', fontWeight: 800 }}>📊 {tr('shap_importance')}</span>
              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', fontWeight: 600 }}>
                <span style={{ color: '#059669' }}>■ {tr('positive_impact')} (+Rain)</span>
                <span style={{ color: '#dc2626' }}>■ {tr('negative_impact')} (-Rain)</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {xai.shap_features?.map((f, i) => (
                <ShapBar key={i}
                  feature={f.feature} featureHi={f.feature_hi}
                  value={f.value} shapContribution={f.shap_contribution}
                  unit={f.unit} lang={lang}
                />
              ))}
            </div>
          </div>

          {/* Model Data Lineage & Provenance Accordion (SIH Requirement) */}
          <div className="card" style={{ marginBottom: '1rem', background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)', padding: '1.2rem' }}>
            <div
              onClick={() => setShowLineage(!showLineage)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem' }}>🏛️</span>
                <strong style={{ fontSize: '0.95rem', color: '#f1f5f9' }}>
                  {lang === 'hi' ? 'मॉडल डेटा वंशावली व स्रोत (Model Data Lineage)' : 'Model Data Lineage & Evaluation Provenance'}
                </strong>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 700 }}>
                {showLineage ? '▲ Hide Lineage' : '▼ View Lineage'}
              </span>
            </div>

            {showLineage && (
              <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.8rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.8rem', fontSize: '0.8rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.09)' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 600 }}>MODEL NAME & ARCHITECTURE</div>
                    <div style={{ fontWeight: 700, color: '#f1f5f9', marginTop: '2px' }}>LightGBM + CalibratedClassifierCV v2.0</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.09)' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 600 }}>HISTORICAL TRAINING DATASET</div>
                    <div style={{ fontWeight: 700, color: '#f1f5f9', marginTop: '2px' }}>~10 Years (2015–2024, 3,652 Daily Observations)</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.09)' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 600 }}>CHRONOLOGICAL VALIDATION</div>
                    <div style={{ fontWeight: 700, color: '#059669', marginTop: '2px' }}>Train: 2015–21 | Val: 2022–23 | Test: 2024 (0% Leakage)</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.09)' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 600 }}>TELECONNECTIONS INGESTED</div>
                    <div style={{ fontWeight: 700, color: '#f1f5f9', marginTop: '2px' }}>NOAA ONI (ENSO) + DMI (IOD) + RMM (MJO)</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.09)' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 600 }}>TARGET LOCATION TELEMETRY</div>
                    <div style={{ fontWeight: 700, color: '#f1f5f9', marginTop: '2px' }}>{location.display_name} ({location.lat}, {location.lon})</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.09)' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 600 }}>METEOROLOGICAL PROVIDERS</div>
                    <div style={{ fontWeight: 700, color: '#f1f5f9', marginTop: '2px' }}>Open-Meteo GFS / ECMWF + IMD Gridded Normals</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Feature Values Detailed Table */}
          <div className="card" style={{ background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)', padding: '1.2rem' }}>
            <div className="card-header" style={{ marginBottom: '0.6rem' }}>
              <span className="card-title" style={{ fontSize: '0.95rem', fontWeight: 800 }}>📋 {lang === 'hi' ? 'वर्तमान विशेषता मान व योगदान' : 'Input Feature Values & Mathematical Contributions'}</span>
            </div>
            <table className="data-table" style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '2px solid rgba(255,255,255,0.12)' }}>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>Feature</th>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>Current Telemetry</th>
                  <th style={{ padding: '0.6rem', textAlign: 'right' }}>SHAP Weight</th>
                  <th style={{ padding: '0.6rem', textAlign: 'center' }}>Directional Impact</th>
                </tr>
              </thead>
              <tbody>
                {xai.shap_features?.map((f, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '0.55rem' }}>{lang === 'hi' ? f.feature_hi : f.feature}</td>
                    <td style={{ padding: '0.55rem' }}><strong>{f.value} {f.unit}</strong></td>
                    <td style={{ padding: '0.55rem', textAlign: 'right', color: f.shap_contribution >= 0 ? '#059669' : '#dc2626', fontWeight: 700 }}>
                      {f.shap_contribution >= 0 ? '+' : ''}{f.shap_contribution.toFixed(4)}
                    </td>
                    <td style={{ padding: '0.55rem', textAlign: 'center' }}>
                      <span className={`badge ${f.shap_contribution >= 0 ? 'badge-info' : 'badge-danger'}`} style={{ fontSize: '0.7rem' }}>
                        {f.shap_contribution >= 0 ? '↑ Increases Rain' : '↓ Suppresses Rain'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px' }}>
          <p className="text-muted">Failed to load XAI telemetry. Ensure backend is running.</p>
        </div>
      )}
    </div>
  );
}
