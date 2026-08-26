const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'backend', 'dist');
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');

if (fs.existsSync(src)) {
  console.log('🔄 Syncing backend/dist -> frontend/dist...');
  fs.cpSync(src, frontendDist, { recursive: true, force: true });
  console.log('✅ Build assets synced successfully!');
} else {
  console.error('❌ Error: backend/dist does not exist.');
  process.exit(1);
}
