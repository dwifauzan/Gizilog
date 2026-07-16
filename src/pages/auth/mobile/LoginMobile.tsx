import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ScanFace } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

export function LoginMobile() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-surface text-on-surface relative overflow-hidden">
      {/* Decorative Soft Glow Backgrounds */}
      <div className="fixed top-[-10%] right-[-10%] w-64 h-64 bg-primary-container opacity-5 blur-[100px] pointer-events-none rounded-full" />
      <div className="fixed bottom-[-10%] left-[-10%] w-64 h-64 bg-secondary-container opacity-10 blur-[100px] pointer-events-none rounded-full" />

      {/* Login Container */}
      <div className="w-full max-w-[400px] flex flex-col gap-4 relative z-10">
        {/* Top Bento Section: Logo & Welcome */}
        <div className="bg-surface-container-lowest rounded-[24px] p-5 flex flex-col items-center text-center border border-[#E0E0E0]">
          <div className="w-16 h-16 bg-surface-mint rounded-full flex items-center justify-center mb-4">
            <ScanFace className="w-8 h-8 text-surface-tint" />
          </div>
          <h1 className="font-jakarta text-[26px] leading-8 font-bold text-surface-tint mb-2">
            Selamat Datang Kembali
          </h1>
          <p className="font-jakarta text-sm text-on-surface-variant">
            Pantau nutrisi harianmu dengan mudah melalui GiziLog
          </p>
        </div>

        {/* Middle Bento Section: Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-lowest rounded-[24px] p-5 flex flex-col gap-4 border border-[#E0E0E0]"
        >
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="font-jakarta text-xs font-bold text-on-surface-variant ml-1 tracking-wider uppercase">
              EMAIL
            </label>
            <div className="flex items-center bg-surface-mint rounded-xl px-4 py-3 transition-shadow focus-within:shadow-[0_0_0_2px_#34a853]">
              <Mail className="w-5 h-5 text-on-surface-variant mr-3 flex-shrink-0" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="bg-transparent border-none focus:ring-0 focus:outline-none p-0 w-full font-jakarta text-sm text-on-surface placeholder:text-outline-variant"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="font-jakarta text-xs font-bold text-on-surface-variant ml-1 tracking-wider uppercase">
              KATA SANDI
            </label>
            <div className="flex items-center bg-surface-mint rounded-xl px-4 py-3 transition-shadow focus-within:shadow-[0_0_0_2px_#34a853]">
              <Lock className="w-5 h-5 text-on-surface-variant mr-3 flex-shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent border-none focus:ring-0 focus:outline-none p-0 w-full font-jakarta text-sm text-on-surface placeholder:text-outline-variant"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-on-surface-variant flex-shrink-0"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <a className="font-jakarta text-xs font-bold text-surface-tint self-end mt-1 hover:underline" href="#">
              Lupa sandi?
            </a>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-secondary-container hover:bg-secondary text-on-secondary font-jakarta font-semibold text-xl py-4 rounded-full transition-colors mt-2 active:scale-[0.98] duration-150 disabled:opacity-70"
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

        {/* Social Login Bento */}
        {/* <div className="bg-surface-container-lowest rounded-[24px] p-5 border border-[#E0E0E0]"> */}
        {/*   <p className="font-jakarta text-xs font-bold text-on-surface-variant text-center mb-4 uppercase tracking-widest"> */}
        {/*     Atau masuk dengan */}
        {/*   </p> */}
        {/*   <div className="grid grid-cols-2 gap-3"> */}
        {/*     <button */}
        {/*       type="button" */}
        {/*       className="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-xl font-jakarta text-sm font-semibold hover:bg-surface-bright transition-colors active:scale-95" */}
        {/*     > */}
        {/*       <svg className="w-5 h-5" viewBox="0 0 24 24"> */}
        {/*         <path */}
        {/*           fill="#4285F4" */}
        {/*           d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" */}
        {/*         /> */}
        {/*         <path */}
        {/*           fill="#34A853" */}
        {/*           d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" */}
        {/*         /> */}
        {/*         <path */}
        {/*           fill="#FBBC05" */}
        {/*           d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" */}
        {/*         /> */}
        {/*         <path */}
        {/*           fill="#EA4335" */}
        {/*           d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" */}
        {/*         /> */}
        {/*       </svg> */}
        {/*       <span>Google</span> */}
        {/*     </button> */}
        {/*     <button */}
        {/*       type="button" */}
        {/*       className="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-xl font-jakarta text-sm font-semibold hover:bg-surface-bright transition-colors active:scale-95" */}
        {/*     > */}
        {/*       <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24"> */}
        {/*         <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /> */}
        {/*       </svg> */}
        {/*       <span>Facebook</span> */}
        {/*     </button> */}
        {/*   </div> */}
        {/* </div> */}

        {/* Bottom Link */}
        <div className="text-center py-4">
          <p className="font-jakarta text-sm text-on-surface-variant">
            Belum punya akun?{' '}
            <Link to="/register" className="text-surface-tint font-bold hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
