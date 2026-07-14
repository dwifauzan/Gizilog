import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Eye, EyeOff, Mail, Lock, User, Ruler, Weight, Calendar, Activity } from 'lucide-react';
import { calculateDailyCalories } from '../lib/utils';
import type { UserProfile } from '../types';

type RegisterForm = Partial<UserProfile> & { password?: string };

export function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'account' | 'profile'>('account');
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    weight: 70,
    height: 170,
    age: 24,
    activityLevel: 'moderate',
  });

  const update = (key: keyof RegisterForm, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('profile');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { password: _password, ...profile } = form;
    void _password;
    const target = calculateDailyCalories(profile as Omit<UserProfile, 'dailyCalorieTarget'>);
    console.log('Registered user with daily target:', target);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left - Hero */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center bg-gradient-to-br from-primary/15 to-accent/10 p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center max-w-md">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white">
              <Leaf className="w-7 h-7" />
            </div>
            <span className="text-2xl font-extrabold text-dark">GiziLog</span>
          </div>
          <h2 className="text-3xl font-extrabold text-dark mb-4">
            Foto Nutrisi. <br /> Bebas <span className="text-accent">Stunting</span>.
          </h2>
          <p className="text-gray-600">Buat akun dan dapatkan target kalori personal berdasarkan profil fisikmu.</p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-light overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden items-center gap-2 mb-6 justify-center">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
              <Leaf className="w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold text-dark">GiziLog</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-dark mb-2">Buat Akun</h1>
          <p className="text-sm text-gray-500 mb-6">
            {step === 'account'
              ? 'Langkah 1: Data akun dasar.'
              : 'Langkah 2: Lengkapi profil fisik untuk target kalori.'}
          </p>

          {step === 'account' ? (
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Nama kamu"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
              >
                Lanjutkan
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Berat (kg)</label>
                  <div className="relative">
                    <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={form.weight}
                      onChange={(e) => update('weight', Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tinggi (cm)</label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={form.height}
                      onChange={(e) => update('height', Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Usia (tahun)</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={form.age}
                    onChange={(e) => update('age', Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tingkat Aktivitas</label>
                <div className="relative">
                  <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={form.activityLevel}
                    onChange={(e) => update('activityLevel', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none"
                  >
                    <option value="sedentary">Sedentari</option>
                    <option value="light">Ringan</option>
                    <option value="moderate">Sedang</option>
                    <option value="active">Aktif</option>
                    <option value="very_active">Sangat Aktif</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('account')}
                  className="flex-1 py-3.5 rounded-xl border border-gray-200 bg-white text-dark font-bold text-sm hover:bg-gray-50 transition-colors"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                  Daftar
                </button>
              </div>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-gray-500">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-bold text-primary hover:underline">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
