import Link from 'next/link';
import { Home, Image as ImageIcon, Phone, MessageCircle } from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found | NOVA Innovations Kerala',
  description: 'The requested outdoor advertising page or campaign showcase was not found. Contact Nova Innovations media desk.',
};

export default function NotFound() {
  const whatsappUrl = 'https://wa.me/919539000640?text=Hi%20Nova%20Innovations%2C%20I%20arrived%20at%20a%20missing%20page%20and%20need%20assistance%20with%20outdoor%20advertising.';

  return (
    <section className="page-hero" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto', padding: '40px 20px' }}>
        <span
          className="hero-pill-badge"
          style={{
            display: 'inline-flex',
            marginBottom: '20px',
            background: 'rgba(230, 0, 0, 0.15)',
            color: 'var(--brand-red, #ff2a2a)',
            borderColor: 'rgba(230, 0, 0, 0.3)',
          }}
        >
          Error 404 • Location Not Found
        </span>

        <h1 className="heading-lg" style={{ marginBottom: '16px' }}>
          This Campaign Location is <span>Unavailable</span>
        </h1>

        <p className="subheading" style={{ margin: '0 auto 36px', maxWidth: '580px' }}>
          The page or billboard listing you are looking for may have been repositioned, renamed, or is currently reserved. Explore our active prime hoardings or connect with our media desk immediately.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '14px',
            marginBottom: '36px',
          }}
        >
          <Link href="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Home size={16} />
            Back to Homepage
          </Link>

          <Link href="/gallery" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ImageIcon size={16} />
            View Active Hoardings
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderColor: 'rgba(37, 211, 102, 0.4)',
              color: '#25D366',
            }}
          >
            <MessageCircle size={16} />
            Quick WhatsApp Chat
          </a>

          <a
            href="tel:+919539000640"
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Phone size={16} />
            Call: +91 95390 00640
          </a>
        </div>
      </div>
    </section>
  );
}
