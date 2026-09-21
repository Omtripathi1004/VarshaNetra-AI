import React, { useState } from 'react';
import { useApp } from '../common/AppContext';

// ── Technology Stack ─────────────────────────────────────────────────────────
const TECH_STACK = [
  {
    category: 'Frontend',
    icon: '🖥️',
    color: '#38bdf8',
    items: [
      { name: 'React 18', desc: 'Component-driven SPA with ErrorBoundary auto-recovery' },
      { name: 'Vite 5', desc: 'Build tooling, HMR, and production bundler' },
      { name: 'Vanilla CSS', desc: 'Premium dark glassmorphism design system (index.css)' },
      { name: 'Axios', desc: 'HTTP client with RBAC header interceptors' },
      { name: 'Recharts', desc: 'Rainfall, SHAP, and climate trend visualisations' },
    ],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    color: '#a855f7',
    items: [
      { name: 'FastAPI', desc: 'Async REST API with automatic OpenAPI documentation' },
      { name: 'SQLAlchemy 2', desc: 'ORM for models: Users, Predictions, Alerts, Chat, Activity' },
      { name: 'Pydantic v2', desc: 'Request/response validation and settings management' },
      { name: 'httpx', desc: 'Async HTTP calls to Open-Meteo and external APIs' },
      { name: 'Python-JOSE + Passlib', desc: 'JWT utility libraries (auth layer prepared)' },
    ],
  },
  {
    category: 'AI / Machine Learning',
    icon: '🧠',
    color: '#f59e0b',
    items: [
      { name: 'LightGBM', desc: 'Gradient boosted ensemble for 48h rainfall probability & category' },
      { name: 'scikit-learn', desc: 'Metrics, preprocessing, and chronological train/val/test splits' },
      { name: 'NumPy + Pandas', desc: '10-year agroclimatic dataset construction and feature engineering' },
      { name: 'SHAP', desc: 'Waterfall, bar, and feature importance XAI explanations' },
      { name: 'Google Gemini Flash', desc: 'LLM powering the bilingual AI Decision Advisor chatbot' },
    ],
  },
  {
    category: 'Data & APIs',
    icon: '🌐',
    color: '#10b981',
    items: [
      { name: 'Open-Meteo Forecast API', desc: '0.1° ECMWF/GFS synoptic data — temperature, rain, wind, soil moisture' },
      { name: 'Open-Meteo Geocoding API', desc: 'Geocodes village/city/district names to lat/lon coordinates' },
      { name: 'NOAA CPC Teleconnections', desc: 'ENSO ONI, Indian Ocean Dipole (DMI), MJO Phase & Amplitude' },
      { name: 'LGD MoPR Catalog', desc: '36 states, 786 districts, 4,716 villages — Survey of India & MoPR' },
      { name: 'ICAR Crop Phenology Matrix', desc: '7 crops: Paddy, Cotton, Soybean, Maize, Wheat, Mustard, Pulses' },
    ],
  },
  {
    category: 'Database',
    icon: '🗄️',
    color: '#06b6d4',
    items: [
      { name: 'SQLite (dev / serverless)', desc: 'Single-file DB for rapid dev and Vercel serverless deployment' },
      { name: 'SQLAlchemy Base Metadata', desc: '15 ORM models auto-synced via init_db() on startup' },
      { name: 'In-Memory TTL Cache', desc: '900 s per-coordinate weather cache in weather.py' },
    ],
  },
  {
    category: 'Maps & Geospatial',
    icon: '🗺️',
    color: '#f97316',
    items: [
      { name: 'Mappls Maps SDK', desc: 'Survey of India licensed vector tiles, markers, and routing' },
      { name: 'Open-Meteo Geospatial Grid', desc: '0.1° × 0.1° latitude/longitude precipitation layers' },
      { name: 'GeoJSON Village Boundaries', desc: 'District and village boundary overlays via LGD MoPR dataset' },
    ],
  },
  {
    category: 'Deployment & DevOps',
    icon: '🚀',
    color: '#ec4899',
    items: [
      { name: 'Vercel Serverless', desc: 'Frontend + Python FastAPI backend on Vercel Edge Network' },
      { name: 'Vite Production Build', desc: 'Minified, chunked, and gzip-optimized static assets' },
      { name: 'GitHub Actions (planned)', desc: 'CI/CD pipeline for automated test + deploy on push' },
      { name: 'npm + pip', desc: 'Dependency management for frontend and backend' },
    ],
  },
];

