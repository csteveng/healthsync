import { NavLink } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { NAV_ITEMS } from '../nav';

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 md:h-screen md:sticky md:top-0 border-r border-outline-variant bg-surface-container-lowest px-4 py-6">
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-semibold text-lg shrink-0">
          H
        </div>
        <div>
          <p className="text-headline-sm text-primary leading-tight">HealthSync</p>
          <p className="text-label-sm font-normal text-on-surface-variant tracking-normal">Empathetic Clarity</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-body-md font-medium transition-colors',
                isActive
                  ? 'bg-secondary-fixed text-on-secondary-fixed'
                  : 'text-on-surface-variant hover:bg-surface-container-low',
              ].join(' ')
            }
          >
            <Icon size={20} strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary rounded font-medium text-body-md py-3 hover:bg-on-primary-fixed-variant transition-colors min-h-[48px]"
        >
          <Plus size={18} />
          Add Health Check
        </button>
      </div>
    </aside>
  );
}
