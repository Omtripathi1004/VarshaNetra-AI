import React, { useEffect, useState } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, AreaChart, Area
} from 'recharts';

const SCORE_COLOR = (s) => s >= 80 ? '#059669' : s >= 60 ? '#d97706' : '#dc2626';

// Multi-crop agronomic climate growth relationship model
const CROP_CLIMATE_DYNAMICS = [
  { id: 'rice', name: 'Paddy (Rice)', opt_temp_min: 22, opt_temp_max: 32, opt_rain_mm: 1200, current_suitability: 92, water_demand_mm: [180, 220, 310, 280, 160, 50], monsoon_supply_mm: [195, 240, 320, 260, 140, 30] },
  { id: 'cotton', name: 'Cotton', opt_temp_min: 21, opt_temp_max: 35, opt_rain_mm: 750, current_suitability: 81, water_demand_mm: [90, 140, 220, 200, 110, 30], monsoon_supply_mm: [110, 160, 190, 180, 90, 20] },
  { id: 'soybean', name: 'Soybean', opt_temp_min: 20, opt_temp_max: 30, opt_rain_mm: 800, current_suitability: 80, water_demand_mm: [80, 130, 210, 190, 90, 20], monsoon_supply_mm: [95, 145, 180, 170, 80, 15] },
  { id: 'maize', name: 'Maize', opt_temp_min: 18, opt_temp_max: 32, opt_rain_mm: 650, current_suitability: 86, water_demand_mm: [70, 120, 190, 170, 80, 20], monsoon_supply_mm: [85, 135, 175, 160, 70, 15] },
  { id: 'groundnut', name: 'Groundnut', opt_temp_min: 22, opt_temp_max: 33, opt_rain_mm: 600, current_suitability: 84, water_demand_mm: [60, 110, 180, 160, 70, 20], monsoon_supply_mm: [80, 120, 160, 150, 60, 15] },
  { id: 'bajra', name: 'Bajra', opt_temp_min: 25, opt_temp_max: 38, opt_rain_mm: 450, current_suitability: 88, water_demand_mm: [50, 90, 140, 120, 50, 10], monsoon_supply_mm: [70, 100, 130, 110, 40, 10] },
  { id: 'sugarcane', name: 'Sugarcane', opt_temp_min: 24, opt_temp_max: 38, opt_rain_mm: 1800, current_suitability: 89, water_demand_mm: [200, 280, 360, 340, 260, 120], monsoon_supply_mm: [210, 290, 340, 320, 220, 80] },
  { id: 'pulses', name: 'Pulses (Arhar)', opt_temp_min: 20, opt_temp_max: 32, opt_rain_mm: 650, current_suitability: 83, water_demand_mm: [60, 100, 160, 150, 70, 20], monsoon_supply_mm: [75, 115, 150, 140, 60, 15] },
  { id: 'wheat', name: 'Wheat (Rabi)', opt_temp_min: 12, opt_temp_max: 24, opt_rain_mm: 400, current_suitability: 76, water_demand_mm: [60, 90, 140, 130, 70, 20], monsoon_supply_mm: [40, 30, 20, 15, 10, 5] },
  { id: 'mustard', name: 'Mustard (Rabi)', opt_temp_min: 14, opt_temp_max: 26, opt_rain_mm: 350, current_suitability: 78, water_demand_mm: [40, 70, 110, 90, 40, 10], monsoon_supply_mm: [30, 20, 15, 10, 10, 5] },
  { id: 'vegetables', name: 'Vegetables', opt_temp_min: 18, opt_temp_max: 30, opt_rain_mm: 700, current_suitability: 85, water_demand_mm: [70, 110, 160, 140, 80, 30], monsoon_supply_mm: [80, 120, 150, 130, 70, 20] },
];

const STAGE_LABELS = ['Land Prep', 'Sowing', 'Vegetative', 'Flowering', 'Grain Fill', 'Harvest'];

