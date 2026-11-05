import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithSite } from '../../test/renderHelper';
import { ProductsPage } from './ProductsPage';

describe('ProductsPage', () => {
  it('renders the image-only hero band without headings', () => {
    const { container } = renderWithSite(<ProductsPage />);
    const hero = container.querySelector('.products-hero') as HTMLElement;
    expect(hero).toBeInTheDocument();
    expect(hero.style.backgroundImage).toContain('montacoches-hidral.jpg');
    expect(container.querySelector('.products-hero h1')).toBeNull();
  });

  it('renders the intro with both paragraphs and the service image', () => {
    renderWithSite(<ProductsPage />);
    expect(
      screen.getByRole('heading', { name: /bienvenidos a elevadores altius/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/encuentre la solución ideal/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Representante de servicio al cliente' }),
    ).toBeInTheDocument();
  });

  it('renders the 12 product cards linking to the original site', () => {
    renderWithSite(<ProductsPage />);
    const cards = screen.getAllByRole('link', { name: /elevadores|montacargas|montaplatos|pasillos|salvaescaleras|escaleras/i });
    expect(cards).toHaveLength(12);
    for (const card of cards) {
      expect(card).toHaveAttribute('href', expect.stringContaining('elevadoresaltius.com'));
    }
    expect(screen.getByRole('link', { name: 'Montaplatos' })).toHaveAttribute(
      'href',
      'https://www.elevadoresaltius.com/montaplatos/',
    );
    expect(screen.getByRole('link', { name: /salvaescaleras/i })).toBeInTheDocument();
  });

  it('renders the four sales bars with their percentages', () => {
    renderWithSite(<ProductsPage />);
    expect(screen.getByText('Elevadores Comerciales')).toBeInTheDocument();
    expect(screen.getByText('Elevadores Domésticos')).toBeInTheDocument();
    expect(screen.getByText('Montacoches')).toBeInTheDocument();
    expect(screen.getByText('Escaleras')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
    expect(screen.getAllByText('10%')).toHaveLength(2);
  });

  it('links the catalog PDF to the original site', () => {
    renderWithSite(<ProductsPage />);
    const catalog = screen.getByRole('link', { name: /catálogo completo de cabinas/i });
    expect(catalog).toHaveAttribute(
      'href',
      expect.stringContaining('/wp-content/uploads/2022/11/Catalogo2022.pdf'),
    );
  });

  it('links the CTA to the contact page', () => {
    renderWithSite(<ProductsPage />);
    expect(screen.getByRole('link', { name: /listo para ordenar/i })).toHaveAttribute(
      'href',
      '/contacto/',
    );
  });
});
