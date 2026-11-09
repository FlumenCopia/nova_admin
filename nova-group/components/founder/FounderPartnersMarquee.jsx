'use client';

import { useState, useEffect } from 'react';
import { fetchApi, getMediaUrl } from '../../lib/api';

export default function FounderPartnersMarquee() {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDynamicLogos() {
      try {
        const json = await fetchApi('/public/clients');
        if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data.map((item) => ({
            name: item.name,
            src: getMediaUrl(item.logoUrl, '/logo.png'),
          }));

          let displayList = mapped;
          while (displayList.length > 0 && displayList.length < 12) {
            displayList = [...displayList, ...mapped];
          }
          setLogos(displayList);
        } else {
          setLogos([]);
        }
      } catch (err) {
        setLogos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchDynamicLogos();
  }, []);

  if (loading || !logos || logos.length === 0) {
    return null;
  }

  return (
    <section className="partners-section" id="partners">
      <div className="partners-title-wrap" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span className="partners-title" id="partners-title">
          OUR ESTEEMED CLIENTS &amp; BRAND PARTNERS
        </span>
      </div>

      <div className="partners-marquee-container" style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div
          className="partners-marquee-track"
          id="partners-marquee-track"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '40px',
            animation: 'marquee 25s linear infinite',
          }}
        >
          {logos.map((logo, index) => (
            <div
              key={`p-logo-${index}`}
              className="marquee-logo-card"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '70px',
                padding: '10px 24px',
                background: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                border: '1px solid #E2E8F0',
                minWidth: '140px',
              }}
            >
              <img
                src={logo.src}
                alt={logo.name}
                style={{ maxHeight: '42px', maxWidth: '120px', objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
