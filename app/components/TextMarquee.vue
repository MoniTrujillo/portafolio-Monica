<script setup lang="ts">
const props = defineProps<{ items: string[] }>()

const MIN_ITEMS_PER_COPY = 12
const SECONDS_PER_ITEM = 7

const loop = computed(() => {
  const repeat = Math.ceil(MIN_ITEMS_PER_COPY / Math.max(props.items.length, 1))
  return Array.from({ length: repeat }, () => props.items).flat()
})
const duration = computed(() => `${loop.value.length * SECONDS_PER_ITEM}s`)
</script>

<template>
  <div class="overflow-hidden border-y border-wine/20 bg-cream-light py-4">
    <ul
      class="flex w-max animate-marquee font-serif text-lg font-semibold hover:[animation-play-state:paused] sm:text-xl"
      :style="{ animationDuration: duration }"
    >
      <template v-for="copy in 2" :key="copy">
        <li
          v-for="(item, index) in loop"
          :key="`${copy}-${index}`"
          class="flex shrink-0 items-center gap-10 pr-10"
          :aria-hidden="copy === 2 || index >= items.length ? 'true' : undefined"
        >
          {{ item }}
          <span class="size-2 rounded-full bg-ink" aria-hidden="true" />
        </li>
      </template>
    </ul>
  </div>
</template>
