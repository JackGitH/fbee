'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number; // in milliseconds, default 2500
  decimals?: number;
  start?: number;
  enabled?: boolean; // default true
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function useCountUp({ end, duration = 2500, decimals = 0, start = 0, enabled = true }: UseCountUpOptions) {
  const [value, setValue] = useState(start);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const animate = useCallback((timestamp: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp;
    }
    
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutExpo(progress);
    const currentValue = start + (end - start) * easedProgress;
    
    setValue(Number(currentValue.toFixed(decimals)));
    
    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [end, duration, decimals, start]);

  useEffect(() => {
    if (!enabled) {
      setValue(start);
      return;
    }
    
    startTimeRef.current = null;
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate, enabled, start]);

  return value;
}
