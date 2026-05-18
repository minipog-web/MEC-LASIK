const fs = require('fs');
const filePath = 'index.html';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const targetLines = [147, 422, 480, 552, 611];

targetLines.forEach(lineNum => {
  console.log(`=== Line ${lineNum} (1-based index: ${lineNum}) ===`);
  const start = Math.max(0, lineNum - 5);
  const end = Math.min(lines.length - 1, lineNum + 5);
  for (let i = start; i <= end; i++) {
    const prefix = (i + 1) === lineNum ? '>>> ' : '    ';
    console.log(`${prefix}${i + 1}: ${lines[i]}`);
  }
  console.log('\n');
});
