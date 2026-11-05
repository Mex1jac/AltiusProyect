import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Slideshow } from './Slideshow';

describe('Slideshow', () => {
  const slides = ['/images/a.jpg', '/images/b.jpg', '/images/c.jpg'];

  it('renders one slide per image with its background', () => {
    const { container } = render(<Slideshow slides={slides} />);
    const slideEls = container.querySelectorAll('.slideshow-slide');
    expect(slideEls).toHaveLength(3);
    expect(slideEls[0].getAttribute('style')).toContain('/images/a.jpg');
    expect(slideEls[2].getAttribute('style')).toContain('/images/c.jpg');
  });

  it('staggers the animation delays by the interval', () => {
    const { container } = render(<Slideshow slides={slides} intervalSeconds={5} />);
    const slideEls = container.querySelectorAll('.slideshow-slide');
    expect(slideEls[0].getAttribute('style')).toContain('--slide-delay: 0s');
    expect(slideEls[1].getAttribute('style')).toContain('--slide-delay: 5s');
    expect(slideEls[2].getAttribute('style')).toContain('--slide-delay: 10s');
    // Full cycle = slides * interval.
    expect(slideEls[0].getAttribute('style')).toContain('--slide-duration: 15s');
  });

  it('is hidden from assistive technology (decorative background)', () => {
    const { container } = render(<Slideshow slides={slides} />);
    expect(container.querySelector('.slideshow')).toHaveAttribute('aria-hidden', 'true');
  });
});
