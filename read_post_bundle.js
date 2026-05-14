const fs = require('fs');
const filePath = 'c:\\Users\\adamp\\Downloads\\LASIK-App\\index.html';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');
console.log(lines.slice(156).join('\n')); // lines is 0-indexed, so 156 is Line 157
