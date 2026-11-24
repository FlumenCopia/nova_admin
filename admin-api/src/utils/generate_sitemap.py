import sys
import os

sys.path.append(os.path.dirname(__file__))
from generate_blogs import articles

today = '2026-11-24'
base_urls = [
    ('https://novainnovations.in', '1.0', 'daily'),
    ('https://novainnovations.in/about', '0.9', 'weekly'),
    ('https://novainnovations.in/services', '0.9', 'weekly'),
    ('https://novainnovations.in/portfolio', '0.9', 'weekly'),
    ('https://novainnovations.in/contact', '0.8', 'monthly'),
    ('https://novainnovations.in/blog', '0.9', 'daily'),
]
initial_slugs = [
    'kerala-outdoor-advertising-guide-2026',
    'highway-billboards-vs-transit-advertising-roi-kerala',
    'evolution-dooh-3d-billboards-kochi-trivandrum'
]

xml_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
]

for loc, prio, freq in base_urls:
    xml_lines.append(f'  <url>\n    <loc>{loc}</loc>\n    <lastmod>{today}</lastmod>\n    <changefreq>{freq}</changefreq>\n    <priority>{prio}</priority>\n  </url>')

for slug in initial_slugs:
    xml_lines.append(f'  <url>\n    <loc>https://novainnovations.in/blog/{slug}</loc>\n    <lastmod>{today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>')

for art in articles:
    slug = art['slug']
    xml_lines.append(f'  <url>\n    <loc>https://novainnovations.in/blog/{slug}</loc>\n    <lastmod>{today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>')

xml_lines.append('</urlset>\n')

root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
out_sitemap = os.path.join(root_dir, 'nova-group', 'public', 'sitemap.xml')

with open(out_sitemap, 'w', encoding='utf-8') as f:
    f.write('\n'.join(xml_lines))

total = len(base_urls) + len(initial_slugs) + len(articles)
print(f'Successfully wrote {total} URLs to {out_sitemap}')
