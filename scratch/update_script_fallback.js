const fs = require('fs');

function updateScript(filePath) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');
  code = code.replace(/assets\/client-logos\/myg\.png/g, '/client-logos/myg.png');
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('Updated', filePath);
}

updateScript('script.js');
updateScript('nova-group/public/script.js');

