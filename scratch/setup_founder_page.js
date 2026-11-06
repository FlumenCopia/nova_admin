const fs = require('fs');
const path = require('path');
const https = require('https');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'nova-group', 'public');

// Ensure directories
fs.mkdirSync(publicDir, { recursive: true });
fs.mkdirSync(path.join(publicDir, 'assets'), { recursive: true });
fs.mkdirSync(path.join(publicDir, 'assets', 'client-logos'), { recursive: true });

// 1. Copy founder-of-nova.html to nova-group/public/founder-of-nova.html
const srcHtml = path.join(rootDir, 'founder-of-nova.html');
const destHtml = path.join(publicDir, 'founder-of-nova.html');
fs.copyFileSync(srcHtml, destHtml);
console.log('Copied founder-of-nova.html to public');

// Also copy to public/founder.html and public/founder/index.html just in case
fs.copyFileSync(srcHtml, path.join(publicDir, 'founder.html'));
fs.mkdirSync(path.join(publicDir, 'founder'), { recursive: true });
fs.copyFileSync(srcHtml, path.join(publicDir, 'founder', 'index.html'));

// 2. Copy styles.css to public/styles.css and public/founder/styles.css
const srcCss = path.join(rootDir, 'styles.css');
if (fs.existsSync(srcCss)) {
  fs.copyFileSync(srcCss, path.join(publicDir, 'styles.css'));
  fs.copyFileSync(srcCss, path.join(publicDir, 'founder', 'styles.css'));
  console.log('Copied styles.css to public');
}

// 3. Helper to fetch URL
function fetchFile(url, destPath) {
  return new Promise((resolve) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
      return resolve({ url, status: 'exists' });
    }
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve({ url, status: 'downloaded' });
        });
      } else {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        resolve({ url, status: 'failed_' + res.statusCode });
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      resolve({ url, status: 'error_' + err.message });
    });
  });
}

async function run() {
  // Download script.js
  const scriptUrl = 'https://portfolio-founder-of-nova.vercel.app/script.js';
  const destScript = path.join(publicDir, 'script.js');
  await fetchFile(scriptUrl, destScript);
  if (fs.existsSync(destScript)) {
    fs.copyFileSync(destScript, path.join(rootDir, 'script.js'));
    fs.copyFileSync(destScript, path.join(publicDir, 'founder', 'script.js'));
    console.log('Downloaded script.js');
  }

  // Assets list
  const assets = [
    "assets/hero_man.jpeg",
    "assets/about_hoarding.jpg",
    "assets/nova_logo_badge.svg",
    "assets/founder_transit.jpg",
    "assets/client-logos/myg.png",
    "assets/client-logos/pothys.png",
    "assets/client-logos/bhima.png",
    "assets/client-logos/lokamedicity.png",
    "assets/client-logos/muthoot.png",
    "assets/client-logos/havells.png",
    "assets/client-logos/medimix.png",
    "assets/client-logos/kannandevan.png",
    "assets/client-logos/oxygen.png",
    "assets/client-logos/pankajakasthuri.png",
    "assets/client-logos/alicegold.png",
    "assets/client-logos/bob.png",
    "assets/client-logos/ananthapuri.png",
    "assets/client-logos/swayamvaram.png",
    "assets/client-logos/arcon.png",
    "assets/client-logos/neyyarmedicity.png",
    "assets/client-logos/nims.png",
    "assets/client-logos/kairalifood.png",
    "assets/founder_gireesh.jpg",
    "assets/founder_hoarding.jpg",
    "assets/founder_retail.jpg",
    "assets/founder_execution.jpg",
    "assets/founder_award.jpg"
  ];

  for (const asset of assets) {
    const url = `https://portfolio-founder-of-nova.vercel.app/${asset}`;
    const dest = path.join(publicDir, asset);
    const res = await fetchFile(url, dest);
    // Also copy to root assets and public/founder/assets
    if (fs.existsSync(dest)) {
      const rootAssetDest = path.join(rootDir, asset);
      const founderAssetDest = path.join(publicDir, 'founder', asset);
      fs.mkdirSync(path.dirname(rootAssetDest), { recursive: true });
      fs.mkdirSync(path.dirname(founderAssetDest), { recursive: true });
      fs.copyFileSync(dest, rootAssetDest);
      fs.copyFileSync(dest, founderAssetDest);
    }
    console.log(asset, res.status);
  }

  console.log('Done setting up founder page!');
}

run();

