/**
 * 防抖函数与相关 React Hooks
 */
export const debounce = (func, delay = 300) => {
  let timerId = null;
  const debounced = (...args) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
      timerId = null;
    }, delay);
  };
  debounced.cancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };
  debounced.flush = (...args) => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    func(...args);
  };
  return debounced;
};

import { useState, useEffect, useRef, useCallback } from 'react';

export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

export const useDebounceCallback = (callback, delay = 300, deps = []) => {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  const debouncedRef = useRef(debounce((...args) => callbackRef.current(...args), delay));
  useEffect(() => {
    debouncedRef.current = debounce((...args) => callbackRef.current(...args), delay);
    return () => debouncedRef.current?.cancel?.();
  }, [delay, ...deps]);
  return useCallback((...args) => debouncedRef.current?.(...args), []);
};

export const useApiDebounce = (apiCall, delay = 1000) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const debouncedCall = debounce(async (...args) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, delay);
  return { debouncedCall, loading, data, error };
};

export default { debounce, useDebounce, useDebounceCallback, useApiDebounce };