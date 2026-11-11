'use client';

import { ClientItem } from '@/types';
import { DEFAULT_CLIENT_LOGOS } from '@/data/content';

interface ClientsMarqueeProps {
  clients?: ClientItem[];
}

export default function ClientsMarquee({ clients = [] }: ClientsMarqueeProps) {
  const logos = clients.length > 0 ? clients : DEFAULT_CLIENT_LOGOS;

  return (
    <section className="partners-section" id="partners">
      <div className="partners-title-wrap">
        <span className="partners-title">OUR ESTEEMED CLIENTS &amp; BRAND PARTNERS</span>
      </div>

      <div className="partners-marquee-container">
        <div className="partners-marquee-track">
          {/* Track Set 1 */}
          {logos.map((logo, lIdx) => (
            <div className="partner-logo-item" title={logo.name} key={`s1-${lIdx}`}>
              <img
                src={logo.file ? `/client-logos/${logo.file}` : logo.logoUrl}
                alt={logo.name}
                className="partner-logo-img"
              />
            </div>
          ))}
          {/* Track Set 2 for Infinite Loop */}
          {logos.map((logo, lIdx) => (
            <div className="partner-logo-item" aria-hidden="true" title={logo.name} key={`s2-${lIdx}`}>
              <img
                src={logo.file ? `/client-logos/${logo.file}` : logo.logoUrl}
                alt={logo.name}
                className="partner-logo-img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

