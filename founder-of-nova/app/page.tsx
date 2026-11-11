'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface ServiceItem {
  id?: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
  isActive?: boolean;
}

interface ClientItem {
  id?: string;
  name: string;
  logoUrl: string;
  isActive?: boolean;
}

const DEFAULT_CLIENT_LOGOS = [
  { name: 'myG', file: 'myg.png' },
  { name: 'Bhima', file: 'bhima.png' },
  { name: 'Pothys', file: 'pothys.png' },
  { name: 'Muthoot', file: 'muthoot.png' },
  { name: 'Bank of Baroda', file: 'bob.png' },
  { name: 'Havells', file: 'havells.png' },
  { name: 'Oxygen Digital Shop', file: 'oxygen.png' },
  { name: 'Medimix', file: 'medimix.png' },
  { name: 'Kannan Devan', file: 'kannandevan.png' },
  { name: 'PRS Hospital', file: 'prs.png' },
  { name: 'SP Fort Hospital', file: 'spfort.png' },
  { name: 'NIMS Medicity', file: 'nims.png' },
  { name: 'Fair Exports', file: 'fair.png' },
  { name: 'Arcon Builders', file: 'arcon.png' },
  { name: 'Alice Gold', file: 'alicegold.png' },
  { name: 'Ananthapuri', file: 'ananthapuri.png' },
  { name: 'Duro Design', file: 'durodesign.png' },
  { name: 'Kairali Food', file: 'kairalifood.png' },
  { name: 'Lifelong', file: 'lifelong.png' },
  { name: 'Loka Medicity', file: 'lokamedicity.png' },
  { name: 'Mookambika', file: 'mookambika.png' },
  { name: 'Neyyar Medicity', file: 'neyyarmedicity.png' },
  { name: 'Pankaja Kasthuri', file: 'pankajakasthuri.png' },
  { name: 'Pothys Mahal', file: 'pothysmahal.png' },
  { name: 'Precise', file: 'precise.png' },
  { name: 'Retnakala', file: 'retnakala.png' },
  { name: 'RK Builders', file: 'rk.png' },
  { name: 'Salpido', file: 'salpido.png' },
  { name: 'S Bharath', file: 'sbharath.png' },
  { name: 'Shanoor', file: 'shanoor.png' },
  { name: 'Silver Storm', file: 'silver.png' },
  { name: 'Susrutha', file: 'susrutha.png' },
  { name: 'Swayamvaram Silks', file: 'swayamvaram.png' },
  { name: 'Vyra', file: 'vyra.png' },
];

