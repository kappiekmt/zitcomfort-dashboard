import { Euro, ShoppingCart, TrendingUp, Percent } from 'lucide-react';

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

// Mock previous period for trend (hardcoded demo deltas)
const PREV = {
  totalSpend: 17200,
  totalConversions: 140,
  avgCpa: 122.86,
  conversionRate: 0.38,
};

function TrendBadge({ current, previous, invertColors = false, suffix = '%' }) {
  if (!previous) return null;
  const pct = ((current - previous) / previous) * 100;
  const isPositive = pct >= 0;
  // For CPA: down is good → invertColors=true
  const isGood = invertColors ? !isPositive : isPositive;
  const color = isGood ? 'var(--color-success)' : 'var(--color-danger)';
  const bg = isGood ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3,
        padding: '2px 8px',
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        background: bg,
        color,
      }}
    >
      {isPositive ? '↑' : '↓'} {Math.abs(pct).toFixed(1)}% vs vorige maand
    </span>
  );
}

function KPICard({ icon: Icon, label, value, trend, borderColor, delay, iconColor }) {
  return (
    <div
      className="card animate-in"
      style={{
        padding: '20px 22px',
        borderBottom: `3px solid ${borderColor}`,
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
          }}
        >
          {label}
        </p>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: `${iconColor}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={16} style={{ color: iconColor }} strokeWidth={2} />
        </div>
      </div>
      <p
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: 'var(--color-navy)',
          lineHeight: 1.1,
          marginBottom: 10,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </p>
      {trend}
    </div>
  );
}

export default function KPICards({ data }) {
  if (!data) return null;
  const { totalSpend, totalConversions, avgCpa, conversionRate } = data.summary;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
      }}
    >
      <KPICard
        icon={Euro}
        label="Totale Uitgaven"
        value={formatEuro(totalSpend)}
        borderColor="var(--color-navy)"
        iconColor="var(--color-navy)"
        delay={100}
        trend={
          <TrendBadge
            current={totalSpend}
            previous={PREV.totalSpend}
            invertColors={false}
          />
        }
      />
      <KPICard
        icon={ShoppingCart}
        label="Totale Conversies"
        value={formatNumber(totalConversions)}
        borderColor="var(--color-success)"
        iconColor="var(--color-success)"
        delay={200}
        trend={
          <TrendBadge
            current={totalConversions}
            previous={PREV.totalConversions}
            invertColors={false}
          />
        }
      />
      <KPICard
        icon={TrendingUp}
        label="Gemiddelde CPA"
        value={formatEuro(avgCpa)}
        borderColor={avgCpa > PREV.avgCpa ? 'var(--color-danger)' : 'var(--color-success)'}
        iconColor="var(--color-gold)"
        delay={300}
        trend={
          <TrendBadge
            current={avgCpa}
            previous={PREV.avgCpa}
            invertColors={true}
          />
        }
      />
      <KPICard
        icon={Percent}
        label="Conversieratio"
        value={`${formatNumber(conversionRate, 2)}%`}
        borderColor={conversionRate >= PREV.conversionRate ? 'var(--color-success)' : 'var(--color-warning)'}
        iconColor="var(--color-gold)"
        delay={400}
        trend={
          <TrendBadge
            current={conversionRate}
            previous={PREV.conversionRate}
            invertColors={false}
          />
        }
      />
    </div>
  );
}
