import { CalendarClock, Clock, MapPin } from 'lucide-react';
import Card from './Card';
import { useHealthData } from '../context/HealthDataContext';

function formatDateBadge(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return {
    month: d.toLocaleDateString(undefined, { month: 'short' }).toUpperCase(),
    day: d.getDate(),
  };
}

function formatTimeRange(start, end) {
  const to12h = (t) => {
    const [h, m] = t.split(':').map(Number);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
  };
  return end ? `${to12h(start)} - ${to12h(end)}` : to12h(start);
}

export default function NextAppointmentCard() {
  const { nextAppointment } = useHealthData();

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <CalendarClock size={20} className="text-secondary" strokeWidth={1.75} />
        <h2 className="text-headline-sm text-on-surface">Next Appointment</h2>
      </div>

      {!nextAppointment ? (
        <p className="text-body-md text-on-surface-variant py-2">Nothing scheduled — you're all caught up.</p>
      ) : (
        <div className="flex gap-4">
          <div className="shrink-0 w-16 h-16 rounded-md bg-primary-fixed flex flex-col items-center justify-center">
            <span className="text-label-sm font-semibold text-primary">
              {formatDateBadge(nextAppointment.date).month}
            </span>
            <span className="text-headline-md text-primary leading-none">
              {formatDateBadge(nextAppointment.date).day}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-body-lg font-semibold text-on-surface truncate">{nextAppointment.provider}</p>
            <p className="text-body-md text-on-surface-variant truncate">{nextAppointment.title}</p>
            <div className="flex items-center gap-1.5 text-label-md font-normal text-on-surface-variant mt-2">
              <Clock size={14} strokeWidth={2} />
              {formatTimeRange(nextAppointment.startTime, nextAppointment.endTime)}
            </div>
            <div className="flex items-center gap-1.5 text-label-md font-normal text-on-surface-variant mt-1">
              <MapPin size={14} strokeWidth={2} />
              <span className="truncate">{nextAppointment.location}</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
