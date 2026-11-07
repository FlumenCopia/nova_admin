const fs = require('fs');
const dbPath = 'admin-api/data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (db.SiteSettings && db.SiteSettings.length > 0) {
  const s = db.SiteSettings[0];
  s.partnersSectionTitle = s.partnersSectionTitle || 'OUR ESTEEMED CLIENTS & BRAND PARTNERS';
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('Updated db.json with partnersSectionTitle!');
}

