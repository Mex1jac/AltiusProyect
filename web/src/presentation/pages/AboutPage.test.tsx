import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithSite } from '../../test/renderHelper';
import { AboutPage } from './AboutPage';

describe('AboutPage', () => {
  it('renders the hero with logo and title', () => {
    renderWithSite(<AboutPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'quienes somos' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Elevadores Altius' })).toBeInTheDocument();
  });

  it('renders the Misión, Visión and Valores pillars', () => {
    renderWithSite(<AboutPage />);
    expect(screen.getByRole('heading', { name: 'Misión' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Visión' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Valores' })).toBeInTheDocument();
    // Valores is a list of 13 items.
    expect(screen.getByRole('list')).toHaveTextContent('Trabajo en equipo');
    expect(screen.getByRole('list')).toHaveTextContent('Calidad total');
  });

  it('shows the final counter values (no IntersectionObserver in jsdom)', async () => {
    renderWithSite(<AboutPage />);
    await waitFor(() => {
      expect(screen.getByText('250')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('200')).toBeInTheDocument();
    });
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Años de Experiencia')).toBeInTheDocument();
    expect(screen.getByText('Proyectos Completados')).toBeInTheDocument();
  });

  it('renders the three quality columns and the three certificates', () => {
    renderWithSite(<AboutPage />);
    expect(
      screen.getByRole('heading', { name: 'Soluciones Innovadoras.' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Calidad insuperable' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /usted puede confiar/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Certificados de Calidad y Seguridad' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'TÜV SÜD' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Certificación ISO 9001' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'UNE' })).toBeInTheDocument();
  });

  it('embeds the YouTube video and links the privacy notice', () => {
    renderWithSite(<AboutPage />);
    const video = screen.getByTitle('Elevadores Altius');
    expect(video).toHaveAttribute('src', expect.stringContaining('sBqS7nBP6cI'));
    expect(
      screen.getByRole('link', { name: /aviso de privacidad/i }),
    ).toHaveAttribute('href', expect.stringContaining('elevadoresaltius.com'));
  });

  it('links the CTA to the contact page', () => {
    renderWithSite(<AboutPage />);
    expect(screen.getByRole('link', { name: /más información/i })).toHaveAttribute(
      'href',
      '/contacto/',
    );
  });
});
