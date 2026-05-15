const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Use non-greedy regex with [\s\S] to match across multiple lines
content = content.replace(/<style id="hero-animation-styles">[\s\S]*?<\/style>/g, '');
content = content.replace(/<script id="hero-animation-logic">[\s\S]*?<\/script>/g, '');
content = content.replace(/<div id="hero-anim-wrapper">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');
content = content.replace(/<div id="hero-anim-wrapper">[\s\S]*?<\/div>\s*<\/div>/g, '');
content = content.replace(/<div id="hero-anim-wrapper">[\s\S]*?<\/div>/g, '');
content = content.replace(/hero-section-enhanced/g, '');

fs.writeFileSync('index.html', content);
console.log('Regex cleanup done.');
