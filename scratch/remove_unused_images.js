const fs = require('fs');
const path = require('path');

let removedCount = 0;

function removeFile(p) {
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log('Removed file:', p);
    removedCount++;
  }
}

function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log('Removed directory:', dir);
  }
}

// 1. Remove old default client-logos folders that were removed from founder-of-nova.html
removeDir('assets/client-logos');
removeDir('nova-group/public/assets/client-logos');

// 2. Remove orphaned old uploads in admin-api/uploads
const unreferencedUploads = [
  'admin-api/uploads/banners/banner-1788431274234-348106968.webp',
  'admin-api/uploads/banners/banner-1788431321995-151530164.webp',
  'admin-api/uploads/banners/banner-1793860439419-451082902.webp',
  'admin-api/uploads/portfolio/portfolio-1788425821148-361120360.webp',
  'admin-api/uploads/portfolio/portfolio-1793603903066-281882224.webp',
  'admin-api/uploads/portfolio/portfolio-1793861184664-436257772.webp',
];
unreferencedUploads.forEach(removeFile);

// 3. Remove unreferenced standalone images
const unreferencedImages = [
  'nova-group/hero.png',
  'nova-group/public/hero.png',
  'nova-group/visting_card.png',
  'nova-group/public/visting_card.png',
];
unreferencedImages.forEach(removeFile);

// 4. Remove duplicate files/folders sitting in nova-group root (outside public)
removeDir('nova-group/client-logos');
removeDir('nova-group/image');
removeFile('nova-group/hero2.png');
removeFile('nova-group/mainhero1.png');
removeFile('nova-group/logo.png');

console.log(`\nCleanup finished. Files/folders successfully removed.`);

