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
  const [heroTitle, setHeroTitle] = useState('INNOVATIONS THAT HALLMARKS YOUR BRAND');
  const [heroDesc, setHeroDesc] = useState(
    'Outdoors • Design Studio • Events — Prime hoardings, transit vehicle branding, and overnight campaign execution across Kerala.'
  );
  const [founderImg, setFounderImg] = useState('/assets/hero_man.jpeg');
  const [founderName, setFounderName] = useState('GIREESH KUMAR S');
  const [founderRole, setFounderRole] = useState('Founder & CEO — NOVA Innovations');
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [clients, setClients] = useState<ClientItem[]>([]);

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

  // Toast
  const showToast = (title: string, desc: string) => {
    setToast({ show: true, title, desc });
    setTimeout(() => {
      setToast({ show: false, title: '', desc: '' });
    }, 4000);
  };

  // Modal
  const openModal = (service = 'Outdoor Hoardings') => {
    setModalService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          title={heroTitle}
          description={heroDesc}
          founderImg={founderImg}
          founderName={founderName}
          founderRole={founderRole}
        />

        <Services services={services} onOpenModal={openModal} />

        <section className="testimonials-overview-section" id="about">
          {/* Overnight specialty highlight strip */}
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

          <About />

          <FounderSpotlight onOpenModal={openModal} />
        </section>

        <ClientsMarquee clients={clients} />

        <Gallery onOpenModal={openModal} />

        <CtaBanner />

        <Contact onSubmit={handleSectionSubmit} />
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
