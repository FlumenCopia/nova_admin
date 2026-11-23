'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchApi, getMediaUrl } from '../lib/api';

export default function GalleryGrid({ onOpenModal }) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [campaignsList, setCampaignsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImg, setLightboxImg] = useState(null);
  const filterPillsRef = useRef(null);

  useEffect(() => {
    async function fetchDynamicPortfolio() {
      try {
        const json = await fetchApi('/public/portfolio?limit=100');
        if (json && json.success && Array.isArray(json.data)) {
          const mapped = json.data.map((item, idx) => ({
            id: item.id || `api-${idx}`,
            title: item.title,
            category: (item.category || 'Prime Hoardings').trim(),
            badgeType: item.badgeType || 'Billboard',
            badgeStatus: item.badgeStatus || 'Prime Location',
            priceRowTitle: item.location || 'Highway Junction',
            image: getMediaUrl(item.imageUrl, '/mainhero1.png'),
            specs: Array.isArray(item.specs) ? item.specs : [],
            serviceName: item.serviceName || item.title,
            isVacant: Boolean(item.isVacant),
            location: item.location,
          }));

          setCampaignsList(mapped);
        } else {
          setCampaignsList([]);
        }
      } catch (err) {
        console.error('Failed to load portfolio:', err);
        setCampaignsList([]);
      } finally {
        setLoading(false);
      }
    }
    fetchDynamicPortfolio();
  }, []);

  const KNOWN_LABELS = {
    hoardings: 'Prime Hoardings',
    myg: 'myG Campaigns',
    transit: 'Bus & Vehicle Transit',
    retail: 'Retail Facade',
    event: 'Events & Exhibitions',
    wall: 'Wall Painting',
    printing: 'Digital Printing',
    dooh: 'LED & Digital OOH',
    unipole: 'Highway Gantries & Unipoles',
    ksrtc: 'KSRTC Fleet Branding',
    airport: 'Airport & Metro Media',
  };

  const getCategoryLabel = (raw) => {
    if (!raw) return 'Prime Hoardings';
    const trimmed = raw.trim();
    const lower = trimmed.toLowerCase();
    if (KNOWN_LABELS[lower]) return KNOWN_LABELS[lower];
    return trimmed;
  };

  const filterButtons = (() => {
    // 1. Group and count items per category
    const catMap = new Map();

    campaignsList.forEach((item) => {
      const rawCat = (item.category || '').trim();
      if (!rawCat) return;
      const label = getCategoryLabel(rawCat);
      const key = label;

      if (!catMap.has(key)) {
        catMap.set(key, { key, label, count: 0 });
      }
      catMap.get(key).count += 1;
    });

    // 2. Sort categories based on count: High to Low (descending)
    const sortedCategories = Array.from(catMap.values()).sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count; // High to low
      }
      return a.label.localeCompare(b.label);
    });

    // 3. Build pills array with image counts
    const buttons = [
      {
        key: 'all',
        label: `All Works (${campaignsList.length})`,
        count: campaignsList.length,
      },
    ];

    const vacantCount = campaignsList.filter((c) => c.isVacant).length;
    if (vacantCount > 0) {
      buttons.push({
        key: 'vacant',
        label: `🟢 Available / Vacant (${vacantCount})`,
        count: vacantCount,
      });
    }

    sortedCategories.forEach((cat) => {
      buttons.push({
        key: cat.key,
        label: `${cat.label} (${cat.count})`,
        count: cat.count,
      });
    });

    return buttons;
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
    const itemLabel = getCategoryLabel(item.category).toLowerCase();
    const targetKey = filterCategory.toLowerCase();
    const itemRaw = (item.category || '').toLowerCase().trim();
    return itemLabel === targetKey || itemRaw === targetKey;
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

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          Loading campaign gallery...
        </div>
      ) : displayedCampaigns.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          No campaigns found in this category.
        </div>
      ) : (
        <div className="gallery-grid" id="properties-container">
          {displayedCampaigns.map((item) => (
            <div key={item.id} className="property-listing-card" data-category={item.category}>
              <div
                className="listing-media"
                style={{ cursor: 'pointer' }}
                onClick={() => setLightboxImg(item.image)}
              >
                <div
                  className="listing-img-blur"
                  style={{ backgroundColor: 'rgba(20, 20, 25, 0.6)' }}
                  aria-hidden="true"
                />
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
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

                <h3 className="listing-title" title={item.title}>{item.title}</h3>

                {item.specs && item.specs.length > 0 && (
                  <ul className="listing-specs">
                    {item.specs.slice(0, 3).map((spec, sIdx) => (
                      <li key={sIdx} className="spec-item">
                        <Check size={14} strokeWidth={2.5} style={{ flexShrink: 0, color: 'var(--brand-green, #529621)' }} />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="listing-actions" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
                  <button
                    type="button"
                    className="btn-card-action primary"
                    onClick={() => onOpenModal(item.serviceName || item.title)}
                  >
                    Reserve / Inquire Site
                  </button>
                  <a
                    href={`https://wa.me/919539000640?text=${encodeURIComponent(`Hi Nova Innovations, I am inquiring about billboard site: "${item.title}" (${item.location || 'Kerala'}). Please share rate card and booking availability.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-card-action"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(37, 211, 102, 0.12)',
                      color: '#25D366',
                      borderColor: 'rgba(37, 211, 102, 0.35)',
                      padding: '0 12px',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                    title="Direct WhatsApp Inquiry"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LOAD MORE BUTTON */}
      {!loading && visibleCount < filteredCampaigns.length && (
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
