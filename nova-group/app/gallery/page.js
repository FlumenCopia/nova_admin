'use client';

import Link from 'next/link';
import GalleryGrid from '../../components/GalleryGrid';

export default function GalleryPage() {
  const handleOpenModal = (serviceName) => {
    if (typeof window !== 'undefined') {
      const btn = document.getElementById('btn-request-consultation');
      if (btn) btn.click();
    }
  };

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container page-hero-container">
          <nav className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="current">Campaign Gallery</span>
          </nav>
          <span className="page-hero-tag">
            Executed Campaigns & Vacant Hoardings
          </span>
          <h1 className="heading-lg">Campaign Gallery & <span>Prime Hoardings</span></h1>
          <p className="subheading">Explore real-world outdoor media executions across Kerala — featuring myG highway billboards, pan-Kerala transit bus fleets, town center gantries, and available vacant sites.</p>
          <div className="page-hero-badges">
            <span className="hero-pill-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              myG Statewide Portfolio
            </span>
            <span className="hero-pill-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              NH 66 & Highway Corridors
            </span>
            <span className="hero-pill-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Vacant Hoardings Ready to Book
            </span>
          </div>
        </div>
      </section>

      {/* CATALOG FILTER & LISTINGS */}
      <section className="container" style={{ marginBottom: '70px' }}>
        <GalleryGrid onOpenModal={handleOpenModal} />
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <h3 className="cta-banner-title">Need a specific district or vacant hoarding list?</h3>
              <p className="cta-banner-subtitle">We have over 500+ prime outdoor locations across Trivandrum, Cochin, Kollam, Palakkad, Kozhikode, and Pathanamthitta.</p>
            </div>
            <div className="cta-actions">
              <a href="tel:+919539000640" className="btn-pill-white">Call: +91 9539000640</a>
              <Link href="/contact" className="btn-pill-dark" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                Contact Offices
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
