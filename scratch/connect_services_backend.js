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

  // Replace section header
  html = html.replace(
    /<div class="section-header-left">[\s\S]*?<div class="services-cards-grid">/,
    `<div class="section-header-left">
        <span class="about-subhead" id="services-subhead">WHAT WE OFFER</span>
        <h2 class="section-heading-sm" id="services-heading">Comprehensive Advertising Services</h2>
        <p class="section-desc-left" id="services-desc">End-to-end outdoor advertising, design studio creations, transit branding, and
          corporate events across Kerala.</p>
      </div>

      <div class="services-cards-grid" id="services-cards-container">`
  );

  fs.writeFileSync(file, html, 'utf8');
  console.log('Updated HTML with services IDs:', file);
});

// 2. Add initServicesBackend to JavaScript files
const servicesScriptAddition = `
/* --- 9. Dynamic Services Section Backend Integration --- */
function getServiceIconClass(iconKey, title) {
  const key = (iconKey || '').toLowerCase();
  const t = (title || '').toLowerCase();
  
  if (key === 'billboard' || key === 'hoarding' || t.includes('hoarding') || t.includes('billboard')) {
    return 'fa-solid fa-rectangle-ad';
  }
  if (key === 'transit' || key === 'bus' || key === 'vehicle' || t.includes('vehicle') || t.includes('transit') || t.includes('bus')) {
    return 'fa-solid fa-bus';
  }
  if (key === 'retail' || key === 'shop' || t.includes('shop') || t.includes('retail') || t.includes('facade')) {
    return 'fa-solid fa-store';
  }
  if (key === 'event' || key === 'stall' || t.includes('event') || t.includes('stall')) {
    return 'fa-solid fa-champagne-glasses';
  }
  if (key === 'wall' || key === 'painting' || t.includes('wall') || t.includes('mural') || t.includes('paint')) {
    return 'fa-solid fa-paintbrush';
  }
  if (key === 'design' || key === 'print' || t.includes('design') || t.includes('print')) {
    return 'fa-solid fa-pen-ruler';
  }
  return 'fa-solid fa-layer-group';
}

function getServiceButtonLabel(service) {
  const t = (service.title || '').toLowerCase();
  if (t.includes('hoarding') || t.includes('billboard')) return 'Inquire Hoardings';
  if (t.includes('vehicle') || t.includes('transit') || t.includes('bus')) return 'Inquire Transit';
  if (t.includes('shop') || t.includes('retail') || t.includes('facade')) return 'Inquire Retail';
  if (t.includes('event') || t.includes('stall')) return 'Inquire Events';
  if (t.includes('wall') || t.includes('mural') || t.includes('paint')) return 'Inquire Wall Murals';
  if (t.includes('design') || t.includes('print')) return 'Inquire Design';
  return 'Inquire ' + (service.title || 'Service');
}

async function initServicesBackend() {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const apiBase = isLocal ? 'http://localhost:5000/api' : '/api';

  // 1. Load Services Header from SiteSettings
  try {
    const settingsRes = await fetch(\`\${apiBase}/public/settings\`);
    const settingsData = await settingsRes.json();
    if (settingsData && settingsData.success && settingsData.data) {
      const s = settingsData.data;
      const subheadEl = document.getElementById('services-subhead');
      const headingEl = document.getElementById('services-heading');
      const descEl = document.getElementById('services-desc');

      if (subheadEl && s.servicesSectionSubhead) subheadEl.textContent = s.servicesSectionSubhead;
      if (headingEl && s.servicesSectionHeading) headingEl.textContent = s.servicesSectionHeading;
      if (descEl && s.servicesSectionDesc) descEl.textContent = s.servicesSectionDesc;
    }
  } catch (err) {
    console.warn('Services header settings fetch error:', err);
  }

  // 2. Load Services Cards from /api/public/services
  try {
    const servicesRes = await fetch(\`\${apiBase}/public/services\`);
    const servicesData = await servicesRes.json();
    if (servicesData && servicesData.success && Array.isArray(servicesData.data) && servicesData.data.length > 0) {
      const container = document.getElementById('services-cards-container');
      if (!container) return;

      const activeServices = servicesData.data.filter(s => s.isActive !== false);
      if (activeServices.length === 0) return;

      let cardsHtml = '';
      activeServices.forEach(item => {
        const iconClass = getServiceIconClass(item.icon, item.title);
        const btnLabel = getServiceButtonLabel(item);
        const safeTitle = (item.title || '').replace(/'/g, "\\\\'");

        let tagsHtml = '';
        if (Array.isArray(item.features) && item.features.length > 0) {
          tagsHtml = '<div class="service-tags-list">';
          item.features.slice(0, 3).forEach(feat => {
            tagsHtml += \`<span class="service-tag-item"><i class="fa-solid fa-check"></i> \${feat}</span>\`;
          });
          tagsHtml += '</div>';
        }

        cardsHtml += \`
        <div class="service-squircle-card">
          <div class="service-icon-box">
            <i class="\${iconClass}"></i>
          </div>
          <h3 class="service-title">\${item.title}</h3>
          <p class="service-desc">\${item.description || ''}</p>
          \${tagsHtml}
          <button class="service-card-btn" onclick="openContactModal('\${safeTitle}')">
            <span>\${btnLabel}</span> <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>\`;
      });

      container.innerHTML = cardsHtml;
    }
  } catch (err) {
    console.warn('Services cards dynamic fetch error:', err);
  }
}
`;

targetJsFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let js = fs.readFileSync(file, 'utf8');

  // Add call in DOMContentLoaded
  if (!js.includes('initServicesBackend()')) {
    js = js.replace(
      'initFounderHeroSettings();',
      'initFounderHeroSettings();\n  initServicesBackend();'
    );
  }

  // Append function
  if (!js.includes('function initServicesBackend()')) {
    js += '\n' + servicesScriptAddition;
  }

  fs.writeFileSync(file, js, 'utf8');
  console.log('Updated JS with initServicesBackend:', file);
});

console.log('Services backend connection setup completed!');

