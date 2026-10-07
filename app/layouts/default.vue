<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#main"
      class="sr-only z-50 rounded-full bg-cream px-4 py-2 text-wine focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
    >
      {{ t('nav.skip') }}
    </a>
    <AppHeader />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
