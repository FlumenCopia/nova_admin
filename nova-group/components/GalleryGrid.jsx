'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { campaigns as defaultCampaigns } from '../data/campaigns';
import { fetchApi, getMediaUrl } from '../lib/api';

export default function GalleryGrid({ onOpenModal }) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [campaignsList, setCampaignsList] = useState(defaultCampaigns);
  const [lightboxImg, setLightboxImg] = useState(null);
  const filterPillsRef = useRef(null);

  useEffect(() => {
    async function fetchDynamicPortfolio() {
      const json = await fetchApi('/public/portfolio');
      if (json && json.success && json.data && json.data.length > 0) {
        const mapped = json.data.map((item, idx) => ({
          id: item.id || `api-${idx}`,
          title: item.title,
          category: item.isVacant ? `${item.category} vacant` : item.category,
          badgeType: item.badgeType || 'Billboard',
          badgeStatus: item.location || 'Highway Junction',
          priceRowTitle: item.location || 'Highway Junction',
          image: getMediaUrl(item.imageUrl, '/mainhero1.png'),
          specs: Array.isArray(item.specs) ? item.specs : [],
          serviceName: item.serviceName || item.title,
          isVacant: item.isVacant,
          location: item.location,
        }));

        setCampaignsList([...mapped, ...defaultCampaigns]);
      }
    }
    fetchDynamicPortfolio();
  }, []);

  const BASE_FILTER_BUTTONS = [
    { key: 'all', label: 'All Works' },
    { key: 'hoardings', label: 'Prime Hoardings' },
    { key: 'myg', label: 'myG Campaigns' },
    { key: 'transit', label: 'Bus & Vehicle Transit' },
    { key: 'retail', label: 'Retail Facade' },
    { key: 'event', label: 'Events & Exhibitions' },
    { key: 'wall', label: 'Wall Painting' },
    { key: 'printing', label: 'Digital Printing' },
    { key: 'dooh', label: 'LED & Digital OOH' },
    { key: 'unipole', label: 'Highway Gantries & Unipoles' },
    { key: 'ksrtc', label: 'KSRTC Fleet Branding' },
    { key: 'airport', label: 'Airport & Metro Media' },
  ];

  const filterButtons = (() => {
    const existingKeys = new Set(BASE_FILTER_BUTTONS.map((b) => b.key));
    const dynamicButtons = [...BASE_FILTER_BUTTONS];
    campaignsList.forEach((c) => {
      if (c.category) {
        c.category.split(' ').forEach((cat) => {
          if (cat && cat !== 'vacant' && !existingKeys.has(cat)) {
            existingKeys.add(cat);
            const label = cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ');
            dynamicButtons.push({ key: cat, label });
          }
        });
      }
    });
    return dynamicButtons;
  })();

  const [visibleCount, setVisibleCount] = useState(6);

  const handleFilterChange = (key, event) => {
    setFilterCategory(key);
    setVisibleCount(6);
    if (event && event.currentTarget) {
      event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const scrollPills = (direction) => {
    if (!filterPillsRef.current) return;
    const amount = direction === 'left' ? -200 : 200;
    filterPillsRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const filteredCampaigns = campaignsList.filter((item) => {
    if (filterCategory === 'all') return true;
    const categories = item.category.split(' ');
    return categories.includes(filterCategory);
  });

  const displayedCampaigns = filteredCampaigns.slice(0, visibleCount);

  return (
    <>
      <div className="gallery-filter-bar">
        <div className="filter-slider-wrapper">
          <button
            type="button"
            className="filter-scroll-btn left"
            aria-label="Scroll left"
            onClick={() => scrollPills('left')}
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>

          <div className="filter-pills" ref={filterPillsRef}>
            {filterButtons.map((btn) => (
              <button
                key={btn.key}
                type="button"
                className={`filter-btn ${filterCategory === btn.key ? 'active' : ''}`}
                onClick={(e) => handleFilterChange(btn.key, e)}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="filter-scroll-btn right"
            aria-label="Scroll right"
            onClick={() => scrollPills('right')}
          >
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div className="gallery-count-text">
          Showing <strong style={{ color: 'var(--text-main)', fontWeight: 700 }}>{displayedCampaigns.length}</strong> of {filteredCampaigns.length} high-impact campaigns
        </div>
      </div>

      <div className="gallery-grid" id="properties-container">
        {displayedCampaigns.map((item) => (
          <div key={item.id} className="property-listing-card" data-category={item.category}>
            <div
              className="listing-media"
              style={{ cursor: 'pointer' }}
              onClick={() => setLightboxImg(item.image)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="listing-img"
                onError={(e) => { e.target.src = '/mainhero1.png'; }}
              />
              <span className="listing-badge-type">{item.badgeType}</span>
              <span className="listing-badge-status">
                {item.location || item.badgeStatus || 'Location'}
              </span>
            </div>

            <div className="listing-content">
              <div className="listing-price-row">
                <span className="listing-price">
                  {item.location || item.priceRowTitle}
                </span>
              </div>

              <h3 className="listing-title">{item.title}</h3>

              <ul className="listing-specs">
                {item.specs.map((spec, sIdx) => (
                  <li key={sIdx} className="spec-item">
                    <Check size={14} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                    {spec}
                  </li>
                ))}
              </ul>

              <div className="listing-actions">
                <button
                  type="button"
                  className="btn-card-action primary"
                  onClick={() => onOpenModal(item.serviceName || item.title)}
                >
                  Reserve / Inquire Site
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LOAD MORE BUTTON */}
      {visibleCount < filteredCampaigns.length && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            type="button"
            className="btn-pill-dark"
            onClick={() => setVisibleCount((prev) => prev + 6)}
            style={{ padding: '14px 32px', fontSize: '0.95rem', fontWeight: 700 }}
          >
            Load More Campaigns ({filteredCampaigns.length - visibleCount} Remaining)
          </button>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.88)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            cursor: 'pointer',
          }}
          onClick={() => setLightboxImg(null)}
        >
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
            <button
              onClick={() => setLightboxImg(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                color: '#ffffff',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close image preview"
            >
              <X size={28} />
            </button>
            <img
              src={lightboxImg}
              alt="Expanded view"
              style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '8px', objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
