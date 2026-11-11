'use client';

interface HeroProps {
  tag?: string;
  title: string;
  description: string;
  founderImg: string;
  founderName: string;
  founderRole: string;
  ctaText?: string;
  ctaPhone?: string;
  onOpenModal?: (service: string) => void;
}

export default function Hero({
  tag = '27+ Years of Creative Advertising Excellence',
  title,
  description,
  founderImg,
  founderName,
  founderRole,
  ctaText = 'Book Hoardings',
  ctaPhone = '+91 95390 00640',
  onOpenModal,
}: HeroProps) {
  const cleanPhone = ctaPhone.replace(/\s+/g, '');

  return (
    <section className="hero-section" id="hero">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-tag-badge">
            <i className="fa-solid fa-star"></i> <span>{tag}</span>
          </div>
          <h1 className="hero-title" id="founder-hero-title">
            {title}
          </h1>
          <p className="hero-desc" id="founder-hero-desc">
            {description}
          </p>
          <div className="hero-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={`tel:${cleanPhone}`} className="btn btn-primary hero-cta-btn" id="founder-hero-cta">
              <span>{ctaText}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </a>
            {onOpenModal && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => onOpenModal('Outdoor Hoardings')}
                style={{
                  background: 'rgba(15, 23, 42, 0.05)',
                  border: '1px solid rgba(15, 23, 42, 0.12)',
                  borderRadius: '9999px',
                  padding: '12px 24px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Inquire Campaign
              </button>
            )}
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
