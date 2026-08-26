async function verify() {
  const htmlRes = await fetch('https://varshanetra-ai.vercel.app/');
  const html = await htmlRes.text();
  console.log('HTML status:', htmlRes.status);
  
  const jsMatch = html.match(/src="([^"]+\.js)"/);
  const cssMatch = html.match(/href="([^"]+\.css)"/);
  
  console.log('JS script tag:', jsMatch ? jsMatch[1] : 'NONE');
  console.log('CSS stylesheet tag:', cssMatch ? cssMatch[1] : 'NONE');
  
  if (jsMatch) {
    const jsRes = await fetch('https://varshanetra-ai.vercel.app' + jsMatch[1]);
    const jsType = jsRes.headers.get('content-type');
    const jsTxt = await jsRes.text();
    console.log('JS response status:', jsRes.status);
    console.log('JS Content-Type:', jsType);
    console.log('JS start snippet:', jsTxt.substring(0, 100));
  }
  
  if (cssMatch) {
    const cssRes = await fetch('https://varshanetra-ai.vercel.app' + cssMatch[1]);
    const cssType = cssRes.headers.get('content-type');
    console.log('CSS response status:', cssRes.status);
    console.log('CSS Content-Type:', cssType);
  }
}
verify();
