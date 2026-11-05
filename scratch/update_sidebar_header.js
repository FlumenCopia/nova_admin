const fs = require('fs');
const filePath = 'admin-ui/components/Sidebar.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const target = `<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.png" alt="Nova Innovations" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
            <span style={{ fontWeight: 800, fontSize: '0.75rem', color: '#111827', background: '#F1F5F9', border: '1px solid #E2E8F0', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Admin
            </span>
          </div>`;

const replacement = `<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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

content = content.replace(target, replacement);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Sidebar.jsx updated successfully');

