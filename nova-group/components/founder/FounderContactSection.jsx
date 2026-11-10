'use client';

import { useState } from 'react';
import { getApiBase } from '../../lib/api';

export default function FounderContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Outdoor Hoardings',
    message: '',
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      const res = await fetch(`${getApiBase()}/public/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: 'Outdoor Hoardings',
          message: '',
        });
      } else {
        setStatus({ loading: false, success: false, error: data.message || 'Submission failed' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Network error. Please call +91 95390 00640' });
    }
  };

  return (
    <section className="contact-section" id="contact" style={{ padding: '60px 0' }}>
      <div className="contact-header">
        <div className="dual-dots-badge">
          <span className="dot dot-red"></span>
          <span className="dot dot-red"></span>
        </div>
        <span className="contact-subhead">DIRECT MEDIA INQUIRIES</span>
        <h2 className="contact-title">Let&apos;s Hallmark Your Brand Across Kerala</h2>
        <p className="contact-desc">
          Get in touch directly with Gireesh Kumar S (Director / CEO) and our media planning team for prime highway
          hoardings, KSRTC bus wraps, and retail facade campaigns.
        </p>
      </div>

      <div className="contact-grid">
        {/* Left Column: Official Contact Info Cards */}
        <div className="contact-info-column">
          {/* Info Card 1: Head Office */}
          <div className="contact-card">
            <div className="contact-card-icon">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="contact-card-details">
              <span className="contact-label">HEAD OFFICE &amp; DESIGN STUDIO</span>
              <h4 className="contact-val-title">Nova Innovations</h4>
              <p className="contact-val-text">
                T.C 26/929(2), C.K. Tower, Panavila Junction, Thiruvananthapuram, Kerala - 695001
              </p>
            </div>
          </div>

          {/* Info Card 2: Phone & WhatsApp */}
          <div className="contact-card">
            <div className="contact-card-icon">
              <i className="fa-solid fa-phone-volume"></i>
            </div>
            <div className="contact-card-details">
              <span className="contact-label">DIRECT PHONE &amp; WHATSAPP</span>
              <h4 className="contact-val-title">+91 95390 00640</h4>
              <p className="contact-val-text">
                Alternative: +91 95263 64446 • Available 24/7 for campaign booking
              </p>
              <div className="contact-quick-actions" style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <a href="tel:+919539000640" className="btn btn-primary btn-xs">
                  <i className="fa-solid fa-phone" style={{ marginRight: '4px' }}></i> Call Now
                </a>
                <a
                  href="https://wa.me/919539000640"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp btn-xs"
                >
                  <i className="fa-brands fa-whatsapp" style={{ marginRight: '4px' }}></i> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Info Card 3: Email Inquiries */}
          <div className="contact-card">
            <div className="contact-card-icon">
              <i className="fa-solid fa-envelope-open-text"></i>
            </div>
            <div className="contact-card-details">
              <span className="contact-label">EMAIL MEDIA DESK</span>
              <h4 className="contact-val-title">novainnovations2020@gmail.com</h4>
              <p className="contact-val-text">
                Send your campaign brief or site requirements directly for instant quotations.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Booking Form */}
        <div className="contact-form-column">
          <div className="contact-form-card">
            <div className="form-card-header">
              <h3 className="form-card-title">
                <i className="fa-solid fa-paper-plane" style={{ marginRight: '8px', color: '#e02b20' }}></i>
                Send Campaign Inquiry
              </h3>
              <p className="form-card-sub">
                Fill out the details below for a quick response from Director Gireesh Kumar S.
              </p>
            </div>

            {status.success && (
              <div
                style={{
                  background: '#dcfce7',
                  color: '#15803d',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  fontSize: '0.9rem',
                }}
              >
                ✓ Thank you! Your inquiry has been submitted. Our team will contact you shortly.
              </div>
            )}
            {status.error && (
              <div
                style={{
                  background: '#fee2e2',
                  color: '#b91c1c',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  fontSize: '0.9rem',
                }}
              >
                {status.error}
              </div>
            )}

            <form className="section-contact-form" onSubmit={handleSubmit}>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label htmlFor="p-name">Your Name / Business *</label>
                  <input
                    type="text"
                    id="p-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma (myG)"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="p-phone">Mobile Number *</label>
                  <input
                    type="tel"
                    id="p-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 95390 00000"
                    required
                  />
                </div>
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px' }}>
                <div className="form-group">
                  <label htmlFor="p-email">Email Address</label>
                  <input
                    type="email"
                    id="p-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="p-service">Required Service *</label>
                  <select
                    id="p-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="Outdoor Hoardings">Outdoor Hoardings</option>
                    <option value="Vehicle Advertising">KSRTC Bus Wrap</option>
                    <option value="Shop & Retail Branding">Shop Facade Signage</option>
                    <option value="Event Branding">Event Stall Fabrication</option>
                    <option value="Design Studio">Design Studio &amp; Printing</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '12px' }}>
                <label htmlFor="p-message">Preferred Corridors / Details *</label>
                <textarea
                  id="p-message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Specify your target districts (e.g. Trivandrum, Ernakulam, Palakkad)..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="btn btn-primary btn-block page-submit-btn"
                style={{ marginTop: '16px', width: '100%', padding: '12px', fontWeight: 600 }}
              >
                <span>{status.loading ? 'Submitting...' : 'Submit Campaign Brief'}</span>
                <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
