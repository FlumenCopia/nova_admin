'use client';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  service,
  onSubmit,
}: BookingModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay open"
      id="contact-modal"
      style={{ display: 'flex' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-header">
          <div className="modal-icon">
            <i className="fa-solid fa-bullhorn"></i>
          </div>
          <h3 className="modal-title">Book Hoardings &amp; Campaign Inquiry</h3>
          <p className="modal-sub">Inquire directly with Gireesh Kumar S (Director / CEO) &amp; media planning team.</p>
        </div>

        <form className="modal-form" id="contact-form" onSubmit={onSubmit}>
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
            <select id="form-service" defaultValue={service}>
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
  );
}

