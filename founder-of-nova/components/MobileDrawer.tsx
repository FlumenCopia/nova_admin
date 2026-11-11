'use client';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSelectSection: (section: string) => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  activeSection,
  onSelectSection,
}: MobileDrawerProps) {
  const handleLinkClick = (section: string) => {
    onSelectSection(section);
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`drawer-overlay ${isOpen ? 'open' : ''}`}
        id="drawer-overlay"
        onClick={onClose}
      ></div>

      {/* Drawer Panel */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`} id="mobile-drawer">
        <div className="drawer-header">
          <span className="logo-text">
            GIREESH <span className="logo-accent">KUMAR S</span>
          </span>
          <button
            className="drawer-close"
            id="drawer-close"
            onClick={onClose}
            aria-label="Close Menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="drawer-links">
          <a
            href="#hero"
            className={`drawer-link ${activeSection === 'hero' ? 'active' : ''}`}
            onClick={() => handleLinkClick('hero')}
          >
            <i className="fa-solid fa-house"></i> Home
          </a>
          <a
            href="#about"
            className={`drawer-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => handleLinkClick('about')}
          >
            <i className="fa-solid fa-circle-info"></i> About Us
          </a>
          <a
            href="#services"
            className={`drawer-link ${activeSection === 'services' ? 'active' : ''}`}
            onClick={() => handleLinkClick('services')}
          >
            <i className="fa-solid fa-layer-group"></i> Services
          </a>
          <a
            href="#gallery"
            className={`drawer-link ${activeSection === 'gallery' ? 'active' : ''}`}
            onClick={() => handleLinkClick('gallery')}
          >
            <i className="fa-solid fa-images"></i> Gallery
          </a>
          <a
            href="#contact"
            className={`drawer-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => handleLinkClick('contact')}
          >
            <i className="fa-solid fa-envelope"></i> Contact
          </a>
          <a
            href="https://novainnovations.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="drawer-link"
            onClick={onClose}
          >
            <i className="fa-solid fa-building"></i> Nova Group <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.75rem', marginLeft: 'auto', opacity: 0.7 }}></i>
          </a>
        </div>

        <div className="drawer-footer">
          <a
            href="https://wa.me/919539000640"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-block drawer-btn"
          >
            <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

