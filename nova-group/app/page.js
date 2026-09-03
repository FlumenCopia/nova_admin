'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Check, Phone, MessageSquare, Palette, Printer, ShieldCheck, Monitor } from 'lucide-react';
import MarqueeLogos from '../components/MarqueeLogos';
import PortfolioSlider from '../components/PortfolioSlider';
import LeadershipSection from '../components/LeadershipSection';
import { servicesData as defaultServices } from '../data/servicesData';
import { fetchApi, getMediaUrl } from '../lib/api';

export default function HomePage() {
  const [services, setServices] = useState(defaultServices);
  const [heroData, setHeroData] = useState({
    bannerUrl: '/mainhero1.png',
    title: 'INNOVATIONS THAT\nHALLMARKS YOUR BRAND',
    subtitle: 'Outdoors • Design Studio • Events — Prime hoardings, branding & overnight campaign execution across Kerala.',
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [servicesRes, settingsRes] = await Promise.all([
          fetchApi('/public/services'),
          fetchApi('/public/settings'),
        ]);

        if (servicesRes && servicesRes.success && Array.isArray(servicesRes.data) && servicesRes.data.length > 0) {
          const mapped = servicesRes.data.map((s, idx) => ({
            id: s.id || `srv-${idx}`,
            title: s.title,
            desc: s.description,
            features: Array.isArray(s.features) ? s.features : [],
          }));
          setServices(mapped);
        }

        if (settingsRes && settingsRes.success && settingsRes.data) {
          setHeroData({
            bannerUrl: settingsRes.data.heroBannerUrl || '/mainhero1.png',
            title: settingsRes.data.heroTitle || 'INNOVATIONS THAT\nHALLMARKS YOUR BRAND',
            subtitle: settingsRes.data.heroSubtitle || 'Outdoors • Design Studio • Events — Prime hoardings, branding & overnight campaign execution across Kerala.',
          });
        }
      } catch (err) {
        console.error('Failed to load home page data:', err);
      }
    }
    loadData();
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section hero-full-cover" id="hero">
        <div className="hero-banner">
          <img
            src={getMediaUrl(heroData.bannerUrl, '/mainhero1.png')}
            alt="Nova Innovations Advertising Billboard"
            className="hero-bg-img"
          />
          <div className="hero-overlay"></div>

          <div className="container hero-container">
            <div className="hero-content">
              <h1 className="hero-title" style={{ whiteSpace: 'pre-line' }}>
                {heroData.title}
              </h1>
              <p className="hero-description">{heroData.subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALITY HIGHLIGHT STRIP */}
      <div className="speciality-strip">
        <div className="container speciality-strip-container">
          <div className="speciality-strip-text-wrap">
            <Zap className="speciality-strip-icon" size={26} strokeWidth={2.2} color="#ffffff" fill="#ffffff" />
            <span className="speciality-strip-text">OUR SPECIALITY: We can advertise your business overnight all over Kerala.</span>
          </div>
          <a href="tel:+919539000640" className="speciality-strip-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Phone size={14} />
            Call: +91 9539000640
          </a>
        </div>
      </div>

      {/* ABOUT US SECTION */}
      <section className="about-section" id="about-us">
        <div className="container">
          <div className="about-grid">
            <div className="about-text-col">
              <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
                Welcome to Nova Innovations
              </span>
              <h2 className="heading-lg" style={{ marginTop: '6px' }}>27+ Years of Creative Advertising Excellence</h2>
              <p className="about-paragraph">
                We <strong>"Innovations"</strong> are the best innovative and creative advertising partner for the new era of hoarding advertisements in Kerala. We are deeply committed to taking each of our client firms to the next levels of business hierarchy.
              </p>
              <p className="about-paragraph" style={{ marginTop: '14px' }}>
                From customized graphic conceptualization in our design studio to high-visibility prime highway hoardings, bus fleet branding, shop signage, and end-to-end event production, we provide head-to-tail services with 100% structural protection.
              </p>
            </div>

            <div className="stats-grid" id="stats-counter">
              <div className="stat-item">
                <span className="stat-number">27+</span>
                <span className="stat-label">Years of Industry Excellence</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Prime Hoarding Locations in Kerala</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Successful Brand Campaigns</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">14</span>
                <span className="stat-label">Districts Covered Overnight</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER MARQUEE */}
      <MarqueeLogos />

      {/* FEATURED PORTFOLIO SLIDER */}
      <PortfolioSlider />

      {/* SERVICES OVERVIEW */}
      <section className="services-overview-section" style={{ padding: '90px 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 60px' }}>
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              What We Offer
            </span>
            <h2 className="heading-lg" style={{ marginTop: '4px' }}>Comprehensive Advertising Services</h2>
            <p className="subheading">End-to-end outdoor advertising, design studio creations, and corporate events tailored for maximum audience impact.</p>
          </div>

          <div className="services-cards-grid" style={{ marginBottom: 0 }}>
            {services.map((s) => (
              <div key={s.id} className="service-card">
                <div className="service-card-icon">
                  <Monitor size={28} strokeWidth={2} />
                </div>
                <h3 className="service-card-title">{s.title}</h3>
                <p className="service-card-desc">{s.desc}</p>
                <div className="service-features-list">
                  {s.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="service-feature-item">
                      <Check size={14} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="how-we-work-section" id="how-we-work">
        <div className="container">
          <div className="how-we-work-header">
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              Seamless Process
            </span>
            <h2 className="heading-lg" style={{ marginTop: '4px' }}>How We Execute Your Campaigns</h2>
            <p className="subheading">From idea conceptualization in our design studio to overnight hoardings mounting across Kerala</p>
          </div>

          <div className="how-we-work-grid">
            <div className="work-feature-visual">
              <img src="/image/other media3.webp" alt="Nova Innovations Hoarding Work" className="work-visual-img" />
            </div>

            <div className="work-steps-list">
              <div className="work-step-row">
                <div className="work-step-icon">
                  <MessageSquare size={22} strokeWidth={2} />
                </div>
                <div className="work-step-body">
                  <h4 className="work-step-title">1. Needs Analysis & Site Selection</h4>
                  <p className="work-step-desc">We identify your target audience and recommend the highest footfall vacant hoardings & transit media locations across Kerala.</p>
                </div>
              </div>

              <div className="work-step-row">
                <div className="work-step-icon">
                  <Palette size={22} strokeWidth={2} />
                </div>
                <div className="work-step-body">
                  <h4 className="work-step-title">2. Creative Studio Design</h4>
                  <p className="work-step-desc">Our design studio crafts high-impact visual artwork that hallmarks into your customer's mind with unforgettable recall.</p>
                </div>
              </div>

              <div className="work-step-row">
                <div className="work-step-icon">
                  <Printer size={22} strokeWidth={2} />
                </div>
                <div className="work-step-body">
                  <h4 className="work-step-title">3. High-Definition Flex Printing</h4>
                  <p className="work-step-desc">State-of-the-art digital flex printing using industrial-grade materials ensuring UV-resistant, vibrant color longevity.</p>
                </div>
              </div>

              <div className="work-step-row">
                <div className="work-step-icon">
                  <Zap size={22} strokeWidth={2} />
                </div>
                <div className="work-step-body">
                  <h4 className="work-step-title">4. Overnight Pan-Kerala Installation</h4>
                  <p className="work-step-desc">Our professional mounting teams deploy your campaign overnight across multiple districts simultaneously.</p>
                </div>
              </div>

              <div className="work-step-row">
                <div className="work-step-icon">
                  <ShieldCheck size={22} strokeWidth={2} />
                </div>
                <div className="work-step-body">
                  <h4 className="work-step-title">5. 24/7 Monitoring & Protection</h4>
                  <p className="work-step-desc">Continuous site maintenance, illumination checks, and protection throughout your campaign lifecycle.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP SECTION */}
      <LeadershipSection />

      {/* CTA BANNER */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <h3 className="cta-banner-title">Ready to Hallmark Your Brand into Customers' Minds?</h3>
              <p className="cta-banner-subtitle">Get in touch today for prime vacant hoardings, statewide bus branding, and custom advertising packages across Kerala.</p>
            </div>
            <div className="cta-actions">
              <a href="tel:+919539000640" className="btn-pill-white">Call: 9539000640</a>
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
