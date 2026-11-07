const fs = require('fs');

function removeDefaultLogos(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }
  let html = fs.readFileSync(filePath, 'utf8');

  const startMarker = '<div class="partners-marquee-track" id="partners-marquee-track">';
  const startIndex = html.indexOf(startMarker);
  if (startIndex === -1) {
    console.log('startMarker not found in', filePath);
    return;
  }

  const sectionStart = html.indexOf('id="partners"');
  const sectionEnd = html.indexOf('</section>', sectionStart);
  if (sectionEnd === -1) {
    console.log('sectionEnd not found in', filePath);
    return;
  }

  // Find the closing </div> of partners-marquee-track, which is before the closing </div> of partners-marquee-container
  // Look backwards from sectionEnd for </div>\s*</div>\s*</section>
  const match = html.substring(startIndex, sectionEnd).match(/[\r\n]+(\s*)<\/div>\s*<\/div>\s*$/);
  if (!match) {
    console.log('Could not match closing tags before sectionEnd in', filePath);
    return;
  }

  const endIndex = startIndex + match.index;
  const isCrlf = html.includes('\r\n');
  const nl = isCrlf ? '\r\n' : '\n';

  const replacement = startMarker + nl +
    '          <!-- Dynamically loaded from Backend Admin Panel -->' + nl +
    '        ';

  const newHtml = html.substring(0, startIndex) + replacement + html.substring(endIndex);
  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log('Successfully removed default logos from:', filePath);
}

removeDefaultLogos('nova-group/public/founder-of-nova.html');
removeDefaultLogos('founder-of-nova.html');
