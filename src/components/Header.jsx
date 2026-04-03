import { useState } from 'react';
import { RefreshCw, Download } from 'lucide-react';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Goedemorgen';
  if (h < 18) return 'Goedemiddag';
  return 'Goedenavond';
}

function getDutchMonth() {
  const months = [
    'januari','februari','maart','april','mei','juni',
    'juli','augustus','september','oktober','november','december',
  ];
  const d = new Date();
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

function formatTime(date) {
  if (!date) return '—';
  return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
}

export default function Header({ lastUpdated, onRefetch, isLoading, period, onPeriodChange }) {
  const [toast, setToast] = useState(false);

  function handleExport() {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }

  return (
    <header
      className="animate-in animate-delay-0"
      style={{
        background: '#fff',
        borderBottom: '1px solid #f0f0ef',
        padding: '24px 32px 20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        {/* Left */}
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111827', lineHeight: 1.15, marginBottom: 4 }}>
            {getGreeting()}, Zitcomfort 👋
          </h1>
          <p style={{ color: '#9ca3af', fontSize: 13 }}>
            Prestatierapport — {getDutchMonth()}
          </p>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {/* Last updated */}
          <span style={{ fontSize: 12, color: '#9ca3af' }}>
            Bijgewerkt: {formatTime(lastUpdated)}
          </span>

          {/* Period toggle — 7D / 30D style */}
          <div style={{ display: 'flex', gap: 4 }}>
            {['Week', 'Maand'].map((p) => (
              <button
                key={p}
                onClick={() => onPeriodChange(p)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 7,
                  border: '1px solid',
                  borderColor: period === p ? '#1a1f4b' : '#e5e7eb',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: period === p ? 600 : 400,
                  fontFamily: 'inherit',
                  transition: 'all 0.15s ease',
                  background: period === p ? '#1a1f4b' : '#fff',
                  color: period === p ? '#fff' : '#6b7280',
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Refresh */}
          <button
            onClick={onRefetch}
            disabled={isLoading}
            title="Vernieuwen"
            style={{
              width: 34, height: 34,
              borderRadius: 7,
              border: '1px solid #e5e7eb',
              background: '#fff',
              cursor: isLoading ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#6b7280',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = '#f9fafb'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
          </button>

          {/* Export */}
          <button
            onClick={handleExport}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 16px',
              borderRadius: 7,
              border: 'none',
              background: '#1a1f4b',
              color: '#fff',
              fontSize: 12, fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#252b5e'}
            onMouseLeave={e => e.currentTarget.style.background = '#1a1f4b'}
          >
            <Download size={13} />
            Exporteren
          </button>
        </div>
      </div>

      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24,
          background: '#111827', color: '#fff',
          padding: '10px 18px', borderRadius: 9,
          fontSize: 13, fontWeight: 500, zIndex: 100,
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          animation: 'fadeInUp 0.3s ease',
        }}>
          Exportfunctie komt binnenkort beschikbaar
        </div>
      )}
    </header>
  );
}
