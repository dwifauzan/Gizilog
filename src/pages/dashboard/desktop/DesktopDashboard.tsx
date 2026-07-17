import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { cn, formatNumber } from '../../../lib/utils';
import { MOCK_TODAY_LOG, MOCK_USER, MOCK_WEEKLY_STATS } from '../../../lib/data';

const MACRO_TARGETS = {
  carbs: { target: 250, label: 'KARBOHIDRAT' },
  protein: { target: 150, label: 'PROTEIN' },
  fat: { target: 70, label: 'LEMAK' },
};

const MACRO_COLORS: Record<keyof typeof MACRO_TARGETS, { bg: string; text: string; bar: string }> = {
  carbs: { bg: 'bg-secondary-fixed', text: 'text-on-secondary-fixed', bar: 'bg-secondary-container' },
  protein: { bg: 'bg-primary-fixed', text: 'text-on-primary-fixed', bar: 'bg-primary-container' },
  fat: { bg: 'bg-tertiary-fixed', text: 'text-on-tertiary-fixed', bar: 'bg-tertiary-container' },
};

const TABLE_DATA = [
  {
    id: 't1',
    name: 'Grilled Salmon Salad',
    category: 'Lunch',
    weight: '320g',
    time: '12:45 PM',
    calories: 450,
    macros: { c: 12, p: 35, f: 22 },
    score: 'A+',
    scoreColor: 'bg-status-success text-status-success',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop',
  },
  {
    id: 't2',
    name: 'Avocado Egg Toast',
    category: 'Breakfast',
    weight: '210g',
    time: '08:15 AM',
    calories: 380,
    macros: { c: 45, p: 18, f: 15 },
    score: 'A',
    scoreColor: 'bg-status-success text-status-success',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414395d8?w=200&h=200&fit=crop',
  },
  {
    id: 't3',
    name: 'Chocolate Glazed Donut',
    category: 'Snack',
    weight: '85g',
    time: '04:30 PM',
    calories: 290,
    macros: { c: 58, p: 4, f: 12 },
    score: 'C-',
    scoreColor: 'bg-status-error text-status-error',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop',
  },
];

const WATER_GOAL = 3.0;
const WATER_CURRENT = 2.4;

