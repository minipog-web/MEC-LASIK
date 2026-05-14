const fs = require('fs');
const filePath = 'c:\\Users\\adamp\\Downloads\\LASIK-App\\index.html';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');
console.log('Total lines:', lines.length);
console.log('Line 147:', lines[146]);
console.log('Line 148 length:', lines[147]?.length);
console.log('Last few lines:');
console.log(lines.slice(-20).join('\n'));
