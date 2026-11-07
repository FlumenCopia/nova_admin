const http = require('http');

http.get('http://localhost:5000/api/public/settings', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log('Returned founder fields:', {
      founderHeroTag: json.data.founderHeroTag,
      founderHeroTitle: json.data.founderHeroTitle,
      founderHeroDesc: json.data.founderHeroDesc,
      founderHeroCtaText: json.data.founderHeroCtaText,
      founderHeroCtaPhone: json.data.founderHeroCtaPhone,
      founderName: json.data.founderName,
      founderRole: json.data.founderRole,
      founderImage: json.data.founderImage,
    });
  });
});

