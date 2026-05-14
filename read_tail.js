const fs = require('fs');
const filePath = 'c:\\Users\\adamp\\Downloads\\LASIK-App\\index.html';
const stats = fs.statSync(filePath);
const bufferSize = 10000;
const start = Math.max(0, stats.size - bufferSize);
const length = stats.size - start;

const buffer = Buffer.alloc(length);
const fd = fs.openSync(filePath, 'r');
fs.readSync(fd, buffer, 0, length, start);
fs.closeSync(fd);

console.log(buffer.toString('utf8'));
