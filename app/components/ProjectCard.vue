<script setup lang="ts">
import type { Project } from '#shared/types/project'

const props = defineProps<{ project: Project }>()

const { t } = useI18n()
const localePath = useLocalePath()
const flipped = ref(false)
const link = ref<HTMLElement | null>(null)
const emit = defineEmits<{ flip: [value: boolean] }>()

const faces = {
  wine: 'bg-wine text-cream',
  sage: 'bg-sage text-ink',
  rose: 'bg-rose text-cream',
  ocean: 'bg-ocean text-cream',
}

watch(flipped, (value) => emit('flip', value))

// Tipo de puntero del último contacto ('touch', 'mouse' o 'pen'). Se guarda en pointerdown,
// que se dispara antes del click, para saber si el usuario tocó la pantalla con el dedo.
const pointerType = ref('')

const to = computed(() => localePath(`/projects/${props.project.slug}`))

// En pantallas táctiles el primer toque voltea la tarjeta y el segundo abre el proyecto.
function onClick(event: MouseEvent) {
  // Ctrl/Cmd/Shift + clic: comportamiento normal del navegador (abrir en otra pestaña).
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return

  event.preventDefault()

  const isTouch =
    pointerType.value === 'touch' ||
    pointerType.value === 'pen' ||
    (pointerType.value === '' && window.matchMedia('(hover: none)').matches)

  if (isTouch && !flipped.value) {
    flipped.value = true
    return
  }
  navigateTo(to.value)
}

// Un toque fuera de la tarjeta la regresa a su cara frontal.
function onOutsidePointerDown(event: PointerEvent) {
  if (flipped.value && !link.value?.contains(event.target as Node)) flipped.value = false
}

onMounted(() => document.addEventListener('pointerdown', onOutsidePointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onOutsidePointerDown))
</script>

<template>
  <a
    ref="link"
    :href="to"
    class="group block touch-manipulation [-webkit-tap-highlight-color:transparent] [perspective:1200px]"
    @pointerdown="pointerType = $event.pointerType"
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
    <h3 class="mt-4 text-center text-xl font-bold">
      {{ t(`projects.items.${project.id}.name`) }}
    </h3>
    <p class="text-center text-sm text-ink/70">
      {{
        t('projects.meta', {
          category: t(`projects.categories.${project.category}`),
          place: t(`projects.items.${project.id}.place`),
        })
      }}
    </p>
  </a>
</template>
