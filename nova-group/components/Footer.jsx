'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { fetchApi } from '../lib/api';

export default function Footer({ onShowToast }) {
  const [newsletterInput, setNewsletterInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState([]);
  const [settings, setSettings] = useState({
    primaryPhone: '+91 95390 00640',
    altPhone: '+91 95263 64446',
    contactEmail: 'novainnovations2020@gmail.com',
    hqAddress: 'T.C. 29/314, S J Tower, M P Appan Road, Vazhuthacaud - Poojappura Rd, P.O, Thycaud, Thiruvananthapuram, Kerala - 695014',
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [settingsRes, servicesRes] = await Promise.all([
          fetchApi('/public/settings'),
          fetchApi('/public/services'),
        ]);
        if (settingsRes && settingsRes.success && settingsRes.data) {
          setSettings((prev) => ({ ...prev, ...settingsRes.data }));
        }
        if (servicesRes && servicesRes.success && Array.isArray(servicesRes.data)) {
          setServices(servicesRes.data.filter((s) => s.isActive !== false));
        }
      } catch (err) {
        console.error('Failed to load dynamic footer data:', err);
      }
    }
    loadData();
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterInput) return;
    setIsSubmitting(true);

    try {
      await fetchApi('/public/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Quick Call Request',
          phone: newsletterInput,
          serviceType: 'Quick Call Back',
          notes: 'Submitted via Footer Quick Call Request',
          source: 'Footer Call Request',
        }),
      });

      setNewsletterInput('');
      if (onShowToast) {
        onShowToast('Thank you! Your call request has been received. Nova Innovations will contact you shortly.');
      }
    } catch (error) {
      console.error('Footer form submit error:', error);
      if (onShowToast) {
        onShowToast(`Could not submit request. Please dial ${settings.primaryPhone} directly.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <Link href="/" className="logo-brand">
              <img src="/logo.png" alt="Innovations" className="footer-brand-logo" />
            </Link>
            <p className="footer-about-text">
              <strong>NOVA INNOVATIONS</strong> — Outdoors • Design Studio • Events. Kerala&apos;s premier advertising agency with 27+ years of experience in outdoor hoardings, transit vehicle branding, retail signage, and corporate events.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><Link href="/" className="footer-link">Home</Link></li>
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/services" className="footer-link">Our Services</Link></li>
              <li><Link href="/gallery" className="footer-link">Campaign Gallery</Link></li>
              <li><Link href="/blog" className="footer-link">Blog & Insights</Link></li>
              <li><Link href="/contact" className="footer-link">Contact & Locations</Link></li>
              <li><Link href="/founder-of-nova" className="footer-link">Founder Spotlight</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Our Services</h4>
            <ul className="footer-links-list">
              {services.length > 0 ? (
                services.map((srv) => (
                  <li key={srv.id || srv._id || srv.title}>
                    <Link href={`/services`} className="footer-link">
                      {srv.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li><Link href="/services" className="footer-link">View All Services</Link></li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Contact Nova</h4>
            <div className="footer-newsletter-text" style={{ lineHeight: '1.6', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} style={{ flexShrink: 0, marginTop: '3px', color: 'var(--brand-red)' }} />
                <span>{settings.hqAddress}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} style={{ flexShrink: 0, color: 'var(--brand-red)' }} />
                <span>{settings.primaryPhone}{settings.altPhone ? `, ${settings.altPhone}` : ''}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} style={{ flexShrink: 0, color: 'var(--brand-red)' }} />
                <span>{settings.contactEmail}</span>
              </div>
            </div>
            <form className="newsletter-form" id="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="text"
                className="newsletter-input"
                placeholder="Your Phone or Email..."
                required
                value={newsletterInput}
                onChange={(e) => setNewsletterInput(e.target.value)}
              />
              <button type="submit" className="newsletter-btn" disabled={isSubmitting} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Send size={14} />
                {isSubmitting ? 'Sending...' : 'Request Call'}
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p>&copy; 2026 NOVA Innovations (Outdoors • Design Studio • Events). All Rights Reserved. www.novainnovations.in</p>
          <div className="footer-bottom-links">
            <Link href="/privacy" className="footer-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-link">
              Terms & Conditions
            </Link>
            <a href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`} className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={13} />
              {settings.primaryPhone}
            </a>
            <a href={`mailto:${settings.contactEmail}`} className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={13} />
              {settings.contactEmail}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
