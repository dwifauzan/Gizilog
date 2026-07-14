import { Link } from 'react-router-dom';
import { Camera, Activity, TrendingUp, Leaf } from 'lucide-react';
import heroImg from '../assets/hero.png';

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-5 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white">
            <Leaf className="w-5 h-5" />
          </div>
          <span className="text-lg font-extrabold text-dark">GiziLog</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-gray-700 hover:text-dark transition-colors"
          >
            Masuk
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
          >
            Mulai Sekarang
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col lg:flex-row">
        {/* Left / Top */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:py-0 lg:px-16 bg-gradient-to-br from-primary/10 via-white to-accent/5">
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6">
              <Camera className="w-3.5 h-3.5" />
              AI Food Scanner
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[2.5rem] xl:text-5xl font-extrabold text-dark leading-[1.15] mb-5">
              Foto Nutrisi. <br className="hidden sm:block" />
              Bebas{' '}
              <span className="text-accent">Stunting</span>.
            </h1>
            <p className="text-base text-gray-500 max-w-[45ch] mx-auto lg:mx-0 leading-relaxed mb-8">
              Supercharge pemantauan gizimu dengan teknologi AI food object scanner yang praktis dan analisis nutrisi harian yang akurat.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <Link
                to="/register"
                className="w-full sm:w-auto px-6 py-3 text-sm font-bold bg-primary text-white rounded-full hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
              >
                Daftar Gratis
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-dark bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                Sudah punya akun?
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-sm mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start gap-1">
                <Camera className="w-5 h-5 text-primary" />
                <span className="text-xs font-semibold text-gray-600">Scan Instan</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <Activity className="w-5 h-5 text-accent" />
                <span className="text-xs font-semibold text-gray-600">Analisis AI</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <TrendingUp className="w-5 h-5 text-warning" />
                <span className="text-xs font-semibold text-gray-600">Statistik</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right / Bottom */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-light p-12">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <img
              src={heroImg}
              alt="GiziLog App Preview"
              className="relative w-[380px] h-auto drop-shadow-2xl rounded-3xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
