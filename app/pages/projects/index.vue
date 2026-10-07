<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { data: projects, status, refresh } = useProjects()
const filter = ref('all')

const visible = computed(() =>
  filter.value === 'all'
    ? projects.value
    : projects.value.filter((project) => project.category === filter.value),
)
const spotlight = computed(() => projects.value.find((project) => project.id === 'facialByLimary'))
const names = computed(() =>
  projects.value.map((project) => t(`projects.items.${project.id}.name`)),
)

useSeoMeta({
  title: () => t('projects.seo.title'),
  description: () => t('projects.seo.description'),
})
</script>

<template>
  <div>
    <section class="bg-wine px-gutter py-16 text-cream lg:px-12 lg:py-20">
      <h1 class="mx-auto max-w-page animate-rise text-6xl font-bold sm:text-8xl">
        {{ t('projects.title') }}
      </h1>
    </section>
    <TextMarquee v-if="names.length" :items="names" />

    <div class="mx-auto max-w-5xl px-gutter py-section lg:px-12">
      <DataState :status="status" @retry="refresh()">
        <article v-if="spotlight" class="grid items-center gap-8 md:grid-cols-2">
          <ProjectVisual :project="spotlight" device="browser" />
          <div class="flex flex-col items-start gap-4">
            <p class="text-sm font-semibold uppercase tracking-wide text-wine">
              {{ t('projects.featuredLabel') }}
            </p>
            <h2 class="text-4xl font-bold sm:text-5xl">
              {{ t(`projects.items.${spotlight.id}.name`) }}
            </h2>
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="tech in spotlight.tech"
                :key="tech"
                class="rounded-full border border-wine/40 px-3 py-1 text-xs"
              >
                {{ tech }}
              </li>
            </ul>
            <AppButton :to="localePath(`/projects/${spotlight.slug}`)">
              {{ t('common.viewProject') }}
            </AppButton>
          </div>
        </article>

        <div class="mt-20 flex flex-wrap items-center justify-between gap-4">
          <ProjectFilters v-model="filter" />
          <p class="text-sm text-ink/70" aria-live="polite">
            {{ t('projects.count', { count: visible.length }) }}
          </p>
        </div>

        <ul class="mt-10 grid gap-x-12 gap-y-14 sm:grid-cols-2">
          <li v-for="project in visible" :key="project.id">
            <ProjectCard :project="project" />
          </li>
        </ul>
      </DataState>
    </div>

    <section class="bg-rose px-gutter py-16 text-center text-cream lg:px-12">
      <h2 class="text-3xl font-semibold">{{ t('projects.cta.title') }}</h2>
      <AppButton :to="localePath('/contact')" variant="light" class="mt-6">
        {{ t('projects.cta.button') }}
      </AppButton>
    </section>
  </div>
</template>
