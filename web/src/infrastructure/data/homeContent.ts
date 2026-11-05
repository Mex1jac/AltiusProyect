import type { HomeContent } from '../../domain/entities/site';
import { SITE_ORIGIN } from './navItems';

/** Static content of the home page, mirroring the original site section by section. */
export const homeContent: HomeContent = {
  hero: {
    eyebrow: 'Las palabras que nos definen ante quienes nos otorgan su preferencia...',
    title: 'LUJO CALIDAD Y SERVICIO',
    subtitle: 'Creemos que la verdadera innovación es la que piensa en todo',
    cta: { label: 'Más información', icon: 'far fa-bell', path: '/contacto/' },
    slides: [
      '/images/modern-elevators-2022-03-04-02-17-53-utc.jpg',
      '/images/side-view-of-beautiful-toung-caucasian-female-exec-2021-08-28-16-43-54-utc.jpg',
      '/images/modern-black-and-white-corridor-2021-08-26-15-43-23-utc-scaled.jpg',
    ],
  },
  about: {
    eyebrow: 'Acerca de nosotros',
    title:
      'Empresa 100% Mexicana dedicada a la importación, instalación y fabricación de Elevadores',
    paragraphs: [
      'Ofrecer a nuestros clientes las mejores soluciones de transporte vertical dando precios competitivos y tiempos de entrega rápidos, cumpliendo con todas las normas internacionales y nacionales. Brindar un excelente servicio teniendo personal altamente capacitado para dar nuestro mejor servicio y seguridad en todos y cada uno de nuestros productos.',
      'Ofrecer las mejores soluciones de transporte vertical, siendo una empresa a la vanguardia usando las últimas tecnologías de fabricación y diseño dando los mayores beneficios a nuestros clientes ofreciendo una respuesta expedita y eficiente, buscamos posicionarnos en el primer lugar del ramo gracias al desarrollo y esfuerzo de todo nuestro personal.',
    ],
    cta: {
      label: 'Ubicación',
      icon: 'fas fa-map-marker-alt',
      href: 'https://maps.app.goo.gl/3bdkLmLh7z9D5my47',
    },
  },
  products: {
    eyebrow: 'Nuestros productos',
    title:
      'Contamos con una amplia variedad de equipos para satisfacer las más exigentes necesidades de cada cliente.',
    items: [
      {
        title: 'Elevadores Hidráulicos',
        text: [
          'En ',
          { strong: 'Altius' },
          ' hemos desarrollado todo un sistema que nos permite adaptarnos a los diferentes espacios de Elevadores en edificios existentes.',
        ],
      },
      {
        title: 'Elevadores Eléctricos',
        text: 'Eléctrico con y sin cuarto de Máquinas 2 Velocidades y 3 VF. Velocidad nominal de 1.0 m/s, cubos y fosos reducidos y diferentes capacidades de acuerdo a sus especificaciones.',
      },
      {
        title: 'Escaleras Eléctricas',
        text: [
          'El tráfico constante y la movilidad de las personas en espacios públicos es sumamente importante. ',
          { strong: 'Elevadores Altius' },
          ' proporciona la solución ideal con pasillos y escaleras eléctricas de todo tipo.',
        ],
      },
    ],
    cta: {
      title:
        'Diríjase a nuestro sitio en donde encontrará la solución perfecta a sus necesidades.',
      button: { label: 'Productos', icon: 'fab fa-product-hunt', path: '/productos/' },
    },
    slides: [
      '/images/modern-hallway-with-glass-elevator-2021-08-26-15-43-44-utc.jpg',
      '/images/Elevadores_para_oficina.jpg',
      '/images/Elevadores_triplex.jpg',
    ],
  },
  tipos: {
    eyebrow: 'Tipos de Elevadores',
    title: 'Para toda necesidad',
    cards: [
      {
        title: 'Elevadores para autos',
        href: '#',
        image: '/images/montacoches-altius-de-lujo2-e1774216059258.jpg',
        alt: 'Elevador de autos de lujo',
        text: 'Montacoches con capacidades de 2700kg para autos y SUVs estándar hasta 3500kg para autos y camionetas blindadas. Terminados en acero esmaltado, acero inoxidable o acero brillo espejo para los de lujo.',
      },
      {
        title: 'Elevadores Residenciales Panorámicos',
        href: '#',
        image: '/images/Elevador_Panoramico-e1774216388250.jpg',
        alt: '',
        text: [
          'Contamos con una amplia variedad de ',
          {
            href: 'https://www.facebook.com/photo/?fbid=1561370570691703&set=pcb.1561371077358319',
            text: 'elevadores panorámicos',
          },
          ' de 1 sola cara panorámica, 2 ó 3 y completamente panorámicos incluyendo puertas de cristal templado tanto para la cabina del elevador como puertas de piso.',
        ],
      },
      {
        title: 'Elevadores Comerciales',
        href: '#',
        image: '/images/Elevadores_Comerciales-e1774216404976.jpg',
        alt: '',
        text: 'Oficinas, edificios de viviendas, centros comerciales y todo tipo de inmuebles comerciales que requieran elevador son atendidos por nuestro personal altamente capacitado para ofrecer la mejor solución de acuerdo a sus necesidades.',
      },
      {
        title: 'Elevadores para hospital',
        href: '#',
        image: '/images/Elevador_Camillero-e1774216040141.jpg',
        alt: '',
        text: 'En el ámbito de la salud, nuestros elevadores cumplen con las más altas normas de calidad y de seguridad. Elevadores camilleros como de personal son fabricados con materiales que proporcionan la máxima higiene requerida.',
      },
    ],
  },
  faq: {
    title: '¿Necesita ayuda de nuestros expertos?, no dude en contactarnos',
    button: {
      label: 'Preguntas Frecuentes FAQ',
      href: `${SITE_ORIGIN}/preguntas-frecuentes/`,
    },
  },
};
