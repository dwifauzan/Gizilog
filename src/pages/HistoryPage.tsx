import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn, formatNumber, sumNutrition } from '../lib/utils';
import { MOCK_TODAY_LOG, MOCK_USER } from '../lib/data';
import { useIsMobile } from '../hooks/useIsMobile';

const DAYS = ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'];

export function HistoryPage() {
  const isMobile = useIsMobile();
  const [selectedDay, setSelectedDay] = useState(3);
  const totals = sumNutrition(MOCK_TODAY_LOG.items);
  const caloriePercent = Math.round((totals.calories / MOCK_USER.dailyCalorieTarget) * 100);
  const circumference = 2 * Math.PI * 34;
  const offset = circumference - (caloriePercent / 100) * circumference;

  if (!isMobile) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500">Riwayat makanan</p>
          <h1 className="text-2xl font-extrabold text-dark">Riwayat Makan</h1>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <p className="text-gray-600">Desktop view coming soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-jakarta bg-background min-h-screen pb-32">
      <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center w-full px-6 py-4">
        <div className="flex items-center">
          <h1 className="font-jakarta text-headline-lg font-bold text-primary">GiziLog</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors active:scale-95 text-on-surface-variant">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="px-6 mt-4 space-y-6">
        <section>
          <h2 className="font-jakarta text-headline-xl-mobile text-on-surface">Riwayat Makan</h2>
        </section>

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
                    : 'bg-surface-container border border-transparent hover:border-primary/20'
                )}
              >
                <span className={cn(
                  'font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase',
                  selectedDay === idx ? 'opacity-80' : 'text-on-surface-variant'
                )}>
                  {day}
                </span>
                <span className="font-jakarta text-headline-md">{12 + idx}</span>
                {selectedDay === idx && (
                  <div className="w-1 h-1 bg-on-primary-container rounded-full mt-1" />
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <div className="col-span-2 bento-card bg-surface-mint p-5 rounded-[24px] border border-outline-variant flex justify-between items-center">
            <div>
              <p className="font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase text-primary mb-1">
                Total Kalori
              </p>
              <p className="font-jakarta text-headline-xl-mobile text-on-primary-container">
                {formatNumber(totals.calories)}{' '}
                <span className="text-body-md opacity-70">kkal</span>
              </p>
              <p className="font-jakarta text-body-md text-on-surface-variant mt-1">
                {caloriePercent}% dari target harian
              </p>
            </div>
            <div className="relative w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  className="text-primary/10"
                  cx="40"
                  cy="40"
                  fill="transparent"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <circle
                  className="text-primary transition-all duration-700"
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
                <span className="material-symbols-outlined text-primary text-2xl">restaurant</span>
              </div>
            </div>
          </div>

          <div className="bento-card bg-surface-container-lowest p-4 rounded-[24px] border border-outline-variant">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span className="font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase text-on-surface-variant">
                PROTEIN
              </span>
            </div>
            <p className="font-jakarta text-data-display">
              {formatNumber(totals.protein)}g{' '}
              <span className="text-body-md opacity-50">/ 120g</span>
            </p>
          </div>

          <div className="bento-card bg-surface-container-lowest p-4 rounded-[24px] border border-outline-variant">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-tertiary" />
              <span className="font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase text-on-surface-variant">
                KARBO
              </span>
            </div>
            <p className="font-jakarta text-data-display">
              {formatNumber(totals.carbs)}g{' '}
              <span className="text-body-md opacity-50">/ 200g</span>
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-jakarta text-headline-md text-on-surface">Timeline Makan</h3>
            <span className="material-symbols-outlined text-on-surface-variant">filter_list</span>
          </div>

          <div className="relative pl-4 space-y-8 before:content-[''] before:absolute before:left-0 before:top-4 before:bottom-4 before:w-0.5 before:bg-outline-variant">
            {MOCK_TODAY_LOG.items.map((item) => (
              <div key={item.id} className="relative">
                <div className="absolute -left-[21px] top-4 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
                <div className="flex gap-4 p-4 bg-surface-container-lowest rounded-[24px] border border-outline-variant bento-card">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-surface-mint flex items-center justify-center">
                    <span className="material-symbols-filled text-3xl text-primary">restaurant</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase text-on-surface-variant mb-0.5">
                          {item.createdAt} &bull;{' '}
                          {item.category === 'Breakfast' ? 'SARAPAN' :
                           item.category === 'Lunch' ? 'MAKAN SIANG' :
                           item.category === 'Dinner' ? 'MAKAN MALAM' : 'CAMILAN'}
                        </p>
                        <h4 className="font-jakarta text-headline-md text-on-surface leading-tight">
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
                    <p className="font-jakarta text-body-md text-primary font-semibold mt-1">
                      {formatNumber(item.calories)} kkal
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Link
          to="/scan"
          className="w-full py-5 bg-secondary-container text-on-secondary-container rounded-full font-jakarta text-headline-md flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-secondary-container/20"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            add_circle
          </span>
          Tambah Log Baru
        </Link>
      </main>
    </div>
  );
}
