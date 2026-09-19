import React, { useEffect } from 'react';

/**
 * TechnicalStackModal — VarshaNetra AI System Architecture & Provenance
 * 
 * Authentic, transparent technical disclosure of VarshaNetra AI's actual codebase.
 * Fully localized in English and Hindi based on the active language.
 */
export default function TechnicalStackModal({ isOpen, onClose, lang = 'en' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isHindi = lang === 'hi';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(5, 4, 15, 0.85)',
        backdropFilter: 'blur(12px)',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1120px',
          maxHeight: '94vh',
          background: 'linear-gradient(135deg, rgba(14, 18, 38, 0.98) 0%, rgba(9, 12, 30, 0.99) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75), 0 0 40px rgba(14, 165, 233, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.25s ease-out',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.6rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.35) 0%, rgba(99, 102, 241, 0.25) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                boxShadow: '0 0 16px rgba(56, 189, 248, 0.25)',
              }}
            >
              🥞
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                  {isHindi ? 'वर्षानेत्रा AI — सिस्टम वास्तुकला एवं डेटा प्रामाणिकता' : 'VarshaNetra AI — System Architecture & Provenance'}
                </h3>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(16, 185, 129, 0.5)',
                    background: 'rgba(16, 185, 129, 0.12)',
                    color: '#34d399',
                  }}
                >
                  SMART INDIA HACKATHON 2026
                </span>
              </div>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
                {isHindi
                  ? 'पारदर्शी तकनीकी प्रकटीकरण: माइक्रोसर्विसेज, एमएल पाइपलाइन, 10 संप्रभु डेटा स्रोत एवं नैतिक सुरक्षा मानक'
                  : 'Transparent Technical Disclosure: Microservices, ML Engineering, Sovereign Data Lineage & Ethical Guardrails'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#cbd5e1',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s',
            }}
            title={isHindi ? 'पैनल बंद करें (Esc)' : 'Close Panel (Esc)'}
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* 3-Column Architecture Matrix */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '1.1rem',
            }}
          >
            {/* Column 1: Frontend & Client Architecture */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '14px',
                padding: '1.2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.9rem' }}>
                <span style={{ fontSize: '1.2rem' }}>💻</span>
                <strong style={{ fontSize: '0.9rem', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {isHindi ? 'फ्रंटएंड एवं क्लाइंट वास्तुकला' : 'Frontend & Client Architecture'}
                </strong>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.8rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.65rem', lineHeight: '1.48' }}>
                <li>
                  <strong style={{ color: '#f8fafc' }}>{isHindi ? 'Vite 5 + React 18:' : 'Vite 5 + React 18:'}</strong>{' '}
                  {isHindi
                    ? 'मॉड्यूलर एसपीए, कस्टम हुक्स (useLiveDate, useApp) एवं एररबाउंड्री ऑटो-रिकवरी।'
                    : 'Modular SPA with React Hooks (useLiveDate, useApp) and ErrorBoundary resilience.'}
                </li>
                <li>
                  <strong style={{ color: '#f8fafc' }}>{isHindi ? 'वेनिला ग्लासमोर्फिज्म HUD CSS:' : 'Vanilla High-Density HUD CSS:'}</strong>{' '}
                  {isHindi
                    ? 'कस्टम ब्लैक-पर्पल थीम एवं ग्लासमोर्फिज्म टोकन (index.css), शून्य टेलविंड ब्लोट।'
                    : 'Bespoke dark black-purple theme with glassmorphism tokens (index.css), eliminating Tailwind bloat.'}
                </li>
                <li>
                  <strong style={{ color: '#f8fafc' }}>{isHindi ? 'संप्रभु वेक्टर GIS मानचित्र:' : 'Sovereign Vector GIS:'}</strong>{' '}
                  {isHindi
                    ? 'MapLibre GL व Leaflet अडैप्टर — भारतीय सर्वेक्षण विभाग (SOI) की 100% आधिकारिक सीमाएं।'
                    : 'MapLibre GL & Leaflet adapter with 100% Survey of India (SOI) boundary compliance (zero OSM border cuts).'}
                </li>
                <li>
                  <strong style={{ color: '#f8fafc' }}>{isHindi ? 'वेब स्पीच ऑडियो इंजन:' : 'Vernacular Web Speech Engine:'}</strong>{' '}
                  {isHindi
                    ? 'द्विभाषी ध्वनि सारांश (हिन्दी hi-IN व भारतीय अंग्रेजी en-IN) वाक्य चंकिंग के साथ।'
                    : 'Bilingual speech synthesis (Hindi hi-IN and Indian English en-IN) with sentence chunking.'}
                </li>
                <li>
                  <strong style={{ color: '#f8fafc' }}>{isHindi ? 'दृश्य एनालिटिक्स:' : 'Visual Analytics:'}</strong>{' '}
                  {isHindi
                    ? 'Chart.js 4 — दोहरे-अक्ष वर्षा, तापमान और क्वांटाइल अनिश्चितता संभाव्यता आरेख।'
                    : 'Chart.js 4 & React-Chartjs-2 rendering dual-axis precipitation, temperature, and quantile probability envelopes.'}
                </li>
              </ul>
            </div>

            {/* Column 2: Backend & Database Engineering */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(52, 211, 153, 0.25)',
                borderRadius: '14px',
                padding: '1.2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.9rem' }}>
                <span style={{ fontSize: '1.2rem' }}>⚙️</span>
                <strong style={{ fontSize: '0.9rem', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {isHindi ? 'बैकएंड एवं डेटाबेस स्टैक' : 'Backend & Database Stack'}
                </strong>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.8rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.65rem', lineHeight: '1.48' }}>
                <li>
                  <strong style={{ color: '#f8fafc' }}>{isHindi ? 'FastAPI (Python 3.12):' : 'FastAPI (Python 3.12):'}</strong>{' '}
                  {isHindi
                    ? 'Uvicorn ASGI पर चलने वाला उच्च-प्रदर्शन एसिंक्रोनस रेस्ट बैकएंड, ऑटोमैटिक OpenAPI।'
                    : 'Asynchronous REST backend running on Uvicorn ASGI with comprehensive OpenAPI/Swagger documentation.'}
                </li>
                <li>
                  <strong style={{ color: '#f8fafc' }}>{isHindi ? 'SQLite + SQLAlchemy ORM:' : 'SQLite with SQLAlchemy ORM:'}</strong>{' '}
                  {isHindi
                    ? '11 संबंधपरक तालिकाएं: उपयोगकर्ता, पूर्वानुमान, चेतावनियां, चैट सत्र एवं ऑडिट लॉग।'
                    : '11 relational tables managing users, predictions, alerts, notifications, chat sessions, chat messages, and audit logs.'}
                </li>
                <li>
                  <strong style={{ color: '#f8fafc' }}>{isHindi ? 'मल्टी-गेटवे नोटिफिकेशन राउटर:' : 'Multi-Gateway Router:'}</strong>{' '}
                  {isHindi
                    ? 'Twilio SMS, Fast2SMS और SMTP ईमेल के लिए पूर्ण एकीकरण, वितरण स्थिति ट्रैकिंग।'
                    : 'Integrated dispatch for Twilio SMS, Fast2SMS Indian gateway, and SMTP Email with strict delivery state tracking.'}
                </li>
                <li>
                  <strong style={{ color: '#f8fafc' }}>{isHindi ? 'दोहरी कैशिंग प्रणाली:' : 'Dual-Tier Caching:'}</strong>{' '}
                  {isHindi
                    ? '900s इन-मेमोरी मौसम कैश + weather.py में 350+ प्रशासनिक केंद्रों की डिक्शनरी।'
                    : '900s in-memory meteorological TTL cache + 350+ centroid geographic dictionary in weather.py.'}
                </li>
                <li>
                  <strong style={{ color: '#f8fafc' }}>{isHindi ? 'भूमिका-आधारित नियंत्रण (RBAC):' : 'Role-Based Access (RBAC):'}</strong>{' '}
                  {isHindi
                    ? 'किसान मोड (सरल कृषि दृश्य) एवं आपदा प्रशासक/डेवलपर कमांड सेंटर का पृथक्करण।'
                    : 'Strict separation between Farmer Mode (first 8 tabs) and Privileged Disaster/System Command (Alerts, Command, System).'}
                </li>
              </ul>
            </div>

            {/* Column 3: AI / ML & Explainability Pipeline */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(168, 85, 247, 0.25)',
                borderRadius: '14px',
                padding: '1.2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.9rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🧠</span>
                <strong style={{ fontSize: '0.9rem', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {isHindi ? 'AI / ML एवं व्याख्यात्मक (XAI) पाइपलाइन' : 'AI / ML & Explainability Pipeline'}
                </strong>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.8rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.65rem', lineHeight: '1.48' }}>
                <li>
                  <strong style={{ color: '#f8fafc' }}>{isHindi ? 'LightGBM हाइब्रिड मॉडल:' : 'LightGBM Hybrid Ensemble:'}</strong>{' '}
                  {isHindi
                    ? '10-वर्षीय भारतीय कृषि-मौसम डेटा (3,652 दिन) पर प्रशिक्षित; F1=0.748, ROC-AUC=0.878, MAE=3.64 मिमी।'
                    : 'Trained on 10-year Indian agro-climatic observations (3,652 daily records) with F1=0.748, ROC-AUC=0.878, MAE=3.64 mm/day.'}
                </li>
                <li>
                  <strong style={{ color: '#f8fafc' }}>{isHindi ? 'TreeSHAP मॉडल व्याख्या:' : 'TreeSHAP Model Attribution:'}</strong>{' '}
                  {isHindi
                    ? 'वायुदाब, आर्द्रता, तापमान व बादलों के वर्षा पर सटीक प्रभाव का गणितीय वाटरफॉल विश्लेषण।'
                    : 'Mathematical Shapley waterfall attributing millimetric rainfall predictions to pressure (hPa), humidity, temperature, and cloud fraction.'}
                </li>
                <li>
                  <strong style={{ color: '#f8fafc' }}>{isHindi ? 'क्वांटाइल रिग्रेशन अनिश्चितता:' : 'Quantile Regression:'}</strong>{' '}
                  {isHindi
                    ? '10वां (सूखा जोखिम), 50वां (मध्यम अनुमान) और 90वां (अत्यधिक वर्षा) संभाव्यता प्रतिशतक।'
                    : 'Probabilistic precipitation envelopes providing 10th (drought), 50th (median), and 90th (excess rainfall) percentiles.'}
                </li>
                <li>
                  <strong style={{ color: '#f8fafc' }}>{isHindi ? 'फाल्स-ऑनसेट क्लासिफायर:' : 'False-Onset ML Classifier:'}</strong>{' '}
                  {isHindi
                    ? 'समय-पूर्व बुवाई से बीज नष्ट होने और किसानों पर अतिरिक्त आर्थिक भार को रोकता है।'
                    : 'Analyzes convective false starts to prevent fatal seedling mortality and re-sowing economic loss.'}
                </li>
                <li>
                  <strong style={{ color: '#f8fafc' }}>{isHindi ? 'संदर्भ-जागरूक कृषि सलाहकार:' : 'Context-Aware Decision Advisor:'}</strong>{' '}
                  {isHindi
                    ? 'लाइव चैटबॉट (FloatingChatWidget) जो फसल, मौसम और स्थान के अनुसार द्विभाषी सलाह देता है।'
                    : 'Natural language chatbot (FloatingChatWidget) with crop intent parsing and vernacular responses.'}
                </li>
              </ul>
            </div>
          </div>

          {/* Detailed Provenance Matrix: 10 Authoritative Data Sources */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              padding: '1.2rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
              <span style={{ fontSize: '1.2rem' }}>🏛️</span>
              <strong style={{ fontSize: '0.92rem', color: '#f8fafc', letterSpacing: '0.02em' }}>
                {isHindi
                  ? 'आधिकारिक डेटा स्रोत एवं प्रामाणिकता रजिस्ट्री (10 नियंत्रित स्रोत)'
                  : 'Authoritative Data Lineage & Provenance Registry (10 Governed Sources)'}
              </strong>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '0.75rem',
                fontSize: '0.78rem',
              }}
            >
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ color: '#38bdf8' }}>1. {isHindi ? 'ओपन-मेटियो सिनॉप्टिक API' : 'Open-Meteo Synoptic API'}</strong>
                <div style={{ color: '#94a3b8', marginTop: '2px' }}>
                  {isHindi ? '0.1° ECMWF IFS/GFS 16-दिवसीय वायुमंडलीय ग्रिड (तापमान, वर्षा, हवा, दाब, नमी)।' : '0.1° ECMWF IFS/GFS 16-day atmospheric grid (temp, rain, wind, pressure, soil moisture).'}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ color: '#38bdf8' }}>2. {isHindi ? 'ओपन-मेटियो भू-कोडिंग API' : 'Open-Meteo Geocoding API'}</strong>
                <div style={{ color: '#94a3b8', marginTop: '2px' }}>
                  {isHindi ? 'गांवों, तहसीलों व ज़िलों के लिए उच्च-सटीकता निर्देशांक समाधान।' : 'High-resolution coordinate resolution for settlements, blocks, and sub-districts.'}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ color: '#38bdf8' }}>3. {isHindi ? 'NOAA CPC / BoM टेलीकनेक्शन' : 'NOAA CPC / BoM Teleconnections'}</strong>
                <div style={{ color: '#94a3b8', marginTop: '2px' }}>
                  {isHindi ? 'अल-नीनो (ONI / ENSO) एवं हिंद महासागर द्विध्रुव (DMI / IOD) सूचकांक (climate.py)।' : 'Real-time Oceanic Niño Index (ONI / ENSO) and Dipole Mode Index (DMI / IOD) indices in climate.py.'}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ color: '#34d399' }}>4. {isHindi ? 'LGD पंचायती राज कैटलॉग' : 'LGD MoPR Admin Geo Catalog'}</strong>
                <div style={{ color: '#94a3b8', marginTop: '2px' }}>
                  {isHindi ? '36 राज्य/केंद्र शासित प्रदेश, 760+ ज़िले, 2011 जनगणना कोड व ग्राम पंचायतें (744 KB)।' : '744 KB dataset with 36 States/UTs, 760+ Districts, Census 2011 codes, and Gram Panchayats.'}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ color: '#34d399' }}>5. {isHindi ? 'IMD ग्रिडेड वर्षा मानक' : 'IMD Gridded Rainfall Normals'}</strong>
                <div style={{ color: '#94a3b8', marginTop: '2px' }}>
                  {isHindi ? '30-वर्षीय (1991-2020) ज़िला वर्षा आधार रेखा, जिससे ऐतिहासिक विसंगति मापी जाती है।' : '30-year (1991–2020) district baselines for historical rainfall anomaly computation.'}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ color: '#34d399' }}>6. {isHindi ? 'ICAR / NRRI फसल किस्में' : 'ICAR / NRRI Cultivar Envelopes'}</strong>
                <div style={{ color: '#94a3b8', marginTop: '2px' }}>
                  {isHindi ? 'प्रमाणित फसल जलवायु लिफाफे एवं न्यूनतम समर्थन मूल्य (MSP) डेटा।' : 'Verified cultivar agro-climatic envelopes & MSP floor pricing for major Indian kharif/rabi crops.'}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ color: '#c084fc' }}>7. {isHindi ? '10-वर्षीय कृषि-जलवायु डेटासेट' : '10-Year Agro-Climatic Dataset'}</strong>
                <div style={{ color: '#94a3b8', marginTop: '2px' }}>
                  {isHindi ? '2015-2024 दैनिक डेटासेट जिसमें 2015 अल-नीनो व 2019 +IOD चक्र शामिल हैं।' : '2015–2024 daily dataset embedding 2015 El Niño, 2019 +IOD, and 2020-22 La Niña cycles.'}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ color: '#c084fc' }}>8. {isHindi ? 'मौसम TTL कैश' : 'Meteorological TTL Cache'}</strong>
                <div style={{ color: '#94a3b8', marginTop: '2px' }}>
                  {isHindi ? '900s इन-मेमोरी कैशिंग जो बाहरी API कॉल सीमित कर <200ms लेटेंसी देती है।' : '900s in-memory cache throttling external API calls and guaranteeing sub-200ms latency.'}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ color: '#f59e0b' }}>9. {isHindi ? 'कृषि शब्दावली कोश' : 'Vernacular Agronomic Lexicon'}</strong>
                <div style={{ color: '#94a3b8', marginTop: '2px' }}>
                  {isHindi ? 'हिंदी कृषि शब्दावली (बुवाई, जुताई, जलभराव, पाला, हल्दी रोग) का द्विभाषी कोश।' : 'Bilingual glossary mapping Hindi agricultural terminology (बोवाई, जुताई, पाला, हल्दी रोग).'}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ color: '#f59e0b' }}>10. {isHindi ? 'SQLite डेटाबेस इंजन' : 'SQLite Persistence Engine'}</strong>
                <div style={{ color: '#94a3b8', marginTop: '2px' }}>
                  {isHindi ? 'चैट परामर्श, चेतावनी प्रेषण एवं शून्य-PII गतिविधियों का स्थायी रिकॉर्ड।' : 'Relational persistence for multi-turn chats, alert dispatches, and zero-PII activity logs.'}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 2 Wide Trust Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.1rem',
            }}
          >
            {/* Card 1: Data Health & Trust Modes */}
            <div
              style={{
                background: 'rgba(6, 78, 59, 0.18)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                borderRadius: '14px',
                padding: '1.2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.8rem' }}>
                <span style={{ color: '#34d399', fontSize: '1.15rem' }}>⚡</span>
                <strong style={{ fontSize: '0.9rem', color: '#34d399', letterSpacing: '0.02em' }}>
                  {isHindi ? 'परिचालन डेटा स्वास्थ्य एवं विश्वसनीयता मोड' : 'Operational Data Health & Trust Modes'}
                </strong>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.45' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                  <span style={{ color: '#10b981', fontSize: '0.8rem', marginTop: '2px' }}>●</span>
                  <span>
                    <strong style={{ color: '#6ee7b7' }}>{isHindi ? 'लाइव ऑब्जर्वेशन स्ट्रीम:' : 'Live Observation Stream:'}</strong>{' '}
                    {isHindi
                      ? 'ओपन-मेटियो और आईएमडी ग्रिड से 60-सेकंड स्वचालित पोलिंग के साथ सीधा रीयल-टाइम डेटा।'
                      : 'Real-time atmospheric observations synced with 60-second automatic polling directly from Open-Meteo & IMD grids.'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                  <span style={{ color: '#f59e0b', fontSize: '0.8rem', marginTop: '2px' }}>●</span>
                  <span>
                    <strong style={{ color: '#fcd34d' }}>{isHindi ? 'ऑफलाइन-सहनशील कैश्ड स्टोर:' : 'Offline-Resilient Cached Store:'}</strong>{' '}
                    {isHindi
                      ? 'SHA-256 सत्यापित स्थानीय स्नैपशॉट, जो ग्रामीण नेटवर्क कटने पर भी निर्बाध सेवा सुनिश्चित करता है।'
                      : 'SHA-256 validated local snapshot enabling field drills and seamless failover during rural network dropouts.'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                  <span style={{ color: '#38bdf8', fontSize: '0.8rem', marginTop: '2px' }}>●</span>
                  <span>
                    <strong style={{ color: '#7dd3fc' }}>{isHindi ? 'नियतकालिक बेंचमार्क सुइट:' : 'Deterministic Benchmark Suite:'}</strong>{' '}
                    {isHindi
                      ? 'सिंथेटिक जलवायु तनाव-परीक्षण डेटा, जो जूरी मूल्यांकन हेतु स्पष्ट रूप से लेबल किया गया है।'
                      : 'Synthetic climatological stress-test data strictly labeled for jury evaluation if upstream endpoints are disconnected.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Known Limitations & Scientific Ethics */}
            <div
              style={{
                background: 'rgba(127, 29, 29, 0.16)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                borderRadius: '14px',
                padding: '1.2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.8rem' }}>
                <span style={{ color: '#f87171', fontSize: '1.15rem' }}>⚠️</span>
                <strong style={{ fontSize: '0.9rem', color: '#f87171', letterSpacing: '0.02em' }}>
                  {isHindi ? 'वैज्ञानिक नैतिकता एवं परिचालन सुरक्षा मानक' : 'Scientific Ethics & Operational Guardrails'}
                </strong>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.8rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.6rem', lineHeight: '1.45' }}>
                <li>
                  <strong style={{ color: '#fca5a5' }}>{isHindi ? 'कोई झूठी उपज गारंटी नहीं:' : 'No Guaranteed Yield Claims:'}</strong>{' '}
                  {isHindi
                    ? 'पूर्वानुमान केवल जोखिम घटाने वाले उपकरण हैं; वास्तविक कृषि उपज मिट्टी की जैविक स्थिति, खरपतवार और फसल देखभाल पर निर्भर करती है।'
                    : 'Machine learning forecasts provide probabilistic risk reduction; agronomic success depends on physical soil biology, weed management, and post-harvest care.'}
                </li>
                <li>
                  <strong style={{ color: '#fca5a5' }}>{isHindi ? 'ईमानदार "अनुपलब्ध" स्थिति:' : 'Honest "Unavailable" States:'}</strong>{' '}
                  {isHindi
                    ? 'यदि रडार या उपग्रह आंकड़े अनुपलब्ध हों, तो सिस्टम फर्जी आंकड़े दिखाने के बजाय स्पष्ट "अनुपलब्ध" प्रदर्शित करता है।'
                    : 'If radar indices or satellite swaths are obstructed, the platform explicitly displays "Unavailable" rather than hallucinating synthetic readings.'}
                </li>
                <li>
                  <strong style={{ color: '#fca5a5' }}>{isHindi ? 'शून्य-PII गोपनीयता गारंटी:' : 'Zero-PII Privacy Guarantee:'}</strong>{' '}
                  {isHindi
                    ? 'क्वेरी लॉग में कोई व्यक्तिगत पहचान, आधार या फोन नंबर नहीं रखा जाता; किसानों की सभी पूछताछ पूर्णतः गोपनीय रहती है।'
                    : 'No biometric, banking, or phone identification is retained in query logs; all agricultural consultations remain anonymous.'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.6rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)',
            flexWrap: 'wrap',
            gap: '0.8rem',
          }}
        >
          <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
            VarshaNetra AI • Smart India Hackathon (SIH 2026) • Codebase: <code style={{ color: '#94a3b8' }}>Omtripathi1004/VarshaNetra-AI</code>
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '0.45rem 1.35rem',
              borderRadius: '8px',
              border: 'none',
              background: '#059669',
              color: '#ffffff',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(5, 150, 105, 0.4)',
              transition: 'all 0.2s',
            }}
          >
            {isHindi ? 'पैनल बंद करें' : 'Close Panel'}
          </button>
        </div>
      </div>
    </div>
  );
}
