import { ArrowRight, RefreshCw } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '14px 32px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
      }}
      className="animate-in animate-delay-6"
    >
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          color: 'var(--color-navy)',
          fontWeight: 500,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          padding: 0,
          transition: 'color 0.15s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--color-navy)'}
      >
        Vragen over dit rapport? Neem contact op
        <ArrowRight size={13} />
      </button>

      <div className="flex items-center gap-2" style={{ color: 'var(--color-muted)', fontSize: 12 }}>
        <RefreshCw size={12} />
        Dit rapport wordt automatisch bijgewerkt.
      </div>
    </footer>
  );
}
