const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');
const id = '<style id=\"hero-animation-styles\">';
const endIdx = c.indexOf('</style>', c.indexOf(id));
if (c.includes(id) && endIdx !== -1) {
  c = c.substring(0, c.indexOf(id)) + c.substring(endIdx + 8);
}
fs.writeFileSync('index.html', c);