// ── Modules ──────────────────────────────────────────────────────────────────
const MODULES = [
  { id: 'overview', icon: '🌧️', name_en: 'Monsoon Command', name_hi: 'मानसून कमांड', desc_en: 'Live weather telemetry, 48h rainfall probability, LightGBM ML prediction, monsoon phase, and top crop advisories at a glance.', desc_hi: 'लाइव मौसम डेटा, 48 घंटे की वर्षा संभावना, LightGBM ML पूर्वानुमान, मानसून चरण और फसल सलाह।', tag: 'OBSERVE', tagColor: '#06b6d4' },
  { id: 'hydromap', icon: '🗺️', name_en: 'Hydro Map Engine', name_hi: 'हाइड्रो मैप इंजन', desc_en: 'Mappls vector map with rainfall overlay, district weather markers, GPS location, and 786 district hydrology layers.', desc_hi: 'मैपल्स वेक्टर मानचित्र — वर्षा ओवरले, जिला मार्कर, GPS स्थान और 786 जिला हाइड्रोलॉजी।', tag: 'OBSERVE', tagColor: '#06b6d4' },
  { id: 'monsoon', icon: '🌊', name_en: 'Monsoon Phase Engine', name_hi: 'मानसून फेज इंजन', desc_en: 'ONSET / ACTIVE / BREAK / WITHDRAWAL phase classification, false-onset risk detection, 7-day and 16-day ensemble forecast.', desc_hi: 'ONSET / ACTIVE / BREAK / WITHDRAWAL चरण वर्गीकरण, झूठी शुरुआत का जोखिम, 7-दिन और 16-दिन पूर्वानुमान।', tag: 'PREDICT', tagColor: '#a855f7' },
  { id: 'agriculture', icon: '🌾', name_en: 'Season Crop Center', name_hi: 'सीजन क्रॉप सेंटर', desc_en: 'ICAR-grounded crop suitability matrix, phenological growth stage advisories, what-if yield simulation engine, and crop stress alerts.', desc_hi: 'ICAR-आधारित फसल उपयुक्तता मैट्रिक्स, वृद्धि चरण सलाह, what-if उपज सिमुलेशन।', tag: 'DECIDE', tagColor: '#f59e0b' },
  { id: 'xai', icon: '🧠', name_en: 'Explainable AI (XAI)', name_hi: 'एक्सप्लेनेबल AI (XAI)', desc_en: 'SHAP waterfall diagrams, feature importance bar charts, prediction confidence bands, and teleconnection correlation explainers.', desc_hi: 'SHAP वाटरफॉल आरेख, फीचर महत्व, पूर्वानुमान विश्वास बैंड और जलवायु सहसंबंध स्पष्टीकरण।', tag: 'EXPLAIN', tagColor: '#8b5cf6' },
  { id: 'analytics', icon: '🔬', name_en: 'Analytic Lab', name_hi: 'एनालिटिक लैब', desc_en: '10-year LightGBM backtesting (F1=0.748, ROC-AUC=0.878), baseline vs hybrid model comparison, false-onset detection recall, and ENSO/IOD/MJO climate teleconnection analysis.', desc_hi: '10 वर्षीय LightGBM बैकटेस्टिंग, बेसलाइन बनाम हाइब्रिड मॉडल, झूठी शुरुआत का पता लगाना।', tag: 'EXPLAIN', tagColor: '#8b5cf6' },
  { id: 'alerts', icon: '🚨', name_en: 'Emergency Warning Center', name_hi: 'आपातकालीन चेतावनी केंद्र', desc_en: 'Automated monsoon alert generation (ONSET / FALSE_ONSET / DRY_SPELL / HEAVY_RAIN / REVIVAL), multi-channel SMS/Email dispatch, and alert acknowledgement tracking.', desc_hi: 'स्वचालित मानसून अलर्ट जनरेशन, मल्टी-चैनल SMS/ईमेल डिस्पैच, अलर्ट ट्रैकिंग।', tag: 'ACT', tagColor: '#ef4444' },
  { id: 'command', icon: '🏛️', name_en: 'Agri Command Center', name_hi: 'कृषि कमांड सेंटर', desc_en: 'Crisis dispatch interface for Disaster Administrators: NDRF coordination, SMS broadcast to farmers, emergency event management, and officer assignment.', desc_hi: 'आपदा प्रशासकों के लिए संकट प्रेषण — NDRF समन्वय, किसानों को SMS, आपातकालीन घटना प्रबंधन।', tag: 'ACT', tagColor: '#ef4444' },
  { id: 'chatbot', icon: '🤖', name_en: 'AI Decision Advisor', name_hi: 'AI निर्णय सलाहकार', desc_en: 'Gemini-powered bilingual chatbot grounded on live Open-Meteo telemetry, ML prediction, and ICAR crop phenology. Answers WHAT / WHY / WHEN / HOW / WHAT SHOULD I DO questions.', desc_hi: 'Gemini-संचालित द्विभाषी चैटबॉट — लाइव मौसम, ML पूर्वानुमान और ICAR फसल ज्ञान पर आधारित।', tag: 'DECIDE', tagColor: '#f59e0b' },
  { id: 'chatstore', icon: '💬', name_en: 'Chat Store', name_hi: 'चैट स्टोर', desc_en: 'Persistent user chat session storage with conversation history, activity timeline, and user-scoped isolation per authenticated identity.', desc_hi: 'प्रत्येक उपयोगकर्ता की बातचीत का स्थायी संग्रह, गतिविधि टाइमलाइन और उपयोगकर्ता-आधारित सुरक्षा।', tag: 'OBSERVE', tagColor: '#06b6d4' },
  { id: 'system', icon: '⚙️', name_en: 'System Control & Provenance', name_hi: 'सिस्टम नियंत्रण और डेटा प्रामाणिकता', desc_en: 'Live backend health, real DB stats, dataset provenance registry (LIVE / CACHED / HISTORICAL / STATIC), data lineage, and scientific guardrails.', desc_hi: 'लाइव बैकएंड स्वास्थ्य, वास्तविक DB आँकड़े, डेटासेट प्रामाणिकता रजिस्ट्री और वैज्ञानिक सुरक्षा उपाय।', tag: 'ACT', tagColor: '#ef4444' },
];

