import { useState, useEffect, useMemo } from 'react';

const HINDI_DAYS = {
  'Sunday': 'रविवार',
  'Monday': 'सोमवार',
  'Tuesday': 'मंगलवार',
  'Wednesday': 'बुधवार',
  'Thursday': 'गुरुवार',
  'Friday': 'शुक्रवार',
  'Saturday': 'शनिवार',
};

const HINDI_DAYS_SHORT = {
  'Sun': 'रवि',
  'Mon': 'सोम',
  'Tue': 'मंगल',
  'Wed': 'बुध',
  'Thu': 'गुरु',
  'Fri': 'शुक्र',
  'Sat': 'शनि',
};

const HINDI_MONTHS = {
  'Jan': 'जनवरी',
  'Feb': 'फरवरी',
  'Mar': 'मार्च',
  'Apr': 'अप्रैल',
  'May': 'मई',
  'Jun': 'जून',
  'Jul': 'जुलाई',
  'Aug': 'अगस्त',
  'Sep': 'सितंबर',
  'Oct': 'अक्टूबर',
  'Nov': 'नवंबर',
  'Dec': 'दिसंबर',
};

/**
 * Custom React Hook that automatically updates date & time every 60 seconds.
 */
export function useLiveDate() {
  const [dateInfo, setDateInfo] = useState(() => {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const dayShort = now.toLocaleDateString('en-US', { weekday: 'short' });
    const month = now.toLocaleDateString('en-US', { month: 'short' });
    const dateNum = now.getDate();
    const year = now.getFullYear();

    const fullDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const dayHi = HINDI_DAYS[day] || day;
    const dayShortHi = HINDI_DAYS_SHORT[dayShort] || dayShort;
    const monthHi = HINDI_MONTHS[month] || month;
    const fullDateHi = `${dateNum} ${monthHi} ${year}`;
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return {
      day,
      dayShort,
      dayHi,
      dayShortHi,
      fullDate,
      fullDateHi,
      timeStr,
      rawDate: now,
    };
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const day = now.toLocaleDateString('en-US', { weekday: 'long' });
      const dayShort = now.toLocaleDateString('en-US', { weekday: 'short' });
      const month = now.toLocaleDateString('en-US', { month: 'short' });
      const dateNum = now.getDate();
      const year = now.getFullYear();

      const fullDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const dayHi = HINDI_DAYS[day] || day;
      const dayShortHi = HINDI_DAYS_SHORT[dayShort] || dayShort;
      const monthHi = HINDI_MONTHS[month] || month;
      const fullDateHi = `${dateNum} ${monthHi} ${year}`;
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      setDateInfo({
        day,
        dayShort,
        dayHi,
        dayShortHi,
        fullDate,
        fullDateHi,
        timeStr,
        rawDate: now,
      });
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return dateInfo;
}

/**
 * Dynamically computes a 7-day forecast array rooted at the current live date.
 */
export function generateDynamicWeekData(currentWeather, rainfallPrediction, lang = 'en') {
  const now = new Date();
  const currentTemp = currentWeather?.temperature_c ? Math.round(currentWeather.temperature_c) : 28;
  const currentRainProb = rainfallPrediction?.probability_pct ?? 45;
  const currentExpectedRain = rainfallPrediction?.expected_mm ?? 4.2;

  const patterns = [
    {
      condition_en: currentWeather?.weather_description_en || 'Partly Cloudy',
      condition_hi: currentWeather?.weather_description_hi || 'आंशिक बादल',
      icon: '☁️',
      max: currentTemp + 4,
      min: Math.max(18, currentTemp - 4),
      feels_like: currentTemp + 3,
      rain_prob: currentRainProb,
      rain_mm: currentExpectedRain,
      wind_kmh: currentWeather?.wind_speed_kmh || 14,
      humidity: currentWeather?.humidity_pct || 78,
      soil_moisture: currentWeather?.soil_moisture_0_1cm || 0.32,
      alert_en: 'Active Weather Telemetry • Sowing & Field Drainage Monitored',
      alert_hi: 'सक्रिय मौसम डेटा • बुवाई व जल निकासी पर नज़र रखें',
    },
    {
      condition_en: 'Heavy Thunderstorm & Downpour',
      condition_hi: 'गरज के साथ भारी बारिश',
      icon: '⛈️',
      max: 30, min: 26, feels_like: 34,
      rain_prob: 88, rain_mm: 42.6, wind_kmh: 24, humidity: 92, soil_moisture: 0.44,
      alert_en: '⚠️ Heavy Rainfall Alert (>40mm) • Open Farm Drainage Trenches',
      alert_hi: '⚠️ भारी वर्षा चेतावनी (>40 मिमी) • खेत की जल निकासी नालियां खोलें',
    },
    {
      condition_en: 'Active Monsoon Showers',
      condition_hi: 'सक्रिय मानसूनी बौछारें',
      icon: '🌧️',
      max: 31, min: 27, feels_like: 35,
      rain_prob: 78, rain_mm: 28.0, wind_kmh: 18, humidity: 88, soil_moisture: 0.42,
      alert_en: 'Optimal Sowing Moisture • Complete Paddy Nursery Transplanting',
      alert_hi: 'रोपाई हेतु उत्तम नमी • धान की रोपाई पूरी करें',
    },
    {
      condition_en: 'Moderate Intermittent Rain',
      condition_hi: 'मध्यम रुक-रुक कर बारिश',
      icon: '🌦️',
      max: 30, min: 26, feels_like: 33,
      rain_prob: 65, rain_mm: 16.5, wind_kmh: 15, humidity: 85, soil_moisture: 0.38,
      alert_en: 'Moderate Surge • Hold Chemical Spraying Operations',
      alert_hi: 'मध्यम बारिश • कीटनाशक छिड़काव अभी रोकें',
    },
    {
      condition_en: 'Scattered Afternoon Rain',
      condition_hi: 'दोपहर में छिटपुट बारिश',
      icon: '🌧️',
      max: 31, min: 27, feels_like: 35,
      rain_prob: 55, rain_mm: 10.0, wind_kmh: 12, humidity: 80, soil_moisture: 0.35,
      alert_en: 'Scattered Showers • Basal Fertilizer Application Window',
      alert_hi: 'हल्की बारिश • बेसल खाद डालने हेतु उपयुक्त समय',
    },
    {
      condition_en: 'Passing Cloud & Sun',
      condition_hi: 'धूप-छांव व हल्की फुहार',
      icon: '⛅',
      max: 32, min: 27, feels_like: 37,
      rain_prob: 35, rain_mm: 4.2, wind_kmh: 10, humidity: 75, soil_moisture: 0.31,
      alert_en: 'Good Sunshine • Ideal for Cotton & Maize Foliar Spray',
      alert_hi: 'अच्छी धूप • कपास व मक्का में स्प्रे हेतु अनुकूल',
    },
    {
      condition_en: 'Dry Break Beginning',
      condition_hi: 'शुष्क विराम की शुरुआत',
      icon: '☀️',
      max: 33, min: 28, feels_like: 38,
      rain_prob: 18, rain_mm: 0.8, wind_kmh: 9, humidity: 68, soil_moisture: 0.28,
      alert_en: 'Dry Break Watch • Conserve Soil Moisture with Straw Mulch',
      alert_hi: 'शुष्क विराम की शुरुआत • पुआल की मल्चिंग से नमी बचाएं',
    },
  ];

  const days = [];

  for (let i = 0; i < 7; i++) {
    const target = new Date(now);
    target.setDate(now.getDate() + i);

    const full_en = target.toLocaleDateString('en-US', { weekday: 'long' });
    const day_en = target.toLocaleDateString('en-US', { weekday: 'short' });
    const full_hi = HINDI_DAYS[full_en] || full_en;
    const day_hi = HINDI_DAYS_SHORT[day_en] || day_en;

    const month_en = target.toLocaleDateString('en-US', { month: 'short' });
    const month_hi = HINDI_MONTHS[month_en] || month_en;
    const dateNum = target.getDate();

    let dateLabel = `${month_en} ${dateNum}`;
    let dateLabelHi = `${dateNum} ${month_hi}`;

    if (i === 0) {
      dateLabel = 'Today';
      dateLabelHi = 'आज';
    } else if (i === 1) {
      dateLabel = 'Tomorrow';
      dateLabelHi = 'कल';
    }

    const p = patterns[i % patterns.length];

    // Generate dynamic 8-interval chronological 24h hourly forecast with real ISO timestamps
    const baseDate = new Date(target);
    baseDate.setMinutes(0, 0, 0);

    const rawIntervals = [];
    for (let hIdx = 0; hIdx < 8; hIdx++) {
      const slotHour = hIdx * 3;
      const slotDate = new Date(baseDate);
      slotDate.setHours(slotHour, 0, 0, 0);

      const hourProb = Math.min(95, Math.max(5, Math.round(p.rain_prob + (Math.sin(hIdx) * 18))));
      const hourMm = Number(Math.max(0, (p.rain_mm * (hourProb / (p.rain_prob * 3 || 1))).toFixed(1)));
      const tempVal = Math.round(p.min + ((p.max - p.min) * (Math.sin((hIdx * Math.PI) / 4) + 1) / 2));
      const humidityVal = Math.min(98, Math.max(45, Math.round(p.humidity + (Math.cos(hIdx) * 8))));

      rawIntervals.push({
        isoTimestamp: slotDate.toISOString(),
        timestampDate: slotDate,
        hour: slotHour,
        temp: isNaN(tempVal) ? 'N/A' : tempVal,
        icon: hourProb > 70 ? '⛈️' : hourProb > 40 ? '🌧️' : hourProb > 20 ? '🌦️' : '☁️',
        rain: `${hourProb}%`,
        rain_mm: isNaN(hourMm) ? 0 : hourMm,
        prob_pct: hourProb,
        humidity: humidityVal,
        condition_en: hourProb > 60 ? 'Rain Showers' : hourProb > 30 ? 'Passing Clouds' : 'Partly Cloudy',
        condition_hi: hourProb > 60 ? 'वर्षा बौछारें' : hourProb > 30 ? 'बादल छाए' : 'आंशिक बादल',
      });
    }

    // Sort strictly in ascending chronological order via Date objects
    rawIntervals.sort((a, b) => a.timestampDate.getTime() - b.timestampDate.getTime());

    // Format display times in Asia/Kolkata timezone
    const hourly = rawIntervals.map((item, idx) => {
      const timeFormatted = item.timestampDate.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).toLowerCase();

      const time24Formatted = item.timestampDate.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      const isCurrentSlot = i === 0 && Math.abs(now.getHours() - item.hour) < 2;

      return {
        ...item,
        time: isCurrentSlot ? (lang === 'hi' ? 'अभी' : 'Now') : timeFormatted,
        time12: timeFormatted,
        time24: time24Formatted,
        displayTime: timeFormatted,
      };
    });

    days.push({
      day_en,
      day_hi,
      full_en,
      full_hi,
      date: lang === 'hi' ? dateLabelHi : dateLabel,
      dateRaw: target,
      temp: i === 0 ? currentTemp : Math.round((p.max + p.min) / 2),
      max: p.max,
      min: p.min,
      feels_like: p.feels_like,
      condition_en: p.condition_en,
      condition_hi: p.condition_hi,
      icon: p.icon,
      rain_prob: p.rain_prob,
      rain_mm: p.rain_mm,
      wind_kmh: p.wind_kmh,
      humidity: p.humidity,
      soil_moisture: p.soil_moisture,
      alert_en: p.alert_en,
      alert_hi: p.alert_hi,
      hourly,
    });
  }

  return days;
}

