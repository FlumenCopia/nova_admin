'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer({ onShowToast }) {
  const [newsletterInput, setNewsletterInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterInput) return;
    setIsSubmitting(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await fetch(`${apiBase}/public/enquiries`, {
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
            <p className="footer-newsletter-text" style={{ lineHeight: '1.6', marginBottom: '12px' }}>
              <strong>Head Office:</strong> T.C 26/929(2), C.K. Tower, Panavila Jn., Thiruvananthapuram - 695001<br />
              <strong>Phone:</strong> +91 95390 00640, 95263 64446<br />
              <strong>Email:</strong> novainnovations2020@gmail.com
            </p>
            <form className="newsletter-form" id="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="text"
                className="newsletter-input"
                placeholder="Your Phone or Email..."
                required
                value={newsletterInput}
                onChange={(e) => setNewsletterInput(e.target.value)}
              />
              <button type="submit" className="newsletter-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Request Call'}
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p>&copy; 2026 NOVA Innovations (Outdoors • Design Studio • Events). All Rights Reserved. www.novainnovations.in</p>
          <div className="footer-bottom-links">
            <a href="tel:+919539000640" className="footer-link">+91 9539000640</a>
            <a href="mailto:novainnovations2020@gmail.com" className="footer-link">novainnovations2020@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
