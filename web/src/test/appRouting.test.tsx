import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderApp } from './renderHelper';

describe('App routing', () => {
  const routes: Array<[string, string | null, string]> = [
    ['/', 'LUJO CALIDAD Y SERVICIO', 'Inicio - Elevadores Altius'],
    ['/quienes-somos/', 'quienes somos', 'Quienes Somos - Elevadores Altius'],
    // The products hero is image-only (like the original), so its heading is an h2.
    ['/productos/', 'Bienvenidos a Elevadores Altius', 'Productos - Elevadores Altius'],
    [
      '/proyectos-especiales-en-america-latina/',
      'Proyectos',
      'Proyectos - Elevadores Altius',
    ],
    ['/contacto/', 'Contacto', 'Contacto - Elevadores Altius'],
  ];

  for (const [route, heading, title] of routes) {
    it(`renders ${route} and sets the document title`, () => {
      renderApp(route);
      expect(screen.getByRole('heading', { name: heading! })).toBeInTheDocument();
      expect(document.title).toBe(title);
    });
  }

  it('navigates between pages through the header links', async () => {
    const user = userEvent.setup();
    renderApp('/');
    const nav = screen.getByRole('navigation', { name: /main navigation/i });

    await user.click(within(nav).getByRole('link', { name: 'Productos' }));
    expect(
      screen.getByRole('heading', { name: 'Bienvenidos a Elevadores Altius' }),
    ).toBeInTheDocument();
    expect(document.title).toBe('Productos - Elevadores Altius');

    await user.click(within(nav).getByRole('link', { name: 'Contacto' }));
    expect(
      screen.getByRole('heading', { level: 1, name: 'Contacto' }),
    ).toBeInTheDocument();
    expect(document.title).toBe('Contacto - Elevadores Altius');
  });

  it('shows the home page for unknown routes', () => {
    renderApp('/ruta-inexistente/');
    expect(
      screen.getByRole('heading', { level: 1, name: 'LUJO CALIDAD Y SERVICIO' }),
    ).toBeInTheDocument();
  });

  it('keeps the header, footer and WhatsApp widget on every page', () => {
    renderApp('/contacto/');
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
    expect(screen.getByText(/Powered by Sierra Industry/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /abrir atención por whatsapp/i }),
    ).toBeInTheDocument();
  });
});
