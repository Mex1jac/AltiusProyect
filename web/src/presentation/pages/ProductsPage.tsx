import { Link } from 'react-router-dom';
import { useSite } from '../siteContext';
import { useReveal } from '../hooks/useReveal';
import { RichTextView } from '../components/RichTextView';
import './ProductsPage.css';

/** Product catalog: hero band, intro, 12 product cards, sales bars and catalog link. */
export function ProductsPage() {
  const products = useSite().products();
  const introRef = useReveal<HTMLElement>();
  const cardsRef = useReveal<HTMLElement>();
  const statsRef = useReveal<HTMLElement>();

  return (
    <div className="page page-products">
      <section
        className="products-hero"
        style={{ backgroundImage: `url(${products.hero})` }}
        aria-hidden="true"
      />

      <section className="products-intro section" ref={introRef}>
        <div className="container products-intro-grid reveal">
          <div className="products-intro-text">
            <h2>Bienvenidos a Elevadores Altius</h2>
            {products.intro.paragraphs.map((paragraph, index) => (
              <p key={index}>
                <RichTextView value={paragraph} />
              </p>
            ))}
          </div>
          <img
            src={products.intro.image}
            alt={products.intro.alt}
            loading="lazy"
            className="products-intro-image"
          />
        </div>
      </section>

      <section className="products-cards section" ref={cardsRef}>
        <div className="container reveal">
          <div className="products-grid">
            {products.cards.map((card) => (
              <a key={card.title} className="product-card" href={card.href}>
                <span className="product-card-media">
                  <img src={card.image} alt={card.alt} loading="lazy" />
                </span>
                <span className="product-card-title">{card.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="products-stats section" ref={statsRef}>
        <div className="container products-stats-grid reveal">
          <div>
            <p className="eyebrow">{products.stats.label}</p>
            <div className="products-bars">
              {products.stats.bars.map((bar) => (
                <div key={bar.label} className="products-bar">
                  <div className="products-bar-head">
                    <span>{bar.label}</span>
                    <span>{bar.percent}%</span>
                  </div>
                  <div
                    className="products-bar-track"
                    role="img"
                    aria-label={`${bar.label}: ${bar.percent}%`}
                  >
                    <span className="products-bar-fill" style={{ width: `${bar.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="products-catalog">
            <i className="fas fa-file-pdf" aria-hidden="true" />
            <a href={products.catalog.href} target="_blank" rel="noreferrer">
              {products.catalog.label}
            </a>
          </aside>
        </div>
      </section>

      <section className="products-cta">
        <div className="container center">
          <h2>{products.cta.title}</h2>
          <Link className="btn btn-dark" to={products.cta.button.path}>
            {products.cta.button.label}
          </Link>
        </div>
      </section>
    </div>
  );
}
