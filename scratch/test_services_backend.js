const http = require('http');

function check(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ url, status: res.statusCode, data });
      });
    }).on('error', err => resolve({ url, error: err.message }));
  });
}

(async () => {
  const r1 = await check('http://localhost:5000/api/public/settings');
  const s = JSON.parse(r1.data).data;
  console.log('Services Header Settings in API:', {
    subhead: s.servicesSectionSubhead,
    heading: s.servicesSectionHeading,
    desc: s.servicesSectionDesc,
  });

  const r2 = await check('http://localhost:5000/api/public/services');
  const services = JSON.parse(r2.data).data;
  console.log('Public services returned count:', services.length);

  const r3 = await check('http://localhost:3001/dashboard/services');
  console.log('Admin Services Page status:', r3.status);

  const r4 = await check('http://localhost:3000/founder-of-nova.html');
  console.log('Founder page status:', r4.status);
})();

