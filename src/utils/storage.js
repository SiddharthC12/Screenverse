/**
 * SCREENVERSE – LocalStorage Utilities
 * Safe wrapper functions for browser local storage access with error handling and fallback defaults.
 */

/**
 * Safely retrieve parsed JSON data from localStorage
 * @param {string} key - Storage key
 * @param {any} fallback - Default value if key is not found or parsing fails
 * @returns {any} Parsed value or fallback
 */
export const getItem = (key, fallback = null) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`[SCREENVERSE Storage] Error reading key "${key}":`, error);
    return fallback;
  }
};

/**
 * Safely store stringified JSON data in localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to serialize and store
 * @returns {boolean} True if write succeeded, false otherwise
 */
export const setItem = (key, value) => {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`[SCREENVERSE Storage] Error writing key "${key}":`, error);
    return false;
  }
};

/**
 * Safely remove an item from localStorage
 * @param {string} key - Storage key to remove
 * @returns {boolean} True if deletion succeeded
 */
export const removeItem = (key) => {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`[SCREENVERSE Storage] Error removing key "${key}":`, error);
    return false;
  }
};

/**
 * Clear all SCREENVERSE keys from localStorage
 */
export const clearAppStorage = () => {
  if (typeof window === 'undefined') return;
  try {
    const keysToRemove = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith('screenverse_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => window.localStorage.removeItem(k));
  } catch (error) {
    console.warn('[SCREENVERSE Storage] Error clearing app storage:', error);
  }
};
