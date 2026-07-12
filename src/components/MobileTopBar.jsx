import { Settings } from 'lucide-react';
import { useHealthData } from '../context/HealthDataContext';

export default function MobileTopBar() {
  const { profile } = useHealthData();
  const initial = profile.name?.charAt(0)?.toUpperCase() || 'A';

  return (
    <header className="md:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-surface/95 backdrop-blur border-b border-outline-variant">
      <div className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-semibold text-sm overflow-hidden">
        {initial}
      </div>
      <p className="text-headline-sm text-primary">HealthSync</p>
      <button type="button" aria-label="Settings" className="text-on-surface-variant p-1">
        <Settings size={22} strokeWidth={1.75} />
      </button>
    </header>
  );
}
