import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { getInitialBaseline } from '../agriculture/SmartCropRecommendations';

/**
 * DashboardVoiceBriefing
 * 
 * Provides an intelligent, high-fidelity AI Audio Briefing on the Dashboard.
 * Vocally narrates all vital details:
 * 1. Location & Real-time Temperature / Weather Telemetry
 * 2. Monsoon Scenario & Phase Outlook
 * 3. Rainfall Prediction & Risk Rating
 * 4. Top 3 Recommended Crops for the Farmer's agro-climatic zone
 * 5. Actionable Field Guidance & Recommendations
 * 
 * Fully bilingual: Speaks in English when lang='en' and Hindi when lang='hi'.
 */
export default function DashboardVoiceBriefing({
  weather,
  prediction,
  monsoon,
  risk,
  cropAdvisory,
  location,
  lang = 'en',
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const currentStepRef = useRef(0);
  const cancelRequestedRef = useRef(false);

  // Check browser speech synthesis support
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  // Compute Top 3 Recommended Crops dynamically for this location
  const top3Crops = useMemo(() => {
    try {
      const recs = getInitialBaseline(location);
      return (recs || []).slice(0, 3);
    } catch {
      return [];
    }
  }, [location?.state, location?.district, location?.city]);

  // Formulate Structured Briefing Sections
  const briefingSections = useMemo(() => {
    const locName = location?.display_name || `${location?.district || 'Lucknow'}, ${location?.state || 'Uttar Pradesh'}`;
    const temp = Math.round(weather?.temperature_c ?? 28.5);
    const humidity = Math.round(weather?.humidity_pct ?? 78);
    const wind = Math.round(weather?.wind_speed_kmh ?? 12);
    const condEn = weather?.weather_description_en || 'Fair weather';
    const condHi = weather?.weather_description_hi || 'सुहाना मौसम';

    const monPhase = monsoon?.phase || 'Active SW Monsoon';
    const monDescEn = monsoon?.progress_description_en || 'Monsoon flow is stabilized across northern and central plains.';
    const monDescHi = monsoon?.progress_description_hi || 'उत्तरी एवं मध्य मैदानी क्षेत्रों में मानसूनी प्रवाह सामान्य रूप से सक्रिय है।';

    const predMm = (prediction?.rainfall_mm_24h ?? 14.5).toFixed(1);
    const predProb = Math.round(prediction?.probability_pct ?? 72);
    const riskLevelEn = risk?.composite_risk_level || prediction?.risk_level || 'Moderate';
    const riskLevelHi = riskLevelEn === 'High' ? 'उच्च' : riskLevelEn === 'Moderate' ? 'मध्यम' : 'कम / सामान्य';

    const c1 = top3Crops[0] || { crop_name_en: 'Paddy', crop_name_hi: 'धान', recommended_variety: 'Swarna (MTU-7029)', recommended_variety_hi: 'स्वर्णा' };
    const c2 = top3Crops[1] || { crop_name_en: 'Maize', crop_name_hi: 'मक्का', recommended_variety: 'Dekalb DKC-9108', recommended_variety_hi: 'डेकाल्ब' };
    const c3 = top3Crops[2] || { crop_name_en: 'Pigeonpea (Arhar)', crop_name_hi: 'अरहर', recommended_variety: 'Pusa 992', recommended_variety_hi: 'पूसा 992' };

    const actionEn = cropAdvisory?.irrigation_action || 'Maintain field drainage ridges and postpone pesticide spraying before expected showers.';
    const actionHi = cropAdvisory?.advisory_text_hi || 'खेतों में जल निकास नालियां खुली रखें तथा आगामी वर्षा को देखते हुए छिड़काव टालें।';

    return [
      {
        id: 'loc_temp',
        icon: '📍',
        titleEn: 'Location & Temperature',
        titleHi: 'स्थान व तापमान',
        textEn: `Welcome to VarshaNetra AI. Location briefing for ${locName}. Current temperature is ${temp} degrees Celsius, relative humidity is ${humidity} percent, wind speed is ${wind} kilometers per hour, with ${condEn}.`,
        textHi: `वर्षानेत्रा एआई में आपका स्वागत है। ${locName} के लिए मौसम सारांश। वर्तमान तापमान ${temp} डिग्री सेल्सियस है, हवा में नमी ${humidity} प्रतिशत है, हवा की गति ${wind} किलोमीटर प्रति घंटा है, और मौसम ${condHi} है।`,
      },
      {
        id: 'monsoon',
        icon: '🌦️',
        titleEn: 'Monsoon Scenario',
        titleHi: 'मानसून की स्थिति',
        textEn: `Current monsoon scenario: The seasonal phase is ${monPhase}. ${monDescEn}`,
        textHi: `वर्तमान मानसून परिदृश्य: मौसमी चरण ${monPhase} है। ${monDescHi}`,
      },
      {
        id: 'prediction',
        icon: '🌧️',
        titleEn: 'Rainfall Prediction & Risk',
        titleHi: 'वर्षा पूर्वानुमान व जोखिम',
        textEn: `Rainfall prediction: Over the next 24 to 48 hours, expected rainfall is ${predMm} millimeters with a probability of ${predProb} percent. Overall weather risk is assessed as ${riskLevelEn}.`,
        textHi: `वर्षा पूर्वानुमान: आगामी 24 से 48 घंटों में लगभग ${predMm} मिलीमीटर वर्षा का अनुमान है, जिसकी संभावना ${predProb} प्रतिशत है। समग्र मौसम जोखिम स्तर ${riskLevelHi} आंका गया है।`,
      },
      {
        id: 'crops',
        icon: '🌾',
        titleEn: 'Top 3 Recommended Crops',
        titleHi: 'शीर्ष 3 अनुशंसित फसलें',
        textEn: `Top three crops recommended for your land are: First, ${c1.crop_name_en}, variety ${c1.recommended_variety || 'certified seed'}. Second, ${c2.crop_name_en}, variety ${c2.recommended_variety || 'certified hybrid'}. Third, ${c3.crop_name_en}, variety ${c3.recommended_variety || 'recommended variety'}. These crops maximize yield under current soil and monsoon conditions.`,
        textHi: `आपकी जमीन के लिए शीर्ष तीन अनुशंसित फसलें हैं: पहली, ${c1.crop_name_hi}, उन्नत किस्म ${c1.recommended_variety_hi || c1.recommended_variety}। दूसरी, ${c2.crop_name_hi}, किस्म ${c2.recommended_variety_hi || c2.recommended_variety}। और तीसरी, ${c3.crop_name_hi}, किस्म ${c3.recommended_variety_hi || c3.recommended_variety}। ये फसलें वर्तमान मिट्टी और मानसूनी वर्षा में सर्वाधिक उपज सुनिश्चित करती हैं।`,
      },
      {
        id: 'advisory',
        icon: '💡',
        titleEn: 'Action Recommendations',
        titleHi: 'प्रमुख कृषि सिफारिशें',
        textEn: `Key field recommendations: ${actionEn} Check your VarshaNetra dashboard for live updates. Wishing you a bountiful harvest.`,
        textHi: `प्रमुख कृषि सलाह: ${actionHi} नवीनतम जानकारी के लिए वर्षानेत्रा डैशबोर्ड से जुड़े रहें। आपकी अच्छी फसल की शुभकामना।`,
      },
    ];
  }, [weather, prediction, monsoon, risk, cropAdvisory, location, top3Crops]);

  // Clean stop of speech
  const stopBriefing = useCallback(() => {
    cancelRequestedRef.current = true;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setActiveSectionIndex(-1);
    currentStepRef.current = 0;
  }, []);

  // Speak a sequential list of text segments
  const playFromIndex = useCallback((startIndex = 0) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    cancelRequestedRef.current = false;
    setIsPlaying(true);
    setIsPaused(false);

    const isHi = lang === 'hi';
    const voices = window.speechSynthesis.getVoices();

    // Select suitable voice
    let voice = null;
    if (voices && voices.length > 0) {
      if (isHi) {
        voice = voices.find(v => v.lang.startsWith('hi') || v.name.includes('Hindi') || v.name.includes('Lekha') || v.name.includes('Kalpana') || v.name.includes('Swara') || v.name.includes('Madhur'));
      } else {
        voice = voices.find(v => v.lang === 'en-IN' || v.name.includes('India') || v.name.includes('Rishi') || v.name.includes('Ravi') || v.name.includes('Neerja'))
          || voices.find(v => v.lang.startsWith('en'));
      }
    }

    const speakStep = (idx) => {
      if (cancelRequestedRef.current || idx >= briefingSections.length) {
        setIsPlaying(false);
        setIsPaused(false);
        setActiveSectionIndex(-1);
        return;
      }

      setActiveSectionIndex(idx);
      currentStepRef.current = idx;

      const sec = briefingSections[idx];
      const text = isHi ? sec.textHi : sec.textEn;
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.lang = isHi ? 'hi-IN' : 'en-IN';
      utterance.rate = isHi ? 0.94 : 0.98;
      utterance.pitch = 1.0;
      if (voice) utterance.voice = voice;

      utterance.onend = () => {
        if (!cancelRequestedRef.current) {
          // slight natural pause between sections
          setTimeout(() => {
            speakStep(idx + 1);
          }, 350);
        }
      };

      utterance.onerror = (e) => {
        console.warn('Speech error at step', idx, e);
        if (!cancelRequestedRef.current && idx + 1 < briefingSections.length) {
          speakStep(idx + 1);
        } else {
          setIsPlaying(false);
          setIsPaused(false);
          setActiveSectionIndex(-1);
        }
      };

      window.speechSynthesis.speak(utterance);
    };

    speakStep(startIndex);
  }, [lang, briefingSections]);

  const togglePlayPause = () => {
    if (!isSupported) return;

    if (!isPlaying) {
      playFromIndex(0);
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  // Switch voice language automatically if lang changes while playing
  useEffect(() => {
    if (isPlaying) {
      stopBriefing();
      setTimeout(() => {
        playFromIndex(0);
      }, 300);
    }
  }, [lang]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isSupported) return null;

  const isHindi = lang === 'hi';

  return (
    <div
      className="dashboard-voice-briefing-card"
      style={{
        background: 'linear-gradient(135deg, rgba(16, 24, 39, 0.92) 0%, rgba(6, 78, 59, 0.35) 50%, rgba(2, 44, 34, 0.95) 100%)',
        border: '1px solid rgba(52, 211, 153, 0.25)',
        borderRadius: '16px',
        padding: '1rem 1.25rem',
        marginBottom: '1.25rem',
        boxShadow: isPlaying ? '0 0 25px rgba(5, 150, 105, 0.35)' : '0 4px 20px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Ambient Glow / Status Indicator */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: isPlaying
          ? 'linear-gradient(90deg, #10b981, #06b6d4, #10b981)'
          : 'transparent',
      }} />

      {/* Main Header / Control Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.8rem',
      }}>
        {/* Left: Branding & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: isPlaying
                ? 'linear-gradient(135deg, #059669 0%, #0284c7 100%)'
                : 'rgba(5, 150, 105, 0.15)',
              border: '1px solid rgba(52, 211, 153, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              boxShadow: isPlaying ? '0 0 16px rgba(16, 185, 129, 0.6)' : 'none',
              transition: 'all 0.3s',
            }}
          >
            {isPlaying ? '🔊' : '🎙️'}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <strong style={{ fontSize: '1rem', color: '#f8fafc', fontWeight: 800, letterSpacing: '-0.01em' }}>
                {isHindi ? 'वर्षानेत्रा AI आवाज़ ब्रीफिंग (डैशबोर्ड ऑडियो)' : 'VarshaNetra AI Voice Assistant'}
              </strong>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '999px',
                  background: isPlaying ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  color: isPlaying ? '#34d399' : '#94a3b8',
                  border: isPlaying ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                {isHindi ? '🌐 हिन्दी आवाज़ (hi-IN)' : '🌐 English Voice (en-IN)'}
              </span>
            </div>

            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#cbd5e1' }}>
              {isPlaying
                ? (isHindi
                  ? `बोल रहे हैं: ${briefingSections[activeSectionIndex]?.titleHi || 'डैशबोर्ड सारांश'}...`
                  : `Speaking: ${briefingSections[activeSectionIndex]?.titleEn || 'Dashboard Briefing'}...`)
                : (isHindi
                  ? 'स्थान, तापमान, मानसून स्थिति, वर्षा पूर्वानुमान, 3 प्रमुख फसलें व सलाह — एक क्लिक में सुनें!'
                  : 'Hear Location, Temperature, Monsoon, Rain Forecast, Top 3 Crops & Action Recommendations!')}
            </p>
          </div>
        </div>

        {/* Right: Audio Playback Controls & Equalizer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          {/* Animated Equalizer Waveform when speaking */}
          {isPlaying && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                height: '24px',
                padding: '0 0.5rem',
              }}
              title="Voice synthesizing live..."
            >
              {[0.4, 0.8, 1.0, 0.6, 0.9, 0.5].map((scale, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    width: '3px',
                    height: isPaused ? '6px' : `${scale * 20}px`,
                    background: '#34d399',
                    borderRadius: '2px',
                    animation: isPaused ? 'none' : `bounceWave 0.8s ease-in-out infinite alternate ${i * 0.12}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Primary Speak Button */}
          <button
            type="button"
            onClick={togglePlayPause}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.55rem 1.15rem',
              borderRadius: '999px',
              fontSize: '0.84rem',
              fontWeight: 800,
              cursor: 'pointer',
              border: 'none',
              background: isPlaying
                ? (isPaused ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'linear-gradient(135deg, #059669 0%, #047857 100%)')
                : 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)',
              color: '#ffffff',
              boxShadow: isPlaying ? '0 4px 14px rgba(16, 185, 129, 0.4)' : '0 4px 12px rgba(2, 132, 199, 0.3)',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <span style={{ fontSize: '1rem' }}>
              {!isPlaying ? '▶️' : isPaused ? '▶️' : '⏸️'}
            </span>
            <span>
              {!isPlaying
                ? (isHindi ? 'डैशबोर्ड सारांश सुनें (AI Voice)' : 'Listen Full Briefing (AI Voice)')
                : isPaused
                ? (isHindi ? 'जारी रखें (Resume)' : 'Resume Voice')
                : (isHindi ? 'रोकें (Pause)' : 'Pause')}
            </span>
          </button>

          {/* Stop Button (visible while playing) */}
          {isPlaying && (
            <button
              type="button"
              onClick={stopBriefing}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#fca5a5',
                transition: 'all 0.2s',
              }}
              title={isHindi ? 'ध्वनि प्रसारण बंद करें' : 'Stop Speaking'}
            >
              ⏹️ {isHindi ? 'बंद करें' : 'Stop'}
            </button>
          )}

          {/* Expand / View Full Script Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: isExpanded ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)',
              color: '#e2e8f0',
              transition: 'all 0.2s',
            }}
          >
            {isExpanded
              ? (isHindi ? 'विवरण छुपाएं ▲' : 'Hide Script ▲')
              : (isHindi ? 'पूरी रिपोर्ट पढ़ें ▼' : 'Read Full Script ▼')}
          </button>
        </div>
      </div>

      {/* Interactive Section Progress Pills */}
      <div style={{
        display: 'flex',
        gap: '0.4rem',
        marginTop: '0.85rem',
        flexWrap: 'wrap',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '0.75rem',
      }}>
        {briefingSections.map((sec, idx) => {
          const isActive = activeSectionIndex === idx;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => playFromIndex(idx)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.3rem 0.65rem',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                border: isActive ? '1px solid #34d399' : '1px solid rgba(255, 255, 255, 0.08)',
                background: isActive ? 'rgba(5, 150, 105, 0.3)' : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? '#6ee7b7' : '#94a3b8',
                transition: 'all 0.2s',
              }}
              title={isHindi ? `केवल ${sec.titleHi} सुनें` : `Listen to ${sec.titleEn}`}
            >
              <span>{sec.icon}</span>
              <span>{isHindi ? sec.titleHi : sec.titleEn}</span>
              {isActive && <span style={{ fontSize: '0.65rem' }}>🔊</span>}
            </button>
          );
        })}
      </div>

      {/* Expandable Full Spoken Transcript Cards */}
      {isExpanded && (
        <div style={{
          marginTop: '1rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '0.75rem',
        }}>
          {briefingSections.map((sec, idx) => {
            const isActive = activeSectionIndex === idx;
            return (
              <div
                key={sec.id}
                onClick={() => playFromIndex(idx)}
                style={{
                  background: isActive ? 'rgba(5, 150, 105, 0.18)' : 'rgba(15, 23, 42, 0.65)',
                  border: isActive ? '1.5px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '0.75rem 0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isActive ? '#34d399' : '#cbd5e1' }}>
                    {sec.icon} {isHindi ? sec.titleHi : sec.titleEn}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: '#64748b' }}>
                    {isActive ? '🔊 ' + (isHindi ? 'बोल रहे हैं' : 'Speaking') : '▶ ' + (isHindi ? 'सुनें' : 'Tap to hear')}
                  </span>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '0.76rem',
                  lineHeight: '1.4',
                  color: isActive ? '#f8fafc' : '#94a3b8',
                }}>
                  {isHindi ? sec.textHi : sec.textEn}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Soundwave Animation Styles */}
      <style>{`
        @keyframes bounceWave {
          0% { height: 4px; }
          100% { height: 22px; }
        }
      `}</style>
    </div>
  );
}
