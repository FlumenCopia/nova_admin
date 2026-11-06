const fs = require('fs');
const filePath = 'nova-group/components/Footer.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const target = `<li><Link href="/about" className="footer-link">About Us</Link></li>`;
const replacement = `<li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><a href="https://portfolio-founder-of-nova.vercel.app/" target="_blank" rel="noopener noreferrer" className="footer-link">Founder Portfolio</a></li>`;

if (!content.includes('portfolio-founder-of-nova')) {
  content = content.replace(target, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Added Founder Portfolio link to Footer.jsx');
} else {
  console.log('Footer.jsx already has the link');
}

