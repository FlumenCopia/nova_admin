'use client';

import { useState, useEffect, useRef } from 'react';
import Toast from '../../../components/Toast';
import Modal from '../../../components/Modal';
import { apiRequest, getMediaUrl, uploadFounderImage, PUBLIC_SITE_URL, FOUNDER_SITE_URL } from '../../../lib/api';

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

  // --- SECTION 3: SHOWCASE GALLERY & AWARDS STATE ---
  const [slidesList, setSlidesList] = useState([]);
  const [loadingSlides, setLoadingSlides] = useState(true);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [editingSlideId, setEditingSlideId] = useState(null);
  const [slideFormData, setSlideFormData] = useState({
    title: '',
    badgeText: 'Award & Milestone',
    badgeIcon: 'fa-award',
    meta: '',
    metaIcon: 'fa-location-dot',
    actionText: 'Connect with Director',
    actionType: 'modal',
    actionUrl: '',
    modalSubject: 'Founder Meeting',
    order: 1,
    isActive: true,
    imageUrl: '',
  });
  const [slideImageFile, setSlideImageFile] = useState(null);
  const [slideImagePreview, setSlideImagePreview] = useState(null);
  const [savingSlide, setSavingSlide] = useState(false);
  const slideFileInputRef = useRef(null);

  // Showcase Gallery Section Header Settings
  const [founderGallerySubhead, setFounderGallerySubhead] = useState('FEATURED MEDIA & AWARDS');
  const [founderGalleryHeading, setFounderGalleryHeading] = useState('Founder Milestones & Executive Showcase');
  const [founderGalleryDesc, setFounderGalleryDesc] = useState(
    'Explore landmark billboard installations, executive inspections, media honours, and 27+ years of advertising excellence across Kerala.'
  );
  const [savingGalleryHeader, setSavingGalleryHeader] = useState(false);


  // --- SECTION 4: CLIENT & PARTNER LOGOS STATE ---
  const [partnersTitle, setPartnersTitle] = useState('OUR ESTEEMED CLIENTS & BRAND PARTNERS');
  const [savingPartnersTitle, setSavingPartnersTitle] = useState(false);
  const [clientsList, setClientsList] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);

  // --- SECTION 3: LEADERSHIP SPOTLIGHT STATE ---
  const [leaderTag, setLeaderTag] = useState('LEADERSHIP SPOTLIGHT');
  const [spotlightName, setSpotlightName] = useState('GIREESH KUMAR S');
  const [spotlightRole, setSpotlightRole] = useState('Founder, Director & CEO — Nova Innovations');
  const [leaderYears, setLeaderYears] = useState('27+');
  const [leaderYearsLabel, setLeaderYearsLabel] = useState('Years Leadership');
  const [leaderBio, setLeaderBio] = useState('');
  const [leaderPhone, setLeaderPhone] = useState('+91 9539000640');
  const [leaderFeature1Title, setLeaderFeature1Title] = useState('Visionary Direction');
  const [leaderFeature1Desc, setLeaderFeature1Desc] = useState("Building Kerala's most reliable 24/7 overnight advertising engine.");
  const [leaderFeature2Title, setLeaderFeature2Title] = useState('Enterprise Relationships');
  const [leaderFeature2Desc, setLeaderFeature2Desc] = useState('Trusted partner to myG, Bhima, Pothys, KSRTC & Bank of Baroda.');
  const [leaderImage, setLeaderImage] = useState('/heroman.jpeg');
  const [spotlightImageFile, setSpotlightImageFile] = useState(null);
  const [spotlightImagePreview, setSpotlightImagePreview] = useState(null);
  const [savingSpotlight, setSavingSpotlight] = useState(false);
  const spotlightFileInputRef = useRef(null);

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
        if (d.partnersSectionTitle !== undefined) setPartnersTitle(d.partnersSectionTitle || 'OUR ESTEEMED CLIENTS & BRAND PARTNERS');

        if (d.founderGallerySubhead !== undefined) setFounderGallerySubhead(d.founderGallerySubhead || 'FEATURED MEDIA & AWARDS');
        if (d.founderGalleryHeading !== undefined) setFounderGalleryHeading(d.founderGalleryHeading || 'Founder Milestones & Executive Showcase');
        if (d.founderGalleryDesc !== undefined) setFounderGalleryDesc(d.founderGalleryDesc || 'Explore landmark billboard installations, executive inspections, media honours, and 27+ years of advertising excellence across Kerala.');

        if (d.leaderTag !== undefined) setLeaderTag(d.leaderTag || 'LEADERSHIP SPOTLIGHT');
        if (d.leaderName !== undefined) setSpotlightName(d.leaderName || 'GIREESH KUMAR S');
        if (d.leaderRole !== undefined) setSpotlightRole(d.leaderRole || 'Founder, Director & CEO — Nova Innovations');
        if (d.leaderYears !== undefined) setLeaderYears(d.leaderYears || '27+');
        if (d.leaderYearsLabel !== undefined) setLeaderYearsLabel(d.leaderYearsLabel || 'Years Leadership');
        if (d.leaderBio !== undefined) setLeaderBio(d.leaderBio || '');
        if (d.leaderPhone !== undefined) setLeaderPhone(d.leaderPhone || '+91 9539000640');
        if (d.leaderFeature1Title !== undefined) setLeaderFeature1Title(d.leaderFeature1Title || 'Visionary Direction');
        if (d.leaderFeature1Desc !== undefined) setLeaderFeature1Desc(d.leaderFeature1Desc || '');
        if (d.leaderFeature2Title !== undefined) setLeaderFeature2Title(d.leaderFeature2Title || 'Enterprise Relationships');
        if (d.leaderFeature2Desc !== undefined) setLeaderFeature2Desc(d.leaderFeature2Desc || '');
        if (d.leaderImage !== undefined) setLeaderImage(d.leaderImage || '/heroman.jpeg');

      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  };

  const fetchClients = async () => {
    setLoadingClients(true);
    try {
      const res = await apiRequest('/admin/clients');
      if (res && res.success) {
        setClientsList(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load clients:', err);
    } finally {
      setLoadingClients(false);
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

  const fetchSlides = async () => {
    setLoadingSlides(true);
    try {
      const res = await apiRequest('/admin/founder-gallery');
      if (res && res.success && Array.isArray(res.data)) {
        setSlidesList(res.data);
      }
    } catch (err) {
      console.error('Failed to load founder gallery slides:', err);
    } finally {
      setLoadingSlides(false);
    }
  };

  useEffect(() => {
    fetchSettings();
    fetchServices();
    fetchClients();
    fetchSlides();
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


  const handleSpotlightPhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSpotlightImageFile(file);
      setSpotlightImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveSpotlight = async (e) => {
    e.preventDefault();
    setSavingSpotlight(true);

    try {
      let finalImg = leaderImage;
      if (spotlightImageFile) {
        const uploadRes = await uploadFounderImage(spotlightImageFile);
        if (uploadRes && uploadRes.success && uploadRes.imageUrl) {
          finalImg = uploadRes.imageUrl;
          setLeaderImage(finalImg);
          setSpotlightImagePreview(null);
          setSpotlightImageFile(null);
        }
      }

      const res = await apiRequest('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          leaderTag,
          leaderName: spotlightName,
          leaderRole: spotlightRole,
          leaderYears,
          leaderYearsLabel,
          leaderBio,
          leaderPhone,
          leaderFeature1Title,
          leaderFeature1Desc,
          leaderFeature2Title,
          leaderFeature2Desc,
          leaderImage: finalImg,
        }),
      });

      if (res && res.success) {
        setToastType('success');
        setToastMsg('Leadership Spotlight updated successfully!');
      } else {
        throw new Error(res.message || 'Failed to update leadership spotlight');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg(err.message || 'Error saving leadership spotlight');
    } finally {
      setSavingSpotlight(false);
    }
  };

  const handleSavePartnersTitle = async (e) => {
    e.preventDefault();
    setSavingPartnersTitle(true);
    try {
      const res = await apiRequest('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({ partnersSectionTitle: partnersTitle }),
      });
      if (res.success) {
        setToastType('success');
        setToastMsg('Marquee section title updated successfully!');
      } else {
        throw new Error(res.message || 'Failed to update title');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg('Error saving title');
    } finally {
      setSavingPartnersTitle(false);
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

  // --- SHOWCASE GALLERY HEADER SAVE ---
  const handleSaveGalleryHeader = async (e) => {
    e.preventDefault();
    setSavingGalleryHeader(true);
    try {
      const res = await apiRequest('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          founderGallerySubhead,
          founderGalleryHeading,
          founderGalleryDesc,
        }),
      });

      if (res && res.success) {
        setToastType('success');
        setToastMsg('Showcase Carousel Header updated successfully!');
      } else {
        throw new Error(res.message || 'Failed to update showcase header');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg(err.message || 'Failed to update showcase header');
    } finally {
      setSavingGalleryHeader(false);
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

  // --- FOUNDER SHOWCASE SLIDES CRUD HANDLERS ---
  const handleOpenAddSlideModal = () => {
    setEditingSlideId(null);
    setSlideFormData({
      title: '',
      badgeText: 'Award & Milestone',
      badgeIcon: 'fa-award',
      meta: '',
      metaIcon: 'fa-location-dot',
      actionText: 'Connect with Director',
      actionType: 'modal',
      actionUrl: '',
      modalSubject: 'Founder Meeting',
      order: slidesList.length + 1,
      isActive: true,
      imageUrl: '',
    });
    setSlideImageFile(null);
    setSlideImagePreview(null);
    setIsSlideModalOpen(true);
  };

  const handleOpenEditSlideModal = (slide) => {
    setEditingSlideId(slide._id || slide.id);
    setSlideFormData({
      title: slide.title || '',
      badgeText: slide.badgeText || '',
      badgeIcon: slide.badgeIcon || 'fa-award',
      meta: slide.meta || '',
      metaIcon: slide.metaIcon || 'fa-location-dot',
      actionText: slide.actionText || 'Connect with Director',
      actionType: slide.actionType || 'modal',
      actionUrl: slide.actionUrl || '',
      modalSubject: slide.modalSubject || 'Founder Meeting',
      order: slide.order !== undefined ? slide.order : 1,
      isActive: slide.isActive !== false,
      imageUrl: slide.imageUrl || '',
    });
    setSlideImageFile(null);
    setSlideImagePreview(null);
    setIsSlideModalOpen(true);
  };

  const handleSaveSlide = async (e) => {
    e.preventDefault();
    if (!slideFormData.title.trim()) {
      setToastType('error');
      setToastMsg('Please enter a slide title');
      return;
    }
    if (!slideImageFile && !slideFormData.imageUrl) {
      setToastType('error');
      setToastMsg('Please select an image file or enter an image URL');
      return;
    }

    setSavingSlide(true);
    try {
      const formData = new FormData();
      formData.append('title', slideFormData.title.trim());
      formData.append('badgeText', slideFormData.badgeText.trim());
      formData.append('badgeIcon', slideFormData.badgeIcon.trim());
      formData.append('meta', slideFormData.meta.trim());
      formData.append('metaIcon', slideFormData.metaIcon.trim());
      formData.append('actionText', slideFormData.actionText.trim());
      formData.append('actionType', slideFormData.actionType || 'modal');
      formData.append('actionUrl', (slideFormData.actionUrl || '').trim());
      formData.append('modalSubject', slideFormData.modalSubject.trim());
      formData.append('order', String(slideFormData.order));
      formData.append('isActive', String(slideFormData.isActive));

      if (slideImageFile) {
        formData.append('image', slideImageFile);
      } else if (slideFormData.imageUrl) {
        formData.append('imageUrl', slideFormData.imageUrl.trim());
      }

      let res;
      if (editingSlideId) {
        res = await apiRequest(`/admin/founder-gallery/${editingSlideId}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        res = await apiRequest('/admin/founder-gallery', {
          method: 'POST',
          body: formData,
        });
      }

      if (res && res.success) {
        setToastType('success');
        setToastMsg(editingSlideId ? 'Showcase slide updated successfully!' : 'New showcase slide added!');
        setIsSlideModalOpen(false);
        fetchSlides();
      } else {
        throw new Error(res.message || 'Failed to save showcase slide');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg(err.message || 'Error saving slide');
    } finally {
      setSavingSlide(false);
    }
  };

  const handleToggleSlideActive = async (id, currentStatus) => {
    try {
      const res = await apiRequest(`/admin/founder-gallery/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      if (res && res.success) {
        setToastType('success');
        setToastMsg(`Showcase slide ${!currentStatus ? 'activated' : 'hidden'}!`);
        fetchSlides();
      }
    } catch (err) {
      setToastType('error');
      setToastMsg('Failed to change slide visibility');
    }
  };

  const handleDeleteSlide = async (id) => {
    if (!window.confirm('Are you sure you want to delete this showcase slide?')) return;
    try {
      const res = await apiRequest(`/admin/founder-gallery/${id}`, {
        method: 'DELETE',
      });
      if (res && res.success) {
        setToastType('success');
        setToastMsg('Showcase slide deleted.');
        fetchSlides();
      }
    } catch (err) {
      setToastType('error');
      setToastMsg('Failed to delete slide');
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
            Manage the content, services, and profile settings for the live Founder Portfolio (gireeshkumar.novainnovations.in)
          </p>
        </div>

        <a
          href={FOUNDER_SITE_URL}
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

        <button
          type="button"
          onClick={() => setActiveTab('gallery')}
          style={{
            padding: '12px 20px',
            fontSize: '0.95rem',
            fontWeight: 700,
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'gallery' ? '3px solid #dc2626' : '3px solid transparent',
            color: activeTab === 'gallery' ? '#dc2626' : '#6b7280',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>3. Awards & Media Showcase Carousel ({slidesList.length})</span>
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
              These cards render inside the squircle container on <code>founder-of-nova#services</code>
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
      {/* TAB 3: SHOWCASE GALLERY & AWARDS SECTION */}
      {/* ========================================================================= */}
      {activeTab === 'gallery' && (
        <div>
          {/* SECTION HEADER CARD */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '28px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  FEATURED MEDIA & AWARDS CAROUSEL
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: '4px 0 6px 0' }}>
                  Showcase Carousel Section Header
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
                  Customize the headline and descriptive subtitle that appear above the founder awards and milestones carousel on gireeshkumar.novainnovations.in.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddSlideModal}
                style={{
                  background: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexShrink: 0,
                }}
              >
                <span>+ Add Showcase Slide</span>
              </button>
            </div>

            <form onSubmit={handleSaveGalleryHeader}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Section Small Tag / Subhead
                  </label>
                  <input
                    type="text"
                    value={founderGallerySubhead}
                    onChange={(e) => setFounderGallerySubhead(e.target.value)}
                    placeholder="e.g. FEATURED MEDIA & AWARDS"
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
                    Main Section Heading *
                  </label>
                  <input
                    type="text"
                    value={founderGalleryHeading}
                    onChange={(e) => setFounderGalleryHeading(e.target.value)}
                    placeholder="e.g. Founder Milestones & Executive Showcase"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '0.92rem',
                      outline: 'none',
                      fontWeight: 700,
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Section Description (displayed under the main heading)
                </label>
                <textarea
                  rows={2}
                  value={founderGalleryDesc}
                  onChange={(e) => setFounderGalleryDesc(e.target.value)}
                  placeholder="e.g. Explore landmark billboard installations, executive inspections, media honours, and 27+ years of advertising excellence across Kerala."
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
                  disabled={savingGalleryHeader}
                  style={{
                    background: '#111827',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: savingGalleryHeader ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>{savingGalleryHeader ? 'Saving Header...' : 'Save Carousel Header'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* SLIDES TOOLBAR */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '14px',
              background: '#ffffff',
              padding: '16px 20px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
            }}
          >
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                Carousel Milestone Slides ({slidesList.length})
              </h4>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: '3px 0 0 0' }}>
                Manage photos, executive milestones, and action button behaviors (Modal, WhatsApp, Call, or Link).
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenAddSlideModal}
              style={{
                background: '#dc2626',
                color: '#ffffff',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
              }}
            >
              <span>+ Add New Showcase Slide</span>
            </button>
          </div>

          {/* SLIDES GRID */}
          {loadingSlides ? (
            <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
              Loading founder showcase slides...
            </div>
          ) : slidesList.length === 0 ? (
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px dashed #d1d5db', padding: '48px', textAlign: 'center' }}>
              <p style={{ color: '#6b7280', margin: '0 0 16px 0' }}>No showcase slides found. Default slides will seed automatically.</p>
              <button
                type="button"
                onClick={handleOpenAddSlideModal}
                style={{
                  background: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                + Add First Slide
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
              {slidesList.map((slide, sIdx) => {
                const slideId = slide._id || slide.id;
                const imgDisplay = getMediaUrl(slide.imageUrl);
                return (
                  <div
                    key={slideId || sIdx}
                    style={{
                      background: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #e5e7eb',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {/* Slide Image Preview with Gradient and Badge */}
                    <div style={{ position: 'relative', width: '100%', height: '210px', background: '#0b0f19', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <img
                        src={imgDisplay}
                        alt=""
                        style={{
                          position: 'absolute',
                          inset: '-10px',
                          width: 'calc(100% + 20px)',
                          height: 'calc(100% + 20px)',
                          objectFit: 'cover',
                          filter: 'blur(16px) brightness(0.4)',
                          opacity: 0.6,
                          pointerEvents: 'none',
                        }}
                        aria-hidden="true"
                      />
                      <img
                        src={imgDisplay}
                        alt={slide.title}
                        style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/founder_gireesh.jpg';
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'rgba(220, 38, 38, 0.95)',
                          color: '#ffffff',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        <i className={`fa-solid ${slide.badgeIcon || 'fa-award'}`}></i>
                        <span>{slide.badgeText || 'Milestone'}</span>
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'rgba(0, 0, 0, 0.75)',
                          color: '#ffffff',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          fontFamily: 'monospace',
                        }}
                      >
                        Order #{slide.order || sIdx + 1}
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '12px',
                        }}
                      >
                        <span
                          style={{
                            background: slide.isActive !== false ? '#dcfce7' : '#f3f4f6',
                            color: slide.isActive !== false ? '#15803d' : '#6b7280',
                            padding: '3px 8px',
                            borderRadius: '9999px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                          }}
                        >
                          {slide.isActive !== false ? '● ACTIVE' : '○ HIDDEN'}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h4
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 800,
                          color: '#111827',
                          margin: '0 0 8px 0',
                          lineHeight: 1.3,
                        }}
                      >
                        {slide.title}
                      </h4>

                      <p
                        style={{
                          color: '#6b7280',
                          fontSize: '0.85rem',
                          lineHeight: 1.5,
                          margin: '0 0 16px 0',
                          flex: 1,
                        }}
                      >
                        {slide.meta || 'No description provided'}
                      </p>

                      <div
                        style={{
                          background: '#f9fafb',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          color: '#4b5563',
                          marginBottom: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          border: '1px solid #f3f4f6',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>
                            <strong>Button:</strong> {slide.actionText || 'Connect with Director'}
                          </span>
                          <span
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '4px',
                              background:
                                slide.actionType === 'whatsapp'
                                  ? '#dcfce7'
                                  : slide.actionType === 'call'
                                  ? '#e0f2fe'
                                  : slide.actionType === 'url'
                                  ? '#f3e8ff'
                                  : '#fee2e2',
                              color:
                                slide.actionType === 'whatsapp'
                                  ? '#15803d'
                                  : slide.actionType === 'call'
                                  ? '#0369a1'
                                  : slide.actionType === 'url'
                                  ? '#6b21a8'
                                  : '#b91c1c',
                            }}
                          >
                            {slide.actionType === 'whatsapp'
                              ? '💬 WhatsApp'
                              : slide.actionType === 'call'
                              ? '📞 Phone Call'
                              : slide.actionType === 'url'
                              ? '🔗 Web Link'
                              : '📋 Consultation Modal'}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          <strong>Target:</strong>{' '}
                          {slide.actionType === 'whatsapp'
                            ? `WhatsApp (${slide.actionUrl || '+91 95390 00640'})`
                            : slide.actionType === 'call'
                            ? `Dial (${slide.actionUrl || '+91 95390 00640'})`
                            : slide.actionType === 'url'
                            ? `${slide.actionUrl || 'External Link'}`
                            : `Modal Subject: "${slide.modalSubject || 'Founder Meeting'}"`}
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEditSlideModal(slide)}
                          style={{
                            flex: 1,
                            background: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            color: '#111827',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleSlideActive(slideId, slide.isActive !== false)}
                          style={{
                            background: '#ffffff',
                            border: '1px solid #e5e7eb',
                            color: slide.isActive !== false ? '#6b7280' : '#15803d',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {slide.isActive !== false ? 'Hide' : 'Show'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSlide(slideId)}
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
                  </div>
                );
              })}
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

      {/* ========================================================================= */}
      {/* FOUNDER SHOWCASE SLIDE MODAL */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isSlideModalOpen}
        onClose={() => setIsSlideModalOpen(false)}
        title={editingSlideId ? 'Edit Showcase Slide & Award' : 'Add New Showcase Slide & Award'}
      >
        <form onSubmit={handleSaveSlide}>
          {/* Image Upload / Preview */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              Slide Photograph * (WebP/JPEG/PNG — High Resolution)
            </label>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: '#111827',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {slideImagePreview || slideFormData.imageUrl ? (
                  <img
                    src={slideImagePreview || getMediaUrl(slideFormData.imageUrl)}
                    alt="Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/founder_gireesh.jpg';
                    }}
                  />
                ) : (
                  <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>No image</span>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  ref={slideFileInputRef}
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      setSlideImageFile(file);
                      setSlideImagePreview(URL.createObjectURL(file));
                    }
                  }}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => slideFileInputRef.current && slideFileInputRef.current.click()}
                  style={{
                    background: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    color: '#374151',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginRight: '8px',
                  }}
                >
                  Choose New Photo
                </button>
                {slideImageFile && (
                  <span style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: 600 }}>
                    {slideImageFile.name}
                  </span>
                )}
              </div>
            </div>
            <div style={{ marginTop: '8px' }}>
              <input
                type="text"
                placeholder="Or paste image URL (e.g. /assets/founder_retail.jpg or /uploads/founder/...)"
                value={slideFormData.imageUrl}
                onChange={(e) => setSlideFormData({ ...slideFormData, imageUrl: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb',
                  fontSize: '0.82rem',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              Slide Headline / Milestone Title *
            </label>
            <input
              type="text"
              value={slideFormData.title}
              onChange={(e) => setSlideFormData({ ...slideFormData, title: e.target.value })}
              placeholder="e.g. Retail Facade & 3D LED Display Unveiling"
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

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Badge Text (Category Pill)
              </label>
              <input
                type="text"
                value={slideFormData.badgeText}
                onChange={(e) => setSlideFormData({ ...slideFormData, badgeText: e.target.value })}
                placeholder="e.g. Retail Unveiling, Keynote, Award"
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
                Badge Icon Class
              </label>
              <select
                value={slideFormData.badgeIcon}
                onChange={(e) => setSlideFormData({ ...slideFormData, badgeIcon: e.target.value })}
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
                <option value="fa-award">Award (fa-award)</option>
                <option value="fa-trophy">Trophy (fa-trophy)</option>
                <option value="fa-user-tie">Executive (fa-user-tie)</option>
                <option value="fa-store">Retail / Shop (fa-store)</option>
                <option value="fa-bus">Transit / Bus (fa-bus)</option>
                <option value="fa-bolt">Inspection / Bolt (fa-bolt)</option>
                <option value="fa-microphone">Keynote / Mic (fa-microphone)</option>
                <option value="fa-wand-magic-sparkles">Studio (fa-wand-magic-sparkles)</option>
                <option value="fa-wrench">Execution (fa-wrench)</option>
                <option value="fa-star">Star (fa-star)</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              Location / Event Meta Description
            </label>
            <input
              type="text"
              value={slideFormData.meta}
              onChange={(e) => setSlideFormData({ ...slideFormData, meta: e.target.value })}
              placeholder="e.g. Highway Commercial Hub • Gireesh Kumar S at Architectural Facade Opening"
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

          {/* ACTION BUTTON MANAGEMENT */}
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', margin: '0 0 12px 0' }}>
              Slide Action Button Configuration
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Button Label Text *
                </label>
                <input
                  type="text"
                  value={slideFormData.actionText}
                  onChange={(e) => setSlideFormData({ ...slideFormData, actionText: e.target.value })}
                  placeholder="e.g. Connect with Director"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.92rem',
                    outline: 'none',
                    background: '#ffffff',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Button Action Type *
                </label>
                <select
                  value={slideFormData.actionType || 'modal'}
                  onChange={(e) => setSlideFormData({ ...slideFormData, actionType: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.92rem',
                    outline: 'none',
                    background: '#ffffff',
                    fontWeight: 600,
                  }}
                >
                  <option value="modal">📋 Open Meeting / Booking Modal</option>
                  <option value="whatsapp">💬 Open Direct WhatsApp Chat</option>
                  <option value="call">📞 Direct Phone Call</option>
                  <option value="url">🔗 Open Webpage / Article Link</option>
                </select>
              </div>
            </div>

            {/* Dynamic Target Input based on Action Type */}
            {(!slideFormData.actionType || slideFormData.actionType === 'modal') && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Booking Modal Subject (pre-fills the consultation popup)
                </label>
                <input
                  type="text"
                  value={slideFormData.modalSubject}
                  onChange={(e) => setSlideFormData({ ...slideFormData, modalSubject: e.target.value })}
                  placeholder="e.g. Founder Meeting, Highway Hoarding, Executive Inquiry"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.92rem',
                    outline: 'none',
                    background: '#ffffff',
                  }}
                />
              </div>
            )}

            {slideFormData.actionType === 'whatsapp' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  WhatsApp Phone Number (optional — leave blank for official Nova desk +91 95390 00640)
                </label>
                <input
                  type="text"
                  value={slideFormData.actionUrl}
                  onChange={(e) => setSlideFormData({ ...slideFormData, actionUrl: e.target.value })}
                  placeholder="e.g. +91 95390 00640"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.92rem',
                    outline: 'none',
                    background: '#ffffff',
                  }}
                />
              </div>
            )}

            {slideFormData.actionType === 'call' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Direct Dial Phone Number (optional — leave blank for +91 95390 00640)
                </label>
                <input
                  type="text"
                  value={slideFormData.actionUrl}
                  onChange={(e) => setSlideFormData({ ...slideFormData, actionUrl: e.target.value })}
                  placeholder="e.g. +91 95390 00640"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.92rem',
                    outline: 'none',
                    background: '#ffffff',
                  }}
                />
              </div>
            )}

            {slideFormData.actionType === 'url' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Target Web Link / URL *
                </label>
                <input
                  type="text"
                  value={slideFormData.actionUrl}
                  onChange={(e) => setSlideFormData({ ...slideFormData, actionUrl: e.target.value })}
                  placeholder="e.g. https://novainnovations.in/gallery or external news article"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.92rem',
                    outline: 'none',
                    background: '#ffffff',
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Sequence Order (Sort)
              </label>
              <input
                type="number"
                value={slideFormData.order}
                onChange={(e) => setSlideFormData({ ...slideFormData, order: Number(e.target.value) })}
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
                Visibility Status
              </label>
              <select
                value={slideFormData.isActive ? 'true' : 'false'}
                onChange={(e) => setSlideFormData({ ...slideFormData, isActive: e.target.value === 'true' })}
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
                <option value="true">Active (Visible in Carousel)</option>
                <option value="false">Hidden (Draft mode)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setIsSlideModalOpen(false)}
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
              disabled={savingSlide}
              style={{
                background: '#dc2626',
                color: '#ffffff',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '8px',
                fontWeight: 700,
                cursor: savingSlide ? 'not-allowed' : 'pointer',
              }}
            >
              {savingSlide ? 'Saving Slide...' : 'Save Showcase Slide'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
