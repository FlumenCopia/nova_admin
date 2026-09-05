'use client';

import { useState, useEffect, useRef } from 'react';
import Toast from '../../../components/Toast';
import { apiRequest, getMediaUrl, uploadBanner, PUBLIC_SITE_URL } from '../../../lib/api';

export default function HeroBannerPage() {
  // Hero Section State
  const [heroBannerUrl, setHeroBannerUrl] = useState('/mainhero1.png');
  const [heroTitle, setHeroTitle] = useState('INNOVATIONS THAT\nHALLMARKS YOUR BRAND');
  const [heroSubtitle, setHeroSubtitle] = useState('Outdoors • Design Studio • Events — Prime hoardings, branding & overnight campaign execution across Kerala.');
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [savingBanner, setSavingBanner] = useState(false);
  const fileInputRef = useRef(null);

  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchSettings = async () => {
    try {
      const res = await apiRequest('/admin/settings');
      if (res.success && res.data) {
        if (res.data.heroBannerUrl) setHeroBannerUrl(res.data.heroBannerUrl);
        if (res.data.heroTitle) setHeroTitle(res.data.heroTitle);
        if (res.data.heroSubtitle) setHeroSubtitle(res.data.heroSubtitle);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleBannerFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveHeroSection = async (e) => {
    e.preventDefault();
    setSavingBanner(true);

    try {
      let finalBannerUrl = heroBannerUrl;

      // If user uploaded a new banner image file
      if (bannerFile) {
        const uploadRes = await uploadBanner(bannerFile);
        if (uploadRes && uploadRes.success && uploadRes.bannerUrl) {
          finalBannerUrl = uploadRes.bannerUrl;
          setHeroBannerUrl(finalBannerUrl);
          setBannerPreview(null);
          setBannerFile(null);
        } else {
          throw new Error(uploadRes.message || 'Failed to upload hero banner image');
        }
      }

      // Update the hero titles and banner URL in settings
      const res = await apiRequest('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          heroBannerUrl: finalBannerUrl,
          heroTitle,
          heroSubtitle,
        }),
      });

      if (res && res.success) {
        setToastType('success');
        setToastMsg('Hero banner and header details updated successfully!');
      } else {
        throw new Error(res.message || 'Failed to update hero settings');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg(err.message || 'Failed to update hero section');
    } finally {
      setSavingBanner(false);
    }
  };

  const handleResetDefaultBanner = async () => {
    try {
      setSavingBanner(true);
      setHeroBannerUrl('/mainhero1.png');
      setBannerPreview(null);
      setBannerFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      const res = await apiRequest('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          heroBannerUrl: '/mainhero1.png',
          heroTitle,
          heroSubtitle,
        }),
      });

      if (res && res.success) {
        setToastType('success');
        setToastMsg('Original default banner restored successfully on the public website!');
      } else {
        throw new Error(res.message || 'Failed to restore default banner');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg(err.message || 'Failed to restore default banner');
    } finally {
      setSavingBanner(false);
    }
  };

  // Preview Image URL
  const currentBannerPreviewUrl = bannerPreview
    ? bannerPreview
    : heroBannerUrl.startsWith('/uploads/')
    ? getMediaUrl(heroBannerUrl)
    : heroBannerUrl.startsWith('http')
    ? heroBannerUrl
    : heroBannerUrl.startsWith('/')
    ? `${PUBLIC_SITE_URL}${heroBannerUrl}`
    : heroBannerUrl;

  return (
    <>
      <Toast message={toastMsg} type={toastType} onClose={() => setToastMsg('')} />

      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Website Hero Banner</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Change the front-page billboard background image, main headline, and campaign subtitle
        </p>
      </div>

      {/* HERO SECTION BACKGROUND BANNER SETTINGS CARD */}
      <div className="card" style={{ marginBottom: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Hero Section & Background Image</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
              Live preview and instant updates for the public website hero billboard
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetDefaultBanner}
            style={{
              fontSize: '0.8rem',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              cursor: 'pointer',
              fontWeight: 600,
              color: '#475569',
            }}
          >
            Reset to Default Banner
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.2fr) 1fr', gap: '24px', alignItems: 'start' }}>
          {/* Live Preview of Hero Banner */}
          <div>
            <label className="form-label" style={{ fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Live Hero Section Preview
            </label>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '240px',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#0f172a',
                border: '2px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              }}
            >
              <img
                src={currentBannerPreviewUrl}
                alt="Hero Banner Preview"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                onError={(e) => {
                  e.currentTarget.src = '/logo.png';
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.7) 100%)',
                }}
              />
              <div style={{ position: 'relative', zIndex: 2, padding: '24px', maxWidth: '85%' }}>
                <div
                  style={{
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '1.15rem',
                    lineHeight: '1.25',
                    letterSpacing: '-0.01em',
                    textTransform: 'uppercase',
                    whiteSpace: 'pre-line',
                    textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                  }}
                >
                  {heroTitle || 'INNOVATIONS THAT\nHALLMARKS YOUR BRAND'}
                </div>
                <div
                  style={{
                    color: '#cbd5e1',
                    fontSize: '0.78rem',
                    marginTop: '8px',
                    lineHeight: '1.4',
                    textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                  }}
                >
                  {heroSubtitle || 'Outdoors • Design Studio • Events — Prime hoardings, branding & overnight campaign execution across Kerala.'}
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '12px',
                  zIndex: 3,
                  background: 'rgba(0,0,0,0.65)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {bannerPreview ? '● Local Preview (Not yet saved)' : '● Current Active Banner'}
              </div>
            </div>

            <div style={{ marginTop: '12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Current Banner Path:{' '}
              <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#0f172a' }}>
                {heroBannerUrl}
              </code>
            </div>
          </div>

          {/* Banner Controls & Text Editor */}
          <form onSubmit={handleSaveHeroSection}>
            <div className="form-group">
              <label className="form-label">Upload New Background Banner Image</label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/webp"
                className="form-input"
                onChange={handleBannerFileChange}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                Recommended: 1920x1080px or higher. Server automatically converts to high-definition WebP.
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">Hero Title (Headline)</label>
              <textarea
                className="form-textarea"
                rows="2"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                placeholder="INNOVATIONS THAT&#10;HALLMARKS YOUR BRAND"
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Hero Tagline / Subtitle</label>
              <textarea
                className="form-textarea"
                rows="2"
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                placeholder="Outdoors • Design Studio • Events..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              disabled={savingBanner}
            >
              {savingBanner ? 'Uploading & Updating...' : 'Save Hero Changes'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
