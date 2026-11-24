'use client';

import { useState } from 'react';
import { GALLERY_SLIDES } from '../data/content';
import { GallerySlide } from '../types';

interface GalleryProps {
  onOpenModal: (subject: string) => void;
  slides?: GallerySlide[];
  subhead?: string;
  heading?: string;
  desc?: string;
}

export default function Gallery({
  onOpenModal,
  slides = [],
  subhead = 'FEATURED MEDIA & AWARDS',
  heading = 'Founder Milestones & Executive Showcase',
  desc = 'Explore landmark billboard installations, executive inspections, media honours, and 27+ years of advertising excellence across Kerala.',
}: GalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeSlides: GallerySlide[] = (slides && slides.length > 0 ? slides : GALLERY_SLIDES).filter(
    (s) => s.isActive !== false
  );

  const prevSlide = () => {
    setCurrentSlide((curr) => (curr === 0 ? activeSlides.length - 1 : curr - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((curr) => (curr === activeSlides.length - 1 ? 0 : curr + 1));
  };

  const resolveSlideImg = (slide: GallerySlide) => {
    const raw = slide.imageUrl || slide.img || '';
    if (!raw) return '/assets/founder_gireesh.jpg';
    if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('//')) {
      return raw;
    }
    if (raw.startsWith('/uploads/')) {
      return `https://api.novainnovations.in${raw}`;
    }
    return raw; // /assets/founder_...
  };

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
            className="swipe-nav-btn prev"
            onClick={prevSlide}
            aria-label="Previous Image Slide"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div className="swipe-track-wrapper">
            <div className="swipe-track">
              {activeSlides.map((slide, sIdx) => {
                const counterDisplay = `${String(sIdx + 1).padStart(2, '0')} / ${String(activeSlides.length).padStart(2, '0')}`;
                return (
                  <div
                    className={`swipe-slide ${sIdx === currentSlide ? 'active' : ''}`}
                    key={slide._id || slide.id || sIdx}
                    style={{ display: sIdx === currentSlide ? 'block' : 'none' }}
                  >
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
                          <i className={`fa-solid ${slide.badgeIcon || 'fa-award'}`}></i> {slide.badgeText || 'Showcase'}
                        </span>
                        <span className="slide-counter">{counterDisplay}</span>
                      </div>
                      <h3 className="slide-title">{slide.title}</h3>
                      <p className="slide-meta">
                        <i className={`fa-solid ${slide.metaIcon || 'fa-location-dot'}`}></i> {slide.meta}
                      </p>
                      <div className="slide-actions">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => onOpenModal(slide.modalSubject || 'Founder Inquiry')}
                        >
                          {slide.actionText || 'Connect with Director'} <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            className="swipe-nav-btn next"
            onClick={nextSlide}
            aria-label="Next Image Slide"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <div className="swipe-dots-container">
          {activeSlides.map((_, dotIdx) => (
            <span
              key={dotIdx}
              className={`swipe-dot ${dotIdx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(dotIdx)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}

