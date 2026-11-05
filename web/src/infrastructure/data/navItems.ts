import type { NavItem } from '../../domain/entities/site';

/** Origin of the live site; used for links that live outside the SPA scope. */
export const SITE_ORIGIN = 'https://www.elevadoresaltius.com';

/** The five main pages; paths mirror the original WordPress slugs. */
export const navItems: NavItem[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Quienes somos', path: '/quienes-somos/' },
  { label: 'Productos', path: '/productos/' },
  { label: 'Proyectos', path: '/proyectos-especiales-en-america-latina/' },
  { label: 'Contacto', path: '/contacto/' },
];
