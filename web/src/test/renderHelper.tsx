import { render, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import { SiteContext } from '../presentation/siteContext';
import { SiteService } from '../application/services/siteService';
import { StaticContentRepository } from '../infrastructure/staticContentRepository';

/** Application service wired to the static repository, as in the composition root. */
export const testSiteService = new SiteService(new StaticContentRepository());

interface RenderOptions {
  /** Initial route of the memory router (defaults to "/"). */
  route?: string;
}

/**
 * Renders UI with the site context and a memory router,
 * optionally at a specific route so route-aware components behave as in production.
 */
export function renderWithSite(
  ui: ReactElement,
  { route = '/' }: RenderOptions = {},
): RenderResult {
  return render(
    <SiteContext.Provider value={testSiteService}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="*" element={ui} />
        </Routes>
      </MemoryRouter>
    </SiteContext.Provider>,
  );
}

/** Renders the full app (context + router + routes) for integration tests. */
export function renderApp(route = '/'): RenderResult {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}
