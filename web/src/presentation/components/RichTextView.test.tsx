import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RichTextView } from './RichTextView';
import type { RichText } from '../../domain/entities/site';

describe('RichTextView', () => {
  it('renders a plain string as-is', () => {
    render(<RichTextView value="Hola mundo" />);
    expect(screen.getByText('Hola mundo')).toBeInTheDocument();
  });

  it('renders bold segments', () => {
    const value: RichText = ['En ', { strong: 'Altius' }, ' construimos.'];
    const { container } = render(<RichTextView value={value} />);
    expect(screen.getByText('Altius').tagName).toBe('STRONG');
    expect(container.textContent).toContain('En ');
    expect(container.textContent).toContain(' construimos.');
  });

  it('renders inline links with their href', () => {
    const value: RichText = ['Visita ', { href: 'https://example.com', text: 'nuestro sitio' }, '.'];
    render(<RichTextView value={value} />);
    const link = screen.getByRole('link', { name: 'nuestro sitio' });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
