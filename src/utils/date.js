// All date-diff math here works in whole local calendar days, per the spec's
// mitigation for stale-clock / DST / timezone edge cases (see DESIGN spec, section 6).

export function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function todayKey(date = new Date()) {
  const d = startOfDay(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function daysBetween(a, b) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const diff = startOfDay(b).getTime() - startOfDay(a).getTime();
  return Math.round(diff / msPerDay);
}

export function daysUntil(dateLike) {
  return daysBetween(new Date(), new Date(dateLike));
}

const WEEKDAY_INDEX = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };

// Determines whether a medication's recurrence rule applies to a given date.
export function recurrenceAppliesOn(recurrence, date = new Date()) {
  if (!recurrence) return false;
  if (recurrence.type === 'daily') return true;
  if (recurrence.type === 'prn') return false; // as-needed meds aren't "scheduled" for today
  if (recurrence.type === 'daysOfWeek') {
    const dayIdx = date.getDay();
    return (recurrence.days || []).some((d) => WEEKDAY_INDEX[d] === dayIdx);
  }
  return false;
}

export function formatTime(time24) {
  const [hStr, mStr] = time24.split(':');
  let h = parseInt(hStr, 10);
  const suffix = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${mStr} ${suffix}`;
}

export function formatFriendlyDate(dateLike) {
  return new Date(dateLike).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export function relativeTimeFromNow(dateLike) {
  const now = Date.now();
  const then = new Date(dateLike).getTime();
  const diffMs = now - then;
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}
