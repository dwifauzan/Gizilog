import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

const navItems = [
  { path: '/dashboard', label: 'Home', icon: 'home', filledIcon: 'home' },
  { path: '/history', label: 'History', icon: 'history', filledIcon: 'history' },
  { path: '/statistics', label: 'Stats', icon: 'leaderboard', filledIcon: 'leaderboard' },
  { path: '/profile', label: 'Profile', icon: 'person', filledIcon: 'person' },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 block lg:hidden grid grid-cols-4 items-center px-4 pb-4 pt-2 bg-surface-container-lowest shadow-lg rounded-t-xl border-t border-outline-variant">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex flex-col items-center justify-center py-2 transition-all duration-200',
              isActive
                ? 'bg-primary-container text-on-primary-container rounded-full'
                : 'text-on-surface-variant hover:bg-surface-mint'
            )}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {isActive ? item.filledIcon : item.icon}
            </span>
            <span className="font-jakarta text-[10px] font-bold tracking-[0.05em] mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
