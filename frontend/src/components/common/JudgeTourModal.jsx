import React, { useState, useEffect, useCallback } from 'react';

/**
 * JudgeTourModal — VarshaNetra AI Hackathon Evaluation Guide & Live PPT Controller
 * 
 * Bilingual (English / Hindi) interactive guide that drives the real modules of VarshaNetra AI.
 */

export const JUDGE_SLIDES = [
  {
    step: 1,
    tabId: 'overview',
    icon: '🧭',
    badge_en: 'SPATIAL INTELLIGENCE',
    badge_hi: 'स्थानिक बुद्धिमत्ता',
    title_en: '1. Official LGD Location Hierarchy & Sovereign Spatial Bounds',
    title_hi: '1. आधिकारिक LGD स्थान पदानुक्रम एवं संप्रभु भू-स्थानिक सीमाएं',
    subtitle_en: 'Ministry of Panchayati Raj (MoPR) Database & 100% Survey of India Compliance',
    subtitle_hi: 'पंचायती राज मंत्रालय (MoPR) डेटाबेस एवं 100% भारतीय सर्वेक्षण विभाग (SOI) अनुपालन',
    bullets_en: [
      'Comprehensive 6-tier administrative hierarchy (State → District → Sub-District/Tehsil → Gram Panchayat → Village) loaded from admin_geo_catalog.py (744 KB authoritative dataset covering 36 States/UTs and 760+ Districts).',
      '100% Survey of India (SOI) territorial boundary compliance: zero OpenStreetMap border cuts, ensuring sovereign representation of Jammu & Kashmir, Ladakh, and Arunachal Pradesh.',
      'One-click regional agro-climatic switching across 8 pre-calibrated Indian agricultural hubs (Gangetic Paddy Basin, Vidarbha Cotton Belt, Malwa Soybean Plateau, Punjab Wheat Belt, Marathwada Drought Zone, etc.).',
      'Dual geocoding architecture: 350+ embedded administrative centroids in weather.py with instant fallback to Open-Meteo Geocoding API.',
    ],
    bullets_hi: [
      'व्यापक 6-स्तरीय प्रशासनिक पदानुक्रम (राज्य → ज़िला → उप-ज़िला/तहसील → ग्राम पंचायत → गाँव) जो admin_geo_catalog.py (36 राज्यों/केंद्र शासित प्रदेशों और 760+ ज़िलों को कवर करने वाला 744 KB डेटासेट) से लोड होता है।',
      '100% भारतीय सर्वेक्षण विभाग (SOI) क्षेत्रीय सीमा अनुपालन: शून्य ओपनस्ट्रीटमैप सीमा विसंगतियां, जम्मू-कश्मीर, लद्दाख और अरुणाचल प्रदेश की पूर्ण संप्रभु सीमाएं।',
      'भारत के 8 प्रमुख कृषि-जलवायु क्षेत्रों (गंगा धान कछार, विदर्भ कपास क्षेत्र, मालवा सोयाबीन पठार, पंजाब गेहूं पट्टी, मराठवाड़ा सूखा क्षेत्र) के बीच 1-क्लिक में बदलाव।',
      'दोहरी भू-कोडिंग प्रणाली: weather.py में 350+ प्रशासनिक केंद्र बिंदु और ओपन-मेटियो भू-कोडिंग का स्वचालित बैकअप।',
    ],
    callout_en: 'Look at the top LGD Location Bar, regional hub quick-select chips, and village cascade selector.',
    callout_hi: 'शीर्ष LGD लोकेशन बार, कृषि-जलवायु हब चिप्स और ग्राम ड्रॉप-डाउन चयनकर्ता को देखें।',
    targetId: 'location-bar-wrapper',
  },
  {
    step: 2,
    tabId: 'overview',
    icon: '🌧️',
    badge_en: 'OBSERVE & PREDICT',
    badge_hi: 'निरीक्षण एवं पूर्वानुमान',
    title_en: '2. Hyperlocal Monsoon Command & Vernacular AI Voice Briefing',
    title_hi: '2. हाइपरलोकल मानसून कमांड एवं बहुभाषी AI ध्वनि सारांश',
    subtitle_en: 'Live Atmospheric Telemetry, 48h LightGBM Prediction & Web Speech Audio Assistant',
    subtitle_hi: 'लाइव वायुमंडलीय टेलीमेट्री, 48 घंटे का LightGBM वर्षा पूर्वानुमान एवं वेब स्पीच ऑडियो इंजन',
    bullets_en: [
      'Real-time atmospheric telemetry synced every 60s from Open-Meteo 1km atmospheric grid: temperature (°C), relative humidity (%), surface pressure (hPa), wind speed (km/h), and 0–1cm volumetric soil moisture.',
      '48-hour quantitative rainfall forecast powered by LightGBM with uncertainty confidence intervals and anomaly comparison against 30-year IMD district normals.',
      'Kisan Traffic Light Decision System (Green/Amber/Red) translating complex meteorological matrices into immediate, jargon-free field action directives.',
      'Interactive AI Voice Briefing (DashboardVoiceBriefing.jsx): Synthesizes full live briefing (location, temperature, monsoon phase, top 3 crops, field action) in natural Hindi (hi-IN) or Indian English (en-IN) with live soundwave equalizer animation.',
    ],
    bullets_hi: [
      'हर 60 सेकंड में ओपन-मेटियो 1 किमी ग्रिड से रीयल-टाइम डेटा: तापमान (°C), सापेक्ष आर्द्रता (%), वायुदाब (hPa), हवा की गति (किमी/घंटा) और 0-1 सेमी मिट्टी की नमी।',
      'LightGBM द्वारा संचालित 48 घंटे का सटीक वर्षा पूर्वानुमान, अनिश्चितता सीमाएं और 30-वर्षीय IMD सामान्य वर्षा से विसंगति की तुलना।',
      'किसान ट्रैफिक लाइट निर्णय प्रणाली (हरा/पीला/लाल) जो जटिल वैज्ञानिक आंकड़ों को किसानों के लिए तुरंत समझ आने वाली कार्य सलाह में बदलती है।',
      'AI ध्वनि सारांश (DashboardVoiceBriefing.jsx): स्थान, तापमान, मानसून स्थिति, 3 प्रमुख फसलें व खेत प्रबंधन की सम्पूर्ण रिपोर्ट प्राकृतिक हिन्दी (hi-IN) या अंग्रेजी (en-IN) में बोलकर सुनाती है।',
    ],
    callout_en: 'Observe the Voice Briefing card at the top, live telemetry cards, and Kisan Action Widgets.',
    callout_hi: 'शीर्ष पर स्थित AI वॉइस ब्रीफिंग कार्ड, लाइव मौसम कार्ड और किसान एक्शन विजेट्स का अवलोकन करें।',
    targetId: 'voice-briefing-section',
  },
  {
    step: 3,
    tabId: 'hydromap',
    icon: '🗺️',
    badge_en: 'GEOSPATIAL GIS',
    badge_hi: 'भू-स्थानिक जीआईएस',
    title_en: '3. Sovereign HydroMap GIS & Sub-Surface Soil Moisture Profile',
    title_hi: '3. संप्रभु हाइड्रोमैप GIS एवं उप-सतही मृदा नमी प्रोफाइल',
    subtitle_en: 'MapLibre GL Geospatial Engine with 4-Depth Root-Zone Soil Water Content',
    subtitle_hi: 'MapLibre GL भू-स्थानिक मानचित्र इंजन — 4 गहराई स्तरों पर जड़-क्षेत्र मृदा नमी मापन',
    bullets_en: [
      'High-performance vector GIS cartography rendered via MapLibre GL with strict Survey of India boundary verification and smooth pan/zoom controls.',
      'Sub-surface volumetric soil water content across 4 root-zone depths (0–7cm surface, 7–28cm root initiation, 28–100cm deep root zone, 100–255cm subsoil reservoir) identifying waterlogging and dry root hazards.',
      'Interactive geospatial overlay suite: Real-time precipitation radar contours, cloud cover reflectivity, drought stress indices, and topographic runoff flow accumulation channels.',
      'Instant coordinate and elevation inspection: Click anywhere across the Indian subcontinent to extract localized soil moisture and drainage velocity.',
    ],
    bullets_hi: [
      'MapLibre GL द्वारा प्रस्तुत उच्च प्रदर्शन वेक्टर मानचित्र — भारतीय सर्वेक्षण विभाग की आधिकारिक सीमाओं के साथ सहज पैन और ज़ूम।',
      '4 गहराई स्तरों (0-7 सेमी सतह, 7-28 सेमी जड़ विस्तार, 28-100 सेमी गहरी जड़, 100-255 सेमी उप-मृदा जल) पर नमी का सटीक मापन, जलभराव और सूखे की रोकथाम।',
      'इंटरैक्टिव जीआईएस परतें: रीयल-टाइम वर्षा रडार कंटूर, बादल कवरेज, सूखा तनाव सूचकांक और स्थलाकृतिक जल बहाव चैनल।',
      'त्वरित निर्देशांक विश्लेषण: भारतीय उपमहाद्वीप में कहीं भी क्लिक करके स्थानीय मृदा नमी और जल निकास गति देखें।',
    ],
    callout_en: 'Explore the layer switcher on the HydroMap and inspect root-zone soil moisture indicators.',
    callout_hi: 'हाइड्रोमैप पर लेयर स्विचर का उपयोग करें और जड़-क्षेत्र मृदा नमी संकेतकों की जांच करें।',
  },
  {
    step: 4,
    tabId: 'monsoon',
    icon: '🌦️',
    badge_en: 'CLIMATOLOGICAL ML',
    badge_hi: 'जलवायु मशीन लर्निंग',
    title_en: '4. Monsoon Phase Dynamics & False Onset ML Classifier',
    title_hi: '4. मानसून चरण गतिशीलता एवं फाल्स-ऑनसेट (झूठी शुरुआत) ML क्लासिफायर',
    subtitle_en: 'Early Sowing Hazard Prevention, Northern Limit of Monsoon (NLM) & NOAA Teleconnections',
    subtitle_hi: 'असामयिक बुवाई जोखिम रोकथाम, मानसून की उत्तरी सीमा (NLM) एवं NOAA जलवायु टेलीकनेक्शन',
    bullets_en: [
      'Proprietary "False Onset" Hazard Classifier: Protects dryland farmers from premature sowing traps by identifying pre-monsoon convective rain spikes followed by fatal >10-day dry spells.',
      'Dynamic tracking of Southwest Monsoon progression across the Northern Limit of Monsoon (NLM) with real-time detection of active vs. break monsoon phases.',
      'Global climate teleconnections alignment: Integrates real-time NOAA CPC Oceanic Niño Index (ONI / ENSO Niño 3.4) and Bureau of Meteorology Dipole Mode Index (DMI / Indian Ocean Dipole).',
      'Climatological probability curves calibrated against 10 years of Indian monsoon synoptic patterns (2015–2024).',
    ],
    bullets_hi: [
      'फाल्स-ऑनसेट क्लासिफायर: शुष्क क्षेत्र के किसानों को समय-पूर्व बुवाई के जाल से बचाता है, जो मानसून पूर्व की क्षणिक वर्षा के बाद 10+ दिनों के सूखे से बीज नष्ट होने से रोकता है।',
      'मानसून की उत्तरी सीमा (NLM) पर दक्षिण-पश्चिम मानसून की प्रगति की लाइव ट्रैकिंग तथा सक्रिय बनाम ब्रेक मानसून चरणों की पहचान।',
      'वैश्विक जलवायु टेलीकनेक्शन: NOAA CPC का अल-नीनो सूचकांक (ONI / ENSO Niño 3.4) और ऑस्ट्रेलिया मौसम विज्ञान ब्यूरो का हिंद महासागर द्विध्रुव (DMI / IOD)।',
      'भारतीय मानसून के 10-वर्षीय सिनॉप्टिक पैटर्न (2015-2024) पर कैलिब्रेट किए गए संभाव्यता वक्र।',
    ],
    callout_en: 'Review the False Onset Risk Gauge, Monsoon Phase Progression cards, and teleconnection telemetry.',
    callout_hi: 'फाल्स-ऑनसेट रिस्क गेज, मानसून प्रगति कार्ड और जलवायु टेलीकनेक्शन डेटा की समीक्षा करें।',
  },
  {
    step: 5,
    tabId: 'agriculture',
    icon: '🌾',
    badge_en: 'AGRONOMIC ADVISORY',
    badge_hi: 'कृषि विज्ञान सलाह',
    title_en: '5. ICAR Smart Crop Recommendations & Stage-Wise Advisory',
    title_hi: '5. ICAR स्मार्ट फसल सिफारिशें एवं विकास-चरण अनुसार सलाह',
    subtitle_en: 'Cultivar Matching Engine, Phenological Growth Stages & Vernacular Audio Guidance',
    subtitle_hi: 'किस्म मिलान इंजन, 5 विकास चरण एवं स्थानीय भाषा में ऑडियो मार्गदर्शन',
    bullets_en: [
      'Scientific cultivar matching engine: Pairs local soil type and seasonal rainfall regime with verified ICAR / NRRI Cuttack cultivars (e.g. Swarna MTU-7029 rice, JS-20-34 soybean, DKC-9108 maize, HHB-67 bajra).',
      '5-stage phenological growth management: Sowing, Vegetative, Flowering, Grain-Filling, and Harvest maturity with real-time water demand calculations.',
      'Actionable field advisories covering exact irrigation timing, split fertilizer applications (basal vs top-dressing), chemical spray windows, and pest flare-up alerts.',
      'Single-tap Vernacular Text-to-Speech audio reader (VernacularTTSButton.jsx) providing voice playback in Hindi and English for rural field accessibility.',
    ],
    bullets_hi: [
      'वैज्ञानिक किस्म चयन इंजन: स्थानीय मिट्टी और वर्षा के आधार पर ICAR और NRRI कटक द्वारा प्रमाणित किस्में (जैसे स्वर्णा MTU-7029 धान, JS-20-34 सोयाबीन, DKC-9108 मक्का, HHB-67 बाजरा)।',
      '5-चरणीय फसल विकास प्रबंधन: बुवाई, वानस्पतिक वृद्धि, पुष्पन, दाना भराव और कटाई परिपक्वता — प्रत्येक चरण की जल मांग के साथ।',
      'सटीक कृषि सलाह: सिंचाई का सही समय, यूरिया/डीएपी का विभाजन (बेसल बनाम टॉप ड्रेसिंग), छिड़काव का समय और कीट प्रकोप अलर्ट।',
      'एक-क्लिक ध्वनि प्रसारण बटन (VernacularTTSButton.jsx) जो ग्रामीण किसानों को उनकी भाषा में बोलकर सलाह सुनाता है।',
    ],
    callout_en: 'Switch between crops and growth stages to see dynamic scientific directives and voice guidance.',
    callout_hi: 'विभिन्न फसलों और विकास चरणों का चयन करके वैज्ञानिक सलाह और ध्वनि प्रसारण देखें।',
  },
  {
    step: 6,
    tabId: 'xai',
    icon: '🔍',
    badge_en: 'EXPLAINABLE AI',
    badge_hi: 'व्याख्या योग्य एआई (XAI)',
    title_en: '6. Explainable AI (XAI) SHAP Attribution Waterfalls',
    title_hi: '6. व्याख्या योग्य AI (XAI) — SHAP वाटरफॉल गणितीय विश्लेषण',
    subtitle_en: 'TreeSHAP Mathematical Deconstruction of Machine Learning Decisions',
    subtitle_hi: 'मशीन लर्निंग निर्णयों का TreeSHAP गणितीय पारदर्शी विश्लेषण',
    bullets_en: [
      'Full implementation of SHapley Additive exPlanations (SHAP) computed on LightGBM decision trees to eliminate "Black-Box" mistrust among agricultural scientists and farmers.',
      'Waterfall attribution charts demonstrating the exact millimetric impact of relative humidity, barometric pressure (hPa), cloud cover fraction, and thermal lapse rate on final rainfall predictions.',
      'High-contrast visual toggle: Kisan View (plain-language drivers like "High humidity increases rain likelihood by +12mm") vs Expert View (raw SHAP values & baseline offsets).',
      'Interactive "What-If" parameter simulator allowing agronomists to model pressure drops or temperature shifts with real-time SHAP recalculation.',
    ],
    bullets_hi: [
      'LightGBM ट्री पर आधारित SHapley Additive exPlanations (SHAP) का पूर्ण कार्यान्वयन, जिससे ब्लैक-बॉक्स AI का अविश्वास पूरी तरह समाप्त होता है।',
      'वाटरफॉल चार्ट जो स्पष्ट करता है कि वायुदाब, आर्द्रता, बादलों और तापमान ने वर्षा पूर्वानुमान में कितने मिलीमीटर का प्रभाव डाला।',
      'सरल और विशेषज्ञ दृश्य: किसान दृश्य (सरल भाषा जैसे "उच्च आर्द्रता से +12 मिमी वर्षा की संभावना बढ़ी") बनाम विशेषज्ञ दृश्य (विस्तृत गणितीय मान)।',
      'इंटरैक्टिव "What-If" सिमुलेटर: वायुदाब या तापमान बदलकर तुरंत देखें कि पूर्वानुमान और SHAP मान कैसे बदलते हैं।',
    ],
    callout_en: 'Examine the SHAP force plot and test the What-If simulation sliders.',
    callout_hi: 'SHAP आरेख और What-If सिमुलेशन स्लाइडर की कार्यप्रणाली देखें।',
  },
  {
    step: 7,
    tabId: 'analytics',
    icon: '📊',
    badge_en: 'ANALYTICS & METRICS',
    badge_hi: 'एनालिटिक्स एवं मेट्रिक्स',
    title_en: '7. Predictive Climatology & Multi-Model Analytics',
    title_hi: '7. पूर्वानुमानित जलवायु विज्ञान एवं बहु-मॉडल सांख्यिकी',
    subtitle_en: 'Quantile Rainfall Uncertainty Envelopes & Rigorous Skill Verification',
    subtitle_hi: 'क्वांटाइल वर्षा अनिश्चितता सीमाएं एवं वैज्ञानिक सटीकता सत्यापन',
    bullets_en: [
      'Multi-scenario probabilistic quantile forecasting: 10th percentile (pessimistic drought planning), 50th percentile (median expected), and 90th percentile (flood/excess rain surge).',
      'Historical rainfall anomaly benchmarking against 30-year (1991–2020) IMD district precipitation normals.',
      'Comprehensive model skill scorecard: Root Mean Squared Error (RMSE: 3.64 mm/day), Mean Absolute Error (MAE), Brier Reliability Score (0.114), and ROC-AUC curve (0.878).',
      'Multi-model ensemble comparisons evaluating LightGBM against baseline Persistence, Climatology, and Numerical Weather Prediction (NWP) outputs.',
    ],
    bullets_hi: [
      'बहु-परिदृश्य क्वांटाइल पूर्वानुमान: 10वां प्रतिशतक (सूखा योजना), 50वां प्रतिशतक (मध्यम अनुमान) और 90वां प्रतिशतक (भारी वर्षा/बाढ़ जोखिम)।',
      '30-वर्षीय (1991-2020) IMD सामान्य वर्षा से ऐतिहासिक तुलना और विसंगति विश्लेषण।',
      'मॉडल कौशल स्कोरकार्ड: रूट मीन स्क्वेर्ड एरर (RMSE: 3.64 मिमी/दिन), ब्रियर स्कोर (0.114) और ROC-AUC विश्वसनीयता वक्र (0.878)।',
      'पारंपरिक पद्धतियों, क्लाइमेटोलॉजी और संख्यात्मक मौसम मॉडलों (NWP) की तुलना में LightGBM की श्रेष्ठता का मूल्यांकन।',
    ],
    callout_en: 'Inspect the multi-scenario quantile probability curves and model skill verification table.',
    callout_hi: 'क्वांटाइल संभाव्यता वक्र और मॉडल कौशल सत्यापन तालिका का निरीक्षण करें।',
  },
  {
    step: 8,
    tabId: 'chatstore',
    icon: '💬',
    badge_en: 'DATA PERSISTENCE',
    badge_hi: 'डेटा स्थायित्व',
    title_en: '8. Local Chat Store & Autonomous Session Persistence',
    title_hi: '8. चैट स्टोर एवं स्वचालित परामर्श सत्र संग्रहण',
    subtitle_en: 'Dual-Layer Persistence (LocalStorage + SQLite) for Agronomic Consultations',
    subtitle_hi: 'दोहरी परत स्थायित्व (ब्राउज़र कैश + SQLite बैकएंड) कृषि परामर्श इतिहास हेतु',
    bullets_en: [
      'Dual-layer persistence architecture: Browser LocalStorage cache + SQLite backend tables (chat_sessions and chat_messages) ensures zero conversation loss even during rural connectivity dropouts.',
      'Context-aware session metadata capturing user role, target crop, geographic coordinates, intent classification, and authoritative scientific data sources used in answers.',
      'Full-text search across past consultations with instant filters for crop type, language (Hindi/English), and time window.',
      'One-click JSON export for agricultural extension workers, Krishi Vigyan Kendras (KVKs), and state agronomists to audit rural farmer advisory quality.',
    ],
    bullets_hi: [
      'दोहरी परत वास्तुकला: ब्राउज़र लोकलस्टोरेज + बैकएंड SQLite डेटाबेस (chat_sessions व chat_messages तालिकाएं) ग्रामीण नेटवर्क कटने पर भी बातचीत सुरक्षित रखती हैं।',
      'संदर्भ-जागरूक मेटाडेटा: उपयोगकर्ता की भूमिका, लक्षित फसल, भौगोलिक निर्देशांक और उत्तर में प्रयुक्त सरकारी वैज्ञानिक स्रोतों का स्वतः रिकॉर्ड।',
      'पूर्व परामर्शों में खोज: फसल के प्रकार, भाषा (हिंदी/अंग्रेजी) और दिनांक के अनुसार तुरंत फिल्टर करने की सुविधा।',
      'कृषि विज्ञान केंद्र (KVK) और विस्तार अधिकारियों के लिए 1-क्लिक JSON निर्यात, जिससे किसान सलाह की गुणवत्ता की जांच की जा सके।',
    ],
    callout_en: 'Browse saved chat sessions, inspect question details, and test search filtering.',
    callout_hi: 'सहेजे गए चैट सत्रों को ब्राउज़ करें, प्रश्नों के विवरण देखें और खोज फ़िल्टरिंग का परीक्षण करें।',
  },
  {
    step: 9,
    tabId: 'alerts',
    icon: '🚨',
    badge_en: 'DISASTER RESILIENCE',
    badge_hi: 'आपदा प्रबंधन',
    title_en: '9. Last-Mile Emergency Alerts & Multi-Gateway Simulator',
    title_hi: '9. अंतिम छोर तक आपातकालीन अलर्ट एवं मल्टी-गेटवे सिमुलेटर',
    subtitle_en: 'Multi-Channel Disaster Telecommunications for Extreme Weather Events',
    subtitle_hi: 'चरम मौसमी घटनाओं हेतु बहु-माध्यम (SMS, Email, WhatsApp) आपदा प्रसारण',
    bullets_en: [
      'Multi-channel notification routing engine supporting Twilio SMS, Fast2SMS Indian gateway, SMTP Email, and WhatsApp Webhook protocols.',
      'Interactive drill simulator enabling disaster management authorities to dispatch simulated emergency alerts (Cloudburst, Flash Flood, Severe Hailstorm, Pest Infestation).',
      'Strict cryptographic timestamping and delivery log telemetry recording status (ACCEPTED, QUEUED, DELIVERED, FAILED) with zero false-success reporting.',
      'Automated language translation ensuring emergency alerts reach rural communities in their preferred native dialect.',
    ],
    bullets_hi: [
      'मल्टी-चैनल अधिसूचना इंजन: Twilio SMS, Fast2SMS भारतीय गेटवे, SMTP ईमेल और WhatsApp प्रोटोकॉल का समर्थन।',
      'इंटरैक्टिव मॉक-ड्रिल सिमुलेटर: आपदा प्रबंधन अधिकारियों द्वारा आपातकालीन अलर्ट (बादल फटना, अचानक बाढ़, ओलावृष्टि, टिड्डी/कीट प्रकोप) का सिम्युलेटेड परीक्षण।',
      'सख्त टाइमस्टैम्पिंग और डिलीवरी ऑडिट लॉग (स्वीकृत, कतारबद्ध, वितरित, असफल) बिना किसी झूठे दावों के।',
      'स्वचालित भाषा अनुवाद जिससे ग्रामीण समुदायों को उनकी मातृभाषा में आपातकालीन चेतावनी प्राप्त हो।',
    ],
    callout_en: 'Test dispatching a simulated hyper-local flash alert to registered devices.',
    callout_hi: 'पंजीकृत उपकरणों पर एक सिम्युलेटेड हाइपर-लोकल फ्लैश अलर्ट भेजकर परीक्षण करें।',
    requiresPrivilege: true,
  },
  {
    step: 10,
    tabId: 'system',
    icon: '⚙️',
    badge_en: 'TRANSPARENCY & AUDIT',
    badge_hi: 'पारदर्शिता एवं ऑडिट',
    title_en: '10. System Control & Dataset Provenance Registry',
    title_hi: '10. सिस्टम नियंत्रण एवं डेटासेट प्रामाणिकता रजिस्ट्री',
    subtitle_en: 'Dataset Tier Controller, 10 Authoritative Registries & Zero-PII Audit Telemetry',
    subtitle_hi: 'डेटासेट टियर नियंत्रक, 10 आधिकारिक डेटा स्रोत एवं शून्य-PII ऑडिट लॉग',
    bullets_en: [
      'Dataset Tier Controller: Instant toggle between Live AWS Observation Stream, Offline-Resilient Cached Store (with SHA-256 hashed snapshots), and Deterministic Synthetic Benchmark Suite.',
      'Dataset Provenance Registry: Exhaustive documentation of all 10 authoritative data sources (Open-Meteo, NOAA PSL, IMD, LGD MoPR, ICAR, NRRI) with update frequencies, licenses, and verified SLAs.',
      'Live service health diagnostics monitoring SQLite database connection, ML engine inference latency, upstream API connectivity, and background worker queues.',
      'Zero-PII activity logging (activity_logs table) tracking platform events without storing personal identifying data or security tokens.',
    ],
    bullets_hi: [
      'डेटासेट टियर नियंत्रक: लाइव AWS डेटा स्ट्रीम, ऑफलाइन कैश्ड स्टोर (SHA-256 हैशेड) और बेंचमार्क सुइट के बीच त्वरित स्विच।',
      'डेटासेट प्रामाणिकता रजिस्ट्री: सभी 10 आधिकारिक डेटा स्रोतों (Open-Meteo, NOAA PSL, IMD, LGD MoPR, ICAR, NRRI) की अद्यतन आवृत्ति, लाइसेंस और SLA का पूरा दस्तावेज।',
      'लाइव सर्विस स्वास्थ्य डायग्नोस्टिक्स: SQLite डेटाबेस, ML अनुमान लेटेंसी, अपस्ट्रीम API कनेक्टिविटी और वर्कर कतारों की सतत निगरानी।',
      'शून्य-PII ऑडिट लॉगिंग (activity_logs तालिका) जो किसानों की व्यक्तिगत पहचान या पासवर्ड के बिना सिस्टम घटनाओं को रिकॉर्ड करती है।',
    ],
    callout_en: 'Observe the live dataset provenance registry and service health telemetry.',
    callout_hi: 'लाइव डेटासेट प्रामाणिकता रजिस्ट्री और सर्विस हेल्थ टेलीमेट्री का अवलोकन करें।',
    requiresPrivilege: true,
  },
];

