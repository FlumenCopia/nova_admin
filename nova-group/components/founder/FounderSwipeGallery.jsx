'use client';

import { useState, useEffect } from 'react';
import { fetchApi } from '../../lib/api';

export default function FounderSwipeGallery({
  onOpenModal,
  slides: propSlides,
  subhead: propSubhead,
  heading: propHeading,
  desc: propDesc,
}) {
  const [slides, setSlides] = useState(propSlides || []);
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
            setSlides(active);
          } else {
            setSlides([]);
          }
        })
        .catch(() => {
          setSlides([]);
        });
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

  const activeSlides = (slides || []).filter((s) => s.isActive !== false);

  if (activeSlides.length === 0) {
    return null;
  }

  const safeCurrent = current >= activeSlides.length ? 0 : current;
  const slide = activeSlides[safeCurrent];

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === activeSlides.length - 1 ? 0 : prev + 1));
  };

  const resolveSlideImg = (s) => {
    if (!s) return '';
    const raw = s.imageUrl || s.img || '';
    if (!raw) return '';
    if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('//')) {
      return raw;
    }
    if (raw.startsWith('/uploads/')) {
      return `https://api.novainnovations.in${raw}`;
    }
    return raw;
  };

  const counterDisplay = `${String(safeCurrent + 1).padStart(2, '0')} / ${String(activeSlides.length).padStart(2, '0')}`;
  const imgSrc = resolveSlideImg(slide);

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
          {activeSlides.length > 1 && (
            <button
              type="button"
              className="swipe-nav-btn prev"
              onClick={prevSlide}
              aria-label="Previous Slide"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          )}

          <div className="swipe-track-wrapper">
            <div className="swipe-slide gallery-slide active">
              <div className="slide-image-wrapper">
                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt={slide.title || 'Founder Showcase'}
                    className="slide-img"
                  />
                )}
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
                {slide.meta && (
                  <p className="slide-meta">
                    <i className={`fa-solid ${slide.metaIcon || 'fa-award'}`} style={{ marginRight: '6px', color: '#e02b20' }}></i> {slide.meta}
                  </p>
                )}
                <div className="slide-actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      if (slide.actionType === 'whatsapp') {
                        const phone = (slide.actionUrl || '+919539000640').replace(/[^0-9]/g, '');
                        const msg = encodeURIComponent(`Hi Nova Innovations, I am inquiring regarding founder milestone/showcase: "${slide.title}".`);
                        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
                      } else if (slide.actionType === 'call') {
                        const phone = (slide.actionUrl || '+919539000640').replace(/\s+/g, '');
                        window.location.href = `tel:${phone}`;
                      } else if (slide.actionType === 'url' && slide.actionUrl) {
                        window.open(slide.actionUrl, '_blank');
                      } else {
                        onOpenModal && onOpenModal(slide.modalSubject || slide.serviceKey || 'Founder Meeting');
                      }
                    }}
                  >
                    <span>{slide.actionText || 'Connect with Director'}</span> <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {activeSlides.length > 1 && (
            <button
              type="button"
              className="swipe-nav-btn next"
              onClick={nextSlide}
              aria-label="Next Slide"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          )}
        </div>

        {/* Dots */}
        {activeSlides.length > 1 && (
          <div className="swipe-dots-container">
            {activeSlides.map((_, idx) => (
              <span
                key={idx}
                className={`swipe-dot ${idx === safeCurrent ? 'active' : ''}`}
                onClick={() => setCurrent(idx)}
                style={{ cursor: 'pointer' }}
              ></span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
