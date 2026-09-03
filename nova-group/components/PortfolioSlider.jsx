'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { campaigns as defaultCampaigns } from '../data/campaigns';
import { fetchApi, getMediaUrl } from '../lib/api';

export default function PortfolioSlider() {
  const [campaignsList, setCampaignsList] = useState(defaultCampaigns);
  const featuredCampaigns = campaignsList.slice(0, 8);
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    async function loadDynamicPortfolio() {
      const json = await fetchApi('/public/portfolio');
      if (json && json.success && json.data && json.data.length > 0) {
        const mapped = json.data.map((item, idx) => ({
          id: item.id || `api-slide-${idx}`,
          title: item.title,
          subtitle: item.location || 'Prime Location, Kerala',
          badgeType: item.badgeType || 'Billboard',
          image: getMediaUrl(item.imageUrl, '/mainhero1.png'),
          isVacant: item.isVacant,
        }));
        setCampaignsList([...mapped, ...defaultCampaigns]);
      }
    }
    loadDynamicPortfolio();
  }, []);

  const getScrollStep = () => {
    if (!sliderRef.current) return 380;
    const firstCard = sliderRef.current.querySelector('.property-cat-card');
    return firstCard ? firstCard.offsetWidth + 28 : 380;
  };

  const updateScrollState = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    const step = getScrollStep();
    const index = Math.min(Math.round(scrollLeft / step), featuredCampaigns.length - 1);
    setActiveIndex(index);
    setCanPrev(scrollLeft > 5);
    setCanNext(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    let timer = setInterval(() => {
      const step = getScrollStep();
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft >= maxScroll - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 4500);

    const handleMouseEnter = () => clearInterval(timer);
    const handleMouseLeave = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        const step = getScrollStep();
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if (slider.scrollLeft >= maxScroll - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: step, behavior: 'smooth' });
        }
      }, 4500);
    };

    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      slider.removeEventListener('scroll', updateScrollState);
      slider.removeEventListener('mouseenter', handleMouseEnter);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(timer);
    };
  }, []);

  const handlePrev = (e) => {
    e.preventDefault();
    if (!sliderRef.current) return;
    const step = getScrollStep();
    sliderRef.current.scrollBy({ left: -step, behavior: 'smooth' });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!sliderRef.current) return;
    const step = getScrollStep();
    const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    if (sliderRef.current.scrollLeft >= maxScroll - 10) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      sliderRef.current.scrollBy({ left: step, behavior: 'smooth' });
    }
  };

  const handleDotClick = (index) => {
    if (!sliderRef.current) return;
    const step = getScrollStep();
    sliderRef.current.scrollTo({ left: index * step, behavior: 'smooth' });
  };

  return (
    <section className="catalog-section" id="property-catalog">
      <div className="container">
        <div className="catalog-header-row">
          <div className="catalog-header-text">
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              Featured Portfolio
            </span>
            <h2 className="heading-lg" style={{ marginTop: '4px' }}>Recent Major Campaigns</h2>
            <p className="subheading">High-impact outdoor hoarding and transit advertising deployed across Kerala</p>
          </div>
          <div className="catalog-nav-arrows">
            <button
              type="button"
              className="arrow-btn catalog-nav-prev"
              id="cat-prev-btn"
              aria-label="Previous campaigns"
              onClick={handlePrev}
              style={{ opacity: canPrev ? 1 : 0.5, cursor: canPrev ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              className="arrow-btn dark catalog-nav-next"
              id="cat-next-btn"
              aria-label="Next campaigns"
              onClick={handleNext}
              style={{ opacity: canNext ? 1 : 0.5, cursor: canNext ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Swiper Track Wrapper */}
        <div className="portfolio-swiper-wrap" ref={sliderRef} id="portfolio-swiper-wrap">
          <div className="portfolio-swiper-track" id="portfolio-swiper-track">
            {featuredCampaigns.map((item) => (
              <Link key={item.id} href="/gallery" className="property-cat-card">
                <div className="cat-card-img-wrap">
                  <img src={item.image} alt={item.title} className="cat-card-img" loading="lazy" />
                  <span className="cat-card-badge" style={item.isVacant ? { background: '#22c55e' } : {}}>
                    {item.badgeType}
                  </span>
                </div>
                <h3 className="cat-card-title">{item.title}</h3>
                <p className="cat-card-count">{item.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Swiper Pagination Dots */}
        <div className="portfolio-swiper-pagination" id="portfolio-pagination">
          {featuredCampaigns.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`swiper-dot ${index === activeIndex ? 'active' : ''}`}
              aria-label={`Go to campaign ${index + 1}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
