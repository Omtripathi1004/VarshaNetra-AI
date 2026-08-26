import React, { useEffect, useState, useMemo } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, AreaChart, Area, Line
} from 'recharts';

const SCORE_COLOR = (s) => s >= 80 ? '#059669' : s >= 60 ? '#d97706' : '#dc2626';

// Multi-crop agronomic climate growth relationship model (22+ Indian Regional Crops)
const CROP_CLIMATE_DYNAMICS = [
  // Kharif
  { id: 'rice', name: 'Paddy (Rice)', season: 'KHARIF', opt_temp_min: 22, opt_temp_max: 32, opt_rain_mm: 1200, current_suitability: 92, water_demand_mm: [180, 220, 310, 280, 160, 50], monsoon_supply_mm: [195, 240, 320, 260, 140, 30] },
  { id: 'cotton', name: 'Cotton', season: 'KHARIF', opt_temp_min: 21, opt_temp_max: 35, opt_rain_mm: 750, current_suitability: 83, water_demand_mm: [90, 140, 220, 200, 110, 30], monsoon_supply_mm: [110, 160, 190, 180, 90, 20] },
  { id: 'soybean', name: 'Soybean', season: 'KHARIF', opt_temp_min: 20, opt_temp_max: 30, opt_rain_mm: 800, current_suitability: 81, water_demand_mm: [80, 130, 210, 190, 90, 20], monsoon_supply_mm: [95, 145, 180, 170, 80, 15] },
  { id: 'maize', name: 'Maize (Corn)', season: 'KHARIF', opt_temp_min: 18, opt_temp_max: 32, opt_rain_mm: 650, current_suitability: 88, water_demand_mm: [70, 120, 190, 170, 80, 20], monsoon_supply_mm: [85, 135, 175, 160, 70, 15] },
  { id: 'groundnut', name: 'Groundnut', season: 'KHARIF', opt_temp_min: 22, opt_temp_max: 33, opt_rain_mm: 600, current_suitability: 84, water_demand_mm: [60, 110, 180, 160, 70, 20], monsoon_supply_mm: [80, 120, 160, 150, 60, 15] },
  { id: 'bajra', name: 'Bajra (Pearl Millet)', season: 'KHARIF', opt_temp_min: 25, opt_temp_max: 38, opt_rain_mm: 450, current_suitability: 89, water_demand_mm: [50, 90, 140, 120, 50, 10], monsoon_supply_mm: [70, 100, 130, 110, 40, 10] },
  { id: 'jowar', name: 'Jowar (Sorghum)', season: 'KHARIF', opt_temp_min: 24, opt_temp_max: 38, opt_rain_mm: 450, current_suitability: 85, water_demand_mm: [55, 95, 150, 130, 60, 15], monsoon_supply_mm: [75, 105, 135, 115, 45, 10] },
  { id: 'sugarcane', name: 'Sugarcane', season: 'KHARIF', opt_temp_min: 24, opt_temp_max: 38, opt_rain_mm: 1800, current_suitability: 87, water_demand_mm: [200, 280, 360, 340, 260, 120], monsoon_supply_mm: [210, 290, 340, 320, 220, 80] },
  { id: 'pulses', name: 'Pigeon Pea (Arhar / Tur)', season: 'KHARIF', opt_temp_min: 20, opt_temp_max: 32, opt_rain_mm: 650, current_suitability: 82, water_demand_mm: [60, 100, 160, 150, 70, 20], monsoon_supply_mm: [75, 115, 150, 140, 60, 15] },
  { id: 'ragi', name: 'Finger Millet (Ragi)', season: 'KHARIF', opt_temp_min: 20, opt_temp_max: 34, opt_rain_mm: 600, current_suitability: 88, water_demand_mm: [50, 85, 135, 115, 55, 15], monsoon_supply_mm: [70, 100, 130, 110, 50, 10] },
  { id: 'urad', name: 'Urad (Black Gram)', season: 'KHARIF', opt_temp_min: 22, opt_temp_max: 35, opt_rain_mm: 500, current_suitability: 80, water_demand_mm: [55, 90, 145, 130, 60, 15], monsoon_supply_mm: [70, 110, 140, 130, 55, 15] },
  { id: 'jute', name: 'Jute', season: 'KHARIF', opt_temp_min: 24, opt_temp_max: 37, opt_rain_mm: 1300, current_suitability: 86, water_demand_mm: [120, 180, 260, 240, 150, 40], monsoon_supply_mm: [140, 200, 270, 230, 130, 30] },
  { id: 'tea', name: 'Tea Plantation', season: 'KHARIF', opt_temp_min: 18, opt_temp_max: 30, opt_rain_mm: 1800, current_suitability: 90, water_demand_mm: [140, 200, 280, 260, 160, 60], monsoon_supply_mm: [160, 220, 300, 280, 180, 80] },
  { id: 'coffee', name: 'Coffee Plantation', season: 'KHARIF', opt_temp_min: 15, opt_temp_max: 28, opt_rain_mm: 1600, current_suitability: 87, water_demand_mm: [120, 180, 240, 220, 140, 50], monsoon_supply_mm: [140, 200, 260, 240, 150, 60] },
  { id: 'coconut', name: 'Coconut Palm', season: 'KHARIF', opt_temp_min: 22, opt_temp_max: 34, opt_rain_mm: 1400, current_suitability: 89, water_demand_mm: [100, 150, 220, 200, 120, 40], monsoon_supply_mm: [120, 170, 240, 210, 130, 50] },
  { id: 'rubber', name: 'Natural Rubber', season: 'KHARIF', opt_temp_min: 24, opt_temp_max: 35, opt_rain_mm: 2000, current_suitability: 88, water_demand_mm: [150, 220, 300, 280, 180, 70], monsoon_supply_mm: [170, 240, 320, 300, 200, 90] },
  { id: 'mango', name: 'Mango Orchard', season: 'KHARIF', opt_temp_min: 20, opt_temp_max: 38, opt_rain_mm: 800, current_suitability: 85, water_demand_mm: [70, 110, 160, 140, 80, 30], monsoon_supply_mm: [80, 120, 150, 130, 70, 20] },
  { id: 'banana', name: 'Banana Plantation', season: 'KHARIF', opt_temp_min: 20, opt_temp_max: 36, opt_rain_mm: 1500, current_suitability: 89, water_demand_mm: [130, 190, 270, 250, 160, 60], monsoon_supply_mm: [150, 210, 280, 260, 170, 70] },

  // Rabi
  { id: 'wheat', name: 'Wheat', season: 'RABI', opt_temp_min: 12, opt_temp_max: 24, opt_rain_mm: 400, current_suitability: 88, water_demand_mm: [60, 90, 140, 130, 70, 20], monsoon_supply_mm: [40, 30, 20, 15, 10, 5] },
  { id: 'mustard', name: 'Mustard (Sarson)', season: 'RABI', opt_temp_min: 14, opt_temp_max: 26, opt_rain_mm: 350, current_suitability: 89, water_demand_mm: [40, 70, 110, 90, 40, 10], monsoon_supply_mm: [30, 20, 15, 10, 10, 5] },
  { id: 'chickpea', name: 'Chickpea (Chana)', season: 'RABI', opt_temp_min: 12, opt_temp_max: 28, opt_rain_mm: 300, current_suitability: 85, water_demand_mm: [45, 75, 120, 100, 45, 10], monsoon_supply_mm: [35, 25, 15, 10, 10, 5] },
  { id: 'lentil', name: 'Lentil (Masoor)', season: 'RABI', opt_temp_min: 12, opt_temp_max: 26, opt_rain_mm: 280, current_suitability: 86, water_demand_mm: [40, 70, 115, 95, 40, 10], monsoon_supply_mm: [30, 25, 15, 10, 10, 5] },
  { id: 'potato', name: 'Potato (Aloo)', season: 'RABI', opt_temp_min: 12, opt_temp_max: 25, opt_rain_mm: 300, current_suitability: 86, water_demand_mm: [50, 80, 130, 110, 50, 15], monsoon_supply_mm: [30, 20, 15, 10, 10, 5] },
  { id: 'barley', name: 'Barley (Jau)', season: 'RABI', opt_temp_min: 10, opt_temp_max: 24, opt_rain_mm: 250, current_suitability: 84, water_demand_mm: [40, 65, 105, 90, 40, 10], monsoon_supply_mm: [30, 20, 15, 10, 10, 5] },
  { id: 'onion', name: 'Onion & Garlic', season: 'RABI', opt_temp_min: 14, opt_temp_max: 28, opt_rain_mm: 350, current_suitability: 83, water_demand_mm: [50, 85, 135, 115, 55, 15], monsoon_supply_mm: [35, 25, 20, 15, 10, 5] },
  { id: 'tomato', name: 'Tomato', season: 'RABI', opt_temp_min: 15, opt_temp_max: 30, opt_rain_mm: 400, current_suitability: 87, water_demand_mm: [60, 95, 140, 120, 65, 20], monsoon_supply_mm: [40, 30, 25, 20, 10, 5] },

  // Zaid
  { id: 'sunflower', name: 'Sunflower', season: 'ZAID', opt_temp_min: 18, opt_temp_max: 34, opt_rain_mm: 350, current_suitability: 87, water_demand_mm: [60, 95, 145, 125, 60, 15], monsoon_supply_mm: [50, 40, 30, 25, 15, 10] },
  { id: 'moong', name: 'Moong (Green Gram)', season: 'ZAID', opt_temp_min: 22, opt_temp_max: 36, opt_rain_mm: 300, current_suitability: 91, water_demand_mm: [45, 75, 115, 95, 40, 10], monsoon_supply_mm: [50, 45, 35, 25, 15, 10] },
  { id: 'cucurbits', name: 'Watermelon & Melons', season: 'ZAID', opt_temp_min: 24, opt_temp_max: 38, opt_rain_mm: 200, current_suitability: 88, water_demand_mm: [40, 70, 110, 90, 35, 10], monsoon_supply_mm: [40, 35, 25, 20, 10, 5] },

];

