const fs = require('fs');
const path = require('path');

// 1. Gather all codebase text files
function getAllCodeFiles(dir, exts, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (['node_modules', '.next', '.git', 'brain', '.system_generated'].includes(item.name)) continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      getAllCodeFiles(full, exts, fileList);
    } else {
      const ext = path.extname(item.name).toLowerCase();
      if (exts.includes(ext)) fileList.push(full);
    }
  }
  return fileList;
}

// 2. Gather all image files
const imageExts = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
const codeExts = ['.html', '.js', '.jsx', '.ts', '.tsx', '.json', '.css'];

const allImages = getAllCodeFiles('.', imageExts);
const allCodeFiles = getAllCodeFiles('.', codeExts);

console.log(`Found ${allImages.length} images and ${allCodeFiles.length} code/data files.`);

// Read all code contents into memory
const codeContents = allCodeFiles.map(f => ({
  file: f,
  content: fs.readFileSync(f, 'utf8')
}));

const unused = [];
const used = [];

for (const imgPath of allImages) {
  const basename = path.basename(imgPath);
  const normalizedPath = imgPath.replace(/\\/g, '/');
  
  // Also check URL-encoded version or without extension
  const encodedBasename = encodeURIComponent(basename);

  let isReferenced = false;
  let matchedIn = [];

  for (const c of codeContents) {
    // If the file itself is the db.json or code file
    if (c.content.includes(basename) || c.content.includes(encodedBasename) || c.content.includes(normalizedPath)) {
      isReferenced = true;
      matchedIn.push(c.file);
    }
  }

  if (isReferenced) {
    used.push({ imgPath, matchedIn: matchedIn.slice(0, 3) });
  } else {
    unused.push(imgPath);
  }
}

console.log(`\n--- SUMMARY ---`);
console.log(`Total images: ${allImages.length}`);
console.log(`Used images: ${used.length}`);
console.log(`Unused images: ${unused.length}`);

console.log('\n--- UNUSED IMAGES LIST ---');
unused.forEach(img => console.log(img));

