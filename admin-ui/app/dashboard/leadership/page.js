'use client';

import { useState, useEffect, useRef } from 'react';
import Toast from '../../../components/Toast';
import { apiRequest, getMediaUrl, uploadLeaderImage, PUBLIC_SITE_URL } from '../../../lib/api';

export default function LeadershipPage() {
  const [leaderName, setLeaderName] = useState('GIREESH KUMAR S');
  const [leaderRole, setLeaderRole] = useState('Founder, Director & CEO — Nova Innovations');
  const [leaderTag, setLeaderTag] = useState('Leadership Spotlight');
  const [leaderYears, setLeaderYears] = useState('27+');
  const [leaderYearsLabel, setLeaderYearsLabel] = useState('Years Leadership');
  const [leaderImage, setLeaderImage] = useState('/heroman.jpeg');
  const [leaderBio, setLeaderBio] = useState(
    "Pioneering outdoor advertising, highway hoardings, and transit fleet branding across Kerala for over 27 years. Under Gireesh Kumar S's leadership, Nova Innovations manages 500+ prime hoarding corridors and nationwide campaign executions."
  );
  const [leaderPhone, setLeaderPhone] = useState('+91 9539000640');
  const [leaderFeature1Title, setLeaderFeature1Title] = useState('Visionary Direction');
  const [leaderFeature1Desc, setLeaderFeature1Desc] = useState("Building Kerala's most reliable 24/7 overnight advertising engine.");
  const [leaderFeature2Title, setLeaderFeature2Title] = useState('Enterprise Relationships');
  const [leaderFeature2Desc, setLeaderFeature2Desc] = useState('Trusted partner to myG, Bhima, Pothys, KSRTC & Bank of Baroda.');

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
        if (res.data.leaderName) setLeaderName(res.data.leaderName);
        if (res.data.leaderRole) setLeaderRole(res.data.leaderRole);
        if (res.data.leaderTag) setLeaderTag(res.data.leaderTag);
        if (res.data.leaderYears) setLeaderYears(res.data.leaderYears);
        if (res.data.leaderYearsLabel) setLeaderYearsLabel(res.data.leaderYearsLabel);
        if (res.data.leaderImage) setLeaderImage(res.data.leaderImage);
        if (res.data.leaderBio) setLeaderBio(res.data.leaderBio);
        if (res.data.leaderPhone) setLeaderPhone(res.data.leaderPhone);
        if (res.data.leaderFeature1Title) setLeaderFeature1Title(res.data.leaderFeature1Title);
        if (res.data.leaderFeature1Desc) setLeaderFeature1Desc(res.data.leaderFeature1Desc);
        if (res.data.leaderFeature2Title) setLeaderFeature2Title(res.data.leaderFeature2Title);
        if (res.data.leaderFeature2Desc) setLeaderFeature2Desc(res.data.leaderFeature2Desc);
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
    : leaderImage.startsWith('/uploads/')
    ? getMediaUrl(leaderImage)
    : leaderImage.startsWith('http')
    ? leaderImage
    : leaderImage.startsWith('/')
    ? `${PUBLIC_SITE_URL}${leaderImage}`
    : leaderImage;

  return (
    <>
      <Toast message={toastMsg} type={toastType} onClose={() => setToastMsg('')} />

      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Leadership Spotlight</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Manage the Founder & Director section displayed on the Nova Innovations homepage
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

          {/* RIGHT: LIVE CARD PREVIEW */}
          <div style={{ position: 'sticky', top: '24px' }}>
            <label className="form-label" style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '12px', display: 'block' }}>
              Live Website Card Preview
            </label>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: '20px', alignItems: 'start' }}>
                {/* Photo & Badge */}
                <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', height: '230px', background: '#0f172a' }}>
                  <img
                    src={currentPhotoPreviewUrl}
                    alt={leaderName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    onError={(e) => {
                      e.target.src = '/heroman.jpeg';
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      right: '10px',
                      background: 'rgba(216, 35, 42, 0.95)',
                      color: '#ffffff',
                      borderRadius: '8px',
                      padding: '6px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1 }}>{leaderYears}</div>
                    <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px' }}>
                      {leaderYearsLabel}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <div style={{ color: 'var(--color-primary, #E3222B)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary, #E3222B)' }}></span>
                    {leaderTag}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 2px 0' }}>{leaderName}</h3>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary, #E3222B)', margin: '0 0 10px 0' }}>{leaderRole}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.45, margin: '0 0 12px 0' }}>{leaderBio}</p>

                  {/* Highlights preview */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                    <div style={{ padding: '8px 10px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{leaderFeature1Title}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>{leaderFeature1Desc}</div>
                    </div>
                    <div style={{ padding: '8px 10px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{leaderFeature2Title}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>{leaderFeature2Desc}</div>
                    </div>
                  </div>

                  {/* Call Button Preview */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <div
                      style={{
                        background: 'var(--color-primary, #E3222B)',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '6px 12px',
                        borderRadius: '20px',
                      }}
                    >
                      Call: {leaderPhone}
                    </div>
                    <div
                      style={{
                        border: '1px solid var(--color-border-strong)',
                        color: 'var(--color-text-primary)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '6px 12px',
                        borderRadius: '20px',
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
