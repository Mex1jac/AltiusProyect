import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithSite } from '../../test/renderHelper';
import { WhatsAppWidget } from './WhatsAppWidget';

describe('WhatsAppWidget', () => {
  it('starts closed with the bubble hidden from the accessibility tree', () => {
    renderWithSite(<WhatsAppWidget />);
    expect(screen.queryByRole('dialog', { name: /atención por whatsapp/i })).toBeNull();
  });

  it('opens the popup with the three support agents', async () => {
    const user = userEvent.setup();
    renderWithSite(<WhatsAppWidget />);

    await user.click(screen.getByRole('button', { name: /abrir atención por whatsapp/i }));

    const dialog = screen.getByRole('dialog', { name: /atención por whatsapp/i });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('Permítanos atenderle')).toBeInTheDocument();
    expect(screen.getByText('Sofía Prieto')).toBeInTheDocument();
    expect(screen.getByText('Bernardo Hernández')).toBeInTheDocument();
    // "Ventas" appears twice: as the agent name and as their duty.
    expect(screen.getAllByText('Ventas')).toHaveLength(2);
  });

  it('links every agent to api.whatsapp.com with their phone number', async () => {
    const user = userEvent.setup();
    renderWithSite(<WhatsAppWidget />);
    await user.click(screen.getByRole('button', { name: /abrir atención por whatsapp/i }));

    const links = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.includes('api.whatsapp.com/send'));
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute(
      'href',
      expect.stringContaining('phone=5215571822000'),
    );
    expect(links[1]).toHaveAttribute(
      'href',
      expect.stringContaining('phone=5215520846609'),
    );
    expect(links[2]).toHaveAttribute(
      'href',
      expect.stringContaining('phone=5215660243419'),
    );
  });

  it('closes the popup again on the second click', async () => {
    const user = userEvent.setup();
    renderWithSite(<WhatsAppWidget />);
    const button = screen.getByRole('button', { name: /abrir atención por whatsapp/i });

    await user.click(button);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /cerrar atención por whatsapp/i }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
