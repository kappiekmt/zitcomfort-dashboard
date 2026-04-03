import { useState } from 'react';
import { RefreshCw, Download, Clock } from 'lucide-react';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Goedemorgen';
  if (h < 18) return 'Goedemiddag';
  return 'Goedenavond';
}

function getDutchMonth() {
  const months = [
    'januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december',
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
      style={{
        background: '#fff',
        borderBottom: '1px solid var(--color-border)',
        padding: '20px 32px',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
      className="animate-in animate-delay-0"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left — greeting + title */}
        <div>
          <p style={{ color: 'var(--color-muted)', fontSize: 13, marginBottom: 2 }}>
            {getGreeting()}, Zitcomfort 👋
          </p>
          <h1
            className="font-display"
            style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.2 }}
          >
            Marketing Insights Dashboard
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: 13, marginTop: 3 }}>
            Zitcomfort · Prestatierapport — {getDutchMonth()}
          </p>
        </div>

        {/* Right — controls */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Period toggle */}
          <div
            style={{
              display: 'flex',
              background: '#f3f4f6',
              borderRadius: 8,
              padding: 3,
            }}
          >
            {['Week', 'Maand'].map((p) => (
              <button
                key={p}
                onClick={() => onPeriodChange(p)}
                style={{
                  padding: '5px 14px',
                  borderRadius: 6,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: 'inherit',
                  transition: 'all 0.15s ease',
                  background: period === p ? '#fff' : 'transparent',
                  color: period === p ? 'var(--color-navy)' : 'var(--color-muted)',
                  boxShadow: period === p ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Last updated */}
          <div
            className="flex items-center gap-1.5"
            style={{ color: 'var(--color-muted)', fontSize: 12 }}
          >
            <Clock size={13} />
            <span>Laatst bijgewerkt: {formatTime(lastUpdated)}</span>
          </div>

          {/* Refresh */}
          <button
            onClick={onRefetch}
            disabled={isLoading}
            title="Vernieuwen"
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              background: '#fff',
              cursor: isLoading ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-muted)',
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
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '7px 16px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--color-navy)',
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#252b5e'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--color-navy)'}
          >
            <Download size={13} />
            Exporteren
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: '#111827',
            color: '#fff',
            padding: '10px 18px',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 500,
            zIndex: 100,
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            animation: 'fadeInUp 0.3s ease',
          }}
        >
          Exportfunctie komt binnenkort beschikbaar
        </div>
      )}
    </header>
  );
}
