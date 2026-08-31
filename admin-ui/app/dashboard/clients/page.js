'use client';

import { useState, useEffect } from 'react';
import Modal from '../../../components/Modal';
import Toast from '../../../components/Toast';
import { apiFetch, getMediaUrl } from '../../../lib/api';

export default function ClientLogosPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await apiFetch('/admin/clients');
      if (res.success) {
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
    if (!confirm('Are you sure you want to remove this client logo?')) return;
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

      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Client & Partner Logos</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Manage corporate brand partner logos displayed in the continuous website marquee
          </p>
        </div>

        <div className="page-header-actions">
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">
            + Add Client Logo
          </button>
        </div>
      </div>

      {loading ? (
        <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          Loading Client Logos...
        </div>
      ) : clients.length === 0 ? (
        <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          No custom client logos uploaded yet. Add corporate partner brand logos to showcase on the marquee.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
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
                }}
              >
                {/* Top Image Banner matching Campaign Gallery */}
                <div style={{ position: 'relative', height: '180px', background: '#e2e8f0' }}>
                  <img
                    src={imgSrc}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/logo.png'; }}
                  />
                </div>

                {/* Card Body */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{item.name}</h3>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn-secondary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      color: 'var(--color-danger)',
                      borderColor: 'rgba(217, 45, 32, 0.25)',
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
