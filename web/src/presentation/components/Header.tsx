import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSite } from '../siteContext';
import './Header.css';

/** Transparent header overlaid on every page hero, with mobile hamburger menu. */
export function Header() {
  const navItems = useSite().navItems();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // Close the mobile menu when the route changes (state adjusted during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const normalize = (path: string) => (path === '/' ? '/' : path.replace(/\/+$/, ''));
  const isActive = (path: string) => normalize(path) === normalize(pathname);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-logo" aria-label="Elevadores Altius - Inicio">
          <img src="/images/LogoAltusSimple2018.png" alt="Elevadores Altius" width={100} height={100} />
        </Link>

        <nav className={`site-nav${open ? ' is-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={isActive(item.path) ? 'active' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-bar" />
          <span className="menu-bar" />
          <span className="menu-bar" />
        </button>
      </div>
    </header>
  );
}
