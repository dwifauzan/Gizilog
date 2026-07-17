# GiziLog - Smart Nutrition Tracker

GiziLog adalah aplikasi pelacak nutrisi harian pintar yang berfokus pada pencegahan malnutrisi dan stunting. Fitur utamanya adalah kemampuan memindai makanan secara real-time menggunakan kamera, mengirimkannya ke AI OpenClaw untuk dianalisis kandungan gizinya (Kalori, Protein, Lemak, Karbohidrat), dan menyajikannya secara visual terukur kepada pengguna.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript 6 |
| Bundler | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| HTTP Client | Axios |
| Charts | Recharts 3 |
| Camera | React-Webcam 7 |
| Icons | Lucide React |
| Linting | ESLint 10 + TypeScript-ESLint |
| Compiler | React Compiler (Babel) |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd gemastikGizilog

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint on all files |
| `npm run preview` | Preview production build locally |

---

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_OPENCLAW_API_URL=https://api.openclaw.com/v1/scan
VITE_OPENCLAW_API_KEY=your_api_key_here
```

**Important:** Never commit `.env` files. API keys must be loaded from environment variables only.

---

## Project Structure

```
src/
├── App.tsx                    # Root router configuration
├── main.tsx                   # Application entry point
├── index.css                  # Global styles, theme tokens, animations
├── App.css                    # App-level styles
│
├── assets/                    # Static assets (images, icons)
│   └── hero.png
│
├── components/
│   ├── layout/                # Layout components
│   │   ├── AppLayout.tsx      # Main layout wrapper (sidebar + mobile nav)
│   │   ├── MobileNav.tsx      # Bottom navigation bar (mobile)
│   │   ├── Sidebar.tsx        # Sticky sidebar (desktop)
│   │   └── ScanGuard.tsx      # Camera/permission guard for scan page
│   │
│   └── ui/                    # Reusable UI components
│       ├── CalorieRing.tsx    # Circular calorie progress indicator
│       ├── FoodPieChart.tsx   # Macronutrient pie chart (Recharts)
│       ├── MacroCard.tsx      # Macro nutrient display card
│       ├── MealTimeline.tsx   # Meal history timeline
│       └── ThresholdBadge.tsx # Nutrient threshold warning badges
│
├── hooks/
│   └── useIsMobile.ts         # Responsive breakpoint hook (1024px)
│
├── lib/
│   ├── data.ts                # Mock data (user, logs, stats, insights)
│   └── utils.ts               # Utility functions (formatNumber, sumNutrition, calculateDailyCalories)
│
├── pages/
│   ├── auth/                  # Authentication feature
│   │   ├── LoginPage.tsx      # Login router (switches mobile/desktop)
│   │   ├── RegisterPage.tsx   # Register router (switches mobile/desktop)
│   │   ├── desktop/
│   │   │   ├── LoginDesktop.tsx
│   │   │   └── RegisterDesktop.tsx
│   │   └── mobile/
│   │       ├── LoginMobile.tsx
│   │       └── RegisterMobile.tsx
│   │
│   ├── dashboard/             # Dashboard feature
│   │   ├── DashboardPage.tsx  # Dashboard router (switches mobile/desktop)
│   │   ├── desktop/
│   │   │   └── DesktopDashboard.tsx
│   │   └── mobile/
│   │       └── MobileDashboard.tsx
│   │
│   ├── history/               # Meal history feature
│   │   ├── HistoryPage.tsx    # History router (switches mobile/desktop)
│   │   └── mobile/
│   │       └── MobileHistory.tsx
│   │
│   ├── scan/                  # AI food scanner feature
│   │   └── ScanPage.tsx       # Camera + AI analysis + Sekat Piring
│   │
│   ├── statistics/            # Analytics feature
│   │   └── StatisticsPage.tsx # Weekly/monthly charts + AI insights
│   │
│   └── profile/               # Profile & settings feature
│       └── ProfilePage.tsx    # User profile, settings, logout
│
└── types/
    └── index.ts               # TypeScript type definitions
```

---

## Routing

| Route | Page | Layout |
|---|---|---|
| `/` | Login | No layout |
| `/login` | Login | No layout |
| `/register` | Register | No layout |
| `/dashboard` | Dashboard | AppLayout (sidebar + mobile nav) |
| `/scan` | AI Scanner | AppLayout (with ScanGuard) |
| `/history` | Journal | AppLayout |
| `/statistics` | Statistics | AppLayout |
| `/profile` | Profile | AppLayout |
| `*` | Redirect to `/` | - |

---

## Responsive Architecture

Mobile-First design with a single breakpoint at `1024px`:

| Screen | Navigation | Layout |
|---|---|---|
| Mobile (< 1024px) | Bottom Navigation Bar | Single column |
| Desktop (>= 1024px) | Sticky Sidebar (260px) | Multi-column grid |

Each feature page uses a router component that switches between `mobile/` and `desktop/` subfolders:

```tsx
// Example: DashboardPage.tsx
export function DashboardPage() {
  const isMobile = useIsMobile();
  if (!isMobile) return <DesktopDashboard />;
  return <MobileDashboard />;
}
```

---

## Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#22C55E` | Primary actions, health indicators |
| `--color-surface-tint` | `#006e2c` | Desktop primary, branding |
| `--color-accent` | `#2563EB` | Accent blue, emphasis |
| `--color-fresh-orange` | `#FB8C00` | CTA buttons, secondary actions |
| `--color-secondary-container` | `#ff8f06` | Orange buttons |
| `--color-dark` | `#1F2937` | Base text |
| `--color-light` | `#F9FAFB` | Background surfaces |
| `--color-surface-mint` | `#E6F4EA` | Mint backgrounds |
| `--color-status-success` | `#4CAF50` | Healthy indicators |
| `--color-status-warning` | `#FFC107` | Moderate indicators |
| `--color-status-error` | `#F44336` | Danger indicators |

