<script setup lang="ts">
import type { Project } from '#shared/types/project'

defineProps<{ projects: Project[] }>()

const { t } = useI18n()
const paused = ref(false)
// Mientras una tarjeta esté volteada (toque en móvil) el carrusel se detiene para poder leerla.
const cardFlipped = ref(false)
</script>

<template>
  <section :aria-label="t('home.featured.label')">
    <div
      class="overflow-hidden rounded-[2rem] bg-surface-light py-8 shadow-sm motion-reduce:overflow-x-auto"
    >
      <ul
        class="group flex w-max animate-carousel focus-within:[animation-play-state:paused] hover:[animation-play-state:paused] motion-reduce:animate-none"
        :class="{ '[animation-play-state:paused]': paused || cardFlipped }"
      >
        <template v-for="copy in 2" :key="copy">
          <li
            v-for="project in projects"
            :key="`${copy}-${project.id}`"
            class="mr-8 w-64 shrink-0 sm:w-72"
            :class="{ 'motion-reduce:hidden': copy === 2 }"
            :aria-hidden="copy === 2 ? 'true' : undefined"
            :inert="copy === 2"
          >
            <ProjectCard :project="project" @flip="cardFlipped = $event" />
          </li>
        </template>
      </ul>
    </div>
    <button
      type="button"
      class="mt-4 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-surface motion-reduce:hidden"
      :aria-pressed="paused"
      @click="paused = !paused"
    >
      {{ paused ? t('home.featured.play') : t('home.featured.pause') }}
    </button>
  </section>
</template>
