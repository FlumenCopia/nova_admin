'use client';

export default function FounderCtaBanner({ onOpenModal }) {
  return (
    <section className="cta-banner-section">
      <div className="cta-card">
        <div className="cta-content">
          <h2 className="cta-heading">Ready to Hallmark Your Brand Across Kerala?</h2>
          <p className="cta-text">
            Connect directly with management for vacant hoardings, bus fleet media, and custom rates.
          </p>
          <div className="cta-btn-group" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+919539000640" className="btn btn-primary btn-large">
              <i className="fa-solid fa-phone" style={{ marginRight: '8px' }}></i> Call: +91 9539000640
            </a>
            {onOpenModal && (
              <button
                type="button"
                className="btn btn-ghost btn-large"
                onClick={() => onOpenModal('Outdoor Hoardings')}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '9999px',
                  padding: '14px 28px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Inquire Campaign <i className="fa-solid fa-arrow-right" style={{ marginLeft: '6px' }}></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
