export interface ContactMessage {
  name: string
  email: string
  message: string
}

export interface MessageSender {
  send(message: ContactMessage): string | undefined
}
