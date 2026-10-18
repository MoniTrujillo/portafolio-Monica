import type { MessageSender } from '~/types/contact'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_MESSAGE = 10

type Field = 'name' | 'email' | 'message'

export function useContactForm(sender: MessageSender) {
  const { t } = useI18n()
  const values = reactive<Record<Field, string>>({ name: '', email: '', message: '' })
  const errors = reactive<Record<Field, string>>({ name: '', email: '', message: '' })
  const fallbackUrl = ref('')

  function validate(): boolean {
    errors.name = values.name.trim() ? '' : t('contact.form.errors.required')
    if (!values.email.trim()) errors.email = t('contact.form.errors.required')
    else if (!EMAIL_PATTERN.test(values.email)) errors.email = t('contact.form.errors.email')
    else errors.email = ''
    if (!values.message.trim()) errors.message = t('contact.form.errors.required')
    else if (values.message.trim().length < MIN_MESSAGE)
      errors.message = t('contact.form.errors.messageShort', { min: MIN_MESSAGE })
    else errors.message = ''
    return !errors.name && !errors.email && !errors.message
  }

  function submit() {
    if (!validate()) return
    fallbackUrl.value =
      sender.send({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      }) ?? ''
  }

  return { values, errors, fallbackUrl, submit }
}
