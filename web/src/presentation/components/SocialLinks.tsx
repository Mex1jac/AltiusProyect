import type { SocialLink } from '../../domain/entities/site';

interface SocialLinksProps {
  links: SocialLink[];
  ariaLabel: string;
}

/** Row of brand-colored square social icons (50px, 10% radius like the original). */
export function SocialLinks({ links, ariaLabel }: SocialLinksProps) {
  return (
    <ul className="social-list" aria-label={ariaLabel}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            className="social-link"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: link.color }}
            title={link.label}
          >
            <i className={link.icon} aria-hidden="true" />
            <span className="visually-hidden">{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
