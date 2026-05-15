const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The JS injection string has 'hero-anim-wrapper' in it. We need to remove the exact HTML we injected.
// The HTML was:
// <div id="hero-anim-wrapper">
//   <div class="hero-bg-image"></div>
//   <div class="hero-bg-overlay"></div>
// </div>

const animHTML = `<div id="hero-anim-wrapper">
    <div class="hero-bg-image"></div>
    <div class="hero-bg-overlay"></div>
  </div>`;

content = content.replace(animHTML, '');

// Also remove any minified or whitespace-altered versions:
const startIdx = content.indexOf('<div id="hero-anim-wrapper"');
if (startIdx !== -1) {
    const endIdx = content.indexOf('</div>', content.indexOf('</div>', startIdx) + 6);
    if (endIdx !== -1) {
        content = content.substring(0, startIdx) + content.substring(endIdx + 6);
    }
}

content = content.replace(/hero-section-enhanced/g, '');

fs.writeFileSync('index.html', content);
console.log('Cleaned.');
