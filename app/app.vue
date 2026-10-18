<script setup lang="ts">
import { siteUrl } from '~/data/site'

const { t } = useI18n()
const localeHead = useLocaleHead({ seo: true })

const structuredData = computed(() =>
  buildStructuredData({
    name: t('site.name'),
    fullName: t('site.fullName'),
    jobTitle: t('site.jobTitle'),
    language: localeHead.value.htmlAttrs.lang ?? '',
  }),
)

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  link: localeHead.value.link,
  meta: localeHead.value.meta,
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(structuredData.value) }],
}))

useSeoMeta({
  ogType: 'website',
  ogSiteName: 'Mónica Trujillo',
  ogImage: `${siteUrl}/og-image.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
