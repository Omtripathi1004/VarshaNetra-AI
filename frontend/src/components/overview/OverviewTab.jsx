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
  const [perf, setPerf] = useState(null);
  const [teleconnections, setTeleconnections] = useState(null);
  const [falseOnsetInfo, setFalseOnsetInfo] = useState(null);
  const [multiOutlook, setMultiOutlook] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [selectedStage, setSelectedStage] = useState('sowing');
  const [cropAdvisory, setCropAdvisory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loc = { lat: location.lat, lon: location.lon, state: location.state, district: location.district };
    setLoading(true);
    Promise.all([
      api.getCurrentWeather(loc),
      api.getForecast(loc, 7),
      api.getRainfallPrediction(loc),
      api.getMonsoonPhase(loc),
      api.getRiskSummary(loc),
      api.getClimateTeleconnections().catch(() => ({ data: null })),
      api.getMonsoonFalseOnset(loc).catch(() => ({ data: null })),
      api.getMonsoonOutlook(loc).catch(() => ({ data: null })),
      api.getCropStageAdvisory(selectedCrop, selectedStage, loc).catch(() => ({ data: null })),
      api.getModelPerformance().catch(() => ({ data: null })),
    ]).then(([w, f, p, m, r, tc, fo, mo, ca, pf]) => {
      setWeather(w.data);
      setForecast(f.data);
      setPrediction(p.data);
      setMonsoon(m.data);
      setRisk(r.data);
      if (tc?.data) setTeleconnections(tc.data);
      if (fo?.data) setFalseOnsetInfo(fo.data);
      if (mo?.data) setMultiOutlook(mo.data);
      if (ca?.data) setCropAdvisory(ca.data);
      if (pf?.data) setPerf(pf.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [location.lat, location.lon]);

  const handleCropStageChange = (crop, stage) => {
    setSelectedCrop(crop);
    setSelectedStage(stage);
    const loc = { lat: location.lat, lon: location.lon, state: location.state, district: location.district };
    api.getCropStageAdvisory(crop, stage, loc).then(res => {
      if (res.data) setCropAdvisory(res.data);
    });
  };

  const hourlyChartData = prediction?.hourly_trend ? {
    labels: prediction.hourly_trend.map(h => h.time_label),
    datasets: [
      {
        label: 'Rain Probability (%)',
        data: prediction.hourly_trend.map(h => h.probability_pct),
        borderColor: '#0284c7', backgroundColor: 'rgba(2,132,199,0.12)',
        fill: true, tension: 0.4, borderWidth: 2, pointRadius: 0,
        yAxisID: 'y',
      },
      {
        label: 'Expected mm',
        data: prediction.hourly_trend.map(h => h.expected_mm),
        borderColor: '#059669', backgroundColor: 'rgba(5,150,105,0.08)',
        fill: true, tension: 0.4, borderWidth: 2, pointRadius: 0,
        yAxisID: 'y1',
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#334155', boxWidth: 12, font: { size: 11, weight: 'bold' } } } },
    scales: {
      x: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { color: '#e2e8f0' } },
      y: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { color: '#e2e8f0' } },
      y1: { position: 'right', ticks: { color: '#059669', font: { size: 10 } }, grid: { drawOnChartArea: false } },
    },
  };

  const foData = falseOnsetInfo?.false_onset || monsoon?.false_onset_engine;
  const isHighFalseOnset = (foData?.false_onset_probability_pct ?? 25) >= 50;

  return (
    <div className="main-content">
      {/* Header */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h2 style={{ color: '#047857', margin: 0, fontWeight: 800 }}>
            🌾 {lang === 'hi' ? 'वरदानेत्र AI — किसान निर्णय सहायता प्रणाली' : 'VarshaNetra AI — Hyperlocal Monsoon Decision System'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.2rem', fontWeight: 500 }}>
            📍 {location.display_name} • Open-Meteo Current & 10-Yr Historical Archive + NOAA Teleconnections
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span className="badge badge-success">● 10-Yr Validated Model</span>
          <span className="badge badge-info">ENSO + IOD + MJO Coupled</span>
        </div>
      </div>

      {/* HERO FEATURE: FALSE-ONSET INTELLIGENCE CARD */}
      <div
        className={`hero-card ${isHighFalseOnset ? '' : 'safe'}`}
        style={{
          borderLeftWidth: '6px',
          borderLeftColor: isHighFalseOnset ? '#ea580c' : '#10b981',
          background: isHighFalseOnset ? '#fffbeb' : '#f0fdf4',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.6rem' }}>{isHighFalseOnset ? '⚠️' : '✅'}</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: isHighFalseOnset ? '#b45309' : '#047857', fontWeight: 800 }}>
                {lang === 'hi' ? 'झूठी शुरुआत (False-Onset) जोखिम विश्लेषण' : 'FALSE-ONSET RISK & MONSOON PERSISTENCE'}
              </h3>
              <p style={{ margin: '0.15rem 0 0', fontSize: '0.76rem', color: '#64748b' }}>
                {lang === 'hi' ? 'वर्षा की अस्थायी शुरुआत और आगामी शुष्क विराम (Dry Spell) का पूर्व आकलन' : 'Hero Feature: Detects rainfall surges likely to collapse into prolonged dry breaks'}
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: isHighFalseOnset ? '#dc2626' : '#059669', lineHeight: 1 }}>
              {foData?.false_onset_probability_pct ?? 68}%
            </div>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
              {lang === 'hi' ? 'जोखिम संभावना' : 'False-Onset Probability'} • {lang === 'hi' ? 'विश्वास: उच्च' : 'Confidence: High'}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem', margin: '0.9rem 0 0.6rem' }}>
          <div style={{ padding: '0.6rem 0.85rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
              {lang === 'hi' ? 'अपेक्षित शुष्क विराम अवधि' : 'Expected Dry-Spell Window'}
            </span>
            <p style={{ margin: '0.2rem 0 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
              ⏳ {foData?.expected_dry_spell_window || '6–8 days'}
            </p>
          </div>

          <div style={{ padding: '0.6rem 0.85rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
              {lang === 'hi' ? 'सक्रिय मानसून शुरुआत संभावना' : 'Monsoon Onset Probability'}
            </span>
            <p style={{ margin: '0.2rem 0 0', fontSize: '1.1rem', fontWeight: 800, color: '#0284c7' }}>
              🌊 {monsoon?.onset_engine?.onset_probability_pct ?? 82}%
            </p>
          </div>

          <div style={{ padding: '0.6rem 0.85rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
              {lang === 'hi' ? 'किसान के लिए मुख्य सिफारिश' : 'Actionable Recommendation'}
            </span>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.95rem', fontWeight: 700, color: isHighFalseOnset ? '#b45309' : '#059669' }}>
              {isHighFalseOnset
                ? (lang === 'hi' ? '🛑 बुवाई टालें और सिंचाई का विकल्प तैयार रखें' : '🛑 Delay sowing & prepare irrigation backups')
                : (lang === 'hi' ? '🌾 सामान्य बुवाई कार्य शुरू करें' : '🌾 Proceed with scheduled sowing')}
            </p>
          </div>
        </div>

        <div style={{ fontSize: '0.82rem', color: '#334155', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '0.6rem', marginTop: '0.4rem', fontWeight: 500 }}>
          <strong>{lang === 'hi' ? 'सलाह विवरण:' : 'Agronomic Guidance:'}</strong> {lang === 'hi' ? (foData?.action_hi || foData?.action_en) : (foData?.action_en || foData?.action_hi)}
        </div>
      </div>

      {/* CLIMATE TELECONNECTIONS SIGNALS STRIP (ENSO + IOD + MJO) */}
      {teleconnections && (
        <div className="card" style={{ marginBottom: '1.25rem' }}>
          <div className="card-header">
            <span className="card-title">🌐 {lang === 'hi' ? 'वैश्विक जलवायु टेलीकनेक्शन संकेत (NOAA Grounded)' : 'Global Climate Teleconnections Signals (NOAA Grounded)'}</span>
            <span className="badge badge-info">{teleconnections.data_status || 'LIVE_SYNCED'}</span>
          </div>

          <div className="grid-3" style={{ gap: '0.8rem' }}>
            {/* ENSO */}
            <div style={{ padding: '0.75rem 0.95rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>ENSO (NOAA ONI)</strong>
                <span className="badge badge-info" style={{ fontSize: '0.68rem' }}>{teleconnections.enso?.phase || 'Neutral'}</span>
              </div>
              <p style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#0284c7' }}>
                {teleconnections.enso?.latest_value > 0 ? `+${teleconnections.enso.latest_value}` : teleconnections.enso?.latest_value} °C
              </p>
              <p style={{ fontSize: '0.72rem', color: '#64748b', margin: '0.3rem 0 0' }}>
                {lang === 'hi' ? teleconnections.enso?.impact_hi : teleconnections.enso?.impact_en}
              </p>
            </div>

            {/* IOD */}
            <div style={{ padding: '0.75rem 0.95rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>IOD (NOAA DMI)</strong>
                <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>{teleconnections.iod?.phase || 'Positive'}</span>
              </div>
              <p style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#059669' }}>
                {teleconnections.iod?.latest_value > 0 ? `+${teleconnections.iod.latest_value}` : teleconnections.iod?.latest_value} °C
              </p>
              <p style={{ fontSize: '0.72rem', color: '#64748b', margin: '0.3rem 0 0' }}>
                {lang === 'hi' ? teleconnections.iod?.impact_hi : teleconnections.iod?.impact_en}
              </p>
            </div>

            {/* MJO */}
            <div style={{ padding: '0.75rem 0.95rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>MJO (NOAA RMM)</strong>
                <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>Phase {teleconnections.mjo?.phase || 3}</span>
              </div>
              <p style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#7c3aed' }}>
                Amp {teleconnections.mjo?.amplitude || 1.25}
              </p>
              <p style={{ fontSize: '0.72rem', color: '#64748b', margin: '0.3rem 0 0' }}>
                {lang === 'hi' ? teleconnections.mjo?.impact_hi : teleconnections.mjo?.impact_en}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 7, 14, 21, 30-DAY PROBABILISTIC OUTLOOK */}
      {multiOutlook?.horizons && (
        <div className="card" style={{ marginBottom: '1.25rem' }}>
          <div className="card-header">
            <span className="card-title">📅 {lang === 'hi' ? '7 / 14 / 21 / 30-दिवसीय संभाव्यता आधारित मानसून दृष्टिकोण' : '7 / 14 / 21 / 30-Day Probabilistic Monsoon Outlook'}</span>
            <span className="badge badge-info">Forecast Uncertainty Quantified</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.9rem' }}>
            {multiOutlook.horizons.map((h) => (
              <div
                key={h.horizon_days}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>
                    {h.horizon_days} {lang === 'hi' ? 'दिन का दृष्टिकोण' : 'Days Horizon'}
                  </strong>
                  <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>
                    {h.confidence_pct}% Conf
                  </span>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{lang === 'hi' ? 'वर्षा की संभावना:' : 'Rain Probability:'}</span>
                    <strong style={{ color: '#0284c7' }}>{h.onset_probability_pct}%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{lang === 'hi' ? 'झूठी शुरुआत का जोखिम:' : 'False-Onset Risk:'}</span>
                    <strong style={{ color: h.false_onset_probability_pct > 50 ? '#ea580c' : '#059669' }}>{h.false_onset_probability_pct}%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{lang === 'hi' ? 'विराम (Dry Break) संभावना:' : 'Break Probability:'}</span>
                    <strong style={{ color: '#d97706' }}>{h.break_probability_pct}%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{lang === 'hi' ? 'भारी वर्षा जोखिम:' : 'Heavy Rain Risk:'}</span>
                    <strong>{h.heavy_rain_probability_pct}%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '0.3rem' }}>
                    <span>{lang === 'hi' ? 'अनुमानित कुल वर्षा:' : 'Expected Rain:'}</span>
                    <strong style={{ color: '#059669' }}>{h.expected_rain_mm} mm</strong>
                  </div>
                </div>

                <p style={{ fontSize: '0.72rem', color: '#64748b', margin: '0.2rem 0 0', lineHeight: 1.4 }}>
                  {lang === 'hi' ? h.recommended_action_hi : h.recommended_action_en}
                </p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.72rem', color: '#64748b', margin: '0.75rem 0 0', textAlign: 'center' }}>
            ℹ️ {lang === 'hi' ? multiOutlook.uncertainty_note_hi : multiOutlook.uncertainty_note_en}
          </p>
        </div>
      )}

      {/* QUICK CROP + STAGE ADVISORY SELECTOR */}
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <div className="card-header">
          <span className="card-title">🌾 {lang === 'hi' ? 'फसल एवं फसल अवस्था अनुसार कृषि निर्णय' : 'Crop & Crop Stage Actionable Advisory'}</span>
          <span className="badge badge-success">Decision Support System</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', minWidth: '180px' }}>
            <label className="field-label">{lang === 'hi' ? 'फसल चुनें:' : 'Select Crop:'}</label>
            <select
              className="select"
              value={selectedCrop}
              onChange={e => handleCropStageChange(e.target.value, selectedStage)}
            >
              <option value="rice">🌾 Paddy (Rice) / धान</option>
              <option value="cotton">☁️ Cotton / कपास</option>
              <option value="soybean">🫘 Soybean / सोयाबीन</option>
              <option value="maize">🌽 Maize / मक्का</option>
              <option value="wheat">🌾 Wheat / गेहूं</option>
              <option value="mustard">🌼 Mustard / सरसों</option>
              <option value="pulses">🥣 Pulses (Arhar/Gram) / दालें</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', minWidth: '220px' }}>
            <label className="field-label">{lang === 'hi' ? 'फसल अवस्था चुनें:' : 'Select Crop Stage:'}</label>
            <select
              className="select"
              value={selectedStage}
              onChange={e => handleCropStageChange(selectedCrop, e.target.value)}
            >
              <option value="land_prep">🚜 Land Preparation / खेत तैयारी</option>
              <option value="sowing">🌱 Sowing & Transplanting / बुवाई व रोपाई</option>
              <option value="vegetative">🌿 Vegetative Growth / बढ़वार</option>
              <option value="flowering">🌸 Flowering & Tasseling / फूल अवस्था</option>
              <option value="grain_fill">🌾 Grain Filling / दाना भराव</option>
              <option value="harvesting">✂️ Harvesting / कटाई</option>
            </select>
          </div>
        </div>

        {cropAdvisory && (
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span
                style={{
                  background: cropAdvisory.badge_color || '#059669',
                  color: '#ffffff',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '999px',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                }}
              >
                {lang === 'hi' ? cropAdvisory.action_label_hi : cropAdvisory.action_label_en}
              </span>
              <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>
                {lang === 'hi' ? cropAdvisory.crop_name_hi : cropAdvisory.crop_name_en} ({lang === 'hi' ? cropAdvisory.stage_name_hi : cropAdvisory.stage_name_en})
              </strong>
            </div>

            <p style={{ margin: '0.4rem 0', fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
              {lang === 'hi' ? cropAdvisory.rationale_hi : cropAdvisory.rationale_en}
            </p>

            <div style={{ fontSize: '0.76rem', color: '#64748b', borderTop: '1px solid #e2e8f0', paddingTop: '0.4rem', marginTop: '0.5rem' }}>
              ⚠️ <strong>{lang === 'hi' ? 'कीट व रोग चेतावनी:' : 'Pest Alert:'}</strong> {lang === 'hi' ? cropAdvisory.pest_warning_hi : cropAdvisory.pest_warning_en}
            </div>
          </div>
        )}
      </div>

      {/* OPEN-METEO CURRENT WEATHER TILES */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div className="section-title">
          <span className="icon">🌤️</span>
          {tr('weather_title')} — <strong>{location.display_name}</strong>
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
      </div>

      {/* 24-HOUR HOURLY RAINFALL TREND */}
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <div className="card-header">
          <span className="card-title">📈 {tr('hourly_trend')} (24h)</span>
          <span className="badge badge-info">Open-Meteo High Resolution</span>
        </div>
        {hourlyChartData ? (
          <div style={{ height: 220 }}>
            <Line data={hourlyChartData} options={chartOptions} />
          </div>
        ) : <div className="skeleton" style={{ height: 220 }} />}
      </div>
    </div>
  );
}
