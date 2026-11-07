const http = require('http');

function checkUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', err => reject(err));
  });
}

async function run() {
  console.log('Testing endpoints...');
  try {
    const settings = await checkUrl('http://127.0.0.1:5000/api/public/settings');
    const parsedSettings = JSON.parse(settings.data);
    console.log('Settings status:', settings.status, 'partnersSectionTitle:', parsedSettings.data?.partnersSectionTitle);

    const clients = await checkUrl('http://127.0.0.1:5000/api/public/clients');
    const parsedClients = JSON.parse(clients.data);
    console.log('Clients status:', clients.status, 'Total clients:', parsedClients.data?.length);

    const founderHtml = await checkUrl('http://127.0.0.1:3000/founder-of-nova.html');
    console.log('Founder HTML status:', founderHtml.status, 'Has #partners-title:', founderHtml.data.includes('id="partners-title"'), 'Has #partners-marquee-track:', founderHtml.data.includes('id="partners-marquee-track"'));

    const adminFounder = await checkUrl('http://127.0.0.1:3001/dashboard/founder');
    console.log('Admin Founder page status:', adminFounder.status);

    const adminClients = await checkUrl('http://127.0.0.1:3001/dashboard/clients');
    console.log('Admin Clients page status:', adminClients.status);
  } catch (e) {
    console.error('Error:', e.message);
  }
}

run();

