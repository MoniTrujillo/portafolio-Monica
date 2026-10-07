<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('contact.seo.title'),
  description: () => t('contact.seo.description'),
})
</script>

<template>
  <section class="mx-auto max-w-page px-gutter py-section lg:px-12">
    <div class="grid items-center gap-12 lg:grid-cols-2">
      <figure class="relative mx-auto w-full max-w-xl [container-type:inline-size]">
        <img src="/images/laptop.png" alt="" width="1090" height="905" class="h-auto w-full" />
        <div class="absolute left-[22%] top-[14%] w-[66%]">
          <p class="text-[2.4cqw] font-semibold text-wine">{{ t('contact.kicker') }}</p>
          <h1 class="text-[9.5cqw] font-bold leading-none">{{ t('contact.title') }}</h1>
          <span class="mt-[2cqw] block h-[0.5cqw] w-[10cqw] bg-wine" />
          <p class="mt-[2.5cqw] text-[2.4cqw] leading-snug">{{ t('contact.intro') }}</p>
        </div>
        <figcaption class="mt-4 text-center font-serif text-wine">
          {{ t('contact.available') }}
        </figcaption>
      </figure>
      <ContactForm />
    </div>
  </section>
</template>
