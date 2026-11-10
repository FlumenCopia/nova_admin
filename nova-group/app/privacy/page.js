import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | NOVA Innovations',
  description: 'Privacy Policy for NOVA Innovations — Kerala outdoor advertising, hoardings, transit vehicle branding, and design studio services.',
};

export default function PrivacyPage() {
  return (
    <section className="page-hero" style={{ paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <nav className="breadcrumbs" style={{ marginBottom: '20px' }}>
          <Link href="/">Home</Link>
          <span>/</span>
          <span className="current">Privacy Policy</span>
        </nav>

        <h1 className="heading-lg" style={{ marginBottom: '20px' }}>
          Privacy <span>Policy</span>
        </h1>
        <p className="subheading" style={{ marginBottom: '40px' }}>
          Last Updated: November 2026 • Nova Innovations (Trivandrum, Kerala)
        </p>

        <div
          style={{
            background: 'var(--color-surface, #121824)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '36px',
            lineHeight: '1.8',
            color: 'var(--text-muted, #94a3b8)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <section>
            <h2 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '10px' }}>1. Introduction</h2>
            <p>
              NOVA Innovations (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates novainnovations.in. We respect your privacy and are committed to protecting personal information provided by clients, partners, and visitors when submitting inquiries for outdoor hoardings, bus fleet branding, retail facades, or studio design services across Kerala.
            </p>
          </section>

          <section>
            <h2 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '10px' }}>2. Information We Collect</h2>
            <p>
              When you submit a consultation brief, request a rate card, or request a call back via our forms, we may collect:
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
              <li>Full Name and Company / Brand Name</li>
              <li>Contact Phone Number and Email Address</li>
              <li>Requested advertising medium (e.g. Highway Hoardings, KSRTC Bus wraps, Shop branding)</li>
              <li>Target districts in Kerala and estimated campaign timeline</li>
            </ul>
          </section>

          <section>
            <h2 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '10px' }}>3. How We Use Your Data</h2>
            <p>
              Information collected is used solely to:
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
              <li>Provide accurate billboard site availability lists, location geo-maps, and cost quotations.</li>
              <li>Contact you via phone or WhatsApp regarding your advertising campaigns.</li>
              <li>Comply with municipal and advertising regulations within Kerala state boundaries.</li>
            </ul>
            <p style={{ marginTop: '10px' }}>
              We do <strong>not</strong> sell, rent, or lease your commercial or contact information to third-party telemarketers or external data brokers.
            </p>
          </section>

          <section>
            <h2 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '10px' }}>4. Data Security</h2>
            <p>
              All inquiry transmissions are protected through SSL/TLS encryption. Admin dashboard access is restricted to authorized Nova Innovations campaign managers through cryptographically hashed credentials and rate-limited endpoints.
            </p>
          </section>

          <section>
            <h2 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '10px' }}>5. Contact Us Regarding Your Privacy</h2>
            <p>
              If you have any questions or wish to request data deletion, contact our media operations desk at:
            </p>
            <p style={{ marginTop: '8px', color: '#ffffff' }}>
              <strong>NOVA Innovations</strong><br />
              T.C. 29/314, S J Tower, M P Appan Road, Vazhuthacaud - Poojappura Rd, Thycaud, Thiruvananthapuram, Kerala - 695014<br />
              Phone: +91 95390 00640 / +91 95263 64446<br />
              Email: novainnovations2020@gmail.com
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
