import { Heart, TrendingDown } from 'lucide-react';
import Card from './Card';
import { useHealthData } from '../context/HealthDataContext';
import { relativeTimeFromNow } from '../utils/date';

const HEALTHY_SYSTOLIC_MAX = 120;
const HEALTHY_DIASTOLIC_MAX = 80;

export default function BloodPressureCard() {
  const { latestVital } = useHealthData();
  const latest = latestVital('bloodPressure');

  if (!latest) {
    return (
      <Card>
        <p className="text-label-md font-semibold uppercase tracking-wide text-on-surface-variant mb-2">
          Blood Pressure
        </p>
        <p className="text-body-md text-on-surface-variant">No readings logged yet.</p>
      </Card>
    );
  }

  const inHealthyRange =
    latest.systolic <= HEALTHY_SYSTOLIC_MAX && latest.diastolic <= HEALTHY_DIASTOLIC_MAX;

  return (
    <Card>
      <div className="flex items-center justify-between mb-1">
        <p className="text-label-md font-semibold uppercase tracking-wide text-on-surface-variant">
          Blood Pressure
        </p>
        <div className="w-9 h-9 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0">
          <Heart size={18} className="text-tertiary" strokeWidth={2} fill="currentColor" />
        </div>
      </div>
      <p className="text-display-lg text-on-surface leading-none mt-2">
        {latest.systolic}
        <span className="text-headline-md text-on-surface-variant">/{latest.diastolic}</span>{' '}
        <span className="text-body-md font-normal text-on-surface-variant align-middle">mmHg</span>
      </p>
      <p
        className={[
          'flex items-center gap-1 text-label-md font-medium mt-3',
          inHealthyRange ? 'text-secondary' : 'text-tertiary',
        ].join(' ')}
      >
        {inHealthyRange && <TrendingDown size={16} strokeWidth={2} />}
        {inHealthyRange ? 'In healthy range' : 'Outside typical range'} ({relativeTimeFromNow(latest.timestamp)})
      </p>
    </Card>
  );
}
