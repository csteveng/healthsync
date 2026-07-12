import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  seedProfile,
  seedMedications,
  seedDoseLog,
  seedVitals,
  seedAppointments,
  seedPendingAppointments,
  seedAlerts,
  seedAuthorizations,
} from '../data/seedData';
import { todayKey, recurrenceAppliesOn, daysBetween } from '../utils/date';

const HealthDataContext = createContext(null);

function doseKey(medId, dateKey, time) {
  return `${medId}_${dateKey}_${time}`;
}

export function HealthDataProvider({ children }) {
  const [profile] = useLocalStorage('profile', seedProfile);
  const [medications, setMedications, medSave] = useLocalStorage('medications', seedMedications);
  const [doseLog, setDoseLog, doseSave] = useLocalStorage('doseLog', seedDoseLog);
  const [vitals, setVitals, vitalsSave] = useLocalStorage('vitals', seedVitals);
  const [appointments, setAppointments, apptSave] = useLocalStorage('appointments', seedAppointments);
  const [pendingAppointments, setPendingAppointments, pendingSave] = useLocalStorage(
    'pendingAppointments',
    seedPendingAppointments
  );
  const [alerts, setAlerts, alertsSave] = useLocalStorage('alerts', seedAlerts);
  const [authorizations, setAuthorizations, authSave] = useLocalStorage('authorizations', seedAuthorizations);

  const saveError =
    medSave.saveError ||
    doseSave.saveError ||
    vitalsSave.saveError ||
    apptSave.saveError ||
    pendingSave.saveError ||
    alertsSave.saveError ||
    authSave.saveError;

  // --- derived: today's medication doses, each with a single toggleable status ---
  const todaysDoses = useMemo(() => {
    const dateKey = todayKey();
    const today = new Date();
    const doses = [];
    for (const med of medications) {
      if (!recurrenceAppliesOn(med.recurrence, today)) continue;
      for (const slot of med.schedule) {
        const key = doseKey(med.id, dateKey, slot.time);
        doses.push({
          key,
          medId: med.id,
          medName: med.name,
          dosage: med.dosage,
          time: slot.time,
          label: slot.label,
          status: doseLog[key] || 'pending', // 'pending' | 'taken' | 'skipped'
        });
      }
    }
    return doses.sort((a, b) => a.time.localeCompare(b.time));
  }, [medications, doseLog]);

  const pendingDoseCount = useMemo(
    () => todaysDoses.filter((d) => d.status === 'pending').length,
    [todaysDoses]
  );

  function setDoseStatus(medId, time, status) {
    const dateKey = todayKey();
    const key = doseKey(medId, dateKey, time);
    setDoseLog((prev) => {
      const next = { ...prev };
      // Toggling the same status again reverts to pending (single toggleable state, no duplicates).
      if (next[key] === status) {
        delete next[key];
      } else {
        next[key] = status;
      }
      return next;
    });
  }

  const lowStockMedications = useMemo(
    () => medications.filter((m) => m.inventory <= m.lowStockThreshold),
    [medications]
  );

  const latestVital = (metric) => {
    const entries = vitals[metric]?.entries || [];
    if (entries.length === 0) return null;
    return [...entries].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
  };

  const trend = (metric, count = 7) => {
    const entries = vitals[metric]?.entries || [];
    return [...entries]
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .slice(-count);
  };

  function addVitalEntry(metric, entry) {
    setVitals((prev) => ({
      ...prev,
      [metric]: {
        ...prev[metric],
        entries: [...(prev[metric]?.entries || []), entry],
      },
    }));
  }

  const nextAppointment = useMemo(() => {
    const upcoming = appointments
      .filter((a) => daysBetween(new Date(), new Date(a.date)) >= 0)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    return upcoming[0] || null;
  }, [appointments]);

  const activeAlerts = useMemo(() => alerts.filter((a) => !a.dismissed), [alerts]);

  function dismissAlert(alertId) {
    setAlerts((prev) => prev.map((a) => (a.id === alertId ? { ...a, dismissed: true } : a)));
  }

  function addMedication(med) {
    setMedications((prev) => [...prev, med]);
  }

  function updateMedicationInventory(medId, delta) {
    setMedications((prev) =>
      prev.map((m) => (m.id === medId ? { ...m, inventory: Math.max(0, m.inventory + delta) } : m))
    );
  }

  const value = {
    profile,
    medications,
    addMedication,
    updateMedicationInventory,
    todaysDoses,
    pendingDoseCount,
    setDoseStatus,
    lowStockMedications,
    vitals,
    latestVital,
    trend,
    addVitalEntry,
    appointments,
    setAppointments,
    pendingAppointments,
    setPendingAppointments,
    nextAppointment,
    alerts: activeAlerts,
    dismissAlert,
    authorizations,
    setAuthorizations,
    saveError,
  };

  return <HealthDataContext.Provider value={value}>{children}</HealthDataContext.Provider>;
}

export function useHealthData() {
  const ctx = useContext(HealthDataContext);
  if (!ctx) throw new Error('useHealthData must be used within a HealthDataProvider');
  return ctx;
}
