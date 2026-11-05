import '@testing-library/jest-dom/vitest';

// jsdom does not implement scrolling; keep route changes silent in tests.
window.scrollTo = () => {};

// jsdom lacks matchMedia; the count-up hook needs it for reduced-motion checks.
if (!window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
