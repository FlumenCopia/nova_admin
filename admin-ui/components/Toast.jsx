'use client';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  return (
    <div className="toast-container">
      <div
        className="toast"
        style={{
          borderLeftColor: type === 'error' ? '#ef4444' : '#22c55e',
        }}
      >
        <span>{message}</span>
        {onClose && (
          <button onClick={onClose} style={{ color: 'var(--text-muted)', marginLeft: '12px' }}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
