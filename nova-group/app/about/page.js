'use client';

import Link from 'next/link';
import { Check, Phone } from 'lucide-react';
import LeadershipSection from '../../components/LeadershipSection';

export default function AboutPage() {
  return (
    <>
      {/* SUBPAGE HERO */}
      <section className="page-hero">
        <div className="container page-hero-container">
          <nav className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="current">About Us</span>
          </nav>
          <span className="page-hero-tag">
            27+ Years of Heritage & Vision
          </span>
          <h1 className="heading-lg">About <span>NOVA Innovations</span></h1>
          <p className="subheading">Kerala's premier outdoor advertising powerhouse — pioneering high-impact highway hoardings, creative design studio excellence, and memorable corporate brand activations since 1997.</p>
          <div className="page-hero-badges">
            <span className="hero-pill-badge">
              <Check size={14} strokeWidth={2.5} />
              Est. 1997 • 27+ Years in Kerala
            </span>
            <span className="hero-pill-badge">
              <Check size={14} strokeWidth={2.5} />
              500+ Prime Hoardings
            </span>
            <span className="hero-pill-badge">
              <Check size={14} strokeWidth={2.5} />
              Overnight Statewide Deployment
            </span>
          </div>
        </div>
      </section>

      {/* STORY & STATS SECTION */}
      <section className="container" style={{ marginBottom: '70px' }}>
        <div className="about-hero-grid">
          <div>
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>Innovations That Mesmerise</span>
            <h2 className="heading-lg" style={{ margin: '6px 0 20px' }}>Transforming Brand Visions into Captivating Realities</h2>
            <p className="about-paragraph" style={{ marginBottom: '16px' }}>
              We <strong>"Innovations"</strong> are the best innovative and creative advertising option for the new era of hoarding advertisements. We are very much responsible to each and every client firm to take them to the next levels of business hierarchy.
            </p>
            <p className="about-paragraph" style={{ marginBottom: '28px' }}>
              As our name suggests, we focus on the creation, development, and implementation of high-visibility visual projections. Irrespective of the industrial sector, we are the trusted business partner for leading brands like <strong>myG</strong>, corporate giants, and retail chains across all 14 districts in Kerala.
            </p>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">27+</span>
                <span className="stat-label">Years of Industry Leadership</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Prime Hoardings Network</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Successful Brand Campaigns</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">Overnight</span>
                <span className="stat-label">Statewide Deployment</span>
              </div>
            </div>
          </div>

          <div className="about-hero-media">
            <img src="/image/adoor myg.webp" alt="Nova Innovations Hoarding Billboard" />
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="timeline-section" style={{ background: 'var(--bg-secondary)', padding: '70px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 50px' }}>
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>Core Capabilities</span>
            <h2 className="heading-lg" style={{ marginTop: '4px' }}>Outdoors • Design Studio • Events</h2>
            <p className="subheading">Three synergistic divisions delivering complete 360-degree brand visibility.</p>
          </div>

          <div className="timeline-track">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-year">1. OUTDOORS — Prime Hoardings & Transit Media</div>
                <p className="subheading" style={{ fontSize: '0.95rem' }}>Commanding the highest-traffic junctions, national highway corridors, and bypasses across Trivandrum, Cochin, Kollam, Palakkad, Kozhikode, and beyond with unipoles, cantilever billboards, and bus fleet wraps.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-year">2. DESIGN STUDIO — Visual Identity & Flex Printing</div>
                <p className="subheading" style={{ fontSize: '0.95rem' }}>From conceptualizing iconic campaign artwork that hallmarks into customers' minds to high-definition industrial flex and offset printing for bulk posters, brochures, catalogs, and promotional media.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-year">3. EVENTS — Corporate Launches & Exhibition Stalls</div>
                <p className="subheading" style={{ fontSize: '0.95rem' }}>Turnkey brand activations, trade expo stalls, custom stage backdrops, kiosks, and promotional experiential spaces that forge deep personal connections with your consumers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP SPOTLIGHT SECTION */}
      <LeadershipSection />

      {/* CTA BANNER */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <h3 className="cta-banner-title">Amplify your brand presence across Kerala</h3>
              <p className="cta-banner-subtitle">Inquire today for vacant prime hoardings, rates, and turnkey outdoor media planning.</p>
            </div>
            <div className="cta-actions">
              <a href="tel:+919539000640" className="btn-pill-white" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={14} />
                Call: +91 9539000640
              </a>
              <Link href="/contact" className="btn-pill-dark" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>Contact Offices</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
