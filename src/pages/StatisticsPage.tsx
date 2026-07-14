import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { TrendingUp, Sparkles, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { useIsMobile } from '../hooks/useIsMobile';
import { MOCK_AI_INSIGHT, MOCK_USER, MOCK_WEEKLY_STATS, MOCK_WEIGHT_STATS } from '../lib/data';

export function StatisticsPage() {
  const isMobile = useIsMobile();
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-32">
        {/* Top App Bar */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/20 px-6 py-4 flex justify-between items-center">
          <h1 className="font-jakarta text-headline-md font-bold text-primary">GiziLog</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors active:scale-95 duration-200">
            <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="pt-24 px-6 max-w-lg mx-auto">
          <div className="flex flex-col gap-6">
            {/* Page Title & Period Switcher */}
            <div className="flex flex-col gap-4">
              <h2 className="font-jakarta text-headline-md text-on-surface">Statistik Gizi</h2>
              <div className="bg-surface-container p-1 rounded-xl flex items-center">
                <button
                  onClick={() => setPeriod('weekly')}
                  className={cn(
                    'flex-1 py-2 text-center font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase rounded-lg transition-all',
                    period === 'weekly'
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  )}
                >
                  Mingguan
                </button>
                <button
                  onClick={() => setPeriod('monthly')}
                  className={cn(
                    'flex-1 py-2 text-center font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase rounded-lg transition-all',
                    period === 'monthly'
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  )}
                >
                  Bulanan
                </button>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Primary Chart Card (Full Width) */}
              <div className="col-span-2 bento-card bg-surface-container-lowest p-card-padding rounded-[24px] border border-outline-variant/20 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase text-text-muted mb-1">
                      TREN KALORI
                    </p>
                    <p className="font-jakarta text-data-display text-on-surface">
                      Avg: {Math.round(MOCK_WEEKLY_STATS.reduce((a, b) => a + b.calories, 0) / MOCK_WEEKLY_STATS.length).toLocaleString()} kkal
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-status-success font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    <span>3%</span>
                  </div>
                </div>

                {/* Simplified Chart Visualization */}
                <div className="h-40 w-full flex items-end justify-between gap-2 px-2">
                  {MOCK_WEEKLY_STATS.map((stat, idx) => {
                    const maxCalories = Math.max(...MOCK_WEEKLY_STATS.map(s => s.calories));
                    const heightPercent = (stat.calories / maxCalories) * 100;
                    const isToday = idx === 5; // Saturday as "today"
                    return (
                      <div key={stat.day} className="flex flex-col items-center gap-2 flex-1 group">
                        <div
                          className={cn(
                            'w-full rounded-t-lg transition-all',
                            isToday
                              ? 'bg-primary-container/40 border-t-4 border-primary'
                              : 'bg-primary-container/20 group-hover:bg-primary-container'
                          )}
                          style={{ height: `${heightPercent}%` }}
                        />
                        <span
                          className={cn(
                            'font-jakarta text-[10px]',
                            isToday ? 'text-primary font-bold' : 'text-text-muted'
                          )}
                        >
                          {stat.day.charAt(0)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Macro Balance Card */}
              <div className="col-span-1 bento-card bg-surface-mint p-card-padding rounded-[24px] flex flex-col justify-between">
                <div>
                  <p className="font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase text-primary/80 mb-3">
                    MAKRONUTRISI
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-jakarta text-body-md text-on-surface">Protein</span>
                      <span className="font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-jakarta text-body-md text-on-surface">Lemak</span>
                      <span className="font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase">30%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-jakarta text-body-md text-on-surface">Karbo</span>
                      <span className="font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase">45%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-primary/10">
                  <div className="h-2 w-full bg-white/50 rounded-full overflow-hidden flex">
                    <div className="h-full bg-primary" style={{ width: '25%' }} />
                    <div className="h-full bg-secondary-container" style={{ width: '30%' }} />
                    <div className="h-full bg-tertiary-container" style={{ width: '45%' }} />
                  </div>
                </div>
              </div>

              {/* Water Tracking Card */}
              <div className="col-span-1 bento-card bg-surface-container-lowest p-card-padding rounded-[24px] border border-outline-variant/20 shadow-sm flex flex-col justify-between">
                <div>
                  <p className="font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase text-text-muted mb-2">
                    HIDRASI
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-blue-500"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      water_drop
                    </span>
                    <span className="font-jakarta text-headline-md text-on-surface">2.4L</span>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  <div className="h-1 flex-1 bg-blue-400 rounded-full" />
                  <div className="h-1 flex-1 bg-blue-400 rounded-full" />
                  <div className="h-1 flex-1 bg-blue-400 rounded-full" />
                  <div className="h-1 flex-1 bg-blue-200 rounded-full" />
                  <div className="h-1 flex-1 bg-blue-200 rounded-full" />
                </div>
                <p className="font-jakarta text-[10px] text-text-muted mt-2">Target harian: 2.5L</p>
              </div>

              {/* Insights Card (Full Width) */}
              <div className="col-span-2 bento-card bg-primary text-on-primary p-card-padding rounded-[24px] overflow-hidden relative">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-primary-fixed">auto_awesome</span>
                    <p className="font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase text-primary-fixed">
                      GIZILOG INSIGHT
                    </p>
                  </div>
                  <p className="font-jakarta text-body-lg leading-relaxed mb-1">
                    "Asupan serat Anda meningkat <span className="font-bold text-primary-fixed">15%</span> minggu ini! Terus pertahankan konsumsi sayuran hijau Anda."
                  </p>
                </div>
                {/* Abstract Background Shape */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container rounded-full blur-3xl opacity-20 -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-fixed rounded-full blur-3xl opacity-10 -ml-12 -mb-12" />
              </div>

              {/* Detailed Metrics Mini Cards */}
              <div className="col-span-1 bento-card bg-surface-container-low p-card-padding rounded-[24px] border border-outline-variant/10">
                <p className="font-jakarta text-[10px] text-text-muted mb-1">RATIO SODIUM</p>
                <p className="font-jakarta text-headline-md text-status-warning">1.2g</p>
                <p className="font-jakarta text-[10px] text-status-warning mt-1">Normal Tinggi</p>
              </div>
              <div className="col-span-1 bento-card bg-surface-container-low p-card-padding rounded-[24px] border border-outline-variant/10">
                <p className="font-jakarta text-[10px] text-text-muted mb-1">VITAMIN C</p>
                <p className="font-jakarta text-headline-md text-status-success">110%</p>
                <p className="font-jakarta text-[10px] text-status-success mt-1">Target Tercapai</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm text-gray-500">Analisis jangka panjang</p>
        <h1 className="text-2xl font-extrabold text-dark">Statistik & Analitik</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 mb-1">Rata-rata Kalori</p>
          <p className="text-2xl font-extrabold text-dark">
            {Math.round(MOCK_WEEKLY_STATS.reduce((a, b) => a + b.calories, 0) / MOCK_WEEKLY_STATS.length)}
          </p>
          <p className="text-xs text-gray-400">kkal/hari</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 mb-1">Target Harian</p>
          <p className="text-2xl font-extrabold text-dark">{MOCK_USER.dailyCalorieTarget}</p>
          <p className="text-xs text-gray-400">kkal</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 mb-1">Protein Rata-rata</p>
          <p className="text-2xl font-extrabold text-dark">
            {Math.round(MOCK_WEEKLY_STATS.reduce((a, b) => a + b.protein, 0) / MOCK_WEEKLY_STATS.length)}
          </p>
          <p className="text-xs text-gray-400">g/hari</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 mb-1">Berat Terkini</p>
          <p className="text-2xl font-extrabold text-dark">{MOCK_WEIGHT_STATS[MOCK_WEIGHT_STATS.length - 1].weight}</p>
          <p className="text-xs text-gray-400">kg</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Charts */}
        <div className="lg:col-span-3 space-y-6">
          {/* Weekly Macro Bar Chart */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-extrabold text-dark">Tren Makronutrisi Mingguan</h2>
            </div>
            <div className="h-[280px] sm:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_WEEKLY_STATS} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    cursor={{ fill: '#F9FAFB' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: 16 }} />
                  <Bar dataKey="protein" name="Protein (g)" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="fat" name="Lemak (g)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="carbs" name="Karbo (g)" fill="#22C55E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Calorie Bar Chart */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-extrabold text-dark mb-4">Kalori Harian vs Target</h2>
            <div className="h-[240px] sm:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_WEEKLY_STATS} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    cursor={{ fill: '#F9FAFB' }}
                  />
                  <Bar
                    dataKey="calories"
                    name="Kalori (kkal)"
                    fill="#22C55E"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Side Panel - Gizi Insight + Weight */}
        <div className="space-y-6">
          {/* AI Insight */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-5 sm:p-6 border border-primary/10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-extrabold text-dark">Gizi Insight</h2>
            </div>
            <h3 className="text-sm font-bold text-dark mb-2">{MOCK_AI_INSIGHT.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{MOCK_AI_INSIGHT.message}</p>
            <div className="bg-white/70 rounded-xl p-4">
              <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">Rekomendasi</p>
              <p className="text-sm text-gray-700 leading-relaxed">{MOCK_AI_INSIGHT.recommendation}</p>
            </div>
          </div>

          {/* Weight Area Chart */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-accent" />
              <h2 className="text-base font-extrabold text-dark">Fluktuasi Berat</h2>
            </div>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_WEIGHT_STATS} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="weight"
                    name="Berat (kg)"
                    stroke="#2563EB"
                    fill="#2563EB"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
