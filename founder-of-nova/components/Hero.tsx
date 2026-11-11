'use client';

interface HeroProps {
  title: string;
  description: string;
  founderImg: string;
  founderName: string;
  founderRole: string;
}

export default function Hero({
  title,
  description,
  founderImg,
  founderName,
  founderRole,
}: HeroProps) {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-tag-badge">
            <i className="fa-solid fa-star"></i> <span>27+ Years of Creative Advertising Excellence</span>
          </div>
          <h1 className="hero-title" id="founder-hero-title">
            {title}
          </h1>
          <p className="hero-desc" id="founder-hero-desc">
            {description}
          </p>
          <div className="hero-actions">
            <a href="tel:+919539000640" className="btn btn-primary hero-cta-btn" id="founder-hero-cta">
              <span>Book Hoardings</span>
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-wrapper">
            <div className="hero-blue-circle"></div>
            <div className="hero-img-box">
              <img src={founderImg} alt={founderName} className="hero-founder-img" id="founder-hero-img" />
            </div>
            <div className="founder-title-badge">
              <strong id="founder-hero-name">{founderName}</strong>
              <span id="founder-hero-role">{founderRole}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

