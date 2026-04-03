# Zitcomfort — Marketing Insights Dashboard

Productie-klaar marketing dashboard voor Zitcomfort, gebouwd door InnovaIgency.
Toont live data van Meta Ads, Google Ads en Google Analytics 4.

---

## Tech Stack

- **Frontend:** React + Vite, Recharts, Tailwind CSS v4, Axios, Lucide React
- **Backend:** Vercel Serverless Functions (Node.js 20)
- **APIs:** Meta Marketing API v18, Google Ads API, Google Analytics Data API v1

---

## Lokale installatie

### 1. Clone de repository

```bash
git clone <repo-url>
cd zitcomfort-dashboard
```

### 2. Kopieer het `.env` template

```bash
cp .env.example .env.local
```

### 3. Vul de API-credentials in

Open `.env.local` en vul de waarden in. Zie hieronder voor hoe je elk credential verkrijgt.

#### Meta Ads
- **META_ACCESS_TOKEN** — Genereer een long-lived token via [Meta for Developers](https://developers.facebook.com/tools/explorer/)
- **META_AD_ACCOUNT_ID** — Te vinden in Meta Ads Manager → instellingen (formaat: `act_XXXXXXXXXX`)
- **META_APP_ID** / **META_APP_SECRET** — Maak een app aan op [developers.facebook.com](https://developers.facebook.com/)

#### Google Ads
- **GOOGLE_ADS_CLIENT_ID** / **GOOGLE_ADS_CLIENT_SECRET** — OAuth2 credentials via [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
- **GOOGLE_ADS_REFRESH_TOKEN** — Genereer via OAuth2 playground of gebruik [google-auth-library](https://www.npmjs.com/package/google-auth-library)
- **GOOGLE_ADS_DEVELOPER_TOKEN** — Aanvragen via [Google Ads API Center](https://ads.google.com/aw/apicenter)
- **GOOGLE_ADS_CUSTOMER_ID** — 10-cijferig klantnummer zonder streepjes

#### Google Analytics 4
- **GA4_PROPERTY_ID** — Te vinden in GA4 Admin → Property Settings (formaat: `properties/XXXXXXXXX`)
- **GA4_CLIENT_EMAIL** / **GA4_PRIVATE_KEY** — Maak een Service Account aan in [Google Cloud Console](https://console.cloud.google.com/) → IAM & Admin → Service Accounts, download JSON-sleutel, geef het account "Viewer"-toegang in GA4

### 4. Installeer dependencies

```bash
npm install
```

### 5. Start lokale ontwikkelserver

```bash
npm run dev
```

Open `http://localhost:5173` in je browser.

> **Let op:** De `/api/*` routes draaien als Vercel Serverless Functions en zijn lokaal niet beschikbaar via `npm run dev`. Voor lokale API-tests: gebruik `vercel dev` (vereist Vercel CLI: `npm i -g vercel`).

---

## Werkt het dashboard zonder credentials?

**Ja.** Elke API-route detecteert automatisch of credentials aanwezig zijn. Als dat niet het geval is, worden realistische demodata gebruikt (gebaseerd op Zitcomfort februari 2026 cijfers). Het dashboard toont dan een gele banner:

> *"Demo data — koppel je API-credentials om live data te laden"*

---

## Deploy naar Vercel

### Methode 1: Via Vercel dashboard (aanbevolen)

1. Push je code naar GitHub
2. Ga naar [vercel.com](https://vercel.com) → New Project → selecteer je repository
3. Vercel detecteert automatisch Vite als framework
4. Voeg de environment variables toe onder **Settings → Environment Variables**:

| Variabele | Omgeving |
|-----------|----------|
| `META_ACCESS_TOKEN` | Production, Preview |
| `META_AD_ACCOUNT_ID` | Production, Preview |
| `META_APP_ID` | Production, Preview |
| `META_APP_SECRET` | Production, Preview |
| `GOOGLE_ADS_CLIENT_ID` | Production, Preview |
| `GOOGLE_ADS_CLIENT_SECRET` | Production, Preview |
| `GOOGLE_ADS_REFRESH_TOKEN` | Production, Preview |
| `GOOGLE_ADS_DEVELOPER_TOKEN` | Production, Preview |
| `GOOGLE_ADS_CUSTOMER_ID` | Production, Preview |
| `GA4_PROPERTY_ID` | Production, Preview |
| `GA4_CLIENT_EMAIL` | Production, Preview |
| `GA4_PRIVATE_KEY` | Production, Preview |
| `VITE_API_BASE_URL` | *leeg laten* (Vercel routes automatisch) |

5. Klik op **Deploy**

### Methode 2: Via Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

---

## Projectstructuur

```
/
├── /api                     ← Vercel serverless functions
│   ├── meta.js              ← Meta Ads API proxy
│   ├── google-ads.js        ← Google Ads API proxy
│   └── analytics.js         ← GA4 API proxy
├── /src
│   ├── /components
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── KPICards.jsx
│   │   ├── PlatformCards.jsx
│   │   ├── InsightsPanel.jsx
│   │   ├── TrendChart.jsx
│   │   ├── BudgetDonut.jsx
│   │   └── Footer.jsx
│   ├── /hooks
│   │   └── useDashboardData.js
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── vercel.json
└── README.md
```

---

## Data verversing

Het dashboard ververscht automatisch elke **5 minuten**. Handmatig verversen kan via de verversknop (↺) in de header.

---

## Vragen of problemen?

Neem contact op met InnovaIgency via het dashboard.
