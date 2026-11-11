'use client';

interface ContactProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Contact({ onSubmit }: ContactProps) {
  return (
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
        {/* Left Column: Official Contact Info Cards */}
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

        {/* Right Column: Interactive Booking Form */}
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

            <form className="section-contact-form" id="page-contact-form" onSubmit={onSubmit}>
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
  );
}

