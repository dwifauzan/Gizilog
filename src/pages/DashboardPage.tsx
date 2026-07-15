import { DesktopDashboard } from '../components/ui/DesktopDashboard';
import { MobileDashboard } from './MobileDashboard';
import { useIsMobile } from '../hooks/useIsMobile';

export function DashboardPage() {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <DesktopDashboard />;
  }

  return <MobileDashboard />;
}
