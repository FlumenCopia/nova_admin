'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MobileDrawer from '@/components/MobileDrawer';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import FounderSpotlight from '@/components/FounderSpotlight';
import ClientsMarquee from '@/components/ClientsMarquee';
import Gallery from '@/components/Gallery';
import CtaBanner from '@/components/CtaBanner';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import Toast from '@/components/Toast';

import { DEFAULT_SERVICES } from '@/data/content';
import { ClientItem, ServiceItem, ToastData } from '@/types';

export default function FounderPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState('Outdoor Hoardings');

  // Toast
  const [toast, setToast] = useState<ToastData>({
    show: false,
    title: '',
    desc: '',
  });

  // Dynamic Backend Data (with default fallback)
  const [heroTag, setHeroTag] = useState('27+ Years of Creative Advertising Excellence');
  const [heroTitle, setHeroTitle] = useState('INNOVATIONS THAT HALLMARKS YOUR BRAND');
  const [heroDesc, setHeroDesc] = useState(
    'Outdoors • Design Studio • Events — Prime hoardings, transit vehicle branding, and overnight campaign execution across Kerala.'
  );
  const [heroCtaText, setHeroCtaText] = useState('Book Hoardings');
  const [heroCtaPhone, setHeroCtaPhone] = useState('+91 95390 00640');
  const [founderImg, setFounderImg] = useState('/assets/hero_man.jpeg');
  const [founderName, setFounderName] = useState('GIREESH KUMAR S');
  const [founderRole, setFounderRole] = useState('Founder & CEO — NOVA Innovations');

  // Services Header & Items
  const [servicesSubhead, setServicesSubhead] = useState('WHAT WE OFFER');
  const [servicesHeading, setServicesHeading] = useState('Comprehensive Advertising Services');
  const [servicesDesc, setServicesDesc] = useState(
    'End-to-end outdoor advertising, design studio creations, transit branding, and corporate events across Kerala.'
  );
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);

  // Clients
  const [partnersTitle, setPartnersTitle] = useState('OUR ESTEEMED CLIENTS & BRAND PARTNERS');
  const [clients, setClients] = useState<ClientItem[]>([]);

  // Leadership Spotlight
  const [spotlightTag, setSpotlightTag] = useState('LEADERSHIP SPOTLIGHT');
  const [spotlightName, setSpotlightName] = useState('GIREESH KUMAR S');
  const [spotlightRole, setSpotlightRole] = useState('Founder, Director & CEO — Nova Innovations');
  const [spotlightYears, setSpotlightYears] = useState('27+');
  const [spotlightYearsLabel, setSpotlightYearsLabel] = useState('Years Leadership');
  const [spotlightBio, setSpotlightBio] = useState(
    "Pioneering outdoor advertising, highway hoardings, and transit fleet branding across Kerala for over 27 years. Under Gireesh Kumar S's leadership, Nova Innovations manages 500+ prime hoarding corridors and nationwide campaign executions."
  );
  const [spotlightPhone, setSpotlightPhone] = useState('+91 9539000640');
  const [spotlightFeat1Title, setSpotlightFeat1Title] = useState('Visionary Direction');
  const [spotlightFeat1Desc, setSpotlightFeat1Desc] = useState("Building Kerala's most reliable 24/7 overnight advertising engine.");
  const [spotlightFeat2Title, setSpotlightFeat2Title] = useState('Enterprise Relationships');
  const [spotlightFeat2Desc, setSpotlightFeat2Desc] = useState('Trusted partner to myG, Bhima, Pothys, KSRTC & Bank of Baroda.');
  const [spotlightImage, setSpotlightImage] = useState('/assets/hero_man.jpeg');

  // Contact info
  const [primaryPhone, setPrimaryPhone] = useState('+91 95390 00640');
  const [altPhone, setAltPhone] = useState('+91 95263 64446');
  const [contactEmail, setContactEmail] = useState('novainnovations2020@gmail.com');
  const [hqAddress, setHqAddress] = useState('T.C 26/929(2), C.K. Tower, Panavila Junction, Thiruvananthapuram, Kerala - 695001');

  const apiBase =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:5000/api'
      : '/api';

  // Theme setup
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

  // Scroll effect & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const scrollPos = window.scrollY + 140;
      const sections = ['hero', 'about', 'services', 'gallery', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch backend data from admin-api
  useEffect(() => {
    // 1. Settings (Hero, Spotlight, Contact, Titles)
    fetch(`${apiBase}/public/settings`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.success && json?.data) {
          const s = json.data;
          if (s.founderHeroTag) setHeroTag(s.founderHeroTag);
          if (s.founderHeroTitle || s.heroTitle) setHeroTitle(s.founderHeroTitle || s.heroTitle);
          if (s.founderHeroDesc || s.heroSubtitle) setHeroDesc(s.founderHeroDesc || s.heroSubtitle);
          if (s.founderHeroCtaText) setHeroCtaText(s.founderHeroCtaText);
          if (s.founderHeroCtaPhone || s.primaryPhone) setHeroCtaPhone(s.founderHeroCtaPhone || s.primaryPhone);

          if (s.founderName || s.leaderName) setFounderName(s.founderName || s.leaderName);
          if (s.founderRole || s.leaderRole) setFounderRole(s.founderRole || s.leaderRole);

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

          // Services section headers
          if (s.servicesSectionSubhead) setServicesSubhead(s.servicesSectionSubhead);
          if (s.servicesSectionHeading) setServicesHeading(s.servicesSectionHeading);
          if (s.servicesSectionDesc) setServicesDesc(s.servicesSectionDesc);

          // Partners title
          if (s.partnersSectionTitle) setPartnersTitle(s.partnersSectionTitle);

          // Leadership Spotlight
          if (s.leaderTag) setSpotlightTag(s.leaderTag);
          if (s.leaderName) setSpotlightName(s.leaderName);
          if (s.leaderRole) setSpotlightRole(s.leaderRole);
          if (s.leaderYears) setSpotlightYears(s.leaderYears);
          if (s.leaderYearsLabel) setSpotlightYearsLabel(s.leaderYearsLabel);
          if (s.leaderBio) setSpotlightBio(s.leaderBio);
          if (s.leaderPhone) setSpotlightPhone(s.leaderPhone);
          if (s.leaderFeature1Title) setSpotlightFeat1Title(s.leaderFeature1Title);
          if (s.leaderFeature1Desc) setSpotlightFeat1Desc(s.leaderFeature1Desc);
          if (s.leaderFeature2Title) setSpotlightFeat2Title(s.leaderFeature2Title);
          if (s.leaderFeature2Desc) setSpotlightFeat2Desc(s.leaderFeature2Desc);
          if (s.leaderImage) {
            const lImg = s.leaderImage;
            const fullLUrl =
              lImg.startsWith('http') || lImg.startsWith('//')
                ? lImg
                : lImg.startsWith('/uploads')
                ? `http://localhost:5000${lImg}`
                : lImg;
            setSpotlightImage(fullLUrl);
          }

          // Contact details
          if (s.primaryPhone) setPrimaryPhone(s.primaryPhone);
          if (s.altPhone) setAltPhone(s.altPhone);
          if (s.contactEmail) setContactEmail(s.contactEmail);
          if (s.hqAddress) setHqAddress(s.hqAddress);
        }
      })
      .catch(() => {});

    // 2. Services from backend
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

    // 3. Clients from backend
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
  }, [apiBase]);

  // Toast helper
  const showToast = (title: string, desc: string) => {
    setToast({ show: true, title, desc });
    setTimeout(() => {
      setToast({ show: false, title: '', desc: '' });
    }, 4000);
  };

  // Modal helpers
  const openModal = (service = 'Outdoor Hoardings') => {
    setModalService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Post inquiry to backend admin-api (/api/public/enquiries)
  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      service: (formData.get('service') as string) || modalService,
      message: (formData.get('message') as string) || '',
      source: 'Founder Modal Booking',
    };

    try {
      await fetch(`${apiBase}/public/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      // safe fallback
    }

    closeModal();
    showToast('Inquiry Submitted!', 'Our media planning team will call you back shortly.');
  };

  const handleSectionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: (formData.get('email') as string) || '',
      service: (formData.get('service') as string) || 'Outdoor Hoardings',
      message: (formData.get('message') as string) || '',
      source: 'Founder Section Form',
    };

    try {
      await fetch(`${apiBase}/public/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      // safe fallback
    }

    form.reset();
    showToast('Campaign Brief Sent!', 'Director Gireesh Kumar S & team have received your request.');
  };

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const phoneOrEmail = (formData.get('phoneOrEmail') as string) || '';

    try {
      await fetch(`${apiBase}/public/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Footer Quick Request',
          phone: phoneOrEmail,
          service: 'General Inquiry',
          message: 'Submitted via Founder Footer Quick Request',
          source: 'Founder Footer',
        }),
      });
    } catch (err) {
      // safe fallback
    }

    form.reset();
    showToast('Request Received!', 'Our team will call your phone number shortly.');
  };

  return (
    <>
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        isScrolled={isScrolled}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />

      <main className="site-main">
        <Hero
          tag={heroTag}
          title={heroTitle}
          description={heroDesc}
          ctaText={heroCtaText}
          ctaPhone={heroCtaPhone}
          founderImg={founderImg}
          founderName={founderName}
          founderRole={founderRole}
          onOpenModal={openModal}
        />

        <Services
          services={services}
          subhead={servicesSubhead}
          heading={servicesHeading}
          desc={servicesDesc}
          onOpenModal={openModal}
        />

        <section className="testimonials-overview-section" id="about">
          {/* Overnight specialty highlight strip */}
          <div className="speciality-highlight-strip">
            <div className="strip-icon-box">
              <i className="fa-solid fa-bolt"></i>
            </div>
            <div className="strip-text-box">
              <strong>OUR SPECIALITY:</strong> We can advertise your business overnight all over Kerala across 14 districts.
            </div>
            <a href={`tel:${heroCtaPhone.replace(/\s+/g, '')}`} className="strip-btn">
              <i className="fa-solid fa-phone"></i> {heroCtaPhone}
            </a>
          </div>

          <About />

          <FounderSpotlight
            tag={spotlightTag}
            name={spotlightName}
            role={spotlightRole}
            bio={spotlightBio}
            years={spotlightYears}
            yearsLabel={spotlightYearsLabel}
            image={spotlightImage}
            phone={spotlightPhone}
            feat1Title={spotlightFeat1Title}
            feat1Desc={spotlightFeat1Desc}
            feat2Title={spotlightFeat2Title}
            feat2Desc={spotlightFeat2Desc}
            onOpenModal={openModal}
          />
        </section>

        <ClientsMarquee title={partnersTitle} clients={clients} />

        <Gallery onOpenModal={openModal} />

        <CtaBanner />

        <Contact
          primaryPhone={primaryPhone}
          altPhone={altPhone}
          email={contactEmail}
          address={hqAddress}
          onSubmit={handleSectionSubmit}
        />
      </main>

      <Footer onNewsletterSubmit={handleNewsletterSubmit} />

      <BookingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        service={modalService}
        onSubmit={handleModalSubmit}
      />

      <Toast toast={toast} />
    </>
  );
}
