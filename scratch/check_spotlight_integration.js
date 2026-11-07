const fs = require('fs');
const html = fs.readFileSync('nova-group/public/founder-of-nova.html', 'utf8');
const js = fs.readFileSync('nova-group/public/script.js', 'utf8');

const ids = [
  'spotlight-portrait-img',
  'spotlight-years-number',
  'spotlight-years-label',
  'spotlight-tag',
  'spotlight-name',
  'spotlight-designation',
  'spotlight-bio',
  'spotlight-feat1-title',
  'spotlight-feat1-desc',
  'spotlight-feat2-title',
  'spotlight-feat2-desc',
  'spotlight-phone-btn',
  'spotlight-phone-text'
];

const missingIds = ids.filter(id => !html.includes(`id="${id}"`));
console.log('Missing IDs in HTML:', missingIds);
console.log('Has initLeadershipSpotlightBackend in JS:', js.includes('initLeadershipSpotlightBackend'));

