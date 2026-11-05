'use client';

import { useState, useEffect } from 'react';
import { clientLogos as defaultLogos } from '../data/clientLogos';
import { fetchApi, getMediaUrl } from '../lib/api';

export default function MarqueeLogos() {
  const [logos, setLogos] = useState(defaultLogos);

  useEffect(() => {
    async function fetchDynamicLogos() {
      try {
        const json = await fetchApi('/public/clients');
        if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data.map((item) => ({
            name: item.name,
            src: getMediaUrl(item.logoUrl, '/logo.png'),
          }));

          // Ensure enough items (at least 12) for smooth continuous marquee animation
          let displayList = mapped;
          while (displayList.length > 0 && displayList.length < 12) {
            displayList = [...displayList, ...mapped];
          }
          setLogos(displayList);
        }
      } catch (err) {
        console.error('Failed to load dynamic client logos:', err);
      }
    }
    fetchDynamicLogos();
  }, []);

  return (
    <section className="partners-section" id="partners">
      <div className="container" style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.82rem', letterSpacing: '0.09em' }}>
          Our Esteemed Clients & Brand Partners
        </span>
      </div>
      <div className="partners-marquee-container">
        <div className="partners-marquee-track">
          {/* Loop Set 1 */}
          {logos.map((logo, index) => (
            <div key={`set1-${index}`} className="partner-logo-item" title={logo.name}>
              <img src={logo.src} alt={logo.name} className="partner-logo-img" />
            </div>
          ))}

          {/* Loop Set 2 for Continuous Infinite Scroll */}
          {logos.map((logo, index) => (
            <div key={`set2-${index}`} className="partner-logo-item" aria-hidden="true" title={logo.name}>
              <img src={logo.src} alt={logo.name} className="partner-logo-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
