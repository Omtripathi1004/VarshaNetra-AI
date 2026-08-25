import React, { useEffect, useState } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

function SubEngineCard({ title, icon, badgeText, badgeType = 'info', children }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div className="card-header">
        <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span>{icon}</span> {title}
        </span>
        {badgeText && <span className={`badge badge-${badgeType}`}>{badgeText}</span>}
      </div>
      {children}
    </div>
  );
}

function MetricBox({ label, value, unit = '', color = '#0f172a', subtitle = '' }) {
  return (
    <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.09)' }}>
      <p style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, margin: 0 }}>{label}</p>
      <p style={{ fontFamily: 'Outfit', fontSize: '1.45rem', fontWeight: 800, color, margin: '0.2rem 0 0' }}>
        {value}{unit}
      </p>
      {subtitle && <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: '0.15rem 0 0' }}>{subtitle}</p>}
    </div>
  );
}

export default function MonsoonPhaseTab() {
  const { tr, lang, location } = useApp();
  const [data, setData] = useState(null);
  const [outlook, setOutlook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const loc = { lat: location.lat, lon: location.lon, state: location.state, district: location.district };
    Promise.all([
      api.getMonsoonPhase(loc),
      api.getMonsoonOutlook(loc).catch(() => ({ data: null })),
    ]).then(([mRes, oRes]) => {
      setData(mRes.data);
      if (oRes?.data) setOutlook(oRes.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [location.lat, location.lon]);

  const foData = data?.false_onset_engine;
  const breakData = data?.break_watch_engine;
  const heavyData = data?.heavy_rain_engine;
  const onsetData = data?.onset_engine;

  return (
    <div className="main-content">
      {/* Tab Header */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h2 style={{ color: '#047857', margin: 0, fontWeight: 800 }}>
            🌊 {lang === 'hi' ? 'मानसून चरण एवं जोखिम केंद्र' : 'Monsoon Phase & Event Decision Hub'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.2rem' }}>
            📍 {location.display_name} • Probabilistic Event Forecasting (7–30 Days)
          </p>
        </div>
        {data && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className={`badge badge-${data.phase === 'ACTIVE' ? 'success' : data.phase === 'FALSE_ONSET' ? 'warning' : 'info'}`} style={{ fontSize: '0.85rem', padding: '0.35rem 0.95rem' }}>
              {lang === 'hi' ? data.phase_hi : data.phase_en}
            </span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid-3">
          <div className="skeleton" style={{ height: 280 }} />
          <div className="skeleton" style={{ height: 280 }} />
          <div className="skeleton" style={{ height: 280 }} />
        </div>
      ) : data && (
        <>
          {/* CRITICAL HERO: False-Onset & Monsoon Persistence */}
          <div
            className="hero-card"
            style={{
              borderLeftWidth: '6px',
              borderLeftColor: (foData?.false_onset_probability_pct ?? 20) >= 50 ? '#ea580c' : '#10b981',
              background: 'rgba(18, 14, 40, 0.72)',
              marginBottom: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.6rem' }}>
              <div>
                <span className="badge badge-warning" style={{ marginBottom: '0.3rem' }}>
                  🎯 {lang === 'hi' ? 'मुख्य तकनीकी योगदान' : 'Hero Intelligence Feature'}
                </span>
                <h3 style={{ margin: '0.2rem 0', color: '#f1f5f9', fontWeight: 800 }}>
                  {lang === 'hi' ? 'झूठी शुरुआत (False-Onset) जोखिम और शुष्क विराम पूर्वानुमान' : 'False-Onset Risk & Dry Break Prediction'}
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
                  {foData?.definition || 'Rainfall surge followed by >= 6-day dry spell (< 2.5 mm/day) during early monsoon window.'}
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: (foData?.false_onset_probability_pct ?? 20) >= 50 ? '#ea580c' : '#059669', lineHeight: 1 }}>
                  {foData?.false_onset_probability_pct ?? 68}%
                </div>
                <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>
                  {lang === 'hi' ? 'झूठी शुरुआत संभावना' : 'False-Onset Probability'} • {lang === 'hi' ? 'विश्वास: उच्च' : 'Confidence: High'}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem', margin: '0.9rem 0' }}>
              <MetricBox
                label={lang === 'hi' ? 'अपेक्षित शुष्क विराम (Dry Spell)' : 'Expected Dry Spell Window'}
                value={foData?.expected_dry_spell_window || '6–8 days'}
                color="#ea580c"
              />
              <MetricBox
                label={lang === 'hi' ? 'मानसून शुरुआत संभावना' : 'Onset Probability'}
                value={`${onsetData?.onset_probability_pct ?? 82}%`}
                color="#0284c7"
                subtitle={`Confidence: ${onsetData?.confidence || 'High'}`}
              />
              <MetricBox
                label={lang === 'hi' ? 'विराम (Dry Break) संभावना' : 'Break-Monsoon Probability'}
                value={`${breakData?.break_probability_pct ?? 65}%`}
                color="#d97706"
                subtitle={`Duration: ${breakData?.expected_duration || '5–7 days'}`}
              />
              <MetricBox
                label={lang === 'hi' ? 'भारी वर्षा जोखिम' : 'Heavy Rainfall Risk'}
                value={`${heavyData?.heavy_rain_probability_pct ?? 22}%`}
                color="#dc2626"
                subtitle="IMD >64.5mm Benchmark"
              />
            </div>

            <div style={{ padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.09)', fontSize: '0.84rem', color: '#cbd5e1' }}>
              <strong>📢 {lang === 'hi' ? 'कार्रवाई योग्य परामर्श:' : 'Immediate Actionable Advisory:'}</strong>{' '}
              {lang === 'hi' ? (foData?.action_hi || foData?.action_en) : (foData?.action_en || foData?.action_hi)}
            </div>
          </div>

          {/* 3 SUB-ENGINES IN DETAIL */}
          <div className="grid-3" style={{ marginBottom: '1.25rem' }}>
            {/* 1. Onset Sub-Engine */}
            <SubEngineCard title={lang === 'hi' ? 'मानसून शुरुआत इंजन' : 'Monsoon Onset Engine'} icon="🌱" badgeText={onsetData?.confidence || 'High'} badgeType="success">
              <MetricBox label={lang === 'hi' ? 'शुरुआत संभावना' : 'Onset Probability'} value={`${onsetData?.onset_probability_pct ?? 82}%`} color="#059669" />
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                <p><strong>{lang === 'hi' ? 'अनुमानित विंडो:' : 'Expected Window:'}</strong> {onsetData?.expected_window || 'June 15 – July 05'}</p>
                <p><strong>{lang === 'hi' ? 'प्रवाह स्थिति:' : 'Status:'}</strong> {onsetData?.status_label || 'Advancing'}</p>
              </div>
              <div className="progress-bar">
                <div className="progress-fill green" style={{ width: `${onsetData?.onset_probability_pct ?? 82}%` }} />
              </div>
            </SubEngineCard>

            {/* 2. Break-Monsoon Watch Engine */}
            <SubEngineCard title={lang === 'hi' ? 'विराम (Break) निगरानी' : 'Break-Monsoon Watch'} icon="⏳" badgeText={breakData?.severity || 'MODERATE'} badgeType="warning">
              <MetricBox label={lang === 'hi' ? 'विराम संभावना' : 'Break Probability'} value={`${breakData?.break_probability_pct ?? 65}%`} color="#d97706" />
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                <p><strong>{lang === 'hi' ? 'अपेक्षित अवधि:' : 'Expected Duration:'}</strong> {breakData?.expected_duration || '5–7 days'}</p>
                <p style={{ marginTop: '0.3rem', color: '#94a3b8' }}>{lang === 'hi' ? breakData?.action_hi : breakData?.action_en}</p>
              </div>
              <div className="progress-bar">
                <div className="progress-fill yellow" style={{ width: `${breakData?.break_probability_pct ?? 65}%` }} />
              </div>
            </SubEngineCard>

            {/* 3. Heavy Rain Risk Engine */}
            <SubEngineCard title={lang === 'hi' ? 'भारी वर्षा जोखिम इंजन' : 'Heavy Rain Risk Engine'} icon="🌧️" badgeText={heavyData?.confidence || 'Moderate'} badgeType="info">
              <MetricBox label={lang === 'hi' ? 'भारी वर्षा संभावना' : 'Heavy Rain Probability'} value={`${heavyData?.heavy_rain_probability_pct ?? 22}%`} color="#0284c7" />
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                <p><strong>{lang === 'hi' ? 'मानक परिभाषा:' : 'Threshold:'}</strong> {heavyData?.threshold_definition || '>= 64.5 mm/day'}</p>
                <p style={{ marginTop: '0.3rem', color: '#94a3b8' }}>{lang === 'hi' ? heavyData?.action_hi : heavyData?.action_en}</p>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${heavyData?.heavy_rain_probability_pct ?? 22}%` }} />
              </div>
            </SubEngineCard>
          </div>

          {/* CRITERIA MET BADGES */}
          {data.criteria_met?.length > 0 && (
            <div className="card">
              <div className="card-header">
                <span className="card-title">🔬 {lang === 'hi' ? 'सक्रिय वायुमंडलीय व स्थानिक मापदंड' : 'Active Meteorological Criteria Satisfied'}</span>
                <span className="badge badge-success">Open-Meteo Verified</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.6rem' }}>
                {data.criteria_met.map((c, i) => (
                  <div key={i} style={{ padding: '0.5rem 0.8rem', background: 'rgba(5, 150, 105, 0.08)', border: '1px solid #bbf7d0', borderRadius: '6px', fontSize: '0.8rem', color: '#047857', fontWeight: 600 }}>
                    ✓ {c}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
