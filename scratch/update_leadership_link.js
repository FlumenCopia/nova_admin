const fs = require('fs');
const filePath = 'nova-group/components/LeadershipSection.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const target = `<Link href="/contact" className="btn-leadership-contact">
                Connect with Director <ArrowRight size={15} />
              </Link>`;

const replacement = `<a
                href="https://portfolio-founder-of-nova.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-leadership-contact"
              >
                Connect with Director <ArrowRight size={15} />
              </a>`;

content = content.replace(target, replacement);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated LeadershipSection Connect with Director link to https://portfolio-founder-of-nova.vercel.app/');

