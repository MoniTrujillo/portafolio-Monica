<script setup lang="ts">
import { socials } from '~/data/site'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-wine text-cream">
    <div class="mx-auto max-w-page px-gutter py-12 lg:px-12">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p class="font-serif text-2xl font-semibold sm:text-3xl">{{ t('site.fullName') }}</p>
        <p class="text-sm text-cream/80">{{ t('site.location') }}</p>
      </div>
      <div
        class="mt-8 flex flex-col gap-6 border-t border-cream/25 pt-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="text-xs text-cream/80">{{ t('footer.portfolio', { year }) }}</p>
        <AppButton href="/cv.pdf" variant="outline" icon="download" download>
          {{ t('footer.download') }}
        </AppButton>
        <ul class="flex gap-6 text-sm font-semibold">
          <li v-for="social in socials" :key="social.key">
            <a
              :href="social.href"
              :target="social.key === 'email' ? undefined : '_blank'"
              :rel="social.key === 'email' ? undefined : 'noopener noreferrer'"
              class="hover:underline focus-visible:outline-cream"
            >
              {{ t(`footer.links.${social.key}`) }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