const TAG_COLORS = { OBSERVE: '#06b6d4', PREDICT: '#a855f7', EXPLAIN: '#8b5cf6', DECIDE: '#f59e0b', ACT: '#ef4444' };

export default function AboutTab() {
  const { lang } = useApp();
  const [expandedModule, setExpandedModule] = useState(null);
  const [expandedTech, setExpandedTech] = useState(null);

  return (
    <div className="main-content">
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(18,14,40,0.98) 0%, rgba(10,7,28,0.98) 100%)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '20px',
        padding: '2rem 2rem 1.8rem',
        marginBottom: '1.8rem',
        boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -20, left: -20, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '3rem', lineHeight: 1 }}>🌾</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h1 style={{
              margin: 0, fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900,
              background: 'linear-gradient(135deg, #c084fc 0%, #38bdf8 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {lang === 'hi' ? 'वर्षानेत्र AI — हाइपरलोकल मानसून और कृषि निर्णय सहायक' : 'VarshaNetra AI — Hyperlocal Monsoon & Agronomic Decision-Support System'}
            </h1>
            <p style={{ margin: '0.6rem 0 0', color: '#94a3b8', fontSize: '0.88rem', maxWidth: 780, lineHeight: 1.65 }}>
              {lang === 'hi'
                ? 'वर्षानेत्र AI भारत के किसानों और आपदा प्रशासकों के लिए एक रीयल-टाइम, डेटा-आधारित मानसून निर्णय सहायक प्रणाली है। यह Open-Meteo के लाइव सिनॉप्टिक डेटा, NOAA जलवायु टेलीकनेक्शन (ENSO, IOD, MJO), 10-वर्षीय LightGBM मशीन लर्निंग मॉडल और ICAR फसल कृषि ज्ञान को एकीकृत करके फसल-विशिष्ट, स्थान-आधारित कार्रवाई योग्य सलाह प्रदान करती है।'
                : 'VarshaNetra AI is a real-time, data-grounded monsoon decision-support system for Indian farmers and disaster administrators. It integrates live Open-Meteo synoptic telemetry, NOAA global teleconnections (ENSO, IOD, MJO), a 10-year LightGBM hybrid ML ensemble, and ICAR crop phenology knowledge to deliver crop-specific, location-grounded, actionable advisories.'}
            </p>

            {/* Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
              {[
                { label: 'SIH 2026', color: '#a855f7' },
                { label: lang === 'hi' ? '11 मॉड्यूल' : '11 Modules', color: '#06b6d4' },
                { label: 'Open-Meteo', color: '#10b981' },
                { label: 'LightGBM + SHAP', color: '#f59e0b' },
                { label: 'Bilingual (EN / हिंदी)', color: '#38bdf8' },
                { label: lang === 'hi' ? 'किसान + अधिकारी RBAC' : 'Farmer + Officer RBAC', color: '#ef4444' },
              ].map(b => (
                <span key={b.label} style={{
                  padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700,
                  background: `${b.color}20`, color: b.color, border: `1px solid ${b.color}50`,
                }}>
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decision-Support Disclaimer */}
      <div style={{
        background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.35)',
        borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1.8rem',
        display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>⚠️</span>
        <div>
          <div style={{ fontWeight: 700, color: '#fbbf24', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
            {lang === 'hi' ? 'निर्णय-सहायता अस्वीकरण' : 'Decision-Support Disclaimer'}
          </div>
          <p style={{ color: '#d1d5db', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>
            {lang === 'hi'
              ? 'वर्षानेत्र AI के सभी पूर्वानुमान और कृषि सलाह सांख्यिकीय मशीन लर्निंग मॉडलों पर आधारित हैं। ये प्रमाणित मौसम विभाग (IMD) के आधिकारिक पूर्वानुमान का विकल्प नहीं हैं। महत्वपूर्ण कृषि या आपदा निर्णय लेने से पहले जिला कृषि अधिकारी और IMD अधिसूचनाओं से सत्यापन करें।'
              : 'All VarshaNetra AI predictions and crop advisories are probabilistic outputs from statistical ML models. They are decision-support tools, not official forecasts. Always cross-reference with India Meteorological Department (IMD) bulletins and district agricultural officers before making critical farming or disaster management decisions.'}
          </p>
        </div>
      </div>

      {/* System Modules */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1.15rem', fontWeight: 800, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          📦 {lang === 'hi' ? 'सिस्टम मॉड्यूल' : 'System Modules'}
          <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>({MODULES.length} modules)</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.85rem' }}>
          {MODULES.map(m => {
            const isOpen = expandedModule === m.id;
            const tagColor = TAG_COLORS[m.tag] || '#94a3b8';
            return (
              <div
                key={m.id}
                onClick={() => setExpandedModule(isOpen ? null : m.id)}
                style={{
                  background: isOpen ? 'rgba(28,22,58,0.92)' : 'rgba(18,14,40,0.72)',
                  border: `1px solid ${isOpen ? 'rgba(168,85,247,0.35)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '14px', padding: '1rem 1.1rem', cursor: 'pointer',
                  transition: 'all 0.2s', boxShadow: isOpen ? '0 8px 28px rgba(0,0,0,0.4)' : 'none',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: isOpen ? '0.6rem' : 0 }}>
                  <span style={{ fontSize: '1.3rem' }}>{m.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.86rem', color: '#f1f5f9' }}>
                      {lang === 'hi' ? m.name_hi : m.name_en}
                    </div>
                  </div>
                  <span style={{
                    padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 800,
                    background: `${tagColor}22`, color: tagColor, letterSpacing: '0.3px',
                  }}>{m.tag}</span>
                  <span style={{ color: '#64748b', fontSize: '0.8rem', marginLeft: '0.2rem' }}>{isOpen ? '▲' : '▼'}</span>
                </div>
                {isOpen && (
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.6 }}>
                    {lang === 'hi' ? m.desc_hi : m.desc_en}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Technical Stack */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1.15rem', fontWeight: 800, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🛠️ {lang === 'hi' ? 'तकनीकी स्टैक' : 'Technical Stack'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.85rem' }}>
          {TECH_STACK.map(cat => {
            const isOpen = expandedTech === cat.category;
            return (
              <div
                key={cat.category}
                onClick={() => setExpandedTech(isOpen ? null : cat.category)}
                style={{
                  background: isOpen ? 'rgba(28,22,58,0.92)' : 'rgba(18,14,40,0.72)',
                  border: `1px solid ${isOpen ? `${cat.color}40` : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '14px', padding: '1rem 1.1rem', cursor: 'pointer',
                  transition: 'all 0.2s', boxShadow: isOpen ? `0 8px 28px rgba(0,0,0,0.4)` : 'none',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>{cat.icon}</span>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', color: cat.color }}>{cat.category}</span>
                  <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: '0.8rem' }}>{isOpen ? '▲' : '▼'}</span>
                </div>
                {isOpen && (
                  <div style={{ marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {cat.items.map(item => (
                      <div key={item.name} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: cat.color, marginTop: '0.35rem', flexShrink: 0 }} />
                        <div>
                          <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#f1f5f9' }}>{item.name}</span>
                          <span style={{ color: '#94a3b8', fontSize: '0.76rem' }}> — {item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Provenance */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1.15rem', fontWeight: 800, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🔬 {lang === 'hi' ? 'डेटा प्रामाणिकता (Data Provenance)' : 'Data & AI Provenance'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '0.85rem' }}>
          {[
            { tier: 'LIVE', icon: '🟢', color: '#10b981', desc_en: 'Fetched from external APIs in real-time: Open-Meteo synoptic forecast, Geocoding API, and NOAA teleconnection feeds.', desc_hi: 'रीयल-टाइम में बाहरी API से प्राप्त: Open-Meteo मौसम पूर्वानुमान, Geocoding API, NOAA टेलीकनेक्शन।' },
            { tier: 'CACHED', icon: '🔵', color: '#38bdf8', desc_en: 'In-memory TTL cache (900 s) throttles repeated API calls per location coordinate pair.', desc_hi: 'इन-मेमोरी TTL कैश (900 s) प्रति स्थान API कॉल को सीमित करती है।' },
            { tier: 'HISTORICAL', icon: '🟡', color: '#f59e0b', desc_en: '10-year synthetic agroclimatic dataset (2015-2024, 3,652 observations) used to train and validate the LightGBM model.', desc_hi: '10-वर्षीय सिंथेटिक एग्रोक्लाइमेटिक डेटासेट (2015-2024, 3,652 अवलोकन) LightGBM मॉडल के लिए।' },
            { tier: 'STATIC', icon: '⚪', color: '#94a3b8', desc_en: 'Bundled reference tables: LGD MoPR Administrative Catalog, ICAR Crop Phenology Matrix, and demo seed scenarios.', desc_hi: 'बंडल संदर्भ तालिकाएं: LGD MoPR प्रशासनिक कैटलॉग, ICAR फसल फेनोलॉजी मैट्रिक्स, डेमो डेटा।' },
          ].map(t => (
            <div key={t.tier} style={{
              background: `${t.color}0a`, border: `1px solid ${t.color}35`,
              borderRadius: '14px', padding: '1rem 1.1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span>{t.icon}</span>
                <span style={{ fontWeight: 800, fontSize: '0.85rem', color: t.color }}>{t.tier}</span>
              </div>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.78rem', lineHeight: 1.6 }}>
                {lang === 'hi' ? t.desc_hi : t.desc_en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* End-to-End Pipeline */}
      <div style={{
        background: 'rgba(18,14,40,0.72)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px', padding: '1.2rem', marginBottom: '1.8rem',
      }}>
        <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 800, color: '#f1f5f9' }}>
          🔗 {lang === 'hi' ? 'एंड-टू-एंड डेटा पाइपलाइन' : 'End-to-End Data Pipeline'}
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.4rem' }}>
          {[
            { label: 'Open-Meteo API', color: '#10b981' },
            { label: '→', color: '#64748b' },
            { label: 'Weather Ingest (weather.py)', color: '#06b6d4' },
            { label: '→', color: '#64748b' },
            { label: 'Feature Engineering', color: '#a855f7' },
            { label: '+', color: '#64748b' },
            { label: 'NOAA Teleconnections', color: '#f59e0b' },
            { label: '→', color: '#64748b' },
            { label: 'LightGBM Hybrid Model', color: '#8b5cf6' },
            { label: '→', color: '#64748b' },
            { label: 'SHAP Explanation', color: '#f97316' },
            { label: '→', color: '#64748b' },
            { label: 'Crop Advisory + Alert', color: '#ef4444' },
            { label: '→', color: '#64748b' },
            { label: 'Gemini AI Chatbot', color: '#38bdf8' },
          ].map((step, i) => (
            <span key={i} style={{
              padding: step.label === '→' || step.label === '+' ? '0' : '0.2rem 0.55rem',
              borderRadius: '6px', fontSize: '0.72rem', fontWeight: step.label === '→' || step.label === '+' ? 700 : 600,
              background: step.label === '→' || step.label === '+' ? 'transparent' : `${step.color}18`,
              color: step.color,
              border: step.label === '→' || step.label === '+' ? 'none' : `1px solid ${step.color}35`,
            }}>
              {step.label}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', color: '#475569', fontSize: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        VarshaNetra AI v2.0 • Smart India Hackathon 2026 • Open-Meteo CC-BY-4.0 • LGD MoPR OGD India
      </div>
    </div>
  );
}
