import type {
  AboutContent,
  ContactContent,
  HomeContent,
  NavItem,
  ProductsContent,
  ProjectsContent,
  SocialLink,
  WhatsappAgent,
} from '../../domain/entities/site';
import type { ContentRepository } from '../../domain/ports/contentRepository';

/**
 * Application service: the single entry point the presentation layer uses
 * to read site content. It hides which repository provides the data.
 */
export class SiteService {
  private readonly repository: ContentRepository;

  constructor(repository: ContentRepository) {
    this.repository = repository;
  }

  navItems(): NavItem[] {
    return this.repository.getNavItems();
  }

  home(): HomeContent {
    return this.repository.getHome();
  }

  about(): AboutContent {
    return this.repository.getAbout();
  }

  products(): ProductsContent {
    return this.repository.getProducts();
  }

  projects(): ProjectsContent {
    return this.repository.getProjects();
  }

  contact(): ContactContent {
    return this.repository.getContact();
  }

  whatsappAgents(): WhatsappAgent[] {
    return this.repository.getWhatsappAgents();
  }

  homeFooterSocialLinks(): SocialLink[] {
    return this.repository.getHomeFooterSocialLinks();
  }

  contactSocialLinks(): SocialLink[] {
    return this.repository.getContactSocialLinks();
  }

  privacyNotice(): { label: string; href: string } {
    return this.repository.getPrivacyNotice();
  }
}
