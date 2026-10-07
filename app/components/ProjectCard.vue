<script setup lang="ts">
import type { Project } from '#shared/types/project'

const props = defineProps<{ project: Project }>()

const { t } = useI18n()
const localePath = useLocalePath()
const flipped = ref(false)

const faces = {
  wine: 'bg-wine text-cream',
  sage: 'bg-sage text-ink',
  rose: 'bg-rose text-cream',
  ocean: 'bg-ocean text-cream',
}

// En pantallas táctiles el primer toque voltea la tarjeta y el segundo abre el proyecto.
function onClick(event: MouseEvent) {
  if (flipped.value || !window.matchMedia('(hover: none)').matches) return
  event.preventDefault()
  flipped.value = true
}
</script>

<template>
  <NuxtLink
    :to="localePath(`/projects/${props.project.slug}`)"
    class="group block [perspective:1200px]"
    @click="onClick"
  >
    <div
      class="relative aspect-square transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)] motion-reduce:transition-none"
      :class="{ '[transform:rotateY(180deg)]': flipped }"
    >
      <div
        class="absolute inset-0 [-webkit-backface-visibility:hidden] [backface-visibility:hidden] [transition:visibility_0s_linear_0.35s] group-hover:invisible group-focus-visible:invisible"
        :class="{ invisible: flipped }"
      >
        <ProjectVisual :project="project" class="size-full" />
        <span
          class="absolute left-4 top-4 rounded-full bg-cream px-3 py-1 text-xs font-semibold text-wine"
          aria-hidden="true"
        >
          {{ t(`projects.filters.${project.category}`) }}
        </span>
        <span
          class="absolute bottom-4 right-4 grid size-9 place-items-center rounded-full bg-cream text-wine"
          aria-hidden="true"
        >
          <AppIcon name="arrowUpRight" class="size-4" />
        </span>
      </div>
      <div
        class="invisible absolute inset-0 flex flex-col justify-center gap-4 rounded-3xl p-8 [-webkit-backface-visibility:hidden] [backface-visibility:hidden] [transform:rotateY(180deg)] [transition:visibility_0s_linear_0.35s] group-hover:visible group-focus-visible:visible"
        :class="[faces[project.color], { '!visible': flipped }]"
      >
        <span class="w-fit rounded-full bg-cream px-4 py-1 text-xs font-semibold text-wine">
          {{ t('projects.flip') }}
        </span>
        <p class="leading-relaxed">{{ t(`projects.items.${project.id}.summary`) }}</p>
        <AppIcon name="arrowUpRight" class="ml-auto" />
      </div>
    </div>
    <h3 class="mt-4 text-center text-xl font-bold">{{ t(`projects.items.${project.id}.name`) }}</h3>
    <p class="text-center text-sm text-ink/70">
      {{
        t('projects.meta', {
          category: t(`projects.categories.${project.category}`),
          place: t(`projects.items.${project.id}.place`),
        })
      }}
    </p>
  </NuxtLink>
</template>
