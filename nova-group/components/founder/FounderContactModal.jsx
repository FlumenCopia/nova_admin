'use client';

import { useState } from 'react';
import { getApiBase } from '../../lib/api';

export default function FounderContactModal({ isOpen, serviceName = 'Outdoor Hoardings', onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: serviceName,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${getApiBase()}/public/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, service: serviceName }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 1500);
      }
    } catch (err) {
      // error handled gracefully
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          maxWidth: '520px',
          width: '100%',
          padding: '28px',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            color: '#64748B',
          }}
        >
          ✕
        </button>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
          Quick Campaign Inquiry
        </h3>
        <p style={{ color: '#64748B', fontSize: '0.88rem', marginBottom: '16px' }}>
          Inquiring for: <strong style={{ color: '#e02b20' }}>{serviceName}</strong>
        </p>

        {success ? (
          <div style={{ background: '#dcfce7', color: '#15803d', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
            ✓ Thank you! We have received your inquiry.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Name / Company *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 95390 00000"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Target Location / Corridors
              </label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="e.g. Trivandrum Highway, Ernakulam city..."
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '8px',
                borderRadius: '8px',
                fontWeight: 600,
                background: '#e02b20',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {loading ? 'Submitting...' : 'Send Inquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
