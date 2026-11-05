import type { WhatsappAgent } from '../../domain/entities/site';

/**
 * Support team of the floating WhatsApp widget,
 * with the exact greeting texts configured on the original site.
 */
export const whatsappAgents: WhatsappAgent[] = [
  {
    name: 'Sofía Prieto',
    duty: 'Atención a Clientes',
    phone: '5215571822000',
    text: 'Cotizaciones y administrativo',
  },
  {
    name: 'Bernardo Hernández',
    duty: 'Soporte Técnico',
    phone: '5215520846609',
    text: 'Bienvenido y gracias por su preferencia, cualquier duda relacionada al soporte técnico estoy a sus órdenes!',
  },
  {
    name: 'Ventas',
    duty: 'Ventas',
    phone: '5215660243419',
    text: 'Bienvenido! Estoy a sus ordenes para cualquier consulta.',
  },
];
