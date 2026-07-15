import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Filter, PlusCircle, Utensils } from 'lucide-react';
import { cn, formatNumber, sumNutrition } from '../lib/utils';
import { MOCK_TODAY_LOG, MOCK_USER } from '../lib/data';

const DAYS = ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'];

export function MobileHistory() {
  const [selectedDay, setSelectedDay] = useState(3);
  const totals = sumNutrition(MOCK_TODAY_LOG.items);
  const caloriePercent = Math.round((totals.calories / MOCK_USER.dailyCalorieTarget) * 100);
  const circumference = 2 * Math.PI * 34;
  const offset = circumference - (caloriePercent / 100) * circumference;

  return (
    <div className="font-jakarta bg-background text-on-background min-h-screen pb-24">
      {/* Top App Bar */}
      <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center w-full px-6 py-4">
        <div className="flex items-center">
          <h1 className="font-jakarta text-2xl font-bold text-surface-tint">GiziLog</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors active:scale-95 text-on-surface-variant">
          <Bell className="w-5 h-5" />
        </button>
      </header>

      <main className="px-6 mt-4 space-y-6">
        {/* Header & Title */}
        <section>
          <h2 className="font-jakarta text-[26px] leading-8 font-bold text-on-surface">Riwayat Makan</h2>
        </section>

        {/* Date Selector */}
        <section className="overflow-x-auto no-scrollbar -mx-6 px-6 py-2">
          <div className="flex gap-3">
            {DAYS.map((day, idx) => (
              <button
                key={day}
                onClick={() => setSelectedDay(idx)}
                className={cn(
                  'flex-shrink-0 w-14 h-20 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer',
                  selectedDay === idx
                    ? 'bg-primary-container text-on-primary-container shadow-md scale-105'
                    : 'bg-surface-container border border-transparent hover:border-surface-tint/20'
                )}
              >
                <span className={cn(
                  'font-jakarta text-xs font-bold tracking-[0.05em] uppercase',
                  selectedDay === idx ? 'opacity-80' : 'text-on-surface-variant'
                )}>
                  {day}
                </span>
                <span className="font-jakarta text-xl font-semibold">{12 + idx}</span>
                {selectedDay === idx && (
                  <div className="w-1 h-1 bg-on-primary-container rounded-full mt-1" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Summary Cards */}
        <section className="grid grid-cols-2 gap-4">
          {/* Calorie Card */}
          <div className="col-span-2 bg-surface-mint p-5 rounded-[24px] border border-outline-variant flex justify-between items-center active:scale-[0.98] transition-transform">
            <div>
              <p className="font-jakarta text-xs font-bold tracking-[0.05em] uppercase text-surface-tint mb-1">
                Total Kalori
              </p>
              <p className="font-jakarta text-[26px] leading-8 font-bold text-on-primary-container">
                {formatNumber(totals.calories)}{' '}
                <span className="text-sm font-normal opacity-70">kkal</span>
              </p>
              <p className="font-jakarta text-sm text-on-surface-variant mt-1">
                {caloriePercent}% dari target harian
              </p>
            </div>
            <div className="relative w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  className="text-surface-tint/10"
                  cx="40"
                  cy="40"
                  fill="transparent"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <circle
                  className="text-surface-tint transition-all duration-700"
                  cx="40"
                  cy="40"
                  fill="transparent"
                  r="34"
                  stroke="currentColor"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  strokeWidth="8"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Utensils className="w-6 h-6 text-surface-tint" />
              </div>
            </div>
          </div>

          {/* Protein Card */}
          <div className="bg-surface-container-lowest p-4 rounded-[24px] border border-outline-variant active:scale-[0.98] transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span className="font-jakarta text-xs font-bold tracking-[0.05em] uppercase text-on-surface-variant">
                PROTEIN
              </span>
            </div>
            <p className="font-jakarta text-lg font-semibold">
              {formatNumber(totals.protein)}g{' '}
              <span className="text-sm font-normal opacity-50">/ 120g</span>
            </p>
          </div>

          {/* Carbs Card */}
          <div className="bg-surface-container-lowest p-4 rounded-[24px] border border-outline-variant active:scale-[0.98] transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-tertiary" />
              <span className="font-jakarta text-xs font-bold tracking-[0.05em] uppercase text-on-surface-variant">
                KARBO
              </span>
            </div>
            <p className="font-jakarta text-lg font-semibold">
              {formatNumber(totals.carbs)}g{' '}
              <span className="text-sm font-normal opacity-50">/ 200g</span>
            </p>
          </div>
        </section>

        {/* Timeline List */}
        <section className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-jakarta text-xl font-semibold text-on-surface">Timeline Makan</h3>
            <Filter className="w-5 h-5 text-on-surface-variant" />
          </div>

          <div className="relative pl-4 space-y-8 before:content-[''] before:absolute before:left-0 before:top-4 before:bottom-4 before:w-0.5 before:bg-outline-variant">
            {MOCK_TODAY_LOG.items.map((item) => (
              <div key={item.id} className="relative">
                <div className="absolute -left-[21px] top-4 w-3 h-3 rounded-full bg-surface-tint ring-4 ring-background" />
                <div className="flex gap-4 p-4 bg-surface-container-lowest rounded-[24px] border border-outline-variant active:scale-[0.98] transition-transform">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-surface-mint flex items-center justify-center">
                    <img
                      alt={item.food_name}
                      className="w-full h-full object-cover"
                      src={
                        item.category === 'Breakfast'
                          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6gQLb2PanZr7fzuJix5HjtdYZmGYADrBkrOeCRio8U2kJLlt2NpPsPEITi9wIgy46O3s5SVJDR_l6CiM7K1rpiwJOXtj_tLhq1hTcrEfW41TnqCBPNL2eTCBe89pFDSVonFQcWidNBc1d20g2RWqUE2T8idDoG7HIOwy9iePCSdZosV4oBlqaIQ9diJrNf7jXemCVZT_LmUTZ2O3qfVkRFT4bC5cXu2UoIVVV17IooTcOEGiejrORC_lwwi0T412x7ToxZkOpFkU'
                          : item.category === 'Lunch'
                          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQYoVdK2169zyhPFvJv8cBlKnGlo_W06CN88GrdfbrBEbWW4R3IJ32MKjIXUj3gPw9yy1ZsmG3XUlTNpLLGUGai9ZeCQ4o0qLvKg6XeiNLrxf0Ec7_MqI3L2drqtCSGW1tAejRAQ9lDRq2zhVh2ok1gxahyR8g7jkDv64sUBQUkCCGZM-0YVQOIxDgPRExdPRJomLJLIojlYCNGU0OnAbPhlCWBwitdWaWOBtEach0Eejgfl3TOPg9XubZxZJ2VU0EpV0WfiIrf4I'
                          : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuF1oYtur8EuyHXoXHv70VCPgnMnELYZiXzjvJrJIrPKFL_Jbdj-XNARWsab-nhnmXb_IoqPQxYZAxggU1vuGMIqFy9skIkGaTVlR_YDp_ZcmEwuVZaIZmuXYofkbo2bbX3YSuvuAhETA0xZ7nxhAEkEUbAT5Ugr0YvlOZNRiNVYe6KHoHWdkyylXpvH0B1XaK6AMn78HTZAZ125A99nlkY2TqA3-oPS5R-RQ8XK2cB5yi3EXc5_WOTSE9oYq07PWdUys2oo2q1hw'
                      }
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-jakarta text-xs font-bold tracking-[0.05em] uppercase text-on-surface-variant mb-0.5">
                          {item.createdAt} &bull;{' '}
                          {item.category === 'Breakfast' ? 'SARAPAN' :
                           item.category === 'Lunch' ? 'MAKAN SIANG' :
                           item.category === 'Dinner' ? 'MAKAN MALAM' : 'CAMILAN'}
                        </p>
                        <h4 className="font-jakarta text-xl font-semibold text-on-surface leading-tight">
                          {item.food_name}
                        </h4>
                      </div>
                      <div
                        className={cn(
                          'w-3 h-3 rounded-full shadow-[0_0_8px_rgba(76,175,80,0.4)]',
                          item.calories < 400 ? 'bg-status-success' : 'bg-status-warning'
                        )}
                      />
                    </div>
                    <p className="font-jakarta text-sm text-surface-tint font-semibold mt-1">
                      {formatNumber(item.calories)} kkal
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Log Additional Button */}
        <Link
          to="/scan"
          className="w-full py-5 bg-secondary-container text-on-secondary-container rounded-full font-jakarta text-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-secondary-container/20"
        >
          <PlusCircle className="w-6 h-6" />
          Tambah Log Baru
        </Link>
      </main>
    </div>
  );
}
