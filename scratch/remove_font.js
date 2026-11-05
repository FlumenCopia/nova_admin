const fs = require('fs');
const filePath = 'admin-ui/app/globals.css';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/@import\s+url\([^)]+\);\r?\n\r?\n?/, '');
content = content.replace(
  /--font-sans:\s*['"]Plus Jakarta Sans['"][^;]+;/,
  "--font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Removed external font import from admin-ui/app/globals.css');

