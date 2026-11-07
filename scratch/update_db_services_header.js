const fs = require('fs');
const dbPath = 'admin-api/data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (db.SiteSettings && db.SiteSettings.length > 0) {
  const s = db.SiteSettings[0];
  s.servicesSectionSubhead = s.servicesSectionSubhead || 'WHAT WE OFFER';
  s.servicesSectionHeading = s.servicesSectionHeading || 'Comprehensive Advertising Services';
  s.servicesSectionDesc = s.servicesSectionDesc || 'End-to-end outdoor advertising, design studio creations, transit branding, and corporate events across Kerala.';
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('Updated db.json with services section header fields successfully!');
}

