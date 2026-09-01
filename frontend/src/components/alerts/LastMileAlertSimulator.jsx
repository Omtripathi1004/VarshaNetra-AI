import React, { useState } from 'react';
import { useApp } from '../common/AppContext';
import VernacularTTSButton from '../common/VernacularTTSButton';

const ALERT_MESSAGES = {
  HEAVY_RAIN: {
    title: {
      en: '🔴 Heavy Rainfall & Flash Flood Warning',
      hi: '🔴 भारी वर्षा एवं जलभराव चेतावनी',
      mr: '🔴 मुसळधार पाऊस व पूर इशारा',
      te: '🔴 భారీ వర్షపాతం & వరద హెచ్చరిక',
      bn: '🔴 ভারী বৃষ্টিপাত ও বন্যার সতর্কতা'
    },
    sms: {
      en: 'VARSHANETRA ALERT: Heavy rainfall (85-140mm) expected in next 24h in your block. Suspend paddy transplanting, clear drainage furrows, protect livestock. - Kisan Seva',
      hi: 'वर्षानेत्र चेतावनी: आगामी 24 घंटे में आपके ब्लॉक में 85-140 मिमी भारी वर्षा की संभावना। धान रोपाई स्थगित करें, जल निकासी नालियां साफ़ रखें। - किसान सेवा',
      mr: 'वर्षानेत्र इशारा: पुढील २४ तासांत ८५-१४० मिमी मुसळधार पाऊस अपेक्षित. भात पुनर्लागवड थांबवा, निचरा नाल्या मोकळ्या करा. - किसान सेवा',
      te: 'వర్షనేత్ర హెచ్చరిక: రాబోయే 24 గంటల్లో మీ మండలంలో 85-140 మి.మీ భారీ వర్షం పడే అవకాశం ఉంది. వరి నాట్లు వాయిదా వేయండి, పశువులను సురక్షిత ప్రాంతాలకు తరలించండి. - కిసాన్ సేవ',
      bn: 'বর্ষানেত্র সতর্কতা: আগামী ২৪ ঘণ্টায় আপনার ব্লকে ৮৫-১৪০ মিমি ভারী বৃষ্টির সম্ভাবনা। ধান রোপণ স্থগিত রাখুন, নিকাশী নালা পরিষ্কার করুন। - কিষাণ সেবা'
    },
    whatsapp: {
      en: '🚨 *VARSHANETRA EMERGENCY AGRO-ALERT*\n📍 *Region:* Lucknow & Gangetic Basin\n🌧️ *Rainfall Intensity:* 85–140 mm (Severe)\n⚡ *Advisory:* High probability of field submergence. Clear furrow outlets immediately. Keep harvested crops elevated.',
      hi: '🚨 *वर्षानेत्र आपातकालीन कृषि चेतावनी*\n📍 *क्षेत्र:* लखनऊ एवं गंगा कछार बेसिन\n🌧️ *वर्षा तीव्रता:* 85–140 मिमी (अति-भारी)\n⚡ *परामर्श:* खेतों में जलभराव की उच्च संभावना। नालियों के मुहाने तुरंत खोलें। कटी हुई फसल को सुरक्षित ऊंचे स्थान पर रखें।',
      mr: '🚨 *वर्षानेत्र आपत्कालीन कृषी सल्ला*\n📍 *प्रदेश:* विदर्भ व मध्य महाराष्ट्र\n🌧️ *पाऊस तीव्रता:* ८५-१४० मिमी (अति मुसळधार)\n⚡ *सल्ला:* शेतात पाणी साचण्याची शक्यता. तात्काळ निचरा नाल्या उघडा. जनावरांना सुरक्षित ठिकाणी ठेवा.',
      te: '🚨 *వర్షనేత్ర అత్యవసర వ్యవసాయ హెచ్చరిక*\n📍 *ప్రాంతం:* మీ జిల్లా పరిధి\n🌧️ *వర్ష తీవ్రత:* 85-140 మి.మీ (అత్యంత భారీ)\n⚡ *సూచన:* పొలాల్లో నీరు నిలిచే ప్రమాదం ఉంది. మురుగు కాల్వలను వెంటనే సరిచేయండి.',
      bn: '🚨 *বর্ষানেত্র জরুরী কৃষি সতর্কতা*\n📍 *অঞ্চল:* আপনার ব্লক ও সংলগ্ন এলাকা\n🌧️ *বৃষ্টির তীব্রতা:* ৮৫-১৪০ মিমি (অতিভারী)\n⚡ *পরামর্শ:* জমিতে জল জমার আশঙ্কা। অবিলম্বে নিকাশী ব্যবস্থা নিশ্চিত করুন এবং ফসল সুরক্ষিত রাখুন।'
    }
  },
  SOWING_WINDOW: {
    title: {
      en: '🟡 Optimal Kharif Sowing Window Active',
      hi: '🟡 खरीफ बुवाई का सर्वोत्तम समय सक्रिय',
      mr: '🟡 खरीप पेरणीसाठी अनुकूल वेळ',
      te: '🟡 ఖరీఫ్ విత్తేందుకు అనుకూల సమయం',
      bn: '🟡 খরিফ বপনের উপযুক্ত সময়'
    },
    sms: {
      en: 'VARSHANETRA ADVISORY: Soil moisture reached 38% optimal level. Next 4 days favorable for paddy & soybean sowing with light scattered showers. - Kisan Seva',
      hi: 'वर्षानेत्र सलाह: मृदा नमी 38% अनुकूल स्तर पर पहुंची। आगामी 4 दिन धान व सोयाबीन बुवाई हेतु सर्वोत्तम हैं। हल्की फुहारों की संभावना। - किसान सेवा',
      mr: 'वर्षानेत्र सल्ला: जमिनीत ३८% ओलावा निर्माण झाला आहे. पुढील ४ दिवस भात व सोयाबीन पेरणीसाठी उत्तम. - किसान सेवा',
      te: 'వర్షనేత్ర సలహా: నేలలో తేమ 38% సరైన స్థాయికి చేరుకుంది. రాబోయే 4 రోజులు వరి, సోయాబీన్ విత్తనాలకు అనుకూలంగా ఉంటాయి. - కిసాన్ సేవ',
      bn: 'বর্ষানেত্র পরামর্শ: মাটির আর্দ্রতা ৩৮% অনুকূল পর্যায়ে পৌঁছেছে। আগামী ৪ দিন ধান ও সয়াবিন বোনার উপযুক্ত সময়। - কিষাণ সেবা'
    },
    whatsapp: {
      en: '🌾 *VARSHANETRA SOWING WINDOW ADVISORY*\n📍 *Soil Moisture:* 38% (Optimal)\n🌱 *Recommended Crops:* Paddy, Soybean, Maize\n💡 *Action:* Complete 20-day nursery transplanting now. Intermittent light showers will boost root establishment.',
      hi: '🌾 *वर्षानेत्र बुवाई परामर्श*\n📍 *मृदा नमी:* 38% (सर्वोत्तम)\n🌱 *अनुशंसित फसलें:* धान, सोयाबीन, मक्का\n💡 *कार्य:* 20-दिवसीय पौध रोपाई आज ही पूरी करें। हल्की बारिश से जड़ों का विकास तीव्र होगा।',
      mr: '🌾 *वर्षानेत्र पेरणी सल्ला*\n📍 *जमीन ओलावा:* ३८% (योग्य)\n🌱 *पिके:* भात, सोयाबीन, तूर\n💡 *सूचना:* पेरणी प्रक्रिया सुरू करा. हलका पाऊस मुळांच्या वाढीसाठी फायदेशीर ठरेल.',
      te: '🌾 *వర్షనేత్ర విత్తన సమయ సూచన*\n📍 *నేల తేమ:* 38% (అనుకూలం)\n🌱 *పంటలు:* వరి, సోయాబీన్, మొక్కజొన్న\n💡 *చర్య:* నారు నాట్లు వెంటనే పూర్తి చేయండి.',
      bn: '🌾 *বর্ষানেত্র রোপণ পরামর্শ*\n📍 *মাটির আর্দ্রতা:* ৩৮% (অনুকূল)\n🌱 *ফসল:* ধান, ভুট্টা, ডাল\n💡 *পরামর্শ:* ২০ দিনের ধানের চারা রোপণ করুন।'
    }
  },
  DRY_SPELL: {
    title: {
      en: '🟢 Dry Spell & Pest Protection Alert',
      hi: '🟢 शुष्क मौसम व कीट निगरानी अलर्ट',
      mr: '🟢 कोरडा हवामान व कीड नियंत्रण',
      te: '🟢 పొడి వాతావరణం & పురుగుల నివారణ',
      bn: '🟢 শুষ্ক আবহাওয়া ও কীটনাশক সতর্কতা'
    },
    sms: {
      en: 'VARSHANETRA ALERT: 6-day rain break forecast. High temperature (32C) may trigger fall armyworm. Inspect whorls and apply neem oil spray. - Kisan Seva',
      hi: 'वर्षानेत्र सूचना: आगामी 6 दिन वर्षा विराम का अनुमान। तापमान 32°C कीट प्रकोप बढ़ा सकता है। फसलों का निरीक्षण करें व नीम तेल छिड़कें। - किसान सेवा',
      mr: 'वर्षानेत्र सूचना: पुढील ६ दिवस पावसाची उघडीप राहील. कीड नियंत्रणासाठी निंबोळी अर्काची फवारणी करा. - किसान सेवा',
      te: 'వర్షనేత్ర హెచ్చరిక: రాబోయే 6 రోజులు వర్షాలు ఉండవు. పురుగుల వ్యాప్తిని గమనించి వేప నూనె పిచికారీ చేయండి. - కిసాన్ సేవ',
      bn: 'বর্ষানেত্র সতর্কতা: আগামী ৬ দিন বৃষ্টির বিরতি থাকবে। ফসলে পোকার আক্রমণ রোধে নিম তেল স্প্রে করুন। - কিষাণ সেবা'
    },
    whatsapp: {
      en: '🐛 *VARSHANETRA CROP PROTECTION ALERT*\n☀️ *Condition:* 6-Day Monsoon Break (32°C)\n🛡️ *Pest Risk:* Fall Armyworm & Stem Borer\n💡 *Action:* Apply 1500ppm Neem formulation in evening hours. Avoid excess urea application during rain lull.',
      hi: '🐛 *वर्षानेत्र फसल सुरक्षा अलर्ट*\n☀️ *स्थिति:* 6-दिवसीय मानसूनी विराम (32°C)\n🛡️ *कीट जोखिम:* फॉल आर्मीवर्म व तना छेदक\n💡 *कार्य:* शाम के समय 1500 पीपीएम नीम तेल का छिड़काव करें। शुष्क मौसम में अधिक यूरिया न डालें।',
      mr: '🐛 *वर्षानेत्र पीक संरक्षण अलर्ट*\n☀️ *स्थिती:* ६ दिवसांची पावसाची उघडीप\n🛡️ *कीड धोका:* लष्करी अळी व खोडकीड\n💡 *कार्य:* सायंकाळी निंबोळी अर्क फवारा.',
      te: '🐛 *వర్షనేత్ర పంట రక్షణ హెచ్చరిక*\n☀️ *పరిస్థితి:* 6 రోజుల వర్ష విరామం\n🛡️ *చర్య:* సాయంత్రం వేళల్లో వేపనూనె పిచికారీ చేయండి.',
      bn: '🐛 *বর্ষানেত্র ফসল সুরক্ষা সতর্কতা*\n☀️ *পরিস্থিতি:* ৬ দিন বৃষ্টির বিরতি\n🛡️ *পরামর্শ:* বিকেলে নিম তেল স্প্রে করুন।'
    }
  }
};

