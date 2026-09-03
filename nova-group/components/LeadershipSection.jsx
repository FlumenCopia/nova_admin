'use client';

import Link from 'next/link';

export default function LeadershipSection() {
  return (
    <section className="leadership-spotlight-section">
      <div className="container">
        <div className="leadership-spotlight-card">
          {/* Left Column Image & Badge */}
          <div className="leadership-img-col">
            <img src="/mainhero1.png" alt="Gireesh Kumar S - Founder, Director & CEO" className="leadership-portrait-img" />
            <div className="leadership-badge-overlay">
              <span className="leadership-badge-number">27+</span>
              <span className="leadership-badge-label">Years Leadership</span>
            </div>
          </div>

          {/* Right Column Content */}
          <div className="leadership-content-col">
            <div className="leadership-spotlight-tag">
              <div className="leadership-spotlight-dots">
                <span></span>
                <span></span>
              </div>
              Leadership Spotlight
            </div>
            <h2 className="leadership-name">GIREESH KUMAR S</h2>
            <div className="leadership-role">Founder, Director & CEO — Nova Innovations</div>

            <p className="leadership-bio">
              Pioneering outdoor advertising, highway hoardings, and transit fleet branding across Kerala for over 27 years. Under Gireesh Kumar S's leadership, Nova Innovations manages 500+ prime hoarding corridors and nationwide campaign executions.
            </p>

            <div className="leadership-features-list">
              <div className="leadership-feature-box">
                <div className="leadership-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>
                  </svg>
                </div>
                <div className="leadership-feature-text">
                  <h4>Visionary Direction</h4>
                  <p>Building Kerala's most reliable 24/7 overnight advertising engine.</p>
                </div>
              </div>

              <div className="leadership-feature-box">
                <div className="leadership-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="leadership-feature-text">
                  <h4>Enterprise Relationships</h4>
                  <p>Trusted partner to myG, Bhima, Pothys, KSRTC & Bank of Baroda.</p>
                </div>
              </div>
            </div>

            <div className="leadership-actions">
              <a href="tel:+919539000640" className="btn-leadership-phone">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Call Founder: +91 9539000640
              </a>
              <Link href="/contact" className="btn-leadership-contact">
                Connect with Director <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
