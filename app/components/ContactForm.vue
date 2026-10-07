<script setup lang="ts">
const { t } = useI18n()
const { values, errors, whatsappUrl, submit } = useContactForm()

const fields = [
  { key: 'name', type: 'text', autocomplete: 'name' },
  { key: 'email', type: 'email', autocomplete: 'email' },
  { key: 'message', type: 'textarea', autocomplete: 'off' },
] as const

const inputClass =
  'w-full rounded-xl border-2 border-wine bg-cream-light px-4 py-3 text-sm placeholder:text-ink/50 focus-visible:outline-offset-2 aria-[invalid=true]:border-danger'
</script>

<template>
  <form novalidate class="space-y-6" @submit.prevent="submit">
    <div class="flex items-baseline justify-between border-b border-ink/20 pb-3">
      <h2 class="text-2xl font-semibold">{{ t('contact.form.title') }}</h2>
      <p class="text-xs text-ink/70">{{ t('contact.form.required') }}</p>
    </div>

    <div v-for="field in fields" :key="field.key">
      <label :for="`contact-${field.key}`" class="mb-2 block text-xs font-semibold">
        {{ t(`contact.form.${field.key}.label`) }}
      </label>
      <textarea
        v-if="field.type === 'textarea'"
        :id="`contact-${field.key}`"
        v-model="values[field.key]"
        rows="5"
        :placeholder="t(`contact.form.${field.key}.placeholder`)"
        :aria-invalid="!!errors[field.key]"
        :aria-describedby="errors[field.key] ? `error-${field.key}` : undefined"
        :class="inputClass"
      />
      <input
        v-else
        :id="`contact-${field.key}`"
        v-model="values[field.key]"
        :type="field.type"
        :autocomplete="field.autocomplete"
        :placeholder="t(`contact.form.${field.key}.placeholder`)"
        :aria-invalid="!!errors[field.key]"
        :aria-describedby="errors[field.key] ? `error-${field.key}` : undefined"
        :class="inputClass"
      />
      <p
        v-if="errors[field.key]"
        :id="`error-${field.key}`"
        class="mt-2 text-sm font-medium text-danger"
      >
        {{ errors[field.key] }}
      </p>
    </div>

    <AppButton icon="arrowUpRight" type="submit">{{ t('contact.form.submit') }}</AppButton>

    <p v-if="whatsappUrl" role="status" class="rounded-xl bg-wine p-4 text-sm text-cream">
      {{ t('contact.form.success') }}
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="font-semibold underline focus-visible:outline-cream"
      >
        {{ t('contact.form.whatsappFallback') }}
      </a>
    </p>
  </form>
</template>
