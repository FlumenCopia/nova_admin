'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, Monitor } from 'lucide-react';
import { fetchApi } from '../../lib/api';

export default function ServicesPage() {
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDynamicServices() {
      try {
        const json = await fetchApi('/public/services');
        if (json && json.success && Array.isArray(json.data)) {
          const mapped = json.data.map((s, idx) => ({
            id: s.id || `api-srv-${idx}`,
            title: s.title,
            subtitle: s.subtitle,
            desc: s.description,
            detailDesc: s.description,
            features: Array.isArray(s.features) ? s.features : [],
          }));
          setServicesList(mapped);
        } else {
          setServicesList([]);
        }
      } catch (err) {
        console.error('Failed to load services:', err);
        setServicesList([]);
      } finally {
        setLoading(false);
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
              <Check size={14} strokeWidth={2.5} />
              Highway Unipoles & Billboards
            </span>
            <span className="hero-pill-badge">
              <Check size={14} strokeWidth={2.5} />
              KSRTC & Bus Fleet Wraps
            </span>
            <span className="hero-pill-badge">
              <Check size={14} strokeWidth={2.5} />
              Digital Flex & Offset Print
            </span>
          </div>
        </div>
      </section>

      {/* SERVICES CARDS GRID */}
      <section className="services-grid-section">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              Loading services...
            </div>
          ) : servicesList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              No services currently available.
            </div>
          ) : (
            <div className="services-cards-grid">
              {servicesList.map((s) => (
                <div key={s.id} className="service-card">
                  <div className="service-card-icon">
                    <Monitor size={28} strokeWidth={2} />
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
                        <Check size={14} strokeWidth={2.5} style={{ flexShrink: 0 }} />
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
          )}
        </div>
      </section>
    </>
  );
}
