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
import { MOCK_AI_INSIGHT, MOCK_USER, MOCK_WEEKLY_STATS, MOCK_WEIGHT_STATS } from '../lib/data';

export function StatisticsPage() {
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
