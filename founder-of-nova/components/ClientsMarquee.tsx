'use client';

import { ClientItem } from '../types';

interface ClientsMarqueeProps {
  title?: string;
  clients?: ClientItem[];
}

export default function ClientsMarquee({
  title = 'OUR ESTEEMED CLIENTS & BRAND PARTNERS',
  clients = [],
}: ClientsMarqueeProps) {
  if (!clients || clients.length === 0) {
    return null;
  }

  const activeClients = clients.filter((c) => c.isActive !== false);
  if (activeClients.length === 0) {
    return null;
  }

  // Ensure enough items for smooth continuous loop animation
  let logos = activeClients;
  while (logos.length > 0 && logos.length < 12) {
    logos = [...logos, ...activeClients];
  }

  const resolveLogoSrc = (logo: ClientItem) => {
    if (logo.logoUrl) {
      if (logo.logoUrl.startsWith('http://') || logo.logoUrl.startsWith('https://') || logo.logoUrl.startsWith('//')) {
        return logo.logoUrl;
      }
      if (logo.logoUrl.startsWith('/uploads/')) {
        return `https://api.novainnovations.in${logo.logoUrl}`;
      }
      if (logo.logoUrl.startsWith('/client-logos/')) {
        return logo.logoUrl;
      }
      return `/client-logos/${logo.logoUrl.replace(/^\//, '')}`;
    }
    if (logo.file) {
      const clean = logo.file.replace(/^client_/, '');
      return `/client-logos/${clean}`;
    }
    return '';
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.style.display = 'none';
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
