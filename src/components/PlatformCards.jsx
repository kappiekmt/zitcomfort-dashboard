function formatEuro(value) {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency', currency: 'EUR',
    minimumFractionDigits: 0, maximumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value, decimals = 0) {
  return new Intl.NumberFormat('nl-NL', {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals,
  }).format(value);
}

function MetricRow({ label, value, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: last ? 'none' : '1px solid #f3f4f6',
    }}>
      <span style={{ fontSize: 13, color: '#6b7280' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#111827', fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </span>
    </div>
  );
}

function PlatformCard({ name, dotColor, metrics, badge, badgeStyle, delay }) {
  return (
    <div
      className="card animate-in"
      style={{ padding: '20px 22px', animationDelay: `${delay}ms` }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: dotColor, display: 'inline-block', flexShrink: 0,
          }} />
          <span style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>{name}</span>
        </div>
        <span style={{
          padding: '3px 10px', borderRadius: 20,
          fontSize: 11, fontWeight: 600,
          ...badgeStyle,
        }}>
          {badge}
        </span>
      </div>

      <div>
        {metrics.map((m, i) => (
          <MetricRow key={m.label} label={m.label} value={m.value} last={i === metrics.length - 1} />
        ))}
      </div>
    </div>
  );
}

export default function PlatformCards({ data }) {
  if (!data) return null;
  const { meta, googleAds, analytics } = data;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
      <PlatformCard
        name="Meta Ads" dotColor="#1877f2" delay={160}
        badge="Beste CPA 🏆"
        badgeStyle={{ background: '#fef3c7', color: '#d97706' }}
        metrics={[
          { label: 'Uitgaven',   value: formatEuro(meta.spend) },
          { label: 'Conversies', value: formatNumber(meta.conversions) },
          { label: 'CPA',        value: formatEuro(meta.cpa) },
          { label: 'CTR',        value: `${formatNumber(meta.ctr, 2)}%` },
        ]}
      />
      <PlatformCard
        name="Google Ads" dotColor="#fbbc04" delay={240}
        badge="Hoogste bereik"
        badgeStyle={{ background: '#f3f4f6', color: '#374151' }}
        metrics={[
          { label: 'Uitgaven',   value: formatEuro(googleAds.spend) },
          { label: 'Conversies', value: formatNumber(googleAds.conversions) },
          { label: 'CPA',        value: formatEuro(googleAds.cpa) },
          { label: 'CTR',        value: `${formatNumber(googleAds.ctr, 2)}%` },
        ]}
      />
      <PlatformCard
        name="Organisch" dotColor="#16a34a" delay={320}
        badge="Geen kosten"
        badgeStyle={{ background: '#dcfce7', color: '#16a34a' }}
        metrics={[
          { label: 'Sessies',               value: formatNumber(analytics.sessions) },
          { label: 'Conversies',            value: formatNumber(analytics.conversions) },
          { label: 'Conversieratio',        value: `${formatNumber(analytics.conversionRate, 2)}%` },
          { label: 'Organische gebruikers', value: formatNumber(analytics.organicUsers) },
        ]}
      />
    </div>
  );
}