export default function JudgeTourModal({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  onOpenChat,
  switchRole,
  userRole,
  lang = 'en',
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  const isHindi = lang === 'hi';

  // Apply slide transition to live application
  const applySlide = useCallback(
    (index) => {
      const slide = JUDGE_SLIDES[index];
      if (!slide) return;
      setCurrentStepIndex(index);

      // If slide requires privileged role and user is in farmer mode, elevate to developer for demonstration
      if (slide.requiresPrivilege && userRole === 'farmer' && switchRole) {
        switchRole('developer');
      }

      // Switch active tab
      if (setActiveTab) {
        setActiveTab(slide.tabId);
      }

      // Scroll to target element if specified
      if (slide.targetId) {
        setTimeout(() => {
          const el = document.getElementById(slide.targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      }
    },
    [setActiveTab, switchRole, userRole]
  );

  // Handle keyboard arrows (Left/Right) for PPT-style control
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (currentStepIndex < JUDGE_SLIDES.length - 1) {
          applySlide(currentStepIndex + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentStepIndex > 0) {
          applySlide(currentStepIndex - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStepIndex, applySlide, onClose]);

  // When tour opens, navigate to current slide
  useEffect(() => {
    if (isOpen) {
      applySlide(currentStepIndex);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentSlide = JUDGE_SLIDES[currentStepIndex];

  return (
    <div
      className="judge-tour-dialog"
      style={{
        position: 'fixed',
        top: '55px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99990,
        width: '94%',
        maxWidth: '860px',
        maxHeight: 'calc(100dvh - 75px)',
        pointerEvents: 'none',
        animation: 'slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          background: 'linear-gradient(135deg, rgba(8, 14, 30, 0.98) 0%, rgba(10, 18, 42, 0.99) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          borderRadius: '18px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(2, 132, 199, 0.3)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: isMinimized ? 'auto' : 'calc(100dvh - 75px)',
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            padding: '0.65rem 1rem',
            borderBottom: isMinimized ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)',
            gap: '0.5rem',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.78rem',
                fontWeight: 800,
                padding: '0.25rem 0.65rem',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.45) 0%, rgba(56, 189, 248, 0.25) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.65)',
                color: '#38bdf8',
                boxShadow: '0 0 14px rgba(56, 189, 248, 0.35)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <span>{isHindi ? '⚖️ वर्षानेत्र जज फ्लो' : '⚖️ VarshaNetra Judge Flow'}</span>
              <span>•</span>
              <span>{currentSlide.step}/{JUDGE_SLIDES.length}</span>
            </span>

            <span
              style={{
                fontSize: '0.64rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
                padding: '0.2rem 0.55rem',
                borderRadius: '999px',
                border: '1px solid rgba(16, 185, 129, 0.5)',
                background: 'rgba(16, 185, 129, 0.12)',
                color: '#34d399',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {isHindi ? currentSlide.badge_hi : currentSlide.badge_en}
            </span>

            <span className="desktop-only" style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 600 }}>
              {isHindi ? '(वेबसाइट नियंत्रित करने हेतु ← / → कुंजियों का उपयोग करें)' : '(Use ← / → Arrow Keys to Steer Web App)'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '6px',
                padding: '0.25rem 0.6rem',
                color: '#cbd5e1',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
              title={isMinimized ? (isHindi ? 'स्लाइड विस्तार करें' : 'Expand Slide') : (isHindi ? 'स्लाइड छोटा करें' : 'Minimize Slide')}
            >
              {isMinimized ? (isHindi ? 'विस्तार करें ▲' : 'Expand ▲') : (isHindi ? 'छोटा करें ▼' : 'Minimize ▼')}
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                minWidth: '30px',
                minHeight: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
                cursor: 'pointer',
                fontSize: '0.85rem',
                flexShrink: 0,
              }}
              title={isHindi ? 'गाइड बंद करें (Esc)' : 'Close Guide (Esc)'}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Content & Footer (Hidden when Minimized) */}
        {!isMinimized && (
          <>
            {/* Scrollable Slide Body */}
            <div
              className="judge-tour-body"
              style={{
                padding: '1rem 1.25rem',
                overflowY: 'auto',
                flex: 1,
                minHeight: 0,
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Title & Icon Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem', marginBottom: '0.9rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(2, 132, 199, 0.25)',
                    border: '1px solid rgba(56, 189, 248, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    flexShrink: 0,
                    boxShadow: '0 0 18px rgba(56, 189, 248, 0.3)',
                  }}
                >
                  {currentSlide.icon}
                </div>

                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                    {isHindi ? currentSlide.title_hi : currentSlide.title_en}
                  </h3>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.84rem', color: '#38bdf8', fontWeight: 600 }}>
                    {isHindi ? currentSlide.subtitle_hi : currentSlide.subtitle_en}
                  </p>
                </div>
              </div>

              {/* Bullet Points Container */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '0.85rem 1.1rem',
                  marginBottom: '0.8rem',
                }}
              >
                <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {(isHindi ? currentSlide.bullets_hi : currentSlide.bullets_en).map((bullet, idx) => (
                    <li key={idx} style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: '1.5' }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Look At Callout Box */}
              <div
                style={{
                  background: 'rgba(2, 132, 199, 0.14)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '10px',
                  padding: '0.6rem 0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  marginBottom: '0.4rem',
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>👁️</span>
                <span style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 600 }}>
                  {isHindi ? currentSlide.callout_hi : currentSlide.callout_en}
                </span>
              </div>
            </div>

            {/* Pinned Navigation & PPT Controller Footer (Always 100% visible at bottom) */}
            <div
              className="judge-tour-footer"
              style={{
                flexShrink: 0,
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(10, 14, 32, 0.98)',
                padding: '0.65rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                boxSizing: 'border-box',
                width: '100%',
              }}
            >
              {/* Row 1: Prev, Dot Pagination (1-10), Next */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.45rem',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={() => applySlide(currentStepIndex - 1)}
                  disabled={currentStepIndex === 0}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: currentStepIndex === 0 ? '#475569' : '#cbd5e1',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isHindi ? '← पिछला' : '← Prev'}
                </button>

                {/* Dot Pagination (1-10) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center', flexShrink: 0 }}>
                  {JUDGE_SLIDES.map((slide, idx) => {
                    const isActive = idx === currentStepIndex;
                    return (
                      <button
                        key={slide.step}
                        type="button"
                        onClick={() => applySlide(idx)}
                        style={{
                          width: isActive ? '18px' : '7px',
                          height: '7px',
                          borderRadius: '999px',
                          border: 'none',
                          background: isActive ? '#38bdf8' : 'rgba(255, 255, 255, 0.22)',
                          cursor: 'pointer',
                          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: isActive ? '0 0 8px rgba(56, 189, 248, 0.8)' : 'none',
                          padding: 0,
                          flexShrink: 0,
                        }}
                        title={isHindi ? `स्लाइड ${slide.step}: ${slide.title_hi}` : `Slide ${slide.step}: ${slide.title_en}`}
                      />
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (currentStepIndex < JUDGE_SLIDES.length - 1) {
                      applySlide(currentStepIndex + 1);
                    } else {
                      onClose();
                    }
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem',
                    padding: '0.45rem 1.05rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                    color: '#ffffff',
                    boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {currentStepIndex < JUDGE_SLIDES.length - 1
                    ? (isHindi ? 'अगला →' : 'Next →')
                    : (isHindi ? 'समाप्त ✓' : 'Finish ✓')}
                </button>
              </div>

              {/* Row 2: Ask VarshaNetra AI (Full Width) */}
              {onOpenChat && (
                <button
                  type="button"
                  onClick={onOpenChat}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    width: '100%',
                    padding: '0.48rem 0.9rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: '1px solid rgba(5, 150, 105, 0.5)',
                    background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.85) 0%, rgba(2, 132, 199, 0.85) 100%)',
                    color: '#ffffff',
                    boxShadow: '0 4px 14px rgba(5, 150, 105, 0.3)',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  title={isHindi ? 'वर्षानेत्र AI कृषि सलाहकार खोलें' : 'Open VarshaNetra AI Agricultural Decision Advisor'}
                >
                  <span>🤖 {isHindi ? 'वर्षानेत्र AI सलाहकार से पूछें' : 'Ask VarshaNetra AI Advisor'}</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translate(-50%, -15px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
