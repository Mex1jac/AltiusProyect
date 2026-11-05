import type { ContactContent } from '../../domain/entities/site';

/** Static content of the contact page. */
export const contactContent: ContactContent = {
  hero: {
    image: '/images/Contacto_11zon.jpeg',
    title: 'Contacto',
  },
  offices: {
    title: 'Ubicación y teléfonos',
    intro: 'Nuestras oficinas se encuentra ubicadas en:',
    groups: [
      {
        icon: 'fas fa-map-marker-alt',
        lines: [
          'Nicolas Bravo N. 1936',
          'Col: San Miguel Totocuitlapilco',
          '52143, Metepec, Estado de México',
        ],
      },
      {
        icon: 'far fa-envelope',
        lines: [{ href: '#', text: 'ventas@elevadoresaltius.com' }],
      },
      {
        icon: 'fas fa-phone',
        lines: [{ href: 'tel:+525571822000', text: '+52 55-7182-2000' }],
      },
      {
        icon: 'fas fa-wrench',
        lines: [{ href: 'tel:+525660243419', text: '+52 5660243419' }],
      },
      {
        icon: 'fas fa-map-marker-alt',
        lines: [
          '25 poniente 1902',
          'Col: Rivera de Santiago',
          'Puebla, Pue.',
          'Whatsapp 221 104 5741 Oficina 222 379 6792',
        ],
      },
      {
        icon: 'far fa-envelope',
        lines: [{ href: '#', text: 'puebla@elevadoresaltius.com' }],
      },
    ],
    image: '/images/Recepcionista-elevadores-altius-e1774216579112.jpg',
    alt: 'Recepcionista de Elevadores Altius',
  },
  quote: {
    title: 'Solicitud de cotización',
  },
  map: 'https://maps.google.com/maps?q=C.%20Nicol%C3%A1s%20Bravo%201936%2C%20San%20Miguel%20Totocuitlapilco%2C%2052143%20Barrio%20de%20la%20Asunci%C3%B3n%2C%20M%C3%A9x.&t=m&z=14&output=embed&iwloc=near',
  video:
    'https://www.youtube.com/embed/yNvHjSVQK3Y?controls=0&rel=0&playsinline=1&cc_load_policy=0',
};
