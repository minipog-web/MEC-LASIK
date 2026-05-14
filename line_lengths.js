const fs = require('fs');
const filePath = 'c:\\Users\\adamp\\Downloads\\LASIK-App\\index.html';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
  if (line.length > 1000) {
    console.log(`Line ${i + 1}: ${line.length} chars`);
  }
});
