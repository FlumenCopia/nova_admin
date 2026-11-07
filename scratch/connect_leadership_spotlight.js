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

// 1. Update HTML files with IDs for Leadership Spotlight
targetHtmlFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // Replace portrait img and experience badge
  html = html.replace(
    /<div class="founder-portrait-frame">[\s\S]*?<img src="[^"]*" alt="[^"]*"[\s\n]*class="founder-portrait-img">[\s\S]*?<div class="founder-experience-badge">[\s\S]*?<span class="exp-number">[^<]*<\/span>[\s\S]*?<span class="exp-text">[^<]*<\/span>[\s\S]*?<\/div>[\s\S]*?<\/div>/,
    `<div class="founder-portrait-frame">
              <img src="assets/hero_man.jpeg" alt="Gireesh Kumar S"
                class="founder-portrait-img" id="spotlight-portrait-img">
              <div class="founder-experience-badge">
                <span class="exp-number" id="spotlight-years-number">27+</span>
                <span class="exp-text" id="spotlight-years-label">Years Leadership</span>
              </div>
            </div>`
  );

  // Replace info col
  html = html.replace(
    /<span class="about-subhead">LEADERSHIP SPOTLIGHT<\/span>[\s\S]*?<h2 class="founder-name-heading">[^<]*<\/h2>[\s\S]*?<h3 class="founder-designation">[^<]*<\/h3>[\s\S]*?<p class="founder-bio-text">[\s\S]*?<\/p>/,
    `<span class="about-subhead" id="spotlight-tag">LEADERSHIP SPOTLIGHT</span>
            <h2 class="founder-name-heading" id="spotlight-name">GIREESH KUMAR S</h2>
            <h3 class="founder-designation" id="spotlight-designation">Founder, Director &amp; CEO — Nova Innovations</h3>
            <p class="founder-bio-text" id="spotlight-bio">
              Pioneering outdoor advertising, highway hoardings, and transit fleet branding across Kerala for over 27
              years. Under Gireesh Kumar S's leadership, Nova Innovations manages 500+ prime hoarding corridors and
              nationwide campaign executions.
            </p>`
  );

  // Replace pillars
  html = html.replace(
    /<div class="founder-key-pillars">[\s\S]*?<\/div>\s*<div class="founder-actions">/,
    `<div class="founder-key-pillars">
              <div class="pillar-item">
                <div class="pillar-icon"><i class="fa-solid fa-trophy"></i></div>
                <div>
                  <strong id="spotlight-feat1-title">Visionary Direction</strong>
                  <p id="spotlight-feat1-desc">Building Kerala's most reliable 24/7 overnight advertising engine.</p>
                </div>
              </div>
              <div class="pillar-item">
                <div class="pillar-icon"><i class="fa-solid fa-handshake"></i></div>
                <div>
                  <strong id="spotlight-feat2-title">Enterprise Relationships</strong>
                  <p id="spotlight-feat2-desc">Trusted partner to myG, Bhima, Pothys, KSRTC & Bank of Baroda.</p>
                </div>
              </div>
            </div>
            <div class="founder-actions">`
  );

  // Replace phone button
  html = html.replace(
    /<a href="tel:[^"]*" class="btn btn-primary">\s*<i class="fa-solid fa-phone"><\/i>\s*Call Founder:[^<]*<\/a>/,
    `<a href="tel:+919539000640" class="btn btn-primary" id="spotlight-phone-btn">
                <i class="fa-solid fa-phone"></i> <span id="spotlight-phone-text">Call Founder: +91 9539000640</span>
              </a>`
  );

  fs.writeFileSync(file, html, 'utf8');
  console.log('Updated HTML for Leadership Spotlight:', file);
});

