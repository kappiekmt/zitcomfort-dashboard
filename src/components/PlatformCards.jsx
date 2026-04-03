function formatEuro(value) {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value, decimals = 0) {
  return new Intl.NumberFormat('nl-NL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function MetricRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <span style={{ fontSize: 12, color: 'var(--color-muted)', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-navy)', fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </span>
    </div>
  );
}

function PlatformCard({ name, dotColor, metrics, badge, badgeStyle, cardStyle, delay }) {
  return (
    <div
      className="animate-in"
      style={{
        background: 'var(--color-card)',
        borderRadius: 12,
        padding: '20px 22px',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid var(--color-border)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        animationDelay: `${delay}ms`,
        ...cardStyle,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: dotColor,
              flexShrink: 0,
              display: 'inline-block',
            }}
          />
          <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-navy)' }}>
            {name}
          </span>
        </div>
        <span
          style={{
            padding: '3px 10px',
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 600,
            ...badgeStyle,
          }}
        >
          {badge}
        </span>
      </div>

      {/* Metrics */}
      <div>
        {metrics.map((m) => (
          <MetricRow key={m.label} label={m.label} value={m.value} />
        ))}
      </div>
    </div>
  );
}

export default function PlatformCards({ data }) {
  if (!data) return null;
  const { meta, googleAds, analytics } = data;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      <PlatformCard
        name="Meta Ads"
        dotColor="#1877f2"
        delay={200}
        badge="Beste CPA 🏆"
        badgeStyle={{ background: 'rgba(240,165,0,0.12)', color: 'var(--color-gold)' }}
        metrics={[
          { label: 'Uitgaven', value: formatEuro(meta.spend) },
          { label: 'Conversies', value: formatNumber(meta.conversions) },
          { label: 'CPA', value: formatEuro(meta.cpa) },
          { label: 'CTR', value: `${formatNumber(meta.ctr, 2)}%` },
        ]}
      />
      <PlatformCard
        name="Google Ads"
        dotColor="#fbbc04"
        delay={300}
        badge="Hoogste bereik"
        badgeStyle={{ background: 'rgba(26,31,75,0.07)', color: 'var(--color-navy)' }}
        metrics={[
          { label: 'Uitgaven', value: formatEuro(googleAds.spend) },
          { label: 'Conversies', value: formatNumber(googleAds.conversions) },
          { label: 'CPA', value: formatEuro(googleAds.cpa) },
          { label: 'CTR', value: `${formatNumber(googleAds.ctr, 2)}%` },
        ]}
      />
      <PlatformCard
        name="Organisch"
        dotColor="#22c55e"
        delay={400}
        badge="Geen kosten"
        badgeStyle={{
          background: 'transparent',
          color: 'var(--color-success)',
          border: '1.5px dashed var(--color-success)',
        }}
        cardStyle={{ borderStyle: 'dashed' }}
        metrics={[
          { label: 'Sessies', value: formatNumber(analytics.sessions) },
          { label: 'Conversies', value: formatNumber(analytics.conversions) },
          { label: 'Conversieratio', value: `${formatNumber(analytics.conversionRate, 2)}%` },
          { label: 'Organische gebruikers', value: formatNumber(analytics.organicUsers) },
        ]}
      />
    </div>
  );
}
