import type { ProductsContent } from '../../domain/entities/site';
import { SITE_ORIGIN } from './navItems';

/** Static content of the products catalog page. */
export const productsContent: ProductsContent = {
  hero: '/images/montacoches-hidral.jpg',
  intro: {
    paragraphs: [
      'Esperamos que dentro de nuestra amplia gama de productos, encuentre la solución ideal que está buscando para su proyecto.',
      'Si requiere de más ayuda, por favor póngase en contacto con uno de nuestros representantes que le ayudará con una solución profesional y exacta para su requerimiento de transportación vertical.',
    ],
    image:
      '/images/customer-service-representative-at-work-2022-10-28-05-53-06-utc-e1774218352853.jpg',
    alt: 'Representante de servicio al cliente',
  },
  cards: [
    {
      title: 'Elevadores Eléctricos',
      href: `${SITE_ORIGIN}/elevadores-electricos/`,
      image: '/images/Elevador-panoramico-Raloe-e1774217113608.jpg',
      alt: 'Elevador panorámico de lujo',
    },
    {
      title: 'Elevadores Hidráulicos',
      href: `${SITE_ORIGIN}/elevadores-hidraulicos/`,
      image: '/images/Elevador_de_cristal-e1774216463627.jpg',
      alt: '',
    },
    {
      title: 'Elevadores Neumáticos',
      href: `${SITE_ORIGIN}/elevadores-neumaticos/`,
      image: '/images/Elevador_neumatico-e1774216498722.jpg',
      alt: '',
    },
    {
      title: 'Elevadores Helicoidales',
      href: `${SITE_ORIGIN}/elevadores-helicoidales/`,
      image: '/images/A-1024x1536-image-fe-e1774218374583.png',
      alt: '',
    },
    {
      title: 'Elevadores para Autos',
      href: `${SITE_ORIGIN}/montacoches-o-elevadores-para-autos/`,
      image: '/images/montacoches-altius-de-lujo-e1774216725264.jpg',
      alt: '',
    },
    {
      title: 'Elevadores Camilleros',
      href: `${SITE_ORIGIN}/elevadores-camilleros/`,
      image: '/images/ascensor-camillero-e1774216707628.jpg',
      alt: '',
    },
    {
      title: 'Elevadores Inclinados',
      href: `${SITE_ORIGIN}/ascensores-inclinados/`,
      image: '/images/elevador-inclinado-e1774216690576.jpg',
      alt: '',
    },
    {
      title: 'Escaleras Eléctricas',
      href: `${SITE_ORIGIN}/escaleras-y-pasillos-electricos/`,
      image: '/images/escaleras-electricas-futuristas-altius-e1774216740553.jpg',
      alt: '',
    },
    {
      title: 'Montacargas',
      href: `${SITE_ORIGIN}/elevadores-de-carga/`,
      image: '/images/elevador-montacargas-altius.jpg',
      alt: '',
    },
    {
      title: 'Montaplatos',
      href: `${SITE_ORIGIN}/montaplatos/`,
      image: '/images/montaplatos.jpg',
      alt: '',
    },
    {
      title: 'Pasillos Eléctricos',
      href: `${SITE_ORIGIN}/escaleras-y-pasillos-electricos/`,
      image: '/images/pasillo-electrico-altius-e1774216779428.jpg',
      alt: '',
    },
    {
      title: 'Salvaescaleras',
      href: `${SITE_ORIGIN}/salvaescaleras-y-plataformas/`,
      image: '/images/Salvaescaleras-altius-e1774216793463.jpg',
      alt: 'Salvaescaleras',
    },
  ],
  stats: {
    label: 'Lo más vendido',
    bars: [
      { label: 'Elevadores Comerciales', percent: 60 },
      { label: 'Elevadores Domésticos', percent: 20 },
      { label: 'Montacoches', percent: 10 },
      { label: 'Escaleras', percent: 10 },
    ],
  },
  catalog: {
    label: 'Descargue nuestro catálogo completo de cabinas',
    href: `${SITE_ORIGIN}/wp-content/uploads/2022/11/Catalogo2022.pdf`,
  },
  cta: {
    title: '¿Necesita apoyo por parte de nuestro personal? Estamos para servirle!',
    button: { label: '¿Listo para ordenar?', path: '/contacto/' },
  },
};
