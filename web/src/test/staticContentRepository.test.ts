import { describe, expect, it } from 'vitest';
import { StaticContentRepository } from '../infrastructure/staticContentRepository';

/**
 * Data integrity of the static repository: the presentation layer
 * relies on these invariants (unique routes, local images, valid links).
 */
describe('StaticContentRepository', () => {
  const repository = new StaticContentRepository();

  it('keeps nav paths unique and matching the original WordPress slugs', () => {
    const paths = repository.getNavItems().map((item) => item.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toEqual([
      '/',
      '/quienes-somos/',
      '/productos/',
      '/proyectos-especiales-en-america-latina/',
      '/contacto/',
    ]);
  });

  it('references only bundled images for the home hero slides', () => {
    const slides = repository.getHome().hero.slides;
    expect(slides).toHaveLength(3);
    for (const slide of slides) {
      expect(slide.startsWith('/images/')).toBe(true);
    }
  });

  it('links product detail pages to the original site (out of SPA scope)', () => {
    const cards = repository.getProducts().cards;
    expect(cards).toHaveLength(12);
    for (const card of cards) {
      expect(card.href.startsWith('https://www.elevadoresaltius.com/')).toBe(true);
      expect(card.image.startsWith('/images/')).toBe(true);
    }
  });

  it('keeps product sales bars summing to 100 percent', () => {
    const total = repository
      .getProducts()
      .stats.bars.reduce((sum, bar) => sum + bar.percent, 0);
    expect(total).toBe(100);
  });

  it('has non-empty counters with numeric values', () => {
    const stats = repository.getAbout().counters.stats;
    expect(stats.map((stat) => stat.value)).toEqual([250, 10, 200]);
    for (const stat of stats) {
      expect(stat.label.length).toBeGreaterThan(0);
    }
  });

  it('lists eight application areas for inclined elevators', () => {
    const areas = repository.getProjects().inclinados.areas;
    expect(areas).toHaveLength(8);
    for (const area of areas) {
      expect(area.icon).toMatch(/fa-/);
    }
  });

  it('keeps all contact office lines non-empty', () => {
    const groups = repository.getContact().offices.groups;
    expect(groups).toHaveLength(6);
    for (const group of groups) {
      expect(group.icon).toMatch(/fa-/);
      expect(group.lines.length).toBeGreaterThan(0);
      for (const line of group.lines) {
        const text = typeof line === 'string' ? line : line.text;
        expect(text.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('provides unique WhatsApp agents with distinct phones', () => {
    const agents = repository.getWhatsappAgents();
    const phones = agents.map((agent) => agent.phone);
    expect(new Set(phones).size).toBe(phones.length);
    for (const agent of agents) {
      expect(agent.name.length).toBeGreaterThan(0);
      expect(agent.duty.length).toBeGreaterThan(0);
    }
  });

  it('gives every social link a brand color, icon and external url', () => {
    const links = [...repository.getHomeFooterSocialLinks(), ...repository.getContactSocialLinks()];
    for (const link of links) {
      expect(link.href).toMatch(/^https:\/\//);
      expect(link.icon).toMatch(/^fab fa-/);
      expect(link.color).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});
