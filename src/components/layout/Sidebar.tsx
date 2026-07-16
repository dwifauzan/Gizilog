import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { path: '/dashboard', label: 'Home', icon: 'home' },
  { path: '/history', label: 'Journal', icon: 'book_5' },
  { path: '/statistics', label: 'Analytics', icon: 'analytics' },
  { path: '/profile', label: 'Profile', icon: 'person' },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest border-r border-outline-variant py-6 px-2 z-50 font-jakarta">
      <div className="mb-10 px-4">
        <h1 className="text-2xl font-extrabold text-primary">GiziLog</h1>
        <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mt-0.5">Health Assistant</p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={`${item.path}-${item.label}`}
              to={item.path}
              className={cn(
                'flex items-center gap-4 px-4 py-3 rounded-xl transition-colors font-body-md text-body-md',
                isActive
                  ? 'text-primary font-bold border-r-4 border-primary bg-surface-mint'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              )}
            >
              <span className="material-symbols-outlined" data-icon={item.icon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-4">
        <button
          type="button"
          onClick={() => navigate('/scan')}
          className="w-full bg-primary text-on-primary font-bold py-3 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 hover:bg-primary/90"
        >
          <span className="material-symbols-outlined" data-icon="add">add</span>
          <span>Log Meal</span>
        </button>

        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-outline-variant">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-extrabold">
            {profile?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-on-surface truncate">{profile?.name || 'User'}</p>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-xs text-text-muted hover:text-primary transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
