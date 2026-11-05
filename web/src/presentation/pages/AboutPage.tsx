import { Link } from 'react-router-dom';
import { useSite } from '../siteContext';
import { useReveal } from '../hooks/useReveal';
import { useCountUp } from '../hooks/useCountUp';
import { RichTextView } from '../components/RichTextView';
import './AboutPage.css';

function Counter({ value, label }: { value: number; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="about-stat">
      <span className="about-stat-value" ref={ref}>
        {count}
      </span>
      <span className="about-stat-label">{label}</span>
    </div>
  );
}

/** "Quienes somos": mission/vision/values, counters, quality, certificates and video. */
export function AboutPage() {
  const about = useSite().about();
  const pillarsRef = useReveal<HTMLElement>();
  const countersRef = useReveal<HTMLElement>();
  const qualityRef = useReveal<HTMLElement>();
  const certsRef = useReveal<HTMLElement>();
  const videoRef = useReveal<HTMLElement>();

  return (
    <div className="page page-about">
      <section className="about-hero">
        <img className="about-hero-bg" src={about.hero.image} alt="" />
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <img className="about-hero-logo" src={about.hero.logo} alt="Elevadores Altius" />
          <h1>{about.hero.title}</h1>
        </div>
      </section>

      <section className="about-pillars section" ref={pillarsRef}>
        <div className="container reveal">
          <div className="about-pillars-grid">
            {about.pillars.map((pillar) => (
              <article key={pillar.title} className="about-pillar">
                <img src={pillar.image} alt={pillar.alt} loading="lazy" />
                <h2>{pillar.title}</h2>
                {pillar.paragraphs?.map((paragraph, index) => (
                  <p key={index}>
                    <RichTextView value={paragraph} />
                  </p>
                ))}
                {pillar.items && (
                  <ul className="about-values">
                    {pillar.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-counters" ref={countersRef}>
        <img className="about-counters-bg" src={about.counters.image} alt="" loading="lazy" />
        <div className="about-counters-overlay" />
        <div className="container reveal">
          <p className="eyebrow light">{about.counters.eyebrow}</p>
          <h2>{about.counters.title}</h2>
          <div className="about-stats">
            {about.counters.stats.map((stat) => (
              <Counter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="about-quality section" ref={qualityRef}>
        <div className="container reveal">
          <p className="about-quality-statement">
            <RichTextView value={about.quality.statement} />
          </p>
          <div className="about-quality-grid">
            {about.quality.columns.map((column) => (
              <article key={column.title} className="about-quality-col">
                <img src={column.image} alt={column.alt} loading="lazy" />
                <h3 className={column.boldTitle ? 'is-bold' : undefined}>{column.title}</h3>
                {column.paragraphs.map((paragraph, index) => (
                  <p key={index}>
                    <RichTextView value={paragraph} />
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-certs section" ref={certsRef}>
        <div className="container center reveal">
          <h2>{about.certificates.title}</h2>
          <div className="about-certs-row">
            {about.certificates.items.map((item) => (
              <a key={item.image} href={item.href} target="_blank" rel="noreferrer">
                <img src={item.image} alt={item.alt} loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="about-video section" ref={videoRef}>
        <div className="container center reveal">
          <div className="about-video-frame">
            <iframe
              src={about.video}
              title="Elevadores Altius"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container center">
          <h2>{about.cta.title}</h2>
          <Link className="btn btn-dark" to={about.cta.button.path}>
            <i className={about.cta.button.icon} aria-hidden="true" /> {about.cta.button.label}
          </Link>
        </div>
      </section>

      <div className="about-privacy-bar">
        <a href={about.cta.privacy.href}>{about.cta.privacy.label}</a>
      </div>
    </div>
  );
}
