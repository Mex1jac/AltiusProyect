import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SiteContext } from './presentation/siteContext';
import { SiteService } from './application/services/siteService';
import { StaticContentRepository } from './infrastructure/staticContentRepository';
import { Header } from './presentation/components/Header';
import { Footer } from './presentation/components/Footer';
import { WhatsAppWidget } from './presentation/components/WhatsAppWidget';
import { HomePage } from './presentation/pages/HomePage';
import { AboutPage } from './presentation/pages/AboutPage';
import { ProductsPage } from './presentation/pages/ProductsPage';
import { ProjectsPage } from './presentation/pages/ProjectsPage';
import { ContactPage } from './presentation/pages/ContactPage';

// Composition root: static repository -> application service -> context.
const siteService = new SiteService(new StaticContentRepository());

const pageTitles: Record<string, string> = {
  '/': 'Inicio - Elevadores Altius',
  '/quienes-somos/': 'Quienes Somos - Elevadores Altius',
  '/productos/': 'Productos - Elevadores Altius',
  '/proyectos-especiales-en-america-latina/': 'Proyectos - Elevadores Altius',
  '/contacto/': 'Contacto - Elevadores Altius',
};

/** Scrolls to the top and updates the document title on every route change. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const normalized = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;
    document.title = pageTitles[normalized] ?? 'Elevadores Altius';
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <SiteContext.Provider value={siteService}>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quienes-somos/" element={<AboutPage />} />
          <Route path="/productos/" element={<ProductsPage />} />
          <Route
            path="/proyectos-especiales-en-america-latina/"
            element={<ProjectsPage />}
          />
          <Route path="/contacto/" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppWidget />
    </SiteContext.Provider>
  );
}
