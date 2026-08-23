import React, { useEffect, useState } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, ReferenceLine, Cell, Legend } from 'recharts';

export default function AnalyticsTab() {
  const { tr, lang, location } = useApp();
  const [hist, setHist] = useState(null);
  const [perf, setPerf] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Simulation state
  const [simCrop, setSimCrop] = useState('Paddy (Rice)');
  const [rainfallChange, setRainfallChange] = useState(0);
  const [dryDays, setDryDays] = useState(0);
  const [tempChange, setTempChange] = useState(0);
  const [simResult, setSimResult] = useState(null);
  const [simRunning, setSimRunning] = useState(false);

  useEffect(() => {
    const loc = { lat: location.lat, lon: location.lon };
    setLoading(true);
    Promise.all([
      api.getHistoricalAnalytics(loc),
      api.getModelPerformance(),
    ]).then(([h, p]) => {
      setHist(h.data);
      setPerf(p.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [location.lat, location.lon]);

  const runSim = async () => {
    setSimRunning(true);
    const res = await api.runSimulation(
      { lat: location.lat, lon: location.lon },
      simCrop, rainfallChange, dryDays, tempChange, 14
    );
    setSimResult(res.data);
    setSimRunning(false);
  };

  const rainfallChartData = hist?.trend?.map(d => ({
    date: d.date?.slice(5),
    rainfall: d.rainfall_mm,
    temp: d.temp_avg_c,
  }));

  return (
    <div className="main-content">
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🔬 {tr('analytics_title')}
        </h2>
      </div>

      {/* Historical Monsoon Comparison */}
      <div className="card mb-2">
        <div className="card-header">
          <span className="card-title">📅 {tr('historical_comparison')}</span>
          {hist && (
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.78rem' }}>
              <span>Total: <strong>{hist.total_rainfall_mm} mm</strong></span>
              <span>Normal: <strong>{hist.normal_rainfall_mm} mm</strong></span>
              <span style={{ color: hist.rainfall_anomaly_pct >= 0 ? 'var(--accent-blue)' : 'var(--accent-red)' }}>
                Anomaly: <strong>{hist.rainfall_anomaly_pct > 0 ? '+' : ''}{hist.rainfall_anomaly_pct}%</strong>
              </span>
              <span>Dry days: <strong>{hist.dry_spell_days}</strong></span>
            </div>
          )}
        </div>
        {loading ? <div className="skeleton" style={{ height: 220 }} /> : rainfallChartData ? (
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rainfallChartData} barSize={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 9 }} />
                <YAxis yAxisId="rain" orientation="left" tick={{ fill: '#38bdf8', fontSize: 9 }} />
                <YAxis yAxisId="temp" orientation="right" tick={{ fill: '#fb923c', fontSize: 9 }} />
                <Tooltip contentStyle={{ background: '#0d1225', border: '1px solid rgba(255,255,255,0.1)', fontSize: 11 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar yAxisId="rain" dataKey="rainfall" name="Rainfall (mm)" fill="#38bdf8" radius={[3, 3, 0, 0]}>
                  {rainfallChartData.map((entry, i) => (
                    <Cell key={i} fill={entry.rainfall > 10 ? '#38bdf8' : entry.rainfall > 0 ? '#818cf8' : '#334155'} />
                  ))}
                </Bar>
                <Line yAxisId="temp" type="monotone" dataKey="temp" name="Temp (°C)" stroke="#fb923c" dot={false} strokeWidth={1.5} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : <p className="text-muted text-sm">No historical data available</p>}
      </div>

      {/* Model Performance */}
      {perf && (
        <div className="card mb-2">
          <div className="card-header"><span className="card-title">🤖 Model Performance</span></div>
          <div className="grid-4">
            <div style={{ padding: '0.75rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <p className="text-xs text-muted">Model</p>
              <p className="font-bold text-accent">{perf.model_version}</p>
            </div>
            <div style={{ padding: '0.75rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <p className="text-xs text-muted">Predictions</p>
              <p className="font-bold" style={{ fontSize: '1.4rem' }}>{perf.total_predictions}</p>
            </div>
            <div style={{ padding: '0.75rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <p className="text-xs text-muted">Avg Confidence</p>
              <p className="font-bold text-green">{perf.avg_confidence_pct}%</p>
            </div>
            {perf.categories_distribution && (
              <div style={{ padding: '0.75rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)' }}>
                <p className="text-xs text-muted mb-1">Category Distribution</p>
                {Object.entries(perf.categories_distribution).filter(([, v]) => v > 0).map(([cat, count]) => (
                  <p key={cat} className="text-xs" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{cat.replace('_', ' ')}</span><span className="text-accent">{count}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* What-If Simulator */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">🎛️ {tr('what_if_simulator')}</span>
          <span className="badge badge-warning">{tr('simulation_only')}</span>
        </div>
        <div className="grid-2" style={{ gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="field-label">Crop: {simCrop}</label>
              <select className="select" value={simCrop} onChange={e => setSimCrop(e.target.value)}>
                {['Paddy (Rice)', 'Wheat', 'Maize (Corn)', 'Soybean', 'Cotton', 'Groundnut', 'Bajra (Pearl Millet)', 'Mustard', 'Chickpea (Chana)', 'Potato', 'Sugarcane'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Rainfall Change: {rainfallChange > 0 ? '+' : ''}{rainfallChange}%</label>
              <input type="range" className="slider" min={-100} max={100} step={5} value={rainfallChange} onChange={e => setRainfallChange(+e.target.value)} />
            </div>
            <div>
              <label className="field-label">Dry Days: {dryDays} days</label>
              <input type="range" className="slider" min={0} max={21} step={1} value={dryDays} onChange={e => setDryDays(+e.target.value)} />
            </div>
            <div>
              <label className="field-label">Temperature Anomaly: {tempChange > 0 ? '+' : ''}{tempChange}°C</label>
              <input type="range" className="slider" min={-5} max={5} step={0.5} value={tempChange} onChange={e => setTempChange(+e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={runSim} disabled={simRunning}>
              {simRunning ? '⏳ Running simulation...' : '▶ Run What-If Simulation'}
            </button>
          </div>
          {simResult ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p className="text-xs text-muted">{simResult.scenario_summary}</p>
              {[
                { label: tr('crop_stress'), val: simResult.crop_stress_index_pct, unit: '%', color: simResult.crop_stress_index_pct > 60 ? 'var(--accent-red)' : 'var(--accent-yellow)' },
                { label: tr('yield_impact'), val: simResult.yield_impact_pct, unit: '%', color: simResult.yield_impact_pct < 0 ? 'var(--accent-red)' : 'var(--accent-green)' },
                { label: tr('soil_projected'), val: simResult.soil_moisture_projected, unit: ' m³/m³', color: 'var(--accent-blue)' },
              ].map(m => (
                <div key={m.label} style={{ padding: '0.75rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)' }}>
                  <p className="text-xs text-muted">{m.label}</p>
                  <p style={{ fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: 800, color: m.color }}>{m.val}{m.unit}</p>
                </div>
              ))}
              <div style={{ padding: '0.75rem', background: 'rgba(56,189,248,0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(56,189,248,0.2)' }}>
                <p className="text-xs text-muted mb-1">💡 {tr('contingency')}</p>
                <p className="text-sm">{lang === 'hi' ? simResult.recommended_contingency_hi : simResult.recommended_contingency_en}</p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <p>Adjust sliders and run simulation →</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
