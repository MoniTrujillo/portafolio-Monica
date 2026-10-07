<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const { data: projects, status, refresh } = await useProjects()

const slug = computed(() => String(route.params.slug))
const project = computed(() => projects.value.find((item) => item.slug === slug.value))

if (status.value === 'success' && !project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const name = computed(() => (project.value ? t(`projects.items.${project.value.id}.name`) : ''))
const device = computed(() => (project.value?.category === 'web' ? 'browser' : 'phone'))

useSeoMeta({
  title: () =>
    project.value ? t('projects.detail.seoTitle', { name: name.value }) : t('projects.title'),
  description: () => (project.value ? t(`projects.items.${project.value.id}.summary`) : ''),
})
</script>

<template>
  <div>
    <DataState
      v-if="status !== 'success'"
      :status="status"
      class="mx-auto max-w-page px-gutter"
      @retry="refresh()"
    />
    <template v-else-if="project">
      <section class="bg-wine px-gutter py-14 text-cream lg:px-12">
        <div class="mx-auto max-w-page">
          <NuxtLink
            :to="localePath('/projects')"
            class="inline-flex items-center gap-2 text-sm hover:underline focus-visible:outline-cream"
          >
            <AppIcon name="arrowLeft" class="size-4" />
            {{ t('projects.detail.back') }}
          </NuxtLink>
          <h1 class="mt-6 text-5xl font-bold sm:text-7xl">{{ name }}</h1>
          <p class="mt-3 text-sm text-cream/80">
            {{
              t('projects.meta', {
                category: t(`projects.categories.${project.category}`),
                place: t(`projects.items.${project.id}.place`),
              })
            }}
          </p>
        </div>
      </section>

      <div class="mx-auto max-w-page space-y-section px-gutter py-section lg:px-12">
        <ProjectVisual :project="project" :device="device" class="!aspect-[16/9]" />

        <section class="grid gap-10 md:grid-cols-2" :aria-label="t('projects.detail.summary')">
          <div>
            <h2 class="text-2xl font-bold uppercase text-wine">
              {{ t('projects.detail.problem') }}
            </h2>
            <p class="mt-3 max-w-prose leading-relaxed">
              {{ t(`projects.items.${project.id}.problem`) }}
            </p>
          </div>
          <div>
            <h2 class="text-2xl font-bold uppercase text-wine">
              {{ t('projects.detail.solution') }}
            </h2>
            <p class="mt-3 max-w-prose leading-relaxed">
              {{ t(`projects.items.${project.id}.solution`) }}
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-wine">{{ t('projects.detail.stack') }}</h2>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li
              v-for="tech in project.tech"
              :key="tech"
              class="rounded-full border border-wine/40 px-4 py-1.5 text-sm"
            >
              {{ tech }}
            </li>
          </ul>
        </section>

        <AppButton v-if="project.url" :href="project.url" external icon="arrowUpRight">
          {{ t('projects.detail.visit') }}
        </AppButton>

        <section>
          <h2 class="text-2xl font-bold text-wine">{{ t('projects.detail.gallery') }}</h2>
          <ul class="mt-6 grid gap-6 sm:grid-cols-2">
            <li v-for="(image, index) in project.gallery" :key="image">
              <img
                :src="image"
                :alt="t('projects.detail.galleryItem', { n: index + 1, name })"
                loading="lazy"
                class="aspect-[16/10] w-full rounded-2xl border border-wine/15 object-cover object-top"
              />
            </li>
          </ul>
        </section>

        <AppButton :to="localePath('/projects')" icon="arrowRight">
          {{ t('projects.detail.viewAll') }}
        </AppButton>
      </div>
    </template>
  </div>
</template>
