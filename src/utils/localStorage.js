// Centralized LocalStorage keys used across the app
export const STORAGE_KEYS = {
  USER: "workflow_user",
  EMPLOYEES: "workflow_employees",
  TASKS: "workflow_tasks",
  DEPARTMENTS: "workflow_departments",
  THEME: "workflow_theme",
};

/**
 * Reads and parses a value from LocalStorage.
 * Returns `fallback` when the key is missing or the JSON is invalid.
 */
export function getFromLocalStorage(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null || raw === undefined) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`Failed to read "${key}" from LocalStorage`, error);
    return fallback;
  }
}

/** Serializes and writes a value to LocalStorage. */
export function setToLocalStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to write "${key}" to LocalStorage`, error);
  }
}

/** Removes a key from LocalStorage. */
export function removeFromLocalStorage(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to remove "${key}" from LocalStorage`, error);
  }
}

/** Wipes every key WorkFlow owns, used by "Reset application data". */
export function clearAppStorage() {
  Object.values(STORAGE_KEYS).forEach(removeFromLocalStorage);
}
