import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithSite } from '../../test/renderHelper';
import { ContactPage } from './ContactPage';

describe('ContactPage', () => {
  it('renders the hero heading', () => {
    renderWithSite(<ContactPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Contacto' }),
    ).toBeInTheDocument();
  });

  it('lists every office group with its icon', () => {
    renderWithSite(<ContactPage />);
    expect(screen.getByRole('heading', { name: 'Ubicación y teléfonos' })).toBeInTheDocument();
    expect(screen.getByText('Nuestras oficinas se encuentra ubicadas en:')).toBeInTheDocument();
    expect(screen.getByText('Nicolas Bravo N. 1936')).toBeInTheDocument();
    expect(screen.getByText('25 poniente 1902')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '+52 55-7182-2000' })).toHaveAttribute(
      'href',
      'tel:+525571822000',
    );
    expect(screen.getByRole('link', { name: 'ventas@elevadoresaltius.com' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'puebla@elevadoresaltius.com' })).toBeInTheDocument();
  });

  it('shows the quote request heading without a form (as on the original site)', () => {
    renderWithSite(<ContactPage />);
    expect(screen.getByRole('heading', { name: 'Solicitud de cotización' })).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it('renders the ten social icons as external links', () => {
    renderWithSite(<ContactPage />);
    const socials = screen.getByRole('list', { name: /redes sociales/i });
    const links = socials.querySelectorAll('a');
    expect(links).toHaveLength(10);
    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('href')).toMatch(/^https:\/\//);
    }
    expect(screen.getByTitle('Facebook')).toBeInTheDocument();
    expect(screen.getByTitle('Weixin')).toBeInTheDocument();
  });

  it('embeds the Google map of the Metepec office', () => {
    const { container } = renderWithSite(<ContactPage />);
    const map = container.querySelector('.contact-map iframe') as HTMLIFrameElement;
    expect(map).toBeInTheDocument();
    expect(map.getAttribute('src')).toContain('maps.google.com/maps?q=');
    expect(map.getAttribute('src')).toContain('Totocuitlapilco');
  });

  it('embeds the promotional YouTube video without controls', () => {
    renderWithSite(<ContactPage />);
    const video = screen.getByTitle('Elevadores Altius');
    expect(video).toHaveAttribute('src', expect.stringContaining('yNvHjSVQK3Y'));
    expect(video.getAttribute('src')).toContain('controls=0');
  });
});
