import { useEffect, useRef } from 'react';

/**
 * Adds the `is-visible` class to the element (and any `.reveal` descendant)
 * when it scrolls into view, mirroring the original site's entrance animations.
 * Falls back to visible immediately when IntersectionObserver is unavailable
 * (e.g. in unit tests), so content is never hidden.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reveal = (target: Element) => {
      target.classList.add('is-visible');
      for (const child of target.querySelectorAll('.reveal')) {
        child.classList.add('is-visible');
      }
    };

    if (typeof IntersectionObserver === 'undefined') {
      reveal(element);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}
