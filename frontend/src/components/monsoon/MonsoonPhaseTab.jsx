import React, { useEffect, useState } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid, ReferenceLine } from 'recharts';

function SubEngine({ title, icon, children }) {
  return (
    <div className="card">
      <div className="card-header"><span className="card-title">{icon} {title}</span></div>
      {children}
    </div>
  );
}

function Metric({ label, value, unit = '', color = 'var(--text-primary)' }) {
  return (
    <div style={{ padding: '0.6rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem' }}>
      <p className="text-xs text-muted">{label}</p>
      <p style={{ fontFamily: 'Outfit', fontSize: '1.3rem', fontWeight: 700, color }}>{value}{unit}</p>
    </div>
  );
}

export default function MonsoonPhaseTab() {
  const { tr, lang, location } = useApp();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getMonsoonPhase({ lat: location.lat, lon: location.lon })
      .then(r => { setData(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [location.lat, location.lon]);

  return (
    <div className="main-content">
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🌊 {tr('tab_monsoon')}
        </h2>
        {data && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.4rem' }}>
            <span className={`badge badge-${data.phase}`} style={{ fontSize: '0.9rem', padding: '0.3rem 1rem' }}>
              {lang === 'hi' ? data.phase_hi : data.phase_en}
            </span>
            <span className="text-muted text-sm">Onset Score: {data.onset_score}/100</span>
          </div>
        )}
      </div>

      {loading ? <div className="skeleton" style={{ height: 300 }} /> : data && (
        <>
          {/* Criteria Met */}
          {data.criteria_met?.length > 0 && (
            <div className="card mb-2">
              <div className="card-header"><span className="card-title">✅ {tr('criteria_met')}</span></div>
              {data.criteria_met.map((c, i) => (
                <p key={i} style={{ color: 'var(--accent-green)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>✓ {c}</p>
              ))}
            </div>
          )}

          <div className="grid-3">
            {/* Onset Engine */}
            <SubEngine title={tr('onset_engine')} icon="🌱">
              <Metric label={tr('onset_probability')} value={data.onset_engine?.onset_probability_pct} unit="%" color="var(--accent-green)" />
              <Metric label={tr('confidence')} value={data.onset_engine?.confidence_pct} unit="%" color="var(--accent-blue)" />
              <Metric label={tr('onset_window')} value={`${data.onset_engine?.expected_window_start} – ${data.onset_engine?.expected_window_end}`} />
              <div style={{ padding: '0.6rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)' }}>
                <p className="text-xs text-muted">Progression</p>
                <p className="text-sm font-bold">{data.onset_engine?.progression_label} (Day {data.onset_engine?.progression_day})</p>
              </div>
              <div className="progress-bar mt-1">
                <div className="progress-fill green" style={{ width: `${data.onset_engine?.onset_probability_pct}%` }} />
              </div>
            </SubEngine>

            {/* False Onset Engine */}
            <SubEngine title={tr('false_onset_engine')} icon="⚠️">
              <Metric label={tr('false_onset_prob')} value={data.false_onset_engine?.false_onset_probability_pct} unit="%" color="var(--accent-yellow)" />
              <div style={{ padding: '0.6rem', background: data.false_onset_engine?.sowing_caution ? 'rgba(251,191,36,0.1)' : 'var(--bg-glass)',
                border: data.false_onset_engine?.sowing_caution ? '1px solid rgba(251,191,36,0.3)' : 'none',
                borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem' }}>
                <p className="text-xs text-muted">{tr('sowing_caution')}</p>
                <p className={`font-bold ${data.false_onset_engine?.sowing_caution ? 'text-yellow' : 'text-green'}`}>
                  {data.false_onset_engine?.sowing_caution ? '⚠️ HOLD SOWING' : '✅ OK to sow'}
                </p>
              </div>
              <p className="text-xs text-muted" style={{ lineHeight: 1.6 }}>
                {lang === 'hi' ? data.false_onset_engine?.caution_message_hi : data.false_onset_engine?.caution_message_en}
              </p>
              {data.false_onset_engine?.temporary_rain_detected && (
                <span className="badge badge-warning mt-1">Temporary Rain Detected</span>
              )}
            </SubEngine>

            {/* Break Watch Engine */}
            <SubEngine title={tr('break_watch_engine')} icon="🔴">
              <Metric label={tr('break_probability')} value={data.break_watch_engine?.break_probability_pct} unit="%" color="var(--accent-red)" />
              <Metric label={tr('expected_break')} value={`${data.break_watch_engine?.expected_start} – ${data.break_watch_engine?.expected_end}`} />
              <Metric label={tr('duration')} value={data.break_watch_engine?.duration_days} unit=" days" color="var(--accent-orange)" />
              <div style={{ padding: '0.6rem', background: 'rgba(248,113,113,0.08)', borderRadius: 'var(--radius-sm)' }}>
                <p className="text-xs text-muted">{tr('severity')}: <strong style={{ color: 'var(--accent-red)' }}>{data.break_watch_engine?.severity}</strong></p>
                <p className="text-xs text-muted mt-1" style={{ lineHeight: 1.6 }}>
                  {lang === 'hi' ? data.break_watch_engine?.warning_hi : data.break_watch_engine?.warning_en}
                </p>
              </div>
              <div className="progress-bar mt-1">
                <div className="progress-fill red" style={{ width: `${data.break_watch_engine?.break_probability_pct}%` }} />
              </div>
            </SubEngine>
          </div>
        </>
      )}
    </div>
  );
}
