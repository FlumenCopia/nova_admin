import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | NOVA Innovations',
  description: 'Terms and Conditions for outdoor advertising campaigns, hoarding allocations, transit fleet branding, and design executions by NOVA Innovations Kerala.',
};

export default function TermsPage() {
  return (
    <section className="page-hero" style={{ paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <nav className="breadcrumbs" style={{ marginBottom: '20px' }}>
          <Link href="/">Home</Link>
          <span>/</span>
          <span className="current">Terms & Conditions</span>
        </nav>

        <h1 className="heading-lg" style={{ marginBottom: '20px' }}>
          Terms & <span>Conditions</span>
        </h1>
        <p className="subheading" style={{ marginBottom: '40px' }}>
          Outdoor Advertising Campaign Guidelines & Client Service Agreement • Nova Innovations
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
            <h2 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '10px' }}>1. Site Availability & Bookings</h2>
            <p>
              Hoarding locations, prime bypass unipoles, and transit bus slots displayed on this website are subject to prior booking and availability confirmation. A site reservation is considered finalized only upon written approval of the media estimate and receipt of advance payment.
            </p>
          </section>

          <section>
            <h2 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '10px' }}>2. Creative Approvals & Content Standards</h2>
            <p>
              Clients must provide creative artwork compliant with Kerala state outdoor advertising guidelines, local municipal corporation norms, and the Advertising Standards Council of India (ASCI). NOVA Innovations reserves the right to decline material that breaches statutory regulations or municipal safety codes.
            </p>
          </section>

          <section>
            <h2 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '10px' }}>3. Fabrication, Mounting & Maintenance</h2>
            <p>
              All hoardings and unipoles undergo routine structural inspection and storm safety checks. In the event of severe weather damage or natural wear, our ground field operations team initiates restoration and re-mounting within 24 to 48 business hours.
            </p>
          </section>

          <section>
            <h2 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '10px' }}>4. Proof of Performance & Geo-tagged Monitoring</h2>
            <p>
              Comprehensive day and night high-definition monitoring photographs with date and timestamp verification are provided to the client within 48 hours of campaign mounting completion.
            </p>
          </section>

          <section>
            <h2 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '10px' }}>5. Payment & Invoicing</h2>
            <p>
              Invoices are issued in accordance with GST regulations. Payment terms are specified within individual campaign agreements. GST and applicable municipal advertisement taxes are invoiced as per statutory mandates.
            </p>
          </section>

          <section>
            <h2 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '10px' }}>6. Contact & Arbitration</h2>
            <p>
              Any inquiries regarding campaign execution or commercial contracts should be directed to:
            </p>
            <p style={{ marginTop: '8px', color: '#ffffff' }}>
              <strong>NOVA Innovations Legal & Media Relations</strong><br />
              T.C. 29/314, S J Tower, M P Appan Road, Vazhuthacaud - Poojappura Rd, Thycaud, Thiruvananthapuram, Kerala - 695014<br />
              Phone: +91 95390 00640<br />
              Email: novainnovations2020@gmail.com
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
