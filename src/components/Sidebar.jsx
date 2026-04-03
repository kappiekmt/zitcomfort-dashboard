import {
  LayoutDashboard,
  BarChart2,
  FileText,
  Image,
  Target,
  Lock,
  Headphones,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',           active: true,  locked: false },
  { icon: BarChart2,       label: 'Campagne Details',    active: false, locked: true  },
  { icon: FileText,        label: 'Maandrapport',        active: false, locked: true  },
  { icon: Image,           label: 'Advertentie Overzicht', active: false, locked: true },
  { icon: Target,          label: 'Doelen & KPIs',       active: false, locked: true  },
];

const ZitcomfortLogo = () => (
  <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#1a1f4b" />
    <path
      d="M8 22h16M10 22v-6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6M12 14v-2a4 4 0 0 1 8 0v2"
      stroke="#f0a500" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    />
    <path d="M16 10V8" stroke="#f0a500" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        minHeight: '100vh',
        background: '#fff',
        borderRight: '1px solid #f0f0ef',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: '22px 20px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <ZitcomfortLogo />
        <div>
          <p style={{ fontWeight: 700, fontSize: 14, color: '#111827', lineHeight: 1.2 }}>
            Zitcomfort
          </p>
          <p style={{ fontSize: 10, color: '#9ca3af', marginTop: 1 }}>
            by InnovaIgency
          </p>
        </div>
      </div>

      <div style={{ height: 1, background: '#f3f4f6', marginInline: 16, marginBottom: 8 }} />

      {/* Nav */}
      <nav style={{ flex: 1, padding: '4px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.07em', color: '#9ca3af', textTransform: 'uppercase', padding: '8px 8px 4px' }}>
          Menu
        </p>
        {navItems.map(({ icon: Icon, label, active, locked }) => (
          <div key={label} className="tooltip-wrapper">
            <button
              disabled={locked}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '8px 10px',
                borderRadius: 7,
                border: 'none',
                cursor: locked ? 'default' : 'pointer',
                background: active ? '#1a1f4b' : 'transparent',
                color: active ? '#fff' : locked ? '#d1d5db' : '#6b7280',
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                fontFamily: 'inherit',
                transition: 'background 0.15s ease, color 0.15s ease',
                textAlign: 'left',
              }}
              onMouseEnter={e => {
                if (!locked && !active) {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.color = '#111827';
                }
              }}
              onMouseLeave={e => {
                if (!locked && !active) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#6b7280';
                }
              }}
            >
              <Icon size={15} strokeWidth={active ? 2.2 : 1.8} />
              <span style={{ flex: 1 }}>{label}</span>
              {locked && <Lock size={11} strokeWidth={1.8} style={{ color: '#d1d5db' }} />}
            </button>
            {locked && <span className="tooltip-text">Beschikbaar in volgende update</span>}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 14px 18px' }}>
        <div style={{ height: 1, background: '#f3f4f6', marginBottom: 12 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#f3f4f6',
            border: '1px solid #e5e7eb',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: '#374151', flexShrink: 0,
          }}>
            ZC
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>Zitcomfort B.V.</p>
            <button
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                fontSize: 11, color: '#9ca3af', background: 'none',
                border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#1a1f4b'}
              onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
            >
              <Headphones size={10} />
              Support
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
