'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function BudgetCalculator({ onOpenModal }) {
  const [ratePerSqft, setRatePerSqft] = useState(45);
  const [area, setArea] = useState(600);

  const totalEstimate = Math.round(area * ratePerSqft);

  return (
    <div className="calculator-card" id="estimator">
      <div className="calc-grid">
        <div>
          <h2 className="heading-md" style={{ marginBottom: '12px' }}>Hoarding Campaign Budget Estimator</h2>
          <p className="subheading" style={{ marginBottom: '24px' }}>Estimate your outdoor media campaign based on media type and display square footage across Kerala.</p>

          <div className="form-group">
            <label className="form-label" htmlFor="calc-type">Advertising Media Type</label>
            <select
              id="calc-type"
              className="form-select"
              value={ratePerSqft}
              onChange={(e) => setRatePerSqft(parseFloat(e.target.value))}
            >
              <option value="45">Prime Highway Hoarding (Illuminated Unipole)</option>
              <option value="35">City Center Gantry / Billboard</option>
              <option value="25">Transit Bus Fleet Wrap / KSRTC</option>
              <option value="20">Retail Shop Facade & Signboard</option>
              <option value="12">Commercial Wall Painting Mural</option>
            </select>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label className="form-label" htmlFor="calc-area" style={{ marginBottom: 0 }}>Display Size (Square Feet)</label>
              <span id="calc-area-val" style={{ fontWeight: 700, color: '#11141a' }}>{area} sq.ft</span>
            </div>
            <input
              type="range"
              id="calc-area"
              min="100"
              max="2500"
              step="50"
              value={area}
              onChange={(e) => setArea(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--brand-red)', cursor: 'pointer' }}
            />
          </div>
        </div>

        <div className="calc-result-box">
          <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>
            Estimated Campaign Package
          </span>
          <div className="calc-result-price" id="calc-total-result">
            ₹{totalEstimate.toLocaleString('en-IN')}
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '20px' }}>
            *Includes high-definition flex printing, mounting, illumination, and routine structural inspection.
          </p>
          <button
            type="button"
            className="btn-pill-white open-modal-btn"
            onClick={() => onOpenModal('Hoarding Campaign Estimation')}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            Book This Campaign Size <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
