import { LayoutGrid, Pill, ClipboardPlus, CalendarDays, Bell } from 'lucide-react';

export const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutGrid, end: true },
  { to: '/meds', label: 'Meds', icon: Pill },
  { to: '/logs', label: 'Logs', icon: ClipboardPlus },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/alerts', label: 'Alerts', icon: Bell },
];
