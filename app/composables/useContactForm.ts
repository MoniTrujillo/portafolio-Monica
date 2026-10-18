import type { MessageSender } from '~/types/contact'
import { firstError, isEmail, minLength, required } from '~/utils/validators'
import type { Rule } from '~/utils/validators'

const MIN_MESSAGE = 10

type Field = 'name' | 'email' | 'message'
const FIELDS: Field[] = ['name', 'email', 'message']

const rules: Record<Field, Rule[]> = {
  name: [required],
  email: [required, isEmail],
  message: [required, minLength(MIN_MESSAGE)],
}

export function useContactForm(sender: MessageSender) {
  const { t } = useI18n()
  const values = reactive<Record<Field, string>>({ name: '', email: '', message: '' })
  const errors = reactive<Record<Field, string>>({ name: '', email: '', message: '' })
  const fallbackUrl = ref('')

  function validate(): boolean {
    FIELDS.forEach((field) => {
      const error = firstError(values[field], rules[field])
      errors[field] = error ? t(error.key, error.params ?? {}) : ''
    })
    return FIELDS.every((field) => !errors[field])
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
