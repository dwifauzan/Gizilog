import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Weight, Ruler, Calendar, Activity, Leaf, HelpCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { calculateDailyCalories } from '../lib/utils';
import type { UserProfile } from '../types';

type RegisterForm = Partial<UserProfile> & { password?: string };

export function RegisterMobile() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'account' | 'profile'>('account');
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    setTimeout(() => {
      const { password: _password, ...profile } = form;
      void _password;
      const target = calculateDailyCalories(profile as Omit<UserProfile, 'dailyCalorieTarget'>);
      console.log('Registered user with daily target:', target);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface">
      {/* Top AppBar */}
      <header className="flex justify-between items-center px-6 h-16 w-full z-40 bg-surface">
        <h1 className="font-jakarta text-2xl font-bold text-surface-tint">GiziLog</h1>
        <button className="p-2 rounded-full hover:bg-surface-mint transition-colors active:scale-[0.98]">
          <HelpCircle className="w-5 h-5 text-surface-tint" />
        </button>
      </header>

      <main className="flex-grow px-6 pt-4 pb-12">
        <div className="max-w-md mx-auto space-y-4">
          {/* Hero Bento Card */}
          <div className="bg-primary-container text-on-primary-container relative overflow-hidden h-40 rounded-[24px] p-5 flex flex-col justify-end">
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-on-primary-fixed-variant/20 rounded-full blur-2xl" />
            <div className="absolute top-6 left-6 opacity-30">
              <Leaf className="w-12 h-12" />
            </div>
            <h2 className="font-jakarta text-[26px] leading-8 font-bold z-10">
              {step === 'account' ? 'Mulai Hidup Sehat' : 'Profil Fisik Anda'}
            </h2>
            <p className="font-jakarta text-sm opacity-90 z-10">
              {step === 'account'
                ? 'Gabung dengan komunitas nutrisi cerdas kami hari ini.'
                : 'Lengkapi data untuk target kalori personal.'}
            </p>
          </div>

          {step === 'account' ? (
            <form onSubmit={handleNext} className="space-y-4">
              {/* Input Fields Bento */}
              <div className="bg-surface-container-lowest rounded-[24px] p-5 space-y-4">
                {/* Name */}
                <div>
                  <label className="font-jakarta text-xs font-bold text-on-surface-variant block mb-2 px-2 tracking-wider uppercase">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Masukkan nama anda"
                      className="w-full bg-surface-mint border-none rounded-2xl px-5 py-3.5 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-surface-tint/20 transition-all"
                      required
                    />
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="font-jakarta text-xs font-bold text-on-surface-variant block mb-2 px-2 tracking-wider uppercase">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="contoh@gizilog.com"
                      className="w-full bg-surface-mint border-none rounded-2xl px-5 py-3.5 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-surface-tint/20 transition-all"
                      required
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="font-jakarta text-xs font-bold text-on-surface-variant block mb-2 px-2 tracking-wider uppercase">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => update('password', e.target.value)}
                      placeholder="Min. 8 karakter"
                      className="w-full bg-surface-mint border-none rounded-2xl px-5 py-3.5 pr-12 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-surface-tint/20 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms & Consent Bento */}
              <div className="bg-surface-mint/50 rounded-[24px] p-5 py-4">
                <label className="flex items-start space-x-4 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-5 w-5 rounded border-outline-variant text-surface-tint focus:ring-surface-tint/20 bg-surface"
                    required
                  />
                  <span className="font-jakarta text-sm text-on-surface-variant select-none">
                    Setuju dengan <span className="text-surface-tint font-bold">syarat dan ketentuan</span> GiziLog serta kebijakan privasi kami.
                  </span>
                </label>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-secondary-container text-on-secondary font-jakarta font-semibold text-xl py-4 rounded-full shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center space-x-2"
                >
                  <span>Lanjutkan</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Profile Fields Bento */}
              <div className="bg-surface-container-lowest rounded-[24px] p-5 space-y-4">
                {/* Weight & Height */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-jakarta text-xs font-bold text-on-surface-variant block mb-2 px-2 tracking-wider uppercase">
                      Berat (kg)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={form.weight}
                        onChange={(e) => update('weight', Number(e.target.value))}
                        className="w-full bg-surface-mint border-none rounded-2xl px-5 py-3.5 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-surface-tint/20 transition-all"
                        required
                      />
                      <Weight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40" />
                    </div>
                  </div>
                  <div>
                    <label className="font-jakarta text-xs font-bold text-on-surface-variant block mb-2 px-2 tracking-wider uppercase">
                      Tinggi (cm)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={form.height}
                        onChange={(e) => update('height', Number(e.target.value))}
                        className="w-full bg-surface-mint border-none rounded-2xl px-5 py-3.5 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-surface-tint/20 transition-all"
                        required
                      />
                      <Ruler className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40" />
                    </div>
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="font-jakarta text-xs font-bold text-on-surface-variant block mb-2 px-2 tracking-wider uppercase">
                    Usia (tahun)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={form.age}
                      onChange={(e) => update('age', Number(e.target.value))}
                      className="w-full bg-surface-mint border-none rounded-2xl px-5 py-3.5 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-surface-tint/20 transition-all"
                      required
                    />
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40" />
                  </div>
                </div>

                {/* Activity Level */}
                <div>
                  <label className="font-jakarta text-xs font-bold text-on-surface-variant block mb-2 px-2 tracking-wider uppercase">
                    Tingkat Aktivitas
                  </label>
                  <div className="relative">
                    <select
                      value={form.activityLevel}
                      onChange={(e) => update('activityLevel', e.target.value)}
                      className="w-full bg-surface-mint border-none rounded-2xl px-5 py-3.5 font-jakarta text-sm focus:outline-none focus:ring-2 focus:ring-surface-tint/20 transition-all appearance-none"
                    >
                      <option value="sedentary">Sedentari</option>
                      <option value="light">Ringan</option>
                      <option value="moderate">Sedang</option>
                      <option value="active">Aktif</option>
                      <option value="very_active">Sangat Aktif</option>
                    </select>
                    <Activity className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('account')}
                  className="flex-1 py-4 rounded-full border border-outline-variant bg-surface-container-lowest font-jakarta font-semibold text-base text-on-surface active:scale-[0.98] transition-transform"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-secondary-container text-on-secondary font-jakarta font-semibold text-xl py-4 rounded-full shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </span>
                  ) : (
                    <>
                      <span>Daftar</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Secondary Action */}
          <div className="text-center py-4">
            <p className="font-jakarta text-sm text-on-surface-variant">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-surface-tint font-bold hover:underline">
                Masuk
              </Link>
            </p>
          </div>

          {/* Visual Asset - Meal Prep Context */}
          <div className="h-48 relative overflow-hidden rounded-[24px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAMDu4fpdqnO4IjHUCryS83B1iMFsFWl5lD1j6pLJO2S2TD23kAIAYW38GJemosXAUZ2SnwfRbtHlT5j72h8dI1K83LVNYYZWJiilv4PkJ8YL4qg1KqgMtQ8-SPo0rjsJUSwEozBWX1fxq8QM2BoVTY83ibOPOcRH5nRRNGA7ZllwHcfKVxstOnuvtfWQXZJW84Ou6BrlB4kNgCOsSdOSOJkUBHQ_OG_EH6txsqafvRv2fvtq5p8zf9LnTB_YNFXInBzLldAVK8rbg')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full">
              <CheckCircle className="w-[18px] h-[18px] text-surface-tint" />
              <span className="font-jakarta text-xs font-bold text-surface-tint">Nutritionally Verified</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Decoration */}
      <footer className="h-16 flex items-center justify-center opacity-40">
        <div className="flex space-x-4">
          <div className="w-2 h-2 rounded-full bg-surface-tint" />
          <div className="w-2 h-2 rounded-full bg-surface-tint" />
          <div className="w-2 h-2 rounded-full bg-surface-tint" />
        </div>
      </footer>
    </div>
  );
}
