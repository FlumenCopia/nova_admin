'use client';

import { useState, useEffect } from 'react';
import { getApiBase } from '../../lib/api';

export default function FounderHero({ onOpenModal }) {
  const [settings, setSettings] = useState({
    founderHeroTag: '27+ Years of Creative Advertising Excellence',
    founderHeroTitle: 'INNOVATIONS THAT HALLMARKS YOUR BRAND',
    founderHeroDesc: 'Outdoors • Design Studio • Events — Prime hoardings, transit vehicle branding, and overnight campaign execution across Kerala.',
    founderHeroCtaText: 'Book Hoardings',
    founderHeroCtaPhone: '+91 95390 00640',
    founderName: 'GIREESH KUMAR S',
    founderRole: 'Founder & CEO — NOVA Innovations',
    founderImage: '/assets/hero_man.jpeg',
  });

  useEffect(() => {
    fetch(`${getApiBase()}/public/settings`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.success && data.data) {
          setSettings((prev) => ({
            ...prev,
            founderHeroTag: data.data.founderHeroTag || prev.founderHeroTag,
            founderHeroTitle: data.data.founderHeroTitle || prev.founderHeroTitle,
            founderHeroDesc: data.data.founderHeroDesc || prev.founderHeroDesc,
            founderHeroCtaText: data.data.founderHeroCtaText || prev.founderHeroCtaText,
            founderHeroCtaPhone: data.data.founderHeroCtaPhone || prev.founderHeroCtaPhone,
            founderName: data.data.founderName || prev.founderName,
            founderRole: data.data.founderRole || prev.founderRole,
            founderImage: data.data.founderImage || prev.founderImage,
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-grid">
        {/* Left Column Content */}
        <div className="hero-content">
          <div className="hero-tag-badge">
            <i className="fa-solid fa-star" style={{ color: '#eab308', marginRight: '6px' }}></i>
            <span id="founder-hero-tag-text">{settings.founderHeroTag}</span>
          </div>
          <h1 className="hero-title" id="founder-hero-title">
            {settings.founderHeroTitle}
          </h1>
          <p className="hero-desc" id="founder-hero-desc">
            {settings.founderHeroDesc}
          </p>
          <div className="hero-actions" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href={`tel:${settings.founderHeroCtaPhone.replace(/\s+/g, '')}`}
              className="btn btn-primary hero-cta-btn"
              id="founder-hero-cta"
            >
              <span id="founder-hero-cta-text">{settings.founderHeroCtaText}</span>
              <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
            </a>
            {onOpenModal && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => onOpenModal('Outdoor Hoardings')}
                style={{
                  background: 'rgba(15, 23, 42, 0.05)',
                  border: '1px solid rgba(15, 23, 42, 0.12)',
                  borderRadius: '9999px',
                  padding: '12px 24px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Inquire Campaign
              </button>
            )}
          </div>
        </div>

        {/* Right Column Image Composition */}
        <div className="hero-visual">
          <div className="visual-wrapper">
            <div className="hero-blue-circle"></div>

            <div className="hero-img-box">
              <img
                src={settings.founderImage || '/assets/hero_man.jpeg'}
                alt={settings.founderName}
                className="hero-founder-img"
                id="founder-hero-img"
              />
            </div>

            <div className="founder-title-badge">
              <strong id="founder-hero-name">{settings.founderName}</strong>
              <span id="founder-hero-role">{settings.founderRole}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
