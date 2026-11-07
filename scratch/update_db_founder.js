const fs = require('fs');
const dbPath = 'admin-api/data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (db.SiteSettings && db.SiteSettings.length > 0) {
  const s = db.SiteSettings[0];
  s.founderHeroTag = s.founderHeroTag || '27+ Years of Creative Advertising Excellence';
  s.founderHeroTitle = s.founderHeroTitle || 'INNOVATIONS THAT\nHALLMARKS YOUR BRAND';
  s.founderHeroDesc = s.founderHeroDesc || 'Outdoors • Design Studio • Events — Prime hoardings, transit vehicle branding, and overnight campaign execution across Kerala.';
  s.founderHeroCtaText = s.founderHeroCtaText || 'Book Hoardings';
  s.founderHeroCtaPhone = s.founderHeroCtaPhone || s.primaryPhone || '+91 95390 00640';
  s.founderName = s.founderName || s.leaderName || 'GIREESH KUMAR S';
  s.founderRole = s.founderRole || 'Founder & CEO — NOVA Innovations';
  s.founderImage = s.founderImage || s.leaderImage || '/heroman.jpeg';
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('Updated db.json with founder hero fields successfully!');
}