// 2. Add initLeadershipSpotlightBackend to JavaScript files
const spotlightScriptAddition = `
/* --- 10. Dynamic Leadership Spotlight Backend Integration --- */
async function initLeadershipSpotlightBackend() {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const apiBase = isLocal ? 'http://localhost:5000/api' : '/api';
  const backendHost = isLocal ? 'http://localhost:5000' : '';

  try {
    const res = await fetch(\`\${apiBase}/public/settings\`);
    const result = await res.json();
    if (result && result.success && result.data) {
      const s = result.data;

      // 1. Tag & Name & Designation
      const tagEl = document.getElementById('spotlight-tag');
      if (tagEl && s.leaderTag) tagEl.textContent = s.leaderTag;

      const nameEl = document.getElementById('spotlight-name');
      if (nameEl && s.leaderName) nameEl.textContent = s.leaderName;

      const roleEl = document.getElementById('spotlight-designation');
      if (roleEl && s.leaderRole) roleEl.textContent = s.leaderRole;

      // 2. Bio text
      const bioEl = document.getElementById('spotlight-bio');
      if (bioEl && s.leaderBio) bioEl.textContent = s.leaderBio;

      // 3. Years badge
      const yearsEl = document.getElementById('spotlight-years-number');
      if (yearsEl && s.leaderYears) yearsEl.textContent = s.leaderYears;

      const yearsLabelEl = document.getElementById('spotlight-years-label');
      if (yearsLabelEl && s.leaderYearsLabel) yearsLabelEl.textContent = s.leaderYearsLabel;

      // 4. Portrait Image
      const imgEl = document.getElementById('spotlight-portrait-img');
      const photo = s.leaderImage || s.founderImage;
      if (imgEl && photo) {
        const finalUrl = (photo.startsWith('http') || photo.startsWith('//'))
          ? photo
          : (photo.startsWith('/uploads') ? backendHost + photo : photo);
        imgEl.src = finalUrl;
      }

      // 5. Features / Pillars
      const f1TitleEl = document.getElementById('spotlight-feat1-title');
      if (f1TitleEl && s.leaderFeature1Title) f1TitleEl.textContent = s.leaderFeature1Title;

      const f1DescEl = document.getElementById('spotlight-feat1-desc');
      if (f1DescEl && s.leaderFeature1Desc) f1DescEl.textContent = s.leaderFeature1Desc;

      const f2TitleEl = document.getElementById('spotlight-feat2-title');
      if (f2TitleEl && s.leaderFeature2Title) f2TitleEl.textContent = s.leaderFeature2Title;

      const f2DescEl = document.getElementById('spotlight-feat2-desc');
      if (f2DescEl && s.leaderFeature2Desc) f2DescEl.textContent = s.leaderFeature2Desc;

      // 6. Phone button
      const phone = s.leaderPhone || s.founderHeroCtaPhone || s.primaryPhone;
      const phoneBtn = document.getElementById('spotlight-phone-btn');
      const phoneText = document.getElementById('spotlight-phone-text');
      if (phone) {
        const clean = phone.replace(/[\\s-]/g, '');
        if (phoneBtn) {
          phoneBtn.href = 'tel:' + clean;
          phoneBtn.title = 'Call Founder: ' + phone;
        }
        if (phoneText) {
          phoneText.textContent = 'Call Founder: ' + phone;
        }
      }
    }
  } catch (err) {
    console.warn('Leadership Spotlight settings fetch error:', err);
  }
}
`;

targetJsFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let js = fs.readFileSync(file, 'utf8');

  // Add call in DOMContentLoaded
  if (!js.includes('initLeadershipSpotlightBackend()')) {
    js = js.replace(
      'initServicesBackend();',
      'initServicesBackend();\n  initLeadershipSpotlightBackend();'
    );
  }

  // Append function
  if (!js.includes('function initLeadershipSpotlightBackend()')) {
    js += '\n' + spotlightScriptAddition;
  }

  fs.writeFileSync(file, js, 'utf8');
  console.log('Updated JS with initLeadershipSpotlightBackend:', file);
});

console.log('Leadership spotlight connection setup completed!');

