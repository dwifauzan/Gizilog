import { Link } from 'react-router-dom';
import { Camera, Search, Bell } from 'lucide-react';
import { CalorieRing } from '../../../components/ui/CalorieRing';
import { sumNutrition, formatNumber } from '../../../lib/utils';
import { MOCK_TODAY_LOG, MOCK_USER } from '../../../lib/data';

const macroTargets = { protein: 60, carbs: 250, fat: 65 };

export function MobileDashboard() {
  const totals = sumNutrition(MOCK_TODAY_LOG.items);
  const lastMeal = MOCK_TODAY_LOG.items[MOCK_TODAY_LOG.items.length - 1];

  return (
    <div className="font-jakarta bg-background text-on-background min-h-screen pb-32">
      {/* Top App Bar */}
      <header className="bg-background w-full flex justify-between items-center px-6 py-4 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden">
            <img
              alt="User Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwYW7e2ByTH4YIedzOCeuaBD4FMrnrbkCTQvKiKxHk_f4L3bqJWD30fy--ts8bsffQJnb6nAHjefKlORrMaw6yJbM00yor4JON8fIHHZ3RD6c2ldmT4w3dZ0xeaebP0gP20DcDtAPsIhqmerY88aWIRl6W5mrPnWrwTVoUX-UOf2vHBdMHzlPxdpSKuqNt2Q2_xRwRMgNf5XXKz_lqrIqTmE9xSwi9Fp3n0RefgSrOucuK0_ttykS12gK-auPz1Mo6gTV_OlhHmjM"
            />
          </div>
          <h1 className="font-jakarta text-xl font-semibold text-surface-tint">GiziLog</h1>
        </div>
        <button className="text-surface-tint hover:opacity-80 scale-95 active:scale-90 transition-transform">
          <Bell className="w-6 h-6" />
        </button>
      </header>

      <main className="px-6 space-y-4">
        {/* Sisa Kalori Bento Card */}
        <section className="bg-surface-mint p-6 rounded-3xl flex flex-col items-center justify-center text-center active:scale-[0.98] transition-transform">
          <h2 className="font-jakarta text-xs font-bold tracking-[0.05em] uppercase text-on-surface-variant mb-2">
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
              barColor="bg-surface-tint"
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

        {/* Input Kilat Section */}
        <section className="space-y-4">
          <h3 className="font-jakarta text-xl font-semibold text-on-background">Input Kilat</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Primary CTA: AR Camera */}
            <Link
              to="/scan"
              className="bg-secondary-container text-on-secondary-container p-5 rounded-3xl flex flex-col items-start justify-between min-h-[140px] shadow-sm active:scale-[0.98] transition-transform"
            >
              <div className="bg-white/20 p-2 rounded-xl">
                <Camera className="w-7 h-7" />
              </div>
              <span className="font-jakarta text-xl font-semibold text-left leading-tight">Buka Kamera AR</span>
            </Link>
            {/* Secondary CTA: Manual Search */}
            <button className="bg-surface-container-lowest border border-outline-variant p-5 rounded-3xl flex flex-col items-start justify-between min-h-[140px] active:scale-[0.98] transition-transform">
              <div className="bg-surface-mint p-2 rounded-xl">
                <Search className="w-7 h-7 text-surface-tint" />
              </div>
              <span className="font-jakarta text-xl font-semibold text-left leading-tight text-on-surface">Cari Manual</span>
            </button>
          </div>
        </section>

        {/* Makan Terakhir */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-jakarta text-xl font-semibold text-on-background">Makan Terakhir</h3>
            <Link to="/history" className="text-surface-tint font-jakarta text-xs font-bold tracking-[0.05em] uppercase">
              LIHAT SEMUA
            </Link>
          </div>
          {lastMeal && (
            <div className="bg-surface-container-lowest p-4 rounded-2xl flex items-center gap-4 border border-outline-variant active:scale-[0.98] transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-surface-mint overflow-hidden flex-shrink-0">
                <img
                  alt={lastMeal.food_name}
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC6njX14SUmm0VyiKTFRaVO27xb06dQnEqojl_ZaOUty_ROfMpFKLh0XGJFuNSQNf-SZFUdKvYp0KEKMuaD4HI1SMvLnlSj_xxrt6G8bF12iCj3hf7StGGN7o7EdXmn1h750lm-WBN5TZ0JSreg0_jMLVhKXqp2ptsO9uTGbrv64mLh1FAZgEfOo_CTzA9AO_DYdtTIxWwGYi4V51vccPcgUc1zuOlp4WRp5shxAU-ABmae9dcEjsGSukt9oRqcQLTG7N1wQMDInc"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-jakarta text-base font-bold text-on-surface truncate">
                  {lastMeal.food_name}
                </h4>
                <p className="font-jakarta text-sm text-on-surface-variant">
                  {lastMeal.category === 'Breakfast' ? 'Sarapan' :
                   lastMeal.category === 'Lunch' ? 'Makan Siang' :
                   lastMeal.category === 'Dinner' ? 'Makan Malam' : 'Camilan'}
                  {' \u2022 '}
                  {lastMeal.createdAt}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="font-jakarta text-lg font-semibold text-surface-tint">{formatNumber(lastMeal.calories)}</span>
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
