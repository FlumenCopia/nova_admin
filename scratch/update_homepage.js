const fs = require('fs');
const filePath = 'nova-group/app/page.js';
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace(/import\s*\{\s*servicesData\s*as\s*defaultServices\s*\}\s*from\s*['"]\.\.\/data\/servicesData['"];?\r?\n?/, '');
content = content.replace('const [services, setServices] = useState(defaultServices);', 'const [services, setServices] = useState([]);');
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated HomePage in nova-group/app/page.js');

