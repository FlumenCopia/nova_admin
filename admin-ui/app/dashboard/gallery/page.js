'use client';

import { useState, useEffect } from 'react';
import Modal from '../../../components/Modal';
import Toast from '../../../components/Toast';
import { apiFetch, uploadImage } from '../../../lib/api';

export default function CampaignGalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'hoardings',
    badgeType: 'Billboard',
    location: '',
    dimensions: '',
    specsText: '',
    isVacant: false,
    isActive: true,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/admin/portfolio');
      if (res.success) {
        setItems(res.data || []);
      }
    } catch (err) {
      console.error('Fetch gallery items error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenModal = (item = null) => {
    setSelectedFile(null);
    if (item) {
      setEditingId(item.id);
      const apiServer = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace('/api', '');
      setPreviewUrl(
        !item.imageUrl
          ? ''
          : item.imageUrl.startsWith('http')
            ? item.imageUrl
            : `${apiServer}${item.imageUrl.startsWith('/') ? '' : '/'}${item.imageUrl}`
      );
      setFormData({
        title: item.title,
        category: item.category || 'hoardings',
        badgeType: item.badgeType || 'Billboard',
        location: item.location || '',
        dimensions: item.dimensions || '',
        specsText: Array.isArray(item.specs) ? item.specs.join('\n') : '',
        isVacant: item.isVacant || false,
        isActive: item.isActive !== false,
      });
    } else {
      setEditingId(null);
      setPreviewUrl('');
      setFormData({
        title: '',
        category: 'hoardings',
        badgeType: 'Billboard',
        location: '',
        dimensions: '',
        specsText: '',
        isVacant: false,
        isActive: true,
      });
    }
    setIsModalOpen(true);
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
    setUploading(true);

    try {
      let finalImageUrl = previewUrl;

      if (selectedFile) {
        const uploadRes = await uploadImage(selectedFile);
        if (uploadRes.success) {
          finalImageUrl = uploadRes.url;
        } else {
          setToastMsg(uploadRes.message || 'Image upload failed.');
          setUploading(false);
          return;
        }
      }

      if (!finalImageUrl) {
        setToastMsg('Please select or upload a campaign photo.');
        setUploading(false);
        return;
      }

      const specsArray = formData.specsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title,
        category: formData.category,
        badgeType: formData.badgeType,
        location: formData.location,
        dimensions: formData.dimensions,
        specs: specsArray,
        imageUrl: finalImageUrl,
        isVacant: formData.isVacant,
        isActive: formData.isActive,
      };

      if (editingId) {
        const res = await apiFetch(`/admin/portfolio/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        if (res.success) {
          setToastMsg('Campaign item updated!');
          setIsModalOpen(false);
          fetchItems();
        } else {
          setToastMsg(res.message || 'Update failed.');
        }
      } else {
        const res = await apiFetch('/admin/portfolio', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        if (res.success) {
          setToastMsg('Campaign item added to gallery!');
          setIsModalOpen(false);
          fetchItems();
        } else {
          setToastMsg(res.message || 'Creation failed.');
        }
      }
    } catch (err) {
      setToastMsg('An error occurred saving campaign item.');
    } finally {
      setUploading(false);
    }
  };

  const handleToggleVacant = async (id, currentVacant) => {
    try {
      const res = await apiFetch(`/admin/portfolio/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ isVacant: !currentVacant }),
      });
      if (res.success) {
        setToastMsg(`Site marked as ${!currentVacant ? 'VACANT NOW' : 'Occupied'}.`);
        fetchItems();
      }
    } catch (err) {
      setToastMsg('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      const res = await apiFetch(`/admin/portfolio/${id}`, {
        method: 'DELETE',
      });
      if (res.success) {
        setToastMsg('Campaign gallery item deleted.');
        fetchItems();
      }
    } catch (err) {
      setToastMsg('Failed to delete item.');
    }
  };

  const filteredItems = items.filter((item) => {
    if (filterCategory === 'ALL') return true;
    if (filterCategory === 'VACANT') return item.isVacant;
    return (item.category || '').toLowerCase().includes(filterCategory.toLowerCase());
  });

  return (
    <>
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Campaign Gallery Showcase</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Manage high-impact outdoor media, bus wraps, retail branding, and vacant hoarding sites
          </p>
        </div>

        <button onClick={() => handleOpenModal()} className="btn-primary">
          + Add Gallery Item
        </button>
      </div>

      {/* FILTER TABS */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { key: 'ALL', label: `All Items (${items.length})` },
          { key: 'hoardings', label: 'Prime Hoardings' },
          { key: 'myg', label: 'myG Campaigns' },
          { key: 'transit', label: 'Bus Transit' },
          { key: 'VACANT', label: `Vacant Sites (${items.filter((i) => i.isVacant).length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterCategory(tab.key)}
            className="btn-secondary"
            style={{
              padding: '6px 14px',
              fontSize: '0.85rem',
              fontWeight: 600,
              borderColor: filterCategory === tab.key ? 'var(--color-primary)' : 'var(--color-border)',
              color: filterCategory === tab.key ? 'var(--color-primary)' : 'var(--color-text-primary)',
              background: filterCategory === tab.key ? 'var(--color-primary-soft)' : 'var(--color-card-background)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          Loading campaign gallery...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          No campaign gallery items found under this filter. Click "+ Add Gallery Item" to upload photos.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredItems.map((item) => {
            const apiServer = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace('/api', '');
            const imgSrc = !item.imageUrl
              ? '/logo.png'
              : item.imageUrl.startsWith('http')
                ? item.imageUrl
                : `${apiServer}${item.imageUrl.startsWith('/') ? '' : '/'}${item.imageUrl}`;

            return (
              <div
                key={item.id}
                className="card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                }}
              >
                <div style={{ position: 'relative', height: '180px', background: '#e2e8f0' }}>
                  <img
                    src={imgSrc}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/logo.png'; }}
                  />
                  {item.isVacant && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: '#22c55e',
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '4px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      VACANT NOW
                    </span>
                  )}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      background: 'rgba(0,0,0,0.7)',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {item.badgeType || item.category}
                  </span>
                </div>

                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '4px' }}>{item.title}</h3>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                    📍 {item.location} {item.dimensions ? `• ${item.dimensions}` : ''}
                  </div>

                  {item.specs && item.specs.length > 0 && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      {item.specs.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            fontSize: '0.74rem',
                            background: 'var(--color-page-background)',
                            border: '1px solid var(--color-border)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                          }}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '12px' }}>
                    <button
                      className="btn-secondary"
                      style={{
                        flex: 1,
                        padding: '5px 8px',
                        fontSize: '0.78rem',
                        borderColor: item.isVacant ? '#22c55e' : 'var(--color-border)',
                        color: item.isVacant ? '#168A5B' : 'var(--color-text-primary)',
                      }}
                      onClick={() => handleToggleVacant(item.id, item.isVacant)}
                    >
                      {item.isVacant ? 'Mark Occupied' : 'Mark Vacant'}
                    </button>
                    <button
                      className="btn-secondary"
                      style={{ padding: '5px 8px', fontSize: '0.78rem' }}
                      onClick={() => handleOpenModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-secondary"
                      style={{ color: 'var(--color-danger)', padding: '5px 8px', fontSize: '0.78rem' }}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Gallery Campaign Item' : 'Add Campaign Photo to Gallery'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Campaign Photo (WebP Auto-Optimized) *</label>
            <input type="file" accept="image/*" className="form-input" onChange={handleFileChange} />
            {previewUrl && (
              <div style={{ marginTop: '10px', height: '120px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Campaign Title / Client Brand *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. myG Digital Hub Launch Campaign"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="hoardings">Prime Hoardings</option>
                <option value="myg">myG Campaigns</option>
                <option value="transit">Bus & Transit Media</option>
                <option value="retail">Retail Facade</option>
                <option value="event">Events & Exhibitions</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Badge Label</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Unipole / Highway"
                value={formData.badgeType}
                onChange={(e) => setFormData({ ...formData, badgeType: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Location / Highway *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Bypass Junction, Trivandrum"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Dimensions / Size</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 60ft x 20ft"
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Specs & Highlights (1 per line)</label>
            <textarea
              className="form-textarea"
              placeholder="Front Lit LED Lighting&#10;100% Traffic Viewpoint&#10;Solar Powered"
              rows={3}
              value={formData.specsText}
              onChange={(e) => setFormData({ ...formData, specsText: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Vacant Site Toggle</label>
              <select
                className="form-select"
                value={formData.isVacant}
                onChange={(e) => setFormData({ ...formData, isVacant: e.target.value === 'true' })}
              >
                <option value="false">Occupied / Campaign Show</option>
                <option value="true">VACANT NOW (Available for Booking)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Active Visibility</label>
              <select
                className="form-select"
                value={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
              >
                <option value="true">Active (Visible in Gallery)</option>
                <option value="false">Hidden (Draft)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={uploading}>
              {uploading ? 'Uploading & Saving...' : editingId ? 'Update Item' : 'Add to Gallery'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
