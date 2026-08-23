import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, RadialLinearScale, Filler, Tooltip, Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Filler, Tooltip, Legend);

const ICONS = {
  temperature_c: '🌡️', humidity_pct: '💧', precipitation_mm: '🌧️',
  rain_mm: '🌦️', cloud_cover_pct: '☁️', pressure_msl_hpa: '📊',
  wind_speed_kmh: '💨', wind_direction_deg: '🧭', soil_moisture_0_1cm: '🌱',
};
const UNITS = {
  temperature_c: '°C', humidity_pct: '%', precipitation_mm: 'mm',
  rain_mm: 'mm', cloud_cover_pct: '%', pressure_msl_hpa: 'hPa',
  wind_speed_kmh: 'km/h', wind_direction_deg: '°', soil_moisture_0_1cm: 'm³/m³',
};

function WeatherTile({ icon, label, value, unit }) {
  return (
    <div className="weather-tile">
      <span className="weather-tile-icon">{icon}</span>
      <span className="weather-tile-label">{label}</span>
      <span className="weather-tile-value">{value ?? '—'}</span>
      <span className="weather-tile-unit">{unit}</span>
    </div>
  );
}

export default function OverviewTab() {
  const { tr, lang, location, setLocation } = useApp();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [monsoon, setMonsoon] = useState(null);
  const [risk, setRisk] = useState(null);
  const [showcase, setShowcase] = useState([]);
  const [forecastDays, setForecastDays] = useState(7); // 7 | 30
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loc = { lat: location.lat, lon: location.lon };
    setLoading(true);
    Promise.all([
      api.getCurrentWeather(loc),
      api.getForecast(loc, forecastDays),
      api.getRainfallPrediction(loc),
      api.getMonsoonPhase(loc),
      api.getRiskSummary(loc),
      api.getShowcaseWeather().catch(() => ({ data: [] })),
    ]).then(([w, f, p, m, r, sc]) => {
      setWeather(w.data);
      setForecast(f.data);
      setPrediction(p.data);
      setMonsoon(m.data);
      setRisk(r.data);
      if (sc?.data) setShowcase(sc.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [location.lat, location.lon, forecastDays]);

  const handleSelectShowcaseLocation = (scLoc) => {
    setLocation({
      lat: scLoc.lat,
      lon: scLoc.lon,
      state: scLoc.state,
      district: scLoc.district,
      city: scLoc.city,
      village: scLoc.village,
      display_name: `${scLoc.village}, ${scLoc.city}, ${scLoc.state}`,
    });
  };

  const hourlyChartData = prediction?.hourly_trend ? {
    labels: prediction.hourly_trend.map(h => h.time_label),
    datasets: [
      {
        label: 'Rain Probability (%)',
        data: prediction.hourly_trend.map(h => h.probability_pct),
        borderColor: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.12)',
        fill: true, tension: 0.4, borderWidth: 2, pointRadius: 0,
        yAxisID: 'y',
      },
      {
        label: 'Expected mm',
        data: prediction.hourly_trend.map(h => h.expected_mm),
        borderColor: '#818cf8', backgroundColor: 'rgba(129,140,248,0.08)',
        fill: true, tension: 0.4, borderWidth: 2, pointRadius: 0,
        yAxisID: 'y1',
      },
    ],
  } : null;

  const forecastChartData = forecast?.daily ? {
    labels: forecast.daily.map(d => d.date?.slice(5)),
    datasets: [
      {
        label: 'Max Temp (°C)',
        data: forecast.daily.map(d => d.temp_max_c),
        borderColor: '#fb923c', backgroundColor: 'transparent',
        tension: 0.4, borderWidth: 2, pointRadius: forecastDays === 30 ? 1 : 3, type: 'line',
      },
      {
        label: 'Rainfall (mm)',
        data: forecast.daily.map(d => d.rainfall_mm),
        backgroundColor: forecast.daily.map(d => d.rainfall_mm > 10 ? '#38bdf8' : d.rainfall_mm > 2 ? '#818cf8' : 'rgba(56,189,248,0.3)'),
        borderRadius: 4, type: 'bar',
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#94a3b8', boxWidth: 12, font: { size: 11 } } } },
    scales: {
      x: { ticks: { color: '#475569', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
      y: { ticks: { color: '#475569', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
      y1: { position: 'right', ticks: { color: '#818cf8', font: { size: 10 } }, grid: { drawOnChartArea: false } },
    },
  };

  const forecastOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#94a3b8', boxWidth: 12, font: { size: 11 } } },
      tooltip: {
        callbacks: {
          afterBody: (context) => {
            const index = context[0].dataIndex;
            const item = forecast?.daily?.[index];
            if (!item) return '';
            return `Rain Prob: ${item.rain_probability_pct}%\nSowing Index: ${item.sowing_suitability_score}/100`;
          }
        }
      }
    },
    scales: {
      x: { ticks: { color: '#475569', font: { size: forecastDays === 30 ? 8 : 10 }, maxRotation: 45 }, grid: { color: 'rgba(255,255,255,0.04)' } },
      y: { ticks: { color: '#475569', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
    },
  };

  const prob = prediction?.probability_pct ?? 0;
  const pct = Math.round(prob);

  // Month-ahead summary metrics
  const monthTotalRain = forecast?.daily ? forecast.daily.reduce((acc, d) => acc + (d.rainfall_mm || 0), 0) : 0;
  const monthRainDays = forecast?.daily ? forecast.daily.filter(d => d.rainfall_mm >= 1.0).length : 0;
  const monthAvgTemp = forecast?.daily ? (forecast.daily.reduce((acc, d) => acc + (d.temp_max_c || 30), 0) / forecast.daily.length) : 30;

  return (
    <div className="main-content">
      {/* Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🌧️ {tr('tab_home')}
        </h2>
        <p className="text-muted text-sm">{tr('weather_source')} • Live GPS + Manual input</p>
      </div>

      {/* REGIONAL LIVE WEATHER SHOWCASE (Cities & Villages) */}
      {showcase.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div className="section-title">
            <span className="icon">📡</span>
            {lang === 'hi' ? 'क्षेत्रीय लाइव मौसम निगरानी (प्रमुख शहर और ग्राम)' : 'Regional Live Weather Hub (Cities & Villages)'}
          </div>
          <div className="grid-3" style={{ gap: '0.85rem' }}>
            {showcase.map((sc, idx) => {
              const isCurrent = location.city === sc.city || location.district === sc.district;
              return (
                <div
                  key={idx}
                  className="card"
                  style={{
                    padding: '0.9rem',
                    border: isCurrent ? '1px solid var(--accent-blue)' : '1px solid var(--border-subtle)',
                    background: isCurrent ? 'rgba(56,189,248,0.08)' : 'var(--bg-card)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>{sc.city}</h4>
                      <p className="text-xs text-muted">🌾 {sc.village} ({sc.state})</p>
                    </div>
                    <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{sc.tag}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                      <span style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Outfit', color: 'var(--accent-blue)' }}>
                        {sc.temperature_c}°C
                      </span>
                      <span className="text-xs text-muted">🌡️</span>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <div>💧 {sc.humidity_pct}% Hum</div>
                      <div>🌧️ {sc.precipitation_mm} mm Rain</div>
                    </div>
                  </div>

                  <p className="text-xs text-muted" style={{ margin: '0.4rem 0 0.6rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.3rem' }}>
                    {lang === 'hi' ? sc.weather_description_hi : sc.weather_description_en}
                  </p>

                  <button
                    onClick={() => handleSelectShowcaseLocation(sc)}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.74rem' }}
                  >
                    {isCurrent ? `✓ ${lang === 'hi' ? 'वर्तमान सक्रिय' : 'Active Location'}` : `🔍 ${lang === 'hi' ? 'इस क्षेत्र का डेटा देखें' : 'View This Area'}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid-4" style={{ marginBottom: '1rem' }}>
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 100 }} />
          ))}
        </div>
      ) : (
        <>
          {/* Weather Tiles */}
          <div style={{ marginBottom: '1rem' }}>
            <div className="section-title">
              <span className="icon">🌤️</span>{tr('weather_title')} — <strong>{location.display_name}</strong>
            </div>
            <div className="grid-4">
              {weather && Object.entries({
                temperature_c: weather.temperature_c,
                humidity_pct: weather.humidity_pct,
                precipitation_mm: weather.precipitation_mm,
                rain_mm: weather.rain_mm,
                cloud_cover_pct: weather.cloud_cover_pct,
                pressure_msl_hpa: weather.pressure_msl_hpa,
                wind_speed_kmh: weather.wind_speed_kmh,
                soil_moisture_0_1cm: weather.soil_moisture_0_1cm,
              }).map(([key, val]) => (
                <WeatherTile key={key}
                  icon={ICONS[key]} label={tr(key)} unit={UNITS[key]}
                  value={val != null ? Number(val).toFixed(1) : null}
                />
              ))}
            </div>
            {weather && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              {weather.weather_description_en} · {weather.weather_description_hi} · fetched {weather.fetched_at ? new Date(weather.fetched_at).toLocaleTimeString() : 'just now'}
            </p>}
          </div>

          {/* Prediction + Charts row */}
          <div className="grid-2" style={{ marginBottom: '1rem' }}>
            {/* ML Gauge */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">🤖 {tr('prediction_title')}</span>
                <span className="badge badge-info">{prediction?.model_version || 'lgbm_v1'}</span>
              </div>
              <div className="gauge-wrapper">
                <div className="gauge-circle" style={{ '--pct': pct }}>
                  <div className="gauge-inner">
                    <span className="gauge-pct" style={{ color: pct > 70 ? 'var(--accent-red)' : pct > 40 ? 'var(--accent-yellow)' : 'var(--accent-green)' }}>
                      {pct}%
                    </span>
                    <span className="gauge-label">{tr('rain_probability')}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p><span className="text-muted text-sm">{tr('expected_rain')}:</span> <strong>{prediction?.expected_mm ?? 0} mm</strong></p>
                  <p><span className="text-muted text-sm">{tr('category')}:</span> <strong>{prediction ? tr(prediction.category) : '—'}</strong></p>
                  <p><span className="text-muted text-sm">{tr('model_confidence')}:</span> <strong>{prediction?.confidence_pct ?? 0}%</strong></p>
                </div>
              </div>
              {/* Monsoon badge */}
              {monsoon && (
                <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">{tr('monsoon_phase')}</span>
                    <span className={`badge badge-${monsoon.phase}`}>{tr(monsoon.phase)}</span>
                  </div>
                  <p className="text-xs text-muted mt-1">{monsoon.phase_hi}</p>
                  {monsoon.criteria_met?.length > 0 && (
                    <div style={{ marginTop: '0.4rem' }}>
                      {monsoon.criteria_met.slice(0, 2).map((c, i) => (
                        <p key={i} className="text-xs" style={{ color: 'var(--accent-green)' }}>✓ {c}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 24h Trend Chart */}
            <div className="card">
              <div className="card-header"><span className="card-title">📈 {tr('hourly_trend')}</span></div>
              {hourlyChartData ? (
                <div style={{ height: 220 }}>
                  <Line data={hourlyChartData} options={{ ...chartOptions, scales: {
                    ...chartOptions.scales,
                    y: { ...chartOptions.scales.y, title: { display: true, text: 'Probability %', color: '#38bdf8', font: { size: 10 } } },
                    y1: { ...chartOptions.scales.y1, title: { display: true, text: 'mm', color: '#818cf8', font: { size: 10 } } },
                  }}} />
                </div>
              ) : <div className="skeleton" style={{ height: 220 }} />}
            </div>
          </div>

          {/* 7-Day vs 1-MONTH (30 Days) PREDICTION BAR SECTION */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className="card-header" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span className="card-title">
                  📅 {forecastDays === 30 ? (lang === 'hi' ? '1 माह का वर्षा व बुवाई पूर्वानुमान (30 दिन)' : '1-Month Sowing & Rainfall Forecast Bar (30 Days)') : (lang === 'hi' ? '7-दिवसीय मौसम पूर्वानुमान' : '7-Day Daily Forecast')}
                </span>
                <span className="badge badge-info" style={{ marginLeft: '0.5rem' }}>
                  {forecastDays === 30 ? '30 Days Horizon' : '7 Days Horizon'}
                </span>
              </div>

              {/* Toggle Buttons: 7 Days vs 1 Month */}
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button
                  className={`channel-tab ${forecastDays === 7 ? 'active' : ''}`}
                  onClick={() => setForecastDays(7)}
                  style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }}
                >
                  ⚡ {lang === 'hi' ? '7 दिन' : '7 Days'}
                </button>
                <button
                  className={`channel-tab ${forecastDays === 30 ? 'active' : ''}`}
                  onClick={() => setForecastDays(30)}
                  style={{
                    padding: '0.3rem 0.75rem',
                    fontSize: '0.78rem',
                    borderColor: forecastDays === 30 ? 'var(--accent-green)' : 'var(--border-subtle)'
                  }}
                >
                  🗓️ {lang === 'hi' ? '1 माह (30 दिन की योजना)' : '1 Month (30-Day Planning)'}
                </button>
              </div>
            </div>

            {/* 1-Month Sowing Planning Summary Bar */}
            {forecastDays === 30 && (
              <div className="grid-3" style={{ marginBottom: '0.75rem', gap: '0.6rem' }}>
                <div style={{ padding: '0.5rem 0.8rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <p className="text-xs text-muted">{lang === 'hi' ? '30 दिनों में कुल संभावित वर्षा' : '30-Day Total Rainfall Outlook'}</p>
                  <p style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent-blue)' }}>{monthTotalRain.toFixed(1)} mm</p>
                </div>
                <div style={{ padding: '0.5rem 0.8rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <p className="text-xs text-muted">{lang === 'hi' ? 'वर्षा वाले सक्रिय दिन' : 'Expected Wet / Rainy Days'}</p>
                  <p style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent-green)' }}>{monthRainDays} days</p>
                </div>
                <div style={{ padding: '0.5rem 0.8rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <p className="text-xs text-muted">{lang === 'hi' ? 'औसत अधिकतम तापमान' : 'Average Max Temperature'}</p>
                  <p style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent-yellow)' }}>{monthAvgTemp.toFixed(1)}°C</p>
                </div>
              </div>
            )}

            {forecastChartData ? (
              <div style={{ height: forecastDays === 30 ? 250 : 200 }}>
                <Bar data={forecastChartData} options={forecastOptions} />
              </div>
            ) : <div className="skeleton" style={{ height: 200 }} />}
          </div>

          {/* Risk Summary */}
          {risk && (
            <div className="card">
              <div className="card-header">
                <span className="card-title">⚠️ {tr('risk_summary')}</span>
                <span className={`badge badge-${risk.composite_level === 'LOW' ? 'success' : risk.composite_level === 'MODERATE' ? 'warning' : 'danger'}`}>
                  {tr(risk.composite_level)} — {risk.composite_score}/100
                </span>
              </div>
              <div className="grid-4" style={{ gap: '0.6rem' }}>
                {risk.zones?.map(zone => (
                  <div key={zone.hazard} style={{ padding: '0.75rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)' }}>
                    <p className="text-xs text-muted">{zone.hazard}</p>
                    <p className={`font-bold risk-${zone.level}`}>{zone.score}/100</p>
                    <div className="progress-bar" style={{ marginTop: '0.3rem' }}>
                      <div className={`progress-fill ${zone.level === 'LOW' ? 'green' : zone.level === 'HIGH' || zone.level === 'CRITICAL' ? 'red' : 'yellow'}`}
                        style={{ width: `${zone.score}%` }} />
                    </div>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{zone.level}</p>
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
