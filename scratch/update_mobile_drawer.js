const fs = require('fs');
let content = fs.readFileSync('nova-group/components/MobileDrawer.jsx', 'utf8');
content = content.replace("{ href: '/founder', label: 'Founder' }", "{ href: '/founder-of-nova.html', label: 'Founder' }");
content = content.replace(
  '          const isActive = link.isExternal ? false : pathname === link.href;',
  `          const isStaticHtml = link.href.endsWith('.html');
          const isActive = link.isExternal ? false : pathname === link.href;
          if (isStaticHtml) {
            return (
              <a
                key={link.href}
                href={link.href}
                className={\`nav-link \${isActive ? 'active' : ''}\`}
                onClick={onClose}
              >
                {link.label}
              </a>
            );
          }`
);
fs.writeFileSync('nova-group/components/MobileDrawer.jsx', content, 'utf8');
console.log('MobileDrawer updated successfully');

