'use client';

import { useState, useEffect } from 'react';
import Modal from '../../../components/Modal';
import Toast from '../../../components/Toast';
import { apiRequest, getMediaUrl } from '../../../lib/api';

export default function PortfolioAdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('hoardings');
  const [badgeType, setBadgeType] = useState('Prime Billboard');
  const [badgeStatus, setBadgeStatus] = useState('High Traffic');
  const [location, setLocation] = useState('');
  const [dimensions, setDimensions] = useState('30 x 20 Feet');
  const [specs, setSpecs] = useState('');
  const [isVacant, setIsVacant] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPortfolio = async (targetPage = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const res = await apiRequest(`/admin/portfolio?page=${targetPage}&limit=10`);
      if (res.success) {
        if (isLoadMore) {
          setItems((prev) => [...prev, ...res.data]);
        } else {
          setItems(res.data);
        }
        setPage(targetPage);
        setHasMore(res.pagination ? res.pagination.hasMore : false);
        setTotalCount(res.pagination ? res.pagination.total : (res.data ? res.data.length : 0));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchPortfolio(page + 1, true);
    }
  };

  useEffect(() => {
    fetchPortfolio(1, false);
  }, []);

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('hoardings');
    setBadgeType('Prime Billboard');
    setBadgeStatus('High Traffic');
    setLocation('Panavila Junction, Trivandrum');
    setDimensions('30 x 20 Feet');
    setSpecs('Lit Billboard, Frontage view, High CPM');
    setIsVacant(false);
    setIsActive(true);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category || 'hoardings');
    setBadgeType(item.badgeType || 'Billboard');
    setBadgeStatus(item.badgeStatus || 'Prime');
    setLocation(item.location || '');
    setDimensions(item.dimensions || '');
    setSpecs(Array.isArray(item.specs) ? item.specs.join(', ') : item.specs || '');
    setIsVacant(item.isVacant);
    setIsActive(item.isActive);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleToggleVacant = async (item) => {
    try {
      await apiRequest(`/admin/portfolio/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({ isVacant: !item.isVacant }),
      });
      setToastMsg(`Vacant status updated for ${item.title}`);
      fetchPortfolio();
    } catch (err) {
      setToastMsg('Failed to update status');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('badgeType', badgeType);
      formData.append('badgeStatus', isVacant ? 'VACANT NOW' : badgeStatus);
      formData.append('location', location);
      formData.append('dimensions', dimensions);
      formData.append('specs', specs);
      formData.append('isVacant', isVacant);
      formData.append('isActive', isActive);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const endpoint = editingItem ? `/admin/portfolio/${editingItem.id}` : '/admin/portfolio';
      const method = editingItem ? 'PUT' : 'POST';

      await apiRequest(endpoint, {
        method,
        body: formData,
      });

      setToastMsg(editingItem ? 'Hoarding updated!' : 'New hoarding added!');
      setIsModalOpen(false);
      fetchPortfolio();
    } catch (err) {
      setToastMsg(err.message || 'Failed to save hoarding');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this portfolio hoarding item?')) return;
    try {
      await apiRequest(`/admin/portfolio/${id}`, { method: 'DELETE' });
      setToastMsg('Hoarding deleted successfully');
      fetchPortfolio();
    } catch (err) {
      setToastMsg('Failed to delete item');
    }
  };

  return (
    <>
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Portfolio & Hoardings</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage billboard listings, transit bus campaigns, and real-time vacant site badges
          </p>
        </div>

        <div className="page-header-actions">
          <button onClick={handleOpenCreateModal} className="btn-primary">
            + Create New Listing
          </button>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Portfolio Listings...</div>
        ) : items.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No hoardings added yet. Click "+ Create New Listing" to add billboards or bus branding.
          </div>
        ) : (
          <>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Preview</th>
                    <th>Title & Location</th>
                    <th>Category</th>
                    <th>Dimensions</th>
                    <th>Vacant Status</th>
                    <th>Visibility</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div style={{ width: '60px', height: '42px', borderRadius: '4px', overflow: 'hidden', background: '#000' }}>
                          <img
                            src={getMediaUrl(item.imageUrl, '/logo.png')}
                            alt={item.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.target.src = '/logo.png'; }}
                          />
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700 }}>{item.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.location}</div>
                      </td>
                      <td>
                        <span className="badge" style={{ background: 'var(--color-page-background)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}>
                          {item.category}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>{item.dimensions || '—'}</td>
                      <td>
                        <button
                          onClick={() => handleToggleVacant(item)}
                          className={`badge ${item.isVacant ? 'badge-vacant' : 'badge-occupied'}`}
                          title="Click to toggle vacant availability"
                        >
                          {item.isVacant ? '✓ VACANT NOW' : 'OCCUPIED'}
                        </button>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.8rem', color: item.isActive ? 'var(--brand-green)' : 'var(--text-muted)' }}>
                          {item.isActive ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleOpenEditModal(item)} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="btn-danger">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* LOAD MORE CONTROL */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderTop: '1px solid var(--border-color)', fontSize: '0.88rem' }}>
              <div style={{ color: 'var(--text-muted)' }}>
                Showing {items.length} of {totalCount} hoardings
              </div>

              {hasMore ? (
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="btn-primary"
                  style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                >
                  {loadingMore ? 'Loading More...' : `Load More Hoardings (${totalCount - items.length} remaining)`}
                </button>
              ) : (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  All {totalCount} hoardings loaded
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Hoarding Listing' : 'Add New Hoarding / Campaign'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Listing Title *</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="e.g. Panavila Junction Prime Billboard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="hoardings">Outdoor Hoarding</option>
                <option value="myg">myG Retail Campaign</option>
                <option value="transit">Bus & Vehicle Transit</option>
                <option value="vacant">Vacant Hoardings Available</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Dimensions / Size</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 35 x 25 Feet"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location / City *</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="e.g. Near Overbridge, Thiruvananthapuram"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Specifications (comma separated)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Frontlit, 24/7 Illumination, High Traffic Junction"
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image File (Native Sharp WebP Optimization)</label>
            <input
              type="file"
              accept="image/*"
              className="form-input"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              Uploaded images are automatically converted to optimized WebP format on the server.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '24px', margin: '20px 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={isVacant}
                onChange={(e) => setIsVacant(e.target.checked)}
              />
              Mark as "VACANT NOW" (Available for Immediate Booking)
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              Visible on Public Website
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : editingItem ? 'Update Hoarding' : 'Save Listing'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
