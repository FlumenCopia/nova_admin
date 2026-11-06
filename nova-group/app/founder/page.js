'use client';

import Link from 'next/link';
import { Phone, Mail, Award, Trophy, Users, ShieldCheck, ArrowRight, ExternalLink, MapPin, CheckCircle2 } from 'lucide-react';
import LeadershipSection from '../../components/LeadershipSection';
import AnimatedStatNumber from '../../components/AnimatedStatNumber';

export default function FounderPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container page-hero-container">
          <nav className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="current">Founder</span>
          </nav>
          <span className="page-hero-tag">
            Executive Leadership & Vision
          </span>
          <h1 className="heading-lg">Founder & <span>Director Profile</span></h1>
          <p className="subheading">
            Meet Gireesh Kumar S — Founder, Director & CEO of Nova Innovations. 27+ years pioneering outdoor hoardings, highway media corridors, transit fleets, and brand hallmarks across Kerala.
          </p>
          <div className="page-hero-badges">
            <span className="hero-pill-badge">
              <Award size={14} strokeWidth={2.5} />
              27+ Years Leadership
            </span>
            <span className="hero-pill-badge">
              <ShieldCheck size={14} strokeWidth={2.5} />
              500+ Prime Media Assets
            </span>
            <span className="hero-pill-badge">
              <Trophy size={14} strokeWidth={2.5} />
              Trusted Partner to Major Brands
            </span>
          </div>
        </div>
      </section>

      {/* DYNAMIC LEADERSHIP SECTION FROM BACKEND */}
      <LeadershipSection />

      {/* EXECUTIVE VISION & STATS */}
      <section className="container" style={{ margin: '60px auto' }}>
        <div className="about-hero-grid">
          <div>
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              Director's Vision
            </span>
            <h2 className="heading-lg" style={{ margin: '6px 0 20px' }}>
              Building Kerala's Most Reliable Overnight Advertising Engine
            </h2>
            <p className="about-paragraph" style={{ marginBottom: '16px' }}>
              &ldquo;Our mission is to hallmark your brand into every customer&apos;s mind with prime locations, structural perfection, and instant overnight deployment. Irrespective of the industrial sector, we provide head-to-tail advertising execution backed by comprehensive structural safety.&rdquo;
            </p>
            <p className="about-paragraph" style={{ marginBottom: '28px' }}>
              Under Gireesh Kumar S&apos;s stewardship, Nova Innovations has transformed from local billboard operations into a pan-Kerala advertising titan managing high-density arterial highway corridors (NH 66, NH 544), statewide KSRTC fleet wrap contracts, and mega retail brand launches.
            </p>

            <div className="stats-grid">
              <div className="stat-item">
                <AnimatedStatNumber value="27+" />
                <span className="stat-label">Years of Industry Leadership</span>
              </div>
              <div className="stat-item">
                <AnimatedStatNumber value="500+" />
                <span className="stat-label">Prime Hoarding Corridors</span>
              </div>
              <div className="stat-item">
                <AnimatedStatNumber value="1000+" />
                <span className="stat-label">Campaigns Executed</span>
              </div>
              <div className="stat-item">
                <AnimatedStatNumber value="14" />
                <span className="stat-label">Districts Overnight Coverage</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
            <div className="card" style={{ padding: '32px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--brand-red-light)', color: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Trophy size={24} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Visionary Direction</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pioneering New OOH Standards</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Spearheading 24/7 overnight advertising mounting across all 14 districts in Kerala with dedicated fabrication, mounting, and structural engineering crews.
              </p>
            </div>

            <div className="card" style={{ padding: '32px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--brand-green-light)', color: 'var(--brand-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={24} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Enterprise Relationships</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Decades of Corporate Trust</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Trusted primary advertising partner to marquee brands including myG, Bhima Jewellery, Pothys, KSRTC, Bank of Baroda, and healthcare institutions across South India.
              </p>
            </div>

            {/* EXTERNAL STANDALONE PORTFOLIO LINK */}
            <div className="card" style={{ padding: '24px 32px', background: '#0F172A', color: '#FFFFFF', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: '#38BDF8', textTransform: 'uppercase' }}>
                    Interactive Portfolio
                  </span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                    Explore Standalone Founder Showcase
                  </h4>
                </div>
                <a
                  href="https://portfolio-founder-of-nova.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-white"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', padding: '10px 20px' }}
                >
                  Open Portfolio <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECT FOUNDER CONTACT & CONSULTATION */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)' }}>
                Direct Founder Consultation
              </span>
              <h3 className="cta-banner-title">Schedule a Strategic Media Meeting</h3>
              <p className="cta-banner-subtitle">
                Discuss prime highway hoarding acquisitions, statewide bus branding packages, or large-scale retail launches directly with Founder Gireesh Kumar S.
              </p>
            </div>
            <div className="cta-actions">
              <a href="tel:+919539000640" className="btn-pill-white" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} /> Call: +91 95390 00640
              </a>
              <a
                href="https://wa.me/919539000640"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-dark"
                style={{ border: '1px solid rgba(255,255,255,0.3)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                Chat on WhatsApp <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

