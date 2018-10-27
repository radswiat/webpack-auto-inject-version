const fs = require('fs');
const path = require('path');

export default function getDistFile(file) {
  return fs.readFileSync(path.resolve(process.cwd(), 'dist', file), 'utf8');
}
