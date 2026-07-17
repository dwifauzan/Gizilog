import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AlertTriangle, Shield } from 'lucide-react';

interface ScanGuardProps {
  children: ReactNode;
}

function getBlockedReason(): string | null {
  if (!window.isSecureContext) {
    return 'Kamera memerlukan koneksi HTTPS. Buka aplikasi melalui Vercel untuk mengakses fitur ini.';
  }
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return 'Browser tidak mendukung akses kamera. Gunakan Chrome, Safari, atau Edge terbaru.';
  }
  return null;
}

export function ScanGuard({ children }: ScanGuardProps) {
  const blockedReason = getBlockedReason();
  const [state, setState] = useState<'checking' | 'blocked' | 'ok'>(
    blockedReason ? 'blocked' : 'checking'
  );
  const [reason, setReason] = useState(blockedReason ?? '');

  useEffect(() => {
    if (blockedReason) return;

    navigator.permissions
      .query({ name: 'camera' as PermissionName })
      .then((result) => {
        if (result.state === 'denied') {
          setState('blocked');
          setReason('Izin kamera telah ditolak. Buka pengaturan browser untuk mengizinkan akses kamera.');
        } else {
          setState('ok');
        }
      })
      .catch(() => {
        setState('ok');
      });
  }, [blockedReason]);

  if (state === 'checking') {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    );
  }

  if (state === 'blocked') {
    return (
      <div className="flex items-center justify-center min-h-[50svh] p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-lg font-extrabold text-dark mb-2">Kamera Tidak Tersedia</h2>
          <p className="text-sm text-gray-500 mb-6">{reason}</p>
          <div className="flex items-center gap-2 bg-amber-50 rounded-xl p-4 text-left">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-xs text-amber-700">
              Fitur scan tetap bisa digunakan dengan memilih makanan dari daftar manual di halaman scan.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
