import type { ContactMessage, MessageSender } from '~/types/contact'

const WHATSAPP_URL = 'https://wa.me'

export function createWhatsappSender(
  phone: string,
  format: (message: ContactMessage) => string,
): MessageSender {
  return {
    send(message) {
      const url = `${WHATSAPP_URL}/${phone}?text=${encodeURIComponent(format(message))}`
      window.open(url, '_blank', 'noopener')
      return url
    },
  }
}
