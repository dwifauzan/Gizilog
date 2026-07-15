import { useIsMobile } from '../../hooks/useIsMobile';
import { MobileHistory } from './mobile/MobileHistory';

export function HistoryPage() {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500">Riwayat makanan</p>
          <h1 className="text-2xl font-extrabold text-dark">Riwayat Makan</h1>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <p className="text-gray-600">Desktop view coming soon.</p>
        </div>
      </div>
    );
  }

  return <MobileHistory />;
}
