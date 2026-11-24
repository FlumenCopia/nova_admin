'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ChevronDown } from 'lucide-react';
import { fetchApi } from '../lib/api';

export default function MobileDrawer({ isOpen, onClose, onOpenModal }) {
  const pathname = usePathname();
  const [services, setServices] = useState([]);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetchApi('/public/services');
        if (res && res.success && Array.isArray(res.data)) {
          setServices(res.data.filter((s) => s.isActive !== false));
        }
      } catch (err) {
        console.error('Failed to load services for mobile drawer:', err);
      }
    }
    loadServices();
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services', hasDropdown: true },
    { href: '/gallery', label: 'Campaign Gallery' },
    { href: '/blog', label: 'Blog & Articles' },
    { href: 'https://gireeshkumar.novainnovations.in', label: 'Founder Profile (Gireesh Kumar S)', isExternal: true },
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
          const isActive = pathname === link.href;

          if (link.hasDropdown && services.length > 0) {
            return (
              <div key={link.href} style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Link
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setServicesOpen(!servicesOpen)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'inherit',
                      padding: '8px 12px',
                      cursor: 'pointer',
                    }}
                    aria-label="Toggle Services List"
                  >
                    <ChevronDown
                      size={18}
                      style={{
                        transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </button>
                </div>
                {servicesOpen && (
                  <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
                    {services.map((srv) => (
                      <Link
                        key={srv.id || srv._id || srv.title}
                        href="/services"
                        style={{ fontSize: '0.88rem', color: 'var(--text-muted, #555)', textDecoration: 'none', padding: '4px 0' }}
                        onClick={onClose}
                      >
                        • {srv.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
          className="btn-pill-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '10px' }}
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
