import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithSite } from '../../test/renderHelper';
import { Header } from './Header';

describe('Header', () => {
  it('renders the logo and the five navigation links', () => {
    renderWithSite(<Header />);
    expect(screen.getByRole('link', { name: /elevadores altius/i })).toHaveAttribute(
      'href',
      '/',
    );
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toHaveTextContent('Inicio');
    expect(nav).toHaveTextContent('Quienes somos');
    expect(nav).toHaveTextContent('Productos');
    expect(nav).toHaveTextContent('Proyectos');
    expect(nav).toHaveTextContent('Contacto');
  });

  it('marks the current route as active', () => {
    renderWithSite(<Header />, { route: '/productos/' });
    const active = screen.getByRole('link', { name: 'Productos' });
    expect(active).toHaveClass('active');
    expect(screen.getByRole('link', { name: 'Contacto' })).not.toHaveClass('active');
  });

  it('toggles the mobile menu through the hamburger button', async () => {
    const user = userEvent.setup();
    renderWithSite(<Header />);
    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i });

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
