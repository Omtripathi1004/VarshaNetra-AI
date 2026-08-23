import React, { useEffect, useState, useMemo } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, CartesianGrid, ReferenceLine, LineChart, Line, AreaChart, Area
} from 'recharts';

const SCORE_COLOR = (s) => s >= 80 ? '#34d399' : s >= 60 ? '#fbbf24' : '#f87171';

function CropDetail({ crop, lang }) {
  const [expanded, setExpanded] = useState(false);
  const radarData = [
    { subject: 'Temp', A: crop.factor_scores.temperature, fullMark: 100 },
    { subject: 'Rain', A: crop.factor_scores.rainfall, fullMark: 100 },
    { subject: 'Humidity', A: crop.factor_scores.humidity, fullMark: 100 },
    { subject: 'Soil', A: crop.factor_scores.soil_moisture, fullMark: 100 },
    { subject: 'Monsoon', A: crop.factor_scores.monsoon_alignment, fullMark: 100 },
  ];
  const barData = Object.entries(crop.factor_scores).map(([k, v]) => ({
    name: k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    score: v,
  }));

  return (
    <div className={`crop-card rank-${crop.rank}`} onClick={() => setExpanded(e => !e)}>
      <div className="crop-card-header">
        <span style={{ background: 'rgba(255,255,255,0.08)', padding: '0.2rem 0.55rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
          #{crop.rank}
        </span>
        <span className="crop-icon">{crop.icon}</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 700, fontSize: '1rem' }}>{lang === 'hi' ? crop.name_hi : crop.name_en}</p>
          <p className="text-xs text-muted">{lang === 'hi' ? crop.name_en : crop.name_hi} · {crop.season}</p>
        </div>
        <span className={`crop-score ${crop.suitability_score >= 80 ? 'high' : crop.suitability_score >= 60 ? 'medium' : 'low'}`}>
          {crop.suitability_score}%
        </span>
      </div>

      <div className="progress-bar" style={{ marginBottom: '0.75rem' }}>
        <div className="progress-fill" style={{
          width: `${crop.suitability_score}%`,
          background: `linear-gradient(90deg, ${SCORE_COLOR(crop.suitability_score)}, ${SCORE_COLOR(crop.suitability_score)}88)`
        }} />
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
        <span>🗓️ {crop.sowing_window}</span>
        <span>⏱️ {crop.duration_days} days</span>
        <span>₹ {crop.market_price_inr_qtl}/qtl</span>
      </div>

      {expanded && (
        <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <div className="grid-2" style={{ gap: '1rem' }}>
            {/* Radar Chart */}
            <div>
              <p className="text-xs text-muted mb-1">Factor Scores — Radar</p>
              <ResponsiveContainer width="100%" height={180}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Radar dataKey="A" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div>
              <p className="text-xs text-muted mb-1">Factor Scores — Bar</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={barData} layout="vertical" barSize={10}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: '#475569', fontSize: 9 }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 9 }} width={70} />
                  <Tooltip contentStyle={{ background: '#0d1225', border: '1px solid rgba(255,255,255,0.1)', fontSize: 11 }} />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                    {barData.map((entry, i) => <Cell key={i} fill={SCORE_COLOR(entry.score)} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(52,211,153,0.06)', borderRadius: '8px', border: '1px solid rgba(52,211,153,0.2)' }}>
            <p className="text-sm">{lang === 'hi' ? crop.advice_hi : crop.advice_en}</p>
          </div>

          {crop.warnings?.length > 0 && (
            <div style={{ marginTop: '0.5rem' }}>
              {crop.warnings.map((w, i) => (
                <p key={i} className="text-xs" style={{ color: 'var(--accent-yellow)' }}>⚠️ {w}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AgricultureTab() {
  const { tr, lang, location } = useApp();
  const [data, setData] = useState(null);
  const [season, setSeason] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('overview'); // 'overview' | 'graphs'

  useEffect(() => {
    setLoading(true);
    api.getCropAdvisor({ lat: location.lat, lon: location.lon }, season, 10)
      .then(r => { setData(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [location.lat, location.lon, season]);

  const currentTemp = data?.current_conditions?.temperature_c || 28.5;
  const currentRain = data?.current_conditions?.precipitation_mm || 5.2;
  const currentSoil = data?.current_conditions?.soil_moisture || 0.32;
  const currentHum = data?.current_conditions?.humidity_pct || 75;

  // 1. Graph 1: Crop Rainfall Requirements vs Current Weather
  const rainData = useMemo(() => {
    return data?.top_crops?.slice(0, 6).map(c => ({
      name: lang === 'hi' ? c.name_hi : c.name_en.split(' ')[0],
      neededRain: c.requirements?.rainfall_season_mm || 800,
      dailyCritical: (c.requirements?.rainfall_season_mm || 800) / 100,
      currentDailyRain: currentRain,
    })) || [];
  }, [data, lang, currentRain]);

  // 2. Graph 2: Temperature Tolerance Range vs Current Live Temp
  const tempData = useMemo(() => {
    return data?.top_crops?.slice(0, 6).map(c => ({
      name: lang === 'hi' ? c.name_hi : c.name_en.split(' ')[0],
      minTemp: c.requirements?.temp_min || 18,
      maxTemp: c.requirements?.temp_max || 35,
      optimalTemp: Math.round(((c.requirements?.temp_min || 18) + (c.requirements?.temp_max || 35)) / 2),
      currentTemp: currentTemp,
    })) || [];
  }, [data, lang, currentTemp]);

  // 3. Graph 3: Soil Moisture Suitability & Rootzone Index
  const soilData = useMemo(() => {
    return data?.top_crops?.slice(0, 6).map(c => {
      const minRequired = (c.requirements?.soil_moisture_min || 0.25) * 100;
      const currentLevel = Math.min(100, (currentSoil * 100));
      return {
        name: lang === 'hi' ? c.name_hi : c.name_en.split(' ')[0],
        requiredSoil: Math.round(minRequired),
        currentSoil: Math.round(currentLevel),
        satisfaction: Math.min(100, Math.round((currentLevel / minRequired) * 100)),
      };
    }) || [];
  }, [data, lang, currentSoil]);

  // 4. Graph 4: Atmospheric Humidity Stress Index
  const humidityStressData = useMemo(() => {
    return data?.top_crops?.slice(0, 6).map(c => {
      const minHum = c.requirements?.humidity_min || 50;
      const maxHum = c.requirements?.humidity_max || 85;
      const inRange = currentHum >= minHum && currentHum <= maxHum;
      const stressScore = inRange ? 15 : Math.min(100, Math.abs(currentHum - ((minHum + maxHum) / 2)) * 2);
      return {
        name: lang === 'hi' ? c.name_hi : c.name_en.split(' ')[0],
        stressLevel: Math.round(stressScore),
        humidityFit: Math.round(c.factor_scores?.humidity || 85),
      };
    }) || [];
  }, [data, lang, currentHum]);

  // 5. Graph 5: Predicted Crop Yield Impact Under Current Weather
  const yieldImpactData = useMemo(() => {
    return data?.top_crops?.slice(0, 6).map(c => {
      const score = c.suitability_score || 75;
      const yieldDeviation = score >= 85 ? +12.5 : score >= 70 ? +4.0 : score >= 50 ? -8.5 : -22.0;
      return {
        name: lang === 'hi' ? c.name_hi : c.name_en.split(' ')[0],
        yieldImpact: yieldDeviation,
        suitability: score,
      };
    }) || [];
  }, [data, lang]);

  // 6. Graph 6: Sowing Urgency & Monsoon Alignment Score
  const sowingAlignmentData = useMemo(() => {
    return data?.top_crops?.slice(0, 6).map(c => ({
      name: lang === 'hi' ? c.name_hi : c.name_en.split(' ')[0],
      alignmentScore: c.factor_scores?.monsoon_alignment || 80,
      overallFit: c.suitability_score || 75,
    })) || [];
  }, [data, lang]);

  return (
    <div className="main-content">
      {/* Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ background: 'linear-gradient(135deg, #34d399, #0d9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🌾 {tr('tab_season')}
        </h2>
        {data && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
            <span className={`badge badge-${data.monsoon_phase}`}>{tr(data.monsoon_phase)}</span>
            <span className="text-xs text-muted">
              🌡️ {data.current_conditions?.temperature_c}°C ·
              🌧️ {data.current_conditions?.precipitation_mm} mm ·
              💧 {data.current_conditions?.humidity_pct}% ·
              🌱 {data.current_conditions?.soil_moisture ?? 0.32} m³/m³
            </span>
          </div>
        )}
      </div>

      {/* Control Bar: Seasons + View Mode Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        {/* Season Filter */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['ALL', 'KHARIF', 'RABI', 'ZAID'].map(s => (
            <button key={s}
              className={`channel-tab ${season === s ? 'active' : ''}`}
              onClick={() => setSeason(s)}
            >
              {tr(s === 'ALL' ? 'all_seasons' : s.toLowerCase())}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            className={`channel-tab ${viewMode === 'overview' ? 'active' : ''}`}
            onClick={() => setViewMode('overview')}
          >
            📋 {lang === 'hi' ? 'फसल कार्ड और रैंकिंग' : 'Crop Cards & Rank'}
          </button>
          <button
            className={`channel-tab ${viewMode === 'graphs' ? 'active' : ''}`}
            onClick={() => setViewMode('graphs')}
            style={{ borderColor: viewMode === 'graphs' ? 'var(--accent-green)' : 'var(--border-subtle)' }}
          >
            📊 {lang === 'hi' ? '6 मौसम-फसल प्रभाव ग्राफ' : '6 Weather-Crop Impact Graphs'}
          </button>
        </div>
      </div>

      {/* 6 WEATHER-CROP IMPACT GRAPHS SECTION */}
      {viewMode === 'graphs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="card" style={{ background: 'rgba(16, 23, 46, 0.9)', border: '1px solid var(--border-glow)' }}>
            <h3 style={{ color: 'var(--accent-green)', marginBottom: '0.3rem', fontSize: '1.1rem' }}>
              📊 {lang === 'hi' ? 'मौसम कारक बनाम फसल प्रभाव विश्लेषण (6 ग्राफ)' : 'Multi-Factor Weather vs Crop Impact Analytics (6 Graphs)'}
            </h3>
            <p className="text-xs text-muted">
              {lang === 'hi'
                ? 'लाइव ओपन-मेटियो मौसम (वर्षा, तापमान, आर्द्रता, मृदा नमी) का प्रत्येक फसल पर पड़ने वाले सटीक प्रभाव का ग्राफिकल विश्लेषण'
                : 'Interactive comparative analysis of how current weather observations impact individual crop growth, yield, and stress levels'}
            </p>
          </div>

          <div className="grid-2" style={{ gap: '1rem' }}>
            {/* Graph 1: Seasonal Rainfall Requirement vs Crop Needs */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">🌧️ 1. {lang === 'hi' ? 'फसल वर्षा आवश्यकता (मिमी/सीजन)' : 'Crop Rainfall Requirement (mm/season)'}</span>
              </div>
              <p className="text-xs text-muted mb-1">
                {lang === 'hi' ? 'सीजन की कुल जल आवश्यकता बनाम फसल क्षमता' : 'Ideal full-season water intake requirement per crop'}
              </p>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={rainData} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#475569', fontSize: 10 }} unit="mm" />
                  <Tooltip contentStyle={{ background: '#0d1225', border: '1px solid rgba(255,255,255,0.1)', fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="neededRain" name="Season Water Need (mm)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Graph 2: Ideal Temperature Tolerance vs Live Temp */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">🌡️ 2. {lang === 'hi' ? 'तापमान सहिष्णुता सीमा बनाम वर्तमान तापमान' : 'Thermal Tolerance Window vs Live Temp'}</span>
              </div>
              <p className="text-xs text-muted mb-1">
                {lang === 'hi' ? `वर्तमान तापमान: ${currentTemp}°C (लाल रेखा)` : `Current live temperature: ${currentTemp}°C (red dashed line)`}
              </p>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={tempData} barSize={16}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#475569', fontSize: 10 }} unit="°C" domain={[0, 45]} />
                  <Tooltip contentStyle={{ background: '#0d1225', border: '1px solid rgba(255,255,255,0.1)', fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <ReferenceLine y={currentTemp} stroke="#f87171" strokeDasharray="4 4" label={{ value: `Live ${currentTemp}°C`, fill: '#f87171', fontSize: 10 }} />
                  <Bar dataKey="minTemp" name="Min Temp (°C)" fill="#818cf8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="optimalTemp" name="Optimal Temp (°C)" fill="#34d399" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="maxTemp" name="Max Temp (°C)" fill="#fb923c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Graph 3: Soil Moisture Rootzone Suitability */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">🌱 3. {lang === 'hi' ? 'मृदा नमी संतुष्टि सूचकांक (%)' : 'Soil Moisture Satisfaction Index (%)'}</span>
              </div>
              <p className="text-xs text-muted mb-1">
                {lang === 'hi' ? `वर्तमान सतही नमी: ${(currentSoil * 100).toFixed(0)}%` : `Current rootzone moisture level: ${(currentSoil * 100).toFixed(0)}%`}
              </p>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={soilData} barSize={22}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis domain={[0, 120]} tick={{ fill: '#475569', fontSize: 10 }} unit="%" />
                  <Tooltip contentStyle={{ background: '#0d1225', border: '1px solid rgba(255,255,255,0.1)', fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="satisfaction" name="Moisture Sufficiency (%)" radius={[4, 4, 0, 0]}>
                    {soilData.map((entry, i) => (
                      <Cell key={i} fill={entry.satisfaction >= 100 ? '#34d399' : entry.satisfaction >= 75 ? '#38bdf8' : '#fbbf24'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Graph 4: Atmospheric Humidity Stress Index */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">💧 4. {lang === 'hi' ? 'आर्द्रता तनाव स्तर (कम = बेहतर)' : 'Atmospheric Humidity Stress (Lower = Better)'}</span>
              </div>
              <p className="text-xs text-muted mb-1">
                {lang === 'hi' ? `वर्तमान परिवेशी आर्द्रता: ${currentHum}%` : `Calculated heat-transpiration index at ${currentHum}% relative humidity`}
              </p>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={humidityStressData} barSize={22}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#475569', fontSize: 10 }} unit="%" />
                  <Tooltip contentStyle={{ background: '#0d1225', border: '1px solid rgba(255,255,255,0.1)', fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="stressLevel" name="Stress Risk (%)" radius={[4, 4, 0, 0]}>
                    {humidityStressData.map((entry, i) => (
                      <Cell key={i} fill={entry.stressLevel > 40 ? '#f87171' : entry.stressLevel > 20 ? '#fbbf24' : '#34d399'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Graph 5: Predicted Crop Yield Impact */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">📈 5. {lang === 'hi' ? 'अनुमानित फसल उपज विचलन (%)' : 'Projected Yield Impact Deviation (%)'}</span>
              </div>
              <p className="text-xs text-muted mb-1">
                {lang === 'hi' ? 'वर्तमान मौसम परिस्थितियों में उपज लाभ / हानि अनुमान' : 'Estimated % deviation from standard baseline crop harvest'}
              </p>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={yieldImpactData} barSize={22}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis domain={[-30, 30]} tick={{ fill: '#475569', fontSize: 10 }} unit="%" />
                  <Tooltip contentStyle={{ background: '#0d1225', border: '1px solid rgba(255,255,255,0.1)', fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" />
                  <Bar dataKey="yieldImpact" name="Yield Impact (%)" radius={[4, 4, 0, 0]}>
                    {yieldImpactData.map((entry, i) => (
                      <Cell key={i} fill={entry.yieldImpact >= 0 ? '#34d399' : '#f87171'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Graph 6: Sowing Urgency & Monsoon Alignment Score */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">⏱️ 6. {lang === 'hi' ? 'मानसून संरेखण और बुवाई प्राथमिकता' : 'Monsoon Alignment & Sowing Urgency'}</span>
              </div>
              <p className="text-xs text-muted mb-1">
                {lang === 'hi' ? 'मानसून चरण के आधार पर बुवाई खिड़की का तालमेल' : 'Readiness score for immediate sowing under current monsoon phase'}
              </p>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={sowingAlignmentData} barSize={22}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#475569', fontSize: 10 }} unit=" pts" />
                  <Tooltip contentStyle={{ background: '#0d1225', border: '1px solid rgba(255,255,255,0.1)', fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="alignmentScore" name="Monsoon Alignment Score" fill="#c084fc" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* OVERVIEW MODE: Top 5 Comparison + Detailed Crop Cards */}
      {viewMode === 'overview' && (
        <>
          {/* Comparison Bar Chart */}
          {data?.top_crops && (
            <div className="card" style={{ marginBottom: '1rem' }}>
              <div className="card-header"><span className="card-title">📊 Top Crop Suitability Comparison</span></div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={data.top_crops.slice(0, 6).map(c => ({ name: lang === 'hi' ? c.name_hi : c.name_en, score: c.suitability_score }))} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#475569', fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#0d1225', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {data.top_crops.slice(0, 6).map((entry, i) => <Cell key={i} fill={SCORE_COLOR(entry.suitability_score)} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Crop Cards List */}
          {loading ? (
            <div className="grid-2">
              {Array(4).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: 120 }} />)}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {data?.top_crops?.map(crop => (
                <CropDetail key={crop.name_en} crop={crop} lang={lang} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
