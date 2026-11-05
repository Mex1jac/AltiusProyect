import type {
  AboutContent,
  ContactContent,
  HomeContent,
  NavItem,
  ProductsContent,
  ProjectsContent,
  SocialLink,
  WhatsappAgent,
} from '../entities/site';

/** Access to every piece of site content needed by the presentation layer. */
export interface ContentRepository {
  getNavItems(): NavItem[];
  getHome(): HomeContent;
  getAbout(): AboutContent;
  getProducts(): ProductsContent;
  getProjects(): ProjectsContent;
  getContact(): ContactContent;
  getWhatsappAgents(): WhatsappAgent[];
  getHomeFooterSocialLinks(): SocialLink[];
  getContactSocialLinks(): SocialLink[];
  getPrivacyNotice(): { label: string; href: string };
}
