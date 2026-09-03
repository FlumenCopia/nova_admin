'use client';

import { useState, useEffect } from 'react';
import Modal from '../../../components/Modal';
import Toast from '../../../components/Toast';
import { apiFetch, uploadImage, uploadMultipleImages, getMediaUrl } from '../../../lib/api';

const DEFAULT_CATEGORIES = [
  { key: 'hoardings', label: 'Prime Hoardings' },
  { key: 'myg', label: 'myG Campaigns' },
  { key: 'transit', label: 'Bus & Transit Media' },
  { key: 'retail', label: 'Retail Facade & Signboards' },
  { key: 'event', label: 'Events & Exhibitions' },
  { key: 'wall', label: 'Commercial Wall Painting' },
  { key: 'printing', label: 'Design Studio & Digital Printing' },
  { key: 'dooh', label: 'LED & Digital OOH' },
  { key: 'unipole', label: 'Highway Gantries & Unipoles' },
  { key: 'ksrtc', label: 'KSRTC Fleet Branding' },
  { key: 'airport', label: 'Airport & Metro Media' },
];

export default function CampaignGalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [categoriesList, setCategoriesList] = useState(DEFAULT_CATEGORIES);
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState('');

  // Tabbed Photo Selection: 'upload' | 'library'
  const [photoSourceTab, setPhotoSourceTab] = useState('upload');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [mediaLibrary, setMediaLibrary] = useState([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  const [selectedLibraryUrls, setSelectedLibraryUrls] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    category: 'hoardings',
    badgeType: 'Billboard',
    location: '',
    dimensions: '',
    specsText: '',
    isActive: true,
  });

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

  const fetchMediaLibrary = async () => {
    setLoadingLibrary(true);
    try {
      const res = await apiFetch('/admin/portfolio/media-library');
      if (res.success) {
        setMediaLibrary(res.data || []);
      }
    } catch (err) {
      console.error('Fetch media library error:', err);
    } finally {
      setLoadingLibrary(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Dynamically sync any unique categories present in items
  useEffect(() => {
    if (items.length > 0) {
      setCategoriesList((prev) => {
        const existingKeys = new Set(prev.map((c) => c.key.toLowerCase()));
        const newCats = [...prev];
        items.forEach((item) => {
          if (item.category && !existingKeys.has(item.category.toLowerCase())) {
            existingKeys.add(item.category.toLowerCase());
            const label = item.category.charAt(0).toUpperCase() + item.category.slice(1).replace(/-/g, ' ');
            newCats.push({ key: item.category, label });
          }
        });
        return newCats;
      });
    }
  }, [items]);

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    if (val === '__custom__') {
      setShowCustomCategoryInput(true);
      setCustomCategoryName('');
    } else {
      setShowCustomCategoryInput(false);
      setFormData((prev) => ({ ...prev, category: val }));
    }
  };

  const handleAddCustomCategory = () => {
    const trimmed = customCategoryName.trim();
    if (!trimmed) return;
    const key = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = categoriesList.find((c) => c.key === key);
    if (!existing) {
      const newCat = { key, label: trimmed };
      setCategoriesList((prev) => [...prev, newCat]);
    }
    setFormData((prev) => ({ ...prev, category: key }));
    setShowCustomCategoryInput(false);
    setCustomCategoryName('');
  };

  const handleOpenModal = (item = null) => {
    setSelectedFiles([]);
    setFilePreviews([]);
    setSelectedLibraryUrls([]);
    setPhotoSourceTab('upload');
    setShowCustomCategoryInput(false);
    setCustomCategoryName('');

    if (item) {
      setEditingId(item.id);
      setFilePreviews(item.imageUrl ? [getMediaUrl(item.imageUrl)] : []);
      setFormData({
        title: item.title,
        category: item.category || 'hoardings',
        badgeType: item.badgeType || 'Billboard',
        location: item.location || '',
        dimensions: item.dimensions || '',
        specsText: Array.isArray(item.specs) ? item.specs.join('\n') : '',
        isActive: item.isActive !== false,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        category: 'hoardings',
        badgeType: 'Billboard',
        location: '',
        dimensions: '',
        specsText: '',
        isActive: true,
      });
      fetchMediaLibrary();
    }
    setIsModalOpen(true);
  };

  const handleMultipleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setFilePreviews(previews);
    }
  };

  const toggleLibraryUrl = (url) => {
    setSelectedLibraryUrls((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const specsArray = formData.specsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      // CASE 1: EDITING AN EXISTING ITEM
      if (editingId) {
        let finalImageUrl = filePreviews[0] || '';

        if (selectedFiles.length > 0) {
          const uploadRes = await uploadImage(selectedFiles[0]);
          if (uploadRes.success) {
            finalImageUrl = uploadRes.url;
          } else {
            setToastMsg(uploadRes.message || 'Image upload failed.');
            setUploading(false);
            return;
          }
        }

        const payload = {
          title: formData.title,
          category: formData.category,
          badgeType: formData.badgeType,
          location: formData.location,
          dimensions: formData.dimensions,
          specs: specsArray,
          imageUrl: finalImageUrl,
          isActive: formData.isActive,
        };

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
        return;
      }

      // CASE 2: CREATING NEW ITEMS (MULTI-UPLOAD OR MEDIA LIBRARY)
      let targetImageUrls = [];

      if (photoSourceTab === 'upload') {
        if (selectedFiles.length === 0) {
          setToastMsg('Please select at least one photo to upload.');
          setUploading(false);
          return;
        }

        if (selectedFiles.length === 1) {
          const uploadRes = await uploadImage(selectedFiles[0]);
          if (!uploadRes.success) {
            setToastMsg(uploadRes.message || 'Upload failed.');
            setUploading(false);
            return;
          }
          targetImageUrls = [uploadRes.url];
        } else {
          const uploadRes = await uploadMultipleImages(selectedFiles);
          if (!uploadRes.success) {
            setToastMsg(uploadRes.message || 'Multiple upload failed.');
            setUploading(false);
            return;
          }
          targetImageUrls = (uploadRes.data || []).map((img) => img.url);
        }
      } else {
        // Media Library Selection
        if (selectedLibraryUrls.length === 0) {
          setToastMsg('Please click to select at least one photo from the Media Library.');
          setUploading(false);
          return;
        }
        targetImageUrls = selectedLibraryUrls;
      }

      // Batch create items
      let successCount = 0;
      for (let i = 0; i < targetImageUrls.length; i++) {
        const itemTitle =
          targetImageUrls.length > 1
            ? `${formData.title} (${i + 1})`
            : formData.title;

        const payload = {
          title: itemTitle,
          category: formData.category,
          badgeType: formData.badgeType,
          location: formData.location,
          dimensions: formData.dimensions,
          specs: specsArray,
          imageUrl: targetImageUrls[i],
          isActive: formData.isActive,
        };

        const res = await apiFetch('/admin/portfolio', {
          method: 'POST',
          body: JSON.stringify(payload),
        });

        if (res.success) {
          successCount++;
        }
      }

      if (successCount > 0) {
        setToastMsg(`Successfully added ${successCount} campaign photo(s) to gallery!`);
        setIsModalOpen(false);
        fetchItems();
      } else {
        setToastMsg('Failed to create gallery items.');
      }
    } catch (err) {
      console.error('Gallery save error:', err);
      setToastMsg('An error occurred while saving.');
    } finally {
      setUploading(false);
    }
  };

  const handleToggleActive = async (id, currentActive) => {
    const nextActive = !currentActive;
    // Optimistic local update (zero flicker, zero scroll jump)
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isActive: nextActive } : item))
    );

    try {
      const res = await apiFetch(`/admin/portfolio/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ isActive: nextActive }),
      });
      if (res.success) {
        setToastMsg(`Campaign photo is now ${nextActive ? 'Active (Visible)' : 'Draft (Hidden)'}.`);
      } else {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, isActive: currentActive } : item))
        );
        setToastMsg(res.message || 'Failed to update visibility.');
      }
    } catch (err) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isActive: currentActive } : item))
      );
      setToastMsg('Failed to update visibility.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      const res = await apiFetch(`/admin/portfolio/${id}`, { method: 'DELETE' });
      if (res.success) {
        setToastMsg('Item deleted from gallery.');
        fetchItems();
      } else {
        setToastMsg(res.message || 'Delete failed.');
      }
    } catch (err) {
      setToastMsg('Failed to delete item.');
    }
  };

  const filteredItems = items.filter((item) => {
    if (filterCategory === 'ALL') return true;
    return item.category === filterCategory;
  });

  return (
    <>
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Campaign Gallery Showcase</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Manage high-impact outdoor media, bus wraps, retail branding, and campaign executions
          </p>
        </div>

        <button onClick={() => handleOpenModal()} className="btn-primary">
          + Add Gallery Item
        </button>
      </div>

      {/* FILTER TABS */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilterCategory('ALL')}
          className="btn-secondary"
          style={{
            padding: '6px 14px',
            fontSize: '0.85rem',
            fontWeight: 600,
            borderColor: filterCategory === 'ALL' ? 'var(--color-primary)' : 'var(--color-border)',
            color: filterCategory === 'ALL' ? 'var(--color-primary)' : 'var(--color-text-primary)',
            background: filterCategory === 'ALL' ? 'var(--color-primary-soft)' : 'var(--color-card-background)',
          }}
        >
          All Items ({items.length})
        </button>

        {categoriesList.map((tab) => {
          const count = items.filter((i) => i.category === tab.key).length;
          return (
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
              {tab.label} {count > 0 ? `(${count})` : ''}
            </button>
          );
        })}
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
            const imgSrc = getMediaUrl(item.imageUrl);

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
                  opacity: item.isActive !== false ? 1 : 0.75,
                }}
              >
                <div style={{ position: 'relative', height: '180px', background: '#e2e8f0' }}>
                  <img
                    src={imgSrc}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/logo.png'; }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: item.isActive !== false ? '#22c55e' : '#64748b',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.isActive !== false ? 'ACTIVE' : 'DRAFT'}
                  </span>
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
                        padding: '6px 8px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        borderColor: item.isActive !== false ? '#94a3b8' : '#22c55e',
                        color: item.isActive !== false ? '#475569' : '#16a34a',
                      }}
                      onClick={() => handleToggleActive(item.id, item.isActive !== false)}
                    >
                      {item.isActive !== false ? 'Hide (Draft)' : 'Show (Active)'}
                    </button>
                    <button
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.82rem' }}
                      onClick={() => handleOpenModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-secondary"
                      style={{ color: 'var(--color-danger)', borderColor: 'rgba(217, 45, 32, 0.3)', padding: '6px 10px', fontSize: '0.82rem' }}
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
        title={editingId ? 'Edit Gallery Campaign Item' : 'Add Campaign Photos to Gallery'}
      >
        <form onSubmit={handleSubmit}>
          {/* TAB HEADERS FOR PHOTO SELECTION */}
          {!editingId && (
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setPhotoSourceTab('upload')}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  borderColor: photoSourceTab === 'upload' ? 'var(--color-primary)' : 'var(--color-border)',
                  color: photoSourceTab === 'upload' ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  background: photoSourceTab === 'upload' ? 'var(--color-primary-soft)' : 'var(--color-card-background)',
                }}
              >
                📁 Upload New Photos {selectedFiles.length > 0 && `(${selectedFiles.length})`}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setPhotoSourceTab('library');
                  fetchMediaLibrary();
                }}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  borderColor: photoSourceTab === 'library' ? 'var(--color-primary)' : 'var(--color-border)',
                  color: photoSourceTab === 'library' ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  background: photoSourceTab === 'library' ? 'var(--color-primary-soft)' : 'var(--color-card-background)',
                }}
              >
                🖼️ Choose from Media Library {selectedLibraryUrls.length > 0 && `(${selectedLibraryUrls.length})`}
              </button>
            </div>
          )}

          {/* TAB 1: UPLOAD NEW PHOTOS */}
          {(editingId || photoSourceTab === 'upload') && (
            <div className="form-group">
              <label className="form-label">
                {editingId ? 'Campaign Photo (WebP Auto-Optimized) *' : 'Select Photos to Upload (Hold Shift/Ctrl for Multiple) *'}
              </label>
              <input
                type="file"
                accept="image/*"
                multiple={!editingId}
                className="form-input"
                onChange={handleMultipleFilesChange}
              />

              {filePreviews.length > 0 && (
                <div style={{ marginTop: '12px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
                    Previewing {filePreviews.length} selected photo(s):
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '8px', maxHeight: '160px', overflowY: 'auto' }}>
                    {filePreviews.map((url, pIdx) => (
                      <div key={pIdx} style={{ height: '70px', borderRadius: '6px', overflow: 'hidden', border: '2px solid var(--color-primary)' }}>
                        <img src={url} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SELECT FROM MEDIA LIBRARY */}
          {!editingId && photoSourceTab === 'library' && (
            <div className="form-group">
              <label className="form-label">
                Click photos in Media Library to select ({selectedLibraryUrls.length} selected):
              </label>
              {loadingLibrary ? (
                <div style={{ padding: '16px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                  Loading Media Library assets...
                </div>
              ) : mediaLibrary.length === 0 ? (
                <div style={{ padding: '16px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                  No previous media files found in library. Use the "Upload New Photos" tab above.
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '8px', maxHeight: '200px', overflowY: 'auto', padding: '4px', border: '1px solid var(--color-border)', borderRadius: '6px' }}>
                  {mediaLibrary.map((url, mIdx) => {
                    const isSelected = selectedLibraryUrls.includes(url);
                    const imgSrc = getMediaUrl(url);
                    return (
                      <div
                        key={mIdx}
                        onClick={() => toggleLibraryUrl(url)}
                        style={{
                          position: 'relative',
                          height: '75px',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: isSelected ? '3px solid #22c55e' : '1px solid var(--color-border)',
                          boxShadow: isSelected ? '0 0 8px rgba(34, 197, 94, 0.4)' : 'none',
                        }}
                      >
                        <img src={imgSrc} alt="Media Asset" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {isSelected && (
                          <span style={{ position: 'absolute', top: '4px', right: '4px', background: '#22c55e', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>
                            ✓
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>Category *</label>
                {!showCustomCategoryInput && (
                  <button
                    type="button"
                    onClick={() => setShowCustomCategoryInput(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-primary)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    + Add New Category
                  </button>
                )}
              </div>

              {!showCustomCategoryInput ? (
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={handleCategoryChange}
                >
                  {categoriesList.map((cat) => (
                    <option key={cat.key} value={cat.key}>
                      {cat.label}
                    </option>
                  ))}
                  <option value="__custom__">+ Add Custom Category...</option>
                </select>
              ) : (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Airport Lounge"
                    autoFocus
                    value={customCategoryName}
                    onChange={(e) => setCustomCategoryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomCategory();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ padding: '8px 14px', fontSize: '0.85rem', flexShrink: 0 }}
                    onClick={handleAddCustomCategory}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ padding: '8px 10px', fontSize: '0.85rem', flexShrink: 0 }}
                    onClick={() => setShowCustomCategoryInput(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
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

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={uploading}>
              {uploading
                ? 'Uploading & Saving...'
                : editingId
                  ? 'Update Item'
                  : photoSourceTab === 'upload' && selectedFiles.length > 1
                    ? `Add ${selectedFiles.length} Photos to Gallery`
                    : photoSourceTab === 'library' && selectedLibraryUrls.length > 0
                      ? `Add ${selectedLibraryUrls.length} Library Photo(s)`
                      : 'Add to Gallery'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
