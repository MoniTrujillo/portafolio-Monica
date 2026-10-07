<script setup lang="ts">
const model = defineModel<string>({ required: true })

const { t } = useI18n()
const options = ['all', 'web', 'app', 'design']
</script>

<template>
  <div class="flex flex-wrap gap-2" role="group" :aria-label="t('projects.filters.label')">
    <button
      v-for="option in options"
      :key="option"
      type="button"
      :aria-pressed="model === option"
      class="rounded-full border border-wine/30 px-5 py-2 text-sm font-semibold transition hover:border-wine"
      :class="model === option ? 'bg-wine text-cream' : 'bg-cream-light text-ink'"
      @click="model = option"
    >
      {{ t(`projects.filters.${option}`) }}
    </button>
  </div>
</template>
