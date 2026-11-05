import type { AboutContent } from '../../domain/entities/site';

/** Static content of the "quienes somos" page. */
export const aboutContent: AboutContent = {
  hero: {
    image: '/images/QuienesSomos.jpg',
    logo: '/images/logo.png',
    title: 'quienes somos',
  },
  pillars: [
    {
      title: 'Misión',
      paragraphs: [
        'Ofrecer a nuestros clientes las mejores soluciones de transporte vertical dando precios competitivos y tiempos de entrega rápidos, cumpliendo con todas las normas internacionales y nacionales.',
        'Brindar un excelente servicio teniendo personal altamente capacitado para dar nuestro mejor servicio y seguridad en todos y cada uno de nuestros productos.',
      ],
      image: '/images/mision.jpg',
      alt: '',
    },
    {
      title: 'Visión',
      paragraphs: [
        'Ofrecer las mejores soluciones de transporte vertical, siendo una empresa a la vanguardia usando las últimas tecnologías de fabricación y diseño dando los mayores beneficios a nuestros clientes ofreciendo una respuesta expedita y eficiente, buscamos posicionarnos en el primer lugar del ramo gracias al desarrollo y esfuerzo de todo nuestro personal.',
      ],
      image: '/images/vision.jpg',
      alt: '',
    },
    {
      title: 'Valores',
      items: [
        'Trabajo en equipo',
        'Honestidad',
        'Cumplimiento',
        'Responsabilidad',
        'Integridad',
        'Disciplina',
        'Capacitación',
        'Confidencialidad',
        'Excelencia',
        'Calidad total',
        'Actitud de servicio',
        'Compromiso',
        'Motivación',
      ],
      image: '/images/valores.jpg',
      alt: '',
    },
  ],
  counters: {
    eyebrow: 'Algunos datos interesantes sobre nosotros.',
    title: 'Los números hablan por si solos.',
    image: '/images/Elevadores_Comerciales-e1774216404976.jpg',
    stats: [
      { value: 250, label: 'Productos' },
      { value: 10, label: 'Años de Experiencia' },
      { value: 200, label: 'Proyectos Completados' },
    ],
  },
  quality: {
    statement:
      'La calidad es lo primero! Nos aseguramos que cada detalle de nuestra fabricación sea del agrado de nuestros clientes hasta en los equipos más pequeños. Nos enfocamos 100% en las necesidades y satisfacción de nuestros clientes.',
    columns: [
      {
        title: 'Soluciones Innovadoras.',
        paragraphs: [
          'Cuando los espacios de nuestros clientes son muy reducidos, contamos con las mejores soluciones del mercado. Nuestros elevadores se adaptan a las más inusuales construcciones.',
          'En sitios en donde no se puede realizar nada de obra civil nuestros elevadores neumáticos son la mejor solución.',
        ],
        image: '/images/Innovacion.jpg',
        alt: '',
      },
      {
        title: 'Calidad insuperable',
        paragraphs: [
          'Nuestros elevadores cumplen con las normas de calidad y seguridad mexicanas EN-81 ya que son fabricados bajo las normas europeas que son de las más altas y estrictas a nivel mundial.',
        ],
        image: '/images/Sello_de_calidad.jpg',
        alt: '',
      },
      {
        title:
          'Somos la empresa en la que usted puede confiar para darle la solución perfecta a su proyecto.',
        boldTitle: true,
        paragraphs: [],
        image: '/images/confianza.jpg',
        alt: '',
      },
    ],
  },
  certificates: {
    title: 'Certificados de Calidad y Seguridad',
    items: [
      {
        image: '/images/TUV-SUD-logo.jpeg',
        alt: 'TÜV SÜD',
        href: 'https://www.tuvsud.com/en-in/services/testing/energy-efficiency-testing',
      },
      {
        image: '/images/Certificacion-en-ISO-9001.jpg',
        alt: 'Certificación ISO 9001',
        href: 'https://www.iso.org/standard/62085.html',
      },
      {
        image: '/images/une.png',
        alt: 'UNE',
        href: 'https://www.iso.org/standard/62085.html',
      },
    ],
  },
  cta: {
    title: '¿Necesita ayuda con soluciones industriales? ¡Somos Expertos!',
    button: { label: 'Más información', icon: 'fas fa-info-circle', path: '/contacto/' },
    privacy: {
      label: 'Consulte nuestro Aviso de Privacidad',
      href: 'https://www.elevadoresaltius.com/aviso-de-privacidad-de-elevadores-altius/',
    },
  },
  video: 'https://www.youtube.com/embed/sBqS7nBP6cI?controls=1&rel=0&playsinline=1&cc_load_policy=0',
};
