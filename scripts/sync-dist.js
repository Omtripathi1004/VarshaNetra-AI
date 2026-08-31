const fs = require('fs');
const path = require('path');

const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
const targets = [
  path.join(__dirname, '..', 'backend', 'dist'),
  path.join(__dirname, '..', 'dist'),
  path.join(__dirname, '..', 'public')
];

if (fs.existsSync(frontendDist)) {
  for (const target of targets) {
    console.log(`🔄 Syncing frontend/dist -> ${path.basename(target)}...`);
    fs.cpSync(frontendDist, target, { recursive: true, force: true });
  }
  console.log('✅ Build assets synced to all distribution directories successfully!');
} else {
  console.log('ℹ️ frontend/dist does not exist yet.');
}
