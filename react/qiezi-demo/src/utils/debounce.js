/**
 * 防抖函数（带取消/立即执行能力）
 * @param {Function} func - 需要防抖的函数
 * @param {number} delay - 延迟时间(毫秒)
 */
export const debounce = (func, delay = 300) => {
  let timerId = null;

  const clearTimer = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  const debounced = (...args) => {
    clearTimer();
    return new Promise((resolve, reject) => {
      timerId = setTimeout(async () => {
        try {
          const result = await func(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          timerId = null;
        }
      }, delay);
    });
  };

  // 取消尚未执行的回调（不触发回调）
  debounced.cancel = () => {
    clearTimer();
  };

  // 立即执行并清理计时器，返回执行结果（支持异步）
  debounced.flush = (...args) => {
    clearTimer();
    return Promise.resolve().then(() => func(...args));
  };

  return debounced;
};

/**
 * React Hook 版本的防抖
 * @param {*} value - 需要防抖的值
 * @param {number} delay - 延迟时间(毫秒)
 */
import { useState, useEffect, useRef, useCallback } from 'react';

export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * 防抖回调 Hook
 * @param {Function} callback - 回调函数
 * @param {number} delay - 延迟时间
 * @param {Array} deps - 依赖数组
 */
export const useDebounceCallback = (callback, delay = 300, deps = []) => {
  const callbackRef = useRef(callback);
  // 始终保持最新回调
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedRef = useRef(debounce((...args) => callbackRef.current(...args), delay));

  // 当 delay 或外部依赖变化时，重建防抖函数
  useEffect(() => {
    debouncedRef.current = debounce((...args) => callbackRef.current(...args), delay);
    return () => debouncedRef.current?.cancel?.();
  }, [delay, ...deps]);

  // 返回稳定的调用入口，避免父组件重复渲染
  return useCallback((...args) => debouncedRef.current?.(...args), []);
};

/**
 * API 请求防抖 Hook (防止重复请求)
 * @param {Function} apiCall - API 调用函数
 * @param {number} delay - 延迟时间
 */
export const useApiDebounce = (apiCall, delay = 1000) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  const debouncedCall = debounce(async (...args) => {
    if (loading) return; // 防止重复调用
    
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

export default {
  debounce,
  useDebounce,
  useDebounceCallback,
  useApiDebounce
};