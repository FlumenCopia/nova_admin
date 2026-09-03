'use client';

export default function Toast({ message, isVisible }) {
  return (
    <div className={`toast-box ${isVisible ? 'show' : ''}`} id="toast-notification">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span id="toast-message">{message || 'Your campaign inquiry has been submitted successfully!'}</span>
    </div>
  );
}
