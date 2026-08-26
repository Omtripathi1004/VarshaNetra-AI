async function fullCheck() {
  const base = 'https://varshanetra-ai.vercel.app';
  const endpoints = [
    '/',
    '/api/health',
    '/api/map/stats',
    '/api/weather?lat=28.6&lon=77.2',
    '/api/predict?lat=28.6&lon=77.2&state=Delhi&district=Delhi',
    '/api/monsoon-phase?lat=28.6&lon=77.2',
    '/api/crop-suitability?lat=28.6&lon=77.2',
    '/api/risk?lat=28.6&lon=77.2',
    '/api/analytics?lat=28.6&lon=77.2',
    '/assets/index-QKMabVlN.js',
    '/assets/index-DBlKF0mA.css',
  ];
  
  for (const ep of endpoints) {
    try {
      const r = await fetch(base + ep);
      const ct = r.headers.get('content-type') || '';
      let preview = '';
      if (ct.includes('json')) {
        const j = await r.json();
        preview = JSON.stringify(j).substring(0, 80);
      } else {
        const t = await r.text();
        preview = t.substring(0, 60).replace(/\n/g, ' ');
      }
      console.log(`[${r.status}] ${ep} | ${ct.split(';')[0]} | ${preview}`);
    } catch(e) {
      console.log(`[ERR] ${ep} | ${e.message}`);
    }
  }
}
fullCheck();
