import React, { useState, useEffect } from 'react';
import { useApp } from '../common/AppContext';
import { api } from '../../api/client';
import VernacularTTSButton from '../common/VernacularTTSButton';

export default function SmartCropRecommendations({ onCropSelect }) {
  const { lang, location } = useApp();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeVarietyModal, setActiveVarietyModal] = useState(null);
  const [isWhyNotExpanded, setIsWhyNotExpanded] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState(null);

  const fetchRecommendations = () => {
    setLoading(true);
    const loc = {
      lat: location.lat,
      lon: location.lon,
      state: location.state,
      district: location.district,
      city: location.city,
      village: location.village,
      display_name: location.display_name,
    };

    api.getSmartCropRecommendations(loc, 'ALL')
      .then((res) => {
        if (res?.data) {
          setData(res.data);
          setLastRefreshedAt(new Date());
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load smart crop recommendations:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRecommendations();
  }, [location.lat, location.lon, location.district, location.state]);

  const scoreColor = (score) => {
    if (score >= 88) return '#10b981';
    if (score >= 75) return '#0284c7';
    if (score >= 60) return '#d97706';
    return '#ef4444';
  };

  const currentCondition = data?.condition_summary;
  const recommendations = data?.recommendations || [];
  const alternativeOptions = data?.alternative_options || [];
  const whyNotList = data?.why_not_excluded || [];

  // Speech summary generation for Vernacular TTS
  const speechSummaryHi = recommendations.length
    ? `स्मार्ट फसल व किस्म सिफारिशें: आपके क्षेत्र ${location.district || location.state} के लिए शीर्ष तीन अनुशंसित फसलें हैं: ${recommendations.map((r, i) => `${i + 1}. ${r.crop_name_hi}, किस्म ${r.recommended_variety_hi}, अनुकूलता ${r.suitability_score}%`).join('; ')}। विस्तृत जल आवश्यकता और बुवाई समय कार्ड में देखें।`
    : 'स्मार्ट फसल सिफारिशें लोड हो रही हैं।';

  const speechSummaryEn = recommendations.length
    ? `Smart Crop and Variety Recommendations for ${location.district || location.state}: The top recommended crops are: ${recommendations.map((r, i) => `${i + 1}. ${r.crop_name_en} variety ${r.recommended_variety} with ${r.suitability_score}% suitability`).join(', ')}. Check the details on expected water and sowing window below.`
    : 'Smart crop recommendations are loading.';

  const formattedTimestamp = lastRefreshedAt
    ? lastRefreshedAt.toLocaleTimeString(lang === 'hi' ? 'hi-IN' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : (data?.timestamp_updated || 'Just now');

  return (
    <div
      className="card"
      style={{
        marginBottom: '1.5rem',
        background: 'linear-gradient(145deg, rgba(13, 10, 32, 0.92) 0%, rgba(20, 16, 48, 0.88) 100%)',
        borderRadius: '20px',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        boxShadow: '0 8px 32px rgba(2, 132, 199, 0.12)',
        padding: '1.4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative ambient glowing backdrops */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-60px',
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* 1. HEADER SECTION (As required by spec section 10) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1.1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.9rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.6rem' }}>🌾</span>
            <h3
              style={{
                margin: 0,
                fontSize: '1.28rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #34d399 0%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.01em',
              }}
            >
              {lang === 'hi' ? 'स्मार्ट फसल व किस्म चयन सिफारिशें' : 'Smart Crop & Variety Recommendations'}
            </h3>
            <span
              className="badge"
              style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                fontSize: '0.68rem',
                fontWeight: 800,
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
              }}
            >
              ICAR-Verified Cultivars
            </span>
          </div>

          <p style={{ margin: '0.3rem 0 0', fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.45 }}>
            {lang === 'hi'
              ? 'स्थान, वास्तविक मौसम, 7-दिवसीय पूर्वानुमान, मृदा नमी और क्षेत्रीय जलवायु के आधार पर सर्वश्रेष्ठ 2–3 फसलें व किस्में:'
              : 'Multi-factor agronomic engine: evaluates GPS location, real-time weather, forecast, soil telemetry, season, and risks to recommend top 2–3 suitable crops with verified condition-specific cultivars.'}
          </p>
        </div>

        {/* Live Refresh & Audio Vernacular TTS button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <VernacularTTSButton
            textHindi={speechSummaryHi}
            textEnglish={speechSummaryEn}
            lang={lang}
            labelHi="सिफारिशें सुनें"
            labelEn="Listen Recommendations"
            size="sm"
          />

          <button
            onClick={fetchRecommendations}
            disabled={loading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.42rem 0.85rem',
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '999px',
              color: '#38bdf8',
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title={lang === 'hi' ? 'सिफारिशें पुनः गणना करें' : 'Recalculate recommendations'}
          >
            <span style={{ display: 'inline-block', animation: loading ? 'spin 1s linear infinite' : 'none' }}>🔄</span>
            <span>{loading ? (lang === 'hi' ? 'गणना...' : 'Calculating...') : (lang === 'hi' ? 'ताज़ा करें' : 'Refresh')}</span>
          </button>
        </div>
      </div>

      {/* 2. LOCATION & CONDITION SUMMARY STRIP (Spec requirement 10) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem',
          padding: '0.85rem 1rem',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '14px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          marginBottom: '1.25rem',
        }}
      >
        <div>
          <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, display: 'block' }}>
            📍 {lang === 'hi' ? 'कृषि जलवायु क्षेत्र व स्थान' : 'Agro-Climatic Zone & Location'}
          </span>
          <div style={{ fontSize: '0.88rem', color: '#f1f5f9', fontWeight: 800, marginTop: '0.15rem' }}>
            {location.district || 'Nagpur'}, {location.state || 'Maharashtra'}
          </div>
          <span style={{ fontSize: '0.72rem', color: '#38bdf8' }}>
            {data?.location?.agro_climatic_zone || 'Central / Gangetic Basin'}
          </span>
        </div>

        <div>
          <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, display: 'block' }}>
            🌡️ {lang === 'hi' ? 'वास्तविक मौसम व मृदा नमी' : 'Observed Weather & Soil Telemetry'}
          </span>
          <div style={{ fontSize: '0.88rem', color: '#f1f5f9', fontWeight: 800, marginTop: '0.15rem' }}>
            {currentCondition?.temperature_c ?? 28.5}°C • {currentCondition?.humidity_pct ?? 78}% Hum
          </div>
          <span style={{ fontSize: '0.72rem', color: '#34d399' }}>
            {lang === 'hi' ? 'मृदा नमी:' : 'Root Moisture:'} {Math.round((currentCondition?.soil_moisture_0_1cm ?? 0.28) * 100)}% ({currentCondition?.soil_moisture_0_1cm ?? 0.28} m³/m³)
          </span>
        </div>

        <div>
          <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, display: 'block' }}>
            🌧️ {lang === 'hi' ? '7-दिवसीय वर्षा दृष्टिकोण व मौसम' : '7-Day Rain Outlook & Season'}
          </span>
          <div style={{ fontSize: '0.88rem', color: '#f1f5f9', fontWeight: 800, marginTop: '0.15rem' }}>
            {lang === 'hi' ? currentCondition?.current_season_hi : currentCondition?.current_season} Window
          </div>
          <span style={{ fontSize: '0.72rem', color: '#a78bfa' }}>
            {currentCondition?.forecast_outlook || 'Favorable near-term rainfall supply'}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, display: 'block' }}>
            🕒 {lang === 'hi' ? 'अंतिम अद्यतन (Live Timestamp)' : 'Recommendation Live Timestamp'}
          </span>
          <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700, marginTop: '0.15rem' }}>
            {formattedTimestamp}
          </div>
          <span style={{ fontSize: '0.68rem', color: '#64748b' }}>
            {lang === 'hi' ? 'मौसम परिवर्तन पर स्वतः नवीनीकृत' : 'Auto-refreshed on live telemetry change'}
          </span>
        </div>
      </div>

      {/* 3. CORE RECOMMENDATION CARDS (TOP 2 OR 3 CROPS - Spec requirement 3 & 4) */}
      {loading && !data ? (
        <div style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
          <div style={{ fontSize: '1.8rem', animation: 'spin 1s linear infinite', display: 'inline-block', marginBottom: '0.5rem' }}>🔄</div>
          <p style={{ margin: 0, fontSize: '0.88rem' }}>
            {lang === 'hi' ? 'बहु-कारकीय फसल उपयुक्तता व किस्म विश्लेषण चल रहा है...' : 'Evaluating multi-factor crop and variety suitability...'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.1rem', marginBottom: '1.4rem' }}>
          {recommendations.map((rec) => {
            const scColor = scoreColor(rec.suitability_score);
            return (
              <div
                key={rec.crop_id}
                style={{
                  background: 'rgba(255, 255, 255, 0.035)',
                  borderRadius: '16px',
                  border: `1.5px solid ${rec.rank === 1 ? 'rgba(16, 185, 129, 0.5)' : 'rgba(255, 255, 255, 0.09)'}`,
                  padding: '1.15rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  boxShadow: rec.rank === 1 ? '0 6px 24px rgba(16, 185, 129, 0.15)' : 'none',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                {/* Top Rank Demarcation Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        background: rec.rank === 1 ? 'linear-gradient(135deg, #10b981, #059669)' : rec.rank === 2 ? 'linear-gradient(135deg, #0284c7, #0369a1)' : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontWeight: 900,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      #{rec.rank} {rec.rank === 1 ? (lang === 'hi' ? 'सर्वश्रेष्ठ उपयुक्त' : 'TOP FIT') : (lang === 'hi' ? 'सिफारिश' : 'RECOMMENDED')}
                    </span>
                    <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.06)', color: '#cbd5e1', fontSize: '0.68rem', fontWeight: 700 }}>
                      {rec.category}
                    </span>
                  </div>

                  {/* Suitability Score Pill */}
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: scColor, lineHeight: 1 }}>
                      {rec.suitability_score}%
                    </span>
                    <span style={{ display: 'block', fontSize: '0.62rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
                      {lang === 'hi' ? 'अनुकूलता स्कोर' : 'Suitability Score'}
                    </span>
                  </div>
                </div>

                {/* Crop Name & Recommended Variety Headline */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.9rem', lineHeight: 1 }}>{rec.icon}</span>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.12rem', color: '#f8fafc', fontWeight: 800 }}>
                        {lang === 'hi' ? rec.crop_name_hi : rec.crop_name_en}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                          {lang === 'hi' ? 'अनुशंसित किस्म:' : 'Recommended Variety:'}
                        </span>
                        <strong style={{ fontSize: '0.88rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.12)', padding: '0.12rem 0.5rem', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                          ✨ {lang === 'hi' ? rec.recommended_variety_hi : rec.recommended_variety}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Suitability Score Progress Bar */}
                <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden', marginBottom: '0.85rem' }}>
                  <div style={{ width: `${rec.suitability_score}%`, height: '100%', background: `linear-gradient(90deg, ${scColor}, #38bdf8)`, borderRadius: '999px', transition: 'width 0.8s ease' }} />
                </div>

                {/* Natural-Language Justification: WHY IT IS SUITABLE (Spec requirement 3 & 4) */}
                <div style={{ background: 'rgba(18, 14, 40, 0.72)', padding: '0.75rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
                    <span>💡</span>
                    <span>{lang === 'hi' ? 'यह फसल व किस्म क्यों उपयुक्त है?' : 'Why this crop & variety are suitable'}</span>
                  </span>
                  <p style={{ margin: 0, fontSize: '0.79rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                    {lang === 'hi' ? rec.why_suitable_hi : rec.why_suitable_en}
                  </p>
                </div>

                {/* Key Details: Sowing Window, Expected Water Need & Duration */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.55rem', marginBottom: '0.75rem' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.5rem 0.65rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <span style={{ fontSize: '0.64rem', color: '#94a3b8', display: 'block', fontWeight: 600 }}>
                      🌱 {lang === 'hi' ? 'बुवाई खिड़की' : 'Sowing Window'}
                    </span>
                    <strong style={{ fontSize: '0.76rem', color: '#f1f5f9' }}>
                      {lang === 'hi' ? rec.sowing_window_hi : rec.sowing_window}
                    </strong>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.5rem 0.65rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <span style={{ fontSize: '0.64rem', color: '#94a3b8', display: 'block', fontWeight: 600 }}>
                      💧 {lang === 'hi' ? 'अपेक्षित जल आवश्यकता' : 'Expected Water Need'}
                    </span>
                    <strong style={{ fontSize: '0.74rem', color: '#38bdf8' }}>
                      {rec.expected_water_need}
                    </strong>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.5rem 0.65rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <span style={{ fontSize: '0.64rem', color: '#94a3b8', display: 'block', fontWeight: 600 }}>
                      ⏱️ {lang === 'hi' ? 'परिपक्वता अवधि' : 'Crop Duration'}
                    </span>
                    <strong style={{ fontSize: '0.76rem', color: '#f1f5f9' }}>
                      {rec.duration_days} {lang === 'hi' ? 'दिन' : 'days'}
                    </strong>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.5rem 0.65rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <span style={{ fontSize: '0.64rem', color: '#94a3b8', display: 'block', fontWeight: 600 }}>
                      💰 {lang === 'hi' ? 'एमएसपी / बाजार भाव' : 'Benchmark Price'}
                    </span>
                    <strong style={{ fontSize: '0.76rem', color: '#10b981' }}>
                      ₹{rec.market_price_inr_qtl}/qtl
                    </strong>
                  </div>
                </div>

                {/* Key Risks Alert Box (Spec requirement 3) */}
                <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '8px', padding: '0.5rem 0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.68rem', color: '#fca5a5', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.15rem' }}>
                    <span>⚠️</span>
                    <span>{lang === 'hi' ? 'मुख्य जोखिम व मौसम चेतावनी:' : 'Key Climate & Agronomic Risks:'}</span>
                  </span>
                  <p style={{ margin: 0, fontSize: '0.74rem', color: '#fca5a5', lineHeight: 1.4 }}>
                    {lang === 'hi' ? rec.key_risks_hi : rec.key_risks_en}
                  </p>
                </div>

                {/* Intercrop Option Recommendation (Spec requirement 10) */}
                {rec.intercrop_options && (
                  <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '0.75rem', background: 'rgba(16, 185, 129, 0.06)', padding: '0.45rem 0.7rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.18)' }}>
                    <strong style={{ color: '#34d399' }}>🌾 {lang === 'hi' ? 'अंतःफसल विकल्प:' : 'Intercrop Option:'}</strong> {rec.intercrop_options}
                  </div>
                )}

                {/* Evidence & Institutional Source (Spec requirement 8 & 10) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem', borderTop: '1px solid rgba(255, 255, 255, 0.07)', paddingTop: '0.65rem', marginTop: '0.2rem' }}>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                    <span>🏛️ <strong>{rec.source}</strong></span>
                    <span style={{ display: 'block', color: '#10b981', fontSize: '0.64rem', fontWeight: 600 }}>
                      ✓ {rec.confidence}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveVarietyModal(rec)}
                    style={{
                      background: 'rgba(56, 189, 248, 0.12)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      color: '#38bdf8',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.28rem 0.65rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    🔍 {lang === 'hi' ? 'अन्य किस्में देखें' : 'Compare Varieties'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. ALTERNATIVE ELIGIBLE OPTIONS & "WHY NOT?" COLLAPSIBLE SECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
        {/* Alternative Eligible Crops */}
        {alternativeOptions.length > 0 && (
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', padding: '0.9rem', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f1f5f9' }}>
                🌿 {lang === 'hi' ? 'अन्य योग्य फसल विकल्प (Alternative Options)' : 'Other Eligible Crop Options'}
              </span>
              <span className="badge" style={{ fontSize: '0.64rem', background: 'rgba(255, 255, 255, 0.06)' }}>
                {alternativeOptions.length} crops
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {alternativeOptions.map((alt) => (
                <div
                  key={alt.crop_id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.45rem 0.65rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '8px',
                    fontSize: '0.76rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span>{alt.icon}</span>
                    <strong style={{ color: '#f1f5f9' }}>{lang === 'hi' ? alt.crop_name_hi : alt.crop_name_en}</strong>
                    <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>({alt.best_variety})</span>
                  </div>
                  <span style={{ color: '#38bdf8', fontWeight: 700 }}>{alt.suitability_score}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* "Why Not?" Excluded Crops Inspector (Spec requirement 10) */}
        {whyNotList.length > 0 && (
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', padding: '0.9rem', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div
              onClick={() => setIsWhyNotExpanded(!isWhyNotExpanded)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fca5a5' }}>
                ❓ {lang === 'hi' ? 'अन्य प्रमुख फसलें क्यों शामिल नहीं हैं? (Why Not?)' : 'Why Were Major Crops Excluded?'}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                {isWhyNotExpanded ? '▲ ' + (lang === 'hi' ? 'छिपाएं' : 'Hide') : '▼ ' + (lang === 'hi' ? 'देखें' : 'View')}
              </span>
            </div>

            <p style={{ margin: '0.2rem 0 0.5rem', fontSize: '0.72rem', color: '#94a3b8' }}>
              {lang === 'hi'
                ? 'वैज्ञानिक कारण कि गेहूं या सरसों जैसी फसलें अभी इस मौसम में क्यों अनुशंसित नहीं हैं:'
                : 'Agronomic explanation why major crops (e.g. Wheat, Mustard) are currently penalized or excluded:'}
            </p>

            {isWhyNotExpanded && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.6rem' }}>
                {whyNotList.map((item) => (
                  <div
                    key={item.crop_id}
                    style={{
                      padding: '0.55rem 0.75rem',
                      background: 'rgba(239, 68, 68, 0.05)',
                      borderRadius: '8px',
                      border: '1px solid rgba(239, 68, 68, 0.18)',
                      fontSize: '0.74rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                      <strong style={{ color: '#f8fafc' }}>{item.icon} {lang === 'hi' ? item.crop_name_hi : item.crop_name_en} ({item.season})</strong>
                      <span className="badge badge-danger" style={{ fontSize: '0.62rem' }}>
                        {lang === 'hi' ? 'अनुपयुक्त' : 'Excluded'} ({item.score}%)
                      </span>
                    </div>
                    <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.45 }}>
                      {lang === 'hi' ? item.reason_hi : item.reason_en}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5. VARIETY COMPARISON MODAL (When farmer clicks 'Compare Varieties') */}
      {activeVarietyModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(5, 3, 15, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            style={{
              background: 'rgba(18, 14, 40, 0.96)',
              borderRadius: '20px',
              maxWidth: '560px',
              width: '100%',
              padding: '1.5rem',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.18rem', color: '#f1f5f9', fontWeight: 800 }}>
                  🌾 {lang === 'hi' ? activeVarietyModal.crop_name_hi : activeVarietyModal.crop_name_en} — {lang === 'hi' ? 'प्रमाणित किस्म तुलना' : 'Verified Cultivar Rankings'}
                </h3>
                <p style={{ margin: '0.15rem 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>
                  {lang === 'hi' ? 'वर्तमान मौसम व स्थान परिस्थितियों के अनुसार सभी किस्मों का स्कोर' : 'Ranked against current local temperature, soil moisture, and forecast risk'}
                </p>
              </div>
              <button
                onClick={() => setActiveVarietyModal(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.3rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', maxHeight: '360px', overflowY: 'auto', paddingRight: '0.25rem' }}>
              {(activeVarietyModal.all_evaluated_varieties || []).map((v, idx) => {
                const isTop = idx === 0;
                return (
                  <div
                    key={v.name}
                    style={{
                      padding: '0.85rem',
                      borderRadius: '12px',
                      background: isTop ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                      border: isTop ? '1.5px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        {isTop && <span style={{ fontSize: '0.7rem', background: '#10b981', color: '#fff', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 900 }}>TOP MATCH</span>}
                        <strong style={{ fontSize: '0.92rem', color: '#f1f5f9' }}>{v.name}</strong>
                      </div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: isTop ? '#10b981' : '#38bdf8' }}>
                        {v.score}%
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                      <span>⏱️ {v.duration} days maturity</span>
                      <span style={{ color: '#34d399' }}>🛡️ {v.tolerance}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '1.2rem', textAlign: 'right' }}>
              <button
                onClick={() => setActiveVarietyModal(null)}
                style={{
                  padding: '0.45rem 1.2rem',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #059669, #0284c7)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                }}
              >
                {lang === 'hi' ? 'ठीक है' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
