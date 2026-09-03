'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

export default function MobileDrawer({ isOpen, onClose, onOpenModal }) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: 'https://portfolio-founder-of-nova.vercel.app/', label: 'Founder', isExternal: true },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Campaign Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <div
        className={`mobile-drawer-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      <div className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <Link href="/" className="logo-brand" onClick={onClose}>
            <img src="/logo.png" alt="Innovations" className="site-brand-logo" />
          </Link>
          <button
            type="button"
            className="mobile-drawer-close"
            aria-label="Close Menu"
            onClick={onClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>

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
                onClick={onClose}
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
              onClick={onClose}
            >
              {link.label}
            </Link>
          );
        })}

        <button
          type="button"
          className="btn-pill-dark open-modal-btn"
          style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}
          onClick={() => {
            onClose();
            onOpenModal('Book Vacant Hoardings');
          }}
        >
          Book a Hoarding
        </button>
      </div>
    </>
  );
}
