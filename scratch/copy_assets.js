const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\adamp\\.gemini\\antigravity\\brain\\79713c09-4f61-422b-ba5b-360677746d86\\.tempmediaStorage';
const destDir = 'C:\\Users\\adamp\\.gemini\\antigravity\\brain\\79713c09-4f61-422b-ba5b-360677746d86';

const mappings = {
  'media_79713c09-4f61-422b-ba5b-360677746d86_1779072610026.png': 'hero_initial.png',
  'media_79713c09-4f61-422b-ba5b-360677746d86_1779072619066.png': 'hero_scrolled.png',
  'media_79713c09-4f61-422b-ba5b-360677746d86_1779072628587.png': 'trust_metrics.png'
};

for (const [srcName, destName] of Object.entries(mappings)) {
  const srcPath = path.join(srcDir, srcName);
  const destPath = path.join(destDir, destName);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${srcName} to ${destName}`);
  } else {
    console.error(`Source not found: ${srcName}`);
  }
}
