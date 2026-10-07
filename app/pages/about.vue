<script setup lang="ts">
const { t } = useI18n()
const { profile, repoCount, status, errorMessage, retry } = useGithub()

const paragraphs = ['p1', 'p2', 'p3'] as const
const textBlock = ref<HTMLElement>()
const inView = useInView(textBlock)
const current = ref(0)

useSeoMeta({
  title: () => t('about.seo.title'),
  description: () => t('about.seo.description'),
})
</script>

<template>
  <div>
    <section class="bg-cream px-gutter pb-16 pt-12 lg:px-[5%] lg:pb-24 lg:pt-28">
      <div class="mx-auto max-w-[90rem]">
        <h1
          class="w-min animate-rise font-serif text-[clamp(5rem,13.5vw,12.5rem)] font-black leading-[0.85] text-wine lg:ml-[26%]"
        >
          {{ t('about.title') }}
        </h1>

        <div class="mt-10 grid items-start gap-10 lg:grid-cols-[40%_1fr] lg:gap-[6%]">
          <img
            src="/images/profile.png"
            :alt="t('about.photoAlt', { name: t('site.name') })"
            width="383"
            height="940"
            class="mx-auto h-auto max-h-[40rem] w-auto lg:max-h-none lg:w-full"
          />
          <div ref="textBlock" class="text-[clamp(1rem,1.8vw,1.6rem)] leading-relaxed">
            <TypeWriter
              v-for="(key, index) in paragraphs"
              :key="key"
              :text="t(`about.${key}`)"
              :active="inView && current === index"
              :class="{ 'mt-[1.4em]': index === 2 }"
              @done="current += 1"
            />
            <p class="mt-[3em] text-center font-serif text-[1.5em] font-bold text-wine">
              {{ t('about.signature', { name: t('site.name') }) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-cream-light px-gutter pt-12 lg:px-[5%]">
      <blockquote
        class="mx-auto flex max-w-[90rem] items-center gap-4 bg-wine px-6 py-8 font-serif text-lg text-cream lg:px-10 lg:text-2xl"
      >
        <span class="text-4xl text-cream/60" aria-hidden="true">“</span>
        {{ t('about.quote') }}
      </blockquote>
    </section>

    <section class="bg-cream-light px-gutter py-section lg:px-[5%]" aria-labelledby="interestTitle">
      <div
        class="mx-auto grid max-w-[90rem] items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-20"
      >
        <div>
          <h2
            id="interestTitle"
            class="text-3xl font-bold leading-tight first-letter:text-[1.8em] first-letter:text-wine sm:text-4xl lg:text-5xl"
          >
            {{ t('about.interest') }}
          </h2>
          <span class="mt-6 block h-0.5 w-12 bg-wine" aria-hidden="true" />
        </div>
        <DataState :status="status" :message="errorMessage" @retry="retry()">
          <GithubProfile v-if="profile" :profile="profile" :repo-count="repoCount" />
        </DataState>
      </div>
    </section>
  </div>
</template>
