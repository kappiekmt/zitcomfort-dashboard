import { TrendingUp, AlertTriangle, Info } from 'lucide-react';

function formatEuro(value) {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value, decimals = 2) {
  return new Intl.NumberFormat('nl-NL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function generateInsights(data) {
  const { meta, googleAds, analytics, summary } = data;
  const insights = [];

  // 1. Meta CPA vs Google Ads CPA
  if (meta.cpa > 0 && googleAds.cpa > 0) {
    const ratio = googleAds.cpa / meta.cpa;
    if (ratio > 3) {
      insights.push({
        type: 'Aandachtspunt',
        icon: AlertTriangle,
        iconColor: '#f59e0b',
        bg: 'rgba(245,158,11,0.07)',
        border: 'rgba(245,158,11,0.3)',
        text: `Google Ads CPA (${formatEuro(googleAds.cpa)}) is ${formatNumber(ratio, 1)}× hoger dan Meta CPA (${formatEuro(meta.cpa)}). Overweeg budgetoptimalisatie richting Meta voor een lagere acquisitiekosten.`,
      });
    } else {
      insights.push({
        type: 'Positief Signaal',
        icon: TrendingUp,
        iconColor: '#22c55e',
        bg: 'rgba(34,197,94,0.07)',
        border: 'rgba(34,197,94,0.3)',
        text: `Meta CPA (${formatEuro(meta.cpa)}) en Google Ads CPA (${formatEuro(googleAds.cpa)}) zijn goed in balans. Beide kanalen presteren efficiënt binnen de doelstelling.`,
      });
    }
  }

  // 2. Budget concentration vs conversions
  const totalSpend = meta.spend + googleAds.spend;
  const totalConversions = meta.conversions + googleAds.conversions + analytics.conversions;

  if (totalSpend > 0 && totalConversions > 0) {
    const gadsSpendPct = (googleAds.spend / totalSpend) * 100;
    const gadsConvPct = (googleAds.conversions / totalConversions) * 100;

    if (gadsSpendPct > 70 && gadsConvPct < 40) {
      insights.push({
        type: 'Aandachtspunt',
        icon: AlertTriangle,
        iconColor: '#ef4444',
        bg: 'rgba(239,68,68,0.07)',
        border: 'rgba(239,68,68,0.3)',
        text: `Google Ads neemt ${formatNumber(gadsSpendPct, 0)}% van het budget in beslag maar genereert slechts ${formatNumber(gadsConvPct, 0)}% van de conversies. Dit wijst op een budgetallocatie-inefficiëntie.`,
      });
    } else {
      insights.push({
        type: 'Aanbeveling',
        icon: Info,
        iconColor: '#1a1f4b',
        bg: 'rgba(26,31,75,0.05)',
        border: 'rgba(26,31,75,0.15)',
        text: `Google Ads (${formatNumber(gadsSpendPct, 0)}% budget) levert ${formatNumber(gadsConvPct, 0)}% van de conversies — budgetverdeling is in lijn met rendement. Geen directe actie vereist.`,
      });
    }
  }

  // 3. Conversion rate vs benchmark
  const BENCHMARK_CR = 0.38;
  if (analytics.conversionRate > 0) {
    if (analytics.conversionRate > BENCHMARK_CR) {
      insights.push({
        type: 'Positief Signaal',
        icon: TrendingUp,
        iconColor: '#22c55e',
        bg: 'rgba(34,197,94,0.07)',
        border: 'rgba(34,197,94,0.3)',
        text: `De organische conversieratio (${formatNumber(analytics.conversionRate, 2)}%) ligt boven het vorige periode gemiddelde van ${formatNumber(BENCHMARK_CR, 2)}%. De website presteert beter in het omzetten van bezoekers.`,
      });
    } else {
      insights.push({
        type: 'Aandachtspunt',
        icon: AlertTriangle,
        iconColor: '#f59e0b',
        bg: 'rgba(245,158,11,0.07)',
        border: 'rgba(245,158,11,0.3)',
        text: `De conversieratio (${formatNumber(analytics.conversionRate, 2)}%) is licht gedaald ten opzichte van de vorige periode (${formatNumber(BENCHMARK_CR, 2)}%). Analyseer de landingspagina's voor verbeterpunten.`,
      });
    }
  }

  return insights.slice(0, 3);
}

export default function InsightsPanel({ data }) {
  if (!data) return null;
  const insights = generateInsights(data);

  return (
    <div
      className="animate-in animate-delay-5"
      style={{
        background: '#fff',
        borderRadius: 10,
        border: '1px solid #e5e7eb',
        borderLeft: '3px solid #f0a500',
        padding: '20px 24px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      }}
    >
      <h2
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: 'var(--color-navy)',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span>📊</span> Belangrijkste Inzichten
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <div
              key={i}
              style={{
                background: insight.bg,
                border: `1px solid ${insight.border}`,
                borderRadius: 10,
                padding: '14px 16px',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} style={{ color: insight.iconColor, flexShrink: 0 }} strokeWidth={2.2} />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: insight.iconColor,
                  }}
                >
                  {insight.type}
                </span>
              </div>
              <p style={{ fontSize: 12.5, lineHeight: 1.55, color: '#374151' }}>
                {insight.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
