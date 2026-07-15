import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Eye, EyeOff, Mail, Lock, User, Ruler, Weight, Calendar, Activity, Utensils, Users, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';
import { calculateDailyCalories } from '../lib/utils';
import type { UserProfile } from '../types';

type RegisterForm = Partial<UserProfile> & { password?: string };

export function RegisterDesktop() {
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
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Left Side: Bento Cards */}
        <div className="hidden md:flex md:col-span-6 flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Bento 1: Nutrisi Terukur */}
            <div className="h-64 bg-surface-mint p-5 flex flex-col justify-between overflow-hidden relative rounded-[24px] transition-transform active:scale-[0.98]">
              <div className="z-10">
                <Utensils className="w-6 h-6 text-surface-tint mb-2" />
                <h3 className="font-jakarta text-xl font-semibold text-surface-tint">Nutrisi Terukur</h3>
                <p className="font-jakarta text-sm text-on-surface-variant mt-1">Pantau asupan harian dengan presisi computer vision.</p>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-20">
                <Leaf className="w-32 h-32 text-surface-tint" />
              </div>
            </div>

            {/* Bento 2: Image with Verified Badge */}
            <div
              className="h-64 bg-secondary-fixed p-5 flex flex-col justify-between overflow-hidden relative rounded-[24px] bg-cover bg-center transition-transform active:scale-[0.98]"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9eYlajyjQpL6tRxHM1yoD_8Ib3WXLGlPe6Gnk8jkDiZ52P-Y7qQorAc-fS_QXXD0qY00BsKvYfyTefrbd3WNLCJR7PYtbEdgWjBnmpXBfsufeQi2mg3vCBE3FnYw8-iv8tL69HAcz1A9whSBhdtDRor2jIQ5SXba3X-YEyZ6aZBhQ43Yqlx_QnqQrb2jBftpCvSD_se5zfFKHOdvZ2UsJzKxnlY4176FBIjDWxiCqFQdanUgi0k7VpF19XXrgThbArukZgyWT1Ms')",
              }}
            >
              <div className="z-10 bg-white/80 backdrop-blur-sm p-3 rounded-xl self-start">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-fresh-orange" />
                  <span className="font-jakarta text-xs font-bold text-on-secondary-fixed">Nutritiously Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento 3: Users Count */}
          <div className="bg-surface-container-lowest p-5 flex items-center gap-6 border border-outline-variant rounded-[24px] transition-transform active:scale-[0.98]">
            <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0">
              <Users className="w-8 h-8 text-on-primary-fixed" />
            </div>
            <div>
              <h4 className="font-jakarta text-xl font-semibold text-on-surface">150,000+ Pengguna</h4>
              <p className="font-jakarta text-sm text-text-muted">Bergabunglah dengan komunitas kesehatan digital terbesar di Indonesia.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="col-span-1 md:col-span-6 flex justify-center">
          <div className="w-full max-w-[480px] p-10 bg-white shadow-sm border border-outline-variant rounded-[24px]">
            {/* Branding Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 bg-surface-tint rounded-xl flex items-center justify-center mb-4 text-white shadow-lg shadow-surface-tint/20">
                <Leaf className="w-7 h-7" />
              </div>
              <h1 className="font-jakarta text-3xl font-bold text-on-surface text-center">
                {step === 'account' ? 'Mulai Hidup Sehat' : 'Profil Fisik Anda'}
              </h1>
              <p className="font-jakarta text-base text-text-muted text-center mt-2">
                {step === 'account'
                  ? 'Gabung dengan komunitas nutrisi cerdas kami'
                  : 'Lengkapi data untuk target kalori personal'}
              </p>
            </div>

            {step === 'account' ? (
              <form onSubmit={handleNext} className="space-y-5">
                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <label className="font-jakarta text-xs font-bold text-on-surface-variant px-1 tracking-wider uppercase">
                    NAMA LENGKAP
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-tint" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Budi Santoso"
                      className="w-full pl-12 pr-4 py-3 bg-surface-mint border-none rounded-xl text-on-surface font-jakarta focus:outline-2 focus:outline-surface-tint focus:bg-white focus:shadow-[0_4px_12px_rgba(0,110,44,0.05)] transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label className="font-jakarta text-xs font-bold text-on-surface-variant px-1 tracking-wider uppercase">
                    EMAIL
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-tint" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full pl-12 pr-4 py-3 bg-surface-mint border-none rounded-xl text-on-surface font-jakarta focus:outline-2 focus:outline-surface-tint focus:bg-white focus:shadow-[0_4px_12px_rgba(0,110,44,0.05)] transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-2">
                  <label className="font-jakarta text-xs font-bold text-on-surface-variant px-1 tracking-wider uppercase">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-tint" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => update('password', e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 bg-surface-mint border-none rounded-xl text-on-surface font-jakarta focus:outline-2 focus:outline-surface-tint focus:bg-white focus:shadow-[0_4px_12px_rgba(0,110,44,0.05)] transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-surface-tint transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-5 h-5 rounded border-outline text-surface-tint focus:ring-surface-tint"
                    required
                  />
                  <label htmlFor="terms" className="font-jakarta text-sm text-on-surface-variant">
                    Setuju dengan{' '}
                    <a className="text-surface-tint font-bold hover:underline" href="#">
                      syarat dan ketentuan
                    </a>{' '}
                    GiziLog.
                  </label>
                </div>

                {/* CTA Button */}
                <button
                  type="submit"
                  className="w-full bg-fresh-orange text-white py-4 rounded-[24px] font-jakarta font-semibold text-base hover:brightness-110 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-6 active:scale-95"
                >
                  Lanjutkan
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Weight & Height */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-jakarta text-xs font-bold text-on-surface-variant px-1 tracking-wider uppercase">
                      BERAT (KG)
                    </label>
                    <div className="relative">
                      <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-tint" />
                      <input
                        type="number"
                        value={form.weight}
                        onChange={(e) => update('weight', Number(e.target.value))}
                        className="w-full pl-12 pr-4 py-3 bg-surface-mint border-none rounded-xl text-on-surface font-jakarta focus:outline-2 focus:outline-surface-tint focus:bg-white transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-jakarta text-xs font-bold text-on-surface-variant px-1 tracking-wider uppercase">
                      TINGGI (CM)
                    </label>
                    <div className="relative">
                      <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-tint" />
                      <input
                        type="number"
                        value={form.height}
                        onChange={(e) => update('height', Number(e.target.value))}
                        className="w-full pl-12 pr-4 py-3 bg-surface-mint border-none rounded-xl text-on-surface font-jakarta focus:outline-2 focus:outline-surface-tint focus:bg-white transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Age */}
                <div className="flex flex-col gap-2">
                  <label className="font-jakarta text-xs font-bold text-on-surface-variant px-1 tracking-wider uppercase">
                    USIA (TAHUN)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-tint" />
                    <input
                      type="number"
                      value={form.age}
                      onChange={(e) => update('age', Number(e.target.value))}
                      className="w-full pl-12 pr-4 py-3 bg-surface-mint border-none rounded-xl text-on-surface font-jakarta focus:outline-2 focus:outline-surface-tint focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Activity Level */}
                <div className="flex flex-col gap-2">
                  <label className="font-jakarta text-xs font-bold text-on-surface-variant px-1 tracking-wider uppercase">
                    TINGKAT AKTIVITAS
                  </label>
                  <div className="relative">
                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-tint" />
                    <select
                      value={form.activityLevel}
                      onChange={(e) => update('activityLevel', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-surface-mint border-none rounded-xl text-on-surface font-jakarta focus:outline-2 focus:outline-surface-tint focus:bg-white transition-all appearance-none"
                    >
                      <option value="sedentary">Sedentari</option>
                      <option value="light">Ringan</option>
                      <option value="moderate">Sedang</option>
                      <option value="active">Aktif</option>
                      <option value="very_active">Sangat Aktif</option>
                    </select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep('account')}
                    className="flex-1 py-4 rounded-[24px] border border-outline-variant bg-white text-on-surface font-jakarta font-semibold text-base hover:bg-surface-container-low transition-all active:scale-95"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-fresh-orange text-white py-4 rounded-[24px] font-jakarta font-semibold text-base hover:brightness-110 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        Memproses...
                        <svg
                          className="animate-spin h-5 w-5 text-white"
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
                        Daftar
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Footer Links */}
            <div className="mt-8 pt-6 border-t border-outline-variant flex flex-col items-center gap-4">
              <p className="font-jakarta text-sm text-on-surface-variant">
                Sudah punya akun?{' '}
                <Link to="/login" className="text-surface-tint font-bold hover:underline">
                  Masuk
                </Link>
              </p>
              {/* Trust Badge */}
              <div className="flex items-center gap-2 px-4 py-2 bg-surface-mint rounded-full">
                <ShieldCheck className="w-4 h-4 text-surface-tint" />
                <span className="font-jakarta text-[10px] font-bold text-surface-tint tracking-wider">
                  DATA ANDA TERENKRIPSI & AMAN
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-64 h-64 bg-primary-fixed-dim rounded-full blur-[100px] opacity-20" />
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-secondary-fixed-dim rounded-full blur-[120px] opacity-20" />
      </div>
    </div>
  );
}
