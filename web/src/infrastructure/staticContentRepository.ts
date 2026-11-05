import type {
  AboutContent,
  ContactContent,
  HomeContent,
  NavItem,
  ProductsContent,
  ProjectsContent,
  SocialLink,
  WhatsappAgent,
} from '../domain/entities/site';
import type { ContentRepository } from '../domain/ports/contentRepository';
import { aboutContent } from './data/aboutContent';
import { contactContent } from './data/contactContent';
import { homeContent } from './data/homeContent';
import { navItems } from './data/navItems';
import { productsContent } from './data/productsContent';
import { projectsContent } from './data/projectsContent';
import { contactSocialLinks, homeFooterSocialLinks, privacyNotice } from './data/socialLinks';
import { whatsappAgents } from './data/whatsappAgents';

/**
 * Infrastructure adapter that serves the static content bundled with the app.
 * In a future task this repository can be swapped for an API-backed one
 * without changing the application or presentation layers.
 */
export class StaticContentRepository implements ContentRepository {
  getNavItems(): NavItem[] {
    return navItems;
  }

  getHome(): HomeContent {
    return homeContent;
  }

  getAbout(): AboutContent {
    return aboutContent;
  }

  getProducts(): ProductsContent {
    return productsContent;
  }

  getProjects(): ProjectsContent {
    return projectsContent;
  }

  getContact(): ContactContent {
    return contactContent;
  }

  getWhatsappAgents(): WhatsappAgent[] {
    return whatsappAgents;
  }

  getHomeFooterSocialLinks(): SocialLink[] {
    return homeFooterSocialLinks;
  }

  getContactSocialLinks(): SocialLink[] {
    return contactSocialLinks;
  }

  getPrivacyNotice(): { label: string; href: string } {
    return privacyNotice;
  }
}
