import {
  LayoutDashboard,
  BarChart2,
  FileText,
  Image,
  Target,
  Lock,
  HeadphonesIcon,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true, locked: false },
  { icon: BarChart2, label: 'Campagne Details', active: false, locked: true },
  { icon: FileText, label: 'Maandrapport', active: false, locked: true },
  { icon: Image, label: 'Advertentie Overzicht', active: false, locked: true },
  { icon: Target, label: 'Doelen & KPIs', active: false, locked: true },
];

const ZitcomfortLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#1a1f4b" />
    <path
      d="M8 22h16M10 22v-6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6M12 14v-2a4 4 0 0 1 8 0v2"
      stroke="#f0a500"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 10V8"
      stroke="#f0a500"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

export default function Sidebar() {
  return (
    <aside
      style={{ width: 220, minHeight: '100vh', background: '#1a1f4b', flexShrink: 0 }}
      className="flex flex-col"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 pt-7 pb-6">
        <ZitcomfortLogo />
        <div>
          <p className="text-white font-semibold text-sm leading-tight">Zitcomfort</p>
          <p style={{ color: '#a5accc', fontSize: 10 }} className="leading-tight mt-0.5">
            Powered by InnovaIgency
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginInline: 20 }} />

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 pt-4 flex-1">
        <p style={{ color: '#6b7faa', fontSize: 10, letterSpacing: '0.08em', fontWeight: 600 }} className="px-3 pb-2 uppercase">
          Navigatie
        </p>
        {navItems.map(({ icon: Icon, label, active, locked }) => (
          <div key={label} className="tooltip-wrapper">
            <button
              disabled={locked}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 8,
                border: 'none',
                cursor: locked ? 'default' : 'pointer',
                background: active ? 'rgba(240,165,0,0.15)' : 'transparent',
                color: active ? '#f0a500' : locked ? '#4a5380' : '#a5accc',
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                fontFamily: 'inherit',
                transition: 'background 0.15s ease, color 0.15s ease',
                textAlign: 'left',
              }}
              onMouseEnter={e => {
                if (!locked && !active) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = '#d4d8ec';
                }
              }}
              onMouseLeave={e => {
                if (!locked && !active) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#a5accc';
                }
              }}
            >
              <Icon size={16} strokeWidth={active ? 2.2 : 1.8} />
              <span className="flex-1">{label}</span>
              {locked && <Lock size={12} strokeWidth={1.8} style={{ color: '#3a4570' }} />}
            </button>
            {locked && (
              <span className="tooltip-text">Beschikbaar in volgende update</span>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 16px 20px' }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 14 }} />
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'rgba(240,165,0,0.2)',
              border: '1.5px solid rgba(240,165,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: '#f0a500',
              flexShrink: 0,
            }}
          >
            ZC
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ color: '#d4d8ec', fontSize: 12, fontWeight: 500 }} className="truncate">
              Zitcomfort B.V.
            </p>
            <button
              style={{
                color: '#6b7faa',
                fontSize: 11,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#f0a500'}
              onMouseLeave={e => e.currentTarget.style.color = '#6b7faa'}
            >
              <HeadphonesIcon size={10} />
              Support
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
