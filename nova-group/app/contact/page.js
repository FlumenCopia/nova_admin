'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FaqAccordion from '../../components/FaqAccordion';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Outdoor Hoardings');
  const [availableServices, setAvailableServices] = useState([
    'Outdoor Hoardings',
    'Vehicle & Transit Advertising',
    'Shop & Retail Facade Branding',
    'Event Branding & Exhibition Setup',
    'Commercial Wall Painting',
    'Design Studio & Flex Printing',
  ]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadDynamicServices() {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiBase}/public/services`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            const list = json.data.map((s) => s.title);
            setAvailableServices(list);
            if (list.length > 0) setService(list[0]);
          }
        }
      } catch (err) {
        console.error('Fetch contact services error:', err);
      }
    }
    loadDynamicServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await fetch(`${apiBase}/public/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          serviceType: service,
          notes: message,
          source: 'Contact Page Campaign Brief',
        }),
      });

      setName('');
      setCompany('');
      setEmail('');
      setPhone('');
      setMessage('');
      if (typeof window !== 'undefined') {
        const toast = document.getElementById('toast-notification');
        const toastMsg = document.getElementById('toast-message');
        if (toastMsg) toastMsg.textContent = 'Thank you! Your campaign brief has been received. Nova Innovations will contact you shortly.';
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 4000);
        }
      }
    } catch (error) {
      console.error('Contact submit error:', error);
      if (typeof window !== 'undefined') {
        const toast = document.getElementById('toast-notification');
        const toastMsg = document.getElementById('toast-message');
        if (toastMsg) toastMsg.textContent = 'Thank you! Your inquiry has been received.';
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 4000);
        }
      }
    } finally {
      setIsSubmitting(false);
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
            <span className="current">Contact</span>
          </nav>
          <span className="page-hero-tag">
            Direct Media Desk & Offices
          </span>
          <h1 className="heading-lg">Let's Connect & <span>Plan Your Campaign</span></h1>
          <p className="subheading">Speak directly with our media planners to reserve vacant prime hoardings, discuss transit bus branding, or coordinate an overnight statewide launch with Director Gireesh.</p>
          <div className="page-hero-badges">
            <span className="hero-pill-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Trivandrum Panavila HQ & Vazhuthacaud
            </span>
            <span className="hero-pill-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Direct: +91 95390 00640
            </span>
            <span className="hero-pill-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Immediate Site Reservation Desk
            </span>
          </div>
        </div>
      </section>

      {/* CONTACT LAYOUT */}
      <section className="container">
        <div className="contact-layout-grid">
          <div className="contact-info-cards-stack">
            <div className="contact-info-card">
              <div className="contact-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="contact-card-title">Registered Head Office</h3>
                <p className="contact-card-text">
                  T.C 26/929(2), C.K. Tower, Panavila Junction,<br />
                  Thiruvananthapuram, Kerala - 695001
                </p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="contact-card-title">City Office</h3>
                <p className="contact-card-text">
                  T.C. 29/314, S J Tower, MP Appan Road,<br />
                  (Opp. Kerala Hindi Pracharsabha), Vazhuthacaud, Trivandrum - 695014
                </p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <h3 className="contact-card-title">Direct Contact Numbers</h3>
                <p className="contact-card-text">
                  <strong>Director (Gireesh):</strong> +91 95390 00640, 95263 64446<br />
                  <strong>Office Desk:</strong> +91 95676 90518, 93878 15404
                </p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="contact-card-title">Email & Official Portal</h3>
                <p className="contact-card-text">
                  Email: novainnovations2020@gmail.com<br />
                  Website: www.novainnovations.in
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <h2 className="heading-md" style={{ marginBottom: '8px' }}>Send Campaign Brief</h2>
            <p className="subheading" style={{ marginBottom: '24px' }}>Submit your advertising requirements. Our media planning team will provide available prime locations and rate estimates.</p>

            <form id="contact-page-form" onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Your Name / Contact Person *</label>
                  <input
                    type="text"
                    id="contact-name"
                    className="form-input"
                    placeholder="e.g. Rahul Sharma"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-company">Brand / Company Name</label>
                  <input
                    type="text"
                    id="contact-company"
                    className="form-input"
                    placeholder="e.g. myG, Nexus Retail"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email Address *</label>
                  <input
                    type="email"
                    id="contact-email"
                    className="form-input"
                    placeholder="brand@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-phone">Phone / Mobile *</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    className="form-input"
                    placeholder="+91 95390 00000"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-type">Advertising Service Required</label>
                <select
                  id="contact-type"
                  className="form-select"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  {availableServices.map((srvTitle) => (
                    <option key={srvTitle} value={srvTitle}>
                      {srvTitle}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Target Districts & Campaign Details</label>
                <textarea
                  id="contact-message"
                  className="form-textarea"
                  placeholder="Specify preferred cities (e.g. Trivandrum, Cochin, Kollam, Palakkad, Kozhikode), expected start date, duration..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn-form-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit Campaign Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* GOOGLE MAP SECTION */}
      <section className="contact-map-section">
        <div className="container">
          <div style={{ marginBottom: '24px' }}>
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              Locate Our Offices
            </span>
            <h2 className="heading-md" style={{ marginTop: '4px' }}>Headquarters & Operations Hub</h2>
          </div>
          <div className="map-card-wrapper">
            <div className="map-overlay-badge">
              <h4>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Nova Innovations HQ
              </h4>
              <p>C.K. Tower, Panavila Junction & Vazhuthacaud, Thiruvananthapuram, Kerala 695001</p>
              <div className="map-overlay-actions">
                <a href="https://maps.google.com/?q=Panavila+Junction+Thiruvananthapuram+Kerala" target="_blank" rel="noopener noreferrer" className="map-action-btn primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                  </svg>
                  Get Directions
                </a>
                <a href="tel:+919539000640" className="map-action-btn secondary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Call Office
                </a>
              </div>
            </div>
            <iframe
              className="map-iframe"
              title="Nova Innovations Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.0125638210344!2d76.95016557588825!3d8.498144791543322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bba68903c737%3A0xe96c4b9b7d8d21c4!2sPanavila%20Junction%2C%20Thiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1709100000000!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <FaqAccordion />
    </>
  );
}
