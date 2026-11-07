const fs = require('fs');

function inspectPartners(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const sectionStart = html.indexOf('id="partners"');
  const sectionEnd = html.indexOf('</section>', sectionStart);
  console.log('===', filePath, '===');
  console.log(html.slice(sectionStart - 35, sectionEnd + 12));
}

inspectPartners('nova-group/public/founder-of-nova.html');
inspectPartners('founder-of-nova.html');

