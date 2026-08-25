const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'frontend', 'dist');
const distDst = path.join(__dirname, '..', 'dist');
const publicDst = path.join(__dirname, '..', 'public');

if (fs.existsSync(src)) {
  console.log('🔄 Syncing frontend/dist -> dist & public...');
  fs.cpSync(src, distDst, { recursive: true, force: true });
  fs.cpSync(src, publicDst, { recursive: true, force: true });
  console.log('✅ Build assets synced successfully!');
} else {
  console.error('❌ Error: frontend/dist does not exist. Build frontend first.');
  process.exit(1);
}
