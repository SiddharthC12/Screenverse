import { useState, useEffect } from 'react';
import { getItem, setItem } from '../utils/storage';

/**
 * Custom React hook for synchronizing state with browser LocalStorage
 * @param {string} key - Storage key
 * @param {any} initialValue - Fallback value
 * @returns {[any, Function]} [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    return getItem(key, initialValue);
  });

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch {
          // ignore parsing error
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      setItem(key, valueToStore);
    } catch (error) {
      console.warn(`[useLocalStorage] Error updating key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
