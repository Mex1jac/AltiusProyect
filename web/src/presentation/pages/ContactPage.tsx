import { useSite } from '../siteContext';
import { useReveal } from '../hooks/useReveal';
import { SocialLinks } from '../components/SocialLinks';
import './ContactPage.css';

/** Contact page: offices list, quote request heading, social row, map and video. */
export function ContactPage() {
  const site = useSite();
  const contact = site.contact();
  const contactSocialLinks = site.contactSocialLinks();
  const officesRef = useReveal<HTMLElement>();

  return (
    <div className="page page-contact">
      <section className="contact-hero">
        <img className="contact-hero-bg" src={contact.hero.image} alt="" />
        <div className="contact-hero-overlay" />
        <div className="contact-hero-content">
          <h1>{contact.hero.title}</h1>
        </div>
      </section>

      <section className="contact-offices section" ref={officesRef}>
        <div className="container contact-grid reveal">
          <div className="contact-info">
            <h2>{contact.offices.title}</h2>
            <p className="contact-intro">{contact.offices.intro}</p>

            <ul className="contact-list">
              {contact.offices.groups.map((group, index) => (
                <li key={index}>
                  <span className="contact-list-icon" aria-hidden="true">
                    <i className={group.icon} />
                  </span>
                  <span className="contact-list-lines">
                    {group.lines.map((line, lineIndex) =>
                      typeof line === 'string' ? (
                        <span key={lineIndex}>{line}</span>
                      ) : (
                        <a key={lineIndex} href={line.href}>
                          {line.text}
                        </a>
                      ),
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <img
              className="contact-reception"
              src={contact.offices.image}
              alt={contact.offices.alt}
              loading="lazy"
            />
          </div>

          <aside className="contact-side">
            <h2>{contact.quote.title}</h2>
            {/* The original site's quote form widget renders empty; replicated as heading only. */}
            <SocialLinks
              links={contactSocialLinks}
              ariaLabel="Redes sociales de Elevadores Altius"
            />
          </aside>
        </div>
      </section>

      <section className="contact-map">
        <iframe
          src={contact.map}
          title="Mapa de Elevadores Altius"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <section className="contact-video">
        <iframe
          src={contact.video}
          title="Elevadores Altius"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </section>
    </div>
  );
}