const LANGUAGES = [
  { id: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { id: 'mr', label: 'मराठी (Marathi)', flag: '🚩' },
  { id: 'te', label: 'తెలుగు (Telugu)', flag: '🌾' },
  { id: 'bn', label: 'বাংলা (Bengali)', flag: '🌊' },
  { id: 'en', label: 'English', flag: '🌐' }
];

export default function LastMileAlertSimulator() {
  const { lang, location } = useApp();
  const [selectedLang, setSelectedLang] = useState('hi');
  const [selectedAlert, setSelectedAlert] = useState('HEAVY_RAIN');
  const [previewMode, setPreviewMode] = useState('ALL'); // 'ALL' | 'FEATURE_PHONE' | 'WHATSAPP'
  const [broadcastCount, setBroadcastCount] = useState(48250);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  const currentAlertData = ALERT_MESSAGES[selectedAlert];
  const smsText = currentAlertData.sms[selectedLang] || currentAlertData.sms.en;
  const whatsappText = currentAlertData.whatsapp[selectedLang] || currentAlertData.whatsapp.en;
  const alertTitle = currentAlertData.title[selectedLang] || currentAlertData.title.en;

  const handleSimulateBroadcast = () => {
    setIsBroadcasting(true);
    setBroadcastSuccess(false);
    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastSuccess(true);
      setBroadcastCount(prev => prev + Math.floor(Math.random() * 150) + 50);
      setTimeout(() => setBroadcastSuccess(false), 5000);
    }, 1400);
  };

  return (
    <div className="card" style={{
      background: 'rgba(18, 14, 40, 0.85)',
      borderRadius: '18px',
      border: '1px solid rgba(56, 189, 248, 0.3)',
      padding: '1.4rem',
      marginBottom: '1.5rem',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
    }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1.2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>📡</span>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, background: 'linear-gradient(135deg, #38bdf8, #818cf8, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {lang === 'hi' ? 'अंतिम छोर तक सूचना सिम्युलेटर (Last-Mile Alert Simulator)' : 'Last-Mile Alert Simulator'}
            </h3>
          </div>
          <p style={{ margin: '0.3rem 0 0', fontSize: '0.78rem', color: '#94a3b8' }}>
            {lang === 'hi'
              ? 'ग्रामीण व गैर-स्मार्टफोन उपयोगकर्ताओं के लिए बहुभाषी एसएमएस एवं व्हाट्सएप पुश प्रसारण का सजीव पूर्वावलोकन'
              : 'Real-time multi-lingual SMS & WhatsApp push advisory broadcast preview for non-smartphone & rural farmers'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <VernacularTTSButton
            textHindi={smsText}
            textEnglish={currentAlertData.sms.en}
            lang={selectedLang === 'hi' ? 'hi' : 'en'}
            labelHi="संदेश सुनें"
            labelEn="Listen SMS"
            size="sm"
          />
          <button
            onClick={handleSimulateBroadcast}
            disabled={isBroadcasting}
            style={{
              background: isBroadcasting ? 'rgba(56, 189, 248, 0.3)' : 'linear-gradient(135deg, #0284c7, #059669)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '0.5rem 1rem',
              fontWeight: 800,
              fontSize: '0.78rem',
              cursor: isBroadcasting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)'
            }}
          >
            <span>{isBroadcasting ? '⏳' : '🚀'}</span>
            <span>{isBroadcasting ? (lang === 'hi' ? 'प्रसारण जारी...' : 'Broadcasting...') : (lang === 'hi' ? 'क्षेत्रीय प्रसारण परीक्षण' : 'Trigger Broadcast Test')}</span>
          </button>
        </div>
      </div>

      {/* CONTROLS BAR: ALERT TYPE + LANGUAGE SELECTOR */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '0.8rem',
        background: 'rgba(255,255,255,0.03)',
        padding: '0.8rem 1rem',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.06)',
        marginBottom: '1.2rem'
      }}>
        {/* Alert Type Selector */}
        <div>
          <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '0.35rem', fontWeight: 700 }}>
            ⚠️ {lang === 'hi' ? 'चेतावनी का प्रकार:' : 'Alert Category:'}
          </label>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            {[
              { id: 'HEAVY_RAIN', label_en: '🔴 Heavy Rain', label_hi: '🔴 भारी वर्षा' },
              { id: 'SOWING_WINDOW', label_en: '🟡 Sowing Window', label_hi: '🟡 बुवाई समय' },
              { id: 'DRY_SPELL', label_en: '🟢 Dry Spell', label_hi: '🟢 शुष्क विराम' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedAlert(item.id)}
                style={{
                  background: selectedAlert === item.id ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255,255,255,0.05)',
                  border: selectedAlert === item.id ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                  color: selectedAlert === item.id ? '#38bdf8' : '#cbd5e1',
                  borderRadius: '6px',
                  padding: '0.35rem 0.6rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {lang === 'hi' ? item.label_hi : item.label_en}
              </button>
            ))}
          </div>
        </div>

        {/* Vernacular Language Selector */}
        <div>
          <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '0.35rem', fontWeight: 700 }}>
            🗣️ {lang === 'hi' ? 'क्षेत्रीय भाषा चुनें (Regional Language):' : 'Vernacular Language:'}
          </label>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            {LANGUAGES.map(l => (
              <button
                key={l.id}
                onClick={() => setSelectedLang(l.id)}
                style={{
                  background: selectedLang === l.id ? 'rgba(5, 150, 105, 0.3)' : 'rgba(255,255,255,0.05)',
                  border: selectedLang === l.id ? '1px solid #059669' : '1px solid rgba(255,255,255,0.1)',
                  color: selectedLang === l.id ? '#34d399' : '#cbd5e1',
                  borderRadius: '6px',
                  padding: '0.35rem 0.6rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {l.flag} {l.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Device View Filter */}
        <div>
          <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '0.35rem', fontWeight: 700 }}>
            📱 {lang === 'hi' ? 'डिवाइस पूर्वावलोकन:' : 'Preview View:'}
          </label>
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            {[
              { id: 'ALL', label: 'Both (दोनों)' },
              { id: 'FEATURE_PHONE', label: '📟 Feature Phone' },
              { id: 'WHATSAPP', label: '💬 WhatsApp' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setPreviewMode(m.id)}
                style={{
                  background: previewMode === m.id ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255,255,255,0.05)',
                  border: previewMode === m.id ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.1)',
                  color: previewMode === m.id ? '#c084fc' : '#cbd5e1',
                  borderRadius: '6px',
                  padding: '0.35rem 0.55rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BROADCAST SUCCESS BANNER */}
      {broadcastSuccess && (
        <div style={{
          background: 'rgba(5, 150, 105, 0.15)',
          border: '1px solid #059669',
          borderRadius: '10px',
          padding: '0.7rem 1rem',
          marginBottom: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>✅</span>
            <span style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: 700 }}>
              {lang === 'hi'
                ? `सफलतापूर्वक प्रसारित! ${location.display_name} के 124 ग्राम पंचायतों में ${broadcastCount.toLocaleString('en-IN')} पंजीकृत किसानों को भेजा गया।`
                : `Broadcast Dispatched! Sent to ${broadcastCount.toLocaleString('en-IN')} registered farmers across 124 Gram Panchayats in ${location.display_name}.`}
            </span>
          </div>
          <span className="badge badge-success">Latency: 2.8s • 99.4% Delivered</span>
        </div>
      )}

      {/* MOCKUP PREVIEW GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: previewMode === 'ALL' ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* 1. RETRO FEATURE PHONE SMS SCREEN MOCKUP */}
        {(previewMode === 'ALL' || previewMode === 'FEATURE_PHONE') && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '1rem' }}>📟</span>
              <strong style={{ fontSize: '0.85rem', color: '#38bdf8' }}>
                {lang === 'hi' ? 'साधारण फ़ीचर फोन (SMS / 2G नेटवर्क)' : 'Basic Feature Phone (SMS / 2G GSM)'}
              </strong>
            </div>

            {/* Phone Outer Body */}
            <div style={{
              width: '100%',
              maxWidth: '340px',
              background: 'linear-gradient(180deg, #1e293b, #0f172a)',
              borderRadius: '24px',
              padding: '1.2rem 1rem',
              boxShadow: '0 16px 36px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.1)',
              border: '3px solid #334155'
            }}>
              {/* Earpiece slit */}
              <div style={{ width: '50px', height: '4px', background: '#475569', borderRadius: '2px', margin: '0 auto 0.8rem' }} />

              {/* Monochrome LCD Screen (Retro Green Glow) */}
              <div style={{
                background: 'linear-gradient(180deg, #1b382b, #142a20)',
                border: '3px solid #064e3b',
                borderRadius: '10px',
                padding: '0.8rem',
                color: '#6ee7b7',
                fontFamily: 'monospace, sans-serif',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8), 0 0 12px rgba(16, 185, 129, 0.15)'
              }}>
                {/* LCD Status Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', borderBottom: '1px dashed #065f46', paddingBottom: '0.3rem', marginBottom: '0.5rem', color: '#a7f3d0' }}>
                  <span>📶 BSNL KISAN</span>
                  <span>✉️ 1 MSG</span>
                  <span>🔋 88%</span>
                </div>

                {/* SMS Sender & Time */}
                <div style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 800, marginBottom: '0.3rem' }}>
                  [VK-VARSHA] 14:30
                </div>

                {/* SMS Text Content */}
                <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: 1.5, color: '#ecfdf5', minHeight: '90px' }}>
                  {smsText}
                </p>

                {/* Footer LCD info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.6rem', borderTop: '1px dashed #065f46', paddingTop: '0.3rem', fontSize: '0.65rem', color: '#6ee7b7' }}>
                  <span>[Options]</span>
                  <span>{smsText.length}/160 GSM</span>
                  <span>[Back]</span>
                </div>
              </div>

              {/* Physical Keypad Mockup */}
              <div style={{ marginTop: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
                  {['1', '2 ABC', '3 DEF', '4 GHI', '5 JKL', '6 MNO', '7 PQRS', '8 TUV', '9 WXYZ', '*', '0 +', '#'].map(k => (
                    <div key={k} style={{
                      background: 'linear-gradient(180deg, #334155, #1e293b)',
                      color: '#94a3b8',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '0.35rem 0.2rem',
                      borderRadius: '6px',
                      textAlign: 'center',
                      border: '1px solid rgba(255,255,255,0.05)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}>
                      {k}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. WHATSAPP BUSINESS VERIFIED FARMER ALERT MOCKUP */}
        {(previewMode === 'ALL' || previewMode === 'WHATSAPP') && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '1rem' }}>💬</span>
              <strong style={{ fontSize: '0.85rem', color: '#22c55e' }}>
                {lang === 'hi' ? 'व्हाट्सएप अधिकृत किसान सेवा (WhatsApp Business)' : 'WhatsApp Business Verified Alert'}
              </strong>
            </div>

            {/* Smartphone Shell */}
            <div style={{
              width: '100%',
              maxWidth: '340px',
              background: '#0b141a',
              borderRadius: '24px',
              padding: '1rem',
              boxShadow: '0 16px 36px rgba(0,0,0,0.7)',
              border: '3px solid #1e293b'
            }}>
              {/* WhatsApp App Header */}
              <div style={{
                background: '#1f2c34',
                borderRadius: '12px 12px 0 0',
                padding: '0.65rem 0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                borderBottom: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                  🌧️
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#e9edef' }}>VarshaNetra Kisan Alert</span>
                    <span style={{ color: '#00a884', fontSize: '0.8rem' }} title="Verified Official Channel">✓</span>
                  </div>
                  <span style={{ fontSize: '0.65rem', color: '#8696a0' }}>Official Agro-Advisory Channel</span>
                </div>
              </div>

              {/* WhatsApp Chat Body */}
              <div style={{
                background: '#0b141a',
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 0)',
                backgroundSize: '16px 16px',
                padding: '0.8rem 0.5rem',
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}>
                {/* Time pill */}
                <div style={{ alignSelf: 'center', background: '#182229', color: '#8696a0', fontSize: '0.62rem', padding: '0.2rem 0.5rem', borderRadius: '6px', marginBottom: '0.6rem' }}>
                  TODAY
                </div>

                {/* Message Bubble */}
                <div style={{
                  background: '#005c4b',
                  color: '#e9edef',
                  borderRadius: '10px 10px 0 10px',
                  padding: '0.75rem 0.85rem',
                  fontSize: '0.78rem',
                  lineHeight: 1.5,
                  alignSelf: 'flex-end',
                  maxWidth: '96%',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  whiteSpace: 'pre-line'
                }}>
                  {whatsappText}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.2rem', marginTop: '0.35rem', fontSize: '0.62rem', color: '#8696a0' }}>
                    <span>14:30</span>
                    <span style={{ color: '#53bdeb' }}>✓✓</span>
                  </div>
                </div>

                {/* WhatsApp Interactive Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.5rem' }}>
                  <button style={{
                    background: '#1f2c34',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#00a884',
                    padding: '0.45rem',
                    borderRadius: '8px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem'
                  }}>
                    🌾 {lang === 'hi' ? 'विस्तृत बुवाई मार्गदर्शिका' : 'View Sowing Guide'}
                  </button>
                  <button style={{
                    background: '#1f2c34',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#53bdeb',
                    padding: '0.45rem',
                    borderRadius: '8px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem'
                  }}>
                    📞 {lang === 'hi' ? 'किसान हेल्पलाइन कॉल करें (1800-180-1551)' : 'Call Kisan Helpline (1800-180-1551)'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* METRICS STRIP */}
      <div style={{
        marginTop: '1.2rem',
        paddingTop: '0.8rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '0.8rem'
      }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>📡 Gateway Connectivity</span>
          <p style={{ margin: '0.15rem 0 0', fontSize: '0.88rem', fontWeight: 800, color: '#34d399' }}>CDAC Mobile Seva + WhatsApp</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>👥 Active Registered Subscribers</span>
          <p style={{ margin: '0.15rem 0 0', fontSize: '0.88rem', fontWeight: 800, color: '#38bdf8' }}>{broadcastCount.toLocaleString('en-IN')} Farmers</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>⚡ Avg. Dispatch Latency</span>
          <p style={{ margin: '0.15rem 0 0', fontSize: '0.88rem', fontWeight: 800, color: '#f59e0b' }}>&lt; 3.2 Seconds</p>
        </div>
      </div>
    </div>
  );
}