const GALLERY_SLIDES = [
  {
    img: '/assets/founder_gireesh.jpg',
    badgeIcon: 'fa-user-tie',
    badgeText: 'Executive Profile',
    counter: '01 / 06',
    title: 'GIREESH KUMAR S — Founder, Director & CEO',
    metaIcon: 'fa-award',
    meta: '27+ Years Excellence • Managing 500+ Prime Media Assets Across Kerala',
    modalSubject: 'Founder Meeting',
    actionText: 'Connect with Director',
  },
  {
    img: '/assets/founder_hoarding.jpg',
    badgeIcon: 'fa-bolt',
    badgeText: 'Highway Inspection',
    counter: '02 / 06',
    title: 'Founder Inspection — Highway Hoarding Landmark',
    metaIcon: 'fa-location-dot',
    meta: 'NH 66 Corridor • Director Gireesh Kumar S Overseeing Spot-Lit 40x20 FT Billboard',
    modalSubject: 'Highway Hoarding',
    actionText: 'Inquire Location',
  },
  {
    img: '/assets/founder_transit.jpg',
    badgeIcon: 'fa-bus',
    badgeText: 'Transit Fleet Launch',
    counter: '03 / 06',
    title: 'Gireesh Kumar S Launching KSRTC Transit Wrap Fleet',
    metaIcon: 'fa-location-dot',
    meta: '14 Districts Pan-Kerala • Statewide Mobile Media Network',
    modalSubject: 'Transit Media',
    actionText: 'Inquire Fleet',
  },
  {
    img: '/assets/founder_retail.jpg',
    badgeIcon: 'fa-store',
    badgeText: 'Retail Unveiling',
    counter: '04 / 06',
    title: 'Retail Facade & 3D LED Display Unveiling',
    metaIcon: 'fa-location-dot',
    meta: 'Highway Commercial Hub • Gireesh Kumar S at Architectural Facade Opening',
    modalSubject: 'Retail Facade',
    actionText: 'Inquire Branding',
  },
  {
    img: '/assets/founder_execution.jpg',
    badgeIcon: 'fa-wand-magic-sparkles',
    badgeText: 'Studio Operations',
    counter: '05 / 06',
    title: 'Overnight Flex Printing & Studio Direction',
    metaIcon: 'fa-location-dot',
    meta: 'Design Studio Hub • Director Gireesh Kumar S Directing 24/7 Rapid Execution Team',
    modalSubject: 'Campaign Execution',
    actionText: 'Inquire Execution',
  },
  {
    img: '/assets/founder_award.jpg',
    badgeIcon: 'fa-microphone',
    badgeText: 'Media Keynote',
    counter: '06 / 06',
    title: 'Advertising Excellence Summit Keynote',
    metaIcon: 'fa-trophy',
    meta: 'Kerala Media Summit • Keynote Address on OOH Innovations by Director Gireesh Kumar S',
    modalSubject: 'Founder Keynote',
    actionText: 'Inquire Speaker',
  },
];

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    title: 'Innovative Hoardings',
    description:
      'High-visibility billboards, unipoles, gantries, and cantilever structures in prime city junctions and national highways across Kerala.',
    icon: 'fa-rectangle-ad',
    features: ['Prime footfall locations', 'Weatherproof flex & LED lights'],
  },
  {
    title: 'Vehicle Advertising',
    description:
      'Time-bound mobile advertising fleet services including KSRTC buses, private transit branding, and promotional display vans.',
    icon: 'fa-bus',
    features: ['High city-wide reach & mobility', 'Full body wrap & side panels'],
  },
  {
    title: 'Shop & Retail Branding',
    description:
      'Complete store exterior & interior transformations: 3D illuminated signboards, LED glow boards, ACP signboards, and retail display units.',
    icon: 'fa-store',
    features: ['LED glow & ACP signboards', 'Showroom facade design'],
  },
  {
    title: 'Event Branding & Stalls',
    description:
      'Capturing the essence of your brand in corporate events, exhibition stalls, stage backdrops, kiosks, and product launch productions.',
    icon: 'fa-champagne-glasses',
    features: ['Custom stall fabrication', 'Turnkey event management'],
  },
  {
    title: 'Commercial Wall Paintings',
    description:
      'Long-lasting direct wall artworks and branding murals executed with durable weather-resistant paint on prominent roadsides and town walls.',
    icon: 'fa-paintbrush',
    features: ['Long-term brand retention', 'Rural & urban highway routes'],
  },
  {
    title: 'Design Studio & Printing',
    description:
      'State-of-the-art flex digital printing, large format banners, offset catalogs, brochures, bulk posters, and corporate stationery.',
    icon: 'fa-pen-ruler',
    features: ['High-definition printing machinery', 'Creative branding agency support'],
  },
];

