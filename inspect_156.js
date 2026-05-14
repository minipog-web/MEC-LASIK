const fs = require('fs');
const filePath = 'c:\\Users\\adamp\\Downloads\\LASIK-App\\index.html';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');
console.log('Line 156 start:', lines[155].substring(0, 100));
console.log('Line 156 end:', lines[155].slice(-100));
