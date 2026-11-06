const fs = require('fs');

// 1. Update Footer.jsx
let footer = fs.readFileSync('nova-group/components/Footer.jsx', 'utf8');
footer = footer.replace(
  '<li><a href="https://portfolio-founder-of-nova.vercel.app/" target="_blank" rel="noopener noreferrer" className="footer-link">Founder Portfolio</a></li>',
  '<li><a href="/founder-of-nova.html" className="footer-link">Founder Portfolio</a></li>'
);
fs.writeFileSync('nova-group/components/Footer.jsx', footer, 'utf8');
console.log('Updated Footer.jsx');

// 2. Update LeadershipSection.jsx
let leadership = fs.readFileSync('nova-group/components/LeadershipSection.jsx', 'utf8');
leadership = leadership.replace(
  '<a\n                href="https://portfolio-founder-of-nova.vercel.app/"\n                target="_blank"\n                rel="noopener noreferrer"\n                className="btn-leadership-contact"\n              >',
  '<a\n                href="/founder-of-nova.html"\n                className="btn-leadership-contact"\n              >'
);
fs.writeFileSync('nova-group/components/LeadershipSection.jsx', leadership, 'utf8');
console.log('Updated LeadershipSection.jsx');