export function DesktopDashboard() {
  const [period, setPeriod] = useState<'7' | '30'>('7');
  const avgCalories = Math.round(
    MOCK_WEEKLY_STATS.reduce((a, b) => a + b.calories, 0) / MOCK_WEEKLY_STATS.length
  );
  const maxCalories = Math.max(...MOCK_WEEKLY_STATS.map((d) => d.calories));

  const totalMacros = MOCK_TODAY_LOG.items.reduce(
    (acc, item) => ({
      carbs: acc.carbs + item.carbs,
      protein: acc.protein + item.protein,
      fat: acc.fat + item.fat,
    }),
    { carbs: 0, protein: 0, fat: 0 }
  );

  const waterPercentage = (WATER_CURRENT / WATER_GOAL) * 100;
  const waterCircumference = 2 * Math.PI * 36;
  const waterOffset = waterCircumference - (waterPercentage / 100) * waterCircumference;

  return (
    <div className="font-jakarta text-on-surface bg-background min-h-screen">
        {/* Top App Bar */}
        <header className="flex justify-between items-center h-16 px-6 sticky top-0 bg-surface-bright/80 backdrop-blur-md z-40 border-b border-outline-variant">
        <div className="flex items-center flex-grow max-w-xl">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              type="text"
              placeholder="Cari makanan atau nutrisi..."
              className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 text-body-md font-body-md outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hover:bg-surface-container-high rounded-full p-2 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
          </button>
          <Link
            to="/profile"
            className="hover:bg-surface-container-high rounded-full p-2 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-on-surface-variant">settings</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="p-6 space-y-4">
        {/* Page Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface">Dashboard Analytics</h2>
            <p className="font-body-lg text-body-lg text-text-muted">Statistik kesehatan Anda dalam 7 hari terakhir.</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPeriod('7')}
              className={cn(
                'border px-4 py-2 rounded-lg font-label-caps text-label-caps transition-colors',
                period === '7'
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface-container-lowest border-outline-variant hover:bg-surface-container-high text-on-surface'
              )}
            >
              7 HARI
            </button>
            <button
              type="button"
              onClick={() => setPeriod('30')}
              className={cn(
                'border px-4 py-2 rounded-lg font-label-caps text-label-caps transition-colors',
                period === '30'
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface-container-lowest border-outline-variant hover:bg-surface-container-high text-on-surface'
              )}
            >
              30 HARI
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Weekly Calorie Trend Chart */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-[24px] p-5 border border-outline-variant transition-colors hover:border-primary-container">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-headline-md text-headline-md">Tren Kalori Mingguan</h3>
                <p className="font-body-md text-body-md text-text-muted">Target harian: {MOCK_USER.dailyCalorieTarget.toLocaleString()} kcal</p>
              </div>
              <div className="text-right">
                <span className="text-status-success font-bold text-headline-md">Avg. {avgCalories.toLocaleString()}</span>
                <p className="font-label-caps text-label-caps text-text-muted">KCAL / HARI</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_WEEKLY_STATS} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#5F6368' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#5F6368' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: '#F3F4F5' }}
                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    formatter={(value) => [`${value} kcal`, 'Kalori']}
                  />
                  <Bar dataKey="calories" radius={[6, 6, 0, 0]}>
                    {MOCK_WEEKLY_STATS.map((entry) => (
                      <Cell
                        key={entry.day}
                        fill={entry.calories === maxCalories ? '#34a853' : '#E6F4EA'}
                        className="transition-all hover:fill-primary"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {/* Macro Balance */}
            <div className="bg-surface-container-lowest rounded-[24px] p-5 border border-outline-variant transition-colors hover:border-primary-container">
              <h3 className="font-headline-md text-headline-md mb-4">Keseimbangan Makro</h3>
              <div className="space-y-4">
                {(Object.keys(MACRO_TARGETS) as Array<keyof typeof MACRO_TARGETS>).map((key) => {
                  const current = totalMacros[key];
                  const target = MACRO_TARGETS[key].target;
                  const percent = Math.min((current / target) * 100, 100);
                  const colors = MACRO_COLORS[key];
                  return (
                    <div key={key}>
                      <div className="flex justify-between font-label-caps text-label-caps mb-1">
                        <span>{MACRO_TARGETS[key].label}</span>
                        <span>{formatNumber(current)}g / {target}g</span>
                      </div>
                      <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <div
                          className={cn('h-full rounded-full transition-all duration-500', colors.bar)}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Water Intake */}
            <div className="bg-surface-mint rounded-[24px] p-5 transition-colors hover:bg-surface-mint/80 flex items-center justify-between">
              <div>
                <h3 className="font-headline-md text-headline-md text-primary">Asupan Air</h3>
                <p className="font-data-display text-data-display text-on-surface mt-1">
                  {WATER_CURRENT} / {WATER_GOAL} L
                </p>
                <p className="font-body-md text-body-md text-primary/70 mt-1">Sisa 3 gelas lagi hari ini!</p>
              </div>
              <div className="relative flex items-center justify-center">
                <svg className="w-20 h-20 -rotate-90">
                  <circle cx="40" cy="40" fill="transparent" r="36" stroke="#bdcaba" strokeWidth="8" />
                  <circle
                    cx="40"
                    cy="40"
                    fill="transparent"
                    r="36"
                    stroke="#006e2c"
                    strokeWidth="8"
                    strokeDasharray={waterCircumference}
                    strokeDashoffset={waterOffset}
                    className="transition-all duration-700"
                  />
                </svg>
                <span className="material-symbols-outlined absolute text-primary material-symbols-filled">water_drop</span>
              </div>
            </div>
          </div>

          {/* Detailed Meal History */}
          <div className="col-span-12 bg-surface-container-lowest rounded-[24px] p-5 border border-outline-variant transition-colors hover:border-primary-container">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-headline-md">Riwayat Makan Detail</h3>
              <Link to="/statistics" className="text-primary font-bold font-body-md flex items-center gap-1 hover:underline">
                Lihat Semua <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant">
                    <th className="pb-4 font-label-caps text-label-caps text-text-muted">MAKANAN</th>
                    <th className="pb-4 font-label-caps text-label-caps text-text-muted">WAKTU</th>
                    <th className="pb-4 font-label-caps text-label-caps text-text-muted">KALORI</th>
                    <th className="pb-4 font-label-caps text-label-caps text-text-muted">MAKRO (C/P/F)</th>
                    <th className="pb-4 font-label-caps text-label-caps text-text-muted">SKOR</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {TABLE_DATA.map((item) => (
                    <tr key={item.id} className="group hover:bg-surface-container-low transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover bg-surface-container-high"
                          />
                          <div>
                            <p className="font-headline-md text-[16px] text-on-surface">{item.name}</p>
                            <p className="font-body-md text-body-md text-text-muted">{item.category} • {item.weight}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 font-body-md text-body-md">{item.time}</td>
                      <td className="py-4 font-data-display text-[16px]">{item.calories} kcal</td>
                      <td className="py-4">
                        <div className="flex gap-2 font-label-caps text-[10px]">
                          <span className="bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded">C: {item.macros.c}g</span>
                          <span className="bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded">P: {item.macros.p}g</span>
                          <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded">F: {item.macros.f}g</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className={cn('w-3 h-3 rounded-full', item.scoreColor.split(' ')[0])} />
                          <span className={cn('font-body-md font-bold', item.scoreColor.split(' ')[1])}>{item.score}</span>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          type="button"
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-surface-container-high rounded-full"
                        >
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
  </div>
  );
}
