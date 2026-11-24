'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Clock, Calendar, ArrowRight, User } from 'lucide-react';
import { fetchApi, getMediaUrl } from '../../lib/api';

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      try {
        const res = await fetchApi('/public/blogs?limit=100');
        if (res && res.success && Array.isArray(res.data)) {
          setBlogs(res.data);
          if (Array.isArray(res.categories) && res.categories.length > 0) {
            setCategories(res.categories);
          }
        }
      } catch (err) {
        console.error('Failed to load blogs:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const filteredBlogs = blogs.filter((b) => {
    if (activeCategory !== 'all' && b.category?.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }
    if (search.trim()) {
      const term = search.toLowerCase();
      return (
        b.title?.toLowerCase().includes(term) ||
        b.excerpt?.toLowerCase().includes(term) ||
        b.tags?.some((t) => t.toLowerCase().includes(term))
      );
    }
    return true;
  });

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container page-hero-container">
          <nav className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="current">Blog & Insights</span>
          </nav>
          <span className="page-hero-tag">
            Kerala OOH Knowledge Hub
          </span>
          <h1 className="heading-lg">
            Outdoor Advertising <span>Guides & Insights</span>
          </h1>
          <p className="subheading">
            Strategic analysis of Kerala&apos;s OOH landscape — highway billboard visibility on NH 66, transit fleet branding ROI, digital DOOH screens, and real-world media execution strategies.
          </p>

          <div className="page-hero-badges">
            <span className="hero-pill-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              NH 66 & Corridor Analytics
            </span>
            <span className="hero-pill-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              High-ROI Transit Fleet Media
            </span>
            <span className="hero-pill-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              DOOH & Anamorphic 3D Screens
            </span>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH TOOLBAR */}
      <section className="container" style={{ marginTop: '40px', marginBottom: '60px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            background: 'var(--surface-color, #ffffff)',
            padding: '16px 20px',
            borderRadius: '16px',
            border: '1px solid var(--border-light, #e2e8f0)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            marginBottom: '36px',
          }}
        >
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: '1px solid',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: activeCategory === 'all' ? 'var(--brand-red, #e51b24)' : 'transparent',
                borderColor: activeCategory === 'all' ? 'var(--brand-red, #e51b24)' : 'var(--border-light, #e2e8f0)',
                color: activeCategory === 'all' ? '#ffffff' : 'var(--text-main, #0f172a)',
              }}
            >
              All Articles ({blogs.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: '1px solid',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: activeCategory === cat ? 'var(--brand-red, #e51b24)' : 'transparent',
                  borderColor: activeCategory === cat ? 'var(--brand-red, #e51b24)' : 'var(--border-light, #e2e8f0)',
                  color: activeCategory === cat ? '#ffffff' : 'var(--text-main, #0f172a)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8',
              }}
            />
            <input
              type="text"
              placeholder="Search guides & articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 14px 9px 38px',
                borderRadius: '9999px',
                border: '1px solid var(--border-light, #e2e8f0)',
                fontSize: '0.88rem',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* ARTICLES GRID */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            Loading outdoor advertising guides...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            No articles found matching &quot;{search}&quot;.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '28px',
            }}
          >
            {filteredBlogs.map((post) => {
              const coverUrl = getMediaUrl(post.coverImage, '/mainhero1.png');
              const postDate = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Recent';

              return (
                <article
                  key={post._id || post.id || post.slug}
                  style={{
                    background: 'var(--surface-color, #ffffff)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-light, #e2e8f0)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}
                  className="blog-card"
                >
                  {/* Card Image */}
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ position: 'relative', height: '210px', display: 'block', overflow: 'hidden' }}
                  >
                    <img
                      src={coverUrl}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      onError={(e) => {
                        e.currentTarget.src = '/mainhero1.png';
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        background: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(8px)',
                        color: '#ffffff',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {post.category || 'Industry Insights'}
                    </span>
                  </Link>

                  {/* Card Content */}
                  <div
                    style={{
                      padding: '22px',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      {/* Meta info */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          fontSize: '0.78rem',
                          color: '#64748b',
                          marginBottom: '10px',
                        }}
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={13} />
                          {postDate}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={13} />
                          {post.readTime || '5 min read'}
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        style={{
                          fontSize: '1.18rem',
                          fontWeight: 700,
                          lineHeight: 1.4,
                          marginBottom: '10px',
                          color: 'var(--text-main, #0f172a)',
                        }}
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          style={{
                            color: 'inherit',
                            textDecoration: 'none',
                          }}
                        >
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      <p
                        style={{
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary, #475569)',
                          lineHeight: 1.6,
                          marginBottom: '18px',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Author & Read More Footer */}
                    <div
                      style={{
                        borderTop: '1px solid var(--border-light, #f1f5f9)',
                        paddingTop: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: '#e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                          }}
                        >
                          <img
                            src="/heroman.jpeg"
                            alt="Author"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
                          {post.author || 'Nova Media Team'}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: 'var(--brand-red, #e51b24)',
                          textDecoration: 'none',
                        }}
                      >
                        Read Guide <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* STRATEGIC CTA BANNER */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <h3 className="cta-banner-title">
                Planning an Outdoor Campaign Across Kerala?
              </h3>
              <p className="cta-banner-subtitle">
                Nova Innovations manages 500+ prime highway hoardings, bus transit fleets, and city center gantries. Get real-time rate cards and site availability within 15 minutes.
              </p>
            </div>
            <div className="cta-actions">
              <a
                href="https://wa.me/919539000640?text=Hi%20Nova%20Innovations%2C%20I%20read%20your%20OOH%20media%20guide%20and%20would%20like%20to%20inquire%20about%20billboard%20availability%20in%20Kerala."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-white"
              >
                Direct WhatsApp Booking
              </a>
              <Link href="/contact" className="btn-pill-dark" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                Contact Media Desk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
