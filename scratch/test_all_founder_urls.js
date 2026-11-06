const http = require('http');

const urls = [
  'http://localhost:3000/founder-of-nova.html',
  'http://localhost:3000/styles.css',
  'http://localhost:3000/script.js',
  'http://localhost:3000/assets/hero_man.jpeg',
  'http://localhost:3000/assets/client-logos/myg.png'
];

urls.forEach(url => {
  http.get(url, (res) => {
    console.log(url, '-->', res.statusCode);
  }).on('error', err => console.error(url, 'Error:', err.message));
});

