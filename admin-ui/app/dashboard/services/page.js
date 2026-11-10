'use client';

import { useState, useEffect } from 'react';
import Modal from '../../../components/Modal';
import Toast from '../../../components/Toast';
import { apiFetch, PUBLIC_SITE_URL } from '../../../lib/api';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    icon: 'billboard',
    description: '',
    featuresText: '',
    order: 0,
    isActive: true,
  });

  const [submitting, setSubmitting] = useState(false);

  // Section Header Settings State
  const [sectionSubhead, setSectionSubhead] = useState('WHAT WE OFFER');
  const [sectionHeading, setSectionHeading] = useState('Comprehensive Advertising Services');
  const [sectionDesc, setSectionDesc] = useState(
    'End-to-end outdoor advertising, design studio creations, transit branding, and corporate events across Kerala.'
  );
  const [savingHeader, setSavingHeader] = useState(false);

  const fetchServices = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const res = await apiFetch('/admin/services');
      if (res.success) {
        setServices(res.data || []);
      }
    } catch (err) {
      console.error('Fetch services error:', err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const fetchHeaderSettings = async () => {
    try {
      const res = await apiFetch('/admin/settings');
      if (res.success && res.data) {
        if (res.data.servicesSectionSubhead) setSectionSubhead(res.data.servicesSectionSubhead);
        if (res.data.servicesSectionHeading) setSectionHeading(res.data.servicesSectionHeading);
        if (res.data.servicesSectionDesc) setSectionDesc(res.data.servicesSectionDesc);
      }
    } catch (err) {
      console.error('Fetch settings error:', err);
    }
  };

  useEffect(() => {
    fetchServices(true);
    fetchHeaderSettings();
  }, []);

  const handleSaveHeader = async (e) => {
    e.preventDefault();
    setSavingHeader(true);
    try {
      const res = await apiFetch('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          servicesSectionSubhead: sectionSubhead,
          servicesSectionHeading: sectionHeading,
          servicesSectionDesc: sectionDesc,
        }),
      });
      if (res.success) {
        setToastMsg('Services section header updated successfully!');
      } else {
        setToastMsg(res.message || 'Failed to update section header.');
      }
    } catch (err) {
      setToastMsg('Failed to update section header.');
    } finally {
      setSavingHeader(false);
    }
  };

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingId(service.id);
      setFormData({
        title: service.title,
        subtitle: service.subtitle || '',
        icon: service.icon || 'billboard',
        description: service.description || '',
        featuresText: Array.isArray(service.features) ? service.features.join('\n') : '',
        order: service.order || 0,
        isActive: service.isActive !== undefined ? service.isActive : true,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        subtitle: '',
        icon: 'billboard',
        description: '',
        featuresText: '',
        order: services.length + 1,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      features: formData.featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        const res = await apiFetch(`/admin/services/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        if (res.success) {
          setToastMsg('Service updated successfully!');
          setIsModalOpen(false);
          fetchServices(false);
        } else {
          setToastMsg(res.message || 'Failed to update service.');
        }
      } else {
        const res = await apiFetch('/admin/services', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        if (res.success) {
          setToastMsg('Service created successfully!');
          setIsModalOpen(false);
          fetchServices(false);
        } else {
          setToastMsg(res.message || 'Failed to create service.');
        }
      }
    } catch (err) {
      setToastMsg('An error occurred saving service.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    // Optimistic state update: Update local state immediately (no flicker, no scroll jump!)
    const nextStatus = !currentStatus;
    setServices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isActive: nextStatus } : item))
    );

    try {
      const res = await apiFetch(`/admin/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ isActive: nextStatus }),
      });
      if (res.success) {
        setToastMsg(`Service ${nextStatus ? 'activated' : 'hidden'}.`);
      } else {
        // Revert on error
        setServices((prev) =>
          prev.map((item) => (item.id === id ? { ...item, isActive: currentStatus } : item))
        );
        setToastMsg(res.message || 'Failed to update status.');
      }
    } catch (err) {
      // Revert on error
      setServices((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isActive: currentStatus } : item))
      );
      setToastMsg('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service card?')) return;
    try {
      const res = await apiFetch(`/admin/services/${id}`, {
        method: 'DELETE',
      });
      if (res.success) {
        setToastMsg('Service deleted successfully.');
        fetchServices(false);
      }
    } catch (err) {
      setToastMsg('Failed to delete service.');
    }
  };

  return (
    <>
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Services Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage core service offerings and header displayed on the website portal and founder page
          </p>
        </div>

        <div className="page-header-actions" style={{ display: 'flex', gap: '10px' }}>
          <a
            href={`${PUBLIC_SITE_URL}/founder-of-nova.html#services`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <span>View Live Section</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
          <button onClick={() => handleOpenModal()} className="btn-primary">
            + Add New Service
          </button>
        </div>
      </div>

      {/* SECTION HEADER SETTINGS CARD */}
      <div className="card" style={{ padding: '24px', marginBottom: '24px', borderLeft: '4px solid #dc2626' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Services Section Header</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
              Customizes the title, badge, and description displayed above the service cards grid.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveHeader}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                Section Tag / Subhead
              </label>
              <input
                type="text"
                value={sectionSubhead}
                onChange={(e) => setSectionSubhead(e.target.value)}
                placeholder="e.g. WHAT WE OFFER"
                required
                className="input-field"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                Section Main Heading
              </label>
              <input
                type="text"
                value={sectionHeading}
                onChange={(e) => setSectionHeading(e.target.value)}
                placeholder="e.g. Comprehensive Advertising Services"
                required
                className="input-field"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>
              Section Description Paragraph
            </label>
            <textarea
              rows={2}
              value={sectionDesc}
              onChange={(e) => setSectionDesc(e.target.value)}
              placeholder="e.g. End-to-end outdoor advertising, design studio creations..."
              required
              className="input-field"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={savingHeader}
              className="btn-primary"
              style={{ padding: '8px 20px', fontSize: '0.88rem' }}
            >
              {savingHeader ? 'Saving Header...' : 'Save Section Header'}
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          Loading services...
        </div>
      ) : services.length === 0 ? (
        <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          No services created yet. Click &quot;+ Add New Service&quot; to create your first advertising package.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {services.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                gap: '16px',
                borderLeft: item.isActive ? '4px solid var(--color-primary)' : '4px solid var(--color-border)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                      Order #{item.order}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '2px 0 4px 0' }}>{item.title}</h3>
                    {item.subtitle && (
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                  <span className={`badge badge-${item.isActive ? 'active' : 'hidden'}`}>
                    {item.isActive ? 'ACTIVE' : 'HIDDEN'}
                  </span>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '14px' }}>
                  {item.description}
                </p>

                {item.features && item.features.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                      Key Features & Deliverables:
                    </div>
                    <ul style={{ paddingLeft: '18px', fontSize: '0.82rem', color: 'var(--color-text-primary)', margin: 0 }}>
                      {item.features.map((feat, idx) => (
                        <li key={idx} style={{ marginBottom: '4px' }}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--color-border)', paddingTop: '14px' }}>
                <button
                  className="btn-secondary"
                  style={{ flex: 1, padding: '6px 12px', fontSize: '0.82rem' }}
                  onClick={() => handleOpenModal(item)}
                >
                  Edit Service
                </button>
                <button
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.82rem' }}
                  onClick={() => handleToggleActive(item.id, item.isActive)}
                >
                  {item.isActive ? 'Hide' : 'Show'}
                </button>
                <button
                  className="btn-secondary"
                  style={{ color: 'var(--color-danger)', padding: '6px 12px', fontSize: '0.82rem' }}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Advertising Service' : 'Add New Service Package'}
      >
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Service Title *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Outdoor Hoardings"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Sub-Headline / Tagline</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Prime Highway & City Billboards"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Icon Style</label>
              <select
                className="form-select"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              >
                <option value="billboard">Billboard / Hoarding (Ad Icon)</option>
                <option value="transit">Vehicle / Transit (Bus Icon)</option>
                <option value="retail">Shop & Facade (Store Icon)</option>
                <option value="event">Event & Stalls (Celebration Icon)</option>
                <option value="wall">Wall Painting (Paintbrush Icon)</option>
                <option value="design">Design Studio (Ruler/Pen Icon)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description Brief *</label>
            <textarea
              className="form-textarea"
              placeholder="Describe the media channel or service offerings..."
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Key Deliverables / Features (1 per line)</label>
            <textarea
              className="form-textarea"
              placeholder="Illuminated & Non-Lit Billboards&#10;Unipoles & Gantries at High-Traffic Junctions&#10;Pan-Kerala Coverage"
              rows={4}
              value={formData.featuresText}
              onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Display Order</label>
              <input
                type="number"
                className="form-input"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Visibility Status</label>
              <select
                className="form-select"
                value={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
              >
                <option value="true">Active (Visible on website)</option>
                <option value="false">Hidden (Draft mode)</option>
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
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : editingId ? 'Update Service' : 'Save Service'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
