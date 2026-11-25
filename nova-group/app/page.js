'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Check, Phone, MessageSquare, Palette, Printer, ShieldCheck, Monitor, MapPin, Bus, LayoutGrid, ChevronDown, ChevronUp, Sparkles, Navigation, Award, ArrowRight } from 'lucide-react';
import MarqueeLogos from '../components/MarqueeLogos';
import PortfolioSlider from '../components/PortfolioSlider';
import LeadershipSection from '../components/LeadershipSection';
import AnimatedStatNumber from '../components/AnimatedStatNumber';
import { fetchApi, getMediaUrl } from '../lib/api';

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [heroData, setHeroData] = useState({
    bannerUrl: '/mainhero1.png',
    title: 'INNOVATIONS THAT\nHALLMARKS YOUR BRAND',
    subtitle: 'Outdoors • Design Studio • Events — Prime hoardings, branding & overnight campaign execution across Kerala.',
  });

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? -1 : idx);
  };

  const faqItems = [
    {
      q: 'Which is the best billboard advertising company in TVM (Thiruvananthapuram)?',
      a: 'Nova Innovations is rated as the best billboard advertising company in TVM (Thiruvananthapuram) and across Kerala. Headquartered at Vazhuthacaud with 27+ years of leadership, Nova Innovations directly operates 500+ prime media assets, high-traffic highway unipoles on the Kazhakkoottam Technopark Bypass, Kowdiar, and MG Road, and provides full turnkey A-to-Z services from creative planning to overnight crane placement and 24/7 illumination maintenance.',
    },
    {
      q: 'Where are the prime billboard and hoarding advertising locations in Trivandrum (TVM)?',
      a: 'Nova Innovations manages prime hoarding and billboard locations across all high-density traffic corridors in Trivandrum (TVM), including Kazhakkoottam & Technopark Phase 1-3 Bypass, Kowdiar Avenue, MG Road (Palayam, Statue, Overbridge), Bakery Junction, Panavila, Pettah, Vellayambalam, East Fort, Pattom, Sreekaryam, and the new Vizhinjam International Seaport NH 66 corridor. All hoardings feature 100% legal municipal approvals, high-lumen night illumination, and 24/7 structural maintenance.',
    },
    {
      q: 'How does vehicle advertising and KSRTC bus branding work in Kerala?',
      a: 'We provide end-to-end vehicle branding across Kerala, specializing in official KSRTC bus fleet wraps (Full-Body Wraps, Driver Side, Left Passenger Side, and Rear Back Panels) operating out of Thiruvananthapuram Central, Enanchira, Kollam, Ernakulam, and all 14 district depots. Additionally, we brand auto-rickshaws, commercial delivery vans, and deploy mobile LED announcement vans with custom audio systems for roadshows and high-impact regional product launches.',
    },
    {
      q: 'What types of physical outdoor advertising media does Nova Innovations offer?',
      a: 'Nova Innovations is a full-spectrum physical OOH (Out-of-Home) agency offering: 1) Large-format highway hoardings & unipoles, 2) Cantilever road gantries & bridge banners, 3) KSRTC & commercial transit vehicle wraps, 4) 3D LED acrylic channel letter signboards & ACP storefront facade cladding, 5) Weatherproof commercial highway compound wall murals, and 6) High-definition digital flex & star flex printing in our in-house studio.',
    },
    {
      q: 'What is the cost of renting a billboard or hoarding in Kerala and Trivandrum?',
      a: 'Hoarding rental costs vary based on exact location footfall, display dimensions (e.g., 40x20 ft, 30x15 ft, 60x20 ft), spot illumination, and campaign duration. Prime junction hoardings in Trivandrum (such as Technopark Bypass or Panavila) typically range from ₹25,000 to ₹1,50,000+ per month, with turnkey printing, mounting, and structural warranty included. Nova Innovations offers flexible monthly, quarterly, and multi-location package rates with guaranteed overnight execution.',
    },
    {
      q: 'Can Nova Innovations launch an overnight advertising campaign across all 14 districts?',
      a: 'Yes. Our signature capability is overnight pan-Kerala campaign execution. With dedicated mounting and fabrication crews stationed in South, Central, and North Kerala, we can print, dispatch, and install hundreds of billboards, transit panels, and retail signages simultaneously within 24 hours for urgent product launches, sales, or movie releases.',
    },
    {
      q: 'How do I check vacant hoardings or book a location immediately?',
      a: 'You can browse our live Campaign Gallery catalog online or contact our Kerala Media Desk directly at +91 95390 00640 or via WhatsApp. Our team provides an instant availability list, GPS coordinates, dimensional photos, and traffic counts for vacant hoardings in your desired district.',
    },
  ];

  useEffect(() => {
    async function loadData() {
      try {
        const [servicesRes, settingsRes] = await Promise.all([
          fetchApi('/public/services'),
          fetchApi('/public/settings'),
        ]);

        if (servicesRes && servicesRes.success && Array.isArray(servicesRes.data) && servicesRes.data.length > 0) {
          const mapped = servicesRes.data.map((s, idx) => ({
            id: s.id || `srv-${idx}`,
            title: s.title,
            desc: s.description,
            features: Array.isArray(s.features) ? s.features : [],
          }));
          setServices(mapped);
        }

        if (settingsRes && settingsRes.success && settingsRes.data) {
          setHeroData({
            bannerUrl: settingsRes.data.heroBannerUrl || '/mainhero1.png',
            title: settingsRes.data.heroTitle || 'INNOVATIONS THAT\nHALLMARKS YOUR BRAND',
            subtitle: settingsRes.data.heroSubtitle || 'Outdoors • Design Studio • Events — Prime hoardings, branding & overnight campaign execution across Kerala.',
          });
        }
      } catch (err) {
        console.error('Failed to load home page data:', err);
      }
    }
    loadData();
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section hero-full-cover" id="hero">
        <div className="hero-banner">
          <img
            src={getMediaUrl(heroData.bannerUrl, '/mainhero1.png')}
            alt="Nova Innovations Advertising Billboard"
            className="hero-bg-img"
          />
          <div className="hero-overlay"></div>

          <div className="container hero-container">
            <div className="hero-content">
              <h1 className="hero-title" style={{ whiteSpace: 'pre-line' }}>
                {heroData.title}
              </h1>
              <p className="hero-description">{heroData.subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALITY HIGHLIGHT STRIP */}
      <div className="speciality-strip">
        <div className="container speciality-strip-container">
          <div className="speciality-strip-text-wrap">
            <Zap className="speciality-strip-icon" size={26} strokeWidth={2.2} color="#ffffff" fill="#ffffff" />
            <span className="speciality-strip-text">OUR SPECIALITY: We can advertise your business overnight all over Kerala.</span>
          </div>
          <a href="tel:+919539000640" className="speciality-strip-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Phone size={14} />
            Call: +91 9539000640
          </a>
        </div>
      </div>

      {/* ABOUT US SECTION */}
      <section className="about-section" id="about-us">
        <div className="container">
          <div className="about-grid">
            <div className="about-text-col">
              <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
                Top Billboard Design &amp; Best Advertising Company in Kerala, India
              </span>
              <h2 className="heading-lg" style={{ marginTop: '6px' }}>
                Top Billboard Design in Kerala &amp; Best Advertising Company in TVM &amp; Kozhikode
              </h2>
              <p className="about-paragraph">
                We <strong>"Nova Innovations"</strong> are recognized as the <strong>top billboard design company in Kerala</strong> and the premier <strong>advertising infrastructure agency across India</strong>. We directly host 500+ prime advertising spaces, engineer high-recall creative concepts, print on in-house industrial large-format presses, physically mount hoardings overnight with heavy hydraulic cranes, and maintain continuous 24/7 illumination and structural safety across Trivandrum (TVM), Kochi, Kozhikode, and all 14 districts.
              </p>
              <p className="about-paragraph" style={{ marginTop: '14px' }}>
                From customized graphic conceptualization to prime NH 66 highway hoardings, KSRTC bus fleet wraps, shop signage, and end-to-end event production, we provide head-to-tail services with 100% legal clearances and storm-resistant structural warranty.
              </p>

              {/* Turnkey Pillars Feature Badges */}
              <div className="about-feature-pills-grid">
                <div className="about-feature-pill">
                  <div className="about-feature-pill-icon"><Check size={16} strokeWidth={2.5} /></div>
                  <div>
                    <strong>500+ Prime Media Assets</strong>
                    <span>Highway Unipoles, Gantries & TVM Corridors</span>
                  </div>
                </div>
                <div className="about-feature-pill">
                  <div className="about-feature-pill-icon"><Zap size={16} strokeWidth={2.5} /></div>
                  <div>
                    <strong>Overnight 14-District Rollout</strong>
                    <span>Synchronized statewide mounting in 24 hrs</span>
                  </div>
                </div>
                <div className="about-feature-pill">
                  <div className="about-feature-pill-icon"><ShieldCheck size={16} strokeWidth={2.5} /></div>
                  <div>
                    <strong>100% Legal & Wind Certified</strong>
                    <span>Full corporation permits & monsoon safety</span>
                  </div>
                </div>
                <div className="about-feature-pill">
                  <div className="about-feature-pill-icon"><Printer size={16} strokeWidth={2.5} /></div>
                  <div>
                    <strong>In-House Industrial Printing</strong>
                    <span>Star flex, vinyl & 24/7 LED illumination</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ marginTop: '26px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/portfolio" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Explore 500+ Prime Hoardings <ArrowRight size={16} />
                </Link>
                <Link href="/services" className="btn btn-outline">
                  View All Services
                </Link>
              </div>
            </div>

            <div className="stats-grid" id="stats-counter">
              <div className="stat-item">
                <AnimatedStatNumber value="27+" />
                <span className="stat-label">Years of Industry Excellence</span>
              </div>
              <div className="stat-item">
                <AnimatedStatNumber value="500+" />
                <span className="stat-label">Prime Hoarding Locations in Kerala</span>
              </div>
              <div className="stat-item">
                <AnimatedStatNumber value="1000+" />
                <span className="stat-label">Successful Brand Campaigns</span>
              </div>
              <div className="stat-item">
                <AnimatedStatNumber value="14" />
                <span className="stat-label">Districts Covered Overnight</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER MARQUEE */}
      <MarqueeLogos />

      {/* FEATURED PORTFOLIO SLIDER */}
      <PortfolioSlider />

      {/* SERVICES OVERVIEW */}
      <section className="services-overview-section" style={{ padding: '90px 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 60px' }}>
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              What We Offer
            </span>
            <h2 className="heading-lg" style={{ marginTop: '4px' }}>Comprehensive Advertising Services</h2>
            <p className="subheading">End-to-end outdoor advertising, design studio creations, and corporate events tailored for maximum audience impact.</p>
          </div>

          <div className="services-cards-grid" style={{ marginBottom: 0 }}>
            {services.map((s) => (
              <div key={s.id} className="service-card">
                <div className="service-card-icon">
                  <Monitor size={28} strokeWidth={2} />
                </div>
                <h3 className="service-card-title">{s.title}</h3>
                <p className="service-card-desc">{s.desc}</p>
                <div className="service-features-list">
                  {s.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="service-feature-item">
                      <Check size={14} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK - COMPLETE A-TO-Z TURNKEY LIFECYCLE */}
      <section className="how-we-work-section" id="how-we-work">
        <div className="container">
          <div className="how-we-work-header">
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              Complete A-to-Z Turnkey Lifecycle
            </span>
            <h2 className="heading-lg" style={{ marginTop: '4px' }}>We Plan, Host, Design, Print, Physically Place &amp; Maintain</h2>
            <p className="subheading">From initial audience demographic mapping to physical crane placement and 24/7 site maintenance across Kerala &amp; TVM</p>
          </div>

          <div className="how-we-work-grid">
            <div className="work-feature-visual">
              <img src="/image/other media3.webp" alt="Nova Innovations Hoarding Work" className="work-visual-img" />
            </div>

            <div className="work-steps-list">
              <div className="work-step-row">
                <div className="work-step-icon">
                  <Navigation size={22} strokeWidth={2} />
                </div>
                <div className="work-step-body">
                  <h4 className="work-step-title">1. Strategic Media Planning &amp; Footfall Analytics</h4>
                  <p className="work-step-desc">We map your target demographic against Kerala's busiest traffic bottlenecks, advising the highest-ROI mix of highway billboards and transit fleets.</p>
                </div>
              </div>

              <div className="work-step-row">
                <div className="work-step-icon">
                  <MapPin size={22} strokeWidth={2} />
                </div>
                <div className="work-step-body">
                  <h4 className="work-step-title">2. Space Hosting &amp; Corridor Rights</h4>
                  <p className="work-step-desc">We own and host exclusive rights to over 500+ prime highway unipoles, city gantries, and bridge displays across TVM and all 14 districts.</p>
                </div>
              </div>

              <div className="work-step-row">
                <div className="work-step-icon">
                  <Palette size={22} strokeWidth={2} />
                </div>
                <div className="work-step-body">
                  <h4 className="work-step-title">3. Creative Studio Design &amp; 3D Visual Previews</h4>
                  <p className="work-step-desc">Our design studio crafts high-recall campaign graphics and simulates 3D billboard visibility before physical production.</p>
                </div>
              </div>

              <div className="work-step-row">
                <div className="work-step-icon">
                  <Printer size={22} strokeWidth={2} />
                </div>
                <div className="work-step-body">
                  <h4 className="work-step-title">4. Industrial Large-Format Digital Printing</h4>
                  <p className="work-step-desc">In-house large-format digital solvent, eco-solvent, and star flex printing with UV-resistant coatings for lasting color brilliance.</p>
                </div>
              </div>

              <div className="work-step-row">
                <div className="work-step-icon">
                  <Zap size={22} strokeWidth={2} />
                </div>
                <div className="work-step-body">
                  <h4 className="work-step-title">5. Physical Placement &amp; Overnight Crane Mounting</h4>
                  <p className="work-step-desc">Turnkey physical placement: certified crane operators, structural riggers, and night-shift mounting crews execute simultaneous statewide deployments within 24 hours.</p>
                </div>
              </div>

              <div className="work-step-row">
                <div className="work-step-icon">
                  <ShieldCheck size={22} strokeWidth={2} />
                </div>
                <div className="work-step-body">
                  <h4 className="work-step-title">6. 24/7 Spot Illumination &amp; Structural Maintenance</h4>
                  <p className="work-step-desc">Daily night illumination inspections, storm weatherproofing, structural safety audits, and continuous vinyl cleaning throughout your campaign lifecycle.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KERALA & TRIVANDRUM BILLBOARD & HOARDING MEDIA AUTHORITY */}
      <section className="media-corridors-section" style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 50px' }}>
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              Prime Outdoor Hoardings & Billboards
            </span>
            <h2 className="heading-lg" style={{ marginTop: '6px' }}>High-Impact Billboard Corridors in Trivandrum (TVM) & Pan-Kerala</h2>
            <p className="subheading">
              Dominating over 500+ prime high-traffic hoarding sites across National Highways, airport link corridors, and bustling commercial town centers in Kerala.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            {/* TVM City Corridors */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light, #e2e8f0)', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(229, 27, 36, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E51B24' }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Trivandrum (TVM) Key Corridors</h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Capital City Media Hotspots</span>
                </div>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                Prime spot-lit hoardings located at Kazhakkoottam &amp; Technopark IT Bypass, Kowdiar Avenue, MG Road (Palayam, Statue, Overbridge), Bakery Junction, Panavila, Pettah, Vellayambalam, East Fort, Pattom, and the Vizhinjam Seaport NH 66 corridor.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                  <Check size={16} color="#E51B24" /> Technopark &amp; IT Highway Junction Displays
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                  <Check size={16} color="#E51B24" /> Kowdiar &amp; Central Trivandrum VIP Corridors
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                  <Check size={16} color="#E51B24" /> Overbridge, Statue &amp; MG Road Mega Billboards
                </li>
              </ul>
              <Link href="/services" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
                Explore TVM Billboards <ArrowRight size={16} />
              </Link>
            </div>

            {/* Pan-Kerala Highway Network */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light, #e2e8f0)', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(78, 122, 39, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4E7A27' }}>
                  <Navigation size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Pan-Kerala Highway Unipoles</h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>NH 66, NH 544 &amp; MC Road</span>
                </div>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                Heavy-traffic National Highway 66 corridor networks stretching from Trivandrum through Kollam, Alappuzha, Kochi, Thrissur, Palakkad, Kozhikode, and Kannur. Includes cantilever gantries, bridge hoardings, and toll plaza media.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                  <Check size={16} color="#4E7A27" /> 40x20 &amp; 60x20 FT High-Rise Highway Unipoles
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                  <Check size={16} color="#4E7A27" /> Illuminated Cantilever Road Gantries
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                  <Check size={16} color="#4E7A27" /> 100% Municipal Approved Structural Media
                </li>
              </ul>
              <Link href="/services" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
                View Highway Unipoles <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VEHICLE & TRANSIT ADVERTISING AUTHORITY */}
      <section className="transit-advertising-section" style={{ padding: '80px 0', background: 'var(--bg-secondary, #f8fafc)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
                Mobile Advertising on Wheels
              </span>
              <h2 className="heading-lg" style={{ marginTop: '6px' }}>KSRTC Bus Branding &amp; Commercial Vehicle Fleet Advertising</h2>
              <p className="about-paragraph" style={{ marginTop: '14px' }}>
                Turn Kerala's roadways into your primary customer acquisition channel. As an authorized transit advertising specialist, Nova Innovations provides complete bus wraps and vehicle branding across all 14 districts in Kerala.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', margin: '24px 0' }}>
                <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 6px 0', color: '#E51B24' }}>KSRTC Full &amp; Side Wraps</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>Super Fast, Fast Passenger &amp; City Circular buses with high statewide daily ridership.</p>
                </div>
                <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 6px 0', color: '#E51B24' }}>Auto-Rickshaw Hoods</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>Hyper-local town center penetration across Trivandrum, Kochi, and all urban hubs.</p>
                </div>
                <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 6px 0', color: '#E51B24' }}>Mobile LED Sound Vans</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>Digital mobile billboard trucks with surround sound for rallies, product launches &amp; roadshows.</p>
                </div>
                <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 6px 0', color: '#E51B24' }}>Commercial Fleets</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>Vinyl wraps for delivery trucks, vans, and distributor vehicle fleets.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/services" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Bus size={18} /> Book Transit Campaign
                </Link>
                <a href="tel:+919539000640" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} /> Inquire Bus Rates
                </a>
              </div>
            </div>

            <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 35px rgba(0,0,0,0.1)' }}>
              <img
                src="/image/myG Bus Campaign.webp"
                alt="Nova Innovations KSRTC Bus Branding Campaign"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.src = '/image/branding bus.webp'; }}
              />
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', padding: '14px 18px', borderRadius: '12px', color: '#ffffff' }}>
                <div style={{ fontSize: '0.78rem', color: '#e02b20', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Real Execution Spotlight</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>myG Statewide Bus Fleet Campaign</div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>14 Districts Pan-Kerala • Executed by Nova Innovations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ) & AEO ENGINE */}
      <section className="faq-section" id="faq" style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
        <div className="container" style={{ maxWidth: '920px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              Frequently Asked Questions
            </span>
            <h2 className="heading-lg" style={{ marginTop: '6px' }}>Everything You Need to Know About Outdoor Advertising in Kerala &amp; TVM</h2>
            <p className="subheading">
              Key insights into billboard booking, KSRTC bus fleet wraps, overnight mounting timelines, and hoarding availability across Kerala.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border-light, #e2e8f0)',
                  borderRadius: '14px',
                  background: 'var(--bg-card, #ffffff)',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '1.02rem',
                    color: openFaqIndex === idx ? 'var(--brand-red)' : 'var(--text-primary)',
                  }}
                  aria-expanded={openFaqIndex === idx}
                >
                  <span>{item.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp size={20} style={{ color: 'var(--brand-red)', flexShrink: 0 }} />
                  ) : (
                    <ChevronDown size={20} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div style={{ padding: '0 24px 22px', color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.65 }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Schema for Google SERP & AI Engine Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a,
                },
              })),
            }),
          }}
        />
      </section>

      {/* LEADERSHIP SECTION */}
      <LeadershipSection />

      {/* CTA BANNER */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <h3 className="cta-banner-title">Ready to Hallmark Your Brand into Customers' Minds?</h3>
              <p className="cta-banner-subtitle">Get in touch today for prime vacant hoardings, statewide bus branding, and custom advertising packages across Kerala.</p>
            </div>
            <div className="cta-actions">
              <a href="tel:+919539000640" className="btn-pill-white">Call: 9539000640</a>
              <Link href="/contact" className="btn-pill-dark" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                Contact Offices
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
