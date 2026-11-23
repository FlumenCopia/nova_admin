'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PhoneCall, ChevronDown } from 'lucide-react';
import { fetchApi } from '../lib/api';

export default function Header({ onOpenModal, onToggleMobile, isMobileOpen }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetchApi('/public/services');
        if (res && res.success && Array.isArray(res.data)) {
          setServices(res.data.filter((s) => s.isActive !== false));
        }
      } catch (err) {
        console.error('Failed to load services for header dropdown:', err);
      }
    }
    loadServices();
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services', hasDropdown: true },
    { href: '/gallery', label: 'Campaign Gallery' },
    { href: 'https://gireeshkumar.novainnovations.in', label: 'Founder Profile', isExternal: true },
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
            const isActive = link.href === '/' ? pathname === '/' : pathname === link.href;

            if (link.hasDropdown && services.length > 0) {
              return (
                <div key={link.href} className="nav-dropdown-wrapper">
                  <Link
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    {link.label}
                    <ChevronDown size={14} style={{ transition: 'transform 0.2s ease' }} />
                  </Link>
                  <div className="nav-dropdown-menu">
                    {services.map((srv) => (
                      <Link
                        key={srv.id || srv._id || srv.title}
                        href="/services"
                        className="nav-dropdown-item"
                      >
                        {srv.title}
                      </Link>
                    ))}
                  </div>
                </div>
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
