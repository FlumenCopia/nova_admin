'use client';

import { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';

export default function FounderServices({ onOpenModal }) {
  const [services, setServices] = useState([]);
  const [subhead, setSubhead] = useState('WHAT WE OFFER');
  const [heading, setHeading] = useState('Comprehensive Advertising Services');
  const [desc, setDesc] = useState(
    'End-to-end outdoor advertising, design studio creations, transit branding, and corporate events across Kerala.'
  );

  useEffect(() => {
    async function loadData() {
      try {
        const [servicesRes, settingsRes] = await Promise.all([
          fetchApi('/public/services'),
          fetchApi('/public/settings'),
        ]);

        if (servicesRes && servicesRes.success && Array.isArray(servicesRes.data)) {
          const active = servicesRes.data.filter((s) => s.isActive !== false);
          setServices(active);
        } else {
          setServices([]);
        }

        if (settingsRes && settingsRes.success && settingsRes.data) {
          const s = settingsRes.data;
          if (s.servicesSectionSubhead) setSubhead(s.servicesSectionSubhead);
          if (s.servicesSectionHeading) setHeading(s.servicesSectionHeading);
          if (s.servicesSectionDesc) setDesc(s.servicesSectionDesc);
        }
      } catch (err) {
        console.error('Failed to load services:', err);
        setServices([]);
      }
    }
    loadData();
  }, []);

  if (!services || services.length === 0) {
    return null;
  }

  const getIconClass = (iconKey, title) => {
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
        <span className="about-subhead" id="services-subhead">{subhead}</span>
        <h2 className="section-heading-sm" id="services-heading">{heading}</h2>
        <p className="section-desc-left" id="services-desc">{desc}</p>
      </div>

      <div className="services-cards-grid" id="services-cards-container">
        {services.map((srv, idx) => (
          <div key={srv.id || srv._id || idx} className="service-squircle-card">
            <div className="service-icon-box">
              <i className={`fa-solid ${getIconClass(srv.icon, srv.title)}`}></i>
            </div>
            <h3 className="service-title">{srv.title}</h3>
            <p className="service-desc">{srv.description || srv.desc}</p>
            {Array.isArray(srv.features) && srv.features.length > 0 && (
              <div className="service-tags-list">
                {srv.features.map((tag, tIdx) => (
                  <span key={tIdx} className="service-tag-item">
                    <i className="fa-solid fa-check" style={{ marginRight: '6px', color: '#16a34a' }}></i> {tag}
                  </span>
                ))}
              </div>
            )}
            <button
              type="button"
              className="service-card-btn"
              onClick={() => onOpenModal && onOpenModal(srv.title)}
            >
              <span>Inquire {srv.title ? srv.title.split(' ')[0] : 'Service'}</span>{' '}
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
