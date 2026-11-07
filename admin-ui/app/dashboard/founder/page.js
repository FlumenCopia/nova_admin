'use client';

import { useState, useEffect, useRef } from 'react';
import Toast from '../../../components/Toast';
import Modal from '../../../components/Modal';
import { apiRequest, getMediaUrl, uploadFounderImage, PUBLIC_SITE_URL } from '../../../lib/api';

export default function FounderAdminPage() {
  const [activeTab, setActiveTab] = useState('hero'); // 'hero' | 'services'

  // --- SECTION 1: HERO STATE ---
  const [founderHeroTag, setFounderHeroTag] = useState('27+ Years of Creative Advertising Excellence');
  const [founderHeroTitle, setFounderHeroTitle] = useState('INNOVATIONS THAT\nHALLMARKS YOUR BRAND');
  const [founderHeroDesc, setFounderHeroDesc] = useState(
    'Outdoors • Design Studio • Events — Prime hoardings, transit vehicle branding, and overnight campaign execution across Kerala.'
  );
  const [founderHeroCtaText, setFounderHeroCtaText] = useState('Book Hoardings');
  const [founderHeroCtaPhone, setFounderHeroCtaPhone] = useState('+91 95390 00640');
  const [founderName, setFounderName] = useState('GIREESH KUMAR S');
  const [founderRole, setFounderRole] = useState('Founder & CEO — NOVA Innovations');
  const [founderImage, setFounderImage] = useState('/heroman.jpeg');

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [savingHero, setSavingHero] = useState(false);
  const fileInputRef = useRef(null);

  // --- SECTION 2: SERVICES STATE ---
  const [servicesSubhead, setServicesSubhead] = useState('WHAT WE OFFER');
  const [servicesHeading, setServicesHeading] = useState('Comprehensive Advertising Services');
  const [servicesDesc, setServicesDesc] = useState(
    'End-to-end outdoor advertising, design studio creations, transit branding, and corporate events across Kerala.'
  );
  const [savingServicesHeader, setSavingServicesHeader] = useState(false);

  const [servicesList, setServicesList] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    subtitle: '',
    icon: 'billboard',
    description: '',
    featuresText: '',
    order: 1,
    isActive: true,
  });
  const [savingServiceItem, setSavingServiceItem] = useState(false);

  // --- NOTIFICATION STATE ---
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');

  // --- FETCH DATA ---
  const fetchSettings = async () => {
    try {
      const res = await apiRequest('/admin/settings');
      if (res && res.success && res.data) {
        const d = res.data;
        if (d.founderHeroTag !== undefined) setFounderHeroTag(d.founderHeroTag || '');
        if (d.founderHeroTitle !== undefined) setFounderHeroTitle(d.founderHeroTitle || '');
        if (d.founderHeroDesc !== undefined) setFounderHeroDesc(d.founderHeroDesc || '');
        if (d.founderHeroCtaText !== undefined) setFounderHeroCtaText(d.founderHeroCtaText || 'Book Hoardings');
        if (d.founderHeroCtaPhone !== undefined) setFounderHeroCtaPhone(d.founderHeroCtaPhone || d.primaryPhone || '+91 95390 00640');
        if (d.founderName !== undefined) setFounderName(d.founderName || d.leaderName || 'GIREESH KUMAR S');
        if (d.founderRole !== undefined) setFounderRole(d.founderRole || d.leaderRole || 'Founder & CEO — NOVA Innovations');
        if (d.founderImage !== undefined) setFounderImage(d.founderImage || d.leaderImage || '/heroman.jpeg');

        if (d.servicesSectionSubhead !== undefined) setServicesSubhead(d.servicesSectionSubhead || 'WHAT WE OFFER');
        if (d.servicesSectionHeading !== undefined) setServicesHeading(d.servicesSectionHeading || 'Comprehensive Advertising Services');
        if (d.servicesSectionDesc !== undefined) setServicesDesc(d.servicesSectionDesc || '');
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  };

  const fetchServices = async () => {
    setLoadingServices(true);
    try {
      const res = await apiRequest('/admin/services');
      if (res && res.success) {
        setServicesList(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {
    fetchSettings();
    fetchServices();
  }, []);

  // --- HERO SAVE ---
  const handleImageFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveHero = async (e) => {
    e.preventDefault();
    setSavingHero(true);

    try {
      let finalImageUrl = founderImage;

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
        setToastMsg('Founder Hero Section updated successfully!');
      } else {
        throw new Error(res.message || 'Failed to update founder settings');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg(err.message || 'Error saving founder settings');
    } finally {
      setSavingHero(false);
    }
  };

  // --- SERVICES HEADER SAVE ---
  const handleSaveServicesHeader = async (e) => {
    e.preventDefault();
    setSavingServicesHeader(true);
    try {
      const res = await apiRequest('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          servicesSectionSubhead: servicesSubhead,
          servicesSectionHeading: servicesHeading,
          servicesSectionDesc: servicesDesc,
        }),
      });

      if (res && res.success) {
        setToastType('success');
        setToastMsg('Services Section Header updated successfully!');
      } else {
        throw new Error(res.message || 'Failed to update services header');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg(err.message || 'Failed to update services header');
    } finally {
      setSavingServicesHeader(false);
    }
  };

  // --- SERVICE CARD MODAL & CRUD ---
  const handleOpenServiceModal = (service = null) => {
    if (service) {
      setEditingServiceId(service.id);
      setServiceFormData({
        title: service.title || '',
        subtitle: service.subtitle || '',
        icon: service.icon || 'billboard',
        description: service.description || '',
        featuresText: Array.isArray(service.features) ? service.features.join('\n') : '',
        order: service.order || 0,
        isActive: service.isActive !== undefined ? service.isActive : true,
      });
    } else {
      setEditingServiceId(null);
      setServiceFormData({
        title: '',
        subtitle: '',
        icon: 'billboard',
        description: '',
        featuresText: '',
        order: servicesList.length + 1,
        isActive: true,
      });
    }
    setIsServiceModalOpen(true);
  };

  const handleSaveServiceItem = async (e) => {
    e.preventDefault();
    setSavingServiceItem(true);

    const payload = {
      ...serviceFormData,
      features: serviceFormData.featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
    };

    try {
      if (editingServiceId) {
        const res = await apiRequest(`/admin/services/${editingServiceId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        if (res.success) {
          setToastType('success');
          setToastMsg('Service updated successfully!');
          setIsServiceModalOpen(false);
          fetchServices();
        } else {
          throw new Error(res.message || 'Failed to update service');
        }
      } else {
        const res = await apiRequest('/admin/services', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        if (res.success) {
          setToastType('success');
          setToastMsg('New service added successfully!');
          setIsServiceModalOpen(false);
          fetchServices();
        } else {
          throw new Error(res.message || 'Failed to create service');
        }
      }
    } catch (err) {
      setToastType('error');
      setToastMsg(err.message || 'Error saving service');
    } finally {
      setSavingServiceItem(false);
    }
  };

  const handleToggleServiceActive = async (id, currentStatus) => {
    try {
      const res = await apiRequest(`/admin/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      if (res.success) {
        setToastType('success');
        setToastMsg(`Service ${!currentStatus ? 'activated' : 'hidden'}!`);
        fetchServices();
      }
    } catch (err) {
      setToastType('error');
      setToastMsg('Failed to change status');
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await apiRequest(`/admin/services/${id}`, {
        method: 'DELETE',
      });
      if (res.success) {
        setToastType('success');
        setToastMsg('Service deleted.');
        fetchServices();
      }
    } catch (err) {
      setToastType('error');
      setToastMsg('Failed to delete service');
    }
  };

  const currentPhotoDisplay = imagePreview || getMediaUrl(founderImage) || '/heroman.jpeg';

  return (
    <div style={{ padding: '24px 28px', maxWidth: '1240px', margin: '0 auto' }}>
      {toastMsg && <Toast message={toastMsg} type={toastType} onClose={() => setToastMsg('')} />}

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#dc2626', letterSpacing: '0.08em', background: '#fee2e2', padding: '3px 10px', borderRadius: '6px' }}>
              Founder Page
            </span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: 0 }}>
            Founder Page Management
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.92rem', marginTop: '6px' }}>
            Manage the content, services, and profile settings for <code>/founder-of-nova.html</code>.
          </p>
        </div>

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

      {/* SECTION TABS */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #e5e7eb', marginBottom: '28px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          style={{
            padding: '12px 20px',
            fontSize: '0.95rem',
            fontWeight: 700,
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'hero' ? '3px solid #dc2626' : '3px solid transparent',
            color: activeTab === 'hero' ? '#dc2626' : '#6b7280',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>1. Hero & Founder Profile</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('services')}
          style={{
            padding: '12px 20px',
            fontSize: '0.95rem',
            fontWeight: 700,
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'services' ? '3px solid #dc2626' : '3px solid transparent',
            color: activeTab === 'services' ? '#dc2626' : '#6b7280',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>2. Comprehensive Services Section ({servicesList.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: HERO SECTION */}
      {/* ========================================================================= */}
      {activeTab === 'hero' && (
        <div>
          {/* LIVE PREVIEW BANNER */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                Live Preview (Hero Section)
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
              }}
            >
              {/* Left Column Content */}
              <div>
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

                <h2
                  style={{
                    fontSize: '2.2rem',
                    fontWeight: 900,
                    color: '#111827',
                    lineHeight: 1.15,
                    margin: '0 0 16px 0',
                    letterSpacing: '-0.02em',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {founderHeroTitle}
                </h2>

                <p
                  style={{
                    color: '#6b7280',
                    fontSize: '0.94rem',
                    lineHeight: 1.6,
                    margin: '0 0 24px 0',
                    maxWidth: '480px',
                  }}
                >
                  {founderHeroDesc}
                </p>

                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#dc2626',
                      color: '#ffffff',
                      padding: '12px 24px',
                      borderRadius: '9999px',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      boxShadow: '0 4px 14px rgba(220, 38, 38, 0.35)',
                    }}
                  >
                    <span>{founderHeroCtaText}</span>
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
                  }}
                >
                  <img
                    src={currentPhotoDisplay}
                    alt={founderName}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                    onError={(e) => {
                      e.target.src = '/heroman.jpeg';
                    }}
                  />

                  {/* Founder Tag Badge at Bottom */}
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
                      {founderName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>
                      {founderRole}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FORM CONTROLS */}
          <form onSubmit={handleSaveHero} style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '32px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', margin: '0 0 24px 0' }}>
              Edit Hero Content & Founder Info
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
                  Tagline / Badge (Top Text)
                </label>
                <input
                  type="text"
                  value={founderHeroTag}
                  onChange={(e) => setFounderHeroTag(e.target.value)}
                  placeholder="e.g. 27+ Years of Creative Advertising Excellence"
                  required
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

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
                  Hero Headline / Title (Line breaks supported)
                </label>
                <textarea
                  rows={2}
                  value={founderHeroTitle}
                  onChange={(e) => setFounderHeroTitle(e.target.value)}
                  placeholder="e.g. INNOVATIONS THAT&#10;HALLMARKS YOUR BRAND"
                  required
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

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
                  Hero Subtitle / Description Paragraph
                </label>
                <textarea
                  rows={3}
                  value={founderHeroDesc}
                  onChange={(e) => setFounderHeroDesc(e.target.value)}
                  placeholder="Describe Nova's creative and outdoor advertising strengths..."
                  required
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

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={founderHeroCtaText}
                  onChange={(e) => setFounderHeroCtaText(e.target.value)}
                  placeholder="e.g. Book Hoardings"
                  required
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

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
                  CTA Phone Number (for tel: link)
                </label>
                <input
                  type="text"
                  value={founderHeroCtaPhone}
                  onChange={(e) => setFounderHeroCtaPhone(e.target.value)}
                  placeholder="e.g. +91 95390 00640"
                  required
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

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
                  Founder Name (Shown on photo badge)
                </label>
                <input
                  type="text"
                  value={founderName}
                  onChange={(e) => setFounderName(e.target.value)}
                  placeholder="e.g. GIREESH KUMAR S"
                  required
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

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
                  Founder Role / Designation
                </label>
                <input
                  type="text"
                  value={founderRole}
                  onChange={(e) => setFounderRole(e.target.value)}
                  placeholder="e.g. Founder & CEO — NOVA Innovations"
                  required
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

              <div style={{ gridColumn: 'span 2', paddingTop: '8px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
                  Founder Portrait Photo
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
                  <div>
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
                      Choose New Photo
                    </button>
                    <div style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '6px' }}>
                      Recommended: Portrait orientation (JPG, PNG, WEBP), max 5MB.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                disabled={savingHero}
                style={{
                  background: '#dc2626',
                  color: '#ffffff',
                  padding: '12px 28px',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: savingHero ? 'not-allowed' : 'pointer',
                  opacity: savingHero ? 0.7 : 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 6px rgba(220, 38, 38, 0.25)',
                }}
              >
                {savingHero ? 'Saving Changes...' : 'Save Founder Hero Section'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SERVICES SECTION */}
      {/* ========================================================================= */}
      {activeTab === 'services' && (
        <div>
          {/* SECTION HEADER CARD */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '28px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                  Services Section Header
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#6b7280', margin: '4px 0 0 0' }}>
                  Edit the headline and tagline that appear above the advertising service cards.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenServiceModal()}
                style={{
                  background: '#dc2626',
                  color: '#ffffff',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 6px rgba(220, 38, 38, 0.25)',
                }}
              >
                + Add New Service Card
              </button>
            </div>

            <form onSubmit={handleSaveServicesHeader}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Section Tag / Subhead
                  </label>
                  <input
                    type="text"
                    value={servicesSubhead}
                    onChange={(e) => setServicesSubhead(e.target.value)}
                    placeholder="e.g. WHAT WE OFFER"
                    required
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
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Section Main Heading
                  </label>
                  <input
                    type="text"
                    value={servicesHeading}
                    onChange={(e) => setServicesHeading(e.target.value)}
                    placeholder="e.g. Comprehensive Advertising Services"
                    required
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
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Section Description Paragraph
                </label>
                <textarea
                  rows={2}
                  value={servicesDesc}
                  onChange={(e) => setServicesDesc(e.target.value)}
                  placeholder="e.g. End-to-end outdoor advertising, design studio creations..."
                  required
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

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="submit"
                  disabled={savingServicesHeader}
                  style={{
                    background: '#111827',
                    color: '#ffffff',
                    padding: '10px 22px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: savingServicesHeader ? 'not-allowed' : 'pointer',
                  }}
                >
                  {savingServicesHeader ? 'Saving Header...' : 'Save Section Header'}
                </button>
              </div>
            </form>
          </div>

          {/* SERVICE CARDS LIST (MATCHES SCREENSHOT GRID) */}
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              Active Service Cards ({servicesList.length})
            </h3>
            <span style={{ fontSize: '0.82rem', color: '#6b7280' }}>
              These cards render inside the squircle container on <code>/founder-of-nova.html#services</code>
            </span>
          </div>

          {loadingServices ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280', background: '#ffffff', borderRadius: '16px' }}>
              Loading services...
            </div>
          ) : servicesList.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280', background: '#ffffff', borderRadius: '16px', border: '1px dashed #d1d5db' }}>
              No service cards created yet. Click "+ Add New Service Card" above to add one.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
              {servicesList.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    border: item.isActive ? '1px solid #e5e7eb' : '1px dashed #d1d5db',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                    opacity: item.isActive ? 1 : 0.6,
                    position: 'relative',
                  }}
                >
                  <div>
                    {/* Top Order & Status */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>
                        Order #{item.order} • {item.icon || 'billboard'}
                      </span>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: item.isActive ? '#dcfce7' : '#f3f4f6',
                          color: item.isActive ? '#15803d' : '#6b7280',
                        }}
                      >
                        {item.isActive ? 'ACTIVE' : 'HIDDEN'}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: '0 0 8px 0' }}>
                      {item.title}
                    </h4>

                    {/* Card Description */}
                    <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                      {item.description}
                    </p>

                    {/* Deliverables / Tags */}
                    {item.features && item.features.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                        {item.features.map((feat, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#374151' }}>
                            <span style={{ color: '#dc2626', fontWeight: 'bold' }}>✓</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
                    <button
                      type="button"
                      onClick={() => handleOpenServiceModal(item)}
                      style={{
                        flex: 1,
                        background: '#f3f4f6',
                        border: '1px solid #e5e7eb',
                        color: '#111827',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Edit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleServiceActive(item.id, item.isActive)}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e5e7eb',
                        color: item.isActive ? '#6b7280' : '#15803d',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {item.isActive ? 'Hide' : 'Show'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteService(item.id)}
                      style={{
                        background: '#fee2e2',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SERVICE EDIT / CREATE MODAL */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        title={editingServiceId ? 'Edit Service Card' : 'Add New Service Card'}
      >
        <form onSubmit={handleSaveServiceItem}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              Service Card Title *
            </label>
            <input
              type="text"
              value={serviceFormData.title}
              onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
              placeholder="e.g. Innovative Hoardings"
              required
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Icon Style
              </label>
              <select
                value={serviceFormData.icon}
                onChange={(e) => setServiceFormData({ ...serviceFormData, icon: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.92rem',
                  outline: 'none',
                  background: '#ffffff',
                }}
              >
                <option value="billboard">Billboard / Hoarding (Ad Icon)</option>
                <option value="transit">Vehicle Advertising (Bus Icon)</option>
                <option value="retail">Shop & Facade (Store Icon)</option>
                <option value="event">Event & Stalls (Celebration Icon)</option>
                <option value="wall">Commercial Wall Painting (Brush Icon)</option>
                <option value="design">Design Studio & Print (Ruler Icon)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Display Order
              </label>
              <input
                type="number"
                value={serviceFormData.order}
                onChange={(e) => setServiceFormData({ ...serviceFormData, order: Number(e.target.value) })}
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
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              Service Description *
            </label>
            <textarea
              rows={3}
              value={serviceFormData.description}
              onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
              placeholder="High-visibility billboards, unipoles, gantries..."
              required
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

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              Key Features / Deliverables (1 item per line)
            </label>
            <textarea
              rows={3}
              value={serviceFormData.featuresText}
              onChange={(e) => setServiceFormData({ ...serviceFormData, featuresText: e.target.value })}
              placeholder="Prime footfall locations&#10;Weatherproof flex & LED lights"
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

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              Visibility Status
            </label>
            <select
              value={serviceFormData.isActive}
              onChange={(e) => setServiceFormData({ ...serviceFormData, isActive: e.target.value === 'true' })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '0.92rem',
                outline: 'none',
                background: '#ffffff',
              }}
            >
              <option value="true">Active (Visible on website)</option>
              <option value="false">Hidden (Draft mode)</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setIsServiceModalOpen(false)}
              style={{
                background: '#f3f4f6',
                border: '1px solid #d1d5db',
                color: '#374151',
                padding: '10px 18px',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={savingServiceItem}
              style={{
                background: '#dc2626',
                color: '#ffffff',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '8px',
                fontWeight: 700,
                cursor: savingServiceItem ? 'not-allowed' : 'pointer',
              }}
            >
              {savingServiceItem ? 'Saving Card...' : 'Save Service Card'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
