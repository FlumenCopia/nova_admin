'use client';

import { ClientItem } from '../types';
import { DEFAULT_CLIENT_LOGOS } from '../data/content';

interface ClientsMarqueeProps {
  title?: string;
  clients?: ClientItem[];
}

export default function ClientsMarquee({
  title = 'OUR ESTEEMED CLIENTS & BRAND PARTNERS',
  clients = [],
}: ClientsMarqueeProps) {
  const logos = clients.length > 0 ? clients : DEFAULT_CLIENT_LOGOS;

  const resolveLogoSrc = (logo: ClientItem) => {
    if (logo.file) {
      const clean = logo.file.replace(/^client_/, '');
      return `/client-logos/${clean}`;
    }
    if (logo.logoUrl) {
      if (logo.logoUrl.startsWith('http://') || logo.logoUrl.startsWith('https://') || logo.logoUrl.startsWith('//')) {
        return logo.logoUrl;
      }
      if (logo.logoUrl.startsWith('/uploads/')) {
        const filename = logo.logoUrl.split('/').pop() || '';
        // If client logo already bundled locally in /client-logos, serve directly for instant load
        if (filename) {
          return `/client-logos/${filename}`;
        }
        return `https://api.novainnovations.in${logo.logoUrl}`;
      }
      if (logo.logoUrl.startsWith('/client-logos/')) {
        return logo.logoUrl;
      }
      return `/client-logos/${logo.logoUrl.replace(/^\//, '')}`;
    }
    return '/client-logos/myg.png';
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (!target.dataset.fallback) {
      target.dataset.fallback = 'true';
      target.src = '/client-logos/myg.png';
    } else {
      target.style.display = 'none';
    }
  };

  return (
    <section className="partners-section" id="partners">
      <div className="partners-title-wrap">
        <span className="partners-title">{title}</span>
      </div>

      <div className="partners-marquee-container">
        <div className="partners-marquee-track">
          {/* Track Set 1 */}
          {logos.map((logo, lIdx) => (
            <div className="partner-logo-item" title={logo.name} key={`s1-${lIdx}`}>
              <img
                src={resolveLogoSrc(logo)}
                alt={logo.name}
                className="partner-logo-img"
                onError={handleImgError}
              />
            </div>
          ))}
          {/* Track Set 2 for Infinite Loop */}
          {logos.map((logo, lIdx) => (
            <div className="partner-logo-item" aria-hidden="true" title={logo.name} key={`s2-${lIdx}`}>
              <img
                src={resolveLogoSrc(logo)}
                alt={logo.name}
                className="partner-logo-img"
                onError={handleImgError}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
