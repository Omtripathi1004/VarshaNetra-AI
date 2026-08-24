import React, { useEffect, useState, useMemo } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell,
} from 'recharts';

const SCORE_COLOR = (s) => s >= 80 ? '#059669' : s >= 60 ? '#d97706' : '#dc2626';

function CropDetail({ crop, lang }) {
  const [expanded, setExpanded] = useState(false);
  const factorScores = crop.factor_scores || { temperature: 85, rainfall: 80, humidity: 75, soil_moisture: 90, monsoon_alignment: 88 };
  
  const radarData = [
    { subject: 'Temp', A: factorScores.temperature, fullMark: 100 },
    { subject: 'Rain', A: factorScores.rainfall, fullMark: 100 },
    { subject: 'Humidity', A: factorScores.humidity, fullMark: 100 },
    { subject: 'Soil', A: factorScores.soil_moisture, fullMark: 100 },
    { subject: 'Monsoon', A: factorScores.monsoon_alignment, fullMark: 100 },
  ];

  return (
    <div className={`crop-card rank-${crop.rank || 1}`} onClick={() => setExpanded(e => !e)}>
      <div className="crop-card-header">
        <span style={{ background: '#f1f5f9', padding: '0.2rem 0.55rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>
          #{crop.rank || 1}
        </span>
        <span className="crop-icon">{crop.icon || '🌾'}</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a', margin: 0 }}>
            {lang === 'hi' ? crop.name_hi : crop.name_en}
          </p>
          <p className="text-xs text-muted" style={{ margin: 0 }}>
            {lang === 'hi' ? crop.name_en : crop.name_hi} • {crop.season}
          </p>
        </div>
        <span className={`crop-score ${crop.suitability_score >= 80 ? 'high' : crop.suitability_score >= 60 ? 'medium' : 'low'}`}>
          {crop.suitability_score}%
        </span>
      </div>

      <div className="progress-bar" style={{ marginBottom: '0.75rem' }}>
        <div className="progress-fill" style={{
          width: `${crop.suitability_score}%`,
          background: SCORE_COLOR(crop.suitability_score)
        }} />
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.78rem', color: '#334155', fontWeight: 500 }}>
        <span>🗓️ {crop.sowing_window}</span>
        <span>⏱️ {crop.duration_days} days</span>
        <span>💰 ₹{crop.market_price_inr_qtl}/qtl</span>
      </div>

      {expanded && (
        <div style={{ marginTop: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.85rem' }}>
          <p className="text-xs text-muted" style={{ fontWeight: 600, marginBottom: '0.4rem' }}>
            {lang === 'hi' ? 'जलवायु अनुकूलता कारक' : 'Micro-Climatic Factor Fit'}:
          </p>
          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10, fontWeight: 'bold' }} />
                <Radar dataKey="A" stroke="#0284c7" fill="#0284c7" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
            <p style={{ fontSize: '0.82rem', color: '#047857', margin: 0 }}>
              {lang === 'hi' ? crop.advice_hi : crop.advice_en}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

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
      api.getCropAdvisor(loc, season, 10),
      api.getCropStageAdvisory(selectedCrop, selectedStage, loc).catch(() => ({ data: null })),
    ]).then(([cRes, sRes]) => {
      setData(cRes.data);
      if (sRes?.data) setStageAdvisory(sRes.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [location.lat, location.lon, season]);

  const handleStageSelect = (crop, stage) => {
    setSelectedCrop(crop);
    setSelectedStage(stage);
    const loc = { lat: location.lat, lon: location.lon, state: location.state, district: location.district };
    api.getCropStageAdvisory(crop, stage, loc).then(res => {
      if (res.data) setStageAdvisory(res.data);
    });
  };

  return (
    <div className="main-content">
      {/* Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ color: '#047857', margin: 0, fontWeight: 800 }}>
          🌾 {lang === 'hi' ? 'फसल निर्णय एवं कृषि परामर्श प्रणाली' : 'Crop Decision & Contingency Advisory'}
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.2rem' }}>
          📍 {location.display_name} • Crop-Specific Stage Matrix & Real-Time Action Badges
        </p>
      </div>

      {/* INTERACTIVE CROP + STAGE ACTION ENGINE */}
      <div className="card" style={{ marginBottom: '1.5rem', border: '2px solid #bbf7d0' }}>
        <div className="card-header">
          <div>
            <span className="card-title">
              🎯 {lang === 'hi' ? 'फसल अवस्था आधारित त्वरित निर्णय (SOW, WAIT, IRRIGATE, DRAIN, MONITOR)' : 'Crop Stage Decision Engine (Actionable Advisory)'}
            </span>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.74rem', color: '#64748b' }}>
              {lang === 'hi' ? 'अपनी फसल और वर्तमान अवस्था चुनें — प्रणाली सीधे कार्य योजना प्रदान करेगी' : 'Select your crop and growth stage to receive immediate meteorological action guidance'}
            </p>
          </div>
          <span className="badge badge-success">Live Forecast Coupled</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.2rem' }}>
          <div>
            <label className="field-label">{lang === 'hi' ? '1. फसल का चयन करें' : '1. Select Crop'}</label>
            <select
              className="select"
              value={selectedCrop}
              onChange={e => handleStageSelect(e.target.value, selectedStage)}
            >
              <option value="rice">🌾 Paddy (Rice) / धान</option>
              <option value="cotton">☁️ Cotton / कपास</option>
              <option value="soybean">🫘 Soybean / सोयाबीन</option>
              <option value="maize">🌽 Maize / मक्का</option>
              <option value="wheat">🌾 Wheat / गेहूं</option>
              <option value="mustard">🌼 Mustard / सरसों</option>
              <option value="groundnut">🥜 Groundnut / मूँगफली</option>
              <option value="pulses">🥣 Pulses (Arhar/Gram) / दालें</option>
              <option value="bajra">🌿 Bajra (Millets) / बाजरा</option>
              <option value="sugarcane">🎋 Sugarcane / गन्ना</option>
              <option value="vegetables">🍅 Vegetables / सब्जियां</option>
            </select>
          </div>

          <div>
            <label className="field-label">{lang === 'hi' ? '2. फसल अवस्था का चयन करें' : '2. Select Crop Stage'}</label>
            <select
              className="select"
              value={selectedStage}
              onChange={e => handleStageSelect(selectedCrop, e.target.value)}
            >
              <option value="land_prep">🚜 Land Preparation / खेत तैयारी</option>
              <option value="sowing">🌱 Sowing & Transplanting / बुवाई व रोपाई</option>
              <option value="vegetative">🌿 Vegetative Growth / वानस्पतिक बढ़वार</option>
              <option value="flowering">🌸 Flowering & Tasseling / फूल व परागण</option>
              <option value="grain_fill">🌾 Grain Filling & Pods / दाना भराव</option>
              <option value="harvesting">✂️ Harvesting & Maturity / कटाई अवस्था</option>
            </select>
          </div>
        </div>

        {stageAdvisory && (
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span
                  style={{
                    background: stageAdvisory.badge_color || '#059669',
                    color: '#ffffff',
                    padding: '0.4rem 1.1rem',
                    borderRadius: '999px',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  {lang === 'hi' ? stageAdvisory.action_label_hi : stageAdvisory.action_label_en}
                </span>
                <strong style={{ fontSize: '1.1rem', color: '#0f172a' }}>
                  {lang === 'hi' ? stageAdvisory.crop_name_hi : stageAdvisory.crop_name_en} — {lang === 'hi' ? stageAdvisory.stage_name_hi : stageAdvisory.stage_name_en}
                </strong>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6, margin: '0.6rem 0' }}>
              <strong>{lang === 'hi' ? 'कृषि निर्णय विवरण:' : 'Action Plan:'}</strong>{' '}
              {lang === 'hi' ? stageAdvisory.rationale_hi : stageAdvisory.rationale_en}
            </p>

            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', borderTop: '1px solid #e2e8f0', paddingTop: '0.6rem', marginTop: '0.6rem', fontSize: '0.78rem', color: '#64748b' }}>
              <span>⚠️ <strong>{lang === 'hi' ? 'कीट व रोग चेतावनी:' : 'Pest Warning:'}</strong> {lang === 'hi' ? stageAdvisory.pest_warning_hi : stageAdvisory.pest_warning_en}</span>
            </div>
          </div>
        )}
      </div>

      {/* CROP SUITABILITY CARDS GRID */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, color: '#0f172a' }}>
          📊 {lang === 'hi' ? 'क्षेत्रीय फसल उपयुक्तता रैंकिंग' : 'Agro-Climatic Suitability Rankings'}
        </h3>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {['ALL', 'KHARIF', 'RABI', 'ZAID'].map(s => (
            <button
              key={s}
              className={`channel-tab ${season === s ? 'active' : ''}`}
              onClick={() => setSeason(s)}
              style={{
                padding: '0.3rem 0.8rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                background: season === s ? '#059669' : '#ffffff',
                color: season === s ? '#ffffff' : '#475569',
                borderColor: season === s ? '#059669' : '#cbd5e1'
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid-2">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 160 }} />
          ))}
        </div>
      ) : (
        <div className="grid-2">
          {(data?.top_crops || []).map((crop) => (
            <CropDetail key={crop.name_en} crop={crop} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}
