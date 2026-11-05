import type { CSSProperties } from 'react';

interface SlideshowProps {
  slides: string[];
  /** Number of seconds each slide stays visible (total cycle = slides.length * interval). */
  intervalSeconds?: number;
}

/**
 * Pure CSS cross-fade slideshow with a subtle Ken Burns zoom,
 * used as the background of the home hero and the products section.
 */
export function Slideshow({ slides, intervalSeconds = 5 }: SlideshowProps) {
  return (
    <div className="slideshow" aria-hidden="true">
      {slides.map((slide, index) => (
        <div
          key={slide}
          className="slideshow-slide"
          style={
            {
              backgroundImage: `url(${slide})`,
              '--slide': index,
              '--slide-duration': `${slides.length * intervalSeconds}s`,
              '--slide-delay': `${index * intervalSeconds}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
