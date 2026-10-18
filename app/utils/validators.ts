const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const VALIDATION_KEYS = {
  required: 'contact.form.errors.required',
  email: 'contact.form.errors.email',
  minLength: 'contact.form.errors.messageShort',
} as const

export interface RuleError {
  key: string
  params?: Record<string, unknown>
}

export type Rule = (value: string) => RuleError | undefined

export const required: Rule = (value) =>
  value.trim() ? undefined : { key: VALIDATION_KEYS.required }

export const isEmail: Rule = (value) =>
  EMAIL_PATTERN.test(value.trim()) ? undefined : { key: VALIDATION_KEYS.email }

export const minLength =
  (min: number): Rule =>
  (value) =>
    value.trim().length >= min ? undefined : { key: VALIDATION_KEYS.minLength, params: { min } }

export const firstError = (value: string, rules: Rule[]) =>
  rules.map((rule) => rule(value)).find(Boolean)
