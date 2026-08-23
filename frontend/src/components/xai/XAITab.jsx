import React, { useEffect, useState } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

function ShapBar({ feature, featureHi, value, shapContribution, unit, lang }) {
  const isPositive = shapContribution >= 0;
  const maxWidth = 100;
  const width = Math.min(maxWidth, Math.abs(shapContribution) * 600);
  return (
    <div className="shap-bar-row">
      <span className="shap-feature-name">{lang === 'hi' ? featureHi : feature}</span>
      <div className="shap-bar-bg">
        <div className={`shap-fill ${isPositive ? 'positive' : 'negative'}`} style={{ width: `${width}%` }} />
      </div>
      <span className={`shap-value ${isPositive ? 'text-accent' : 'text-red'}`}>
        {isPositive ? '+' : ''}{shapContribution.toFixed(3)}
      </span>
      <span className="text-xs text-muted">{value}{unit}</span>
    </div>
  );
}

export default function XAITab() {
  const { tr, lang, location } = useApp();
  const [xai, setXai] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getExplainPrediction({ lat: location.lat, lon: location.lon })
      .then(r => { setXai(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [location.lat, location.lon]);

  const maxAbsShap = xai?.shap_features ? Math.max(...xai.shap_features.map(f => Math.abs(f.shap_contribution))) : 1;

  return (
    <div className="main-content">
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ background: 'linear-gradient(135deg, #a78bfa, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🧠 {tr('xai_title')}
        </h2>
        <p className="text-muted text-sm">{tr('xai_narrative')}</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {Array(6).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: 36 }} />)}
        </div>
      ) : xai ? (
        <>
          {/* Confidence + Probability */}
          <div className="grid-3" style={{ marginBottom: '1rem' }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <p className="text-muted text-sm mb-1">{tr('rain_probability')}</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Outfit', color: 'var(--accent-blue)' }}>
                {xai.probability_pct}%
              </p>
              <span className="badge badge-info">{xai.model_version}</span>
            </div>
            <div className="card" style={{ gridColumn: 'span 2' }}>
              <p className="text-muted text-sm mb-1">🔍 Why did the model predict this?</p>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.7 }}>
                {lang === 'hi' ? xai.xai_narrative_hi : xai.xai_narrative_en}
              </p>
            </div>
          </div>

          {/* SHAP Feature Importance */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className="card-header">
              <span className="card-title">📊 {tr('shap_importance')}</span>
              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.72rem' }}>
                <span style={{ color: 'var(--accent-blue)' }}>■ {tr('positive_impact')}</span>
                <span style={{ color: 'var(--accent-red)' }}>■ {tr('negative_impact')}</span>
              </div>
            </div>
            {xai.shap_features?.map((f, i) => (
              <ShapBar key={i}
                feature={f.feature} featureHi={f.feature_hi}
                value={f.value} shapContribution={f.shap_contribution}
                unit={f.unit} lang={lang}
              />
            ))}
          </div>

          {/* Feature Values Table */}
          <div className="card">
            <div className="card-header"><span className="card-title">📋 Current Feature Values</span></div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Current Value</th>
                  <th>SHAP Contribution</th>
                  <th>Impact</th>
                </tr>
              </thead>
              <tbody>
                {xai.shap_features?.map((f, i) => (
                  <tr key={i}>
                    <td>{lang === 'hi' ? f.feature_hi : f.feature}</td>
                    <td><strong>{f.value}{f.unit}</strong></td>
                    <td style={{ color: f.shap_contribution >= 0 ? 'var(--accent-blue)' : 'var(--accent-red)', fontWeight: 600 }}>
                      {f.shap_contribution >= 0 ? '+' : ''}{f.shap_contribution.toFixed(4)}
                    </td>
                    <td>
                      <span className={`badge ${f.shap_contribution >= 0 ? 'badge-info' : 'badge-danger'}`}>
                        {f.shap_contribution >= 0 ? '↑ Increases' : '↓ Decreases'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p className="text-muted">Failed to load XAI data. Ensure backend is running.</p>
        </div>
      )}
    </div>
  );
}
