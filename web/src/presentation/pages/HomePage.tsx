import { Link } from 'react-router-dom';
import { useSite } from '../siteContext';
import { useReveal } from '../hooks/useReveal';
import { RichTextView } from '../components/RichTextView';
import { Slideshow } from '../components/Slideshow';
import { SocialLinks } from '../components/SocialLinks';
import './HomePage.css';

/** Home page: hero slideshow, about, products banner, elevator types and FAQ CTA. */
export function HomePage() {
  const site = useSite();
  const home = site.home();
  const homeFooterSocialLinks = site.homeFooterSocialLinks();
  const privacyNotice = site.privacyNotice();
  const aboutRef = useReveal<HTMLElement>();
  const productsRef = useReveal<HTMLElement>();
  const tiposRef = useReveal<HTMLElement>();
  const faqRef = useReveal<HTMLElement>();

  return (
    <div className="page page-home">
      <section className="home-hero">
        <Slideshow slides={home.hero.slides} />
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <p className="home-hero-eyebrow">{home.hero.eyebrow}</p>
          <h1>{home.hero.title}</h1>
          <p className="home-hero-subtitle">{home.hero.subtitle}</p>
          <Link className="btn btn-accent" to={home.hero.cta.path}>
            <i className={home.hero.cta.icon} aria-hidden="true" /> {home.hero.cta.label}
          </Link>
        </div>
      </section>

      <section className="home-about section" ref={aboutRef}>
        <div className="container narrow reveal">
          <p className="eyebrow">{home.about.eyebrow}</p>
          <h2>{home.about.title}</h2>
          {home.about.paragraphs.map((paragraph, index) => (
            <p key={index} className="lead">
              <RichTextView value={paragraph} />
            </p>
          ))}
          <a className="btn btn-outline" href={home.about.cta.href} target="_blank" rel="noreferrer">
            <i className={home.about.cta.icon} aria-hidden="true" /> {home.about.cta.label}
          </a>
        </div>
      </section>

      <section className="home-products" ref={productsRef}>
        <Slideshow slides={home.products.slides} />
        <div className="home-products-overlay" />
        <div className="container home-products-inner reveal">
          <p className="eyebrow light">{home.products.eyebrow}</p>
          <h2>{home.products.title}</h2>
          <div className="home-products-grid">
            {home.products.items.map((item) => (
              <article key={item.title} className="home-product-blurb">
                <h3>{item.title}</h3>
                <p>
                  <RichTextView value={item.text} />
                </p>
              </article>
            ))}
          </div>
          <div className="home-products-cta">
            <p>{home.products.cta.title}</p>
            <Link className="btn btn-accent" to={home.products.cta.button.path}>
              <i className={home.products.cta.button.icon} aria-hidden="true" />{' '}
              {home.products.cta.button.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="home-tipos section" ref={tiposRef}>
        <div className="container reveal">
          <p className="eyebrow">{home.tipos.eyebrow}</p>
          <h2>{home.tipos.title}</h2>
          <div className="home-tipos-grid">
            {home.tipos.cards.map((card) => (
              <article key={card.title} className="home-tipo-card">
                <a href={card.href} className="home-tipo-media">
                  <img src={card.image} alt={card.alt} loading="lazy" />
                </a>
                <div className="home-tipo-body">
                  <h3>{card.title}</h3>
                  <p>
                    <RichTextView value={card.text} />
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-faq section" ref={faqRef}>
        <div className="container center reveal">
          <h2>{home.faq.title}</h2>
          <a className="btn btn-dark" href={home.faq.button.href}>
            {home.faq.button.label}
          </a>
        </div>
      </section>

      <section className="home-prefooter">
        <div className="container center">
          <SocialLinks links={homeFooterSocialLinks} ariaLabel="Redes sociales de Elevadores Altius" />
          <a className="home-privacy-pill" href={privacyNotice.href}>
            {privacyNotice.label}
          </a>
        </div>
      </section>
    </div>
  );
}
