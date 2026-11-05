const fs = require('fs');

// 1. Update admin-ui/app/globals.css
const adminCssPath = 'admin-ui/app/globals.css';
let adminCss = fs.readFileSync(adminCssPath, 'utf8');

if (!adminCss.includes('fonts.googleapis.com')) {
  adminCss = "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap');\n\n" + adminCss;
}

adminCss = adminCss.replace(
  /--font-sans:\s*[^;]+;/,
  "--font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"
);

if (!adminCss.includes('--font-heading')) {
  adminCss = adminCss.replace(
    /--font-sans:[^;]+;\r?\n/,
    "$&  --font-heading: 'Space Grotesk', 'Plus Jakarta Sans', sans-serif;\n"
  );
}

fs.writeFileSync(adminCssPath, adminCss, 'utf8');
console.log('Updated admin-ui/app/globals.css with typography styles');

// 2. Update nova-group/app/globals.css
const novaCssPath = 'nova-group/app/globals.css';
let novaCss = fs.readFileSync(novaCssPath, 'utf8');

if (!novaCss.includes('fonts.googleapis.com')) {
  novaCss = "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap');\n\n" + novaCss;
}

if (!novaCss.includes("font-family: 'Plus Jakarta Sans'")) {
  novaCss = novaCss.replace(
    /body\s*\{/,
    "body {\n  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"
  );
}

fs.writeFileSync(novaCssPath, novaCss, 'utf8');
console.log('Updated nova-group/app/globals.css with typography styles');

// 3. Update admin-ui/components/Sidebar.jsx logo branding style
const sidebarPath = 'admin-ui/components/Sidebar.jsx';
let sidebarJs = fs.readFileSync(sidebarPath, 'utf8');

const oldHeaderRegex = /<div style=\{\{\s*display:\s*'flex',\s*alignItems:\s*'center',\s*gap:\s*'10px'\s*\}\}>\s*<img src="\/logo\.png"[^>]+>\s*<span[^>]*>Admin<\/span>\s*<\/div>/s;

const newHeader = `<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.png" alt="Nova Innovations" style={{ height: '34px', width: 'auto', objectFit: 'contain' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--color-text-primary)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                Nova Innovations
              </span>
              <span style={{ fontWeight: 700, fontSize: '0.7rem', color: 'var(--color-primary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '2px' }}>
                Admin Workspace
              </span>
            </div>
          </div>`;

if (oldHeaderRegex.test(sidebarJs)) {
  sidebarJs = sidebarJs.replace(oldHeaderRegex, newHeader);
  fs.writeFileSync(sidebarPath, sidebarJs, 'utf8');
  console.log('Updated Sidebar.jsx with styled brand logo text');
} else {
  console.log('Sidebar header regex did not match; checking manually');
}

