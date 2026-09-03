'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { fetchApi } from '../lib/api';

export default function Footer({ onShowToast }) {
  const [newsletterInput, setNewsletterInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState({
    primaryPhone: '+91 95390 00640',
    altPhone: '+91 95263 64446',
    contactEmail: 'novainnovations2020@gmail.com',
    hqAddress: 'T.C 26/929(2), C.K. Tower, Panavila Jn., Thiruvananthapuram - 695001',
  });

  useEffect(() => {
    async function loadSettings() {
      const res = await fetchApi('/public/settings');
      if (res && res.success && res.data) {
        setSettings((prev) => ({ ...prev, ...res.data }));
      }
    }
    loadSettings();
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
      onShowToast('Thank you! Your call request has been received. Nova Innovations will contact you shortly.');
    } catch (error) {
      console.error('Footer form submit error:', error);
      onShowToast('Thank you! Your call request has been received.');
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
              <strong>NOVA INNOVATIONS</strong> — Outdoors • Design Studio • Events. Kerala's premier advertising agency with 27+ years of experience in outdoor hoardings, transit vehicle branding, retail signage, and corporate events.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><Link href="/" className="footer-link">Home</Link></li>
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/services" className="footer-link">Our Services</Link></li>
              <li><Link href="/gallery" className="footer-link">Campaign Gallery</Link></li>
              <li><Link href="/contact" className="footer-link">Contact & Locations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Our Services</h4>
            <ul className="footer-links-list">
              <li><Link href="/services" className="footer-link">Outdoor Hoardings (Billboards & Unipoles)</Link></li>
              <li><Link href="/services" className="footer-link">Vehicle & KSRTC Bus Advertising</Link></li>
              <li><Link href="/services" className="footer-link">Shop & Showroom Branding</Link></li>
              <li><Link href="/services" className="footer-link">Event Branding & Exhibition Stalls</Link></li>
              <li><Link href="/services" className="footer-link">Commercial Wall Paintings</Link></li>
              <li><Link href="/services" className="footer-link">Design Studio & Flex Printing</Link></li>
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
