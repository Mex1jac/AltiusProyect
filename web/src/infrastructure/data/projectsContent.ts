import type { ProjectsContent } from '../../domain/entities/site';

/** Static content of the special projects page. */
export const projectsContent: ProjectsContent = {
  hero: {
    image: '/images/Proyecto.webp',
    title: 'Proyectos',
    line1: 'Nuestros proyectos son',
    line2: 'Increibles y Extraordinarios',
  },
  inclinados: {
    title: 'Elevadores Inclinados',
    subtitle:
      'Somos la única empresa en México que ha instalado el elevador inclinado más grande de Latinoamérica.',
    areasTitle: 'Áreas de Aplicación',
    areas: [
      { icon: 'far fa-building', label: 'Comercial' },
      { icon: 'fas fa-mountain', label: 'Montaña' },
      { icon: 'fas fa-plane', label: 'Tráfico' },
      { icon: 'fas fa-warehouse', label: 'Almacenes' },
      { icon: 'fab fa-fort-awesome', label: 'Atracciones' },
      { icon: 'fas fa-house-user', label: 'Villas' },
      { icon: 'fas fa-archway', label: 'Especiales' },
      { icon: 'fas fa-building', label: 'Edificios Antiguos' },
    ],
    columns: [
      {
        image: '/images/Elevador_Inclinado_Rhine1.jpg',
        alt: '',
        text: 'Provee posibilidades de transporte en donde edificos, colinas, aeropuertos, centrales tanto de autobus como de tren no es posible instalar un elevador convencional de trayectoria vertical. Dependiendo del proyecto podemos ofrecer diferentes tipos de cabinas, puertas y terminados. Velocidades desde 0.5 m/s hasta 2.5 m/s',
        video: 'https://www.youtube.com/embed/GzO-l3-z7ns?controls=1&rel=0&playsinline=1',
      },
      {
        image: '/images/Elevadores-inclinados-rhine2.jpg',
        alt: '',
        text: 'Resuelve el transporte en lugares de difícil de acceso y con longitudes bastante lejanas a diferentes grados de inclinación.',
      },
    ],
  },
  escaleras: {
    image: '/images/EscaleElec_11zon.jpeg',
    title: 'Escaleras Eléctricas',
    intro:
      'Diseñadas con materiales y tecnología avanzada. Estructuras exquisitas, finos escalones, excelentes terminados, lujosa apariencia extensamente usada a nivel mundial en centros comerciales, aeropuertos, estaciones de tren y muchos otros sitios con alto flujo de personas.',
    cards: [
      {
        image: '/images/escaleras_alvaro_obregon2.jpg',
        alt: '',
        title: 'Escaleras eléctricas instaladas en vía pública',
        text: 'Uno de los retos más grandes enfrentados por nuestro personal ha sido el diseño, instalación y puesta en marcha en tiempo record.',
      },
      {
        image: '/images/Escalera_decorada.jpg',
        alt: '',
        title: 'Terminados de acuerdo al cliente',
        text: 'En conjunto con los arquitectos, ingenieros y personal de la constructora se les dió el terminado sugerido por ellos.',
      },
    ],
    video: 'https://www.youtube.com/embed/sCjQSCiMYd8?controls=1&rel=0&playsinline=1',
  },
  cta: {
    title:
      '¿Necesita apoyo para alguna solución especial en Escaleras? ¡Sómos los expertos!',
    button: { label: 'Contacto', icon: 'far fa-bell', path: '/contacto/' },
  },
};
