'use client';

import { useState, useEffect } from 'react';
import { campaigns as defaultCampaigns } from '../data/campaigns';
import { fetchApi, getMediaUrl } from '../lib/api';

export default function GalleryGrid({ onOpenModal }) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [campaignsList, setCampaignsList] = useState(defaultCampaigns);
  const [lightboxImg, setLightboxImg] = useState(null);

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

  const filterButtons = [
    { key: 'all', label: 'All Works' },
    { key: 'hoardings', label: 'Prime Hoardings' },
    { key: 'myg', label: 'myG Campaigns' },
    { key: 'transit', label: 'Bus & Vehicle Transit' },
    { key: 'retail', label: 'Retail Facade' },
    { key: 'event', label: 'Events & Exhibitions' },
    { key: 'wall', label: 'Wall Painting' },
    { key: 'printing', label: 'Digital Printing' },
  ];

  const [visibleCount, setVisibleCount] = useState(6);

  const handleFilterChange = (key) => {
    setFilterCategory(key);
    setVisibleCount(6);
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
        <div className="filter-pills">
          {filterButtons.map((btn) => (
            <button
              key={btn.key}
              type="button"
              className={`filter-btn ${filterCategory === btn.key ? 'active' : ''}`}
              onClick={() => handleFilterChange(btn.key)}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          Showing {displayedCampaigns.length} of {filteredCampaigns.length} high-impact outdoor media executions
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
                <span className="listing-price" style={{ color: 'var(--brand-red)', fontWeight: 700 }}>
                  📍 {item.location || item.priceRowTitle}
                </span>
              </div>

              <h3 className="listing-title">{item.title}</h3>

              <ul className="listing-specs">
                {item.specs.map((spec, sIdx) => (
                  <li key={sIdx} className="spec-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
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
                fontSize: '2rem',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
              }}
            >
              &times;
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
