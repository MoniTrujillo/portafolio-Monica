<script setup lang="ts">
import type { Project } from '#shared/types/project'

const props = withDefaults(defineProps<{ project: Project; device?: 'phone' | 'browser' }>(), {
  device: 'phone',
})

const colors = {
  wine: 'bg-wine text-cream',
  sage: 'bg-sage text-ink',
  rose: 'bg-rose text-cream',
  ocean: 'bg-ocean text-cream',
}

const initial = computed(() => props.project.id.charAt(0))
const screenshot = computed(() => props.project.gallery[0])
</script>

<template>
  <div
    class="relative grid aspect-square place-items-center overflow-hidden rounded-3xl"
    :class="colors[project.color]"
    aria-hidden="true"
  >
    <span
      class="absolute -bottom-10 -right-4 font-serif text-[14rem] font-bold uppercase leading-none opacity-15"
    >
      {{ initial }}
    </span>

    <div
      v-if="device === 'phone'"
      class="relative aspect-[9/17] h-[82%] rotate-[-8deg] animate-float overflow-hidden rounded-[1.8rem] border-[6px] border-ink bg-ink shadow-2xl motion-reduce:animate-none"
    >
      <img
        v-if="project.phoneImage"
        :src="project.phoneImage"
        alt=""
        loading="lazy"
        class="size-full object-cover object-top"
      />
      <span class="absolute left-1/2 top-1.5 h-1 w-8 -translate-x-1/2 rounded-full bg-cream/30" />
    </div>

    <div v-else class="relative w-[88%] overflow-hidden rounded-xl bg-cream-light shadow-2xl">
      <div class="flex gap-1 bg-ink px-3 py-2">
        <span class="size-1.5 rounded-full bg-cream/70" />
        <span class="size-1.5 rounded-full bg-cream/70" />
        <span class="size-1.5 rounded-full bg-cream/70" />
      </div>
      <img
        v-if="screenshot"
        :src="screenshot"
        alt=""
        loading="lazy"
        class="aspect-[16/10] w-full object-cover object-top"
      />
      <div v-else class="aspect-[16/10] space-y-2 p-4">
        <div class="h-3 w-1/2 rounded bg-ink/25" />
        <div class="h-2 w-3/4 rounded bg-ink/15" />
      </div>
    </div>
  </div>
</template>
