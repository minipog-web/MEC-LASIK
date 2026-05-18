const fs = require('fs');

const filePath = 'index.html';
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace all occurrences of literal \n (backslash and n) with a real newline or clean space
  // We match optional whitespace, then two backslashes followed by n, then optional whitespace
  content = content.replace(/\s*\\n\s*/g, '\n');

  // Also remove any duplicate empty lines to keep it beautiful
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

  fs.writeFileSync(filePath, content);
  console.log('✓ Successfully cleaned all literal \\n tokens from index.html');
} else {
  console.log('index.html not found');
}
