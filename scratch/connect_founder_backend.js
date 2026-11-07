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

// 1. Update HTML files
targetHtmlFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // Replace tag badge text
  html = html.replace(
    /<div class="hero-tag-badge">\s*<i class="fa-solid fa-star"><\/i>\s*27\+ Years of Creative Advertising Excellence\s*<\/div>/,
    `<div class="hero-tag-badge">
            <i class="fa-solid fa-star"></i> <span id="founder-hero-tag-text">27+ Years of Creative Advertising Excellence</span>
          </div>`
  );

  // Replace title
  html = html.replace(
    /<h1 class="hero-title">([\s\S]*?)<\/h1>/,
    `<h1 class="hero-title" id="founder-hero-title">
            INNOVATIONS THAT HALLMARKS YOUR BRAND
          </h1>`
  );

  // Replace desc
  html = html.replace(
    /<p class="hero-desc">([\s\S]*?)<\/p>/,
    `<p class="hero-desc" id="founder-hero-desc">
            Outdoors • Design Studio • Events — Prime hoardings, transit vehicle branding, and overnight campaign
            execution across Kerala.
          </p>`
  );

  // Replace CTA
  html = html.replace(
    /<a href="tel:\+919539000640" class="btn btn-primary hero-cta-btn">([\s\S]*?)<\/a>/,
    `<a href="tel:+919539000640" class="btn btn-primary hero-cta-btn" id="founder-hero-cta">
              <span id="founder-hero-cta-text">Book Hoardings</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>`
  );

  // Replace img
  html = html.replace(
    /<img src="assets\/hero_man\.jpeg" alt="[^"]*"[\s\n]*class="hero-founder-img">/,
    `<img src="assets/hero_man.jpeg" alt="Gireesh Kumar S" class="hero-founder-img" id="founder-hero-img">`
  );

  // Replace founder-title-badge
  html = html.replace(
    /<div class="founder-title-badge">\s*<strong>GIREESH KUMAR S<\/strong>\s*<span>Founder &amp; CEO — NOVA Innovations<\/span>\s*<\/div>/,
    `<div class="founder-title-badge">
              <strong id="founder-hero-name">GIREESH KUMAR S</strong>
              <span id="founder-hero-role">Founder &amp; CEO — NOVA Innovations</span>
            </div>`
  );

  fs.writeFileSync(file, html, 'utf8');
  console.log('Updated HTML:', file);
});

// 2. Update JavaScript files with initFounderHeroSettings
const scriptAddition = `
/* --- 8. Dynamic Founder Hero Backend Integration --- */
async function initFounderHeroSettings() {
  try {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const apiUrl = isLocal ? 'http://localhost:5000/api/public/settings' : '/api/public/settings';
    const backendHost = isLocal ? 'http://localhost:5000' : '';

    const res = await fetch(apiUrl);
    const result = await res.json();
    if (result && result.success && result.data) {
      const s = result.data;

      // 1. Tagline Badge
      const tag = s.founderHeroTag || s.leaderTag;
      if (tag) {
        const tagEl = document.getElementById('founder-hero-tag-text');
        if (tagEl) tagEl.textContent = tag;
      }

      // 2. Headline / Title
      const title = s.founderHeroTitle || s.heroTitle;
      if (title) {
        const titleEl = document.getElementById('founder-hero-title');
        if (titleEl) {
          titleEl.innerHTML = title.replace(/\\n/g, '<br>');
        }
      }

      // 3. Description
      const desc = s.founderHeroDesc || s.heroSubtitle;
      if (desc) {
        const descEl = document.getElementById('founder-hero-desc');
        if (descEl) descEl.textContent = desc;
      }

      // 4. CTA Button Text & Link
      const ctaText = s.founderHeroCtaText;
      if (ctaText) {
        const ctaTextEl = document.getElementById('founder-hero-cta-text');
        if (ctaTextEl) ctaTextEl.textContent = ctaText;
      }

      const ctaPhone = s.founderHeroCtaPhone || s.primaryPhone;
      if (ctaPhone) {
        const ctaLinkEl = document.getElementById('founder-hero-cta');
        if (ctaLinkEl) {
          const clean = ctaPhone.replace(/[\\s-]/g, '');
          ctaLinkEl.href = 'tel:' + clean;
          ctaLinkEl.title = 'Call ' + ctaPhone;
        }
      }

      // 5. Founder Photo
      const photo = s.founderImage || s.leaderImage;
      if (photo) {
        const imgEl = document.getElementById('founder-hero-img');
        if (imgEl) {
          const srcUrl = (photo.startsWith('http') || photo.startsWith('//'))
            ? photo
            : (photo.startsWith('/uploads') ? backendHost + photo : photo);
          imgEl.src = srcUrl;
        }
      }

      // 6. Founder Name & Role
      const name = s.founderName || s.leaderName;
      if (name) {
        const nameEl = document.getElementById('founder-hero-name');
        if (nameEl) nameEl.textContent = name;
      }

      const role = s.founderRole || s.leaderRole;
      if (role) {
        const roleEl = document.getElementById('founder-hero-role');
        if (roleEl) roleEl.textContent = role;
      }
    }
  } catch (err) {
    console.warn('Founder hero settings dynamic fetch fallback:', err);
  }
}
`;

targetJsFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let js = fs.readFileSync(file, 'utf8');

  // Add call to DOMContentLoaded if not already present
  if (!js.includes('initFounderHeroSettings()')) {
    js = js.replace(
      'document.addEventListener(\'DOMContentLoaded\', () => {',
      `document.addEventListener('DOMContentLoaded', () => {\n  initFounderHeroSettings();`
    );
  }

  // Append function definition if not already present
  if (!js.includes('function initFounderHeroSettings()')) {
    js += '\n' + scriptAddition;
  }

  fs.writeFileSync(file, js, 'utf8');
  console.log('Updated JS:', file);
});

console.log('Backend connection completed successfully!');

