import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../nav';

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-surface-container-lowest border-t border-outline-variant pb-[env(safe-area-inset-bottom)]">
      <ul className="flex items-stretch justify-between px-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'flex flex-col items-center justify-center gap-1 py-2.5 text-label-sm font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-on-surface-variant',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={[
                      'flex items-center justify-center w-11 h-7 rounded-full transition-colors',
                      isActive ? 'bg-primary-fixed' : '',
                    ].join(' ')}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2 : 1.75} />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
