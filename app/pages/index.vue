<script setup lang="ts">
import { certifications, skills, values } from '~/data/site'

const { t } = useI18n()
const { data: projects, status, refresh } = useProjects()

useSeoMeta({
  title: () => t('home.seo.title'),
  description: () => t('home.seo.description'),
})
</script>

<template>
  <div>
    <section class="bg-wine px-gutter pb-20 pt-16 text-cream lg:px-12 lg:pb-28 lg:pt-24">
      <div class="mx-auto max-w-page">
        <h1
          class="max-w-3xl animate-rise text-6xl font-bold leading-[0.95] sm:text-8xl lg:text-9xl"
        >
          {{ t('home.hero.title', { name: t('site.firstName') }) }}
        </h1>
        <p
          class="mt-8 max-w-md animate-rise text-base text-cream/85 [animation-delay:200ms] sm:text-lg"
        >
          {{ t('home.hero.subtitle') }}
        </p>
      </div>
    </section>

    <TextMarquee :items="values.map((key) => t(`home.values.${key}`))" />

    <section
      class="mx-auto max-w-page px-gutter py-section lg:px-12"
      aria-labelledby="featuredTitle"
    >
      <h2 id="featuredTitle" class="mb-10 text-4xl font-bold sm:text-5xl">
        {{ t('home.featured.title') }}
      </h2>
      <DataState :status="status" @retry="refresh()">
        <ProjectCarousel :projects="projects" />
      </DataState>
    </section>

    <section class="bg-wine px-gutter py-section text-cream lg:px-12" aria-labelledby="skillsTitle">
      <div class="mx-auto max-w-page">
        <h2 id="skillsTitle" class="text-4xl font-bold sm:text-5xl">
          {{ t('home.skills.title') }}
        </h2>
        <p class="mt-2 text-cream/80">{{ t('home.skills.subtitle') }}</p>
        <ul v-reveal class="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="skill in skills" :key="skill.key">
            <SkillCard
              :icon="skill.icon"
              :title="t(`home.skills.items.${skill.key}.title`)"
              :text="t(`home.skills.items.${skill.key}.text`)"
            />
          </li>
        </ul>
      </div>
    </section>

    <section class="mx-auto max-w-page px-gutter py-section lg:px-12" aria-labelledby="certsTitle">
      <h2 id="certsTitle" class="text-4xl font-bold sm:text-5xl">
        {{ t('home.certifications.title') }}
      </h2>
      <ul v-reveal class="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="cert in certifications" :key="cert.key" class="border-t-2 border-wine pt-3">
          <p class="text-xs font-semibold text-wine">{{ cert.date }}</p>
          <h3 class="mt-2 text-lg font-bold leading-snug">
            {{ t(`home.certifications.items.${cert.key}.title`) }}
          </h3>
          <p class="mt-1 text-sm text-ink/70">
            {{ t(`home.certifications.items.${cert.key}.org`) }}
          </p>
        </li>
      </ul>
    </section>
  </div>
</template>
