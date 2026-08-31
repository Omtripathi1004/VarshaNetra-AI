const fs = require('fs');
const path = require('path');

const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
const backendDist = path.join(__dirname, '..', 'backend', 'dist');

if (fs.existsSync(frontendDist)) {
  console.log('🔄 Syncing frontend/dist -> backend/dist...');
  fs.cpSync(frontendDist, backendDist, { recursive: true, force: true });
  console.log('✅ Build assets synced successfully to backend/dist!');
} else {
  console.log('ℹ️ frontend/dist does not exist yet.');
}
