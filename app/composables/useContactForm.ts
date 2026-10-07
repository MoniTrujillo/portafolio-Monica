import { whatsappNumber } from '~/data/site'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_MESSAGE = 10

type Field = 'name' | 'email' | 'message'

export function useContactForm() {
  const { t } = useI18n()
  const values = reactive<Record<Field, string>>({ name: '', email: '', message: '' })
  const errors = reactive<Record<Field, string>>({ name: '', email: '', message: '' })
  const whatsappUrl = ref('')

  const buildWhatsappUrl = () => {
    const text = t('contact.form.whatsappMessage', {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    })
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
  }

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
    whatsappUrl.value = buildWhatsappUrl()
    window.open(whatsappUrl.value, '_blank', 'noopener')
  }

  return { values, errors, whatsappUrl, submit }
}
