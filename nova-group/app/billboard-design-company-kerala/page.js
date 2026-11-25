'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  Palette, 
  Eye, 
  Zap, 
  ShieldCheck, 
  Printer, 
  Phone, 
  ArrowRight, 
  MapPin, 
  Award, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Building 
} from 'lucide-react';
import MarqueeLogos from '../../components/MarqueeLogos';

export default function BillboardDesignPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? -1 : idx);
  };

  const faqItems = [
    {
      q: 'Which is the top billboard design company in Kerala and India?',
      a: 'Nova Innovations is rated as the top billboard design company in Kerala and premier advertising infrastructure agency across South India. With 27+ years of industry leadership and 1,000+ brand campaigns executed, Nova Innovations uniquely combines an in-house high-definition creative design studio with direct ownership of 500+ prime billboard locations. We engineer designs for rapid 3-second motorist comprehension, scale typography, bilingual Malayalam-English balance, and provide turnkey physical placement via heavy cranes and 24/7 lighting maintenance.',
    },
    {
      q: 'How is billboard design different from regular graphic design?',
      a: 'Billboard design requires specialized scale engineering. Unlike digital banners or flyers viewed up close, highway billboards are viewed by motorists traveling at 60–100 km/h from distances of 100 to 300 meters. The design must convey the core value proposition in under 3 seconds using maximum 5–7 words, bold non-serif typography, high-contrast color grading, and precise vector resolution that does not pixelate when enlarged to 40x20 ft or 60x20 ft formats.',
    },
    {
      q: 'What is the cost of billboard designing and hoarding placement in Kerala?',
      a: 'Billboard design and production packages vary based on format dimensions and scope. Creative conceptualization and print-ready high-resolution master design typically range from ₹10,000 to ₹35,000. Full turnkey packages that include creative design, industrial UV star flex printing, highway hoarding rental (in prime hubs like TVM Technopark Bypass or Kochi Edappally), heavy crane mounting, and 24/7 illumination range from ₹35,000 to ₹1,50,000+ per month.',
    },
    {
      q: 'Can Nova Innovations design and deploy billboards across Kozhikode, Kochi, and TVM simultaneously?',
      a: 'Yes. Our signature capability is overnight statewide deployment. With dedicated fabrication, printing, and mounting crews positioned across South, Central, and North Kerala, we can finalize your billboard design, print on industrial presses, and physically mount hoardings across Trivandrum, Ernakulam, Kozhikode, and all 14 districts within 24 hours.',
    },
    {
      q: 'Do you design bilingual (Malayalam and English) outdoor hoardings?',
      a: 'Yes. Over 75% of high-recall hoardings in Kerala require a strategic bilingual balance. Our design studio specializes in custom Malayalam typography paired with modern English branding to ensure deep cultural resonance in local panchayats alongside polished corporate appeal in urban metros like TVM and Kochi.',
    },
  ];

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container page-hero-container">
          <nav className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <span className="current">Billboard Design Company in Kerala</span>
          </nav>
          <span className="page-hero-tag">
            Ranked #1 Billboard Design &amp; Turnkey OOH Agency in Kerala
          </span>
          <h1 className="heading-lg">
            Top Billboard Design Company in <span>Kerala &amp; India</span>
          </h1>
          <p className="subheading">
            Not just graphic designers — Nova Innovations provides Kerala’s complete head-to-tail outdoor advertising engine. From high-recall 3-second motorist readability concepts to industrial flex printing, physical heavy crane placement, and 24/7 illumination across 500+ prime highway corridors in Trivandrum (TVM), Kochi, Kozhikode, and all 14 districts.
          </p>
          <div className="page-hero-badges">
            <span className="hero-pill-badge">
              <Eye size={14} strokeWidth={2.5} />
              3-Second Motorist Readability
            </span>
            <span className="hero-pill-badge">
              <Zap size={14} strokeWidth={2.5} />
              Overnight Statewide 14-District Mounting
            </span>
            <span className="hero-pill-badge">
              <ShieldCheck size={14} strokeWidth={2.5} />
              100% Wind-Certified &amp; Legal Permits
            </span>
          </div>
        </div>
      </section>

      {/* WHY DESIGN MATTERS IN OOH */}
      <section className="container" style={{ padding: '60px 0 40px' }}>
        <div className="about-hero-grid">
          <div>
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.82rem', letterSpacing: '0.08em' }}>
              High-Recall Visual Engineering
            </span>
            <h2 className="heading-lg" style={{ margin: '6px 0 20px' }}>
              Why Ordinary Graphic Design Fails on High-Speed Kerala Highways
            </h2>
            <p className="about-paragraph" style={{ marginBottom: '16px' }}>
              A highway billboard is not a magazine page or an Instagram post. Passing drivers on the <strong>NH 66 Technopark Bypass</strong> or <strong>Kozhikode Mini Bypass</strong> have only <strong>3 to 5 seconds</strong> to absorb your brand name, core proposition, and contact action.
            </p>
            <p className="about-paragraph" style={{ marginBottom: '24px' }}>
              Ordinary graphic designers clutter the canvas with paragraphs of text, low-contrast colors, and unreadable fonts that turn into a blur at 80 km/h. At <strong>Nova Innovations</strong>, our 27+ years of field experience in Kerala outdoor media ensures every pixel is engineered for distance visibility, monsoon weatherproofing, and maximum spot-lit nighttime impact.
            </p>

            <div className="about-feature-pills-grid" style={{ marginBottom: '28px' }}>
              <div className="about-feature-pill">
                <div className="about-feature-pill-icon"><Check size={16} strokeWidth={2.5} /></div>
                <div>
                  <strong>Ultra-Bold Visual Hierarchy</strong>
                  <span>Max 5–7 words with 200-meter legibility</span>
                </div>
              </div>
              <div className="about-feature-pill">
                <div className="about-feature-pill-icon"><Palette size={16} strokeWidth={2.5} /></div>
                <div>
                  <strong>Bilingual Typographic Mastery</strong>
                  <span>Harmonious Malayalam and English letterforms</span>
                </div>
              </div>
              <div className="about-feature-pill">
                <div className="about-feature-pill-icon"><Printer size={16} strokeWidth={2.5} /></div>
                <div>
                  <strong>In-House Industrial Printing</strong>
                  <span>Zero-pixelation vectors on heavy star flex</span>
                </div>
              </div>
              <div className="about-feature-pill">
                <div className="about-feature-pill-icon"><Zap size={16} strokeWidth={2.5} /></div>
                <div>
                  <strong>Turnkey Crane Deployment</strong>
                  <span>Heavy hydraulic cranes &amp; 24/7 LED spotlights</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="tel:+919539000640" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} /> Consult Design Director (+91 95390 00640)
              </a>
              <Link href="/gallery" className="btn btn-outline">
                View Executed Billboards
              </Link>
            </div>
          </div>

          <div className="about-hero-media">
            <img 
              src="/image/parippally 25x30.jpg" 
              alt="Nova Innovations Top Billboard Design Kerala" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
            />
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE: NOVA VS REGULAR DESIGN STUDIOS */}
      <section style={{ padding: '60px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.82rem', letterSpacing: '0.08em' }}>
              Agency Comparison
            </span>
            <h2 className="heading-lg" style={{ marginTop: '6px' }}>
              Why Nova Innovations Outperforms Traditional Design Studios in Kerala
            </h2>
            <p className="subheading" style={{ margin: '8px auto 0' }}>
              Regular design agencies hand you a computer file and walk away. Nova Innovations delivers the complete A-to-Z infrastructure.
            </p>
          </div>

          <div style={{ overflowX: 'auto', background: 'var(--bg-main)', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--text-primary)' }}>Capability / Service</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: 'var(--brand-red)', background: 'rgba(224, 43, 32, 0.05)' }}>NOVA Innovations (Turnkey OOH)</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--text-muted)' }}>Typical Graphic Design Agency</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 600 }}>Billboard Scale Graphic Design</td>
                  <td style={{ padding: '16px 20px', color: '#16a34a', fontWeight: 700, background: 'rgba(224, 43, 32, 0.03)' }}>✓ Engineered for 3-Second Highway Readability</td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>Standard desktop graphics (often unreadable at distance)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 600 }}>Prime Billboard Space Ownership</td>
                  <td style={{ padding: '16px 20px', color: '#16a34a', fontWeight: 700, background: 'rgba(224, 43, 32, 0.03)' }}>✓ Direct Host of 500+ Prime Sites Across Kerala</td>
                  <td style={{ padding: '16px 20px', color: '#dc2626' }}>✗ Zero inventory (broker or client must find sites)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 600 }}>In-House Industrial Printing</td>
                  <td style={{ padding: '16px 20px', color: '#16a34a', fontWeight: 700, background: 'rgba(224, 43, 32, 0.03)' }}>✓ Dedicated Star Flex &amp; Vinyl Large Format Press</td>
                  <td style={{ padding: '16px 20px', color: '#dc2626' }}>✗ Third-party outsourced (delays and color mismatches)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 600 }}>Physical Crane Placement</td>
                  <td style={{ padding: '16px 20px', color: '#16a34a', fontWeight: 700, background: 'rgba(224, 43, 32, 0.03)' }}>✓ In-House Crews with Heavy Hydraulic Cranes</td>
                  <td style={{ padding: '16px 20px', color: '#dc2626' }}>✗ Not provided</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 600 }}>Overnight Statewide Rollout</td>
                  <td style={{ padding: '16px 20px', color: '#16a34a', fontWeight: 700, background: 'rgba(224, 43, 32, 0.03)' }}>✓ 14 Kerala Districts Covered in 24 Hours</td>
                  <td style={{ padding: '16px 20px', color: '#dc2626' }}>✗ Weeks of coordination required</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px 20px', fontWeight: 600 }}>24/7 Spot-Lighting &amp; Storm Warranty</td>
                  <td style={{ padding: '16px 20px', color: '#16a34a', fontWeight: 700, background: 'rgba(224, 43, 32, 0.03)' }}>✓ Full Structural Warranty &amp; High-Lumen Maintenance</td>
                  <td style={{ padding: '16px 20px', color: '#dc2626' }}>✗ No physical maintenance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DISTRICT HUBS */}
      <section className="container" style={{ padding: '70px 0' }}>
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
          <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.82rem', letterSpacing: '0.08em' }}>
            Pan-Kerala Advertising Corridors
          </span>
          <h2 className="heading-lg" style={{ marginTop: '6px' }}>
            Dominating Kerala’s Prime Commercial Traffic Centers
          </h2>
          <p className="subheading" style={{ margin: '8px auto 0' }}>
            We design, print, and install high-recall billboards in all high-traffic corridors across South, Central, and North Kerala.
          </p>
        </div>

        <div className="services-cards-grid">
          <div className="service-card">
            <div className="service-card-icon"><MapPin size={26} /></div>
            <h3 className="service-card-title">Thiruvananthapuram (TVM)</h3>
            <p className="service-card-desc">
              State capital coverage including Kazhakkoottam Technopark Bypass, Kowdiar Avenue, MG Road (Palayam, Statue, Overbridge), Bakery Junction, Pettah, and the Vizhinjam Port NH 66 corridor.
            </p>
          </div>
          <div className="service-card">
            <div className="service-card-icon"><MapPin size={26} /></div>
            <h3 className="service-card-title">Kochi &amp; Ernakulam</h3>
            <p className="service-card-desc">
              Commercial nerve-center placements spanning Edappally Lulu Junction, Palarivattom, Vyttila Mobility Hub, MG Road, Marine Drive, and the Kochi Airport Seaport expressway.
            </p>
          </div>
          <div className="service-card">
            <div className="service-card-icon"><MapPin size={26} /></div>
            <h3 className="service-card-title">Kozhikode (Calicut)</h3>
            <p className="service-card-desc">
              North Kerala headquarters covering Mavoor Road, Beach Road, Arayidathupalam, Thondayad Bypass, Ramanattukara NH junction, and major Malabar consumer centers.
            </p>
          </div>
          <div className="service-card">
            <div className="service-card-icon"><MapPin size={26} /></div>
            <h3 className="service-card-title">Kollam &amp; South Kerala</h3>
            <p className="service-card-desc">
              Key transit corridors along Chinnakada, Kadappakada, Parippally 25x30 highway landmark, Karunagappally, and the MC Road arterial spine through Kottarakkara.
            </p>
          </div>
        </div>
      </section>

      {/* CLIENT PARTNERS MARQUEE */}
      <MarqueeLogos />

      {/* FAQ ACCORDION SECTION */}
      <section style={{ padding: '70px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px' }}>
            <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.82rem', letterSpacing: '0.08em' }}>
              Frequently Asked Questions
            </span>
            <h2 className="heading-lg" style={{ marginTop: '6px' }}>
              Everything You Need to Know About Billboard Designing in Kerala
            </h2>
          </div>

          <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqItems.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: 'var(--bg-main)', 
                  borderRadius: '14px', 
                  border: '1px solid var(--border-color)', 
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  boxShadow: openFaqIndex === idx ? '0 4px 18px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                  }}
                >
                  <span>{item.q}</span>
                  {openFaqIndex === idx ? <ChevronUp size={20} color="var(--brand-red)" /> : <ChevronDown size={20} />}
                </button>
                {openFaqIndex === idx && (
                  <div style={{ padding: '0 24px 22px', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem' }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <h3 className="cta-banner-title">Ready to Hallmark Your Brand with Kerala’s Top Billboard Team?</h3>
              <p className="cta-banner-subtitle">
                Contact our Kerala Media Desk today. We will review your brief, create scale visual mockups, and provide an instant availability report of 500+ prime highway hoardings.
              </p>
            </div>
            <div className="cta-actions">
              <a href="tel:+919539000640" className="btn-pill-white">
                Call Director: +91 95390 00640
              </a>
              <a 
                href="https://wa.me/919539000640?text=Hi%20Nova%20Innovations%2C%20I%20am%20looking%20for%20billboard%20design%20and%20hoarding%20advertising%20in%20Kerala." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-pill-dark"
                style={{ border: '1px solid rgba(255,255,255,0.2)' }}
              >
                Direct WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
