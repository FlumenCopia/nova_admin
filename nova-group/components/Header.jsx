'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header({ onOpenModal, onToggleMobile, isMobileOpen }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: 'https://portfolio-founder-of-nova.vercel.app/', label: 'Founder', isExternal: true },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Campaign Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`site-header ${pathname === '/' ? 'transparent-header' : ''} ${scrolled ? 'scrolled' : ''}`} id="site-header">
      <div className="container header-container">
        <Link href="/" className="logo-brand" id="brand-logo">
          <img src="/logo.png" alt="Innovations" className="site-brand-logo" />
        </Link>

        <nav className="nav-links" id="main-nav">
          {navLinks.map((link) => {
            const isActive = link.isExternal ? false : pathname === link.href;
            if (link.isExternal) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  {link.label}
                </a>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            onClick={() => onOpenModal('Book Vacant Hoardings')}
            className="btn-header-contact open-modal-btn"
            id="btn-request-consultation"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Book Hoarding
          </button>

          <button
            type="button"
            className={`mobile-menu-btn ${isMobileOpen ? 'open' : ''}`}
            id="mobile-toggle"
            aria-label="Toggle navigation menu"
            onClick={onToggleMobile}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
