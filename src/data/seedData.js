// Initial seed data, used only the very first time the app runs on a browser
// (i.e. when localStorage is empty). After that, everything the patient does
// is read from / written to localStorage.

export const seedProfile = {
  name: 'Alex',
  avatarUrl: '',
};

export const seedMedications = [
  {
    id: 'med-lisinopril',
    name: 'Lisinopril',
    dosage: '10mg',
    form: 'tablet',
    recurrence: { type: 'daily' },
    schedule: [{ time: '08:00', label: 'After breakfast' }],
    inventory: 45,
    inventoryUnit: 'pills',
    lowStockThreshold: 10,
    receivedDate: '2026-06-12',
    daysSupplyPerPill: 1,
    nextAuthorization: '2026-07-27',
  },
  {
    id: 'med-atorvastatin',
    name: 'Atorvastatin',
    dosage: '20mg',
    form: 'tablet',
    recurrence: { type: 'daily' },
    schedule: [{ time: '13:00', label: 'After lunch' }],
    inventory: 7,
    inventoryUnit: 'pills',
    lowStockThreshold: 10,
    receivedDate: '2026-06-05',
    daysSupplyPerPill: 1,
    nextAuthorization: '2026-07-18',
  },
  {
    id: 'med-vitamind3',
    name: 'Vitamin D3',
    dosage: '2000 IU',
    form: 'tablet',
    recurrence: { type: 'daily' },
    schedule: [{ time: '20:00', label: 'With dinner' }],
    inventory: 60,
    inventoryUnit: 'pills',
    lowStockThreshold: 10,
    receivedDate: '2026-06-01',
    daysSupplyPerPill: 1,
    nextAuthorization: null,
  },
  {
    id: 'med-albuterol',
    name: 'Albuterol Inhaler',
    dosage: '90mcg/actuation',
    form: 'inhaler',
    recurrence: { type: 'prn' },
    schedule: [],
    prnInstructions: '2 puffs as needed',
    inventory: 60,
    inventoryUnit: 'puffs',
    lowStockThreshold: 20,
    receivedDate: '2026-05-20',
    daysSupplyPerPill: null,
    nextAuthorization: null,
  },
];

// Dose log keyed by `${medId}_${dateKey}_${time}` -> 'taken' | 'skipped'
export const seedDoseLog = {};

export const seedVitals = {
  bloodPressure: {
    unit: 'mmHg',
    entries: [
      { id: 'bp-1', systolic: 122, diastolic: 82, timestamp: daysAgoIso(1, '08:00'), notes: 'Normal routine.' },
      { id: 'bp-2', systolic: 120, diastolic: 80, timestamp: daysAgoIso(0, '08:30'), notes: 'Feeling rested after good sleep.' },
    ],
  },
  glucose: {
    unit: 'mg/dL',
    entries: [
      { id: 'gl-1', value: 95, context: 'fasting', timestamp: daysAgoIso(0, '07:00'), notes: 'Fasting.' },
    ],
  },
  pulse: {
    unit: 'bpm',
    entries: [
      { id: 'pu-1', value: 64, timestamp: daysAgoIso(6, '09:00') },
      { id: 'pu-2', value: 66, timestamp: daysAgoIso(5, '09:00') },
      { id: 'pu-3', value: 63, timestamp: daysAgoIso(4, '09:00') },
      { id: 'pu-4', value: 65, timestamp: daysAgoIso(3, '09:00') },
      { id: 'pu-5', value: 70, timestamp: daysAgoIso(2, '09:00') },
      { id: 'pu-6', value: 66, timestamp: daysAgoIso(1, '21:15') },
      { id: 'pu-7', value: 68, timestamp: daysAgoIso(0, '09:00'), notes: 'Post light walk.' },
    ],
  },
};

export const seedAppointments = [
  {
    id: 'appt-1',
    title: 'Cardiology Checkup',
    provider: 'Dr. Sarah Jenkins',
    specialty: 'Cardiology Specialist',
    location: 'City Heart Clinic, Room 302',
    date: daysFromNowDateKey(13),
    startTime: '10:30',
    endTime: '11:15',
    prepInstructions: null,
    status: 'confirmed',
  },
  {
    id: 'appt-2',
    title: 'Blood Work (Fasting)',
    provider: 'LabQuest Diagnostics',
    specialty: 'Laboratory',
    location: 'LabQuest Diagnostics, Downtown',
    date: daysFromNowDateKey(3),
    startTime: '09:00',
    endTime: '09:30',
    prepInstructions: 'Please fast for 12 hours prior to the appointment. Drink only water. Bring your current medication list.',
    status: 'confirmed',
  },
];

export const seedPendingAppointments = [
  {
    id: 'pending-1',
    title: 'Annual MRI Scan',
    requestedBy: 'Dr. Smith (Neurology)',
    requestedDaysAgo: 3,
  },
  {
    id: 'pending-2',
    title: 'Dental Cleaning',
    requestedBy: 'Routine checkup requirement.',
    requestedDaysAgo: 10,
  },
];

export const seedAlerts = [
  {
    id: 'alert-missed-med',
    type: 'missed-medication',
    title: 'Missed Medication',
    body: 'You missed your 8:00 AM dose of Lisinopril (10mg).',
    timestamp: daysAgoIso(0, new Date().getHours() + ':' + String(new Date().getMinutes()).padStart(2, '0')),
    relatedMedId: 'med-lisinopril',
    dismissed: false,
  },
  {
    id: 'alert-upcoming-appt',
    type: 'upcoming-appointment',
    title: 'Upcoming Appointment',
    body: 'Cardiology Checkup with Dr. Smith at 2:00 PM.',
    relatedAppointmentId: 'appt-1',
    dismissed: false,
  },
  {
    id: 'alert-weekly-summary',
    type: 'weekly-summary',
    title: 'Weekly Summary Ready',
    body: 'Your health metrics for this week are ready to review.',
    dismissed: false,
  },
];

export const seedAuthorizations = [
  {
    id: 'auth-mri',
    title: 'MRI Scan Request',
    body: 'Requested by Dr. Adams for lower back pain evaluation.',
    status: 'pending',
    validUntil: null,
  },
  {
    id: 'auth-pt',
    title: 'Physical Therapy (6 Sessions)',
    body: 'Approved by insurance provider.',
    status: 'approved',
    validUntil: daysFromNowDateKey(14),
  },
  {
    id: 'auth-bloodpanel',
    title: 'Blood Panel Test',
    body: 'Authorization expired.',
    status: 'expired',
    validUntil: daysAgoDateKey(30),
  },
];

// --- date helpers used only to build seed data (kept local to this file) ---
function daysAgoIso(n, time) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  const [h, m] = time.split(':');
  d.setHours(parseInt(h, 10), parseInt(m, 10), 0, 0);
  return d.toISOString();
}

function daysFromNowDateKey(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function daysAgoDateKey(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
