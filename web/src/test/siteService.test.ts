import { describe, expect, it } from 'vitest';
import { SiteService } from '../application/services/siteService';
import { StaticContentRepository } from '../infrastructure/staticContentRepository';

describe('SiteService', () => {
  const service = new SiteService(new StaticContentRepository());

  it('returns the five main navigation items in order', () => {
    const labels = service.navItems().map((item) => item.label);
    expect(labels).toEqual([
      'Inicio',
      'Quienes somos',
      'Productos',
      'Proyectos',
      'Contacto',
    ]);
  });

  it('points every nav path to an internal SPA route', () => {
    for (const item of service.navItems()) {
      expect(item.path).toMatch(/^\//);
      expect(item.path.startsWith('http')).toBe(false);
    }
  });

  it('exposes the content of every page', () => {
    expect(service.home().hero.title).toBe('LUJO CALIDAD Y SERVICIO');
    expect(service.about().hero.title).toBe('quienes somos');
    expect(service.products().cards).toHaveLength(12);
    expect(service.projects().hero.title).toBe('Proyectos');
    expect(service.contact().hero.title).toBe('Contacto');
  });

  it('returns the WhatsApp support team', () => {
    const agents = service.whatsappAgents();
    expect(agents).toHaveLength(3);
    expect(agents.every((agent) => agent.phone.startsWith('52'))).toBe(true);
  });

  it('returns social links for the home footer and the contact page', () => {
    expect(service.homeFooterSocialLinks()).toHaveLength(3);
    expect(service.contactSocialLinks()).toHaveLength(10);
  });

  it('returns the privacy notice pointing to the original site', () => {
    const notice = service.privacyNotice();
    expect(notice.label).toBe('Aviso de Privacidad');
    expect(notice.href).toContain('elevadoresaltius.com');
  });
});
