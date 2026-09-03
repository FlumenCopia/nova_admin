'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PhoneCall } from 'lucide-react';

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
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <PhoneCall size={16} strokeWidth={2.2} />
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
