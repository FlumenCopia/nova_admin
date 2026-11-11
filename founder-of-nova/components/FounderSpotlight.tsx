'use client';

interface FounderSpotlightProps {
  onOpenModal: (subject: string) => void;
}

export default function FounderSpotlight({ onOpenModal }: FounderSpotlightProps) {
  return (
    <div className="founder-spotlight-card" id="founder">
      <div className="founder-card-grid">
        <div className="founder-img-col">
          <div className="founder-portrait-frame">
            <img
              src="/assets/hero_man.jpeg"
              alt="Gireesh Kumar S"
              className="founder-portrait-img"
              id="spotlight-portrait-img"
            />
            <div className="founder-experience-badge">
              <span className="exp-number">27+</span>
              <span className="exp-text">Years Leadership</span>
            </div>
          </div>
        </div>
        <div className="founder-info-col">
          <div className="dual-dots-badge">
            <span className="dot dot-red"></span>
            <span className="dot dot-red"></span>
          </div>
          <span className="about-subhead">LEADERSHIP SPOTLIGHT</span>
          <h2 className="founder-name-heading">GIREESH KUMAR S</h2>
          <h3 className="founder-designation">Founder, Director &amp; CEO — Nova Innovations</h3>
          <p className="founder-bio-text">
            Pioneering outdoor advertising, highway hoardings, and transit fleet branding across Kerala for over 27
            years. Under Gireesh Kumar S&apos;s leadership, Nova Innovations manages 500+ prime hoarding corridors and
            nationwide campaign executions.
          </p>
          <div className="founder-key-pillars">
            <div className="pillar-item">
              <div className="pillar-icon">
                <i className="fa-solid fa-trophy"></i>
              </div>
              <div>
                <strong>Visionary Direction</strong>
                <p>Building Kerala&apos;s most reliable 24/7 overnight advertising engine.</p>
              </div>
            </div>
            <div className="pillar-item">
              <div className="pillar-icon">
                <i className="fa-solid fa-handshake"></i>
              </div>
              <div>
                <strong>Enterprise Relationships</strong>
                <p>Trusted partner to myG, Bhima, Pothys, KSRTC &amp; Bank of Baroda.</p>
              </div>
            </div>
          </div>
          <div className="founder-actions">
            <a href="tel:+919539000640" className="btn btn-primary" id="spotlight-phone-btn">
              <i className="fa-solid fa-phone"></i> <span>Call Founder: +91 9539000640</span>
            </a>
            <button className="btn btn-ghost" onClick={() => onOpenModal('Founder Meeting')}>
              <span>Connect with Director</span> <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

