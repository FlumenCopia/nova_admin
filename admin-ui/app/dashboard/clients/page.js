'use client';

import { useState, useEffect } from 'react';
import Modal from '../../../components/Modal';
import Toast from '../../../components/Toast';
import { apiFetch, getMediaUrl, PUBLIC_SITE_URL } from '../../../lib/api';

export default function ClientLogosPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  // Section Title State
  const [partnersTitle, setPartnersTitle] = useState('OUR ESTEEMED CLIENTS & BRAND PARTNERS');
  const [savingTitle, setSavingTitle] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchClients();
    fetchTitleSettings();
  }, []);

  const fetchTitleSettings = async () => {
    try {
      const res = await apiFetch('/admin/settings');
      if (res.success && res.data && res.data.partnersSectionTitle) {
        setPartnersTitle(res.data.partnersSectionTitle);
      }
    } catch (err) {
      console.error('Fetch title error:', err);
    }
  };

  const handleSaveTitle = async (e) => {
    e.preventDefault();
    setSavingTitle(true);
    try {
      const res = await apiFetch('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({ partnersSectionTitle: partnersTitle }),
      });
      if (res.success) {
        setToastMsg('Marquee section title updated successfully!');
      } else {
        setToastMsg(res.message || 'Failed to update title.');
      }
    } catch (err) {
      setToastMsg('Error saving title.');
    } finally {
      setSavingTitle(false);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await apiFetch('/admin/clients');
      if (res.success && Array.isArray(res.data)) {
        setClients(res.data);
      }
    } catch (err) {
      setToastMsg('Failed to load client logos.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let res;
      if (selectedFile) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', selectedFile);
        res = await apiFetch('/admin/clients', {
          method: 'POST',
          body: formData,
        });
      } else {
        res = await apiFetch('/admin/clients', {
          method: 'POST',
          body: JSON.stringify({ name, logoUrl }),
        });
      }

      if (res.success) {
        setToastMsg('Client logo added successfully!');
        setIsModalOpen(false);
        setName('');
        setLogoUrl('');
        setSelectedFile(null);
        setPreviewUrl('');
        fetchClients();
      } else {
        throw new Error(res.message || 'Failed to save client logo');
      }
    } catch (err) {
      setToastMsg(err.message || 'Failed to add client logo.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this client logo from the website marquee?')) return;
    try {
      const res = await apiFetch(`/admin/clients/${id}`, { method: 'DELETE' });
      if (res.success) {
        setToastMsg('Client logo removed.');
        fetchClients();
      }
    } catch (err) {
      setToastMsg('Failed to remove logo.');
    }
  };

  return (
    <>
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div className="page-header" style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Client & Partner Logos</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Manage corporate brand partner logos displayed in the live website marquee ({clients.length} active logos)
          </p>
        </div>

        <div className="page-header-actions" style={{ display: 'flex', gap: '10px' }}>
          <a
            href={`${PUBLIC_SITE_URL}/founder-of-nova.html#partners`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <span>View Live Marquee</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">
            + Add Client Logo
          </button>
        </div>
      </div>

      {/* MARQUEE SECTION TITLE SETTINGS CARD */}
      <div className="card" style={{ padding: '24px', marginBottom: '24px', borderLeft: '4px solid #dc2626' }}>
        <form onSubmit={handleSaveTitle} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>
              Marquee Section Title
            </label>
            <input
              type="text"
              value={partnersTitle}
              onChange={(e) => setPartnersTitle(e.target.value)}
              placeholder="e.g. OUR ESTEEMED CLIENTS & BRAND PARTNERS"
              required
              className="input-field"
              style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '0.92rem' }}
            />
          </div>
          <button
            type="submit"
            disabled={savingTitle}
            className="btn-primary"
            style={{ padding: '10px 22px', fontSize: '0.88rem' }}
          >
            {savingTitle ? 'Saving Title...' : 'Save Marquee Title'}
          </button>
        </form>
      </div>

      {loading ? (
        <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          Loading Client Logos...
        </div>
      ) : clients.length === 0 ? (
        <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          No client logos in the database. Add corporate partner brand logos to showcase on the marquee.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {clients.map((item) => {
            const imgSrc = getMediaUrl(item.logoUrl, '/logo.png');

            return (
              <div
                key={item.id}
                className="card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '14px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Logo Display Container */}
                <div
                  style={{
                    position: 'relative',
                    height: '110px',
                    background: '#FFFFFF',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={item.name}
                    style={{ maxHeight: '70px', maxWidth: '85%', objectFit: 'contain' }}
                    onError={(e) => { e.target.src = '/logo.png'; }}
                  />
                </div>

                {/* Card Body */}
                <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={item.name}>
                    {item.name}
                  </h3>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn-secondary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      color: 'var(--color-danger)',
                      borderColor: 'rgba(217, 45, 32, 0.25)',
                      fontSize: '0.8rem',
                      padding: '6px 12px',
                    }}
                  >
                    Remove Logo
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ADD LOGO MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Brand Partner Logo">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Brand / Client Name *</label>
            <input
              type="text"
              className="form-input"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Malabar Gold & Diamonds"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Upload Logo Image (PNG / WebP / SVG)</label>
            <input type="file" accept="image/*" className="form-input" onChange={handleFileChange} />
            {previewUrl && (
              <div style={{ marginTop: '12px', textAlign: 'center', padding: '12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                <img src={previewUrl} alt="Preview" style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">OR Image URL (Optional)</label>
            <input
              type="url"
              className="form-input"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Uploading...' : 'Save Client Logo'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
