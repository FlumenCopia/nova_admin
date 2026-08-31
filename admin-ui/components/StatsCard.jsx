'use client';

export default function StatsCard({ title, value, subtitle, icon, highlightColor = 'var(--brand-red)' }) {
  return (
    <div className="stat-card">
      <div>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{title}</span>
        <div className="stat-val">{value}</div>
        {subtitle && <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{subtitle}</span>}
      </div>
      {icon && (
        <div
          style={{
            background: `${highlightColor}20`,
            color: highlightColor,
            padding: '14px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </div>
      )}
    </div>
  );
}
