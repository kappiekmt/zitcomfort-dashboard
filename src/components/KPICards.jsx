import { Euro, ShoppingCart, TrendingUp, Percent } from 'lucide-react';

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

const PREV = {
  totalSpend: 17200,
  totalConversions: 140,
  avgCpa: 122.86,
  conversionRate: 0.38,
};

function TrendBadge({ current, previous, invertColors = false }) {
  if (!previous) return null;
  const pct = ((current - previous) / previous) * 100;
  const isPositive = pct >= 0;
  const isGood = invertColors ? !isPositive : isPositive;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      padding: '3px 8px', borderRadius: 20,
      fontSize: 11, fontWeight: 600,
      background: isGood ? 'var(--color-success-bg)' : 'var(--color-danger-bg)',
      color: isGood ? 'var(--color-success)' : 'var(--color-danger)',
    }}>
      {isPositive ? '↑' : '↓'} {Math.abs(pct).toFixed(1)}% vs vorige maand
    </span>
  );
}

function KPICard({ icon: Icon, label, value, trend, iconColor, delay }) {
  return (
    <div
      className="card animate-in"
      style={{ padding: '22px 24px', animationDelay: `${delay}ms` }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <p style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>{label}</p>
        <Icon size={16} style={{ color: iconColor }} strokeWidth={1.8} />
      </div>
      <p style={{
        fontSize: 28, fontWeight: 700, color: '#111827',
        lineHeight: 1, marginBottom: 12, fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-0.5px',
      }}>
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
      <KPICard
        icon={Euro} label="Totale Uitgaven"
        value={formatEuro(totalSpend)}
        iconColor="#1a1f4b" delay={80}
        trend={<TrendBadge current={totalSpend} previous={PREV.totalSpend} />}
      />
      <KPICard
        icon={ShoppingCart} label="Totale Conversies"
        value={formatNumber(totalConversions)}
        iconColor="#16a34a" delay={160}
        trend={<TrendBadge current={totalConversions} previous={PREV.totalConversions} />}
      />
      <KPICard
        icon={TrendingUp} label="Gemiddelde CPA"
        value={formatEuro(avgCpa)}
        iconColor="#d97706" delay={240}
        trend={<TrendBadge current={avgCpa} previous={PREV.avgCpa} invertColors />}
      />
      <KPICard
        icon={Percent} label="Conversieratio"
        value={`${formatNumber(conversionRate, 2)}%`}
        iconColor="#1a1f4b" delay={320}
        trend={<TrendBadge current={conversionRate} previous={PREV.conversionRate} />}
      />
    </div>
  );
}