export default function FounderPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState('Outdoor Hoardings');

  // Gallery
  const [currentSlide, setCurrentSlide] = useState(0);

  // Toast
  const [toast, setToast] = useState<{ show: boolean; title: string; desc: string }>({
    show: false,
    title: '',
    desc: '',
  });

  // Dynamic Data from Backend (with fallback)
  const [heroTitle, setHeroTitle] = useState('INNOVATIONS THAT HALLMARKS YOUR BRAND');
  const [heroDesc, setHeroDesc] = useState(
    'Outdoors • Design Studio • Events — Prime hoardings, transit vehicle branding, and overnight campaign execution across Kerala.'
  );
  const [founderImg, setFounderImg] = useState('/assets/hero_man.jpeg');
  const [founderName, setFounderName] = useState('GIREESH KUMAR S');
  const [founderRole, setFounderRole] = useState('Founder & CEO — NOVA Innovations');
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [clients, setClients] = useState<ClientItem[]>([]);

  // Initialize theme
  useEffect(() => {
    const saved = (localStorage.getItem('arqour_theme') as 'light' | 'dark') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('arqour_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch backend data with safe fallback
  useEffect(() => {
    const apiBase =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:5000/api'
        : '/api';

    // 1. Settings
    fetch(`${apiBase}/public/settings`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.success && json?.data) {
          const s = json.data;
          if (s.founderHeroTitle || s.heroTitle) setHeroTitle(s.founderHeroTitle || s.heroTitle);
          if (s.founderHeroDesc || s.heroSubtitle) setHeroDesc(s.founderHeroDesc || s.heroSubtitle);
          if (s.founderImage || s.leaderImage) {
            const img = s.founderImage || s.leaderImage;
            const fullUrl =
              img.startsWith('http') || img.startsWith('//')
                ? img
                : img.startsWith('/uploads')
                ? `http://localhost:5000${img}`
                : img;
            setFounderImg(fullUrl);
          }
          if (s.founderName || s.leaderName) setFounderName(s.founderName || s.leaderName);
          if (s.founderRole || s.leaderRole) setFounderRole(s.founderRole || s.leaderRole);
        }
      })
      .catch(() => {});

    // 2. Services
    fetch(`${apiBase}/public/services`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.success && Array.isArray(json?.data) && json.data.length > 0) {
          const active = json.data.filter((item: ServiceItem) => item.isActive !== false);
          if (active.length > 0) {
            setServices(active);
          }
        }
      })
      .catch(() => {});

    // 3. Clients
    fetch(`${apiBase}/public/clients`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.success && Array.isArray(json?.data) && json.data.length > 0) {
          const active = json.data.filter((item: ClientItem) => item.isActive !== false);
          if (active.length > 0) {
            setClients(active);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Gallery Navigation
  const prevSlide = () => {
    setCurrentSlide((curr) => (curr === 0 ? GALLERY_SLIDES.length - 1 : curr - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((curr) => (curr === GALLERY_SLIDES.length - 1 ? 0 : curr + 1));
  };

  // Toast trigger
  const showToast = (title: string, desc: string) => {
    setToast({ show: true, title, desc });
    setTimeout(() => {
      setToast({ show: false, title: '', desc: '' });
    }, 4000);
  };

  // Modal open
  const openModal = (service = 'Outdoor Hoardings') => {
    setModalService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Form submit handlers
  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeModal();
    showToast('Inquiry Submitted!', 'Our media planning team will call you back shortly.');
  };

  const handleSectionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (e.target as HTMLFormElement).reset();
    showToast('Campaign Brief Sent!', 'Director Gireesh Kumar S & team have received your request.');
  };

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (e.target as HTMLFormElement).reset();
    showToast('Request Received!', 'Our team will call your phone number shortly.');
  };

  // Icon helper for service cards
  const getIconClass = (iconKey?: string, title?: string) => {
    const k = (iconKey || '').toLowerCase();
    const t = (title || '').toLowerCase();
    if (k.includes('rectangle') || t.includes('hoarding') || t.includes('billboard'))
      return 'fa-rectangle-ad';
    if (k.includes('bus') || t.includes('vehicle') || t.includes('transit')) return 'fa-bus';
    if (k.includes('store') || t.includes('shop') || t.includes('retail') || t.includes('facade'))
      return 'fa-store';
    if (k.includes('champagne') || t.includes('event') || t.includes('stall'))
      return 'fa-champagne-glasses';
    if (k.includes('paint') || t.includes('wall') || t.includes('mural')) return 'fa-paintbrush';
    if (k.includes('pen') || t.includes('design') || t.includes('print')) return 'fa-pen-ruler';
    return iconKey || 'fa-layer-group';
  };

  return (
    <>
      {/* HEADER NAVIGATION */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <a href="/" className="brand-logo" id="brand-logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo.png"
            alt="Innovations"
            className="site-brand-logo"
            style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
          />
        </a>

        <nav className="nav-menu" id="nav-menu">
          <a href="/" className="nav-link">Home</a>
          <a href="/about" className="nav-link">About Us</a>
          <a href="/founder-of-nova" className="nav-link active">Founder</a>
          <a href="/services" className="nav-link">Services</a>
          <a href="/gallery" className="nav-link">Campaign Gallery</a>
          <a href="/contact" className="nav-link">Contact</a>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            id="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <button
            className="btn nav-book-btn"
            onClick={() => openModal('Outdoor Hoardings')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(220, 38, 38, 0.08)',
              color: '#dc2626',
              border: '1px solid rgba(220, 38, 38, 0.2)',
              padding: '8px 18px',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <i className="fa-solid fa-phone"></i>
            <span>Book Hoarding</span>
          </button>
          <button
            className="mobile-toggle"
            id="mobile-toggle"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Toggle Navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* DRAWER OVERLAY */}
      <div
        className={`drawer-overlay ${isDrawerOpen ? 'open' : ''}`}
        id="drawer-overlay"
        onClick={() => setIsDrawerOpen(false)}
      ></div>

      {/* MOBILE DRAWER */}
      <div className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`} id="mobile-drawer">
        <div className="drawer-header">
          <a href="/" style={{ display: 'inline-block' }}>
            <img
              src="/logo.png"
              alt="Innovations"
              style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
            />
          </a>
          <button
            className="drawer-close"
            id="drawer-close"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close Menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="drawer-links">
          <a href="/" className="drawer-link" onClick={() => setIsDrawerOpen(false)}>
            <i className="fa-solid fa-house"></i> Home
          </a>
          <a href="/about" className="drawer-link" onClick={() => setIsDrawerOpen(false)}>
            <i className="fa-solid fa-circle-info"></i> About Us
          </a>
          <a href="/founder-of-nova" className="drawer-link active" onClick={() => setIsDrawerOpen(false)}>
            <i className="fa-solid fa-user-tie"></i> Founder
          </a>
          <a href="/services" className="drawer-link" onClick={() => setIsDrawerOpen(false)}>
            <i className="fa-solid fa-layer-group"></i> Services
          </a>
          <a href="/gallery" className="drawer-link" onClick={() => setIsDrawerOpen(false)}>
            <i className="fa-solid fa-images"></i> Campaign Gallery
          </a>
          <a href="/contact" className="drawer-link" onClick={() => setIsDrawerOpen(false)}>
            <i className="fa-solid fa-envelope"></i> Contact
          </a>
        </div>
        <div className="drawer-footer">
          <a
            href="https://wa.me/919539000640"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-block drawer-btn"
          >
            <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="site-main">
        {/* HERO SECTION */}
        <section className="hero-section" id="hero">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-tag-badge">
                <i className="fa-solid fa-star"></i> <span>27+ Years of Creative Advertising Excellence</span>
              </div>
              <h1 className="hero-title" id="founder-hero-title">
                {heroTitle}
              </h1>
              <p className="hero-desc" id="founder-hero-desc">
                {heroDesc}
              </p>
              <div className="hero-actions">
                <a href="tel:+919539000640" className="btn btn-primary hero-cta-btn" id="founder-hero-cta">
                  <span>Book Hoardings</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="visual-wrapper">
                <div className="hero-blue-circle"></div>
                <div className="hero-img-box">
                  <img src={founderImg} alt={founderName} className="hero-founder-img" id="founder-hero-img" />
                </div>
                <div className="founder-title-badge">
                  <strong id="founder-hero-name">{founderName}</strong>
                  <span id="founder-hero-role">{founderRole}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: SERVICES */}
        <section className="features-wrapper-section rounded-container-light" id="services">
          <div className="container-top-notch">
            <span className="notch-dash"></span>
          </div>

          <div className="section-header-left">
            <span className="about-subhead">WHAT WE OFFER</span>
            <h2 className="section-heading-sm">Comprehensive Advertising Services</h2>
            <p className="section-desc-left">
              End-to-end outdoor advertising, design studio creations, transit branding, and corporate events across Kerala.
            </p>
          </div>

          <div className="services-cards-grid" id="services-cards-container">
            {services.map((srv, idx) => (
              <div className="service-squircle-card" key={srv.id || idx}>
                <div className="service-icon-box">
                  <i className={`fa-solid ${getIconClass(srv.icon, srv.title)}`}></i>
                </div>
                <h3 className="service-title">{srv.title}</h3>
                <p className="service-desc">{srv.description}</p>
                {srv.features && srv.features.length > 0 && (
                  <div className="service-tags-list">
                    {srv.features.map((feat, fIdx) => (
                      <span className="service-tag-item" key={fIdx}>
                        <i className="fa-solid fa-check"></i> {feat}
                      </span>
                    ))}
                  </div>
                )}
                <button className="service-card-btn" onClick={() => openModal(srv.title)}>
                  <span>Inquire {srv.title.split(' ')[0]}</span> <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: ABOUT US */}
        <section className="testimonials-overview-section" id="about">
          <div className="speciality-highlight-strip">
            <div className="strip-icon-box">
              <i className="fa-solid fa-bolt"></i>
            </div>
            <div className="strip-text-box">
              <strong>OUR SPECIALITY:</strong> We can advertise your business overnight all over Kerala across 14 districts.
            </div>
            <a href="tel:+919539000640" className="strip-btn">
              <i className="fa-solid fa-phone"></i> +91 9539000640
            </a>
          </div>

          <div className="overview-grid">
            <div className="overview-left">
              <div className="dual-dots-badge">
                <span className="dot dot-red"></span>
                <span className="dot dot-red"></span>
              </div>
              <span className="about-subhead">WELCOME TO NOVA INNOVATIONS</span>
              <h2 className="overview-title">27+ Years of Creative Advertising Excellence</h2>
              <p className="about-paragraph">
                We <strong>&quot;Innovations&quot;</strong> are the premier innovative and creative advertising partner for the new
                era of outdoor hoardings and brand media in Kerala. We are deeply committed to taking each of our client
                firms to the next levels of business hierarchy.
              </p>
              <p className="about-paragraph">
                From customized graphic conceptualization in our design studio to high-visibility prime highway hoardings,
                bus fleet branding, shop signages, and end-to-end event production, we provide head-to-tail services with
                100% structural protection.
              </p>

              <div className="director-quote-card">
                <div className="director-avatar-wrap">
                  <img src="/assets/hero_man.jpeg" alt="Gireesh Kumar S" className="director-avatar" />
                </div>
                <div className="director-quote-info">
                  <p className="director-quote-text">
                    &quot;Our mission is to hallmark your brand into every customer&apos;s mind with prime locations, structural
                    perfection, and instant overnight deployment.&quot;
                  </p>
                  <h4 className="director-name">GIREESH KUMAR S</h4>
                  <span className="director-role">Director / CEO — NOVA Innovations</span>
                </div>
              </div>

              <div className="metrics-pills-row">
                <div className="metric-pill">
                  <span className="pill-number">27</span>
                  <span className="pill-suffix">+</span>
                  <span className="pill-sub">Years Excellence</span>
                </div>
                <div className="metric-pill">
                  <span className="pill-number">500</span>
                  <span className="pill-suffix">+</span>
                  <span className="pill-sub">Prime Hoardings</span>
                </div>
                <div className="metric-pill">
                  <span className="pill-number">1000</span>
                  <span className="pill-suffix">+</span>
                  <span className="pill-sub">Campaigns</span>
                </div>
                <div className="metric-pill">
                  <span className="pill-number">14</span>
                  <span className="pill-sub">Districts Overnight</span>
                </div>
              </div>
            </div>

            <div className="overview-right-mosaic">
              <div className="mosaic-container">
                <div className="mosaic-bottom-row">
                  <div className="mosaic-img-card">
                    <img
                      src="/assets/about_hoarding.jpg"
                      alt="Kerala Highway Billboard Hoarding Showcase"
                      className="mosaic-img"
                    />
                  </div>
                  <div className="mosaic-abstract-card">
                    <div className="nova-badge-wrapper">
                      <img
                        src="/assets/nova_logo_badge.svg"
                        alt="NOVA Innovations Official Logo Badge"
                        className="nova-badge-img"
                      />
                    </div>
                  </div>
                </div>

                <div className="mosaic-banner-card">
                  <div className="banner-card-img-wrap">
                    <img
                      src="/assets/founder_transit.jpg"
                      alt="KSRTC Transit Fleet Network"
                      className="banner-card-img"
                    />
                    <div className="banner-card-overlay"></div>
                  </div>
                  <div className="banner-card-content">
                    <span className="banner-tag">
                      <i className="fa-solid fa-bus"></i> Statewide Network
                    </span>
                    <h4 className="banner-title">Statewide KSRTC Transit Bus Fleet Network</h4>
                    <p className="banner-desc">
                      Pan-Kerala mobile advertising coverage across all 14 districts with 24/7 high visibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOUNDER SPOTLIGHT */}
          <div className="founder-spotlight-card" id="founder">
            <div className="founder-card-grid">
              <div className="founder-img-col">
                <div className="founder-portrait-frame">
                  <img
                    src="/assets/hero_man.jpeg"
                    alt="Gireesh Kumar S"
                    className="founder-portrait-img"
                    id="spotlight-portrait-img"
                  />
                  <div className="founder-experience-badge">
                    <span className="exp-number">27+</span>
                    <span className="exp-text">Years Leadership</span>
                  </div>
                </div>
              </div>
              <div className="founder-info-col">
                <div className="dual-dots-badge">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-red"></span>
                </div>
                <span className="about-subhead">LEADERSHIP SPOTLIGHT</span>
                <h2 className="founder-name-heading">GIREESH KUMAR S</h2>
                <h3 className="founder-designation">Founder, Director &amp; CEO — Nova Innovations</h3>
                <p className="founder-bio-text">
                  Pioneering outdoor advertising, highway hoardings, and transit fleet branding across Kerala for over 27
                  years. Under Gireesh Kumar S&apos;s leadership, Nova Innovations manages 500+ prime hoarding corridors and
                  nationwide campaign executions.
                </p>
                <div className="founder-key-pillars">
                  <div className="pillar-item">
                    <div className="pillar-icon">
                      <i className="fa-solid fa-trophy"></i>
                    </div>
                    <div>
                      <strong>Visionary Direction</strong>
                      <p>Building Kerala&apos;s most reliable 24/7 overnight advertising engine.</p>
                    </div>
                  </div>
                  <div className="pillar-item">
                    <div className="pillar-icon">
                      <i className="fa-solid fa-handshake"></i>
                    </div>
                    <div>
                      <strong>Enterprise Relationships</strong>
                      <p>Trusted partner to myG, Bhima, Pothys, KSRTC &amp; Bank of Baroda.</p>
                    </div>
                  </div>
                </div>
                <div className="founder-actions">
                  <a href="tel:+919539000640" className="btn btn-primary" id="spotlight-phone-btn">
                    <i className="fa-solid fa-phone"></i> <span>Call Founder: +91 9539000640</span>
                  </a>
                  <button className="btn btn-ghost" onClick={() => openModal('Founder Meeting')}>
                    <span>Connect with Director</span> <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ESTEEMED CLIENTS / LOGO MARQUEE */}
        <section className="partners-section" id="partners">
          <div className="partners-title-wrap">
            <span className="partners-title">OUR ESTEEMED CLIENTS &amp; BRAND PARTNERS</span>
          </div>

          <div className="partners-marquee-container">
            <div className="partners-marquee-track">
              {/* Set 1 */}
              {(clients.length > 0 ? clients : DEFAULT_CLIENT_LOGOS).map((logo, lIdx) => (
                <div className="partner-logo-item" title={logo.name} key={`s1-${lIdx}`}>
                  <img
                    src={'file' in logo ? `/client-logos/${logo.file}` : logo.logoUrl}
                    alt={logo.name}
                    className="partner-logo-img"
                  />
                </div>
              ))}
              {/* Set 2 (for infinite loop) */}
              {(clients.length > 0 ? clients : DEFAULT_CLIENT_LOGOS).map((logo, lIdx) => (
                <div className="partner-logo-item" aria-hidden="true" title={logo.name} key={`s2-${lIdx}`}>
                  <img
                    src={'file' in logo ? `/client-logos/${logo.file}` : logo.logoUrl}
                    alt={logo.name}
                    className="partner-logo-img"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: GALLERY */}
        <section className="gallery-swipe-section" id="gallery">
          <div className="section-header-centered">
            <div className="dual-dots-badge center">
              <span className="dot dot-red"></span>
              <span className="dot dot-red"></span>
            </div>
            <span className="section-sub">FEATURED MEDIA GALLERY</span>
            <h2 className="section-heading">High-Impact Campaign Showcase</h2>
            <p className="section-desc">
              Swipe through Nova Innovations&apos; landmark billboard installations, mobile transit fleets, and
              architectural displays across Kerala.
            </p>
          </div>

          <div className="swipe-gallery-container">
            <div className="swipe-stage">
              <button
                className="swipe-nav-btn prev"
                onClick={prevSlide}
                aria-label="Previous Image Slide"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              <div className="swipe-track-wrapper">
                <div className="swipe-track">
                  {GALLERY_SLIDES.map((slide, sIdx) => (
                    <div
                      className={`swipe-slide ${sIdx === currentSlide ? 'active' : ''}`}
                      key={sIdx}
                      style={{ display: sIdx === currentSlide ? 'block' : 'none' }}
                    >
                      <div className="slide-image-wrapper">
                        <img src={slide.img} alt={slide.title} className="slide-img" />
                        <div className="slide-gradient-overlay"></div>
                      </div>
                      <div className="slide-caption-card">
                        <div className="caption-header">
                          <span className="slide-badge">
                            <i className={`fa-solid ${slide.badgeIcon}`}></i> {slide.badgeText}
                          </span>
                          <span className="slide-counter">{slide.counter}</span>
                        </div>
                        <h3 className="slide-title">{slide.title}</h3>
                        <p className="slide-meta">
                          <i className={`fa-solid ${slide.metaIcon}`}></i> {slide.meta}
                        </p>
                        <div className="slide-actions">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => openModal(slide.modalSubject)}
                          >
                            {slide.actionText} <i className="fa-solid fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="swipe-nav-btn next"
                onClick={nextSlide}
                aria-label="Next Image Slide"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            <div className="swipe-dots-container">
              {GALLERY_SLIDES.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={`swipe-dot ${dotIdx === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(dotIdx)}
                ></span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: CTA BANNER */}
        <section className="cta-banner-section">
          <div className="cta-card">
            <div className="cta-content">
              <h2 className="cta-heading">Ready to Hallmark Your Brand Across Kerala?</h2>
              <p className="cta-text">
                Connect directly with management for vacant hoardings, bus fleet media, and custom rates.
              </p>
              <div className="cta-btn-group">
                <a href="tel:+919539000640" className="btn btn-primary btn-large">
                  <i className="fa-solid fa-phone"></i> Call: +91 9539000640
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: CONTACT */}
        <section className="contact-section" id="contact">
          <div className="contact-header">
            <div className="dual-dots-badge">
              <span className="dot dot-red"></span>
              <span className="dot dot-red"></span>
            </div>
            <span className="contact-subhead">DIRECT MEDIA INQUIRIES</span>
            <h2 className="contact-title">Let&apos;s Hallmark Your Brand Across Kerala</h2>
            <p className="contact-desc">
              Get in touch directly with Gireesh Kumar S (Director / CEO) and our media planning team for prime highway
              hoardings, KSRTC bus wraps, and retail facade campaigns.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info-column">
              <div className="contact-card">
                <div className="contact-card-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="contact-card-details">
                  <span className="contact-label">HEAD OFFICE &amp; DESIGN STUDIO</span>
                  <h4 className="contact-val-title">Nova Innovations</h4>
                  <p className="contact-val-text">
                    T.C 26/929(2), C.K. Tower, Panavila Junction, Thiruvananthapuram, Kerala - 695001
                  </p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-icon">
                  <i className="fa-solid fa-phone-volume"></i>
                </div>
                <div className="contact-card-details">
                  <span className="contact-label">DIRECT PHONE &amp; WHATSAPP</span>
                  <h4 className="contact-val-title">+91 95390 00640</h4>
                  <p className="contact-val-text">
                    Alternative: +91 95263 64446 • Available 24/7 for campaign booking
                  </p>
                  <div className="contact-quick-actions">
                    <a href="tel:+919539000640" className="btn btn-primary btn-xs">
                      <i className="fa-solid fa-phone"></i> Call Now
                    </a>
                    <a
                      href="https://wa.me/919539000640"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-xs"
                    >
                      <i className="fa-brands fa-whatsapp"></i> WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-icon">
                  <i className="fa-solid fa-envelope-open-text"></i>
                </div>
                <div className="contact-card-details">
                  <span className="contact-label">EMAIL MEDIA DESK</span>
                  <h4 className="contact-val-title">novainnovations2020@gmail.com</h4>
                  <p className="contact-val-text">
                    Send your campaign brief or site requirements directly for instant quotations.
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-form-column">
              <div className="contact-form-card">
                <div className="form-card-header">
                  <h3 className="form-card-title">
                    <i className="fa-solid fa-paper-plane"></i> Send Campaign Inquiry
                  </h3>
                  <p className="form-card-sub">
                    Fill out the details below for a quick response from Director Gireesh Kumar S.
                  </p>
                </div>

                <form className="section-contact-form" id="page-contact-form" onSubmit={handleSectionSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="p-form-name">Your Name / Business *</label>
                      <input type="text" id="p-form-name" placeholder="e.g. Rahul Sharma (myG)" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="p-form-phone">Mobile Number *</label>
                      <input type="tel" id="p-form-phone" placeholder="+91 95390 00000" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="p-form-email">Email Address</label>
                      <input type="email" id="p-form-email" placeholder="name@company.com" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="p-form-service">Required Service *</label>
                      <select id="p-form-service" required defaultValue="Outdoor Hoardings">
                        <option value="Outdoor Hoardings">Outdoor Hoardings</option>
                        <option value="Vehicle Advertising">KSRTC Bus Wrap</option>
                        <option value="Shop & Retail Branding">Shop Facade Signage</option>
                        <option value="Event Branding">Event Stall Fabrication</option>
                        <option value="Design Studio">Design Studio &amp; Printing</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="p-form-message">Preferred Corridors / Details *</label>
                    <textarea
                      id="p-form-message"
                      rows={3}
                      placeholder="Specify your target districts (e.g. Trivandrum, Ernakulam, Palakkad)..."
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block page-submit-btn">
                    <span>Submit Campaign Brief</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <span className="logo-text">
              GIREESH <span className="logo-accent">KUMAR S</span>
            </span>
            <p className="footer-bio">
              <strong>NOVA INNOVATIONS</strong> — Outdoors • Design Studio • Events. Kerala&apos;s premier advertising
              partner with 27+ years of creative excellence.
            </p>
            <div className="social-links">
              <a href="tel:+919539000640" className="social-icon" aria-label="Phone">
                <i className="fa-solid fa-phone"></i>
              </a>
              <a
                href="https://wa.me/919539000640"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href="mailto:novainnovations2020@gmail.com" className="social-icon" aria-label="Email">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Our Services</h4>
            <ul className="footer-links-list">
              <li><a href="#services">Outdoor Highway Hoardings</a></li>
              <li><a href="#services">KSRTC Bus Transit Media</a></li>
              <li><a href="#services">Shop &amp; Retail Facade Signage</a></li>
              <li><a href="#services">Event Stall Fabrication</a></li>
              <li><a href="#services">Design Studio &amp; Flex Printing</a></li>
            </ul>
          </div>

          <div className="footer-newsletter-col">
            <h4 className="footer-col-title">Contact Nova</h4>
            <p className="newsletter-desc">
              <strong>Head Office:</strong> T.C 26/929(2), C.K. Tower, Panavila Jn., Thiruvananthapuram - 695001
              <br />
              <strong>Mob:</strong> +91 95390 00640, 95263 64446
            </p>
            <form className="newsletter-form" id="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <div className="newsletter-input-wrap">
                <input type="tel" id="newsletter-email" placeholder="Your Phone Number..." required />
                <button type="submit" className="newsletter-btn" aria-label="Request Call">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 NOVA Innovations (Outdoors • Design Studio • Events). All Rights Reserved.</p>
          <div className="footer-legal">
            <a href="tel:+919539000640">+91 9539000640</a>
            <span className="sep">•</span>
            <a href="mailto:novainnovations2020@gmail.com">novainnovations2020@gmail.com</a>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {isModalOpen && (
        <div
          className="modal-overlay open"
          id="contact-modal"
          style={{ display: 'flex' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="modal-card">
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <div className="modal-header">
              <div className="modal-icon">
                <i className="fa-solid fa-bullhorn"></i>
              </div>
              <h3 className="modal-title">Book Hoardings &amp; Campaign Inquiry</h3>
              <p className="modal-sub">Inquire directly with Gireesh Kumar S (Director / CEO) &amp; media planning team.</p>
            </div>

            <form className="modal-form" id="contact-form" onSubmit={handleModalSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="form-name">Full Name / Company</label>
                  <input type="text" id="form-name" placeholder="e.g. Rahul Sharma (myG)" required />
                </div>
                <div className="form-group">
                  <label htmlFor="form-email">Phone Number</label>
                  <input type="tel" id="form-email" placeholder="+91 95390 00000" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="form-service">Service Required</label>
                <select id="form-service" defaultValue={modalService}>
                  <option value="Outdoor Hoardings">Outdoor Hoardings (Billboards &amp; Unipoles)</option>
                  <option value="Vehicle Advertising">Vehicle &amp; KSRTC Bus Branding</option>
                  <option value="Shop & Retail Branding">Shop &amp; Showroom Facade Signage</option>
                  <option value="Event Branding">Event Branding &amp; Exhibition Stalls</option>
                  <option value="Design Studio">Design Studio &amp; Flex Printing</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="form-message">Preferred Locations / Details</label>
                <textarea
                  id="form-message"
                  rows={4}
                  placeholder="Specify preferred locations (e.g. Trivandrum, Kochi, Palakkad) or campaign timeline..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-block modal-submit-btn">
                <span>Submit Campaign Inquiry</span>
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      <div className={`toast ${toast.show ? 'show' : ''}`} id="toast" style={{ display: toast.show ? 'flex' : 'none' }}>
        <div className="toast-icon">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div className="toast-body">
          <strong id="toast-title">{toast.title}</strong>
          <p id="toast-desc">{toast.desc}</p>
        </div>
      </div>
    </>
  );
}
