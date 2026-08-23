import axios from 'axios';

const BASE = '/api/v1';

// Build query params — accepts either GPS (lat/lon) or manual (state/district/city/village)
const locParams = (loc) => {
  if (!loc) return {};
  const p = {};
  if (loc.lat != null) p.lat = loc.lat;
  if (loc.lon != null) p.lon = loc.lon;
  if (loc.state) p.state = loc.state;
  if (loc.district) p.district = loc.district;
  if (loc.city) p.city = loc.city;
  if (loc.village) p.village = loc.village;
  return p;
};

export const api = {
  // Location
  resolveLocation: (loc) => axios.get(`${BASE}/location/resolve`, { params: locParams(loc) }),
  searchLocation: (q) => axios.get(`${BASE}/location/search`, { params: { q } }),

  // Weather — works for BOTH GPS and manual inputs
  getCurrentWeather: (loc) => axios.get(`${BASE}/weather/current`, { params: locParams(loc) }),
  getForecast: (loc, days = 7) => axios.get(`${BASE}/weather/forecast`, { params: { ...locParams(loc), days } }),
  getShowcaseWeather: () => axios.get(`${BASE}/weather/showcase`),

  // Prediction
  getRainfallPrediction: (loc) => axios.get(`${BASE}/prediction/rainfall`, { params: locParams(loc) }),
  getExplainPrediction: (loc) => axios.get(`${BASE}/prediction/explain`, { params: locParams(loc) }),
  getPredictionHistory: (limit = 20) => axios.get(`${BASE}/prediction/history`, { params: { limit } }),

  // Monsoon
  getMonsoonPhase: (loc) => axios.get(`${BASE}/monsoon/phase`, { params: locParams(loc) }),

  // Crops
  getCropAdvisor: (loc, season = 'ALL', topN = 5) =>
    axios.get(`${BASE}/crops/advisor`, { params: { ...locParams(loc), season, top_n: topN } }),
  getAllCrops: (season) => axios.get(`${BASE}/crops/all`, { params: season ? { season } : {} }),

  // Risk
  getRiskSummary: (loc) => axios.get(`${BASE}/risk/summary`, { params: locParams(loc) }),
  getRiskGeoJSON: (loc) => axios.get(`${BASE}/risk/geojson`, { params: locParams(loc) }),

  // Alerts
  getAlerts: (state, district) =>
    axios.get(`${BASE}/alerts`, { params: { ...(state ? { state } : {}), ...(district ? { district } : {}) } }),
  acknowledgeAlert: (id, acknowledgedBy, actionTaken) =>
    axios.post(`${BASE}/alerts/${id}/acknowledge`, null, { params: { acknowledged_by: acknowledgedBy, action_taken: actionTaken } }),

  // Emergency
  getActiveEmergencies: () => axios.get(`${BASE}/emergency/active`),
  resolveEmergency: (id, officerName, actionTaken, statusUpdate = 'RESOLVED') =>
    axios.post(`${BASE}/emergency/${id}/resolve`, null, {
      params: { officer_name: officerName, action_taken: actionTaken, status_update: statusUpdate }
    }),

  // Notifications
  sendNotification: (channel, recipients, message, subject = '', alertType = 'GENERAL') =>
    axios.post(`${BASE}/notify/send`, {
      channel,
      recipients,
      message,
      subject,
      alert_type: alertType,
    }),
  getNotificationLog: (limit = 50) => axios.get(`${BASE}/notify/log`, { params: { limit } }),

  // Chat
  chat: (message, language, loc) =>
    axios.post(`${BASE}/chat`, null, { params: { message, language, ...locParams(loc) } }),

  // Simulation
  runSimulation: (loc, crop, rainfallChangePct, dryDays, tempChangeC, durationDays = 14) =>
    axios.post(`${BASE}/simulation/what-if`, null, {
      params: {
        lat: loc.lat, lon: loc.lon,
        crop_name: crop,
        rainfall_change_pct: rainfallChangePct,
        dry_days: dryDays,
        temperature_change_c: tempChangeC,
        duration_days: durationDays,
      }
    }),

  // Analytics
  getHistoricalAnalytics: (loc) => axios.get(`${BASE}/analytics/historical`, { params: locParams(loc) }),
  getModelPerformance: () => axios.get(`${BASE}/analytics/model-performance`),

  // System
  getSystemStatus: () => axios.get(`${BASE}/system/status`),
  getUsers: () => axios.get(`${BASE}/users`),
};
