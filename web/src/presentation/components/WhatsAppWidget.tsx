import { useState } from 'react';
import { useSite } from '../siteContext';
import './WhatsAppWidget.css';

/**
 * Floating WhatsApp support widget: green bubble with a tooltip,
 * opening a popup that lists the support team (same behaviour as the original site).
 */
export function WhatsAppWidget() {
  const whatsappAgents = useSite().whatsappAgents();
  const [open, setOpen] = useState(false);

  return (
    <div className={`whatsapp-widget${open ? ' is-open' : ''}`}>
      <div className="whatsapp-popup" hidden={!open} role="dialog" aria-label="Atención por WhatsApp">
        <div className="whatsapp-popup-head">
          <p className="whatsapp-popup-title">Permítanos atenderle</p>
          <p className="whatsapp-popup-intro">
            Por favor seleccione a alguno de nuestros miembros para ser atendido por{' '}
            <strong>WhatsApp</strong>
          </p>
        </div>
        <p className="whatsapp-popup-notice">Nuestro equipo por lo regular responde en pocos minutos.</p>
        <ul className="whatsapp-agents">
          {whatsappAgents.map((agent) => (
            <li key={agent.phone}>
              <a
                href={`https://api.whatsapp.com/send?phone=${agent.phone}&text=${encodeURIComponent(agent.text)}`}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <span className="whatsapp-avatar" aria-hidden="true">
                  <i className="fab fa-whatsapp" />
                </span>
                <span className="whatsapp-agent-meta">
                  <span className="whatsapp-agent-name">{agent.name}</span>
                  <span className="whatsapp-agent-duty">{agent.duty}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <span className="whatsapp-tooltip" aria-hidden="true">
        <strong>¿Necesita ayuda?</strong>
        ¡Permitanos atenderle!
      </span>

      <button
        type="button"
        className="whatsapp-fab"
        aria-label={open ? 'Cerrar atención por WhatsApp' : 'Abrir atención por WhatsApp'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <i className="fab fa-whatsapp" aria-hidden="true" />
      </button>
    </div>
  );
}
