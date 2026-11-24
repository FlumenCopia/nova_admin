'use client';

import { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';

const slidesData = [
  {
    img: '/assets/founder_gireesh.jpg',
    badge: 'Executive Profile',
    icon: 'fa-user-tie',
    counter: '01 / 06',
    title: 'GIREESH KUMAR S — Founder, Director & CEO',
    meta: '27+ Years Excellence • Managing 500+ Prime Media Assets Across Kerala',
    actionText: 'Connect with Director',
    serviceKey: 'Founder Meeting',
  },
  {
    img: '/assets/founder_hoarding.jpg',
    badge: 'Highway Inspection',
    icon: 'fa-bolt',
    counter: '02 / 06',
    title: 'Founder Inspection — Highway Hoarding Landmark',
    meta: 'NH 66 Corridor • Director Gireesh Kumar S Overseeing Spot-Lit 40x20 FT Billboard',
    actionText: 'Inquire Location',
    serviceKey: 'Highway Hoarding',
  },
  {
    img: '/assets/founder_transit.jpg',
    badge: 'Transit Fleet Launch',
    icon: 'fa-bus',
    counter: '03 / 06',
    title: 'Gireesh Kumar S Launching KSRTC Transit Wrap Fleet',
    meta: '14 Districts Pan-Kerala • Statewide Mobile Media Network',
    actionText: 'Inquire Fleet',
    serviceKey: 'Transit Media',
  },
  {
    img: '/assets/founder_retail.jpg',
    badge: 'Retail Unveiling',
    icon: 'fa-store',
    counter: '04 / 06',
    title: 'Retail Facade & 3D LED Display Unveiling',
    meta: 'Highway Commercial Hub • Gireesh Kumar S at Architectural Facade Opening',
    actionText: 'Inquire Branding',
    serviceKey: 'Retail Facade',
  },
  {
    img: '/assets/founder_execution.jpg',
    badge: 'Studio Operations',
    icon: 'fa-wand-magic-sparkles',
    counter: '05 / 06',
    title: 'Overnight Flex Printing & Studio Direction',
    meta: 'Design Studio Hub • Director Gireesh Kumar S Directing 24/7 Rapid Execution Team',
    actionText: 'Inquire Execution',
    serviceKey: 'Campaign Execution',
  },
  {
    img: '/assets/founder_award.jpg',
    badge: 'Media Keynote',
    icon: 'fa-microphone',
    counter: '06 / 06',
    title: 'Advertising Excellence Summit Keynote',
    meta: 'Kerala Media Summit • Keynote Address on OOH Innovations by Director Gireesh Kumar S',
    actionText: 'Inquire Speaker',
    serviceKey: 'Founder Keynote',
  },
];

export default function FounderSwipeGallery({
  onOpenModal,
  slides: propSlides,
  subhead: propSubhead,
  heading: propHeading,
  desc: propDesc,
}) {
  const [slides, setSlides] = useState(propSlides || slidesData);
  const [current, setCurrent] = useState(0);
  const [subhead, setSubhead] = useState(propSubhead || 'FEATURED MEDIA & AWARDS');
  const [heading, setHeading] = useState(propHeading || 'Founder Milestones & Executive Showcase');
  const [desc, setDesc] = useState(
    propDesc ||
      'Explore landmark billboard installations, executive inspections, media honours, and 27+ years of advertising excellence across Kerala.'
  );

  useEffect(() => {
    if (propSlides && propSlides.length > 0) {
      setSlides(propSlides);
    } else {
      fetchApi('/public/founder-gallery')
        .then((res) => {
          if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
            const active = res.data.filter((s) => s.isActive !== false);
            if (active.length > 0) {
              setSlides(active);
            }
          }
        })
        .catch(() => {});
    }

    if (!propHeading || !propSubhead || !propDesc) {
      fetchApi('/public/settings')
        .then((res) => {
          if (res && res.success && res.data) {
            if (res.data.founderGallerySubhead && !propSubhead) setSubhead(res.data.founderGallerySubhead);
            if (res.data.founderGalleryHeading && !propHeading) setHeading(res.data.founderGalleryHeading);
            if (res.data.founderGalleryDesc && !propDesc) setDesc(res.data.founderGalleryDesc);
          }
        })
        .catch(() => {});
    }
  }, [propSlides, propSubhead, propHeading, propDesc]);

  const activeSlides = slides && slides.length > 0 ? slides : slidesData;
  const slide = activeSlides[current] || activeSlides[0] || slidesData[0];

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === activeSlides.length - 1 ? 0 : prev + 1));
  };

  const resolveSlideImg = (s) => {
    const raw = s.imageUrl || s.img || '';
    if (!raw) return '/assets/founder_gireesh.jpg';
    if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('//')) {
      return raw;
    }
    if (raw.startsWith('/uploads/')) {
      return `https://api.novainnovations.in${raw}`;
    }
    return raw;
  };

  const counterDisplay = `${String(current + 1).padStart(2, '0')} / ${String(activeSlides.length).padStart(2, '0')}`;

  return (
    <section className="gallery-swipe-section" id="gallery">
      <div className="section-header-centered">
        <div className="dual-dots-badge center">
          <span className="dot dot-red"></span>
          <span className="dot dot-red"></span>
        </div>
        <span className="section-sub">{subhead}</span>
        <h2 className="section-heading">{heading}</h2>
        <p className="section-desc">{desc}</p>
      </div>

      <div className="swipe-gallery-container">
        <div className="swipe-stage">
          <button
            type="button"
            className="swipe-nav-btn prev"
            onClick={prevSlide}
            aria-label="Previous Slide"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div className="swipe-track-wrapper">
            <div className="swipe-slide active">
              <div className="slide-image-wrapper">
                <img
                  src={resolveSlideImg(slide)}
                  alt={slide.title}
                  className="slide-img"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = 'true';
                      target.src = '/assets/founder_gireesh.jpg';
                    }
                  }}
                />
                <div className="slide-gradient-overlay"></div>
              </div>
              <div className="slide-caption-card">
                <div className="caption-header">
                  <span className="slide-badge">
                    <i className={`fa-solid ${slide.badgeIcon || slide.icon || 'fa-award'}`} style={{ marginRight: '6px' }}></i> {slide.badgeText || slide.badge || 'Showcase'}
                  </span>
                  <span className="slide-counter">{counterDisplay}</span>
                </div>
                <h3 className="slide-title">{slide.title}</h3>
                <p className="slide-meta">
                  <i className={`fa-solid ${slide.metaIcon || 'fa-award'}`} style={{ marginRight: '6px', color: '#e02b20' }}></i> {slide.meta}
                </p>
                <div className="slide-actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => onOpenModal && onOpenModal(slide.modalSubject || slide.serviceKey || 'Founder Meeting')}
                  >
                    <span>{slide.actionText || 'Connect with Director'}</span> <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="swipe-nav-btn next"
            onClick={nextSlide}
            aria-label="Next Slide"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        {/* Dots */}
        <div className="swipe-dots-container">
          {activeSlides.map((_, idx) => (
            <span
              key={idx}
              className={`swipe-dot ${idx === current ? 'active' : ''}`}
              onClick={() => setCurrent(idx)}
              style={{ cursor: 'pointer' }}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
