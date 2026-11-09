const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrape() {
  console.log('Fetching https://novainnovations.in/ ...');
  const html = await fetchUrl('https://novainnovations.in/');
  
  if (!fs.existsSync('scratch')) fs.mkdirSync('scratch');
  fs.writeFileSync('scratch/novainnovations_raw.html', html, 'utf8');
  console.log('Saved raw HTML, size:', html.length);

  // Extract navigation links
  const links = [];
  const linkRegex = /href=["'](https?:\/\/novainnovations\.in\/[^"']*)["']/gi;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    if (!links.includes(match[1])) links.push(match[1]);
  }
  console.log('Found internal links:', links);

  // Extract clean text blocks
  // Remove script and style tags
  const cleanHtml = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  fs.writeFileSync('scratch/novainnovations_clean.html', cleanHtml, 'utf8');
}

scrape().catch(console.error);

