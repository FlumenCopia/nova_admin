'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Home, Phone } from 'lucide-react';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error('Nova Group runtime error caught:', error);
  }, [error]);

  return (
    <section className="page-hero" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto', padding: '40px 20px' }}>
        <span
          className="hero-pill-badge"
          style={{
            display: 'inline-flex',
            marginBottom: '20px',
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#ef4444',
            borderColor: 'rgba(239, 68, 68, 0.3)',
          }}
        >
          Temporary Display Issue
        </span>

        <h1 className="heading-lg" style={{ marginBottom: '16px' }}>
          Something went wrong <span>loading this section</span>
        </h1>

        <p className="subheading" style={{ margin: '0 auto 32px', maxWidth: '540px' }}>
          We encountered an unexpected interface delay. You can retry refreshing the view or contact our Trivandrum operations desk directly.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
          <button
            onClick={() => reset()}
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <RotateCcw size={16} />
            Try Again
          </button>

          <Link href="/" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Home size={16} />
            Return Home
          </Link>

          <a
            href="tel:+919539000640"
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Phone size={16} />
            Contact Operations
          </a>
        </div>
      </div>
    </section>
  );
}
