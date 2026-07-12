import { HeartPulse } from 'lucide-react';
import Card from './Card';
import BarSparkline from './BarSparkline';
import { useHealthData } from '../context/HealthDataContext';

export default function HeartRateCard() {
  const { latestVital, trend } = useHealthData();
  const latest = latestVital('pulse');
  const values = trend('pulse', 7).map((e) => e.value);

  return (
    <Card>
      <div className="flex items-center justify-between mb-1">
        <p className="text-label-md font-semibold uppercase tracking-wide text-on-surface-variant">
          Resting Heart Rate
        </p>
        <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
          <HeartPulse size={18} className="text-primary" strokeWidth={2} />
        </div>
      </div>
      <p className="text-display-lg text-on-surface leading-none mt-2 mb-4">
        {latest ? latest.value : '—'} <span className="text-body-md font-normal text-on-surface-variant">bpm</span>
      </p>
      <BarSparkline values={values} />
      <p className="text-label-md font-normal text-on-surface-variant mt-3">Avg over last 7 days</p>
    </Card>
  );
}
