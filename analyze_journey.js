const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Find the step button rendering (the A.map part with button styles)
const mapIdx = content.indexOf('A.map((n,r)');
if (mapIdx !== -1) {
  console.log('Button map code:\n', content.substring(mapIdx, mapIdx + 800));
}
