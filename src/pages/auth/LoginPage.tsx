import { LoginDesktop } from './desktop/LoginDesktop';
import { LoginMobile } from './mobile/LoginMobile';
import { isSupabaseConfigured } from '../../lib/supabase';

export function LoginPage() {
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

  return (
    <>
      <div className="hidden lg:block">
        <LoginDesktop />
      </div>
      <div className="block lg:hidden">
        <LoginMobile />
      </div>
    </>
  );
}
