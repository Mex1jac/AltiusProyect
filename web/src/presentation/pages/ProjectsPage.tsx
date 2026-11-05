import { Link } from 'react-router-dom';
import { useSite } from '../siteContext';
import { useReveal } from '../hooks/useReveal';
import { RichTextView } from '../components/RichTextView';
import './ProjectsPage.css';

/** Special projects page: inclined elevators, application areas and escalators. */
export function ProjectsPage() {
  const projects = useSite().projects();
  const inclinadosRef = useReveal<HTMLElement>();
  const escalerasRef = useReveal<HTMLElement>();

  return (
    <div className="page page-projects">
      <section className="projects-hero">
        <img className="projects-hero-bg" src={projects.hero.image} alt="" />
        <div className="projects-hero-overlay" />
        <div className="projects-hero-content">
          <h1>{projects.hero.title}</h1>
          <p className="projects-hero-line">{projects.hero.line1}</p>
          <p className="projects-hero-line accent">{projects.hero.line2}</p>
        </div>
      </section>

      <section className="projects-inclinados section" ref={inclinadosRef}>
        <div className="container reveal">
          <h2>{projects.inclinados.title}</h2>
          <p className="projects-subtitle">{projects.inclinados.subtitle}</p>

          <h3 className="projects-areas-title">{projects.inclinados.areasTitle}</h3>
          <ul className="projects-areas">
            {projects.inclinados.areas.map((area) => (
              <li key={area.label}>
                <i className={area.icon} aria-hidden="true" />
                <span>{area.label}</span>
              </li>
            ))}
          </ul>

          <div className="projects-columns">
            {projects.inclinados.columns.map((column, index) => (
              <article key={index} className="projects-column">
                <img src={column.image} alt={column.alt} loading="lazy" />
                <p>
                  <RichTextView value={column.text} />
                </p>
                {column.video && (
                  <div className="projects-video">
                    <iframe
                      src={column.video}
                      title="Elevadores inclinados Altius"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="projects-escaleras"
        style={{ backgroundImage: `url(${projects.escaleras.image})` }}
        ref={escalerasRef}
      >
        <div className="projects-escaleras-overlay" />
        <div className="container reveal">
          <h2>{projects.escaleras.title}</h2>
          <p className="projects-escaleras-intro">
            <RichTextView value={projects.escaleras.intro} />
          </p>

          <div className="projects-escaleras-grid">
            {projects.escaleras.cards.map((card) => (
              <article key={card.title} className="projects-esc-card">
                <img src={card.image} alt={card.alt} loading="lazy" />
                <div>
                  <h3>{card.title}</h3>
                  <p>
                    <RichTextView value={card.text} />
                  </p>
                </div>
              </article>
            ))}
          </div>

          {projects.escaleras.video && (
            <div className="projects-video wide">
              <iframe
                src={projects.escaleras.video}
                title="Escaleras eléctricas Altius"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          )}
        </div>
      </section>

      <section className="projects-cta">
        <div className="container center">
          <h2>{projects.cta.title}</h2>
          <Link className="btn btn-accent" to={projects.cta.button.path}>
            <i className={projects.cta.button.icon} aria-hidden="true" /> {projects.cta.button.label}
          </Link>
        </div>
      </section>
    </div>
  );
}
