'use client';

import { useState, useEffect, useRef } from 'react';
import Toast from '../../../components/Toast';
import { apiRequest, getMediaUrl, uploadFounderImage } from '../../../lib/api';

export default function FounderHeroAdminPage() {
  const [founderHeroTag, setFounderHeroTag] = useState('');
  const [founderHeroTitle, setFounderHeroTitle] = useState('');
  const [founderHeroDesc, setFounderHeroDesc] = useState('');
  const [founderHeroCtaText, setFounderHeroCtaText] = useState('');
  const [founderHeroCtaPhone, setFounderHeroCtaPhone] = useState('');
  const [founderName, setFounderName] = useState('');
  const [founderRole, setFounderRole] = useState('');
  const [founderImage, setFounderImage] = useState('');

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchSettings = async () => {
    try {
      const res = await apiRequest('/admin/settings');
      if (res && res.success && res.data) {
        const d = res.data;
        setFounderHeroTag(d.founderHeroTag || '');
        setFounderHeroTitle(d.founderHeroTitle || '');
        setFounderHeroDesc(d.founderHeroDesc || '');
        setFounderHeroCtaText(d.founderHeroCtaText || '');
        setFounderHeroCtaPhone(d.founderHeroCtaPhone || '');
        setFounderName(d.founderName || '');
        setFounderRole(d.founderRole || '');
        setFounderImage(d.founderImage || '');
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleImageFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleClearAll = () => {
    setFounderHeroTag('');
    setFounderHeroTitle('');
    setFounderHeroDesc('');
    setFounderHeroCtaText('');
    setFounderHeroCtaPhone('');
    setFounderName('');
    setFounderRole('');
    setFounderImage('');
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePhoto = () => {
    setFounderImage('');
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalImageUrl = founderImage;

      // If user uploaded a new profile photo
      if (imageFile) {
        const uploadRes = await uploadFounderImage(imageFile);
        if (uploadRes && uploadRes.success && uploadRes.imageUrl) {
          finalImageUrl = uploadRes.imageUrl;
          setFounderImage(finalImageUrl);
          setImagePreview(null);
          setImageFile(null);
        } else {
          throw new Error(uploadRes.message || 'Failed to upload photo');
        }
      }

      // Update settings in backend
      const res = await apiRequest('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          founderHeroTag,
          founderHeroTitle,
          founderHeroDesc,
          founderHeroCtaText,
          founderHeroCtaPhone,
          founderName,
          founderRole,
          founderImage: finalImageUrl,
        }),
      });

      if (res && res.success) {
        setToastType('success');
        setToastMsg('Founder Hero Section saved successfully!');
      } else {
        throw new Error(res.message || 'Failed to update founder settings');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg(err.message || 'Error saving founder settings');
    } finally {
      setSaving(false);
    }
  };

  const currentPhotoDisplay = imagePreview || (founderImage ? getMediaUrl(founderImage) : '');

  return (
    <div style={{ padding: '24px 28px', maxWidth: '1200px', margin: '0 auto' }}>
      {toastMsg && <Toast message={toastMsg} type={toastType} onClose={() => setToastMsg('')} />}

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#dc2626', letterSpacing: '0.08em', background: '#fee2e2', padding: '3px 10px', borderRadius: '6px' }}>
              Founder Page
            </span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: 0 }}>
            Founder Hero Section
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.92rem', marginTop: '6px' }}>
            Edit the headline, tagline, call-to-action button, and portrait photo for the main Founder page (<code>/founder-of-nova.html</code>).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={handleClearAll}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#f9fafb',
              border: '1px solid #d1d5db',
              color: '#4b5563',
              padding: '10px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Clear All
          </button>
          <a
            href="http://localhost:3000/founder-of-nova.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              color: '#374151',
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '0.88rem',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            <span>View Live Page</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>

      {/* LIVE PREVIEW BANNER */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
            Live Preview
          </h3>
          <span style={{ fontSize: '0.82rem', color: '#9ca3af' }}>Updates live as you type below</span>
        </div>

        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
            padding: '40px 48px',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '40px',
            alignItems: 'center',
            minHeight: '340px',
          }}
        >
          {/* Left Column Content */}
          <div>
            {founderHeroTag ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#1f2937',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  marginBottom: '16px',
                }}
              >
                <span style={{ color: '#111827' }}>★</span>
                <span>{founderHeroTag}</span>
              </div>
            ) : (
              <div style={{ color: '#d1d5db', fontSize: '0.82rem', marginBottom: '16px', fontStyle: 'italic' }}>
                ★ (Tagline / Badge text)
              </div>
            )}

            <h2
              style={{
                fontSize: '2.2rem',
                fontWeight: 900,
                color: founderHeroTitle ? '#111827' : '#d1d5db',
                lineHeight: 1.15,
                margin: '0 0 16px 0',
                letterSpacing: '-0.02em',
                whiteSpace: 'pre-line',
              }}
            >
              {founderHeroTitle || '(Main Headline / Title)'}
            </h2>

            <p
              style={{
                color: founderHeroDesc ? '#6b7280' : '#d1d5db',
                fontSize: '0.94rem',
                lineHeight: 1.6,
                margin: '0 0 24px 0',
                maxWidth: '480px',
                fontStyle: founderHeroDesc ? 'normal' : 'italic',
              }}
            >
              {founderHeroDesc || '(Description / Subtitle paragraph)'}
            </p>

            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: founderHeroCtaText ? '#dc2626' : '#e5e7eb',
                  color: founderHeroCtaText ? '#ffffff' : '#9ca3af',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  boxShadow: founderHeroCtaText ? '0 4px 14px rgba(220, 38, 38, 0.35)' : 'none',
                }}
              >
                <span>{founderHeroCtaText || 'Button Text'}</span>
                <span>→</span>
              </div>
            </div>
          </div>

          {/* Right Column Image Composition */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                position: 'relative',
                width: '320px',
                height: '350px',
                borderRadius: '24px',
                overflow: 'hidden',
                background: '#f3f4f6',
                boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {currentPhotoDisplay ? (
                <img
                  src={currentPhotoDisplay}
                  alt={founderName || 'Founder Photo'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div style={{ textAlign: 'center', color: '#9ca3af', padding: '20px' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 8px' }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <div style={{ fontSize: '0.85rem' }}>No photo selected</div>
                </div>
              )}

              {/* Founder Tag Badge at Bottom */}
              {(founderName || founderRole) && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    right: '16px',
                    background: 'rgba(17, 24, 39, 0.92)',
                    backdropFilter: 'blur(8px)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    borderLeft: '4px solid #dc2626',
                    color: '#ffffff',
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.02em' }}>
                    {founderName || 'Founder Name'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>
                    {founderRole || 'Founder Designation'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FORM CONTROLS */}
      <form onSubmit={handleSave} style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '32px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', margin: '0 0 24px 0' }}>
          Edit Section Content & Founder Info
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Top Tagline */}
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
              Tagline / Badge (Top Text)
            </label>
            <input
              type="text"
              value={founderHeroTag}
              onChange={(e) => setFounderHeroTag(e.target.value)}
              placeholder="e.g. 27+ Years of Creative Advertising Excellence"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Main Title */}
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
              Hero Headline / Title (Line breaks supported)
            </label>
            <textarea
              rows={2}
              value={founderHeroTitle}
              onChange={(e) => setFounderHeroTitle(e.target.value)}
              placeholder="e.g. INNOVATIONS THAT&#10;HALLMARKS YOUR BRAND"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '0.92rem',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Description */}
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
              Hero Subtitle / Description Paragraph
            </label>
            <textarea
              rows={3}
              value={founderHeroDesc}
              onChange={(e) => setFounderHeroDesc(e.target.value)}
              placeholder="Describe your services or leave blank..."
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '0.92rem',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* CTA Button Text */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
              CTA Button Label
            </label>
            <input
              type="text"
              value={founderHeroCtaText}
              onChange={(e) => setFounderHeroCtaText(e.target.value)}
              placeholder="e.g. Book Hoardings"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            />
          </div>

          {/* CTA Phone */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
              CTA Phone Number (for tel: link)
            </label>
            <input
              type="text"
              value={founderHeroCtaPhone}
              onChange={(e) => setFounderHeroCtaPhone(e.target.value)}
              placeholder="e.g. +91 95390 00640"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Founder Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
              Founder Name (Shown on photo badge)
            </label>
            <input
              type="text"
              value={founderName}
              onChange={(e) => setFounderName(e.target.value)}
              placeholder="e.g. GIREESH KUMAR S"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Founder Role */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
              Founder Role / Designation
            </label>
            <input
              type="text"
              value={founderRole}
              onChange={(e) => setFounderRole(e.target.value)}
              placeholder="e.g. Founder & CEO — NOVA Innovations"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Photo Upload Section */}
          <div style={{ gridColumn: 'span 2', paddingTop: '8px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
              Founder Portrait Photo
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {currentPhotoDisplay ? (
                <img
                  src={currentPhotoDisplay}
                  alt="Thumbnail"
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    border: '2px solid #e5e7eb',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '12px',
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed #d1d5db',
                    color: '#9ca3af',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
              )}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleImageFileChange}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  style={{
                    background: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Choose Photo
                </button>
                {currentPhotoDisplay && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    style={{
                      background: '#fff',
                      border: '1px solid #fca5a5',
                      color: '#dc2626',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '14px' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              background: '#dc2626',
              color: '#ffffff',
              padding: '12px 28px',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 700,
              border: 'none',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.7 : 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 6px rgba(220, 38, 38, 0.25)',
            }}
          >
            {saving ? 'Saving Changes...' : 'Save Founder Section'}
          </button>
        </div>
      </form>
    </div>
  );
}
