import { Navigate } from 'react-router-dom';
import { useIsMobile } from '../../hooks/useIsMobile';

interface ScanGuardProps {
  children: React.ReactNode;
}

export function ScanGuard({ children }: ScanGuardProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
