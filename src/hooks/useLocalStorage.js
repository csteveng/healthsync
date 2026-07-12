import { useState, useCallback } from 'react';

const STORAGE_PREFIX = 'healthsync:';

function readValue(key, fallback) {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`HealthSync: failed to read "${key}" from localStorage`, err);
    return fallback;
  }
}

/**
 * useLocalStorage - stateful value persisted to localStorage.
 * Returns [value, setValue, { saveError }] so callers can surface
 * a non-alarming message if a write fails (full/disabled storage).
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValueState] = useState(() => readValue(key, initialValue));
  const [saveError, setSaveError] = useState(false);

  const setValue = useCallback(
    (next) => {
      setValueState((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        try {
          window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(resolved));
          setSaveError(false);
        } catch (err) {
          console.error(`HealthSync: failed to save "${key}" to localStorage`, err);
          setSaveError(true);
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, setValue, { saveError }];
}
