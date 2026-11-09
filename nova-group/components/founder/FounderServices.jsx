'use client';

const defaultServices = [
  {
    icon: 'fa-rectangle-ad',
    title: 'Innovative Hoardings',
    desc: 'High-visibility billboards, unipoles, gantries, and cantilever structures in prime city junctions and national highways across Kerala.',
    tags: ['Prime footfall locations', 'Weatherproof flex & LED lights'],
    btnText: 'Inquire Hoardings',
    serviceKey: 'Outdoor Hoardings',
  },
  {
    icon: 'fa-bus',
    title: 'Vehicle Advertising',
    desc: 'Time-bound mobile advertising fleet services including KSRTC buses, private transit branding, and promotional display vans.',
    tags: ['High city-wide reach & mobility', 'Full body wrap & side panels'],
    btnText: 'Inquire Transit',
    serviceKey: 'Vehicle Advertising',
  },
  {
    icon: 'fa-store',
    title: 'Shop & Retail Branding',
    desc: 'Complete store exterior & interior transformations: 3D illuminated signboards, LED glow boards, ACP signboards, and retail display units.',
    tags: ['LED glow & ACP signboards', 'Showroom facade design'],
    btnText: 'Inquire Retail',
    serviceKey: 'Shop & Retail Branding',
  },
  {
    icon: 'fa-champagne-glasses',
    title: 'Event Branding & Stalls',
    desc: 'Capturing the essence of your brand in corporate events, exhibition stalls, stage backdrops, kiosks, and product launch productions.',
    tags: ['Custom stall fabrication', 'Turnkey event management'],
    btnText: 'Inquire Events',
    serviceKey: 'Event Branding',
  },
  {
    icon: 'fa-paintbrush',
    title: 'Commercial Wall Paintings',
    desc: 'Long-lasting direct wall artworks and branding murals executed with durable weather-resistant paint on prominent roadsides and town walls.',
    tags: ['Long-term brand retention', 'Rural & urban highway routes'],
    btnText: 'Inquire Wall Murals',
    serviceKey: 'Commercial Wall Paintings',
  },
  {
    icon: 'fa-pen-ruler',
    title: 'Design Studio & Printing',
    desc: 'State-of-the-art flex digital printing, large format banners, offset catalogs, brochures, bulk posters, and corporate stationery.',
    tags: ['High-definition printing machinery', 'Creative branding agency support'],
    btnText: 'Inquire Design',
    serviceKey: 'Design Studio',
  },
];

export default function FounderServices({ onOpenModal }) {
  return (
    <section className="features-wrapper-section rounded-container-light" id="services">
      <div className="container-top-notch">
        <span className="notch-dash"></span>
      </div>

      <div className="section-header-left">
        <span className="about-subhead" id="services-subhead">WHAT WE OFFER</span>
        <h2 className="section-heading-sm" id="services-heading">Comprehensive Advertising Services</h2>
        <p className="section-desc-left" id="services-desc">
          End-to-end outdoor advertising, design studio creations, transit branding, and corporate events across Kerala.
        </p>
      </div>

      <div className="services-cards-grid" id="services-cards-container">
        {defaultServices.map((srv, idx) => (
          <div key={idx} className="service-squircle-card">
            <div className="service-icon-box">
              <i className={`fa-solid ${srv.icon}`}></i>
            </div>
            <h3 className="service-title">{srv.title}</h3>
            <p className="service-desc">{srv.desc}</p>
            <div className="service-tags-list">
              {srv.tags.map((tag, tIdx) => (
                <span key={tIdx} className="service-tag-item">
                  <i className="fa-solid fa-check" style={{ marginRight: '6px', color: '#16a34a' }}></i> {tag}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="service-card-btn"
              onClick={() => onOpenModal && onOpenModal(srv.serviceKey)}
            >
              <span>{srv.btnText}</span> <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
