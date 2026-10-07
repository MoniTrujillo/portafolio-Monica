<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const { t } = useI18n()

const options = computed(() =>
  locales.value.map((item) => (typeof item === 'string' ? { code: item } : { code: item.code })),
)
</script>

<template>
  <div
    class="flex items-center gap-1 rounded-full bg-cream/15 p-1"
    role="group"
    :aria-label="t('lang.label')"
  >
    <NuxtLink
      v-for="option in options"
      :key="option.code"
      :to="switchLocalePath(option.code as 'es' | 'en')"
      :aria-current="locale === option.code ? 'true' : undefined"
      :lang="option.code"
      class="rounded-full px-3 py-1 text-xs font-semibold uppercase transition focus-visible:outline-cream"
      :class="locale === option.code ? 'bg-cream text-wine' : 'text-cream hover:bg-cream/20'"
    >
      <span aria-hidden="true">{{ option.code }}</span>
      <span class="sr-only">{{ t(`lang.${option.code}`) }}</span>
    </NuxtLink>
  </div>
</template>
