import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithSite } from '../../test/renderHelper';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('renders the hero with title, subtitle and CTA', () => {
    renderWithSite(<HomePage />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'LUJO CALIDAD Y SERVICIO' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Creemos que la verdadera innovación es la que piensa en todo'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /más información/i })).toHaveAttribute(
      'href',
      '/contacto/',
    );
  });

  it('renders the about section with its two paragraphs', () => {
    renderWithSite(<HomePage />);
    expect(
      screen.getByRole('heading', { name: /empresa 100% mexicana/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /ubicación/i }),
    ).toHaveAttribute('href', 'https://maps.app.goo.gl/3bdkLmLh7z9D5my47');
  });

  it('renders the three product blurbs with their accent titles', () => {
    renderWithSite(<HomePage />);
    expect(screen.getByRole('heading', { name: 'Elevadores Hidráulicos' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Elevadores Eléctricos' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Escaleras Eléctricas' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /productos/i }),
    ).toHaveAttribute('href', '/productos/');
  });

  it('renders the four elevator type cards', () => {
    const { container } = renderWithSite(<HomePage />);
    expect(screen.getByRole('heading', { name: 'Elevadores para autos' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Elevadores Residenciales Panorámicos' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Elevadores Comerciales' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Elevadores para hospital' })).toBeInTheDocument();
    expect(container.querySelectorAll('.home-tipo-card')).toHaveLength(4);
  });

  it('links the FAQ button to the original site', () => {
    renderWithSite(<HomePage />);
    const faq = screen.getByRole('link', { name: /preguntas frecuentes faq/i });
    expect(faq).toHaveAttribute(
      'href',
      'https://www.elevadoresaltius.com/preguntas-frecuentes/',
    );
  });

  it('shows the home footer social row and the privacy pill', () => {
    renderWithSite(<HomePage />);
    const socials = screen.getByRole('list', { name: /redes sociales/i });
    expect(socials.querySelectorAll('a')).toHaveLength(3);
    expect(screen.getByRole('link', { name: 'Aviso de Privacidad' })).toBeInTheDocument();
  });
});