### Typography

- **Primary Font:** Plus Jakarta Sans (via Google Fonts)
- **Fallback:** Inter, system-ui, sans-serif
- **Font Variable:** `--font-jakarta`

### Spacing Tokens

| Token | Value |
|---|---|
| `--spacing-card-padding` | 20px |
| `--spacing-gutter` | 16px |
| `--spacing-container-margin` | 24px |
| `--spacing-unit` | 8px |
| `--spacing-bento-gap` | 16px |

---

## Key Features

### 1. AI Food Scanner (`/scan`)
- Uses `react-webcam` with rear camera (`facingMode: "environment"`)
- Captures JPEG frame, converts to Base64
- Sends to OpenClaw API (GPT-4o vision model)
- Returns: `{ food_name, calories, protein, fat, carbs }`
- Fallback: Manual food selection if AI fails

### 2. Sekat Piring Makan
- Pie chart visualization of macronutrient ratios
- Threshold warnings (Green/Yellow/Red) for sodium, fiber, sugar
- Based on WHO guidelines

### 3. Meal Timeline
- Categorized by: Breakfast, Lunch, Dinner, Snacks
- Daily calorie tracking with progress ring
- Date selector for history navigation

### 4. Analytics Dashboard
- Weekly/Monthly macro trends (Recharts Bar Charts)
- Weight fluctuation tracking (Area Chart)
- AI-generated "Gizi Insight" recommendations

---

## Utility Functions

Located in `src/lib/utils.ts`:

| Function | Description |
|---|---|
| `formatNumber(n)` | Format number with locale separators |
| `sumNutrition(items)` | Sum calories/protein/fat/carbs from food array |
| `calculateDailyCalories(profile)` | Calculate BMR-based daily calorie target |
| `cn(...classes)` | Conditional className merger (clsx-like) |

---

## Mock Data

Located in `src/lib/data.ts`:

| Export | Description |
|---|---|
| `MOCK_USER` | User profile with physical metadata |
| `MOCK_TODAY_LOG` | Today's meal log items |
| `MOCK_WEEKLY_STATS` | 7-day calorie/macro data |
| `MOCK_WEIGHT_STATS` | 4-week weight tracking |
| `MOCK_AI_INSIGHT` | AI-generated nutrition insight |
| `FALLBACK_FOODS` | Manual food selection options |

---

## Type Definitions

Located in `src/types/index.ts`:

| Type | Description |
|---|---|
| `UserProfile` | User physical data + calorie target |
| `FoodItem` | Individual food entry with nutrition |
| `DailyLog` | Date + array of food items |
| `WeeklyStat` | Daily macro/calorie summary |
| `WeightStat` | Monthly weight entry |
| `AIInsight` | AI analysis result |
| `Nutrition` | Nutrition breakdown object |

---

## Contributing

### Adding a New Page

1. Create feature folder: `src/pages/<feature>/`
2. Add mobile/desktop subfolders if responsive variants needed
3. Create router component in feature root
4. Register route in `src/App.tsx`
5. Add to `AppLayout.tsx` if using sidebar/mobile nav

### Adding a New Component

1. Place reusable components in `src/components/ui/`
2. Place layout components in `src/components/layout/`
3. Use existing design tokens from `src/index.css`
4. Follow Plus Jakarta Sans typography convention

### Code Style

- Use `font-jakarta` class for Plus Jakarta Sans font
- Use theme color tokens (e.g., `text-surface-tint`, `bg-secondary-container`)
- Use `useIsMobile()` hook for responsive logic
- Avoid inline styles; prefer Tailwind utility classes
- No comments unless explicitly requested

---

## Deployment

Target platform: **Vercel**

```bash
# Build for production
npm run build

# Output directory: dist/
```

### CORS Mitigation

If OpenClaw API throws CORS errors, implement a Vercel Serverless Function at `/api/scan.js` as a secure proxy.

### HTTPS Requirement

Camera access (`MediaDevices API`) requires HTTPS. Vercel provides this by default.

---

## License

This project is developed for Gemastik competition.
