import { useEffect, useRef, useState, type RefObject } from 'react';

interface CountUpResult {
  count: number;
  ref: RefObject<HTMLSpanElement | null>;
}

/** True when the browser cannot (or should not) animate the counter. */
function prefersImmediateCount(): boolean {
  if (typeof IntersectionObserver === 'undefined') return true;
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Animates a number from 0 to `value` when it scrolls into view,
 * like the original "Los números hablan" counters.
 * Renders the final value immediately when IntersectionObserver is
 * unavailable (unit tests) or when reduced motion is requested.
 */
export function useCountUp(value: number): CountUpResult {
  const immediate = prefersImmediateCount();
  const [count, setCount] = useState(() => (immediate ? value : 0));
  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (immediate) return;
    const element = ref.current;
    if (!element) return;

    const animate = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const duration = 1600;
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(value * eased));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animate();
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [immediate, value]);

  return { count, ref };
}
