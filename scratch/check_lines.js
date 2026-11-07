const fs = require('fs');

function checkSection(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const sectionStart = html.indexOf('id="partners"');
  const sectionEnd = html.indexOf('</section>', sectionStart);
  console.log(JSON.stringify(html.slice(sectionEnd - 100, sectionEnd + 15)));
}

checkSection('nova-group/public/founder-of-nova.html');
