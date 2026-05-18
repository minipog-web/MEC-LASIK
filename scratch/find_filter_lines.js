const fs = require('fs');
const filePath = 'index.html';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  if (line.includes('backdrop-filter')) {
    console.log(`Line ${index + 1}: ${line}`);
  }
});
