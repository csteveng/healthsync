import { Activity, FilePlus2 } from 'lucide-react';
import { useHealthData } from '../context/HealthDataContext';

function timeOfDayGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

export default function GreetingHeader() {
  const { profile } = useHealthData();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-headline-lg-mobile md:text-headline-lg text-on-surface">
          {timeOfDayGreeting()}, {profile.name}.
        </h1>
        <p className="text-body-md text-on-surface-variant mt-1">Here is your health overview for today.</p>
      </div>
      <div className="hidden md:flex items-center gap-3 shrink-0">
        <button
          type="button"
          className="flex items-center gap-2 bg-primary text-on-primary rounded font-medium text-body-md px-5 min-h-[48px] hover:bg-on-primary-fixed-variant transition-colors"
        >
          <Activity size={18} />
          Log Health Check
        </button>
        <button
          type="button"
          className="flex items-center gap-2 bg-primary-fixed text-primary rounded font-medium text-body-md px-5 min-h-[48px] hover:bg-primary-fixed-dim transition-colors"
        >
          <FilePlus2 size={18} />
          Add Medication
        </button>
      </div>
    </div>
  );
}
