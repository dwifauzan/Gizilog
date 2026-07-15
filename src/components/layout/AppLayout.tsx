import { Outlet, useLocation } from 'react-router-dom';
import { MobileNav } from './MobileNav';
import { Sidebar } from './Sidebar';
import { useIsMobile } from '../../hooks/useIsMobile';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { ProfilePage } from '../../pages/profile/ProfilePage';
import { HistoryPage } from '../../pages/history/HistoryPage';
import { StatisticsPage } from '../../pages/statistics/StatisticsPage';

export function AppLayout() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isDashboard = location.pathname === '/dashboard';
  const isProfile = location.pathname === '/profile';
  const isHistory = location.pathname === '/history';
  const isStatistics = location.pathname === '/statistics';

  if (!isMobile && isDashboard) {
    return <DashboardPage />;
  }

  if (isMobile && isDashboard) {
    return (
      <>
        <DashboardPage />
        <MobileNav />
      </>
    );
  }

  if (isMobile && isProfile) {
    return (
      <>
        <ProfilePage />
        <MobileNav />
      </>
    );
  }

  if (isMobile && isHistory) {
    return (
      <>
        <HistoryPage />
        <MobileNav />
      </>
    );
  }

  if (isMobile && isStatistics) {
    return (
      <>
        <StatisticsPage />
        <MobileNav />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      <Sidebar />
      <main className="lg:ml-64 min-h-screen pb-24 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
