import { DesktopDashboard } from './desktop/DesktopDashboard';
import { MobileDashboard } from './mobile/MobileDashboard';
import { useIsMobile } from '../../hooks/useIsMobile';

export function DashboardPage() {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <DesktopDashboard />;
  }

  return <MobileDashboard />;
}