export default function AgricultureTab() {
  const { tr, lang, location } = useApp();
  const [data, setData] = useState(null);
  const [season, setSeason] = useState('ALL');
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [selectedStage, setSelectedStage] = useState('sowing');
  const [stageAdvisory, setStageAdvisory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const loc = { lat: location.lat, lon: location.lon, state: location.state, district: location.district };
    Promise.all([
      api.getCropAdvisor(loc, season, 11),
      api.getCropStageAdvisory(selectedCrop, selectedStage, loc).catch(() => ({ data: null })),
    ]).then(([cRes, sRes]) => {
      setData(cRes.data);
      if (sRes?.data) setStageAdvisory(sRes.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [location.lat, location.lon, season, selectedCrop, selectedStage]);

  const activeDynamicCrop = CROP_CLIMATE_DYNAMICS.find(c => c.id === selectedCrop) || CROP_CLIMATE_DYNAMICS[0];

  // Stage-wise water demand vs supply
  const waterDemandChartData = STAGE_LABELS.map((stage, idx) => ({
    stage,
    water_demand_mm: activeDynamicCrop.water_demand_mm[idx],
    monsoon_supply_mm: activeDynamicCrop.monsoon_supply_mm[idx],
  }));

  // Temperature & Rainfall Optimal Correlation Bar Data
  const cropClimateComparisonData = CROP_CLIMATE_DYNAMICS.map(c => ({
    name: c.name,
    suitability: c.current_suitability,
    opt_temp_max: c.opt_temp_max,
    opt_rain_hundred_mm: c.opt_rain_mm / 10,
  }));

  // Sensitivity radar
  const radarData = [
    { subject: 'Thermal Fit', A: 92, fullMark: 100 },
    { subject: 'Rain Correlation', A: 88, fullMark: 100 },
    { subject: 'Soil Saturation', A: 85, fullMark: 100 },
    { subject: 'MJO Alignment', A: 90, fullMark: 100 },
    { subject: 'Pest Resistance', A: 82, fullMark: 100 },
  ];

  return (
    <div className="main-content">
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ background: 'linear-gradient(135deg, #059669, #10b981, #0284c7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0, fontWeight: 800 }}>
          🌾 {lang === 'hi' ? 'फसल मौसम सलाहकार व जलवायु संबंध ग्राफ' : 'Crop Season Advisor & Agro-Climate Response Graphs'}
        </h2>
        <p className="text-muted text-sm" style={{ marginTop: '0.2rem' }}>
          📍 {location.display_name} • {lang === 'hi' ? 'फसल वृद्धि, तापमान, वर्षा और जल मांग का वैज्ञानिक विश्लेषण' : 'Scientific correlation between crop physiology, thermal bounds, and monsoon availability'}
        </p>
      </div>

      {/* 🌟 NEW MULTI-DIMENSIONAL CROP-CLIMATE INTERACTIVE GRAPHS */}
      <div className="grid-2" style={{ gap: '1.2rem', marginBottom: '1.5rem' }}>
        {/* GRAPH 1: CROP WATER REQUIREMENT (ETC) VS MONSOON RAIN SUPPLY */}
        <div className="card" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', padding: '1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', flexWrap: 'wrap', gap: '0.4rem' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.98rem', color: '#0f172a', fontWeight: 800 }}>
                💧 {activeDynamicCrop.name} — {lang === 'hi' ? 'जल मांग (ETc) बनाम मानसून उपलब्धता' : 'Water Demand vs Monsoon Supply'}
              </h4>
              <p className="text-xs text-muted" style={{ margin: '0.1rem 0 0' }}>
                {lang === 'hi' ? 'फसल की 6 विकास अवस्थाओं में मिलीमीटर (mm) जल संतुलन' : 'Stage-wise water requirement across 6 phenological phases'}
              </p>
            </div>
            <select
              className="select"
              style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}
              value={selectedCrop}
              onChange={e => setSelectedCrop(e.target.value)}
            >
              {CROP_CLIMATE_DYNAMICS.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterDemandChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} unit="mm" />
                <Tooltip formatter={(val) => [`${val} mm`, '']} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Bar dataKey="water_demand_mm" name={lang === 'hi' ? 'फसल जल मांग (Demand)' : 'Crop Water Demand'} fill="#0284c7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="monsoon_supply_mm" name={lang === 'hi' ? 'मानसून वर्षा आपूर्ति (Supply)' : 'Monsoon Supply'} fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRAPH 2: CROP CLIMATE SUITABILITY & THERMAL/RAINFALL FIT */}
        <div className="card" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', padding: '1.2rem' }}>
          <div style={{ marginBottom: '0.8rem' }}>
            <h4 style={{ margin: 0, fontSize: '0.98rem', color: '#0f172a', fontWeight: 800 }}>
              🌡️ {lang === 'hi' ? 'फसल-मौसम संबंध व अनुकूलता तुलना' : 'Crop Micro-Climate Fit & Thermal Thresholds'}
            </h4>
            <p className="text-xs text-muted" style={{ margin: '0.1rem 0 0' }}>
              {lang === 'hi' ? 'वर्तमान मौसम में विभिन्न फसलों का अनुकूलता स्कोर व अधिकतम तापमान सीमा' : 'Suitability % vs Upper Thermal Thresholds (°C) for all regional crops'}
            </p>
          </div>

          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cropClimateComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} interval={0} angle={-20} textAnchor="end" height={45} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Area type="monotone" dataKey="suitability" name={lang === 'hi' ? 'अनुकूलता स्कोर (%)' : 'Suitability Score (%)'} stroke="#059669" fill="#dcfce7" />
                <Line type="monotone" dataKey="opt_temp_max" name={lang === 'hi' ? 'अधिकतम तापमान (°C)' : 'Max Thermal Bound (°C)'} stroke="#ea580c" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ALL 11 CROPS & STAGE CONTINGENCY SELECTOR */}
      <div className="card" style={{ marginBottom: '1.5rem', background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
        <div className="card-header">
          <span className="card-title">🌱 {lang === 'hi' ? 'विशिष्ट फसल व अवस्था निर्णय मैट्रिक्स (11 फसलें)' : 'Crop Stage Agronomic Advisory Engine (All 11 Crops)'}</span>
          <span className="badge badge-success">Decision Support System</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', minWidth: '220px' }}>
            <label className="field-label">{lang === 'hi' ? 'फसल चुनें:' : 'Select Crop:'}</label>
            <select className="select" value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)}>
              {CROP_CLIMATE_DYNAMICS.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', minWidth: '220px' }}>
            <label className="field-label">{lang === 'hi' ? 'फसल अवस्था चुनें:' : 'Select Growth Stage:'}</label>
            <select className="select" value={selectedStage} onChange={e => setSelectedStage(e.target.value)}>
              <option value="land_prep">🚜 Land Preparation / खेत तैयारी</option>
              <option value="sowing">🌱 Sowing & Transplanting / बुवाई व रोपाई</option>
              <option value="vegetative">🌿 Vegetative Growth / बढ़वार</option>
              <option value="flowering">🌸 Flowering & Tasseling / फूल अवस्था</option>
              <option value="grain_fill">🌾 Grain Filling / दाना भराव</option>
              <option value="harvesting">✂️ Harvesting / कटाई</option>
            </select>
          </div>
        </div>

        {stageAdvisory && (
          <div style={{ padding: '1rem 1.2rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ background: stageAdvisory.badge_color || '#059669', color: '#fff', padding: '0.35rem 0.9rem', borderRadius: '999px', fontWeight: 800, fontSize: '0.82rem' }}>
                {lang === 'hi' ? stageAdvisory.action_label_hi : stageAdvisory.action_label_en}
              </span>
              <strong style={{ fontSize: '1rem', color: '#0f172a' }}>
                {lang === 'hi' ? stageAdvisory.crop_name_hi : stageAdvisory.crop_name_en} ({lang === 'hi' ? stageAdvisory.stage_name_hi : stageAdvisory.stage_name_en})
              </strong>
            </div>
            <p style={{ margin: '0.35rem 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.55 }}>
              {lang === 'hi' ? stageAdvisory.rationale_hi : stageAdvisory.rationale_en}
            </p>
            <div style={{ fontSize: '0.78rem', color: '#64748b', borderTop: '1px solid #e2e8f0', paddingTop: '0.45rem', marginTop: '0.5rem' }}>
              ⚠️ <strong>{lang === 'hi' ? 'कीट व रोग चेतावनी:' : 'Pest Warning:'}</strong> {lang === 'hi' ? stageAdvisory.pest_warning_hi : stageAdvisory.pest_warning_en}
            </div>
          </div>
        )}
      </div>

      {/* 🌟 EMBEDDED CROP WHAT-IF SIMULATOR LAB */}
      <div className="card" style={{ marginBottom: '1.5rem', background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '16px', padding: '1.2rem' }}>
        <div className="card-header" style={{ marginBottom: '0.8rem' }}>
          <span className="card-title" style={{ color: '#047857' }}>
            🧪 {lang === 'hi' ? `${activeDynamicCrop.name} जलवायु तनाव एवं उत्पादन वृद्धि सिमुलेटर` : `${activeDynamicCrop.name} — Climate Stress & Yield Gain Simulator`}
          </span>
          <span className="badge badge-success">Live Agronomic Physiology</span>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#334155', margin: '0 0 1rem' }}>
          {lang === 'hi'
            ? 'वर्षा में बदलाव, सूखे दिनों की संख्या और तापमान के आधार पर इस फसल की अनुमानित पैदावार व आकस्मिक सलाह देखें:'
            : `Test how rainfall anomalies, dry spells, and thermal shifts impact ${activeDynamicCrop.name} productivity and agronomic resilience:`}
        </p>

        <CropSimInline crop={activeDynamicCrop.name} lang={lang} location={location} />
      </div>

      {/* CROP CARDS CATALOG WITH RADAR SENSITIVITY */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: 800 }}>
          {lang === 'hi' ? 'क्षेत्रीय फसल उपयुक्तता रैंकिंग (Top Crops)' : 'Regional Crop Suitability Catalog'}
        </h3>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['ALL', 'KHARIF', 'RABI', 'ZAID'].map(s => (
            <button
              key={s}
              className={`channel-tab ${season === s ? 'active' : ''}`}
              onClick={() => setSeason(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {(data || []).map((crop, idx) => (
          <div key={idx} className="card" style={{ padding: '1rem', background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{crop.icon || '🌾'}</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.96rem', color: '#0f172a', fontWeight: 800 }}>
                    {lang === 'hi' ? crop.name_hi : crop.name_en}
                  </h4>
                  <span className="text-xs text-muted">{crop.season} • {crop.sowing_window}</span>
                </div>
              </div>
              <span className={`crop-score ${crop.suitability_score >= 80 ? 'high' : crop.suitability_score >= 60 ? 'medium' : 'low'}`}>
                {crop.suitability_score}%
              </span>
            </div>

            <div className="progress-bar" style={{ margin: '0.5rem 0' }}>
              <div className="progress-fill" style={{ width: `${crop.suitability_score}%`, background: SCORE_COLOR(crop.suitability_score) }} />
            </div>

            <p style={{ fontSize: '0.78rem', color: '#334155', margin: '0.4rem 0 0.6rem', lineHeight: 1.45 }}>
              {lang === 'hi' ? crop.advice_hi : crop.advice_en}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '0.4rem' }}>
              <span>⏱️ {crop.duration_days} days</span>
              <span>💰 ₹{crop.market_price_inr_qtl}/qtl</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CropSimInline({ crop, lang, location }) {
  const [rainPct, setRainPct] = useState(15);
  const [dryDays, setDryDays] = useState(2);
  const [tempC, setTempC] = useState(0.5);
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSim = async () => {
    setLoading(true);
    const r = await api.runSimulation(location, crop, rainPct, dryDays, tempC, 14);
    setRes(r.data);
    setLoading(false);
  };

  useEffect(() => {
    handleSim();
  }, [crop, rainPct, dryDays, tempC]);

  return (
    <div>
      <div className="grid-3" style={{ gap: '0.8rem', marginBottom: '0.8rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label className="field-label">{lang === 'hi' ? 'वर्षा विचलन:' : 'Rainfall Anomaly:'}</label>
            <strong style={{ fontSize: '0.8rem', color: rainPct >= 0 ? '#059669' : '#dc2626' }}>{rainPct >= 0 ? `+${rainPct}` : rainPct}%</strong>
          </div>
          <input type="range" min="-50" max="50" step="5" value={rainPct} onChange={e => setRainPct(Number(e.target.value))} style={{ width: '100%', accentColor: '#059669' }} />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label className="field-label">{lang === 'hi' ? 'शुष्क दिन:' : 'Consecutive Dry Days:'}</label>
            <strong style={{ fontSize: '0.8rem', color: dryDays > 6 ? '#dc2626' : '#0284c7' }}>{dryDays} days</strong>
          </div>
          <input type="range" min="0" max="18" step="1" value={dryDays} onChange={e => setDryDays(Number(e.target.value))} style={{ width: '100%', accentColor: '#ea580c' }} />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label className="field-label">{lang === 'hi' ? 'तापमान वृद्धि:' : 'Temp Shift:'}</label>
            <strong style={{ fontSize: '0.8rem', color: tempC > 2 ? '#dc2626' : '#d97706' }}>+{tempC}°C</strong>
          </div>
          <input type="range" min="0" max="5" step="0.5" value={tempC} onChange={e => setTempC(Number(e.target.value))} style={{ width: '100%', accentColor: '#d97706' }} />
        </div>
      </div>

      {res && (
        <div style={{ background: '#ffffff', padding: '0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
          <div className="grid-3" style={{ gap: '0.6rem', marginBottom: '0.6rem' }}>
            <div style={{ padding: '0.5rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span className="text-xs text-muted font-bold">{lang === 'hi' ? 'फसल तनाव' : 'Crop Stress'}</span>
              <p style={{ fontSize: '1.2rem', fontWeight: 800, color: res.crop_stress_index_pct > 50 ? '#dc2626' : '#059669', margin: '0.1rem 0' }}>
                {res.crop_stress_index_pct}%
              </p>
            </div>

            <div style={{ padding: '0.5rem', background: res.yield_impact_pct > 0 ? '#f0fdf4' : '#fef2f2', borderRadius: '8px', border: res.yield_impact_pct > 0 ? '1.5px solid #86efac' : '1px solid #fca5a5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="text-xs text-muted font-bold">{lang === 'hi' ? 'उपज प्रभाव' : 'Yield Impact'}</span>
                {res.yield_impact_pct > 0 && <span className="badge badge-success" style={{ fontSize: '0.62rem' }}>🎉 {lang === 'hi' ? 'वृद्धि' : 'Gain'}</span>}
              </div>
              <p style={{ fontSize: '1.2rem', fontWeight: 800, color: res.yield_impact_pct > 0 ? '#059669' : '#dc2626', margin: '0.1rem 0' }}>
                {res.yield_impact_pct > 0 ? `+${res.yield_impact_pct}` : res.yield_impact_pct}%
              </p>
            </div>

            <div style={{ padding: '0.5rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span className="text-xs text-muted font-bold">{lang === 'hi' ? 'प्रक्षेपित नमी' : 'Soil Moisture'}</span>
              <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0284c7', margin: '0.1rem 0' }}>
                {res.soil_moisture_projected} m³/m³
              </p>
            </div>
          </div>

          <div style={{ padding: '0.6rem 0.8rem', background: res.yield_impact_pct > 0 ? '#f0fdf4' : '#f8fafc', borderRadius: '8px', borderLeft: `4px solid ${res.yield_impact_pct > 0 ? '#059669' : '#ea580c'}`, fontSize: '0.8rem', color: '#1e293b' }}>
            <strong>{lang === 'hi' ? 'फसल आकस्मिक सलाह:' : 'Contingency Guidance:'}</strong>{' '}
            {lang === 'hi' ? res.recommended_contingency_hi : res.recommended_contingency_en}
          </div>
        </div>
      )}
    </div>
  );
}
