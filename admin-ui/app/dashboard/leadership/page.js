'use client';

import { useState, useEffect, useRef } from 'react';
import Toast from '../../../components/Toast';
import { apiRequest, getMediaUrl, uploadLeaderImage, PUBLIC_SITE_URL } from '../../../lib/api';

export default function LeadershipPage() {
  const [leaderName, setLeaderName] = useState('');
  const [leaderRole, setLeaderRole] = useState('');
  const [leaderTag, setLeaderTag] = useState('');
  const [leaderYears, setLeaderYears] = useState('');
  const [leaderYearsLabel, setLeaderYearsLabel] = useState('');
  const [leaderImage, setLeaderImage] = useState('/heroman.jpeg');
  const [leaderBio, setLeaderBio] = useState('');
  const [leaderPhone, setLeaderPhone] = useState('');
  const [leaderFeature1Title, setLeaderFeature1Title] = useState('');
  const [leaderFeature1Desc, setLeaderFeature1Desc] = useState('');
  const [leaderFeature2Title, setLeaderFeature2Title] = useState('');
  const [leaderFeature2Desc, setLeaderFeature2Desc] = useState('');

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchSettings = async () => {
    try {
      const res = await apiRequest('/admin/settings');
      if (res.success && res.data) {
        const d = res.data;
        if (d.leaderName !== undefined) setLeaderName(d.leaderName || '');
        if (d.leaderRole !== undefined) setLeaderRole(d.leaderRole || '');
        if (d.leaderTag !== undefined) setLeaderTag(d.leaderTag || '');
        if (d.leaderYears !== undefined) setLeaderYears(d.leaderYears || '');
        if (d.leaderYearsLabel !== undefined) setLeaderYearsLabel(d.leaderYearsLabel || '');
        if (d.leaderImage !== undefined) setLeaderImage(d.leaderImage || '/heroman.jpeg');
        if (d.leaderBio !== undefined) setLeaderBio(d.leaderBio || '');
        if (d.leaderPhone !== undefined) setLeaderPhone(d.leaderPhone || '');
        if (d.leaderFeature1Title !== undefined) setLeaderFeature1Title(d.leaderFeature1Title || '');
        if (d.leaderFeature1Desc !== undefined) setLeaderFeature1Desc(d.leaderFeature1Desc || '');
        if (d.leaderFeature2Title !== undefined) setLeaderFeature2Title(d.leaderFeature2Title || '');
        if (d.leaderFeature2Desc !== undefined) setLeaderFeature2Desc(d.leaderFeature2Desc || '');
      }
    } catch (err) {
      console.error(err);
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

  const handleSaveLeadership = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalImageUrl = leaderImage;

      // If user uploaded a new profile photo
      if (imageFile) {
        const uploadRes = await uploadLeaderImage(imageFile);
        if (uploadRes && uploadRes.success && uploadRes.imageUrl) {
          finalImageUrl = uploadRes.imageUrl;
          setLeaderImage(finalImageUrl);
          setImagePreview(null);
          setImageFile(null);
        } else {
          throw new Error(uploadRes.message || 'Failed to upload leader photo');
        }
      }

      // Update settings with all leadership fields
      const res = await apiRequest('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          leaderName,
          leaderRole,
          leaderTag,
          leaderYears,
          leaderYearsLabel,
          leaderImage: finalImageUrl,
          leaderBio,
          leaderPhone,
          leaderFeature1Title,
          leaderFeature1Desc,
          leaderFeature2Title,
          leaderFeature2Desc,
        }),
      });

      if (res && res.success) {
        setToastType('success');
        setToastMsg('Leadership Spotlight details updated successfully!');
      } else {
        throw new Error(res.message || 'Failed to update leadership spotlight');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg(err.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaultPhoto = async () => {
    if (!confirm('Reset leader photo to default?')) return;
    setSaving(true);

    try {
      setLeaderImage('/heroman.jpeg');
      setImagePreview(null);
      setImageFile(null);

      const res = await apiRequest('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          leaderImage: '/heroman.jpeg',
        }),
      });

      if (res && res.success) {
        setToastType('success');
        setToastMsg('Default leader photo restored successfully!');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg(err.message || 'Failed to reset photo');
    } finally {
      setSaving(false);
    }
  };

  // Resolve Preview Image URL
  const currentPhotoPreviewUrl = imagePreview
    ? imagePreview
    : leaderImage && leaderImage.startsWith('/uploads/')
    ? getMediaUrl(leaderImage)
    : leaderImage && leaderImage.startsWith('http')
    ? leaderImage
    : leaderImage && leaderImage.startsWith('/')
    ? `${PUBLIC_SITE_URL}${leaderImage}`
    : leaderImage || '/heroman.jpeg';

  return (
    <>
      <Toast message={toastMsg} type={toastType} onClose={() => setToastMsg('')} />

      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Leadership Spotlight</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Manage the Founder & Director section displayed on the Nova Innovations homepage and about page
        </p>
      </div>

      <form onSubmit={handleSaveLeadership}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.25fr) minmax(300px, 1fr)', gap: '28px', alignItems: 'start' }}>
          {/* LEFT: EDIT CONTROLS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Identity & Photo Card */}
            <div className="card">
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', color: 'var(--color-text-primary)' }}>
                Leader Profile & Photo
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Leader Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    required
                    placeholder="e.g. GIREESH KUMAR S"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Role & Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={leaderRole}
                    onChange={(e) => setLeaderRole(e.target.value)}
                    required
                    placeholder="e.g. Founder, Director & CEO — Nova Innovations"
                  />
                </div>
              </div>

              {/* Photo Upload Row */}
              <div className="form-group">
                <label className="form-label">Leader Portrait Photo</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageFileChange}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    className="btn-secondary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    {imageFile ? 'Change Selected Photo' : 'Upload New Portrait'}
                  </button>
                  <button
                    type="button"
                    onClick={handleResetDefaultPhoto}
                    className="btn-secondary"
                    style={{ background: '#F8FAFC', color: 'var(--color-text-secondary)' }}
                  >
                    Reset to Default Photo
                  </button>
                </div>
                {imageFile && (
                  <p style={{ fontSize: '0.82rem', color: '#16a34a', marginTop: '8px', fontWeight: 600 }}>
                    ✓ Selected: {imageFile.name} (Click "Save Leadership Spotlight" below to apply)
                  </p>
                )}
              </div>

              {/* Years Experience Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: '16px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Years (Stat)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={leaderYears}
                    onChange={(e) => setLeaderYears(e.target.value)}
                    placeholder="27+"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Years Badge Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={leaderYearsLabel}
                    onChange={(e) => setLeaderYearsLabel(e.target.value)}
                    placeholder="Years Leadership"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Direct Phone Number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={leaderPhone}
                    onChange={(e) => setLeaderPhone(e.target.value)}
                    placeholder="+91 9539000640"
                  />
                </div>
              </div>
            </div>

            {/* Biography & Vision Card */}
            <div className="card">
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', color: 'var(--color-text-primary)' }}>
                Biography & Highlights
              </h2>

              <div className="form-group">
                <label className="form-label">Leader Biography *</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={leaderBio}
                  onChange={(e) => setLeaderBio(e.target.value)}
                  required
                  placeholder="Enter detailed executive biography..."
                  style={{ lineHeight: 1.6 }}
                />
              </div>

              {/* Highlight Feature 1 */}
              <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '10px', marginBottom: '16px', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-primary, #E3222B)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Highlight Point 1
                </span>
                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    type="text"
                    className="form-input"
                    value={leaderFeature1Title}
                    onChange={(e) => setLeaderFeature1Title(e.target.value)}
                    placeholder="Highlight 1 Title (e.g. Visionary Direction)"
                  />
                  <input
                    type="text"
                    className="form-input"
                    value={leaderFeature1Desc}
                    onChange={(e) => setLeaderFeature1Desc(e.target.value)}
                    placeholder="Highlight 1 Description"
                  />
                </div>
              </div>

              {/* Highlight Feature 2 */}
              <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-primary, #E3222B)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Highlight Point 2
                </span>
                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    type="text"
                    className="form-input"
                    value={leaderFeature2Title}
                    onChange={(e) => setLeaderFeature2Title(e.target.value)}
                    placeholder="Highlight 2 Title (e.g. Enterprise Relationships)"
                  />
                  <input
                    type="text"
                    className="form-input"
                    value={leaderFeature2Desc}
                    onChange={(e) => setLeaderFeature2Desc(e.target.value)}
                    placeholder="Highlight 2 Description"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div>
              <button
                type="submit"
                className="btn-primary"
                disabled={saving}
                style={{ padding: '12px 28px', fontSize: '0.95rem', fontWeight: 700 }}
              >
                {saving ? (
                  <>
                    <span className="spinner" style={{ width: '16px', height: '16px' }}></span>
                    Saving Changes...
                  </>
                ) : (
                  'Save Leadership Spotlight'
                )}
              </button>
            </div>
          </div>

          {/* RIGHT: EXACT LIVE CARD PREVIEW (Matches user-side) */}
          <div style={{ position: 'sticky', top: '24px' }}>
            <label className="form-label" style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '12px', display: 'block' }}>
              Live Website Card Preview
            </label>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '28px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '190px 1fr', gap: '24px', alignItems: 'start' }}>
                {/* Photo & Badge */}
                <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '240px', background: '#0f172a' }}>
                  <img
                    src={currentPhotoPreviewUrl}
                    alt={leaderName || 'Leader'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    onError={(e) => {
                      e.target.src = '/heroman.jpeg';
                    }}
                  />
                  {leaderYears ? (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        right: '12px',
                        background: 'rgba(216, 35, 42, 0.95)',
                        color: '#ffffff',
                        borderRadius: '10px',
                        padding: '8px 10px',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: '1.2rem', lineHeight: 1 }}>{leaderYears}</div>
                      {leaderYearsLabel ? (
                        <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '3px', fontWeight: 700 }}>
                          {leaderYearsLabel}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                {/* Details */}
                <div>
                  {leaderTag ? (
                    <div style={{ color: 'var(--color-primary, #E3222B)', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      <span style={{ display: 'inline-flex', gap: '3px' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-primary, #E3222B)' }}></span>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-primary, #E3222B)' }}></span>
                      </span>
                      {leaderTag}
                    </div>
                  ) : null}

                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 2px 0', letterSpacing: '-0.01em' }}>
                    {leaderName}
                  </h3>
                  {leaderRole ? (
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary, #E3222B)', margin: '0 0 12px 0' }}>
                      {leaderRole}
                    </p>
                  ) : null}
                  {leaderBio ? (
                    <p style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', lineHeight: 1.55, margin: '0 0 16px 0' }}>
                      {leaderBio}
                    </p>
                  ) : null}

                  {/* Highlights preview matching frontend */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                    {leaderFeature1Title ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #EEF2F6' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(216, 35, 42, 0.08)', color: 'var(--color-primary, #E3222B)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                            <path d="M4 22h16"></path>
                            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                          </svg>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{leaderFeature1Title}</div>
                          {leaderFeature1Desc ? <div style={{ fontSize: '0.76rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{leaderFeature1Desc}</div> : null}
                        </div>
                      </div>
                    ) : null}

                    {leaderFeature2Title ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #EEF2F6' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(216, 35, 42, 0.08)', color: 'var(--color-primary, #E3222B)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{leaderFeature2Title}</div>
                          {leaderFeature2Desc ? <div style={{ fontSize: '0.76rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{leaderFeature2Desc}</div> : null}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* Actions matching frontend */}
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {leaderPhone ? (
                      <div
                        style={{
                          background: 'var(--color-primary, #E3222B)',
                          color: '#ffffff',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          padding: '8px 16px',
                          borderRadius: '30px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 12px rgba(227, 34, 43, 0.25)',
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        Call Founder: {leaderPhone}
                      </div>
                    ) : null}
                    <div
                      style={{
                        border: '1px solid var(--color-border-strong)',
                        color: 'var(--color-text-primary)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        padding: '8px 16px',
                        borderRadius: '30px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      Connect with Director →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