const STAGE_LABELS = ['Land Prep', 'Sowing', 'Vegetative', 'Flowering', 'Grain Fill', 'Harvest'];

export default function AgricultureTab() {
  const { tr, lang, location } = useApp();
  const [data, setData] = useState([]);
  const [season, setSeason] = useState('ALL');
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [selectedStage, setSelectedStage] = useState('sowing');
  const [stageAdvisory, setStageAdvisory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch crop recommendations and stage advisory whenever location, season, or crop selection changes
  useEffect(() => {
    setLoading(true);
    const loc = { lat: location.lat, lon: location.lon, state: location.state, district: location.district };
    Promise.all([
      api.getCropAdvisor(loc, season, 30),
      api.getCropStageAdvisory(selectedCrop, selectedStage, loc).catch(() => ({ data: null })),
    ]).then(([cRes, sRes]) => {
      if (cRes?.data) {
        setData(cRes.data);
      }
      if (sRes?.data) {
        setStageAdvisory(sRes.data);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [location.lat, location.lon, season, selectedCrop, selectedStage]);

  const activeDynamicCrop = useMemo(() => {
    return CROP_CLIMATE_DYNAMICS.find(c => c.id === selectedCrop) || CROP_CLIMATE_DYNAMICS[0];
  }, [selectedCrop]);

  // Stage-wise water demand vs supply
  const waterDemandChartData = useMemo(() => {
    return STAGE_LABELS.map((stage, idx) => ({
      stage,
      water_demand_mm: activeDynamicCrop.water_demand_mm[idx],
      monsoon_supply_mm: activeDynamicCrop.monsoon_supply_mm[idx],
    }));
  }, [activeDynamicCrop]);

  // Temperature & Rainfall Optimal Correlation Bar Data filtered by season if selected
  const cropClimateComparisonData = useMemo(() => {
    const list = season === 'ALL'
      ? CROP_CLIMATE_DYNAMICS
      : CROP_CLIMATE_DYNAMICS.filter(c => c.season === season);

    return list.slice(0, 10).map(c => ({
      name: c.name,
      suitability: c.current_suitability,
      opt_temp_max: c.opt_temp_max,
      opt_rain_hundred_mm: c.opt_rain_mm / 10,
    }));
  }, [season]);

  const SEASON_OPTIONS = [
    { key: 'ALL', icon: '🌾', label_en: 'All Seasons', label_hi: 'सभी मौसम', color: '#059669' },
    { key: 'KHARIF', icon: '🌧️', label_en: 'Kharif (Monsoon)', label_hi: 'खरीफ (मानसून)', color: '#0284c7' },
    { key: 'RABI', icon: '❄️', label_en: 'Rabi (Winter)', label_hi: 'रबी (शीतकालीन)', color: '#d97706' },
    { key: 'ZAID', icon: '☀️', label_en: 'Zaid (Summer)', label_hi: 'जायद (ग्रीष्मकालीन)', color: '#ea580c' },
  ];

  return (
    <div className="main-content">
      {/* Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ background: 'linear-gradient(135deg, #059669, #10b981, #0284c7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0, fontWeight: 800 }}>
          🌾 {lang === 'hi' ? 'फसल मौसम सलाहकार व कृषि जलवायु विश्लेषण' : 'Crop Season Advisor & Agro-Climate Response Center'}
        </h2>
        <p className="text-muted text-sm" style={{ marginTop: '0.2rem' }}>
          📍 {location.display_name} • {lang === 'hi' ? '22+ भारतीय प्रमुख फसलों का जल संतुलन, तापमान व विकास अवस्था विश्लेषण' : 'Scientific correlation between crop physiology, water budget, and seasonal suitability'}
        </p>
      </div>

      {/* MULTI-DIMENSIONAL CROP-CLIMATE INTERACTIVE GRAPHS */}
      <div className="grid-2" style={{ gap: '1.2rem', marginBottom: '1.5rem' }}>
        {/* GRAPH 1: CROP WATER REQUIREMENT (ETC) VS MONSOON RAIN SUPPLY */}
        <div className="card" style={{ background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)', padding: '1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', flexWrap: 'wrap', gap: '0.4rem' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.98rem', color: '#f1f5f9', fontWeight: 800 }}>
                💧 {activeDynamicCrop.name} — {lang === 'hi' ? 'जल मांग (ETc) बनाम वर्षा आपूर्ति' : 'Water Demand vs Monsoon Supply'}
              </h4>
              <p className="text-xs text-muted" style={{ margin: '0.1rem 0 0' }}>
                {lang === 'hi' ? 'फसल की 6 विकास अवस्थाओं में मिलीमीटर (mm) जल संतुलन' : 'Stage-wise water requirement across 6 phenological phases'}
              </p>
            </div>
            <select
              className="select"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.7rem', fontWeight: 700, borderRadius: '8px' }}
              value={selectedCrop}
              onChange={e => setSelectedCrop(e.target.value)}
            >
              {CROP_CLIMATE_DYNAMICS.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.season})</option>
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
        <div className="card" style={{ background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)', padding: '1.2rem' }}>
          <div style={{ marginBottom: '0.8rem' }}>
            <h4 style={{ margin: 0, fontSize: '0.98rem', color: '#f1f5f9', fontWeight: 800 }}>
              🌡️ {lang === 'hi' ? 'फसल-मौसम संबंध व अनुकूलता तुलना' : 'Crop Micro-Climate Fit & Thermal Thresholds'}
            </h4>
            <p className="text-xs text-muted" style={{ margin: '0.1rem 0 0' }}>
              {lang === 'hi' ? 'वर्तमान मौसम में विभिन्न फसलों का अनुकूलता स्कोर व अधिकतम तापमान सीमा' : 'Suitability % vs Upper Thermal Thresholds (°C) for regional crops'}
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

      {/* ALL CROPS & STAGE CONTINGENCY SELECTOR */}
      <div className="card" style={{ marginBottom: '1.5rem', background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)' }}>
        <div className="card-header">
          <span className="card-title">🌱 {lang === 'hi' ? 'विशिष्ट फसल व विकास अवस्था निर्णय सहायता (22+ फसलें)' : 'Crop Stage Agronomic Advisory Engine (22+ Regional Crops)'}</span>
          <span className="badge badge-success">Decision Support System</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', minWidth: '240px', flex: 1 }}>
            <label className="field-label">{lang === 'hi' ? 'फसल चुनें:' : 'Select Crop:'}</label>
            <select className="select" value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)}>
              {CROP_CLIMATE_DYNAMICS.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.season})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', minWidth: '240px', flex: 1 }}>
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
          <div style={{ padding: '1rem 1.2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.09)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ background: stageAdvisory.badge_color || '#059669', color: '#fff', padding: '0.35rem 0.9rem', borderRadius: '999px', fontWeight: 800, fontSize: '0.82rem' }}>
                {lang === 'hi' ? stageAdvisory.action_label_hi : stageAdvisory.action_label_en}
              </span>
              <strong style={{ fontSize: '1rem', color: '#f1f5f9' }}>
                {lang === 'hi' ? stageAdvisory.crop_name_hi : stageAdvisory.crop_name_en} ({lang === 'hi' ? stageAdvisory.stage_name_hi : stageAdvisory.stage_name_en})
              </strong>
            </div>
            <p style={{ margin: '0.35rem 0', fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.55 }}>
              {lang === 'hi' ? stageAdvisory.rationale_hi : stageAdvisory.rationale_en}
            </p>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.09)', paddingTop: '0.45rem', marginTop: '0.5rem' }}>
              ⚠️ <strong>{lang === 'hi' ? 'कीट व रोग चेतावनी:' : 'Pest Warning:'}</strong> {lang === 'hi' ? stageAdvisory.pest_warning_hi : stageAdvisory.pest_warning_en}
            </div>
          </div>
        )}
      </div>

      {/* CROP CARDS CATALOG WITH BEAUTIFUL SEASON FILTER PILLS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.8rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#f1f5f9', fontWeight: 800 }}>
            {lang === 'hi' ? 'क्षेत्रीय फसल उपयुक्तता सूची (Top Crop Catalog)' : 'Regional Crop Suitability Catalog'}
          </h3>
          <p className="text-xs text-muted" style={{ margin: '0.15rem 0 0' }}>
            {lang === 'hi' ? `वर्तमान में ${data.length} फसलें प्रदर्शित हो रही हैं` : `Showing ${data.length} crops for selected season`}
          </p>
        </div>

        {/* Sleek, Modern Season Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.04)', padding: '0.35rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.09)', flexWrap: 'wrap' }}>
          {SEASON_OPTIONS.map(opt => {
            const isAct = season === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setSeason(opt.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: isAct ? 'linear-gradient(135deg, #059669 0%, #0284c7 100%)' : 'transparent',
                  color: isAct ? '#ffffff' : '#475569',
                  boxShadow: isAct ? '0 2px 8px rgba(5, 150, 105, 0.25)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{opt.icon}</span>
                <span>{lang === 'hi' ? opt.label_hi : opt.label_en}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Recommended Crops */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
          ⏳ {lang === 'hi' ? 'फसल उपयुक्तता डेटा लोड हो रहा है...' : 'Calculating optimal crop suitability...'}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {(data || []).map((crop, idx) => (
            <div key={idx} className="card" style={{ padding: '1.1rem', background: 'rgba(18, 14, 40, 0.72)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>{crop.icon || '🌾'}</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.98rem', color: '#f1f5f9', fontWeight: 800 }}>
                      {lang === 'hi' ? crop.name_hi : crop.name_en}
                    </h4>
                    <span className="badge badge-info" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem', marginTop: '0.15rem' }}>
                      {crop.season} • {crop.sowing_window}
                    </span>
                  </div>
                </div>
                <span className={`crop-score ${crop.suitability_score >= 80 ? 'high' : crop.suitability_score >= 60 ? 'medium' : 'low'}`} style={{ fontSize: '0.95rem', fontWeight: 800 }}>
                  {crop.suitability_score}%
                </span>
              </div>

              <div className="progress-bar" style={{ margin: '0.6rem 0', height: '7px' }}>
                <div className="progress-fill" style={{ width: `${crop.suitability_score}%`, background: SCORE_COLOR(crop.suitability_score) }} />
              </div>

              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: '0.4rem 0 0.7rem', lineHeight: 1.5 }}>
                {lang === 'hi' ? crop.advice_hi : crop.advice_en}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem', fontWeight: 600 }}>
                <span>⏱️ {crop.duration_days} days</span>
                <span style={{ color: '#047857' }}>💰 ₹{crop.market_price_inr_qtl}/qtl</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
