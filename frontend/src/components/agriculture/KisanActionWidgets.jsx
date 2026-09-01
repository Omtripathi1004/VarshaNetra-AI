import React from 'react';
import VernacularTTSButton from '../common/VernacularTTSButton';

/**
 * KisanActionWidgets
 * Traffic Light Action System for Kisan / Farmer Mode:
 *  - 🟢 Green: Safe to Sow / रोपाई हेतु अनुकूल समय
 *  - 🟡 Yellow: Monitor & Prepare / सतर्क रहें व जल निकास तैयार रखें
 *  - 🔴 Red: High Risk / Hold / बुवाई रोकें व फसल सुरक्षित करें
 * Features intuitive high-contrast badges, simple vernacular actions, and single-tap audio TTS.
 */
export default function KisanActionWidgets({
  weather,
  prediction,
  cropAdvisory,
  selectedCrop = 'rice',
  locationName = 'Lucknow, Uttar Pradesh',
  lang = 'en',
}) {
  const rainProb = prediction?.probability_pct ?? weather?.rain_probability_pct ?? 78;
  const expectedRain = prediction?.expected_rain_mm ?? weather?.rain_mm ?? 18.5;
  const temp = weather?.temp_c ?? 29;

  // Determine Traffic Light Status based on agro-meteorological rules
  let trafficStatus = 'GREEN'; // 'GREEN' | 'YELLOW' | 'RED'
  let trafficTitleEn = '🟢 SAFE TO SOW / OPTIMAL WINDOW';
  let trafficTitleHi = '🟢 रोपाई हेतु सुरक्षित व सर्वोत्तम समय';
  let primaryActionEn = 'Ideal weather window for Kharif Paddy transplanting and land preparation.';
  let primaryActionHi = 'धान की रोपाई व खेत की तैयारी के लिए आज का मौसम अत्यंत अनुकूल है।';
  let badgeColor = '#059669';
  let bgGradient = 'linear-gradient(135deg, rgba(5, 150, 105, 0.2) 0%, rgba(16, 185, 129, 0.08) 100%)';
  let borderColor = '#059669';

  if (rainProb >= 75 && expectedRain >= 50) {
    // Extreme rain warning -> RED
    trafficStatus = 'RED';
    trafficTitleEn = '🔴 HIGH RISK / HOLD SOWING & SPRAYS';
    trafficTitleHi = '🔴 उच्च जोखिम / बुवाई व छिड़काव स्थगित करें';
    primaryActionEn = `Heavy rainfall alert (${expectedRain} mm expected). Do NOT apply fertilizers/pesticides. Clear field drainage channels immediately to prevent waterlogging.`;
    primaryActionHi = `भारी बारिश की चेतावनी (${expectedRain} मिमी अनुमानित)। कीटनाशक या खाद का छिड़काव न करें। जलभराव रोकने के लिए तुरंत नालियां साफ़ करें।`;
    badgeColor = '#dc2626';
    bgGradient = 'linear-gradient(135deg, rgba(220, 38, 38, 0.25) 0%, rgba(239, 68, 68, 0.1) 100%)';
    borderColor = '#dc2626';
  } else if (rainProb <= 30 || (rainProb >= 55 && rainProb < 75)) {
    // Moderate / Watch window -> YELLOW
    trafficStatus = 'YELLOW';
    trafficTitleEn = '🟡 MONITOR & PREPARE / WATCH BREAK';
    trafficTitleHi = '🟡 सतर्क रहें व तैयारी रखें / निगरानी खिड़की';
    primaryActionEn = 'Moderate rain conditions. Clear drainage furrows and monitor soil moisture before applying urea top-dressing.';
    primaryActionHi = 'मध्यम वर्षा की संभावना। जल निकासी की नालियां ठीक रखें और यूरिया छिड़काव से पहले खेत की नमी जांचें।';
    badgeColor = '#d97706';
    bgGradient = 'linear-gradient(135deg, rgba(217, 119, 6, 0.22) 0%, rgba(245, 158, 11, 0.08) 100%)';
    borderColor = '#d97706';
  }

  // Simplified Farmer Action Items
  const ACTION_ITEMS = [
    {
      id: 1,
      icon: trafficStatus === 'RED' ? '🛑' : trafficStatus === 'YELLOW' ? '⚠️' : '🌱',
      titleEn: trafficStatus === 'RED' ? 'Hold Direct Sowing' : 'Good Window to Sow',
      titleHi: trafficStatus === 'RED' ? 'बुवाई तुरंत रोकें' : 'रोपाई हेतु अनुकूल समय',
      descEn: trafficStatus === 'RED'
        ? 'Heavy runoff can wash away newly sown seeds. Wait 48 hours for clear weather.'
        : 'Soil moisture is optimal (38%). Complete transplanting of 20-25 day old seedlings.',
      descHi: trafficStatus === 'RED'
        ? 'तेज़ बहाव से नए बीज बह सकते हैं। मौसम साफ़ होने तक 48 घंटे प्रतीक्षा करें।'
        : 'मृदा में अनुकूल नमी (38%) है। 20-25 दिन की धान की पौध की रोपाई पूरी करें।',
      tag: trafficStatus === 'RED' ? 'Hold' : 'Safe',
      color: badgeColor,
    },
    {
      id: 2,
      icon: '🚜',
      titleEn: 'Drainage Channel Maintenance',
      titleHi: 'जल निकासी नालियों की सफ़ाई',
      descEn: 'Clear farm drainage furrows today to discharge excess storm runoff safely.',
      descHi: 'खेत के किनारों पर जल निकास नालियां साफ़ रखें ताकि भारी वर्षा में पानी न भरे।',
      tag: 'Urgent',
      color: '#0284c7',
    },
    {
      id: 3,
      icon: '💊',
      titleEn: trafficStatus === 'RED' ? 'Pesticide Spray: PAUSED' : 'Fertilizer & Spray Window',
      titleHi: trafficStatus === 'RED' ? 'कीटनाशक छिड़काव: स्थगित' : 'खाद व छिड़काव सलाह',
      descEn: trafficStatus === 'RED'
        ? 'Impending downpour will wash chemical sprays. Postpone by 2-3 days.'
        : 'Favorable winds (<15 km/h) for bio-fertilizer application and foliar zinc spray.',
      descHi: trafficStatus === 'RED'
        ? 'आगामी वर्षा से दवा धुल जाएगी। 2-3 दिन बाद ही छिड़काव करें।'
        : 'हवा की धीमी गति (<15 किमी/घं) जिंक व जैविक खाद के छिड़काव हेतु अनुकूल है।',
      tag: trafficStatus === 'RED' ? 'Hold Spray' : 'Clear Window',
      color: trafficStatus === 'RED' ? '#ef4444' : '#059669',
    },
  ];

  const fullAudioScriptHindi = `नमस्ते किसान भाई। वर्षानेत्र कृषि सलाह। ${trafficTitleHi}। ${primaryActionHi} आज का तापमान ${temp} डिग्री सेल्सियस है और वर्षा की संभावना ${rainProb} प्रतिशत है। कृपया जल निकासी की नालियां साफ़ रखें।`;
  const fullAudioScriptEnglish = `Hello farmer. VarshaNetra Weather Advisory. ${trafficTitleEn}. ${primaryActionEn} Today's temperature is ${temp} degrees Celsius with ${rainProb}% rain probability. Keep drainage furrows clear.`;

  return (
    <div className="kisan-action-system" style={{ marginBottom: '1.4rem' }}>
      {/* 1. HERO HIGH-CONTRAST TRAFFIC LIGHT BANNER */}
      <div
        className="kisan-traffic-banner"
        style={{
          background: bgGradient,
          border: `2px solid ${borderColor}`,
          borderRadius: '18px',
          padding: '1.25rem 1.4rem',
          boxShadow: `0 8px 30px rgba(0,0,0,0.35)`,
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <span
                style={{
                  background: badgeColor,
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '0.85rem',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '999px',
                  letterSpacing: '0.04em',
                  boxShadow: `0 0 16px ${badgeColor}88`,
                }}
              >
                {lang === 'hi' ? trafficTitleHi : trafficTitleEn}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 600 }}>
                📍 {locationName}
              </span>
            </div>

            <h3 style={{ margin: '0.4rem 0 0.2rem', fontSize: '1.2rem', color: '#f8fafc', fontWeight: 800 }}>
              🌾 {lang === 'hi' ? 'किसान प्राथमिक कार्य सलाह (Kisan Direct Advisory)' : 'Farmer Action Summary'}
            </h3>

            <p style={{ margin: 0, fontSize: '0.96rem', color: '#f1f5f9', lineHeight: 1.55, fontWeight: 600 }}>
              {lang === 'hi' ? primaryActionHi : primaryActionEn}
            </p>
          </div>

          {/* Single-Tap Vernacular TTS Audio Player */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
            <VernacularTTSButton
              textHindi={fullAudioScriptHindi}
              textEnglish={fullAudioScriptEnglish}
              lang={lang}
              labelHi="📢 सलाह सुनें (Audio)"
              labelEn="📢 Listen Voice Advisory"
              size="md"
            />
            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
              {lang === 'hi' ? '⚡ 1-टैप हिंदी वाणी प्रसारण' : '⚡ 1-Tap Vernacular Speech'}
            </span>
          </div>
        </div>

        {/* Farmer Simple Conditions Indicator (Replacing Technical hPa and m3/m3) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.65rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '0.8rem' }}>
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '0.6rem 0.8rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.4rem' }}>💧</span>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>{lang === 'hi' ? 'वर्षा संभावना' : 'Rain Chance'}</span>
              <strong style={{ fontSize: '0.95rem', color: '#38bdf8' }}>{rainProb}% ({expectedRain} mm)</strong>
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '0.6rem 0.8rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🌱</span>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>{lang === 'hi' ? 'मृदा नमी स्थिति' : 'Soil Moisture'}</span>
              <strong style={{ fontSize: '0.95rem', color: '#34d399' }}>{lang === 'hi' ? 'पर्याप्त नमी (38%)' : 'Optimal (38%)'}</strong>
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '0.6rem 0.8rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.4rem' }}>💨</span>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>{lang === 'hi' ? 'वायुमंडलीय स्थिति' : 'Atmosphere'}</span>
              <strong style={{ fontSize: '0.95rem', color: '#a78bfa' }}>{lang === 'hi' ? 'सामान्य वायुदाब' : 'Normal Pressure'}</strong>
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '0.6rem 0.8rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🌡️</span>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>{lang === 'hi' ? 'तापमान' : 'Temperature'}</span>
              <strong style={{ fontSize: '0.95rem', color: '#f59e0b' }}>{temp}°C</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THREE INTUITIVE ACTION CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.85rem' }}>
        {ACTION_ITEMS.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'rgba(18, 14, 40, 0.72)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '14px',
              padding: '0.95rem 1.1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.5rem',
              transition: 'transform 0.2s',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                <span
                  style={{
                    background: `${item.color}22`,
                    color: item.color,
                    border: `1px solid ${item.color}55`,
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '0.15rem 0.55rem',
                    borderRadius: '6px',
                  }}
                >
                  {item.tag}
                </span>
              </div>

              <h4 style={{ margin: '0.2rem 0', fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc' }}>
                {lang === 'hi' ? item.titleHi : item.titleEn}
              </h4>

              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                {lang === 'hi' ? item.descHi : item.descEn}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.2rem' }}>
              <VernacularTTSButton
                textHindi={`${item.titleHi}। ${item.descHi}`}
                textEnglish={`${item.titleEn}. ${item.descEn}`}
                lang={lang}
                labelHi="सुनें"
                labelEn="Listen"
                size="sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
