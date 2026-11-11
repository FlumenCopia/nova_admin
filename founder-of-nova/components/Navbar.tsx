'use client';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  isScrolled: boolean;
  activeSection: string;
  onSelectSection: (section: string) => void;
  onOpenDrawer: () => void;
}

export default function Navbar({
  theme,
  onToggleTheme,
  isScrolled,
  activeSection,
  onSelectSection,
  onOpenDrawer,
}: NavbarProps) {
  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <a href="#hero" className="brand-logo" id="brand-logo">
        <span className="logo-text">
          GIREESH<span className="logo-accent">KUMAR</span>
        </span>
      </a>

      <nav className="nav-menu" id="nav-menu">
        <a
          href="#hero"
          className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
          onClick={() => onSelectSection('hero')}
        >
          Home
        </a>
        <a
          href="#about"
          className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
          onClick={() => onSelectSection('about')}
        >
          About Us
        </a>
        <a
          href="#services"
          className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
          onClick={() => onSelectSection('services')}
        >
          Services
        </a>
        <a
          href="#gallery"
          className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
          onClick={() => onSelectSection('gallery')}
        >
          Gallery
        </a>
        <a
          href="#contact"
          className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
          onClick={() => onSelectSection('contact')}
        >
          Contact
        </a>
        <a
          href="https://novainnovations.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
        >
          Nova Group <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.75rem', opacity: 0.8 }}></i>
        </a>
      </nav>

      <div className="nav-actions">
        <button
          className="theme-toggle"
          id="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle Theme"
        >
          <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
        <a
          href="tel:+919539000640"
          className="btn btn-dark nav-cta"
          id="contact-btn"
          title="Call +91 95390 00640"
        >
          <i className="fa-solid fa-phone"></i>
          <span>Call Now</span>
        </a>
        <button
          className="mobile-toggle"
          id="mobile-toggle"
          onClick={onOpenDrawer}
          aria-label="Toggle Navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

