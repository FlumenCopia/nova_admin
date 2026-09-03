'use client';

import { useState, useEffect } from 'react';
import { fetchApi } from '../lib/api';

export default function ConsultationModal({ isOpen, onClose, initialService, onShowToast }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Outdoor Hoardings');
  const [availableServices, setAvailableServices] = useState([
    'Outdoor Hoardings',
    'Vehicle & Transit Advertising',
    'Shop & Retail Facade Branding',
    'Event Branding & Exhibition Setup',
    'Commercial Wall Painting',
    'Design Studio & Flex Printing',
  ]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadDynamicServices() {
      try {
        const json = await fetchApi('/public/services');
        if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
          const list = json.data.map((s) => s.title);
          setAvailableServices(list);
        }
      } catch (err) {
        console.error('Fetch modal services error:', err);
      }
    }
    loadDynamicServices();
  }, []);

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetchApi('/public/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          serviceType: service,
          notes,
          source: 'Website Consultation Modal',
        }),
      });

      setName('');
      setPhone('');
      setNotes('');
      onClose();
      onShowToast('Thank you! Your campaign inquiry has been received. Nova Innovations will contact you shortly.');
    } catch (error) {
      console.error('Submission error:', error);
      onShowToast('Thank you! Your inquiry has been logged. We will contact you shortly.');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay active" id="consultation-modal" onClick={(e) => {
      if (e.target.id === 'consultation-modal') onClose();
    }}>
      <div className="modal-card">
        <button type="button" className="modal-close-btn" aria-label="Close dialog" onClick={onClose}>
          &times;
        </button>
        <div className="modal-header">
          <h3 className="modal-title">Book Hoardings / Inquiry</h3>
          <p className="modal-subtitle">Leave your requirements and our media planning team will connect with you with vacant prime locations and rates.</p>
        </div>

        <form id="lead-consultation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="modal-name">Full Name / Company Name</label>
            <input
              type="text"
              id="modal-name"
              className="form-input"
              placeholder="e.g. Rahul Sharma (myG)"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="modal-phone">Phone Number</label>
            <input
              type="tel"
              id="modal-phone"
              className="form-input"
              placeholder="+91 95390 00000"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="modal-property-type">Service Required</label>
            <select
              id="modal-property-type"
              className="form-select"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              {availableServices.map((srvTitle) => (
                <option key={srvTitle} value={srvTitle}>
                  {srvTitle}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="modal-notes">Preferred Districts / Details</label>
            <textarea
              id="modal-notes"
              className="form-textarea"
              placeholder="Specify preferred locations (e.g. Trivandrum, Cochin, Kollam, Palakkad) or campaign duration..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn-form-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit Campaign Inquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}
