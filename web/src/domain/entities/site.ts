// Domain entities: content shapes shared across the whole application.

/** A link rendered inline inside a paragraph. */
export interface TextLink {
  href: string;
  text: string;
}

/** A bold segment rendered inline inside a paragraph. */
export interface StrongText {
  strong: string;
}

export type TextPart = string | TextLink | StrongText;

/** Plain string or a sequence of inline parts (links / bold segments). */
export type RichText = string | TextPart[];

/** Main navigation entry. Paths are internal SPA routes. */
export interface NavItem {
  label: string;
  path: string;
}

/** External social network link with its Font Awesome icon and brand color. */
export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  color: string;
}

/** WhatsApp support agent shown in the floating chat widget. */
export interface WhatsappAgent {
  name: string;
  duty: string;
  phone: string;
  text: string;
}

/** Icon + label pair (e.g. application areas on the projects page). */
export interface IconLabel {
  icon: string;
  label: string;
}

export interface ButtonContent {
  label: string;
  icon?: string;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: ButtonContent & { path: string };
    slides: string[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: RichText[];
    cta: ButtonContent & { href: string };
  };
  products: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; text: RichText }>;
    cta: { title: string; button: ButtonContent & { path: string } };
    slides: string[];
  };
  tipos: {
    eyebrow: string;
    title: string;
    cards: Array<{
      title: string;
      href: string;
      image: string;
      alt: string;
      text: RichText;
    }>;
  };
  faq: {
    title: string;
    button: ButtonContent & { href: string };
  };
}

export interface AboutContent {
  hero: { image: string; logo: string; title: string };
  pillars: Array<{
    title: string;
    paragraphs?: RichText[];
    items?: string[];
    image: string;
    alt: string;
  }>;
  counters: {
    eyebrow: string;
    title: string;
    image: string;
    stats: Array<{ value: number; label: string }>;
  };
  quality: {
    statement: RichText;
    columns: Array<{
      title: string;
      boldTitle?: boolean;
      paragraphs: RichText[];
      image: string;
      alt: string;
    }>;
  };
  certificates: {
    title: string;
    items: Array<{ image: string; alt: string; href: string }>;
  };
  cta: {
    title: string;
    button: ButtonContent & { path: string };
    privacy: { label: string; href: string };
  };
  video: string;
}

export interface ProductCard {
  title: string;
  href: string;
  image: string;
  alt: string;
}

export interface ProductsContent {
  hero: string;
  intro: { paragraphs: RichText[]; image: string; alt: string };
  cards: ProductCard[];
  stats: {
    label: string;
    bars: Array<{ label: string; percent: number }>;
  };
  catalog: { label: string; href: string };
  cta: { title: string; button: ButtonContent & { path: string } };
}

export interface ProjectsContent {
  hero: { image: string; title: string; line1: string; line2: string };
  inclinados: {
    title: string;
    subtitle: string;
    areasTitle: string;
    areas: IconLabel[];
    columns: Array<{ image: string; alt: string; text: RichText; video?: string }>;
  };
  escaleras: {
    image: string;
    title: string;
    intro: RichText;
    cards: Array<{ image: string; alt: string; title: string; text: RichText }>;
    video?: string;
  };
  cta: { title: string; button: ButtonContent & { path: string } };
}

export interface ContactContent {
  hero: { image: string; title: string };
  offices: {
    title: string;
    intro: string;
    groups: Array<{ icon: string; lines: Array<string | TextLink> }>;
    image: string;
    alt: string;
  };
  quote: { title: string };
  map: string;
  video: string;
}
