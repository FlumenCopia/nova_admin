'use client';

import { useState } from 'react';
import { GALLERY_SLIDES } from '@/data/content';

interface GalleryProps {
  onOpenModal: (subject: string) => void;
}

export default function Gallery({ onOpenModal }: GalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((curr) => (curr === 0 ? GALLERY_SLIDES.length - 1 : curr - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((curr) => (curr === GALLERY_SLIDES.length - 1 ? 0 : curr + 1));
  };

  return (
    <section className="gallery-swipe-section" id="gallery">
      <div className="section-header-centered">
        <div className="dual-dots-badge center">
          <span className="dot dot-red"></span>
          <span className="dot dot-red"></span>
        </div>
        <span className="section-sub">FEATURED MEDIA GALLERY</span>
        <h2 className="section-heading">High-Impact Campaign Showcase</h2>
        <p className="section-desc">
          Swipe through Nova Innovations&apos; landmark billboard installations, mobile transit fleets, and
          architectural displays across Kerala.
        </p>
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
              {GALLERY_SLIDES.map((slide, sIdx) => (
                <div
                  className={`swipe-slide ${sIdx === currentSlide ? 'active' : ''}`}
                  key={sIdx}
                  style={{ display: sIdx === currentSlide ? 'block' : 'none' }}
                >
                  <div className="slide-image-wrapper">
                    <img src={slide.img} alt={slide.title} className="slide-img" />
                    <div className="slide-gradient-overlay"></div>
                  </div>
                  <div className="slide-caption-card">
                    <div className="caption-header">
                      <span className="slide-badge">
                        <i className={`fa-solid ${slide.badgeIcon}`}></i> {slide.badgeText}
                      </span>
                      <span className="slide-counter">{slide.counter}</span>
                    </div>
                    <h3 className="slide-title">{slide.title}</h3>
                    <p className="slide-meta">
                      <i className={`fa-solid ${slide.metaIcon}`}></i> {slide.meta}
                    </p>
                    <div className="slide-actions">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onOpenModal(slide.modalSubject)}
                      >
                        {slide.actionText} <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
          {GALLERY_SLIDES.map((_, dotIdx) => (
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

