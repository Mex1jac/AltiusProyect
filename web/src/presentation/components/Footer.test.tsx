import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithSite } from '../../test/renderHelper';
import { Footer } from './Footer';

describe('Footer', () => {
  it('shows the copyright and the powered-by line', () => {
    renderWithSite(<Footer />);
    expect(screen.getByText(/Copyright © 2026 Elevadores Altius/)).toBeInTheDocument();
    expect(screen.getByText(/Powered by Sierra Industry/)).toBeInTheDocument();
  });
});
