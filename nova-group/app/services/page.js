'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BudgetCalculator from '../../components/BudgetCalculator';
import { servicesData as defaultServices } from '../../data/servicesData';
import { fetchApi } from '../../lib/api';

export default function ServicesPage() {
  const [servicesList, setServicesList] = useState(defaultServices);

  useEffect(() => {
    async function fetchDynamicServices() {
      try {
        const json = await fetchApi('/public/services');
        if (json && json.success && json.data && json.data.length > 0) {
          const mapped = json.data.map((s, idx) => ({
            id: s.id || `api-srv-${idx}`,
            title: s.title,
            subtitle: s.subtitle,
            desc: s.description,
            detailDesc: s.description,
            features: Array.isArray(s.features) ? s.features : [],
          }));
          setServicesList(mapped);
        }
      } catch (err) {
        // Fall back to default local data
      }
    }
    fetchDynamicServices();
  }, []);

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container page-hero-container">
          <nav className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="current">Services</span>
          </nav>
          <span className="page-hero-tag">
            Full-Spectrum Advertising Solutions
          </span>
          <h1 className="heading-lg">Comprehensive <span>Advertising Services</span></h1>
          <p className="subheading">End-to-end highway hoardings, KSRTC transit wraps, shop branding, exhibition stall architecture, and industrial large format flex printing across Kerala.</p>
          <div className="page-hero-badges">
            <span className="hero-pill-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Highway Unipoles & Billboards
            </span>
            <span className="hero-pill-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              KSRTC & Bus Fleet Wraps
            </span>
            <span className="hero-pill-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Digital Flex & Offset Print
            </span>
          </div>
        </div>
      </section>

      {/* SERVICES CARDS GRID */}
      <section className="services-grid-section">
        <div className="container">
          <div className="services-cards-grid">
            {servicesList.map((s) => (
              <div key={s.id} className="service-card">
                <div className="service-card-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3 className="service-card-title">{s.title}</h3>
                {s.subtitle && (
                  <div style={{ fontSize: '0.84rem', color: 'var(--brand-red)', fontWeight: 600, marginBottom: '8px' }}>
                    {s.subtitle}
                  </div>
                )}
                <p className="service-card-desc">{s.detailDesc || s.desc}</p>
                <div className="service-features-list">
                  {s.features.map((feat, idx) => (
                    <div key={idx} className="service-feature-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                  <Link href="/contact" className="btn-card-action primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                    Request Rate Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUDGET ESTIMATOR CALCULATOR */}
      <section className="calculator-section" id="budget-estimator">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              Transparent Cost Estimator
            </span>
            <h2 className="heading-md" style={{ marginTop: '4px' }}>Estimate Your Campaign Investment</h2>
            <p className="subheading" style={{ maxWidth: '600px', margin: '8px auto 0' }}>
              Select target districts, hoarding formats, and campaign duration to instantly estimate media reach and budget.
            </p>
          </div>
          <BudgetCalculator />
        </div>
      </section>
    </>
  );
}
