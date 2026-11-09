const fs = require('fs');
const path = require('path');

function checkAssets() {
  console.log('--- 1. Checking assets/client-logos ---');
  if (fs.existsSync('assets/client-logos')) {
    console.log('assets/client-logos exists with', fs.readdirSync('assets/client-logos').length, 'files');
  }
  if (fs.existsSync('nova-group/public/assets/client-logos')) {
    console.log('nova-group/public/assets/client-logos exists with', fs.readdirSync('nova-group/public/assets/client-logos').length, 'files');
  }

  console.log('\n--- 2. Checking unreferenced uploads in admin-api/uploads ---');
  const db = JSON.parse(fs.readFileSync('admin-api/data/db.json', 'utf8'));
  const dbStr = JSON.stringify(db);

  ['banners', 'portfolio', 'clients'].forEach(folder => {
    const dir = path.join('admin-api/uploads', folder);
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(f => {
      if (!dbStr.includes(f)) {
        console.log(`Unused upload in ${folder}:`, f);
      }
    });
  });

  console.log('\n--- 3. Checking unreferenced standalone images in nova-group ---');
  ['hero.png', 'visting_card.png'].forEach(f => {
    if (fs.existsSync(path.join('nova-group', f))) console.log('nova-group/' + f);
    if (fs.existsSync(path.join('nova-group/public', f))) console.log('nova-group/public/' + f);
  });

  console.log('\n--- 4. Checking duplicate/orphaned folders in nova-group root (outside public) ---');
  ['image', 'client-logos'].forEach(f => {
    const p = path.join('nova-group', f);
    if (fs.existsSync(p)) console.log(`Folder nova-group/${f} exists with ${fs.readdirSync(p).length} files`);
  });
}

checkAssets();

