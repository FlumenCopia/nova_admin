const http = require('http');

http.get('http://localhost:3000/founder-of-nova.html', (res) => {
  console.log('founder-of-nova.html status:', res.statusCode);
  let len = 0;
  res.on('data', chunk => len += chunk.length);
  res.on('end', () => console.log('Downloaded length:', len));
}).on('error', err => console.error('Error:', err.message));

