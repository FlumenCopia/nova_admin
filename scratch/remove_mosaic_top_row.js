const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'founder-of-nova.html'),
  path.join(__dirname, '..', 'nova-group', 'public', 'founder-of-nova.html')
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Remove the mosaic-top-row section
  content = content.replace(
    /\s*<!-- Top Row Cards -->\s*<div class="mosaic-top-row">[\s\S]*?<\/div>\s*<\/div>/,
    ''
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log('Removed mosaic-top-row from:', file);
});

