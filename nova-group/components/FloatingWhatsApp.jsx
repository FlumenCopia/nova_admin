'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '919539000640';
  const message = 'Hi Nova Innovations, I would like to inquire about outdoor hoardings and advertising services in Kerala.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    // Only show the tooltip on desktop screens (> 768px) to prevent blocking content on mobile
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      setShowTooltip(true);
    }
  }, []);

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="floating-whatsapp-aside"
    >
      {showTooltip && (
        <div className="floating-whatsapp-tooltip">
          <span className="floating-whatsapp-pulse" />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-whatsapp-text"
          >
            Direct WhatsApp • Kerala Media Desk
          </a>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Close WhatsApp prompt"
            className="floating-whatsapp-close"
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
        className="floating-whatsapp-btn"
      >
        <MessageCircle size={28} fill="#ffffff" color="#25D366" strokeWidth={1.5} />
      </a>
    </aside>
  );
}
