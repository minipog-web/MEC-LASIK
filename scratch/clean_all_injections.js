const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Remove education
content = content.replace(/<style id="edu-styles">[\s\S]*?<\/style>/g, '');
content = content.replace(/<script id="edu-logic">[\s\S]*?<\/script>/g, '');
content = content.replace(/<section id="education-section">[\s\S]*?<\/section>/g, '');

// Remove marano
content = content.replace(/<style id="marano-styles">[\s\S]*?<\/style>/g, '');
content = content.replace(/<script id="marano-logic">[\s\S]*?<\/script>/g, '');

// Remove contact form
content = content.replace(/<style id="contact-styles">[\s\S]*?<\/style>/g, '');
content = content.replace(/<script id="contact-logic">[\s\S]*?<\/script>/g, '');

// Remove laser animation
content = content.replace(/<style id="laser-styles">[\s\S]*?<\/style>/g, '');
content = content.replace(/<script id="laser-logic">[\s\S]*?<\/script>/g, '');

// Remove journey mobile step nav fix
content = content.replace(/<style id="journey-nav-styles">[\s\S]*?<\/style>/g, '');
content = content.replace(/<script id="journey-nav-class">[\s\S]*?<\/script>/g, '');

// Remove heritage styles
content = content.replace(/<style id="heritage-styles">[\s\S]*?<\/style>/g, '');
// Remove heritage section from body if present
content = content.replace(/<section id="heritage-section">[\s\S]*?<\/section>/g, '');

// Clean any literal '\n' string tokens
content = content.replace(/\\n/g, '\n');

// Normalize excessive whitespace/newlines
content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

fs.writeFileSync('index.html', content);
console.log('Successfully cleaned all injected blocks from index.html.');
