'use client';

import { useState, useEffect } from 'react';
import Modal from '../../../components/Modal';
import Toast from '../../../components/Toast';
import { apiFetch } from '../../../lib/api';

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

  useEffect(() => {
    fetchServices(true);
  }, []);

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
            Manage core service offerings displayed on the website portal
          </p>
        </div>

        <div className="page-header-actions">
          <button onClick={() => handleOpenModal()} className="btn-primary">
            + Add New Service
          </button>
        </div>
      </div>

      {loading ? (
        <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          Loading services...
        </div>
      ) : services.length === 0 ? (
        <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          No services created yet. Click "+ Add New Service" to create your first advertising package.
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
