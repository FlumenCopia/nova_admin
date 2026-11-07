const http = require('http');

function check(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ url, status: res.statusCode, length: data.length, sample: data.slice(0, 150) });
      });
    }).on('error', err => resolve({ url, error: err.message }));
  });
}

(async () => {
  const r1 = await check('http://localhost:5000/api/public/settings');
  console.log('API settings status:', r1.status);
  try {
    const json = JSON.parse(r1.sample + '...'); // just to see
  } catch(e) {}

  const r2 = await check('http://localhost:3001/dashboard/founder');
  console.log('Admin UI /dashboard/founder status:', r2.status);

  const r3 = await check('http://localhost:3000/founder-of-nova.html');
  console.log('Founder page status:', r3.status);
})();

