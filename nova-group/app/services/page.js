'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Check, 
  Monitor, 
  MapPin, 
  Bus, 
  Building, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Palette, 
  Printer, 
  Navigation,
  Wrench,
  Clock,
  Truck,
  Phone
} from 'lucide-react';
import FaqAccordion from '../../components/FaqAccordion';
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
        console.error('Failed to load dynamic services:', err);
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
            Turnkey A-to-Z Outdoor Media Infrastructure
          </span>
          <h1 className="heading-lg">A-to-Z <span>Advertising Services</span></h1>
          <p className="subheading">
            Not just a design studio — Nova Innovations plans, hosts, designs, prints, physically places with heavy cranes, and maintains 500+ prime highway billboards and transit fleets across Kerala and TVM.
          </p>
          <div className="page-hero-badges">
            <span className="hero-pill-badge">
              <Check size={14} strokeWidth={2.5} />
              500+ Prime Hosted Sites
            </span>
            <span className="hero-pill-badge">
              <Check size={14} strokeWidth={2.5} />
              Physical Placement &amp; Heavy Cranes
            </span>
            <span className="hero-pill-badge">
              <Check size={14} strokeWidth={2.5} />
              24/7 Lighting &amp; Structural Maintenance
            </span>
          </div>
        </div>
      </section>

      {/* A-TO-Z TURNKEY LIFECYCLE STRIP */}
      <section style={{ padding: '60px 0', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.82rem', letterSpacing: '0.08em' }}>
              Head-to-Tail Execution Model
            </span>
            <h2 className="heading-lg" style={{ marginTop: '6px' }}>
              The 6 Stages of Nova Innovations' Turnkey Delivery
            </h2>
            <p className="subheading" style={{ margin: '8px auto 0' }}>
              We eliminate third-party delays and broker fees by controlling every single phase from media planning to physical maintenance.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'var(--card-bg, #ffffff)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(230,57,70,0.1)', color: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Navigation size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Phase 01</div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>1. Strategic Media Planning</h4>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Footfall density and traffic bottleneck analysis mapping target audiences across Kerala highways and city hotspots for optimal campaign ROI.
              </p>
            </div>

            <div style={{ background: 'var(--card-bg, #ffffff)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(230,57,70,0.1)', color: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Phase 02</div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>2. Direct Space Hosting</h4>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Exclusive rights to 500+ prime highway unipoles, town center cantilever structures, and commercial rooftop hoardings across TVM and 14 districts.
              </p>
            </div>

            <div style={{ background: 'var(--card-bg, #ffffff)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(230,57,70,0.1)', color: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Palette size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Phase 03</div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>3. Creative Studio Design</h4>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                High-recall visual art direction, Malayalam &amp; English typography, and realistic 3D billboard simulations tailored for high-speed vehicular viewers.
              </p>
            </div>

            <div style={{ background: 'var(--card-bg, #ffffff)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(230,57,70,0.1)', color: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Printer size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Phase 04</div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>4. Industrial Large-Format Print</h4>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Heavy-gauge solvent, eco-solvent, and star flex printing with UV-resistant coatings engineered to withstand intense tropical sun and Kerala monsoons.
              </p>
            </div>

            <div style={{ background: 'var(--card-bg, #ffffff)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(230,57,70,0.1)', color: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Truck size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Phase 05</div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>5. Overnight Physical Placement</h4>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Certified crane operators, structural steel riggers, and night-shift crews deploying statewide campaigns simultaneously overnight across 14 districts.
              </p>
            </div>

            <div style={{ background: 'var(--card-bg, #ffffff)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(230,57,70,0.1)', color: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Wrench size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Phase 06</div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>6. 24/7 Maintenance &amp; Lighting</h4>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Nightly illumination audits, immediate storm vinyl re-mounting, structural reinforcement, and ongoing municipal compliance checks year-round.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC SERVICES FROM CMS */}
      <section className="services-grid-section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 50px' }}>
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              Live Dynamic Catalog
            </span>
            <h2 className="heading-lg" style={{ marginTop: '4px' }}>Our Core Service Divisions</h2>
            <p className="subheading">Directly managed capabilities tailored for retail brands, corporate enterprises, and public transit campaigns.</p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              Loading dynamic services...
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

      {/* TRIVANDRUM & KERALA PRIME CORRIDORS AUTHORITY */}
      <section style={{ padding: '70px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.82rem', letterSpacing: '0.08em' }}>
              Strategic Geographic Footprint
            </span>
            <h2 className="heading-lg" style={{ marginTop: '6px' }}>
              Prime Corridors Hosted in Trivandrum (TVM) &amp; Across Kerala
            </h2>
            <p className="subheading" style={{ margin: '8px auto 0' }}>
              We command the highest-traffic arterial roads, National Highway junctions, and transit terminals.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'var(--card-bg, #ffffff)', padding: '28px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <MapPin size={22} style={{ color: 'var(--brand-red)' }} />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Trivandrum (TVM) Prime Sites</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
                Commanding daily commuter eyeballs across the IT capital and commercial avenues of Thiruvananthapuram:
              </p>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.88rem', color: 'var(--text-color)', lineHeight: '1.8' }}>
                <li><strong>Technopark Bypass &amp; Kazhakkoottam:</strong> Massive tech workforce visibility along NH 66.</li>
                <li><strong>Kowdiar Avenue &amp; Vellayambalam:</strong> Elite residential and diplomatic corridor.</li>
                <li><strong>MG Road (Palayam, Statue, Overbridge):</strong> The central commercial retail heart of TVM.</li>
                <li><strong>Bakery Junction &amp; Panavila:</strong> Critical bottleneck connecting East Fort and Secretariat.</li>
                <li><strong>Vizhinjam Seaport NH 66 Corridor:</strong> Heavy logistics and future growth arterial route.</li>
              </ul>
            </div>

            <div style={{ background: 'var(--card-bg, #ffffff)', padding: '28px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Bus size={22} style={{ color: 'var(--brand-red)' }} />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Vehicle &amp; Transit Fleet Coverage</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
                Non-stop moving advertisements reaching deep into rural towns, city junctions, and highway toll gates:
              </p>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.88rem', color: 'var(--text-color)', lineHeight: '1.8' }}>
                <li><strong>KSRTC Bus Full Wraps:</strong> Super Fast, Fast Passenger, and City Circular routes.</li>
                <li><strong>Back Glass &amp; Side Panels:</strong> High-recall commuter eye-level impressions in heavy traffic.</li>
                <li><strong>Auto-Rickshaw Hoods:</strong> Hyper-local neighborhood penetration in every major town.</li>
                <li><strong>Mobile LED Sound Vans:</strong> Interactive promotional vehicles with custom PA sound systems.</li>
                <li><strong>Complete RTO Clearance:</strong> Zero legal hassle — fully permitted and maintained transit media.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <FaqAccordion />

      {/* CTA BANNER */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <h3 className="cta-banner-title">Ready to launch your high-impact campaign across Kerala?</h3>
              <p className="cta-banner-subtitle">
                Contact our Trivandrum head office for vacant billboard lists, transit rates, and turnkey execution.
              </p>
            </div>
            <div className="cta-actions">
              <a href="tel:+919539000640" className="btn-pill-white" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={14} />
                Call: +91 9539000640
              </a>
              <Link href="/contact" className="btn-pill-dark" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                Request Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
