import { Link2, Check } from 'lucide-react';
import Card from './Card';
import { useHealthData } from '../context/HealthDataContext';
import { formatTime } from '../utils/date';

export default function TodaysMedicationsCard() {
  const { todaysDoses, pendingDoseCount, setDoseStatus } = useHealthData();

  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Link2 size={20} className="text-primary" strokeWidth={1.75} />
          <h2 className="text-headline-sm text-on-surface">Today's Medications</h2>
        </div>
        <span className="text-label-md font-medium bg-secondary-container text-on-secondary-container rounded-full px-3 py-1">
          {pendingDoseCount} Pending
        </span>
      </div>

      {todaysDoses.length === 0 ? (
        <p className="text-body-md text-on-surface-variant py-6 text-center">
          No medications scheduled for today — add one from Meds to get started.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {todaysDoses.map((dose) => {
            const taken = dose.status === 'taken';
            return (
              <li
                key={dose.key}
                className={[
                  'flex items-center gap-3 border rounded-md px-4 py-3 transition-colors',
                  taken ? 'border-outline-variant bg-surface-container-low' : 'border-outline-variant',
                ].join(' ')}
              >
                <button
                  type="button"
                  onClick={() => setDoseStatus(dose.medId, dose.time, 'taken')}
                  aria-pressed={taken}
                  aria-label={`Mark ${dose.medName} ${taken ? 'as not taken' : 'as taken'}`}
                  className={[
                    'w-6 h-6 shrink-0 rounded flex items-center justify-center border-2 transition-colors',
                    taken ? 'bg-secondary border-secondary' : 'border-outline-variant',
                  ].join(' ')}
                >
                  {taken && <Check size={16} className="text-on-secondary" strokeWidth={3} />}
                </button>
                <div className="min-w-0">
                  <p
                    className={[
                      'text-body-md font-medium',
                      taken ? 'line-through text-on-surface-variant' : 'text-on-surface',
                    ].join(' ')}
                  >
                    {dose.medName} ({dose.dosage})
                  </p>
                  <p className="text-label-md font-normal text-on-surface-variant">
                    {formatTime(dose.time)} • {dose.label}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
