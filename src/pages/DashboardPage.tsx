import { Link } from 'react-router-dom';
import { CalorieRing } from '../components/ui/CalorieRing';
import { DesktopDashboard } from '../components/ui/DesktopDashboard';
import { useIsMobile } from '../hooks/useIsMobile';
import { sumNutrition, formatNumber } from '../lib/utils';
import { MOCK_TODAY_LOG, MOCK_USER } from '../lib/data';

const macroTargets = { protein: 60, carbs: 250, fat: 65 };

export function DashboardPage() {
  const isMobile = useIsMobile();
  const totals = sumNutrition(MOCK_TODAY_LOG.items);
  const lastMeal = MOCK_TODAY_LOG.items[MOCK_TODAY_LOG.items.length - 1];

  if (!isMobile) {
    return <DesktopDashboard />;
  }

  return (
    <div className="font-jakarta bg-background min-h-screen pb-32">
      <header className="bg-background w-full flex justify-between items-center px-container-margin pt-4 pb-2 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden">
            <span className="material-symbols-filled text-xl text-primary">person</span>
          </div>
          <h1 className="font-jakarta text-headline-md font-bold text-primary">GiziLog</h1>
        </div>
        <button className="text-primary hover:opacity-80 scale-95 active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-2xl">notifications</span>
        </button>
      </header>

      <main className="px-container-margin space-y-bento-gap">
        <section className="bento-card bg-surface-mint p-6 rounded-3xl flex flex-col items-center justify-center text-center">
          <h2 className="font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase text-on-surface-variant mb-2">
            Sisa Kalori Hari Ini
          </h2>
          <div className="relative flex items-center justify-center py-4">
            <CalorieRing
              consumed={totals.calories}
              target={MOCK_USER.dailyCalorieTarget}
              size={192}
              strokeWidth={12}
            />
          </div>
          <div className="grid grid-cols-3 gap-6 w-full mt-4">
            <MacroProgress
              label="PROTEIN"
              value={totals.protein}
              target={macroTargets.protein}
              unit="g"
              barColor="bg-primary"
            />
            <MacroProgress
              label="KARBOHIDRAT"
              value={totals.carbs}
              target={macroTargets.carbs}
              unit="g"
              barColor="bg-secondary-container"
            />
            <MacroProgress
              label="LEMAK"
              value={totals.fat}
              target={macroTargets.fat}
              unit="g"
              barColor="bg-tertiary-container"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-jakarta text-headline-md text-on-background">Input Kilat</h3>
          <div className="grid grid-cols-2 gap-bento-gap">
            <Link
              to="/scan"
              className="bento-card bg-secondary-container text-on-secondary-container p-5 rounded-3xl flex flex-col items-start justify-between min-h-[140px] shadow-sm"
            >
              <div className="bg-white/20 p-2 rounded-xl">
                <span className="material-symbols-outlined text-3xl">photo_camera</span>
              </div>
              <span className="font-jakarta text-headline-md text-left leading-tight">Buka Kamera AR</span>
            </Link>
            <button className="bento-card bg-surface-container-lowest border border-outline-variant p-5 rounded-3xl flex flex-col items-start justify-between min-h-[140px]">
              <div className="bg-surface-mint p-2 rounded-xl">
                <span className="material-symbols-outlined text-3xl text-primary">search</span>
              </div>
              <span className="font-jakarta text-headline-md text-left leading-tight text-on-surface">Cari Manual</span>
            </button>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-jakarta text-headline-md text-on-background">Makan Terakhir</h3>
            <Link to="/statistics" className="text-primary font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase">
              LIHAT SEMUA
            </Link>
          </div>
          {lastMeal && (
            <div className="bento-card bg-surface-container-lowest p-4 rounded-2xl flex items-center gap-4 border border-outline-variant">
              <div className="w-14 h-14 rounded-2xl bg-surface-mint flex items-center justify-center shrink-0">
                <span className="material-symbols-filled text-2xl text-primary">restaurant</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-jakarta text-body-lg font-bold text-on-surface truncate">
                  {lastMeal.food_name}
                </h4>
                <p className="font-jakarta text-body-md text-on-surface-variant">
                  {lastMeal.category === 'Breakfast' ? 'Sarapan' :
                   lastMeal.category === 'Lunch' ? 'Makan Siang' :
                   lastMeal.category === 'Dinner' ? 'Makan Malam' : 'Camilan'}
                  {' \u2022 '}
                  {lastMeal.createdAt}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-jakarta text-data-display text-primary">{formatNumber(lastMeal.calories)}</span>
                <p className="font-jakarta text-[10px] font-bold tracking-[0.05em] uppercase text-on-surface-variant">KCAL</p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function MacroProgress({
  label,
  value,
  target,
  unit,
  barColor,
}: {
  label: string;
  value: number;
  target: number;
  unit: string;
  barColor: string;
}) {
  const pct = Math.min((value / target) * 100, 100);
  return (
    <div className="flex flex-col">
      <span className="font-jakarta text-[10px] font-bold tracking-[0.05em] uppercase text-on-surface-variant">{label}</span>
      <span className="font-jakarta text-[10px] text-on-surface-variant mb-0.5">
        {formatNumber(value)}{unit} / {formatNumber(target)}{unit}
      </span>
      <div className="h-2 w-full bg-surface-container-highest rounded-full mt-1 overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
