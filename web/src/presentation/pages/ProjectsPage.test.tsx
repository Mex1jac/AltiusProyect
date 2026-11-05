import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithSite } from '../../test/renderHelper';
import { ProjectsPage } from './ProjectsPage';

describe('ProjectsPage', () => {
  it('renders the hero with the yellow accent line', () => {
    renderWithSite(<ProjectsPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Proyectos' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Nuestros proyectos son')).toBeInTheDocument();
    expect(screen.getByText('Increibles y Extraordinarios')).toBeInTheDocument();
  });

  it('renders the inclined elevators section with its 8 application areas', () => {
    renderWithSite(<ProjectsPage />);
    expect(
      screen.getByRole('heading', { name: 'Elevadores Inclinados' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/única empresa en México/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Áreas de Aplicación' })).toBeInTheDocument();
    expect(screen.getByText('Comercial')).toBeInTheDocument();
    expect(screen.getByText('Montaña')).toBeInTheDocument();
    expect(screen.getByText('Tráfico')).toBeInTheDocument();
    expect(screen.getByText('Almacenes')).toBeInTheDocument();
    expect(screen.getByText('Atracciones')).toBeInTheDocument();
    expect(screen.getByText('Villas')).toBeInTheDocument();
    expect(screen.getByText('Especiales')).toBeInTheDocument();
    expect(screen.getByText('Edificios Antiguos')).toBeInTheDocument();
  });

  it('embeds the inclined elevator video', () => {
    renderWithSite(<ProjectsPage />);
    const video = screen.getByTitle('Elevadores inclinados Altius');
    expect(video).toHaveAttribute('src', expect.stringContaining('GzO-l3-z7ns'));
  });

  it('renders the escalators section with its two project cards', () => {
    renderWithSite(<ProjectsPage />);
    expect(screen.getByRole('heading', { name: 'Escaleras Eléctricas' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Escaleras eléctricas instaladas en vía pública' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Terminados de acuerdo al cliente' }),
    ).toBeInTheDocument();
    const escaleraVideo = screen.getByTitle('Escaleras eléctricas Altius');
    expect(escaleraVideo).toHaveAttribute('src', expect.stringContaining('sCjQSCiMYd8'));
  });

  it('links the CTA to the contact page', () => {
    renderWithSite(<ProjectsPage />);
    expect(screen.getByRole('link', { name: /contacto/i })).toHaveAttribute(
      'href',
      '/contacto/',
    );
  });
});
