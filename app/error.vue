<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()
const is404 = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: () => t(is404.value ? 'error.notFound.title' : 'error.generic.title'),
  description: () => t(is404.value ? 'error.notFound.text' : 'error.generic.text'),
})

const goHome = () => clearError({ redirect: localePath('/') })
</script>

<template>
  <NuxtLayout>
    <section class="relative overflow-hidden bg-ink px-gutter py-section text-cream lg:px-12">
      <p
        class="pointer-events-none select-none font-serif text-[10rem] font-bold leading-none text-wine sm:text-[18rem]"
        aria-hidden="true"
      >
        {{ error.statusCode }}
      </p>
      <div class="relative mx-auto -mt-16 max-w-page sm:-mt-28">
        <h1 class="text-3xl font-bold sm:text-5xl">
          {{ t(is404 ? 'error.notFound.title' : 'error.generic.title') }}
        </h1>
        <p class="mt-4 max-w-lg text-cream/85">
          {{ t(is404 ? 'error.notFound.text' : 'error.generic.text') }}
        </p>
        <button
          type="button"
          class="mt-8 rounded-full bg-cream px-6 py-3 font-serif text-sm font-semibold text-wine transition hover:bg-cream-light focus-visible:outline-cream"
          @click="goHome"
        >
          {{ t('error.back') }}
        </button>
      </div>
    </section>
  </NuxtLayout>
</template>
