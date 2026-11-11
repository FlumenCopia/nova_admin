'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);
  const phoneNumber = '919539000640';
  const message = 'Hi Nova Innovations, I would like to inquire about outdoor hoardings and advertising services in Kerala.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
      }}
    >
      {showTooltip && (
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#f8fafc',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
            padding: '8px 14px',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(37, 211, 102, 0.25)',
            backdropFilter: 'blur(8px)',
            maxWidth: '280px',
            animation: 'fadeIn 0.3s ease-in-out',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              boxShadow: '0 0 8px #22c55e',
              flexShrink: 0,
            }}
          />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 500 }}
          >
            Direct WhatsApp • Kerala Media Desk
          </a>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Close WhatsApp prompt"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              lineHeight: 1,
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Nova Innovations on WhatsApp"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
          transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 211, 102, 0.65)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.45)';
        }}
      >
        <MessageCircle size={30} fill="#ffffff" color="#25D366" strokeWidth={1.5} />
      </a>
    </aside>
  );
}
