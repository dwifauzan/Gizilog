import { useNavigate } from 'react-router-dom';
import { MOCK_USER } from '../lib/data';
import { useIsMobile } from '../hooks/useIsMobile';

export function ProfilePage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const consumed = 1300;
  const progress = Math.round((consumed / MOCK_USER.dailyCalorieTarget) * 100);

  const handleLogout = () => {
    navigate('/');
  };

  if (!isMobile) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500">Pengaturan akun</p>
          <h1 className="text-2xl font-extrabold text-dark">Profil & Pengaturan</h1>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <p className="text-gray-600">Desktop view coming soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-jakarta bg-background min-h-screen pb-32">
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md flex justify-between items-center w-full px-6 py-4">
        <h1 className="font-jakarta text-headline-lg font-bold text-primary">GiziLog</h1>
        <button className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-high transition-colors p-2 rounded-full">
          notifications
        </button>
      </header>

      <main className="px-6 mt-6 max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <section className="col-span-2 bento-card bg-surface-container-lowest rounded-[24px] p-6 border border-outline-variant/30 flex items-center gap-5">
            <div className="w-20 h-20 rounded-full border-4 border-surface-mint overflow-hidden shadow-sm flex items-center justify-center bg-primary-container">
              <span className="material-symbols-filled text-4xl text-on-primary">person</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-jakarta text-headline-md text-on-surface">{MOCK_USER.name}</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[12px] font-bold tracking-[0.05em] uppercase w-fit">
                <span className="material-symbols-outlined text-[14px] mr-1">verified</span>
                PREMIUM MEMBER
              </span>
            </div>
          </section>

          <section className="col-span-2 bento-card bg-surface-mint rounded-[24px] p-6 border border-primary-container/20 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="font-jakarta text-[12px] font-bold tracking-[0.05em] uppercase text-primary opacity-80">
                  Target Harian
                </span>
                <h3 className="font-jakarta text-headline-xl-mobile text-on-primary-container mt-1">
                  {MOCK_USER.dailyCalorieTarget}{' '}
                  <span className="text-body-lg font-normal">kcal/hari</span>
                </h3>
              </div>
              <button className="bg-primary text-on-primary px-4 py-2 rounded-full font-jakarta text-body-md font-semibold hover:opacity-90 transition-opacity active:scale-95">
                Ubah
              </button>
            </div>
            <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="font-jakarta text-body-md text-on-surface-variant">
              {progress}% tercapai dari target hari ini.
            </p>
          </section>

          <section className="col-span-2 bento-card bg-surface-container-low rounded-[24px] p-6 border border-outline-variant/30">
            <h3 className="font-jakarta text-headline-md text-on-surface mb-4">Pengaturan Nutrisi</h3>
            <div className="flex flex-col gap-1">
              <MenuItem icon="notifications_active" label="Pengingat Makan" />
              <MenuItem icon="sync" label="Koneksi Health App" />
              <MenuItem icon="restaurant" label="Preferensi Diet" />
            </div>
          </section>

          <section className="col-span-2 bento-card bg-surface-container-lowest rounded-[24px] p-6 border border-outline-variant/30">
            <h3 className="font-jakarta text-headline-md text-on-surface mb-4">Akun</h3>
            <div className="flex flex-col gap-1">
              <MenuItem icon="person" label="Informasi Akun" variant="neutral" />
              <MenuItem icon="shield" label="Privasi" variant="neutral" />
              <button
                onClick={handleLogout}
                className="flex justify-between items-center w-full py-4 hover:bg-error-container/30 transition-colors rounded-xl px-2 mt-2 group"
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-error bg-error-container/50 p-2 rounded-xl">
                    logout
                  </span>
                  <span className="font-jakarta text-body-lg text-error font-semibold">Keluar</span>
                </div>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  variant = 'primary',
}: {
  icon: string;
  label: string;
  variant?: 'primary' | 'neutral';
}) {
  const iconStyle =
    variant === 'primary'
      ? 'text-primary bg-primary-fixed/30'
      : 'text-on-surface-variant bg-surface-container-highest';

  return (
    <button className="flex justify-between items-center w-full py-4 hover:bg-surface-container-high transition-colors rounded-xl px-2">
      <div className="flex items-center gap-4">
        <span className={`material-symbols-outlined ${iconStyle} p-2 rounded-xl`}>{icon}</span>
        <span className="font-jakarta text-body-lg text-on-surface">{label}</span>
      </div>
      <span className="material-symbols-outlined text-outline">chevron_right</span>
    </button>
  );
}
