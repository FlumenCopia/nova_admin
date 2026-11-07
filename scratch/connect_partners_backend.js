const fs = require('fs');
const path = require('path');

const targetHtmlFiles = [
  path.join(__dirname, '..', 'founder-of-nova.html'),
  path.join(__dirname, '..', 'nova-group', 'public', 'founder-of-nova.html')
];

const targetJsFiles = [
  path.join(__dirname, '..', 'script.js'),
  path.join(__dirname, '..', 'nova-group', 'public', 'script.js')
];

// 1. Update HTML files with IDs
targetHtmlFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // Replace partners title and track container with IDs
  html = html.replace(
    /<span class="partners-title">OUR ESTEEMED CLIENTS &amp; BRAND PARTNERS<\/span>/,
    `<span class="partners-title" id="partners-title">OUR ESTEEMED CLIENTS &amp; BRAND PARTNERS</span>`
  );

  html = html.replace(
    /<div class="partners-marquee-track">/,
    `<div class="partners-marquee-track" id="partners-marquee-track">`
  );

  fs.writeFileSync(file, html, 'utf8');
  console.log('Updated HTML for Partners Marquee:', file);
});

// 2. Add initPartnersMarqueeBackend to JavaScript files
const partnersScriptAddition = `
/* --- 11. Dynamic Client & Partner Logos Marquee Backend Integration --- */
function resolveClientLogoUrl(url) {
  if (!url) return 'assets/client-logos/myg.png';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const backendHost = isLocal ? 'http://localhost:5000' : '';

  if (url.startsWith('/uploads/')) {
    return backendHost + url;
  }
  if (url.startsWith('/client-logos/')) {
    return url;
  }
  return url;
}

async function initPartnersMarqueeBackend() {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const apiBase = isLocal ? 'http://localhost:5000/api' : '/api';

  // 1. Update Section Title
  try {
    const settingsRes = await fetch(\`\${apiBase}/public/settings\`);
    const settingsData = await settingsRes.json();
    if (settingsData && settingsData.success && settingsData.data) {
      const titleEl = document.getElementById('partners-title');
      if (titleEl && settingsData.data.partnersSectionTitle) {
        titleEl.textContent = settingsData.data.partnersSectionTitle;
      }
    }
  } catch (err) {
    console.warn('Partners title fetch error:', err);
  }

  // 2. Update Marquee Logos Track
  try {
    const clientsRes = await fetch(\`\${apiBase}/public/clients\`);
    const clientsData = await clientsRes.json();
    if (clientsData && clientsData.success && Array.isArray(clientsData.data) && clientsData.data.length > 0) {
      const track = document.getElementById('partners-marquee-track');
      if (!track) return;

      const activeClients = clientsData.data.filter(c => c.isActive !== false);
      if (activeClients.length === 0) return;

      let set1Html = '';
      let set2Html = '';

      activeClients.forEach(item => {
        const imgSrc = resolveClientLogoUrl(item.logoUrl);
        const name = (item.name || 'Client Partner').replace(/"/g, '&quot;');

        set1Html += \`
          <div class="partner-logo-item" title="\${name}">
            <img src="\${imgSrc}" alt="\${name}" class="partner-logo-img" onerror="this.src='assets/client-logos/myg.png'">
          </div>\`;

        set2Html += \`
          <div class="partner-logo-item" aria-hidden="true" title="\${name}">
            <img src="\${imgSrc}" alt="\${name}" class="partner-logo-img" onerror="this.src='assets/client-logos/myg.png'">
          </div>\`;
      });

      track.innerHTML = set1Html + set2Html;
    }
  } catch (err) {
    console.warn('Partners logos dynamic fetch error:', err);
  }
}
`;

targetJsFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let js = fs.readFileSync(file, 'utf8');

  // Add call in DOMContentLoaded
  if (!js.includes('initPartnersMarqueeBackend()')) {
    js = js.replace(
      'initLeadershipSpotlightBackend();',
      'initLeadershipSpotlightBackend();\n  initPartnersMarqueeBackend();'
    );
  }

  // Append function
  if (!js.includes('function initPartnersMarqueeBackend()')) {
    js += '\n' + partnersScriptAddition;
  }

  fs.writeFileSync(file, js, 'utf8');
  console.log('Updated JS with initPartnersMarqueeBackend:', file);
});

console.log('Partners marquee backend connection setup completed!');

