import { Outlet, Navigate } from 'react-router-dom';
import { MobileNav } from './MobileNav';
import { Sidebar } from './Sidebar';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useAuth } from '../../hooks/useAuth';
import { isSupabaseConfigured } from '../../lib/supabase';

export function AppLayout() {
  const isMobile = useIsMobile();
  const { session, loading } = useAuth();

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light p-6">
        <div className="max-w-md bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Supabase Not Configured</h2>
          <p className="text-gray-600 mb-4">
            Please add your Supabase credentials to <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>
          </p>
          <div className="text-left bg-gray-50 rounded-lg p-4 text-sm font-mono">
            <p>VITE_SUPABASE_URL=your-project-url</p>
            <p>VITE_SUPABASE_ANON_KEY=your-anon-key</p>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Get your credentials from the Supabase dashboard: Settings → API
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-light">
      {!isMobile && <Sidebar />}
      <main className="lg:ml-64 min-h-screen pb-24 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
      {isMobile && <MobileNav />}
    </div>
  );
}
