import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
  ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid var(--color-border)',
        borderRadius: 10,
        padding: '10px 14px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        fontSize: 12,
      }}
    >
      <p style={{ fontWeight: 700, color: 'var(--color-navy)', marginBottom: 8 }}>{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 mb-1">
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: entry.color,
              display: 'inline-block',
            }}
          />
          <span style={{ color: 'var(--color-muted)' }}>{entry.name}:</span>
          <span style={{ fontWeight: 600, color: '#111827' }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const CustomLegend = ({ payload }) => (
  <div className="flex items-center justify-center gap-6 mt-2">
    {payload.map((entry) => (
      <div key={entry.dataKey} className="flex items-center gap-2">
        <span
          style={{
            width: 24,
            height: 3,
            background: entry.color,
            borderRadius: 2,
            display: 'inline-block',
          }}
        />
        <span style={{ fontSize: 12, color: 'var(--color-muted)', fontWeight: 500 }}>
          {entry.value}
        </span>
      </div>
    ))}
  </div>
);

export default function TrendChart({ data }) {
  if (!data?.weekly) return null;

  return (
    <div
      className="card animate-in animate-delay-4"
      style={{ padding: '20px 22px', flex: '1 1 0' }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-navy)' }}>
          Trend over tijd
        </h3>
        <span
          style={{
            fontSize: 11,
            color: 'var(--color-muted)',
            background: '#f3f4f6',
            padding: '3px 10px',
            borderRadius: 20,
            fontWeight: 500,
          }}
        >
          Huidige maand
        </span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data.weekly} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="metaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1a1f4b" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#1a1f4b" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gadsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f0a500" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f0a500" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="organicGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6b7280" stopOpacity={0.12} />
              <stop offset="95%" stopColor="#6b7280" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0ef" />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />

          <Area
            type="monotone"
            dataKey="meta"
            name="Meta Ads"
            stroke="#1a1f4b"
            strokeWidth={2.2}
            fill="url(#metaGrad)"
            dot={{ r: 4, fill: '#1a1f4b', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
            animationDuration={800}
          />
          <Area
            type="monotone"
            dataKey="googleAds"
            name="Google Ads"
            stroke="#f0a500"
            strokeWidth={2.2}
            fill="url(#gadsGrad)"
            dot={{ r: 4, fill: '#f0a500', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
            animationDuration={1000}
          />
          <Area
            type="monotone"
            dataKey="organic"
            name="Organisch"
            stroke="#9ca3af"
            strokeWidth={2}
            fill="url(#organicGrad)"
            dot={{ r: 3.5, fill: '#9ca3af', strokeWidth: 0 }}
            activeDot={{ r: 5 }}
            animationDuration={1200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
