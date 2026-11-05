import { createContext, useContext } from 'react';
import type { SiteService } from '../application/services/siteService';

/** Composition root injects the application service here (ports over DI). */
export const SiteContext = createContext<SiteService | null>(null);

/** Presentation hook to read site content through the application service. */
export function useSite(): SiteService {
  const service = useContext(SiteContext);
  if (!service) {
    throw new Error('useSite must be used inside <SiteContext.Provider>');
  }
  return service;
}
