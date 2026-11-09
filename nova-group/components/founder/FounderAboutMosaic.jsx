'use client';

export default function FounderAboutMosaic({ onOpenModal }) {
  return (
    <section className="testimonials-overview-section" id="about">
      {/* Overnight Specialty Highlight Strip */}
      <div className="speciality-highlight-strip">
        <div className="strip-icon-box">
          <i className="fa-solid fa-bolt"></i>
        </div>
        <div className="strip-text-box">
          <strong>OUR SPECIALITY:</strong> We can advertise your business overnight all over Kerala across 14 districts.
        </div>
        <a href="tel:+919539000640" className="strip-btn">
          <i className="fa-solid fa-phone" style={{ marginRight: '6px' }}></i> +91 9539000640
        </a>
      </div>

      <div className="overview-grid">
        {/* Left Column: Detailed About Copy */}
        <div className="overview-left">
          <div className="dual-dots-badge">
            <span className="dot dot-red"></span>
            <span className="dot dot-red"></span>
          </div>
          <span className="about-subhead">WELCOME TO NOVA INNOVATIONS</span>
          <h2 className="overview-title">
            27+ Years of Creative Advertising Excellence
          </h2>
          <p className="about-paragraph">
            We <strong>&quot;Innovations&quot;</strong> are the premier innovative and creative advertising partner for the new
            era of outdoor hoardings and brand media in Kerala. We are deeply committed to taking each of our client
            firms to the next levels of business hierarchy.
          </p>
          <p className="about-paragraph">
            From customized graphic conceptualization in our design studio to high-visibility prime highway hoardings,
            bus fleet branding, shop signages, and end-to-end event production, we provide head-to-tail services with
            100% structural protection.
          </p>

          {/* Director Quote Box */}
          <div className="director-quote-card">
            <div className="director-avatar-wrap">
              <img src="/assets/hero_man.jpeg" alt="Gireesh Kumar S" className="director-avatar" />
            </div>
            <div className="director-quote-info">
              <p className="director-quote-text">
                &quot;Our mission is to hallmark your brand into every customer&apos;s mind with prime locations, structural
                perfection, and instant overnight deployment.&quot;
              </p>
              <h4 className="director-name">GIREESH KUMAR S</h4>
              <span className="director-role">Director / CEO — NOVA Innovations</span>
            </div>
          </div>

          {/* Metric Badges/Pills */}
          <div className="metrics-pills-row">
            <div className="metric-pill">
              <span className="pill-number">27</span>
              <span className="pill-suffix">+</span>
              <span className="pill-sub">Years Excellence</span>
            </div>
            <div className="metric-pill">
              <span className="pill-number">500</span>
              <span className="pill-suffix">+</span>
              <span className="pill-sub">Prime Hoardings</span>
            </div>
            <div className="metric-pill">
              <span className="pill-number">1000</span>
              <span className="pill-suffix">+</span>
              <span className="pill-sub">Campaigns</span>
            </div>
            <div className="metric-pill">
              <span className="pill-number">14</span>
              <span className="pill-sub">Districts Overnight</span>
            </div>
          </div>
        </div>

        {/* Right Column: Mosaic Visual Showcase */}
        <div className="overview-right-mosaic">
          <div className="mosaic-container">
            {/* Bottom Row: Image + Badge */}
            <div className="mosaic-bottom-row">
              <div className="mosaic-img-card">
                <img
                  src="/assets/about_hoarding.jpg"
                  alt="Kerala Highway Billboard Hoarding Showcase"
                  className="mosaic-img"
                />
              </div>

              <div className="mosaic-abstract-card">
                <div className="nova-badge-wrapper">
                  <img
                    src="/assets/nova_logo_badge.svg"
                    alt="NOVA Innovations Official Logo Badge"
                    className="nova-badge-img"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Statewide Transit Fleet Feature Banner */}
            <div className="mosaic-banner-card">
              <div className="banner-card-img-wrap">
                <img
                  src="/assets/founder_transit.jpg"
                  alt="KSRTC Transit Fleet Network"
                  className="banner-card-img"
                />
                <div className="banner-card-overlay"></div>
              </div>
              <div className="banner-card-content">
                <span className="banner-tag">
                  <i className="fa-solid fa-bus" style={{ marginRight: '6px' }}></i> Statewide Network
                </span>
                <h4 className="banner-title">Statewide KSRTC Transit Bus Fleet Network</h4>
                <p className="banner-desc">
                  Pan-Kerala mobile advertising coverage across all 14 districts with 24/7 high visibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
