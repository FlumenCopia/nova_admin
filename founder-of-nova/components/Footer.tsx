'use client';

interface FooterProps {
  onNewsletterSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Footer({ onNewsletterSubmit }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {/* Col 1 */}
        <div className="footer-brand-col">
          <span className="logo-text">
            GIREESH <span className="logo-accent">KUMAR S</span>
          </span>
          <p className="footer-bio">
            <strong>NOVA INNOVATIONS</strong> — Outdoors • Design Studio • Events. Kerala&apos;s premier advertising
            partner with 27+ years of creative excellence.
          </p>
          <div className="social-links">
            <a href="tel:+919539000640" className="social-icon" aria-label="Phone">
              <i className="fa-solid fa-phone"></i>
            </a>
            <a
              href="https://wa.me/919539000640"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="WhatsApp"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a href="mailto:novainnovations2020@gmail.com" className="social-icon" aria-label="Email">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>

        {/* Col 2 */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-links-list">
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="https://novainnovations.in/" target="_blank" rel="noopener noreferrer">Nova Group</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Our Services</h4>
          <ul className="footer-links-list">
            <li><a href="#services">Outdoor Highway Hoardings</a></li>
            <li><a href="#services">KSRTC Bus Transit Media</a></li>
            <li><a href="#services">Shop &amp; Retail Facade Signage</a></li>
            <li><a href="#services">Event Stall Fabrication</a></li>
            <li><a href="#services">Design Studio &amp; Flex Printing</a></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="footer-newsletter-col">
          <h4 className="footer-col-title">Contact Nova</h4>
          <p className="newsletter-desc">
            <strong>Head Office:</strong> T.C 26/929(2), C.K. Tower, Panavila Jn., Thiruvananthapuram - 695001
            <br />
            <strong>Mob:</strong> +91 95390 00640, 95263 64446
          </p>
          <form className="newsletter-form" id="newsletter-form" onSubmit={onNewsletterSubmit}>
            <div className="newsletter-input-wrap">
              <input type="tel" id="newsletter-email" placeholder="Your Phone Number..." required />
              <button type="submit" className="newsletter-btn" aria-label="Request Call">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 NOVA Innovations (Outdoors • Design Studio • Events). All Rights Reserved.</p>
        <div className="footer-legal">
          <a href="tel:+919539000640">+91 9539000640</a>
          <span className="sep">•</span>
          <a href="mailto:novainnovations2020@gmail.com">novainnovations2020@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}

