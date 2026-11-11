'use client';

import { ClientItem } from '@/types';
import { DEFAULT_CLIENT_LOGOS } from '@/data/content';

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
    if (logo.file) return `/client-logos/${logo.file}`;
    if (logo.logoUrl) {
      if (logo.logoUrl.startsWith('http') || logo.logoUrl.startsWith('//')) {
        return logo.logoUrl;
      }
      if (logo.logoUrl.startsWith('/uploads')) {
        return `http://localhost:5000${logo.logoUrl}`;
      }
      return logo.logoUrl;
    }
    return '/logo.png';
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
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
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
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
