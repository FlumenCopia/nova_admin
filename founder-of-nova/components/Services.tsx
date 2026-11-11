'use client';

import { ServiceItem } from '@/types';

interface ServicesProps {
  services: ServiceItem[];
  onOpenModal: (serviceTitle: string) => void;
}

export default function Services({ services, onOpenModal }: ServicesProps) {
  const getIconClass = (iconKey?: string, title?: string) => {
    const k = (iconKey || '').toLowerCase();
    const t = (title || '').toLowerCase();
    if (k.includes('rectangle') || t.includes('hoarding') || t.includes('billboard'))
      return 'fa-rectangle-ad';
    if (k.includes('bus') || t.includes('vehicle') || t.includes('transit')) return 'fa-bus';
    if (k.includes('store') || t.includes('shop') || t.includes('retail') || t.includes('facade'))
      return 'fa-store';
    if (k.includes('champagne') || t.includes('event') || t.includes('stall'))
      return 'fa-champagne-glasses';
    if (k.includes('paint') || t.includes('wall') || t.includes('mural')) return 'fa-paintbrush';
    if (k.includes('pen') || t.includes('design') || t.includes('print')) return 'fa-pen-ruler';
    return iconKey || 'fa-layer-group';
  };

  return (
    <section className="features-wrapper-section rounded-container-light" id="services">
      <div className="container-top-notch">
        <span className="notch-dash"></span>
      </div>

      <div className="section-header-left">
        <span className="about-subhead">WHAT WE OFFER</span>
        <h2 className="section-heading-sm">Comprehensive Advertising Services</h2>
        <p className="section-desc-left">
          End-to-end outdoor advertising, design studio creations, transit branding, and corporate events across Kerala.
        </p>
      </div>

      <div className="services-cards-grid" id="services-cards-container">
        {services.map((srv, idx) => (
          <div className="service-squircle-card" key={srv.id || idx}>
            <div className="service-icon-box">
              <i className={`fa-solid ${getIconClass(srv.icon, srv.title)}`}></i>
            </div>
            <h3 className="service-title">{srv.title}</h3>
            <p className="service-desc">{srv.description}</p>
            {srv.features && srv.features.length > 0 && (
              <div className="service-tags-list">
                {srv.features.map((feat, fIdx) => (
                  <span className="service-tag-item" key={fIdx}>
                    <i className="fa-solid fa-check"></i> {feat}
                  </span>
                ))}
              </div>
            )}
            <button className="service-card-btn" onClick={() => onOpenModal(srv.title)}>
              <span>Inquire {srv.title.split(' ')[0]}</span> <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

