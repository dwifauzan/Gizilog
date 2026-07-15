import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Eye, EyeOff, Mail, Lock, CheckCircle } from 'lucide-react';

export function LoginDesktop() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-12 overflow-x-hidden bg-background">
      <main className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-12 bg-surface-container-lowest rounded-[24px] overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] min-h-[700px]">
        {/* Left Side: Branding/Visual */}
        <section className="hidden md:flex md:col-span-6 relative bg-surface-mint p-12 flex-col justify-between overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-fixed-dim opacity-20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-fresh-orange opacity-10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-surface-tint rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-on-primary" />
              </div>
              <span className="font-jakarta text-2xl font-bold text-surface-tint tracking-tight">GiziLog</span>
            </div>
            <h2 className="font-jakarta text-4xl font-extrabold text-on-surface leading-tight mb-6">
              Kendalikan <span className="text-surface-tint">Nutrisi</span>
              <br />
              Hanya Dengan Sekali Scan.
            </h2>
            <p className="font-jakarta text-lg text-on-surface-variant max-w-sm">
              Asisten kesehatan pribadi yang menggunakan Computer Vision untuk melacak pola makan Anda secara otomatis.
            </p>
          </div>

          {/* Visual Component */}
          <div className="relative z-10 w-full aspect-square mt-8 rounded-[24px] overflow-hidden border-4 border-white shadow-xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDypYjtEaK56j_4kbBDfSYtj0apFk5GK4RC16SoSrk0JDkSRSw5qEAeQC7plJSTnTEQJSGKBSrW8pNoi6BPppe7m5_7orUmaYcap5os2cMOCfbsdmKx6TlUZAfh8ozoPz2n_VUMY1l51odcHbZWz02yFQdCZ6tIX9DUsihVMu8BUBHZUOapEfVHku2b4_mfdgTLdtwY2EXEAXP8d0B0BcXZB3Sq0SZdi6F1IP49J2-86lHkpeMMVazKnIaFWV0wV_Haz_ZOwLHuFTs')",
              }}
            />
            {/* AR Overlay Simulation */}
            <div className="absolute inset-0 border-2 border-surface-tint/30 rounded-[24px] m-8 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-outline-variant animate-pulse">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-surface-tint" />
                  <span className="font-jakarta text-sm font-semibold text-on-surface">Salmon Bowl Terdeteksi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8">
            <div className="flex gap-4">
              <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-outline-variant">
                <span className="font-jakarta text-sm text-on-surface-variant">98% Accuracy</span>
              </div>
              <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-outline-variant">
                <span className="font-jakarta text-sm text-on-surface-variant">Real-time AR</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Login Form */}
        <section className="col-span-1 md:col-span-6 p-8 md:p-16 flex flex-col justify-center">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 md:hidden">
            <div className="w-8 h-8 bg-surface-tint rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-on-primary" />
            </div>
            <span className="font-jakarta text-xl font-bold text-surface-tint">GiziLog</span>
          </div>

          <div className="max-w-[400px] mx-auto w-full">
            <header className="mb-8">
              <h1 className="font-jakarta text-3xl font-bold text-on-surface mb-2">Selamat Datang Kembali</h1>
              <p className="font-jakarta text-base text-on-surface-variant">
                Silakan masuk untuk melanjutkan perjalanan sehat Anda.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="font-jakarta text-sm font-semibold text-on-surface-variant ml-1" htmlFor="email">
                  Email
                </label>
                <div className="relative flex items-center bg-surface-container-low rounded-xl transition-all border border-transparent focus-within:border-fresh-orange/50 focus-within:shadow-[0_0_0_2px_rgba(251,140,0,0.2)]">
                  <Mail className="absolute left-4 w-5 h-5 text-on-surface-variant" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full bg-transparent border-none py-4 pl-12 pr-4 focus:ring-0 focus:outline-none text-on-surface font-jakarta rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="font-jakarta text-sm font-semibold text-on-surface-variant" htmlFor="password">
                    Kata Sandi
                  </label>
                  <a className="font-jakarta text-sm text-fresh-orange hover:underline" href="#">
                    Lupa sandi?
                  </a>
                </div>
                <div className="relative flex items-center bg-surface-container-low rounded-xl transition-all border border-transparent focus-within:border-fresh-orange/50 focus-within:shadow-[0_0_0_2px_rgba(251,140,0,0.2)]">
                  <Lock className="absolute left-4 w-5 h-5 text-on-surface-variant" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent border-none py-4 pl-12 pr-12 focus:ring-0 focus:outline-none text-on-surface font-jakarta rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-fresh-orange text-white py-4 rounded-xl font-jakarta font-bold text-base shadow-lg shadow-fresh-orange/20 hover:bg-[#E67E00] transition-all duration-200 active:scale-[0.98] mt-4 disabled:opacity-70"
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
                  'Masuk'
                )}
              </button>
            </form>

            {/*  <div className="relative my-8 flex items-center"> */}
            {/*   <div className="flex-grow border-t border-outline-variant" /> */}
            {/*   <span className="px-4 font-jakarta text-sm text-text-muted">Atau masuk dengan</span> */}
            {/*   <div className="flex-grow border-t border-outline-variant" /> */}
            {/* </div> */}
            {/**/}
            {/* { Social Buttons } /*}
            {/* <div className="grid grid-cols-2 gap-4"> */}
            {/*   <button className="flex items-center justify-center gap-2 border border-outline-variant py-3 rounded-xl hover:bg-surface-container-low transition-colors active:scale-[0.98]"> */}
            {/*     <svg className="w-5 h-5" viewBox="0 0 24 24"> */}
            {/*       <path */}
            {/*         fill="#4285F4" */}
            {/*         d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" */}
            {/*       /> */}
            {/*       <path */}
            {/*         fill="#34A853" */}
            {/*         d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" */}
            {/*       /> */}
            {/*       <path */}
            {/*         fill="#FBBC05" */}
            {/*         d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" */}
            {/*       /> */}
            {/*       <path */}
            {/*         fill="#EA4335" */}
            {/*         d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" */}
            {/*       /> */}
            {/*     </svg> */}
            {/*     <span className="font-jakarta text-sm font-semibold text-on-surface">Google</span> */}
            {/*   </button> */}
            {/*   <button className="flex items-center justify-center gap-2 border border-outline-variant py-3 rounded-xl hover:bg-surface-container-low transition-colors active:scale-[0.98]"> */}
            {/*     <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24"> */}
            {/*       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /> */}
            {/*     </svg> */}
            {/*     <span className="font-jakarta text-sm font-semibold text-on-surface">Facebook</span> */}
            {/*   </button> */}
            {/* </div> */}

            {/* Footer Navigation */}
            <footer className="mt-12 text-center">
              <p className="font-jakarta text-base text-on-surface-variant">
                Belum punya akun?{' '}
                <Link to="/register" className="text-surface-tint font-bold hover:underline">
                  Daftar sekarang
                </Link>
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
