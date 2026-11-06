const fs = require('fs');

// 1. Update Header.jsx
const headerPath = 'nova-group/components/Header.jsx';
let headerContent = fs.readFileSync(headerPath, 'utf8');
headerContent = headerContent.replace(
  "    { href: 'https://portfolio-founder-of-nova.vercel.app/', label: 'Founder', isExternal: true },",
  "    { href: '/founder', label: 'Founder' },"
);
fs.writeFileSync(headerPath, headerContent, 'utf8');
console.log('Updated Header.jsx navLinks to /founder');

// 2. Update MobileDrawer.jsx
const drawerPath = 'nova-group/components/MobileDrawer.jsx';
let drawerContent = fs.readFileSync(drawerPath, 'utf8');
drawerContent = drawerContent.replace(
  "    { href: 'https://portfolio-founder-of-nova.vercel.app/', label: 'Founder', isExternal: true },",
  "    { href: '/founder', label: 'Founder' },"
);
fs.writeFileSync(drawerPath, drawerContent, 'utf8');
console.log('Updated MobileDrawer.jsx navLinks to /founder');

