'use client';

import Link from 'next/link';
import { Trophy, Users, Phone, ArrowRight } from 'lucide-react';

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
                  <Trophy size={20} strokeWidth={2} />
                </div>
                <div className="leadership-feature-text">
                  <h4>Visionary Direction</h4>
                  <p>Building Kerala's most reliable 24/7 overnight advertising engine.</p>
                </div>
              </div>

              <div className="leadership-feature-box">
                <div className="leadership-feature-icon">
                  <Users size={20} strokeWidth={2} />
                </div>
                <div className="leadership-feature-text">
                  <h4>Enterprise Relationships</h4>
                  <p>Trusted partner to myG, Bhima, Pothys, KSRTC & Bank of Baroda.</p>
                </div>
              </div>
            </div>

            <div className="leadership-actions">
              <a href="tel:+919539000640" className="btn-leadership-phone" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={15} strokeWidth={2.2} />
                Call Founder: +91 9539000640
              </a>
              <Link href="/contact" className="btn-leadership-contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Connect with Director <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
