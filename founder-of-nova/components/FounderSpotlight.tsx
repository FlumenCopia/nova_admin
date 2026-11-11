'use client';

interface FounderSpotlightProps {
  onOpenModal: (subject: string) => void;
  tag?: string;
  name?: string;
  role?: string;
  bio?: string;
  years?: string;
  yearsLabel?: string;
  image?: string;
  phone?: string;
  feat1Title?: string;
  feat1Desc?: string;
  feat2Title?: string;
  feat2Desc?: string;
}

export default function FounderSpotlight({
  onOpenModal,
  tag = 'LEADERSHIP SPOTLIGHT',
  name = 'GIREESH KUMAR S',
  role = 'Founder, Director & CEO — Nova Innovations',
  bio = "Pioneering outdoor advertising, highway hoardings, and transit fleet branding across Kerala for over 27 years. Under Gireesh Kumar S's leadership, Nova Innovations manages 500+ prime hoarding corridors and nationwide campaign executions.",
  years = '27+',
  yearsLabel = 'Years Leadership',
  image = '/assets/hero_man.jpeg',
  phone = '+91 9539000640',
  feat1Title = 'Visionary Direction',
  feat1Desc = "Building Kerala's most reliable 24/7 overnight advertising engine.",
  feat2Title = 'Enterprise Relationships',
  feat2Desc = 'Trusted partner to myG, Bhima, Pothys, KSRTC & Bank of Baroda.',
}: FounderSpotlightProps) {
  const cleanPhone = (phone || '').replace(/\s+/g, '');

  return (
    <div className="founder-spotlight-card" id="founder">
      <div className="founder-card-grid">
        <div className="founder-img-col">
          <div className="founder-portrait-frame">
            <img
              src={image || '/assets/hero_man.jpeg'}
              alt={name}
              className="founder-portrait-img"
              id="spotlight-portrait-img"
            />
            <div className="founder-experience-badge">
              <span className="exp-number">{years}</span>
              <span className="exp-text">{yearsLabel}</span>
            </div>
          </div>
        </div>
        <div className="founder-info-col">
          <div className="dual-dots-badge">
            <span className="dot dot-red"></span>
            <span className="dot dot-red"></span>
          </div>
          <span className="about-subhead">{tag}</span>
          <h2 className="founder-name-heading">{name}</h2>
          <h3 className="founder-designation">{role}</h3>
          <p className="founder-bio-text">{bio}</p>
          <div className="founder-key-pillars">
            <div className="pillar-item">
              <div className="pillar-icon">
                <i className="fa-solid fa-trophy"></i>
              </div>
              <div>
                <strong>{feat1Title}</strong>
                <p>{feat1Desc}</p>
              </div>
            </div>
            <div className="pillar-item">
              <div className="pillar-icon">
                <i className="fa-solid fa-handshake"></i>
              </div>
              <div>
                <strong>{feat2Title}</strong>
                <p>{feat2Desc}</p>
              </div>
            </div>
          </div>
          <div className="founder-actions">
            <a href={`tel:${cleanPhone}`} className="btn btn-primary" id="spotlight-phone-btn">
              <i className="fa-solid fa-phone"></i> <span>Call Founder: {phone}</span>
            </a>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => onOpenModal('Founder Meeting')}
            >
              <span>Connect with Director</span> <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
